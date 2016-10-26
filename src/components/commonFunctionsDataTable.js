import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import {modal} from 'react-redux-modal';
import { FormattedMessage } from 'react-intl';

export var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}
export function filterIndex(e,_dataList) {
	var filterBy = e.target.value.toLowerCase();
     var size = _dataList.getSize();
     var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      var {id,status} = _dataList.getObjectAt(index);
      if (id.toLowerCase().indexOf(filterBy) !== -1 || status.toLowerCase().indexOf(filterBy) !== -1 ) {
        filteredIndexes.push(index);
      }
    }
    return filteredIndexes;
}
export function sortData (columnKey, sortDir,sortIndexes,_dataList) {
	 sortIndexes.sort((indexA, indexB) => {
      var valueA = _dataList.getObjectAt(indexA)[columnKey];
      var valueB = _dataList.getObjectAt(indexB)[columnKey];
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
	 return sortIndexes;
}

export class DataListWrapper {
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
 
export const ActionCell = ({rowIndex, data, columnKey,selEdit,selDel,mid, ...props}) => (
  <Cell {...props}>
    <div className="gor-user-Logo-wrap">
      <button onClick={selEdit.bind(this,columnKey,rowIndex)}>
        <div className="user-edit-icon" /><span>Edit</span>
      </button>
    </div>
    <div className="gor-user-Logo-wrap">
      <button disabled={(mid===data.getObjectAt(rowIndex).uid)?true:false} onClick={selDel.bind(this,columnKey,rowIndex)} >
        <div className="user-del-icon" /><span>Delete</span>
      </button>
    </div>  
  </Cell>
);

export const TextCell = ({rowIndex, data, columnKey, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);

export const ProgressCell = ({rowIndex, data, columnKey, ...props}) => (
  <Cell {...props}>
  <div className="gor-progressBar-wrap">
    <div className="gor-progressBar" style={{width:data.getObjectAt(rowIndex)[columnKey]}} />
  </div>
    <div className="gorProgressBarLabel">
      { data.getObjectAt(rowIndex)[columnKey]}% 
    </div>
  </Cell>
);

export const ComponentCell = ({rowIndex, data, columnKey,checkState,checked, ...props}) => (
  
  <Cell {...props}> <input type="checkbox" checked={checked[rowIndex]} onChange={checkState.bind(this,columnKey,rowIndex,data.getObjectAt(rowIndex)[columnKey])}/>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);

export const StatusCell = ({rowIndex, data, columnKey,statusKey, ...props}) => (
  <Cell {...props} className={data.getObjectAt(rowIndex)[statusKey]}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);

export class tableRenderer {
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

export class SortHeaderCell extends React.Component {
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

    
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ?
          reverseSortDirection(this.props.sortDir) :
          SortTypes.DESC
      );
    
  }
}