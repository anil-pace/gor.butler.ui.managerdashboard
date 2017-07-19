/**
 * Created by gaurav.m on 7/14/17.
 */
import React from 'react'
import {connect} from 'react-redux'
import {createNewPPSProfile} from './../../actions/ppsConfigurationActions'
class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state={profileName:''}
    }

    handleChangeInProfileName(e){
        if(e.target){
            this.setState({profileName:(e.target.value||"")})
        }
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
                    <button onClick={this.createNewPPSProfile.bind(this)} className='gor-save-profile-btn'>Save a new profile</button>
                </div>
            </div>
        </div>
    }
}


function mapStateToProps(state, ownProps) {

    return {
        selectedProfile: state.ppsConfiguration.selectedProfile,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        createNewPPSProfile: function (data) {
            dispatch(createNewPPSProfile(data));
        },
    };
}

export  default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);