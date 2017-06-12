import React from 'react';
import { Cell} from 'fixed-data-table';
import { FormattedMessage } from 'react-intl';
import DropdownTable from './dropdown/dropdownTable'
import {AUDIT_APPROVED, AUDIT_REJECTED,VIEW_AUDIT_ISSUES,APPROVE_AUDIT,GOR_STATUS,AUDIT_UNRESOLVED,AUDIT_REJECTED_STATUS,AUDIT_RESOLVED_STATUS,AUDIT_REAUDITED_STATUS} from '../constants/frontEndConstants';
import Dropdown from "./gor-dropdown-component/dropdown";
export var SortTypes={
  ASC: 'ASC',
  DESC: 'DESC',
};



function reverseSortDirection(sortDir) {
  return sortDir=== SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}
export function filterIndex(e,_dataList,filterField) {
  var filterBy 
  if(!e.target) {
    filterBy=e.toLowerCase();
  }
  else {
	filterBy=e.target.value.toLowerCase();
  }

     var size=_dataList.getSize(), data=[];
     var filteredIndexes=[];

    for (var index=0; index < size; index++) {
      var getData=_dataList.getObjectAt(index);
      for (var i=filterField.length - 1; i >= 0; i--) {
        data[i]=getData[filterField[i]];

        if (typeof data[i]=== "string" && data[i].toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
          break;
        }
      }
    }
  
    return filteredIndexes;
}

var reA=/[^a-zA-Z]/g;
var reN=/[^0-9]/g;
export function sortData (columnKey, sortDir,sortIndexes,_dataList) {
	 sortIndexes.sort((indexA, indexB)=> {
      var sortVal=0,valA,valB;
     if(_dataList._data) {
        valA=_dataList._data.newData[indexA][columnKey];
        valB=_dataList._data.newData[indexB][columnKey];
      }

      else {
        valA=_dataList.newData[indexA][columnKey];
        valB=_dataList.newData[indexB][columnKey];
      }
      var AInt=parseInt(valA, 10);
    var BInt=parseInt(valB, 10);

    if(isNaN(AInt) && isNaN(BInt)){
        var aA=valA.replace(reA, "");
        var bA=valB.replace(reA, "");
        if(aA=== bA) {
            var aN=parseInt(valA.replace(reN, ""), 10);
            var bN=parseInt(valB.replace(reN, ""), 10);
            sortVal= aN=== bN ? 0 : aN > bN ? 1 : -1;
        } else {
            sortVal= aA.localeCompare(bA);
        }
    }else if(isNaN(AInt)){
        sortVal= 1;
    }else if(isNaN(BInt)){
        sortVal= -1;
    }else{
        sortVal= AInt > BInt ? 1 : -1;
    }

    if (sortVal !== 0 && sortDir=== SortTypes.ASC) {
        sortVal *= -1;
      }


    return sortVal;
    });
	 return sortIndexes;
}


function auditTaskActions(data, index){
    debugger
    var duplicateTask = <FormattedMessage id="audit.table.duplicateTask"
                                          description="duplicateTask option for audit"
                                          defaultMessage="Duplicate task"/>;
    var deleteRecord = <FormattedMessage id="audit.table.deleteRecord" description="deleteRecord option for audit"
                                         defaultMessage="Delete record"/>;
    var cancelTask = <FormattedMessage id="audit.table.cancelTask" description="cancel option for task"
                                       defaultMessage="Cancel Task"/>;
    let taskList=[
        {value: 'duplicateTask', label: duplicateTask,disabled:false},
        {value: 'deleteRecord', label: deleteRecord,disabled:false},
        {value:"cancelTask",label:cancelTask,disabled:false}
    ]
    if(data.newData && !data.newData[index].cancellable){
        taskList[2].disabled=true
    }
    if(data.newData && !data.newData[index].deletable){
        taskList[1].disabled=true
    }
    return taskList
}

export class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap=indexMap;
    this._data=data;
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
 
export const ActionCell=({rowIndex, data, columnKey,selEdit,selDel,mid, ...props})=> (
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

export const TextCell=({rowIndex, data, columnKey,setClass, ...props})=> (
  <Cell {...props} className={setClass}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);

export const ToolTipCell=({rowIndex, data, columnKey,setClass,callBack,tooltipData, ...props})=> (
  <Cell {...props} className={setClass}>
    {data.getObjectAt(rowIndex)[columnKey]}
    <div className="gor-tool-tip-hover" onMouseEnter={callBack}>
      {data.getObjectAt(rowIndex)[tooltipData] && data.getObjectAt(rowIndex)[tooltipData][Object.keys(data.getObjectAt(rowIndex)[tooltipData])[0]]
          ?data.getObjectAt(rowIndex)[tooltipData][Object.keys(data.getObjectAt(rowIndex)[tooltipData])[0]].length+" items selected"
          :""}
    </div>
    {data.getObjectAt(rowIndex)[tooltipData] && data.getObjectAt(rowIndex)[tooltipData][Object.keys(data.getObjectAt(rowIndex)[tooltipData])[0]]?
    <div className="gor-tooltip">
      <div className="gor-tooltip-arrow"/> 
      <div className="gor-tooltip-text-wrap">
        <div className="gor-tooltip-heading">
          <FormattedMessage id="commonDataTable.attributesType.heading" description='heading for attribute' defaultMessage='Box Id'/>
        </div>
        <div className="gor-tooltip-datalines">
            <div>
              {data.getObjectAt(rowIndex)[tooltipData] && data.getObjectAt(rowIndex)[tooltipData][Object.keys(data.getObjectAt(rowIndex)[tooltipData])[0]]?
                  (data.getObjectAt(rowIndex)[tooltipData][Object.keys(data.getObjectAt(rowIndex)[tooltipData])[0]].map(function(object, i){return <div key={i} > {i+1}. {object} </div>;}))
                  :""}
            </div>
        </div>
      </div> 
    </div>
    :""}
  </Cell>
);
//assuming only one attributes is there in tool tip component (kerry specific)


export const ProgressCell=({rowIndex, data, columnKey, resolved, unresolved, ...props})=> (
  <Cell {...props}>
  <div className="gor-progressBar-wrap">
    <div className="gor-progressBar" style={{width:((data.getObjectAt(rowIndex)[columnKey])*1.4)}} />
    {(data.getObjectAt(rowIndex)[resolved] && data.getObjectAt(rowIndex)[unresolved])?
    <div className="gor-resolve-head">
    <FormattedMessage id="audit.resolveUnresolve" description='resolveUnresolve issue for audit table' defaultMessage='{resolvedCount} issues, {unresolvedCount} unresolved' values={{resolvedCount:data.getObjectAt(rowIndex)[resolved], unresolvedCount:data.getObjectAt(rowIndex)[unresolved] }}/>
    </div> : ""
    }

    {(data.getObjectAt(rowIndex)[resolved] && !data.getObjectAt(rowIndex)[unresolved])?
    <div className="gor-resolve-head">
    <FormattedMessage id="audit.resolveIssues" description='resolve issue for audit table' defaultMessage='{resolvedCount} issues' values={{resolvedCount:data.getObjectAt(rowIndex)[resolved]}}/>
    </div> : ""
    }

    {(!data.getObjectAt(rowIndex)[resolved] && data.getObjectAt(rowIndex)[unresolved])?
    <div className="gor-resolve-head">
    <FormattedMessage id="audit.unresolveIssues" description='unresolve issue for audit table' defaultMessage='{unresolvedCount} {unresolvedCount,plural, one {unresolved issue} other{unresolved issues}}' values={{unresolvedCount:data.getObjectAt(rowIndex)[unresolved]?data.getObjectAt(rowIndex)[unresolved]:"0"}}/>
    </div> : ""
    }

  </div>
    <div className="gorProgressBarLabel">
      { data.getObjectAt(rowIndex)[columnKey]}% 
    </div>
  </Cell>
);

export const ComponentCell=({rowIndex, data, columnKey,checkState,checked, ...props})=> (
  
  <Cell {...props}> <input type="checkbox" checked={checked[rowIndex]?true:false} onChange={checkState.bind(this,columnKey,rowIndex,data.getObjectAt(rowIndex)[columnKey])}/>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);

export const StatusCell=({rowIndex, data, columnKey,statusKey, ...props})=> (
  <Cell {...props} className={data.getObjectAt(rowIndex)[statusKey]}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);

export const AuditStatusCell=({rowIndex, data, columnKey,statusKey,descriptionKey, ...props})=> (
  <Cell {...props}>
      <Cell className={[data.getObjectAt(rowIndex)[statusKey]] } style={{padding:0}}>
          <div>
              {data.getObjectAt(rowIndex)[columnKey]}
          </div>
      </Cell>

      {descriptionKey && data.getObjectAt(rowIndex)[descriptionKey]?<div className="gor-audit-cancelling-text">{data.getObjectAt(rowIndex)[descriptionKey]}</div>:null}


  </Cell>
);

export const ResolveCell=({rowIndex, data, columnKey, checkStatus, screenId, ...props})=> (
  <Cell {...props}>
  {screenId===VIEW_AUDIT_ISSUES?
    <div style={(screenId===VIEW_AUDIT_ISSUES || data.getObjectAt(rowIndex)[GOR_STATUS]!==AUDIT_UNRESOLVED)?{opacity: 0.5}:{opacity: 1}}>
      <input type="radio"  name={data.getObjectAt(rowIndex)["auditLineId"]} disabled={data.getObjectAt(rowIndex)[GOR_STATUS]!==AUDIT_UNRESOLVED?true:false} 
             onChange={checkStatus.bind(this,rowIndex,AUDIT_APPROVED,data.getObjectAt(rowIndex)["auditLineId"])} checked={data.getObjectAt(rowIndex)[GOR_STATUS]===AUDIT_RESOLVED_STATUS?true:false}/>
        <FormattedMessage id="commonDataTable.resolveAudit.approve" description='resolve button' defaultMessage='Approve '/>
      <input type="radio"  name={data.getObjectAt(rowIndex)["auditLineId"]} disabled={data.getObjectAt(rowIndex)[GOR_STATUS]!==AUDIT_UNRESOLVED?true:false} 
             onChange={checkStatus.bind(this,rowIndex,AUDIT_REJECTED,data.getObjectAt(rowIndex)["auditLineId"])} checked={data.getObjectAt(rowIndex)[GOR_STATUS]===AUDIT_REJECTED_STATUS|| data.getObjectAt(rowIndex)[GOR_STATUS]===AUDIT_REAUDITED_STATUS}/>
        <FormattedMessage id="commonDataTable.resolveAudit.reject" description='resolve button' defaultMessage='Reject'/>
    </div>:
    <div style={(screenId===VIEW_AUDIT_ISSUES || data.getObjectAt(rowIndex)[GOR_STATUS]!==AUDIT_UNRESOLVED)?{opacity: 0.5}:{opacity: 1}}>
      <input type="radio"  name={data.getObjectAt(rowIndex)["auditLineId"]} disabled={data.getObjectAt(rowIndex)[GOR_STATUS]!==AUDIT_UNRESOLVED?true:false} 
             onChange={checkStatus.bind(this,rowIndex,AUDIT_APPROVED,data.getObjectAt(rowIndex)["auditLineId"])} />
        <FormattedMessage id="commonDataTable.resolveAudit.approve" description='resolve button' defaultMessage='Approve '/>
      <input type="radio"  name={data.getObjectAt(rowIndex)["auditLineId"]} disabled={data.getObjectAt(rowIndex)[GOR_STATUS]!==AUDIT_UNRESOLVED?true:false} 
             onChange={checkStatus.bind(this,rowIndex,AUDIT_REJECTED,data.getObjectAt(rowIndex)["auditLineId"])}/>
        <FormattedMessage id="commonDataTable.resolveAudit.reject" description='resolve button' defaultMessage='Reject'/>
    </div>
  }
  </Cell>
);

export const ActionCellAudit=({rowIndex, data, columnKey, handleAudit,manageAuditTask, clickDropDown,showBox,placeholderText,resolveflag,resolveAudit,checkIssues, ...props})=> (
  <Cell {...props}>
    <div className="gor-audit-actions-button">
     {data.getObjectAt(rowIndex)[showBox]?(
      <button className="gor-add-btn" onClick={handleAudit.bind(this,columnKey,rowIndex)}>
          <FormattedMessage id="commonDataTable.startAudit.button" description='start button' defaultMessage='Start audit'/>
      </button>):''}
     {data.getObjectAt(rowIndex)[resolveflag]?(
      <button className="gor-add-btn" onClick={resolveAudit.bind(this,columnKey,rowIndex,APPROVE_AUDIT,data)}>
          <FormattedMessage id="commonDataTable.resolveAudit.button" description='resolve button' defaultMessage='Resolve'/>
      </button>):''}
     {data.getObjectAt(rowIndex)[checkIssues]?(
      <button className="gor-resolve-button" onClick={resolveAudit.bind(this,columnKey,rowIndex,VIEW_AUDIT_ISSUES,data)}>
          <FormattedMessage id="commonDataTable.viewIssues.button" description='viewIssues button' defaultMessage='View issues'/>
      </button>):''}
    </div>
    <div className="gor-audit-actions-drop" >
        <Dropdown placeholder={placeholderText} options={auditTaskActions(data,rowIndex)} onSelectHandler={manageAuditTask.bind(this,rowIndex)} resetOnSelect={true}/>
      </div>
  </Cell>
);

export class tableRenderer {
  constructor(size){
    this.size=size;
    this.newData=[];
  }

  getObjectAt(index)  {
    if (index < 0 || index > this.size){
      return undefined;
    }
    return this.newData[index];
  }

  getAll() {
    if (this.newData.length < this.size) {
      for (var i=0; i < this.size; i++) {
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

    this._onSortChange=this._onSortChange.bind(this);
  }

  render() {
    var {sortDir, children,onSortChange, ...props}=this.props;
    return (
      <Cell {...props}>
        <a onClick={this._onSortChange}>
          {children} 
          <div className="sortIcon" >{sortDir ? (sortDir=== SortTypes.DESC ? '↑' : '↓') : ''} </div>
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

export const AuditIssuesTooltipCell = ({rowIndex, data, columnKey, setClass, callBack, resolved, unresolved, ...props}) => (
    <Cell {...props}>


        {data.getObjectAt(rowIndex)[unresolved] || data.getObjectAt(rowIndex).infoIcon?



            <div  className="gor-tool-tip-hover" style={{fontSize:16,color:'black'}} onMouseEnter={callBack}>
                {data.getObjectAt(rowIndex)[columnKey]} <span className="gor-audit-info-icon"/>
            </div>:data.getObjectAt(rowIndex)[columnKey]


        }


        {(data.getObjectAt(rowIndex)[resolved] && data.getObjectAt(rowIndex)[unresolved]) ?
            <div className="gor-tooltip">
                <div className="gor-tooltip-arrow"/>
                <div className="gor-tooltip-text-wrap">
                    <div className="gor-tooltip-heading">
                        <FormattedMessage id="audit.resolveUnresolve.tooltip.header"
                                          description='resolveUnresolve issue for audit table'
                                          defaultMessage='{resolvedCount} audit lines, {unresolvedCount} audit lines'
                                          values={{
                                              resolvedCount: data.getObjectAt(rowIndex)[resolved],
                                              unresolvedCount: data.getObjectAt(rowIndex)[unresolved]
                                          }}/>
                    </div>
                    <div className="gor-tooltip-datalines">
                        <div>

                            <FormattedMessage id="audit.resolveUnresolve.tooltip.content"
                                              description='unresolve issue for audit table'
                                              defaultMessage=' Approve or reject audit line with issues'
                                              values={{unresolvedCount: data.getObjectAt(rowIndex)[unresolved] ? data.getObjectAt(rowIndex)[unresolved] : "0"}}/>
                        </div>
                    </div>
                </div>
            </div>

            : ""
        }

        {(!data.getObjectAt(rowIndex)[resolved] && data.getObjectAt(rowIndex)[unresolved]) ?
            <div className="gor-tooltip">
                <div className="gor-tooltip-arrow"/>
                <div className="gor-tooltip-text-wrap">
                    <div className="gor-tooltip-heading">
                        <FormattedMessage id="audit.unresolveIssues.tooltip.header"
                                          description='unresolve issue for audit table'
                                          defaultMessage='{unresolvedCount} {unresolvedCount,plural, one {unresolved audit line} other{unresolved audit lines}}'
                                          values={{unresolvedCount: data.getObjectAt(rowIndex)[unresolved] ? data.getObjectAt(rowIndex)[unresolved] : "0"}}/>
                    </div>
                    <div className="gor-tooltip-datalines">
                        <div>
                            <FormattedMessage id="audit.unresolveIssues.tooltip.content"
                                              description='unresolve issue for audit table'
                                              defaultMessage=' Approve or reject audit line with issues'
                                              values={{unresolvedCount: data.getObjectAt(rowIndex)[unresolved] ? data.getObjectAt(rowIndex)[unresolved] : "0"}}/>
                        </div>
                    </div>
                </div>
            </div>

            : ""
        }

        {(!data.getObjectAt(rowIndex)[unresolved] && data.getObjectAt(rowIndex).infoIcon==='rejected') ?
            <div className="gor-tooltip">
                <div className="gor-tooltip-arrow"/>
                <div className="gor-tooltip-text-wrap">
                    <div className="gor-tooltip-heading">
                        <FormattedMessage id="audit.rejected.tooltip.header"
                                          description='rejected issue for audit table'
                                          defaultMessage='{rejected_lines}/{total_lines} {rejected_lines,plural, one {audit line} other{audit lines}} were rejected'
                                          values={{total_lines: data.getObjectAt(rowIndex).auditInfo.total_lines,rejected_lines:data.getObjectAt(rowIndex).auditInfo.rejected_lines}}/>
                    </div>
                    <div className="gor-tooltip-datalines">
                        <div>
                            <FormattedMessage id="audit.rejected.tooltip.content"
                                              description='Re-audit the rejected audit lines'
                                              defaultMessage=' Re-audit the rejected audit lines'/>
                        </div>
                    </div>
                </div>
            </div>

            : ""
        }


        {data.getObjectAt(rowIndex).infoIcon==="created"?
            <div className="gor-tooltip">
                <div className="gor-tooltip-arrow"/>
                <div className="gor-tooltip-text-wrap">
                    <div className="gor-tooltip-heading">
                        <FormattedMessage id="audit.created.tooltip.header"
                                          description='resolveUnresolve issue for audit table'
                                          defaultMessage='Assign PPS to start audit task'/>
                    </div>
                    <div className="gor-tooltip-datalines">
                        <div>

                            <FormattedMessage id="audit.created.tooltip.content"
                                              description='unresolve issue for audit table'
                                              defaultMessage=' Click on "Start Audit" to assign PPS'/>
                        </div>
                    </div>
                </div>
            </div>
            :""
        }

    </Cell>
);