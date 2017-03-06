import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux' ;
import {userRequest} from '../../actions/userActions';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 


class ResumeOperation extends React.Component{
  constructor(props) 
  {
      super(props);  
      this.state={fieldEmpty:true}
  }
  _removeThisModal() {
      this.props.removeModal();
  }
  _isTyping(){
    if(this.password && this.password.value){
      this.setState({fieldEmpty:false});
    }
    else{
      this.setState({fieldEmpty:true});
    }
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
              <div className='gor-question'></div>Resume Operation
            </div>
            <div className='gor-operation-body'>
              <span>To resume operation, you will be required to go through a safety
                checklist to make sure that the Butler system is ready</span>
              <div className='gor-margin-top'>
                <div className='gor-password-field-lg gor-input-ok'>
                        <div className={'gor-login-password'}></div>
                        <input className='field' type="password" id="password" 
                         ref={node => { this.password = node }} onChange={this._isTyping.bind(this)} />
                </div>
              </div>
              <div className='gor-margin-top'>              
                <button className='gor-cancel-btn' onClick={this._removeThisModal.bind(this)}>Cancel</button>
                <button className='gor-add-btn' disabled={this.state.fieldEmpty?true:false} >View safety checklist</button>
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

export default connect(mapStateToProps,mapDispatchToProps)(ResumeOperation);
