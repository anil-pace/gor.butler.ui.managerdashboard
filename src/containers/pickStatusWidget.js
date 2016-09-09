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
    	var statusClass='', statusLogo='', headingleft='',valueStatus='',textleft='',headingright='',textright='', statusleft='',statusright='',lowleft='',lowright='',logo='',items={};
        headingleft='Orders to fullfill';
        logo=' iPick';
        textleft=this.props.ordersData.count_pending;
        if(textleft||textleft=='p0')
        {
            valueStatus='gor-none';
            textleft='NONE';
            lowleft=this.props.ordersData.avg+' Idle';
        }
        else
        {
            headingright='Time to cut-off';
            textright='something';
            lowleft='PPS Opertaing '+this.props.ordersData.avg+' per/hr';
            statusright=this.props.ordersData.time_current;
            lowright='Estimated time 8hr 3min';
            if(this.props.ordersData.status==='On Schedule')
            {
                statusClass='gor-success';
                statusLogo='overview-tile-ontime-icon';
                statusleft='On Schedule';
            }
            else
            {
                statusClass='gor-breach';            
                statusleft=this.props.ordersData.status;
            }
        }
        items={headingleft:headingleft, headingright:headingright, textleft:textleft, valueStatus:valueStatus, textright:textright, statusleft:statusleft, statusClass:statusClass, statusLogo:statusLogo, statusright:statusright, lowleft:lowleft, lowright:lowright, logo:logo};
        return (
			 <Tile2x items={items}/>
    	);
    }

 }
function mapStateToProps(state, ownProps){
    //console.log(state);
    return  {
         "ordersData":state.recieveSocketActions.ordersData || {}
    }
}
 export default connect(mapStateToProps)(PickStatusWidget);