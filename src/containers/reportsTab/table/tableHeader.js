/**
 * Created by gaurav.m on 5/26/17.
 */
import React from 'react'
export class GTableHeader extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div className={["table-header","header"].concat((this.props.options||[])).join(" ")}>
            <div className="row">
                {this.props.children}
            </div>
        </div>
    }
}

export class GTableHeaderCell extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let header = this.props.header||{}
        return <div style={header.width ? {flex: '1 0 ' + header.width + "%"} : {}} className={["cell", (header.sortDir || "")].join(" ")} {...this.props}>
            {this.props.children}

        </div>
    }
}