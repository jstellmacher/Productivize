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
            user = User(
                username=fake.user_name(),
                password=fake.password(),
                email=fake.email()
            )
            db.session.add(user)

        # Example: Creating sample pages associated with users
        users = User.query.all()
        for _ in range(10):
            page = Page(
                title=fake.sentence(),
                user=rc(users)
            )
            db.session.add(page)

        # Example: Creating sample blocks associated with pages
        pages = Page.query.all()
        for page in pages:
            for _ in range(randint(1, 5)):
                block = Block(
                    content=fake.paragraph(),
                    page=page
                )
                db.session.add(block)

        # Commit the changes to the database
        db.session.commit()

        print("Seed completed successfully!")
