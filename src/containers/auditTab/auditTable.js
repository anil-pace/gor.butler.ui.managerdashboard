import React from 'react';
import {Table, Column} from 'fixed-data-table';
import Dimensions from 'react-dimensions'
import {FormattedMessage} from 'react-intl';

import {
    SortHeaderCell,
    tableRenderer,
    TextCell,
    AuditStatusCell,
    ProgressCell,
    ActionCellAudit,
    ToolTipCell,AuditIssuesTooltipCell
} from '../../components/commonFunctionsDataTable';
import {modal} from 'react-redux-modal';

import StartAudit from './startAudit';
import DeleteAudit from './deleteAudit';
import DuplicateAudit from './duplicateAudit';
import ResolveAudit from './resolveAudit';
import {
    GOR_TABLE_HEADER_HEIGHT,
    GOR_AUDIT_RESOLVE_MIN_HEIGHT,
    GOR_USER_TABLE_HEADER_HEIGHT,
    GOR_AUDIT_TABLE_HEIGHT_CORRECTION
} from '../../constants/frontEndConstants';
import {defineMessages} from 'react-intl';

const messages=defineMessages({
    auditPlaceholder: {
        id: 'audit.placeholder',
        description: 'audit dropdown placeholder',
        defaultMessage: "Manage Tasks",
    }
});


class AuditTable extends React.Component {
    constructor(props) {
        super(props);
        this.tableState(this.props, this);
        this._onColumnResizeEndCallback=this._onColumnResizeEndCallback.bind(this);
        this.backendSort=this.backendSort.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        this.tableState(nextProps, this);
    }


    shouldComponentUpdate(nextProps) {
        if(this.props.items  && nextProps.items.length===0) {
            return false;
        }
        return true;
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
        if (elClassName !== "gor-dropdown-wrapper" && elClassName !== "gor-dropdown" && elClassName!=='gor-audit-info-icon'  && elClassName!=="gor-tool-tip-hover") {
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
                    siblingEl.style.bottom='100%';
                    siblingEl.style.top='initial';
                }
                break;
            }
            else {
                parentEl=parentEl.parentNode;
            }
        }
    }

    tableState(nProps, current) {
        var items=nProps.items || [];
        current._dataList=new tableRenderer(items ? items.length : 0);
        current._defaultSortIndexes=[];
        current._dataList.newData=items;
        var size=current._dataList.getSize(), sortIndex={};
        for (var index=0; index < size; index++) {
            current._defaultSortIndexes.push(index);
        }
        if (nProps.currentHeaderOrder.colSortDirs) {
            sortIndex=nProps.currentHeaderOrder.colSortDirs;
        }
        if (!nProps.checkedAudit && current.items) {
            //var initialCheckState=new Array(nextProps.items.length).fill(false);
            this.props.setCheckedAudit({})
        }
        current.state={
            sortedDataList: current._dataList,
            colSortDirs: sortIndex,
            columnWidths: {
                display_id: nProps.containerWidth * 0.09,
                auditTypeValue: nProps.containerWidth * 0.12,
                status: nProps.containerWidth * 0.11,
                startTime: nProps.containerWidth * 0.13,
                progress: nProps.containerWidth * 0.17,
                completedTime: nProps.containerWidth * 0.13,
                actions: nProps.containerWidth * 0.25
            },
            headerChecked: false,
            isChecked: nProps.checkedAudit
        };
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setState(({columnWidths})=> ({
            columnWidths: {
                ...columnWidths,
                [columnKey]: newColumnWidth,
            }
        }));
    }


    backendSort(columnKey, sortDir) {
        var data={"columnKey": columnKey, "sortDir": sortDir}
        this.props.sortHeaderOrder({
            colSortDirs: {[columnKey]: sortDir},
        })
        this.props.sortHeaderState(columnKey);
        this.props.onSortChange(data);
    }





    startAudit(columnKey, rowIndex) {
        var auditId=[];
        if (this.state.sortedDataList.newData[rowIndex]) {
            auditId.push(this.state.sortedDataList.newData[rowIndex].id)
        }
        modal.add(StartAudit, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true,
            auditId: auditId
        });
    }

    resolveAudit(columnKey, rowIndex, screenId) {
        var auditId, auditType, displayId, auditMethod;
        if (this.state.sortedDataList.newData[rowIndex]) {
            auditId=this.state.sortedDataList.newData[rowIndex].id;
            auditType=this.state.sortedDataList.newData[rowIndex].auditTypeValue;
            displayId=this.state.sortedDataList.newData[rowIndex].display_id;
            auditMethod=this.state.sortedDataList.newData[rowIndex].auditType;
        }
        modal.add(ResolveAudit, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true,
            auditId: auditId,
            screenId: screenId,
            auditType: auditType,
            displayId: displayId,
            auditMethod: auditMethod
        });
    }

      handleChange(columnKey, rowIndex, evt) {
        var checkedAudit = JSON.parse(JSON.stringify(this.props.checkedAudit));
        var sortedDataList = this.state.sortedDataList;
        var selectedData =  sortedDataList._data ? 
                                sortedDataList._data.newData[sortedDataList._indexMap[rowIndex]]:
                                sortedDataList.newData[rowIndex];
        if(evt.target.checked){
            checkedAudit[selectedData[columnKey]]=selectedData;
        }
        else{
            delete checkedAudit[selectedData[columnKey]];
        }

       
        this.props.setCheckedAudit(checkedAudit)
        //this.props.renderDdrop(Object.keys(checkedAudit).length ? true :false);
    }

    manageAuditTask(rowIndex, option) {
        if (option.value=== "duplicateTask") {
            var auditType, auditComplete, auditTypeParam, auditPdfaValue;
            if (this.state.sortedDataList.newData[rowIndex]) {
                auditType=this.state.sortedDataList.newData[rowIndex].auditType;
                auditTypeParam=this.state.sortedDataList.newData[rowIndex].auditValue;
                auditComplete=this.state.sortedDataList.newData[rowIndex].auditTypeValue;
                if (this.state.sortedDataList.newData[rowIndex].pdfaValues) {
                    auditPdfaValue=this.state.sortedDataList.newData[rowIndex].pdfaValues;
                }
            }

            modal.add(DuplicateAudit, {
                title: '',
                size: 'large', // large, medium or small,
                closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
                hideCloseButton: true,
                auditType: auditType,
                auditTypeParam: auditTypeParam,
                auditComplete: auditComplete,
                auditPdfaValue: auditPdfaValue
            });

        }
        else if (option.value=== "deleteRecord") {
            var auditId;
            if (this.state.sortedDataList.newData[rowIndex]) {
                auditId=this.state.sortedDataList.newData[rowIndex].id;
            }
            modal.add(DeleteAudit, {
                title: '',
                size: 'large', // large, medium or small,
                closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
                hideCloseButton: true,
                auditId: auditId,
                auditComplete: auditComplete
            });
        }else if(option.value==='cancelTask'){
            this.props.cancelAudit(this.state.sortedDataList.newData[rowIndex].id)

        }
    }



    _showAllAudit() {
        var clearFilter=[]
        this.props.refreshData(clearFilter);
    }
//Render function for Audit Table
    render() {

        var {sortedDataList, colSortDirs, columnWidths}=this.state, heightRes;
        var auditCompleted=this.props.auditState.auditCompleted;
        var auditIssue=this.props.auditState.auditIssue;
        var locationAudit=this.props.auditState.locationAudit;
        var skuAudit=this.props.auditState.skuAudit;
        var totalProgress=this.props.auditState.totalProgress;
        var rowsCount=sortedDataList.getSize();
        var headerChecked=false;
        let checkState=this.handleChange.bind(this);
        let checkedStatePps=[];
        if (this.props.checkedAudit) {
            checkedStatePps=this.props.checkedAudit;
        }
        var headerAlert=<div className="alertState">

            <div className="table-subtab-alert-icon"/>
            <div className="gor-inline"><FormattedMessage id="auditList.alert.lable"
                                                          description='audit list alert lable'
                                                          defaultMessage='{auditIssue} {auditIssue,plural, one{Alert} other{Alerts}}'
                                                          values={{auditIssue: auditIssue ? auditIssue : '0'}}/></div>

        </div>

        var noData=<div/>;
        if (rowsCount=== 0 || rowsCount=== undefined || rowsCount=== null) {
            noData=<div className="gor-no-data"><FormattedMessage id="audit.table.noData"
                                                                    description="No data message for audit table"
                                                                    defaultMessage="No Audit Task Found"/></div>
            heightRes=GOR_TABLE_HEADER_HEIGHT;
        }
        else {
            heightRes=Math.max(GOR_USER_TABLE_HEADER_HEIGHT * rowsCount + GOR_AUDIT_TABLE_HEIGHT_CORRECTION, screen.height - GOR_AUDIT_TABLE_HEIGHT_CORRECTION);
        }

        var tableRenderer=<div/>
        tableRenderer=<div className="gorTableMainContainer">

            <Table
                rowHeight={50}
                rowsCount={rowsCount}
                headerHeight={70}
                onRowClick={this._handleOnClickDropdown.bind(this)}
                onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                isColumnResizing={false}
                width={this.props.containerWidth}
                height={heightRes}
                {...this.props}>
                <Column
                    columnKey="display_id"
                    header={
                        <div>
                        <div className="gor-header-check">
                                    <input type="checkbox" checked={headerChecked}/>
                                </div>
                        <SortHeaderCell onSortChange={this.backendSort}
                                        sortDir={colSortDirs.display_id}>
                            <div className="gorToolHeaderEl">
                                <FormattedMessage id="auditTable.stationID.heading"
                                                  description='Heading for audit ID for auditTable'
                                                  defaultMessage='AUDIT ID'/>
                                <div className="gorToolHeaderSubText">
                                    <FormattedMessage id="auditTable.SubAuditID"
                                                      description='total Sub auditID for auditTable'
                                                      defaultMessage='Total:{rowsCount}'
                                                      values={{rowsCount: this.props.totalAudits ? this.props.totalAudits : '0'}}/>
                                </div>
                            </div>
                        </SortHeaderCell>
                        </div>
                    }
                    cell={<AuditIssuesTooltipCell checkboxColumn={"id"} data={sortedDataList} callBack={this._handleOnClickDropdown.bind(this)} resolved="resolvedTask" data={sortedDataList} checkState={checkState}
                                               checked={checkedStatePps} unresolved="unresolvedTask"/>}
                    fixed={true}
                    width={columnWidths.display_id}
                    isResizable={true}
                />

                <Column


                    columnKey="auditTypeValue"
                    header={
                        <div className="gor-table-header">
                            <div className="gorToolHeaderEl">
                                <FormattedMessage id="audit.table.type" description="audit type for audit table"
                                                  defaultMessage="AUDIT TYPE"/>
                                <div className="gorToolHeaderSubText">
                                    <FormattedMessage id="audit.auditType" description='audit type for audit table'
                                                      defaultMessage='SKU ({sku}) . Location ({location})'
                                                      values={{
                                                          sku: skuAudit ? skuAudit : '0',
                                                          location: locationAudit ? locationAudit : '0'
                                                      }}/>
                                </div>
                            </div>
                        </div>
                    }
                    cell={<ToolTipCell data={sortedDataList} callBack={this._handleOnClickDropdown.bind(this)}
                                       tooltipData="pdfaValues"></ToolTipCell>}
                    fixed={true}
                    width={columnWidths.auditTypeValue}
                    isResizable={true}
                />
                <Column
                    columnKey="status"
                    header={
                        <SortHeaderCell onSortChange={this.backendSort}
                                        sortDir={colSortDirs.status}>
                            <div className="gorToolHeaderEl">

                                <FormattedMessage id="audit.table.STATUS" description="STATUS for audit"
                                                  defaultMessage="STATUS"/>
                                {auditIssue ? headerAlert :
                                    <div className="gor-subStatus-online">
                                        <div>
                                            <FormattedMessage id="auditTable.status"
                                                              description='status completed audit'
                                                              defaultMessage='{auditCompleted} Completed'
                                                              values={{auditCompleted: auditCompleted ? auditCompleted : '0'}}/>
                                        </div>
                                    </div>}
                            </div>
                        </SortHeaderCell>
                    }
                    cell={<AuditStatusCell data={sortedDataList} statusKey="statusClass" descriptionKey="cancelling"></AuditStatusCell>}
                    fixed={true}
                    width={columnWidths.status}
                    isResizable={true}
                />

                <Column
                    columnKey="startTime"
                    header={
                        <SortHeaderCell onSortChange={this.backendSort}
                                        sortDir={colSortDirs.startTime}>
                            <div className="gorToolHeaderEl">
                                <FormattedMessage id="audit.table.startTime" description="startTime for audit"
                                                  defaultMessage="START TIME"/>
                                <div className="gorToolHeaderSubText">

                                </div>
                            </div>
                        </SortHeaderCell>
                    }
                    cell={<TextCell style={{textTransform: 'capitalize'}} data={sortedDataList}/>}
                    fixed={true}
                    width={columnWidths.startTime}
                    isResizable={true}
                />
                <Column
                    columnKey="progress"
                    header={
                        <div className="gor-table-header">
                            <div className="gorToolHeaderEl">
                                <FormattedMessage id="audit.table.progress" description="progress for audit task"
                                                  defaultMessage="PROGRESS(%)"/>
                                <div className="gorToolHeaderSubText">
                                    <FormattedMessage id="audit.Totalprogress"
                                                      description='total progress for audit table'
                                                      defaultMessage='{totalProgress}% Completed'
                                                      values={{totalProgress: totalProgress.toFixed(1) ? totalProgress.toFixed(1) : '0'}}/>
                                </div>
                            </div>
                        </div>
                    }
                    cell={<ProgressCell data={sortedDataList} resolved="resolvedTask"
                                        unresolved="unresolvedTask"> </ProgressCell>}
                    fixed={true}
                    width={columnWidths.progress}
                    isResizable={true}
                />

                <Column
                    columnKey="completedTime"
                    header={
                        <SortHeaderCell onSortChange={this.backendSort}
                                        sortDir={colSortDirs.completedTime}>
                            <div className="gorToolHeaderEl">
                                <FormattedMessage id="audit.table.timeCompleted" description="timeCompleted for audit"
                                                  defaultMessage="TIME COMPLETED"/>
                                <div className="gorToolHeaderSubText">
                                    {this.props.timeZoneString}
                                </div>
                            </div>
                        </SortHeaderCell>
                    }
                    cell={<TextCell style={{textTransform: 'capitalize'}} data={sortedDataList}/>}
                    fixed={true}
                    width={columnWidths.completedTime}
                    isResizable={true}
                />

                <Column
                    columnKey="actions"
                    header={
                        <div className="gor-table-header">
                            <div className="gorToolHeaderEl">
                                <FormattedMessage id="audit.table.action" description="action Column"
                                                  defaultMessage="ACTIONS"/>
                                <div className="gorToolHeaderSubText"></div>
                            </div>
                        </div>
                    }
                    cell={<ActionCellAudit data={sortedDataList} handleAudit={this.startAudit.bind(this)}
                                           manageAuditTask={this.manageAuditTask.bind(this)} showBox="startAudit"

                                           placeholderText={this.context.intl.formatMessage(messages.auditPlaceholder)}
                                           resolveflag="resolveAudit" resolveAudit={this.resolveAudit.bind(this)}
                                           checkIssues="viewIssues"
                    />}
                    width={columnWidths.actions}

                />

            </Table>
            <div> {noData} </div>
        </div>


        return (
            <div> {tableRenderer} </div>
        );
    }
}


AuditTable.contextTypes={
    intl: React.PropTypes.object.isRequired
}

AuditTable.PropTypes={
    items: React.PropTypes.array,
    sortHeaderOrder: React.PropTypes.func,
    sortHeaderState: React.PropTypes.func,
    refreshData: React.PropTypes.func,
    setFilter: React.PropTypes.func,
    auditState: React.PropTypes.object,
    showFilter: React.PropTypes.bool,
    isFilterApplied: React.PropTypes.bool,
    responseFlag: React.PropTypes.bool,
    containerWidth: React.PropTypes.number,
    totalAudits: React.PropTypes.number
};


export default (Dimensions()(AuditTable));
