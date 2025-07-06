# MERN Blog Application Setup Guide

## Prerequisites

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - Choose one option:
   - Local installation: [Download here](https://www.mongodb.com/try/download/community)
   - MongoDB Atlas (Cloud): [Sign up here](https://www.mongodb.com/atlas)
3. **Git** - [Download here](https://git-scm.com/)

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/week-4-mern-integration-assignment-mose868.git
cd week-4-mern-integration-assignment-mose868
```

### 2. Server Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (copy from config.sample.js)
# Create a .env file with the following content:
```

Create `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
UPLOAD_PATH=uploads
```

**Note:** If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

### 3. Client Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create .env file for client
```

Create `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The application will create the `mern-blog` database automatically

#### Option B: MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Replace `MONGODB_URI` in `server/.env`

### 5. Running the Application

#### Start the Server (Terminal 1)
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

#### Start the Client (Terminal 2)
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173`

## Troubleshooting

### Common Issues

1. **Port already in use**: Change PORT in server/.env
2. **MongoDB connection failed**: Check MONGODB_URI in server/.env
3. **JWT errors**: Ensure JWT_SECRET is set in server/.env
4. **CORS issues**: Server includes CORS middleware for development

### Environment Variables

- Server requires: `PORT`, `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`, `UPLOAD_PATH`
- Client requires: `VITE_API_URL`

## Available Scripts

### Server
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features

- ✅ User authentication (register/login)
- ✅ Create, read, update, delete posts
- ✅ Comment system
- ✅ Image uploads
- ✅ Categories management
- ✅ Responsive design with Tailwind CSS
- ✅ Protected routes
- ✅ JWT-based authentication

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (authenticated)
- `PUT /api/posts/:id` - Update post (authenticated)
- `DELETE /api/posts/:id` - Delete post (authenticated)
- `POST /api/posts/:id/comments` - Add comment

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (authenticated)
- `PUT /api/categories/:id` - Update category (authenticated)
- `DELETE /api/categories/:id` - Delete category (authenticated)

## Project Structure

```
mern-blog/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── controllers/        # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── uploads/           # File uploads
│   ├── server.js          # Main server file
│   └── package.json
└── README.md
```

## Next Steps

1. Set up your environment variables
2. Run the application
3. Test the functionality
4. Deploy to production (optional)

Happy coding! 🚀 