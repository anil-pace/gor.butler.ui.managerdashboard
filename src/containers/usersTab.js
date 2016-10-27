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
						<UserDataTable items={this.props.userdetails} itemNumber={itemNumber} intlMessg={this.props.intlMessages} mid={this.props.manager.length?this.props.manager.users[0].id:''}/>
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
    intlMessages: state.intl.messages,
    manager:state.headerData.headerInfo||[]

  };
}



export  default connect(mapStateToProps)(UsersTab);


