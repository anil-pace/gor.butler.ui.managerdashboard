import React from 'react';
import ReactDOM  from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {currentTableState} from '../../actions/tableDataAction'
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData, ProgressCell,ActionCellAudit} from '../../components/commonFunctionsDataTable';
import {modal} from 'react-redux-modal';
import CreateAudit from './createAudit';
import StartAudit from './startAudit';
import DeleteAudit from './deleteAudit';
import DuplicateAudit from './duplicateAudit';
import ResolveAudit from './resolveAudit';
import {GOR_STATUS,GOR_STATUS_PRIORITY, GOR_TABLE_HEADER_HEIGHT,DEBOUNCE_TIMER,AUDIT_RESOLVE_LINES,GET,APP_JSON} from '../../constants/frontEndConstants';
import { defineMessages } from 'react-intl';
import {debounce} from '../../utilities/debounce';
import {getAuditOrderLines} from '../../actions/auditActions';
import {AUDIT_URL, PENDING_ORDERLINES} from '../../constants/configConstants';

const messages = defineMessages({
    auditPlaceholder: {
        id: 'audit.placeholder',
        description: 'audit dropdown placeholder',
        defaultMessage: "Manage Tasks",
    }
});


class AuditTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableState(this.props,this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    this.backendSort = this.backendSort.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    this.tableState(nextProps,this);
  }

  componentDidMount() {
    this.props.currentTableState(this.tableState(this.props, this));    
  }  
  /**
   * Hack for fixing the bug https://work.greyorange.com/jira/browse/BSS-656
   * This has to be removed once we get rid of the fixedDataTable
   * @param  {Number} rowIndex rowindex on which the click was initiated
   */
   _handleOnClickDropdown(rowIndex) {
    if (rowIndex.constructor === Number && rowIndex >= 0){    
      var domArray = document.querySelectorAll('.fixedDataTableRowLayout_rowWrapper');
      // since the last drop down menu does not have the space to show the menu below it
      // hence it has to be put on top
      var lastDownMenu = document
                          .querySelector('.fixedDataTableRowLayout_rowWrapper:last-child .Dropdown-menu');

      if (lastDownMenu){
        lastDownMenu.style.bottom = '100%';
        lastDownMenu.style.top = 'initial';
      }
      var firstDropDownMenu = document
                          .querySelector('.fixedDataTableRowLayout_rowWrapper:nth-child(1) .Dropdown-menu');
      if (firstDropDownMenu){
        firstDropDownMenu.style.bottom = 'initial';
      }

      //** fix for issue reported in JIRA -BSS-739
      //The first child is the edge case ofr the dropdowns, where it should appear down but appears on the top
      // hence this fix.
      var firstDownMenu = document
                          .querySelector('.fixedDataTableRowLayout_rowWrapper:nth-child(1) .Dropdown-menu');
      if (firstDownMenu) {
        firstDownMenu.style.bottom = 'initial';
      }



      let DOMObj = domArray[rowIndex+1];
      DOMObj.style.zIndex = "30";
      for(var i = domArray.length-1; i>=0;i--){
        if (domArray[i] !== DOMObj){
          domArray[i].style.zIndex = "2";
        }
      }
    }
  }

  tableState(nProps, current) {
    var items = nProps.items || [];
    current._dataList = new tableRenderer(items ? items.length : 0);
    current._defaultSortIndexes = [];
    current._dataList.newData=items;
    var size = current._dataList.getSize(),sortIndex={};
    for (var index = 0; index < size; index++) {
      current._defaultSortIndexes.push(index);
    }
    if(nProps.currentHeaderOrder.colSortDirs) {
      sortIndex = nProps.currentHeaderOrder.colSortDirs;
    }
    var tableData = {sortedDataList: current._dataList,
      colSortDirs: sortIndex,
      columnWidths: {
        display_id: nProps.containerWidth*0.09,
        auditTypeValue: nProps.containerWidth*0.14,
        status: nProps.containerWidth*0.1,
        startTime: nProps.containerWidth*0.14,
        progress: nProps.containerWidth*0.13,
        completedTime: nProps.containerWidth*0.15,
        actions: nProps.containerWidth*0.25
      }};
      return tableData;
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
      this.setState(({columnWidths}) => ({
        columnWidths: {
          ...columnWidths,
          [columnKey]: newColumnWidth,
        }
      }));
    }
    _onFilterChange(e) {
      var data={"type":"searchOrder", "captureValue":"", "selected":0 },debounceFilter;
      if(e.target && (e.target.value || e.target.value === "")) {
        data["captureValue"] = e.target.value;
        this.props.setAuditFilter(e.target.value);
      }
      else {
        data["captureValue"] = e;
      }
      this.props.setAuditFilter(e.target.value)
      debounceFilter = debounce(this.props.refreshData, DEBOUNCE_TIMER);
      debounceFilter(data);
    }


    _onSortChange(columnKey, sortDir) {
      if(columnKey === GOR_STATUS) {
      columnKey = GOR_STATUS_PRIORITY;
    }
      var sortIndexes = this._defaultSortIndexes.slice();
      var tableData={
        sortedDataList: new DataListWrapper(sortData(columnKey, sortDir,sortIndexes,this._dataList), this._dataList),
        colSortDirs: {[columnKey]: sortDir,},
        columnWidths: this.props.tableData.columnWidths,
      };

      this.props.currentTableState(tableData)
    }

   backendSort(columnKey, sortDir) {
    var data={"columnKey":columnKey, "sortDir":sortDir, selected:0}
    var tableData={
        sortedDataList: this.props.tableData.sortedDataList,
        colSortDirs: {[columnKey]: sortDir,},
        columnWidths: this.props.tableData.columnWidths,
      };
      this.props.currentTableState(tableData);
      this.props.sortHeaderState(columnKey);
      this.props.refreshData(data);
  }


    createAudit() { 
      modal.add(CreateAudit, {
        title: '',
        size: 'large', 
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true // (optional) if you don't wanna show the top right close button
      //.. all what you put in here you will get access in the modal props ;),
    });

    }


    startAudit(columnKey,rowIndex) {
      var auditId = [], sortedIndex;
      if(this.props.tableData.sortedDataList._data !== undefined) {
        sortedIndex = this.props.tableData.sortedDataList._indexMap[rowIndex];
        auditId.push(this.props.tableData.sortedDataList._data.newData[sortedIndex].id);
      }
      else {
        auditId.push(this.props.items[rowIndex].id);
      }
      modal.add(StartAudit, {
        title: '',
        size: 'large', // large, medium or small,
        closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
        hideCloseButton: true,
        auditId:auditId
      });
    }

    resolveAudit(columnKey,rowIndex) {
        var auditId;
        if(this.props.tableData.sortedDataList._data !== undefined) {
          sortedIndex = this.props.tableData.sortedDataList._indexMap[rowIndex];
          auditId = this.props.tableData.sortedDataList._data.newData[sortedIndex].id;
        }
        else {
          auditId = this.props.items[rowIndex].id;
        }
    
         modal.add(ResolveAudit, {
        title: '',
        size: 'large', // large, medium or small,
        closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
        hideCloseButton: true,
        auditId:auditId
      });
    }

    manageAuditTask(rowIndex,option ){
      if(option.value === "duplicateTask"){
        var auditType, auditTypeValue, auditComplete,auditTypeParam,sortedIndex;


        if(this.props.tableData.sortedDataList._data !== undefined) {
          sortedIndex = this.props.tableData.sortedDataList._indexMap[rowIndex];
          auditType = this.props.tableData.sortedDataList._data.newData[sortedIndex].auditType;
          auditTypeParam = this.props.tableData.sortedDataList._data.newData[sortedIndex].auditValue;
          auditComplete = this.props.tableData.sortedDataList._data.newData[sortedIndex].auditTypeValue;
        }
        else {
          auditType = this.props.items[rowIndex].auditType;
          auditTypeParam = this.props.items[rowIndex].auditValue;
          auditComplete = this.props.items[rowIndex].auditTypeValue;
        }

        modal.add(DuplicateAudit, {
          title: '',
      size: 'large', // large, medium or small,
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true,
      auditType:auditType,
      auditTypeParam:auditTypeParam,
      auditComplete:auditComplete
    });

      }
      else if(option.value === "deleteRecord"){
        var auditId;
        if(this.props.tableData.sortedDataList._data !== undefined) {
          sortedIndex = this.props.tableData.sortedDataList._indexMap[rowIndex];
          auditId = this.props.tableData.sortedDataList._data.newData[sortedIndex].id;
        }
        else {
          auditId = this.props.items[rowIndex].id;
        }
        modal.add(DeleteAudit, {
          title: '',
      size: 'large', // large, medium or small,
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true,
      auditId:auditId,
      auditComplete:auditComplete
    });
      }
    }


    render() {
      var sortedDataList = this._dataList, heightRes;
      if(this.props.tableData.sortedDataList !== undefined && this.props.tableData.sortedDataList._data !== undefined) {
        sortedDataList = this.props.tableData.sortedDataList;
      }
      var colSortDirs = this.props.tableData.colSortDirs;
      var columnWidths = this.props.tableData.columnWidths;
      var auditCompleted = this.props.auditState.auditCompleted;
      var locationAudit = this.props.auditState.locationAudit;
      var skuAudit = this.props.auditState.skuAudit;
      var totalProgress = this.props.auditState.totalProgress;
      var rowsCount = sortedDataList.getSize();
      var duplicateTask = <FormattedMessage id="audit.table.duplicateTask" description="duplicateTask option for audit" defaultMessage ="Duplicate task"/>; 
      var deleteRecord = <FormattedMessage id="audit.table.deleteRecord" description="deleteRecord option for audit" defaultMessage ="Delete record"/>; 
      const tasks = [
      { value: 'duplicateTask', label: duplicateTask },
      { value: 'deleteRecord', label: deleteRecord }
      ];
      if(this.props.containerHeight !== 0) {
        heightRes = this.props.containerHeight;
      }
      var noData = <div/>;
     if(rowsCount === 0 || rowsCount === undefined || rowsCount === null) {
        noData =  <div className="gor-no-data"> <FormattedMessage id="audit.table.noData" description="No data message for audit table" 
        defaultMessage ="No Audit Task Found"/> </div>
        heightRes = GOR_TABLE_HEADER_HEIGHT;
      }

      var tableRenderer = <div/>
      if(this.props.tableData.length !== 0) {
       tableRenderer = <div className="gorTableMainContainer">
       <div className="gorToolBar">
       <div className="gorToolBarWrap">
       <div className="gorToolBarElements">
       <FormattedMessage id="audit.table.heading" description="Heading for audit table" 
       defaultMessage ="Audit Tasks"/>
       </div>
       <div className="gor-button-wrap">
       <button className="gor-auditCreate-btn" onClick={this.createAudit.bind(this)} >

       <FormattedMessage id="audit.table.buttonLable" description="button label for audit create" 
       defaultMessage ="Create New Task"/>
       </button>
       </div>
       </div>
       <div className="filterWrapper">  
       <div className="gorFilter">
       <div className="searchbox-magnifying-glass-icon"/>
       <input className="gorInputFilter"
       onChange={this._onFilterChange}
       placeholder={this.props.intlMessg["table.filter.placeholder"]}>
       </input>
       </div>
       </div>
       </div>

       <Table 
       rowHeight={50}
       rowsCount={rowsCount}
       headerHeight={70}
       onColumnResizeEndCallback={this._onColumnResizeEndCallback}
       isColumnResizing={false}
       width={this.props.containerWidth}
       height={heightRes*0.9}
       {...this.props}>
       <Column
       columnKey="display_id"
       header={
        <SortHeaderCell onSortChange={this.backendSort}
        sortDir={colSortDirs.display_id}>
        <div className="gorToolHeaderEl">
        <FormattedMessage id="auditTable.stationID.heading" description='Heading for audit ID for auditTable' 
        defaultMessage='AUDIT ID' />
        <div className="gorToolHeaderSubText">
        <FormattedMessage id="auditTable.SubAuditID" description='total Sub auditID for auditTable' 
        defaultMessage='Total:{rowsCount}' 
        values={{rowsCount:this.props.totalAudits?this.props.totalAudits:'0'}}/> 
        </div>
        </div>
        </SortHeaderCell>
      }
      cell={  <TextCell data={sortedDataList}/>}
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
        defaultMessage ="AUDIT TYPE"/>
        <div className="gorToolHeaderSubText">
                <FormattedMessage id="audit.auditType" description='audit type for audit table' 
                defaultMessage='SKU ({sku}) . Location ({location})' 
                values={{sku: skuAudit?skuAudit:'0', location:locationAudit?locationAudit:'0'}}/>
              </div>
        </div>
        </div>
      }
      cell={<TextCell data={sortedDataList} ></TextCell>}
      fixed={true}
      width={columnWidths.auditTypeValue}
      isResizable={true}
      />
      <Column
      columnKey="status"
      header={
       <div className="gor-table-header">
         <div className="gorToolHeaderEl"> 

        <FormattedMessage id="audit.table.STATUS" description="STATUS for audit" 
        defaultMessage ="STATUS"/>
        
       <div className="gor-subStatus-online">
                  <div >  
                    <FormattedMessage id="auditTable.status" description='status completed audit' 
                defaultMessage='{auditCompleted} Completed' 
                values={{auditCompleted:auditCompleted?auditCompleted:'0'}}/>
                  </div>
                </div>
        </div>
        </div>
      }
      cell={<StatusCell data={sortedDataList} statusKey="statusClass" ></StatusCell>}
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
        defaultMessage ="START TIME"/>
        <div className="gorToolHeaderSubText"> 

        </div>
        </div>
        </SortHeaderCell>
      }
      cell={<TextCell style={{textTransform: 'capitalize'}} data={sortedDataList} />}
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
        defaultMessage ="PROGRESS(%)"/>
        <div className="gorToolHeaderSubText">
                <FormattedMessage id="audit.Totalprogress" description='total progress for audit table' 
                defaultMessage='{totalProgress}% Completed' 
                values={{totalProgress: totalProgress.toFixed(1)?totalProgress.toFixed(1):'0'}}/>
              </div>
        </div>
        </div>
      }
      cell={<ProgressCell data={sortedDataList}  />}
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
        defaultMessage ="TIME COMPLETED"/>
        <div className="gorToolHeaderSubText"> 
        {this.props.timeZoneString}
        </div>
        </div>
        </SortHeaderCell>
      }
      cell={<TextCell style={{textTransform: 'capitalize'}} data={sortedDataList} />}
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
        defaultMessage ="ACTIONS"/> 
        <div className="gorToolHeaderSubText">  </div>
        </div>
        </div>
      }
      cell={<ActionCellAudit data={sortedDataList} handleAudit={this.startAudit.bind(this)} tasks={tasks} 
      manageAuditTask={this.manageAuditTask.bind(this)} showBox="startAudit"
      clickDropDown={this._handleOnClickDropdown.bind(this)}
      placeholderText={this.context.intl.formatMessage(messages.auditPlaceholder)}
      resolveflag="resolveAudit" resolveAudit={this.resolveAudit.bind(this)} 
      checkIssues="viewIssues"
      />}
      width={columnWidths.actions}

      />

      </Table>
      <div> {noData} </div>
      </div>

    }
    return (
    <div> {tableRenderer} </div>
    );
  }
}

function mapStateToProps(state, ownProps){

  return {
    auth_token:state.authLogin.auth_token,
    tableData: state.currentTableState.currentTableState || []
  };
}


var mapDispatchToProps = function(dispatch){
  return {
    currentTableState: function(data){ dispatch(currentTableState(data)); },
    getAuditOrderLines: function(data){dispatch(getAuditOrderLines(data))}
  }
};

AuditTable.contextTypes ={
 intl:React.PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(Dimensions()(AuditTable));
