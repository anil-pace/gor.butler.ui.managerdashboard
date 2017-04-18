import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {currentTableState} from '../../actions/tableDataAction'
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData} from '../../components/commonFunctionsDataTable';
import {GOR_STATUS,GOR_STATUS_PRIORITY, GOR_TABLE_HEADER_HEIGHT} from '../../constants/frontEndConstants';
import ChargingStationFilter from './chargingStationFilter';


  var tempGlobal = 0;
class ChargingStationsTable extends React.Component {
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
        mode: this.props.containerWidth*0.15,
        dockedBots: this.props.containerWidth*0.6
      },
    };
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
  }

  componentWillReceiveProps(nextProps) {
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
         id: nextProps.containerWidth*0.15,
        status: nextProps.containerWidth*0.1,
        mode: nextProps.containerWidth*0.15,
        dockedBots: nextProps.containerWidth*0.6
      },
    };
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    this._onFilterChange(nextProps.getCsFilter);
  }

shouldComponentUpdate(nextProps) {
    if((nextProps.items && !nextProps.items.length)){
      return false;
    }
    return true;
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
    var filterField = ["mode","id","status","dockedBots"], newData;
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
            this.props.setCsFilter(captureValue);
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
   _setFilter() {
    var newState = !this.props.showFilter;
    this.props.setFilter(newState);
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

  render() {
     let updateStatusIntl="";
    let filterHeight = screen.height-190-50;
    var {sortedDataList, colSortDirs,columnWidths} = this.state;
    var rowsCount = sortedDataList.getSize();
    let manual = this.props.chargersState.manualMode;
    let auto = this.props.chargersState.automaticMode;
    let totalBots = this.props.chargersState.connectedBots;
    let csConnected = this.props.chargersState.csConnected;
     var containerHeight = this.props.containerHeight;
   var noData = <div/>;
    if(rowsCount === 0 || rowsCount === undefined || rowsCount === null) {
     noData =  <div className="gor-no-data"> <FormattedMessage id="ChargingStations.table.noData" description="No data message for ChargingStations table" 
       defaultMessage ="No Charging Stations Found"/>  </div>
     containerHeight = GOR_TABLE_HEADER_HEIGHT;
    }

    var tableRenderer = <div className="gorTableMainContainer">
    <div className="gor-filter-wrap" style={{'width':this.props.showFilter?'350px':'0px', height:filterHeight}}> 
         <ChargingStationFilter refreshOption={this.props.refreshOption} responseFlag={this.props.responseFlag}/>  
       </div>
        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
               <FormattedMessage id="ChargingStations.table.heading" description="Heading for ChargingStations" 
              defaultMessage ="Charging Stations"/>
              
            </div>
          </div>
          

  <div className="filterWrapper"> 
        <div className="gorToolBarDropDown">
        <div className="gor-button-wrap">
        <div className="gor-button-sub-status">{this.props.lastUpdatedText} {this.props.lastUpdated} </div>
          
        <button className={this.props.chargingFilterStatus?"gor-filterBtn-applied":"gor-filterBtn-btn"} onClick={this._setFilter.bind(this)} >
          <div className="gor-manage-task"/>
          <FormattedMessage id="order.table.filterLabel" description="button label for filter" 
          defaultMessage ="Filter data"/>
         </button>
       </div>
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
        height={containerHeight}
        {...this.props}>
        <Column
          columnKey="id"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.id}>
              
              <div className="gorToolHeaderEl"> 
                 <FormattedMessage id="ChargingStationsTable.stationID.heading" description='StationID heading' 
                defaultMessage='STATION ID'/>
              
              <div className="gorToolHeaderSubText">
               <FormattedMessage id="ChargingStationsTable.SubstationID" description='total SubStationID for ChargingStationsTable' 
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
          columnKey="status"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.statusPriority}>
              <div className="gorToolHeaderEl"> 
              <FormattedMessage id="ChargingStations.table.STATUS" description="STATUS for ChargingStations" 
              defaultMessage ="STATUS"/>
             <div className="gor-subStatus-online">
                  <div >  
                    <FormattedMessage id="csTable.status" description='status for cs table' 
                defaultMessage='{csConnected} connected' 
                values={{csConnected:csConnected?csConnected:'0'}}/>
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
          columnKey="mode"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.mode}>
              <div className="gorToolHeaderEl"> 
              <FormattedMessage id="ChargingStations.table.operatingMode" description="operatingMode for ChargingStations" 
              defaultMessage ="OPERATING MODE"/>
              <div className="gorToolHeaderSubText"> 
                <FormattedMessage id="ChargingStationsTable.mode" description='cs mode for ChargingStationsTable' 
                defaultMessage='Manual ({manual}) . Auto ({auto})' 
                values={{manual:manual?manual:'0', auto:auto?auto:'0'}}/>
              </div>
              </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} classKey = "modeClass"/>}
          fixed={true}
          width={columnWidths.mode}
          isResizable={true}
        />
        <Column
          columnKey="dockedBots"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.dockedBots}>
              <div className="gorToolHeaderEl"> 
              <FormattedMessage id="ChargingStations.table.connectedBots" description="connectedBots for ChargingStations" 
              defaultMessage ="BOTS CONNECTED"/>
              <div className="gorToolHeaderSubText">
                <FormattedMessage id="ChargingStationsTable.totalBots" description='total bots ChargingStationsTable' 
                defaultMessage='{totalBots} bots connected' 
                values={{totalBots:totalBots?totalBots:'0'}}/>
                </div>
              </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.dockedBots}
          isResizable={true}
        />
      </Table>
      <div > {noData} </div>
      </div>
    
  
    return (
      <div> {tableRenderer} </div>
    );
  }
}

ChargingStationsTable.PropTypes={
items:React.PropTypes.array,
  containerWidth:React.PropTypes.number,
  itemNumber:React.PropTypes.number,
  currentHeaderOrder:React.PropTypes.object,
  sortHeaderState:React.PropTypes.func,
  lastUpdatedText:React.PropTypes.string,
  showFilter:React.PropTypes.bool,
  lastUpdated:React.PropTypes.string,
  setButlerFilter:React.PropTypes.func,
  setFilter:React.PropTypes.func,
  containerHeight:React.PropTypes.number,
  currentSortState:React.PropTypes.string,
  botFilterStatus:React.PropTypes.bool
};


export default (Dimensions()(ChargingStationsTable));
