

export default function HorizontalTimeScale({ props }) {

    const data = props.data;
    const zeroStats = props.stats;

    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        // Define dimensions
        const width = 600;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Parse dates
        const parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');

        // Create scales
        const xScale = d3.scaleTime()
            .domain([parseDate(data[0].ts), parseDate(data[data.length - 1].ts)]) // Adjust domain based on your data
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, 1]) // Adjust domain based on your data
            .range([innerHeight, 0]);

        // Line generator
        const line = d3.line()
            .x(d => xScale(parseDate(d.ts)))
            .y(d => yScale(d.machine_status));

        // Draw line
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', line);

        // Draw axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append('g')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis);

        svg.append('g')
            .call(yAxis);
    }, [data]);

    return (
        <svg ref={svgRef} width={600} height={400}>
            {/* SVG elements will be drawn here */}
        </svg>
    );
};