import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import DropdownTable from '../../components/dropdown/dropdownTable'
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

class AuditTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableState(this.props,this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      this.tableState(nextProps,this);
  }

  componentDidMount() {
      this.props.currentTableState(this.tableState(this.props, this));    
  }

  tableState(nProps, current) {
    var items = nProps.items || [];
    current._dataList = new tableRenderer(items ? items.length : 0);
    current._defaultSortIndexes = [];
    current._dataList.newData=items;
    var size = current._dataList.getSize();
    for (var index = 0; index < size; index++) {
      current._defaultSortIndexes.push(index);
    }
    var tableData = {sortedDataList: current._dataList,
      colSortDirs: {},
      columnWidths: {
        id: nProps.containerWidth*0.15,
        auditTypeValue: nProps.containerWidth*0.15,
        status: nProps.containerWidth*0.1,
        startTime: nProps.containerWidth*0.1,
        progress: nProps.containerWidth*0.1,
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
    if (!e.target.value) {
      var tableData={
      sortedDataList: this._dataList,
      colSortDirs: this.props.tableData.colSortDirs,
      columnWidths: this.props.tableData.columnWidths,
      };
    }
    var tableData={
      sortedDataList: new DataListWrapper(filterIndex(e,this._dataList), this._dataList),
      colSortDirs: this.props.tableData.colSortDirs,
      columnWidths: this.props.tableData.columnWidths,
      };
    this.props.currentTableState(tableData);
  }
  
  
  _onSortChange(columnKey, sortDir) {
    var sortIndexes = this._defaultSortIndexes.slice();
    var tableData={
      sortedDataList: new DataListWrapper(sortData(columnKey, sortDir,sortIndexes,this._dataList), this._dataList),
      colSortDirs: {[columnKey]: sortDir,},
      columnWidths: this.props.tableData.columnWidths,
    };
    this.props.currentTableState(tableData)
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
    var auditId = this.props.tableData.sortedDataList.newData[rowIndex].id,task = this.props.tableData.sortedDataList.newData[rowIndex].auditTypeValue;
    modal.add(StartAudit, {
      title: '',
      size: 'large', // large, medium or small,
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true,
      auditId:auditId,
      task:task
  });
 }

 manageAuditTask(rowIndex,option) {
 var auditComplete = this.props.tableData.sortedDataList.newData[rowIndex].auditTypeValue;
  
  if(option.value === "duplicateTask"){
    var auditType = this.props.tableData.sortedDataList.newData[rowIndex].auditType;
    var auditTypeParam = this.props.tableData.sortedDataList.newData[rowIndex].auditValue;
    
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
    var auditId = this.props.tableData.sortedDataList.newData[rowIndex].id;
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
    var sortedDataList = this._dataList;
    if(this.props.tableData.sortedDataList !== undefined && this.props.tableData.sortedDataList._data !== undefined) {
      sortedDataList = this.props.tableData.sortedDataList;
    }
    var colSortDirs = this.props.tableData.colSortDirs;
    var columnWidths = this.props.tableData.columnWidths;
    var rowsCount = sortedDataList.getSize();
     const tasks = [
    { value: 'duplicateTask', label: 'Duplicate task' },
    { value: 'deleteRecord', label: 'Delete record' }
    ];
    

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
            <button className="gor-auditCreate-btn" onClick={this.createAudit.bind(this)}>
              
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
        rowHeight={100}
        rowsCount={rowsCount}
        headerHeight={70}
        onColumnResizeEndCallback={this._onColumnResizeEndCallback}
        isColumnResizing={false}
        width={this.props.containerWidth}
        height={this.props.containerHeight}
        {...this.props}>
        <Column
          columnKey="id"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.id}>
              <div className="gorToolHeaderEl">
              <div className="gorToolHeaderEl"> 
                 <FormattedMessage id="auditTable.stationID" description='total audit ID for auditTable' 
                defaultMessage='{rowsCount} AUDIT ID' 
                values={{rowsCount:rowsCount?rowsCount:'0'}}/>
              </div>
              <div className="gorToolHeaderSubText">
               <FormattedMessage id="auditTable.SubAuditID" description='total Sub auditID for auditTable' 
                defaultMessage='Total:{rowsCount}' 
                values={{rowsCount:rowsCount?rowsCount:'0'}}/> 
              </div>
              </div>
            </SortHeaderCell>
          }
          cell={  <TextCell data={sortedDataList}/>}
          fixed={true}
          width={columnWidths.id}
          isResizable={true}
        />

        <Column
          columnKey="auditTypeValue"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.auditTypeValue}>
              <FormattedMessage id="audit.table.type" description="audit type for audit table" 
              defaultMessage ="AUDIT TYPE"/>
              <div className="gorToolHeaderSubText">  </div>
            </SortHeaderCell>
          }
           cell={<TextCell data={sortedDataList} ></TextCell>}
          fixed={true}
          width={columnWidths.auditTypeValue}
          isResizable={true}
        />
        <Column
          columnKey="status"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.status}>
              <FormattedMessage id="audit.table.STATUS" description="STATUS for audit" 
              defaultMessage ="STATUS"/>
              <div className="gorToolHeaderSubText">  </div>
               <div>
             
              </div>
            </SortHeaderCell>
          }
           cell={<StatusCell data={sortedDataList} statusKey="statusClass" ></StatusCell>}
          fixed={true}
          width={columnWidths.status}
          isResizable={true}
        />

         <Column
          columnKey="startTime"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.mode}>
              <FormattedMessage id="audit.table.startTime" description="startTime for audit" 
              defaultMessage ="START TIME"/>
              <div className="gorToolHeaderSubText"> 
                
              </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.startTime}
          isResizable={true}
        />
        <Column
          columnKey="progress"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.progress} >
               <FormattedMessage id="audit.table.progress" description="progress for audit task" 
              defaultMessage ="PROGRESS(%)"/>
              <div className="gorToolHeaderSubText">   
              </div> 
            </SortHeaderCell>
          }
          cell={<ProgressCell data={sortedDataList}  />}
          fixed={true}
          width={columnWidths.progress}
          isResizable={true}
        />

        <Column
          columnKey="completedTime"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.completedTime}>
              <FormattedMessage id="audit.table.timeCompleted" description="timeCompleted for audit" 
              defaultMessage ="TIME COMPLETED"/>
              <div className="gorToolHeaderSubText"> 
                
              </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.completedTime}
          isResizable={true}
        />

        <Column
          columnKey="actions"
          header={
            <SortHeaderCell >
               
               <FormattedMessage id="audit.table.action" description="action Column" 
              defaultMessage ="ACTIONS"/> 
              <div className="gorToolHeaderSubText">  </div>
            </SortHeaderCell>
          }
          cell={<ActionCellAudit data={sortedDataList} handleAudit={this.startAudit.bind(this)} tasks={tasks} manageAuditTask={this.manageAuditTask.bind(this)}/>}
          width={columnWidths.actions}
        />
      </Table>
      </div>
    
  }
    return (
      <div> {tableRenderer} </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    tableData: state.currentTableState.currentTableState || [],
  };
}


var mapDispatchToProps = function(dispatch){
  return {
    currentTableState: function(data){ dispatch(currentTableState(data)); }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Dimensions()(AuditTable));
