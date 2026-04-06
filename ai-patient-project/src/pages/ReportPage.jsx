// import React, { useEffect, useRef, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import generateReport from '../services/generateReport';
// import parseReport from '../services/parseReport';
// import ReportCard from '../components/ReportCard';
// import './ReportPage.css';

// function ReportPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [report, setReport] = useState(null);
//   const hasFetched = useRef(false);

//   useEffect(() => {
//     // Guard against React StrictMode double-invoke in development
//     if (hasFetched.current) return;
//     hasFetched.current = true;

//     const fetchReport = async () => {
//       const transcript =
//         localStorage.getItem('transcript') ||
//         location.state?.transcript;

//       if (!transcript) {
//         setError('No transcript found. Please go back and complete the interview.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const rawReport = await generateReport(transcript);
//         console.log(rawReport);
        
//         if (!rawReport) throw new Error('Empty response from model.');

//         const parsedReport = parseReport(rawReport);
//         setReport(parsedReport);
//         localStorage.removeItem('transcript');
//       } catch (err) {
//         console.error('Error generating report:', err);
//         setError('Failed to generate the report. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, []);

//   const handleRetry = () => {
//     navigate('/interview');
//   };

// if (loading) {
//   return (
//     <div className="loaderContainer">
//       <div className="loaderCard">
//         <div className="pulseRing">
//           <div className="pulseInner">
//             <svg viewBox="0 0 24 24">
//               <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
//             </svg>
//           </div>
//         </div>
//         <p className="loadingTitle">Analysing your details</p>
//         <p className="loadingText">Generating your medical report…</p>
//         <div className="loadingDots">
//           <span /><span /><span />
//         </div>
//       </div>
//     </div>
//   );
// }

// if (error) {
//   return (
//     <div className="errorContainer">
//       <div className="errorCard">
//         <div className="errorIcon">
//           <svg viewBox="0 0 24 24">
//             <circle cx="12" cy="12" r="9" />
//             <line x1="12" y1="8" x2="12" y2="12" />
//             <line x1="12" y1="16" x2="12.01" y2="16" />
//           </svg>
//         </div>
//         <p className="errorTitle">Something went wrong</p>
//         <p className="errorMessage">{error}</p>
//         <button onClick={handleRetry} className="retryButton">
//           Return to interview
//         </button>
//       </div>
//     </div>
//   );
// }

//   return (
//     <div className="reportContainer">
//       <ReportCard report={report} />
//     </div>
//   );
// }

// export default ReportPage;

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import generateReport from '../services/generateReport';
import parseReport from '../services/parseReport';
import ReportCard from '../components/ReportCard';
import './ReportPage.css';

function ReportPage() {
  const location   = useLocation();
  const navigate   = useNavigate();
  const hasFetched = useRef(false);

  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [report,  setReport]  = useState(null);

  useEffect(() => {
    // Guard against React StrictMode double-invoke in development
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchReport = async () => {
      // Priority: navigation state → localStorage (saved by useVapi on call-end)
      const transcript =
        location.state?.transcript ||
        localStorage.getItem('transcript');

      if (!transcript || transcript.trim().length === 0) {
        setError('No transcript found. Please go back and complete the interview.');
        setLoading(false);
        return;
      }

      try {
        const rawReport = await generateReport(transcript);

        if (!rawReport || rawReport.trim().length === 0) {
          throw new Error('Empty response from model.');
        }

        const parsed = parseReport(rawReport);
        setReport(parsed);
        localStorage.removeItem('transcript');   // clean up after successful parse
      } catch (err) {
        console.error('Error generating report:', err);
        setError('Failed to generate the report. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  const handleRetry = () => navigate('/interview');

  /* ── Loading ─────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="loaderContainer">
        <div className="loaderCard">
          <div className="pulseRing">
            <div className="pulseInner">
              <svg viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
          </div>
          <p className="loadingTitle">Analysing your details</p>
          <p className="loadingText">Generating your medical report…</p>
          <div className="loadingDots">
            <span /><span /><span />
          </div>
        </div>
      </div>
    );
  }

  /* ── Error ───────────────────────────────────────────────────── */
  if (error) {
    return (
      <div className="errorContainer">
        <div className="errorCard">
          <div className="errorIcon">
            <svg viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="errorTitle">Something went wrong</p>
          <p className="errorMessage">{error}</p>
          <button onClick={handleRetry} className="retryButton">
            Return to interview
          </button>
        </div>
      </div>
    );
  }

  /* ── Report ──────────────────────────────────────────────────── */
  return (
    <div className="reportContainer">
      <div className="reportPageHeader">
        <h1 className="reportPageTitle">Medical Report</h1>
        <p className="reportPageSub">Generated from your interview session</p>
      </div>
      {report && <ReportCard report={report} />}
    </div>
  );
}

export default ReportPage;