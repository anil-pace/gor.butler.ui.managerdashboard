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
import {hashHistory} from 'react-router'
import {GOR_STATUS, GOR_STATUS_PRIORITY, GOR_TABLE_HEADER_HEIGHT} from '../../constants/frontEndConstants';


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
        var data=this.props.controllers.slice(0)/*[{
            id:1,
            status:"Operating",
            location:"asdf",
            connection_details:"asdf",
            operating_mode:"Standard"
        },{
            id:1,
            status:"Operating",
            location:"asdf",
            connection_details:"asdf",
            operating_mode:"Standard"
        },{
            id:1,
            status:"Operating",
            location:"asdf",
            connection_details:"asdf",
            operating_mode:"Standard"
        },{
            id:1,
            status:"Operating",
            location:"asdf",
            connection_details:"asdf",
            operating_mode:"Standard"
        },{
            id:1,
            status:"Operating",
            location:"asdf",
            connection_details:"asdf",
            operating_mode:"Standard"
        },{
            id:1,
            status:"Operating",
            location:"asdf",
            connection_details:"asdf",
            operating_mode:"Standard"
        },{
            id:1,
            status:"Operating",
            location:"asdf",
            connection_details:"asdf",
            operating_mode:"Standard"
        },{
            id:1,
            status:"Operating",
            location:"asdf",
            connection_details:"asdf",
            operating_mode:"Standard"
        }]*/
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
            query:this.props.location.query
        }
    }

    _clearFilter() {
        hashHistory.push({pathname: "/system/sysControllers", query: {}})
    }

    _refreshList(query){
        var filterSubsData = {}
        if (query.zone) {
            filterSubsData["zone"]=['=',query.zone]
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.hasDataChanged !== this.props.hasDataChanged;
    }


    componentWillReceiveProps(nextProps) {
      if (nextProps.socketAuthorized && nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            this.setState({query: nextProps.location.query})
            this._refreshList(nextProps.location.query)
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

                                <div className="filterWrapper">
                                <div className="gorToolBarDropDown pps">
                                        
                                            </div>
                                <div className="gorToolBarDropDown pps">
                                        
                                    </div>
                                    <div className="gorToolBarDropDown">
                                        <div className="gor-button-wrap">
                                            <div
                                                className="gor-button-sub-status">{this.props.lastUpdatedText} {this.props.lastUpdated} </div>
                                            <button
                                                className={"gor-filterBtn-applied"}>
                                                <div className="gor-manage-task"/>
                                                <FormattedMessage id="gor.filter.filterLabel" description="button label for filter"
                                                                  defaultMessage="Filter data"/>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                <FilterSummary total={dataList.getSize()||0} isFilterApplied={true} responseFlag={null}
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
                            <div>
                                <div className="gor-header-id">
                                    <SortHeaderCell onSortChange={null}
                                                    sortDir={"ASC"}>
                                        <div className="gorToolHeaderEl">
                                            <FormattedMessage id="sysControllers.idColumn.heading"
                                                              description='CONTROLLER ID'
                                                              defaultMessage='CONTROLLER ID'/>
                                            
                                        </div>
                                    </SortHeaderCell>
                                </div>
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
                        columnKey="zone_id"
                        header={
                            <SortHeaderCell onSortChange={null}

                                            sortDir={"ASC"}>

                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="sysController.table.location" description="Location"
                                                      defaultMessage="LOCATION"/>

                                    
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell data={dataList} classKey={"location"}/>}
                        fixed={true}
                        width={this.state.columnWidths.location}
                        isResizable={true}
                    />
                    <Column
                        columnKey="connection_details"
                        header={
                            <SortHeaderCell onSortChange={null}

                                            sortDir={"ASC"}>

                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="sysController.table.conDetails" description="Status for PPS"
                                                      defaultMessage="CONNECTION DETAILS"/>

                                    
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell data={dataList} setClass={"sfs"} classKey={"connectionDetails"}/>}
                        fixed={true}
                        width={this.state.columnWidths.connectionDetails}
                        isResizable={true}
                    />
                    <Column
                        columnKey="action_triggered"
                        header={
                            <SortHeaderCell onSortChange={null}

                                            sortDir={"ASC"}>

                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="sysController.table.operatingMode" description="Status for PPS"
                                                      defaultMessage="OPERATING MODE"/>

                                  
                                </div>
                            </SortHeaderCell>
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
        socketAuthorized: state.recieveSocketActions.socketAuthorized
    };
}



export default connect(mapStateToProps, null)(Dimensions()(SystemControllers));