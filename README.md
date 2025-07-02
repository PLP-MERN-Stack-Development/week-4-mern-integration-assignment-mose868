# MERN Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication (register, login, profile management)
- Create, read, update, and delete blog posts
- Comment system
- Categories and tags
- Image upload for blog posts
- Responsive design with Tailwind CSS
- Protected routes for authenticated users
- Admin dashboard for managing posts and categories

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mern-blog
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   UPLOAD_PATH=uploads
   ```

5. Create a `.env` file in the client directory:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

## Running the Application

1. Start the server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the client:
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Posts
- GET `/api/posts` - Get all posts
- GET `/api/posts/:id` - Get single post
- POST `/api/posts` - Create new post
- PUT `/api/posts/:id` - Update post
- DELETE `/api/posts/:id` - Delete post
- POST `/api/posts/:id/comments` - Add comment to post

### Categories
- GET `/api/categories` - Get all categories
- POST `/api/categories` - Create new category
- PUT `/api/categories/:id` - Update category
- DELETE `/api/categories/:id` - Delete category

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.