import React  from 'react';
class FieldError extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
			<div className='gor-field-error'>
                 <div className='gor-login-error' />
                          {this.props.txt}
            </div>
		);
	}
};

export default FieldError ;