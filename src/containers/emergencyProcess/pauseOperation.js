import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux' ;
import {userRequest} from '../../actions/userActions';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 


class PauseOperation extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  _removeThisModal() {
      this.props.removeModal();
  }
  _fieldEmpty(){
    if(this.password && this.password.value){
      return false;
    }
    return true;
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
          <div className='gor-operation-pause gor-modal-content'>
            <div className='gor-operation-head'>
              <div className='gor-question'></div>Pause Operation
            </div>
            <div className='gor-operation-body'>
              <span>All Butler bots, PPS and other sysytem components will be paused once
              completed the last action</span>
              <div className='gor-margin-top'>
                <div className='gor-password-field-lg gor-input-ok'>
                        <div className={'gor-login-password'}></div>
                        <input className='field' type="password" id="password" 
                         ref={node => { this.password = node }}/>
                </div>
              </div>
              <div className='gor-margin-top'>              
                <button className='gor-cancel-btn' onClick={this._removeThisModal.bind(this)}>Cancel</button>
                <button className='gor-add-btn' disabled={this._fieldEmpty()}>Pause Operation</button>
              </div>
            </div>
          </div>
      );
    }
  };
 function mapStateToProps(state, ownProps){
  return  {
      auth_token:state.authLogin.auth_token
    }
} 
function mapDispatchToProps(dispatch){
    return {
      userRequest: function(data){ dispatch(userRequest(data)); }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(PauseOperation);
