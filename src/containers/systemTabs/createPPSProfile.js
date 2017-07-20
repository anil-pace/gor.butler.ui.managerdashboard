/**
 * Created by gaurav.m on 7/14/17.
 */
import React from 'react'
import {connect} from 'react-redux'
import {createNewPPSProfile,cancelProfileChanges} from './../../actions/ppsConfigurationActions'
import {CREATE_PROFILE_URL} from './../../constants/configConstants'
import {POST,CREATE_NEW_PROFILE,APP_JSON} from './../../constants/frontEndConstants'
class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state={profileName:''}
    }

    handleChangeInProfileName(e){
        if(e.target){
            this.setState({profileName:(e.target.value||"")})
            if(!e.target.value || this.props.selectedPPS.profiles.filter(function (profile) {
                    return profile.name===e.target.value
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
        form_data.name=this.state.profileName
        let data={
            'url': CREATE_PROFILE_URL,
            'formdata':form_data ,
            'method': POST,
            'cause': CREATE_NEW_PROFILE,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'token': this.props.auth_token
        }
        this.props.createNewPPSProfile(data)
    }

    render() {
        return <div>
            <div className='gor-create-profile'>
                <div className='gor-create-profile-header'>
                    <div className='gor-question gor-align-middle'></div>
                    <span>Save a new profile</span>
                </div>
                <div className="gor-create-profile-body">
                    <div style={{display:'table-cell',verticalAlign:'middle'}}>
                    <div className="gor-filter-input-text">New Profile Name</div>
                    <input onChange={this.handleChangeInProfileName.bind(this)} value={this.state.profileName} id="create-profile-name" name="create-profile-name" className="gor-filter-input-wrap" type="text"/>
                    </div>
                </div>
                <div className='gor-create-profile-action-button'>
                    <button className='gor-cancel-btn' onClick={this.props.removeModal.bind(this)}>Cancel</button>
                    <button disabled={!this.state.isValidProfileName} onClick={this.createNewPPSProfile.bind(this)} className='gor-save-profile-btn'>Save a new profile</button>
                </div>
            </div>
        </div>
    }
}


function mapStateToProps(state, ownProps) {

    return {
        selectedProfile: state.ppsConfiguration.selectedProfile,
        auth_token:state.authLogin.auth_token,
        profileCreatedAt:state.ppsConfiguration.profileCreatedAt|| new Date().getTime(),
        selectedPPS:state.ppsConfiguration.selectedPPS
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        createNewPPSProfile: function (data) {
            dispatch(createNewPPSProfile(data));
        },
        cancelProfileChanges: function (data) {
            dispatch(cancelProfileChanges(data));
        },
    };
}

export  default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);