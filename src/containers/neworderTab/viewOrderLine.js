import React  from 'react';
import { FormattedMessage } from 'react-intl'; 
import { connect } from 'react-redux';


let dataSource =[
{
    name:'Paul mak',
    image: <img width="50" src="./images/profile_img.png"/>,
},
{
    name:'John Doe',
    image : '002'
},
{
    name:'Sachin Tendulkar',
    image : '003'
}];


class ViewOrderLine extends React.Component{
  constructor(props) 
  {
      super(props); 
      this.state={
        searchValue: 'Search product',
        query: '',
        filteredData: undefined
      }
      this.handleChange = this.handleChange.bind(this);
  }
  _removeThisModal() {
    this.props.removeModal();
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.auth_token)
    {
      this._removeThisModal();
    }
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value});
    console.log("===========================================================>");
      console.log("===========================================================>");
      console.log(this.state.searchValue);
    var queryResult=[];
        dataSource.forEach(function(person){
            if(person.name.toLowerCase().indexOf(event.target.value)!=-1)
            queryResult.push(person);
        });

        console.log("===========================================================>");
        console.log("===========================================================>");
        console.log(queryResult);

        // this.setState({
        //     query:queryText,
        //     filteredData: queryResult
        // })
  }

  doSearch(queryText){
    console.log(queryText);
    var queryResult=[];
        dataSource.forEach(function(person){
            if(person.name.toLowerCase().indexOf(queryText)!=-1)
            queryResult.push(person);
        });

        this.setState({
            query:queryText,
            filteredData: queryResult
        })
  }

  renderResults(){
      if (this.state.filteredData) {
          return (
            <div> 
              Hello
            </div>
          );
      }
  }

  render()
  {
       return (
        <div>
          <div className="gor-modal-content">
            <div className='gor-modal-head'>
              <span className='orderIdWrapper'>
                <FormattedMessage id="orders.orderId" description='Heading for view orderline' defaultMessage='Order ID'/>
              </span>
              <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
            </div>

            <div className='gor-modal-body'>
              <div className="orderDetailsWrapper">
                  <div className="orderDetailsHeader">
                    <FormattedMessage id="orders.orderdetails" description='Heading for Order details' defaultMessage='Order details'/>
                  </div>
                  <div className="orderDetailsContent">
                      <div className="orderDetailsLeft"> 
                          <div className="orderDetailsColumn">
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-1-span-key"> <FormattedMessage id="orders.ppsId" description='pps id' defaultMessage='PPS ID:'/> </span>
                                <span className="spanValue"> --- </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-1-span-key"> <FormattedMessage id="orders.binNo" description='bin no' defaultMessage='Bin no:'/> </span> 
                                <span className="spanValue"> --- </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-1-span-key"> <FormattedMessage id="orders.operator" description='operator' defaultMessage='Operator:'/> </span> 
                                <span className="spanValue"> --- </span> 
                              </div>
                          </div>

                          <div className="orderDetailsColumn">
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-2-span-key"> <FormattedMessage id="orders.operator" description='lines received' defaultMessage='Lines received:'/> </span> 
                                <span className="spanValue"> --- </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-2-span-key"> <FormattedMessage id="orders.linesinprogress" description='lines in progress' defaultMessage='Lines in progress:'/> </span> 
                                <span className="spanValue"> --- </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-2-span-key"> <FormattedMessage id="orders.linescompleted" description='lines completed' defaultMessage='Lines completed:'/> </span> 
                                <span className="spanValue"> --- </span> 
                              </div>
                          </div>

                          <div className="orderDetailsColumn">
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-3-span-key"> <FormattedMessage id="orders.waveId" description='wave id' defaultMessage='Wave ID:'/> </span> 
                                <span className="spanValue"> --- </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-3-span-key"> <FormattedMessage id="orders.cutofftime" description='cut off time' defaultMessage='Cut off time:'/> </span> 
                                <span className="spanValue"> --- hrs </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-3-span-key"> <FormattedMessage id="orders.timeleft" description='time left' defaultMessage='Time left:'/> </span> 
                                <span className="spanValue"> --- hrs left </span> 
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="orderDetailsSearchWrap"> 
                    <div className="searchBarWrapper">
                      <div className="searchIconWrap"> 
                        <div className="gor-search-icon"></div>
                      </div>
                      <div className="inputWrapper"> 
                        <input type="text" className="gor-search-input-wrap" value={this.state.searchValue} onChange={this.handleChange} doSearch={this.doSearch}/>
                      </div>
                    </div>
                  </div>
              </div>
              {this.renderResults()}
            </div>
          </div>
        </div>
      );
    }
  }
export default ViewOrderLine;

