import React, { Component } from 'react';
import './App.css';
import Child1 from './child1';
import Child2 from './child2';
import Child3 from './child3';
import Child4 from './child4';

import * as d3 from 'd3';
import tips from './tips.csv';

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
    // Read data from csv file
    d3.csv(tips, function (d) {
      //console.log(d)
    
      return {
        //filters (sets keys and values)
        total_bill: d.total_bill,
                smoker: d.smoker,
    tip: d.tip,
        sex: d.sex,
        day: d.day
      }
    })
      .then(function (csv_data) {
        self.setState({ data: csv_data });
        console.log("CSVDATA",csv_data)
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
        <div className='dropdown'>
          Select Target (className=row1): 
          <select value={this.state.selectedDropdownValue} onChange={this.handleDropdownChange}>
            <option value='tip'>Tip</option>
            <option value='total_bill'>Total Bill</option>
            <option value='size'>Size</option>
          </select>
        </div>
      </div>

      <div className='row2'>
        <div className='child1'>
          <Child1 data1={data} selectedTarget={this.state.selectedDropdownValue}/>
        </div>
        <div className='child2'>
        <Child2 data2={data} updateReturnArray={this.updateReturnArray} />
        </div>
      </div>

      <div className='row3'>
        <div className='child3'>
          <Child3 data3={data} />
        </div>
        <div className='child4'>
          <Child4 data4={data} />
        </div>
      </div>
    </div>
  );
}
}

export default App;
