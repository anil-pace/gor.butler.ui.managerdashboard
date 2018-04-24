import React  from 'react';
import {FormattedMessage, defineMessages} from 'react-intl';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

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



class ChangeRackType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          sourceType: "",
          destType: null,
          blockPutChangeTypeBtnState: false
        };
        this._blockPutAndChangeType = this._blockPutAndChangeType.bind(this);
        this._changeDestType = this._changeDestType.bind(this);
        this._removeThisModal = this._removeThisModal.bind(this);
        this._reqRackStructure = this._reqRackStructure.bind(this);
    }


    _blockPutAndChangeType(){
        let formData={         
            "rack_id":this.props.msuList[0].id, // 0 is for currently filtered msulist
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
       this._reqRackStructure(this.props.rackType); // request Rack structure for EXISTING SOURCE TYPE
       this._reqDestinationTypes(); // request available destination types from backend
    }

    _reqRackStructure(rackType){

        let params={
            'url': MSU_CONFIG_LIST_RACK_STRUCTURE_URL+"/"+rackType,
            'method':GET,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause' : FETCH_MSU_CONFIG_RACK_STRUCTURE,
        }
        this.props.makeAjaxCall(params);
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
            blockPutChangeTypeBtnState: false
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

        let msuList, rackStructure, destTypeList, labelC1, destTypeStructure, sourceTypeStructure;
        rackStructure = this.props.rackStructure;
        destTypeList = this.props.destType;
        msuList = this.props.msuList[0];
        // if(rackStructure){
        //     if(this.state.destType){
        //         destTypeStructure = this.props.rackStructure[0];
        //     }
        //     else{
        //         sourceTypeStructure = this.props.rackStructure[0];
        //     }
        // }

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
                                {/*
                                {sourceTypeStructure? 
                                    <div className="rackWrapper">
                                        <MsuRackFlex rackDetails={sourceTypeStructure[0].rack_json} 
                                                      rackWidth={sourceTypeStructure[0].rack_width} />
                                    </div> : null}
                                */}

                            </div>

                            <div className="destWrapper">
                                <UtilityDropDown
                                  items={this.props.destType}
                                  placeHolderText={this.context.intl.formatMessage(messages.destTypeDdownPlcHldr)}
                                  changeMode={this._changeDestType}
                                  currentState={currentDestType}
                                />

                                <div className="rackWrapper">
                                {/*
                                    {destTypeStructure && this.state.destType ? 
                                        <MsuRackFlex rackDetails={destTypeStructure[0].rack_json}
                                                     rackWidth={destTypeStructure[0].rack_width} /> 
                                        :(<div className="parent-container" style={{width: "100%"}}>
                                                <div className="slotsFlexContainer">
                                                    <div className="legsSpaceContainer"> </div>
                                                 </div>
                                        </div>)
                                    }
                                */}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="gor-smmodal-footer">
                        <div className="gor-footer-msg">
                             <span> Select a destination type in order to block put. </span>
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
function mapStateToProps(state, ownProps) {
    return {
        destType: state.msuInfo.destType,
        rackStructure: state.msuInfo.rackStructure
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        makeAjaxCall: function(params){
            dispatch(makeAjaxCall(params))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeRackType) ;
