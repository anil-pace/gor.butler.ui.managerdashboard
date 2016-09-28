import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux' ;
import {REQUEST_HEADER,RECIEVE_HEADER,RECIEVE,RECIEVE_ITEM_TO_STOCK} from '../../actions/headerAction';
import { logoutRequest } from '../../actions/loginAction';
import { endWsAction } from '../../actions/socketActions';
import { FormattedMessage } from 'react-intl';

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
    	
    }
    componentWillReceiveProps(nextProps){
    	
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
		{ value: 'logout', label: 'Logout' }
		]
		return (
		<header className="gorHeader head">
			<div className="mainBlock">
				<div className="logoWrap">
					<div className="gor-logo logo">
				</div>
				</div>
				<div className="blockSystem">

					<div className="upperText">
						<FormattedMessage id="header.description" description="Header description" 
              			defaultMessage ="Butler Management System"/> 
					</div>
					<div className="subText">
					<FormattedMessage id="header.start_time" description='Start time ' 
        					defaultMessage='Start time:{time} '
        					values={{
						        time: this.props.user.start,
						    }}/>
					</div>
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
							<div className="upperTextClient truncate">
								<FormattedMessage id="header.user_name" description='User name' 
        					defaultMessage='{user_name}'
        					values={{
						        user_name: this.props.user.name,
						    }}/>
							</div>
							<div className="subTextClient">
								<FormattedMessage id="header.user_post" description='User post' 
        					defaultMessage='{user_post}'
        					values={{
						        user_post: this.props.user.post,
						    }}/>
							</div>
						</div>
						<div className="block user-icon">
							
						</div>

						<div id="myDropdown" className="dropdown-content">
							<div className="horizontalDiv">	
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
