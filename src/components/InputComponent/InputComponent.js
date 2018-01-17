import React from 'react';

export const InputComponent = (props) => {
  return (
    
    <input className={props.className} style={props.style} onChange={()=>{props.updateInput(props.index)}} type="text" value= {props.value} placeholder={props.placeholder}/>
    
    );
  

}