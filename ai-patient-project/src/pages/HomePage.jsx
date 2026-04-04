import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleStartInterview = () => {
    navigate('/interview');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Describe your patent, let AI write the report
        </h1>
        <p className="text-lg text-gray-600">
          Streamline your patent documentation process with AI assistance.
        </p>
      </div>

      <div className="mb-8">
        <ol className="list-decimal list-inside text-gray-700 text-lg">
          <li className="mb-2">Speak</li>
          <li className="mb-2">AI generates report</li>
          <li>Doctor receives it</li>
        </ol>
      </div>

      <button
        onClick={handleStartInterview}
        className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Start Interview
      </button>

      <p className="mt-6 text-sm text-gray-500 max-w-md text-center">
        This tool assists with patent documentation only. Always consult a registered patent attorney.
      </p>
    </div>
  );
}

export default HomePage;