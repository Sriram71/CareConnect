import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useVapi from '../hooks/useVapi';
import './Interview.css';

function InterviewPage() {
  const navigate = useNavigate();
  const { startCall, stopCall, transcript, messages, partial, isListening, vapiError } = useVapi();
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom as new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, partial]);

  const handleToggle = () => {
    if (isListening) {
      stopCall();
    } else {
      startCall();
    }
  };

  const handleGenerateReport = () => {
    navigate('/report', { state: { transcript } });
  };

  // return (
  //   <div className="interviewPage">
  //     <h2 className="interviewTitle">Medical Interview</h2>

  //     {vapiError && <p className="formError">{vapiError}</p>}

  //     <div className="chatPanel">
  //       {messages.length === 0 && !partial.text && (
  //         <p className="chatPlaceholder">Press the mic to start your interview…</p>
  //       )}

  //       {messages.map((msg, i) => (
  //         <div key={i} className={`chatBubble ${msg.role === 'assistant' ? 'bubbleAssistant' : 'bubbleUser'}`}>
  //           <span className="bubbleLabel">{msg.role === 'assistant' ? '🤖 Assistant' : '🧑 You'}</span>
  //           <p className="bubbleText">{msg.text}</p>
  //         </div>
  //       ))}

  //       {/* Live partial — shows as the current speaker types */}
  //       {partial.text && (
  //         <div className={`chatBubble bubblePartial ${partial.role === 'assistant' ? 'bubbleAssistant' : 'bubbleUser'}`}>
  //           <span className="bubbleLabel">{partial.role === 'assistant' ? '🤖 Assistant' : '🧑 You'}</span>
  //           <p className="bubbleText">{partial.text}<span className="typingCursor" /></p>
  //         </div>
  //       )}

  //       <div ref={chatEndRef} />
  //     </div>

  //     <button
  //       onClick={handleToggle}
  //       aria-label={isListening ? 'Stop listening' : 'Start listening'}
  //       tabIndex="0"
  //       onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleToggle(); }}
  //       className={`micButton ${isListening ? 'micButtonListening' : ''}`}
  //     >
  //       🎤
  //     </button>

  //     <div className="actionRow">
  //       <button
  //         onClick={handleGenerateReport}
  //         disabled={transcript.length <= 100}
  //         className="actionButton"
  //       >
  //         Done — Generate report
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
  <div className="interviewPage">

    <div className="interviewHeader">
      <h2 className="interviewTitle">Medical Interview</h2>
      <p className="interviewSubtitle">Speak naturally — we'll handle the rest</p>
    </div>

    {vapiError && (
      <p className="formError">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="9"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        {vapiError}
      </p>
    )}

    <div className="chatPanel">
      {messages.length === 0 && !partial.text && (
        <p className="chatPlaceholder">Press the mic to start your interview…</p>
      )}

      {messages.map((msg, i) => (
        <div key={i} className={`chatBubble ${msg.role === 'assistant' ? 'bubbleAssistant' : 'bubbleUser'}`}>
          <span className="bubbleLabel">
            <span className={`bubbleLabelDot ${msg.role === 'assistant' ? 'dotAssistant' : 'dotUser'}`} />
            {msg.role === 'assistant' ? 'Assistant' : 'You'}
          </span>
          <p className="bubbleText">{msg.text}</p>
        </div>
      ))}

      {partial.text && (
        <div className={`chatBubble bubblePartial ${partial.role === 'assistant' ? 'bubbleAssistant' : 'bubbleUser'}`}>
          <span className="bubbleLabel">
            <span className={`bubbleLabelDot ${partial.role === 'assistant' ? 'dotAssistant' : 'dotUser'}`} />
            {partial.role === 'assistant' ? 'Assistant' : 'You'}
          </span>
          <p className="bubbleText">{partial.text}<span className="typingCursor" /></p>
        </div>
      )}

      <div ref={chatEndRef} />
    </div>

    <div className="controls">
      <div className="micWrap">
        {isListening && <div className="micRing" />}
        <button
          onClick={handleToggle}
          aria-label={isListening ? 'Stop listening' : 'Start listening'}
          className={`micButton ${isListening ? 'micButtonListening' : ''}`}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleToggle(); }}
        >
          <svg viewBox="0 0 24 24">
            <rect x="9" y="2" width="6" height="12" rx="3" />
            <path d="M5 10a7 7 0 0 0 14 0" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
      </div>

      <p className="micStatusLabel">
        {isListening ? 'Listening… tap to stop' : 'Tap to start speaking'}
      </p>

      <div className="actionRow">
        <button
          onClick={handleGenerateReport}
          disabled={transcript.length <= 100}
          className="actionButton"
        >
          Done — generate report
        </button>
      </div>
    </div>

  </div>
);
}

export default InterviewPage;