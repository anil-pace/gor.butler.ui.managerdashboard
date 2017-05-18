/**
 * Container for Notifications
 * 
 */
import React  from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
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
import RowDataLoader from './RowDataLoader';
const NUMBER_OF_ROWS_MAX = 1000;
class ViewAllNotifications extends React.Component{
	
	_closeModal(){
		this.props.removeModal();
	}
	componentWillMount(){
		this._dataLoader = new RowDataLoader(() => {
      this.forceUpdate();
    });
	}
	_rowGetter(rowIndex){
		return this._dataLoader.getRowData(rowIndex);
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

           			<div className="gorTableMainContainer">

            <Table
		        rowHeight={30}
		        rowGetter={this._rowGetter.bind(this)}
		        rowsCount={NUMBER_OF_ROWS_MAX}
		        width={"100%"}
		        maxHeight={450}
		        headerHeight={40}
		        onRowClick={this._onRowClick}>
		        <Column
		          label="Movie Title"
		          width={270}
		          dataKey="title"
		        />
		        <Column
		          label="Rank"
		          width={100}
		          cellRenderer={this._renderButton}
		          dataKey="rank"
		        />
		        <Column
		          label="Year"
		          width={80}
		          dataKey="year"
		        />
      </Table>
            
        </div>

            </div>
          </div>
				
			</div>
		);
	}
}

export default ViewAllNotifications ;
