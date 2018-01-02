
import React from 'react'


export class AttributeList extends React.Component {
    constructor(props) {
        super(props)
        this._showAttrList = this._showAttrList.bind(this);
        this._backToAddLink = this._backToAddLink.bind(this);
        this.state = this._getInitialState();
    }
    _getInitialState(){
        return{
            showAttrList:!this.props.noSelection
        }
    }

    _showAttrList(){
        this.setState({
            showAttrList:!this.state.showAttrList
        })
    }
    _backToAddLink(){
        this.setState({
            showAttrList:false
        })
    }

    

    render() {
        return <div className="gor-sel-att-list">
        <div className={this.state.showAttrList  ? "gor-sel-att-cont show" : "gor-sel-att-cont hide"} >
            <div className="gor-sel-att-head">
            <span className="gor-sel-att-back">
            <a href="javascript:void(0)" className="link" onClick={this._backToAddLink}>
                Back
                </a>
            </span>
            <span className="gor-sel-att-clear">
            <a href="javascript:void(0)" className="link" >
                Clear All
                </a>
            </span>
            </div>
            <div className="gor-sel-atts">
            {this.props.children}
            </div>
            <div className="footer-apply">
                <a href="javascript:void(0)" className="link" onClick={this.props._applySelection} >
                APPLY
                </a>
            </div>
        </div>
        <div className={!this.state.showAttrList ? "gor-sel-att-add show" : "gor-sel-att-add hide"}>
            <div className="text-cont">
                <a href="javascript:void(0)" className="link" onClick={this._showAttrList}>
                + ADD SET OF ATTRIBUTES
                </a>
            </div>
            <div className="footer">
            <p>Note: You can add multiple sets of attributes</p>
            </div>
            
        </div>
        </div>
    }
}