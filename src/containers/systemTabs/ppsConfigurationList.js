/**
 * Created by gaurav.m on 6/22/17.
 */
import React  from 'react';
import {connect} from 'react-redux';
import {selectPPSProfileForConfiguration,setPPSConfigurationSpinner} from './../../actions/ppsConfigurationActions'
import {GET,FETCH_PPS_PROFILES,APP_JSON,FETCH_PROFILE_FOR_PPS} from './../../constants/frontEndConstants'
import {PPS_LIST_URL,PPS_PROFILE_URL} from './../../constants/configConstants'
import {FormattedMessage} from 'react-intl'
import {makeAjaxCall} from './../../actions/ajaxActions'

class PPSList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ppsList !== this.state.data) {
            this.setState({data: nextProps.ppsList,selectedProfile:nextProps.selectedProfile,selectedPPS:nextProps.selectedPPS})
        }
        if(nextProps.profileCreatedAt && nextProps.profileCreatedAt!==this.state.profileCreatedAt){
            this.setState({profileCreatedAt:nextProps.profileCreatedAt})
            this.fetchPPSProfiles()
        }
    }

    fetchPPSProfiles(){
        /**
         * Fetch PPS List
         */
        let userData={
            'url': PPS_LIST_URL,
            'method': GET,
            'cause': FETCH_PPS_PROFILES,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'token': this.props.auth_token
        }
        this.props.setPPSConfigurationSpinner(true)
        this.props.makeAjaxCall(userData)
    }

    componentDidMount() {
        this.fetchPPSProfiles()
    }

    selectPPSProfile({pps, profile}, event) {
        if (profile) {
            /**
             * Otherwise onClick of PPS would also get called
             */
            event.stopPropagation()
            let url=PPS_PROFILE_URL+pps.pps_id+"?profile_name="+profile.profile_name
            let data={
                'url': url,
                'method': GET,
                'cause': FETCH_PROFILE_FOR_PPS,
                'contentType': APP_JSON,
                'accept': APP_JSON,
                'token': this.props.auth_token
            }
            this.props.setPPSConfigurationSpinner(true)
            this.props.makeAjaxCall(data)
        } else if(this.props.selectedPPS && pps.pps_id===this.props.selectedPPS.pps_id){
            //Already Selected PPS, Do Nothing
        } else {
            this.props.selectPPSProfileForConfiguration({pps: pps})
        }


    }


    render() {
        let self = this
        return <div className="pps-list-container">
            <div>
                <div className="pps-list-header">
                    <FormattedMessage id="pps.configuration.header.text"
                                      description="PPS Configurations"
                                      defaultMessage="PPS Configurations"/>
                </div>
                <div className="pps-list">
                    {this.state.data.map(function (pps) {
                        return <div className={['pps-list-item',pps.pps_id===self.props.selectedPPS.pps_id?'selected':null].join(" ")} key={pps.pps_id} onClick={self.selectPPSProfile.bind(self, {pps: pps})}>
                            <div className="pps-list-item-name">
                                {"PPS-"+pps.pps_id}
                            </div>
                            <div className="pps-list-item-profiles">
                                {pps.pps_id===self.props.selectedPPS.pps_id && pps.pps_profiles.map(function (profile) {
                                    return <div className="pps-profile-item" onClick={self.selectPPSProfile.bind(self, {pps, profile})}
                                                key={profile.profile_name}>
                                        <div className={[profile.profile_name===self.props.selectedProfile.profile_name?'selected':'','pps-profile-name'].join(" ")}>{profile.profile_name}</div>
                                        <div className="profile-label-container">
                                            {profile.applied && <span className="profile-applied-label"><FormattedMessage id="pps.configuration.applied.text" description="Applied" defaultMessage="Applied"/></span>}
                                            {profile.requested && <span className="profile-requested-label"><FormattedMessage id="pps.configuration.requested.text" description="Requested" defaultMessage="Requested"/></span>}
                                        </div>

                                    </div>

                                })}
                                {pps.pps_id!==self.props.selectedPPS.pps_id && pps.pps_profiles.map(function (profile) {
                                    return profile.applied ?
                                        <div key={profile.profile_name}>{profile.profile_name} <FormattedMessage id="pps.configuration.profileAplied.text"
                                                                                                                description=" profile applied"
                                                                                                                defaultMessage=" profile applied"/></div> : null
                                })}

                            </div>


                        </div>
                    })}

                </div>
            </div>

        </div>
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ppsList: state.ppsConfiguration.ppsList||[],
        selectedProfile:state.ppsConfiguration.selectedProfile||{},
        selectedPPS:state.ppsConfiguration.selectedPPS||{},
        auth_token: state.authLogin.auth_token,
        profileCreatedAt: state.ppsConfiguration.profileCreatedAt

    };
}

var mapDispatchToProps = function (dispatch) {
    return {
        selectPPSProfileForConfiguration: function (data) {
            dispatch(selectPPSProfileForConfiguration(data))
        },
        setPPSConfigurationSpinner: function (data) {
            dispatch(setPPSConfigurationSpinner(data))
        },
        makeAjaxCall: function (data) {
            dispatch(makeAjaxCall(data))
        },
    }
};

export  default connect(mapStateToProps, mapDispatchToProps)(PPSList);