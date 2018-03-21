import React  from 'react';
import {Canvas,Circle, Image, Path, Text,Rect} from 'react-fabricjs';

class ButlerMap extends React.Component {
    
    constructor(props) {

        super(props);
        

    }


    componentWillMount() {
       
      
     }
    componentWillReceiveProps(nextProps) {
     
    }
    componentDidMount() {
        const canvas = new Canvas('canvas', {
          width: '200px',
          height: '200px'
        });
    }

render() {

return (
 
    <Canvas ref={node => {this.refs.canvas = node}}>
</Canvas>
   

        );
}
};


export  default ButlerMap

