# Snippet Manager

![code-snippet-manager](https://github.com/qyuo/code-snippet-manager/assets/77930041/563add5a-3b3b-4eba-a860-e541a502a844)

**Snippet Manager** is a web application that allows users to submit and manage code snippets in several programming languages. It provides a user-friendly interface for storing and organizing code samples, making it convenient for developers to access and reuse their code snippets.

## Features

- **Code Submission**: Users can easily submit code snippets in different programming languages through a simple and intuitive interface.

- **Search Functionality**: The application offers a powerful search feature that allows users to find their previous code snippets by name, description, or programming language.

- **Sorted Timestamped History**: Snippet Manager maintains a sorted and timestamped history of all code snippets, enabling users to track their code submissions over time.

- **Deletion**: Users have the ability to delete specific code snippets that are no longer needed.

- **User Registration and Login**: The application supports user registration and login, ensuring that each user has a personalized experience with their own code collection.

## Setup

To set up Snippet Manager locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/qyuo/code-snippet-manager.git
   cd Snippet-Manager
2. Backend Setup
- Ensure you have MongoDB installed and running locally or provide a MongoDB connection URL in the `.env` file located in the root of the backend directory.
- In the backend directory, create a `.env` file and add the following:
   - `MONGO_URI=your_mongodb_connection_uri`
   - `JWT_SECRET=your_random_jwt_secret_key`

- Install backend dependencies and start the server:
  ```bash
  npm install
  npm start
3. Frontend Setup
- In the frontend (client) directory, create a .env file and add the backend URL: `REACT_APP_BACKEND_URL=http://localhost:5000`
- Install frontend dependencies and start the application

## Video Demo
[Link to the Video Demo](https://www.youtube.com/watch?v=PuphJf9vJeU)

Explore the features of Snippet Manager and enjoy managing your code snippets with ease!

## Feedback and Support
If you have any feedback or questions, please feel free to reach out. Happy coding!

