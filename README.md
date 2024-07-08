# Simple Task Manager #
- This is a Task Management app developed with a Python Backend Api and a Vite-React Frontend. Feel Free to Star the Repo

## For Development ###
Clone project and go into the directory
``` bash
git clone https://github.com/elmi08/task-manager.git
cd task-manager
```
### MongoDB Connection ###
- Go to the MongoDB Atlas Website and Sign Up for an account (https://account.mongodb.com/account/login). If you have an account, Login
- Create a Database Cluster. Make sure you use the free database!!! - (M0)
- Create the Database User
- Choose the python driver
- Copy the MongoDb Connenction String
- Go into the backend folder. Paste the MongoDb Connection String to the MONGO_URI variable in the .env file.
```bash
SECRET_KEY="TUddhIspHhh1Atg"

MONGO_URI=mongodb+srv://elmimoha08:Z3MO7zjDD0g4xEJq@task-mnager.vlssbzv.mongodb.net/?retryWrites=true&w=majority&appName=Task-Manager
```
- Change the database name "Task-Manager-Database" in the server.py to the name you gave to your Cluster
```bash
db = client.get_database("Task-Manager-Database")
```
### Access Token ###
- Generate an Access Token and paste it to the ACCESS_TOKEN variable. Go to this website to generate an access token (https://randomkeygen.com/)

### Start Backend Server ###
- Go into the backend folder and run the following commands:

Install requirements.
```bash
pip install -r requirements.txt
```
Activate virtual environment
```bash
source venv/bin/activate
```
Start server
```bash
python3 server.py
```

### Start Frontend Server ###
- Go into the frontend folder and run the following commands:

Install dependancies
```bash
npm install
```
Start frontend
```bash
npm run dev
```

### Build Application ###
- Go into the frontend folder and run the following commands:

Build Application
```bash
npm run build
```

# For Production #
- To Run the application in Docker. Go to the project folder and use the following command:
```bash
docker-compose up 
```



