/**
 * Container for Notifications
 * 
 */
import React  from 'react';
import { connect } from 'react-redux';
import {FormattedMessage, FormattedRelative} from 'react-intl';
import {GTable} from '../../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import NotificationDescription from '../../components/notifications/notificationDescription';
import Spinner from '../../components/spinner/Spinner';
import {NOTIFICATIONS_URL} from "../../constants/configConstants";
import {GET,GET_ALL_NOTIFICATIONS,APP_JSON,DEFAULT_NOTIFICATION_ROW_LENGTH,DESC,ASC} from "../../constants/frontEndConstants";
import {getNotificationData,
	resetNotificationTableData,
	setNotificationSpinner,setInfiniteSpinner,showNotificationFilter} from '../../actions/notificationAction';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';
import NotificatonFilter from '../../containers/notifications/notificatonFilter';
import { filterApplied, auditfilterState, toggleAuditFilter} from '../../actions/filterAction';

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
		//var data=[{'component':'System','type':'INFO','title':'PPS Mode Changed','description':'PPS 004 mode has successfully changed','createTime':'Fri, 10 March 2018 06:07:43 GMT'},{'component':'System','type':'ERROR','title':'PPS Mode Changed','description':'PPS 004 mode has successfully changed','createTime':'Fri, 10 March 2018 06:07:43 GMT'}]
		var dataLen = data.length;
		var tableRows = [];
		var processedData = {};
		if(dataLen){
			
			for(let i =0 ; i < dataLen ; i++){
				let tableRow = [];
				let createDate = new Date(new Date(data[i].createTime).toLocaleString("en-US",{timeZone: this.props.timeOffset}))
				// let createDate=this.context.intl.formatDate(data[i].createTime,
                //     {
                //         timeZone: this.props.timeOffset,
				// 		month: 'short',
				// 		year:'2-digit',
                //         day: '2-digit',
                //         hour: "2-digit",
                //         minute: "2-digit",
                //         hour12: true
                //     });
				tableRow.push(<div><span className={data[i].type+'-icon'}></span><span style={{'margin-left':'10px'}}><DotSeparatorContent header={[(data[i].component?data[i].component:''),data[i].title]} subHeader={[createDate]} separator={'.'}/></span></div>);
				tableRow.push(<div className="descNotification">{data[i].description}</div>);
			
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

	// shouldComponentUpdate(nextProps){
	// 	if((nextProps.hasDataChanged !== this.props.hasDataChanged) || 
	// 		(nextProps.isLoading !==this.props.isLoading)||
	// 		(nextProps.isInfiniteLoading !==this.props.isInfiniteLoading)
	// 		){
	// 		return true;
	// 	}
	// 	return false
	// }
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
	_setFilter() {
		var newState=!this.props.showFilter;
		this.props.showNotificationFilter(newState);
		//clearInterval(this.state.timerId);
	}
	// _handleSubmit(e){
	// 	e.preventDefault();
	// 	var value = this.searchInput.value.trim();
	// 	this.setState({
    //     	page:0,
    //     	searchTerm:value
    //     },function(){
    //     		this._fetchNotificationData({lazyData:false});
    //     })
	// }

	// componentWillReceiveProps(nextProps){
	// 	// if(nextProps.dataFound !== this.props.dataFound){
	// 	// 	this.setState({
	// 	// 		dataFound:nextProps.dataFound
	// 	// 	})
	// 	// }
	// }
	
		
	render(){
		console.log(this.props.showFilter);
		var self = this;
		var processedData = this._processData();
		var filterHeight=screen.height - 190;
		return (
			<div className="allNotificationWrap">
			<Spinner isLoading={this.props.isLoading} />
			<div className="gor-modal-content">
            <div className='gor-modal-head'>
            <span className="close" onClick={this._closeModal.bind(this)}>×</span>
              <p className="modal-head-text"><FormattedMessage id="notification.all.head" description='Notification head' defaultMessage='Notifications'/></p>
               {/* <div className="modal-search-input">
               <div className="viewAllNotSearch">
               <form action="#" onSubmit={(e) => this._handleSubmit(e)}>
               <input type="text" placeholder="Search" className="allSearchInput" ref={(searchInput) => this.searchInput = searchInput}/>
               <button  className="notificationSearch"><span className="searchIcon"></span></button>
                
               </form>
               </div>
			   </div> */}
			   <div className="gor-button-wrap" style={{'display':'block', 'float':'right','margin-right':'-55px','margin-top':'70px'}}>
    <button
    className={this.props.isFilterApplied ? "gor-filterBtn-applied" : "gor-filterBtn-btn"}
    onClick={self._setFilter.bind(self)} disabled>
    <div className="gor-manage-task"/>
    <FormattedMessage id="gor.filter.filterLabelcaps" description="button label for filter"
    defaultMessage="FILTER DATA"/>
    </button>
    </div>
			     <div className="gor-filter-wrap"
   				 style={{'display': this.props.showFilter ? 'block' : 'none', height: filterHeight}}>
    			<NotificatonFilter auditDetail={this.props.auditDetail} responseFlag={this.props.responseFlag}/>
    			</div>
              
            </div>
            <div className='gor-modal-body'>

           			<div className="gorTableMainContainer gor-all-not-tbl">
      				<Spinner isLoading={this.props.isInfiniteLoading} utilClassNames={"infinite-scroll"}>
                    	<div className="infinite-content"><p><FormattedMessage id="notification.infinite.message" description='Infinite scroll message' defaultMessage='Loading More'/></p></div>
                    </Spinner>
                <GTable options={['table-bordered','topLineBorder']}>
                    
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

ViewAllNotificationWrapper.contextTypes={
    intl: React.PropTypes.object.isRequired
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
		"isInfiniteLoading":state.notificationReducer.isInfiniteLoading,
		"auditDetail": state.recieveAuditDetail.auditDetail || [],
		"showFilter": state.notificationReducer.notificationFilterState || false
    }
}
function mapDispatchToProps(dispatch){
	return{
		getNotificationData:function(params){dispatch(getNotificationData(params));},
		resetNotificationTableData:function(data){dispatch(resetNotificationTableData(data));},
		setNotificationSpinner:function(data){dispatch(setNotificationSpinner(data));},
		setInfiniteSpinner:function(data){dispatch(setInfiniteSpinner(data));},
		showNotificationFilter: function (data) {
            dispatch(showNotificationFilter(data));
        },
        filterApplied: function (data) {
            dispatch(filterApplied(data));
        },
        auditfilterState: function (data) {
            dispatch(auditfilterState(data));
        },
        toggleAuditFilter: function (data) {
            dispatch(toggleAuditFilter(data));
        },
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(ViewAllNotificationWrapper);


