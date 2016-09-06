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
        console.log(this.props.pickData);
    }	
    render()
    {
    	return (
			 <Tile2x items={this.props.pickData}/>
    	);
    }

 }
function mapStateToProps(state, ownProps){
    return  {
         "pickData":state.recieveSocketActions.pickData || {}
    }
}
 export default connect(mapStateToProps)(PickStatusWidget);