import React, { Component } from "react";
import * as d3 from "d3";
import { useContext, createContext, useState } from 'react';
export const NameContext = createContext();
const globalArray = [];

//this is the bar
class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = { //numericalVariables: ["total_bill", "tip", "size"],
    parentData : this.props.data2
  };
  }


  componentDidMount() {
    // Calculate correlation matrix from data passed in app.js
    const { data2 } = this.props;
    var returnArray;
  //  returnArray = ['total_bill', 'tip']
    this.props.updateReturnArray(returnArray);
  
    //const corrVal = this.corrCalculation(data2);
    //console.log("CORRELATION MATRIX:", corrVal);

   // this.matrixCreation(corrVal);

  }

  componentDidUpdate() {
     // Calculate correlation matrix from data passed in app.js
    const { data2 } = this.props;
    console.log("DATA2 IN COMPONENT DID UPDATE", data2)
    var {returnArray} = this.props;
    this.Bar(data2)
   
  
  }
  
  Bar(data) {
    const tooltip = d3.select(".tooltip");

    console.log("DATA RECEIVED IN BAR", data);
    // Initialize a variable to hold the maximum value
    let maxTotalBill = 0;

    var countA = 0;
    var countB = 0;
    var countC = 0;
    // Iterate through each object in the array
    data.forEach(obj => {
      const totalBill = parseFloat(obj.total_bill);

      if (totalBill > maxTotalBill) {
        maxTotalBill = totalBill;
      }
    });

    console.log("MAX", maxTotalBill);

    //calculate the number of A, B, C
    data.forEach(obj => {
      const category = obj.category;
      if (category === "A") {
        countA++;
      } else if (category === "B") {
        countB++;
      } else if (category === "C") {
        countC++;
      }
    });
    console.log("COUNT A", countA);
    console.log("COUNT B", countB);
    console.log("COUNT C", countC);

    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 350 - margin.top - margin.bottom;

    var svg = d3
      .select(".child2_svg")
      .attr("width", w + margin.left + margin.right - 30)
      .attr("height", h + margin.top + margin.bottom);

    var g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    var x_axis = d3
      .scaleBand()
      .range([0, w])
      .domain(data.map(function (d) {
        return d.category;
      }))
      .padding(0.2);

    //append da x axis graphically
    g.append("g")
      .attr("transform", "translate(0," + h + ")")
      .call(d3.axisBottom(x_axis))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    var y = d3
      .scaleLinear()
      .range([h, 0])
      .domain([0, Math.max(countA, countB, countC)]);

    g.append("g").call(d3.axisLeft(y));

    //map each rectangle to count of A, B, C (for some reason my bars seem to be backwards??)
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x_axis(d.category);
      })
      .attr("y", function (d) {
        return y((d.category));
      })
      .style("fill", "#00FFFF")

      .attr("width", x_axis.bandwidth())
      .attr("height", function (d) {
        if (d.category === "A") {
          return h - y(countA);
        } else if (d.category === "B") {
          return h - y(countB);
        } else if (d.category === "C") {
          return h + y(countC);
        }
      })
      
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
