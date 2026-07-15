import { useState, useEffect, useRef } from 'react';
import { MAX_LOGS } from '../data/constants';

export function useSimulatedBackend() {
  const [likes, setLikes] = useState(64);
  const [messages, setMessages] = useState(23);
  const [shares, setShares] = useState(15);
  const [statusMsg, setStatusMsg] = useState('online · ready to connect');
  const [msgStyle, setMsgStyle] = useState('#4ee1a0');
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);

  const statusTimeoutRef = useRef(null);

  const addLog = (message, type = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setConsoleLogs(prev => [...prev.slice(-(MAX_LOGS - 1)), { time, message, type }]);
  };

  const setTemporaryStatus = (text, color = '#4ee1a0') => {
    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    setStatusMsg(text);
    setMsgStyle(color);
    statusTimeoutRef.current = setTimeout(() => {
      setStatusMsg('online · ready to connect');
      setMsgStyle('#4ee1a0');
    }, 2500);
  };

  const handleHire = () => {
    addLog('POST /api/hire - 200 OK - { dev: "Mesfin" }', 'success');
    setLikes(l => l + 1);
    setTemporaryStatus('hiring request sent', '#4ee1a0');
  };

  const handleMessage = () => {
    addLog('POST /api/message - 200 OK - { to: "Mesfin" }', 'success');
    addLog('Socket.io - client message dispatched', 'info');
    setMessages(m => m + 1);
    setTemporaryStatus('message delivered', '#4ee1a0');
  };

  const handleNodeRun = () => {
    addLog('System - starting server middleware process...', 'warn');
    setTimeout(() => {
      addLog('Express - CORS middleware checks passed', 'info');
      addLog('Express - static path distribution active', 'success');
      setShares(s => s + 1);
      setTemporaryStatus('server middleware active', '#4ee1a0');
    }, 500);
  };

  // Log initial connection on startup
  useEffect(() => {
    addLog('System - connecting to simulated Node.js backend...', 'info');
    const initTimer = setTimeout(() => {
      addLog('Express - server running on port 5000', 'success');
      addLog('MongoDB - database state connected', 'success');
    }, 600);
    return () => {
      clearTimeout(initTimer);
      if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    };
  }, []);

  return {
    likes,
    messages,
    shares,
    statusMsg,
    msgStyle,
    consoleOpen,
    setConsoleOpen,
    consoleLogs,
    addLog,
    handleHire,
    handleMessage,
    handleNodeRun,
    setTemporaryStatus
  };
}
