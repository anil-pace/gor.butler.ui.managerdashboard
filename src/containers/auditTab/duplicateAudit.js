import React  from 'react';
import { connect } from 'react-redux' ;
import {userRequest} from '../../actions/userActions';
import { FormattedMessage } from 'react-intl';        
import { CREATE_AUDIT,APP_JSON,POST } from '../../constants/frontEndConstants';
import { AUDIT_URL } from '../../constants/configConstants';

class DuplicateAudit extends React.Component{
  
  _removeThisModal() {
      this.props.removeModal();
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.auth_token)
    {
      this._removeThisModal();
    }
  }
  _userDup() {
    let formdata={};
    if(this.props.auditType==="pdfa") {
      formdata.audit_param_type=this.props.auditType;
      formdata.audit_param_value={};
      formdata.audit_param_value.product_sku=this.props.auditTypeParam;
      formdata.audit_param_value.pdfa_values=this.props.auditPdfaValue;
    }
    else {
    formdata={
         audit_param_type: this.props.auditType,
         audit_param_value: this.props.auditTypeParam
      }
    }
    let userData={
                'url':AUDIT_URL,
                'formdata':formdata,
                'method':POST,
                'cause':CREATE_AUDIT,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':this.props.auth_token
    }
    this.props.userRequest(userData);
    this._removeThisModal();
  }  
  render()
  {
      return (
        <div>
          <div className='gor-delete gor-modal-content'>
            <div className='gor-delete-text'>
              <div className='gor-question gor-align-top'></div>
              <div className='gor-delete-line'>
               <div className='gor-delete-query'><FormattedMessage id="audit.duplicate.heading" description='Text for audit duplicate heading' 
            defaultMessage='Are you sure you would like to duplicate audit task {task_name} ?' values={{task_name:(this.props.auditComplete?this.props.auditComplete:'')}}/></div>
              </div>
           </div>
              <div className='gor-delete-bottom'>
                <button className='gor-cancel-btn' onClick={this._removeThisModal.bind(this)}><FormattedMessage id="audit.duplicate.close" description='Text for audit duplicate close' 
            defaultMessage='Close' /></button>
                <button className='gor-delete-btn' onClick={this._userDup.bind(this)}><FormattedMessage id="audit.duplicate.confirm" description='Text for audit duplicate confirm' 
            defaultMessage='Duplicate audit task' /></button>
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

export default connect(mapStateToProps,mapDispatchToProps)(DuplicateAudit);
