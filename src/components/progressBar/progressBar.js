
import React  from 'react';
import { FormattedMessage } from 'react-intl'; 

class ProgressBar extends React.Component{
  constructor(props) 
  {
      super(props); 
      
  }
  
  render()
  {
      return (
        <div className="gor-progress-bar-wrapper">
          <div style={{height: "12px", background: "#4a4a4a", borderRadius: "12px", width:this.props.progressWidth+"%"}}> </div>
        </div>
      );
    }
  }

export default ProgressBar;