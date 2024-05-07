import React, { Component } from "react";
import * as d3 from "d3";
import { useContext, createContext, useState } from 'react';
export const NameContext = createContext();
const globalArray = [];
class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = { numericalVariables: ["total_bill", "tip", "size"],
    parentData : this.props.data2
  };
  }


  componentDidMount() {
    // Calculate correlation matrix from data passed in app.js
    const { data2 } = this.props;
    var returnArray;
    returnArray = ['total_bill', 'tip']
    this.props.updateReturnArray(returnArray);
  
    //const corrVal = this.corrCalculation(data2);
    //console.log("CORRELATION MATRIX:", corrVal);

   // this.matrixCreation(corrVal);

  }

  componentDidUpdate() {
     // Calculate correlation matrix from data passed in app.js
    const { data2 } = this.props;
    var {returnArray} = this.props;
    this.Bar(data2)


  }
  
  Bar(data) {
    const tooltip = d3.select(".tooltip");

    console.log("DATA RECEIVED IN BAR", data.total_bill);
// Initialize a variable to hold the maximum value
let maxTotalBill = 0;

// Iterate through each object in the array
data.forEach(obj => {
  const totalBill = parseFloat(obj.total_bill);
  
  if (totalBill > maxTotalBill) {
    maxTotalBill = totalBill;
  }
});   

console.log("MAX",maxTotalBill)
var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 350 - margin.top - margin.bottom;
  
    var svg = d3
      .select(".child2_svg")
      .attr("width", w + margin.left + margin.right-30)
      .attr("height", h + margin.top + margin.bottom);
  
    // Append a group element ('g') to the SVG to hold the bars
    var g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
 // Define the x-axis scale using d3.scaleBand()
var x_axis = d3.scaleBand()
// Set the range of the scale (the width of your chart)
.range([0, w])
// Extract the domain values (total_bill) and set them as the domain of the scale
.domain(data.map(function(d) { return d.sex; }))
// Set padding between the bands (optional)
.padding(0.2);

  //append da x axis graphically
    g.append("g")
      .attr("transform", "translate(0," + h + ")")
      .call(d3.axisBottom(x_axis))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
  
  // Define the y-axis scale using d3.scaleLinear()
var y = d3.scaleLinear()
// Set the range of the scale (the height of your chart)
.range([h, 0])
// Extract the maximum and minimum total_bill values and set them as the domain of the scale
.domain([0, d3.max(data, function(d) { return parseFloat(d.total_bill); })]);
  
    g.append("g")
      .call(d3.axisLeft(y));
  
 // Select all existing 'rect' elements (if any) or prepare to create new ones
g.selectAll("rect")
// Bind data to the selection
.data(data)
// For each data point that doesn't have a corresponding 'rect' element, create one
.enter()
// Append a 'rect' element for each data point
.append("rect")
  // Set the x-coordinate of the top-left corner of the rectangle (what you want to map x to?)
  .attr("x", function(d) { return x_axis(d.sex); })
  // Set the y-coordinate of the top-left corner of the rectangle
  .attr("y", function(d) { return y(parseFloat(d.total_bill)); })
  // Set the width of the rectangle
  .attr("width", x_axis.bandwidth())
  // Set the height of the rectangle
  .attr("height", function(d) { return h - y(parseFloat(d.total_bill)); })
  // Set the fill color of the rectangle
  .attr("fill", "red")
  .on("mouseover", function(event, d) {
    tooltip.style("opacity", 1);
    d3.select(this).attr("stroke", "black")
  })
  .on("mousemove", function(event, d) {
    tooltip
      .html(`Total Bill: ${d.total_bill}<br/>Sex: ${d.sex}`)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY + 10) + "px");
})
.on("mouseout", function() {
    tooltip.style("opacity", 0);
    d3.select(this).attr("stroke", "none");
});



  }
  

  render() {
    return (
      <svg className="child2_svg">
      <g className="g_2"></g>
      </svg>
    );
  }
}

export default Child2;
