import React  from 'react';
import { FormattedMessage } from 'react-intl';


class Filter extends React.Component{
    _closeFilter() {
        this.props.hideFilter();
    }   

    _resetFilter() {
        this.props.clearFilter();
    }
    

    _submitFilterForm() {
        this.props.formSubmit();
    }


    render(){
        return (
            <div>
                 {this.props.children}
            </div>
        );
    }
};



export default Filter ;