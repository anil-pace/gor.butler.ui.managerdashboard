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
                    sourceTypeStructure: nextProps.rackStructure[0].rack_json,
                    sourceTypeWidth: nextProps.rackStructure[0].rack_width
                })
            }
            if(!this.state.sourceType && nextProps.rackStructure){
                this.setState({
                    destTypeStructure: nextProps.rackStructure[0].rack_json,
                    destTypeWidth: nextProps.rackStructure[0].rack_width
                })
            }
        } 
        else{
            if(this.state.sourceType && nextProps.rackStructure){
                this.setState({
                    sourceTypeStructure: nextProps.rackStructure[0].rack_json,
                    sourceTypeWidth: nextProps.rackStructure[0].rack_width
                })
            }
        }
    }


    _blockPutAndChangeType(){
        let formData={         
            "rack_id":this.props.id, // 0 is for currently filtered msulist
            "destination_type":this.state.destType
        };

        let params={
            'url': MSU_CONFIG_BLOCK_PUT_CHANGE_TYPE_URL,
            'method':POST,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause' : FETCH_MSU_CONFIG_BLOCK_PUT_CHANGE_TYPE,
            'formdata':formData,
        }
        this.props.makeAjaxCall(params);
        this._removeThisModal(); // close the changeRackType modal once put block & change type button has been clicked
        this.props.blockPutAndChangeTypeCallback();
    }

    _removeThisModal() {
        this.props.removeModal();
    }

    componentDidMount() {
        console.log("aksjdflkjasldkfj sdf slkdfj asdf alksdfj klsdfkjsdf");
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

    _reqRackStructure(rackType){
        let msuList = [];
        this.props.client.query({
            query: MSU_RACK_STRUCTURE_QUERY,
            //variables: formData,
            variables: (function () {
                return {
                    input: {
                        rackType: rackType
                    }
                }
            }()),
            fetchPolicy: 'network-only'
        }).then(data=>{
            console.log("coming inside THEN CODE============>" + JSON.stringify(data));
            msuList= data.data.MsuRackJsonList.list;
            // this.setState({
            //     msuList: msuList
            // });
          //this.props.notifyFail();
        })
    }

    _reqDestinationTypes(){
        let params={
            'url': MSU_CONFIG_DEST_TYPE_URL,
            'method':GET,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause' : FETCH_MSU_CONFIG_DEST_TYPE_LIST
        }
        this.props.makeAjaxCall(params);
        
    }

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

        this._reqRackStructure(this.props.rackType);
        this._reqDestinationTypes();

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
                                        <MsuRackFlex rackDetails={this.state.sourceTypeStructure} 
                                                      rackWidth={this.state.sourceTypeWidth} />
                                    </div>
                                    
                            </div>

                            <div className="destWrapper">
                                <UtilityDropDown
                                  items={this.props.destType}
                                  placeHolderText={this.context.intl.formatMessage(messages.destTypeDdownPlcHldr)}
                                  changeMode={this._changeDestType}
                                  currentState={currentDestType}
                                />

                                {(this.props.rackStructure && !this.state.sourceType)?
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
                            <button disabled = {this.state.blockPutChangeTypeBtnState} className="gor-msuConfig-btn orange"
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
        console.log("inside graphql  MSU_RACK_STRUCTURE_QUERY =========>");
        if(!data || !data.data.MsuRackJsonList || !data.data.MsuRackJsonList.list){
            return {}
        }
        return {
           // msuRackJsonList: data.data.MsuRackJsonList.list
           rackStructure: {
            "0": {
                "rack_width": 96,
                "rack_json": [{
                    "barcodes": ["A.01", "A.02", "A.03"],
                    "length": 44,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [0, 5],
                    "slot_ref": [48, 46, 65, 46, 48, 49, 45, 65, 46, 48, 50, 45, 65, 46, 48, 51]
                }, {
                    "barcodes": ["A.04", "A.05", "A.06"],
                    "length": 44,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [44, 5],
                    "slot_ref": [48, 46, 65, 46, 48, 52, 45, 65, 46, 48, 53, 45, 65, 46, 48, 54]
                }, {
                    "barcodes": ["B.01", "B.02"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [0, 45],
                    "slot_ref": [48, 46, 66, 46, 48, 49, 45, 66, 46, 48, 50]
                }, {
                    "barcodes": ["B.03", "B.04"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [28, 45],
                    "slot_ref": [48, 46, 66, 46, 48, 51, 45, 66, 46, 48, 52]
                }, {
                    "barcodes": ["B.05", "B.06"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [56, 45],
                    "slot_ref": [48, 46, 66, 46, 48, 53, 45, 66, 46, 48, 54]
                }, {
                    "barcodes": ["C.01", "C.02"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [0, 85],
                    "slot_ref": [48, 46, 67, 46, 48, 49, 45, 67, 46, 48, 50]
                }, {
                    "barcodes": ["C.03"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [20, 85],
                    "slot_ref": [48, 46, 67, 46, 48, 51]
                }, {
                    "barcodes": ["C.04"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [40, 85],
                    "slot_ref": [48, 46, 67, 46, 48, 52]
                }, {
                    "barcodes": ["C.05", "C.06"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [60, 85],
                    "slot_ref": [48, 46, 67, 46, 48, 53, 45, 67, 46, 48, 54]
                }, {
                    "barcodes": ["D.01", "D.02"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [0, 105],
                    "slot_ref": [48, 46, 68, 46, 48, 49, 45, 68, 46, 48, 50]
                }, {
                    "barcodes": ["D.03"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [20, 105],
                    "slot_ref": [48, 46, 68, 46, 48, 51]
                }, {
                    "barcodes": ["D.04"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [40, 105],
                    "slot_ref": [48, 46, 68, 46, 48, 52]
                }, {
                    "barcodes": ["D.05", "D.06"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [60, 105],
                    "slot_ref": [48, 46, 68, 46, 48, 53, 45, 68, 46, 48, 54]
                }, {
                    "barcodes": ["E.01", "E.02"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [0, 125],
                    "slot_ref": [48, 46, 69, 46, 48, 49, 45, 69, 46, 48, 50]
                }, {
                    "barcodes": ["E.03", "E.04"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [28, 125],
                    "slot_ref": [48, 46, 69, 46, 48, 51, 45, 69, 46, 48, 52]
                }, {
                    "barcodes": ["E.05", "E.06"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [56, 125],
                    "slot_ref": [48, 46, 69, 46, 48, 53, 45, 69, 46, 48, 54]
                }, {
                    "barcodes": ["F.01", "F.02"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [0, 165],
                    "slot_ref": [48, 46, 70, 46, 48, 49, 45, 70, 46, 48, 50]
                }, {
                    "barcodes": ["F.03", "F.04"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [28, 165],
                    "slot_ref": [48, 46, 70, 46, 48, 51, 45, 70, 46, 48, 52]
                }, {
                    "barcodes": ["F.05", "F.06"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [56, 165],
                    "slot_ref": [48, 46, 70, 46, 48, 53, 45, 70, 46, 48, 54]
                }]
            },
            "1": {
                "rack_width": 96,
                "rack_json": [{
                    "barcodes": ["A.01", "A.02", "A.03"],
                    "length": 44,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [0, 5],
                    "slot_ref": [49, 46, 65, 46, 48, 49, 45, 65, 46, 48, 50, 45, 65, 46, 48, 51]
                }, {
                    "barcodes": ["A.04", "A.05", "A.06"],
                    "length": 44,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [44, 5],
                    "slot_ref": [49, 46, 65, 46, 48, 52, 45, 65, 46, 48, 53, 45, 65, 46, 48, 54]
                }, {
                    "barcodes": ["B.01", "B.02"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [0, 45],
                    "slot_ref": [49, 46, 66, 46, 48, 49, 45, 66, 46, 48, 50]
                }, {
                    "barcodes": ["B.03", "B.04"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [28, 45],
                    "slot_ref": [49, 46, 66, 46, 48, 51, 45, 66, 46, 48, 52]
                }, {
                    "barcodes": ["B.05", "B.06"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [56, 45],
                    "slot_ref": [49, 46, 66, 46, 48, 53, 45, 66, 46, 48, 54]
                }, {
                    "barcodes": ["C.01", "C.02"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [0, 85],
                    "slot_ref": [49, 46, 67, 46, 48, 49, 45, 67, 46, 48, 50]
                }, {
                    "barcodes": ["C.03"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [20, 85],
                    "slot_ref": [49, 46, 67, 46, 48, 51]
                }, {
                    "barcodes": ["C.04"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [40, 85],
                    "slot_ref": [49, 46, 67, 46, 48, 52]
                }, {
                    "barcodes": ["C.05", "C.06"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [60, 85],
                    "slot_ref": [49, 46, 67, 46, 48, 53, 45, 67, 46, 48, 54]
                }, {
                    "barcodes": ["D.01", "D.02"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [0, 105],
                    "slot_ref": [49, 46, 68, 46, 48, 49, 45, 68, 46, 48, 50]
                }, {
                    "barcodes": ["D.03"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [20, 105],
                    "slot_ref": [49, 46, 68, 46, 48, 51]
                }, {
                    "barcodes": ["D.04"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [40, 105],
                    "slot_ref": [49, 46, 68, 46, 48, 52]
                }, {
                    "barcodes": ["D.05", "D.06"],
                    "length": 20,
                    "height": 15,
                    "type": "slot",
                    "orig_coordinates": [60, 105],
                    "slot_ref": [49, 46, 68, 46, 48, 53, 45, 68, 46, 48, 54]
                }, {
                    "barcodes": ["E.01", "E.02"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [0, 125],
                    "slot_ref": [49, 46, 69, 46, 48, 49, 45, 69, 46, 48, 50]
                }, {
                    "barcodes": ["E.03", "E.04"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [28, 125],
                    "slot_ref": [49, 46, 69, 46, 48, 51, 45, 69, 46, 48, 52]
                }, {
                    "barcodes": ["E.05", "E.06"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [56, 125],
                    "slot_ref": [49, 46, 69, 46, 48, 53, 45, 69, 46, 48, 54]
                }, {
                    "barcodes": ["F.01", "F.02"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [0, 165],
                    "slot_ref": [49, 46, 70, 46, 48, 49, 45, 70, 46, 48, 50]
                }, {
                    "barcodes": ["F.03", "F.04"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [28, 165],
                    "slot_ref": [49, 46, 70, 46, 48, 51, 45, 70, 46, 48, 52]
                }, {
                    "barcodes": ["F.05", "F.06"],
                    "length": 28,
                    "height": 35,
                    "type": "slot",
                    "orig_coordinates": [56, 165],
                    "slot_ref": [49, 46, 70, 46, 48, 53, 45, 70, 46, 48, 54]
                }]
            }
        }
        }
    },
    options: ({match, location}) => ({
        variables: {},
        fetchPolicy: 'network-only'
    }),
});

const withQueryForDestinationTypes = graphql(MSU_SOURCE_TYPE_QUERY, {

    props: function(data){
        console.log("inside  MSU_SOURCE_TYPE_QUERY withQuery");
        if(!data || !data.data.MsuSourceTypeList || !data.data.MsuSourceTypeList.list){
            return {}
        }
        return {
            //destType: ["33","15","24","16","12","27","26","14","11","22","19","17","21"]
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
    withQueryForRackStructure, withQueryForDestinationTypes,
    withApollo
)(connect(mapStateToProps, mapDispatchToProps)((ChangeRackType)));