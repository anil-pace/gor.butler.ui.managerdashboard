import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux' ;
import {userRequest} from '../../actions/userActions';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import {AUTH_LOGIN,ERROR,TYPING,APP_JSON,POST,SUCCESS} from '../../constants/frontEndConstants';

class EmergencyRelease extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  _removeThisModal() {
      this.props.removeModal();
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.auth_token)
    {
      this._removeThisModal();
    }
  }
  render()
  {
      return (
        <div className='gor-modal-content gor-resume-operation'>
          <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
            <div className='gor-operation-head'>
              <div className='gor-caution'></div><span className='gor-operation-heading'>Stop button released</span>
            </div>
            <div className='gor-operation-body'>
              <div className='gor-text-bold'>Emergency Stop button has been released.</div>
              <div className='gor-operation-text'>You will be required to enter your password in order to view the checklist.
              Approving all the items on checklist will resume the warehouse operation</div>
              <div className='gor-margin-top gor-center-align'>              
                <button className='gor-add-btn'>Resume operation</button>
              </div>
            </div>
          </div>
      );
    }
  };
 function mapStateToProps(state, ownProps){
  return  {
      auth_token:state.authLogin.auth_token,
    }
} 
function mapDispatchToProps(dispatch){
    return {
      userRequest: function(data){ dispatch(userRequest(data)); },
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(EmergencyRelease);
