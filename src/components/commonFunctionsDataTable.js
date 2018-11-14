import React from 'react';
import { Cell} from 'fixed-data-table';
import { FormattedMessage } from 'react-intl';
import DropdownTable from './dropdown/dropdownTable'
import {AUDIT_APPROVED, AUDIT_REJECTED,VIEW_AUDIT_ISSUES,APPROVE_AUDIT,GOR_STATUS,AUDIT_UNRESOLVED,AUDIT_REJECTED_STATUS,AUDIT_RESOLVED_STATUS,AUDIT_REAUDITED_STATUS,PPS_STATUS_FCLOSE,RESOLVED,REJECTED,AUDIT_LINE_REAUDITED,AUDIT_PENDING_APPROVAL,GOR_AUDIT_STATUS_DATA} from '../constants/frontEndConstants';
import {SYTEM_GENERATED_TEXT} from "../constants/messageConstants";
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
        var aA= valA ? valA.replace(reA, "") : "";
        var bA= valB ? valB.replace(reA, "") : "";
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
    if(data.newData && !data.newData[index].duplicatable){
        taskList[0].disabled=true
    }
    if(data.newData && !data.newData[index].deletable){
        taskList[1].disabled=true
    }
    if(data.newData && !data.newData[index].cancellable){
        taskList[2].disabled=true
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

export const TextCell=({rowIndex, data, columnKey,setClass, ...props})=>{

  const childrenCell =  React.Children.map(props.children, child => {

       return data.getObjectAt(rowIndex)[props.childColumnKey] ?(
        <span className={props.childrenClass}>{child}{data.getObjectAt(rowIndex)[props.childColumnKey]}</span>
      ):("");
    });
  return(<Cell {...props}  className={data.getObjectAt(rowIndex)[setClass]}>
    {data.getObjectAt(rowIndex)[columnKey]}
    {childrenCell}
  </Cell>
)};

export const AuditPackingSlotIdCell = ({rowIndex, data, columnKey, setClass, ...props}) => {

    return (<Cell {...props} className={data.getObjectAt(rowIndex)[setClass]}>

            <div>
                <div className="gor-audit-resolve-packing-cell">{data.getObjectAt(rowIndex)[columnKey]}</div>
                <div className="gor-audit-resolve-packing-cell">{data.getObjectAt(rowIndex).anamoly_info[0]?data.getObjectAt(rowIndex).anamoly_info[0].name:""}</div>
                <div className="gor-audit-resolve-packing-cell">{data.getObjectAt(rowIndex).anamoly_info[1]?data.getObjectAt(rowIndex).anamoly_info[1].name:""}</div>
            </div>
        </Cell>
    )
};
export const AuditPackingQuantityCell = ({rowIndex, data, columnKey, setClass,dataIndex,dataKey, ...props}) => {

    const outer_pack=data.getObjectAt(rowIndex)[columnKey].filter(function(packing_info){return packing_info.type==="container_level_2"})
    const inner_pack=data.getObjectAt(rowIndex)[columnKey].filter(function(packing_info){return packing_info.type==="container_level_1"})


    return (<Cell {...props} className={data.getObjectAt(rowIndex)[setClass]}>

            <div>
                <div className="gor-audit-resolve-packing-cell"/>
                <div className="gor-audit-resolve-packing-cell">{inner_pack.length!==0?inner_pack[0][dataKey]:""}</div>
                <div className="gor-audit-resolve-packing-cell">{outer_pack.length!==0?outer_pack[0][dataKey]:""}</div>
            </div>
        </Cell>
    )
};
export const AuditPackingStatusCell = ({rowIndex, data, columnKey, setClass, ...props}) => {

    return (<Cell {...props} className={data.getObjectAt(rowIndex)[setClass]}>

            <div>
                <div className="gor-audit-resolve-packing-cell">{data.getObjectAt(rowIndex)[columnKey]}</div>
                <div className="gor-audit-resolve-packing-cell"/>
                <div className="gor-audit-resolve-packing-cell"/>
            </div>
        </Cell>
    )
};
export const AuditPackingResolveCell = ({rowIndex, data, columnKey, setClass, checkStatus, screenId, children, ...props}) => {
    const childrenCell = React.Children.map(children,
        (child) => React.cloneElement(child, {
            rowIndex: rowIndex

        })
    );
    return (<div>
            <div style={{height: 30, paddingTop: 15}}>{childrenCell}</div>
            <div style={{height: 30, paddingTop: 20}}/>
            <div style={{height: 30, paddingTop: 20}}/>
        </div>

    )
};



export const ToolTipCell=({rowIndex, data, columnKey,setClass,callBack,tooltipData, ...props})=> (
  <Cell {...props} className={setClass}>
    {data.getObjectAt(rowIndex)[columnKey]}
    <div className="gor-tool-tip-hover" onMouseEnter={callBack}>
      {data.getObjectAt(rowIndex)[tooltipData] && data.getObjectAt(rowIndex)[tooltipData][Object.keys(data.getObjectAt(rowIndex)[tooltipData])[0]]
          ?<FormattedMessage id="commonDataTable.attributesType.itemSelectedText" description='heading for attribute' values={{count:data.getObjectAt(rowIndex)[tooltipData][Object.keys(data.getObjectAt(rowIndex)[tooltipData])[0]].length}} defaultMessage='{count} items selected'/>
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


export const ProgressCell=({rowIndex, data, columnKey, totalIssues, unresolved, ...props})=> (
  <Cell {...props}>
  <div className="gor-progressBar-wrap">
    <div className="gor-progressBar" style={{width:((data.getObjectAt(rowIndex)[columnKey])*1.4)}} />
    {(data.getObjectAt(rowIndex)[totalIssues] && data.getObjectAt(rowIndex)[unresolved])?
    <div className="gor-resolve-head">
    <FormattedMessage id="audit.resolveUnresolve" description='resolveUnresolve issue for audit table' defaultMessage='{resolvedCount} issues, {unresolvedCount} unresolved' values={{resolvedCount:data.getObjectAt(rowIndex)[totalIssues], unresolvedCount:data.getObjectAt(rowIndex)[unresolved] }}/>
    </div> : ""
    }

    {(data.getObjectAt(rowIndex)[totalIssues] && !data.getObjectAt(rowIndex)[unresolved])?
    <div className="gor-resolve-head">
    <FormattedMessage id="audit.resolveIssues" description='resolve issue for audit table' defaultMessage='{resolvedCount} issues' values={{resolvedCount:data.getObjectAt(rowIndex)[totalIssues]}}/>
    </div> : ""
    }

    {(!data.getObjectAt(rowIndex)[totalIssues] && data.getObjectAt(rowIndex)[unresolved])?
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
// export const PPSComponentCell=({rowIndex, data, columnKey,checkState,checked, ...props})=> (

//   <Cell {...props}> <input type="checkbox" checked={data.getObjectAt(rowIndex)["isChecked"]} onChange={checkState.bind(this,props.checkboxColumn,rowIndex)}/>
//     {data.getObjectAt(rowIndex)[columnKey]}
//   </Cell>
// );

export const PPSComponentCell=({rowIndex, data, columnKey,checkState,checked, setClass, ...props})=> {
    const childrenCell =  React.Children.map(props.children, child => {
        return data.getObjectAt(rowIndex)[props.childColumnKey] ?(
         <span className={props.childrenClass}>{child}{data.getObjectAt(rowIndex)[props.childColumnKey]}</span>
       ):("");
     });

  return (<Cell {...props}> <input type="checkbox" checked={data.getObjectAt(rowIndex)["isChecked"]} onChange={checkState.bind(this,props.checkboxColumn,rowIndex)}/>
    {data.getObjectAt(rowIndex)[columnKey]}
    {childrenCell}
  </Cell>
)};



export const StatusCell=({rowIndex, data, columnKey,statusKey, ...props})=> (
  <Cell {...props} className={data.getObjectAt(rowIndex)[statusKey]}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);

export const ConnectionDetailsCell=({rowIndex, data, columnKey,subColumnKey,setClass, ...props})=>{

 const children = React.Children.map(props.children, (child,idx) => {
      return (
        <div className="connectionDetails">{child}<span>{idx === 0 ? data.getObjectAt(rowIndex)[columnKey] : data.getObjectAt(rowIndex)[subColumnKey]}</span></div>
      );
    });

  return(<Cell {...props} >
    {children}
  </Cell>)
};

export const OperatingModeCell=({rowIndex, data, columnKey,subColumnKey,classKey,setClass, ...props})=>{

 const children = (<div className={"actionTriggered "+data.getObjectAt(rowIndex)[classKey]}>
    <div className="action-left">
      <span className={"action-icon"}></span>
    </div>
    <div className="action-right">
      <p className="action-triggered">{data.getObjectAt(rowIndex)[columnKey]}</p>
      <p className="sensor-triggered">{data.getObjectAt(rowIndex)[subColumnKey]}</p>
    </div>
  </div>)

  return(<Cell {...props} >
    {children}
  </Cell>)
};

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
            <div style={(screenId===VIEW_AUDIT_ISSUES || data.getObjectAt(rowIndex)[GOR_AUDIT_STATUS_DATA]!==AUDIT_PENDING_APPROVAL)?{opacity: 0.5}:{opacity: 1}}>
                <input type="radio"  name={data.getObjectAt(rowIndex)["auditLineId"]} disabled={data.getObjectAt(rowIndex)[GOR_AUDIT_STATUS_DATA]!==AUDIT_PENDING_APPROVAL?true:false}
                       onChange={checkStatus.bind(this,rowIndex,AUDIT_APPROVED,data.getObjectAt(rowIndex)["auditLineId"])} checked={data.getObjectAt(rowIndex)[GOR_AUDIT_STATUS_DATA]===RESOLVED?true:false}/>
                <FormattedMessage id="commonDataTable.resolveAudit.approve" description='resolve button' defaultMessage='Approve '/>
                <input type="radio"  name={data.getObjectAt(rowIndex)["auditLineId"]} disabled={data.getObjectAt(rowIndex)[GOR_AUDIT_STATUS_DATA]!==AUDIT_PENDING_APPROVAL?true:false}
                       onChange={checkStatus.bind(this,rowIndex,AUDIT_REJECTED,data.getObjectAt(rowIndex)["auditLineId"])} checked={data.getObjectAt(rowIndex)[GOR_AUDIT_STATUS_DATA]===REJECTED|| data.getObjectAt(rowIndex)[GOR_AUDIT_STATUS_DATA]===AUDIT_LINE_REAUDITED}/>
                <FormattedMessage id="commonDataTable.resolveAudit.reject" description='resolve button' defaultMessage='Reject'/>
            </div>:
            <div style={(screenId===VIEW_AUDIT_ISSUES || data.getObjectAt(rowIndex)[GOR_AUDIT_STATUS_DATA]!==AUDIT_PENDING_APPROVAL)?{opacity: 0.5}:{opacity: 1}}>
                <input type="radio"  name={data.getObjectAt(rowIndex)["auditLineId"]} defaultChecked={data.getObjectAt(rowIndex)[GOR_AUDIT_STATUS_DATA]===RESOLVED?true:false} disabled={data.getObjectAt(rowIndex)[GOR_AUDIT_STATUS_DATA]!==AUDIT_PENDING_APPROVAL?true:false}
                       onChange={checkStatus.bind(this,rowIndex,AUDIT_APPROVED,data.getObjectAt(rowIndex)["auditLineId"])} />
                <FormattedMessage id="commonDataTable.resolveAudit.approve" description='resolve button' defaultMessage='Approve '/>
                <input type="radio"  name={data.getObjectAt(rowIndex)["auditLineId"]} defaultChecked={data.getObjectAt(rowIndex)[GOR_AUDIT_STATUS_DATA]===REJECTED|| data.getObjectAt(rowIndex)[GOR_AUDIT_STATUS_DATA]===AUDIT_LINE_REAUDITED} disabled={data.getObjectAt(rowIndex)[GOR_AUDIT_STATUS_DATA]!==AUDIT_PENDING_APPROVAL?true:false}
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
        <Dropdown placeholder={placeholderText} noBorder={true} labelIcon={"gor-action-audit-icon"}  options={auditTaskActions(data,rowIndex)} onSelectHandler={manageAuditTask.bind(this,rowIndex)} resetOnSelect={true}/>
      </div>
  </Cell>
);



export class ActionCellPPS extends React.Component {
    constructor(props){
        super(props)
    }
    /**
     * The method will return
     * the profile name of applied profile
     * that need to be displayed
     * as the placeholder of action dropdown.
     * @param data
     * @param index
     * @returns {string}
     */
    ppsProfilePlaceHolder(data, index) {
    let applied_profile=""
    if (!data.getObjectAt(index)) {
        return applied_profile
    }
    try{
        applied_profile = data.getObjectAt(index).profiles.filter(function (profile) {
            return profile.applied
        })[0].profile_name
    }catch(ex){

    }



    return applied_profile

}

    /**
     * The method will return
     * the list of profiles
     * need to be shown in the option
     * of available profiles that can be
     * applied.
     * @param data
     * @param index
     */
    availablePPSProfiles(data, index) {
    let profiles=data.getObjectAt(index).profiles.map((profile)=>{
        return{
          ...profile,
          value:profile.profile_name,
          label:profile.profile_name
        }
        
    })


    return profiles
}

    render() {
        let self = this
        if (self.props.data.getObjectAt(self.props.rowIndex)) {
            let placeholder = self.ppsProfilePlaceHolder(self.props.data, self.props.rowIndex)
            let options = self.availablePPSProfiles(self.props.data, self.props.rowIndex)
            let forced_close_pps=self.props.data.getObjectAt(self.props.rowIndex).statusClass===PPS_STATUS_FCLOSE
            let any_requested_profile = self.props.data.getObjectAt(self.props.rowIndex)[self.props.columnKey].filter(function (profile) {
                    return profile.requested
                }).length > 0
            return <Cell>
                <div className="gor-pps-profile-drop">
                    <Dropdown disabled={any_requested_profile ||forced_close_pps} noBorder={true} labelIcon={"gor-action-pps-icon"} listItemIcon={"gor-tick-icon"} placeholder={placeholder} options={options}
                              onSelectHandler={self.props.confirmApplyProfile.bind(self, self.props.data.getObjectAt(self.props.rowIndex)['ppsId'])}
                              resetOnSelect={true}/>
                </div>
                {any_requested_profile &&
                <span className="requestedProfileTxt"><FormattedMessage id="pps.configuration.profile.requestedText"
                                                                        description='requested profile for PPS'
                                                                        defaultMessage='Requested Profile: {requestedProfile}'
                                                                        values={{
                                                                            requestedProfile: self.props.data.getObjectAt(self.props.rowIndex)[self.props.columnKey].filter(function (profile) {
                                                                                return profile.requested
                                                                            })[0].profile_name,
                                                                        }}/></span>
                }

            </Cell>
        } else {
            return null
        }

    }
}


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

    if(e.target.offsetParent.className!='gor-audit-header-check'){
    e.preventDefault();
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ?
          reverseSortDirection(this.props.sortDir) :
          SortTypes.DESC
      );
  }
}
}


export const AuditIssuesTooltipCell = ({rowIndex, data, columnKey, setClass, callBack, resolved, unresolved,checkState,checked,showBox, ...props}) => (
 <Cell {...props}>
 {data.getObjectAt(rowIndex)[showBox]?<div className='displayLeft'><input type="checkbox" checked={data.getObjectAt(rowIndex)["isChecked"] && data.getObjectAt(rowIndex)[showBox]} onChange={checkState.bind(this,props.checkboxColumn,rowIndex)}/></div>:''}
      
      <div className={data.getObjectAt(rowIndex)[showBox]?"gor-audit-id":"gor-audit-id gor-audit-id-leftShift"}>

        {data.getObjectAt(rowIndex)[unresolved] || data.getObjectAt(rowIndex).infoIcon?

            <div  className="gor-tool-tip-hover" style={{fontSize:16,color:'black', display:'inline-block'}}>
                <span className="gor-inline"> {data.getObjectAt(rowIndex)[columnKey]} </span><span className="gor-audit-info-icon" onMouseEnter={callBack}/>
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
            </div>:<div className="gor-subheading">{data.getObjectAt(rowIndex)[columnKey]}</div>
        } 
        {data.getObjectAt(rowIndex).system_created_audit?<div className="gor-subheading-title">{SYTEM_GENERATED_TEXT}</div>:''}
        </div>


    </Cell>
);