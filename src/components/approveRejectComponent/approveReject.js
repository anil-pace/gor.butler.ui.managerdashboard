import React  from 'react';

class AproveReject extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      activeid: this.props.name
    };
   
  }
  _headerCheckChange(){
            console.log(this);
            this.props.headerCheckChange();
  }
 
    render() {
     
      return (   
        <div style={{'display':'inline-block'}} >  
        <div style={{'display': 'inline-block'}}>
         <label className="checkBoxcontainer" > <input type="checkbox" id={'1'} checked={false}  onChange={this._headerCheckChange.bind(this)}/><span className="checkmark4"></span></label>
        <span className="textStyle">APPROVE</span>
        </div>
        <div style={{'display': 'inline-block'}}>
          <label className="checkBoxcontainer"> <input type="checkbox" id={'2'} checked={true}  onChange={this._headerCheckChange.bind(this)}/><span className="checkmark3"></span></label>
          <span className="textStyle">REJECT</span>
         </div>
      </div>
      );
    }
  }

export default AproveReject;