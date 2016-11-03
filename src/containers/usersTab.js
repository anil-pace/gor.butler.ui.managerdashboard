import React  from 'react';
import ReactDOM  from 'react-dom';
import UserDataTable from './userTab/userTabTable';
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
					<div className="gorUserTable">
						<UserDataTable items={this.props.userdetails} itemNumber={itemNumber}/>
					</div>
				</div>
			</div>
		);
	}
};


function mapStateToProps(state, ownProps){
  return {
    userdetails: state.userDetails.userDetails || [],
  };
}



export  default connect(mapStateToProps)(UsersTab);


