import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux' ;
import {userRequest} from '../../actions/userActions';
import { FormattedMessage,FormattedPlural } from 'react-intl';        
import { DELETE_AUDIT } from '../../constants/appConstants';
import { AUDIT_URL,DELETE_AUDIT_URL } from '../../constants/configConstants';

class DeleteAudit extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  _removeThisModal() {
      this.props.removeModal();
  }
  _userDel() {
    let auditId=this.props.auditId;
    let userData={
                'url':DELETE_AUDIT_URL+auditId,
                'method':'DELETE',
                'cause':DELETE_AUDIT,
                'contentType':'application/json',
                'accept':'application/json',
                'token':this.props.auth_token
    }
    this.props.userRequest(userData);
    this.props.removeModal();
  }  
  render()
  {
      return (
        <div>
          <div className='gor-delete gor-modal-content'>
            <div className='gor-delete-text'>
              <div className='gor-question gor-align-top'></div>
              <div className='gor-delete-line'>
               <div className='gor-delete-query'><FormattedMessage id="audit.delete.heading" description='Text for audit delete heading' 
            defaultMessage='Are you sure you would like to delete audit task {task_name} ?' values={{task_name:(this.props.auditComplete?this.props.auditComplete:'')}}/></div>
              </div>
           </div>
              <div className='gor-delete-bottom'>
                <button className='gor-cancel-btn' onClick={this._removeThisModal.bind(this)}>Close</button>
                <button className='gor-delete-btn' onClick={this._userDel.bind(this)}>Delete audit task</button>
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

export default connect(mapStateToProps,mapDispatchToProps)(DeleteAudit);
