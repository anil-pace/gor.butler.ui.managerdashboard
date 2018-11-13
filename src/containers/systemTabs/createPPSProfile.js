/**
 * Created by gaurav.m on 7/14/17.
 */
import React from 'react'
import {FormattedMessage} from 'react-intl'

class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {profileName: ''}
    }

    handleChangeInProfileName(e) {
        if (e.target) {
            this.setState({profileName: (e.target.value || "")})
            if (!e.target.value || this.props.selectedPPS.pps_profiles.filter(function (profile) {
                    return profile.profile_name === e.target.value
                }).length > 0) {
                /**
                 * Only unique profile names will be
                 * allowed to enter.
                 */
                this.setState({isValidProfileName: false})
            } else {
                this.setState({isValidProfileName: true})
            }
        }

    }

    createNewPPSProfile() {
        /**
         * API to create new profile
         */
        let self=this
        let form_data = JSON.parse(JSON.stringify(this.props.selectedProfile))
        form_data.profile_name = this.state.profileName
        form_data.pps_id = this.props.selectedPPS.pps_id
        /**
         * While creating a new profile
         * we don't need applied and
         * requested properties, so deleting it.
         */
        delete form_data.applied
        delete form_data.requested
        this.props.createNewPPSProfile(form_data).then(function () {
            self.props.removeModal()
        })
    }

    render() {
        return <div>
            <div className='gor-create-profile'>
                <div className='gor-create-profile-header'>
                    <div className='gor-question gor-align-middle'></div>
                    <span><FormattedMessage id="pps.configuration.create.profile.header"
                                            description="Save a new profile"
                                            defaultMessage="Save a new profile"/></span>
                </div>
                <div className="gor-create-profile-body">
                    <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
                        <div className="gor-filter-input-text"><FormattedMessage
                            id="pps.configuration.create.profile.name.label"
                            description="New Profile Name"
                            defaultMessage="New Profile Name"/></div>
                        <input onChange={this.handleChangeInProfileName.bind(this)} value={this.state.profileName}
                               id="create-profile-name" name="create-profile-name" className="gor-filter-input-wrap"
                               type="text"/>
                    </div>
                </div>
                <div className='gor-create-profile-action-button'>
                    <button className='gor-cancel-btn' onClick={this.props.removeModal.bind(this)}><FormattedMessage
                        id="pps.configuration.create.profile.cancel"
                        description="Cancel"
                        defaultMessage="Cancel"/></button>
                    <button disabled={!this.state.isValidProfileName} onClick={this.createNewPPSProfile.bind(this)}
                            className='gor-save-profile-btn'><FormattedMessage
                        id="pps.configuration.create.profile.button.text"
                        description="Save A New Profile"
                        defaultMessage="Save A New Profile"/></button>
                </div>
            </div>
        </div>
    }
}



export  default (CreateProfile);