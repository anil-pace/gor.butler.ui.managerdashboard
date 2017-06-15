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
import {GET,GET_ALL_NOTIFICATIONS,APP_JSON,SEARCHED_NOTIFICATIONS_DATA_ALL,DEFAULT_NOTIFICATION_ROW_LENGTH,DESC,ASC} from "../../constants/frontEndConstants";
import {getNotificationData,
	resetNotificationTableData,
	setNotificationSpinner,setInfiniteSpinner} from '../../actions/notificationAction';



class ViewAllNotificationWrapper extends React.Component{
	
	constructor(props) {
        super(props);
       
        this.state = {
            page:0,
            size:15,
            sort:"createTime",
            order:1
             
        }
    }


		
	_closeModal(){
		this.props.removeModal();
		this.props.resetNotificationTableData(true);
	}

	_onSortChange(){
		var currentOrder = this.state.order ? 0 : 1;
		var _this = this;
		_this.setState({
			order:currentOrder,
			page:0
		},function(){
		_this._fetchNotificationData({lazyData:false});
		})

	}

	componentDidMount(){
		
		this._fetchNotificationData({lazyData:false});
	}

	_fetchNotificationData(saltParams={}){
		var params={
                'url':NOTIFICATIONS_URL+"?page="+this.state.page+"&size="
                +this.state.size
                +"&sort="+this.state.sort
                +"&order="+(this.state.order ? DESC : ASC)
                +(this.state.searchTerm ? "&searchTerm="+this.state.searchTerm : ""),
                'method':GET,
                'cause':GET_ALL_NOTIFICATIONS,
                'contentType':APP_JSON,
                'saltParams':saltParams,
                'accept':APP_JSON,
            }
		if(!saltParams.lazyData){
			this.props.setNotificationSpinner(true);
		}
		else{
			this.props.setInfiniteSpinner(true);
		}
		
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
				let createDate = new Date(new Date(data[i].createTime).toLocaleString("en-US",{timeZone: this.props.timeOffset}))
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
		processedData.header = [{id:1,text: <FormattedMessage id="notification.table.description" description='Table first head' defaultMessage='Description'/>, sortable: false},
             			{id:2,text: <FormattedMessage id="notification.table.time" description='Table second head' defaultMessage='Time'/>, sortable: true,defaultOrder:(this.state.order ? DESC : ASC)}
             ];
        processedData.offset = 0;
        processedData.max= tableRows.length || DEFAULT_NOTIFICATION_ROW_LENGTH;
		return processedData;
	}

	shouldComponentUpdate(nextProps){
		if((nextProps.hasDataChanged !== this.props.hasDataChanged) || 
			(nextProps.isLoading !==this.props.isLoading)||
			(nextProps.isInfiniteLoading !==this.props.isInfiniteLoading)
			){
			return true;
		}
		return false
	}
	_onScrollHandler(event){
		
		if(event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight){
			let page = this.state.dataFound === false ? this.state.page: this.state.page + 1;
            this.setState({
					page
				},function(){
					this.props.setInfiniteSpinner(true);
					this._fetchNotificationData({lazyData:true});
				})
				
				
		}
		
	}
	_handleSubmit(e){
		e.preventDefault();
		var value = this.searchInput.value.trim();
		this.setState({
        	page:0,
        	searchTerm:value
        },function(){
        		this._fetchNotificationData({lazyData:false});
        })
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.dataFound !== this.props.dataFound){
			this.setState({
				dataFound:nextProps.dataFound
			})
		}
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
              <p className="modal-head-text"><FormattedMessage id="notification.all.head" description='Notification head' defaultMessage='Notifications'/></p>
               <div className="modal-search-input">
               <div className="viewAllNotSearch">
               <form action="#" onSubmit={(e) => this._handleSubmit(e)}>
               <input type="text" placeholder="Search" className="allSearchInput" ref={(searchInput) => this.searchInput = searchInput}/>
               <button  className="notificationSearch"><span className="searchIcon"></span></button>
                
               </form>
               </div>
               </div>
              
            </div>
            <div className='gor-modal-body'>

           			<div className="gorTableMainContainer gor-all-not-tbl">
      				<Spinner isLoading={this.props.isInfiniteLoading} utilClassNames={"infinite-scroll"}>
                    	<div className="infinite-content"><p><FormattedMessage id="notification.infinite.message" description='Infinite scroll message' defaultMessage='Loading More'/></p></div>
                    </Spinner>
                <GTable options={['table-bordered']}>
                    <GTableHeader>

                        {processedData.header.map(function (header, index) {
                            return <GTableHeaderCell key={index} header={header} onClick={header.sortable ? self._onSortChange.bind(self, header) : false}>
                                	<span>{header.text}</span><span className="sortIcon">{header.sortable && header.defaultOrder === DESC ? '↑' : (header.sortable ? '↓' :'') }</span>
                                </GTableHeaderCell>

                        })}
                    </GTableHeader>
                    <GTableBody data={processedData.filteredData} onScrollHandler={self._onScrollHandler.bind(this)}>
                          
                        {processedData.filteredData ? processedData.filteredData.map(function (row, idx) {
                            return (
                                <GTableRow key={idx} index={idx} offset={processedData.offset} max={processedData.max} data={processedData.filteredData}>
                                    {row.map(function (text, index) {
                                        return <div key={index} style={processedData.header[index].width?{flex:'1 0 '+processedData.header[index].width+"%"}:{}} className="cell" >
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
        "searchAppliedAllNotifications":state.notificationReducer.searchAppliedAllNotifications,
        "dataFound":state.notificationReducer.dataFound,
        "timeOffset":state.authLogin.timeOffset,
        "isInfiniteLoading":state.notificationReducer.isInfiniteLoading
    }
}
function mapDispatchToProps(dispatch){
	return{
		getNotificationData:function(params){dispatch(getNotificationData(params));},
		resetNotificationTableData:function(data){dispatch(resetNotificationTableData(data));},
		setNotificationSpinner:function(data){dispatch(setNotificationSpinner(data));},
		setInfiniteSpinner:function(data){dispatch(setInfiniteSpinner(data));}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(ViewAllNotificationWrapper);


