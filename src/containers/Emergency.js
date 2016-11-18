import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux' ;
import { FormattedMessage } from 'react-intl';        

class Emergency extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  removeThisModal() {
      this.props.removeModal();
  }
  render()
  {
      return (
        <div>
          <div className='gor-emergency'>
            <div className='gor-emergency-heading'>
              <span className='gor-error-white'></span><span>Systemwide emergency stop</span>
           </div>
              <div className='gor-emergency-body'>
                <span>The butler system is now stopped by a hard emergency.</span>
                <div>System reset required before returning to operation</div>
                <div className='gor-emergency-details'>
                  <div>Stoppped:</div>
                  <div>Triggered at:</div>
                  <div>Operator:</div>                
                </div>
              </div> 
                <p><button className='gor-emergency-close' onClick={this.removeThisModal.bind(this)}>Close</button></p>
          </div>
        </div>
      );
    }
  };
 
function mapDispatchToProps(dispatch){
    return {

    }
};

export default connect(null,mapDispatchToProps)(Emergency);
