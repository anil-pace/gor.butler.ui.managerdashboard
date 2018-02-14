/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
 import React  from 'react';
 import {connect} from 'react-redux';
 import {GTable} from '../components/gor-table-component/index'
 import {GTableHeader,GTableHeaderCell} from '../components/gor-table-component/tableHeader';
 import {GTableBody} from "../components/gor-table-component/tableBody";
 import {GTableRow} from "../components/gor-table-component/tableRow";
 import {FormattedMessage} from 'react-intl';
 import Accordion from '../components/Accordian/accordian';
 import NameInitial from '../components/NameInitial/nameInitial';
 import DotSeparatorContent from '../components/dotSeparatorContent/dotSeparatorContent';
 import ProgressBar from '../components/progressBar/progressBar.js';
 import ViewDetailsAudit from '../containers/auditTab/viewDetailsAudit';
 import AuditStart from '../containers/auditTab/auditStart';
 import ActionDropDown from '../components/actionDropDown/actionDropDown';
 import {modal} from 'react-redux-modal';

 class auditListingTab extends React.Component{

   constructor(props) 
   {
    super(props);
    this._handelClick = this._handelClick.bind(this);
    this.state={visibleMenu:false} 
  }	

  headerCheckChange(){
   console.log('Print checked');
 }

 viewAuditDetails() {
  modal.add(ViewDetailsAudit, {
    title: '',
    size: 'large',
       	            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
       	            hideCloseButton: true // (optional) if you don't wanna show the top right close button
       	            //.. all what you put in here you will get access in the modal props ;),
                  });
}
startAudit() {
  modal.add(AuditStart, {
    title: '',
    size: 'large',
                        closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
                        hideCloseButton: true // (optional) if you don't wanna show the top right close button
                        //.. all what you put in here you will get access in the modal props ;),
                      });
}  

_handelClick(field) {
  console.log(field.target.value);

}          

render(){

  console.log('raaj');
  let me=this;
  console.log("coming inside new orders Tab");
  var processedData=[	
  {columnId: "1", headerText: "WaveId"},
  {columnId: "2", headerText: "ProgressBar"},
  {columnId: "3", headerText: "Cut off Time"},
  {columnId: "4", headerText: "Icon"}
  ];

  var tableData=[
  {id:1,text: "SKU CODE", sortable: true, icon: true,width:20}, 
  {id:2, text: "NAME",sortable: true,  icon: true,width:20}, 
  {id:3,text: "OPENING STOCK", searchable: false, icon: true,width:20},
  {id:4,text: "PURCHAGE QTY", searchable: false, icon: true},
  {id:5,text: "SALE QTY",sortable: true, icon: true}, 
  {id:6, text: "CLOSING STOCK",sortable: true, icon: true}

  ];
  return(

   <div>

   <div className="waveListWrapper">
   <GTable options={['table-bordered']}>

   <GTableBody data={tableData} >
   {tableData ? tableData.map(function (row, idx) {
    return (

    <GTableRow key={idx} index={idx} offset={tableData.offset} max={tableData.max} data={tableData} >

    {Object.keys(row).map(function (text, index) {
      return <div key={index} style={tableData[index].width?{flex:'1 0 '+tableData[index].width+"%"}:{}} className="cell" >
      {index==0?<label className="container" style={{'margin-top': '15px','margin-left': '10px'}}> <input type="checkbox"  onChange={me.headerCheckChange.bind(me)}/><span className="checkmark"></span></label> :""}
      {index==0?<NameInitial name='Raja dey' shape='round' />:""} 
      {index==0?<DotSeparatorContent header={[<FormattedMessage id="audit.data.subheading" description='Text for user delete' defaultMessage='Information will be lost'/>,<FormattedMessage id="audit.data.data2" description='user delete' defaultMessage='Information lost'/>]} subHeader={['PPS 003','MultiSKU','Today, 09:00']} separator={'.'} />:""} 
      {index==1?<ProgressBar progressWidth={70}/>:""}
      {index==2?<ActionDropDown style={{width:'115px'}} clickOptionBack={me._handelClick} data={[{name:'View deatils',value:'details'},{name:'Edit',value:'edit'},{name:'Duplicate',value:'Duplicate'},{name:'Delete',value:'Delete'}]}>
      <button className="gor-add-btn">
      Link
      </button>      
      </ActionDropDown>:""}

      </div>
    })}

    </GTableRow>
    )
  }):""}
  </GTableBody>

  </GTable>
  </div>
  </div>
  )
}
}
export default auditListingTab ;