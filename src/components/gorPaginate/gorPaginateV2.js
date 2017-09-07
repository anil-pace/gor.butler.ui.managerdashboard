/**
 * Created by gaurav.m on 4/26/17.
 */
import React  from 'react';
import {FormattedMessage} from 'react-intl';
import {hashHistory} from 'react-router'


class GorPaginateV2 extends React.Component {

    constructor(props) {
        super(props);
        let current_query=props.location.query,currentPage=1

        if(current_query.page){
            currentPage=+current_query.page
        }
        this.state={currentPage: currentPage, totalPage: props.totalPage, currentQuery: currentPage}
        this.submit = this.submit.bind(this);
        this._textSubmit = this._textSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let current_query=nextProps.location.query,currentPage=1

        if(current_query.page){
            currentPage=+current_query.page
        }
        this.setState({totalPage: nextProps.totalPage, currentPage: currentPage,currentQuery:currentPage});
    }

    _textSubmit(e) {
        this.setState({currentQuery: this.pageNum.value});
    }

    submit(e) {
        e.preventDefault()
        var regex=/^\d+$/; // used for validation of numeric key by user
        if (regex.test(this.pageNum.value) && +this.pageNum.value > 0 && +this.pageNum.value <= this.state.totalPage) {
            this._navigateToPage(+this.pageNum.value)

        } else {
            //Do nothing
            this.setState({currentQuery: this.state.currentPage})
        }
    }

    _navigateToPage(page) {
        let _query=this.props.location.query || {}
        _query.page=page
       
        this.setState({currentQuery:page})
        hashHistory.push({pathname: this.props.location.pathname, query: _query})

    }


    render() {
        var paginateButton={firstPg: "|<", lastPg: ">|", prevPg: "<", nextPg: ">"}
        var currentPage=+this.state.currentQuery;
        var totalPage=+this.state.totalPage;
        var disabled = this.props.disabled;
        return (
            <div>
                <div className="gor-paginate-wrap">
                    <form onSubmit={!disabled ? this.submit : null}>
                        <div className="gor-paginate-input-box-wrap">
                            <div className="gor-paginate-text-wrap">
                                <FormattedMessage id="paginate.page.heading" description='Heading for paginate page'
                                                  defaultMessage='Page'/>
                            </div>
                            <input disabled={disabled} className="gor-paginate-input-box" type="text" value={currentPage}
                                   onChange={!disabled ? this._textSubmit : null} ref={node=> {
                                this.pageNum=node
                            }}/>
                            <div className="gor-paginate-text-wrap">
                                <FormattedMessage id="paginate.page.pageNum" description='Heading for paginate pageNum'
                                                  defaultMessage='of {totalPage}' values={{totalPage: totalPage}}/>
                            </div>
                        </div>
                        <div className="gor-button-wrap">
                            <div
                                className={currentPage===1 ? "gor-paginate-left-btn gor-paginate-btn-disable" : "gor-paginate-left-btn"}
                                onClick={currentPage !== 1 && !disabled ?this._navigateToPage.bind(this, 1):null}>
                                <span className="gor-pagination-first"/>
                            </div>
                            <div
                                className={currentPage===1? "gor-paginate-middle-left-btn gor-paginate-btn-disable" : "gor-paginate-middle-left-btn"}
                                onClick={currentPage!==1 && !disabled ? this._navigateToPage.bind(this, currentPage - 1) : null}>
                                <span className="gor-pagination-previous"/>
                            </div>
                            <div
                                className={(currentPage)=== (totalPage) ? "gor-paginate-middle-right-btn gor-paginate-btn-disable" : "gor-paginate-middle-right-btn"}
                                onClick={currentPage!==totalPage && !disabled ? this._navigateToPage.bind(this, (currentPage + 1)) : null}>
                                <span className="gor-pagination-next"/>
                            </div>
                            <div
                                className={currentPage=== totalPage ? "gor-paginate-right-btn gor-paginate-btn-disable" : "gor-paginate-right-btn"}
                                onClick={currentPage !== totalPage && !disabled ?this._navigateToPage.bind(this, totalPage):null}>
                                <span className="gor-pagination-last"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
GorPaginateV2.defaultProps={
    disabled:false
}

export  default GorPaginateV2;