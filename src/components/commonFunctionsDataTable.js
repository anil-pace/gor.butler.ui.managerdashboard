import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import {modal} from 'react-redux-modal';
import { FormattedMessage } from 'react-intl';
import DropdownTable from './dropdown/dropdownTable'

export var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};



function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}
export function filterIndex(e,_dataList,filterField) {
	var filterBy = e.target.value.toLowerCase();
     var size = _dataList.getSize(), data = [];
     var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      var getData = _dataList.getObjectAt(index);
      for (var i = filterField.length - 1; i >= 0; i--) {
        data[i] = getData[filterField[i]];

        if (data[i].toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
          break;
        }
      }
      
      
    }
    return filteredIndexes;
}

var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;
export function sortData (columnKey, sortDir,sortIndexes,_dataList) {
	 sortIndexes.sort((indexA, indexB) => {
      var sortVal = 0;
      var AInt = parseInt(_dataList.getObjectAt(indexA)[columnKey], 10);
    var BInt = parseInt(_dataList.getObjectAt(indexB)[columnKey], 10);

    if(isNaN(AInt) && isNaN(BInt)){
        var aA = _dataList.getObjectAt(indexA)[columnKey].replace(reA, "");
        var bA = _dataList.getObjectAt(indexB)[columnKey].replace(reA, "");
        if(aA === bA) {
            var aN = parseInt(_dataList.getObjectAt(indexA)[columnKey].replace(reN, ""), 10);
            var bN = parseInt(_dataList.getObjectAt(indexB)[columnKey].replace(reN, ""), 10);
            sortVal =  aN === bN ? 0 : aN > bN ? 1 : -1;
        } else {
            sortVal =  aA.localeCompare(bA);
        }
    }else if(isNaN(AInt)){
        sortVal =  1;
    }else if(isNaN(BInt)){
        sortVal =  -1;
    }else{
        sortVal =  AInt > BInt ? 1 : -1;
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
        <div className="gor-edit-icon" /><span>
          <FormattedMessage id="commonDataTable.edit.button" description='edit button' defaultMessage='Edit'/>
        </span>
      </button>
    </div>
    <div className="gor-user-Logo-wrap">

      <button disabled={(mid===data.getObjectAt(rowIndex).uid)?true:false} onClick={selDel.bind(this,columnKey,rowIndex)} >
        <div className="gor-del-icon" /><span><FormattedMessage id="commonDataTable.Delete.button" description='Delete button' defaultMessage='Delete'/></span>

      </button>
    </div>  
  </Cell>
);

export const TextCell = ({rowIndex, data, columnKey,classKey, ...props}) => (
  <Cell {...props} className={data.getObjectAt(rowIndex)[classKey]}>
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

export const ActionCellAudit = ({rowIndex, data, columnKey, tasks, handleAudit,manageAuditTask, clickDropDown,showBox, ...props}) => (
  <Cell {...props}>
    <div className="gor-audit-actions-button">
     {data.getObjectAt(rowIndex)[showBox]?(
      <button className="gor-add-btn" onClick={handleAudit.bind(this,columnKey,rowIndex)}>
          <FormattedMessage id="commonDataTable.startAudit.button" description='edit button' defaultMessage='Start audit'/>
      </button>):''}
    </div>
    <div className="gor-audit-actions-drop" onClick={clickDropDown.bind(this,rowIndex)}>
      <DropdownTable  styleClass={'gorDataTableDrop'} placeholder="Manage Tasks" items={tasks} changeMode={manageAuditTask.bind(this,rowIndex)}/>
    </div>
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
    var {sortDir, children,onSortChange, ...props} = this.props;
    return (
      <Cell {...props}>
        <a onClick={this._onSortChange}>
          {children} 
          <div className="sortIcon" >{sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''} </div>
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