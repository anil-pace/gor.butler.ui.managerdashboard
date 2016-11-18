import React  from 'react';
import ReactDOM  from 'react-dom';
import Tile2x from '../components/tile2x/Tile2x';
import { connect } from 'react-redux' ;
import { FormattedMessage,FormattedNumber,FormattedPlural,FormattedRelative } from 'react-intl';
import {PICK_ICON,GOR_RISK,GOR_NONE,GOR_SUCCESS,TILE_ONTIME,TILE_ALERT} from '../constants/appConstants';
class PickStatusWidget extends React.Component{
	/**
	 * Called once before rendering of component,used to displatch fetch action
	 * @return {[type]}
	 */
	constructor(props) 
	{ 
    	super(props);
    }
    _toTime(m){
     let hh=0,mm=0,timestr='';
     hh=parseInt(m/60,10);
     mm=m-(hh*60);

     if(hh)
        timestr+=hh+ 'h ';
     timestr+=mm+ 'm ';   

     return timestr;     
    }	
    _parseProps (){
        let statusClass, 
        statusLogo, 
        headingleft,
        valueLeftStatus,
        valueRightStatus,
        textleft=0,
        headingright,
        textright, 
        statusleft,
        statusright,
        lowleft,
        lowright,
        logo,
        remTime=0,
        eta=0,
        items={},
        ordersData= Object.assign({},this.props.ordersData),
        ppsCount=this.props.ppsData?this.props.ppsData.totalPick:null,
        pickThroughput=this.props.throughputData? this.props.throughputData.pick_throughput:0;
        
        headingleft=<FormattedMessage id="widget.pick.headingleft" description='Heading for pick status widget' 
            defaultMessage='Orders to fullfill'/>;
        logo=PICK_ICON;
        textleft=ordersData.count_pending;
        
        if(!textleft)
        {
            valueLeftStatus=GOR_NONE;
            textleft=<FormattedMessage id="widget.pick.completed" description='Text for completed' 
            defaultMessage='Completed'/>;

            lowleft=<FormattedMessage id="widget.pick.status.idle" description='PPS Offline' 
                            defaultMessage='Offline'/>;
        }
        else if(!ppsCount){
            lowleft = <FormattedMessage id="widget.pick.status.starting" description='Awaiting throughput data' 
                            defaultMessage='Starting...'/>;
        }
        else
        {

            textleft=<FormattedNumber id='widget.pick.textleft' value={ordersData.count_pending} />;
            pickThroughput = <FormattedNumber value={pickThroughput}/>
            lowleft=<FormattedMessage id="widget.pick.throughput" description='Throughput message' 
                            defaultMessage='{count} PPS fullfilling at {throughput} items/hr'
                            values={{
                                count: ppsCount,
                                throughput:pickThroughput
                            }}/>;     
  
            eta=this._toTime(ordersData.eta);
            lowright=<FormattedMessage id="widget.pick.lowright" description='Estimated time' 
            defaultMessage='Completing in {eta}' values={{eta:eta}}/>;

            if(ordersData.wave_end)
            {
                headingright=<FormattedMessage id="widget.pick.headingright" description='Heading for cut-off time' 
                defaultMessage='Time to cut-off'/>;
                
                remTime=this._toTime(ordersData.cut_off);

                textright=<FormattedMessage id="widget.pick.textright" description='Time remaining' 
                defaultMessage='{cut_off}' values={{cut_off:remTime}} />;

                statusright=<FormattedMessage id="widget.pick.statusright" description='Text for wave end time' 
                defaultMessage='{wave_end}' values={{wave_end:ordersData.wave_end}}/>


                if(!ordersData.count_risk)
                {
                    statusClass=GOR_SUCCESS;
                    statusLogo=TILE_ONTIME;
                    statusleft=<FormattedMessage id="widget.pick.statusleft.onschedule" description='Text for on schedule' 
                defaultMessage='On Schedule'/>

                }
                else
                {
                    statusClass=GOR_RISK;  
                    statusLogo=TILE_ALERT;
                    statusleft=<FormattedMessage id="widget.pick.statusleft.atrisk" description='Text for orders at risk' 
                defaultMessage='{count_risk} {count_risk,plural, one {order} other {orders}} at risk' values={{count_risk:ordersData.count_risk}}/>
                    valueLeftStatus=GOR_RISK;          
                 }
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
        ordersData:state.ordersInfo.ordersData,
        ppsData:state.ppsInfo.ppsData,
        throughputData : state.throughputInfo.throughputData
    }
}
 export default connect(mapStateToProps)(PickStatusWidget);

 