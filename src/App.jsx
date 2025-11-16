import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import axios from 'axios';

const WEBHOOK_URL = 'https://hellocm.app.n8n.cloud/webhook/cb3c76f3-788a-44bc-8702-8ec602f18e3b';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToWebhook = async (userMessage) => {
    try {
      const response = await axios.post(WEBHOOK_URL, {
        message: userMessage,
        timestamp: new Date().toISOString(),
        type: 'chat_message'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Return the entire response data
      return response.data;
    } catch (error) {
      console.error('Error sending to webhook:', error);
      throw error;
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to webhook and get response
      const webhookResponse = await sendMessageToWebhook(text);
      
      // Extract response from webhook - check multiple possible fields
      let aiResponseText = '';
      
      if (webhookResponse.response) {
        aiResponseText = webhookResponse.response;
      } else if (webhookResponse.message) {
        aiResponseText = webhookResponse.message;
      } else if (webhookResponse.reply) {
        aiResponseText = webhookResponse.reply;
      } else if (webhookResponse.output) {
        aiResponseText = webhookResponse.output;
      } else if (typeof webhookResponse === 'string') {
        aiResponseText = webhookResponse;
      } else {
        // If none of the above, stringify the response
        aiResponseText = JSON.stringify(webhookResponse, null, 2);
      }
      
      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error processing your message. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="app">
      <div className="main-content">
        <header className="header">
          <h1>AI Chat Assistant</h1>
        </header>

        <div className="chat-container">
          <div className="messages-wrapper">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="message ai-message">
                <div className="message-avatar">AI</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
