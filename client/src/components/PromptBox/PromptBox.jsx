import React, { useState } from 'react';
import './PromptBox.css';

/**
 * PromptBox component providing a clean multiline textarea input with an inline loading spinner.
 * @param {object} props
 * @param {function} props.onSubmit - Submission callback receiving input string
 * @param {boolean} props.loading - Indicates connection state loading
 */
function PromptBox({ onSubmit, loading }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    onSubmit(prompt.trim());
    setPrompt('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="prompt-box-container" onSubmit={handleSubmit}>
      <textarea
        className="prompt-textarea"
        placeholder="Query the LLM Cache (e.g. 'What is semantic vector search?')"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        rows={5}
      />
      <div className="prompt-footer-row">
        <span className="keyboard-tip">Press Enter to send, Shift + Enter for new line</span>
        <button
          type="submit"
          className="prompt-submit-btn"
          disabled={loading || !prompt.trim()}
        >
          {loading ? (
            <span className="button-spinner-container">
              <svg className="btn-spinner-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending
            </span>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </form>
  );
}

export default PromptBox;
