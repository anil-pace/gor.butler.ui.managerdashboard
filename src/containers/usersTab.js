import React  from 'react';
import ReactDOM  from 'react-dom';
import UserDataTable from './userTab/userTabTable';
import Loader from '../components/loader/Loader';
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
						<UserDataTable items={this.props.userdetails} itemNumber={itemNumber} intlMessg={this.props.intlMessages} mid={this.props.manager.users[0].id}/>
					</div>
				</div>
			</div>
		);
	}
};


function mapStateToProps(state, ownProps){
	console.log(state)
  return {
    userdetails: state.userDetails.userDetails || [],
    manager:state.headerData.headerInfo||[],
    intlMessages: state.intl.messages
  };
}



export  default connect(mapStateToProps)(UsersTab);


