/**
 * Created by gaurav.m on 7/14/17.
 */
import React from 'react'
import {connect} from 'react-redux'
import {cancelProfileChanges} from './../../actions/ppsConfigurationActions'
import {SAVE_PROFILE_URL} from './../../constants/configConstants'
import {POST,CREATE_NEW_PROFILE,APP_JSON} from './../../constants/frontEndConstants'
import {FormattedMessage} from 'react-intl'
import {makeAjaxCall} from './../../actions/ajaxActions'
class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state={profileName:''}
    }

    handleChangeInProfileName(e){
        if(e.target){
            this.setState({profileName:(e.target.value||"")})
            if(!e.target.value || this.props.selectedPPS.pps_profiles.filter(function (profile) {
                    return profile.profile_name===e.target.value
                }).length>0){
                /**
                 * Only unique profile names will be
                 * allowed to enter.
                 */
                this.setState({isValidProfileName:false})
            }else{
                this.setState({isValidProfileName:true})
            }
        }

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.profileCreatedAt!==this.props.profileCreatedAt){
            this.props.removeModal()
        }
    }

    createNewPPSProfile(){
        /**
         * API to create new profile
         */
        let form_data=JSON.parse(JSON.stringify(this.props.selectedProfile))
        form_data.profile_name=this.state.profileName
        /**
         * While creating a new profile
         * we don't need applied and
         * requested properties, so deleting it.
         */
        delete form_data.applied
        delete form_data.requested
        let url=SAVE_PROFILE_URL+this.props.selectedPPS.pps_id
        let data={
            'url': url,
            'formdata':form_data ,
            'method': POST,
            'cause': CREATE_NEW_PROFILE,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'token': this.props.auth_token
        }
        this.props.makeAjaxCall(data)
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
                    <div style={{display:'table-cell',verticalAlign:'middle'}}>
                    <div className="gor-filter-input-text"><FormattedMessage id="pps.configuration.create.profile.name.label"
                                                                             description="New Profile Name"
                                                                             defaultMessage="New Profile Name"/></div>
                    <input onChange={this.handleChangeInProfileName.bind(this)} value={this.state.profileName} id="create-profile-name" name="create-profile-name" className="gor-filter-input-wrap" type="text"/>
                    </div>
                </div>
                <div className='gor-create-profile-action-button'>
                    <button className='gor-cancel-btn' onClick={this.props.removeModal.bind(this)}><FormattedMessage id="pps.configuration.create.profile.cancel"
                                                                                                                     description="Cancel"
                                                                                                                     defaultMessage="Cancel"/></button>
                    <button disabled={!this.state.isValidProfileName} onClick={this.createNewPPSProfile.bind(this)} className='gor-save-profile-btn'><FormattedMessage id="pps.configuration.create.profile.button.text"
                                                                                                                                                                       description="Save A New Profile"
                                                                                                                                                                       defaultMessage="Save A New Profile"/></button>
                </div>
            </div>
        </div>
    }
}


function mapStateToProps(state, ownProps) {

    return {
        selectedProfile: state.ppsConfiguration.selectedProfile,
        auth_token:state.authLogin.auth_token,
        profileCreatedAt:state.ppsConfiguration.profileCreatedAt,
        selectedPPS:state.ppsConfiguration.selectedPPS
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        makeAjaxCall: function (data) {
            dispatch(makeAjaxCall(data));
        },
        cancelProfileChanges: function (data) {
            dispatch(cancelProfileChanges(data));
        },
    };
}

export  default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);