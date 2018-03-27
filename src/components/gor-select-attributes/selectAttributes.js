
import React from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage} from 'react-intl';
import {AttributeList} from './attributeList.js';


export default class SelectAttributes extends React.Component {
    constructor(props) {
        super(props)
        this._toggleDrop = this._toggleDrop.bind(this);
        this._applySelection = this._applySelection.bind(this);
        this._selectAttribute = this._selectAttribute.bind(this);
        this._backToDefault = this._backToDefault.bind(this);
        this._handleDocumentClick= this._handleDocumentClick.bind(this);
        this._clearSelectedAttributes= this._clearSelectedAttributes.bind(this);
        this._showAttrList = this._showAttrList.bind(this);
        this._deleteSet= this._deleteSet.bind(this);
        this._editSet=this._editSet.bind(this);
        this._getInitialState=this._getInitialState.bind(this);
        this._isInViewport=this._isInViewport.bind(this);
        this.state = this._getInitialState();
        
    }
    _getInitialState(){
        return{
            dropdownVisible:false,
            data:this.props.attributeList,
            selectedSets:this.props.prefilledData||{},
            nonMutatedData:this.props.attributeList,
            selectedAttributes:{},
            showAttrList:false,
            selectionApplied:false,
            editedIndex:"-1",
            placeHolder:"Select Attributes",
            selectedSetCount:0,
            extraFlagtoBack:this.props.prefilledData?true:false
        }

    }


    componentWillMount(){
        if(this.props.prefilledData)
        this._applySelectionFirstTime();
    }

      componentDidMount(){
          document.addEventListener('click',this._handleDocumentClick,false);
      }

      componentWillUnmount() {

          document.removeEventListener("click", this._handleDocumentClick,false)
      }
      _handleDocumentClick() {
         
         if (!ReactDOM.findDOMNode(this).contains(event.target)) {
           this.setState({dropdownVisible: false});
         }
     }

    _toggleDrop(){
        
        this.setState({
            dropdownVisible:!this.state.dropdownVisible
        })
    }

    _backToDefault(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            showAttrList:false,
            extraFlagtoBack:true
        })
    }
    _clearSelectedAttributes(e){
         e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        var nonMutatedData = JSON.parse(JSON.stringify(this.state.nonMutatedData));
        this.setState({
            data:nonMutatedData,
            selectedAttributes:{}
        })
    }

    _selectAttribute(event,category,attribute,idx){
        var checked = event.target.checked;
        var selectedAttributes =  JSON.parse(JSON.stringify(this.state.selectedAttributes)),
        data = JSON.parse(JSON.stringify(this.state.data));
        if(checked){
            let updatedData={
                "text":data[idx].attributeList[attribute].text,
                "category":category,
                "excludeFromSet":data[idx].attributeList[attribute].excludeFromSet
            }
            selectedAttributes[attribute] = updatedData;
            data[idx].attributeList[attribute].checked = true;
        }
        else{
            delete selectedAttributes[attribute];
            data[idx].attributeList[attribute].checked = false;
        }
        
        this.setState({
            selectedAttributes,
            data
        })

    }
     _applySelectionFirstTime(index){
        var selectedSets =  JSON.parse(JSON.stringify(this.state.selectedSets)),
        selectedAttributes =  JSON.parse(JSON.stringify(this.state.selectedAttributes));
        this.setState({
            selectedAttributes:{},
            selectionApplied:true,
            editedIndex:"-1",
            selectedSets,
            placeHolder:(Object.keys(selectedSets).length)+" sets of Attributes selected",
            selectedSetCount:Object.keys(selectedSets).length
        }
        
        )
    }
    
    _applySelection(e,index){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        var selectedSets =  JSON.parse(JSON.stringify(this.state.selectedSets));
        let selectedAttributes =  JSON.parse(JSON.stringify(this.state.selectedAttributes));
        
        if(Object.keys(selectedAttributes).length){
            if(this.state.editedIndex === "-1"){
                selectedSets[Object.keys(selectedSets).length] = selectedAttributes;
        }
        else{
            selectedSets[this.state.editedIndex] = selectedAttributes
        }

        this.setState({
            selectedAttributes:{},
            selectionApplied:true,
            editedIndex:"-1",
            selectedSets,
            placeHolder:(Object.keys(selectedSets).length)+" sets of Attributes selected",
            selectedSetCount:Object.keys(selectedSets).length,
            extraFlagtoBack:true
        },function(){
            this.props.applyCallBack(selectedSets,index);
        })
    }
}
    
    _showAttrList(e){   
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        var nonMutatedData = JSON.parse(JSON.stringify(this.state.nonMutatedData));
        this.setState({
            showAttrList:true,
            editedIndex:"-1",
            selectionApplied:false,
            data:nonMutatedData,
            selectedAttributes:{},
            extraFlagtoBack:false

        })
    }
    _deleteSet(e,idx,skuIndex){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        var selectedSets =  JSON.parse(JSON.stringify(this.state.selectedSets));
        delete  selectedSets[idx];
        this.setState({
            selectedSets,
            showAttrList:false,
            placeHolder:(Object.keys(selectedSets).length)+" sets of Attributes selected",
            selectedSetCount:Object.keys(selectedSets).length
        },function(){
            this.props.applyCallBack(selectedSets,skuIndex);
        })
    }
    _editSet(e,idx){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        var selectedSets =  JSON.parse(JSON.stringify(this.state.selectedSets));
        var selectedSet = selectedSets[idx];
        var masterData = JSON.parse(JSON.stringify(this.state.data));
        
        for(let key in selectedSet){
            let category = selectedSet[key].category;
            for(let i=0,len=masterData.length; i<len; i++){
                if(category === masterData[i].category_value){
                    masterData[i].attributeList[key].checked = true;
                    break;
                }
            }
        }
        this.setState({
            data:masterData,
            showAttrList:true,
            selectionApplied:false,
            selectedAttributes:selectedSet,
            editedIndex:idx,
            extraFlagtoBack:false
        })


        

    }
    _isInViewport(){
        var bounding = this.dropElement.getBoundingClientRect();
        return {
            bounding,
            actualBottom:(bounding.bottom - (window.innerHeight || document.documentElement.clientHeight))
        }
    }
  

    render() {
        var _this = this;
        var dropStyleTop={};
        var hackPositionStyles={};
        
        var attributeSelected = Object.keys(_this.state.selectedSets).length ? true : false;
        if(this.state.dropdownVisible){
            let elementPosition = this._isInViewport();
            if(elementPosition.actualBottom > 0){
                dropStyleTop.top=-(244+elementPosition.actualBottom);
            }
            else{
                dropStyleTop.top=(parseInt(this.dropElement.style.top) || -244);
            }
            hackPositionStyles = Object.assign({},dropStyleTop);
            if(this.props.usePositionHack){
                let boundingPlaceHolderEl = this.placeHolderEl.getBoundingClientRect();
                hackPositionStyles.position="fixed";
                hackPositionStyles.width="267";
                hackPositionStyles.left="49%";
                hackPositionStyles.top = boundingPlaceHolderEl.top -254;
            }
        }

        
        return <div className="gor-sel-att-wrap">
        <div className="gor-sel-att-placeholder" ref={(elem) => { this.placeHolderEl = elem; }} onClick={_this._toggleDrop}>
        <div className="gor-sel-att-pholder-text">
            <p>{_this.state.selectedSetCount ? <FormattedMessage id="selectAttribute.placeholderSelected.text" description='Text for placeholder in select attribute' 
            defaultMessage='{selectedSetCount} sets of Attributes selected'
            values={{
                selectedSetCount:_this.state.selectedSetCount
            }}
            /> : <FormattedMessage id="selectAttribute.placeholder.text" description='Text for placeholder in select attribute' 
            defaultMessage='Select Attributes'/>}</p>
        </div>
        <div className="gor-sel-att-arr-cont">
        <span className={this.state.dropdownVisible ? "gor-sel-att-arr up" : "gor-sel-att-arr down"}></span>
        </div>
        </div>
        
        <div style={hackPositionStyles} ref={(elem) => { this.dropElement = elem; }} className={this.state.dropdownVisible ? "gor-sel-att-drop" : "gor-sel-att-drop hide-drop"} >
            <div className="gor-sel-att-content">
        {(!attributeSelected && !this.state.showAttrList) && <div className={"gor-sel-att-add show"}>
            <div className="text-cont">
                <a href="javascript:void(0)" className="link" onClick={this._showAttrList}>
                {this.props.messages.add_set_of_attributes}
                </a>
            </div>
            <div className="footer">
            <p>{this.props.messages.footer_message}</p>
            </div>
            
        </div>}
        {(!this.state.selectionApplied  && this.state.showAttrList) && <div>
        <div className={"attribute-cont"}>
        <div className={"header"}>
            <div className={"header-left"}>
                <button className={"back"} onClick={this._backToDefault}><span>&lt;&nbsp;&nbsp;&nbsp;</span>
                <span>{this.props.messages.back}</span></button>
            </div>
            <div className={"header-right"}>
                <button className={"clearAll"} onClick={this._clearSelectedAttributes}>{this.props.messages.clear_all}</button>
            </div>
        </div>
        <AttributeList>
            {this.state.data.map((row, index) => (
                <section key={index} className="attribute-row">
                <div className="category">
                    {row.category_text}
                </div>
                <div className="values">
                    {Object.keys(row.attributeList).map((key, idx) => (
                        <div className={"values-wrapper"} key={key+idx}>
                            <span><input type="checkbox" checked={row.attributeList[key].checked} onClick={(e)=>_this._selectAttribute(e,row.category_value,key,index)}/></span>
                            <span className="label">{row.attributeList[key].text}</span>
                        </div>

                    ))}
                  
                </div>

            </section>
            ))}
            </AttributeList>
            </div>
        <div className="footer-apply">
             <a href="javascript:void(0)" className="link" onClick={(e)=>_this._applySelection(e,_this.props.index)} >
                {this.props.messages.apply}
                </a>
            </div>
        </div>}
       
        {(attributeSelected && _this.state.extraFlagtoBack) &&  <div>
             <div className={"attribute-cont"}>
             <div className={"header"}>Selected Set of Attributes</div>
             <AttributeList>
            {Object.keys(_this.state.selectedSets).map((key, index) => (
                
                <section key={key+index} className="attribute-row">
                <div className="category">
                   <span className={"setName"}> {"Set "+(index+1)}</span>
                   <span className={"actions-icons"}> <i className={"gor-edit-icon"} onClick={(e)=>this._editSet(e,key)}/> <i className={"gor-del-icon"} onClick={(e)=>this._deleteSet(e,key,_this.props.index)}/></span>
                </div>
                <div className="values">
                    {Object.keys(_this.state.selectedSets[key]).map((key2, idx) => {
                        let tuples=[];
                        if(!_this.state.selectedSets[key][key2].excludeFromSet){
                            tuples.push((<span key={key2+idx} className={"set"}>{_this.state.selectedSets[key][key2].text}</span>));
                        }
                        return tuples;
                    })}
                  
                </div>

            </section>
            ))}
            </AttributeList>
            </div>
           <div className="footer-apply">
             <a href="javascript:void(0)" className="link" onClick={this._showAttrList} >
                {this.props.messages.add_more_sets_of_attributes}
                </a>
            </div>
         
        </div>}
          

            </div>
        </div>
        </div>
    }
}