/**
 * Created by gaurav.m on 6/22/17.
 */
import React  from 'react';
import {connect} from 'react-redux';
import {fetchPPSProfiles,selectPPSProfileForConfiguration} from './../../actions/ppsConfigurationActions'
import {GET,FETCH_PPS_PROFILES,APP_JSON} from './../../constants/frontEndConstants'

class PPSList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ppsProfiles !== this.state.data) {
            this.setState({data: nextProps.ppsProfiles,selectedProfile:nextProps.selectedProfile,selectedPPS:nextProps.selectedPPS})
        }
    }

    componentDidMount() {
        /**
         * Fetch PPS List
         */
        let userData={
            'url': FETCH_PPS_PROFILES,
            'method': GET,
            'cause': FETCH_PPS_PROFILES,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'token': this.props.auth_token
        }
        this.props.fetchPPSProfiles(userData)
    }

    selectPPS({pps, profile},event) {
        if(profile){
            /**
             * Otherwise onClick of PPS would also get called
             */
            event.stopPropagation()
        }
        this.props.selectPPSProfileForConfiguration({pps:pps,profile:profile})

    }


    render() {
        let self = this
        return <div className="pps-list-container">
            <div>
                <div className="pps-list-header">
                    PPS Configurations
                </div>
                <div className="pps-list">
                    {this.state.data.map(function (pps) {
                        return <div className={['pps-list-item',pps.selected?'selected':null].join(" ")} key={pps.name} onClick={self.selectPPS.bind(self, {pps: pps})}>
                            <div>
                                {pps.name}
                            </div>
                            <div className="pps-list-item-profiles">
                                {pps.selected && pps.profiles.map(function (profile) {
                                    return <div onClick={self.selectPPS.bind(self, {pps, profile})}
                                                key={profile.name}>
                                        {profile.name} {profile.applied ? "applied" : ''}
                                    </div>

                                })}
                                {!pps.selected && pps.profiles.map(function (profile) {
                                    return profile.applied ?
                                        <div key={profile.name}>{profile.name + " is applied"}</div> : null
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
        ppsProfiles: state.ppsConfiguration.ppsProfiles,
        selectedProfile:state.ppsConfiguration.selectedProfile,
        selectedPPS:state.ppsConfiguration.selectedPPS,

    };
}

var mapDispatchToProps = function (dispatch) {
    return {
        fetchPPSProfiles: function (data) {
            dispatch(fetchPPSProfiles(data))
        },
        selectPPSProfileForConfiguration: function (data) {
            dispatch(selectPPSProfileForConfiguration(data))
        },
    }
};

export  default connect(mapStateToProps, mapDispatchToProps)(PPSList);