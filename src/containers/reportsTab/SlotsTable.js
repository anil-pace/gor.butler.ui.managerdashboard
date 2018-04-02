import React from 'react';
import {FormattedMessage} from 'react-intl';
import Dimensions from 'react-dimensions';
import {modal} from 'react-redux-modal';

import GTable from './../../components/gor-table-component'
import {GTableHeader, GTableHeaderCell, GTableBody, GTableRow} from './../../components/gor-table-component'
class SlotsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: [{id: 0, text: "SLOT TYPE", key: 'slot_type', sortable: false},
                {id: 1, text: "SLOT VOLUME", key: 'slot_volume', sortable: false},
                {id: 2, text: "DIMENSION(L*B*H)", key: 'dimension', sortable: false},
                {id: 3, text: "TOTAL SLOTS", key: 'total_slots', sortable: false},
                {id: 4, text: "EMPTY SLOTS", key: 'empty_slots', sortable: false},
                {id: 5, text: "SLOT UTILIZATION", key: 'slot_utilization', sortable: false}
                
            ],
            slotList:props.data
        }

    }

    
    componentWillReceiveProps(nextProps){
        if(nextProps.data && nextProps.data.length!==0){
            this.setState({slotList:nextProps.data})
        }
    }

    render() {
        let self = this
        return (
            <div className="gor-storage-table">
                <GTable>
                    <GTableHeader>

                        <GTableHeaderCell header={self.state.header[0]} >
                            <span><FormattedMessage id="slot.table.slotType" description="Slot Type column"
                                                    defaultMessage="SLOT TYPE"/></span>
                        </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[1]}>
                        <span><FormattedMessage id="slot.table.slotVolume" description="SlotVolume"
                                                defaultMessage="SLOT VOLUME"/></span>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[2]} >
                        <span><FormattedMessage id="slot.table.dimension" description="DIMENSION(L*B*H)"
                                                defaultMessage="DIMENSION(L*B*H)"/></span>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[3]} >
                        <span><FormattedMessage id="slot.table.totalSlots" description="TOTAL SLOTS"
                                                defaultMessage="TOTAL SLOTS"/></span>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[4]} >
                        <span><FormattedMessage id="slot.table.emptySlots" description="Empty Slots"
                                                defaultMessage="EMPTY SLOTS"/></span>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[5]} >
                        <span><FormattedMessage id="slot.table.slotUtilization" description="Slot Utilization"
                                                defaultMessage="SLOT UTILIZATION"/></span>
                    </GTableHeaderCell>
                        
                    </GTableHeader>
                    
                    <GTableBody data={self.state.slotList}>
                        
                        {self.state.slotList && self.state.slotList.map(function (row, idx) {
                            return (
                                
                                <GTableRow key={idx} index={idx} data={self.state.slotList}>
                                
                                    <div
                                        style={self.state.header[0].width ? {flex: '1 0 ' + self.state.header[0].width + "%"} : {}}
                                        className="cell">
                                        {row.slotType}
                                    </div>
                                    <div
                                        style={self.state.header[1].width ? {flex: '1 0 ' + self.state.header[1].width + "%"} : {}}
                                        className="cell">
                                        {row.slotVolume}
                                    </div>
                                    <div
                                        style={self.state.header[2].width ? {flex: '1 0 ' + self.state.header[2].width + "%"} : {}}
                                        className="cell">
                                        {row.dimension}
                                    </div>
                                    <div
                                        style={self.state.header[3].width ? {flex: '1 0 ' + self.state.header[3].width + "%"} : {}}
                                        className="cell">
                                        {row.totalSlots}
                                    </div>
                                    <div
                                        style={self.state.header[4].width ? {flex: '1 0 ' + self.state.header[4].width + "%"} : {}}
                                        className="cell">
                                        {row.emptySlots}
                                    </div>
                                    <div
                                        style={self.state.header[4].width ? {flex: '1 0 ' + self.state.header[4].width + "%"} : {}}
                                        className="cell">
                                        {row.slotUtilization}
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

SlotsTable.PropTypes = {};

export default Dimensions()(SlotsTable);
