import React from 'react';
import {Table, Column} from 'fixed-data-table';
import Dimensions from 'react-dimensions'
import {FormattedMessage} from 'react-intl';
import {currentTableState} from '../../actions/tableDataAction'
import {
    SortHeaderCell,
    tableRenderer,
    TextCell,
    StatusCell,
    filterIndex,
    DataListWrapper,
    sortData
} from '../../components/commonFunctionsDataTable';
import {GOR_STATUS, GOR_STATUS_PRIORITY, GOR_TABLE_HEADER_HEIGHT} from '../../constants/frontEndConstants';
import GTable from './../../components/gor-table-component'
import {GTableHeader, GTableHeaderCell, GTableBody, GTableRow} from './../../components/gor-table-component'

class SysControllersTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: [{id: 0, text: "CONTROLLER ID", key: 'controller_id', sortable: true,sortDir:"ASC"},
                {id: 1, text: "STATUS", key: 'statusText', sortable: true},
                {id: 2, text: "LOCATION", key: 'location', sortable: false},
                {id: 3, text: "CONNECTION DETAILS", key: 'connection_details', sortable: false},
                {id: 4, text: "OPERATING MODE", key: 'operating_mode', sortable: false},
            ],
            systemControllerList:props.data
        }
       
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data && nextProps.data.length!==0){
            this.setState({systemControllerList:nextProps.data})
        }
    }
   
    

    _onSortChange(header) {
        let updated_header = this.state.header.map(function (hdr) {
            if (header.id === hdr.id) {
                hdr.sortDir = hdr.sortDir === 'asc' ? 'desc' : 'asc'
            } else {
                hdr.sortDir = ''
            }
            return hdr
        })
        let updated_list=this.state.systemControllerList.sort(function(a, b){
            if(a[header.key].toLowerCase() < b[header.key].toLowerCase()) return header.sortDir==='asc'?-1:1;
            if(a[header.key].toLowerCase() > b[header.key].toLowerCase()) return header.sortDir==='asc'?1:-1;
            return 0;
        })
        this.setState({header: updated_header,systemControllerList:updated_list})
    }

    render() {
        let self = this
        var {systemControllerList, colSortDirs, columnWidths}=this.state;
        var rowsCount=this.props.data.length;
        var containerHeight=this.props.containerHeight;
        var noData=<div/>;
        if (rowsCount=== 0 || rowsCount=== undefined || rowsCount=== null) {
            noData=<div className="gor-no-data"><FormattedMessage id="SystemControllers.table.noData"
                                                                    description="No data message for System Controllers table"
                                                                    defaultMessage="No System Controllers Found"/></div>
            containerHeight=GOR_TABLE_HEADER_HEIGHT;
        }

        


          return (
            <div className="gor-syscontroller-table">
                <GTable>
                    <GTableHeader>

                        <GTableHeaderCell header={self.state.header[0]} onClick={self._onSortChange.bind(self, this.state.header[0])}>
                            <span><FormattedMessage id="SystemControllersTable.controllerID.heading" description="controllerID heading"
                                                    defaultMessage="CONTROLLER ID"
                                                    values={{rowsCount: this.state.systemControllerList.length}}/> {}</span>
                                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="SystemControllersTable.subtext"
                                                          description='Total System Controllers'
                                                          defaultMessage='Total: {rowsCount}'
                                                          values={{rowsCount: rowsCount ? rowsCount : "0"}}/>
                                    </div>
                        </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[1]} onClick={self._onSortChange.bind(self, this.state.header[1])}>
        
                        <span><FormattedMessage id="SystemControllers.table.STATUS"
                                                  description="STATUS for SystemControllers"
                                                  defaultMessage="STATUS"/></span>
                    </GTableHeaderCell>
                     <GTableHeaderCell header={self.state.header[2]}>
        
                        <span><FormattedMessage id="SystemControllers.table.LOCATION"
                                                  description="LOCATION for SystemControllers"
                                                  defaultMessage="LOCATION"/></span>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[3]}>
                        <span> <FormattedMessage id="SystemControllers.table.connectionDetails"
                                                  description="connectionDetails for SystemControllers"
                                                  defaultMessage="CONNECTION DETAILS"/></span>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[4]}>
                        <span> <FormattedMessage id="SystemControllers.table.operatingMode"
                                                  description="operatingMode for SystemControllers"
                                                  defaultMessage="OPERATING MODE"/></span>

                    </GTableHeaderCell>
                    </GTableHeader>

                    <GTableBody data={self.state.systemControllerList}>

                        {self.state.systemControllerList && self.state.systemControllerList.map(function (row, idx) {
                            return (
                                <GTableRow key={idx} index={idx} data={self.state.systemControllerList}>
                                    <div
                                        style={self.state.header[0].width ? {flex: '1 0 ' + self.state.header[0].width + "%"} : {}}
                                        className="cell">
                                        {row.controller_id}
                                    </div>
                                    <div
                                        style={self.state.header[1].width ? {flex: '1 0 ' + self.state.header[1].width + "%"} : {}}
                                        className="cell">
                                        <div className={row.statusText.toLowerCase()}>{row.statusText}</div>
                                    </div>
                                    <div
                                        style={self.state.header[2].width ? {flex: '1 0 ' + self.state.header[2].width + "%"} : {}}
                                        className="cell">
                                        {row.state_data.zone}
                                    </div>
                                    <div
                                        style={self.state.header[3].width ? {flex: '1 0 ' + self.state.header[3].width + "%"} : {}}
                                        className="cell">
                                        
                                        <div className="connectionDetails">
                                        <span>
                                        <FormattedMessage id="sysController.table.ethernetStatus" description='sysController.table.ethernetStatus'
                                                          defaultMessage='Ethernet Network: '
                                                          />
                                                          </span>
                                                          <span>
                                                          {row.ethernetText}
                                                          </span>
                                                          </div>
                                                          <div className="connectionDetails">
                                                          <span>
                                <FormattedMessage id="sysController.table.zigbeeStatus" description='sysController.table.zigbeeStatus'
                                                          defaultMessage='Zigbee Network: '
                                                          />
                                                          </span>
                                                          <span>
                                        {row.ethernetText}
                                        </span>
                                        </div>
                                        
                                    </div>
                                    <div
                                        style={self.state.header[3].width ? {flex: '1 0 ' + self.state.header[3].width + "%"} : {}}
                                        className="cell">
                                        {row.action_triggered_text}
                                        {row.sensor_activated_text}
                                    </div>
                                  

                                </GTableRow>
                            )
                        })}
                    </GTableBody>
                </GTable>
            </div>
        );
    }
}

SysControllersTable.PropTypes={
    items: React.PropTypes.array,
    containerWidth: React.PropTypes.number,
    itemNumber: React.PropTypes.number,
    currentHeaderOrder: React.PropTypes.object,
    sortHeaderState: React.PropTypes.func,
    lastUpdatedText: React.PropTypes.string,
    showFilter: React.PropTypes.bool,
    lastUpdated: React.PropTypes.string,
    setButlerFilter: React.PropTypes.func,
    setFilter: React.PropTypes.func,
    containerHeight: React.PropTypes.number,
    currentSortState: React.PropTypes.string,
    botFilterStatus: React.PropTypes.bool
};


export default (Dimensions()(SysControllersTable));