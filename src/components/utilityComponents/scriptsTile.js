import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { FormattedMessage, defineMessages } from "react-intl";
import ScriptRow from "./scriptsRow";

import { GET_ITEM_RECALL } from "../../constants/configConstants";
import { GET, ITEM_RECALLED } from "../../constants/frontEndConstants";

import { getItemRecall } from "../../actions/utilityActions";
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
	_requestExpiredItems() {
		let data = {
			url: GET_ITEM_RECALL,
			method: GET,
			token: this.props.auth_token,
			cause: ITEM_RECALLED
		};
		this.props.getItemRecall(data);
	}
_recallOrder(e){
	this.props.recall_item('from script tile to')

}
	_handleChangeRunScriptCategory(e){
		if (e.target.value) {
			var newState = e.target.value;
			// if (newState.category === "all") {
			// 	newState.sku = "";
			// 	this.props.clearStockLedgerSKU();
			// }
			this.setState({ recallState: newState });
			console.log(this.state.recallState);
		}
	}


	render() {
		// let barData = {
		// 	h1: this.context.intl.formatMessage(messages.itemRecallHead),
		// 	h2: this.context.intl.formatMessage(messages.itemRecallSubHead),
		// 	buttonText: this.context.intl.formatMessage(
		// 		messages.itemRecallButtonText
		// 	)
		// };
		//let checkbox = (
		let current_state='';
		 var invoiceInput =
		 (
		 	<div>
		 	{this.state.recallState=='ExpiredAll'?
			<div key="1">
			<div className='gor-utility-recall-header'>	<span >Order Id</span></div>
				<div className="gor-audit-input-wrap gor-utility-sku-wrap">
					<input className="gor-audit-input gor-input-ok" placeholder="Enter order id" />
					{this.props.validatedStockLedgerSKU &&
						this.state.stockLedgerState.category === "sku"
						? <div className="gor-login-error" />
						: ""}
				</div>
				<div className="gor-sku-error gor-utility-error-invoice">
							<FormattedMessage
								id="utility.stockLedger.incorrectSku"
								description="Please enter correct SKU"
								defaultMessage="Please enter correct SKU"
							/>
						</div>
					
			</div>:
<div>
<div key="1">
			<div className='gor-utility-recall-header'>	<span >SKU Number</span></div>
				<div className="gor-audit-input-wrap gor-utility-sku-wrap">

					<input className="gor-audit-input gor-input-ok" placeholder="Enter SKU Number" />
					{this.props.validatedStockLedgerSKU &&
						this.state.stockLedgerState.category === "sku"
						? <div className="gor-login-error" />
						: ""}
				</div>
				<div className="gor-sku-error gor-utility-error-invoice">
							<FormattedMessage
								id="utility.stockLedger.incorrectSku"
								description="Please enter correct SKU"
								defaultMessage="Please enter correct SKU"
							/>
						</div>
						<div className='gor-utility-recall-header'>	<span >Order Id</span></div>
				
						<div className="gor-audit-input-wrap gor-utility-sku-wrap gor-utility-input-wrap">
					<input className="gor-audit-input gor-input-ok" placeholder="Enter order id" />
					{this.props.validatedStockLedgerSKU &&
						this.state.stockLedgerState.category === "sku"
						? <div className="gor-login-error" />
						: ""}
				</div>
				<div className="gor-sku-error gor-utility-error-invoice">
							<FormattedMessage
								id="utility.stockLedger.incorrectOrder"
								description="Please enter correct order id"
								defaultMessage="Please enter correct order id"
							/>
						</div>
						<div className='gor-utility-recall-header'>	<span >Batch Number</span></div>
					
				<div className="gor-audit-input-wrap gor-utility-sku-wrap gor-utility-input-wrap">
					<input className="gor-audit-input gor-input-ok" placeholder="Enter Batch number" />
					{this.props.validatedStockLedgerSKU &&
						this.state.stockLedgerState.category === "sku"
						? <div className="gor-login-error" />
						: ""}
				</div>
				<div className="gor-sku-error gor-utility-error-invoice">
							<FormattedMessage
								id="utility.stockLedger.incorrectBatch"
								description="Please enter correct batch"
								defaultMessage="Please enter correct batch number"
							/>
						</div>		
					
			</div>


</div>
		}
			</div>

		);
		return (
				<div key="0">
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
			</div>
		
			/*<ScriptRow
				barData={barData}
				barAction={this._requestExpiredItems.bind(this)}
			/>*/
		);
	}
}

var mapDispatchToProps = function(dispatch) {
	return {
		getItemRecall: function(data) {
			dispatch(getItemRecall(data));
		}
	};
};

ScriptTile.contextTypes = {
	intl: React.PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(ScriptTile);
