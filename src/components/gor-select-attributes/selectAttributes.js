
import React from 'react'
import {AttributeList} from './attributeList.js'


export class SelectAttributes extends React.Component {
    constructor(props) {
        super(props)
        this._toggleDrop = this._toggleDrop.bind(this);
        this._applySelection = this._applySelection.bind(this);
        this._selectAttribute = this._selectAttribute.bind(this);
        this._toggleSelectionPane = this._toggleSelectionPane.bind(this);
        this.state = this._getInitialState();
    }
    _getInitialState(){
        return{
            dropdownVisible:false,
            data:[{
                category_text:"Product Color",
                category_value:"p_color",
                attributeList:{
                    "slvr":"Silver",
                    "Au":"Gold"
                }
            },
            {
                category_text:"Product Age",
                category_value:"p_age",
                attributeList:{
                    "3yr":"3 Years",
                    "Au":"Gold"
                }
            },
            {
                category_text:"Product test",
                category_value:"p_test",
                attributeList:{
                    "slvr":"Silver",
                    "Au":"Gold"
                }
            }],
            selectedAttributes:{},
            selectedSets:{},
            selectionApplied:false
        }
    }
    _toggleDrop(){
        this.setState({
            dropdownVisible:!this.state.dropdownVisible
        })
    }

    _selectAttribute(category,attribute,idx){
        var selectedAttributes =  JSON.parse(JSON.stringify(this.state.selectedAttributes)),
        data={
            "text":this.state.data[idx].attributeList[attribute],
            "category":category
        }
        selectedAttributes[attribute] = data
        //selectedAttributes.push(selection);
        this.setState({
            selectedAttributes:selectedAttributes
        })

    }
    _toggleSelectionPane(){
        this.setState({
            selectionApplied:false
        })
    }
    _applySelection(){
        var selectedSets =  JSON.parse(JSON.stringify(this.state.selectedSets)),
        selectedAttributes =  JSON.parse(JSON.stringify(this.state.selectedAttributes));
        selectedSets[Object.keys(selectedSets).length] = selectedAttributes;

        this.setState({
            selectedAttributes:{},
            selectionApplied:true,
            selectedSets
        })
    }

    render() {
        var _this = this;
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
            <AttributeList 
            noSelection={true} 
            >

            <div className="attribute-list">
            {!this.state.selectionApplied && this.state.data.map((row, index) => (
                <section key={index} className="attribute-row">
                <div className="category">
                    {row.category_text}
                </div>
                <div className="values">
                    {Object.keys(row.attributeList).map((key, idx) => (
                        <div key={key+idx}>
                            <span><input type="checkbox" defaultChecked={this.state.chkbox} onClick={()=>_this._selectAttribute(row.category_value,key,index)}/></span>
                            <span>{row.attributeList[key]}</span>
                        </div>

                    ))}
                  
                </div>

            </section>
            ))}
            {this.state.selectionApplied && Object.keys(this.state.selectedSets).map((key, index) => (
                <section key={key+index} className="attribute-row">
                <div className="category">
                   <span className={""}> {"Set "+(index+1)}</span>
                </div>
                <div className="values">
                    {Object.keys(this.state.selectedSets[key]).map((key2, index) => (
                        <div key={key2+index}>
                           <span className={""}>{this.state.selectedSets[key][key2].text}</span>
                        </div>

                    ))}
                  
                </div>

            </section>
            ))}
            <div className="footer-apply">
            {!this.state.selectionApplied && <a href="javascript:void(0)" className="link" onClick={this._applySelection} >
                APPLY
                </a>}
            {this.state.selectionApplied && <a href="javascript:void(0)" className="link" onClick={this._toggleSelectionPane} >
                Add More Sets of Attributes
                </a>}
                
            </div>
            
            </div>
            </AttributeList>
            </div>
        </div>
        </div>
    }
}