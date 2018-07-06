import React  from 'react';

class Accordian extends React.Component{
  constructor(props) 
  {
      super(props); 
  }
  render()
  {
   var processedData;   
   var list=this.props.data;
   processedData=list.map(function(obj){
        <div>
            {obj.name}
        </div>
    })
      return (
        <div>
         {processedData}
        </div>
      );
    }
}