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
			    onChange={this.props.onInput}
			    value={this.props.value}
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
			    value:this.props.value,
			    onChange:(e)=>{this.props.updateInput(e,this.props.index)},
			    type:"text",
			    placeholder:this.props.placeholder,
			    disabled: this.props.errorMessage === true ? true : false
		}
		let hasError = this.props.errorMessage===true ? false : true;
		
		return(
			<div>
			{!this.props.allRowValid?<input type="checkbox" onChange={(e)=>{this.props.onAttributeCheck(e,this.props.index)}} checked={this.props.checked}/>:null}
			<div className={"gor-audit-input-wrap after-validation "+(hasError ? "error-tuple" : "valid-tuple") }>
			<input {...attributes}  />
			<span className={hasError ? "error-icon" : ""}></span>
			</div>

			    <span className={"error-message"}>{hasError ? this.props.errorMessage : null}</span>
			    </div>

			    )
	}
}


export const InputComponent={
	CopyPaste:InputHOC(Input),
	AfterValidation:InputAfterValidation
}