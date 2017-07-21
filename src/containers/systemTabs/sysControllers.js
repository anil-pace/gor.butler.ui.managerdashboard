import React from 'react';
import {Table, Column} from 'fixed-data-table';
import Dimensions from 'react-dimensions'
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import FilterSummary from '../../components/tableFilter/filterSummary'
import {
    SortHeaderCell,
    tableRenderer,
    TextCell,
    PPSComponentCell,
    StatusCell,
    filterIndex,
    DataListWrapper,
    sortData
} from '../../components/commonFunctionsDataTable';
import {defineMessages} from 'react-intl';
import {hashHistory,withRouter} from 'react-router';
import {GOR_STATUS, GOR_STATUS_PRIORITY, GOR_TABLE_HEADER_HEIGHT,WS_ONSEND} from '../../constants/frontEndConstants';
import {setWsAction} from '../../actions/socketActions'


const messages=defineMessages({
    ppsPlaceholder: {
        id: 'pps.dropdown.placeholder',
        description: 'mode change for pps',
        defaultMessage: 'Change PPS Mode',
    }


});

class SystemControllers extends React.Component {
    constructor(props) {
        super(props);
        this.state=this._getInitialState();
        this._clearFilter =  this._clearFilter.bind(this);
    }

    _getInitialState(){
        var data=this.props.controllers.slice(0)
        var dataList = new tableRenderer(data.length);
        dataList.newData=data;
        return {
            columnWidths: {
                id: this.props.containerWidth * 0.15,
                status: this.props.containerWidth * 0.1,
                location: this.props.containerWidth * 0.17,
                connectionDetails: this.props.containerWidth * 0.15,
                operatingMode: this.props.containerWidth * 0.4
            },
            dataList:dataList,
            query:this.props.location.query,
            subscribed:false,
            queryApplied:Object.keys(this.props.location.query).length ? true :false
        }
    }

    _clearFilter() {
        this.setState({
            subscribed:false
        },function(){
            this.props.router.push({pathname: "/system/sysControllers"})
        })
        
    }

    _refreshList(query){
        var filterSubsData = {};
        var updatedWsSubscription= JSON.parse(JSON.stringify(this.props.wsSubscriptionData));
        if (query && query.zone_id) {
            filterSubsData["zone_id"]=['=',query.zone_id]
        }
        updatedWsSubscription["controllers"].data[0].details["filter_params"]=filterSubsData;
        this.props.initDataSentCall(updatedWsSubscription["controllers"])
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.hasDataChanged !== this.props.hasDataChanged;
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.socketAuthorized && !this.state.subscribed){
            this.setState({
                subscribed:true,
                queryApplied:Object.keys(this.props.location.query).length ? true :false
            },function(){
                this._refreshList(nextProps.location.query)
            })
        }
        if(this.props.hasDataChanged !== nextProps.hasDataChanged){
            let data = JSON.parse(JSON.stringify(nextProps.controllers || []));
            let dataList = new tableRenderer(data.length)
            dataList.newData=data;
            this.setState({
                dataList,
                queryApplied:Object.keys(nextProps.location.query).length ? true :false
            })
        }
    }
    componentWillMount(){
        if(this.props.socketAuthorized && !this.state.subscribed){
            this.setState({
                subscribed:true,
                queryApplied:Object.keys(this.props.location.query).length ? true :false
            },function(){
                //this.props.initDataSentCall(wsOverviewData["controllers"])
                this._refreshList(this.props.location.query)
            })
        }
    }
 
   

    render() {
        var {dataList} = this.state;
        console.log(this.props.controllers);
        return (
            <div  className="gorTableMainContainer gor-sys-controller">
            <div className="gorToolBar">
                                <div className="gorToolBarWrap">
                                    <div className="gorToolBarElements">
                                        <FormattedMessage id="sysController.table.heading" description="Heading for PPS"
                                                          defaultMessage="System Controllers"/>
                                        
                                    </div>
                                </div>
                            </div>
                <FilterSummary total={dataList.getSize()||0} isFilterApplied={this.state.queryApplied} responseFlag={null}
                                           refreshList={this._clearFilter}
                                           refreshText={<FormattedMessage id="ppsList.filter.search.bar.showall"
                                                                          description="button label for show all"
                                                                          defaultMessage="Show all Stations"/>}/>
                
                <Table
                    rowHeight={50}
                    rowsCount={dataList.getSize()}
                    headerHeight={70}
                    onColumnResizeEndCallback={null}
                    isColumnResizing={false}
                    width={this.props.containerWidth}
                    height={document.documentElement.clientHeight * 0.6}
                    {...this.props}>
                    <Column
                        columnKey="controller_id"
                        header={
                            
                                <div className="gor-header-ids">
                                    <SortHeaderCell onSortChange={null}
                                                    sortDir={"ASC"}>
                                        <div className="gorToolHeaderEl">
                                            <FormattedMessage id="sysControllers.idColumn.heading"
                                                              description='CONTROLLER ID'
                                                              defaultMessage='CONTROLLER ID'/>
                                            
                                        </div>
                                    </SortHeaderCell>
                                </div>
                            
                        }
                        cell={<TextCell data={dataList} classKey={"id"} />}
                        fixed={true}
                        width={this.state.columnWidths.id}
                        isResizable={true}
                    />
                    <Column
                        columnKey="status"
                        header={
                            <SortHeaderCell onSortChange={null}

                                            sortDir={"ASC"}>

                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="sysController.table.status" description="Status for PPS"
                                                      defaultMessage="STATUS"/>

                                   
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell data={dataList} setClass={"status"}/>}
                        fixed={true}
                        width={this.state.columnWidths.status}
                        isResizable={true}
                    />
                    <Column
                        columnKey={null}
                        header={
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="sysController.table.location" description="Location"
                                                      defaultMessage="LOCATION"/>
                                </div>
                            
                        }
                        cell={<TextCell data={dataList} classKey={"location"} childrenClass="location" childColumnKey="zone_id">
                             <span ><FormattedMessage id="sysController.location.name" description='PPStable.requestedMode.text'
                                                          defaultMessage='Zone: '
                                                          /></span>
                        </TextCell>}
                        fixed={true}
                        width={this.state.columnWidths.location}
                        isResizable={true}
                    />
                    <Column
                        columnKey={null}
                        header={
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="sysController.table.conDetails" description="Status for PPS"
                                                      defaultMessage="CONNECTION DETAILS"/>
                                </div>
                        }
                        cell={<TextCell data={dataList} setClass={"sfs"} classKey={"connectionDetails"}/>}
                        fixed={true}
                        width={this.state.columnWidths.connectionDetails}
                        isResizable={true}
                    />
                    <Column
                        columnKey="action_triggered"
                        header={
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="sysController.table.operatingMode" description="Status for PPS"
                                                      defaultMessage="OPERATING MODE"/>

                                  
                                </div>
                        }
                        cell={<TextCell data={dataList} classKey={"operatingMode"}/>}
                        fixed={true}
                        width={this.state.columnWidths.operatingMode}
                        isResizable={true}
                    />
                    
                </Table>
               
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        controllers:state.sysControllersReducer.controllers || [],
        hasDataChanged:state.sysControllersReducer.hasDataChanged,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket
    };
}

function mapDispatchToProps(dispatch){
    return{
        initDataSentCall: function(data){ dispatch(setWsAction({type:WS_ONSEND,data:data})); }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Dimensions()(withRouter(SystemControllers)));