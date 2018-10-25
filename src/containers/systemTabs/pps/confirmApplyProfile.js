/**
 * Created by gaurav.m on 7/26/17.
 */
import React from 'react'

import {FormattedMessage} from 'react-intl'
class ConfirmApplyProfile extends React.Component {
 

    render() {
        return <div>
            <div className='gor-create-profile'>
                <div className='gor-create-profile-header'>
                    <div className='gor-question gor-align-middle'></div>
                    <div><span><FormattedMessage id="pps.configuration.confirm.apply.profile"
                                                 description="Apply Profile to PPS"
                                                 defaultMessage="Are you sure you want to change the profile?"/></span>
                        <span className="gor-create-profile-header-description"><span><FormattedMessage id="pps.configuration.confirm.apply.profile.description"
                                                                                                        description="PPS Configuration will be changed"
                                                                                                        defaultMessage="PPS Configuration will be changed"/></span></span></div>


                </div>
                <div className="gor-create-profile-body">
                    <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
                    </div>
                </div>
                <div className='gor-create-profile-action-button'>
                    <button className='gor-cancel-btn' onClick={this.props.removeModal.bind(this)}><FormattedMessage id="pps.configuration.confirm.apply.cancel"
                                                                                                                     description="Cancel apply Profile to PPS"
                                                                                                                     defaultMessage="Cancel"/></button>
                    <button onClick={()=>{this.props.changePPSProfile(this.props.pps_id,this.props.profile_name);this.props.removeModal()}} className='gor-save-profile-btn'><FormattedMessage id="pps.configuration.confirm.change.profile"
                                                                                                                          description="Change Profile to PPS"
                                                                                                                          defaultMessage="Change"/></button>
                </div>
            </div>
        </div>
    }
}



export  default ConfirmApplyProfile