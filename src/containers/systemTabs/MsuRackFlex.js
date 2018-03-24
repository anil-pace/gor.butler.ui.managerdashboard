import React from 'react';


class MsuRackFlex extends React.Component {

    constructor(props) {
          super(props);
          this.state = this._getMaxXMaxYCoords(this.props.rackDetails);
    }

    componentWillReceiveProps(nextProps) {
        this._getMaxXMaxYCoords(this.props.rackDetails);
    }
      
    componentDidMount() {
      /*
          Calling the line function only if the drawerLineDrawn is false 
          and the slot type is drawer.
          drawerLineDrawn is set true once the line is created
       */

      //  var lines = document.getElementsByClassName("connectingLine");
      //  if(lines.length===0){
      //     var strEl = document.querySelectorAll("#selectedSlot")[0];
      //     strEl = strEl ? strEl.parentNode : null;
      //     var endEl  = document.querySelectorAll("#slotDisplayArea")[0];
      //     if(strEl && endEl){
      //      this.connect(strEl, endEl, "#626262", 3);
      //     }
      // }
    }

    componentWillUnmount(){
      var lines = document.getElementsByClassName("connectingLine");
      if(lines.length){
        lines[0].remove();
      }
    }

    _getMaxXMaxYCoords(vSlots){
      if (!vSlots || (vSlots.constructor !== Array && vSlots.length < 1)){
        //no slots found
        return;
    }

      var totalSlots = vSlots.length;
      var totalWidth =0, totalHeight=0;
      var lastHSlot = {}, lastVSlot={}; 
      var selectedSlotIndex;


      var newBarcodes = []; // for storing post data manipulation
      var selectedSlotIds = "";

      this.props.slotBarcodes.map(function(slotBarcodes,idx){
          var str = slotBarcodes,
          delimiter = '.',
          start = 2,
          result,
          tokens = str.split(delimiter).slice(start);
          if(tokens.length > 1) result = tokens.join("."); //take extra care when we have 3rd "." as delimiter
          else result = tokens.toString();

          newBarcodes.push(result);
      });
      selectedSlotIds = newBarcodes.join(', ');
    

      vSlots.map(function(eachSlot, index){
        var eachSlotBarcodes = eachSlot.barcodes;
        if(!eachSlotBarcodes) return;
        if(eachSlotBarcodes.length === newBarcodes.length){
          if( JSON.stringify(newBarcodes)==JSON.stringify(eachSlotBarcodes) ){
             selectedSlotIndex = index;
          }
        }
      });
    
      lastHSlot = vSlots.reduce(function(prevSlot,currSlot){
          if (prevSlot.orig_coordinates[0] < currSlot.orig_coordinates[0]){
              return currSlot;
          }else if (prevSlot.orig_coordinates[0] === currSlot.orig_coordinates[0]){
              return currSlot;
          }else{
              return prevSlot;
          }
      });

      lastVSlot = vSlots.reduce(function(prevSlot,currSlot){
          if (prevSlot.orig_coordinates[1] < currSlot.orig_coordinates[1]){
              return currSlot;
          }else if (prevSlot.orig_coordinates[1] === currSlot.orig_coordinates[1]){
              return currSlot;
          }else{
              return prevSlot;
          }
      });

      return{
          vSlots:vSlots,
          lastHSlot:lastHSlot,
          lastVSlot: lastVSlot,
          selectedSlotIndex: selectedSlotIndex,
          selectedSlotIds: selectedSlotIds
      }
    }

    connect(startEl, endEl, color, thickness) {
      var off1 = this.getOffset(startEl);
      var off2 = this.getOffset(endEl);
      // bottom right
      var x1 = off1.left + off1.width;
      var y1 = off1.top + off1.height/2;
      // top right
      var x2 = off2.left ;
      var y2 = off2.top+ off2.height/2;
      // distance
      var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
      // center
      var cx = ((x1 + x2) / 2) - (length / 2);
      var cy = ((y1 + y2) / 2) - (thickness / 2);
      // angle
      var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
      // make hr

      var htmlLine = "<div class='connectingLine' style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
      document.getElementById('app').innerHTML += htmlLine; 
    }

    getOffset( el ) {
      var rect = el.getBoundingClientRect();
      return {
          left: rect.left + window.pageXOffset,
          top: rect.top + window.pageYOffset,
          width: rect.width || el.offsetWidth,
          height: rect.height || el.offsetHeight
      };
    }

      _createSlotLayouts(vSlots, lastHSlot, lastVSlot, selectedSlotIndex, selectedSlotIds) {
        if ((vSlots.constructor !== Array && vSlots.length < 1) || !(lastHSlot.length) || !(lastVSlot.length)){
            //no bins found
            return;
        }
        var vHTMLSlots =[];
         // since the total width would be 100% but the bins would be divided into
         // ratios, hence each of the bin would have to have the factor into % of the
         // .bins container.

         // for reference orig_coordinates[0] === x axis and orig_coordinates[1] === y axis
         var horFactor = parseFloat(100/(Number(this.props.rackWidth)));
         var vertFactor = parseFloat(100/(Number(lastVSlot.orig_coordinates[1]) + Number(lastVSlot.height)));


        var totalRackHeight = Number(lastVSlot.orig_coordinates[1]) + Number(lastVSlot.height);
        var borderLeft, borderTop, borderRight;

         for (var i =0; i<vSlots.length ;i++){
            var binWidth = vSlots[i].length * horFactor+'%';
            var binHeight = vSlots[i].height * vertFactor +'%';
            var ileft=0;
            var ibottom=0;

            ileft = (vSlots[i].orig_coordinates[0] * horFactor +'%'); // 0 on x-axis should start from bottom-left towards right.
            ibottom = (vSlots[i].orig_coordinates[1]) * vertFactor +'%'; // 0 on y-axis should start from bottom-left towards up.

            let sumH = vSlots[i].orig_coordinates[0] + vSlots[i].length;
            let sumV= vSlots[i].orig_coordinates[1] + vSlots[i].height;
            /* Check for BORDER of bins-flex - START*/

            if(Number(vSlots[i].orig_coordinates[0]) === 0){
              borderLeft="0.625vw solid #939598";
            }
            else{
              borderLeft="1px solid #939598";
            }
            if(Number(totalRackHeight) === sumV){
              borderTop="0.625vw solid #939598";
            }
            else{
              borderTop="1px solid #939598";
            }
            if(this.props.rackWidth === sumH) {
               borderRight="0.625vw solid #939598";
            }
            else{
              borderRight = "0.16vw solid #939598";
            }
              
            /* END **********************************/

            if(i===selectedSlotIndex){
              var setSlotBackground="#bbbbbb";
              var drawALine=(<div id="selectedSlot"></div>);
            }
            else 
              var setSlotBackground="#e8e8e8";

            vHTMLSlots.push(
                           <div key={i} className="subSlot"
                              style={{
                                width: binWidth,
                                height: binHeight,
                                bottom: ibottom,
                                left:ileft,
                                borderTop: borderTop,
                                borderRight: borderRight,
                                borderLeft: borderLeft,
                                background: setSlotBackground
                              }}>{drawALine}
                           </div>
                          )

          }
          //attach legs to Rack
          vHTMLSlots.push(<div key={"legsSpaceContainer"} className="legsSpaceContainer"> </div>);
        return vHTMLSlots;
    }

    render() {
      var orientationClass,stackText,count,stackCount,fragileClass,stackClass,nestable_count,nestable_direction,stackicon;
      var putDirection = this.props.putDirectionFlex;
      var vHTMLSlots = this._createSlotLayouts(this.state.vSlots,
                                               this.state.lastHSlot,
                                               this.state.lastVSlot,
                                               this.state.selectedSlotIndex,
                                               this.state.selectedSlotIds
                                             );

    //         if(putDirection){
    //     nestable_count=putDirection.nestable_count;
    //     nestable_direction=putDirection.nestable_direction;
    //     stackCount=putDirection.stacking_count? putDirection.stacking_count[putDirection.stacking_count.length-1]:0;
    //      if(putDirection.orientation_preference && nestable_count>1){
    //     orientation="orientation";
    //     orientationClass = './assets/images/'+ putDirection.nestable_direction+'Nesting.gif?q='+Math.random();
    //     }
    //     else if(putDirection.orientation_preference && stackCount>=1){
    //     orientation="orientation";  
    //     orientationClass=stackCount>1?'./assets/images/'+ putDirection.stacking+'Stackable.gif?q='+Math.random():'./assets/images/' + putDirection.stacking+'nonStackable.svg';
    //     }
    //     else
    //     {
    //        orientation="containerHide";
    //     }             
    //     stackText=nestable_count>1? _("NEST MAX") : stackCount>1?_("STACK MAX") : _("DO NOT STACK");
    //     stackicon=nestable_count>1? "stackicons nestingicon" : stackCount>1?"stackicons stackingicon" : "stackicons nonstackingicon";
    //     fragileClass=putDirection.fragile?"fragile":"containerHide";
    //     stackClass=nestable_count>1? "stackSize" :stackCount>=1?"stackSize":"containerHide";
    //     count=nestable_count>1?nestable_count:stackCount>1?stackCount:""

    // }
      return(
        <div  style={{width: "100%"}} className="parent-container">
          <div className="slotsFlexContainer">
              {vHTMLSlots}
         </div>
      </div>
      );
    }
};

//module.exports = MsuRackFlex;
export default MsuRackFlex;