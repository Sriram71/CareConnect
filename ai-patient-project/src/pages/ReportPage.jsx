import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import generateReport from '../services/generateReport';
import parseReport from '../services/parseReport';
import ReportCard from '../components/ReportCard';
import './ReportPage.css';

function ReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Guard against React StrictMode double-invoke in development
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchReport = async () => {
      const transcript =
        localStorage.getItem('transcript') ||
        location.state?.transcript;

      if (!transcript) {
        setError('No transcript found. Please go back and complete the interview.');
        setLoading(false);
        return;
      }

      try {
        const rawReport = await generateReport(transcript);
        if (!rawReport) throw new Error('Empty response from model.');

        const parsedReport = parseReport(rawReport);
        setReport(parsedReport);
        localStorage.removeItem('transcript');
      } catch (err) {
        console.error('Error generating report:', err);
        setError('Failed to generate the report. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const handleRetry = () => {
    navigate('/interview');
  };

  if (loading) {
    return (
      <div className="loaderContainer">
        <div className="loader"></div>
        <p className="loadingText">Analysing your medical details…</p>
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
    </div>
  );
}

export default ReportPage;
