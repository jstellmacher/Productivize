from flask import Flask, request, session
from flask_restful import Api, Resource
from models import User, Page, Tag, PageTag, Collaborator

app = Flask(__name__)
app.secret_key = "your-secret-key"  # Set a secret key for session management
api = Api(app)

# User resource
class UserResource(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.get(user_id)
            if user:
                return user.to_dict(), 200
        return {"message": "User not found"}, 404

    def post(self):
        data = request.json
        if not data:
            return {"message": "Invalid request data"}, 400

        username = data.get("username")
        password = data.get("password")
        email = data.get("email")

        if not username or not password or not email:
            return {"message": "Missing required fields"}, 400

        user = User(username=username, password=password, email=email)
        # Add additional logic as needed, e.g., password hashing, validation, etc.
        db.session.add(user)
        db.session.commit()

        session["user_id"] = user.id  # Store the user ID in the session

        return user.to_dict(), 201

    # ... (other methods for PUT, DELETE)

# Page resource
class PageResource(Resource):
    def get(self, page_id):
        user_id = session.get("user_id")
        if user_id:
            page = Page.query.filter_by(id=page_id, user_id=user_id).first()
            if page:
                return page.to_dict(), 200
        return {"message": "Page not found"}, 404

    def post(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"message": "User not found"}, 404

        data = request.json
        if not data:
            return {"message": "Invalid request data"}, 400

        title = data.get("title")
        content = data.get("content")

        if not title or not content:
            return {"message": "Missing required fields"}, 400

        page = Page(title=title, content=content, user_id=user_id)
        db.session.add(page)
        db.session.commit()

        return page.to_dict(), 201

    # ... (other methods for PUT, DELETE)

# Tag resource
class TagResource(Resource):
    def get(self, tag_id):
        tag = Tag.query.get(tag_id)
        if tag:
            return tag.to_dict(), 200
        return {"message": "Tag not found"}, 404

    # ... (other methods for POST, PUT, DELETE)

# PageTag resource
class PageTagResource(Resource):
    # ... (methods for handling PageTag)

# Collaborator resource
class CollaboratorResource(Resource):
    # ... (methods for handling Collaborator)

# Routes
api.add_resource(UserResource, "/users")
api.add_resource(PageResource, "/pages", "/pages/<int:page_id>")
api.add_resource(TagResource, "/tags", "/tags/<int:tag_id>")
api.add_resource(PageTagResource, "/page-tags")
api.add_resource(CollaboratorResource, "/collaborators")

if __name__ == "__main__":
    app.run(debug=True)
