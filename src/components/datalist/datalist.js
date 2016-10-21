import React  from 'react';
import ReactDOM  from 'react-dom';

class DataList extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
	render(){
        var opt=[{v:1},{v:2},{v:3},{v:4}],temp=[];
        for(let i=0;i<opt.length;i++)
        {
            temp.push(<option value={opt[i].v} key={i}></option>);
        }
		return (
		<div>
            <input type="text" list="droplist" />
            <datalist id="droplist">
            {temp}
            </datalist>
		</div> 
		);
	}
};
export default DataList;