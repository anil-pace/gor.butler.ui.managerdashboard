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
    	var statusClass='', statusLogo='', heading1='',valueStatus='',text1='',heading2='',text2='', text2Class='', status1='',status2='',low1='',low2='',logo='',items={};
        heading1='Orders to fullfill';
        logo=' iStock';
        text1=this.props.ordersData.count_pending;
        if(text1=='0')
        {
            valueStatus='gorNone';
            text1='NONE';
            low1=this.props.ordersData.avg+'Idle';
        }
        else
        {
            heading2='Remaining time';
            text2='something';
            low1='PPS Opertaing '+this.props.ordersData.avg+' per/hr';
            status2=this.props.ordersData.time_current;
            low2='Estimated time 8hr 3min';
            if(this.props.ordersData.status==='On Schedule')
            {
                statusClass='gorSuccess';
                statusLogo='overview-tile-ontime-icon';
                status1='On Schedule';
            }
            else
            {
                statusClass='gorBreach';            
                status1=this.props.ordersData.status;
            }
        }
        items={headingleft:heading1, headingright:heading2, textleft:text1, valueStatus:valueStatus, textright:text2, statusleft:status1, statusClass:statusClass, statusLogo:statusLogo, statusright:status2, lowleft:low1, lowright:low2, logo:logo};
        return (
			 <Tile2x items={items}/>
    	);
    }

 }
function mapStateToProps(state, ownProps){
    return  {
         "ordersData":state.recieveSocketActions.ordersData || {}
    }
}
 export default connect(mapStateToProps)(PickStatusWidget);