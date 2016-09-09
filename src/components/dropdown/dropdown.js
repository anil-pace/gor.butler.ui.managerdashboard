import React, { Component } from 'react';
import Ddown from 'react-dropdown';

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: { value: 'one', label: 'PPS - pick performance'}
    }
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect (option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
  }

  render () {
    const options = [
      { value: 'one', label: 'PPS - pick performance' },
      { value: 'two', label: 'System health' },
      { value: 'three', label: 'PPS - pick performance' },
      { value: 'four', label: 'PPS - audit performance' },
      
    ]

    const defaultOption = this.state.selected


    return (
      <div className="ddown">
        
        <Ddown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
      </div>
    )
  }
}

export default Dropdown;
