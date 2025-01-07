import React, { useState } from 'react';

const Event = ({ event }) => {
  if (!event) return null;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li>
      <h2>{event.summary}</h2>
      <p>{event.location}</p>
      <p>{event.created}</p>

      {isExpanded && (
        <div>
          <p>{event.description}</p>
        </div>
      )}

      <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Collapse' : 'Expand'}</button>
    </li>
  );
};

export default Event;
