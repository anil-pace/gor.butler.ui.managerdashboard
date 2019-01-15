import React  from 'react';
import { FormattedMessage } from 'react-intl'; 

export default class ListDropDown extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isShowing:false
        }
        this._displayOverlay = this._displayOverlay.bind(this);
    }
    _displayOverlay(){
        this.setState((state)=>{
            return {
                isShowing:!state.isShowing
            }
        })
    }
    render(){
        return <div>
            <div>
            <span className="embeddedImage" onClick={this._displayOverlay}></span>
            </div>
            {this.state.isShowing && <div className="list-overlay">
                <ul>
                    {this.props.children}
                </ul>
            </div>}
        </div>
    }

}