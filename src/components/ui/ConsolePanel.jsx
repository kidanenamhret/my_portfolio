export default function ConsolePanel({ backend }) {
  const {
    likes,
    messages,
    shares,
    statusMsg,
    msgStyle,
    consoleOpen,
    setConsoleOpen,
    consoleLogs,
    handleHire,
    handleMessage,
    handleNodeRun
  } = backend;

  if (!consoleOpen) {
    return (
      <button className="debug-toggle" onClick={() => setConsoleOpen(true)}>
        <span className="debug-badge"></span>
        ⚡ Live Console
      </button>
    );
  }

  return (
    <>
      <button className="debug-toggle" onClick={() => setConsoleOpen(false)}>
        <span className="debug-badge"></span>
        Close Live Panel
      </button>

      <div className="console-panel">
        <div className="console-header">
          <span className="console-title">
            <i className="bx bx-server"></i> Simulated Server Backend
          </span>
          <button className="console-close" onClick={() => setConsoleOpen(false)}>
            &times;
          </button>
        </div>
        <div className="console-body">
          <div className="console-status-row">
            <span>Status:</span>
            <span className="status-badge" style={{ color: msgStyle, background: 'rgba(78, 225, 160, 0.1)' }}>
              {statusMsg}
            </span>
          </div>

          <div className="console-stats">
            <div className="console-stat-card">
              <span className="console-stat-num">{likes}</span>
              <span className="console-stat-lbl">Likes</span>
            </div>
            <div className="console-stat-card">
              <span className="console-stat-num">{messages}</span>
              <span className="console-stat-lbl">Chats</span>
            </div>
            <div className="console-stat-card">
              <span className="console-stat-num">{shares}</span>
              <span className="console-stat-lbl">Runs</span>
            </div>
          </div>

          <div className="console-actions">
            <button className="console-btn" onClick={handleHire}>
              <i className="bx bx-heart"></i> Trigger /api/hire
            </button>
            <button className="console-btn" onClick={handleMessage}>
              <i className="bx bx-envelope"></i> Trigger /api/message
            </button>
            <button className="console-btn special" onClick={handleNodeRun}>
              <i className="bx bx-play-circle"></i> Run Express Middleware
            </button>
          </div>

          <div className="console-logs">
            {consoleLogs.map((log, idx) => (
              <div key={idx} className={`log-entry ${log.type}`}>
                [{log.time}] [{log.type.toUpperCase()}] {log.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
