/**
 * Created by gaurav.m on 5/23/17.
 */
import React  from 'react';
import DropdownTable from '../../components/dropdown/dropdownTable'

class ReportDownloadDropDown extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render(){
        return (
                <DropdownTable styleClass={'gorDataTableDrop'} placeholder={this.props.placeHolderText} items={this.props.items} changeMode={this.props.changeMode} currentState={this.props.currentState}/>
        );
    }
};

export default ReportDownloadDropDown ;