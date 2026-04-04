import React from 'react';
import PropTypes from 'prop-types';
import PriorityBadge from './PriorityBadge';

function ReportCard({ report }) {
  const { inventorName, inventionSummary, priorityLevel, keyClaims, nextSteps } = report;

  return (
    <div className="border border-gray-300 rounded-lg p-6 shadow-md bg-white print:bg-transparent flex flex-col sm:flex-row sm:gap-6">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{inventorName}</h2>
          <PriorityBadge level={priorityLevel} />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Invention Summary</h3>
          <p className="text-gray-700">{inventionSummary}</p>
        </div>
      </div>

      <div className="flex-1">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Key Claims</h3>
          {/* <ul className="list-disc list-inside text-gray-700">
            {keyClaims.map((claim, index) => (
              <li key={index}>{claim}</li>
            ))}
          </ul> */}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Recommended Next Steps</h3>
          {/* <ul className="list-disc list-inside text-gray-700">
            {nextSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul> */}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <p>Word Count: ~200 words</p>
      </div>
    </div>
  );
}

ReportCard.propTypes = {
  report: PropTypes.shape({
    inventorName: PropTypes.string.isRequired,
    inventionSummary: PropTypes.string.isRequired,
    priorityLevel: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
    keyClaims: PropTypes.arrayOf(PropTypes.string).isRequired,
    nextSteps: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ReportCard;