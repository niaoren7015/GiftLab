// frontend/src/App.js
import { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [code, setCode] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      const eventSource = new EventSource(process.env.REACT_APP_API_URL + '/stream');
      
      eventSource.onmessage = (e) => {
        const newMessage = JSON.parse(e.data);
        setMessages(prev => [...prev.slice(-49), newMessage]);
      };
      
    } catch (error) {
      alert('启动失败：' + error.message);
    }
  };

  return (
    <div className="container">
      <div className="input-box">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="请输入主播身份码"
        />
        <button onClick={handleSubmit}>开始监听</button>
      </div>
      
      <div className="message-board">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            {msg.type === 'danmu' && (
              <>
                <img src={msg.avatar} alt="头像" className="avatar"/>
                <div className="content">
                  <span className="username">{msg.username}</span>
                  <span className="text">{msg.content}</span>
                </div>
              </>
            )}
            {msg.type === 'gift' && (
              <>
                <div className="gift-icon">🎁</div>
                <div className="content">
                  <span className="username">{msg.username}</span>
                  赠送了 
                  <span className="gift-name">{msg.gift_name}</span>
                  ×{msg.amount}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
