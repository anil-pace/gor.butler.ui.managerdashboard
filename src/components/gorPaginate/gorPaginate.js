import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl'; 


class GorPaginate extends React.Component{ 
	
	constructor(props) 
	{  
    	super(props);
      var totalPage = this.props.totalPage;
      this.state = {currentPage: 1, totalPage:totalPage, currentQuery: 1} 
  }

  componentWillReceiveProps(nextProps) {
    var totalPage = nextProps.totalPage;  // for async call response come with some delay so updating total page here
    this.setState({totalPage:totalPage});
  }

  submit(e) {
    e.preventDefault();
    var regex = /^\d+$/; // used for validation of numeric key by user 
    var data = {selected:this.state.currentPage};
    if(regex.test(this.pageNum.value)) {
      data = {selected:this.pageNum.value};
      if(data.selected >= this.state.totalPage) {
        data.selected = this.state.totalPage;
      }

      if(data.selected <= 0) {
        data.selected = 1;
      }
      
      this.setState({currentPage:data.selected, currentQuery:data.selected});
      this.props.getPageDetail(data);
    }
    else {
      this.props.getPageDetail(data);
      this.setState({currentQuery:data.selected});
    }
  }

  _textSubmit(e) {
    this.setState({currentQuery:this.pageNum.value});
  }

  _incPage() {
    var currentPage = this.state.currentPage;
    currentPage++;
    this.setState({currentPage:currentPage, currentQuery:currentPage});
    var data = {selected:currentPage};
    this.props.getPageDetail(data);
  }

  _decPage() {
    var currentPage = this.state.currentPage;
    currentPage--;
    this.setState({currentPage:currentPage, currentQuery:currentPage});
    var data = {selected:currentPage}
    this.props.getPageDetail(data);
  }

  _firstPage() {
    var data = {selected:1};
    this.setState({currentPage:1,currentQuery:1});
    this.props.getPageDetail(data);
  }

  _lastPage() {
    var lastPage = this.state.totalPage;
    var data = {selected:lastPage}
    this.setState({currentPage:lastPage,currentQuery:lastPage});
    this.props.getPageDetail(data);
  }

  
	render(){
    var paginateButton = {firstPg:"|<", lastPg:">|", prevPg:"<", nextPg:">"} 
    var currentPage = this.state.currentQuery;
    var totalPage = this.state.totalPage;
		return (
			<div>
        <div className="gor-paginate-wrap">
          <form onSubmit={this.submit.bind(this)}>
            <div className="gor-paginate-input-box-wrap">
              <div className="gor-paginate-text-wrap">
                <FormattedMessage id="paginate.page.heading" description='Heading for paginate page' defaultMessage='Page'/>
              </div> 
              <input className="gor-paginate-input-box" type="text" value={currentPage} onChange={this._textSubmit.bind(this)} ref={node => { this.pageNum = node }} />
              <div className="gor-paginate-text-wrap">
                <FormattedMessage id="paginate.page.pageNum" description='Heading for paginate pageNum' defaultMessage='of {totalPage}' values={{totalPage:totalPage}}/>
              </div>
              </div>
              <div className="gor-button-wrap">
                <div className={currentPage<=1?"gor-paginate-left-btn gor-paginate-btn-disable":"gor-paginate-left-btn"} onClick={this._firstPage.bind(this)}> 
                  <span className="gor-pagination-first"/>
                </div>
                <div className={currentPage<=1?"gor-paginate-middle-left-btn gor-paginate-btn-disable":"gor-paginate-middle-left-btn"} onClick={this._decPage.bind(this)}> 
                  <span className="gor-pagination-previous"/> 
                </div>
                <div className={currentPage>=(totalPage)?"gor-paginate-middle-right-btn gor-paginate-btn-disable":"gor-paginate-middle-right-btn"} onClick={this._incPage.bind(this)}> 
                  <span className="gor-pagination-next"/>
                </div>
                <div className={currentPage>=(totalPage)?"gor-paginate-right-btn gor-paginate-btn-disable":"gor-paginate-right-btn"} onClick={this._lastPage.bind(this)}> 
                  <span className="gor-pagination-last"/> 
                </div>
              </div>
          </form>  
        </div>   
      </div>
		);
	}
};


export  default GorPaginate;