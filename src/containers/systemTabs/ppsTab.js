
/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import PPStable from './PPStable';
import { connect } from 'react-redux';



class PPS extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
    var data = this.props.PPSDetail.PPStypeDetail;
	var itemNumber = 5;
  
		return (
			<div>
				<div>
					<div>
						<PPStable items={this.props.PPSDetail.PPStypeDetail} itemNumber={itemNumber}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    PPSDetail: state.PPSDetail || {}
  };
}

export default connect(mapStateToProps)(PPS) ;
