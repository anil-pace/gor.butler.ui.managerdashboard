/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import SubTab from './subTab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import {ORDER_LIST, WAVES} from '../../constants/appConstants';

class OrderSubTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    
	render(){
		var selectClass = {ORDER_LIST:"gorMainBlock", WAVES:"gorMainBlock"};
		return (
			<div>
				<div className="gorMainSubtab">
					
					<Link to="/waves">
						<SubTab item={WAVES} changeClass={selectClass["WAVES"]}/> 
					</Link>
					<Link to="/orderlist">
						<SubTab item={ORDER_LIST} changeClass={selectClass["ORDER_LIST"]}/> 
					</Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps){
    
    return  {
         subTab:state.subTabSelected || {},
         tab:state.tabSelected.tab
    }
}

export default (OrderSubTab) ;

