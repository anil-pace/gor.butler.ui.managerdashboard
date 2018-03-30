/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import Tags from './tags'
import Bins from './ppsConfigurationBins'
import PPSList from "./ppsConfigurationList";
import {modal} from 'react-redux-modal'
import CreateProfile from './createPPSProfile'
import {FormattedMessage} from 'react-intl'
import {PPS_STATUS_FCLOSE} from './../../constants/frontEndConstants'
import Spinner from './../../components/spinner/Spinner';
import SaveApplyProfile from './saveApplyProfile'

import {graphql, withApollo, compose} from "react-apollo";
import gql from 'graphql-tag'


class PPSConfiguration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {subscribed: false, currentView: 'tags', ppsList: []}
    }

    componentWillReceiveProps(nextProps) {
        /**
         * As soon as PPS List get updated because of PPS_LIST_QUERY
         * Change the local state
         */
        if (JSON.stringify(this.state.ppsList) !== JSON.stringify(nextProps.ppsList)) {
            this.setState({ppsList: nextProps.ppsList})
        }
    }


    /**
     * Change the current View
     * Tags/Bins/Groups
     * @param currentView
     */
    handleClickOnNavigation(currentView) {

        this.setState({currentView: currentView})
    }

    handleClickOnNext() {
        if (this.state.currentView === "tags") {
            this.setState({currentView: 'bins'})
        } else if (this.state.currentView === 'bins') {
            this.setState({currentView: 'groups'})
        } else {
            // Do Nothing
        }
    }

    /**
     * Change the current view to
     * previously selected value
     */
    handleClickOnBack() {
        if (this.state.currentView === "groups") {
            this.setState({currentView: 'bins'})
        } else if (this.state.currentView === 'bins') {
            this.setState({currentView: 'tags'})
        } else {
            // Do Nothing
        }
    }

    /**
     * The method will send the
     * api call to save the profile
     * @param profileName
     */
    saveNewProfile(profileName) {
        let newProfile = JSON.parse(JSON.stringify(this.props.selectedProfile))
        newProfile.name = profileName

    }

    /**
     * Will open the Create Profile
     * Modal.
     */
    createProfile() {
        let self = this
        modal.add(CreateProfile, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true, // (optional) if you don't wanna show the top right close button
            saveNewProfile: self.saveNewProfile.bind(self),
            selectedProfile: self.props.selectedProfile,
            selectedPPS: self.props.selectedPPS,
            createNewPPSProfile: self.createNewPPSProfile.bind(self)
        });
    }


    /**
     * Will call the API to create profile.
     * @param form_data
     * @returns {Promise|Promise.<TResult>|Function|any}
     */
    createNewPPSProfile(form_data) {
        let self = this
        this.formatData(form_data)
        return this.props.createPPSProfile(form_data).then(function (results, b, c) {
            return self.props.setPPSProfileCreated({profile: results.data.createPPSProfile})
        })
    }


    /**
     * The method will send the selected PPS
     * along with the updated profile to the server.
     */
    cancelProfileChanges() {
        this.props.cancelProfileChanges({})
    }


    /**
     * Will remove the extra keys from
     * the payload.
     * @param obj
     */
    formatData(obj) {
        let propToDelete = "__typename"
        let me = this
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] === "object") {
                    this.formatData(obj[property]);
                } else {
                    if (property === propToDelete) {
                        delete obj[property];
                    }
                }
            }
        }
    }


    /**
     * Will Save the existing profile
     */
    saveProfile(applyProfile) {
        /**
         * API to save the existing Profile
         */
        let self = this
        let form_data = JSON.parse(JSON.stringify(this.props.selectedProfile))
        form_data.requested = applyProfile
        form_data.pps_id = this.props.selectedPPS.pps_id
        delete form_data.applied
        this.formatData(form_data)
        return this.props.saveProfile(form_data).then(function (a, b, c) {
            return self.props.setPPSProfileSaved({profile: a.data.savePPSProfile})
        })
    }

    /**
     * The method will open
     * the confirmation modal to
     * save and apply the profile
     * for a given PPS
     */
    saveAndApplyProfileConfirmation() {
        let self = this
        modal.add(SaveApplyProfile, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true, // (optional) if you don't wanna show the top right close button
            saveAndApplyProfile: self.saveProfile.bind(self),
        });
    }

    render() {

        let self = this
        return (
            <div className="pps-configuration-container">
                <Spinner isLoading={self.props.loading}/>
                {self.state.ppsList.length > 0 &&
                <PPSList selectedPPS={self.props.selectedPPS} selectedProfile={self.props.selectedProfile}
                         ppsList={self.state.ppsList}
                         selectPPSProfileForConfiguration={self.props.selectPPSProfileForConfiguration.bind(self)}/>}
                <div className="pps-configuration-details-container">
                    <div className="pps-configuration-navigation-tabs">
                        <div
                            className={['navigation-tab', (this.state.currentView === 'tags' ? 'active' : '')].join(" ")}
                            onClick={this.handleClickOnNavigation.bind(this, 'tags')}><FormattedMessage
                            id="pps.configuration.bins.tags.label"
                            description="Assign tags to bin"
                            defaultMessage="Assign tags to bin"/></div>
                        <div
                            className={['navigation-tab', (this.state.currentView === 'bins' ? 'active' : '')].join(" ")}
                            onClick={this.handleClickOnNavigation.bind(this, 'bins')}><FormattedMessage
                            id="pps.configuration.bins.activation.label"
                            description="Bin activate/deactivate"
                            defaultMessage="Bin activate/deactivate"/></div>
                        <div
                            className={['navigation-tab', (this.state.currentView === 'groups' ? 'active' : '')].join(" ")}
                            onClick={this.handleClickOnNavigation.bind(this, 'groups')}><FormattedMessage
                            id="pps.configuration.group.activation.label"
                            description="Bin group enable/disable"
                            defaultMessage="Bin group enable/disable"/></div>
                        <div className={['seat-description'].join(" ")}><FormattedMessage
                            id="pps.configuration.bins.frontView.label"
                            description="Front View"
                            defaultMessage="Front View"/></div>
                    </div>
                    <Bins selectedPPSBinGroup={this.props.selectedPPSBinGroup}
                          selectedPPSBin={this.props.selectedPPSBin} selectedPPS={this.props.selectedPPS}
                          selectedProfile={this.props.selectedProfile}
                          currentView={this.state.currentView}/> {/* "currentView" will bes used to set the width of bins*/}
                    {this.state.currentView === 'tags' && <Tags selectedPPSBin={this.props.selectedPPSBin}/>}


                </div>
                {this.props.selectedPPS && <div className="pps-configuration-actions-container">
                    <button onClick={self.cancelProfileChanges.bind(self)} className="pps-bin-cancel-button">
                        <FormattedMessage id="pps.configuration.buttons.cancel.text"
                                          description="CANCEL"
                                          defaultMessage="CANCEL"/></button>
                    {this.state.currentView !== "groups" &&
                    <button onClick={self.handleClickOnNext.bind(self)} className="pps-bin-next-button">
                        <FormattedMessage id="pps.configuration.buttons.next.text"
                                          description="NEXT"
                                          defaultMessage="NEXT"/></button>}
                    {this.state.currentView === "groups" &&
                    <button disabled={self.props.selectedPPS.pps_profiles.filter(function (profile) {
                        return profile.requested
                    }).length > 0 || self.props.selectedPPS.pps_status === PPS_STATUS_FCLOSE || self.props.selectedPPS.requested_status === PPS_STATUS_FCLOSE}
                            onClick={self.saveAndApplyProfileConfirmation.bind(self)}
                            className="pps-bin-save-apply-button"><FormattedMessage
                        id="pps.configuration.buttons.saveApply.text"
                        description="SAVE AND APPLY"
                        defaultMessage="SAVE AND APPLY"/></button>}
                    {this.state.currentView !== "tags" &&
                    <button onClick={self.handleClickOnBack.bind(self)} className="pps-bin-back-button">
                        <FormattedMessage id="pps.configuration.buttons.back.text"
                                          description="BACK"
                                          defaultMessage="BACK"/></button>}
                    {this.state.currentView === "groups" &&
                    <button onClick={self.createProfile.bind(self)} className="pps-bin-save-button"><FormattedMessage
                        id="pps.configuration.buttons.saveNewProfile.text"
                        description="SAVE AS NEW PROFILE"
                        defaultMessage="SAVE AS NEW PROFILE"/></button>}
                    {this.state.currentView === "groups" &&
                    <button disabled={self.props.selectedProfile.applied} onClick={self.saveProfile.bind(self, false)}
                            className="pps-bin-save-button"><FormattedMessage id="pps.configuration.buttons.save.text"
                                                                              description="SAVE"
                                                                              defaultMessage="SAVE"/></button>}
                </div>}

            </div>
        );
    }
}

/**
 * Includes the fields/data
 * need to be fetched from the
 * server.
 */
const PPS_LIST_QUERY = gql`
    query PPSList($input: PPSListParams) {
        PPSList(input:$input){
            list {
                pps_id
                pps_mode
                pps_mode_changed_time
                pps_position
                pps_requested_mode
                pps_status
                pps_url
                requested_status
                status
                types_required
                pps_profiles {
                    applied
                    create_time
                    profile_name
                    pps_id
                    requested
                    update_time
                    pps_bin_details {
                        bin_group_id
                        breadth
                        direction
                        enabled
                        length
                        bin_tags
                        pps_bin_id
                        orig_cordinates
                    }
                    bin_group_details{
                        enabled
                        bin_group_id
                    }


                }
                pps_seats {
                    seat_active
                    seat_name
                    seat_type
                    user_name
                }
                pps_bins {
                    create_time
                    pps_bin_id
                    pps_id
                    update_time
                }
            }
        }

    }
`;

/**
 * Will fetch the PPS list data from
 * the server and store it in props
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withQuery = graphql(PPS_LIST_QUERY, {
    props: (data) => ({
        ppsList: data.data.PPSList ? data.data.PPSList.list : []
    }),
    options: ({match, location}) => ({
        variables: {},
        fetchPolicy: 'network-only'
    }),
});

/**
 * Will fetch selectedPPS and  selectedPPSProfile
 * from cache.
 */
const SELECTED_PPS_PROFILE = gql`
    query  ABCD{

        selectedPPS  @client{
            pps_id
            pps_mode
            status
            pps_profiles {
                applied
                create_time
                pps_id
                profile_name
                requested
                update_time
                bin_group_details {
                    bin_group_id
                    enabled

                }
                pps_bin_details {
                    bin_group_id
                    bin_tags
                    breadth
                    direction
                    enabled
                    length
                    orig_cordinates
                    pps_bin_id
                }
            }

        }
        selectedPPSProfile @client{
            applied
            profile_name
            bin_group_details {
                bin_group_id
                enabled

            }
            pps_bin_details {
                bin_group_id
                bin_tags
                breadth
                direction
                enabled
                length
                orig_cordinates
                pps_bin_id
            }

        }
        selectedPPSBin @client{
            bin_group_id
            bin_tags
            breadth
            direction
            enabled
            length
            orig_cordinates
            pps_bin_id
        }

        selectedPPSBinGroup @client{
            bin_group_id
            enabled
        }


    }




`;
/**
 * Will fetch the required data from the cache
 * and store it in props
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withClientData = graphql(SELECTED_PPS_PROFILE, {
    props: function (data) {
        if (!data.data) {
            return {}
        }
        return {
            selectedPPS: data.data.selectedPPS,
            selectedProfile: data.data.selectedPPSProfile,
            selectedPPSBin: data.data.selectedPPSBin,
            selectedPPSBinGroup: data.data.selectedPPSBinGroup || {}
        }
    }
})

/**
 * Will change the selectedProfile in the cache
 */
const SELECT_PPS_PROFILE = gql`
    mutation selectPpsProfile($state: String!) {
        setSelectedProfile(state: $state) @client
    }
`;

/**
 * Will expose a method that will change the selectedProfile
 * in the cache
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withSelectProfileMutations = graphql(SELECT_PPS_PROFILE, {
    props: ({mutate, ownProps}) => ({
        selectPPSProfileForConfiguration: function (state) {
            return mutate({variables: {state: state}})
        },
    }),
});

/**
 * Will set whether to display the spinner
 * or not.
 */
const SET_PPS_SPINNER = gql`
    mutation setPPSSpinner($state: Boolean!) {
        setPPSConfigurationSpinner(state: $state) @client
    }
`;

/**
 * Will expose a method that will handle whether or not
 * the spinner should be displayed.
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withPPSSpinnerMutations = graphql(SET_PPS_SPINNER, {
    props: ({mutate, ownProps}) => ({
        setPPSConfigurationSpinner: function (state) {
            mutate({variables: state})
        },
    }),
});


/**
 * Will expose a mutation to save the
 * selected PPS profile on the server.
 */
const SAVE_PROFILE_MUTATION = gql`
    mutation savePPSProfile($input: PPSProfileInput!) {
        savePPSProfile(input: $input){
            applied
            profile_name
            bin_group_details {
                bin_group_id
                enabled

            }
            pps_bin_details {
                bin_group_id
                bin_tags
                breadth
                direction
                enabled
                length
                orig_cordinates
                pps_bin_id
            }
        }
    }
`;

/**
 * Will expose a method to save the selectedPPSProfile
 * on the server
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const savePPSProfileMutation = graphql(SAVE_PROFILE_MUTATION, {
    props: ({mutate, ownProps}) => ({
        saveProfile: function (input) {
            return mutate({
                variables: {input: input}
            })

        },
    }),
});


/**
 * Will expose a mutation to create a
 * PPS profile on the server.
 */
const CREATE_PROFILE_MUTATION = gql`
    mutation createPPSProfile($input: PPSProfileInput!) {
        createPPSProfile(input: $input){
            applied
            create_time
            pps_id
            profile_name
            requested
            update_time
            bin_group_details {
                bin_group_id
                enabled

            }
            pps_bin_details {
                bin_group_id
                bin_tags
                breadth
                direction
                enabled
                length
                orig_cordinates
                pps_bin_id
            }
        }
    }
`;


/**
 * Will expose a method to create a PPS Profile in
 * the server.
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const createPPSProfileMutation = graphql(CREATE_PROFILE_MUTATION, {
    props: ({mutate, ownProps}) => ({
        createPPSProfile: function (input) {
            return mutate({
                variables: {input: input}
            })

        },
    }),
});


/**
 * Will update the pps profile in the cache
 */
const SET_PPS_PROFILE_SAVED_MUTATION = gql`
    mutation setPPSProfileSaved($state: String!) {
        ppsProfileSavedMutation(state: $state) @client
    }
`;

/**
 * Will update the PPS profile in the cache
 * and refresh the PPS list for updated data.
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withPPSProfileSavedMutations = graphql(SET_PPS_PROFILE_SAVED_MUTATION, {
    props: ({mutate, ownProps}) => ({
        setPPSProfileSaved: function (state) {
            return mutate({
                variables: {state: state},
                refetchQueries: [{query: PPS_LIST_QUERY}]
            })
        },
    }),
});

/**
 * Will save the created PPS Profile
 * in the cache
 */
const SET_PPS_PROFILE_CREATED_MUTATION = gql`
    mutation setPPSProfileCreated($state: String!) {
        ppsProfileCreatedMutation(state: $state) @client
    }
`;

/**
 * Will save the created PPS Profile in the cache and refresh
 * the PPS list for updated data.
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withPPSProfileCreatedMutations = graphql(SET_PPS_PROFILE_CREATED_MUTATION, {
    props: ({mutate, ownProps}) => ({
        setPPSProfileCreated: function (state) {
            return mutate({
                variables: {state: state},
                refetchQueries: [{query: PPS_LIST_QUERY}]
            })
        },
    }),
});

/**
 *
 * Will revert the changed profile
 */
const CANCEL_PROFILE_CHANGES_MUTATION = gql`
    mutation cancelPPSProfileChanges($state: String!) {
        cancelPPSProfileChanges(state: $state) @client
    }
`;

/**
 * Will expose a method to revert unsaved profile changes.
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withCancelPPSProfileMutations = graphql(CANCEL_PROFILE_CHANGES_MUTATION, {
    props: ({mutate, ownProps}) => ({
        cancelProfileChanges: function (state) {
            mutate({
                variables: {state: state}
            })
        },
    }),
});


export default compose(
    withQuery,
    withClientData,
    withPPSProfileCreatedMutations,
    withSelectProfileMutations,
    withPPSSpinnerMutations,
    savePPSProfileMutation,
    withPPSProfileSavedMutations,
    withCancelPPSProfileMutations,
    createPPSProfileMutation)(PPSConfiguration);


