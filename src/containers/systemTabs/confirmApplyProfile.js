/**
 * Created by gaurav.m on 7/26/17.
 */
import React from 'react'
import {connect} from 'react-redux'
import {changePPSProfile} from './../../actions/ppsConfigurationActions'
import {PPS_PROFILE_URL} from './../../constants/configConstants'
import {POST, CHANGE_PPS_PROFILE, APP_JSON} from './../../constants/frontEndConstants'
import {FormattedMessage} from 'react-intl'
class ConfirmApplyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    changePPSProfile(pps_id, profile_name) {
        let url = PPS_PROFILE_URL + pps_id + "/" + profile_name+"/request"
        let data = {
            'url': url,
            'method': POST,
            'cause': CHANGE_PPS_PROFILE,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'token': this.props.auth_token
        }
        this.props.changePPSProfile(data)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.profileRequestedAt!==this.props.profileRequestedAt){
            this.props.removeModal()
        }
    }

    render() {
        return <div>
            <div className='gor-create-profile'>
                <div className='gor-create-profile-header'>
                    <div className='gor-question gor-align-middle'></div>
                    <span><FormattedMessage id="pps.configuration.confirm.apply.profile"
                                            description="Apply Profile to PPS"
                                            defaultMessage="Are you sure you want to change the profile?"/></span>
                </div>
                <div className="gor-create-profile-body">
                    <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
                    </div>
                </div>
                <div className='gor-create-profile-action-button'>
                    <button className='gor-cancel-btn' onClick={this.props.removeModal.bind(this)}><FormattedMessage id="pps.configuration.confirm.apply.cancel"
                                                                                                                     description="Cancel apply Profile to PPS"
                                                                                                                     defaultMessage="Cancel"/></button>
                    <button onClick={this.changePPSProfile.bind(this,this.props.pps_id,this.props.profile_name)} className='gor-save-profile-btn'><FormattedMessage id="pps.configuration.confirm.change.profile"
                                                                                                                          description="Change Profile to PPS"
                                                                                                                          defaultMessage="Change"/></button>
                </div>
            </div>
        </div>
    }
}


function mapStateToProps(state, ownProps) {

    return {
        auth_token: state.authLogin.auth_token,
        profileRequestedAt:state.ppsConfiguration.profileRequestedAt|| new Date().getTime()

    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        changePPSProfile: function (data) {
            dispatch(changePPSProfile(data));
        },
    };
}

export  default connect(mapStateToProps, mapDispatchToProps)(ConfirmApplyProfile);