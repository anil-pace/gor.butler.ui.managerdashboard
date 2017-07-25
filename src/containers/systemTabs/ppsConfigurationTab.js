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
import {cancelProfileChanges,savePPSProfile,setPPSConfigurationSpinner} from './../../actions/ppsConfigurationActions'
import {modal} from 'react-redux-modal'
import CreateProfile from './createPPSProfile'
import {FormattedMessage} from 'react-intl'
import {PUT,APP_JSON,SAVE_PPS_PROFILE} from './../../constants/frontEndConstants'
import {SAVE_PROFILE_URL} from './../../constants/configConstants'
import Spinner from './../../components/spinner/Spinner';


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
     * The method will send the
     * api call to save the profile
     * @param profileName
     */
    saveNewProfile(profileName){
        let newProfile=JSON.parse(JSON.stringify(this.props.selectedProfile))
        newProfile.name=profileName

    }

    createProfile(){
        let self=this
        modal.add(CreateProfile, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true, // (optional) if you don't wanna show the top right close button
            saveNewProfile:self.saveNewProfile.bind(self)
        });
    }

    /**
     * The method will send the selected PPS
     * along with the updated profile to the server.
     */
    cancelProfileChanges() {
        this.props.cancelProfileChanges({})
    }
    /**
     *
     */
    saveProfile(applyProfile){
        /**
         * API to save the existing Profile
         */
        let form_data=JSON.parse(JSON.stringify(this.props.selectedProfile))
        form_data.requested=applyProfile
        delete form_data.applied
        let url=SAVE_PROFILE_URL+this.props.selectedPPS.pps_id
        let data={
            'url': url,
            'formdata':form_data ,
            'method': PUT,
            'cause': SAVE_PPS_PROFILE,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'token': this.props.auth_token
        }
        this.props.setPPSConfigurationSpinner(true)
        this.props.savePPSProfile(data)
    }

    render() {

        let self=this
        return (
            <div className="pps-configuration-container">
                <Spinner isLoading={self.props.ppsConfigurationSpinner} setSpinner={self.props.setPPSConfigurationSpinner}/>
                <PPSList/>
                <div className="pps-configuration-details-container">
                    <div className="pps-configuration-navigation-tabs">
                        <div className={['navigation-tab',(this.state.currentView==='tags'?'active':'')].join(" ")} onClick={this.handleClickOnNavigation.bind(this,'tags')}><FormattedMessage id="pps.configuration.bins.tags.label"
                                                                                                                                                                                               description="Assign tags to bin"
                                                                                                                                                                                               defaultMessage="Assign tags to bin"/></div>
                        <div className={['navigation-tab',(this.state.currentView==='bins'?'active':'')].join(" ")} onClick={this.handleClickOnNavigation.bind(this,'bins')}><FormattedMessage id="pps.configuration.bins.activation.label"
                                                                                                                                                                                               description="Bin activate/deactivate"
                                                                                                                                                                                               defaultMessage="Bin activate/deactivate"/></div>
                        <div className={['navigation-tab',(this.state.currentView==='groups'?'active':'')].join(" ")} onClick={this.handleClickOnNavigation.bind(this,'groups')}><FormattedMessage id="pps.configuration.group.activation.label"
                                                                                                                                                                                                   description="Bin group enable/disable"
                                                                                                                                                                                                   defaultMessage="Bin group enable/disable"/></div>
                        <div className={['seat-description'].join(" ")}><FormattedMessage id="pps.configuration.bins.frontView.label"
                                                                                          description="Front View"
                                                                                          defaultMessage="Front View"/></div>
                    </div>
                    <Bins currentView={this.state.currentView}/> {/* "currentView" will bes used to set the width of bins*/}
                    {this.state.currentView==='tags' && <Tags/>}


                </div>
                {this.props.selectedPPS && <div className="pps-configuration-actions-container">
                    <button onClick={self.cancelProfileChanges.bind(self)} className="pps-bin-cancel-button"><FormattedMessage id="pps.configuration.buttons.cancel.text"
                                                                                                                               description="CANCEL"
                                                                                                                               defaultMessage="CANCEL"/></button>
                    {this.state.currentView!=="groups" && <button onClick={self.handleClickOnNext.bind(self)} className="pps-bin-next-button"><FormattedMessage id="pps.configuration.buttons.next.text"
                                                                                                                                                                description="NEXT"
                                                                                                                                                                defaultMessage="NEXT"/></button>}
                    {this.state.currentView==="groups" && <button disabled={self.props.selectedPPS.pps_profiles.filter(function(profile){ return profile.requested}).length>0} onClick={self.saveProfile.bind(self,true)} className="pps-bin-save-apply-button"><FormattedMessage id="pps.configuration.buttons.saveApply.text"
                                                                                                                                                                        description="SAVE AND APPLY"
                                                                                                                                                                        defaultMessage="SAVE AND APPLY"/></button>}
                    {this.state.currentView!=="tags" && <button onClick={self.handleClickOnBack.bind(self)} className="pps-bin-back-button"><FormattedMessage id="pps.configuration.buttons.back.text"
                                                                                                                                                              description="BACK"
                                                                                                                                                              defaultMessage="BACK"/></button>}
                    {this.state.currentView==="groups" && <button onClick={self.createProfile.bind(self)} className="pps-bin-save-button"><FormattedMessage id="pps.configuration.buttons.saveNewProfile.text"
                                                                                                                                                            description="SAVE AS NEW PROFILE"
                                                                                                                                                            defaultMessage="SAVE AS NEW PROFILE"/></button>}
                    {this.state.currentView==="groups" && <button disabled={self.props.selectedProfile.applied} onClick={self.saveProfile.bind(self,false)} className="pps-bin-save-button"><FormattedMessage id="pps.configuration.buttons.save.text"
                                                                                                                                                                  description="SAVE"
                                                                                                                                                                  defaultMessage="SAVE"/></button>}
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
        selectedProfile: state.ppsConfiguration.selectedProfile || {name: null},
        selectedPPS: state.ppsConfiguration.selectedPPS,
        selectedPPSBin:state.ppsConfiguration.selectedPPSBin,
        ppsConfigurationSpinner:state.ppsConfiguration.ppsConfigurationSpinner,
        auth_token: state.authLogin.auth_token
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
        savePPSProfile: function (data) {
            dispatch(savePPSProfile(data));
        },
        setPPSConfigurationSpinner: function (data) {
            dispatch(setPPSConfigurationSpinner(data))
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

