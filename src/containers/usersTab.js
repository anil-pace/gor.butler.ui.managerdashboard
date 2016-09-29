import React  from 'react';
import ReactDOM  from 'react-dom';
import UserDataTable from './userTab/userTabTable'
import { connect } from 'react-redux';

class UsersTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		var itemNumber = 7;		
		return (
			<div>
				<div>
					<div className="gorTesting">
						<UserDataTable items={this.props.userDetails} itemNumber={itemNumber}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    userDetails: state.userDetails.userDetails || {},
  };
}

export default connect(mapStateToProps)(UsersTab) ;
