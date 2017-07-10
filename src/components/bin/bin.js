/**
 * Created by gaurav.m on 6/30/17.
 */
import React from 'react'
class Bin extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (<span className={["pps-bin", this.props.disabled ? 'disabled' : ''].join(" ")}>
            {/*Because only one tag would be there for each bin*/}
                <span className="pps-bin-tag-info"><span className="gor-tag-icon-grey"/>1 Tag</span>

            {this.props.children}

            <span className="pps-bin-info">{this.props.binId}</span>
                </span>)
    }
}

export default Bin;
