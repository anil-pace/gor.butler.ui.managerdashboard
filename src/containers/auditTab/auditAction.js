import React  from 'react';
import { connect } from 'react-redux' ;
import { FormattedMessage } from 'react-intl'; 
import { APP_JSON,POST,PUT ,DELETE_AUDIT,CANCEL_AUDIT,DELETE} from '../../constants/frontEndConstants';       
import {graphql, withApollo, compose} from "react-apollo";
import gql from 'graphql-tag'
import {codeToString} from '../../../src/utilities/codeToString';
import {getFormattedMessages} from '../../../src/utilities/getFormattedMessages';
import {AuditParse} from '../../../src/utilities/auditResponseParser'
import {ShowError} from '../../../src/utilities/ErrorResponseParser';
import { resetForm,notifyfeedback,notifyFail} from '../../actions/validationActions';
import { setNotification } from '../../actions/notificationAction';
import { AUDIT_REQUEST_QUERY } from './query/serverQuery';
import { auditSpinnerState } from './query/clientQuery';


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
    var _this=this;
    let URL,method;
    let formData=this.props.formdata,dataToSent="";
    this.props.setAuditSpinner(true);
    if(this.props.param==DELETE_AUDIT){
      
      let deleteAuditData = {
        'auditId': formData,
        'method': DELETE,
        'cause': DELETE_AUDIT,
        'contentType': APP_JSON
    }
     dataToSent=JSON.stringify(deleteAuditData);
    }
    else if(this.props.param==CANCEL_AUDIT){
      let cancelAuditData = {
        'auditId': formData,
        'method': PUT,
        'cause': CANCEL_AUDIT,
        'contentType': APP_JSON
    }
     dataToSent=JSON.stringify(cancelAuditData);

    }
    else
    {
      URL=this.props.URL;
      method=POST;
    }
    
    this.props.client.query({
      query:AUDIT_REQUEST_QUERY,
        variables: (function () {
        return {
          input: {
            data:dataToSent
              }
        }
    }()),
      fetchPolicy: 'network-only'
    }).then(data=>{
      var AuditRequestSubmit=data.data.AuditRequestSubmit?JSON.parse(data.data.AuditRequestSubmit.list):""
      AuditParse(AuditRequestSubmit,_this.props.param,_this)

    })  

      this.props.removeModal();
     
    }  
    render()
    {
      let button='';
      if(this.props.param==CANCEL_AUDIT){
button=<button className='gor-logout-btn' onClick={this._confirm}><FormattedMessage id='audit.proced' 
                        defaultMessage="PROCEED" description="Text for proceed button"/></button>
      }else if(this.props.param==DELETE_AUDIT){
button=<button className='gor-logout-btn' onClick={this._confirm}><FormattedMessage id='audit.deleteButton' 
                        defaultMessage="DELETE" description="Text for delte button"/></button>
      }else if(this.props.param=='ppsChangeStart'){
button=<button className='gor-logout-btn' onClick={this._confirm}><FormattedMessage id='audit.confirm' 
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
    notifyfeedback: function (data) {dispatch(notifyfeedback(data))},
    setNotification: function (data) {dispatch(setNotification(data))   }
  }
};

const SET_AUDIT_SPINNER_STATE = gql`
    mutation setauditSpinner($auditSpinner: String!) {
        setAuditSpinnerState(auditSpinner: $auditSpinner) @client
    }
`;
const setSpinnerState = graphql(SET_AUDIT_SPINNER_STATE, {
  props: ({mutate, ownProps}) => ({
      setAuditSpinner: function (spinnerState) {
          mutate({variables: {auditSpinner: spinnerState}})
      },
  }),
});
const SET_AUDIT_LIST_REFRESH_STATE = gql`
    mutation setauditListRefresh($auditRefreshFlag: String!) {
      setAuditListRefreshState(auditRefreshFlag: $auditRefreshFlag) @client
    }
`;
const setAuditListRefreshState = graphql(SET_AUDIT_LIST_REFRESH_STATE, {
  props: ({mutate, ownProps}) => ({
    setAuditListRefresh: function (auditRefreshFlag) {
          mutate({variables: {auditRefreshFlag: auditRefreshFlag}})
      },
  }),
});



export default compose(
 withApollo
 ,setSpinnerState
 ,setAuditListRefreshState
)(connect(mapStateToProps,mapDispatchToProps)(AuditAction));
