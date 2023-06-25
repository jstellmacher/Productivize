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

    serialize_rules = ("-pages._password_hash", "-pages.blocks._password_hash")

    def check_password(self, password):
        print('self._password_hash:', self._password_hash)
        print('password:', password)
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

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
    type = db.Column(db.String(100), nullable=False)  # Add a type field to identify the block type
    title = db.Column(db.String(100), nullable=False)  # Add a title field for the block
    content = db.Column(db.Text, nullable=False)
    page_id = db.Column(db.Integer, db.ForeignKey('pages.id'), nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': 'block',
        'polymorphic_on': type
    }


class TextBlock(Block):
    __tablename__ = 'text_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'text_block'
    }


class HeadingBlock(Block):
    __tablename__ = 'heading_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'heading_block'
    }


class ImageBlock(Block):
    __tablename__ = 'image_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'image_block'
    }


class VideoBlock(Block):
    __tablename__ = 'video_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'video_block'
    }


class BulletedListBlock(Block):
    __tablename__ = 'bulleted_list_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'bulleted_list_block'
    }


class NumberedListBlock(Block):
    __tablename__ = 'numbered_list_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'numbered_list_block'
    }


class ToggleBlock(Block):
    __tablename__ = 'toggle_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'toggle_block'
    }


class QuoteBlock(Block):
    __tablename__ = 'quote_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'quote_block'
    }


class DividerBlock(Block):
    __tablename__ = 'divider_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'divider_block'
    }


class CalloutBlock(Block):
    __tablename__ = 'callout_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'callout_block'
    }


class CodeBlock(Block):
    __tablename__ = 'code_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'code_block'
    }
