import React  from 'react';
import ReactDOM  from 'react-dom';
import {RECIEVE_HEADER,HEADER_START_TIME,REQUEST_HEADER,RECIEVE,RECIEVE_ITEM_TO_STOCK,GET} from '../../constants/frontEndConstants';
import {stringConfig} from '../../constants/backEndConstants';
import {HEADER_URL} from '../../constants/configConstants'
import {modal} from 'react-redux-modal';
import { getHeaderInfo } from '../../actions/headerAction';
import LogOut from '../../containers/logoutTab'; 
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'; 
import HamBurger from '../hamburger/hamburger';
import PauseOperation from '../../containers/emergencyProcess/pauseOperation'; 
import ResumeOperation from '../../containers/emergencyProcess/resumeOperation'; 
import OperationStop from '../../containers/emergencyProcess/OperationStop'; 

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
              var username = this.props.username;
              if(username && this.props.authToken){
              let headerData={
                'url':HEADER_URL+'?username='+username,
                'method':GET,
                'cause':RECIEVE_HEADER,
                'token':this.props.authToken
            }
              this.props.getHeaderInfo(headerData)
          }
  	}

    openDropdown() {
    	dropdownFlag = 1;
    	temp="dropdown-content-afterClick";

    }

   addModal() {
    modal.add(LogOut, {
      title: '',
      size: 'large', // large, medium or small,
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true // (optional) if you don't wanna show the top right close button
      //.. all what you put in here you will get access in the modal props ;)
    });
   }
   _pauseOperation() {
    	modal.add(PauseOperation, {
      	title: '',
      	size: 'large', // large, medium or small,
     	closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
     	hideCloseButton: true
    	});
  	}
   _resumeOperation() {
    	modal.add(ResumeOperation, {
      	title: '',
      	size: 'large', // large, medium or small,
     	closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
     	hideCloseButton: true
    	});
  	}
   _StopOperation() {
    	modal.add(OperationStop, {
      	title: '',
      	size: 'large', // large, medium or small,
     	closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
     	hideCloseButton: false
    	});
  	}
  _processData(){
  	var headerInfo={};
  	if(this.props.headerInfo && this.props.headerInfo.users.length){
  		 headerInfo= Object.assign({},this.props.headerInfo)
  		headerInfo.fullName = (headerInfo.users[0].first_name || '') +' '+ (headerInfo.users[0].last_name || '');
  		headerInfo.designation = headerInfo.users[0].roles[0] || 'butler_ui';
  	}
  	headerInfo.start= HEADER_START_TIME
  	return headerInfo
  }
  _processMenu(headerInfo){
  	var menuObj = {}, heading, subHeading, optionList;
  	heading = (<FormattedMessage id="header.butler" description="Header description" 
        		      			defaultMessage ="Butler"/>);
  	subHeading = (<FormattedMessage id="header.start" description='Start time ' 
        						defaultMessage='Start time:{time} '
        						values={{
						        time: headerInfo.start,
						    }}/>);
  	optionList = [];
  	optionList.push({optionClass:'gor-pass',  icon:'gor-tick-white', optionText:'Option 2', 
  			fnButton:'' , buttonText:''});
  	optionList.push({optionClass:'',  icon:'', optionText:'Enter password to pause the operation', 
  			fnButton:this._pauseOperation, buttonText:'Pause'});

  	menuObj = {heading:heading, subHeading:subHeading, optionList:optionList,
  	 menuStyle:'', headingStyle:''};
  	return menuObj;
  }
	render(){
		var headerInfo = this._processData()
		var menuDetails = this._processMenu(headerInfo);
		return (
		<header className="gorHeader head">
			<div className="mainBlock">
				<div className="logoWrap">
					<div>
						<div className="gor-logo logo"> </div>
					</div>
				</div>
				<div className="gor-border"/>
			</div>
			<div className="blockLeft">
				<HamBurger data={menuDetails} />
				<div className="gor-border"/>
				<div className="dropdown" id="profile"  >
					<div  className="dropbtn" onClick={this.openDropdown}>
						<div className="block">
							<div className="upperTextClient truncate">
								{
						         headerInfo ? headerInfo.fullName : 'Fetching...'
						    }
							</div>
							<div className="subTextClient">
								{headerInfo.designation ? this.context.intl.formatMessage(stringConfig[headerInfo.designation]) : "--"}
							</div>
						</div>
						<div className="block user-icon">
							
						</div>

						<div id="myDropdown" className="dropdown-content">
							<div className="horizontalDiv">	
							</div>
							<div>
								<a href="javascript:void(0)" onClick={this.addModal.bind(this)}><FormattedMessage id='header.logout' 
                        defaultMessage="Logout" description="Text for logout"/></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
		);
	}
};

Header.contextTypes = {
    intl: React.PropTypes.object.isRequired
}
/**
 * Function to pass state values as props
 */

function mapStateToProps(state,ownProps) {
 return {
  headerInfo:state.headerData.headerInfo,
  authToken : state.authLogin.auth_token,
  username:state.authLogin.username
 }
} 
/**
 * Function to dispatch action values as props
 */
function mapDispatchToProps(dispatch){
    return {
        getHeaderInfo: function(data){ dispatch(getHeaderInfo(data)); }
    }
};

export  default connect(mapStateToProps,mapDispatchToProps)(Header);

