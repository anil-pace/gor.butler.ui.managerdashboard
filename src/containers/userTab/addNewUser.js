import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import {validateID, validateName, validatePassword, resetForm} from '../../actions/validationActions';
import {userRequest} from '../../actions/userActions';
import {ADD_USER,CHECK_ID,ERROR,SUCCESS,INFO,GET_ROLES} from '../../constants/appConstants';
import {ROLE_URL,CHECK_USER,HEADER_URL} from '../../constants/configConstants';
import { connect } from 'react-redux';
import FieldError from '../../components/fielderror/fielderror';
import RadioGroup from './radioGroup';

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
    let data1={userid:this.userId.value};
    this.props.validateID(data1);
    if(data1.userid)
    {
      let userData={
                'url':CHECK_USER+data1.userid,
                'method':'GET',
                'cause':CHECK_ID,
                'contentType':'application/json',
                'accept':'application/json',
                'token':sessionStorage.getItem('auth_token')
      }
      this.props.userRequest(userData);
    }
  }
  _checkName(){
      let data2={
        firstname:this.firstName.value,
        lastname:this.lastName.value
      };   
      this.props.validateName(data2);
   }
  _checkPwd(){
    let data3={
    pwd1:this.password1.value,
    pwd2:this.password2.value
    };   
    this.props.validatePassword(data3);
  }
  _handleAddUser(e){
        e.preventDefault();
        let pwd1,pwd2,role,opt,userid,firstname,lastname;

        userid=this.userId.value;
        firstname=this.firstName.value;
        lastname=this.lastName.value;
        pwd1=this.password1.value;
        pwd2=this.password2.value;

        if(!this.props.idCheck.type)
        {
          this._checkId();
          return;
        }
        else if(!this.props.nameCheck.type)
        {
          this._checkName();
          return;
        }
        else if(!this.props.passwordCheck.type)
        {
          this._checkPwd();
          return;
        }

        role=this.props.roleSet?this.props.roleSet.msg:this.props.roleInfo.msg.operator;

        let formdata={         
                    "first_name": firstname,
                    "last_name": lastname,
                    "username": userid,
                    "role_id":role,
                    "password": pwd1,
                    "password_confirm": pwd2     

         };
        let userData={
                'url':HEADER_URL,
                'formdata':formdata,
                'method':'POST',
                'cause':ADD_USER,
                'contentType':'application/json',
                'accept':'application/json',
                'token':sessionStorage.getItem('auth_token')
            }
        this.props.userRequest(userData);
        this.removeThisModal();
  }
  render()
  {
      let tick=(<div className='iTick'/>);

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

          {this.props.roleInfo?(<RadioGroup operator={this.props.roleInfo.msg.operator} manager={this.props.roleInfo.msg.manager} />):''}
            
            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'><FormattedMessage id="users.add.password.heading" description='Heading for create password' 
            defaultMessage='Create password'/></div>
            <div className='gor-sub-head'><FormattedMessage id="sers.add.password.subheading" description='Subheading for create password' 
            defaultMessage='Min of 6 digits will be required for logging into the Operator Interface'/></div>

              <div className='gor-usr-hdsm'><FormattedMessage id="users.add.password.field1" description='Text for password' 
            defaultMessage='Password'/></div>
              <input className={"gor-usr-fdlg"+(this.props.passwordCheck.type===ERROR?' gor-input-error':' gor-input-ok')} onBlur={(this.props.passwordCheck.type===ERROR||this.props.passwordCheck.type===SUCCESS)?this._checkPwd.bind(this):''} type="password" id="password1"  ref={node => { this.password1 = node }}/>     
              {this.props.passwordCheck.type?tick:''}

              <div className='gor-usr-hdsm'><FormattedMessage id="users.add.password.field2" description='Text for confirm password' 
            defaultMessage='Confirm Password'/></div>
              <input className={"gor-usr-fdlg"+(this.props.passwordCheck.type===ERROR?' gor-input-error':' gor-input-ok')} onBlur={this._checkPwd.bind(this)} type="password" id="password2"  ref={node => { this.password2 = node }}/>
              {this.props.passwordCheck.type===SUCCESS?tick:((this.props.passwordCheck.type===ERROR)?<FieldError txt={this.props.passwordCheck.msg} />:'')}

            </div>
            <p className='gor-submit'>
             <button className="gor-add-btn"><FormattedMessage id="users.add.password.button" description='Text for add new user button' 
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
      roleSet:  state.appInfo.roleSet  || null  
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
