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
    	return (
			 <Tile2x items={this.props.ordersData}/>
    	);
    }

 }
function mapStateToProps(state, ownProps){
    return  {
         "ordersData":state.recieveSocketActions.ordersData || {}
    }
}
 export default connect(mapStateToProps)(PickStatusWidget);