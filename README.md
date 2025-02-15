# Task Management Application

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Project Workflow](#project-workflow)
- [Backend API Documentation](#backend-api-documentation)
  - [User Endpoints](#user-endpoints)
  - [Task Endpoints](#task-endpoints)
- [Frontend Features](#frontend-features)
- [User Credentials](#user-credentials)
- [Assumptions](#assumptions)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
This is a **Task Management Application** built with:
- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js
- **Database**: MongoDB Atlas

This application allows users to register, log in, create tasks, update tasks, and manage user roles (admin/user).

---

## Technologies Used
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT Authentication
- **Frontend**: React.js
- **Database**: MongoDB Atlas
- **Other Libraries**: Dotenv, CORS, bcrypt.js, Multer

---

## Installation and Setup

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/task-management.git
cd task-management
```

### 2. Setup Backend
1. Navigate to the backend folder:
    ```sh
    cd backend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the backend root and add:
    ```env
    PORT= Host On Render
    DATABASE_URL="I am useing MongoDB Atlas"
    JWT_SECRET_KEY="your-secret-key"
    ```
4. Start the backend server:
    ```sh
    npm start
    ```

### 3. Setup Frontend (React.js)
1. Navigate to the frontend folder:
    ```sh
    cd frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the frontend server:
    ```sh
    npm start
    ```

---

## Project Workflow
1. **Home Page**:
   - When the website opens, it starts on the home page displaying available tasks.
2. **User Registration & Login**:
   - Users must register before accessing the platform.
   - After successful registration, the login page opens.
   - If a user forgets their password, they can use the forgot password option, which redirects back to the login page after completion.
3. **User Dashboard**:
   - When logged in as a **User**, the home page displays only the user's assigned tasks.
   - When logged in as an **Admin**, the dashboard page opens instead.
4. **Creating Tasks**:
   - Clicking **Create Task** opens a form.
   - After task creation:
     - Users are redirected to the home page.
     - Admins are redirected to the Assign Task page.
5. **Updating Tasks**:
   - Clicking the **Update Button** opens an update form.
   - After updating:
     - Users are redirected to the home page.
     - Admins are redirected to the **All User Task** page.
6. **Deleting Tasks**:
   - Clicking the **Delete Button** prompts an alert confirming deletion.
   - Once confirmed, the updated task list is displayed.
7. **Logout**:
   - Clicking the **Logout Button** redirects the user to the home page.
8. **Dashboard Components**:
   - **All User Task**: Displays tasks of all users.
   - **Admin Assign Task Page**: Displays tasks assigned by the logged-in admin.

---

## Backend API Documentation

### User Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/user/registration` | Register a new user |
| POST   | `/user/login` | User login |
| POST   | `/user/forgot-password` | User password reset request |
| POST   | `/user/change-password` | Change user password |
| GET    | `/user/users` | Get all users |
| GET    | `/user/users/:id` | Get a user by ID |
| PUT    | `/user/users/:id` | Update user details |
| DELETE | `/user/users/:id` | Delete a user |

### Task Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/user/task` | Create a task |
| GET    | `/user/task` | Get all tasks |
| GET    | `/user/task/:id` | Get a task by ID |
| GET    | `/user/taskbyuser/:userId` | Get all tasks assigned to a user |
| PUT    | `/user/task/:id` | Update a task |
| DELETE | `/user/task/:id` | Delete a task |

---

## Frontend Features
- **Protected Routes**: Certain pages are restricted based on user role (Admin/User).
- **Task Management**: Users and admins can create, update, and delete tasks.
- **User Authentication**: Secure login and registration system.
- **Admin Functionality**: Admins can assign tasks and manage users.

---

## User Credentials
For testing purposes, use the following credentials:

### User Account:
- **Email**: user@gmail.com
- **Password**: 123456

### Admin Account:
- **Email**: admin@gmail.com
- **Password**: 123456

---

## Assumptions
- The backend uses JWT for authentication.
- Admin users can assign tasks and manage users.
- MongoDB Atlas is used as the database.

---

## Contributing
1. Fork the repository
2. Create a new feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request



