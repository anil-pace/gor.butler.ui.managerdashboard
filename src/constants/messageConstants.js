import React  from 'react';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
//success codes related to user management
export const US001 = (<FormattedMessage id="notify.success.add" description='Text for successfull user addition' 
            defaultMessage="User successfully added"/>);

export const US002 =(<FormattedMessage id="notify.success.delete" description='Text for successfull user deletion' 
            defaultMessage="User successfully deleted"/>);

export const US004 = (<FormattedMessage id="notify.success.edit" description='Text for successfully editing user' 
            defaultMessage="User successfully edited"/>);
//error codes related to user management
export const UE002 = (<FormattedMessage id="notify.error.usernameExists" description='Text for already registered username' 
            defaultMessage="Username already registered!"/>);

export const UE003= (<FormattedMessage id="notify.error.passwordMissing" description='Text for passwords missing' 
            defaultMessage="Password not provided!"/>);

export const UE004= (<FormattedMessage id="notify.error.passwordMatch" description='Text for passwords not matching' 
            defaultMessage="Passwords do not match!"/>);

export const UE005= (<FormattedMessage id="notify.error.username" description='Text for missing username' 
            defaultMessage="Username is a required field!"/>);

export const UE006= (<FormattedMessage id="notify.error.role" description='Text for missing roles' 
            defaultMessage="Role is a required field!"/>);

//errors for info reducer
export const TYPE_SUCCESS= (<FormattedMessage id="appInfo.success" description='Text for success' 
            defaultMessage="Successfull"/>);

export const INVALID_ID= (<FormattedMessage id="user.invalid.id" description='Text for invalid user ID' 
            defaultMessage="Please enter a valid User ID"/>);

export const EMPTY_PWD= (<FormattedMessage id="login.empty.password" description='Text for empty password' 
            defaultMessage="Please enter a password"/>);

export const EMPTY_NAME= (<FormattedMessage id="user.empty.name" description='Text for empty user name' 
            defaultMessage="Minimum 6 characters required"/>);

export const INVALID_NAME= (<FormattedMessage id="user.invalid.name" description='Text for invalid user name' 
            defaultMessage='Special characters "~","@" and "%" are not allowed'/>);

export const INVALID_PWD= (<FormattedMessage id="user.invalid.password" description='Text for invalid password' 
            defaultMessage="Minimum 6 characters required"/>);

export const MATCH_PWD= (<FormattedMessage id="user.match.password" description='Text for passwords not matching' 
            defaultMessage="Passwords do not match"/>);
