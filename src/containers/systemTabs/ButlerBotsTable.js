import React from 'react';
import {FormattedMessage} from 'react-intl';
import Dimensions from 'react-dimensions';
import {modal} from 'react-redux-modal';
import {GOR_STATUS, GOR_STATUS_PRIORITY, GOR_TABLE_HEADER_HEIGHT} from '../../constants/frontEndConstants';

import GTable from './../../components/gor-table-component'
import {GTableHeader, GTableHeaderCell, GTableBody, GTableRow} from './../../components/gor-table-component'
import { tableRenderer, TextCell, ProgressCell } from '../../components/commonFunctionsDataTable';

class ButlerBotsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: [{id: 0, text: "BOTS", key: 'id', sortable: true},
                {id: 1, text: "STATUS", key: 'status', sortable: true},
                {id: 2, text: "CURRENT TASK", key: 'current_task', sortable: true},
                {id: 3, text: "MSU MOUNTED", key: 'msu_mounted', sortable: true},
                {id: 4, text: "LOCATION", key: 'location', sortable: true},
                {id: 5, text: "POWER", key: 'power', sortable: true}
                
            ],
            butlerBotsList:props.data
           
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
        let updated_list=this.state.butlerBotsList.sort(function(a, b){
            if(a[header.key].toLowerCase() < b[header.key].toLowerCase()) return header.sortDir==='asc'?-1:1;
            if(a[header.key].toLowerCase() > b[header.key].toLowerCase()) return header.sortDir==='asc'?1:-1;
            return 0;
        })
        this.setState({header: updated_header,butlerBotsList:updated_list})
    }


    render() {
        let self = this;
        var totalBot=this.props.data.length;
         let pick=this.props.parameters.Pick;
        let put=this.props.parameters.Put;
        let charging=this.props.parameters.Charging;
        let idle=this.props.parameters.Idle;
        let msuMounted=this.props.parameters.msuMounted;
        let locations=this.props.parameters.location;
        let voltage=this.props.parameters.avgVoltage;
        let onlineBots=this.props.parameters.online;
        var noData=<div/>;
        

        if (totalBot=== 0 || totalBot=== undefined || totalBot=== null) {
            noData=<div className="gor-no-data"><FormattedMessage id="butlerbot.table.noData"
                                                                    description="No data message for butlerbot table"
                                                                    defaultMessage="No Butler Bot Found"/></div>
            
        }

        return (
            <div className="gor-bots-table">
                <GTable>
                    <GTableHeader>

                        <GTableHeaderCell header={self.state.header[0]} onClick={self._onSortChange.bind(self, this.state.header[0])} >
                            <span><FormattedMessage id="bots.table.bots" description="Bots id Column"
                                                    defaultMessage="BOTS"/></span>
                                                     <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="ButlerBotTable.subTotalBot"
                                                          description='sub text for totalbot ButlerBotTable'
                                                          defaultMessage='Total: {totalBot}'
                                                          values={{totalBot: totalBot ? totalBot : "0"}}/>
                                    </div>
                        </GTableHeaderCell>


                        <GTableHeaderCell header={self.state.header[1]} onClick={self._onSortChange.bind(self, this.state.header[1])}>
                        <span><FormattedMessage id="bots.table.status" description="Bots Status"
                                                defaultMessage="STATUS"/></span>
                                                <div className="gor-subStatus-online">
                                        <div >
                                            <FormattedMessage id="ButlerBotTable.status"
                                                              description='status for ButlerBotTable'
                                                              defaultMessage='{onlineBots} Online'
                                                              values={{onlineBots: onlineBots ? onlineBots : '0'}}/>
                                        </div>
                                    </div>
                    </GTableHeaderCell>


                        <GTableHeaderCell header={self.state.header[2]} onClick={self._onSortChange.bind(self, this.state.header[2])} >
                        <span><FormattedMessage id="bots.table.currentTask" description="Bots current task"
                                                defaultMessage="CURRENT TASK"/></span>
                                                <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="ButlerBotTable.botState"
                                                          description='bot state for ButlerBotTable'
                                                          defaultMessage='Pick ({pick}) . Put ({put}) . Charging ({charging}) . Idle ({idle})'
                                                          values={{
                                                              pick: pick ? pick : '0',
                                                              put: put ? put : '0',
                                                              charging: charging ? charging : '0',
                                                              idle: idle ? idle : '0'
                                                          }}/>
                                    </div>
                    </GTableHeaderCell>


                        <GTableHeaderCell header={self.state.header[3]} onClick={self._onSortChange.bind(self, this.state.header[3])}>
                        <span><FormattedMessage id="bots.table.msuMounted" description="MSU Mounted"
                                                defaultMessage="MSU MOUNTED"/></span>
                                                 <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="ButlerBotTable.mounted"
                                                          description='msu mounted for ButlerBotTable'
                                                          defaultMessage='{msuMounted} Mounted'
                                                          values={{msuMounted: msuMounted ? msuMounted : '0'}}/>
                                    </div>
                    </GTableHeaderCell>


                        <GTableHeaderCell header={self.state.header[4]} onClick={self._onSortChange.bind(self, this.state.header[4])}>
                        <span><FormattedMessage id="bots.table.location" description="Location"
                                                defaultMessage="LOCATION"/></span>
                                                 <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="ButlerBotTable.locations"
                                                          description='msu Location for ButlerBotTable'
                                                          defaultMessage='{locations} Locations'
                                                          values={{locations: locations ? locations : '0'}}/>
                                    </div>
                    </GTableHeaderCell>


                        <GTableHeaderCell header={self.state.header[5]} onClick={self._onSortChange.bind(self, this.state.header[5])}>
                        <span><FormattedMessage id="bots.table.power" description="Power"
                                                defaultMessage="POWER"/></span>

                                                <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="ButlerBotTable.avgVoltage"
                                                          description='avgVoltage for ButlerBotTable'
                                                          defaultMessage='Avg {voltage}'
                                                          values={{voltage: voltage ? voltage : "0 %"}}/>
                                    </div>
                    </GTableHeaderCell>
                        
                    </GTableHeader>
                    
                    <GTableBody data={self.state.butlerBotsList}>
                        
                        {self.state.butlerBotsList && self.state.butlerBotsList.map(function (row, idx) {
                            return (
                                
                                <GTableRow key={idx} index={idx} data={self.state.butlerBotsList}>
                                
                                    <div
                                        style={self.state.header[0].width ? {flex: '1 0 ' + self.state.header[0].width + "%"} : {}}
                                        className="cell">
                                        {row.id}
                                    </div>
                                    <div
                                        style={self.state.header[1].width ? {flex: '1 0 ' + self.state.header[1].width + "%"} : {}}
                                        className="cell">
                                        {row.status}
                                    </div>
                                    <div
                                        style={self.state.header[2].width ? {flex: '1 0 ' + self.state.header[2].width + "%"} : {}}
                                        className="cell">
                                        {row.current}
                                    </div>
                                    <div
                                        style={self.state.header[3].width ? {flex: '1 0 ' + self.state.header[3].width + "%"} : {}}
                                        className="cell">
                                        {row.msu}
                                    </div>
                                    <div
                                        style={self.state.header[4].width ? {flex: '1 0 ' + self.state.header[4].width + "%"} : {}}
                                        className="cell">
                                        {row.position}
                                    </div>
                                    <div
                                        style={self.state.header[4].width ? {flex: '1 0 ' + self.state.header[4].width + "%"} : {}}
                                        className="cell">
                                        {row.voltage}
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

ButlerBotsTable.PropTypes = {};

export default Dimensions()(ButlerBotsTable);
