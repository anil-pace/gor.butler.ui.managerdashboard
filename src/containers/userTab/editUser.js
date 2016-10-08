import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl';  
import {validateName, validatePassword, resetForm} from '../../actions/validationActions';
import { connect } from 'react-redux';
import {ERROR} from '../../constants/appConstants';
import FieldError from '../../components/fielderror/fielderror';

class EditUser extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  removeThisModal() {
    this.props.removeModal();
  }
  _checkName(){
     let data2={
        firstname:this.firstName.value,
        lastname:this.lastName.value
     };
     this.props.validateName(data2);
  }
  _handleAnchorClick(){
    this.view1.style.display='block';
    this.view2.style.display='none';
  }
  _checkPwd(){
    let data3={
    pwd1:this.password1.value,
    pwd2:this.password2.value
    };   
    this.props.validatePassword(data3);
  }
  _handleEditUser(e){
        e.preventDefault();
        let pwd1,pwd2,role,radBtn,opt,userid,firstName,lastname;

        userid=this.userId.value;
        firstname=this.firstName.value;
        lastname=this.lastName.value;
        pwd1=this.password1.value;
        pwd2=this.password2.value;


        if(!userid||!firstname||!lastname||firstname.length>50||lastname.length>50||!pwd1||!pwd2||pwd1!==pwd2)
        {
          return;
        }

        radBtn=document.getElementsByName('role');

        for(let i=0;i<radBtn.length;i++)
        {
          if(radBtn[i].checked)
            role=radBtn[i].value;
        }

        let userdata={         
            'userid': userid,
            'firstname':firstname,
            'lastname':lastname,
            'role':role,
            'password': pwd1
         };
  }
  render()
  {
      let tick=(<div className='iTick'/>);  
      return (
        <div>
          <div className="gor-modal-content">
            <div className='gor-modal-head'>
              <div className='gor-usr-add'><FormattedMessage id="users.edit.heading" description='Heading for Add new user' 
            defaultMessage='Edit user'/>
                          <div className='gor-sub-head'><FormattedMessage id="users.edit.subheading" description='Subheading for add new user' 
            defaultMessage='All the fields are mandatory'/></div>
              </div>
              <span className="close" onClick={this.removeThisModal.bind(this)}>×</span>
            </div>
            <div className='gor-modal-body'>
            <form action="#"  id = "editUserForm" ref={node => { this.editUserForm = node }} 
                onSubmit={(e) => this._handleEditUser(e)}>

            <div className='gor-usr-form'>
            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'><FormattedMessage id="users.edit.userdetails.heading" description='Text for user details heading' 
            defaultMessage='Enter User details'/></div>
            <div className='gor-sub-head'><FormattedMessage id="users.edit.userdetails.subheading" description='Text for user details subheading' 
            defaultMessage='A User ID will be required to log into the system'/></div>
            
             <div className='gor-usr-hdsm'><FormattedMessage id="users.edit.userdetails.userid" description='Text for user id' 
            defaultMessage='User ID'/></div>
              <input className='gor-usr-fdlg' type="text" placeholder="User Id" id="userid"  ref={node => { this.userId = node }} disabled/>
            <p></p>
              <div className='gor-usr-field'>
               <div className='gor-usr-hdsm'><FormattedMessage id="users.edit.userdetails.firstname" description='Text for first name' 
            defaultMessage='First Name'/></div>
                <input className={"gor-usr-fdsm"+(this.props.nameCheck.type===ERROR?' gor-input-error':' gor-input-ok')}  onBlur={this._checkName.bind(this)} type="text" placeholder="First Name" id="firstname"  ref={node => { this.firstName = node }}/>
              </div>
              <div className='gor-usr-field'>              
                <div className='gor-usr-hdsm'><FormattedMessage id="users.edit.userdetails.lastname" description='Text for last name' 
            defaultMessage='Last Name'/></div>
                <input className={"gor-usr-fdsm"+(this.props.nameCheck.type===ERROR?' gor-input-error':' gor-input-ok')}  onBlur={this._checkName.bind(this)} type="text" placeholder="Last Name" id="lastname"  ref={node => { this.lastName = node }}/>
              </div>
                            {this.props.nameCheck.type?tick:((this.props.nameCheck.type===ERROR)?<FieldError txt={this.props.nameCheck.msg} />:'')}

              </div>
            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'><FormattedMessage id="users.edit.roledetails.heading" description='Heading for role' 
            defaultMessage='Choose a role'/></div>
            <div className='gor-sub-head'><FormattedMessage id="users.edit.roledetails.subheading" description='Subheading for role' 
            defaultMessage='User will be given a specific level of control over the Butler system depending on the designated role'/></div>
                
                <div className='gor-role'>
                <input type="radio"  name='role' defaultChecked value="operator" ref={node => { this.operator = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="users.add.roledetails.operator" description='Text for operator' 
            defaultMessage='Operator'/> </span>
                </div>
                <div className='gor-choose'>
                  <div className='gor-sub-head'><FormattedMessage id="users.edit.roledetails.operatortext" description='Subtext for operator' 
            defaultMessage='Grant access to the Operator Interface at each Pick Put Station in the Butler system'/></div>
                </div>

                <div className='gor-role'>
                <input type="radio" value="supervisor" id='userRole' name="role" ref={node => { this.supervisor = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="users.add.roledetails.supervisor" description='Text for supervisor' 
            defaultMessage=' Supervisor'/></span>
                </div>
                <div className='gor-choose'>
                <div className='gor-sub-head'>
                <FormattedMessage id="users.edit.roledetails.supervisortext" description='Subtext for supervisor' 
            defaultMessage='Grant access to the Management Interface and Operator Interface for the Butler system'/></div>
                </div>

                <div className='gor-role'>
                <input type="radio"value="manager" id='userRole' name="role" ref={node => { this.manager = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="users.edit.roledetails.manager" description='Text for manager' 
            defaultMessage=' Manager'/></span>
                </div>
                <div className='gor-choose'>
                <div className='gor-sub-head'><FormattedMessage id="users.add.roledetails.managertext" description='Subtext for manager' 
            defaultMessage='Grant access to the Management Interface and Operator Interface to all systems'/></div>
                </div>
            </div>

            <div className='gor-usr-details'>
            <div className='gor-pass-view1'  ref={node => { this.view1 = node }}>
              <div className='gor-usr-hdlg'><FormattedMessage id="users.edit.changepassword.heading" description='Heading for Change password' 
               defaultMessage='Change password'/></div>
              <div className='gor-sub-head'><FormattedMessage id="users.edit.changepassword.subheading" description='Subheading for create password' 
              defaultMessage='Min of 6 digits will be required for logging into the Operator Interface'/></div>

              <div className='gor-usr-hdsm'><FormattedMessage id="users.edit.password.field1" description='Text for password' 
            defaultMessage='Password'/></div>
              <input className={"gor-usr-fdlg"+(this.props.passwordCheck.type===ERROR?' gor-input-error':' gor-input-ok')} onBlur={this._checkPwd.bind(this)} type="password" id="password1"  ref={node => { this.password1 = node }}/>     
              {this.props.passwordCheck.type?tick:''}

              <div className='gor-usr-hdsm'><FormattedMessage id="users.edit.password.field2" description='Text for confirm password' 
            defaultMessage='Confirm Password'/></div>
              <input className={"gor-usr-fdlg"+(this.props.passwordCheck.type===ERROR?' gor-input-error':' gor-input-ok')} onBlur={this._checkPwd.bind(this)} type="password" id="password2"  ref={node => { this.password2 = node }}/>
              {this.props.passwordCheck.type?tick:((this.props.passwordCheck.type===ERROR)?<FieldError txt={this.props.passwordCheck.msg} />:'')}
            </div>
            </div>

            <div className='gor-usr-details'>
            <div className='gor-pass-view2'  ref={node => { this.view2 = node }}>
              <div className='gor-usr-hdlg'><FormattedMessage id="users.edit.password." description='Heading for Password' 
              defaultMessage='Password'/></div>

              <a href="javascript:void(0)" onClick={(e) => this._handleAnchorClick(e)}><FormattedMessage id="users.edit.password.query" description='Text for change password' 
              defaultMessage='Change Password?'/></a>
              </div>
            </div>

            <p className='gor-submit'>
             <button className="gor-add-btn"><FormattedMessage id="users.edit.password.button" description='Text for edit user button' 
            defaultMessage='Save'/></button>
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
  console.log(state);
  return {
      nameCheck: state.appInfo.nameInfo || {},
      passwordCheck: state.appInfo.passwordInfo || {}      
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    validateName: function(data){ dispatch(validateName(data)); },
    validatePassword: function(data){ dispatch(validatePassword(data)); },
    resetForm:   function(){ dispatch(resetForm()); }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(EditUser);