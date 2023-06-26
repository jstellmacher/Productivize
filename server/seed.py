#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
from models import User, Page, Block, TextBlock, HeadingBlock, ImageBlock, VideoBlock, BulletedListBlock, \
    NumberedListBlock, ToggleBlock, QuoteBlock, DividerBlock, CalloutBlock, CodeBlock, Input

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
                "email": fake.email()
            }
            user = User(**user_data)
            user.password_hash = password  # Set the password hash using the updated method
            db.session.add(user)

        # Example: Creating sample pages associated with users
        users = User.query.all()
        for _ in range(10):
            page_data = {
                "title": fake.sentence(),
                "user_id": rc(users).id  # Use user_id to assign the user relationship
            }
            page = Page(**page_data)
            db.session.add(page)

        # Example: Creating sample blocks associated with pages
        pages = Page.query.all()
        for page in pages:
            for _ in range(randint(1, 5)):
                block_type = rc(["text_block", "heading_block", "image_block", "video_block",
                                 "bulleted_list_block", "numbered_list_block", "toggle_block",
                                 "quote_block", "divider_block", "callout_block", "code_block"])  # Choose a random block type
                block_data = {
                    "type": block_type,
                    "title": fake.sentence(),
                    "content": fake.paragraph(),
                    "page_id": page.id  # Use page_id to assign the page relationship
                }

                # Create a block based on its type
                if block_type == "text_block":
                    block = TextBlock(**block_data)
                elif block_type == "heading_block":
                    block = HeadingBlock(**block_data)
                elif block_type == "image_block":
                    block = ImageBlock(**block_data)
                elif block_type == "video_block":
                    block = VideoBlock(**block_data)
                elif block_type == "bulleted_list_block":
                    block = BulletedListBlock(**block_data)
                elif block_type == "numbered_list_block":
                    block = NumberedListBlock(**block_data)
                elif block_type == "toggle_block":
                    block = ToggleBlock(**block_data)
                elif block_type == "quote_block":
                    block = QuoteBlock(**block_data)
                elif block_type == "divider_block":
                    block = DividerBlock(**block_data)
                elif block_type == "callout_block":
                    block = CalloutBlock(**block_data)
                elif block_type == "code_block":
                    block = CodeBlock(**block_data)
                else:
                    # Handle unsupported block types or add additional block types as needed
                    continue

                # Add random inputs to the block
                for _ in range(randint(1, 3)):
                    input_data = {
                        "label": fake.word(),
                        "placeholder": fake.sentence(),
                        "value": fake.word(),
                        "block_id": block.id
                    }
                    input_field = Input(**input_data)
                    block.inputs.append(input_field)

                db.session.add(block)

        # Commit the changes to the database
        db.session.commit()

        print("Seed completed successfully!")
