import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux' ;
import { logoutRequest } from '../actions/loginAction';
import { endWsAction } from '../actions/socketActions';
import { FormattedMessage } from 'react-intl';        

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
     
      this.props.removeModal();
      sessionStorage.clear();
      this.props.userLogout();
      this.props.endConnect();
     
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
        endConnect: function(){ dispatch(endWsAction()); },
        userLogout: function(){ dispatch(logoutRequest()); }
      }
    };

    export default connect(mapStateToProps,mapDispatchToProps)(LogOut);
