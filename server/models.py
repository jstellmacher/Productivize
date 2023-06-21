from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    _password_hash = db.Column(db.String(100), nullable=False)
    
    email = db.Column(db.String(100), unique=True, nullable=False)
    pages = db.relationship('Page', backref='user', lazy=True)

    serialize_rules = ("-_password_hash",)
    # research this for better understanding^

    def check_password(self, password):
        return bcrypt.check_password_hash(_password_hash, password.encode('utf-8'))

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

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
