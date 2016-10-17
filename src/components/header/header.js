import React  from 'react';
import ReactDOM  from 'react-dom';
import {RECIEVE_HEADER,REQUEST_HEADER,RECIEVE,RECIEVE_ITEM_TO_STOCK,USER_ROLE_MAP} from '../../constants/appConstants';
import {HEADER_URL} from '../../constants/configConstants'
import {modal} from 'react-redux-modal';
import { getHeaderInfo } from '../../actions/headerAction';
import LogOut from '../../containers/logoutTab'; 
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'; 
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
                'method':'GET',
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
  _processData(){
  	var headerInfo;
  	if(this.props.headerInfo && this.props.headerInfo.users.length){
  		 headerInfo= Object.assign({},this.props.headerInfo)
  		headerInfo.fullName = headerInfo.users[0].first_name +' '+ headerInfo.users[0].last_name;
  		headerInfo.designation = USER_ROLE_MAP[headerInfo.users[0].roles[0]] || '';
  	}
  	return headerInfo
  }

	render(){
		var headerInfo = this._processData()
		return (
		<header className="gorHeader head">
			<div className="mainBlock">
				<div className="logoWrap">
					<div>
						<div className="gor-logo logo">
					</div>
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
						        time: 'fsfsf',
						    }}/>
					</div>
				</div>
			</div>
			<div className="blockLeft">
				<div className="logoWrap">
					<div>
						<div className="logo fk-logo">
					</div>
				</div>
				
					
				</div>
				<div className="dropdown" id="profile"  >
					<div  className="dropbtn" onClick={this.openDropdown}>
						<div className="block">
							<div className="upperTextClient truncate">
								{
						         headerInfo ? headerInfo.fullName : 'Fetching...'
						    }
							</div>
							<div className="subTextClient">
								<FormattedMessage id="header.user_post" description='User post' 
        					defaultMessage='{user_post}'
        					values={{
						        user_post: headerInfo ? headerInfo.designation : '',
						    }}/>
							</div>
						</div>
						<div className="block user-icon">
							
						</div>

						<div id="myDropdown" className="dropdown-content">
							<div className="horizontalDiv">	
							</div>
							<div>
								<a href="javascript:void(0)" onClick={this.addModal.bind(this)}>Logout</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
		);
	}
};
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

