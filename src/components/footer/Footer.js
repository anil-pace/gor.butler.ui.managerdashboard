import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import {getYear} from '../../utilities/processDate';
class Footer extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<div className="gor-footer">
			<FormattedMessage id="footer.text" description="Footer description" 
              			defaultMessage ="Copyright @ {dtYear} GreyOrange Pte Ltd"
              			 values={{dtYear:getYear()}}/>
		</div> 
		);
	}
};

export default Footer ;