/**
 * Created by gaurav.m on 5/26/17.
 */
import React from 'react'
export class GTableNoResult extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div className="row">
            <div className="cell">No results found...</div>
        </div>
    }
}