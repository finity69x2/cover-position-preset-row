window.customCards = window.customCards || [];
window.customCards.push({
  type: "blind-tilt-position-preset-row",
  name: "Blind Tilt Position Preset Row",
  description: "A plugin to display your blind tilt controls in a button row.",
  preview: false,
});

const LitElement = customElements.get("ha-panel-lovelace") ? Object.getPrototypeOf(customElements.get("ha-panel-lovelace")) : Object.getPrototypeOf(customElements.get("hc-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

class CustomBlindTiltPositionPresetRow extends LitElement {
	constructor() {
		super();
		this._config = {
			customTheme: false,
			customSetpoints: false,
			customText: false,
			reverseButtons: false,
			allowDisablingButtons: true,
			hidePartialOpenButtons: false,
			closedUpPosition: 99,
			partialOpenUpPosition: 74,
			fullOpenPosition: 49,
			partialOpenDownPosition: 24,
			closedDownPosition: 0,
			width: '30px',
			height: '30px',
			isClosedUpColor: '#f44c09',
			isPartialOpenUpColor: '#f44c09',
			isFullOpenColor: '#f44c09',
			isPartialOpenDownColor: '#f44c09',
			isClosedDownColor: '#f44c09',
			buttonInactiveColor: '#759aaa',
			customClosedUpText: '100%',
			customPartialOpenUpText: '75%',
			customFullOpenText: '50%',
			customPartialOpenDownText: '25%',
			customClosedDownText: '0%',
		};
	}

	static get properties() {
		return {
			hass: Object,
			_config: Object,
			_stateObj: Object,
			_width: String,
			_height: String,
			_button1Color: String,
			_button2Color: String,
			_button3Color: String,
			_button4Color: String,
			_button5Color: String,
			_button1Text: String,
			_button2Text: String,
			_button3Text: String,
			_button4Text: String,
			_button5Text: String,
			_button1Name: String,
			_button2Name: String,
			_button3Name: String,
			_button4Name: String,
			_button5Name: String,
			_button1DisplayClass: String,
			_button2DisplayClass: String,
			_button3DisplayClass: String,
			_button4DisplayClass: String,
			_button5DisplayClass: String,
			_button1Position: Boolean,
			_button2Position: Boolean,
			_button3Position: Boolean,
			_button4Position: Boolean,
			_button5Position: Boolean,
			_button1SP: Number,
			_button2SP: Number,
			_button3SP: Number,
			_button4SP: Number,
			_button5SP: Number,
		};
	}

	static get styles() {
		return css`
			:host {
				line-height: inherit;
			}
			.box {
				display: flex;
				flex-direction: row;
			}
			.position {
				margin-left: 2px;
				margin-right: 2px;
				background-color: #759aaa;
				border: 1px solid lightgrey; 
				border-radius: 4px;
				font-size: 10px !important;
				color: inherit;
				text-align: center;
				float: left !important;
				padding: 1px;
				cursor: pointer;
			}
		`;
	}
	
	render() {
		return html`
			<hui-generic-entity-row .hass="${this.hass}" .config="${this._config}">
				<div id='button-container' class='box'>
					<button
						class='position'
						style='${this._button1Color};min-width:${this._width};max-width:${this._width};height:${this._height};display:${this._button1DisplayClass}'
						toggles name="${this._button1Name}"
						@click=${this.setPosition}
						.disabled=${this._button1State}>${this._button1Text}</button>
					<button
						class='position'
						style='${this._button2Color};min-width:${this._width};max-width:${this._width};height:${this._height};display:${this._button2DisplayClass}'
						toggles name="${this._button2Name}"
						@click=${this.setPosition}
						.disabled=${this._button2State}>${this._button2Text}</button>
					<button
						class='position'
						style='${this._button3Color};min-width:${this._width};max-width:${this._width};height:${this._height};display${this._button3DisplayClass}'
						toggles name="${this._button3Name}"
						@click=${this.setPosition}
						.disabled=${this._button3State}>${this._button3Text}</button>
					<button
						class='position'
						style='${this._button4Color};min-width:${this._width};max-width:${this._width};height:${this._height};display${this._button4DisplayClass}'
						toggles name="${this._button4Name}"
						@click=${this.setPosition}
						.disabled=${this._button4State}>${this._button4Text}</button>
					<button
						class='position'
						style='${this._button5Color};min-width:${this._width};max-width:${this._width};height:${this._height};display${this._button5DisplayClass}'
						toggles name="${this._button5Name}"
						@click=${this.setPosition}
						.disabled=${this._button5State}>${this._button5Text}</button>
				</div>
			</hui-generic-entity-row>
		`;
	}
	
	firstUpdated() {
		super.firstUpdated();
		this.shadowRoot.getElementById('button-container').addEventListener('click', (ev) => ev.stopPropagation());
	}

	setConfig(config) {
		this._config = { ...this._config, ...config };
	}

	updated(changedProperties) {
		if (changedProperties.has("hass")) {
			this.hassChanged();
		}
	}
	
	hassChanged(hass) {

		const config = this._config;
		const stateObj = this.hass.states[config.entity];
		const custTheme = config.customTheme;
		const custSetpoint = config.customSetpoints;
		const custTxt = config.customText;
		const revButtons = config.reverseButtons;
		const hidePartialOpenButtons = config.hidePartialOpenButtons;
		const allowDisable = config.allowDisablingButtons;
		const buttonWidth = config.width;
		const buttonHeight = config.height;

		const closedUpClr = config.isClosedUpColor;
		const partialOpenUpClr = config.isPartialOpenUpColor;
		const fullOpenClr = config.isFullOpenColor;
		const partialOpenDownClr = config.isPartialOpenDownColor;
		const closedDownClr = config.isClosedDownColor;

		const buttonOffClr = config.buttonInactiveColor;

		const closedUpSetpoint = config.closedUpPosition;
		const partialOpenUpSetpoint = config.partialOpenUpPosition;
		const fullOpenSetpoint = config.fullOpenPosition;
		const partialOpenDownSetpoint = config.partialOpenDownPosition;
		const closedDownSetpoint = config.closedDownPosition;

		const custClosedUpTxt = config.customClosedUpText;
		const custPartialOpenUpTxt = config.customPartialOpenUpText;
		const custFullOpenTxt = config.customFullOpenText;
		const custPartialOpenDownTxt = config.customPartialOpenDownText;
		const custClosedDownTxt = config.customClosedDownText;	
				
		let closedUpSP;
		let partialOpenUpSP;
		let fullOpenSP;
		let partialOpenDownSP;
		let closedDownSP;

		let closedUp;
		let partialOpenUp;
		let fullOpen;
		let partialOpenDown;
		let closedDown;

		if (custSetpoint) {
			closedUpSP = parseInt(closedUpSetpoint);
			partialOpenUpSP = parseInt(partialOpenUpSetpoint);
			fullOpenSP = parseInt(fullOpenSetpoint);
			partialOpenDownSP = parseInt(partialOpenDownSetpoint);
			closedDownSP = parseInt(closedDownSetpoint);
		} else {
			closedUpSP = 99;
			partialOpenUpSP = 74;
			fullOpenSP = 49;
			partialOpenDownSP = 24;
			closedDownSP = 0;
		}

		if (stateObj && stateObj.attributes) {
			if (stateObj.state == 'open' && stateObj.attributes.current_position <= 100 && stateObj.attributes.current_position >= ((closedUpSP + partialOpenUpSP)/2 ) ) {
				closedUp = 'on';
			} else if (stateObj.state == 'open' && stateObj.attributes.current_position < ((closedUpSP + partialOpenUpSP)/2 ) && stateObj.attributes.current_position >= ((partialOpenUpSP + fullOpenSP)/2)) {
				partialOpenUp = 'on';
			} else if (stateObj.state == 'open' && stateObj.attributes.current_position < ((partialOpenUpSP + fullOpenSP)/2 ) && stateObj.attributes.current_position >= ((fullOpenSP + partialOpenDownSP)/2)) {
				fullOpen = 'on';
			} else if (stateObj.state == 'open' && stateObj.attributes.current_position < ((fullOpenSP + partialOpenDownSP)/2 ) && stateObj.attributes.current_position >= ((partialOpenDownSP + closedDownSP)/2)) {
				partialOpenDown = 'on';
			} else {
				closedDown = 'on';
			}	
		}

		let closedUpColor;
		let partialOpenUpColor;
		let fullOpenColor;
		let partialOpenDownColor;
		let closedDownColor;
		
		if (custTheme) {
			if (closedUp == 'on') {
				closedUpColor = 'background-color:' + closedUpClr;
			} else {
				closedUpColor = 'background-color:' + buttonOffClr;
			}
			if (partialOpenUp == 'on') {
				partialOpenUpColor = 'background-color:' + partialOpenUpClr;
			} else {
				partialOpenUpColor = 'background-color:' + buttonOffClr;
			}
			if (fullOpen == 'on') {
				fullOpenColor = 'background-color:' + fullOpenClr;
			} else {
				fullOpenColor = 'background-color:' + buttonOffClr;
			}
			if (partialOpenDown == 'on') {
				partialOpenDownColor = 'background-color:' + partialOpenDownClr;
			} else {
				partialOpenDownColor = 'background-color:' + buttonOffClr;
			}
			if (closedDown == 'on') {
				closedDownColor = 'background-color:' + closedDownClr;
			} else {
				closedDownColor = 'background-color:' + buttonOffClr;
			}
		} else {
			if (closedUp == 'on') {
				closedUpColor = 'background-color: var(--switch-checked-color)';
			} else {
				closedUpColor = 'background-color: var(--switch-unchecked-color)';
			}
			if (partialOpenUp == 'on') {
				partialOpenUpColor = 'background-color: var(--switch-checked-color)';
			} else {
				partialOpenUpColor = 'background-color: var(--switch-unchecked-color)';
			}
			if (fullOpen == 'on') {
				fullOpenColor = 'background-color: var(--switch-checked-color)';
			} else {
				fullOpenColor = 'background-color: var(--switch-unchecked-color)';
			}
			if (partialOpenDown == 'on') {
				partialOpenDownColor = 'background-color: var(--switch-checked-color)';
			} else {
				partialOpenDownColor = 'background-color: var(--switch-unchecked-color)';
			}
			if (closedDown == 'on') {
				closedDownColor = 'background-color: var(--switch-checked-color)';
			} else {
				closedDownColor = 'background-color: var(--switch-unchecked-color)';
			}
		}

		let closedUpText;
		let partialOpenUpText;
		let fullOpenText;
		let partialOpenDownText;
		let closedDownText;

		if (custTxt) {
			closedUpText = custClosedUpTxt;
			partialOpenUpText = custPartialOpenUpTxt;
			fullOpenText = custFullOpenTxt;
			partialOpenDownText = custPartialOpenDownTxt;
			closedDownText = custClosedDownTxt;
		} else if (custSetpoint) {
			//if custom setpoints but no custom text assigned
			closedUpText = closedUpSetpoint.toString(10) + '%';
			partialOpenUpText = partialOpenUpSetpoint.toString(10) + '%';
			fullOpenText = fullOpenSetpoint.toString(10) + '%';
			partialOpenDownText = partialOpenDownSetpoint.toString(10) + '%';
			closedDownText = closedDownSetpoint.toString(10) + '%';
		} else {
			closedUpText = '100%';
			partialOpenUpText = '75%';
			fullOpenText = '50%';
			partialOpenDownText = '25%';
			closedDownText = '0%';			
		}
		
		let buttonwidth = buttonWidth;
		let buttonheight = buttonHeight;

		let closedUpButtonName = 'closedUpButton';
		let partialOpenUpButtonName = 'partialOpenUpButton';
		let fullOpenButtonName = 'fullOpenButton';
		let partialOpenDownButtonName = 'partialOpenDownButton';
		let closedDownButtonName = 'closedDownButton';
		
		const showButtonCss = 'block';
		const hideButtonCss = 'none';

		this._button1DisplayClass = showButtonCss;
		this._button2DisplayClass = showButtonCss;
		this._button3DisplayClass = showButtonCss;
		this._button4DisplayClass = showButtonCss;
		this._button5DisplayClass = showButtonCss;

		if (hidePartialOpenButtons) {
			this._button2DisplayClass = hideButtonCss;
			this._button4DisplayClass = hideButtonCss;
		}
		
		this._stateObj = stateObj;
		this._width = buttonwidth;
		this._height = buttonheight;
		this._button1Position = (closedUp === 'on' && allowDisable);
		this._button2Position = (partialOpenUp === 'on' && allowDisable);
		this._button3Position = (fullOpen === 'on' && allowDisable);
		this._button4Position = (partialOpenDown === 'on' && allowDisable);
		this._button5Position = (closedDown === 'on' && allowDisable);
		this._button1Color = closedUpColor;
		this._button2Color = partialOpenUpColor;
		this._button3Color = fullOpenColor;
		this._button4Color = partialOpenDownColor;
		this._button5Color = closedDownColor;
		this._button1SP = closedUpSP;
		this._button2SP = partialOpenUpSP;
		this._button3SP = fullOpenSP;
		this._button4SP = partialOpenDownSP;
		this._button5SP = closedDownSP;
		this._button1Text = closedUpText;
		this._button2Text = partialOpenUpText;
		this._button3Text = fullOpenText;
		this._button4Text = partialOpenDownText;
		this._button5Text = closedDownText;
		this._button1Name = closedUpButtonName;
		this._button2Name = partialOpenUpButtonName;	
		this._button3Name = fullOpenButtonName;
		this._button4Name = partialOpenDownButtonName;
		this._button5Name = closedDownButtonName;

		if(revButtons) {
			this._button5Position = (closedUp === 'on' && allowDisable);
			this._button4Position = (partialOpenUp === 'on' && allowDisable);
			this._button2Position = (partialOpenDown === 'on' && allowDisable);
			this._button1Position = (closedDown === 'on' && allowDisable);
			this._button5Color = closedUpColor;
			this._button4Color = partialOpenUpColor;
			this._button2Color = partialOpenDownColor;
			this._button1Color = closedDownColor;
			this._button5SP = closedUpSP;
			this._button4SP = partialOpenUpSP;
			this._button2SP = partialOpenDownSP;
			this._button1SP = closedDownSP;
			this._button5Text = closedUpText;
			this._button4Text = partialOpenUpText;
			this._button2Text = partialOpenDownText;
			this._button1Text = closedDownText;
			this._button5Name = closedUpButtonName;
			this._button4Name = partialOpenUpButtonName;	
			this._button2Name = partialOpenDownButtonName;
			this._button1Name = closedDownButtonName;	
		}
	}
	
	setPosition(e) {
		const buttonName = e.currentTarget.getAttribute('name');
		const param = {entity_id: this._config.entity};
		if( buttonName == closedUpButtonName ){
			param.position = this._closedUpSP
			this.hass.callService
		if( buttonName == partialOpenUpButtonName ){
			param.position = this._partialOpenUpSP
			this.hass.callService('cover', 'set_cover_position', param);
		} else if (buttonName == fullOpenButtonName) {
			param.position = this._fullOpenSP
			this.hass.callService('cover', 'set_cover_position', param);
		} else if (buttonName == partialOpenDownButtonName) {
			param.position = this._partialOpenDownSP
			this.hass.callService('cover', 'set_cover_position', param);
		} else if (buttonName == closedDownButtonName) {
			param.position = this._closedDownSP
			this.hass.callService('cover', 'set_cover_position', param);
		}
	}
}

customElements.define('blind-tilt-position-preset-row', CustomBlindTiltPositionPresetRow);