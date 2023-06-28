from flask import request, session, jsonify
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
        # import ipdb
        # ipdb.set_trace()
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
            user = User.query.get(user_id)
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
            return {'pages': [page.serialize() for page in pages]}
        else:
            # Get a specific page
            page = Page.query.get(page_id)
            if page is None:
                return {'message': 'Page not found'}, 404
            # Serialize and return the page
            return page.serialize()

    def post(self, page_id):
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





    def put(self, page_id):
        # Update an existing page
        data = request.get_json()
        title = data.get('title')

        # Validate and handle page update logic

        page = Page.query.get(page_id)
        if page is None:
            return {'message': 'Page not found'}, 404

        # Update the page
        page.title = title
        db.session.commit()

        return {'message': 'Page updated successfully'}, 200

    def delete(self, page_id):
        # Delete an existing page
        page = Page.query.get(page_id)
        if page is None:
            return {'message': 'Page not found'}, 404

        # Delete the page
        db.session.delete(page)
        db.session.commit()

        return {'message': 'Page deleted successfully'}, 200


class BlockResource(Resource):
    def post(self, page_id):
        # Create a new block within a page
        data = request.get_json()
        block_type = data.get('type')
        content = data.get('content')

        # Validate and handle block creation logic

        block = None
        if block_type == 'text':
            block = TextBlock(content=content)
        elif block_type == 'heading':
            block = HeadingBlock(content=content)
        elif block_type == 'image':
            block = ImageBlock(content=content)

        if block:
            page = Page.query.get(page_id)
            if page is None:
                return {'message': 'Page not found'}, 404

            page.blocks.append(block)
            db.session.commit()

            return {'message': 'Block created successfully', 'block_id': block.id}, 201
        else:
            return {'message': 'Invalid block type'}, 400


api.add_resource(UserResource, "/users")
api.add_resource(SignUpResource, "/signup")
api.add_resource(PageResource, "/pages", "/pages/<int:page_id>")
api.add_resource(BlockResource, "/pages/<int:page_id>/blocks")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
