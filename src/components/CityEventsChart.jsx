import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  const getData = useCallback(() => {
    return allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length;
      const city = location.split(/, | - /)[0];
      return { city, count };
    });
  }, [allLocations, events]);

  useEffect(() => {
    setData(getData());
  }, [getData]);

  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 80,
          left: -30,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="category"
          dataKey="city"
          name="City"
          angle={60}
          interval={0}
          tick={{ dx: 20, dy: 40, fontSize: 14 }}
        />
        <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Events" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

CityEventsChart.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      summary: PropTypes.string.isRequired,
      location: PropTypes.string,
      created: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  allLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CityEventsChart;
