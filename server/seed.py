#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Page, Block

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Drop existing tables and recreate them
        db.drop_all()
        db.create_all()

        # Seed code goes here!
        # Example: Creating sample users
        for _ in range(5):
            password = fake.password()
            user_data = {
                "username": fake.user_name(),
                "email": fake.email()
            }
            user = User(**user_data)
            user.password_hash = password  # Set the password hash
            db.session.add(user)

        # Example: Creating sample pages associated with users
        users = User.query.all()
        for _ in range(10):
            page_data = {
                "title": fake.sentence(),
                "user": rc(users)
            }
            page = Page(**page_data)
            db.session.add(page)

        # Example: Creating sample blocks associated with pages
        pages = Page.query.all()
        for page in pages:
            for _ in range(randint(1, 5)):
                block_type = rc(["text", "image", "video"])  # Choose a random block type
                block_data = {
                    "type": block_type,
                    "content": fake.paragraph(),
                    "page": page
                }
                block = Block(**block_data)
                db.session.add(block)

        # Commit the changes to the database
        db.session.commit()

        print("Seed completed successfully!")
