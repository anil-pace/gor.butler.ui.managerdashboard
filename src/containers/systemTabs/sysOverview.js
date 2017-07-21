/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import {connect} from 'react-redux';
import Zone from '../../components/systemOverview/zoneTile.js';
import {updateSubscriptionPacket,setWsAction} from './../../actions/socketActions';
import {WS_ONSEND,ZONE_STATUS_CLASS} from '../../constants/frontEndConstants';
import {ZONE_STATUS_INTL_MESSAGE} from '../../constants/messageConstants';
import {wsOverviewData} from '../../constants/initData';
import {FormattedMessage} from 'react-intl';
import {withRouter} from 'react-router';


class SystemOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            subscribed:false
        }
        this._onZoneClick =  this._onZoneClick.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.socketAuthorized && !this.state.subscribed){
            this.setState({
                subscribed:true
            },function(){
                this.props.initDataSentCall(wsOverviewData["zoning"])
            })
        }
    }
    componentWillMount(){
        if(this.props.socketAuthorized && !this.state.subscribed){
            this.setState({
                subscribed:true
            },function(){
                this.props.initDataSentCall(wsOverviewData["zoning"])
            })
        }
    }
    
    
    shouldComponentUpdate(nextProps){
        return ((nextProps.hasDataChanged !== this.props.hasDataChanged) || 
            (this.props.zoneHeader.active_zones !== nextProps.zoneHeader.active_zones))
    }
    _onZoneClick(id,status){
        this.props.router.push({pathname: "/system/sysControllers", query: {zone_id:id,status:status}});
    }


    render() {
        var _this = this;
        var zones=this.props.zones ? this.props.zones["zones_data"] : {};
        var emergencyData = this.props.zones ? this.props.zones.emergency_data : {};
        return (
            <div className="gor-zone-wrapper">
            <div className="gor-zone-header">
           <FormattedMessage id="sysOverView.zones.count" description='Zone status count '
                                            defaultMessage='{activeZones}/{totalZones} Operating Zones'
                                            values={{
                                                activeZones: this.props.zoneHeader.active_zones===0 ? (this.props.zoneHeader.active_zones).toString(): this.props.zoneHeader.active_zones,
                                                totalZones: this.props.zoneHeader.total_zones===0 ? (this.props.zoneHeader.total_zones).toString():this.props.zoneHeader.total_zones
                                            }}/>
            </div>
            <div className="gor-zt-wrap">
                {Object.keys(zones).map((key,idx)=>{
                    let statusText //= emergencyData.emergency_on && zones[key]["zone_status"] === ""
                    if(emergencyData.emergency_on && emergencyData.emergency_type === "stop"){
                        if(zones[key]["zone_status"] === "emergency_stop"){
                            statusText = ZONE_STATUS_INTL_MESSAGE[zones[key]["zone_status"]]
                        }
                        else{
                            statusText = ZONE_STATUS_INTL_MESSAGE["stopped"]
                        }
                    }
                    else if(emergencyData.emergency_on && emergencyData.emergency_type === "pause"){
                        if(zones[key]["zone_status"] === "emergency_pause"){
                            statusText = ZONE_STATUS_INTL_MESSAGE[zones[key]["zone_status"]]
                        }
                        else{
                            statusText = ZONE_STATUS_INTL_MESSAGE["paused"]
                        }
                    }
                    else{
                        statusText = ZONE_STATUS_INTL_MESSAGE[zones[key]["zone_status"]]
                    }
                    return  <Zone 
                    name={<FormattedMessage id="sysOverView.zones.name" description='Zone Name'
                                            defaultMessage='ZONE {name}'
                                            values={{
                                                name: key
                                            }}/>}
                    id={key}
                    key={idx}
                    emergencyStatus={emergencyData.emergency_on}
                    emergencyType={emergencyData.emergency_type}
                    statusText={statusText}
                    status={zones[key]["zone_status"]}
                    statusClass={ZONE_STATUS_CLASS[zones[key]["zone_status"]]}
                    onZoneClick={_this._onZoneClick}/>
                })}
               
                 
            </div>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        hasDataChanged:state.sysOverviewReducer.hasDataChanged ,
        zones:state.sysOverviewReducer.zones,
        zoneHeader:state.zoningReducer.zoneHeader || {},
        zoneSubscriptionInitiated:state.sysOverviewReducer.zoneSubscriptionInitiated
    };
}

function mapDispatchToProps (dispatch) {
    return {
        initDataSentCall: function(data){dispatch(setWsAction({type:WS_ONSEND,data:data})); }
    }
};




SystemOverview.PropTypes={
    ppsFilter: React.PropTypes.string,
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SystemOverview)) ;

