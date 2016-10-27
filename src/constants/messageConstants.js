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


//success realted to pps mode change
export const MODE_REQUESTED = "PPS Mode Change Request Processed"

//error related to pps mode change
export const E028 = "Pps is already in requested mode";
export const E029 = "Previous request of changing mode is already pending, Please try later!";

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



export const MSU = (<FormattedMessage id="msu.name.prefix" description='prefix for msu name' 
            defaultMessage="MSU"/>);

export const CS = (<FormattedMessage id="chargingStation.name.prefix" description='prefix for charging station name' 
            defaultMessage="CS"/>);

export const PPS = (<FormattedMessage id="pps.name.prefix" description='prefix for pps name' 
            defaultMessage="PPS"/>);





export const INVALID_SKUID= (<FormattedMessage id="audit.invalid.sku" description='Text for invalid SKU ID' 
            defaultMessage="Please enter a valid SKU Number"/>);

export const INVALID_LOCID= (<FormattedMessage id="audit.invalid.location" description='Text for invalid location ID' 
            defaultMessage="Please enter a valid location Number"/>);

