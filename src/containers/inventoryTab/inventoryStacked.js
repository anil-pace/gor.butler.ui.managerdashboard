import React  from 'react';
import StackedChartHorizontal from '../../components/graphd3/stackedChartHorizontal'

class InventoryStacked extends React.Component{

 render() {

   return (
           <div>
           <StackedChartHorizontal snapshotData={this.props.snapshotData} />
           </div>
           )
 }
};

InventoryStacked.propTypes={
  snapshotData:React.PropTypes.object,
  hasDataChanged:React.PropTypes.bool
}



export default InventoryStacked ;