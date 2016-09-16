import React from 'react';
import { FormattedMessage } from 'react-intl';
import {Table, Column, Cell} from 'fixed-data-table';

import DropdownTemp from '../../components/dropdown/dropdownTemp'
import Dimensions from 'react-dimensions'
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
  
  <Cell {...props}> 
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

class UserDataTable extends React.Component {
  constructor(props) {
    super(props);
    this._dataList = new tableRenderer(this.props.items.length);
    this._defaultSortIndexes = [];
    this._dataList.newData=this.props.items;
    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }

    this.state = {
      sortedDataList: this._dataList,
      },
    

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

  

  _onSortChange(columnKey, sortDir) {
    var sortIndexes = this._defaultSortIndexes.slice();
    sortIndexes.sort((indexA, indexB) => {
      var valueA = this._dataList.getObjectAt(indexA)[columnKey];
      var valueB = this._dataList.getObjectAt(indexB)[columnKey];
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
    var columnWidth= (this.props.containerWidth/this.props.itemNumber)
    
    return (
     
      <div>

        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
              <FormattedMessage id="user.table.heading" description="Heading for users table" 
              defaultMessage ="USERS"/>
            </div>
          </div>
          <div className="gorToolBarFilter">
            <input className="gorFilter"
              onChange={this._onFilterChange}
              placeholder="Filter by status"
            />
          </div>
       </div>
      <Table
        rowHeight={66}
        rowsCount={sortedDataList.getSize()}
        headerHeight={70}
        onColumnResizeEndCallback={this._onColumnResizeEndCallback}
        isColumnResizing={false}
        width={this.props.containerWidth}
        height={500}
        {...this.props}>
        <Column
          columnKey="name"
          header={
            <SortHeaderCell >
              <div className="gorToolHeaderEl">
              <div className="gorToolHeaderEl">
                {sortedDataList.getSize()} 
                <FormattedMessage id="user.table.users" description="Users Column" 
              defaultMessage =" USERS"/> 
              </div>
              <div className="gorToolHeaderSubText"> Total:{sortedDataList.getSize()} </div>
              </div>
            </SortHeaderCell>
          }

          cell={  <ComponentCell data={sortedDataList} />}
          width={columnWidth}
        />
        <Column
          columnKey="status"
          header={
            <SortHeaderCell >
              <div>
              <FormattedMessage id="user.table.status" description="Users Status" 
              defaultMessage ="STATUS"/> 
              </div>
            </SortHeaderCell>
          }
          cell={<StatusCell data={sortedDataList} ></StatusCell>}
          width={columnWidth}
        />
        <Column
          columnKey="role"
          header={
            <SortHeaderCell>
               <FormattedMessage id="user.table.role" description="User Role" 
              defaultMessage ="ROLE"/>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={columnWidth}
        />
        <Column
          columnKey="workMode"
          header={
            <SortHeaderCell>
               <FormattedMessage id="user.table.workMode" description="User Workmode" 
              defaultMessage ="WORKMODE"/>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={columnWidth}
        />
        <Column
          columnKey="location"
          header={
            <SortHeaderCell>
               <FormattedMessage id="user.table.location" description="User location" 
              defaultMessage ="LOCATION"/>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={columnWidth}
        />
        <Column
          columnKey="productivity"
          header={
            <SortHeaderCell >
               <FormattedMessage id="user.table.productivity" description="User productivity" 
              defaultMessage ="PRODUCTIVITY"/>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList}  />}
          width={columnWidth}
        />

        <Column
          columnKey="logInTime"
          header={
            <SortHeaderCell >
               <FormattedMessage id="user.table.logInTime" description="User log in time" 
              defaultMessage ="LOG IN TIME"/>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList}  />}
          width={columnWidth}
        />

        <Column
          columnKey="actions"
          header={
            <SortHeaderCell >
               ACTIONS
            </SortHeaderCell>
          }
          
          width={columnWidth}
        />
      </Table>
      </div>
    );
  }
}

export default Dimensions()(UserDataTable);
