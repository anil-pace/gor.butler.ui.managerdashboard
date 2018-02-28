import React  from 'react';

export default function InputHOC(WrappedComponent) {
    return class extends React.Component {
        constructor(props){
        	super(props);
        	this._onInput = this._onInput.bind(this)
        }
        _onInput(e){
        	this.props.updateInput(e,this.props.index)
        }


        render() {
            if (this.props.hasError) {
                return (<div>
                	<input type="checkbox" />
                	<WrappedComponent {...this.props}/>
                	</div>);
            } else {
                return <WrappedComponent {...this.props} onInput={this._onInput}/>;
            }
        }
    };
}