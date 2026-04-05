import React from 'react';
import PropTypes from 'prop-types';
import PriorityBadge from './PriorityBadge';

function ReportCard({ report }) {
  const { patientName, issueSummary, priorityLevel, recommendations } = report;

  return (
    <div className="border border-gray-200 rounded-xl p-6 shadow-md bg-white max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Patient</p>
          <h2 className="text-2xl font-bold text-gray-800">{patientName}</h2>
        </div>
        <PriorityBadge level={priorityLevel} />
      </div>

      <div className="mb-5">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Summary of Issue</p>
        <p className="text-gray-700 text-base leading-relaxed">{issueSummary}</p>
      </div>

      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Key Recommendations</p>
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ReportCard.propTypes = {
  report: PropTypes.shape({
    patientName: PropTypes.string.isRequired,
    issueSummary: PropTypes.string.isRequired,
    priorityLevel: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
    recommendations: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ReportCard;