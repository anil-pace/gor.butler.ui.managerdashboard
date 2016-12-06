import React  from 'react';
import ReactDOM  from 'react-dom';
import Tile2x from '../components/tile2x/Tile2x';
import { connect } from 'react-redux' ;
import { FormattedMessage,FormattedNumber,FormattedPlural,FormattedRelative, FormattedDate } from 'react-intl';
import {PICK_ICON,GOR_RISK,GOR_NONE,GOR_SUCCESS,TILE_ONTIME,TILE_ALERT} from '../constants/frontEndConstants';
import {secondsToTime} from '../utilities/processTime';

class PickStatusWidget extends React.Component{
	/**
	 * Called once before rendering of component,used to displatch fetch action
	 * @return {[type]}
	 */
    constructor(props) 
    { 
    	super(props);
    }
    _parseProps (){
        var statusClass, 
        statusLogo, 
        headingLeft,
        valueLeftStatus,
        valueRightStatus,
        textLeft,
        headingRight,
        textRight, 
        statusLeft,
        statusRight,
        lowLeft,
        lowRight,
        logo,
        remTime=0,
        eta=0,
        items={},
        ordersData= Object.assign({},this.props.ordersData),
        ppsCount=this.props.ppsData?this.props.ppsData.totalPick:null,
        pickThroughput=this.props.throughputData? this.props.throughputData.pick_throughput:0;
        
        headingLeft=<FormattedMessage id="widget.pick.headingleft" description='Heading for pick status widget' 
        defaultMessage='Orders to fullfill'/>;
        logo=PICK_ICON;
        textLeft=ordersData.count_pending;
        
        if(!textLeft)
        {
            valueLeftStatus=GOR_NONE;
            textLeft=<FormattedMessage id="widget.pick.none" description='Text for none' 
            defaultMessage='None'/>;
            lowLeft=<FormattedMessage id="widget.pick.status.idle" description='PPS Offline' 
            defaultMessage='Offline'/>;
        }
        else
        {
            textLeft=<FormattedNumber id='widget.pick.textleft' value={ordersData.count_pending} />;
            pickThroughput = <FormattedNumber value={pickThroughput}/>
            if(!ppsCount){
                lowLeft = <FormattedMessage id="widget.pick.status.starting" description='Awaiting throughput data' 
                defaultMessage='Starting...'/>;
            }
            else{
                lowLeft=<FormattedMessage id="widget.pick.throughput" description='Throughput message' 
                defaultMessage='{count} PPS fullfilling at {throughput} items/hr'
                values={{
                    count: ppsCount,
                    throughput:pickThroughput
                }}/>;     
            }

            eta=secondsToTime(ordersData.eta);
            lowRight=<FormattedMessage id="widget.pick.lowright" description='Estimated time' 
            defaultMessage='Completing in {eta}' values={{eta:eta}}/>;
            if(ordersData.wave_end){
                headingRight=<FormattedMessage id="widget.pick.headingright" description='Heading for cut-off time' 
                defaultMessage='Time to cut-off'/>;
                remTime=secondsToTime(ordersData.cut_off);
                textRight=<FormattedMessage id="widget.pick.textright" description='Time remaining' 
                defaultMessage='{cut_off}' values={{cut_off:remTime}} />;

                statusRight=<FormattedDate value = {ordersData.wave_end}
                month='short'
                day='2-digit'
                hour="2-digit"
                minute="2-digit"
                timeZoneName="short"
                />;


                if(!ordersData.count_risk){
                    statusClass=GOR_SUCCESS;
                    statusLogo=TILE_ONTIME;
                    statusLeft=<FormattedMessage id="widget.pick.statusleft.onschedule" description='Text for on schedule' 
                    defaultMessage='On Schedule'/>
                }
                else
                {
                    statusClass=GOR_RISK;  
                    statusLogo=TILE_ALERT;
                    statusLeft=<FormattedMessage id="widget.pick.statusleft.atrisk" description='Text for orders at risk' 
                    defaultMessage='{count_risk} {count_risk,plural, one {order} other {orders}} at risk'
                    values={{count_risk:ordersData.count_risk}}/>
                    valueLeftStatus=GOR_RISK;          
                }
            }
        }
        items={headingleft:headingLeft, headingright:headingRight, textleft:textLeft, 
            valueLeftStatus:valueLeftStatus, valueRightStatus:valueRightStatus, 
            textright:textRight, statusleft:statusLeft, statusClass:statusClass, 
            statusLogo:statusLogo, statusright:statusRight, lowleft:lowLeft, 
            lowright:lowRight, logo:logo};
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

