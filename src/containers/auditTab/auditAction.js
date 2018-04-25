import React  from 'react';
import { connect } from 'react-redux' ;
import { FormattedMessage } from 'react-intl'; 
import {userRequest} from '../../actions/userActions';
import { GET_PPSLIST,START_AUDIT,GET,APP_JSON,POST ,DELETE_AUDIT,CANCEL_AUDIT} from '../../constants/frontEndConstants';       


class AuditAction extends React.Component{
  constructor(props) 
  {
    super(props);  
    this._removeThisModal = this._removeThisModal.bind(this);
    this._confirm = this._confirm.bind(this);
  }
  
  _removeThisModal() {
    this.props.removeModal();
  }
  _confirm() {
    let URL,method;
    let formData=this.props.formdata;
    if(this.props.param==DELETE_AUDIT){
      URL=this.props.URL+formData;
      method="DELETE"
    }
    else if(this.props.param==CANCEL_AUDIT){
      URL=this.props.URL+formData;
      method="PUT"
    }
    else
    {
      URL=this.props.URL;
      method=POST;
    }
    
      let auditData={
                'url':URL,
                'method':method,
                'cause':this.props.param,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'formdata':formData,
                'token':sessionStorage.getItem('auth_token')
            }
      this.props.userRequest(auditData);
      
      this.props.removeModal();
      
     
    }  
    render()
    {
      let button='';
      if(this.props.param==CANCEL_AUDIT){
button=<button className='gor-logout-btn' onClick={this._confirm}><FormattedMessage id='audit.procedd' 
                        defaultMessage="PROCEDED" description="Text for proceed button"/></button>
      }else if(this.props.param==DELETE_AUDIT){
button=<button className='gor-logout-btn' onClick={this._confirm}><FormattedMessage id='audit.delete' 
                        defaultMessage="DELETE" description="Text for delte button"/></button>
      }else if(this.props.param=='ppsChangeStart'){
button=<button className='gor-logout-btn' onClick={this._confirm}><FormattedMessage id='audit.delete' 
                        defaultMessage="CONFIRM" description="Text for delete button"/></button>
      }      
      return (
        
          <div className='gor-auditActionModal'>
            <div className='gor-logout-text'>
              <div className='gor-question gor-align-middle' style={{'float':'left'}}> </div>
              
                        {this.props.data}
                      
          
           </div> 
              <div className='gor-logout-bottom'>
                <button className='gor-cancel-btn' onClick={this._removeThisModal}><FormattedMessage id='audit.cancel.cancel' 
                        defaultMessage="CLOSE" description="Text for close"/></button>
                <button className='gor-logout-btn' onClick={this._confirm}><FormattedMessage id='audit.procedd' 
                        defaultMessage="PROCEED" description="Text for proceed button"/></button>
             
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
var mapDispatchToProps=function(dispatch){
  return {
    userRequest: function(data){ dispatch(userRequest(data)); }
  }
};


export default connect(mapStateToProps,mapDispatchToProps)(AuditAction);