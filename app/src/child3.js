import React, { Component } from 'react';
import * as d3 from 'd3';

class Child3 extends Component {
  constructor(props) {
    super(props);
    this.state = {    parentData : this.props.data3
    };
  }
  componentDidUpdate() {
    // Calculate correlation matrix from data passed in app.js
   const { data3 } = this.props;
   var {returnArray} = this.props;
   this.Bar(data3)


 }
 
 Bar(data) {
  var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 350 - margin.top - margin.bottom;

      console.log("DATA IN ")

  var svg = d3
    .select(".child3_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom);

  var g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  var y_axis = d3.scaleBand()
    .range([0, h])
    .domain(data.map(d => d.sex))
    .padding(0.2);

  g.append("g")
    .call(d3.axisLeft(y_axis));

  var x = d3.scaleLinear()
    .range([0, w])
    .domain([0, d3.max(data, d => parseFloat(d.total_bill))]);

  g.append("g")
    .attr("transform", "translate(0," + h + ")")
    .call(d3.axisBottom(x));

  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", d => y_axis(d.sex))
    .attr("x", 0)
    .attr("height", y_axis.bandwidth())
    .attr("width", d => x(parseFloat(d.total_bill)))
    .attr("fill", "#69b3a2");
}

  render() {
    return (
      <div>
        <svg className='child3_svg' >
          <g className='g_3'></g>
        </svg>
      </div>
    );
  }
}

export default Child3;
