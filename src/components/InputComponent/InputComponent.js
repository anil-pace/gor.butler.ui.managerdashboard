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
		let hasError = (this.props.errorMessage === undefined || this.props.errorMessage === "") ? false : true;
		let errorClass =null;

		let attributes = {
				autoFocus : this.props.autoFocus,
			    className : this.props.className,
			    style : this.props.style,
			    value:this.props.value,
			    onChange:(e)=>{this.props.updateInput(e,this.props.index)},
			    type:"text",
			    placeholder:this.props.placeholder,
			    disabled: !hasError && !this.props.manualEntry ? true : false
		}
		let allRowValid = this.props.allRowValid;
		if(hasError){
			errorClass = "error-tuple";
		}
		else if(!this.props.manualEntry){
			errorClass = "valid-tuple";
		}
		else{
			errorClass="";
		}
		return(
			<div>
			{!allRowValid?<input type="checkbox" onChange={(e)=>{this.props.onAttributeCheck(e,this.props.index)}} checked={this.props.checked}/>:null}
			<div className={"gor-audit-input-wrap after-validation "+errorClass }>
			<input {...attributes}  ref={node => this.input = node}/>
			{hasError && <span className={"error-icon" }></span>}
			</div>
			    {hasError &&<span className={"error-message"}>{this.props.errorMessage}</span>}
			    </div>

			    )
	}
}


export const InputComponent={
	CopyPaste:InputHOC(Input),
	AfterValidation:InputAfterValidation
}
