import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import {validateID, validateName, validatePassword, resetForm} from '../../actions/validationActions';
import {userRequest} from '../../actions/userActions';
import {ADD_USER,CHECK_ID,ERROR,SUCCESS,INFO} from '../../constants/appConstants';
import { connect } from 'react-redux';
import FieldError from '../../components/fielderror/fielderror';

class AddUser extends React.Component{
  constructor(props) 
  {
      super(props); 
  }
  removeThisModal() {
    this.props.resetForm();
    this.props.removeModal();
  }
  _checkId(){
    let data1={userid:this.userId.value};
    this.props.validateID(data1);
    // let formdata={         
    //                 "username": data1,
    // };
    // let userData={
    //             'url':'https://192.168.8.118/api/user',
    //             'formdata':formdata,
    //             'method':'POST',
    //             'cause':CHECK_ID,
    //             'contentType':'application/json',
    //             'accept':'application/json',
    //             'token':sessionStorage.getItem('auth_token')
    // }
    // this.props.userRequest(userData);
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
        let pwd1,pwd2,role,radBtn,opt,userid,firstName,lastname;

        userid=this.userId.value;
        firstname=this.firstName.value;
        lastname=this.lastName.value;
        pwd1=this.password1.value;
        pwd2=this.password2.value;


        if(!this.props.idCheck.type||!this.props.nameCheck.type||!this.props.passwordCheck.type)
        {
          console.log('Form not valid');
          return;
        }

        // radBtn=document.getElementsByName('role');

        // for(let i=0;i<radBtn.length;i++)
        // {
        //   if(radBtn[i].checked)
        //     role=radBtn[i].value;
        // }
        role=2;

        let formdata={         
                    "first_name": firstname,
                    "last_name": lastname,
                    "username": userid,
                    "role_id":role,
                    "password": pwd1,
                    "password_confirm": pwd2     

         };
        let userData={
                'url':'https://192.168.8.118/api/user',
                'formdata':formdata,
                'method':'POST',
                'cause':ADD_USER,
                'contentType':'application/json',
                'accept':'application/json',
                'token':sessionStorage.getItem('auth_token')
            }
        this.props.userRequest(userData);
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
                <input className={"gor-usr-fdsm"+(this.props.nameCheck.type===ERROR?' gor-input-error':' gor-input-ok')}  onBlur={this._checkName.bind(this)} type="text" placeholder="First Name" id="firstname"  ref={node => { this.firstName = node }}/>
              </div>
              <div className='gor-usr-field'>              
                <div className='gor-usr-hdsm'><FormattedMessage id="users.add.userdetails.lastname" description='Text for last name' 
            defaultMessage='Last Name'/></div>
                <input className={"gor-usr-fdsm"+(this.props.nameCheck.type===ERROR?' gor-input-error':' gor-input-ok')}  onBlur={this._checkName.bind(this)} type="text" placeholder="Last Name" id="lastname"  ref={node => { this.lastName = node }}/>
              </div>
              {this.props.nameCheck.type?tick:((this.props.nameCheck.type===ERROR)?<FieldError txt={this.props.nameCheck.msg} />:'')}

            </div>

            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'><FormattedMessage id="users.add.roledetails.heading" description='Heading for role' 
            defaultMessage='Choose a role'/></div>
            <div className='gor-sub-head'><FormattedMessage id="users.add.roledetails.subheading" description='Subheading for role' 
            defaultMessage='User will be given a specific level of control over the Butler system depending on the designated role'/></div>
                
                <div className='gor-role'>
                <input type="radio"  name='role' defaultChecked value="operator" ref={node => { this.operator = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="users.add.roledetails.operator" description='Text for operator' 
            defaultMessage='Operator'/> </span>
                </div>
                <div className='gor-choose'>
                  <div className='gor-sub-head'><FormattedMessage id="users.add.roledetails.operatortext" description='Subtext for operator' 
            defaultMessage='Grant access to the Operator Interface at each Pick Put Station in the Butler system'/></div>
                </div>

                <div className='gor-role'>
                <input type="radio" value="supervisor" id='userRole' name="role" ref={node => { this.supervisor = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="users.add.roledetails.supervisor" description='Text for supervisor' 
            defaultMessage=' Supervisor'/></span>
                </div>
                <div className='gor-choose'>
                <div className='gor-sub-head'>
                <FormattedMessage id="users.add.roledetails.supervisortext" description='Subtext for supervisor' 
            defaultMessage='Grant access to the Management Interface and Operator Interface for the Butler system'/></div>
                </div>

                <div className='gor-role'>
                <input type="radio"value="manager" id='userRole' name="role" ref={node => { this.manager = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="users.add.roledetails.manager" description='Text for manager' 
            defaultMessage=' Manager'/></span>
                </div>
                <div className='gor-choose'>
                <div className='gor-sub-head'><FormattedMessage id="users.add.roledetails.managertext" description='Subtext for manager' 
            defaultMessage='Grant access to the Management Interface and Operator Interface to all systems'/></div>
                </div>
            </div>

            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'><FormattedMessage id="users.add.password.heading" description='Heading for create password' 
            defaultMessage='Create password'/></div>
            <div className='gor-sub-head'><FormattedMessage id="sers.add.password.subheading" description='Subheading for create password' 
            defaultMessage='Min of 6 digits will be required for logging into the Operator Interface'/></div>

              <div className='gor-usr-hdsm'><FormattedMessage id="users.add.password.field1" description='Text for password' 
            defaultMessage='Password'/></div>
              <input className={"gor-usr-fdlg"+(this.props.passwordCheck.type===ERROR?' gor-input-error':' gor-input-ok')} onBlur={this._checkPwd.bind(this)} type="password" id="password1"  ref={node => { this.password1 = node }}/>     
              {this.props.passwordCheck.type?tick:''}

              <div className='gor-usr-hdsm'><FormattedMessage id="users.add.password.field2" description='Text for confirm password' 
            defaultMessage='Confirm Password'/></div>
              <input className={"gor-usr-fdlg"+(this.props.passwordCheck.type===ERROR?' gor-input-error':' gor-input-ok')} onBlur={this._checkPwd.bind(this)} type="password" id="password2"  ref={node => { this.password2 = node }}/>
              {this.props.passwordCheck.type?tick:((this.props.passwordCheck.type===ERROR)?<FieldError txt={this.props.passwordCheck.msg} />:'')}

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
  console.log(state);
  return {
      idCheck: state.appInfo.idInfo || {},
      nameCheck: state.appInfo.nameInfo || {},
      passwordCheck: state.appInfo.passwordInfo || {}      
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
