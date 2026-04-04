import React from 'react';
import PropTypes from 'prop-types';

function PriorityBadge({ level }) {
  let colorClass = '';
  let icon = '';

  switch (level) {
    case 'High':
      colorClass = 'bg-red-500 text-white';
      icon = '⚠';
      break;
    case 'Medium':
      colorClass = 'bg-yellow-500 text-black';
      icon = '⚡';
      break;
    case 'Low':
      colorClass = 'bg-green-500 text-white';
      icon = '✓';
      break;
    default:
      colorClass = 'bg-gray-400 text-white';
      icon = '?';
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}
      aria-label={`Priority level: ${level}`}
    >
      <span className="mr-2">{icon}</span>
      {level}
    </span>
  );
}

PriorityBadge.propTypes = {
  level: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
};

export default PriorityBadge;