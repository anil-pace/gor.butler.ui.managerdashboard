/**
 * Created by gaurav.m on 6/22/17.
 */
/**
 * Created by gaurav.m on 6/21/17.
 */
import React  from 'react';
import {connect} from 'react-redux'
import {
    selectPPSBin,
    clearSelectionPPSBin,
    changePPSBinStatus,
    cancelProfileChanges,changePPSBinGroupStatus,selectPPSBinGroup
} from './../../actions/ppsConfigurationActions'
import Bin from './../../components/bin/bin'

class Bins extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

    }

    /**
     * The method will select the bin to
     * add/remove tags
     * @param bin
     */
    selectBin(bin, currentView) {
        this.props.selectPPSBin({bin, currentView})


    }

    /**
     * The method will unselect the PPS Bin
     * @param bin
     * @param currentView
     */
    clearSelectionPPSBin(bin, currentView) {
        this.props.clearSelectionPPSBin({bin, currentView})
    }

    /**
     * The method will toggle the
     * PPS Bin enable disable status
     */
    changePPSBinStatus(bin, status) {
        this.props.changePPSBinStatus({bin, currentView: 'bins', enabled: status})
    }


    /**
     * The method will update the status of selected group
     * @param status
     */
    changePPSBinGroupStatus(status){
        this.props.changePPSBinGroupStatus({enabled: status})
    }

    /**
     * The method will select the pps bin group
     * that would lead to highlighten the
     * selected group
     * @param bin_group_id
     */
    selectPPSBinGroup(bin_group_id){
        let group=this.props.selectedProfile.bin_group_details.filter(function(group){
            return group.bin_group_id===bin_group_id
        })[0]
        if(this.props.selectedPPSBinGroup && this.props.selectedPPSBinGroup.bin_group_id===bin_group_id){
            group=null
        }
       this.props.selectPPSBinGroup({group:group})
    }

    /**
     * The method would check whether
     * a particular group is disabled or not.
     * @param bin_group_id
     * @returns {boolean}
     */
    isDisabledGroup(bin_group_id){
        let groups=this.props.selectedProfile.bin_group_details.filter(function(bin){
            return bin.bin_group_id===bin_group_id
        })
        if(groups.length>0 && !groups[0].enabled){
            return true
        }
        return false
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

        let x_array = self.props.selectedProfile.pps_bins.map(function (bin) {
            return bin.orig_cordinates ? bin.orig_cordinates[0] + bin.breadth : 0
        }).sort(function (a, b) {
            return a - b
        });
        let y_array = self.props.selectedProfile.pps_bins.map(function (bin) {
            return bin.orig_cordinates ? bin.orig_cordinates[1] + bin.length : 0
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
        let container={x:900,y:500} //Container is 900*500

        return <div
            className={["pps-bins-container", this.props.currentView === 'tags' ? 'include-tags' : null].join(" ")}>
            {this.props.currentView === 'tags' && <div style={{padding:'2% 4%',color:'#ccc'}}>Select a bin to manage tags</div>}
            {this.props.currentView === 'bins' && <div style={{padding:'2% 4%',color:'#ccc'}}>Select a bin to activate or deactivate ({self.props.selectedProfile.pps_bins.filter(function(bin){return !bin.enabled}).length}/{self.props.selectedProfile.pps_bins.length} bins deactivated) </div>}
            {this.props.currentView === 'groups' && <div style={{padding:'2% 4%',color:'#ccc'}}>Select a bin group to enable or disable ({self.props.selectedProfile.pps_bins.filter(function(bin){return !bin.enabled}).length}/{self.props.selectedProfile.pps_bins.length} bins deactivated) </div>}
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
                {self.props.selectedProfile.pps_bins.map(function (bin, index) {
                    let bin_id = [self.props.selectedPPS.pps_id, bin.pps_bin_id].join("-")
                    let selected_bin = (self.props.selectedPPSBin && self.props.selectedPPSBin[self.props.currentView] && self.props.selectedPPSBin[self.props.currentView].id === bin_id)
                    return <div key={bin.pps_bin_id} style={{
                        display: 'inline-block',
                        position: 'absolute',
                        left: bin.orig_cordinates[0] * container.x / total_x,
                        top: bin.orig_cordinates[1] * container.y / total_y,
                        width: bin.breadth * container.x / total_x,
                        height: bin.length * container.y / total_y,
                    }}>

                        {self.props.currentView === 'tags' && <div
                            onClick={selected_bin ? self.clearSelectionPPSBin.bind(self, bin, self.props.currentView) : self.selectBin.bind(self, bin, self.props.currentView)}
                            className={[( selected_bin ? 'selected' : null)].join(" ")}
                            key={bin.pps_bin_id}

                            style={{
                                height: '100%',
                                boxSizing: 'border-box',
                                width: '100%',
                                border: '10px solid white',
                            }}>
                            <span className={["pps-bin"].join(" ")}>
                                <span className="pps-bin-tag-info">
                                    <span className="gor-tag-icon-grey"/>1 Tag</span>
                                <span className="pps-bin-info">{bin_id}</span>
                            </span>
                        </div>}

                        {self.props.currentView === 'bins' && <div
                            onClick={selected_bin ? self.clearSelectionPPSBin.bind(self, bin, self.props.currentView) : self.selectBin.bind(self, bin, self.props.currentView)}
                            className={[( selected_bin ? 'selected' : null)].join(" ")}
                            key={bin.pps_bin_id}

                            style={{
                                height: '100%',
                                boxSizing: 'border-box',
                                width: '100%',
                                border: '10px solid white',
                            }}>
                            <span className={["pps-bin",(!bin.enabled?'disabled':'')].join(" ")}>
                                <span className="pps-bin-tag-info">
                                    <span style={{display:'inline-block',width:16,height:16}}/> </span>
                                <span className="pps-bin-info">{bin_id}</span>
                            </span>
                        </div>}

                        {self.props.currentView === 'groups' && <div
                            key={bin.pps_bin_id}
                            onClick={self.selectPPSBinGroup.bind(self,bin.bin_group_id)}
                            className={["pps-bin-group",( self.props.selectedPPSBinGroup.bin_group_id===bin.bin_group_id ? 'highlight' : null),self.isDisabledGroup.call(self,bin.bin_group_id)?'disabled':''].join(" ")}
                            style={{
                                height: '100%',
                                boxSizing: 'border-box',
                                width: '100%',
                            }}>
                            <span className={["pps-bin",(!bin.enabled?'disabled':'')].join(" ")}>
                                <span className="pps-bin-tag-info">
                                    <span style={{display:'inline-block',width:16,height:16}}/> </span>
                                <span className="pps-bin-info">{bin_id}</span>
                            </span>
                        </div>}
                    </div>
                })}
            </div>

            {/*Bin enable/disable action items*/}
            {self.props.currentView === 'bins' &&
            <div className="pps-bin-actions pps-bin-row" style={{textAlign: 'center'}}>
                {self.props.selectedPPSBin && self.props.selectedPPSBin['bins'] ? (
                    <button
                        disabled={self.props.selectedPPSBin['bins'].enabled}
                        className="pps-bin-action-button"
                        onClick={self.changePPSBinStatus.bind(self, self.props.selectedPPSBin['bins'], true)}>
                        ACTIVATE
                    </button> ) : (<button
                    disabled={true}
                    className="pps-bin-action-button">
                    ACTIVATE
                </button>)}

                {self.props.currentView === 'bins' && self.props.selectedPPSBin && self.props.selectedPPSBin['bins'] ? (
                    <button
                        disabled={!self.props.selectedPPSBin['bins'].enabled}
                        className="pps-bin-action-button"
                        onClick={self.changePPSBinStatus.bind(self, self.props.selectedPPSBin['bins'], false)}>
                        DEACTIVATE
                    </button> ) : (<button disabled={true}
                                           className="pps-bin-action-button">
                    DEACTIVATE
                </button>)}
            </div>}

            {/*Bin enable/disable action items*/}
            {self.props.currentView === 'groups' &&
            <div className="pps-bin-actions pps-bin-row" style={{textAlign: 'center'}}>
                {self.props.selectedPPSBinGroup.bin_group_id ? (
                    <button
                        disabled={self.props.selectedPPSBinGroup.enabled}
                        className="pps-bin-action-button"
                        onClick={self.changePPSBinGroupStatus.bind(self,true)}>
                        ENABLE
                    </button> ) : (<button
                    disabled={true}
                    className="pps-bin-action-button">
                    ENABLE
                </button>)}

                {self.props.selectedPPSBinGroup.bin_group_id  ? (
                    <button
                        disabled={!self.props.selectedPPSBinGroup.enabled}
                        className="pps-bin-action-button"
                        onClick={self.changePPSBinGroupStatus.bind(self,false)}>
                        DISABLE
                    </button> ) : (<button disabled={true}
                                           className="pps-bin-action-button">
                    DISABLE
                </button>)}
            </div>}


        </div>
    }
}
function mapStateToProps(state, ownProps) {
    return {
        selectedProfile: state.ppsConfiguration.selectedProfile || {id: null},
        selectedPPS: state.ppsConfiguration.selectedPPS,
        selectedPPSBin: state.ppsConfiguration.selectedPPSBin,
        ppsList: state.ppsConfiguration.ppsList,
        selectedPPSBinGroup:state.ppsConfiguration.selectedPPSBinGroup||{}
    };
}

var mapDispatchToProps = function (dispatch) {
    return {
        selectPPSBin: function (data) {
            dispatch(selectPPSBin(data));
        },
        clearSelectionPPSBin: function (data) {
            dispatch(clearSelectionPPSBin(data));
        },
        changePPSBinStatus: function (data) {
            dispatch(changePPSBinStatus(data));
        },
        selectPPSBinGroup: function (data) {
            dispatch(selectPPSBinGroup(data));
        },
        changePPSBinGroupStatus: function (data) {
            dispatch(changePPSBinGroupStatus(data));
        },

    }
};

export  default connect(mapStateToProps, mapDispatchToProps)(Bins);