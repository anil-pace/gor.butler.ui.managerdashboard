/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import OrderStatsWidget from '../containers/orderStatsWidget'
import PerformanceWidget from '../containers/performanceWidget'
import AuditStatusWidget from '../containers/auditStatusWidget'
import PutStatusWidget from '../containers/putStatusWidget'
import PickStatusWidget from '../containers/pickStatusWidget'
import {connect} from 'react-redux';
import Dimensions from 'react-dimensions'
import {updateSubscriptionPacket, setWsAction} from './../actions/socketActions';
import {wsOverviewData} from './../constants/initData.js';
import {WS_ONSEND} from './../constants/frontEndConstants';
import {overviewRefreshed,wsOrdersHeaderUnSubscribe,wsOrdersHeaderSubscribe} from './../actions/overviewActions';



class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state={subscribed: false}
    }

    componentWillMount() {
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
        this.props.updateOverviewProps()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.socketAuthorized && !this.state.subscribed) {
            this.setState({subscribed: true})
            this._subscribeData(nextProps)
        }
    }

    componentWillUnmount() {
        /**
         * If a user navigates back to the inventory page,
         * it should subscribe to the packet again.
         */
        this.setState({subscribed: false});
        this.props.wsOrdersHeaderUnSubscribe(null);

    }

    _subscribeData(nextProps) {
        let updatedWsSubscription=this.props.wsSubscriptionData;
        this.props.initDataSentCall(updatedWsSubscription["default"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
        
    }


    render() {
        return (
            <div className="gorWidgetWrap">
                <div className="section group">
                    <div className="col span_2_of_4">
                        <PutStatusWidget/>
                        <AuditStatusWidget />

                    </div>
                    <div className="col span_2_of_4 gorNoML">
                        <PickStatusWidget />
                    </div>
                </div>
                <div>
                    <OrderStatsWidget/>
                    <PerformanceWidget/>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return {
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        overviewRefreshed: state.overviewDetails.overviewRefreshed,
        notificationSocketConnected:state.notificationSocketReducer.notificationSocketConnected
    }
}
function mapDispatchToProps(dispatch) {
    return {
        initDataSentCall: function (data) {
            dispatch(setWsAction({type: WS_ONSEND, data: data}));
        },
        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        updateOverviewProps: function (data) {
            dispatch(overviewRefreshed(data))
        },
        wsOrdersHeaderUnSubscribe:function(data){
             dispatch(wsOrdersHeaderUnSubscribe(data))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dimensions()(Overview));

