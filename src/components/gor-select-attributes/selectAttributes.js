
import React from 'react'
import {AttributeList} from './attributeList.js'


export class SelectAttributes extends React.Component {
    constructor(props) {
        super(props)
        this._toggleDrop = this._toggleDrop.bind(this);
        this._applySelection = this._applySelection.bind(this);
        this.state = this._getInitialState();
    }
    _getInitialState(){
        return{
            dropdownVisible:false,
            data:[{
                category_text:"Product Color",
                category_value:"p_color",
                attributeList:[{
                    attributeText:"Silver",
                    attributeValue:"slvr"
                },{
                    attributeText:"Gold",
                    attributeValue:"Au"
                }]
            }],
            selectedAttributes:[],
            selectedSets:{},
            selectionApplied:false
        }
    }
    _toggleDrop(){
        this.setState({
            dropdownVisible:!this.state.dropdownVisible
        })
    }

    _selectAttribute(category,attribute){
        var selectedAttributes =  JSON.parse(JSON.stringify(this.state.selectedAttributes))
        var selection = {
            category:category,
            attribute:attribute
        }
        selectedAttributes.push(selection);
        this.setState({
            selectedAttributes:selectedAttributes
        })

    }
    _applySelection(){
        var selectedSets =  JSON.parse(JSON.stringify(this.state.selectedSets)),
        selectedAttributes =  JSON.parse(JSON.stringify(this.state.selectedAttributes));
        selectedSets[Object.keys(selectedSets).length] = selectedAttributes;

        this.setState({
            selectedAttributes:[],
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
            applyCallback={this._applySelection}>

            <div className="attribute-list">
            {this.state.data.map((row, index) => (
                <section key={index} className="attribute-row">
                <div className="category">
                    {row.category_text}
                </div>
                <div className="values">
                    {row.attributeList.map((attr, index) => (
                        <div key={index}>
                            <span><input type="checkbox" onClick={_this._selectAttribute.call(_this,row.category_value,attr.attributeValue)}/></span>
                            <span>{attr.attributeText}</span>
                        </div>

                    ))}
                  
                </div>

            </section>
            ))}
            
            </div>
            </AttributeList>
            </div>
        </div>
        </div>
    }
}