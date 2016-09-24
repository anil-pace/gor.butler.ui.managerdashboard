import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux' ;
import {REQUEST_HEADER,RECIEVE_HEADER,RECIEVE,RECIEVE_ITEM_TO_STOCK} from '../../actions/headerAction';
import { logoutRequest } from '../../actions/loginAction';
import { endWsAction } from '../../actions/socketActions';

var dropdownFlag=0;
var temp;

class Header extends React.Component{
	constructor(props) 
	{
    	super(props);
    	if(dropdownFlag === 0) {
    		temp="dropdown-content";
    	}
    	
    	 
    }
    componentDidMount(){
    	
    }	
    componentWillMount(){
    	// this.setState({"asdf":"asdf"});
    	//console.log(this.props)
    }
    componentWillReceiveProps(nextProps){
    	//console.log(nextProps);
    }

    openDropdown() {
    	dropdownFlag = 1;
    	temp="dropdown-content-afterClick";

    }

    appLogout() {
    	this.props.userLogout();
    	this.props.endConnect();

    }


	render(){
		const { headData } = this.props;
		

		const item = [
		{ value: 'Placeholder_option_1', label: 'Placeholder option 1' },
		{ value: 'Placeholder_option_2', label: 'Placeholder option 2' },
		{ value: 'logout', label: 'Logout' }
		]
		//console.log(this.props.headData);
		return (
		<header className="gorHeader head">
			<div className="mainBlock">
				<div className="logoWrap">
					<div className="gor-logo logo">
				</div>
				</div>
				<div className="blockSystem">
					<div className="upperText">Butler Management System</div>
					<div className="subText">Start time:{this.props.user.start}</div>
				</div>
			</div>
			<div className="blockLeft">
				<div className="logoWrap">
					<div className="logo fk-logo">
				</div>
				
					
				</div>
				<div className="dropdown" id="profile"  >
					<div  className="dropbtn" onClick={this.openDropdown}>
						<div className="block">
							<div className="upperTextClient truncate">{this.props.user.name}</div>
							<div className="subTextClient">{this.props.user.post}</div>
						</div>
						<div className="block user-icon">
							
						</div>

						<div id="myDropdown" className="dropdown-content">
							<div className="horizontalDiv">	
								<a href="#">Placeholder option 1</a>
								<a href="#">Placeholder option 2</a>
							</div>
							<div>
								<a href="javascript:void(0)" onClick={this.appLogout.bind(this)}>Logout</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
		);
	}
};

function mapStateToProps(state, ownProps){
	return  {
	//	"ordersData":state.recieveSocketActions.ordersData || {}
		}
		 

}
function mapDispatchToProps(dispatch){
    return {
    	endConnect: function(){ dispatch(endWsAction()); },
        userLogout: function(){ dispatch(logoutRequest()); }
    }
};

export 	default connect(mapStateToProps,mapDispatchToProps)(Header);
