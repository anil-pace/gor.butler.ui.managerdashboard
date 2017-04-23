import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData} from '../../components/commonFunctionsDataTable';
import {GOR_STATUS,GOR_STATUS_PRIORITY,GOR_TABLE_HEADER_HEIGHT} from '../../constants/frontEndConstants';
import ButlerBotFilter from './butlerBotFilter';
import FilterSummary from '../../components/tableFilter/filterSummary'

class ButlerBotTable extends React.Component {
  constructor(props) {
    super(props);
    var items = this.props.items || [];
    var temp = new Array(items ? items.length : 0).fill(false);
    this._dataList = new tableRenderer(items ? items.length : 0);
    this._defaultSortIndexes = [];
    this._dataList.newData=items;
    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }
    var columnWidth= (this.props.containerWidth/this.props.itemNumber);
    this.state = {
      sortedDataList: this._dataList,
      colSortDirs: {},
      columnWidths: {
        id: this.props.containerWidth*0.15,
        status: this.props.containerWidth*0.1,
        current: this.props.containerWidth*0.25,
        msu: this.props.containerWidth*0.1,
        location: this.props.containerWidth*0.1,
        voltage: this.props.containerWidth*0.3
      },
    };
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //Based on emptyresponse, appliedbutton and reponse has came or not we hide and show the filter
    if(!nextProps.emptyResponse && this.props.filterapplyflag && !nextProps.responseFlag)
        {
            this.props.setFilter(false);
            this.props.setFilterApplyFlag(false);
        }
    var items = nextProps.items || [];
    var temp = new Array(items ? items.length : 0).fill(false);
    this._dataList = new tableRenderer(items ? items.length : 0);
    this._defaultSortIndexes = [];
    this._dataList.newData=items;
    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }
    var columnWidth= (nextProps.containerWidth/nextProps.itemNumber)
    this.state = {
      sortedDataList: this._dataList,
      colSortDirs: {},
      columnWidths: {
        id: nextProps.containerWidth*0.1,
        status: nextProps.containerWidth*0.1,
        current: nextProps.containerWidth*0.25,
        msu: nextProps.containerWidth*0.1,
        location: nextProps.containerWidth*0.1,
        voltage: nextProps.containerWidth*0.35
      },
    };
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    this._onFilterChange(nextProps.getButlerFilter);
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
    if (e.target && !e.target.value) {
      this.setState({
        sortedDataList: this._dataList,
      });
    }
    var filterField = ["current","id","status","msu","location"], newData;
     if(e.target && (e.target.value || e.target.value === "")) {
      var captureValue = e.target.value;
      newData = new DataListWrapper(filterIndex(e,this.state.sortedDataList,filterField), this._dataList)
      
      this.setState({
        sortedDataList: newData
        }, function() {
            this.props.setButlerFilter(captureValue);
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
  
 
  _onSortChange(columnKey, sortDir) {
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

  _setFilter() {
      if(this.props.items.length){
    let newState = !this.props.botToggleFilter;
    this.props.setFilter(newState)
  }
   }
  
  render() {
    var {sortedDataList, colSortDirs,columnWidths} = this.state;
    var totalBot = sortedDataList.getSize();
    let pick  = this.props.parameters.Pick;
    let put  = this.props.parameters.Put;
    let charging  = this.props.parameters.Charging;
    let idle  = this.props.parameters.Idle;
    let msuMounted = this.props.parameters.msuMounted;
    let locations = this.props.parameters.location;
    let voltage = this.props.parameters.avgVoltage;
    let onlineBots = this.props.parameters.online;
    var containerHeight = this.props.containerHeight;
    var noData = <div/>;
    
     if(totalBot === 0 || totalBot === undefined || totalBot === null) {
    noData =  <div className="gor-no-data"> <FormattedMessage id="butlerbot.table.noData" description="No data message for butlerbot table" 
        defaultMessage ="No Butler Bot Found"/>  </div>
      containerHeight = GOR_TABLE_HEADER_HEIGHT;
     }
     var filterHeight = screen.height-190-50;
    return (
      <div className="gorTableMainContainer">
      <div className="gor-filter-wrap" style={{'width':this.props.botToggleFilter?'350px':'0px', height:filterHeight}}> 
         <ButlerBotFilter/>  
       </div>


        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
               <FormattedMessage id="butlerBot.table.heading" description="Heading for butlerbot" 
              defaultMessage ="Butler Bots"/>
              
            </div>
          </div>
          

  <div className="filterWrapper"> 
        <div className="gorToolBarDropDown">
        <div className="gor-button-wrap">
        <div className="gor-button-sub-status">{this.props.lastUpdatedText} {this.props.lastUpdated} </div>

<button className={this.props.botFilterStatus?"gor-filterBtn-applied":"gor-filterBtn-btn"} disabled={this.props.items && this.props.items.length?false:true} style={this.props.items && this.props.items.length?{cursor:'pointer'}:{cursor:'default'}} onClick={this._setFilter.bind(this)} >
       {!this.props.botFilterStatus?<div><div className="gor-manage-task"></div><FormattedMessage id="order.table.filterLabel" description="button label for filter" defaultMessage ="Filter data"/></div>:
       <div><div className="gor-manage-task"></div><FormattedMessage id="order.table.showfilter" description="button label for filter" defaultMessage ="Show Filter"/></div>}
         </button>
       </div>
        </div>     
        </div>
       </div>
          {/*Filter Summary*/}
          <FilterSummary isFilterApplied={this.props.isFilterApplied} responseFlag={this.props.responseFlag} filterText={<FormattedMessage id="botList.filter.search.bar" description='total bots for filter search bar'
                                                                                                                                           defaultMessage='{total} Bots found'
                                                                                                                                           values={{total: sortedDataList.getSize()||0}}/>}
                         refreshList={this.props.refreshList}
                         refreshText={<FormattedMessage id="botList.filter.search.bar.showall" description="button label for show all" defaultMessage ="Show all Bots"/>}/>

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
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.id}> 
              <div className="gorToolHeaderEl">
                <FormattedMessage id="ButlerBotTable.TotalBot" description='Column name for the Bot id in bot table' defaultMessage='BOTS'/>
              
              <div className="gorToolHeaderSubText"> 
                <FormattedMessage id="ButlerBotTable.subTotalBot" description='sub text for totalbot ButlerBotTable' defaultMessage='Total: {totalBot}' values={{totalBot: totalBot?totalBot:"0"}}/>
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
          columnKey="status"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.statusPriority} >
              <div className="gorToolHeaderEl"> 
                 <FormattedMessage id="butlerBot.table.status" description="Status for butlerbot" 
              defaultMessage ="STATUS"/>
                <div className="gor-subStatus-online">
                  <div >  
                    <FormattedMessage id="ButlerBotTable.status" description='status for ButlerBotTable' 
                defaultMessage='{onlineBots} Online' 
                values={{onlineBots:onlineBots?onlineBots:'0'}}/>
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
          columnKey="current"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.current}>
               <div className="gorToolHeaderEl"> 
              <FormattedMessage id="butlerBot.table.currentTask" description="Current task for butlerbot" 
              defaultMessage ="CURRENT TASK"/>
              <div className="gorToolHeaderSubText">
                <FormattedMessage id="ButlerBotTable.botState" description='bot state for ButlerBotTable' 
                defaultMessage='Pick ({pick}) . Put ({put}) . Charging ({charging}) . Idle ({idle})' 
                values={{pick: pick?pick:'0', put:put?put:'0', charging:charging?charging:'0', idle:idle?idle:'0'}}/>
              </div>
              </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.current}
          isResizable={true}
        />
        <Column
          columnKey="msu"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.msu}>
               <div className="gorToolHeaderEl"> 
               <FormattedMessage id="butlerBot.table.msu" description="MSU Status for butlerbot" 
              defaultMessage ="MSU MOUNTED"/> 
              <div className="gorToolHeaderSubText">
                <FormattedMessage id="ButlerBotTable.mounted" description='msu mounted for ButlerBotTable' 
                defaultMessage='{msuMounted} Mounted' 
                values={{msuMounted:msuMounted?msuMounted:'0'}}/>
              </div>
              </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.msu}
          isResizable={true}
        />
        <Column
          columnKey="location"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.location}>
               <div className="gorToolHeaderEl"> 
               <FormattedMessage id="butlerBot.table.location" description="Location for butlerbot" 
              defaultMessage ="LOCATION"/> 
              <div className="gorToolHeaderSubText"> 
                <FormattedMessage id="ButlerBotTable.locations" description='msu Location for ButlerBotTable' 
                defaultMessage='{locations} Locations' 
                values={{locations:locations?locations:'0'}}/>
              </div>
              </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.location}
          isResizable={true}
        />
        <Column
          columnKey="voltage"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.voltage}>
               <div className="gorToolHeaderEl"> 
               <FormattedMessage id="butlerBot.table.voltage" description="voltage for butlerbot" 
              defaultMessage ="VOLTAGE"/>
              <div className="gorToolHeaderSubText"> 
                <FormattedMessage id="ButlerBotTable.avgVoltage" description='avgVoltage for ButlerBotTable' 
                defaultMessage='Avg {voltage}' 
                values={{voltage:voltage?voltage:"0 V"}}/>  
              </div> 
              </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList}  />}
          fixed={true}
          width={columnWidths.voltage}
          isResizable={true}
        />
      </Table>
       <div> {noData} </div>
      </div>
    );
  }
}
ButlerBotTable.PropTypes={
items:React.PropTypes.array,
  containerWidth:React.PropTypes.number,
  itemNumber:React.PropTypes.number,
  currentHeaderOrder:React.PropTypes.object,
  sortHeaderState:React.PropTypes.func,
  lastUpdatedText:React.PropTypes.string,
  botToggleFilter:React.PropTypes.bool,
  lastUpdated:React.PropTypes.string,
  setButlerFilter:React.PropTypes.func,
  setFilter:React.PropTypes.func,
  containerHeight:React.PropTypes.number,
  parameters:React.PropTypes.object,
  botFilterStatus:React.PropTypes.bool,
  setFilterApplyFlag:React.PropTypes.func,
  filterapplyflag:React.PropTypes.bool,
  setFilter:React.PropTypes.func,
  emptyResponse:React.PropTypes.bool
};


export default Dimensions()(ButlerBotTable);
