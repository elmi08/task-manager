import jwt
from flask import request
from dotenv import load_dotenv
import os

load_dotenv()


def authenticate_token(request):
    token = None

    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split()[1]
    
    if not token:
        if request.is_json:
            token = request.json.get('accessToken', None)
        else:
            token = request.form.get('accessToken', None)
    
    if not token:
        return None, None 

    try:
        decoded_token = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=["HS256"])
        user_id = decoded_token['user']['id']  
        return decoded_token, user_id
    except jwt.ExpiredSignatureError:
        return "Token expired. Please log in again.", None
    except jwt.InvalidTokenError:
        return "Invalid token. Please log in again.", None
    except Exception as e:
       
        return str(e), None
