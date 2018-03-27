import React  from 'react';
import {fabric} from 'fabric'


class ButlerMap extends React.Component {
    
    constructor() {

        super();
        this.refs = {
            canvas: {}
          };
        

    }

    componentDidMount() {
        const canvas = new fabric.Canvas('c', {
            width: 500,
            height: 500
          });
          var rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'white',
            width: 80,
            height: 80,
            
          });
          rect.set('selectable', false); 
          canvas.add(rect);
    }


render() {

return (
 
    <div className="dey">
    <canvas
          id="c"
          />
</div>
        );
}
};


export  default ButlerMap

