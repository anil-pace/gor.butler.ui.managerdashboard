import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { FormattedMessage, defineMessages } from "react-intl";
import ScriptRow from "./scriptsRow";
import { GET_ITEM_RECALL ,GET_ITEM_RECALL_FIXED} from "../../constants/configConstants";
import { GET,POST, ITEM_RECALLED, APP_JSON } from "../../constants/frontEndConstants";
import { getItemRecall,clearOrderRecallValidation } from "../../actions/utilityActions";
const messages = defineMessages({
	itemRecallHead: {
		id: "utility.itemRecall.head",
		description: "Expired Items",
		defaultMessage: "Expired Items"
	},
	itemRecallSubHead: {
		id: "utility.itemRecall.subHead",
		description: "(Recall all the expired items)",
		defaultMessage: "(Recall all the expired items)"
	},
	itemRecallButtonText: {
		id: "utility.itemRecall.buttonText",
		description: "RECALL",
		defaultMessage: "RECALL"
	}
});

class ScriptTile extends React.Component {
	constructor(props) {
		super(props);
	this.state = {
			recallState: "ExpiredAll"
		};
}
	_requestExpiredItems(e) {
		let payload,url;
		if(this.state.recallState==='ExpiredAll')
		{
 		payload={
 		order_id:this.orderId.value
		};
		url=GET_ITEM_RECALL
}
	else{
		payload={
 		"order_id":this.orderid.value,
 		"batch":this.batchNumber.value,
 		"product_sku":this.skuno.value
	};
		url=GET_ITEM_RECALL_FIXED
	}
		let data = {
			url: url,
			method: POST,
			token: this.props.auth_token,
			cause: ITEM_RECALLED,
			formdata:payload,
			contentType: APP_JSON
		};
		this.props.getItemRecall(data);
	}

	_handleChangeRunScriptCategory(e){
		if (e.target.value) {
			var newState = e.target.value;
			this.setState({ recallState: newState });
			if(newState=='ExpiredAll'){
				this.orderid.value='';
				this.skuno.value='';
				this.batchNumber ='';
				this.props.clearOrderRecallValidation();
			}
			else
			{
				this.orderId.value=''
			}
			this._validateScriptRecallButton();
		}
	}



	_validateScriptRecallButton(){
		let validated = false;
		if(this.orderId && this.orderId.value!=='')
		{
			validated= true;
		}
		else if((this.orderid && this.orderid.value!=='') && (this.skuno && this.skuno.value!=='') && (this.batchNumber && this.batchNumber.value!=='')){
			validated= true;
		}
		this.setState({activeScriptRcecallButton:validated})
	}


	render() {
		 var invoiceInput =
		 (
		 	<div>
		 	{this.state.recallState=='ExpiredAll'?
			<div key="1">
			<div className='gor-utility-recall-header'>	<span><FormattedMessage
								id="utility.script.orderid"
								description="Order Id"
								defaultMessage="Order Id"
							/></span></div>
				<div className="gor-audit-input-wrap gor-utility-sku-wrap">
					<input className="gor-audit-input gor-input-ok" placeholder="Enter order id" 
					ref={node => {
              			this.orderId = node ||'';
           			 }}
            		onChange={this._validateScriptRecallButton.bind(this)}
					/>
					{this.props.validatedScriptOrderid &&
						this.state.recallState === "ExpiredAll"
						? <div className="gor-login-error" />
						: ""}
				</div>
				{this.props.validatedScriptOrderid &&
						this.state.recallState === "ExpiredAll"
						?<div className="gor-sku-error gor-utility-error-invoice">
							<FormattedMessage
								id="utility.script.incorrectOrderid"
								description="Order id already exist"
								defaultMessage="Order id already exist"
							/>
						</div>:""}
					
			</div>:
<div>
<div key="1">
			<div className='gor-utility-recall-header'>	<span ><FormattedMessage
								id="utility.script.sku"
								description="SKU Number"
								defaultMessage="SKU Number"
							/></span></div>
				<div className="gor-audit-input-wrap gor-utility-sku-wrap">

					<input className="gor-audit-input gor-input-ok" placeholder="Enter SKU Number" 
					ref={node => {
              			this.skuno = node||'';
           			 }}
            		onChange={this._validateScriptRecallButton.bind(this)}
					/>
					{this.props.validatedScriptSKU &&
						this.state.recallState === "Expiredsku"
						? <div className="gor-login-error" />
						: ""}
				</div>
				{this.props.validatedScriptSKU &&
						this.state.recallState === "Expiredsku"
						? <div className="gor-sku-error gor-utility-error-invoice">
							<FormattedMessage
								id="utility.script.incorrectSku"
								description="SKU does not exist"
								defaultMessage="SKU does not exist"
							/>
						</div>:""}
						<div className='gor-utility-recall-header'>	<span ><FormattedMessage
								id="utility.script.orderid"
								description="Order Id"
								defaultMessage="Order Id"
							/></span></div>
				
						<div className="gor-audit-input-wrap gor-utility-sku-wrap gor-utility-input-wrap">
					<input className="gor-audit-input gor-input-ok" placeholder="Enter order id" 
						ref={node => {
              			this.orderid = node ||'';
           			 }}
            		onChange={this._validateScriptRecallButton.bind(this)}
					/>
					{this.props.validatedScriptOrderid &&
						this.state.recallState === "Expiredsku"
						? <div className="gor-login-error" />
						: ""}
				</div>
				{this.props.validatedScriptOrderid &&
						this.state.recallState === "Expiredsku"
						? <div className="gor-sku-error gor-utility-error-invoice">
							<FormattedMessage
								id="utility.script.incorrectOrderid"
								description="Order id already exist"
								defaultMessage="Order id already exist"
							/>
						</div>:""}
						<div className='gor-utility-recall-header'>	<span ><FormattedMessage
								id="utility.script.batch"
								description="Batch Number"
								defaultMessage="Batch Number"
							/></span></div>
					
				<div className="gor-audit-input-wrap gor-utility-sku-wrap gor-utility-input-wrap">
					<input className="gor-audit-input gor-input-ok" placeholder="Enter Batch number" 
					ref={node => {
              			this.batchNumber = node ||'';
           			 }}
            			onChange={this._validateScriptRecallButton.bind(this)}
					/>
					{this.props.validatedScriptBatch &&
						this.state.recallState === "Expiredsku"
						? <div className="gor-login-error" />
						: ""}
				</div>
				{this.props.validatedScriptBatch &&
						this.state.recallState === "Expiredsku"
						?<div className="gor-sku-error gor-utility-error-invoice">
							<FormattedMessage
								id="utility.script.incorrectBatch"
								description="No product exist for given PDFA"
								defaultMessage="No product exist for given PDFA"
							/>
						</div>	:""}	
					
			</div>


</div>
		}
			</div>

		);
		return (
				<div key="0" className='gor-script-sku-wrap'>
			
				<div
					className="gor-utility-sku-wrap"
					style={{ marginTop: 10, marginBottom: 10, fontSize: 13 }}
				>
					<div>
						<input
							checked={this.state.recallState === "ExpiredAll"}
							onChange={this._handleChangeRunScriptCategory.bind(
								this
							)}
							type="radio"
							id="ExpiredAll"
							name="order_Recall"
							value="ExpiredAll"
						/>
						<label>
							<FormattedMessage
								id="utility.orderRecall.category.ExpiredAll"
								description="Recall expired items"
								defaultMessage="Recall expired items"
							/>
						</label>

					</div>
					<div>
						<input
							checked={this.state.recallState === "Expiredsku"}
							onChange={this._handleChangeRunScriptCategory.bind(
								this
							)}
							type="radio"
							id="Expiredsku"
							name="order_Recall"
							value="Expiredsku"
						/>
						<label>
							<FormattedMessage
								id="utility.orderRecall.category.Expiredsku"
								description="Recall item using SKU number"
								defaultMessage="Recall item using SKU number"
							/>
						</label>
					</div>
				</div>
				{invoiceInput}
				<div className="gor-script-btn-wrap">
					<button className={this.state.activeScriptRcecallButton?"gor-download-button got-align":"gor-download-button got-align gor-disable-content"} onClick={this._requestExpiredItems.bind(this)}>
						<FormattedMessage id="utility.recall" description="label for recall" defaultMessage="RECALL"/>
         			</button>
         		</div>
		
			</div>
		);
	}
}

var mapDispatchToProps = function(dispatch) {
	return {
		getItemRecall: function(data) {
			dispatch(getItemRecall(data));
		},
		clearOrderRecallValidation:function() {
			dispatch(clearOrderRecallValidation());
		}
	};
};

ScriptTile.contextTypes = {
	intl: React.PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(ScriptTile);
