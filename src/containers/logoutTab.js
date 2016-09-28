import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl';        

class LogOut extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  removeThisModal() {
    this.props.removeModal();
  }
  render()
  {
      return (
        <div>
          <div className='gor-logout'>
            <div className='gor-logout-text'>
              <div className='iQuestion'></div>Are you sure you would like to log out now?
           </div>
              <div className='gor-logout-bottom'>
                <button className='gor-cancel-btn'>Cancel</button>
                <button className='gor-logout-btn' onClick={this.removeThisModal.bind(this)}>Log out now</button>
              </div> 
          </div>
        </div>
      );
    }
  }
export default LogOut;