d3.csv("../data/percent_2010-nrf.csv", d3.autoType).then(data => {
    console.log(data);
  

    /** CONSTANTS */
    // constants help us reference the same values throughout our code
    const width = window.innerWidth * .8,
      height = window.innerHeight / 1.5,
      paddingInner = 0.2,
      margin = { top: 20, bottom: 40, left: 100, right: 100 }

    /** SCALES */
    // reference for d3.scales: https://github.com/d3/d3-scale
    
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Percent)])
      .range([width - margin.left, margin.right]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.Individual))
      .range([height - margin.bottom, margin.top])
      .paddingInner(paddingInner);
    
    /** DRAWING ELEMENTS */
    const svg = d3.select("#barchart-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

 // reference for d3.axis: https://github.com/d3/d3-axis
 const yAxis = d3.axisLeft(yScale).ticks(data.length);

const color = d3.scaleSequential()
    .domain([0, d3.max(data, d => d.Percent)])
    .interpolator(d3.interpolatePuRd)

    // draw rects
    const rect = svg.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", 0, d => xScale(d.Percent))
      .attr("y", d => yScale(d.Individual))
      .attr("height", yScale.bandwidth())
      .attr("width", d => width - margin.left - xScale(d.Percent))
      .attr("transform", `translate(200, ${height - margin.bottom, margin.top})`)
      .attr("fill", d=>color(d.Percent));
      
  
    // append text
    const text = svg
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("class", "label")
      // this allows us to position the text in the center of the bar
      .attr("y", d => yScale(d.Individual) + (yScale.bandwidth()+5))
      .attr("x", 0, d => xScale(d.Percent))
      .text((d => d.Percent), "%")
      .attr("dx", "205")
      .attr("fill", "#FFFFFF");
 
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(190, ${height - margin.bottom, margin.top})`)
      .call(yAxis)
      .style("text-anchor", "left")
      .text(d.Individual);


    })