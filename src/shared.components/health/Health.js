import React  from 'react';
import ReactDOM  from 'react-dom';
class Health extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<div className="health mainBlock">
		<div className="block attributes">
			<div className="upperText">
				16
			</div>
			<div className="subtext">
				PPS
			</div>
		</div>
		<div className="horizontal-line"> </div>
		<div className="block">
			<div className="block parameters">
				<div className="block paramPositionFront">
					<div className="block stoppedState" >
						<span>3</span> 
					</div>
					<div className="status">Stopped</div>
				</div>
				<div className="block paramPositionMiddle">
					<div className="block onState" >
						<span>12</span>
					</div>
					<div className="status">On</div>
				</div>
				<div className="block paramPositionBack">
					<div className="block errorState" >
						<span>1</span>
					</div>
					<div className="status">Error</div>
				</div>
			</div>
		</div>
	</div>
		);
	}
};

export default Health ;