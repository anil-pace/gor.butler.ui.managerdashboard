import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import DropdownTable from '../../components/dropdown/dropdownTable'
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {currentTableState} from '../../actions/tableDataAction'
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData} from '../../components/commonFunctionsDataTable';
import {GOR_STATUS,GOR_STATUS_PRIORITY} from '../../constants/frontEndConstants';


  var tempGlobal = 0;
class ChargingStationsTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableState(this.props,this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.tableState(nextProps,this);
    if(nextProps.items !== undefined && tempGlobal === 0) {
      tempGlobal = 1;
    } 
  }

  componentDidMount() {
    this.props.currentTableState(this.tableState(this.props, this));    
  }

   componentWillUnmount() {
    tempGlobal = 1;
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
        status: nProps.containerWidth*0.1,
        mode: nProps.containerWidth*0.15,
        dockedBots: nProps.containerWidth*0.6
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
    var filterField = ["mode","id","status","dockedBots"];
    var tableData={
      sortedDataList: new DataListWrapper(filterIndex(e,this._dataList,filterField), this._dataList),
      colSortDirs: this.props.tableData.colSortDirs,
      columnWidths: this.props.tableData.columnWidths,
      };
    this.props.currentTableState(tableData);
  }
  
  
  _onSortChange(columnKey, sortDir) {
    
    if(columnKey === GOR_STATUS) {
      columnKey = GOR_STATUS_PRIORITY;
    }
    var sortIndexes = this._defaultSortIndexes.slice();
    var tableData={
      sortedDataList: new DataListWrapper(sortData(columnKey, sortDir,sortIndexes,this._dataList), this._dataList),
      colSortDirs: {[columnKey]: sortDir},
      columnWidths: this.props.tableData.columnWidths,
    };
    this.props.currentTableState(tableData)
  }
  render() {
    
    var sortedDataList = this._dataList
    if(this.props.tableData.sortedDataList !== undefined && this.props.tableData.sortedDataList._data !== undefined) {
      sortedDataList = this.props.tableData.sortedDataList;
    }
    var colSortDirs = this.props.tableData.colSortDirs;
    var columnWidths = this.props.tableData.columnWidths;
    var rowsCount = sortedDataList.getSize();
    let manual = this.props.chargersState.manualMode;
    let auto = this.props.chargersState.automaticMode;
    let totalBots = this.props.chargersState.connectedBots;
    

    var tableRenderer = <div/>
    if(this.props.tableData.length !== 0 ) {
       tableRenderer = <div className="gorTableMainContainer">
        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
               <FormattedMessage id="ChargingStations.table.heading" description="Heading for ChargingStations" 
              defaultMessage ="Charging Stations"/>
              
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
        height={this.props.containerHeight}
        {...this.props}>
        <Column
          columnKey="id"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.id}>
              
              <div className="gorToolHeaderEl"> 
                 <FormattedMessage id="ChargingStationsTable.stationID" description='total stationID for ChargingStationsTable' 
                defaultMessage='{rowsCount} STATION ID' 
                values={{rowsCount:rowsCount?rowsCount:'0'}}/>
              
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
              <div className="gorToolHeaderSubText">  </div>
               <div>
              <div className="statuslogoWrap">
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

export default connect(mapStateToProps,mapDispatchToProps)(Dimensions()(ChargingStationsTable));
