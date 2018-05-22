
import React  from 'react';
import { FormattedMessage } from 'react-intl'; 

class ProgressBar extends React.Component{
 constructor(props) 
 {
     super(props); 
     
 }
 
 render()
 {
     let applyWidth = this.props.progressBarWrapperWidth ? {width: this.props.progressBarWrapperWidth} : {width: "100%"};
     return (
       <div style={applyWidth} className="gor-progress-bar-wrapper">
         <div style={{height: "10px", background: "#4a4a4a", borderRadius: "12px", width:this.props.progressWidth+"%"}}> </div>
       </div>
     );
   }
 }

export default ProgressBar;