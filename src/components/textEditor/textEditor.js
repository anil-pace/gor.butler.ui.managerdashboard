import React  from 'react';

class TextEditor extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      editState:false,
      labelState:false
    };
   this.changeState=this.changeState.bind(this);
   this.handleKeyPress=this.handleKeyPress.bind(this);
  }
  changeState(){
     if(!this.state.editState){
         this.setState({editState:true});
         this.setState({labelState:false});
     }
  }
  handleKeyPress (event){
    if(event.key == 'Enter'){
      console.log('enter press here!');
      this.setState({labelState:true});
      this.setState({editState:false});
    }
  }
 
    render() {
      return (   
        <div>  
        <div style={{'position': 'relative','width':'400px'}}>
        <div contentEditable="true" data-text="Enter text here" style={{"display":this.state.labelState?'none':'block'}} className={this.state.editState?"textBox":"divBox"} onClick={this.changeState} onKeyPress={this.handleKeyPress}> </div>
        <span style={{"display":!this.state.editState?'none':'block'}} className="pressEnter">Enter to save</span>
        </div>
        <div style={{"display":this.state.labelState?'block':'none'}}>
        <span   className="viewContent">Raja dey is a good boy</span>
        <span   onClick={this.changeState}  className="editIcon"></span>
      </div>
      </div>
      );
    }
  }

export default TextEditor;