/**
 * Created by gaurav.m on 6/22/17.
 */
/**
 * Created by gaurav.m on 6/21/17.
 */
import React from 'react';
import { FormattedMessage } from 'react-intl'

import { graphql, withApollo, compose } from "react-apollo";
import gql from 'graphql-tag'
import { PPS_BIN_DIRECTION } from '../../constants/appConstants';

class Bins extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

    }


    componentWillReceiveProps(nextProps) {
        
        if (nextProps.selectedProfile && (!this.props.selectedProfile || nextProps.selectedProfile.profile_name !== this.props.selectedProfile.profile_name || nextProps.selectedPPS.pps_id !== this.props.selectedPPS.pps_id)) {
            /**
             * Profile changed from left hand side pane
             */

            if (nextProps.selectedProfile && nextProps.selectedProfile.pps_bin_details.filter(function (bin) {
                return !PPS_BIN_DIRECTION.includes(bin.direction)   
            }).length !== 0 && !this.state.currentBinDirection) {
                this.setBinDirection('left')
            } else if (this.state.currentBinDirection && nextProps.selectedProfile && nextProps.selectedProfile.pps_bin_details.filter(function (bin) {
                return !PPS_BIN_DIRECTION.includes(bin.direction)  
            }).length !== 0) {
                this.setBinDirection(this.state.currentBinDirection)
            } else {
                this.setBinDirection()
            }
        }


    }

    /**
     * The method will select the bin to
     * add/remove tags
     * @param bin
     */
    selectBin(bin, currentView) {
        this.props.selectPPSBin({ bin, currentView })


    }

    /**
     * The method will unselect the PPS Bin
     * @param bin
     * @param currentView
     */
    clearSelectionPPSBin(bin, currentView) {
        this.props.clearSelectionPPSBin({ bin, currentView })
    }

    /**
     * The method will toggle the
     * PPS Bin enable disable status
     */
    changePPSBinStatus(bin, status) {
        this.props.changePPSBinStatus({ bin, currentView: 'bins', enabled: status })
    }


    /**
     * The method will update the status of selected group
     * @param status
     */
    changePPSBinGroupStatus(status) {
        this.props.changePPSBinGroupStatus({ enabled: status })
    }

    /**
     * The method will select the pps bin group
     * that would lead to highlighten the
     * selected group
     * @param bin_group_id
     */
    selectPPSBinGroup(bin_group_id) {
        let group = this.props.selectedProfile.bin_group_details.filter(function (group) {
            return group.bin_group_id === bin_group_id
        })[0]
        if (this.props.selectedPPSBinGroup && this.props.selectedPPSBinGroup.bin_group_id === bin_group_id) {
            group = null
        }
        this.props.selectPPSBinGroup({ group: group })
    }

    /**
     * The method would check whether
     * a particular group is disabled or not.
     * @param bin_group_id
     * @returns {boolean}
     */
    isDisabledGroup(bin_group_id) {
        let groups = this.props.selectedProfile.bin_group_details.filter(function (bin) {
            return bin.bin_group_id === bin_group_id
        })
        if (groups.length > 0 && !groups[0].enabled) {
            return true
        }
        return false
    }

    /**
     * Displays the bins for
     * a particular direction i.e, left/center/right
     * @param dir
     */
    setBinDirection(dir) {
        this.clearSelectionPPSBin({ bin: this.props.selectedPPSBin, currentView: this.props.currentView })
        this.setState({ currentBinDirection: dir || null })
    }

    render() {
        /**
         * As soon as PPS selection or the profile
         * selection get changed.
         * Re-render the PPS Bins
         */
        let self = this
        if (!self.props.selectedPPS) {
            return false
        }
        /**
         * Finding the sorted array of x and y co-ordinates
         */

        let x_array = self.props.selectedProfile.pps_bin_details.filter(function (bin) {
            return (!self.state.currentBinDirection || bin.direction === self.state.currentBinDirection)
        }).map(function (bin) {
            return bin.orig_cordinates ? bin.orig_cordinates[0] + bin.length : 0
        }).sort(function (a, b) {
            return a - b
        });
        let y_array = self.props.selectedProfile.pps_bin_details.filter(function (bin) {
            return (!self.state.currentBinDirection || bin.direction === self.state.currentBinDirection)
        }).map(function (bin) {
            return bin.orig_cordinates ? bin.orig_cordinates[1] + bin.height : 0
        }).sort(function (a, b) {
            return a - b
        });

        /**
         * Finding the maximum of x and y co-ordinate to calculate boundaries
         */
        let max_x = x_array[x_array.length - 1]
        let max_y = y_array[y_array.length - 1]

        /**
         *Total virtual width of the container will include the padding with each bin
         * so calculating the total width by considering a set of x distinct co-ordinates.
         */

        let total_x = new Set(x_array).size * 10 + max_x
        let total_y = new Set(y_array).size * 10 + max_y
        let container = { x: 900, y: 500 } //Container is 900*500

        return <div
            className={["pps-bins-container", this.props.currentView === 'tags' ? 'include-tags' : null].join(" ")}>
            {this.props.currentView === 'tags' &&
                <div style={{ padding: '2% 4%', color: '#666', overflow: 'auto', clear: 'both' }}>
                    <div style={{ width: '65%', float: 'left' }}>
                        <FormattedMessage id="pps.configuration.bins.selection.label"
                            description="Select a bin to manage tags"
                            defaultMessage="Select a bin to manage tags" />
                    </div>
                    {self.state.currentBinDirection && <div style={{ width: '35%', 'float': 'right', fontSize: 14 }}>
                        <span style={{ padding: '5px 10px', color: "#666" }}><FormattedMessage
                            id="pps.configuration.bins.direction.label"
                            description="Bin Direction"
                            defaultMessage="Current PPS Selection" /></span>
                        <span className="currentBinDirection"
                            style={{ padding: '5px 10px', border: '1px solid #ccc', borderRadius: 20 }}>
                            <span className={self.state.currentBinDirection === 'left' ? 'active' : null}
                                onClick={self.setBinDirection.bind(this, 'left')}
                                style={{ padding: '5px 10px', cursor: 'pointer' }}><FormattedMessage
                                    id="pps.configuration.bins.direction.left"
                                    description="Bin Direction LEFT"
                                    defaultMessage="LEFT" /></span>
                            <span className={self.state.currentBinDirection === 'right' ? 'active' : null}
                                onClick={self.setBinDirection.bind(this, 'right')}
                                style={{ padding: '5px 10px', cursor: 'pointer' }}><FormattedMessage
                                    id="pps.configuration.bins.direction.right"
                                    description="Bin Direction RIGHT"
                                    defaultMessage="RIGHT" /></span>
                        </span>

                    </div>}


                </div>}
            {this.props.currentView === 'bins' &&
                <div style={{ padding: '2% 4%', color: '#666', overflow: 'auto', clear: 'both' }}>
                    <div style={{ width: '65%', float: 'left' }}>
                        <FormattedMessage id="pps.configuration.bins.selection.count"
                            description='total users for filter search bar'
                            defaultMessage='Select a bin to activate or deactivate ({deactivated}/{total} bins deactivated)'
                            values={{
                                deactivated: self.props.selectedProfile.pps_bin_details.filter(function (bin) {
                                    return !bin.enabled
                                }).length.toString(),
                                total: self.props.selectedProfile.pps_bin_details.length
                            }} />
                    </div>


                    {self.state.currentBinDirection && <div style={{ width: '35%', 'float': 'right', fontSize: 14 }}>
                        <span style={{ padding: '5px 10px', color: "#666" }}><FormattedMessage
                            id="pps.configuration.bins.direction.label"
                            description="Bin Direction"
                            defaultMessage="Current PPS Selection" /></span>
                        <span className="currentBinDirection"
                            style={{ padding: '5px 10px', border: '1px solid #ccc', borderRadius: 20 }}>
                            <span className={self.state.currentBinDirection === 'left' ? 'active' : null}
                                onClick={self.setBinDirection.bind(this, 'left')}
                                style={{ padding: '5px 10px', cursor: 'pointer' }}><FormattedMessage
                                    id="pps.configuration.bins.direction.left"
                                    description="Bin Direction LEFT"
                                    defaultMessage="LEFT" /></span>
                            <span className={self.state.currentBinDirection === 'right' ? 'active' : null}
                                onClick={self.setBinDirection.bind(this, 'right')}
                                style={{ padding: '5px 10px', cursor: 'pointer' }}><FormattedMessage
                                    id="pps.configuration.bins.direction.right"
                                    description="Bin Direction RIGHT"
                                    defaultMessage="RIGHT" /></span>
                        </span>

                    </div>}

                </div>}
            {this.props.currentView === 'groups' &&
                <div style={{ padding: '2% 4%', color: '#666', overflow: 'auto', clear: 'both' }}>

                    <div style={{ width: '65%', float: 'left' }}>
                        <FormattedMessage
                            id="pps.configuration.bins.group.selection.count"
                            description='total users for filter search bar'
                            defaultMessage='Select a bin group to activate or deactivate ({disabled}/{total} groups deactivated)'
                            values={{
                                disabled: self.props.selectedProfile.bin_group_details.filter(function (group) {
                                    return !group.enabled
                                }).length.toString(), total: self.props.selectedProfile.bin_group_details.length
                            }} />
                    </div>

                    {self.state.currentBinDirection && <div style={{ width: '35%', 'float': 'right', fontSize: 14 }}>
                        <span style={{ padding: '5px 10px', color: "#666" }}><FormattedMessage
                            id="pps.configuration.bins.direction.label"
                            description="Bin Direction"
                            defaultMessage="Current PPS Selection" /></span>
                        <span className="currentBinDirection"
                            style={{ padding: '5px 10px', border: '1px solid #ccc', borderRadius: 20 }}>
                            <span className={self.state.currentBinDirection === 'left' ? 'active' : null}
                                onClick={self.setBinDirection.bind(this, 'left')}
                                style={{ padding: '5px 10px', cursor: 'pointer' }}><FormattedMessage
                                    id="pps.configuration.bins.direction.left"
                                    description="Bin Direction LEFT"
                                    defaultMessage="LEFT" /></span>
                            <span className={self.state.currentBinDirection === 'right' ? 'active' : null}
                                onClick={self.setBinDirection.bind(this, 'right')}
                                style={{ padding: '5px 10px', cursor: 'pointer' }}><FormattedMessage
                                    id="pps.configuration.bins.direction.right"
                                    description="Bin Direction RIGHT"
                                    defaultMessage="RIGHT" /></span>
                        </span>

                    </div>}


                </div>}
            <div style={{
                width: container.x,
                margin: 'auto',
                height: container.y,
                maxWidth: container.x,
                overflow: 'scroll',
                maxHeight: container.y,
                position: 'relative'
            }}>
                {/*The co-ordinates need to be in proportion to the dimension of*/}
                {/*the container.*/}
                {self.props.selectedProfile.pps_bin_details.filter(function (bin) {
                    return (!self.state.currentBinDirection || bin.direction === self.state.currentBinDirection)
                }).map(function (bin, index) {
                    let bin_id = [self.props.selectedPPS.pps_id, bin.pps_bin_id].join("-")
                    let selected_pps_bin_id = (self.props.selectedPPS && self.props.selectedPPSBin) ? [self.props.selectedPPS.pps_id, self.props.selectedPPSBin.pps_bin_id].join('-') : ''
                    let selected_bin = (self.props.selectedPPSBin && selected_pps_bin_id === bin_id)
                    return <div key={bin.pps_bin_id} style={{
                        display: 'inline-block',
                        position: 'absolute',
                        left: bin.orig_cordinates[0] * container.x / total_x,
                        top: bin.orig_cordinates[1] * container.y / total_y,
                        width: bin.length * container.x / total_x,
                        height: bin.height * container.y / total_y,
                    }}>

                        {self.props.currentView === 'tags' && <div
                            onClick={selected_bin ? self.clearSelectionPPSBin.bind(self, bin, self.props.currentView) : self.selectBin.bind(self, bin, self.props.currentView)}
                            className={[(selected_bin ? 'selected' : null)].join(" ")}
                            key={bin.pps_bin_id}

                            style={{
                                height: '100%',
                                boxSizing: 'border-box',
                                width: '100%',
                                border: '10px solid white',
                            }}>
                            <span className={["pps-bin"].join(" ")}>
                                <span className="pps-bin-tag-info">
                                    <span className="gor-tag-icon-grey" />{bin && bin.bin_tags && bin.bin_tags.length} <FormattedMessage
                                        id="pps.configuration.bins.tagCount.text"
                                        description="Tag"
                                        defaultMessage="Tag" /></span>
                                <span className="pps-bin-info">{bin.pps_bin_id}</span>
                            </span>
                        </div>}

                        {self.props.currentView === 'bins' && <div
                            onClick={selected_bin ? self.clearSelectionPPSBin.bind(self, bin, self.props.currentView) : self.selectBin.bind(self, bin, self.props.currentView)}
                            className={[(selected_bin ? 'selected' : null)].join(" ")}
                            key={bin.pps_bin_id}

                            style={{
                                height: '100%',
                                boxSizing: 'border-box',
                                width: '100%',
                                border: '10px solid white',
                            }}>
                            <span className={["pps-bin", (!bin.enabled ? 'disabled' : '')].join(" ")}>
                                <span className="pps-bin-tag-info">
                                    <span style={{ display: 'inline-block', width: 16, height: 16 }} /> </span>
                                <span className="pps-bin-info">{bin.pps_bin_id}</span>
                            </span>
                        </div>}

                        {self.props.currentView === 'groups' && <div
                            key={bin.pps_bin_id}
                            onClick={self.selectPPSBinGroup.bind(self, bin.bin_group_id)}
                            className={["pps-bin-group", "pps-bin-group-" + bin.bin_group_id, (self.props.selectedPPSBinGroup.bin_group_id === bin.bin_group_id ? 'highlight' : null), self.isDisabledGroup.call(self, bin.bin_group_id) ? 'disabled' : ''].join(" ")}
                            style={{
                                height: '100%',
                                boxSizing: 'border-box',
                                width: '100%',
                            }}>
                            <span className={["pps-bin", (!bin.enabled ? 'disabled' : '')].join(" ")}>
                                <span className="pps-bin-tag-info">
                                    <span style={{ display: 'inline-block', width: 16, height: 16 }} /> </span>
                                <span className="pps-bin-info">{bin.pps_bin_id}</span>
                            </span>
                        </div>}
                    </div>
                })}
            </div>

            {/*Bin enable/disable action items*/}
            {self.props.currentView === 'bins' &&
                <div className="pps-bin-actions pps-bin-row" style={{ textAlign: 'center' }}>
                    {self.props.selectedPPSBin ? (
                        <button
                            disabled={self.props.selectedPPSBin.enabled}
                            className="pps-bin-action-button"
                            onClick={self.changePPSBinStatus.bind(self, self.props.selectedPPSBin, true)}>
                            <FormattedMessage id="pps.configuration.bins.activation.button.text"
                                description="ACTIVATE"
                                defaultMessage="ACTIVATE" />
                        </button>) : (<button
                            disabled={true}
                            className="pps-bin-action-button">
                            <FormattedMessage id="pps.configuration.bins.activation.button.text"
                                description="ACTIVATE"
                                defaultMessage="ACTIVATE" />
                        </button>)}

                    {self.props.currentView === 'bins' && self.props.selectedPPSBin ? (
                        <button
                            disabled={!self.props.selectedPPSBin.enabled}
                            className="pps-bin-action-button"
                            onClick={self.changePPSBinStatus.bind(self, self.props.selectedPPSBin, false)}>
                            <FormattedMessage id="pps.configuration.bins.deactivation.button.text"
                                description="DEACTIVATE"
                                defaultMessage="DEACTIVATE" />
                        </button>) : (<button disabled={true}
                            className="pps-bin-action-button">
                            <FormattedMessage id="pps.configuration.bins.deactivation.button.text"
                                description="DEACTIVATE"
                                defaultMessage="DEACTIVATE" />
                        </button>)}
                </div>}

            {/*Bin enable/disable action items*/}
            {self.props.currentView === 'groups' &&
                <div className="pps-bin-actions pps-bin-row" style={{ textAlign: 'center' }}>
                    {self.props.selectedPPSBinGroup.bin_group_id ? (
                        <button
                            disabled={self.props.selectedPPSBinGroup.enabled}
                            className="pps-bin-action-button"
                            onClick={self.changePPSBinGroupStatus.bind(self, true)}>
                            <FormattedMessage id="pps.configuration.bins.group.enable.button.text"
                                description="ENABLE"
                                defaultMessage="ENABLE" />
                        </button>) : (<button
                            disabled={true}
                            className="pps-bin-action-button">
                            <FormattedMessage id="pps.configuration.bins.group.enable.button.text"
                                description="ENABLE"
                                defaultMessage="ENABLE" />
                        </button>)}

                    {self.props.selectedPPSBinGroup.bin_group_id ? (
                        <button
                            disabled={!self.props.selectedPPSBinGroup.enabled}
                            className="pps-bin-action-button"
                            onClick={self.changePPSBinGroupStatus.bind(self, false)}>
                            <FormattedMessage id="pps.configuration.bins.group.disable.button.text"
                                description="DISABLE"
                                defaultMessage="DISABLE" />
                        </button>) : (<button disabled={true}
                            className="pps-bin-action-button">
                            <FormattedMessage id="pps.configuration.bins.group.disable.button.text"
                                description="DISABLE"
                                defaultMessage="DISABLE" />
                        </button>)}
                </div>}


        </div>
    }
}

/**
 * Mutation to save selectedPPSBin in cache
 */
const SELECT_PPS_BIN = gql`
    mutation setSelectedBin($state: String!) {
        setSelectedBin(state: $state) @client
    }
`;


/**
 * Will expose a method to save selectedPPSBin in cache
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withSelectPPSBinMutation = graphql(SELECT_PPS_BIN, {
    props: ({ mutate, ownProps }) => ({
        selectPPSBin: function (state) {
            mutate({ variables: { state: state } })
        }
    }),
});

/**
 * Mutation to save selectedPPSBinGroup in cache
 */
const SELECT_PPS_BIN_GROUP = gql`
    mutation setSelectedBinGroup($state: String!) {
        setSelectedBinGroup(state: $state) @client
    }
`;

/**
 * Will expose a method to save selectedPPSBinGroup in cache
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withSelectPPSBinGroupMutation = graphql(SELECT_PPS_BIN_GROUP, {
    props: ({ mutate, ownProps }) => ({
        selectPPSBinGroup: function (state) {
            mutate({ variables: { state: state } })
        }
    }),
});

/**
 * Mutation to clear the selectedPPSBin from cache
 */
const CLEAR_PPS_BIN_SELECTION = gql`
    mutation setSelectedBin($state: String!) {
        setClearSelectedBin(state: $state) @client
    }
`;
/**
 * Will expose a method to clear the selectedPPSBin from cache.
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withClearPPSBinSelection = graphql(CLEAR_PPS_BIN_SELECTION, {
    props: ({ mutate, ownProps }) => ({
        clearSelectionPPSBin: function (state) {
            mutate({ variables: { state: state } })
        },
    }),
});

/**
 * Mutation to change the Bin status
 */
const CHANGE_PPS_BIN_STATUS = gql`
    mutation changePPSBinStatus($state: String!) {
        setPPSBinStatus(state: $state) @client
    }
`;
/**
 * Will expose a method to change the PPS Bin Status in cache.
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withPPSBinStatusMutation = graphql(CHANGE_PPS_BIN_STATUS, {
    props: ({ mutate, ownProps }) => ({
        changePPSBinStatus: function (state) {
            mutate({ variables: { state: state } })
        },
    }),
});

/**
 * Mutation to change PPS Bin Group Status in cache.
 */
const CHANGE_PPS_BIN_GROUP_STATUS = gql`
    mutation changePPSBinGroupStatus($state: String!) {
        setPPSBinGroupStatus(state: $state) @client
    }
`;
/**
 * Will expose a method to change the PPS Bin Group Status in cache.
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withPPSBinGroupStatusMutation = graphql(CHANGE_PPS_BIN_GROUP_STATUS, {
    props: ({ mutate, ownProps }) => ({
        changePPSBinGroupStatus: function (state) {
            mutate({ variables: { state: state } })
        },
    }),
});

export default compose(
    withSelectPPSBinMutation,
    withSelectPPSBinGroupMutation,
    withClearPPSBinSelection,
    withPPSBinStatusMutation,
    withPPSBinGroupStatusMutation)(Bins)

