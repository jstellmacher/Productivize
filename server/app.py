from flask import request, session
from flask_restful import Resource
from config import app, api, db
from models import User, Page, Block


class UserResource(Resource):
    def post(self):
        # Create a new user
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        
        # Validate and handle user creation logic
        
        return {'message': 'User created successfully'}, 201

    def login(self):
        # Handle user login
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        # Validate and handle login logic
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            # Login successful
            session['user_id'] = user.id
            return user.to_dict(), 200
        else:
            # Login failed
            return {'message': 'Invalid username or password'}, 401

    def logout(self):
        session.clear()
        return {"message": "Logout successful! Have a great day!"}, 200

    def get(self):
        # Check the authentication status
        if 'user_id' in session:
            # User is authenticated
            user_id = session['user_id']
            user = User.query.get(user_id)
            if user:
                # Access the user's pages relationship
                user_pages = user.pages
                return {'pages': [page.serialize() for page in user_pages]}, 200
        return {'message': 'Not authenticated'}, 401




class SignUpResource(Resource):
    def post(self):
        # Sign up a new user
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        
        # Validate and handle user sign-up logic
        
        # Create a new user object
        new_user = User(username=username,email=email)
        new_user.password_hash = password
        
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

    def post(self):
        # Create a new page
        data = request.get_json()
        title = data.get('title')
        
        # Validate and handle page creation logic
        
        # Create a new page object
        new_page = Page(title=title, user_id=session['user_id'])
        
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
        content = data.get('content')
        
        # Validate and handle block creation logic
        
        # Create a new block object
        new_block = Block(content=content, page_id=page_id)
        
        # Save the block to the database
        db.session.add(new_block)
        db.session.commit()
        
        return {'message': 'Block created successfully', 'block_id': new_block.id}, 201

    def put(self, page_id, block_id):
        # Update an existing block
        data = request.get_json()
        content = data.get('content')

        # Validate and handle block update logic

        block = Block.query.filter_by(id=block_id, page_id=page_id).first()
        if block is None:
            return {'message': 'Block not found'}, 404

        # Update the block
        block.content = content
        db.session.commit()

        return {'message': 'Block updated successfully'}, 200

    def delete(self, page_id, block_id):
        # Delete an existing block
        block = Block.query.filter_by(id=block_id, page_id=page_id).first()
        if block is None:
            return {'message': 'Block not found'}, 404

        # Delete the block
        db.session.delete(block)
        db.session.commit()

        return {'message': 'Block deleted successfully'}, 200


# Add the resource routes
api.add_resource(UserResource, "/users", "/users/login")
api.add_resource(SignUpResource, "/signup")
api.add_resource(PageResource, "/pages", "/pages/<int:page_id>")
api.add_resource(BlockResource, "/pages/<int:page_id>/blocks")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
