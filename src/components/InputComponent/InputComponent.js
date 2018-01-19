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
		return(
			<div>
			<input type="checkbox" checked/>
			<div className="gor-audit-input-wrap after-validation">
			<input 
			    autoFocus={this.props.autoFocus} 
			    className={this.props.className} 
			    style={this.props.style} 
			    onFocus={this._onFocus}
			    defaultValue={this.props.value}
			    type="text"   
			    placeholder={this.props.placeholder}/>
			</div>
			    <span>Error</span>
			    </div>

			    )
	}
}


export const InputComponent={
	CopyPaste:InputHOC(Input),
	AfterValidation:InputAfterValidation
}