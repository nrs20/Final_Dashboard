import React,{Component} from 'react';
import * as d3 from 'd3';

class Child4 extends Component{
  constructor(props){
    super(props);
    this.state = {parentData: this.props.data4

    };
  }
  componentDidMount(){
    console.log('child4 mounted');
  }
  componentDidUpdate(){
    const { data4 } = this.props;
    ///call line function using data from props
    this.Line(data4)


  }
  Line(data){
    
    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h= 350 - margin.top - margin.bottom;
      console.log("DATA4", data)
      console.log("Data check:", data.map(d => ({ day: d.day, total_bill: d.total_bill })));

      //select the svg
      var svg = d3
      .select(".child4_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

      //var g = svg.append("g")
      //.attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis --> it is a date format (scaleBand if categorical)
    var x = d3.scaleLinear()
    .domain(data.map(d => d.tip))  // Extract all day names for the domain
    .range([0, w])                // Map these to the width of the chart
   // .padding(0.1);                // Add some padding between bands
  
      svg.append("g")
      .attr("transform", "translate(0," + h + ")")
      .call(d3.axisBottom(x));



      var y = d3.scaleLinear()
// Set the range of the scale (the height of your chart)
.range([h, 0])
// Extract the maximum and minimum total_bill values and set them as the domain of the scale
.domain([0, d3.max(data, function(d) { return parseFloat(d.total_bill); })])

svg.append("g")
.call(d3.axisLeft(y));

svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.tip) })
        .y(function(d) { return y(d.total_bill) })
        )
  
  }

  render(){
    return <svg className='child4_svg'>
      <g className='g_4'></g>  
    </svg>
  }
}
export default Child4;