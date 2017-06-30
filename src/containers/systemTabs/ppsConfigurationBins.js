/**
 * Created by gaurav.m on 6/22/17.
 */
/**
 * Created by gaurav.m on 6/21/17.
 */
import React  from 'react';
import {connect} from 'react-redux'
import {selectPPSBinToTag} from './../../actions/ppsConfigurationActions'

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
    selectBinToTag(bin) {
        this.props.selectPPSBinToTag(bin)
    }

    /**
     * The method will send the selected PPS
     * along with the updated profile to the server.
     */
    saveProfile(){
        console.log(this.props.selectedPPS)
    }

    render() {
        /**
         * As soon as PPS selection or the profile
         * selection get changed.
         * Re-render the PPS Bins
         */
        let self = this
        if(!self.props.selectedPPS){
            return false
        }
        return <div
            className={["pps-bins-container", this.props.currentView === 'tags' ? 'include-tags' : null].join(" ")}>
            Select a bin to manage the tags
            <div>
                {Array.apply(null, Array(+self.props.selectedPPS.structure[0])).map(function(row,index){
                    return (<div key={index} className="pps-bin-row">
                        {Array.apply(null, Array(+self.props.selectedPPS.structure[1])).map(function (bin,ind) {
                            let bin_indx=ind+(index*self.props.selectedPPS.structure[1])
                            let bin_id=[self.props.selectedPPS.pps_id,self.props.selectedPPS.pps_bins[bin_indx].pps_bin_id].join("-")
                            return <span onClick={self.selectBinToTag.bind(self, self.props.selectedPPS.pps_bins[bin_indx])} className={['pps-bin', (self.props.selectedPPSBin && self.props.selectedPPSBin.id===bin_id ? 'selected' : null)].join(" ")}
                                         key={self.props.selectedPPS.pps_bins[bin_indx].pps_bin_id} style={{}}><span className="pps-bin-tag-info"> 1 Tag</span>
                               <span className={['pps-bin-info', (self.props.selectedPPSBin && self.props.selectedPPSBin.id===bin_id ? 'selected' : null)].join(" ")}
                                     style={{}}>{self.props.selectedPPS.pps_bins[bin_indx].pps_bin_id}</span>
                           </span>
                        })}
                    </div>)
                })}

            </div>
            <div style={{clear:'both',overflow:'auto'}}>
                <button style={{float:'right',right:20}} onClick={this.saveProfile.bind(this)}>Save</button>
            </div>
            selectedProfile:{this.props.selectedProfile.name} selectedPPS:{this.props.selectedPPS.pps_id}
        </div>
    }
}
function mapStateToProps(state, ownProps) {
    return {
        selectedProfile: state.ppsConfiguration.selectedProfile || {id: null},
        selectedPPS: state.ppsConfiguration.selectedPPS,
        selectedPPSBin:state.ppsConfiguration.selectedPPSBin

    };
}

var mapDispatchToProps = function (dispatch) {
    return {
        selectPPSBinToTag: function (data) {
            dispatch(selectPPSBinToTag(data));
        },
    }
};

export  default connect(mapStateToProps, mapDispatchToProps)(Bins);