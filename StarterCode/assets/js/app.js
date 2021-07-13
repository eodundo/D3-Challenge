// @TODO: YOUR CODE HERE!


	// Define SVG area dimensions
var svgWidth = 600;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
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

    //Create Axis Functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

//Adding in bottom and left axis
chartGroup.append("g")
  .attr("transform", 'translate (0, ${chartHeight})')
  .call(bottomAxis);
chartGroup.append("g")
  .call(leftAxis);

//Data points
var circlesGroup = chartGroup.selectAll("circle")
.data(Data)
.enter()
.append("circle")
.attr("cx", (d,i) => xScale(d.poverty))
.attr("cy", d => yscale(d.healthcare))
attr("r", "15")
.attr("fill", "blue")
.classed("stateCircle", true)

//State abbreviations
chartGroup.selectAll("text")
.data(Data)
.enter()
.append("text")
.attr("x" (d,i) => xScale(d.poverty))
.attr("y", d => (yScale(d.healthcare-0.28)))
.classed("stateText", true)
.text(d => d.abbr)
.on("mouseover", function(d) {
  toolTip.show(d);
})
.on("mouseover", function(d,i) {
  toolTip.hide(d);
});

// x labels
chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y" 0 -margin.left)
  .attr("x", 0 - height / 2)
  .attr("dy", "lem")
  .classed("aText", true)
  .attr("data-axis-name", "healthcare")
  .text("Lacks Healthcare(%)");

  //y labels
  chartGroup.append("text")
  .attr("transform", "translate(" + width / 2 + " , " + (height + margin.top + 20) + ")")
  .attr("data-axis-name", "poverty")
  .classed("aText", true)
  .text("In Poverty (%");

  // ToolTip
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([-10, 30])
    .html(functions(d) {
      return ('${d.abbr}<br>Healthcare (%): ${d.healthcare}%<br>Poverty: ${d.poverty}');
    })

// Intergrate ToolTip into chart
chartGroup.call(toolTip)

//Event Listener for display and hide of tooltip
circlesGroup.on("mouseover", functions(d) {
  toolTip.show(d);

})
    on("mouseout", function(d, i){
      toolTip.hide(d);
    })

  });

