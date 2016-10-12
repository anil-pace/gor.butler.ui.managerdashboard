export function fieldId(userid,err1,idError,idPass){
        if(!userid)
        {
          err1.style.display='inline-block';
          idError.style.display='block';
          idPass.style.display='none';          
        }
        else
        {
          idError.style.display='none';
          idPass.style.display='inline-block';          
        }     

}
export function fieldName(firstname,lastname,err1,err2,nameError,namePass){

    let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
     if(!firstname||!lastname||firstname.length>50||lastname.length>50)
      {
          err1.style.display='inline-block';
          err2.style.display='none';
          nameError.style.display='block';
          namePass.style.display='none';          
      }
      else if(format.test(firstname)||format.test(lastname))
      {   
          err1.style.display='none';
          err2.style.display='inline-block';
          nameError.style.display='block';
          namePass.style.display='none';          
      }
      else
      {
          nameError.style.display='none';
          namePass.style.display='inline-block';                  
      }


}
export function fieldPassword(pwd1,pwd2,passError,err1,err2,pwdPass1,pwdPass2){
	if(pwd1.length<6||pwd2.length<6)
	{
          passError.style.display='block';
          err1.style.display='none';
          err2.style.display='inline-block';      
          pwdPass1.style.display='none';
          pwdPass2.style.display='none';
	}
    else if(pwd1!==pwd2)
    {
          passError.style.display='block';
          err1.style.display='inline-block';
          err2.style.display='none';      
          pwdPass1.style.display='none';
          pwdPass2.style.display='none';
    }
    else
    {
          passError.style.display='none';      
          pwdPass1.style.display='inline-block';
          pwdPass2.style.display='inline-block';
    }
}
