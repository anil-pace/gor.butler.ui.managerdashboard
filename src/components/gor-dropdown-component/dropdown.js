import React, {Component} from 'react';
import List from './list';
import ReactDOM from 'react-dom';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this._getInitialState = this._getInitialState.bind(this);
        this._handleDocumentClick = this._handleDocumentClick.bind(this);
        this.state = this._getInitialState()
    }

    _getInitialState() {
        var state = {
            dropDownVisible: false,
            placeholder: this.props.placeholder,
            defaultPlaceHolder: this.props.placeholder
        };
        return state;
    }

    _toggleDropdown() {
        var currentVisibility = this.state.dropDownVisible;
        currentVisibility = !currentVisibility;
        this.setState({dropDownVisible: currentVisibility});
    }

    _onSelect(value, isInternal) {
        if (!value) {
            return
        }
        var options = this.props.options,
            selectedOption = {},
            matched = false,
            len = options.length;
        for (let i = 0; i < len; i++) {
            if (value.constructor === String && value === options[i].value) {
                selectedOption = Object.assign({}, options[i]);
                break;
            }
            else if (value.constructor === Object) {
                for (let k in value) {
                    if (value[k] === options[i].value[k]) {
                        matched = true
                    }
                    else {
                        matched = false;
                        break
                    }
                }
                if (matched) {
                    selectedOption = Object.assign({}, options[i]);
                    break;
                }
            }
        }
        this.setState({
            dropDownVisible: !isInternal ? !this.state.dropDownVisible : this.state.dropDownVisible,
            placeholder: selectedOption.label
        }, function () {
            if (selectedOption.value) {
                this.props.onSelectHandler(selectedOption);
            }
        })

    }

    _handleDocumentClick() {
        if (!ReactDOM.findDOMNode(this).contains(event.target)) {
            this.setState({dropDownVisible: false});
        }
    }


    componentDidMount() {
        document.addEventListener('click', this._handleDocumentClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this._handleDocumentClick, false)
    }

    render() {

        return (
            <div className={["gor-dropdown-wrapper " + (this.state.dropDownVisible ? 'gor-white-background' : ''), this.props.disabled ? 'disabled' : null].join(" ")}
                 style={this.props.noBorder && !this.state.dropDownVisible ? {border: 'none'} : {}}
                 onClick={!this.props.disabled ? this._toggleDropdown.bind(this) : null}>
                <div className={this.props.icon?"gor-edit-icon "+ this.props.icon:"gor-action-icon-none"}></div>
                <span
                    className={'gor-dropdown '}>{!this.props.resetOnSelect ? this.state.placeholder : this.props.placeholder}</span>
                <span className={this.state.dropDownVisible ? "gor-dropdown-arrow up" : "gor-dropdown-arrow"}></span>
                <List data={this.props.options} placeholder={this.props.placeholder} tickMark={this.props.tickMark} selectedOption={this.props.selectedOption}
                      
                      optionAction={this._onSelect.bind(this)}
                      dropDownVisible={this.state.dropDownVisible}/>
            </div>
        );
    }
}

export default Dropdown;
