import React  from 'react';
import StackedChartHorizontal from '../../components/graphd3/stackedChartHorizontal'
import {SCH_CONFIG} from '../../constants/appConstants'





class InventoryStacked extends React.Component{
  constructor(props) 
  {
     super(props);
    
   }
   

   render() {
   
   return (
     <div>
       <StackedChartHorizontal hasDataChanged= {this.props.hasDataChanged} snapshotData = {this.props.snapshotData} config = {SCH_CONFIG}/>
     </div>
   )
 }
};

InventoryStacked.propTypes={
  snapshotData:React.PropTypes.object,
  hasDataChanged:React.PropTypes.number
}



export default InventoryStacked ;