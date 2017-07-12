/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import {connect} from 'react-redux';
import Zone from '../../components/systemOverview/zoneTile.js';
import {updateSubscriptionPacket,setWsAction} from './../../actions/socketActions';
import {WS_ONSEND} from '../../constants/frontEndConstants'
import {wsOverviewData} from '../../constants/initData';
import {withRouter} from 'react-router';


class SystemOverview extends React.Component {
    constructor(props) {
        super(props);
        this._onZoneClick =  this._onZoneClick.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.socketAuthorized){
            this.props.initDataSentCall(wsOverviewData["zoning"])
        }
    }
    componentDidMount(){
        if (this.props.socketAuthorized ) {
            this.props.initDataSentCall(wsOverviewData["zoning"])
        }
    }
    shouldComponentUpdate(nextProps){
        return nextProps.hasDataChanged !== this.props.hasDataChanged
    }
    _onZoneClick(id,status){
        this.props.router.push({pathname: "/system/sysControllers", query: {id:1,status:"normal"}});
    }


    render() {
        var _this = this;
        var zones=[1,2,3,4,5,6]
        return (
            <div className="gor-zone-wrapper">
            <div className="gor-zone-header">
            <span>11/11 Operating Zones</span>
            </div>
            <div className="gor-zt-wrap">
                {zones.map((el,idx)=>{
                    return  <Zone 
                    name={"ZONE 1"}
                    id={"1"}
                    key={idx}
                    status={"OPERATING"}
                    statusClass={"operating"}
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
        hasDataChanged:state.inventoryInfo.hasDataChanged 
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

