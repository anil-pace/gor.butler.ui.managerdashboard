/**
 * Container for Notifications
 * 
 */
import React  from 'react';
//import {Table, Column, Cell} from 'fixed-data-table';
import {
    SortHeaderCell,
    tableRenderer,
    SortTypes,
    TextCell,
    ComponentCell,
    StatusCell,
    filterIndex,
    DataListWrapper,
    sortData,
    ProgressCell,
    ActionCellAudit,
    ToolTipCell
} from '../commonFunctionsDataTable';
import GorTable from '../gor-table-component/index'

class ViewAllNotifications extends React.Component{
	
	_closeModal(){
		this.props.removeModal();
	}

	
		
	render(){
		
		return (
			<div className="allNotificationWrap">
				          <div className="gor-modal-content">
            <div className='gor-modal-head'>
              <div className='gor-usr-add'>
                          <div className='gor-sub-head'></div>
              </div>
              <span className="close" onClick={this._closeModal.bind(this)}>×</span>
            </div>
            <div className='gor-modal-body'>

           			<div className="gorTableMainContainer gor-all-not-tbl">
           				<GorTable />
      				
            
        			</div>

            </div>
          </div>
				
			</div>
		);
	}
}

export default ViewAllNotifications ;
