#!/usr/bin/env python3

# Remote library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
from models import User, Page, Block, TextBlock, HeadingBlock, ImageBlock, VideoBlock, BulletedListBlock, \
    NumberedListBlock, ToggleBlock, QuoteBlock, Input
from werkzeug.security import generate_password_hash

if __name__ == '__main__':
    fake = Faker()

    with app.app_context():
        # Drop existing tables and recreate them
        db.drop_all()
        db.create_all()

        print("Starting seed...")

        # Seed code goes here!
        # Example: Creating sample users
        for _ in range(5):
            password = fake.password()
            user_data = {
                "username": fake.user_name(),
                "email": fake.email(),
            }
            user = User(**user_data)
            user.password = generate_password_hash(password)  # Use generate_password_hash to set the hashed password
            db.session.add(user)

        # Example: Creating sample pages associated with users
        users = User.query.all()
        
            # Example: Creating sample pages associated with users
        for _ in range(10):
            page_data = {
                "title": fake.sentence(),
                "user_id": fake.random_element(users).id if users else None
            }
            page = Page(**page_data)
            db.session.add(page)



        # Example: Creating sample blocks associated with pages
        pages = Page.query.all()
        for page in pages:
            for _ in range(fake.random_int(1, 5)):
                # Create the block without assigning the page relationship
                block_type = fake.random_element(["TextBlock", "HeadingBlock", "ImageBlock", "VideoBlock",
                                                "BulletedListBlock", "NumberedListBlock", "ToggleBlock",
                                                "QuoteBlock"])  # Choose a random block type
                block_data = {
                    "title": fake.sentence(),
                    "content": fake.paragraph(),
                    "page_id": page.id  # Use page_id to assign the page relationship
                }

                # Create a block based on its type
                if block_type == "TextBlock":
                    block = TextBlock(**block_data)
                elif block_type == "HeadingBlock":
                    block = HeadingBlock(**block_data)
                elif block_type == "ImageBlock":
                    block = ImageBlock(**block_data)
                elif block_type == "VideoBlock":
                    block = VideoBlock(**block_data)
                elif block_type == "BulletedListBlock":
                    block = BulletedListBlock(**block_data)
                elif block_type == "NumberedListBlock":
                    block = NumberedListBlock(**block_data)
                elif block_type == "ToggleBlock":
                    block = ToggleBlock(**block_data)
                elif block_type == "QuoteBlock":
                    block = QuoteBlock(**block_data)
                else:
                    # Handle unsupported block types or add additional block types as needed
                    continue

                # Add random inputs to the block
                db.session.add(block)  # Add the block to the session to generate the block_id
                db.session.commit()  # Commit the session to generate the block_id

                # Get the dynamically generated block_id
                block_id = block.id

                for _ in range(randint(1, 3)):
                    input_data = {
                        "label": fake.word(),
                        "input_type": rc(["text", "number", "checkbox"]),
                        "placeholder": fake.sentence(),
                        "block_id": block_id,  # Use the dynamically generated block_id
                        "value": None  # Add any desired default values for the inputs
                    }
                    input_ = Input(**input_data)
                    db.session.add(input_)

        # Commit all changes to the database
        db.session.commit()

        print("Seed completed successfully!")
