import React  from 'react';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
//success codes related to user management

export const US004 = (<FormattedMessage id="notify.success.edit" description='Text for successfully editing user' 
            defaultMessage="User details updated successfully"/>);
//error codes related to user management


//success realted to pps mode change
export const MODE_REQUESTED = "PPS Mode Change Request Processed"

//error related to pps mode change
export const E028 = "Pps is already in requested mode";
export const E029 = "Previous request of changing mode is already pending, Please try later!";

export const UE002 = (<FormattedMessage id="notify.error.usernameExists" description='Text for already registered username' 
            defaultMessage="An account has already been created with this User ID"/>);

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

export const INVALID_FORMAT= (<FormattedMessage id="user.invalid.format" description='Text for invalid user ID format' 
            defaultMessage="Please use only letters (a-z), numbers, and periods"/>);

export const EMPTY_PWD= (<FormattedMessage id="login.empty.password" description='Text for empty password' 
            defaultMessage="Please enter a password"/>);

export const EMPTY_NAME= (<FormattedMessage id="user.empty.name" description='Text for empty user name' 
            defaultMessage="Please enter a name"/>);

export const INVALID_NAME= (<FormattedMessage id="user.invalid.name" description='Text for invalid user name' 
            defaultMessage='Special characters like "~","@" and "%" are not allowed'/>);

export const INVALID_PWD_OP= (<FormattedMessage id="user.invalid.password.operator" description='Text for invalid password for operator' 
            defaultMessage="Please enter a password of at least 6 alphanumeric characters"/>);

export const INVALID_PWD_MG= (<FormattedMessage id="user.invalid.password.manager" description='Text for invalid password for manager' 
            defaultMessage="Please enter a password of at least 8 alphanumeric characters"/>);

export const MATCH_PWD= (<FormattedMessage id="user.match.password" description='Text for passwords not matching' 
            defaultMessage="Both password entered do not match. Please try again"/>);



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



// Codes for audit management
export const E026 = (<FormattedMessage id="notify.error.audit.location" description='Text for invalid location' 
            defaultMessage="Location does not exist"/>);
export const E027 = (<FormattedMessage id="notify.error.audit.sku" description='Text for invalid sku' 
            defaultMessage="SKU does not exist"/>);
export const G016 = (<FormattedMessage id="notify.error.audit.g016" description='Text for unsuccessful audit deletion' 
            defaultMessage="Given audit does not exists"/>);
export const AE001 = (<FormattedMessage id="notify.error.audit.AE001" description='Text for invalid audit ID' 
            defaultMessage="Audit Id does not exists"/>);
export const AE002 = (<FormattedMessage id="notify.error.audit.AE002" description='Text for invalid PPS' 
            defaultMessage="Valid PPS not found for Audit"/>);
export const AE004 = (<FormattedMessage id="notify.error.audit.AE004" description='Text for already processed location' 
            defaultMessage="Audit of location already under process"/>);
export const AE005 = (<FormattedMessage id="notify.error.audit.AE005" description='Text for already processed sku' 
            defaultMessage="Audit of sku already under process"/>);
export const AE006 = (<FormattedMessage id="notify.error.audit.AE006" description='Text for already processed audit' 
            defaultMessage="Audit ID already processed"/>);
export const AS001 = (<FormattedMessage id="notify.create.audit.success" description='Text for successfull audit creation' 
            defaultMessage="New audit task created successfully"/>);
export const AS00A = (<FormattedMessage id="notify.start.audit.success" description='Text for successfull audit creation' 
            defaultMessage="Audit started successfully"/>);
export const AS003 = (<FormattedMessage id="notify.delete.audit.processed" description='Text for already processed audit' 
            defaultMessage="Audit already processed. Cannot delete"/>);


//Codes for Ajax Parser
export const ERR_USR=(<FormattedMessage id="notify.error.user.fail" description='Text for error in updating user' 
            defaultMessage="Error in updating user"/>);
export const ERR_RES=(<FormattedMessage id="notify.error.user.response" description='Text for error in response' 
            defaultMessage="Error in response"/>);
export const ERR_AUDIT=(<FormattedMessage id="notify.error.audit.create" description='Text for error in creating audit' 
            defaultMessage="Error in creating audit"/>);
export const ERR_API=(<FormattedMessage id="notify.error.api" description='Text for unregistered API response' 
            defaultMessage="API response not registered"/>);
export const ERR_CONNECT=(<FormattedMessage id="notify.error.connection" description='Text for connection refused' 
            defaultMessage="Connection refused"/>);


