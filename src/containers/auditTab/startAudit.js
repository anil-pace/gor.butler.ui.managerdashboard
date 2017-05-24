import React  from 'react';
import { FormattedMessage } from 'react-intl'; 
import { resetForm } from '../../actions/validationActions'; 
import {resetAuditType} from '../../actions/auditActions';
import {userRequest} from '../../actions/userActions';
import { connect } from 'react-redux';
import { GET_PPSLIST,START_AUDIT,GET,APP_JSON,POST } from '../../constants/frontEndConstants';
import { PPSLIST_URL,START_AUDIT_URL } from '../../constants/configConstants';
import NoPPS from './noPPS';


class StartAudit extends React.Component{
  constructor(props) 
  {
      super(props);  
      this.state={checked:[]};
  }
  componentWillUnmount()
  {
    this.props.resetAuditType();
    this.props.resetForm();            
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
  componentDidMount(){
        let userData={
                'url':PPSLIST_URL,
                'method':GET,
                'cause':GET_PPSLIST,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':sessionStorage.getItem('auth_token')
            }
        this.props.userRequest(userData);
  }
  _handlestartaudit(e)
  {
    e.preventDefault();
    let formdata;
    formdata={
      audit_id_list: this.props.auditId, 
      pps_list: this.state.checked
    }
    let userData={
                'url':START_AUDIT_URL,
                'formdata':formdata,
                'method':POST,
                'cause':START_AUDIT,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':this.props.auth_token
    }
    this.props.userRequest(userData);
    this.props.removeModal();
  }
   _handleChange(event) 
   {
    let val=event.target.value;
    let checked=this.state.checked.slice(); 
    if(checked.includes(val)) {
      checked.splice(checked.indexOf(val), 1);
    } else {
      checked.push(val);
    }
    this.setState({checked: checked})
  }
  render()
  {
      let checkList=[],items=this.props.ppsList;
      for(let i=0;i<items.length;i++)
      {
        checkList.push(<li key={items[i]}><input type="checkbox" value={items[i]} onChange={this._handleChange.bind(this)} /><FormattedMessage id="audit.start.ppscheckbox" description='Text for PPS' 
            defaultMessage='PPS {eta}' values={{eta:items[i]}}/></li>);
      }

      return (
        <div>
          <div className="gor-modal-content">
            <div className='gor-modal-head'>
              <div className='gor-usr-add'><FormattedMessage id="audit.start.heading" description='Heading for start audit' 
            defaultMessage='Start audit task'/>
                          <div className='gor-sub-head'><FormattedMessage id="audit.start.subheading" description='Subheading for start audit' 
            defaultMessage='Assign one or more PPS and start the audit task'/></div>
              </div>
              <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
            </div>
            <div className='gor-modal-body'>
            <form action="#"  id="startauditForm" ref={node=> { this.startauditForm=node }} 
                onSubmit={(e)=> this._handlestartaudit(e)}>

            <div className='gor-usr-form'>
            <div className='gor-usr-details'>
            <div className='gor-usr-hdsm'><FormattedMessage id="audit.start.auditdetails.heading" description='Text for audit details heading' 
            defaultMessage='Assign PPS for {task}' values={{task:this.props.task?this.props.task:''}}/></div>
            <div className='gor-sub-head'>{checkList.length>0?(<FormattedMessage id="audit.start.auditdetails.subheading1" description='Text for audit details subheading when pps present' 
            defaultMessage='All PPS below are currently in the audit mode.'/>):<NoPPS removeFn={this._removeThisModal.bind(this)} />}</div>
            <ul>
            {checkList.length>0?checkList:''}
            </ul>
            </div>
            
     
            <p className='gor-submit'>
             {checkList.length>0?(<button type="submit" className="gor-add-btn" disabled={(!this.state.checked.length)?true:false} onClick={this._handlestartaudit.bind(this)}><FormattedMessage id="audit.start.button" description='Text for start audit button' 
            defaultMessage='Start task now'/></button>):(<button className="gor-add-btn" type="button" onClick={this._removeThisModal.bind(this)}><FormattedMessage id="audit.back.button" description='Text for go back button' 
            defaultMessage='Go Back'/></button>)}
            </p>
            </div>
            </form>
            </div>
          </div>
        </div>
      );
    }
  }
function mapStateToProps(state, ownProps){
  return {
      auditType:  state.auditInfo.auditType  || {},
      ppsList: state.auditInfo.ppsList  || [],
      auth_token:state.authLogin.auth_token
  };
}

var mapDispatchToProps=function(dispatch){
  return {
    userRequest: function(data){ dispatch(userRequest(data)); },
    resetAuditType: function(data){ dispatch(resetAuditType(data)); },    
    resetForm:   function(){ dispatch(resetForm()); }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(StartAudit);