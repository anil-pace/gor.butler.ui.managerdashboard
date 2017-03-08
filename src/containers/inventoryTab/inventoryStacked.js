import React  from 'react';
import StackedChartHorizontal from '../../components/graphd3/stackedChartHorizontal'






class InventoryStacked extends React.Component{
  constructor(props) 
  {
     super(props);
    
   }
   

   render() {
   
   return (
     <div>
       <StackedChartHorizontal hasDataChanged= {this.props.hasDataChanged} snapshotData = {this.props.snapshotData} />
     </div>
   )
 }
};

InventoryStacked.propTypes={
  snapshotData:React.PropTypes.object,
  hasDataChanged:React.PropTypes.bool
}



export default InventoryStacked ;