/**
 * Created by gaurav.m on 6/30/17.
 */
import React from 'react'
class Bin extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (<span className={["pps-bin",this.props.disabled?'disabled':''].join(" ")}>
                    <span className="pps-bin-tag-info"> 1 Tag</span>
                        <span className="pps-bin-action">
                            {this.props.children}
                        </span>

                    <span className="pps-bin-info">{this.props.binId}</span>
                </span>)
    }
}

export default Bin;
