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
						<UserDataTable items={this.props.userdetails} itemNumber={itemNumber} mid={this.props.manager.id}/>
					</div>
				</div>
			</div>
		);
	}
};


function mapStateToProps(state, ownProps){
  return {
    userdetails: state.userDetails.userDetails || [],
    manager:state.headerData.headerInfo.users[0]||[],
  };
}



export  default connect(mapStateToProps)(UsersTab);


