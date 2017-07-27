import React from 'react';
import {Table, Column,Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions'
import {FormattedMessage} from 'react-intl';
import {
    SortHeaderCell,
    tableRenderer,
    TextCell,
    PPSComponentCell,
    StatusCell,
    filterIndex,
    DataListWrapper,
    sortData,ActionCellPPS
} from '../../components/commonFunctionsDataTable';
import {defineMessages} from 'react-intl';
import {GOR_STATUS, GOR_STATUS_PRIORITY, GOR_TABLE_HEADER_HEIGHT} from '../../constants/frontEndConstants';

import {modal} from 'react-redux-modal';
import ConfirmApplyProfile from './confirmApplyProfile'
const messages=defineMessages({
    ppsPlaceholder: {
        id: 'pps.dropdown.placeholder',
        description: 'mode change for pps',
        defaultMessage: 'Change PPS Mode',
    }


});

class PPStable extends React.Component {
    constructor(props) {
        super(props);
        var temp;
        if (this.props.items=== undefined) {
            this._dataList=new tableRenderer(0);
            temp=new Array(0).fill(false);
        }
        else {
            this._dataList=new tableRenderer(this.props.items.length);
            temp=new Array(this.props.items.length).fill(false);
        }
        this._defaultSortIndexes=[];
        this._dataList.newData=this.props.items;
        var size=this._dataList.getSize();
        for (var index=0; index < size; index++) {
            this._defaultSortIndexes.push(index);
        }
        this.state={
            sortedDataList: this._dataList,
            colSortDirs: {},
            columnWidths: {
                id: this.props.containerWidth * 0.1,
                status: this.props.containerWidth * 0.1,
                operatingMode: this.props.containerWidth * 0.15,
                performance: this.props.containerWidth * 0.1,
                operatorAssigned: this.props.containerWidth * 0.2,
                profiles: this.props.containerWidth * 0.35
            },
            headerChecked: false,
            isChecked: temp
        };
        this._onSortChange=this._onSortChange.bind(this);
        this._onFilterChange=this._onFilterChange.bind(this);
        this._onColumnResizeEndCallback=this._onColumnResizeEndCallback.bind(this);

    }

    shouldComponentUpdate(nextProps) {
        if (this.props.items && nextProps.items.length=== 0) {
            return false;
        }
        return true;
    }

    confirmApplyProfileChanges(pps_id,profile_name){
        modal.add(ConfirmApplyProfile, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true, // (optional) if you don't wanna show the top right close button
            //.. all what you put in here you will get access in the modal props ;)
            pps_id:pps_id,
            profile_name:profile_name.value
        });
    }


    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.items)=== JSON.stringify(nextProps.items)) {
            return
        }
        if (nextProps.items=== undefined) {
            this._dataList=new tableRenderer(0);
        }
        else {
            this._dataList=new tableRenderer(nextProps.items.length);
        }
        this._defaultSortIndexes=[];
        this._dataList.newData=nextProps.items;
        var size=this._dataList.getSize();
        for (var index=0; index < size; index++) {
            this._defaultSortIndexes.push(index);
        }
        if (!this.props.checkedPps && nextProps.items) {
            //var initialCheckState=new Array(nextProps.items.length).fill(false);
            this.props.setCheckedPps({})
        }
        this.state={
            sortedDataList: this._dataList,
            colSortDirs: {},
            columnWidths: {

                id: nextProps.containerWidth * 0.1,
                status: nextProps.containerWidth * 0.1,
                operatingMode: nextProps.containerWidth * 0.15,
                performance: nextProps.containerWidth * 0.1,
                operatorAssigned: nextProps.containerWidth * 0.2,
                profiles: nextProps.containerWidth * 0.35

            },
            headerChecked: this.state.headerChecked,
            isChecked: this.props.checkedPps
        };
        this.props.updateSortedDataList(this._dataList)


        this._onSortChange=this._onSortChange.bind(this);
        this._onFilterChange=this._onFilterChange.bind(this);
        this._onColumnResizeEndCallback=this._onColumnResizeEndCallback.bind(this);
        if (this.props.items && this.props.items.length) {
            this._onFilterChange(nextProps.getPpsFilter);
        }
    }

    /**
     * Hack for fixing the bug https://work.greyorange.com/jira/browse/BSS-656
     * This has to be removed once we get rid of the fixedDataTable
     * @param  {Number} rowIndex rowindex on which the click was initiated
     */
    _handleOnClickDropdown(event, index) {
        var el=event.target;
        var elClassName=(el.className).trim(),
            parentEl, siblingEl, totalRowCount=this.props.items.length - 1;
        if (elClassName !== "gor-dropdown-wrapper" && elClassName !== "gor-dropdown" && elClassName!=='gor-audit-info-icon') {
            return;
        }
        parentEl=el.parentNode;
        while (parentEl) {
            if (parentEl.className=== "fixedDataTableRowLayout_rowWrapper") {
                parentEl.parentNode.childNodes.forEach(function(node){
                    node.style.zIndex="0";
                })
                parentEl.style.zIndex="300";
                if (index=== totalRowCount && totalRowCount !== 0) {
                    if (elClassName !== "gor-dropdown-wrapper") {
                        siblingEl=el.parentNode.nextSibling;
                    }
                    else {
                        siblingEl=el.nextSibling;
                    }
                    if(siblingEl){
                        siblingEl.style.bottom='100%';
                        siblingEl.style.top='initial';
                    }

                }
                break;
            }
            else {
                parentEl=parentEl.parentNode;
            }
        }
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setState(({columnWidths})=> ({
            columnWidths: {
                ...columnWidths,
                [columnKey]: newColumnWidth,
            }
        }));
    }

    _onFilterChange(e) {
        var filterField=["operatingMode", "id", "status", "performance", "operatorAssigned"], newData;
        if (e.target && !e.target.value) {
            this.props.updateSortedDataList(this._dataList)
            this.setState({
                sortedDataList: this._dataList,
            });
        }
        if (e.target && (e.target.value || e.target.value=== "")) {
            var captureValue=e.target.value;
            newData=new DataListWrapper(filterIndex(e, this.state.sortedDataList, filterField), this._dataList)
            this.props.updateSortedDataList(newData)
            this.setState({
                sortedDataList: newData
            }, function () {
                this.props.setPpsFilter(captureValue);
                if (this.props.items && this.props.items.length) {
                    this._onSortChange(this.props.currentSortState, this.props.currentHeaderOrder);
                }
            })
        }

        else {
            newData=new DataListWrapper(filterIndex(e, this.state.sortedDataList, filterField), this._dataList);
            this.props.updateSortedDataList(newData)
            this.setState({
                sortedDataList: newData
            }, function () {
                if (this.props.items && this.props.items.length) {
                    this._onSortChange(this.props.currentSortState, this.props.currentHeaderOrder);
                }
            })
        }
    }

    handleChange(columnKey, rowIndex, evt) {
        var checkedPPS = JSON.parse(JSON.stringify(this.props.checkedPps));
        var sortedDataList = this.state.sortedDataList;
        var selectedData =  sortedDataList._data ? 
                                sortedDataList._data.newData[sortedDataList._indexMap[rowIndex]]:
                                sortedDataList.newData[rowIndex];
        if(evt.target.checked){
            checkedPPS[selectedData[columnKey]]=selectedData;
        }
        else{
            delete checkedPPS[selectedData[columnKey]];
        }

       
        this.props.setCheckedPps(checkedPPS)
        this.props.renderDdrop(Object.keys(checkedPPS).length ? true :false);
    }


    _onSortChange(columnKey, sortDir) {
        if (!columnKey) {
            columnKey="id"
        }

        if (columnKey=== GOR_STATUS) {
            columnKey=GOR_STATUS_PRIORITY;
        }
        var sortIndexes=this._defaultSortIndexes.slice();
        if (this.state.sortedDataList._indexMap) {
            sortIndexes=this.state.sortedDataList._indexMap.slice();
        }
        this.props.updateSortedDataList(new DataListWrapper(sortData(columnKey, sortDir, sortIndexes, this._dataList), this._dataList))
        this.setState({
            sortedDataList: new DataListWrapper(sortData(columnKey, sortDir, sortIndexes, this._dataList), this._dataList),
            colSortDirs: {
                [columnKey]: sortDir,
            },
        });
        this.props.sortHeaderOrder(sortDir);
        this.props.sortHeaderState(columnKey);
    }

    headerCheckChange(evt) {
        var isChecked = evt.target.checked;
        this.setState({
            headerChecked: !this.state.headerChecked
        },function(){
           var checkedPPS = JSON.parse(JSON.stringify(this.props.checkedPps));
            if(isChecked){
                for(let i=0,len = this.props.items.length ;i < len ; i++){
                    checkedPPS[this.props.items[i]["ppsId"]]=this.props.items[i];
                }
                
            }
            else{
                 checkedPPS={};
            }

       
        this.props.setCheckedPps(checkedPPS)
        this.props.renderDdrop(Object.keys(checkedPPS).length ? true :false); 
        })
        
    }

    render() {
        let updateStatusIntl="";
        let {sortedDataList, colSortDirs, columnWidths, headerChecked}=this.state,
            checkedPPS=[];
        let checkState=this.handleChange.bind(this);
        let ppsTotal=sortedDataList.getSize();
        let pick=this.props.operationMode.pick;
        let put=this.props.operationMode.put;
        let audit=this.props.operationMode.audit;
        let notSet=this.props.operationMode.notSet;
        let operatorNum=this.props.operatorNum, j=1;
        let ppsOnState=this.props.ppsOnState;
        let avgThroughput=this.props.avgThroughput;
        let containerHeight=this.props.containerHeight;
        let noData=<div/>;
        if (ppsTotal=== 0 || ppsTotal=== undefined || ppsTotal=== null) {
            noData=<div className="gor-no-data"><FormattedMessage id="PPStable.table.noData"
                                                                    description="No data message for PPStable"
                                                                    defaultMessage="No PPS Found"/></div>
            containerHeight=GOR_TABLE_HEADER_HEIGHT;
        }

        let checkedStatePps=[];
        if (this.props.checkedPps) {
            checkedStatePps=this.props.checkedPps;
        }

        return (
            <div className="gorTableMainContainer pps-table">
                <Table
                    rowHeight={50}
                    rowsCount={sortedDataList.getSize()}
                    headerHeight={70}
                    onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                    isColumnResizing={false}
                    width={this.props.containerWidth}
                    height={containerHeight}
                    onRowClick={this._handleOnClickDropdown.bind(this)}
                    {...this.props}>
                    <Column
                        columnKey="id"
                        header={
                            <div>
                                <div className="gor-header-check">
                                    <input type="checkbox" checked={headerChecked}
                                           onChange={this.headerCheckChange.bind(this)}/>
                                </div>
                                <div className="gor-header-id">
                                    <SortHeaderCell onSortChange={this._onSortChange}
                                                    sortDir={colSortDirs.id}>
                                        <div className="gorToolHeaderEl">
                                            <FormattedMessage id="PPStable.ppsColumn.heading"
                                                              description='PPS - column Heading'
                                                              defaultMessage='PPS'/>
                                            <div className="gorToolHeaderSubText">
                                                <FormattedMessage id="PPStable.Subpps" description='sub pps'
                                                                  defaultMessage='Total: {ppsTotal}'
                                                                  values={{ppsTotal: ppsTotal ? ppsTotal : '0'}}/>
                                            </div>
                                        </div>
                                    </SortHeaderCell>
                                </div>
                            </div>
                        }
                        cell={  <PPSComponentCell checkboxColumn={"ppsId"} data={sortedDataList} checkState={checkState}
                                               checked={checkedStatePps}/>}
                        fixed={true}
                        width={columnWidths.id}
                        isResizable={true}
                    />
                    <Column
                        columnKey="status"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}

                                            sortDir={colSortDirs.statusPriority}>

                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="PPS.table.status" description="Status for PPS"
                                                      defaultMessage="STATUS"/>

                                    <div className="gor-subStatus-online">
                                        <div >
                                            <FormattedMessage id="PPStable.status" description='status for PPS table'
                                                              defaultMessage='{ppsOnState} Open'
                                                              values={{ppsOnState: ppsOnState ? ppsOnState : '0'}}/>
                                        </div>
                                    </div>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<StatusCell data={sortedDataList} statusKey="statusClass"></StatusCell>}
                        fixed={true}
                        width={columnWidths.status}
                        isResizable={true}
                    />
                    <Column
                        columnKey="operatingMode"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.operatingMode}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="PPS.table.operatingMode" description="operatingMode for PPS"
                                                      defaultMessage="CURRENT MODE"/>
                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="PPStable.ppsState" description='pps state for PPStable'
                                                          defaultMessage='Pick ({pick}) . Put ({put}) . Audit ({audit}) . Not set ({notSet})'
                                                          values={{
                                                              pick: pick ? pick : '0',
                                                              put: put ? put : '0',
                                                              audit: audit ? audit : '0',
                                                              notSet: notSet ? notSet : '0'
                                                          }}/>

                                    </div>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell data={sortedDataList}  childrenClass="requestedModeTxt" childColumnKey="pps_requested_mode" classKey={"operatingModeClass"}>
                                <span ><FormattedMessage id="PPStable.requestedMode.text" description='PPStable.requestedMode.text'
                                                          defaultMessage='Requested Mode: '
                                                          /></span>
                                </TextCell>}
                        fixed={true}
                        width={columnWidths.operatingMode}
                        isResizable={true}
                    />
                     <Column
                        columnKey="requested_status"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.operatingMode}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="PPS.table.requestedStatus" description="Requested status for PPS"
                                                      defaultMessage="REQUESTED STATUS"/>
                              
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell data={sortedDataList} classKey={"operatingModeClass"}/>}
                        fixed={true}
                        width={columnWidths.operatingMode}
                        isResizable={true}
                    />
                    <Column
                        columnKey="performance"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.performance}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="PPS.table.performance"
                                                      description="performance Status for PPS"
                                                      defaultMessage="PERFORMANCE"/>
                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="PPStable.avgThroughput"
                                                          description='avgThroughput for PPStable'
                                                          defaultMessage='Avg {avgThroughput} items/hr'
                                                          values={{avgThroughput: avgThroughput ? avgThroughput : "0"}}/>
                                    </div>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell data={sortedDataList}/>}
                        fixed={true}
                        width={columnWidths.performance}
                        isResizable={true}
                    />
                    <Column
                        columnKey="operatorAssigned"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.operatorAssigned}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="PPS.table.operatorAssigned"
                                                      description="operatorAssigned for PPS"
                                                      defaultMessage="OPERATOR ASSIGNED"/>
                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="PPStable.totalOperator"
                                                          description='totalOperator for PPStable'
                                                          defaultMessage='{operatorNum} operators'
                                                          values={{operatorNum: operatorNum ? operatorNum : '0'}}/>
                                    </div>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell data={sortedDataList}/>}
                        fixed={true}
                        width={columnWidths.operatorAssigned}
                        isResizable={true}
                    />
                    <Column
                        columnKey="profiles"
                        header={
                            <Cell>
                            <div className="gorToolHeaderEl">
                            <FormattedMessage id="PPS.table.profiles"
                            description="profiles for PPS"
                            defaultMessage="PROFILES USED"/>
                            <div className="gorToolHeaderSubText">

                            </div>
                            </div>
                            </Cell>
                        }
                        cell={<ActionCellPPS confirmApplyProfile={this.confirmApplyProfileChanges.bind(this)} data={sortedDataList}/>}
                        fixed={true}
                        width={columnWidths.profiles}
                        isResizable={true}
                    />
                </Table>
                <div > {noData} </div>
            </div>
        );
    }
}

PPStable.PropTypes={
    items: React.PropTypes.array,
    containerWidth: React.PropTypes.number,
    itemNumber: React.PropTypes.number,
    currentHeaderOrder: React.PropTypes.object,
    sortHeaderState: React.PropTypes.func,
    lastUpdatedText: React.PropTypes.string,
    showFilter: React.PropTypes.bool,
    lastUpdated: React.PropTypes.string,
    ppsFilterState: React.PropTypes.bool,
    setFilter: React.PropTypes.func,
    containerHeight: React.PropTypes.number,
    currentSortState: React.PropTypes.string,
    responseFlag: React.PropTypes.bool,
    getCheckAll: React.PropTypes.bool
};


export default Dimensions()(PPStable);