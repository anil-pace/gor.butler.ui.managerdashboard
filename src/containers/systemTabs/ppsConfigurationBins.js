/**
 * Created by gaurav.m on 6/22/17.
 */
/**
 * Created by gaurav.m on 6/21/17.
 */
import React  from 'react';
import {connect} from 'react-redux'

class Bins extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

    }

    selectBinToTag(bin) {
        bin.selected = true
    }

    render() {
        /**
         * As soon as PPS selection or the profile
         * selection get changed.
         * Re-render the PPS Bins
         */
        let self = this
        return <div
            className={["pps-bins-container", this.props.currentView === 'tags' ? 'include-tags' : null].join(" ")}>
            Select a bin to manage the tags
            <div>
                {/*Bins plotted using mock data*/}
                {[[{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}], [{id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}]].map(function (row, index) {
                    return (<div key={index} className="pps-bin-row">
                        {row.map(function (bin) {
                            return <span className={['pps-bin', (bin.selected ? 'selected' : null)].join(" ")}
                                         key={bin.id} style={{}}><span className="pps-bin-tag-info"> 1 Tag</span>
                               <span className="pps-bin-info" onClick={self.selectBinToTag.bind(self, bin)}
                                     style={{}}>{bin.id}</span>
                           </span>
                        })}
                    </div>)
                })}
            </div>
        </div>
    }
}
function mapStateToProps(state, ownProps) {
    return {
        selectedProfile: state.ppsConfiguration.selectedProfile || {id: null},
        selectedPPS: state.ppsConfiguration.selectedPPS || {id: null},

    };
}

var mapDispatchToProps = function (dispatch) {
    return {}
};

export  default connect(mapStateToProps, mapDispatchToProps)(Bins);