import React  from 'react';
import ReactDOM  from 'react-dom';
import {RECIEVE_HEADER,HEADER_START_TIME,REQUEST_HEADER,RECIEVE,RECIEVE_ITEM_TO_STOCK,
	GET,SOFT_MANUAL} from '../../constants/frontEndConstants';
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
import {switchModalKey} from '../../actions/validationActions';

var dropdownFlag=0;
var temp;

class Header extends React.Component{
	constructor(props) 
	{
    	super(props);
    	if(dropdownFlag === 0) {
    		temp="dropdown-content"; 
    	}
      this.setDropdown = this.setDropdown.bind(this);
      this.state = {showDropdown: false};
      this._handleDocumentClick = this._handleDocumentClick.bind(this);
    	
    	 
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
    componentWillMount() {
      document.addEventListener('click', this._handleDocumentClick, true);
      document.addEventListener('touchend', this._handleDocumentClick, true);
    }  

    componentWillUnmount() {
    document.removeEventListener('click', this._handleDocumentClick, true);
    document.removeEventListener('touchend', this._handleDocumentClick, true);
  }

    openDropdown() {
    	dropdownFlag = 1;
    	temp="dropdown-content-afterClick";

    }
    setDropdown() {
      this.setState({showDropdown:!this.state.showDropdown});
      console.log(this.state.showDropdown)
    }
     _handleDocumentClick() {
      if (!(ReactDOM.findDOMNode(this.dropdownNode).contains(event.target) || this.dropdownValue?ReactDOM.findDOMNode(this.dropdownValue).contains(event.target):false)) {
          this.setState({showDropdown:false});
      }
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
   _showModal(modalComponent)
   {
      this.props.switchModalKey(this.props.activeModalKey);
    	modal.add(modalComponent, {
      	title: '',
      	size: 'large', // large, medium or small,
     	closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
     	hideCloseButton: true
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
  	var menuObj = {}, heading, subHeading, optionList, optionOperation, optionAction, buttonText;
  	optionList = [];
  	
  	if(!this.props.system_emergency){
  		heading = (<FormattedMessage id="header.butler" description="Header description" 
        		      			defaultMessage ="Butler"/>);
  		subHeading = (<FormattedMessage id="header.start" description='Start time ' 
        						defaultMessage='Start time:{time} '
        						values={{
						        time: headerInfo.start,
						    }}/>);
  		optionOperation = (<FormattedMessage id="header.option.normal" description='normal operation' 
        						defaultMessage='Operation normal'
						    />);
  		optionAction = (<FormattedMessage id="header.option.pause" description='pause operation option' 
        						defaultMessage='Enter password to pause operation'
						    />);
  		buttonText = (<FormattedMessage id="header.button.pause" description='Button text' 
        						defaultMessage='Pause'
						    />);
  		optionList.push({optionClass:'gor-operation-normal',  icon:'gor-operation-tick', optionText:optionOperation, 
  			fnButton:'' , buttonText:''});
  		// optionList.push({optionClass:'',  icon:'', optionText:optionAction, 
  		// 	fnButton:this._showModal.bind(this,PauseOperation), buttonText:buttonText});
  		menuObj = {heading:heading, subHeading:subHeading, optionList:optionList,
  	 		menuStyle:'', headingStyle:'',openIcon:'gor-dropdown-open', closeIcon:'gor-dropdown-close'};
  	}
  	else{
  		heading = (<FormattedMessage id="header.emergency.heading" description="Header description" 
        		      			defaultMessage ="Emergency"/>);
  		subHeading = (<FormattedMessage id="header.emergency.subheading" description='Start time ' 
        						defaultMessage='In Zone'
						    />);
  		optionOperation = (<FormattedMessage id="header.option.stopped" description='stopped operation' 
        						defaultMessage='Operation stopped'
						    />);
  		buttonText = (<FormattedMessage id="header.button.resume" description='Button text' 
        						defaultMessage='Resume'
						    />);
  		optionList.push({optionClass:'gor-fail',  icon:'gor-error-white', optionText:optionOperation, 
  			fnButton:'' , buttonText:''});
  		if(this.props.system_data !== SOFT_MANUAL){
	  		optionAction = (<FormattedMessage id="header.option.release" description='release operation option' 
        						defaultMessage='Release the Emergency Stop button from the Zigbee box in order 
        						to resume operation.'/>);
  			optionList.push({optionClass:'',  icon:'', optionText:optionAction, 
  				fnButton: '', buttonText:buttonText});  		
  		}
  		else{
	  		optionAction = (<FormattedMessage id="header.option.resume" description='resume operation option' 
        						defaultMessage='Enter password to resume operation.'/>);
  			optionList.push({optionClass:'',  icon:'', 
  				optionText:optionAction, 
  				fnButton: this._showModal.bind(this,ResumeOperation), buttonText:buttonText});  		  			
  		}
	  	menuObj = {heading:heading, subHeading:subHeading, optionList:optionList,
  		 menuStyle:'gor-fail', headingStyle:'gor-white-text', openIcon:'gor-emergency-dropdown-open', 
  		 closeIcon:'gor-emergency-dropdown-close'};
  	}

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
					<div  className="dropbtn" onClick={this.setDropdown} ref={(node) => { this.dropdownNode = node; }}>
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

						
					
          {this.state.showDropdown?<div id="myDropdown" className="dropdown-content" onClick={this.addModal.bind(this)}>
              <div className="horizontalDiv"> 
              </div>
              <div>
                <a href="javascript:void(0)" ><FormattedMessage id='header.logout' 
                        defaultMessage="Logout" description="Text for logout" ref={(node) => { this.dropdownValue = node; }}/></a>
              </div>
            </div>:""}
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
  username:state.authLogin.username,
  system_emergency:state.tabsData.system_emergency||null,
  system_status:state.tabsData.status||null,
  system_data:state.tabsData.system_data||null,
  activeModalKey: state.appInfo.activeModalKey || 0
 }
} 
/**
 * Function to dispatch action values as props
 */
function mapDispatchToProps(dispatch){
    return {
        getHeaderInfo: function(data){ dispatch(getHeaderInfo(data)); },
        switchModalKey:function(data){dispatch(switchModalKey(data))}
    }
};

export  default connect(mapStateToProps,mapDispatchToProps)(Header);

