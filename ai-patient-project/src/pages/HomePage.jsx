// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function HomePage() {
//   const navigate = useNavigate();

//   const handleStartInterview = () => {
//     navigate('/interview');
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">
//           Describe your symptoms, let AI write the report
//         </h1>
//         <p className="text-lg text-gray-600">
//           Streamline your medical consultation process with AI assistance.
//         </p>
//       </div>

//       <div className="mb-8">
//         <ol className="list-decimal list-inside text-gray-700 text-lg">
//           <li className="mb-2">Speak</li>
//           <li className="mb-2">AI generates report</li>
//           <li>Doctor receives it</li>
//         </ol>
//       </div>

//       <button
//         onClick={handleStartInterview}
//         className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
//       >
//         Start Interview
//       </button>

//       <p className="mt-6 text-sm text-gray-500 max-w-md text-center">
//         This tool assists with medical documentation only. Always consult a licensed medical professional.
//       </p>
//     </div>
//   );
// }

// export default HomePage;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './HomePage.css';

// function HomePage() {
//   const navigate = useNavigate();

//   const handleStartInterview = () => {
//     navigate('/interview');
//   };

//   return (
//     <div className="homeContainer">
//       <div className="homeHeader">
//         <h1 className="homeTitle">
//           Describe your symptoms, let AI write the report
//         </h1>
//         <p className="homeSubtitle">
//           Streamline your medical consultation process with AI assistance.
//         </p>
//       </div>

//       <div className="stepsContainer">
//         <ol className="stepsList">
//           <li className="stepItem">Speak</li>
//           <li className="stepItem">AI generates report</li>
//           <li className="stepItem">Doctor receives it</li>
//         </ol>
//       </div>

//       <button
//         onClick={handleStartInterview}
//         className="startButton"
//       >
//         Start Interview
//       </button>

//       <p className="disclaimer">
//         This tool assists with medical documentation only. Always consult a licensed medical professional.
//       </p>
//     </div>
//   );
// }

// export default HomePage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const steps = [
  {
    label: 'Speak',
    desc: 'Describe your symptoms in your own words',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M5 10a7 7 0 0 0 14 0" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    label: 'AI analyses',
    desc: 'Your interview is turned into a structured report',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    label: 'Doctor receives',
    desc: 'Share the report directly with your physician',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07" />
        <path d="M14.05 2.21a19.79 19.79 0 0 1 5.74 5.74" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ),
  },
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homeContainer">

      <span className="homeBadge">
        <span className="homeBadgeDot" />
        AI-powered
      </span>

      <div className="homeHeader">
        <h1 className="homeTitle">
          Describe your symptoms,<br />
          let AI write the <em>report</em>
        </h1>
        <p className="homeSubtitle">
          Speak naturally during your interview and receive a structured
          medical report — ready for your doctor.
        </p>
      </div>

      <div className="stepsContainer">
        {steps.map((step, i) => (
          <React.Fragment key={step.label}>
            <div className="stepItem">
              <div className="stepIcon">{step.icon}</div>
              <span className="stepLabel">{step.label}</span>
              <span className="stepDesc">{step.desc}</span>
            </div>
            {i < steps.length - 1 && <div className="stepConnector" />}
          </React.Fragment>
        ))}
      </div>

      <div className="ctaContainer">
        <button onClick={() => navigate('/interview')} className="startButton">
          Start 
        </button>

        <p className="disclaimer">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          This tool assists with medical documentation only. Always consult
          a licensed medical professional.
        </p>
      </div>

    </div>
  );
}

export default HomePage;