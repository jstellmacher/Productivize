from flask import request, session, jsonify
import random
from datetime import datetime, timezone
from flask_restful import Resource
from config import app, api, db
from models import User, Page, Block, TextBlock, HeadingBlock, ImageBlock, CalendarEvent, user_calendar_event_association
from werkzeug.security import generate_password_hash, check_password_hash
from dateutil.parser import parse
from werkzeug.utils import secure_filename
import os

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

    def patch(self):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': 'User not authenticated'}, 401

        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404

        username = request.json.get('username')
        password = request.json.get('password')
        profile_picture = request.json.get('profilePicture')

        if username:
            user.username = username

        if password:
            user.password = password

        if profile_picture:
            # Save the profile picture file to a desired directory
            filename = secure_filename(profile_picture)
            # Add the code to save the file or update the user's profile picture field
            user.profile_picture = filename

        db.session.commit()

        return user.to_dict(), 200




# class UserResource(Resource):
#     def post(self):
#         # User login
#         data = request.get_json()
#         username = data.get('username')
#         password = data.get('password')

#         user = User.query.filter_by(username=username).first()

#         if user and user.check_password(password):
#             # Login successful
#             session['user_id'] = user.id
#             return user.to_dict(), 200
#         else:
#             # Login failed
#             return {'message': 'Invalid username or password'}, 401

#     def delete(self):
#         # User logout
#         session.pop('user_id', None)
#         session.clear()
#         return {'message': 'Logout successful'}, 200

#     def get(self):
#         # Check user session
#         user_id = session.get('user_id')
#         if user_id:
#             user = db.session.get(User, user_id)
#             if user:
#                 return user.to_dict(), 200

#         return {'message': 'User not authenticated'}, 401


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

    # def put(self, page_id):
    #     # Update an existing page
    #     data = request.get_json()
    #     title = data.get('title')

    #     # Validate and handle page update logic

    #     page = db.session.get(Page, page_id)
    #     if page is None:
    #         return {'message': 'Page not found'}, 404

    #     # Update the page
    #     page.title = title
    #     db.session.commit()

    #     return {'message': 'Page updated successfully'}, 200

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

# class CalendarEventResource(Resource):
#     def get(self, event_id=None):
#         if event_id is None:
#             # Get all events
#             events = CalendarEvent.query.all()
#             # Serialize and return the events
#             serialized_events = [event.to_dict() for event in events]
#             return serialized_events, 200
#         else:
#             # Get a specific event
#             event = CalendarEvent.query.get(event_id)
#             if event:
#                 return event.to_dict(), 200
#             else:
#                 return {'message': 'Event not found'}, 404

#     def post(self):
#         data = request.get_json()
#         title = data.get('title')
#         start = parse(data.get('start'))
#         end = parse(data.get('end'))
#         user_id = data.get('user_id')

#         new_event = CalendarEvent(title=title, start=start, end=end, user_id=user_id)

#         db.session.add(new_event)
#         db.session.commit()

#         return new_event.to_dict(), 201

#     def patch(self, event_id):
#         event = CalendarEvent.query.get(event_id)
#         if event:
#             data = request.get_json()
#             if 'title' in data:
#                 event.title = data.get('title')
#             if 'start' in data:
#                 start = datetime.strptime(data.get('start'), '%Y-%m-%dT%H:%M:%S.%fZ').replace(tzinfo=timezone.utc)
#                 event.start = start
#             if 'end' in data:
#                 end = datetime.strptime(data.get('end'), '%Y-%m-%dT%H:%M:%S.%fZ').replace(tzinfo=timezone.utc)
#                 event.end = end
#             if 'user_id' in data:
#                 event.user_id = data.get('user_id')
#             if 'calendar_id' in data:
#                 event.calendar_id = data.get('calendar_id')  # Update the calendar ID

#             db.session.commit()

#             return event.to_dict(), 200

#     def delete(self, event_id):
#         event = CalendarEvent.query.get(event_id)
#         if event:
#             db.session.delete(event)
#             db.session.commit()
#             return {'message': 'Event deleted'}, 200
#         else:
#             return {'message': 'Event not found'}, 404
class CalendarEventResource(Resource):
    def get(self, event_id=None):
        if event_id is None:
            # Get all events
            events = CalendarEvent.query.all()
            # Serialize and return the events
            serialized_events = [event.to_dict() for event in events]
            return serialized_events, 200
        else:
            # Get a specific event
            event = CalendarEvent.query.get(event_id)
            if event:
                return event.to_dict(), 200
            else:
                return {'message': 'Event not found'}, 404

    def post(self):
        data = request.get_json()
        title = data.get('title')
        start = parse(data.get('start'))
        end = parse(data.get('end'))
        user_ids = data.get('user_ids')

        new_event = CalendarEvent(title=title, start=start, end=end, created_by=user_ids[0])
        
        # Add users to the event
        for user_id in user_ids:
            user = User.query.get(user_id)
            if user:
                new_event.users.append(user)

        db.session.add(new_event)
        db.session.commit()

        return new_event.to_dict(), 201


    def patch(self, event_id):
        event = CalendarEvent.query.get(event_id)
        if event:
            data = request.get_json()
            if 'title' in data:
                event.title = data.get('title')
            if 'start' in data:
                start = datetime.strptime(data.get('start'), '%Y-%m-%dT%H:%M:%S.%fZ').replace(tzinfo=timezone.utc)
                event.start = start
            if 'end' in data:
                end = datetime.strptime(data.get('end'), '%Y-%m-%dT%H:%M:%S.%fZ').replace(tzinfo=timezone.utc)
                event.end = end
            if 'user_ids' in data:
                # Clear the existing users
                event.users.clear()
                # Add the new users
                for user_id in data.get('user_ids'):
                    user = User.query.get(user_id)
                    if user:
                        event.users.append(user)

            db.session.commit()

            return event.to_dict(), 200

    def delete(self, event_id):
        event = CalendarEvent.query.get(event_id)
        if event:
            # Disassociate users from the event
            association_table = user_calendar_event_association
            db.session.execute(association_table.delete().where(association_table.c.calendar_event_id == event.id))
            db.session.delete(event)
            db.session.commit()
            return {'message': 'Event deleted'}, 200
        else:
            return {'message': 'Event not found'}, 404











class UserListResource(Resource):
    def get(self):
        username = request.args.get('username')
        users = User.query.filter(User.username.ilike(f'%{username}%')).all()
        if users:
            user_data = [user.to_dict() for user in users]
            return user_data, 200
        else:
            return [], 200

api.add_resource(UserListResource, '/usernames')



api.add_resource(CalendarEventResource, '/events', '/events/<int:event_id>')

api.add_resource(UserResource, "/users")
api.add_resource(SignUpResource, "/signup")
api.add_resource(PageResource, "/pages", "/pages/<int:page_id>")
api.add_resource(BlockResource, "/pages/<int:page_id>/blocks")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
