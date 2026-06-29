import React, { useEffect, useState } from 'react';
import './Header.css';

function Header() {
  const [status, setStatus] = useState('checking'); // 'checking' | 'connected' | 'disconnected'

  useEffect(() => {
    const checkStatus = () => {
      fetch('http://localhost:5000/api/health')
        .then((res) => {
          if (res.ok) {
            setStatus('connected');
          } else {
            setStatus('disconnected');
          }
        })
        .catch(() => {
          setStatus('disconnected');
        });
    };

    checkStatus();
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <div className="logo-container">
        <span className="logo-icon">⚡</span>
        <h1 className="logo-text">SemanticLLM Cache</h1>
      </div>
      <div className="status-container">
        <span className={`status-dot ${status}`}></span>
        <span className="status-text">
          {status === 'checking' && 'Checking status...'}
          {status === 'connected' && 'API Connected'}
          {status === 'disconnected' && 'API Disconnected'}
        </span>
      </div>
    </header>
  );
}

export default Header;
