import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import FakeObjectDataListStore from './fake'

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
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

const ComponentCell = ({rowIndex, data, columnKey, ...props}) => (
  <Cell {...props}>
  <input type="checkbox" />
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

class SortExample extends React.Component {
  constructor(props) {
    super(props);

    this._dataList = new FakeObjectDataListStore(4);
    console.log(this._dataList);
    this._defaultSortIndexes = [];
    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }

    this.state = {
      sortedDataList: this._dataList,
      colSortDirs: {},
    };

    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
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
      var {firstName} = this._dataList.getObjectAt(index);
      if (firstName.toLowerCase().indexOf(filterBy) !== -1) {
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
    var {sortedDataList, colSortDirs} = this.state;
    var data_temp= ['a', 'b', 'c', 'd'];
    return (
      <div>
      <input
          onChange={this._onFilterChange}
          placeholder="Filter by First Name"
      />
      <Table
        rowHeight={50}
        rowsCount={sortedDataList.getSize()}
        headerHeight={50}
        width={1000}
        height={500}
        {...this.props}>
        <Column
          columnKey="id"
          header={
            <SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.id}>
              id
            </SortHeaderCell>
          }
          cell={<ComponentCell data={sortedDataList} > </ComponentCell>}
          width={100}
        />
        <Column
          columnKey="firstName"
          header={
            <SortHeaderCell>
              First Name
            </SortHeaderCell>
          }
          cell={<StatusCell data={sortedDataList} >{this.sortedDataList}</StatusCell>}
          width={100}
        />
        <Column
          columnKey="lastName"
          header={
            <SortHeaderCell>
              Last Name
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={200}
        />
        <Column
          columnKey="city"
          header={
            <SortHeaderCell>
              City
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={200}
        />
        <Column
          columnKey="companyName"
          header={
            <SortHeaderCell >
              Company Name
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList}  />}
          width={200}
        />
      </Table>
      </div>
    );
  }
}

export default SortExample;
