import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux' ;
import { logoutRequest } from '../actions/loginAction';
import { endWsAction } from '../actions/socketActions';
import { FormattedMessage,FormattedPlural } from 'react-intl';        

class LogOut extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  removeThisModal() {
      this.props.removeModal();
  }
  appLogout() {
      this.props.removeModal();
      this.props.userLogout();
      this.props.endConnect();
      sessionStorage.clear();
  }  
  render()
  {
      return (
        <div>
          <div className='gor-logout'>
            <div className='gor-logout-text'>
              <div className='gor-question gor-align-middle'></div><span>Are you sure you would like to log out now?</span>
           </div>
              <div className='gor-logout-bottom'>
                <button className='gor-cancel-btn' onClick={this.removeThisModal.bind(this)}>Cancel</button>
                <button className='gor-logout-btn' onClick={this.appLogout.bind(this)}>Log out now</button>
              </div> 
          </div>
        </div>
      );
    }
  };
 
function mapDispatchToProps(dispatch){
    return {
      endConnect: function(){ dispatch(endWsAction()); },
        userLogout: function(){ dispatch(logoutRequest()); }
    }
};

export default connect(null,mapDispatchToProps)(LogOut);
