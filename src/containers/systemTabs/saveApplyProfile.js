/**
 * Created by gaurav.m on 7/26/17.
 */
/**
 * Created by gaurav.m on 7/26/17.
 */
import React from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
class SaveApplyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    saveAndApplyProfile(pps_id, profile_name) {
        this.props.saveAndApplyProfile(true)
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
                    <div><span><FormattedMessage id="pps.configuration.confirm.saveAndapply.profile"
                                                                        description="Save and ppply Profile to PPS"
                                                                        defaultMessage="Are you sure you want to save and apply the profile?"/></span>
                        <span className="gor-create-profile-header-description"><span><FormattedMessage id="pps.configuration.confirm.saveAndapply.profile.description"
                                                                                                        description="Profile will be applied after pending tasks are completed"
                                                                                                        defaultMessage="Profile will be applied after pending tasks are completed"/></span></span></div>


                </div>
                <div className="gor-create-profile-body">
                    <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
                    </div>
                </div>
                <div className='gor-create-profile-action-button'>
                    <button className='gor-cancel-btn' onClick={this.props.removeModal.bind(this)}><FormattedMessage id="pps.configuration.confirm.apply.cancel"
                                                                                                                     description="Cancel apply Profile to PPS"
                                                                                                                     defaultMessage="Cancel"/></button>
                    <button onClick={this.saveAndApplyProfile.bind(this,this.props.pps_id,this.props.profile_name)} className='gor-save-profile-btn'><FormattedMessage id="pps.configuration.confirm.saveAndApply.profile"
                                                                                                                                                                    description="Save and Apply Profile to PPS"
                                                                                                                                                                    defaultMessage="SAVE AND APPLY"/></button>
                </div>
            </div>
        </div>
    }
}


function mapStateToProps(state, ownProps) {

    return {
        profileRequestedAt:state.ppsConfiguration.profileRequestedAt

    };
}

export  default connect(mapStateToProps, null)(SaveApplyProfile);