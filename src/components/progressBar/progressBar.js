
import React  from 'react';

class ProgressBar extends React.Component{
 render(){
     let applyWidth = this.props.progressBarWrapperWidth ? {width: this.props.progressBarWrapperWidth} : {width: "100%"};
     return (
       <div style={applyWidth} className="gor-progress-bar-wrapper">
         <div style={{height: "10px", background: "#4a4a4a", borderRadius: "12px", width:this.props.progressWidth+"%"}}> </div>
       </div>
     );
   }
 }

export default ProgressBar;