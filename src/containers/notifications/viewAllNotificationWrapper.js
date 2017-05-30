/**
 * Container for Notifications
 * 
 */
import React  from 'react';
import { connect } from 'react-redux';

import Dimensions from 'react-dimensions';
import {FormattedMessage, FormattedDate, FormattedRelative} from 'react-intl';
import {GTable} from '../../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableNoResult} from "../../components/gor-table-component/noResultFound";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import NotificationDescription from '../../components/notifications/notificationDescription';
import Spinner from '../../components/spinner/Spinner';
import {NOTIFICATIONS_URL} from "../../constants/configConstants";
import {GET,GET_ALL_NOTIFICATIONS,APP_JSON,SEARCHED_NOTIFICATIONS_DATA_ALL} from "../../constants/frontEndConstants";
import {getNotificationData,
	resetNotificationTableData,
	setNotificationSpinner} from '../../actions/notificationAction';



class ViewAllNotificationWrapper extends React.Component{
	
	constructor(props) {
        super(props);
       
        this.state = {
            page:1,
            size:15
             
        }
    }


		
	_closeModal(){
		this.props.removeModal();
		this.props.resetNotificationTableData(true);
	}

	_onSortChange(){

	}

	componentDidMount(){
		let params={
                'url':NOTIFICATIONS_URL+"?page="+this.state.page+"&size="+this.state.size,
                'method':GET,
                'cause':GET_ALL_NOTIFICATIONS,
                'contentType':APP_JSON,
                'accept':APP_JSON,
            }
		this._fetchNotificationData(params);
	}

	_fetchNotificationData(params,page,size){
		this.props.setNotificationSpinner(true);
        this.props.getNotificationData(params);
	}

	

	_processData(){
		var data = this.props.searchAppliedAllNotifications ? this.props.searchedAllNotificationData : this.props.completeNotificationData;
		var dataLen = data.length;
		var tableRows = [];
		var processedData = {};
		if(dataLen){
			
			for(let i =0 ; i < dataLen ; i++){
				let tableRow = [];
				let createDate = new Date(new Date(data[i].createTime).toLocaleString("en-US",{timeZone: "Asia/Kolkata"}))
				tableRow.push(<NotificationDescription>
								<p className="title">{data[i].title}</p>
								<p className="desc">{data[i].description}</p>
							</NotificationDescription>);
				tableRow.push(<FormattedRelative value={createDate} /> );
				tableRows.push(tableRow);
			}
			processedData.data = tableRows;
			processedData.filteredData = tableRows;
			

		}
		processedData.header = [{id:1,text: "Description", sortable: true},
             			{id:2,text: "Time", searchable: false}
             ];
        processedData.offset = 0;
        processedData.max= tableRows.length || 15;
		return processedData;
	}

	shouldComponentUpdate(nextProps){
		if(nextProps.hasDataChanged !== this.props.hasDataChanged){
			return true;
		}
		return false
	}
	_onScrollHandler(event){
		
		if(event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight){
				let page = this.state.page + 1;
				let params={
                'url':NOTIFICATIONS_URL+"?page="+page+"&size="+this.state.size,
                'method':GET,
                'cause':GET_ALL_NOTIFICATIONS,
                'contentType':APP_JSON,
                'accept':APP_JSON,
            }
				this._fetchNotificationData(params);
				this.setState({
					page
				})
		}
		
	}
	_handleSubmit(e){
		e.preventDefault();
		var value = this.searchInput.value.trim();
		if(value){
		let params={
                'url':NOTIFICATIONS_URL+"?page=0&size=15&searchTerm="+value,
                'method':GET,
                'cause':SEARCHED_NOTIFICATIONS_DATA_ALL,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'withCredentials':true
            }
        
        this._fetchNotificationData(params);
    }
    else{
    	this.props.resetNotificationTableData(false);

    }
		this.setState({
        	page:0,
        	searchTerm:value
        })
	}
	
		
	render(){
		var self = this;
		var processedData = this._processData();
		return (
			<div className="allNotificationWrap">
			<Spinner isLoading={this.props.isLoading} />
			<div className="gor-modal-content">
            <div className='gor-modal-head'>
            <span className="close" onClick={this._closeModal.bind(this)}>×</span>
              <p className="modal-head-text">Notifications</p>
               <div className="modal-search-input">
               <div className="viewAllNotSearch">
               <form action="#" onSubmit={(e) => this._handleSubmit(e)}>
               <input type="text" placeholder="Search" ref={(searchInput) => this.searchInput = searchInput}/>
               <button  className="notificationSearch">Submit</button>
                
               </form>
               </div>
               </div>
              
            </div>
            <div className='gor-modal-body'>

           			<div className="gorTableMainContainer gor-all-not-tbl">
      				
                <GTable options={['table-bordered']}>
                    <GTableHeader>
                        {processedData.header.map(function (header, index) {
                            return <GTableHeaderCell key={index} header={header} onClick={header.sortable ? self._onSortChange.bind(self, header) : false}>
                                	{header.text}
                                </GTableHeaderCell>

                        })}
                    </GTableHeader>
                    <GTableBody data={processedData.filteredData} onScrollHandler={self._onScrollHandler.bind(this)}>
                        {processedData.filteredData ? processedData.filteredData.map(function (row, idx) {
                            return (
                                <GTableRow key={idx} index={idx} offset={processedData.offset} max={processedData.max} data={processedData.filteredData}>
                                    {row.map(function (text, index) {
                                        return <div key={index} style={processedData.header[index].width?{flex:'1 0 '+processedData.header[index].width+"%"}:{}} className="cell" title={processedData.header[index].text}>
                                            {text}
                                        </div>
                                    })}
                                </GTableRow>
                            )
                        }):""}
                    </GTableBody>
                </GTable>
            
        			</div>

            </div>
          </div>
				
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
    return {
        "completeNotificationData": state.notificationReducer.completeNotificationData || [],
        "hasDataChanged":state.notificationReducer.hasDataChanged,
        "isLoading":state.notificationReducer.isLoading,
        "searchedAllNotificationData":state.notificationReducer.searchedAllNotificationData,
        "searchAppliedAllNotifications":state.notificationReducer.searchAppliedAllNotifications
    }
}
function mapDispatchToProps(dispatch){
	return{
		getNotificationData:function(params){dispatch(getNotificationData(params));},
		resetNotificationTableData:function(data){dispatch(resetNotificationTableData(data));},
		setNotificationSpinner:function(data){dispatch(setNotificationSpinner(data));}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(ViewAllNotificationWrapper);


