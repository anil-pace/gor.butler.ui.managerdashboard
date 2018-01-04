import React from 'react';

export const InputComponent = (props) => {
  return (
    
    <input className={props.className} style={props.style} onChange={(props.updateInputLocation || props.updateInputCSVLocation)?props.updateInputLocation?props.updateInputLocation.bind(this,props.index):props.updateInputCSVLocation.bind(this,props.index):props.updateInput?props.updateInput.bind(this,props.index):props.updateInputCSV.bind(this,props.index)} type="text" value= {props.value} placeholder={props.placeholder}/>
    
    );
  

}