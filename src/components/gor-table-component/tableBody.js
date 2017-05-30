/**
 * Created by gaurav.m on 5/26/17.
 */
import React from 'react'
import {GTableNoResult} from './noResultFound'
export class GTableBody extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let data = this.props.data
        return <div onScroll={(event) => this.props.onScrollHandler(event)} className={["table-body"].concat((this.props.options || [])).join(" ")}>

            {data && data.length < 1 ?
                <GTableNoResult/> : this.props.children
            }


        </div>
    }
}