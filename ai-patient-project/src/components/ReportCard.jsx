// import React from 'react';
// import PropTypes from 'prop-types';
// import PriorityBadge from './PriorityBadge';

// function ReportCard({ report }) {
//   const { patientName, issueSummary, priorityLevel, recommendations } = report;

//   return (
//     <div className="border border-gray-200 rounded-xl p-6 shadow-md bg-white max-w-2xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Patient</p>
//           <h2 className="text-2xl font-bold text-gray-800">{patientName}</h2>
//         </div>
//         <PriorityBadge level={priorityLevel} />
//       </div>

//       <div className="mb-5">
//         <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Summary of Issue</p>
//         <p className="text-gray-700 text-base leading-relaxed">{issueSummary}</p>
//       </div>

//       <div>
//         <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Key Recommendations</p>
//         <ul className="space-y-2">
//           {recommendations.map((rec, index) => (
//             <li key={index} className="flex items-start gap-2 text-gray-700">
//               <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
//               {rec}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// ReportCard.propTypes = {
//   report: PropTypes.shape({
//     patientName: PropTypes.string.isRequired,
//     issueSummary: PropTypes.string.isRequired,
//     priorityLevel: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
//     recommendations: PropTypes.arrayOf(PropTypes.string).isRequired,
//   }).isRequired,
// };

// export default ReportCard;


// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import PriorityBadge from './PriorityBadge';
// import downloadReport from '../services/downloadReport';
// import sendReport from '../services/sendReport';
// import './ReportCard.css';

// function ReportCard({ report }) {
//   const { patientName, issueSummary, priorityLevel, recommendations } = report;
//   const [sendState, setSendState] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'

//   const handleDownload = () => {
//     downloadReport(report);
//   };

//   const handleSend = async () => {
//     setSendState('sending');
//     try {
//       const result = await sendReport(report);
//       setSendState('sent');
//       if (result.demo) {
//         console.info('Demo mode: email was not actually sent.');
//       }
//     } catch (err) {
//       console.error('Send error:', err);
//       setSendState('error');
//     }
//   };

//   const sendLabel = {
//     idle:    'Send to Doctor',
//     sending: 'Sending…',
//     sent:    '✓ Report Sent',
//     error:   'Retry Send',
//   }[sendState];

//   return (
//     <div className="reportCard">

//       {/* ── Header ── */}
//       <div className="reportCard__header">
//         <div className="reportCard__patientInfo">
//           <p className="reportCard__label">Patient</p>
//           <h2 className="reportCard__name">{patientName}</h2>
//         </div>
//         <PriorityBadge level={priorityLevel} />
//       </div>

//       <div className="reportCard__divider" />

//       {/* ── Summary ── */}
//       <section className="reportCard__section">
//         <p className="reportCard__label">Summary of Issue</p>
//         <p className="reportCard__body">{issueSummary}</p>
//       </section>

//       {/* ── Recommendations ── */}
//       <section className="reportCard__section">
//         <p className="reportCard__label">Key Recommendations</p>
//         <ul className="reportCard__recList">
//           {recommendations.map((rec, index) => (
//             <li key={index} className="reportCard__recItem">
//               <span className="reportCard__recBullet" />
//               <span>{rec}</span>
//             </li>
//           ))}
//         </ul>
//       </section>

//       <div className="reportCard__divider" />

//       {/* ── Actions ── */}
//       <div className="reportCard__actions">

//         <button
//           className="reportCard__btn reportCard__btn--download"
//           onClick={handleDownload}
//         >
//           <svg viewBox="0 0 24 24" width="16" height="16"
//                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//             <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//             <polyline points="7 10 12 15 17 10" />
//             <line x1="12" y1="15" x2="12" y2="3" />
//           </svg>
//           Download Report
//         </button>

//         <button
//           className={`reportCard__btn reportCard__btn--send ${sendState === 'sent' ? 'reportCard__btn--sent' : ''}`}
//           onClick={handleSend}
//           disabled={sendState === 'sending' || sendState === 'sent'}
//         >
//           {sendState === 'sending' ? (
//             <span className="reportCard__spinner" />
//           ) : (
//             <svg viewBox="0 0 24 24" width="16" height="16"
//                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//               <line x1="22" y1="2" x2="11" y2="13" />
//               <polygon points="22 2 15 22 11 13 2 9 22 2" />
//             </svg>
//           )}
//           {sendLabel}
//         </button>

//       </div>

//       {sendState === 'error' && (
//         <p className="reportCard__sendError">
//           Could not send the report. Please try again.
//         </p>
//       )}

//     </div>
//   );
// }

// ReportCard.propTypes = {
//   report: PropTypes.shape({
//     patientName:     PropTypes.string.isRequired,
//     issueSummary:    PropTypes.string.isRequired,
//     priorityLevel:   PropTypes.string.isRequired,
//     recommendations: PropTypes.arrayOf(PropTypes.string).isRequired,
//   }).isRequired,
// };

// export default ReportCard;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PriorityBadge from './PriorityBadge';
import downloadReport from '../services/downloadReport';
import sendReport from '../services/sendReport';
import './ReportCard.css';

/* ── Tiny SVG icon helper ── */
const Icon = ({ d, size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}
       fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

/* ── Colour-coded bullet list ── */
function BulletList({ items, color }) {
  if (!items || items.length === 0) {
    return <p className="reportCard__body reportCard__body--muted">None specified.</p>;
  }
  return (
    <ul className="reportCard__list">
      {items.map((item, i) => (
        <li key={i} className="reportCard__listItem">
          <span className={`reportCard__bullet reportCard__bullet--${color}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Section heading with coloured icon ── */
function SectionLabel({ children, iconD, iconColor }) {
  return (
    <p className="reportCard__label">
      <span className={`reportCard__sectionIcon reportCard__sectionIcon--${iconColor}`}>
        <Icon d={iconD} size={13} />
      </span>
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function ReportCard({ report }) {
  const { patientName, issueSummary, priorityLevel,
          recommendations, dos, donts, medicines } = report;

  const [sendState, setSendState] = useState('idle');
  // 'idle' | 'sending' | 'sent' | 'error'

  const handleDownload = () => downloadReport(report);

  const handleSend = async () => {
    setSendState('sending');
    try {
      const result = await sendReport(report);
      setSendState('sent');
      if (result.demo) console.info('[ReportCard] Demo mode — email not sent.');
    } catch (err) {
      console.error('[ReportCard] Send error:', err);
      setSendState('error');
    }
  };

  const sendLabel = {
    idle:    'Send to Doctor',
    sending: 'Sending…',
    sent:    '✓ Report Sent',
    error:   'Retry Send',
  }[sendState];

  return (
    <div className="reportCard">

      {/* ── Header ── */}
      <div className="reportCard__header">
        <div className="reportCard__patientInfo">
          <p className="reportCard__label" style={{ marginBottom: 4 }}>Patient</p>
          <h2 className="reportCard__name">{patientName}</h2>
        </div>
        <PriorityBadge level={priorityLevel} />
      </div>

      <div className="reportCard__divider" />

      {/* ── Summary ── */}
      <section className="reportCard__section">
        <SectionLabel
          iconD="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          iconColor="blue"
        >
          Summary of Issue
        </SectionLabel>
        <p className="reportCard__body">{issueSummary}</p>
      </section>

      {/* ── Recommendations ── */}
      <section className="reportCard__section">
        <SectionLabel
          iconD="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
          iconColor="blue"
        >
          Key Recommendations
        </SectionLabel>
        <BulletList items={recommendations} color="blue" />
      </section>

      <div className="reportCard__divider" />

      {/* ── Do's ── */}
      <section className="reportCard__section">
        <SectionLabel
          iconD="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"
          iconColor="green"
        >
          What You Should Do
        </SectionLabel>
        <BulletList items={dos} color="green" />
      </section>

      {/* ── Don'ts ── */}
      <section className="reportCard__section">
        <SectionLabel
          iconD="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"
          iconColor="red"
        >
          What You Must Avoid
        </SectionLabel>
        <BulletList items={donts} color="red" />
      </section>

      {/* ── Medicines ── */}
      <section className="reportCard__section">
        <SectionLabel
          iconD="M12 2a3 3 0 0 0-3 3v1H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2V5a3 3 0 0 0-3-3zM9 6V5a3 3 0 0 1 6 0v1M12 12v4M10 14h4"
          iconColor="purple"
        >
          Medicines &amp; Supplements
        </SectionLabel>
        <BulletList items={medicines} color="purple" />
      </section>

      <div className="reportCard__divider" />

      {/* ── Disclaimer ── */}
      <p className="reportCard__disclaimer">
        ⚕ This report is auto-generated for informational purposes only.
        Always consult a qualified healthcare professional before taking any action.
      </p>

      {/* ── Action buttons ── */}
      <div className="reportCard__actions">

        <button
          className="reportCard__btn reportCard__btn--download"
          onClick={handleDownload}
        >
          <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          Download Report
        </button>

        <button
          className={`reportCard__btn reportCard__btn--send${sendState === 'sent' ? ' reportCard__btn--sent' : ''}`}
          onClick={handleSend}
          disabled={sendState === 'sending' || sendState === 'sent'}
        >
          {sendState === 'sending'
            ? <span className="reportCard__spinner" />
            : <Icon d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          }
          {sendLabel}
        </button>

      </div>

      {sendState === 'error' && (
        <p className="reportCard__sendError">
          Could not send the report. Please try again.
        </p>
      )}

    </div>
  );
}

ReportCard.propTypes = {
  report: PropTypes.shape({
    patientName:     PropTypes.string.isRequired,
    issueSummary:    PropTypes.string.isRequired,
    priorityLevel:   PropTypes.string.isRequired,
    recommendations: PropTypes.arrayOf(PropTypes.string).isRequired,
    dos:             PropTypes.arrayOf(PropTypes.string).isRequired,
    donts:           PropTypes.arrayOf(PropTypes.string).isRequired,
    medicines:       PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ReportCard;