/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import ButlerBotTable from './butlerbotTable';
import { connect } from 'react-redux';
class ButlerBot extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
   console.log("this should work") 
	console.log(this.props.routes)
  var itemNumber = 6;
		return (
			<div>
				<div>
					<div className="gorTesting">
						<ButlerBotTable items={this.props.butlerDetail.butlerDetail} itemNumber={itemNumber}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    butlerDetail: state.butlerDetail || {}
  };
}

export default connect(mapStateToProps)(ButlerBot) ;


