import React, { Component } from "react";
import * as d3 from "d3";
//this should be the scatterplolt
class Child1 extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      x_scale: 10,
    //  selectedOption: "day", // Initial selected option
    //  selectedTarget: "tip", // Initial selected target
      parentData: [], // Initialize parentData as an empty array
      selectedDropdownValue: 'A',
      selectValue :"A"

     // sliderValue:0.5

    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);

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

handleDropdownChange(event) {
  const newDropdownValue = event.target.value;
  console.log("NEW DROPDOWN VALUE", newDropdownValue)
  //store dropdown value
  this.setState({ selectValue: newDropdownValue });
}

//called when slider changes

//called when buttons changed


componentDidUpdate(prevProps) {
  // Update parentData when props change
  if (prevProps.data1 !== this.props.data1) {
    this.setState({ parentData: this.props.data1 });
    this.Scatter(this.props.data1);
  }
  this.Scatter(this.props.data1)
}
componentDidMount() {
  // Ensure tooltip container is created when component mounts
  d3.select(".tooltip-container")
    .append("div")
    .attr("class", "tooltip-container")
    .append("div") // Append a child div for the tooltip itself
    .attr("class", "tooltip")
    .style("opacity", 0); // Ensure initial opacity is set to 0
    this.Scatter(this.props.data1)

}



Scatter(data) {
  // have to use this.state to retrieve it from the state
  var sliderSelection = this.state.sliderValue;
  console.log("SLIDER VALUE PASSED TO SCATTER", sliderSelection);
  console.log("DATA PASSED TO SCATTER", data);
  // remove remnants at start
  d3.select('.g_1').selectAll("*").remove();

  var margin = { top: 10, right: 10, bottom: 30, left: 20 },
    w = 500 - margin.left - margin.right,
    h = 350 - margin.top - margin.bottom;
  console.log("data passed in scatter", data);
  // filtering based on radio selection
  var filteredData = this.state.parentData.map(row => row[data]);
  const tooltip = d3.select(".tooltip");
  var x_values = [];
  var y_values = [];

  // finding max of x
  for (const value of Object.values(data)) {
    console.log("VALUEEEE", value.x);
    x_values.push(parseInt(value.x));
  }

  // finding max of y
  for (const value of Object.values(data)) {
    console.log("Y VALUES ", value.y);
    y_values.push(parseInt(value.y));
  }

  console.log("THESE ARE THE X VALUES", x_values);
  const dayData = this.state.parentData.map(d => d.x);
  console.log("DAY DATA", dayData);

  // add da tooltip
  if (!tooltip.node()) {
    tooltip = d3.select(".tooltip-container")
      .append("div")
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("opacity", 0);
  }

  console.log("filteredData", filteredData);

  // set margin
  var svg = d3
    .select(".child1_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_1")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  console.log("MAX OF X_VALUES", d3.max(x_values));
  const x_scale = d3.scaleLinear()
    // domain is the range of the input data (x-axis data) (what is shown on the scale)
    .domain([0, d3.max(x_values)])
    // range is where the axis is placed
    .range([margin.left, w]);
  // set scale
  // domain (x-axis --> indep) == range of possible input values that your scale will be able to handle.
  // range (y-axis --> dep) 

  var xScale = d3.scaleLinear().domain([0, d3.max(x_values)]).range([0, w]);
  var yScale = d3.scaleLinear().domain([0, d3.max(y_values)]).range([h, 0]);

  // Title
  svg.selectAll('text')
  .join('text')
    .attr('x', w / 2)
    .attr('y', 10)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text('Scatter Plot');

  // X label
  svg.selectAll('text')
    .data(['X'])
    .join('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(60,' + h + ')rotate(-90)')
    .attr("x", w )
    .attr("y", -70)
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text(function (d) { return d; });

  // Y label
  svg.selectAll('text')
    .data(['Y'])
    .join('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(60,' + h + ')rotate(-90)')
    .attr("x", w / 1.9)
    .attr("y", -70)
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text(function (d) { return d; });

  svg.append("g")
    .attr("transform", "translate(0," + h + ")")
    .call(d3.axisBottom(xScale));

  svg.append("g")
  .attr("x",30)
    .call(d3.axisLeft(yScale));

  console.log("PARENT DATA RIGHT BEFORE CIRCLES IN SCATTER", this.state.parentData);
  // X scale label
  svg.append("text")
    .attr("class", "x-scale-label")
    .attr("x", w / 2)
    .attr("y", h + margin.bottom)
    .style("text-anchor", "middle")
    .text("X ");
  //.data() expects an array of data objects i think
  svg.selectAll("circle")
  .data(data)
  .join("circle")
  .attr("cx", function (d) { return xScale(d.x); })
  .attr("cy", function (d) { return yScale(d.y); })
  .attr("r", 2)
  .style("fill", "#00FFFF")
  .on("mouseover", function (event, d) {
    tooltip.style("opacity", 1);
    d3.select(this).attr("stroke", "black");
  })
  .on("mousemove", function (event, d) {
    tooltip
      .html(`X is: ${d.x}, Y is: ${d.y}`)
      .style("left", (event.pageX - 60) + "px")
      .style("top", (event.pageY + 10) + "px");
  })
  .on("mouseout", function () {
    tooltip.style("opacity", 0);
    d3.select(this).attr("stroke", "none");
  });
}



  render() {
    return (
      <div className="container">
        {/* this.onChangeValue is called onChange, which logs the selected value*/}

        <div className='dropdown'>
          
          <select default value={this.state.selectValue} onChange={this.handleDropdownChange}>
            <option value='A'>A</option>
            <option value='B'>B</option>
            <option value='C'>C</option>
          </select>
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
