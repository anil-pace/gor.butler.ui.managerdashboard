import React  from 'react';
import { connect } from 'react-redux' ;
import { FormattedMessage } from 'react-intl';        

class SkuAlerts extends React.Component{
  constructor(props) 
  {
    super(props);  
    this._removeThisModal = this._removeThisModal.bind(this);
    this._confirm = this._confirm.bind(this);
  }
  
  _removeThisModal() {
    this.props.removeModal();
  }
  _confirm() {
      this.props.validateSKU("confirm");
      this.props.removeModal();
      
     
    }  
    render()
    {
      let button,text;
      if(this.props.param=="edit"){
        button= <button className='gor-logout-btn' onClick={this._confirm}><FormattedMessage id='audit.sku.alert.update' 
        defaultMessage="Update Audit" description="Text for logout button"/></button>;
        text= <FormattedMessage id='audit.sku.alert.update' 
        defaultMessage="Do you wish to update Audit?" description="Text for logout question"/>;
      }
      else if(this.props.param=="duplicate"){
        button= <button className='gor-logout-btn' onClick={this._confirm}><FormattedMessage id='audit.sku.alert.duplicate' 
        defaultMessage="Duplicate Audit" description="Text for logout button"/></button>;
        text= <FormattedMessage id='audit.sku.alert.duplicate' 
        defaultMessage="Do you wish to duplicate Audit?" description="Text for logout question"/>;
      }else
      {
        button= <button className='gor-logout-btn' onClick={this._confirm}><FormattedMessage id='audit.sku.alert.create' 
        defaultMessage="Create Audit" description="Text for logout button"/></button>;
        text= <FormattedMessage id='audit.sku.alert.create' 
        defaultMessage="Do you wish to create Audit?" description="Text for logout question"/>;
      }
      return (
        <div>
          <div className='gor-logout'>
            <div className='gor-logout-text'>
              <div className='gor-question gor-align-middle'></div><span>{this.props.noneSelected ? <FormattedMessage id='audit.sku.alert.noneSelected' 
                        defaultMessage="Since you haven't selected any attributes, Audit will happen on all attributes of the SKU's" description="Text for logout question"/>:
                        <FormattedMessage id='audit.sku.alert.someSelected' 
                        defaultMessage="Since you haven't selected {missingSKUCount} of {totalSKUCount} attributes, Audit will happen on all attributes of the SKU's" description="Text for logout question"
                        values={{
                          missingSKUCount:this.props.missingSKUCount,
                          totalSKUCount:this.props.totalSKUCount
                        }}
                        />}
                        </span>
              <div>
                {text}
              </div>
           </div>
              <div className='gor-logout-bottom'>
                <button className='gor-cancel-btn' onClick={this._removeThisModal}><FormattedMessage id='audit.sku.alert.cancel' 
                        defaultMessage="Cancel" description="Text for cancel"/></button>
                {button}
              </div> 
          </div>
        </div>
        );
      }
    };
function mapStateToProps(state, ownProps){
  return {
      auth_token: state.authLogin.auth_token  
  };
}


export default connect(null,null)(SkuAlerts);
