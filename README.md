# Microblog 

A session-based full-stack microblog starter built with a React frontend and a Node.js backend. It leverages modern web technologies to deliver a seamless user experience for content sharing and profile management.

## Features

- **Session-Based Authentication** — Secure user registration, login, and logout functionality powered by `express-session` and `connect-mongo`.
- **Dynamic Microblogging** — Create, view, and manage posts with real-time updates and chronological sorting.
- **Profile Management** — Users can update their profile information and upload custom profile photos via `multer`.
- **Full-Stack Architecture** — A dedicated Express backend with a MongoDB database and a Vite-powered React frontend.
- **Media Support** — Integrated static file serving for image uploads.

## Tech Stack

### Frontend

| Technology | Version |
|---|---|
| React | 18.2.0 |
| Build Tool | Vite |
| Routing | React Router DOM 6.14.1 |
| HTTP Client | Axios |
| Icons | React Icons |

### Backend

| Technology | Version |
|---|---|
| Runtime | Node.js |
| Framework | Express.js 4.18.2 |
| Database | MongoDB with Mongoose ODM 7.0.0 |
| Authentication | Bcryptjs (hashing) and Express-session |
| Storage | Multer for file uploads |

## Project Structure

```
microblog_sourav/
├── backend/
│   ├── models/          # Mongoose schemas (User, Post)
│   ├── routes/          # Express route handlers (auth, posts)
│   ├── middleware/      # Auth/session middleware
│   ├── uploads/         # Uploaded profile photos (served statically)
│   ├── .env.example     # Environment variable template
│   ├── server.js        # App entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-level pages
│   │   ├── api/         # Axios instance and API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

Ensure you have MongoDB running locally at `mongodb://127.0.0.1:27017/microblog`.

### Installation

#### 1. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Configure environment variables:

- Copy `.env.example` to `.env`.
- Set your `MONGO_URI` and `SESSION_SECRET` in the `.env` file.

Start the server:

```bash
npm start
```

The server listens on port `5000` by default.

#### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Launch the development server:

```bash
npm run dev
```

## API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |
| POST | `/api/auth/logout` | End the current session |
| PUT | `/api/auth/update` | Update user profile and photo |

### Post Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/posts` | Retrieve all posts (authenticated) |
| POST | `/api/posts` | Create a new microblog post |
| DELETE | `/api/posts/clear` | Delete all posts for the current user |

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common MongoDB Connection Issues

- **Local Instance Not Running** — Ensure your MongoDB service is active. You can check this by running `mongosh` in your terminal.
- **URI Mismatch** — Verify that the `MONGO_URI` in your `.env` matches your local configuration (default: `mongodb://127.0.0.1:27017/microblog`).
