from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from sqlalchemy import Column, DateTime


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    _password_hash = db.Column('password_hash', db.String(128))
    email = db.Column(db.String(100), unique=True, nullable=False)
    pages = db.relationship('Page', backref='user', lazy=True)
    events = db.relationship('CalendarEvent', backref='user', lazy=True)

    serialize_rules = ("-_password_hash", "-pages.user", "-pages.user",)

    @hybrid_property
    def password(self):
        raise Exception('Password hashes may not be viewed.')

    @password.setter
    def password(self, password):
        self._password_hash = generate_password_hash(password)

    def check_password(self, password):
        if password is None:
            return False
        return check_password_hash(self._password_hash, password)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }


class CalendarEvent(db.Model):
    __tablename__ = 'calendar_events'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    start = db.Column(db.DateTime, nullable=False)
    end = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'start': self.start.isoformat(),
            'end': self.end.isoformat(),
            'user_id': self.user_id
        } 


class Page(db.Model, SerializerMixin):
    __tablename__ = 'pages'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow)

    blocks = db.relationship('Block', backref='page')

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'created_at': self.created_at.isoformat(),
            'user': self.user.serialize(),
            'blocks': [block.to_dict() for block in self.blocks]  # Serialize the associated user object
        }


class Block(db.Model, SerializerMixin):
    __tablename__ = 'blocks'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    type = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    page_id = db.Column(db.Integer, db.ForeignKey('pages.id'), nullable=False)
    inputs = db.relationship('Input', backref='block', lazy=True)

    __mapper_args__ = {
        'polymorphic_identity': 'block',
        'polymorphic_on': type
    }

    def serialize(self):
        return {
            'id': self.id,
            'type': self.type,
            'title': self.title,
            'content': self.content,
            'page_id': self.page_id,
            'inputs': [input.serialize() for input in self.inputs]
        }


class Input(db.Model):
    __tablename__ = 'inputs'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label = db.Column(db.String(100), nullable=False)
    value = db.Column(db.String(100))  # Add this column
    input_type = db.Column(db.String(50), nullable=False)
    placeholder = db.Column(db.String(100))
    block_id = db.Column(db.Integer, db.ForeignKey('blocks.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'label': self.label,
            'value': self.value,
            'input_type': self.input_type,
            'placeholder': self.placeholder,
            'block_id': self.block_id
        }


class TextBlock(Block):
    __tablename__ = 'text_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'text_block'
    }

    def serialize(self):
        serialized_data = super().serialize()
        serialized_data['text_specific_attribute'] = 'text_specific_value'
        return serialized_data


class HeadingBlock(Block):
    __tablename__ = 'heading_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'heading_block'
    }

    def serialize(self):
        serialized_data = super().serialize()
        serialized_data['heading_specific_attribute'] = 'heading_specific_value'
        return serialized_data


class ImageBlock(Block):
    __tablename__ = 'image_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'image_block'
    }

    def serialize(self):
        serialized_data = super().serialize()
        serialized_data['image_specific_attribute'] = 'image_specific_value'
        return serialized_data


class VideoBlock(Block):
    __tablename__ = 'video_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'video_block'
    }

    def serialize(self):
        serialized_data = super().serialize()
        serialized_data['video_specific_attribute'] = 'video_specific_value'
        return serialized_data


class BulletedListBlock(Block):
    __tablename__ = 'bulleted_list_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'bulleted_list_block'
    }

    def serialize(self):
        serialized_data = super().serialize()
        serialized_data['bulleted_list_specific_attribute'] = 'bulleted_list_specific_value'
        return serialized_data


class NumberedListBlock(Block):
    __tablename__ = 'numbered_list_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'numbered_list_block'
    }

    def serialize(self):
        serialized_data = super().serialize()
        serialized_data['numbered_list_specific_attribute'] = 'numbered_list_specific_value'
        return serialized_data


class ToggleBlock(Block):
    __tablename__ = 'toggle_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'toggle_block'
    }

    def serialize(self):
        serialized_data = super().serialize()
        serialized_data['toggle_specific_attribute'] = 'toggle_specific_value'
        return serialized_data


class QuoteBlock(Block):
    __tablename__ = 'quote_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'quote_block'
    }

    def serialize(self):
        serialized_data = super().serialize()
        serialized_data['quote_specific_attribute'] = 'quote_specific_value'
        return serialized_data