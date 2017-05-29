/**
 * Created by gaurav.m on 5/26/17.
 */

/**
 * Options: table-bordered/table-striped
 * Header Will be in format: [{id:1,text: "SKU CODE", sortable: true}, {id:2,
                                text: "NAME",
                                sortable: true
                                }, {id:3,text: "OPENING STOCK", searchable: false}, {id:4,text: "PURCHAGE QTY", searchable: false}, {id:5,
                                text: "SALE QTY",
                                sortable: true
                            }, {id:6,
                                text: "CLOSING STOCK",
                                sortable: true
                            }]
 */

import React from 'react'
import "./../../../library/table/css/table.css"
export class GTable extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
       return <div className={["table-container"].concat((this.props.options||[])).join(" ")}>
            {this.props.children}
        </div>
    }
}
