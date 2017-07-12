import React from 'react';
import {Table, Column} from 'fixed-data-table';
import Dimensions from 'react-dimensions'
import {FormattedMessage} from 'react-intl';
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
    }

    _getInitialState(){
        var data=[{
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
        }]
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
            dataList:dataList
        }
    }

    shouldComponentUpdate(nextProps) {
        return true;
    }


    componentWillReceiveProps(nextProps) {
      console.log(nextProps.containerHeight);
    }
   

    render() {
        var {dataList} = this.state;
        console.log(this.props.containerHeight);
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
                        columnKey="id"
                        header={
                            <div>
                                <div className="gor-header-check">
                                    <input type="checkbox" checked={true}
                                           onChange={null}/>
                                </div>
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
                        cell={<TextCell data={dataList} classKey={"id"} childColumnKey="id">
                                <input type="checkbox" />
                            </TextCell>}
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
                        cell={<TextCell data={dataList} classKey={"status"}/>}
                        fixed={true}
                        width={this.state.columnWidths.status}
                        isResizable={true}
                    />
                    <Column
                        columnKey="location"
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
                        cell={<TextCell data={dataList} classKey={"connectionDetails"}/>}
                        fixed={true}
                        width={this.state.columnWidths.connectionDetails}
                        isResizable={true}
                    />
                    <Column
                        columnKey="operating_mode"
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

SystemControllers.PropTypes={
    items: React.PropTypes.array,
    
};


export default Dimensions()(SystemControllers);