import React  from 'react';
import ReactDOM  from 'react-dom';
import Tile2x from '../components/tile2x/Tile2x';
import { connect } from 'react-redux' ;

class PickStatusWidget extends React.Component{
	/**
	 * Called once before rendering of component,used to displatch fetch action
	 * @return {[type]}
	 */
	constructor(props) 
	{
    	super(props);
        //console.log(this.props.ordersData);
    }	
    render()
    {
    	var statusClass='',heading='Orders to fulfill',valueStatus='';
        if(this.props.ordersData.count_pending=='0')
        {
            valueStatus='gorNone';
        }
        if(this.props.ordersData.status==='On Schedule')
        {
            statusClass='gorSuccess';
        }
        else
        {
            statusClass='gorBreach';            
        }
        return (
			 <Tile2x items={this.props.ordersData} statusClass={statusClass} heading={heading} valueStatus={valueStatus}/>
    	);
    }

 }
function mapStateToProps(state, ownProps){
    return  {
         "ordersData":state.recieveSocketActions.ordersData || {}
    }
}
 export default connect(mapStateToProps)(PickStatusWidget);