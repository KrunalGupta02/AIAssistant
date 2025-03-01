# React Chat Interface

A fully functional chat interface similar to ChatGPT built with React, featuring Markdown rendering and conversation history management.

## 🚀 Demo

[View Demo on YouTube](https://youtu.be/SyOySAacHik)


## ✨ Features

- **ChatGPT-like Interface**: Clean, intuitive UI that mimics the ChatGPT experience
- **Markdown Support**: Full Markdown rendering including code blocks with syntax highlighting
- **Conversation Management**: Create, switch between, and maintain multiple conversation threads
- **API Integration**: Seamless integration with Google's Gemini API for intelligent responses
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Robust error management for API failures and edge cases

## 🛠️ Tech Stack

- **React**: Built with functional components and React Hooks
- **Vite**: Lightning-fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework for styling
- **Axios**: Promise-based HTTP client for API requests
- **Gemini API**: Google's AI model for generating responses
- **React-Markdown**: For rendering Markdown content
- **React-Syntax-Highlighter**: Code syntax highlighting in Markdown
- **Remark-GFM**: GitHub Flavored Markdown support
- **UUID**: Unique ID generation for conversations and messages

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatInput.jsx       # User input component with submission handling
│   ├── ChatMessage.jsx     # Individual message component with Markdown support
│   ├── Header.jsx          # App header with navigation controls
│   └── Sidebar.jsx         # Conversation history sidebar
├── hooks/
│   ├── useApi.js           # Custom hook for API integration
│   └── useConversation.js  # Custom hook for conversation state management
├── utils/
│   └── markdownUtil.jsx    # Utilities for Markdown processing
├── App.jsx                 # Main application component
└── main.jsx               # Entry point
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm
- Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/react-chat-interface.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

### API Configuration

The app uses the Gemini API for generating responses. You'll need to:

1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env` file as shown in the installation steps

### Environment Variables

- `VITE_GEMINI_API_KEY`: Your Gemini API key

## 🧩 Core Functionality

### Conversation Management

The app uses a custom `useConversation` hook to manage conversations. This hook:
- Creates new conversations
- Stores message history
- Switches between conversations
- Persists data using local storage

### API Integration

The `useApi` hook handles communication with the Gemini API:
- Sends user messages to the API
- Processes response data
- Handles errors and loading states

### Markdown Rendering

Messages support full Markdown syntax including:
- Headers, lists, tables, and quotes
- Code blocks with syntax highlighting
- Links and images
- GitHub Flavored Markdown extensions

## 📝 Usage

1. Type a message in the input box and press Enter or click the Send button
2. The message will be sent to the Gemini API and a response will be displayed
3. Create a new conversation by clicking the "+" button in the sidebar
4. Switch between conversations by clicking on them in the sidebar
5. Enjoy the full Markdown rendering in both your messages and the AI responses

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgements

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Google Gemini](https://ai.google.dev/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
