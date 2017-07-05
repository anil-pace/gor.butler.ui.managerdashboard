/**
 * Created by gaurav.m on 6/22/17.
 */
/**
 * Created by gaurav.m on 6/21/17.
 */
import React  from 'react';
import {connect} from 'react-redux'
import {selectPPSBin, clearSelectionPPSBin, changePPSBinStatus} from './../../actions/ppsConfigurationActions'
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
     * The method will send the selected PPS
     * along with the updated profile to the server.
     */
    saveProfile() {
        console.log(this.props.selectedPPS)
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
        return <div
            className={["pps-bins-container", this.props.currentView === 'tags' ? 'include-tags' : null].join(" ")}>
            Select a bin to manage the tags
            <div>
                {Array.apply(null, Array(+self.props.selectedPPS.structure[0])).map(function (row, index) {
                    return (<div key={index} className="pps-bin-row">
                        {Array.apply(null, Array(+self.props.selectedPPS.structure[1])).map(function (bin, ind) {
                            let bin_indx = ind + (index * self.props.selectedPPS.structure[1])
                            let bin_id = [self.props.selectedPPS.pps_id, self.props.selectedPPS.pps_bins[bin_indx].pps_bin_id].join("-")
                            let selected_bin = (self.props.selectedPPSBin && self.props.selectedPPSBin[self.props.currentView] && self.props.selectedPPSBin[self.props.currentView].id === bin_id)
                            if (self.props.currentView === 'tags') {
                                return <span
                                    onClick={selected_bin ? self.clearSelectionPPSBin.bind(self, self.props.selectedPPS.pps_bins[bin_indx], self.props.currentView) : self.selectBin.bind(self, self.props.selectedPPS.pps_bins[bin_indx], self.props.currentView)}
                                    className={[( selected_bin ? 'selected' : null)].join(" ")}
                                    key={self.props.selectedPPS.pps_bins[bin_indx].pps_bin_id}><Bin
                                    binId={bin_id}/></span>
                            } else if (self.props.currentView === 'bins') {
                                return <span
                                    onClick={self.selectBin.bind(self, self.props.selectedPPS.pps_bins[bin_indx], self.props.currentView)}
                                    className={[(selected_bin ? 'selected' : null)].join(" ")}
                                    key={self.props.selectedPPS.pps_bins[bin_indx].pps_bin_id}>
                                    <Bin binId={bin_id} disabled={!self.props.selectedPPS.pps_bins[bin_indx].enabled}>
                                        {/*{selected_bin?<span className="pps-bin-action"><span onClick={self.togglePPSBinStatus.bind(self,self.props.selectedPPS.pps_bins[bin_indx])} className="pps-bin-action-button">{self.props.selectedPPS.pps_bins[bin_indx].enabled?'Disable':"Enable"}</span></span>:null}*/}
                                    </Bin>
                                </span>
                            } else {
                                //groups
                                return <span
                                    onClick={self.selectBin.bind(self, self.props.selectedPPS.pps_bins[bin_indx], self.props.currentView)}
                                    className={[(selected_bin ? 'selected' : null)].join(" ")}
                                    key={self.props.selectedPPS.pps_bins[bin_indx].pps_bin_id}><Bin
                                    binId={bin_id}/></span>
                            }

                        })}
                    </div>)
                })}

                {self.props.currentView === 'bins' && <div className="pps-bin-actions pps-bin-row" style={{textAlign: 'center'}}>
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


            </div>
            <div style={{clear: 'both', overflow: 'auto'}}>
                <button style={{float: 'right', right: 20}} onClick={this.saveProfile.bind(this)}>Save</button>
            </div>
            selectedProfile:{this.props.selectedProfile.name} selectedPPS:{this.props.selectedPPS.pps_id}
        </div>
    }
}
function mapStateToProps(state, ownProps) {
    return {
        selectedProfile: state.ppsConfiguration.selectedProfile || {id: null},
        selectedPPS: state.ppsConfiguration.selectedPPS,
        selectedPPSBin: state.ppsConfiguration.selectedPPSBin

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
    }
};

export  default connect(mapStateToProps, mapDispatchToProps)(Bins);