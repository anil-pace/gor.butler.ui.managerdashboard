import React from 'react';
import InputHOC from './hoc/inputComponentHOC';

class Input extends React.Component{
	
	
	componentDidMount(){
	const input = this.input;
    const selectionStart = this.props.selectionStart;
    input.focus();
    input.setSelectionRange(selectionStart, selectionStart);
	}
	render(){
		return(
			<input
				ref={node => this.input = node}
			    className={this.props.className} 
			    style={this.props.style} 
			    onChange={this.props.onInput}
			    value={this.props.value}
			    type="text"   
			    placeholder={this.props.placeholder}

			    />

			    )
	}
}
class InputAfterValidation extends React.Component{
	componentDidMount(){
	const input = this.input;
    const selectionStart = this.props.selectionStart;
    input.focus();
    input.setSelectionRange(selectionStart, selectionStart);
	}
	
	render(){
		let attributes = {
				autoFocus : this.props.autoFocus,
			    className : this.props.className,
			    style : this.props.style,
			    value:this.props.value,
			    onChange:(e)=>{this.props.updateInput(e,this.props.index)},
			    type:"text",
			    placeholder:this.props.placeholder,
			    disabled: this.props.errorMessage === true ? true : false
		}
		let hasError = this.props.errorMessage===true ? false : true;
		let allRowValid = this.props.allRowValid;
		
		return(
			<div>
			{!allRowValid?<input type="checkbox" onChange={(e)=>{this.props.onAttributeCheck(e,this.props.index)}} checked={this.props.checked}/>:null}
			<div className={"gor-audit-input-wrap after-validation "+(hasError ? "error-tuple" : "valid-tuple") }>
			<input {...attributes}  ref={node => this.input = node}/>
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