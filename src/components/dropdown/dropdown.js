import React  from 'react';
import ReactDOM  from 'react-dom';


class Dropdown extends React.Component{
	constructor(props) 
	{
    	super(props);
    	this.state = {selectValue:'SystemHealth'};

    }

    handleChange(e) {
    	this.setState({selectValue:e.target.value});
    }	
	render(){
		return (
		<div>
			<div>
         		<select value={this.state.selectValue} onChange={this.handleChange} >
            		<option value="SystemHealth">SystemHealth</option>
            		<option value="ppsPerformance">PPS - pick performance</option>
          		</select>
            </div> 
		</div> 
		);
	}
};

export default Dropdown ;

