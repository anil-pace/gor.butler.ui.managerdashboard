import React from 'react';
import {FormattedMessage} from 'react-intl';
import Dimensions from 'react-dimensions';
import {modal} from 'react-redux-modal';

import GTable from './../../components/gor-table-component'
import {GTableHeader, GTableHeaderCell, GTableBody, GTableRow} from './../../components/gor-table-component';
import Spinner from '../../components/spinner/Spinner';
class DownloadReportTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: [{id: 0, text: "REPORT NAME", key: 'report_name', sortable: false},
                {id: 1, text: "REPORT TYPE", key: 'report_type', sortable: false},
                {id: 2, text: "REQUESTED BY", key: 'requested_by', sortable: false},
                {id: 3, text: "COMPLETION TIME", key: 'completion_time', sortable: false},
                {id: 4, text: "GENERATION PROGRESS", key: 'generation_progress', sortable: false}
                
            ],
            downloadReportList:props.data,
            loading:props.loading
        }

    }

    
    componentWillReceiveProps(nextProps){
        if(nextProps.data && nextProps.data.length!==0){
            this.setState({downloadReportList:nextProps.data})
        }
    }


    render() {
        let self = this
        return (
            <div className="gor-download-report-table">
                <GTable>
                    <GTableHeader>

                        <GTableHeaderCell header={self.state.header[0]} >
                            <span><FormattedMessage id="downloadreport.table.reportname" description="Download report name"
                                                    defaultMessage="REPORT NAME"/></span>
                        </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[1]}>
                        <span><FormattedMessage id="downloadreport.table.reporttype" description="REPORT TYPE"
                                                defaultMessage="REPORT TYPE"/></span>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[2]} >
                        <span><FormattedMessage id="downloadreport.table.requestedby" description="REQUESTED BY"
                                                defaultMessage="REQUESTED BY"/></span>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[3]} >
                        <span><FormattedMessage id="downloadreport.table.completiontime" description="COMPLETION TIME"
                                                defaultMessage="COMPLETION TIME"/></span>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[4]} >
                        <span><FormattedMessage id="downloadreport.table.generationprogress" description="GENERATION PROGRESS"
                                                defaultMessage="GENERATION PROGRESS"/></span>
                    </GTableHeaderCell>
                        
                    </GTableHeader>
                    
                    <GTableBody data={self.state.downloadReportList} onScrollHandler={this.props.onScrollHandler}>
                     <Spinner isLoading={self.state.loading} utilClassNames={"infinite-scroll"}>
                        <div className="infinite-content"><p><FormattedMessage id="notification.infinite.message" description='Infinite scroll message' defaultMessage='Loading More'/></p></div>
                    </Spinner>
                        
                        {self.state.downloadReportList && self.state.downloadReportList.map(function (row, idx) {
                            return (
                                
                                <GTableRow key={idx} index={idx} data={self.state.downloadReportList}>
                                
                                    <div
                                        className="cell">
                                        {row.fileName}
                                    </div>
                                    <div
                                        className="cell">
                                        {row.typeText}
                                    </div>
                                    <div
                                        className="cell">
                                        {row.requestedBy}
                                    </div>
                                    <div
                                        className="cell">
                                        {row.formattedCompletionDate}
                                    </div>
                                    <div
                                        className="cell">
                                        {row.statusText}
                                    </div>
                                  
                                </GTableRow>
                                  
                            )
                        })}

                    </GTableBody>
                    
                </GTable>
            </div>
        );
    }
}

DownloadReportTable.PropTypes = {};

export default Dimensions()(DownloadReportTable);
