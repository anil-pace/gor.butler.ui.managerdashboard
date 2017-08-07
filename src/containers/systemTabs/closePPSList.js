import React  from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {GTable} from '../../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import {POST, APP_JSON,GET_PENDING_MSU} from '../../constants/frontEndConstants';
import {GET_PPS_MSU} from '../../constants/configConstants'

const closeAll = "closeAll";
const fcloseAll = "fcloseAll";
const close = "close";
const fclose = "force_close";
class ClosePPSList extends React.Component {

    constructor(props) {
        super(props);
        var initialState = this._getInitialState();
        this.state = initialState;
    }
    _getInitialState(){
        var checkedPPS = Object.keys(this.props.checkedPPS);
        var len  = checkedPPS.length;
        var state = {};
        for(let i = 0 ; i < len ; i++){
            state[checkedPPS[i]] = {};
            state[checkedPPS[i]].checkedValue="";
        }
        return state;
    }

    removeThisModal() {
        this.props.removeModal();
    }
    _handleClosePPS(e) {
        e.preventDefault();
        var selectedPPS = JSON.parse(JSON.stringify(this.state));
        var requestJSON = {};
        requestJSON["requested_pps_status"]={};
        for(let k in selectedPPS){
            requestJSON["requested_pps_status"][k] = selectedPPS[k].checkedValue
        }
        this.props.handleStatusChange({value:"close"},requestJSON);
        this.props.removeModal();

    }
    componentDidMount(){
        let formData = {};
        formData.pps_id = Object.keys(this.props.checkedPPS)
        let params={
                'url': GET_PPS_MSU,
                'formdata': formData,
                'method': POST,
                'cause': GET_PENDING_MSU,
                'token': sessionStorage.getItem('auth_token'),
                'contentType': APP_JSON
            };
            this.props.changePPSmode(params);
    }
    _onRadioChange(ppsId,value){
       
        this.setState({
                [ppsId]:{
                checkedValue:value
            }
        
        })
    }
    _setAllStatus(selection){
        var radioSelection = selection === closeAll ? close : fclose;
        var state = JSON.parse(JSON.stringify(this.state));
        for(let k in state){
            if(state.hasOwnProperty(k)){
                state[k].checkedValue = radioSelection
            }
        }
    
        this.setState(state);
    }
    _processData(){
        var processedData = {};
        var checkedPPS = Object.keys(this.props.checkedPPS);
        var ppsLen = checkedPPS.length;
        var pendingMSU = this.props.pendingMSU || {};
        var areAllSelected = true
         processedData.header = [
            {id:1,text: <FormattedMessage id="ppsclose.tblhead1.text" description='Table first head' defaultMessage='SLOT ID'/>, sortable: false},
            {id:2,text: <FormattedMessage id="ppsclose.tblhead2.text" description='Table second head' defaultMessage='MSU Pending'/>, sortable: false},
            {id:3,text: <FormattedMessage id="ppsclose.tblhead3.text" description='Table third head' defaultMessage='ACTION'/>, sortable: false}
        ];
        processedData.filteredData =[];
        for(let i=0 ;i < ppsLen ; i++){
            let row = [];
            row.push("PPS "+checkedPPS[i]);
            row.push(pendingMSU[checkedPPS[i]]);
            row.push(<div key={i}>
                <label>
                <input type='radio' value={close} name={'radio_pps_'+checkedPPS[i]} onChange={this._onRadioChange.bind(this,checkedPPS[i],close)} checked={this.state[checkedPPS[i]].checkedValue ===close}/><FormattedMessage id="ppsclose.close" description='Heading' defaultMessage='Close'/></label>
                <label><input type='radio' value={fclose} name={'radio_pps_'+checkedPPS[i]} onChange={this._onRadioChange.bind(this,checkedPPS[i],fclose)} checked={this.state[checkedPPS[i]].checkedValue ===fclose}/><FormattedMessage id="ppsclose.fclose" description='Heading' defaultMessage='Force Close'/></label>
                </div>);
             processedData.filteredData.push(row);
             if(!this.state[checkedPPS[i]].checkedValue){
                    areAllSelected = false;
             }
        }
        processedData.confirmDisable = !areAllSelected
        return processedData;
    }

    render() {
        var processedData=this._processData();
       
       
        return (
            <div>
                <div className="gor-modal-content pps-close">
                    <div className='gor-modal-head'>
                        <div className='gor-usr-add'>{this.props.heading}
                           
                        </div>
                        <span className="close" onClick={this.removeThisModal.bind(this)}>×</span>
                    </div>
                    <div className='gor-modal-body'>
                        <form action="#" id="editUserForm" ref={node=> {
                            this.editUserForm=node
                        }}
                              onSubmit={(e)=> this._handleClosePPS(e)}>
                    <div className="pps-close-wrap">
                    <div className="pps-close-head">
                      <div className="left-sec"><label><FormattedMessage id="ppsclose.head.text" description='Heading' defaultMessage='Close or Force close PPS'/></label></div>
                      <div className="right-sec">
                        <a href="javascript:void(0)" className="close-all-link" onClick={this._setAllStatus.bind(this,closeAll)}><FormattedMessage id="ppsclose.closeAll" description='Heading' defaultMessage='CLOSE ALL'/></a>
                        <a href="javascript:void(0)" className="fclose-all-link" onClick={this._setAllStatus.bind(this,fcloseAll)}><FormattedMessage id="ppsclose.fcloseAll" description='Heading' defaultMessage='FORCE CLOSE ALL'/></a>
                      </div>
                    </div>
                    <div className="close-pps-table">
                        <GTable options={['table-bordered']}>
                            <GTableHeader>
                                {processedData.header.map(function (header, index) {
                                    return <GTableHeaderCell key={index} header={header} onClick={header.sortable ? self._onSortChange.bind(self, header) : false}>
                                            <span>{header.text}</span>
                                        </GTableHeaderCell>

                                })}
                            </GTableHeader>
                            <GTableBody data={processedData.filteredData} >
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
                                }):<FormattedMessage id="ppsclose.table.noResult" description='Heading' defaultMessage='No Results Found'/>}
                            </GTableBody>
                        </GTable>
                    </div>
                    </div>  
                    <div className="pps-close-wrap pps-submit-cont">
                         <button type="button" onClick = {this.props.removeModal} className="gor-add-btn black pps-close-cancel"><FormattedMessage
                                        id="pps.close.cancel" description='Text for cancel close'
                                        defaultMessage='CANCEL'/></button>
                        <button type="submit" disabled={processedData.confirmDisable} className="gor-add-btn"><FormattedMessage
                                        id="pps.close.confirm" description='Text for close confirm'
                                        defaultMessage='CONFIRM'/></button>
                    </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        pendingMSU:state.ppsInfo.pendingMSU
    };
}

export default connect(mapStateToProps, null)(ClosePPSList);