import React  from 'react';
import {FormattedMessage, defineMessages} from 'react-intl';
import {connect} from 'react-redux';

import MsuRackFlex from './MsuRackFlex';
import UtilityDropDown from "../../components/utilityComponents/utilityDropdownWrap";

import { makeAjaxCall } from '../../actions/ajaxActions';

import {
    MSU_CONFIG_DEST_TYPE_URL,
    MSU_CONFIG_BLOCK_PUT_CHANGE_TYPE_URL,
    MSU_CONFIG_LIST_RACK_STRUCTURE_URL
} from '../../constants/configConstants';

import {
    GET,
    APP_JSON,
    POST,
    FETCH_MSU_CONFIG_BLOCK_PUT_CHANGE_TYPE,
    FETCH_MSU_CONFIG_DEST_TYPE_LIST,
    FETCH_MSU_CONFIG_RACK_STRUCTURE
} from '../../constants/frontEndConstants';

const messages = defineMessages({
  destTypeDdownPlcHldr: {
    id: "msuConfig.destType.destTypeDdownPlcHldr",
    description: "Select destination type",
    defaultMessage: "Select destination type"
  }
});

import {graphql, withApollo, compose} from "react-apollo";
import gql from 'graphql-tag';
import {
    notifySuccess,
    notifyFail
} from "./../../actions/validationActions";

const MSU_RACK_STRUCTURE_QUERY = gql`
    query($input:MsuRackJsonListParams){
        MsuRackJsonList(input:$input){
            list {
                face_zero{
                rack_width
                    rack_json{
                    barcodes
                    length
                    height
                    type
                    orig_coordinates
                }  
                }
            face_one{
                rack_width
                    rack_json{
                    barcodes
                    length
                    height
                    type
                    orig_coordinates
                }  
                }
            
            }
            
            }
    }
`;

const MSU_SOURCE_TYPE_QUERY = gql`
    query($input:MsuSourceTypeListParams){
        MsuSourceTypeList(input:$input){
             list
            }
    }
`;

const MSU_RECONFIG_BLOCK_PUT_CHANGE_TYPE_POST = gql`
    query($input:MsuBlockPutChangeTypeParams){
        MsuBlockPutChangeType(input:$input){
                    status
        }
        }
`;

class ChangeRackType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          sourceType: true,
          sourceTypeStructure: null,
          sourceTypeWidth: null,
          destType: null,
          destTypeStructure: null,
          destTypeWidth: null,
          blockPutChangeTypeBtnState: false,
        };
        this._blockPutAndChangeType = this._blockPutAndChangeType.bind(this);
        this._changeDestType = this._changeDestType.bind(this);
        this._removeThisModal = this._removeThisModal.bind(this);
        //this._reqRackStructure = this._reqRackStructure.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.rackStructure) !==JSON.stringify(nextProps.rackStructure)){
            if(this.state.sourceType && nextProps.rackStructure){
                this.setState({
                    sourceTypeStructure: nextProps.rackStructure["face_zero"].rack_json,
                    sourceTypeWidth: nextProps.rackStructure["face_zero"].rack_width
                })
            }
            if(!this.state.sourceType && nextProps.rackStructure){
                this.setState({
                    destTypeStructure: nextProps.rackStructure["face_zero"].rack_json,
                    destTypeWidth: nextProps.rackStructure["face_zero"].rack_width
                })
            }
        } 
        else{
            if(this.state.sourceType && nextProps.rackStructure){
                this.setState({
                    sourceTypeStructure: nextProps.rackStructure["face_zero"].rack_json,
                    sourceTypeWidth: nextProps.rackStructure["face_zero"].rack_width
                })
            }
        }
    }


    // _blockPutAndChangeType(){
    //     let formData={         
    //         "rack_id":this.props.id, // 0 is for currently filtered msulist
    //         "destination_type":this.state.destType
    //     };

    //     let params={
    //         'url': MSU_CONFIG_BLOCK_PUT_CHANGE_TYPE_URL,
    //         'method':POST,
    //         'contentType':APP_JSON,
    //         'accept':APP_JSON,
    //         'cause' : FETCH_MSU_CONFIG_BLOCK_PUT_CHANGE_TYPE,
    //         'formdata':formData,
    //     }
    //     this.props.makeAjaxCall(params);
    //     this._removeThisModal(); // close the changeRackType modal once put block & change type button has been clicked
    //     this.props.blockPutAndChangeTypeCallback();
    // }

    _blockPutAndChangeType(){
        let msuList = [];
            this.props.client.query({
                query: MSU_RECONFIG_BLOCK_PUT_CHANGE_TYPE_POST,
                //variables: formData,
                variables: (function () {
                    return {
                        input: {
                            rack_id: "12",    // HARD- CODED FOR NOW
                            destination_type: "26"  // HARD- CODED FOR NOW
                        }
                    }
                }()),
                fetchPolicy: 'network-only'
            }).then(data=>{
                console.log("_blockPutAndChangeType file =======> coming inside THEN CODE============>" + JSON.stringify(data));
                msuList= data.data.MsuList.list;
                this._removeThisModal(); // close the changeRackType modal once put block & change type button has been clicked
                this.props.blockPutAndChangeTypeCallback();
            })
    }

    _removeThisModal() {
        this.props.removeModal();
    }

    componentDidMount() {
       //this._reqRackStructure(this.props.rackType); // request Rack structure for EXISTING SOURCE TYPE
       //this._reqDestinationTypes();
    }

    // _reqRackStructure(rackType){
    //     let params={
    //         'url': MSU_CONFIG_LIST_RACK_STRUCTURE_URL+"/"+rackType,
    //         'method':GET,
    //         'contentType':APP_JSON,
    //         'accept':APP_JSON,
    //         'cause' : FETCH_MSU_CONFIG_RACK_STRUCTURE,
    //     }
    //     this.props.makeAjaxCall(params);
    // }

    _reqRackStructure(destType){
        let rackStructure = [];
        this.props.client.query({
            query: MSU_RACK_STRUCTURE_QUERY,
            //variables: formData,
            variables: (function () {
                return {
                    input: {
                        rackType: destType
                    }
                }
            }()),
            fetchPolicy: 'network-only'
        }).then(data=>{
            console.log("coming inside THEN CODE============>" + JSON.stringify(data));
            rackStructure= data.data.MsuRackJsonList.list;
            this.setState({
                destTypeStructure: rackStructure["face_zero"].rack_json,
                destTypeWidth: rackStructure["face_zero"].rack_width
            });
          //this.props.notifyFail();
        })
    }

    // _reqDestinationTypes(){
    //     let msuList = [];
    //     this.props.client.query({
    //         query: MSU_SOURCE_TYPE_QUERY,
    //         //variables: formData,
    //         variables: (function () {
    //             return {
    //                 input: {
    //                     rackType: rackType
    //                 }
    //             }
    //         }()),
    //         fetchPolicy: 'network-only'
    //     }).then(data=>{
    //         console.log("coming inside THEN CODE============>" + JSON.stringify(data));
    //         msuList= data.data.MsuRackJsonList.list;
    //         // this.setState({
    //         //     msuList: msuList
    //         // });
    //       //this.props.notifyFail();
    //     })
    // }

    // _reqDestinationTypes(){
    //     let params={
    //         'url': MSU_CONFIG_DEST_TYPE_URL,
    //         'method':GET,
    //         'contentType':APP_JSON,
    //         'accept':APP_JSON,
    //         'cause' : FETCH_MSU_CONFIG_DEST_TYPE_LIST
    //     }
    //     this.props.makeAjaxCall(params);
        
    // }

    _reqRackStructureOnDestTypeChange(){
        this._reqRackStructure(this.state.destType);
    }

    _changeDestType(data) {
        this.setState({ 
            destType: data.value,
            sourceType: false,
            blockPutChangeTypeBtnState: false,
        },
        this._reqRackStructureOnDestTypeChange);
    }

    _getCurrentDropDownState(fileType, currentValue) {
        for (var i = fileType.length - 1; i >= 0; i--) {
          if (fileType[i].value === currentValue) {
            return fileType[i].label;
          }
        }
        return null;
    }


    render() {
        let msuList, rackStructure, destTypeList, labelC1;

       // rackStructure =  this._reqRackStructure(this.props.rackType);
       // destTypeList = this._reqDestinationTypes();

        rackStructure = this.props.rackStructure;
        destTypeList = this.props.destType;
        msuList = this.props.msuList[0];
        
        labelC1=[{ value: 'any', label:<FormattedMessage id="msuConfig.token1.all" defaultMessage="Any"/> }];

        if(destTypeList){
            destTypeList.forEach((data)=>{
             labelC1.push(
             {
                value:data,
                label: "Destination type: "+data
             }
                )   
            });
        }

        let currentDestType = this._getCurrentDropDownState(labelC1, this.state.destType);

        return (
            <div style={{marginTop:"15vh"}}>
                <div className="gor-smmodal-content">
                    <div className='gor-smmodal-head'>
                        <div className='gor-usr-add'><FormattedMessage id="msuConfig.add.heading" 
                                description='Heading for change rack type' 
                                defaultMessage='Change destination type'/>
                        </div>
                        <span className="close" onClick={this._removeThisModal}>×</span>
                    </div>
                    <div className='gor-smmodal-body'>
                        <div className='gor-body-content'>
                            <div className="sourceWrapper">
                                <div className="sourceTypeHeading">
                                    <FormattedMessage id="msuConfig.sourceType.heading" 
                                        description='Heading for source type' 
                                        defaultMessage='Source type: {sourceType}'
                                        values={{sourceType:msuList.racktype}}
                                        />
                                </div>
                                    <div className="rackWrapper">
                                    {/*
                                        <MsuRackFlex rackDetails={this.state.sourceTypeStructure} 
                                                      rackWidth={this.state.sourceTypeWidth} />
                                    */}
                                    {this.props.rackStructure && 
                                        <MsuRackFlex 
                                            rackDetails = {this.props.rackStructure["face_zero"].rack_json}
                                            rackWidth = {this.props.rackStructure["face_zero"].rack_width} />
                                    }
                                    </div>
                                    
                            </div>

                            <div className="destWrapper">
                                <UtilityDropDown
                                  items={this.props.destType}
                                  placeHolderText={this.context.intl.formatMessage(messages.destTypeDdownPlcHldr)}
                                  changeMode={this._changeDestType}
                                  currentState={currentDestType}
                                />

                                {/*{(this.props.rackStructure && !this.state.sourceType)? */}
                                {(this.props.rackStructure && !this.state.sourceType && this.state.destTypeStructure && this.state.destTypeWidth)?
                                    <div className="rackWrapper">
                                        <MsuRackFlex rackDetails={this.state.destTypeStructure}
                                                     rackWidth={this.state.destTypeWidth} />
                                    </div>:
                                    <div className="rackWrapper">
                                        <div className="parent-container" style={{width: "100%"}}>
                                                <div className="slotsFlexContainer">
                                                    <div className="legsSpaceContainer"> </div>
                                                 </div>
                                        </div>
                                    </div>

                                }
                            </div>
                        </div>
                    </div>
                    <div className="gor-smmodal-footer">
                        <div className="gor-footer-msg">
                            <FormattedMessage id="gor.msuConfig.destSelection" 
                                    description="label for select destination type" 
                                    defaultMessage="Select a destination type in order to block put."/>
                        </div>
                        <div className="gor-button-wrap">
                            <button disabled = {this.state.blockPutChangeTypeBtnState} 
                                    className="gor-msuConfig-btn orange"
                                     onClick={this._blockPutAndChangeType}>
                                <FormattedMessage id="gor.msuConfig.blockPutChangeType" 
                                    description="button label for block put & change type" 
                                    defaultMessage="BLOCK PUT AND CHANGE TYPE"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


ChangeRackType.contextTypes={
    intl: React.PropTypes.object.isRequired
}

const withQueryForRackStructure = graphql(MSU_RACK_STRUCTURE_QUERY, {
    props: function(data){
        console.log("inside ===============withQueryForRackStructure =========>");
        if(!data || !data.data.MsuRackJsonList || !data.data.MsuRackJsonList.list){
            return {}
        }
        return {
           rackStructure: data.data.MsuRackJsonList.list
           //}
        }
    },
    options: ({match, location}) => ({
        //variables: {},
        variables: (function () {
            return {
                input: {
                    rackType: "15"
                }
            }
        }()),
        fetchPolicy: 'network-only'
    }),
});

const withQueryForDestinationTypes = graphql(MSU_SOURCE_TYPE_QUERY, {
    props: function(data){
        console.log("inside ===============  withQueryForDestinationTypes =========>");
        if(!data || !data.data.MsuSourceTypeList || !data.data.MsuSourceTypeList.list){
            return {}
        }
        return {
            destType: data.data.MsuSourceTypeList.list
        }
    },
    options: ({match, location}) => ({
        variables: {},
        fetchPolicy: 'network-only'
    }),
});


function mapStateToProps(state, ownProps) {
    return {
        //destType: state.msuInfo.destType,
        //rackStructure: state.msuInfo.rackStructure
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        makeAjaxCall: function(params){
            dispatch(makeAjaxCall(params))
        }
    }
};

//export default connect(mapStateToProps, mapDispatchToProps)(ChangeRackType) ;
export default compose(
    withQueryForRackStructure, 
    withQueryForDestinationTypes,
    withApollo
)(connect(mapStateToProps, mapDispatchToProps)((ChangeRackType)));