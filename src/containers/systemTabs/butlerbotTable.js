import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import DropdownTable from '../../components/dropdown/dropdownTable'
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData} from '../../components/commonFunctionsDataTable';

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
    var columnWidth= (this.props.containerWidth/this.props.itemNumber)
    //var columnWidth = 10;
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
    //this._onSortChange("id","DESC");

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
    //this._onSortChange("id","DESC");
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
      this.setState({
        sortedDataList: this._dataList,
      });
    }
    var filterField = ["current","id","status","msu","location"];
    this.setState({
      sortedDataList: new DataListWrapper(filterIndex(e,this._dataList,filterField), this._dataList),
    });
  }
  
  handlChange(columnKey,rowIndex) {
    
  }
  _onSortChange(columnKey, sortDir) {
    var sortIndexes = this._defaultSortIndexes.slice();
    this.setState({
      sortedDataList: new DataListWrapper(sortData(columnKey, sortDir,sortIndexes,this._dataList), this._dataList),
      colSortDirs: {
        [columnKey]: sortDir,
      },
    });
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
    
    return (
      <div className="gorTableMainContainer">
        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
               <FormattedMessage id="butlerBot.table.heading" description="Heading for butlerbot" 
              defaultMessage ="Butler Bots"/>
              
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
        rowHeight={66}
        rowsCount={sortedDataList.getSize()}
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
                <FormattedMessage id="ButlerBotTable.TotalBot" description='total bot for ButlerBotTable' defaultMessage='{totalBot} BOT' values={{totalBot: totalBot}}/>
              </div>
              <div className="gorToolHeaderSubText"> 
                <FormattedMessage id="ButlerBotTable.subTotalBot" description='sub text for totalbot ButlerBotTable' defaultMessage='Total: {totalBot}' values={{totalBot: totalBot}}/>
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
              sortDir={colSortDirs.status} >
              <div>
                 <FormattedMessage id="butlerBot.table.status" description="Status for butlerbot" 
              defaultMessage ="STATUS"/> 
              </div>
              <div>
              <div className="statuslogoWrap">
              <div className=" gorToolHeaderEl"/>
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
              <FormattedMessage id="butlerBot.table.currentTask" description="Current task for butlerbot" 
              defaultMessage ="CURRENT TASK"/>
              <div className="gorToolHeaderSubText">
                <FormattedMessage id="ButlerBotTable.botState" description='bot state for ButlerBotTable' 
                defaultMessage='Pick ({pick}) . Put ({put}) . Charging ({charging}) . Idle ({idle})' 
                values={{pick: pick, put:put, charging:charging, idle:idle}}/>
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
               <FormattedMessage id="butlerBot.table.msu" description="MSU Status for butlerbot" 
              defaultMessage ="MSU"/> 
              <div className="gorToolHeaderSubText">
                <FormattedMessage id="ButlerBotTable.mounted" description='msu mounted for ButlerBotTable' 
                defaultMessage='{msuMounted} Mounted' 
                values={{msuMounted:msuMounted}}/>
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
               <FormattedMessage id="butlerBot.table.location" description="Location for butlerbot" 
              defaultMessage ="LOCATION"/> 
              <div className="gorToolHeaderSubText"> 
                <FormattedMessage id="ButlerBotTable.locations" description='msu mounted for ButlerBotTable' 
                defaultMessage='{locations} Mounted' 
                values={{locations:locations}}/>
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
               <FormattedMessage id="butlerBot.table.voltage" description="voltage for butlerbot" 
              defaultMessage ="VOLTAGE"/>
              <div className="gorToolHeaderSubText"> 
                <FormattedMessage id="ButlerBotTable.avgVoltage" description='avgVoltage for ButlerBotTable' 
                defaultMessage='Avg. Voltage {voltage}' 
                values={{voltage:voltage}}/>  
              </div> 
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList}  />}
          fixed={true}
          width={columnWidths.voltage}
          isResizable={true}
        />
      </Table>
      </div>
    );
  }
}
export default Dimensions()(ButlerBotTable);
