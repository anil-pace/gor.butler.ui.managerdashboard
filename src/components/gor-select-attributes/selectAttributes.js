
import React from 'react';
import ReactDOM from 'react-dom';
import {AttributeList} from './attributeList.js'


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
        this._getInitialState=this._getInitialState.bind(this);
        this.state = this._getInitialState();
    }
    _getInitialState(){
        return{
            dropdownVisible:false,
            data:this.props.attributeList,
            nonMutatedData:this.props.attributeList,
            selectedAttributes:{},
            selectedSets:{},
            showAttrList:false,
            selectionApplied:false
        }
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
       // e.stopPropagation()
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            showAttrList:false
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
                "category":category
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
   
    _applySelection(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        var selectedSets =  JSON.parse(JSON.stringify(this.state.selectedSets)),
        selectedAttributes =  JSON.parse(JSON.stringify(this.state.selectedAttributes));
        if(Object.keys(selectedAttributes).length){
            selectedSets[Object.keys(selectedSets).length] = selectedAttributes;
        

        this.setState({
            selectedAttributes:{},
            selectionApplied:true,
            selectedSets
        })
    }
    }
    _showAttrList(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        var nonMutatedData = JSON.parse(JSON.stringify(this.state.nonMutatedData));
        this.setState({
            showAttrList:true,
            selectionApplied:false,
            data:nonMutatedData
        })
    }
    _deleteSet(e,idx){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        var selectedSets =  JSON.parse(JSON.stringify(this.state.selectedSets));
        delete  selectedSets[idx];
        this.setState({
            selectedSets,
            showAttrList:false
        })
    }
  

    render() {
        var _this = this;
        var attributeSelected = Object.keys(_this.state.selectedSets).length ? true : false;

        return <div className="gor-sel-att-wrap">
        <div className="gor-sel-att-placeholder" onClick={_this._toggleDrop}>
        <div className="gor-sel-att-pholder-text">
            <p>This is Placeholder</p>
        </div>
        <div className="gor-sel-att-arr-cont">
        <span className="gor-sel-att-arr down"></span>
        </div>
        </div>
        
        <div className={this.state.dropdownVisible ? "gor-sel-att-drop" : "gor-sel-att-drop hide-drop"} >
            <div className="gor-sel-att-content">
        {(!attributeSelected && !this.state.showAttrList) && <div className={"gor-sel-att-add show"}>
            <div className="text-cont">
                <a href="javascript:void(0)" className="link" onClick={this._showAttrList}>
                + ADD SET OF ATTRIBUTES
                </a>
            </div>
            <div className="footer">
            <p>Note: You can add multiple sets of attributes</p>
            </div>
            
        </div>}
        {(!this.state.selectionApplied  && this.state.showAttrList) && <div>
        <div className={"attribute-cont"}>
        <div className={"header"}>
            <div className={"header-left"}>
                <button className={"back"} onClick={this._backToDefault}><span>&lt;</span>
                <span>BACK</span></button>
            </div>
            <div className={"header-right"}>
                <button className={"clearAll"} onClick={this._clearSelectedAttributes}>Clear All</button>
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
                        <div key={key+idx}>
                            <span><input type="checkbox" checked={row.attributeList[key].checked} onClick={(e)=>_this._selectAttribute(e,row.category_value,key,index)}/></span>
                            <span>{row.attributeList[key].text}</span>
                        </div>

                    ))}
                  
                </div>

            </section>
            ))}
            </AttributeList>
            </div>
        <div className="footer-apply">
             <a href="javascript:void(0)" className="link" onClick={this._applySelection} >
                APPLY
                </a>
            </div>
        </div>}
        {attributeSelected && this.state.selectionApplied &&  <div>
             <div className={"attribute-cont"}>
             <div className={"header"}>Selected Set of Attributes</div>
             <AttributeList>
            {Object.keys(this.state.selectedSets).map((key, index) => (
                <section key={key+index} className="attribute-row">
                <div className="category">
                   <span className={"setName"}> {"Set "+(index+1)}</span>
                   <span className={"actions-icons"}><i className={"gor-del-icon"} onClick={(e)=>this._deleteSet(e,key)}/> <i className={"gor-edit-icon"} onClick={this._editSet}/></span>
                </div>
                <div className="values">
                    {Object.keys(this.state.selectedSets[key]).map((key2, idx) => (
                           <span key={key2+idx} className={"set"}>{this.state.selectedSets[key][key2].text}</span>
                        

                    ))}
                  
                </div>

            </section>
            ))}
            </AttributeList>
            </div>
           <div className="footer-apply">
             <a href="javascript:void(0)" className="link" onClick={this._showAttrList} >
                Add More Sets of Attributes
                </a>
            </div>
         
        </div>}
          

            </div>
        </div>
        </div>
    }
}