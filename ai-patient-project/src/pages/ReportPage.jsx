// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import generateReport from '../services/generateReport';
// import parseReport from '../services/parseReport';
// import sendReport from '../services/sendReport';
// import ReportCard from '../components/ReportCard';

// function ReportPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [report, setReport] = useState(null);
//   const [sending, setSending] = useState(false);
//   const [sendSuccess, setSendSuccess] = useState(false);
//   const [sendError, setSendError] = useState(null);

//   useEffect(() => {
//     const fetchReport = async () => {
//       if (!location.state || !location.state.transcript) {
//         setError('No transcript found. Please go back and try again.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const rawReport = await generateReport(location.state.transcript);
//         const parsedReport = parseReport(rawReport);
//         setReport(parsedReport);
//       } catch (err) {
//         console.error('Error generating report:', err);
//         setError('Failed to generate the report. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [location.state]);

//   const handleRetry = () => {
//     setError(null);
//     setLoading(true);
//     navigate('/interview');
//   };

//   const handleSendToDoctor = async () => {
//     setSending(true);
//     setSendError(null);

//     try {
//       await sendReport(report);
//       setSendSuccess(true);
//     } catch (error) {
//       console.error('Error sending report:', error);
//       setSendError('Failed to send the report. Please try again.');
//     } finally {
//       setSending(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen" role="status">
//         <div className="loader mb-4"></div>
//         <p className="text-lg font-medium">Analysing your patent details…</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
//           {error}
//         </div>
//         <button
//           onClick={handleRetry}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <ReportCard report={report} />

//       {sendSuccess && (
//         <p className="mt-6 text-green-600 font-bold" role="status">
//           Report sent to your doctor ✓
//         </p>
//       )}
//     </div>
//   );
// }

// export default ReportPage;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import generateReport from '../services/generateReport';
import parseReport from '../services/parseReport';
import sendReport from '../services/sendReport';
import ReportCard from '../components/ReportCard';
import './ReportPage.css';

function ReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState(null);

//   useEffect(() => {
//     const fetchReport = async () => {
//       if (!location.state || !location.state.transcript) {
//         setError('No transcript found. Please go back and try again.');
//         setLoading(false);
//         return;
//       }

//       try {

// console.log(location.state.transcript);

// // const rawReport = await generateReport(location.state.transcript);
// const rawReport = await generateReport(location.state.transcript);

// console.log("FINAL TEXT:", rawReport);

// if (!rawReport) {
//   throw new Error("Empty response from model.");
// }

// const parsedReport = parseReport(rawReport);

// console.log("parse TEXT:", parsedReport);

// // const parsedReport = parseReport(text);
// setReport(parsedReport);
//       } catch (err) {
//         console.error('Error generating report:', err);
//         setError('Failed to generate the report. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [location.state]);

useEffect(() => {
  const fetchReport = async () => {
    // Read from localStorage first, fall back to location.state
    const transcript =
      localStorage.getItem("transcript") ||
      location.state?.transcript;

    if (!transcript) {
      setError("No transcript found. Please go back and try again.");
      setLoading(false);
      return;
    }

    try {
      console.log("Transcript:", transcript);
      const rawReport = await generateReport(transcript);

      console.log("Raw report:", rawReport);
      if (!rawReport) throw new Error("Empty response from model.");

      const parsedReport = parseReport(rawReport);
      console.log("Parsed report:", parsedReport);

      setReport(parsedReport);

      // Clean up after successful use
      localStorage.removeItem("transcript");
    } catch (err) {
      console.error("Error generating report:", err);
      setError("Failed to generate the report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchReport();
}, []); // ✅ empty deps — no longer depends on location.state
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    navigate('/interview');
  };

  if (loading) {
    return (
      <div className="loaderContainer">
        <div className="loader"></div>
        <p className="loadingText">Analysing your patent details…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="errorContainer">
        <div className="errorBox">{error}</div>
        <button onClick={handleRetry} className="retryButton">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="reportContainer">
      <ReportCard report={report} />

      {sendSuccess && (
        <p className="successMessage">
          Report sent to your doctor ✓
        </p>
      )}
    </div>
  );
}

export default ReportPage;