import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Event = ({ event }) => {
  if (!event) return null;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p>{event.location}</p>
      <p>{event.created}</p>

      {isExpanded && (
        <div>
          <p className="details">{event.description}</p>
        </div>
      )}

      <button className="details-btn" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'hide details' : 'show details'}
      </button>
    </li>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    summary: PropTypes.string.isRequired,
    location: PropTypes.string,
    created: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
};

export default Event;
