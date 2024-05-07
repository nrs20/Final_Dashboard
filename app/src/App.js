import React, { Component } from 'react';
import './App.css';
import Child1 from './child1';
import Child2 from './child2';

import * as d3 from 'd3';
import tips from './tips.csv';
import sampleData from './SampleDataset.csv';
class App extends Component {
  constructor(props) { //creating and initializing an object created with a class
    super(props); //passed props to the base class 
    this.state = {
      data: [], // Store data from csv file to pass as props to children
      selectedDropdownValue: 'total_bill'
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentDidMount() {
    var self = this;
    console.log("SAMPLE DATA", sampleData)
    // Read data from csv file
    d3.csv(sampleData, function (d) {
      //console.log(d)
    
      return {
        //filters (sets keys and values)
        x: d.x,
        y: d.y,
        category: d.category
    
      }
    })
      .then(function (csv_data) {
        self.setState({ data: csv_data });
        console.log("CSVDATA IN THEN",csv_data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Function to store selected target in row 1 dropdown menu
  handleDropdownChange(event) {
    const newDropdownValue = event.target.value;
    //store dropdown value
    this.setState({ selectedDropdownValue: newDropdownValue });
  }

  // Function to update returnArray in the state
  updateReturnArray = (newReturnArray) => {
    this.setState({ returnArray: newReturnArray });
  };
  
componentDidUpdate(){
  console.log("Update",this.data)
}


render() {
  const { data } = this.state;

  return (
    <div className='parent'>
      <div className='row1'>
       
      </div>

      <div className='row1'>
        <div className='child1'>
          <Child1 data1={data} />
        </div>
        <div className='child2'>
        <Child2 data2={data} updateReturnArray={this.updateReturnArray} />
        </div>
      </div>

   
    </div>
  );
}
}

export default App;
