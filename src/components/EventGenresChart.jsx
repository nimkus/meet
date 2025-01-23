import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import PropTypes from 'prop-types';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

  const colors = ['#ACAAFE', '#00C49F', '#FFBB28', '#FF8042', 'white'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const labelMultiplier = 1.09;
    const radius = innerRadius + (outerRadius - innerRadius) * labelMultiplier;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    // On small screens, only display the percentage inside the pie
    return percent ? (
      <text
        x={x}
        y={y}
        fill={colors[index]}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontWeight: 'bold' }}
        className="pie-label"
        role="label"
        data-testid={`genre-label-${genres[index]}`}
      ></text>
    ) : null;
  };

  const getData = () => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter((event) => event.summary.includes(genre));
      return {
        name: genre,
        value: filteredEvents.length,
      };
    });
    return data;
  };

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={130}
        />
        {data.map((entry, index) => {
          return entry.value > 0 ? <Cell key={`cell-${index}`} fill={colors[index]} /> : null;
        })}
        <Legend align="center" verticalAlign="top" height={10} />
      </PieChart>
    </ResponsiveContainer>
  );
};

EventGenresChart.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      summary: PropTypes.string.isRequired,
      location: PropTypes.string,
      created: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default EventGenresChart;
