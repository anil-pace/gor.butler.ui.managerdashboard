/**
 * Importing third party libraries
 */
import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux';

/**
 * Importing custom components
 */
import dropDown from '../components/dropdown/dropdown.js';

class langDropdown extends React.Component{
	constructor(props) 
	{
    	super(props);
       
    }
    handleLangChange(e){
        e.preventDefault();
        let localeData={
            locale : e.userLanguage.value,
            messages : messages 
        }
        this.props.updateIntl(localeData);
     }

    render (){
    	<dropDown/>
    }

};

function mapStateToProps(state, ownProps) {
	return{
		currentLocale : state.currentLocale || 'en-EN'
	}
}

function mapDispatchToProps (dispatch){
    return {
        changeLanguage: function(params){ dispatch(updateIntl(params)); }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(langDropdown) ;