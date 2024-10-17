
# Task Management App

## Overview
A comprehensive task management application that enables users to manage tasks with various fields and statuses. Users can register, log in, edit profiles, and manage tasks, categories, and tags. This application provides features like JWT-based authentication, password management, file uploads, and more.

## Features
- **User Authentication**: Registration, login, JWT-based authentication.
- **Profile Management**: Edit, update, and delete profile information.
- **Task Management**: Add, update, delete, and mark tasks as complete/incomplete.
- **Categories & Tags**: Full CRUD operations for managing categories and tags.
- **Password Management**: Forgot password and change password with Nodemailer for sending recovery emails.
- **File Uploads**: Image storage and handling using Cloudinary.
- **State Management**: Redux for managing global state.
- **API Calls**: Axios for handling API requests.
- **Database**: MongoDB Atlas for database storage.

## Technologies Used
### Frontend:
- React.js
- Redux (State Management)
- Axios (API Handling)
- Cloudinary (Image Handling)

### Backend:
- Node.js
- Express.js
- MongoDB Atlas
- JWT (Authentication)
- Nodemailer (Email Handling)

## Folder Structure

### Frontend:
```
frontend/
├── components/
│   ├── Header.js
│   ├── PageLayout.js
│   ├── Sidebar.js
│   ├── ModalPopup.js
│   ├── PageHeader.js
│   └── pages/
│       ├── Auth/
│       ├── Brand/
│       ├── Category/
│       ├── Dashboard/
│       ├── Permission/
│       ├── Profile/
│       ├── Role/
│       ├── Tag/
│       ├── Tasks/
│       └── User/
├── helpers/
├── router/
```

### Backend:
```
backend/
├── controllers/
│   ├── AuthController.js
│   ├── CategoryController.js
│   ├── RoleController.js
│   ├── TagController.js
│   ├── TaskController.js
│   └── UserController.js
├── models/
│   ├── Category.js
│   ├── Role.js
│   ├── Tag.js
│   ├── Task.js
│   └── User.js
├── routes/
│   ├── AuthRoutes.js
│   ├── CategoryRoutes.js
│   ├── RoleRoutes.js
│   ├── TagRoutes.js
│   ├── TaskRoutes.js
│   └── UserRoutes.js
```

## Installation

### Frontend:
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the frontend development server:
   ```bash
   npm run dev
   ```

### Backend:
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the backend server:
   ```bash
   npm start
   ```

## Environment Variables
Create a `.env` file in the `backend` folder and configure the following variables:
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

## API Endpoints

### Auth:
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/forgot-password` - Send password recovery email
- `POST /api/auth/reset-password` - Reset password

### User:
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `DELETE /api/user/profile` - Delete user profile

### Task:
- `POST /api/tasks` - Add a new task
- `GET /api/tasks` - Get all tasks
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PATCH /api/tasks/:id/complete` - Mark task as complete/incomplete

### Category & Tag:
- `POST /api/categories` - Add a new category
- `GET /api/categories` - Get all categories
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category
- Same endpoints for `Tags`

## Future Improvements
- Notifications for task deadlines
- Task assignment to multiple users
- Task filtering and sorting
- Enhanced analytics and reports

## License
This project is licensed under the MIT License.
