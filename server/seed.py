#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from config import db
from models import User, Page, Tag, PageTag, Collaborator

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Seed code starts here

        # Create fake users
        users = []
        for _ in range(10):
            user = User(
                username=fake.user_name(),
                password=fake.password(),
                email=fake.email()
            )
            users.append(user)
        db.session.add_all(users)
        db.session.commit()

        # Create fake pages
        pages = []
        for _ in range(20):
            page = Page(
                title=fake.sentence(),
                content=fake.paragraph(),
                user_id=rc(users).id
            )
            pages.append(page)
        db.session.add_all(pages)
        db.session.commit()

        # Create fake tags
        tags = []
        for _ in range(5):
            tag = Tag(name=fake.word())
            tags.append(tag)
        db.session.add_all(tags)
        db.session.commit()

        # Assign tags to pages
        for page in pages:
            page_tags = rc(tags, randint(1, 3), replace=False)
            page.tags.extend(page_tags)
        db.session.commit()

        # Assign collaborators to pages
        for page in pages:
            page_collaborators = rc(users, randint(1, 3), replace=False)
            page.collaborators.extend(page_collaborators)
        db.session.commit()

        print("Seeding completed.")
