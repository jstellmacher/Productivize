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
        
        return {'message': 'Page created successfully'}, 201


class BlockResource(Resource):
    def post(self, page_id):
        # Create a new block within a page
        data = request.get_json()
        content = data.get('content')
        
        # Validate and handle block creation logic
        
        return {'message': 'Block created successfully'}, 201


# Add the resource routes
api.add_resource(UserResource, "/users")
api.add_resource(PageResource, "/pages", "/pages/<int:page_id>")
api.add_resource(BlockResource, "/pages/<int:page_id>/blocks")

if __name__ == "__main__":
    app.run(debug=True)
