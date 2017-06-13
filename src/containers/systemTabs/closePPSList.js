import React  from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';

import Dimensions from 'react-dimensions';
import {GTable} from '../../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableNoResult} from "../../components/gor-table-component/noResultFound";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import {ERROR, GET_ROLES, EDIT_USER, SUCCESS, GET, APP_JSON, PUT} from '../../constants/frontEndConstants';

const closeAll = "closeAll";
const fcloseAll = "fcloseAll";
const close = "close";
const fclose = "fclose";
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
            state["pps_"+checkedPPS[i]] = {};
            state["pps_"+checkedPPS[i]].checkedValue="";
        }
        return state;
    }

    removeThisModal() {
        //this.props.resetForm();
        this.props.removeModal();
    }
    _handleClosePPS(e) {
        e.preventDefault()
    }
    componentDidMount(){
        console.log(this.props.checkedPPS)
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
         processedData.header = [
            {id:1,text: <FormattedMessage id="ppsclose.tblhead1.text" description='Table first head' defaultMessage='SLOT ID'/>, sortable: false},
            {id:2,text: <FormattedMessage id="ppsclose.tblhead2.text" description='Table second head' defaultMessage='MSU Pending'/>, sortable: false},
            {id:3,text: <FormattedMessage id="ppsclose.tblhead3.text" description='Table third head' defaultMessage='ACTION'/>, sortable: false}
        ];
        processedData.filteredData =[];
        for(let i=0 ;i < ppsLen ; i++){
            let row = [];
            row.push("PPS "+checkedPPS[i]);
            row.push("66");
            row.push(<div key={i}>
                <label>
                <input type='radio' value={close} name={'radio_pps_'+checkedPPS[i]} onChange={this._onRadioChange.bind(this,"pps_"+checkedPPS[i],close)} checked={this.state["pps_"+checkedPPS[i]].checkedValue ==="close"}/>Close</label>
                <label><input type='radio' value={fclose} name={'radio_pps_'+checkedPPS[i]} onChange={this._onRadioChange.bind(this,"pps_"+checkedPPS[i],fclose)} checked={this.state["pps_"+checkedPPS[i]].checkedValue ==="fclose"}/>Force Close</label>
                </div>);
             processedData.filteredData.push(row);
        }
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
                      <div className="left-sec"><label>Close or Force close PPS</label></div>
                      <div className="right-sec">
                        <a href="javascript:void(0)" className="close-all-link" onClick={this._setAllStatus.bind(this,closeAll)}>CLOSE ALL</a>
                        <a href="javascript:void(0)" className="fclose-all-link" onClick={this._setAllStatus.bind(this,fcloseAll)}>FORCE CLOSE ALL</a>
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
                                }):""}
                            </GTableBody>
                        </GTable>
                    </div>
                    </div>  
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


/*var mapDispatchToProps=function (dispatch) {
    return {
        userRequest: function (data) {
            dispatch(userRequest(data));
        },
        validateName: function (data) {
            dispatch(validateName(data));
        },
        validatePassword: function (data) {
            dispatch(validatePassword(data));
        },
        resetForm: function () {
            dispatch(resetForm());
        }
    }
};*/

export default connect(null, null)(ClosePPSList);