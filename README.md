# flopnote
# Personal Notes and Bookmark Manager

A full-stack monorepo application for managing personal notes and bookmarks with JWT authentication, built with Next.js, Express, and MongoDB.

## Features

### Backend
- **Express REST API** with proper HTTP status codes
- **MongoDB with Mongoose** for data persistence
- **JWT Authentication** for secure user management
- **User Registration & Login** with password hashing (bcrypt)
- **Notes Management**: CRUD operations with search and tag filtering
- **Bookmarks Management**: CRUD operations with URL validation and optional title auto-fetch
- **Data Scoping**: All resources are user-specific
- **Field Validation**: Required field validation and URL format checking
- **Text Search**: Full-text search on notes and bookmarks
- **Tag Filtering**: Filter by single or multiple tags
- **Favorites**: Mark items as favorites and filter by favorites

### Frontend
- **Next.js 14** with React 18
- **Tailwind CSS** for responsive design
- **Protected Routes** with JWT token management
- **Authentication Flows**: Login and registration pages
- **Notes Page**: Create, read, update, delete notes with search and tag filtering
- **Bookmarks Page**: Manage bookmarks with URL validation and title auto-fetch
- **Responsive UI**: Mobile-friendly design
- **Favorites Toggle**: Star/unstar items
- **Modal Forms**: Clean UI for creating and editing items

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- Axios + Cheerio (web scraping for title fetch)
- CORS enabled

### Frontend
- Next.js 14
- React 18
- Tailwind CSS
- Axios (API client)

## Project Structure

```
/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.js              # User model
│   │   │   ├── Note.js              # Note model
│   │   │   └── Bookmark.js          # Bookmark model
│   │   ├── controllers/
│   │   │   ├── authController.js    # Auth logic
│   │   │   ├── noteController.js    # Notes logic
│   │   │   └── bookmarkController.js # Bookmarks logic
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Auth endpoints
│   │   │   ├── noteRoutes.js        # Notes endpoints
│   │   │   └── bookmarkRoutes.js    # Bookmarks endpoints
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT verification
│   │   │   └── errorHandler.js      # Error handling
│   │   ├── utils/
│   │   │   ├── generateToken.js     # JWT token generation
│   │   │   └── fetchPageTitle.js    # Web scraping utility
│   │   └── server.js                # Express server
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.js            # Main layout with nav
│   │   │   ├── ProtectedRoute.js    # Route protection
│   │   │   ├── NoteCard.js          # Note display component
│   │   │   ├── BookmarkCard.js      # Bookmark display component
│   │   │   └── SearchFilter.js      # Search and filter UI
│   │   ├── lib/
│   │   │   ├── api.js               # Axios instance
│   │   │   ├── auth.js              # Auth service
│   │   │   ├── notes.js             # Notes API calls
│   │   │   └── bookmarks.js         # Bookmarks API calls
│   │   ├── pages/
│   │   │   ├── _app.js              # Next.js app wrapper
│   │   │   ├── _document.js         # HTML document
│   │   │   ├── index.js             # Landing page
│   │   │   ├── login.js             # Login page
│   │   │   ├── register.js          # Registration page
│   │   │   ├── notes.js             # Notes management
│   │   │   └── bookmarks.js         # Bookmarks management
│   │   └── styles/
│   │       └── globals.css          # Tailwind styles
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
├── package.json                      # Root package with workspaces
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js >= 18.0.0
- MongoDB installed and running locally (or MongoDB Atlas connection string)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Variables

#### Backend Environment Variables

Create `backend/.env` from `backend/.env.example`:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/notes-bookmarks-db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

#### Frontend Environment Variables

Create `frontend/.env.local` from `frontend/.env.example`:

```bash
cd frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

Make sure MongoDB is running:

```bash
# If using local MongoDB
mongod

# Or if using MongoDB as a service (Linux)
sudo systemctl start mongodb

# Or if using MongoDB as a service (macOS with Homebrew)
brew services start mongodb-community
```

### 5. Run the Application

#### Option 1: Run Both Backend and Frontend Concurrently

From the root directory:

```bash
npm run dev
```

This will start:
- Backend on http://localhost:5000
- Frontend on http://localhost:3000

#### Option 2: Run Separately

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend (in a new terminal):**
```bash
cd frontend
npm run dev
```

### 6. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## API Documentation

### Authentication Endpoints

#### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User
```bash
GET /api/auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Notes Endpoints

#### Get All Notes
```bash
GET /api/notes
Authorization: Bearer <token>

# Optional query parameters:
# ?search=query          - Full-text search
# ?tags=work,personal    - Filter by tags
# ?favorite=true         - Only favorites
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "title": "My First Note",
      "content": "This is the content of my note",
      "tags": ["work", "ideas"],
      "isFavorite": false,
      "user": "...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Single Note
```bash
GET /api/notes/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "My Note",
    "content": "Note content",
    "tags": ["work"],
    "isFavorite": false,
    "user": "...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Create Note
```bash
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My New Note",
  "content": "This is the content",
  "tags": ["work", "important"],
  "isFavorite": false
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "My New Note",
    "content": "This is the content",
    "tags": ["work", "important"],
    "isFavorite": false,
    "user": "...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Note
```bash
PUT /api/notes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "tags": ["updated"],
  "isFavorite": true
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Updated Title",
    "content": "Updated content",
    "tags": ["updated"],
    "isFavorite": true,
    "user": "...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

#### Delete Note
```bash
DELETE /api/notes/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {}
}
```

### Bookmarks Endpoints

#### Get All Bookmarks
```bash
GET /api/bookmarks
Authorization: Bearer <token>

# Optional query parameters:
# ?search=query          - Full-text search
# ?tags=dev,design       - Filter by tags
# ?favorite=true         - Only favorites
```

**Response (200):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "...",
      "title": "GitHub",
      "url": "https://github.com",
      "description": "Code hosting platform",
      "tags": ["development", "tools"],
      "isFavorite": true,
      "user": "...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Single Bookmark
```bash
GET /api/bookmarks/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "GitHub",
    "url": "https://github.com",
    "description": "Code hosting platform",
    "tags": ["development"],
    "isFavorite": true,
    "user": "...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Create Bookmark
```bash
POST /api/bookmarks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "GitHub",
  "url": "https://github.com",
  "description": "Code hosting platform",
  "tags": ["development", "tools"],
  "isFavorite": true
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "GitHub",
    "url": "https://github.com",
    "description": "Code hosting platform",
    "tags": ["development", "tools"],
    "isFavorite": true,
    "user": "...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Create Bookmark with Auto-Fetch Title
```bash
POST /api/bookmarks
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://github.com",
  "autoFetchTitle": true,
  "description": "Code hosting platform",
  "tags": ["development"]
}
```

#### Update Bookmark
```bash
PUT /api/bookmarks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "url": "https://github.com",
  "description": "Updated description",
  "tags": ["dev"],
  "isFavorite": false
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Updated Title",
    "url": "https://github.com",
    "description": "Updated description",
    "tags": ["dev"],
    "isFavorite": false,
    "user": "...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

#### Delete Bookmark
```bash
DELETE /api/bookmarks/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {}
}
```

#### Fetch Title from URL
```bash
POST /api/bookmarks/fetch-title
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://github.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "title": "GitHub: Let's build from here"
  }
}
```

## Sample cURL Commands

### Authentication

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get current user (replace YOUR_TOKEN with actual token)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Notes

```bash
# Create a note
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "My First Note",
    "content": "This is a test note",
    "tags": ["test", "sample"],
    "isFavorite": false
  }'

# Get all notes
curl -X GET http://localhost:5000/api/notes \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get notes with search
curl -X GET "http://localhost:5000/api/notes?search=test" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get notes with tag filter
curl -X GET "http://localhost:5000/api/notes?tags=work,important" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get favorite notes only
curl -X GET "http://localhost:5000/api/notes?favorite=true" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get a single note (replace NOTE_ID)
curl -X GET http://localhost:5000/api/notes/NOTE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update a note (replace NOTE_ID)
curl -X PUT http://localhost:5000/api/notes/NOTE_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content",
    "tags": ["updated"],
    "isFavorite": true
  }'

# Delete a note (replace NOTE_ID)
curl -X DELETE http://localhost:5000/api/notes/NOTE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Bookmarks

```bash
# Create a bookmark
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "GitHub",
    "url": "https://github.com",
    "description": "Code hosting platform",
    "tags": ["development", "tools"],
    "isFavorite": true
  }'

# Create a bookmark with auto-fetch title
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "url": "https://github.com",
    "autoFetchTitle": true,
    "description": "Code hosting platform",
    "tags": ["development"]
  }'

# Get all bookmarks
curl -X GET http://localhost:5000/api/bookmarks \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get bookmarks with search
curl -X GET "http://localhost:5000/api/bookmarks?search=github" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get bookmarks with tag filter
curl -X GET "http://localhost:5000/api/bookmarks?tags=development,tools" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get favorite bookmarks only
curl -X GET "http://localhost:5000/api/bookmarks?favorite=true" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Fetch title from URL
curl -X POST http://localhost:5000/api/bookmarks/fetch-title \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "url": "https://github.com"
  }'

# Get a single bookmark (replace BOOKMARK_ID)
curl -X GET http://localhost:5000/api/bookmarks/BOOKMARK_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update a bookmark (replace BOOKMARK_ID)
curl -X PUT http://localhost:5000/api/bookmarks/BOOKMARK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Updated GitHub",
    "url": "https://github.com",
    "description": "Updated description",
    "tags": ["dev"],
    "isFavorite": false
  }'

# Delete a bookmark (replace BOOKMARK_ID)
curl -X DELETE http://localhost:5000/api/bookmarks/BOOKMARK_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Error Responses

All endpoints return consistent error responses:

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Server Error"
}
```

## Features in Detail

### Authentication
- Password hashing with bcryptjs (10 salt rounds)
- JWT tokens with configurable expiration
- Protected routes on both backend and frontend
- Automatic token refresh on API calls
- Logout functionality

### Notes
- Create, read, update, delete operations
- Full-text search across title and content
- Tag-based filtering (single or multiple tags)
- Favorite marking and filtering
- Character limits: Title (200 chars)
- Automatic timestamps
- User-scoped data (users only see their own notes)

### Bookmarks
- Create, read, update, delete operations
- URL validation (must start with http:// or https://)
- Optional title auto-fetch from webpage
- Full-text search across title and description
- Tag-based filtering
- Favorite marking and filtering
- Character limits: Title (200 chars), Description (500 chars)
- User-scoped data

### Search & Filter
- Text search using MongoDB text indexes
- Tag filtering with comma-separated values
- Favorites-only filter
- Combine multiple filters
- Case-insensitive tag matching

### Responsive Design
- Mobile-first design with Tailwind CSS
- Responsive grid layouts (1/2/3 columns)
- Modal forms for create/edit operations
- Touch-friendly UI elements

## Database Schema

### User
```javascript
{
  username: String (required, unique, 3-50 chars),
  email: String (required, unique, valid email),
  password: String (required, hashed, min 6 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Note
```javascript
{
  title: String (required, max 200 chars),
  content: String (required),
  tags: [String] (lowercase),
  isFavorite: Boolean (default: false),
  user: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Bookmark
```javascript
{
  title: String (required, max 200 chars),
  url: String (required, valid URL),
  description: String (max 500 chars),
  tags: [String] (lowercase),
  isFavorite: Boolean (default: false),
  user: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
```

## Development Tips

### Running Tests
Currently, this project doesn't include tests, but you can add them using:
- Backend: Jest + Supertest
- Frontend: Jest + React Testing Library

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

### Environment-Specific Settings

For production deployment:
1. Change `JWT_SECRET` to a strong, random string
2. Update `MONGODB_URI` to your production database
3. Set `NODE_ENV=production`
4. Update `FRONTEND_URL` and `NEXT_PUBLIC_API_URL` to production URLs
5. Enable HTTPS
6. Set appropriate CORS origins

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `sudo systemctl status mongodb`
- Check connection string in `.env`
- Verify network connectivity

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

### CORS Errors
- Verify `FRONTEND_URL` in backend `.env`
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Ensure backend is running before making frontend requests

### JWT Token Issues
- Check token expiration in backend logs
- Clear browser localStorage and re-login
- Verify `JWT_SECRET` is set in backend `.env`

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## Support

For issues and questions, please open an issue on the GitHub repository.