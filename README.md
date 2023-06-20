## Productivize

Productivize is a web application that empowers users with productivity and note-taking tools, task management, project tracking, and collaboration capabilities, offering a unique blend of functionality and personalized features.
 **Note:**For the purposes of learning, I will leave my notes in my code for understanding my thought process and if I look back at it.
## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

# Introduction
Productivize is a web application designed to provide users with a versatile platform for organizing their work, managing tasks and projects, and collaborating with others. With a touch of personalization and innovative features, Productivize aims to enhance the user experience and boost productivity.

# Features

## MVP Features

- **User Registration and Authentication:** Allow users to create an account and authenticate themselves to access the application.
- **Page Creation and Organization:** Enable users to create pages and organize them based on their preferences.
- **Block-Based Content:** Support block-based content creation, allowing users to add various types of content to their pages.
- **Basic Collaboration:** Provide basic collaboration capabilities, allowing users to share pages and collaborate with others.

## Additional Many-to-Many Features

- **Tags:** Implement the ability to add tags to pages. Each page can have multiple tags, and each tag can be associated with multiple pages. This many-to-many relationship allows users to categorize and filter their pages based on tags.

- **SQL Diagrams:**
![SQL Diagrams for Productivize](https://github.com/jstellmacher/productivize/assets/86083839/e85d9b64-082d-4f31-ba76-9d07247f009f)
 
## Reach Features

**Advanced Formatting Options:** Enhance the text editing capabilities to allow users to customize the appearance of text, add tables, bullet points, and more.
Task Management and Project Tracking: Introduce advanced task management features, including the ability to create and assign tasks, set due dates, and track progress.
Integration with External Services: Enable integration with popular third-party services like Google Drive, Dropbox, or GitHub to import and sync content.
Advanced Collaboration: Implement real-time chat functionality within shared pages, allowing users to communicate and discuss in real-time.

## User Stories Core & Reach(Agile)
1. As a user, I want to create an account and log in, so that I can access my personalized workspace.

2. As a user, I want to create a new page, so that I can organize my content effectively.

3. As a user, I want to add different types of blocks (text, image, checklist, etc.) to my pages, so that I can structure and customize my content.

4. As a user, I want to be able to drag and drop blocks within a page, so that I can rearrange the content according to my preferences.

5. As a user, I want to collaborate with others on a page, so that we can work together and make changes simultaneously.

6. As a user, I want to have a kanban board or a similar organizational tool, so that I can manage my tasks and keep track of their progress.

7. As a user, I want to be able to search for pages or blocks based on keywords, so that I can quickly find the information I need.

8. As a user, I want to have different access levels (read-only, edit, admin) for sharing pages with others, so that I can control the permissions and protect my data.

9. As a user, I want to customize the appearance of my pages with different themes or templates, so that I can create a visually appealing workspace.

10. As a user, I want to receive notifications or updates when changes are made to shared pages, so that I can stay informed about the latest modifications.

11. As a user, I want to have the ability to undo or revert changes made to a page, so that I can easily revert any unintended modifications.

12. As a user, I want to have a responsive and intuitive UI, so that I can seamlessly navigate and interact with the application on different devices.
## Technologies

- **React.js:** A JavaScript library for building user interfaces.
- **Flask:** A lightweight Python web framework.
- **SQLAlchemy:** An SQL toolkit and Object-Relational Mapping (ORM) library.
- **Socket.io:** A real-time web application framework for enabling live collaboration and instant messaging between users.
- **PostgreSQL:** An open-source relational database management system.

## Installation

1. Clone the repository.
2. Install the required dependencies using npm install or yarn install in the project root directory.
3. Set up the backend server and frontend server by running `python app.py` for the backend server and `npm start` for the frontend server.
## Usage
If there are any installation dependencies issues use the following command in your project folder in your terminal:
`$ pipenv install flask flask-sqlalchemy flask-migrate sqlalchemy-serializer flask-restful flask-cors
`

Start the backend server by running python app.py in the backend directory.
Start the frontend development server using npm start or yarn start in the project root directory.
Access the application in your web browser at http://localhost:3000.

# Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements, please create a pull request or open an issue.

## License

~~This project is licensed under the MIT License.~~

Have yet to define ^License
