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
        if password is None:
            return False
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

    def serialize(self):
        # Serialize the page object to a dictionary
        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'blocks': [block.serialize() for block in self.blocks]
        }


class Block(db.Model, SerializerMixin):
    __tablename__ = 'blocks'

    id = db.Column(db.Integer, primary_key=True)
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
        # Serialize the block object to a dictionary
        return {
            'id': self.id,
            'type': self.type,
            'title': self.title,
            'content': self.content,
            'page_id': self.page_id,
            'inputs': [input.serialize() for input in self.inputs]
        }


class Input(db.Model, SerializerMixin):
    __tablename__ = 'inputs'

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(100), nullable=False)
    value = db.Column(db.String(100), nullable=False)
    placeholder = db.Column(db.String(100), nullable=False)
    block_id = db.Column(db.Integer, db.ForeignKey('blocks.id'), nullable=False)

    def serialize(self):
        # Serialize the input object to a dictionary
        return {
            'id': self.id,
            'label': self.label,
            'value': self.value,
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
        # Serialize the text block object to a dictionary
        return super().serialize()


class HeadingBlock(Block):
    __tablename__ = 'heading_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'heading_block'
    }

    def serialize(self):
        # Serialize the heading block object to a dictionary
        return super().serialize()


class ImageBlock(Block):
    __tablename__ = 'image_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'image_block'
    }

    def serialize(self):
        # Serialize the image block object to a dictionary
        return super().serialize()


class VideoBlock(Block):
    __tablename__ = 'video_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'video_block'
    }

    def serialize(self):
        # Serialize the video block object to a dictionary
        return super().serialize()


class BulletedListBlock(Block):
    __tablename__ = 'bulleted_list_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'bulleted_list_block'
    }

    def serialize(self):
        # Serialize the bulleted list block object to a dictionary
        return super().serialize()


class NumberedListBlock(Block):
    __tablename__ = 'numbered_list_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'numbered_list_block'
    }

    def serialize(self):
        # Serialize the numbered list block object to a dictionary
        return super().serialize()


class ToggleBlock(Block):
    __tablename__ = 'toggle_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'toggle_block'
    }

    def serialize(self):
        # Serialize the toggle block object to a dictionary
        return super().serialize()


class QuoteBlock(Block):
    __tablename__ = 'quote_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'quote_block'
    }

    def serialize(self):
        # Serialize the quote block object to a dictionary
        return super().serialize()


class DividerBlock(Block):
    __tablename__ = 'divider_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'divider_block'
    }

    def serialize(self):
        # Serialize the divider block object to a dictionary
        return super().serialize()


class CalloutBlock(Block):
    __tablename__ = 'callout_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'callout_block'
    }

    def serialize(self):
        # Serialize the callout block object to a dictionary
        return super().serialize()


class CodeBlock(Block):
    __tablename__ = 'code_blocks'

    id = db.Column(db.Integer, db.ForeignKey('blocks.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'code_block'
    }

    def serialize(self):
        # Serialize the code block object to a dictionary
        return super().serialize()
