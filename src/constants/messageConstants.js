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
