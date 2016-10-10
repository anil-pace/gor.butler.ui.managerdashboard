/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import {getPageData} from '../../actions/paginationAction';

class OrderListTab extends React.Component{
	constructor(props) 
	{
    	super(props);
  }	

    handlePageClick () {
      console.log(this.props)
      //this.props.getPageData(this.pageNum);
    }
	render(){
		return (
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
		);
	}
}

var mapDispatchToProps = function(dispatch){
  return {
    getPageData: function(data){ dispatch(getPageData(data)); }
  }
};

export default connect(mapDispatchToProps)(OrderListTab) ;
