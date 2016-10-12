/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import {getPageData} from '../../actions/paginationAction';
import {ORDERS_RETRIEVE} from '../../constants/appConstants';
import {BASE_URL, ORDERS_URL} from '../../constants/configConstants';
import OrderListTable from './orderListTable';
class OrderListTab extends React.Component{
  constructor(props) 
  {
      super(props);
  } 
  componentDidMount() {
    var data = {};
    data.selected = 0;
    this.handlePageClick(data);
  }

    handlePageClick = (data) => {
    var url = BASE_URL + ORDERS_URL + "?page=" + (data.selected+1) + "&PAGE_SIZE=8";
    let paginationData={
              'url':url,
              'method':'GET',
              'cause': ORDERS_RETRIEVE,
              'Authentication-Token': sessionStorage.getItem('auth_token'),
              'contentType':'application/json'
          } 
         this.props.getPageData(paginationData);
    }

    
  render(){
    var itemNumber = 3;
    var temp_data=[{
  "id": "Wave-009",
  "status": "Online",
  "recievedTime": "Today, 09:15"
}, {
  "id": "Wave-009",
  "status": "Online",
  "recievedTime": "Today, 09:15"
}];

//<OrderListTable items={this.props.orderData.ordersDetail} itemNumber={itemNumber}/>
    return (
      <div>
      <OrderListTable items={this.props.orderData.ordersDetail} itemNumber={itemNumber}/>
 
      <div id={"react-paginate"}>
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageNum={5}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={50}
                       clickCallback={this.handlePageClick.bind(this)}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
     </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    orderData: state.getOrderDetail || {},
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    getPageData: function(data){ dispatch(getPageData(data)); }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(OrderListTab) ;
