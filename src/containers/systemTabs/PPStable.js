
import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import DropdownTable from '../../components/dropdown/dropdownTable'
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {changePPSmode} from '../../actions/ppsModeChangeAction'
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData} from '../../components/commonFunctionsDataTable';
import {BASE_URL, PPS_MODE_CHANGE_URL,PROTOCOL,API_URL} from '../../constants/configConstants';
import { defineMessages } from 'react-intl';
import {GOR_STATUS,GOR_STATUS_PRIORITY,GOR_TABLE_HEADER_HEIGHT} from '../../constants/frontEndConstants';
import PPSFilter from './ppsFilter';
import FilterSummary from '../../components/tableFilter/filterSummary'

const messages = defineMessages({
    ppsPlaceholder: {
        id: 'pps.dropdown.placeholder',
        description: 'mode change for pps',
        defaultMessage: 'Change PPS Mode',
    }


});

import {PPS_MODE_CHANGE,APP_JSON,PUT} from '../../constants/frontEndConstants';


class PPStable extends React.Component {
  constructor(props) {
    super(props);
    var temp;
    if(this.props.items === undefined) {
      this._dataList = new tableRenderer(0);
      temp = new Array(0).fill(false);
    }
    else {
      this._dataList = new tableRenderer(this.props.items.length);
      temp = new Array(this.props.items.length).fill(false);
    }
    this._defaultSortIndexes = [];
    this._dataList.newData=this.props.items;
    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }
    var columnWidth= (this.props.containerWidth/this.props.itemNumber)
    this.state = {
      sortedDataList: this._dataList,
      colSortDirs: {},
      columnWidths: {
        id: this.props.containerWidth*0.15,
        status: this.props.containerWidth*0.1,
        operatingMode: this.props.containerWidth*0.17,
        performance: this.props.containerWidth*0.15,
        operatorAssigned: this.props.containerWidth*0.6
      },
      headerChecked: false,
      isChecked:temp,
      renderDropD: false,
    };
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    
  }
  shouldComponentUpdate(nextProps) {
    if((nextProps.items && !nextProps.items.length)){
      return false;
    }
    return true;
  }


  componentWillReceiveProps(nextProps) {
    var temp;
    if(nextProps.items === undefined) {
      this._dataList = new tableRenderer(0);
      temp = new Array(0).fill(false);
    }
    else {
      this._dataList = new tableRenderer(nextProps.items.length);
      temp = new Array(nextProps.items.length).fill(false);
    }
    this._defaultSortIndexes = [];
    this._dataList.newData=nextProps.items;
    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }
    var columnWidth= (nextProps.containerWidth/nextProps.itemNumber)
    if(!this.props.checkedPps && nextProps.items) {
      var initialCheckState =  new Array(nextProps.items.length).fill(false);
      this.props.setCheckedPps(initialCheckState)
    }
    this.state = {
      sortedDataList: this._dataList,
      colSortDirs: {},
      columnWidths: {

         id: nextProps.containerWidth*0.15,
        status: nextProps.containerWidth*0.1,
        operatingMode: nextProps.containerWidth*0.17,
        performance: nextProps.containerWidth*0.15,
        operatorAssigned: nextProps.containerWidth*0.6

      },
      headerChecked: false,
      isChecked:this.props.checkedPps,
      renderDropD: false,
    };
    

    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    if(this.props.items && this.props.items.length) {
     this._onFilterChange(nextProps.getPpsFilter);
    }
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
    var filterField = ["operatingMode","id","status","performance","operatorAssigned"],newData;
    if (e.target && !e.target.value) {
      this.setState({
        sortedDataList: this._dataList,
      });
    }
    if(e.target && (e.target.value || e.target.value === "")) {
      var captureValue = e.target.value;
      newData = new DataListWrapper(filterIndex(e,this.state.sortedDataList,filterField), this._dataList)
      
      this.setState({
        sortedDataList: newData
        }, function() {
            this.props.setPpsFilter(captureValue);
            if(this.props.items && this.props.items.length) {
               this._onSortChange(this.props.currentSortState,this.props.currentHeaderOrder);
             }
      })
    }

    else {
      newData = new DataListWrapper(filterIndex(e,this.state.sortedDataList,filterField), this._dataList);
      this.setState({
        sortedDataList: newData
        }, function() {
            if(this.props.items && this.props.items.length) {
               this._onSortChange(this.props.currentSortState,this.props.currentHeaderOrder);
             }
      })
    }
  }
  handleChange(columnKey,rowIndex,data) {
    
    var showDropdown=false, ppsSelected;
    
    var checkedState=this.props.checkedPps.slice();
    if(checkedState[rowIndex] === true) {
      checkedState[rowIndex] = false;
    }
    else {
      checkedState[rowIndex] = true;
    }
    for (var i = checkedState.length - 1; i >= 0; i--) {
      if(checkedState[i] === true) {
        showDropdown=true;
        break;
      }
    }
    this.props.setCheckedPps(checkedState) 
    this.props.renderDdrop(showDropdown);
  }

  
  
  _onSortChange(columnKey, sortDir) {
    if(columnKey === undefined) {
      columnKey = "id"
    }

    if(columnKey === GOR_STATUS) {
      columnKey = GOR_STATUS_PRIORITY;
    }
    var sortIndexes = this._defaultSortIndexes.slice();
    if(this.state.sortedDataList._indexMap) {
      sortIndexes = this.state.sortedDataList._indexMap.slice();
    }
    this.setState({
      sortedDataList: new DataListWrapper(sortData(columnKey, sortDir,sortIndexes,this._dataList), this._dataList),
      colSortDirs: {
        [columnKey]: sortDir,
      },
    });
    this.props.sortHeaderOrder(sortDir);
    this.props.sortHeaderState(columnKey);
  }

  headerCheckChange() {
    var checkedAllState=this.props.checkedPps,showDropdown,headerState = this.props.getCheckAll;
    if(headerState === false) {
    for (var i = checkedAllState.length - 1; i >= 0; i--) {
      checkedAllState[i] = true;
    }
    showDropdown=true;
    this.props.setCheckedPps(checkedAllState);
    this.props.renderDdrop(showDropdown);
    this.props.setCheckAll(true);
    }

    else {
      for (var i = checkedAllState.length - 1; i >= 0; i--) {
      checkedAllState[i] = false;
    }
    showDropdown=false;
    this.props.setCheckedPps(checkedAllState);
    this.props.renderDdrop(showDropdown);
    this.props.setCheckAll(false);
    }
     
  }


_setFilter() {
    let newState = !this.props.showFilter;
    this.props.setFilter(newState);
   }


  handleModeChange(data) {
    var checkedPPS=[], j=0, mode=data.value, sortedIndex;
    for (var i = this.props.checkedPps.length - 1; i >= 0; i--) {
      if(this.props.checkedPps[i] === true) {
        if(this.state.sortedDataList.newData !== undefined) {
         checkedPPS[j] = this.state.sortedDataList.newData[i].ppsId;
        }
        else {
          sortedIndex = this.state.sortedDataList._indexMap[i];
          checkedPPS[j] = this.state.sortedDataList._data.newData[sortedIndex].ppsId;
        }
        let formdata={         
                    "requested_pps_mode": mode
         };
        var url = API_URL + PPS_MODE_CHANGE_URL + checkedPPS[j] + "/pps_mode";
        let ppsModeChange={
               'url':url,
               'formdata':formdata,
               'method':PUT,
               'cause': PPS_MODE_CHANGE,
               'token': sessionStorage.getItem('auth_token'),
              'contentType':APP_JSON
         } 
         
         this.props.modeChange(ppsModeChange);
        j++;
      }
    }
    var resetCheck = new Array(this.props.checkedPps.length).fill(false);
    this.props.setCheckAll(false);
    this.props.renderDdrop(false);
    this.props.setCheckedPps(resetCheck);
 
  }

  
  render() {
    var showFilterPPS = true;
     let updateStatusIntl="";
    let filterHeight = screen.height-190-50;
    let {sortedDataList, colSortDirs,columnWidths,renderDropD, ppsSelected,headerChecked} = this.state, checkedPPS = [];
    let pickDrop = <FormattedMessage id="PPS.table.pickDrop" description="pick dropdown option for PPS" defaultMessage ="Put"/> 
    let putDrop = <FormattedMessage id="PPS.table.putDrop" description="put dropdown option for PPS" defaultMessage ="Pick"/> 
    let auditDrop = <FormattedMessage id="PPS.table.auditDrop" description="audit dropdown option for PPS" defaultMessage ="Audit"/> 
    
    const modes = [
    { value: 'put', label: pickDrop },
    { value: 'pick', label: putDrop },
    { value: 'audit', label: auditDrop }
    ];
    let checkState = this.handleChange.bind(this);
    let drop, selected =0, ppsTotal = sortedDataList.getSize();
    let pick = this.props.operationMode.pick;
    let put = this.props.operationMode.put;
    let audit = this.props.operationMode.audit;
    let notSet = this.props.operationMode.notSet;
    let operatorNum =  this.props.operatorNum, j=1;
    let ppsOnState = this.props.ppsOnState;
    let avgThroughput = this.props.avgThroughput;
    if(this.props.bDropRender===true) {
      drop = <DropdownTable  styleClass={'gorDataTableDrop'} placeholder={this.props.intlMessg["pps.dropdown.placeholder"]} items={modes} changeMode={this.handleModeChange.bind(this)}/>;
    }

    else {
      drop = <div/>;
    }
    if(this.props.checkedPps) {
      for (var i = this.props.checkedPps.length - 1; i >= 0; i--) {
        if(this.props.checkedPps[i] === true) {
          selected = selected + 1;
        }
      }
    }
    let containerHeight = this.props.containerHeight;
    let noData = <div/>;
    if(ppsTotal === 0 || ppsTotal === undefined || ppsTotal === null) {
     noData =  <div className="gor-no-data"> <FormattedMessage id="PPStable.table.noData" description="No data message for PPStable" 
       defaultMessage ="No PPS Found"/>  </div>
     containerHeight = GOR_TABLE_HEADER_HEIGHT;
    }
    
    let checkedStatePps = [];
    if(this.props.checkedPps) {
      checkedStatePps = this.props.checkedPps;
    }
   
    return (
      <div className="gorTableMainContainer">

<div className="gor-filter-wrap" style={{'width':this.props.showFilter?'350px':'0px', height:filterHeight}}> 
         <PPSFilter refreshOption={this.props.refreshOption} responseFlag={this.props.responseFlag}/>  
       </div>

        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
               <FormattedMessage id="pps.table.heading" description="Heading for PPS" 
              defaultMessage ="Pick Put Stations"/>
              <div className="gorHeaderSubText"> 
                <FormattedMessage id="PPStable.selected" description='selected pps for ppsSelected' 
                defaultMessage='{selected} selected' 
                values={{selected:selected?selected:'0'}}/> 
              </div>
            </div>
            <div className="gorToolBarDropDown">
              {drop}
            </div>
          </div>
          
        <div className="filterWrapper"> 
        <div className="gorToolBarDropDown">
        <div className="gor-button-wrap">
        <div className="gor-button-sub-status">{this.props.lastUpdatedText} {this.props.lastUpdated} </div>
        {showFilterPPS?<button className={this.props.ppsFilterState?"gor-filterBtn-applied":"gor-filterBtn-btn"} onClick={this._setFilter.bind(this)} >
          <div className="gor-manage-task"/>
          <FormattedMessage id="order.table.filterLabel" description="button label for filter" 
          defaultMessage ="Filter data"/>
         </button>:""}
       </div>
        </div>     
        </div>
       </div>

          {/*Filter Summary*/}
          <FilterSummary isFilterApplied={this.props.isFilterApplied} responseFlag={this.props.responseFlag}  filterText={<FormattedMessage id="ppsList.filter.search.bar" description='total pps for filter search bar'
                                                       defaultMessage='{total} Stations found'
                                                       values={{total: sortedDataList.getSize()||0}}/>}
                         refreshList={this.props.refreshList}
                         refreshText={<FormattedMessage id="ppsList.filter.search.bar.showall" description="button label for show all" defaultMessage ="Show all Stations"/>}/>

      <Table
        rowHeight={50}
        rowsCount={sortedDataList.getSize()}
        headerHeight={70}
        onColumnResizeEndCallback={this._onColumnResizeEndCallback}
        isColumnResizing={false}
        width={this.props.containerWidth}
        height={containerHeight}
        {...this.props}>
        <Column
          columnKey="id"
          header={
            <div>
            <div className="gor-header-check">
              <input type="checkbox" checked={this.props.getCheckAll} onChange={this.headerCheckChange.bind(this)}/>
            </div>
            <div className="gor-header-id">
              <SortHeaderCell onSortChange={this._onSortChange} 
                sortDir={colSortDirs.id}>  
                <div className="gorToolHeaderEl">
                  <FormattedMessage id="PPStable.ppsColumn.heading" description='PPS - column Heading' 
                  defaultMessage='PPS' /> 
                <div className="gorToolHeaderSubText"> 
                  <FormattedMessage id="PPStable.Subpps" description='sub pps' 
                  defaultMessage='Total: {ppsTotal}' 
                  values={{ppsTotal:ppsTotal?ppsTotal:'0'}}/>
              </div>
              </div>
            </SortHeaderCell>
            </div>
            </div>
          }
          cell={  <ComponentCell data={sortedDataList} checkState={checkState} checked={checkedStatePps} />}
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
              defaultMessage ="STATUS"/> 
              
              <div className="gor-subStatus-online">
                  <div >  
                    <FormattedMessage id="PPStable.status" description='status for PPS table' 
                defaultMessage='{ppsOnState} On' 
                values={{ppsOnState:ppsOnState?ppsOnState:'0'}}/>
                  </div>
                </div>
              </div>
            </SortHeaderCell>
          }
          cell={<StatusCell data={sortedDataList} statusKey="statusClass" ></StatusCell>}
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
              defaultMessage ="OPERATING MODE"/>
              <div className="gorToolHeaderSubText">
                <FormattedMessage id="PPStable.ppsState" description='pps state for PPStable' 
                defaultMessage='Pick ({pick}) . Put ({put}) . Audit ({audit}) . Not set ({notSet})' 
                values={{pick: pick?pick:'0', put:put?put:'0', audit:audit?audit:'0', notSet:notSet?notSet:'0'}}/>
              </div>
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
               <FormattedMessage id="PPS.table.performance" description="performance Status for PPS" 
              defaultMessage ="PERFORMANCE"/> 
              <div className="gorToolHeaderSubText"> 
                <FormattedMessage id="PPStable.avgThroughput" description='avgThroughput for PPStable' 
                defaultMessage='Avg {avgThroughput} items/hr' 
                values={{avgThroughput:avgThroughput?avgThroughput:"0"}}/>  
              </div> 
              </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
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
               <FormattedMessage id="PPS.table.operatorAssigned" description="operatorAssigned for PPS" 
              defaultMessage ="OPERATOR ASSIGNED"/> 
              <div className="gorToolHeaderSubText"> 
                <FormattedMessage id="PPStable.totalOperator" description='totalOperator for PPStable' 
                defaultMessage='{operatorNum} operators' 
                values={{operatorNum: operatorNum?operatorNum:'0'}}/>
              </div>
              </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.operatorAssigned}
          isResizable={true}
        />
      </Table>
      <div > {noData} </div>
      </div>
    );
  }
}

PPStable.PropTypes={
items:React.PropTypes.array,
  containerWidth:React.PropTypes.number,
  itemNumber:React.PropTypes.number,
  currentHeaderOrder:React.PropTypes.object,
  sortHeaderState:React.PropTypes.func,
  lastUpdatedText:React.PropTypes.string,
  showFilter:React.PropTypes.bool,
  lastUpdated:React.PropTypes.string,
  ppsFilterState:React.PropTypes.bool,
  setFilter:React.PropTypes.func,
  containerHeight:React.PropTypes.number,
  currentSortState:React.PropTypes.string,
  responseFlag:React.PropTypes.bool,
getCheckAll:React.PropTypes.bool
};


export default Dimensions()(PPStable);