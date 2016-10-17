import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import DropdownTable from '../../components/dropdown/dropdownTable'
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData,ProgressCell} from '../../components/commonFunctionsDataTable';

class WavesTable extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.items && this.props.items.length) {
      this._dataList = new tableRenderer(this.props.items.length);
    }
    else {
      this._dataList = new tableRenderer(0);
    }
    this._defaultSortIndexes = [];
    this._dataList.newData=this.props.items || [];
    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }
    var columnWidth= (this.props.containerWidth/this.props.itemNumber)
    this.state = {
      sortedDataList: this._dataList,
      colSortDirs: {},
      columnWidths: {
        id: columnWidth,
        status: columnWidth,
        startTime: columnWidth,
        cutOffTime: columnWidth,
        ordersToFulfill: columnWidth,
        progress: columnWidth,
        totalOrders: columnWidth
      },
    };
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.items && nextProps.items.length) {
      this._dataList = new tableRenderer(nextProps.items.length);
    }
    else {
      this._dataList = new tableRenderer(0);
    }
    this._defaultSortIndexes = [];
    this._dataList.newData=nextProps.items;
    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }
    var columnWidth= (nextProps.containerWidth/nextProps.itemNumber)
    this.state = {
      sortedDataList: this._dataList,
      colSortDirs: {},
      columnWidths: {
        id: columnWidth,
        status: columnWidth,
        startTime: columnWidth,
        cutOffTime: columnWidth,
        ordersToFulfill: columnWidth,
        progress: columnWidth,
        totalOrders: columnWidth
      },
    };
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);

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
    this.setState({
      sortedDataList: new DataListWrapper(filterIndex(e,this._dataList), this._dataList),
    });
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
    var heightRes = 500;
    if(this.props.containerHeight !== 0) {
      heightRes = this.props.containerHeight;
    }
    return (
      <div className="gorTableMainContainer">
        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
               <FormattedMessage id="waves.table.heading" description="Heading for waves" 
              defaultMessage ="Waves"/>
              
            </div>
          </div>
        <div className="filterWrapper">  
        <div className="gorFilter">
            <div className="searchbox-magnifying-glass-icon"/>
            <input className="gorInputFilter"
              onChange={this._onFilterChange}
              placeholder="Filter by keywords">
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
        height={heightRes}
        {...this.props}>
        <Column
          columnKey="id"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.id}> 
              <div className="gorToolHeaderEl">
              <div className="gorToolHeaderEl"> WAVES </div>
              <div className="gorToolHeaderSubText"> Total:{sortedDataList.getSize()} </div>
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
            <SortHeaderCell >
              <div>
                 <FormattedMessage id="waves.table.status" description="Status for waves" 
              defaultMessage ="STATUS"/> 
              </div>
              <div>
              <div className="statuslogoWrap">
              <div className=" gorToolHeaderEl"/>
              </div>
              <div className="gorToolHeaderEl alertState"> </div>
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
            <SortHeaderCell>
              <FormattedMessage id="butlerBot.table.startTime" description="StartTime for butlerbot" 
              defaultMessage ="START TIME"/>
              <div className="gorToolHeaderSubText"> {this.props.waveState.pendingWave} waves pending</div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.startTime}
          isResizable={true}
        />
        <Column
          columnKey="cutOffTime"
          header={
            <SortHeaderCell>
               <FormattedMessage id="waves.table.cutOffTime" description="cutOffTime for waves" 
              defaultMessage ="CUT-OFF TIME"/> 
              <div className="gorToolHeaderSubText">{this.props.waveState.progressWave} waves in progress</div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.cutOffTime}
          isResizable={true}
        />
        <Column
          columnKey="ordersToFulfill"
          header={
            <SortHeaderCell>
               <FormattedMessage id="butlerBot.table.ordersToFulfill" description="orders to fulfill for waves" 
              defaultMessage ="ORDERS TO FULFILL"/> 
              <div className="gorToolHeaderSubText"> {this.props.waveState.orderRemaining.toLocaleString()} remaining</div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.ordersToFulfill}
          isResizable={true}
        />
        <Column
          columnKey="progress"
          header={
            <SortHeaderCell >
               <FormattedMessage id="waves.table.progress" description="progress for waves" 
              defaultMessage ="PROGRESS(%)"/>
              <div className="gorToolHeaderSubText"> {this.props.waveState.completedWaves} waves completed </div> 
            </SortHeaderCell>
          }
          cell={<ProgressCell data={sortedDataList}  />}
          fixed={true}
          width={columnWidths.progress}
          isResizable={true}
        />
        <Column
          columnKey="totalOrders"
          header={
            <SortHeaderCell >
               <FormattedMessage id="waves.table.totalOrders" description="totalOrders for waves" 
              defaultMessage ="TOTAL ORDERS"/>
              <div className="gorToolHeaderSubText"> {this.props.waveState.totalOrders.toLocaleString()} orders </div> 
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList}  />}
          fixed={true}
          width={columnWidths.totalOrders}
          isResizable={true}
        />
      </Table>
      </div>
    );
  }
}
export default Dimensions()(WavesTable);
