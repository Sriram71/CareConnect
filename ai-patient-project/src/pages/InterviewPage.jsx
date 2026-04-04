// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import useVapi from '../hooks/useVapi';

// function InterviewPage() {
//   const navigate = useNavigate();
//   const { startCall, stopCall, transcript, isListening, vapiError } = useVapi();

//   const handleToggle = () => {
//     if (isListening) {
//       stopCall();
//     } else {
//       startCall();
//     }
//   };

//   const handleGenerateReport = () => {
//     navigate('/report', { state: { transcript } });
//   };

//   return (
//     <div className="flex flex-col items-center p-4">
//       <h2 className="text-2xl font-bold mb-4">Interview Page</h2>

//       {vapiError && <p className="text-red-500 mb-4">{vapiError}</p>}

//       <button
//         onClick={handleToggle}
//         aria-label={isListening ? 'Stop listening' : 'Start listening'}
//         tabIndex="0"
//         onKeyDown={(e) => {
//           if (e.key === 'Enter' || e.key === ' ') {
//             handleToggle();
//           }
//         }}
//         className={`w-16 h-16 rounded-full flex items-center justify-center bg-blue-600 text-white shadow-lg focus:outline-none ${
//           isListening ? 'animate-pulse' : ''
//         }`}
//       >
//         🎤
//       </button>

//       <div
//         className="mt-4 p-4 w-full max-w-lg h-48 bg-gray-100 border border-gray-300 rounded overflow-y-auto"
//       >
//         <p className="whitespace-pre-wrap text-sm">{transcript}</p>
//       </div>

//       <button
//         onClick={handleGenerateReport}
//         disabled={transcript.length <= 100}
//         className={`mt-4 px-6 py-2 rounded text-white font-bold ${
//           transcript.length > 100 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
//         }`}
//       >
//         Done — Generate Report
//       </button>
//     </div>
//   );
// }

// export default InterviewPage;
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

  return (
    <div className="interviewPage">
      <h2 className="interviewTitle">Medical Interview</h2>

      {vapiError && <p className="formError">{vapiError}</p>}

      <div className="chatPanel">
        {messages.length === 0 && !partial.text && (
          <p className="chatPlaceholder">Press the mic to start your interview…</p>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`chatBubble ${msg.role === 'assistant' ? 'bubbleAssistant' : 'bubbleUser'}`}>
            <span className="bubbleLabel">{msg.role === 'assistant' ? '🤖 Assistant' : '🧑 You'}</span>
            <p className="bubbleText">{msg.text}</p>
          </div>
        ))}

        {/* Live partial — shows as the current speaker types */}
        {partial.text && (
          <div className={`chatBubble bubblePartial ${partial.role === 'assistant' ? 'bubbleAssistant' : 'bubbleUser'}`}>
            <span className="bubbleLabel">{partial.role === 'assistant' ? '🤖 Assistant' : '🧑 You'}</span>
            <p className="bubbleText">{partial.text}<span className="typingCursor" /></p>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <button
        onClick={handleToggle}
        aria-label={isListening ? 'Stop listening' : 'Start listening'}
        tabIndex="0"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleToggle(); }}
        className={`micButton ${isListening ? 'micButtonListening' : ''}`}
      >
        🎤
      </button>

      <div className="actionRow">
        <button
          onClick={handleGenerateReport}
          disabled={transcript.length <= 100}
          className="actionButton"
        >
          Done — Generate report
        </button>
      </div>
    </div>
  );
}

export default InterviewPage;