from sqlalchemy_serializer import SerializerMixin

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    pages = db.relationship('Page', backref='user', lazy=True)

class Page(db.Model, SerializerMixin):
    __tablename__ = 'pages'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    blocks = db.relationship('Block', backref='page', lazy=True)

class Block(db.Model, SerializerMixin):
    __tablename__ = 'blocks'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    page_id = db.Column(db.Integer, db.ForeignKey('pages.id'), nullable=False)
