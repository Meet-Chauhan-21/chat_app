# AI Chat Application

A modern chat application built with React, featuring a ChatGPT-like interface with webhook integration.

## Features

- 💬 Real-time chat interface
- 🎨 Modern UI similar to ChatGPT/Gemini
- 🔄 Webhook integration for message processing
- 📱 Responsive design
- ⚡ Fast and smooth animations
- 🌙 Dark theme

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Webhook Configuration

Messages are sent to: `https://hellocm.app.n8n.cloud/webhook-test/cb3c76f3-788a-44bc-8702-8ec602f18e3b`

The webhook receives:
```json
{
  "message": "user message",
  "timestamp": "ISO timestamp",
  "type": "chat_message"
}
```

## Usage

- Type your message in the input field
- Press Enter or click the send button
- Messages are sent to the webhook and responses are displayed
- Click "New Chat" to start a fresh conversation

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Deploy to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from the project directory:
```bash
cd c:\Users\DELL\Desktop\chat_app
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? (Select your account)
   - Link to existing project? **N**
   - What's your project's name? **chat-app** (or your preferred name)
   - In which directory is your code located? **./**
   - Want to override the settings? **N**

5. For production deployment:
```bash
vercel --prod
```

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect it's a Create React App
6. Click "Deploy"

Your app will be live at: `https://your-project-name.vercel.app`

## Technologies Used

- React 18
- Axios for HTTP requests
- CSS3 for styling
- Modern ES6+ JavaScript
