import React  from 'react';

class Information extends React.Component{
  constructor(props) 
  {
      super(props);  
      this.state={infoVisible:false}
  } 
  _setVisible(){
    this.setState({infoVisible:true});
  }
  _setHidden(){
    this.setState({infoVisible:false});    
  }
  render()
  {
      return (
        <div className='gor-information'>
          <div className='gor-info-icon' 
          onMouseEnter={this._setVisible.bind(this)}
          onMouseLeave={this._setHidden.bind(this)} ></div>
            <div className='gor-information-text' 
              style={this.state.infoVisible?{display:'block'}:{display:'none'}}>
              {this.props.heading}
              {this.props.data}
                <span className='gor-information-arrow'></span>
            </div>
        </div>
      );
    }
};
Information.propTypes={
}


export default Information;
