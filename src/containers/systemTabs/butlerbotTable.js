import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import DropdownTemp from '../../components/dropdown/dropdownTemp'
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

class tableRenderer {
  constructor(size){
    this.size = size;
    this.newData = [];
  }

  getObjectAt(index)  {
    if (index < 0 || index > this.size){
      return undefined;
    }
    return this.newData[index];
  }

  getAll() {
    if (this.newData.length < this.size) {
      for (var i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }
    return this.newData.slice();
  }

  getSize() {
    return this.size;
  }
}

class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props);

    this._onSortChange = this._onSortChange.bind(this);
  }

  render() {
    var {sortDir, children, ...props} = this.props;
    return (
      <Cell {...props}>
        <a onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </Cell>
    );
  }

  _onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ?
          reverseSortDirection(this.props.sortDir) :
          SortTypes.DESC
      );
    }
  }
}

const TextCell = ({rowIndex, data, columnKey, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);

const ComponentCell = ({rowIndex, data, columnKey,checkState, ...props}) => (
  
  <Cell {...props}> <input type="checkbox" onChange={checkState.bind(this,columnKey,rowIndex)}/>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);

const StatusCell = ({rowIndex, data, columnKey, ...props}) => (
  <Cell {...props} className={data.getObjectAt(rowIndex)[columnKey]}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(
      this._indexMap[index],
    );
  }
}

class ButlerBotTable extends React.Component {
  constructor(props) {
    super(props);
    this._dataList = new tableRenderer(this.props.items.length);
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
        id: columnWidth,
        status: columnWidth,
        current: columnWidth,
        msu: columnWidth,
        location: columnWidth,
        direction: columnWidth
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
     var filterBy = e.target.value.toLowerCase();
     var size = this._dataList.getSize();
     var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      var {status} = this._dataList.getObjectAt(index);
      if (status.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }

    this.setState({
      sortedDataList: new DataListWrapper(filteredIndexes, this._dataList),
    });
  }

  handleChange(columnKey,rowIndex) {
    console.log("checked");
    console.log(columnKey)
    console.log(rowIndex)
  }

  _onSortChange(columnKey, sortDir) {
    var sortIndexes = this._defaultSortIndexes.slice();
    sortIndexes.sort((indexA, indexB) => {
      var valueA = this._dataList.getObjectAt(indexA)[columnKey];
      var valueB = this._dataList.getObjectAt(indexB)[columnKey];
      console.log(valueB)
      console.log(valueA)
      var sortVal = 0;
      if (valueA > valueB) {
        sortVal = 1;
      }
      if (valueA < valueB) {
        sortVal = -1;
      }
      if (sortVal !== 0 && sortDir === SortTypes.ASC) {
        sortVal = sortVal * -1;
      }

      return sortVal;
    });

    this.setState({
      sortedDataList: new DataListWrapper(sortIndexes, this._dataList),
      colSortDirs: {
        [columnKey]: sortDir,
      },
    });
  }

  render() {
    

    var {sortedDataList, colSortDirs,columnWidths} = this.state;
    console.log(sortedDataList)
    
    const item = [
    { value: 'on/off', label: 'ON/OFF' },
    { value: 'on', label: 'ON' },
    { value: 'off', label: 'OFF' },
    ];
    var checkState = this.handleChange.bind(this);
    console.log(this.props.containerHeight)
    return (
     
      <div>

        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
               <FormattedMessage id="butlerBot.table.heading" description="Heading for butlerbot" 
              defaultMessage ="BUTLER BOTS"/>
            </div>
            <div className="gorToolBarDropDown">
              <DropdownTemp items={item}/>
            </div>
          </div>
          <div className="gorToolBarWrap">
            <input className="gorFilter"
              onChange={this._onFilterChange}
              placeholder="Filter by status">
              </input>

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
              sortDir={colSortDirs.id}> <input type="checkbox" />
              <div className="gorToolHeaderEl">
              <div className="gorToolHeaderEl"> {sortedDataList.getSize()} BOT </div>
              <div className="gorToolHeaderSubText"> Total:{sortedDataList.getSize()} </div>
              </div>
            </SortHeaderCell>
          }

          cell={  <ComponentCell data={sortedDataList} checkState={checkState} />}
          fixed={true}
          width={columnWidths.id}
          isResizable={true}
          
        />
        <Column
          columnKey="status"
          header={
            <SortHeaderCell >
              <div>
                 <FormattedMessage id="butlerBot.table.status" description="Status for butlerbot" 
              defaultMessage ="STATUS"/> 
              </div>
              <div>
              <div className="header-red-alert-icon gorToolHeaderEl"/>
              <div className="gorToolHeaderEl"> 3 Alerts</div>
              </div>
            </SortHeaderCell>
          }
          cell={<StatusCell data={sortedDataList} ></StatusCell>}
          fixed={true}
          width={columnWidths.status}
          isResizable={true}
        />
        <Column
          columnKey="current"
          header={
            <SortHeaderCell>
              <FormattedMessage id="butlerBot.table.currentTask" description="Current task for butlerbot" 
              defaultMessage ="CURRENT TASK"/>
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
            <SortHeaderCell>
               <FormattedMessage id="butlerBot.table.msu" description="MSU Status for butlerbot" 
              defaultMessage ="MSU"/> 
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
            <SortHeaderCell>
               <FormattedMessage id="butlerBot.table.location" description="Location for butlerbot" 
              defaultMessage ="LOCATION"/> 
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.location}
          isResizable={true}
        />
        <Column
          columnKey="direction"
          header={
            <SortHeaderCell >
               <FormattedMessage id="butlerBot.table.direction" description="Direction for butlerbot" 
              defaultMessage ="DIRECTION"/> 
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList}  />}
          fixed={true}
          width={columnWidths.direction}
          isResizable={true}
        />
      </Table>
      </div>
    );
  }
}

export default Dimensions()(ButlerBotTable);
