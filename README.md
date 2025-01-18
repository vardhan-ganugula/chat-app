# Real-time Chat Application

A secure one-on-one messaging application with real-time capabilities and image sharing.

## Overview

This chat application provides a platform for direct messaging between users with real-time updates using Socket.IO. Features include user presence tracking, secure authentication, and support for both text and image messages.

## Key Features

- One-on-one real-time messaging
- Real-time online/offline status
- Image sharing via Cloudinary
- Secure authentication with Zod validation
- Unread message notifications
- Responsive design

## Technical Stack

- Frontend:
  - React.js with Vite
  - Zustand for state management
  - Socket.io-client
  - Axios with interceptors
  - React-toastify

- Backend:
  - Express.js
  - MongoDB
  - Socket.IO
  - JWT authentication
  - Zod validation
  - Cloudinary integration

## Security Features

### Password Requirements
```
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number or special character
```

### Authentication Flow
- Email validation
- Username (minimum 3 characters)
- JWT-based session management
- Protected routes using middleware

## Environment Setup

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - New user registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `PUT /api/auth/update-profile` - Update user profile
- `GET /api/auth/check` - Verify authentication status

### Messages
- `GET /api/messages/users` - Fetch all available users
- `GET /api/messages/chat/:id` - Get conversation history
- `POST /api/messages/chat/:id` - Send message (text/image)

## Real-time Features

- Instant message delivery
- Live user presence indicators
- Automatic connection management
- Message status updates
- Server-side socket event handling

## Installation

1. Clone the repository
2. Install all dependencies:
```bash
npm install
```

3. Set environment variables
4. Run development server:
```bash
npm run dev
```

5. For production:
```bash
npm run build
npm start
```

## Production Deployment

The application includes a build script that:
1. Installs client dependencies
2. Builds the client
3. Installs server dependencies
4. Starts the production server

## License

MIT License
