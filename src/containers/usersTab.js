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
          				<Loader isLoading={this.props.isLoading} />
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
    isLoading:state.loader.isLoading
  };
}



export  default connect(mapStateToProps)(UsersTab);


