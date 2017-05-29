/**
 * Created by gaurav.m on 5/22/17.
 */
import React from 'react';
import Dimensions from 'react-dimensions';
import {GTable} from './table/table'
import {GTableHeader,GTableHeaderCell} from './table/tableHeader'
import {GTableBody} from "./table/tableBody";
import {GTableNoResult} from "./table/noResultFound";
import {GTableRow} from "./table/tableRow";
class ReportsTabTable extends React.Component {
    constructor(props) {
        super(props);
        let initialData = [[1211231, "Apple Iphone 5", 3230, 133, 1400, 10063], [12121231, "Woodland Boot", 3230, 133, 1400, 12363], [15211231, "Car", 3230, 133, 1400, 194463], [1611231, "Plane", 3230, 133, 1400, 199963], [1261231, "Cup", 3230, 133, 1400, 1163], [2211231, "Tea", 3230, 133, 1400, 1463], [8211231, "Dog", 3230, 133, 1400, 1063], [1219231, "Laptop", 3230, 133, 1400, 1363], [1211201, "TV", 3230, 133, 1400, 1263], [1811231, "Banana", 3230, 133, 1400, 1763]]
        this.state = {
            header: [{id:1,text: "SKU CODE", sortable: true}, {id:2,
                text: "NAME",
                sortable: true
            }, {id:3,text: "OPENING STOCK", searchable: false}, {id:4,text: "PURCHAGE QTY", searchable: false}, {id:5,
                text: "SALE QTY",
                sortable: true
            }, {id:6,
                text: "CLOSING STOCK",
                sortable: true
            }],
            data: initialData, filteredData: initialData, offset: 0, max: initialData.length
        }
    }

    _onSortChange(header_column) {
        let currentState = this.state.header
        let self = this
        currentState.map(function (column, index) {
            if (header_column === column) {
                column.sortDir = column.sortDir === "asc" ? "desc" : "asc"
                self._sortData(column, index)
            } else {
                delete column.sortDir
            }

        })
        this.setState({header: currentState})

    }


    _sortData(column, index) {
        let currentData = this.state.filteredData
        currentData.sort(function (a, b) {
            let first, second
            if (column.sortDir === 'asc') {
                first = a
                second = b
            } else {
                first = b
                second = a
            }
            if (first[index] < second[index]) {
                return -1;
            }
            if (first[index] > second[index]) {
                return 1;
            }
            return 0;

        });
        this.setState({filteredData: currentData})
    }

    _filter(e) {
        let self = this
        let searchedText = e ? e.target.value : self.state.searchedText
        let currentState = this.state.data
        let filteredData = currentState.filter(function (row, row_index) {
            return row.filter(function (data, col_index) {
                    return self.state.header[col_index] && data.toString().toLowerCase().indexOf(searchedText.toLowerCase()) > -1
                }).length > 0
        })
        this.setState({filteredData: filteredData})
    }

    _paginateFrom(event) {
        let offset = parseInt(event.target.value) - 1
        this.setState({offset: Math.max(offset, 0)})
    }

    _paginateTo(event) {
        let max = parseInt(event.target.value) - 1
        this.setState({max: Math.min(max, this.state.data.length)})
    }

    render() {
        var self = this
        return (
            <div>
               {/*<div>*/}
                   {/*<input type="text" name="filter" onChange={this._filter.bind(this)}/>*/}
                   {/*<input type="text" name="from" onChange={this._paginateFrom.bind(this)}/>*/}
                   {/*<input type="text" name="to" onChange={this._paginateTo.bind(this)}/>*/}
               {/*</div>*/}

                <GTable options={['table-bordered','table-striped']}>
                    <GTableHeader>
                        {this.state.header.map(function (header, index) {
                            return <GTableHeaderCell key={index} header={header} onClick={header.sortable ? self._onSortChange.bind(self, header) : false}>
                                {header.text}
                                </GTableHeaderCell>

                        })}
                    </GTableHeader>
                    <GTableBody data={this.state.filteredData}>
                        {this.state.filteredData.map(function (row, index) {
                            return (
                                <GTableRow key={index} index={index} offset={self.state.offset} max={self.state.max} data={self.state.filteredData}>
                                    {row.map(function (text, index) {
                                        return <div key={index} style={self.state.header[index].width?{flex:'1 0 '+self.state.header[index].width+"%"}:{}} className="cell" title={self.state.header[index].text}>
                                            {text}
                                        </div>
                                    })}
                                </GTableRow>
                            )
                        })}
                    </GTableBody>
                </GTable>


            </div>
        )
    }

}
export default Dimensions()(ReportsTabTable);