from flask import Flask, jsonify, request, g
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import ObjectId
from datetime import datetime, timedelta, timezone
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import os


from auth import authenticate_token 
load_dotenv()

app = Flask(__name__)
CORS(app)

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.get_database("Task-Manager-Database")
users_collection = db['users']
tasks_collection = db['tasks']

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

@app.before_request
def before_request():
    decoded_token, user_id = authenticate_token(request)
    g.user = (decoded_token, user_id)

@app.route("/")
def hello():
    return jsonify({"data": "hello"})

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': True, 'message': 'Invalid JSON format'}), 400

        fullName = data.get('fullName')
        email = data.get('email')
        password = data.get('password')

        if not fullName:
            return jsonify({'error': True, 'message': 'Full Name is required'}), 400
        if not email:
            return jsonify({'error': True, 'message': 'Email is required'}), 400
        if not password:
            return jsonify({'error': True, 'message': 'Password is required'}), 400

        if users_collection.find_one({'email': email}):
            return jsonify({'error': True, 'message': 'User already exists'}), 400

        
        hashed_password = generate_password_hash(password)

        new_user = {
            'fullName': fullName,
            'email': email,
            'password': hashed_password,
            'created_on': datetime.now(timezone.utc)
        }

        result = users_collection.insert_one(new_user)
        new_user['_id'] = str(result.inserted_id)

        access_token_secret = os.getenv("SECRET_KEY")  
        access_token = jwt.encode({
            'user': {
                'id': str(result.inserted_id),
                'fullName': fullName,
                'email': email
            },
            'exp': datetime.utcnow() + timedelta(minutes=30)
        }, access_token_secret, algorithm='HS256')

        access_token_str = access_token

        return jsonify({
            'error': False,
            'user': new_user,
            'accessToken': access_token_str,
            'message': 'Registration Successful'
        }), 201

    except Exception as e:
        return jsonify({'error': True, 'message': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': True, 'message': 'Invalid JSON format'}), 400

        email = data.get('email')
        password = data.get('password')

        if not email:
            return jsonify({'error': True, 'message': 'Email is required'}), 400
        if not password:
            return jsonify({'error': True, 'message': 'Password is required'}), 400

        user = users_collection.find_one({'email': email})
        if not user:
            return jsonify({'error': True, 'message': 'User not found'}), 404

        if check_password_hash(user['password'], password):
            access_token = jwt.encode({
                'user': {
                    'id': str(user['_id']), 
                    'fullName': user['fullName'],
                    'email': email
                },
                'exp': datetime.utcnow().replace(tzinfo=timezone.utc) + timedelta(minutes=30)
            }, app.config['SECRET_KEY'], algorithm='HS256')

            return jsonify({
                'error': False,
                'message': 'Login Successful',
                'email': email,
                'accessToken': access_token
            }), 200
        else:
            return jsonify({'error': True, 'message': 'Invalid credentials'}), 401

    except Exception as e:
        return jsonify({'error': True, 'message': str(e)}), 500

@app.route('/get-tasks', methods=['GET'])
def get_tasks():
    try:
        decoded_token, user_id = g.user
        if not user_id:
            return jsonify({'error': True, 'message': 'User ID not found in token'}), 401

        user_tasks = list(tasks_collection.find({'userId': user_id}))

        for task in user_tasks:
            task['_id'] = str(task['_id'])
            task['userId'] = str(task['userId'])  

        return jsonify({'error': False, 'tasks': user_tasks}), 200

    except Exception as e:
        return jsonify({'error': True, 'message': str(e)}), 500

@app.route('/add-task', methods=['POST'])
def add_task():
    try:
        decoded_token, user_id = g.user

        if not user_id:
            return jsonify({'error': True, 'message': 'User ID not found in token'}), 401
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        due_date = data.get('due_date')

        if not title:
            return jsonify({'error': True, 'message': 'Title is required'}), 400
        if not description:
            return jsonify({'error': True, 'message': 'Description is required'}), 400
        
        new_task = {
            'title': title,
            'description': description,
            'due_date': due_date,
            'userId': user_id,
            'status': 'pending', 
            'created_on': datetime.now(timezone.utc)
        }

        tasks_collection.insert_one(new_task)

        return jsonify({'error': False, 'message': 'Task Added Successfully'}), 200

    except Exception as e:
        return jsonify({'error': True, 'message': str(e)}), 500

@app.route('/edit-task/<task_id>', methods=['PUT'])
def edit_task(task_id):
    try:
        decoded_token, user_id = g.user
        if not user_id:
            return jsonify({'error': True, 'message': 'User ID not found in token'}), 401

        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        due_date = data.get('due_date')
        status = data.get('status')

        if not title and not description and not due_date and not status:
            return jsonify({'error': True, 'message': 'No data provided for update'}), 400

        task = tasks_collection.find_one({'_id': ObjectId(task_id)})
        if not task:
            return jsonify({'error': True, 'message': 'Task not found'}), 404

        updated_data = {}
        if title:
            updated_data['title'] = title
        if description:
            updated_data['description'] = description
        if due_date:
            updated_data['due_date'] = due_date
        if status:
            updated_data['status'] = status

        tasks_collection.update_one({'_id': ObjectId(task_id)}, {'$set': updated_data})
        return jsonify({'error': False, 'message': 'Task updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': True, 'message': str(e)}), 500

@app.route('/delete-task/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    try:
        decoded_token, user_id = g.user
        if not user_id:
            return jsonify({'error': True, 'message': 'User ID not found in token'}), 401

        task = tasks_collection.find_one({'_id': ObjectId(task_id)})
        if not task:
            return jsonify({'error': True, 'message': 'Task not found'}), 404

        result = tasks_collection.delete_one({'_id': ObjectId(task_id)})

        if result.deleted_count == 1:
            return jsonify({'error': False, 'message': 'Task deleted successfully'}), 200
        else:
            return jsonify({'error': True, 'message': 'Failed to delete task'}), 500

    except Exception as e:
        return jsonify({'error': True, 'message': str(e)}), 500

@app.route('/update-task-status/<task_id>', methods=['PUT'])
def update_task_status(task_id):
    try:
        decoded_token, user_id = g.user
        if not user_id:
            return jsonify({'error': True, 'message': 'User ID not found in token'}), 401

        data = request.get_json()
        status = data.get('status')

        if not status:
            return jsonify({'error': True, 'message': 'Status is required'}), 400

        task = tasks_collection.find_one({'_id': ObjectId(task_id), 'userId': user_id})
        if not task:
            return jsonify({'error': True, 'message': 'Task not found or user does not have access'}), 404

        tasks_collection.update_one({'_id': ObjectId(task_id)}, {'$set': {'status': status}})

        return jsonify({'error': False, 'message': 'Task status updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': True, 'message': str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
