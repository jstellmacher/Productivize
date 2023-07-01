from flask import request, session
import random
from flask_restful import Resource
from config import app, api, db
from models import User, Page, Block, TextBlock, HeadingBlock, ImageBlock
from werkzeug.security import generate_password_hash, check_password_hash

class UserResource(Resource):
    def post(self):
        # User login
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            # Login successful
            session['user_id'] = user.id
            return user.to_dict(), 200
        else:
            # Login failed
            return {'message': 'Invalid username or password'}, 401

    def delete(self):
        # User logout
        session.pop('user_id', None)
        session.clear()
        return {'message': 'Logout successful'}, 200

    def get(self):
        # Check user session
        user_id = session.get('user_id')
        if user_id:
            user = db.session.get(User, user_id)
            if user:
                return user.to_dict(), 200

        return {'message': 'User not authenticated'}, 401


class SignUpResource(Resource):
    def post(self):
        # Sign up a new user
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        # Create a new user object
        new_user = User(username=username, email=email)
        new_user.password = password  # Set the password

        # Save the user to the database
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id

        return new_user.to_dict(), 201


class PageResource(Resource):
    def get(self, page_id=None):
        if page_id is None:
            # Get all pages
            pages = Page.query.all()
            # Serialize and return the pages
            serialized_pages = [page.to_dict() for page in pages]
            return serialized_pages, 200
        else:
            # Get a specific page
            page = Page.query.get(page_id)
            if page is None:
                return {'message': 'Page not found'}, 404
            # Serialize and return the page
            return page.to_dict(), 200

    def post(self, page_id=None):
        if page_id is None:
            # Generate a new unique page ID
            page_id = generate_page_id()

        # Create a new page
        data = request.get_json()

        # Obtain the user_id from the session
        user_id = session.get('user_id')

        # Create a new page object with the title as the page ID
        new_page = Page(id=page_id, title=str(page_id), user_id=user_id)

        # Save the page to the database
        db.session.add(new_page)
        db.session.commit()

        return {'message': 'Page created successfully', 'page_id': new_page.id}, 201

    def patch(self, page_id):
        # Update an existing page's title
        data = request.get_json()
        title = data.get('title')

        page = db.session.get(Page, page_id)
        if page is None:
            return {'message': 'Page not found'}, 404

        # Update the page's title
        page.title = title
        db.session.commit()

        return {'message': 'Page title updated successfully'}, 200

    def delete(self, page_id):
        # Delete an existing page
        page = db.session.get(Page, page_id)
        if page is None:
            return {'message': 'Page not found'}, 404

        # Delete the page
        db.session.delete(page)
        db.session.commit()

        return {'message': 'Page deleted successfully'}, 200


class DeleteAccountResource(Resource):
    def delete(self):
        # Delete user account
        user_id = session.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            if user:
                # Delete associated pages before deleting the user
                pages = Page.query.filter_by(user_id=user_id).all()
                for page in pages:
                    page.user_id = None

                # Delete the user from the database
                db.session.delete(user)
                db.session.commit()

                session.pop('user_id', None)
                session.clear()

                return {'message': 'Account deleted successfully'}, 200

        return {'message': 'User not authenticated'}, 401


class BlockResource(Resource):
    def post(self, page_id):
        data = request.get_json()
        block_type = data.get('type')
        content = data.get('content')

        block = None
        if block_type == 'text':
            block = TextBlock(content=content)
        elif block_type == 'heading':
            block = HeadingBlock(content=content)
        elif block_type == 'image':
            block = ImageBlock(content=content)
        elif block_type == 'video':
            block = VideoBlock(content=content)
        elif block_type == 'bulleted_list':
            block = BulletedListBlock(content=content)
        elif block_type == 'numbered_list':
            block = NumberedListBlock(content=content)
        elif block_type == 'toggle':
            block = ToggleBlock(content=content)
        elif block_type == 'quote':
            block = QuoteBlock(content=content)

        if block:
            page = db.session.get(Page, page_id)
            if page is None:
                return {'message': 'Page not found'}, 404

            block_name = generate_block_name(page_id)
            block.name = block_name

            page.blocks.append(block)
            db.session.commit()

            return {
                'message': 'Block created successfully',
                'block_name': block_name,
                'block_id': block.id
            }, 201
        else:
            return {'message': 'Invalid block type'}, 400


def generate_block_name(page_id):
    # Retrieve the existing block names for the given page_id
    existing_block_names = [block.name for block in Block.query.filter_by(page_id=page_id).all()]

    while True:
        # Generate a new block name (e.g., "block_1", "block_2", etc.)
        new_id = random.randint(1, 1000)
        new_block_name = f'block_{new_id}'

        if new_block_name not in existing_block_names:
            return new_block_name


def generate_page_id():
    # Retrieve the existing page IDs
    existing_page_ids = [page.id for page in Page.query.all()]

    new_id = random.randint(1, 1000)
    while new_id in existing_page_ids:
        new_id = random.randint(1, 1000)

    return new_id


api.add_resource(UserResource, "/users")
api.add_resource(SignUpResource, "/signup")
api.add_resource(PageResource, "/pages", "/pages/<int:page_id>")
api.add_resource(BlockResource, "/pages/<int:page_id>/blocks")
api.add_resource(DeleteAccountResource, "/accountDelete")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
