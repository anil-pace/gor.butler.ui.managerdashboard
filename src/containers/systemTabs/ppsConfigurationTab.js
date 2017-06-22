/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import {connect} from 'react-redux';
import {
    INITIAL_HEADER_SORT,
    INITIAL_HEADER_ORDER,
    GOR_CONNECTED_STATUS,
    WS_ONSEND
} from '../../constants/frontEndConstants';
import {updateSubscriptionPacket, setWsAction} from './../../actions/socketActions'
import {wsOverviewData} from './../../constants/initData.js';
import {ppsConfigurationTabRefreshed} from './../../actions/systemActions'
import {hashHistory} from 'react-router'
import Tags from './tags'
import Bins from './ppsConfigurationBins'
import PPSList from "./ppsConfigurationList";


class PPSConfiguration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {subscribed: false}
    }

    componentWillMount() {
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
        this.props.ppsConfigurationTabRefreshed()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.socketAuthorized && !this.state.subscribed) {
            this._refreshList()
        }
    }

    /**
     * The method will update the subscription packet
     * and will fetch the data from the socket.
     * @private
     */
    _refreshList() {
        this.setState({subscribed: true})
        let updatedWsSubscription = this.props.wsSubscriptionData;
        this.props.initDataSentCall(updatedWsSubscription["default"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
    }


    render() {


        return (
            <div style={{boxSizing: 'border-box', background: 'white', overflow: 'auto'}}>
                <PPSList/>
                <div style={{
                    float: 'right',
                    width: '83%',
                    borderTop: "1px solid #ccc",
                    borderBottom: "1px solid #ccc",
                    boxSizing: 'border-box',
                    height: 500
                }}>
                    <div style={{
                        padding: 21,
                        borderBottom: "1px solid #ccc",
                        boxSizing: 'border-box',
                        fontWeight: "bold",
                        fontSize: 16,
                        color: '#999'
                    }}>
                        <span style={{padding: 20}}>Assign tags to bin</span>
                        <span style={{padding: 20}}>Bin activate/deactivate</span>
                        <span style={{padding: 20}}>Bin group enable/disable</span>
                    </div>
                    <Bins/>
                    <Tags/>

                </div>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {

    return {
        csFilter: state.sortHeaderState.csFilter || "",
        csSortHeader: state.sortHeaderState.csHeaderSort || INITIAL_HEADER_SORT,
        csSortHeaderState: state.sortHeaderState.csHeaderSortOrder || INITIAL_HEADER_ORDER,
        csSpinner: state.spinner.csSpinner || false,
        chargersDetail: state.chargersDetail || [],
        intlMessages: state.intl.messages,
        showFilter: state.filterInfo.filterState || false,
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        chargingFilterStatus: state.filterInfo.chargingFilterStatus || false,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        ppsConfigurationTabRefreshed: state.ppsConfiguration.ppsConfigurationTabRefreshed,
        socketAuthorized: state.recieveSocketActions.socketAuthorized
    };
}

var mapDispatchToProps = function (dispatch) {
    return {


        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        ppsConfigurationTabRefreshed: function (data) {
            dispatch(ppsConfigurationTabRefreshed(data))
        },
        initDataSentCall: function (data) {
            dispatch(setWsAction({type: WS_ONSEND, data: data}));
        }

    };
}

PPSConfiguration.contextTypes = {
    intl: React.PropTypes.object.isRequired
}
PPSConfiguration.PropTypes = {
    wsSubscriptionData: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(PPSConfiguration) ;

