import React  from 'react';
import ReactDOM  from 'react-dom';
/**
 * Generic component for file upload
 */
class FileUpload extends React.Component{
	constructor(props)  
	{
    	super(props);
        this.state = {
            isError: null
        }
    	
    }
    _onFileChange(event){
       /**
        * Need to add validations
        */
       var file =  event.target.files[0],
       fileName = file.name,
       isError = null,
       maxFileSize = this.props.maxFileSize,
       extns = this.props.acceptedFormats;
       if(!extns.includes("."+fileName.split('.').pop())){
         isError = "0"
         
        }
        else if(file.size > maxFileSize){
            isError = "1"
        }
        
        if(!isError){
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
         
		return (
			<div>
            
				<div className="gor-utility-btn-wrap">
					<button className="gor-filterBtn-applied">
          				<label>
  							{!isProcessing? "UPLOAD MASTER DATA" :<div className='spinnerImage'></div>}
						</label>
         			</button>
                    <label className = {"gor-csvUploadWrap"}>
                    <input type="file" ref="fileUpload" name={"csvUpload"} disabled = {isProcessing} className = {"gor-csvUpload"}  accept={this.props.acceptedFormats.toString()} onClick={this._onInputClick.bind(this)} onChange={this._onFileChange.bind(this)}/>
                    </label>
                   
         		</div>
                 <p className = {"gor-upl-err"}>
                    {this.props.validationList[this.state.isError]}
                 </p>
			</div>
		);
	}
};

FileUpload.propTypes={
    onChange:React.PropTypes.func
}
export default FileUpload ;