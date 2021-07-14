// @TODO: YOUR CODE HERE!


	// Define SVG area dimensions
var svgWidth = 600;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


  // Load data from data.csv
 d3.csv("data.csv").then(function(Data) {

//   Parse Data as Numbers
 console.log(Data);
  Data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    //console.log(data.healthcare);
    console.log(data.poverty)
});

// Create scale functions
var xLinearScale = d3.scaleLinear()
    .range([0, chartWidth])
    .domain([0,d3.max(Data, data => data.poverty)]);

  
  var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([2, d3.max(Data, data => data.healthcare)]);

    // create axes
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);

      // append axes
      chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

      chartGroup.append("g")
        .call(leftAxis);

         // append circles
      var circlesGroup = chartGroup.selectAll("circle")
        .data(Data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("opacity", "0.3")
        .attr("stroke", "black");

     chartGroup.append("g").selectAll("text")
        .data(Data)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("text-anchor", "middle")
        .attr("font_family", "sans-serif")
        .attr("font-size", "10px")
        .attr("alignment-baseline", "central")
        .attr("fill", "white")
        .attr("font-weight", "bold");

//Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left -5)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top -10})`)
      .text("In Poverty (%)");







});

