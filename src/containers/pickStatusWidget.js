import React  from 'react';
import ReactDOM  from 'react-dom';
import Tile2x from '../components/tile2x/Tile2x';
import { connect } from 'react-redux' ;
import { FormattedMessage } from 'react-intl';

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
    _parseProps (){
        let statusClass='', statusLogo='', headingleft='',valueLeftStatus='',valueRightStatus='',textleft='',headingright='',textright='', statusleft='',statusright='',lowleft='',lowright='',logo='',items={};
        
        headingleft=<FormattedMessage id="widget.pick.headingleft" description='Heading for pick status widget' 
            defaultMessage='Orders to fullfill'/>;
        logo=' iPick';

        textleft=this.props.ordersData.count_pending;
        
        if(!textleft)
        {
            valueLeftStatus='gor-none';
            textleft=<FormattedMessage id="widget.pick.completed" description='Heading for pick status widget' 
            defaultMessage='Completed'/>;

            lowleft=this.props.ordersData.avg+' Idle';
        }
        else
        {
            textleft=<FormattedNumber id='widget.pick.textleft' value={this.props.ordersData.count_pending} />;

            headingright=<FormattedMessage id="widget.pick.headingright" description='Heading for pick status widget' 
            defaultMessage='Time to cut-off'/>;
            
            textright=<FormattedMessage id="widget.pick.textright" description='Time remaining' 
            defaultMessage='{wave_end}' values={{wave_end:this.props.ordersData.wave_end}}/>;


            lowleft=<FormattedMessage id="pickWidget.lowleft" description='Heading for pick status widget' 
            defaultMessage='{pps_count} PPS Opertaing at {pick_throughput} per/hr' values={{pps_count:10, pick_throughput:10}}/> 
            
            //statusright=this.props.ordersData.time_current;
            
            lowright=<FormattedMessage id="widget.pick.lowright" description='Estimated time' 
            defaultMessage='Completing in {eta}' values={{eta:this.props.ordersData.eta}}/>;

            if(!this.props.ordersData.count_risk)
            {
                statusClass='gor-success';
                statusLogo='overview-tile-ontime-icon';
                statusleft=<FormattedMessage id="widget.pick.statusleft" description='Heading for pick status widget' 
            defaultMessage='On Schedule'/>
            }
            else
            {
                statusClass='gor-risk';  
                valueLeftStatus='gor-risk';          
                statusleft=<FormattedMessage id="widget.pick.statusRight" description='Heading for pick status widget' 
            defaultMessage='{count_risk} orders at risk' values={{count_risk:this.props.ordersData.count_risk}}/>
                valueRightStatus='gor-risk';
            }
        }
        items={headingleft:headingleft, headingright:headingright, textleft:textleft, valueLeftStatus:valueLeftStatus, valueRightStatus:valueRightStatus, textright:textright, statusleft:statusleft, statusClass:statusClass, statusLogo:statusLogo, statusright:statusright, lowleft:lowleft, lowright:lowright, logo:logo};
        return items;
    }
    render()
    {
        var items=this._parseProps();
        return (
			 <Tile2x items={items}/>
    	);
    }

 }
function mapStateToProps(state, ownProps){
    
    return  {
         "ordersData":state.ordersInfo.ordersData || {}
    }
}
 export default connect(mapStateToProps)(PickStatusWidget);

 