import React, { Component } from "react";
import * as d3 from "d3";
class Child1 extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      x_scale: 10,
      selectedOption: "day", // Initial selected option
      selectedTarget: "tip", // Initial selected target
      parentData: [], // Initialize parentData as an empty array
      sliderValue:0.5

    };

    this.onChangeValue = this.onChangeValue.bind(this)
    this.handleSliderChange = this.handleSliderChange.bind(this);  // Bind the new handler

    //const parentData = this.props.data1
    console.log("DATA PASSED FROM PARENT TO CHILD 1:", this.props.data1)
  }
processData(dataPassed){
  console.log("PROCESS",dataPassed)
 // map() creates a new array from calling a
 // function for every array element.
  const selectedColumns = this.state.parentData.map(row => row[dataPassed])
  console.log("Selected column values:", selectedColumns);

 // return dataPassed
}


//called when slider changes
handleSliderChange(event) {
  //setting the state for sliderValue
  this.setState({ sliderValue: event.target.value });
  // Optionally, you can trigger other actions here, e.g., affecting D3 visuals
  console.log("New slider value:", event.target.value);
}

//called when buttons changed
onChangeValue(event){
  console.log(event.target.value)
  //you need to use the this keyword to call a method from another method of the same class.
  this.Scatter(event.target.value)
}


componentDidUpdate(prevProps) {
  // Update parentData when props change
  if (prevProps.data1 !== this.props.data1) {
    this.setState({ parentData: this.props.data1 });
    this.Scatter(this.props.data1);
  }
}
componentDidMount() {
  // Ensure tooltip container is created when component mounts
  d3.select(".tooltip-container")
    .append("div")
    .attr("class", "tooltip-container")
    .append("div") // Append a child div for the tooltip itself
    .attr("class", "tooltip")
    .style("opacity", 0); // Ensure initial opacity is set to 0
    
}



Scatter(data){
//have to use this.state to retrieve it from the state
var sliderSelection = this.state.sliderValue
console.log("SLIDER VALUE PASSED TO SCATTER", sliderSelection)
  //remove remnants at start
  d3.select('.g_1').selectAll("*").remove();

  var margin = { top: 10, right: 10, bottom: 30, left: 20 },
  w = 500 - margin.left - margin.right,
  h = 350 - margin.top - margin.bottom;
console.log("data passed in scatter",data)
//filtering based on radio selection
  var filteredData =  this.state.parentData.map(row => row[data])
  const tooltip = d3.select(".tooltip");

  const dayData = this.state.parentData.map(d => d.day);
  console.log("DAY DATA", dayData)
 //if (!tooltip.node()) {
    // tooltip = d3.select(".tooltip-container")
  //add da tooltip
 // Append the tooltip to a parent container outside of the SVG
 /*var tooltip = d3.select(".tooltip-container .tooltip")
        .select("tooltip-container")
         .append("div")
         .attr("class", "tooltip")
         .style("background-color", "white")
         .style("border", "solid")
         .style("border-width", "1px")
         .style("border-radius", "5px")
         .style("padding", "10px")
         .style("opacity", 0);
         */
 //}
 
  
  console.log("filteredData",filteredData)

  //set margin
  var svg = d3
  .select(".child1_svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .select(".g_1")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


  const x_scale = d3.scaleLinear()
  // domain is the range of the input data (x-axis data) (what is shown on the scale)
    .domain([0, d3.max(filteredData)])
    // range is where the axis is placed
    .range([margin.left, w]);
  //set scale
  //domain (x-axis --> indep) == range of possible input values that your scale will be able to handle.
  //range (y-axis --> dep) 

var xScale = d3.scaleLinear().domain([0,100]).range([0,w])
var yScale = d3.scaleLinear().domain([0,100]).range([h,0])

  // Title
  svg.append('text')
  .attr('x', w/2)
  .attr('y', 10)
  .attr('text-anchor', 'middle')
  .style('font-family', 'Helvetica')
  .style('font-size', 20)
  .text('Scatter Plot');
  
  // X label
  svg.append('text')
  .attr('x', w/2)
  .attr('y', 335)
  .attr('text-anchor', 'middle')
  .style('font-family', 'Helvetica')
  .style('font-size', 10)
  .text('Independant');
  
  
  // Y label
  svg.append('text')
  .attr('text-anchor', 'middle')
  .attr('transform', 'translate(60,' + h + ')rotate(-90)')
  .attr("x",w/2)
  .attr("y", -70)
  .style('font-family', 'Helvetica')
  .style('font-size', 12)
  .text('Dependant');

  //add axis (append all graphical shit to g element)
  svg.append("g")
  .attr("transform", "translate(0," + h + ")")
  .call(d3.axisBottom(xScale));
 
 svg.append("g")
  .call(d3.axisLeft(yScale));

  console.log("PARENT DATA RIGHT BEFORE CIRCLES IN SCATTER", this.state.parentData)

  //.data() expects an array of data objects
  svg.append('g')
  .selectAll("circle")
  .data(this.state.parentData)
  .enter()
  .append("circle")
  .attr("cx", function(d) {return xScale(d.total_bill);})
  .attr("cy", function(d){return yScale(d.tip);}) // setting the vertical position (y-coordinate) of the center of the circle to be the scaled y-coordinate of the data point (d[1])
  .attr("r", 2)
  .style("fill", "#CC0000")
  //changes the color when hovered over the dot
  .on("mouseover", function(event, d) {
    tooltip.style("opacity", 1);
    d3.select(this).attr("stroke", "black")
  })
  .on("mousemove", function(event, d) {
    tooltip
      .html(`Total Bill: ${d.total_bill}`)
      .style("left", (event.pageX - 60) + "px")
      .style("top", (event.pageY + 10) + "px");
})
.on("mouseout", function() {
    tooltip.style("opacity", 0);
    d3.select(this).attr("stroke", "none");
});
  console.log("INSIDE", this.state.parentData)
}

//remove axis scales (in css)



  render() {
    return (
      <div className="container">
        {/* this.onChangeValue is called onChange, which logs the selected value*/}

        <div className="radio" onChange={this.onChangeValue}>

          <label>  <input type="radio" value="tip" name="data" />  Tip
          </label>
          <label><input type="radio" value="total_bill" name="data" /> total_bill</label>
          <label>  <input type="radio" value="sex" name="data" />Sex</label>
        </div>
      
        {/* SVG for the chart */}
        <div className="tooltip-container"></div>
        {
  /* <div className="slider">
    <input type="range"
           min="0" max="1" step="0.01"
           value={this.state.sliderOpacity}  // Also, remember to change `sliderOpacity` to `sliderValue` if that was your intention.
           id="opacity"
           onChange={this.handleSliderChange} />
  </div> */
}
        <svg className="child1_svg" width={500} height={1}>
          <g className="g_1"></g>
        </svg>
      </div>
      
    );
  }
}
export default Child1;
