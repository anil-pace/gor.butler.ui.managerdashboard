import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';

/**
 * Generic component for file upload
 */
class FileUpload extends React.Component{
	constructor(props)  
	{
    	 super(props);
        this.state = {
            isError: "-1"
        }
    	
    }
    _onFileChange(event){
       /**
        * Need to add validations
        */
       var file =  event.target.files[0],
       fileName = file.name,
       isError = "-1",
       maxFileSize = this.props.maxFileSize,
       extns = this.props.acceptedFormats;
       if(!extns.includes("."+fileName.split('.').pop())){
         isError = "1"
         
        }
        
        if(isError === "-1"){
            this.props.onChange(event.target.files[0])
        }
        this.setState({
              isError: isError
            });

            
        
    }
    _onInputClick(){
        this.refs.fileUpload.value = null;
    }

    

	render(){
		 var isProcessing = this.props.isProcessing;
   var maxSize = this.props.maxFileSize > 1024? (this.props.maxFileSize ? Math.round(this.props.maxFileSize / 1024)+ "mb" : 0 + "mb"):this.props.maxFileSize +"kb";

   var errorLine= (this.props.maxSize)?((this.props.errorCode && this.props.errorCode=="utility002")?this.props.maxSize+"line":maxSize):"";
	
  	return (
			<div>
            
				<div className="gor-utility-btn-wrap">
					<button className="gor-filterBtn-applied">
          				<label>
  							{!isProcessing? this.props.uploadBtnText :<div className='gor-orange-spinner gor-csv-processing'></div>}
						</label>

         			</button>
                    <label className = {"gor-csvUploadWrap"}>
                    <input type="file" ref="fileUpload" name={"csvUpload"} disabled = {isProcessing} className = {"gor-csvUpload"}  accept={this.props.acceptedFormats.toString()} onClick={this._onInputClick.bind(this)} onChange={this._onFileChange.bind(this)}/>
                    </label>
                <p className={"gor-upl-msg"}> <FormattedMessage id="utility.fileSize.message" description='Maximum File Size:  MB' defaultMessage='Maximum File Size: {maxSize}' values={{maxSize:maxSize}}/></p>  
                <p className = {"gor-upl-msg gor-upl-err"}>
                    {this.props.validationList[this.state.isError]}
                    {this.props.errorList[this.props.errorCode]} {errorLine}
                 </p>  
         		</div>
                 
			</div>
		);
	}
};

FileUpload.propTypes={
    onChange:React.PropTypes.func,
    uploadBtnText:React.PropTypes.string,
    maxFileSize:React.PropTypes.number,
    acceptedFormats:React.PropTypes.array
}
export default FileUpload ;