import React  from 'react';
import { FormattedMessage } from 'react-intl'; 

class CSVUpload extends React.Component{
  constructor(props) 
  {
      super(props); 
      this._renderChildren = this._renderChildren.bind(this);
      this.dragOverHandler= this.dragOverHandler.bind(this);
      this.dragEndHandler= this.dragEndHandler.bind(this);
      this.resetFileInput = this.resetFileInput.bind(this);
  }

  _renderChildren() {
  return React.Children.map(this.props.children, child => {
    return React.cloneElement(child, {
      onDrop: (e)=>{this.props.onDrop(e)},
      onDragOver:this.dragOverHandler,
      onDragEnd:this.dragEndHandler
    })
  })
}
  
 

  dragOverHandler(event){
    // Prevent default select and drag behavior
    event.preventDefault();
  }

  dragEndHandler(event){
    // Remove all of the drag data
    var dt = event.dataTransfer;
    if (dt.items) {
      // Use DataTransferItemList interface to remove the drag data
      for (var i = 0; i < dt.items.length; i++) {
        dt.items.remove(i);
      }
    } else {
      // Use DataTransfer interface to remove the drag data
      event.dataTransfer.clearData();
    }
  }
  resetFileInput(){
    this.fileUploadInput.value = null;
  }

  render()
  {
      return (
        <div>
              <div className='gor-audit-drag-drop-wrapper'>
                <div className='gor-audit-drag-drop-content'> 
                {this._renderChildren()}
                </div>
                <div className='gor-audit-upload-file'>
                    <a href="#"><span className="gor-audit-csvupload-text">
                    <FormattedMessage id="gor.audit.uploadcsv" description='Text for upload csv file' 
            defaultMessage='Upload .CSV file'/>
 </span> </a>
                    <input type="file" id="uploadCSVFile" ref={node=> {this.fileUploadInput=node}} onClick={this.resetFileInput}  size="50" onChange={this.props.onFileUpload}/>
                </div>
              </div>
              <pre id="displayCSVFile"></pre>
        </div>
      );
    }
  }

export default CSVUpload;
