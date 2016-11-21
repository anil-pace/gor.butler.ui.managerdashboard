import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import {validateID, validateName, validatePassword, resetForm} from '../../actions/validationActions';
import {userRequest} from '../../actions/userActions';
import {ADD_USER,CHECK_ID,ERROR,SUCCESS,INFO,GET_ROLES} from '../../constants/frontEndConstants';
import {BUTLER_SUPERVISOR,BUTLER_UI} from  '../../constants/backEndConstants'
import {ROLE_URL,CHECK_USER,HEADER_URL} from '../../constants/configConstants';
import {INVALID_ID,INVALID_FORMAT,TYPE_SUCCESS} from '../../constants/messageConstants';
import { connect } from 'react-redux';
import FieldError from '../../components/fielderror/fielderror';
import RoleGroup from './roleGroup';
import { nameStatus, passwordStatus, idStatus } from '../../utilities/fieldCheck';

class AddUser extends React.Component{
  constructor(props) 
  {
      super(props); 
  }
  removeThisModal() {
    this.props.resetForm();
    this.props.removeModal();
  }
  componentDidMount(){
        let userData={
                'url':ROLE_URL,
                'method':'GET',
                'cause':GET_ROLES,
                'contentType':'application/json',
                'accept':'application/json',
                'token':sessionStorage.getItem('auth_token')
            }
        this.props.userRequest(userData);
  }
  _checkId(){
    let userid=this.userId.value, idInfo;
    idInfo=idStatus(userid);
    this.props.validateID(idInfo);
    if(idInfo.type)
    {
       let userData={
                'url':CHECK_USER+userid,
                'method':'GET',
                'cause':CHECK_ID,
                'contentType':'application/json',
                'accept':'application/json',
                'token':this.props.auth_token
      }
      this.props.userRequest(userData);
    }
   }
  _checkName(){
      let firstname=this.firstName.value, lastname=this.lastName.value, nameInfo;
      nameInfo=nameStatus(firstname,lastname);
      this.props.validateName(nameInfo);
      return nameInfo.type;
   }
  _checkPwd(){
    let pswd=this.pswd.value,confirmPswd=this.confirmPswd.value, passwordInfo, roleSelected=this.props.roleSet, roleSupervisor=this.props.roleInfo.BUTLER_SUPERVISOR;
    passwordInfo=passwordStatus(pswd,confirmPswd,roleSelected,roleSupervisor);
    this.props.validatePassword(passwordInfo);
    return passwordInfo.type;
  }
  _handleAddUser(e){
        e.preventDefault();
        let pswd,confirmPswd,role,opt,userid,firstname,lastname;

        userid=this.userId.value;
        firstname=this.firstName.value;
        lastname=this.lastName.value;
        pswd=this.pswd.value;
        confirmPswd=this.confirmPswd.value;

        if(!this.props.idCheck.type)
        {
          this._checkId();
          return;
        }
        if(!this.props.nameCheck.type)
        {
          if(!this._checkName())
            return;
        }
        if(!this.props.passwordCheck.type)
        {
          if(!this._checkPwd())
            return;
        }

        role=this.props.roleSet?this.props.roleSet:this.props.roleInfo.BUTLER_UI;

        let formdata={         
                    "first_name": firstname,
                    "last_name": lastname,
                    "username": userid,
                    "role_id":role,
                    "password": pswd,
                    "password_confirm": confirmPswd     

         };
        let userData={
                'url':HEADER_URL,
                'formdata':formdata,
                'method':'POST',
                'cause':ADD_USER,
                'contentType':'application/json',
                'accept':'application/json',
                'token':this.props.auth_token
            }
        this.props.userRequest(userData);
        this.removeThisModal();
  }
  render()
  {
      let tick=(<div className='gor-tick'/>);

      return (
        <div>
          <div className="gor-modal-content">
            <div className='gor-modal-head'>
              <div className='gor-usr-add'><FormattedMessage id="users.add.heading" description='Heading for Add new user' 
            defaultMessage='Add new user'/>
                          <div className='gor-sub-head'><FormattedMessage id="users.add.subheading" description='Subheading for add new user' 
            defaultMessage='All the fields are mandatory'/></div>
              </div>
              <span className="close" onClick={this.removeThisModal.bind(this)}>×</span>
            </div>
            <div className='gor-modal-body'>

            <form action="#"  id = "addUserForm" ref={node => { this.addUserForm = node }} 
                onSubmit={(e) => this._handleAddUser(e)}>
            <div className='gor-usr-form'>
            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'><FormattedMessage id="users.add.userdetails.heading" description='Text for user details heading' 
            defaultMessage='Enter User details'/></div>
            <div className='gor-sub-head'><FormattedMessage id="users.add.userdetails.subheading" description='Text for user details subheading' 
            defaultMessage='A User ID will be required to log into the system'/></div>
            
             <div className='gor-usr-hdsm'><FormattedMessage id="users.add.userdetails.userid" description='Text for user id' 
            defaultMessage='User ID'/></div>
              <input className={"gor-usr-fdlg"+(this.props.idCheck.type===ERROR?' gor-input-error':' gor-input-ok')} type="text" onBlur={this._checkId.bind(this)} placeholder="User Id" id="userid"  ref={node => { this.userId = node }} />
              {this.props.idCheck.type?tick:((this.props.idCheck.type===ERROR)?<FieldError txt={this.props.idCheck.msg} />:'')}
          
       
              <div className='gor-usr-field'>
                <div className='gor-usr-hdsm'><FormattedMessage id="users.add.userdetails.firstname" description='Text for first name' 
            defaultMessage='First Name'/></div>
                <input className={"gor-usr-fdsm"+(this.props.nameCheck.type===ERROR?' gor-input-error':' gor-input-ok')}  onBlur={(this.props.nameCheck.type===ERROR||this.props.nameCheck.type===SUCCESS)?this._checkName.bind(this):''} type="text" placeholder="First Name" id="firstname"  ref={node => { this.firstName = node }}/>
              </div>
              <div className='gor-usr-field'>              
                <div className='gor-usr-hdsm'><FormattedMessage id="users.add.userdetails.lastname" description='Text for last name' 
            defaultMessage='Last Name'/></div>
                <input className={"gor-usr-fdsm"+(this.props.nameCheck.type===ERROR?' gor-input-error':' gor-input-ok')}  onBlur={this._checkName.bind(this)} type="text" placeholder="Last Name" id="lastname"  ref={node => { this.lastName = node }}/>
              </div>
              {this.props.nameCheck.type?tick:((this.props.nameCheck.type===ERROR)?<FieldError txt={this.props.nameCheck.msg} />:'')}

            </div>

          {this.props.roleInfo?(<RoleGroup operator={this.props.roleInfo.BUTLER_UI} manager={this.props.roleInfo.BUTLER_SUPERVISOR} />):''}
            
            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'><FormattedMessage id="users.add.password.heading" description='Heading for create password' 
            defaultMessage='Create password'/></div>
            <div className='gor-sub-head'>
            {this.props.roleInfo?(this.props.roleSet===this.props.roleInfo.BUTLER_SUPERVISOR?<FormattedMessage id="users.add.password.subheading.manager" description='Subheading for create password' 
            defaultMessage='A password of at least 8 alphanumeric characters will be required for logging into the Management Interface and Operator Interface'/>:<FormattedMessage id="users.add.password.subheading.operator" description='Subheading for create password operator' 
            defaultMessage='A password of 6 digits will be required for logging into the Operator Interface.'/>):''}
            </div>

              <div className='gor-usr-hdsm'><FormattedMessage id="users.add.password.field1" description='Text for password' 
            defaultMessage='Password'/></div>
              <input className={"gor-usr-fdlg"+(this.props.passwordCheck.type===ERROR?' gor-input-error':' gor-input-ok')} onBlur={(this.props.passwordCheck.type===ERROR||this.props.passwordCheck.type===SUCCESS)?this._checkPwd.bind(this):''} type="password" id="pswd"  ref={node => { this.pswd = node }}/>     
              {this.props.passwordCheck.type?tick:''}

              <div className='gor-usr-hdsm'><FormattedMessage id="users.add.password.field2" description='Text for confirm password' 
            defaultMessage='Confirm Password'/></div>
              <input className={"gor-usr-fdlg"+(this.props.passwordCheck.type===ERROR?' gor-input-error':' gor-input-ok')} onBlur={this._checkPwd.bind(this)} type="password" id="confirmPswd"  ref={node => { this.confirmPswd = node }}/>
              {this.props.passwordCheck.type===SUCCESS?tick:((this.props.passwordCheck.type===ERROR)?<FieldError txt={this.props.passwordCheck.msg} />:'')}

            </div>
            <p className='gor-submit'>
             <button type="submit" className="gor-add-btn"><FormattedMessage id="users.add.password.button" description='Text for add new user button' 
            defaultMessage='Add new user'/></button>
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
      idCheck: state.appInfo.idInfo || {},
      nameCheck: state.appInfo.nameInfo || {},
      passwordCheck: state.appInfo.passwordInfo || {},
      roleInfo: state.appInfo.roleInfo || null,
      roleSet:  state.appInfo.roleSet  || null,
      auth_token: state.authLogin.auth_token  
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    userRequest: function(data){ dispatch(userRequest(data)); },
    validateID: function(data){ dispatch(validateID(data)); },
    validateName: function(data){ dispatch(validateName(data)); },
    validatePassword: function(data){ dispatch(validatePassword(data)); },
    resetForm:   function(){ dispatch(resetForm()); }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(AddUser) ;
