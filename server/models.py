from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import relationship
from config import db
from datetime import datetime

# Models go here!
class User(SerializerMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    pages = relationship('Page', backref='user') # Relationship with 'pages' table


# User:
# Represents a user in the application.
# Attributes: id, username, password, email, and created_at.
# Relationships:
# One-to-many relationship with Page: Each user can have multiple pages.

class Page(SerializerMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    tags = relationship('Tag', secondary='page_tags', backref='pages')  # Relationship with 'tags' table
    collaborators = relationship('User', secondary='collaborators', backref='pages')  # Relationship with 'collaborators' table

# Page:

# Represents a page in the application.
# Attributes: id, title, content, created_at, and user_id.
# Relationships:
# Many-to-one relationship with User: Each page belongs to a single user.
# Many-to-many relationship with Tag: Each page can have multiple tags.
# Many-to-many relationship with User (as collaborators): Each page can have multiple collaborators.

class Tag(SerializerMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

# Tag:

# Represents a tag that can be assigned to a page.
# Attributes: id and name.
# Relationships:
# Many-to-many relationship with Page: Each tag can be associated with multiple pages.

class PageTag(SerializerMixin, db.Model):
    __tablename__ = 'page_tags'
    page_id = db.Column(db.Integer, db.ForeignKey('page.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), primary_key=True)

# PageTag:

# Represents the association between Page and Tag for the many-to-many relationship.
# Attributes: page_id and tag_id.


class Collaborator(SerializerMixin, db.Model):
    __tablename__ = 'collaborators'
    page_id = db.Column(db.Integer, db.ForeignKey('page.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)

# Collaborator:

# Represents the association between Page and User for the many-to-many relationship (as collaborators).
# Attributes: page_id and user_id.