import React  from 'react';
import { connect } from 'react-redux' ;
import { logoutRequest } from '../actions/loginAction';
import { endWsAction } from '../actions/socketActions';
import { LOGOUT_URL } from '../constants/configConstants'
import { FormattedMessage } from 'react-intl';        
import {
  authLoginData,
} from '../actions/loginAction'
import {
  AUTH_LOGOUT,
  APP_JSON,
  POST
} from '../constants/frontEndConstants'
class LogOut extends React.Component{
  constructor(props) 
  {
    super(props);  
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.auth_token)
    {
      this.removeThisModal();
    }
  }
  removeThisModal() {
    this.props.removeModal();
  }
  appLogout() {

    let formdata = {
      username: sessionStorage.getItem('username'), token: sessionStorage.getItem('auth_token'),
      context: { entity_id:"1", app_name: "managerdashboard_ui"}
    };
    let logoutPayload = {
      url: LOGOUT_URL,
      formdata: formdata,
      method: POST,
      username: sessionStorage.getItem('username'),
      token: sessionStorage.getItem('auth_token'),
      cause: AUTH_LOGOUT,
      contentType: APP_JSON,
      accept: APP_JSON
    };
      this.props.removeModal();
      sessionStorage.clear();
      this.props.userLogout();
      this.props.endConnect();
      this.props.authLoginData(logoutPayload)
    }  
    render()
    {
      return (
        <div>
          <div className='gor-logout'>
            <div className='gor-logout-text'>
              <div className='gor-question gor-align-middle'></div><span><FormattedMessage id='logout.question' 
                        defaultMessage="Are you sure you would like to log out now?" description="Text for logout question"/></span>
           </div>
              <div className='gor-logout-bottom'>
                <button className='gor-cancel-btn' onClick={this.removeThisModal.bind(this)}><FormattedMessage id='logout.cancel' 
                        defaultMessage="Cancel" description="Text for cancel"/></button>
                <button className='gor-logout-btn' onClick={this.appLogout.bind(this)}><FormattedMessage id='logout.done' 
                        defaultMessage="Log out now" description="Text for logout button"/></button>
              </div> 
          </div>
        </div>
        );
      }
    };
function mapStateToProps(state, ownProps){
  return {
      auth_token: state.authLogin.auth_token  
  };
}

    function mapDispatchToProps(dispatch){
      return {
        authLoginData: function(params) {
          dispatch(authLoginData(params))
        },
        endConnect: function(){ dispatch(endWsAction()); },
        userLogout: function(){ dispatch(logoutRequest()); }
      }
    };

    export default connect(mapStateToProps,mapDispatchToProps)(LogOut);
