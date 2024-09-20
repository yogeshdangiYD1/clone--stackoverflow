import React from 'react';
import './Replies.css'; // Import CSS for better styling

const Replies = ({ replies }) => {
  if (!replies || replies.length === 0) {
    return <p>No replies yet.</p>;
  }

  return (
    <div className="replies-container">
      <h2>Replies</h2>
      <ul className="replies-list">
        {replies.map((reply, index) => (
          <li key={index} className="reply-card">
            <div className="reply-content">
              <p>{reply.content}</p>
            </div>
            <div className="reply-footer">
              <strong>{reply.commentowner?.name || 'Unknown User'}</strong>
              <span className="email">({reply.commentowner?.email || 'No email'})</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Replies;
