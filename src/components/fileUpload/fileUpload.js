import React  from 'react';
import { FormattedMessage } from 'react-intl';
import {UTILITY002,MB,KB} from '../../constants/frontEndConstants'; 

/**
 * Generic component for file upload
 */
 class FileUpload extends React.Component{

  _onFileChange(event){
    this.props.onChange(event.target.files[0])
  }   

  _onInputClick(){
    this.refs.fileUpload.value=null;
  }

  render(){
    var isProcessing=this.props.isProcessing;
    var maxSize=this.props.maxFileSize > MB?( Math.round(this.props.maxFileSize / MB) +"mb"): (Math.round(this.props.maxFileSize / KB)+ "kb");
    var errorLine= (this.props.maxSize)?((this.props.errorCode && this.props.errorCode===UTILITY002)?this.props.maxSize+"line":maxSize):"";

    return (
            <div>
            
            <div className="gor-utility-btn-wrap">
            <button className="gor-filterBtn-applied">
            <label>
            {!isProcessing? this.props.uploadBtnText :<div className='gor-orange-spinner gor-csv-processing'></div>}
            </label>

            </button>
            <label className={"gor-csvUploadWrap"}>
            <input type="file" ref="fileUpload" name={"csvUpload"} disabled={isProcessing} className={"gor-csvUpload"}  accept={this.props.acceptedFormats.toString()} onClick={this._onInputClick.bind(this)} onChange={this._onFileChange.bind(this)}/>
            </label>
            <p className={"gor-upl-msg"}> <FormattedMessage id="utility.fileSize.message" description='Maximum File Size:  MB' defaultMessage='Maximum File Size: {maxSize}' values={{maxSize:maxSize}}/></p>  
            <p className={"gor-upl-msg gor-upl-err"}>
            {this.props.errorList[this.props.errorCode]} <FormattedMessage id="utility.fileSize.errorline" description='Line or size' defaultMessage=' {errorLine}' values={{errorLine:errorLine}}/> 
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