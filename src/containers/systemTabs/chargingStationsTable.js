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

class ChargingStationsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: [{id: 0, text: "STATION ID", key: 'id', sortable: true,sortDir:"ASC"},
                {id: 1, text: "STATUS", key: 'status', sortable: true},
                {id: 2, text: "OPERATING MODE", key: 'mode', sortable: true},
                {id: 3, text: "BOTS CONNECTED", key: 'dockedBots', sortable: true}
            ],
            chargingStationList:props.data
        }
       
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data && nextProps.data.length!==0){
            this.setState({chargingStationList:nextProps.data})
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
        let updated_list=this.state.chargingStationList.sort(function(a, b){
            if(a[header.key].toLowerCase() < b[header.key].toLowerCase()) return header.sortDir==='asc'?-1:1;
            if(a[header.key].toLowerCase() > b[header.key].toLowerCase()) return header.sortDir==='asc'?1:-1;
            return 0;
        })
        this.setState({header: updated_header,chargingStationList:updated_list})
    }

    render() {
        let self = this
        var {chargingStationList, colSortDirs, columnWidths}=this.state;
        var rowsCount=this.props.data.length;
        let manual=this.props.chargersState.manualMode;
        let auto=this.props.chargersState.automaticMode;
        let totalBots=this.props.chargersState.connectedBots;
        let csConnected=this.props.chargersState.csConnected;
        var containerHeight=this.props.containerHeight;
        var noData=<div/>;
        if (rowsCount=== 0 || rowsCount=== undefined || rowsCount=== null) {
            noData=<div className="gor-no-data"><FormattedMessage id="ChargingStations.table.noData"
                                                                    description="No data message for ChargingStations table"
                                                                    defaultMessage="No Charging Stations Found"/></div>
            containerHeight=GOR_TABLE_HEADER_HEIGHT;
        }

        


          return (
            <div className="gor-chergingstation-table">
                <GTable>
                    <GTableHeader>

                        <GTableHeaderCell header={self.state.header[0]} onClick={self._onSortChange.bind(self, this.state.header[0])}>
                            <span><FormattedMessage id="ChargingStationsTable.stationID.heading" description="StationID heading"
                                                    defaultMessage="STATION ID"
                                                    values={{rowsCount: this.state.chargingStationList.length}}/> {}</span>
                                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="ChargingStationsTable.SubstationID"
                                                          description='total SubStationID for ChargingStationsTable'
                                                          defaultMessage='Total: {rowsCount}'
                                                          values={{rowsCount: rowsCount ? rowsCount : "0"}}/>
                                    </div>
                        </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[1]} onClick={self._onSortChange.bind(self, this.state.header[1])}>
        
                        <span><FormattedMessage id="ChargingStations.table.STATUS"
                                                  description="STATUS for ChargingStations"
                                                  defaultMessage="STATUS"/></span>
                                                <div className="gor-subStatus-online">
                                        <div >
                                            <FormattedMessage id="csTable.status"
                                                              description='status for cs table'
                                                              defaultMessage='{csConnected} connected'
                                                              values={{csConnected: csConnected ? csConnected : '0'}}/>
                                        </div>
                                    </div>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[2]} onClick={self._onSortChange.bind(self, this.state.header[2])}>
                        <span> <FormattedMessage id="ChargingStations.table.operatingMode"
                                                  description="operatingMode for ChargingStations"
                                                  defaultMessage="OPERATING MODE"/></span>

                                            <div className="gorToolHeaderSubText">
                                    <FormattedMessage id="ChargingStationsTable.mode"
                                                      description='cs mode for ChargingStationsTable'
                                                      defaultMessage='Manual ({manual}) . Auto ({auto})'
                                                      values={{
                                                          manual: manual ? manual : '0',
                                                          auto: auto ? auto : '0'
                                                      }}/>
                                </div>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[3]} onClick={self._onSortChange.bind(self, this.state.header[3])}>
                        <span> <FormattedMessage id="ChargingStations.table.connectedBots"
                                                  description="connectedBots for ChargingStations"
                                                  defaultMessage="BOTS CONNECTED"/></span>


                                            <div className="gorToolHeaderSubText">
                                    <FormattedMessage id="ChargingStationsTable.totalBots"
                                                      description='total bots ChargingStationsTable'
                                                      defaultMessage='{totalBots} bots connected'
                                                      values={{totalBots: totalBots ? totalBots : '0'}}/>
                                </div>

                    </GTableHeaderCell>
                    </GTableHeader>

                    <GTableBody data={self.state.chargingStationList}>

                        {self.state.chargingStationList && self.state.chargingStationList.map(function (row, idx) {
                            return (
                                <GTableRow key={idx} index={idx} data={self.state.chargingStationList}>
                                    <div
                                        style={self.state.header[0].width ? {flex: '1 0 ' + self.state.header[0].width + "%"} : {}}
                                        className="cell">
                                        {row.id}
                                    </div>
                                    <div
                                        style={self.state.header[1].width ? {flex: '1 0 ' + self.state.header[1].width + "%"} : {}}
                                        className="cell">
                                        <div className={row.status}>{row.status}</div>
                                    </div>
                                    <div
                                        style={self.state.header[2].width ? {flex: '1 0 ' + self.state.header[2].width + "%"} : {}}
                                        className="cell">
                                        {row.mode}
                                    </div>
                                    <div
                                        style={self.state.header[3].width ? {flex: '1 0 ' + self.state.header[3].width + "%"} : {}}
                                        className="cell">
                                        {row.dockedBots}
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

ChargingStationsTable.PropTypes={
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


export default (Dimensions()(ChargingStationsTable));