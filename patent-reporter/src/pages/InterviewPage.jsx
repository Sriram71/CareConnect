import React from 'react';
import { useNavigate } from 'react-router-dom';
import useVapi from '../hooks/useVapi';

function InterviewPage() {
  const navigate = useNavigate();
  const { startCall, stopCall, transcript, isListening, vapiError } = useVapi();

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
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Interview Page</h2>

      {vapiError && <p className="text-red-500 mb-4">{vapiError}</p>}

      <button
        onClick={handleToggle}
        aria-label={isListening ? 'Stop listening' : 'Start listening'}
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleToggle();
          }
        }}
        className={`w-16 h-16 rounded-full flex items-center justify-center bg-blue-600 text-white shadow-lg focus:outline-none ${
          isListening ? 'animate-pulse' : ''
        }`}
      >
        🎤
      </button>

      <div
        className="mt-4 p-4 w-full max-w-lg h-48 bg-gray-100 border border-gray-300 rounded overflow-y-auto"
      >
        <p className="whitespace-pre-wrap text-sm">{transcript}</p>
      </div>

      <button
        onClick={handleGenerateReport}
        disabled={transcript.length <= 100}
        className={`mt-4 px-6 py-2 rounded text-white font-bold ${
          transcript.length > 100 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Done — Generate Report
      </button>
    </div>
  );
}

export default InterviewPage;