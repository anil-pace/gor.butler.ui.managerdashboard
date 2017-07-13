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
import {cancelProfileChanges} from './../../actions/ppsConfigurationActions'


class PPSConfiguration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {subscribed: false,currentView:'tags'}
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

    handleClickOnNavigation(currentView){
        this.setState({currentView:currentView})
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

    handleClickOnNext(){
        if(this.state.currentView==="tags"){
            this.setState({currentView:'bins'})
        }else if(this.state.currentView==='bins'){
            this.setState({currentView:'groups'})
        }else{
            // Do Nothing
        }
    }

    handleClickOnBack(){
        if(this.state.currentView==="groups"){
            this.setState({currentView:'bins'})
        }else if(this.state.currentView==='bins'){
            this.setState({currentView:'tags'})
        }else{
            // Do Nothing
        }
    }

    /**
     * The method will send the selected PPS
     * along with the updated profile to the server.
     */
    cancelProfileChanges() {
        this.props.cancelProfileChanges({pps: this.props.selectedPPS})
    }




    render() {

        let self=this
        return (
            <div className="pps-configuration-container">
                <PPSList/>
                <div className="pps-configuration-details-container">
                    <div className="pps-configuration-navigation-tabs">
                        <div className={['navigation-tab',(this.state.currentView==='tags'?'active':'')].join(" ")} onClick={this.handleClickOnNavigation.bind(this,'tags')}>Assign tags to bin</div>
                        <div className={['navigation-tab',(this.state.currentView==='bins'?'active':'')].join(" ")} onClick={this.handleClickOnNavigation.bind(this,'bins')}>Bin activate/deactivate</div>
                        <div className={['navigation-tab',(this.state.currentView==='groups'?'active':'')].join(" ")} onClick={this.handleClickOnNavigation.bind(this,'groups')}>Bin group enable/disable</div>
                        <div className={['seat-description'].join(" ")}>Front View</div>
                    </div>
                    <Bins currentView={this.state.currentView}/> {/* "currentView" will bes used to set the width of bins*/}
                    {this.state.currentView==='tags' && <Tags/>}


                </div>
                {this.props.selectedPPS && <div className="pps-configuration-actions-container">
                    <button onClick={self.cancelProfileChanges.bind(self)} className="pps-bin-cancel-button">CANCEL</button>
                    {this.state.currentView!=="groups" && <button onClick={self.handleClickOnNext.bind(self)} className="pps-bin-next-button">NEXT</button>}
                    {this.state.currentView==="groups" && <button onClick={self.handleClickOnBack.bind(self)} className="pps-bin-save-apply-button">SAVE AND APPLY</button>}
                    {this.state.currentView!=="tags" && <button onClick={self.handleClickOnBack.bind(self)} className="pps-bin-back-button">BACK</button>}
                    {this.state.currentView==="groups" && <button onClick={self.handleClickOnBack.bind(self)} className="pps-bin-save-button">SAVE AS NEW PROFILE</button>}
                    {this.state.currentView==="groups" && <button onClick={self.handleClickOnBack.bind(self)} className="pps-bin-save-button">SAVE</button>}
                </div>}
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
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        selectedProfile: state.ppsConfiguration.selectedProfile || {id: null},
        selectedPPS: state.ppsConfiguration.selectedPPS,
        selectedPPSBin:state.ppsConfiguration.selectedPPSBin
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
        },
        cancelProfileChanges: function (data) {
            dispatch(cancelProfileChanges(data));
        },


    };
}

PPSConfiguration.contextTypes = {
    intl: React.PropTypes.object.isRequired
}
PPSConfiguration.PropTypes = {
    wsSubscriptionData: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(PPSConfiguration) ;

