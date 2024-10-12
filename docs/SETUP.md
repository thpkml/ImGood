
# Setup Guide

## Prerequisites
Before starting, ensure you have the following tools installed:
- **Node.js** (v16+)
- **npm** or **yarn**
- **MongoDB Atlas account** (for database access)
- **Vercel account** (for frontend deployment)
- **Heroku CLI** (for backend deployment)

## 1. Clone the Repository
```bash
git clone https://github.com/thpkml/ImGood.git
cd ImGood
```

## 2. Install Dependencies

### Frontend (React)
```bash
cd frontend
npm install
```

### Backend (Node.js)
```bash
cd ../backend
npm install
```

## 3. Setup Environment Variables
Create a `.env` file in both the frontend and backend directories.

### Backend `.env`
```bash
MONGO_URI=<your-mongo-atlas-uri>
OPENAI_API_KEY=<your-openai-api-key>
PORT=5000
```

### Frontend `.env`
```bash
REACT_APP_BACKEND_URL=http://localhost:5000/api
```

## 4. Running Locally

### Backend (Node.js)
```bash
cd backend
npm run dev
```

### Frontend (React.js)
```bash
cd frontend
npm start
```

The application will run on `http://localhost:3000` with the backend running on `http://localhost:5000`.

## 5. Database Setup (MongoDB Atlas)
- Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free-tier cluster.
- In the backend `.env` file, set the `MONGO_URI` to your cluster’s connection string.

## 6. Deployment

### Frontend (Vercel)
- Push the `frontend` directory to a GitHub repository.
- In Vercel, import the project from GitHub, and Vercel will automatically deploy the React app.

### Backend (Heroku)
- Create a new Heroku app.
- Push the `backend` directory to GitHub.
- Link the GitHub repository to Heroku and deploy the backend.

For detailed deployment steps, check the deployment section in the main [README.md](./README.md).

---

You're now ready to run the Mental Health AI Chat Assistant locally and online!