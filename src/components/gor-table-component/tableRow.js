/**
 * Created by gaurav.m on 5/26/17.
 */
/**
 * TODO:
 * Make data as a required property
 * and put other properties on validation too.
 */
import React from 'react'
export class GTableRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let index = this.props.index
        let offset = this.props.offset || 0
        let max = this.props.max || this.props.data.length
        let props_to_be_passed=Object.assign({},this.props)
        delete props_to_be_passed.offset
        delete props_to_be_passed.key
        delete props_to_be_passed.max
        delete props_to_be_passed.data
        delete props_to_be_passed.index



        if (index < offset || index > max) {
            return null
        }
        return (
            <div className="row" {...props_to_be_passed}>
                {this.props.children}
            </div>
        )

    }

}