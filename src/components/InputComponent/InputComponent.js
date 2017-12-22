import React from 'react';

export const InputComponent = (props) => {
  return (
    
    <input className={props.className} onChange={props.updateInput.bind(this,props.index)} type="text" value= {props.value}/>
    
    );
  
}