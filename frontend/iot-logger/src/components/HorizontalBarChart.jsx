import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const HorizontalBarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);

    // Define dimensions
    const width = 900;
    const height = 100;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Parse timestamps
    const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');

    // Create scales
    const xScale = d3.scaleTime()
      .domain([parseTime(data[0].ts), parseTime(data[data.length - 1].ts)])
      .range([0, innerWidth]);

    // Draw lines for each data point
    svg.selectAll('line')
      .data(data)
      .enter()
      .append('line')
      .attr('x1', d => xScale(parseTime(d.ts)))
      .attr('y1', 0)
      .attr('x2', d => xScale(parseTime(d.ts)))
      .attr('y2', height)
      .attr('stroke', d => {
        if (d.machine_status === 0) return 'yellow';
        else if (d.machine_status === 1) return 'green';
        else return 'red'; // Missing data
      })
      .attr('stroke-width', 1);

    // Create time scale axis
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat('%H:%M')); // Format ticks as HH:MM
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

  }, [data]);

  return (
    <div className='flex flex-col justify-center items-center' >
      <h2 className='text-3xl'>Machine Status</h2>
      <h4 className='text-1xl'> horizontal time scale </h4>
      <svg ref={svgRef} width={800} height={130} className='border-2 rounded-sm border-black'>
        {/* SVG elements will be drawn here */}
      </svg>
    </div>
  );
};

export default HorizontalBarChart;
