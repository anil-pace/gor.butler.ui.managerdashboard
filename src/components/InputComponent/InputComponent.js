import React from 'react';
import InputHOC from './hoc/inputComponentHOC';

class Input extends React.Component{
	constructor(props){
		super(props);
		this._onFocus = this._onFocus.bind(this);
	}
	_onFocus(e){
		let val = e.target.value;
		e.target.value = '';
		e.target.value=val;
	}
	render(){
		return(
			<input 
			    autoFocus={this.props.autoFocus} 
			    className={this.props.className} 
			    style={this.props.style} 
			    onFocus={this._onFocus} 
			    onInput={this.props.onInput}
			    defaultValue={this.props.value}
			    type="text"   
			    placeholder={this.props.placeholder}/>
			    )
	}
}
class InputAfterValidation extends React.Component{
	constructor(props){
		super(props);
		this._onFocus = this._onFocus.bind(this);
	}
	_onFocus(e){
		let val = e.target.value;
		e.target.value = '';
		e.target.value=val;
	}
	render(){
		let attributes = {
				autoFocus : this.props.autoFocus,
			    className : this.props.className,
			    style : this.props.style,
			    onFocus:this._onFocus,
			    defaultValue:this.props.value,
			    type:"text",
			    placeholder:this.props.placeholder,
			    disabled: this.props.errorMessage === true ? true : false
		}
		
		return(
			<div>
			{!this.props.allRowValid?<input type="checkbox" checked/>:null}
			<div className="gor-audit-input-wrap after-validation">
			<input {...attributes}  />
			</div>
			    <span>{this.props.errorMessage.error_reason ? this.props.errorMessage.error_reason : null}</span>
			    </div>

			    )
	}
}


export const InputComponent={
	CopyPaste:InputHOC(Input),
	AfterValidation:InputAfterValidation
}