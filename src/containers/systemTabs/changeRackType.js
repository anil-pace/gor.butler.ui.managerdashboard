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
    }

    _blockPutAndChangeType(rackId, destType){
        let msuList = [];
            this.props.client.query({
                query: MSU_RECONFIG_BLOCK_PUT_CHANGE_TYPE_POST,
                variables: (function () {
                    return {
                        input: {
                            rack_id: rackId,    // HARD- CODED FOR NOW
                            destination_type: destType  // HARD- CODED FOR NOW
                        }
                    }
                }()),
                fetchPolicy: 'network-only'
            }).then(data=>{
                this._removeThisModal(); // close the changeRackType modal once put block & change type button has been clicked
                this.props.blockPutAndChangeTypeCallback();
            });
    }

    _removeThisModal() {
        this.props.removeModal();
    }

    _reqRackStructure(rackType, forWhichType){
        var rackStructure = [];
        this.props.client.query({
            query: MSU_RACK_STRUCTURE_QUERY,
            variables: (function () {
                return {
                    input: {
                        rackType: rackType
                    }
                }
            }()),
            fetchPolicy: 'network-only'
        }).then(data=>{
            rackStructure= data.data.MsuRackJsonList.list;
            if(forWhichType === "forSourceType"){
                this.setState({
                    sourceTypeStructure: rackStructure["face_zero"].rack_json,
                    sourceTypeWidth: rackStructure["face_zero"].rack_width,
                });
            }
            else if(forWhichType === "forDestinationType"){
                this.setState({
                    destTypeStructure: rackStructure["face_zero"].rack_json,
                    destTypeWidth: rackStructure["face_zero"].rack_width
                });
            }
        })
    }

    _changeDestType(data) {
        this.setState({ 
            destType: data.value,
            sourceType: false,
            blockPutChangeTypeBtnState: false,
        },
        this._reqRackStructureOnDestTypeChange);
    }

    _reqRackStructureOnDestTypeChange(){
        this._reqRackStructure(this.state.destType, "forDestinationType");
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
        let msuList, rackStructure, destTypeList, labelC1, sourceRackType;
        sourceRackType = this.props.rackType;
        destTypeList = this.props.destType;

        if(!this.state.sourceTypeStructure && !this.state.sourceTypeWidth){
            rackStructure =  this._reqRackStructure(sourceRackType, "forSourceType");
        }

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
                                        values={{sourceType:sourceRackType}}
                                        />
                                </div>
                                    <div className="rackWrapper">
                                    {this.state.sourceTypeStructure && this.state.sourceTypeWidth? 
                                        <MsuRackFlex 
                                            rackDetails={this.state.sourceTypeStructure}
                                            rackWidth={this.state.sourceTypeWidth} /> : ""
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

                                {this.state.destTypeStructure && this.state.destTypeWidth?
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
                                     onClick={this._blockPutAndChangeType.bind(this, this.props.id, this.state.destType)}>
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

const withQueryGetDestinationTypes = graphql(MSU_SOURCE_TYPE_QUERY, {
    props: function(data){
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
    return {};
}

var mapDispatchToProps=function (dispatch) {
    return {};
};

export default compose(
    withQueryGetDestinationTypes,
    withApollo
)(connect(mapStateToProps, mapDispatchToProps)((ChangeRackType)));