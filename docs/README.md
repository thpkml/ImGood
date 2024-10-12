# Mental Health AI Chat Assistant

## Overview
The Mental Health AI Chat Assistant is an application designed to provide conversational support for mental health using an AI-powered chatbot. The project uses a monorepo structure, leveraging React.js for the frontend and Node.js for the backend. The initial AI is powered by OpenAI's GPT API, with future integration plans for Rasa/Dialogflow for more structured conversations.

## Features
- Real-time AI-driven conversations using OpenAI GPT API
- Scalable backend architecture (Node.js with Express.js)
- MongoDB for dynamic data storage (using MongoDB Atlas)
- Future-proof architecture for integrating Rasa/Dialogflow as the conversation management layer
- CI/CD setup using GitHub Actions for automated deployment
- Deployed on Vercel (frontend) and Heroku (backend)

## Project Structure
```bash
/ImGood
│
├── /frontend                 # React.js frontend
├── /backend                  # Node.js backend
├── /shared                   # Shared code between frontend and backend
├── /ci-cd                    # CI/CD configuration
├── /docs                     # Project documentation
└── README.md                 # Project Overview
```

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **AI Model**: OpenAI GPT API (Future: Fine-tuned models like GPT-Neo)
- **Conversation Management**: Future integration with Rasa/Dialogflow
- **CI/CD**: GitHub Actions
- **Hosting**:
  - Frontend: Vercel
  - Backend: Heroku (Future: AWS EC2 for scaling)

## Getting Started
Follow the steps in the [SETUP.md](./SETUP.md) file for local setup.

## Future Plans
- Integrating Rasa or Dialogflow for structured conversation management
- Scaling backend to AWS EC2
- Deploying a fine-tuned AI model on AWS or Hugging Face

## Contributing
Please see the [CONTRIBUTING.md](./CONTRIBUTING.md) guide.

## License
This project is licensed under the MIT License.