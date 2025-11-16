import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`message ${message.sender}-message ${message.isError ? 'error-message' : ''}`}>
      <div className="message-avatar">
        {message.sender === 'user' ? 'U' : 'AI'}
      </div>
      <div className="message-content">
        <div className="message-text">{message.text}</div>
        <div className="message-timestamp">
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
