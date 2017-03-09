import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
class Footer extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<div className="gor-footer">
			<FormattedMessage id="footer.description" description="Footer description" 
              			defaultMessage ="Copyright @ 2017 GreyOrange Pte Ltd"/>
		</div> 
		);
	}
};

export default Footer ;