from mongoengine import Document, StringField, DateTimeField
import datetime

class User(Document):
    fullName = StringField(required=True)
    email = StringField(required=True)
    password = StringField(required=True)
    created_on = DateTimeField(default=datetime.datetime.now)

class Task(Document):
    title = StringField(required=True)
    description = StringField(required=True)
    due_date = DateTimeField(default=datetime.datetime.now)
    userId = StringField(required=True)
    status = StringField(default="pending") 
    created_on = DateTimeField(default=datetime.datetime.now)