import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl';        
class AddUser extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  removeThisModal() {
    this.props.removeModal();
  }
  _checkId(){
        let userid=this.userId.value;
        if(!userid)
        {
          this.idError.style.display='block';
          this.idPass.style.display='none';          
        }
        else
        {
          this.idError.style.display='none';
          this.idPass.style.display='inline-block';          
        }     
  }
  _checkName(){
     let firstname=this.firstName.value,
        lastname=this.lastName.value;
     if(!firstname||!lastname||firstname.length>50||lastname.length>50)
      {
          this.nameError.style.display='block';
          this.namePass.style.display='none';          
      }
      else
      {
          this.nameError.style.display='none';
          this.namePass.style.display='inline-block';                  
      }

  }
  _checkPwd(){
    let pwd1,pwd2;
    pwd1=this.password1.value;
    pwd2=this.password2.value;   
    if(pwd1!==pwd2)
    {
          this.passError.style.display='block';      
          this.pwdPass1.style.display='none';
          this.pwdPass2.style.display='none';
    }
    else
    {
          this.passError.style.display='none';      
          this.pwdPass1.style.display='inline-block';
          this.pwdPass2.style.display='inline-block';
    }
  }
  _handleAddUser(e){
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
              <input className='gor-usr-fdlg' type="text" onChange={this._checkId.bind(this)} placeholder="User Id" id="userid"  ref={node => { this.userId = node }}/><div className='gor-id-val iTick'  ref={node => { this.idPass = node }}/>
                <div className='gor-add-id-error' ref={node => { this.idError = node }} ><div className='gor-login-error'></div> Invalid user ID, please try again</div>
       
              <div className='gor-usr-field'>
                <div className='gor-usr-hdsm'><FormattedMessage id="users.add.userdetails.firstname" description='Text for first name' 
            defaultMessage='First Name'/></div>
                <input className='gor-usr-fdsm' onChange={this._checkName.bind(this)} type="text" placeholder="First Name" id="firstname"  ref={node => { this.firstName = node }}/>
              </div>
              <div className='gor-usr-field'>              
                <div className='gor-usr-hdsm'><FormattedMessage id="users.add.userdetails.lastname" description='Text for last name' 
            defaultMessage='Last Name'/></div>
                <input className='gor-usr-fdsm'  onChange={this._checkName.bind(this)} type="text" placeholder="Last Name" id="lastname"  ref={node => { this.lastName = node }}/>
              </div><div className='gor-name-val iTick'  ref={node => { this.namePass = node }}/>
                <div className='gor-add-name-error' ref={node => { this.nameError = node }} ><div className='gor-login-error'></div> Please enter valid user name</div>
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
              <input className='gor-usr-fdlg' onChange={this._checkPwd.bind(this)} type="password" id="password1"  ref={node => { this.password1 = node }}/><div className='gor-pass-val iTick'  ref={node => { this.pwdPass1 = node }}/>
                <div className='gor-add-pass-error' ref={node => { this.passError = node }} ><div className='gor-login-error'></div> Password do not match</div>

              <div className='gor-usr-hdsm'><FormattedMessage id="users.add.password.field2" description='Text for confirm password' 
            defaultMessage='Confirm Password'/></div>
              <input className='gor-usr-fdlg' onChange={this._checkPwd.bind(this)} type="password" id="password2"  ref={node => { this.password2 = node }}/><div className='gor-pass-val iTick'  ref={node => { this.pwdPass2 = node }} />
                <div className='gor-add-pass-error' ref={node => { this.passError = node }} ><div className='gor-login-error'></div> Password do not match</div>

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
export default AddUser;