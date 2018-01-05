import React  from 'react';
import { FormattedMessage } from 'react-intl'; 

class CSVUpload extends React.Component{
  constructor(props) 
  {
      super(props); 
      this.handleUploadCVSFile = this.handleUploadCVSFile.bind(this);
      this.dropHandler= this.dropHandler.bind(this);
      this.dragOverHandler= this.dragOverHandler.bind(this);
      this.dragEndHandler= this.dragEndHandler.bind(this);
  }
  
  parseCSVFile(fileName){
    var displayCSVFile = document.getElementById('displayCSVFile');
    var textType = /text.*/;
      if (fileName.type.match(textType)) {
        var reader = new FileReader();

        reader.onload = function(e) {
          let xyz = [];
          xyz.push(reader.result);
          displayCSVFile.innerText = reader.result;
        }
        reader.readAsText(fileName);  
      } else {
        console.log("File not supported!");
      }
  }

  handleUploadCVSFile(evt){
    var files = evt.target.files;
    var fileInput = document.getElementById('uploadCSVFile');
     fileInput.addEventListener('change', (e) => {
        var fileName = fileInput.files[0];
        this.parseCSVFile(fileName);
     });
  }

  dropHandler(event){
    event.preventDefault();
    // If dropped items aren't files, reject them
    var dt = event.dataTransfer;
    if (dt.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i=0; i < dt.items.length; i++) {
        if (dt.items[i].kind == "file") {
          var fileName = dt.items[i].getAsFile();
          this.parseCSVFile(fileName);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i=0; i < dt.files.length; i++) {
        console.log("... file[" + i + "].name = " + dt.files[i].name);
        var fileName = dt.files[i].name;
        this.parseCSVFile(fileName);
      }  
    }
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

  render()
  {
      return (
        <div>
          <div className='gor-usr-details'>
              <div className='gor-audit-drag-drop-wrapper'>
                <div className='gor-audit-drag-drop-content'> 
                  <div id="drop-zone" onDrop={this.dropHandler} onDragOver={this.dragOverHandler} onDragEnd={this.dragEndHandler}>
                    <p style={{border: "1px solid grey"}}> Image here </p>
                    <p> Drag and drop </p>
                    <p> OR </p>
                  </div>
                </div>
                <div className='gor-audit-upload-file'>
                    <a href="#"> Upload .CSV file </a>
                    <input type="file" id="uploadCSVFile" multiple size="50" onClick={this.handleUploadCVSFile}/>
                </div>
              </div>
              <pre id="displayCSVFile"></pre>
            </div>
        </div>
      );
    }
  }

export default CSVUpload;

