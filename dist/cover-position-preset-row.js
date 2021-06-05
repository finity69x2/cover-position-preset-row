window.customCards = window.customCards || [];
window.customCards.push({
  type: "cover-position-preset-row",
  name: "cover position preset row",
  description: "A plugin to display your cover controls in a button row.",
  preview: false,
});

class CustomCoverPositionRow extends Polymer.Element {

	static get template() {
		return Polymer.html`
			<style is="custom-style" include="iron-flex iron-flex-alignment"></style>
			<style>
				:host {
					line-height: inherit;
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
					float: right !important;
					padding: 1px;
					cursor: pointer;
				}
				
				</style>
					<hui-generic-entity-row hass="[[hass]]" config="[[_config]]">
						<div class='horizontal justified layout' on-click="stopPropagation">
						<button
							class='position'
							style='[[_leftColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]]'
							toggles name="[[_leftName]]"
							on-click='setPosition'
							disabled='[[_leftPosition]]'>[[_leftText]]</button>
						<button
							class='position'
							style='[[_midLeftColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]]'//;[[_hideMidLeft]]'
							toggles name="[[_midLeftName]]"
							on-click='setPosition'
							disabled='[[_midLeftPosition]]'>[[_midLeftText]]</button>
						<button
							class='position'
							style='[[_midRightColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]]'//;[[_hideMidRight]]'
							toggles name="[[_midRightName]]"
							on-click='setPosition'
							disabled='[[_midRightPosition]]'>[[_midRightText]]</button>
						<button
							class='position'
							style='[[_rightColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]]'
							toggles name="[[_rightName]]"
							on-click='setPosition'
							disabled='[[_rightPosition]]'>[[_rightText]]</button>
						</div>
					</hui-generic-entity-row>
		`;
    }

    static get properties() {
		return {
			hass: {
				type: Object,
				observer: 'hassChanged'
			},
				_config: Object,
				_stateObj: Object,
				_leftColor: String,
				_midLeftColor: String,
				_midRighthColor: String,
				_rightColor: String,
				_width: String,
				_height: String,
				_leftText: String,
				_midLeftText: String,
				_midRightText: String,
				_rightText: String,
				_leftName: String,
				_midLeftName: String,
				_midRightName: String,
				_rightName: String,
				_leftPosition: Boolean,
				_midLeftPosition: Boolean,
				_midRightPosition: Boolean,
				_rightPosition: Boolean,
				//_hideMidLeft: String,
				//_hideMidRight: String,
				_leftSP: Number,
				_midLeftSP: Number,
				_midRightSP: Number,
				_rightSP: Number,
		}
	}

	setConfig(config) {
		this._config = config;
		
		this._config = {
			customTheme: false,
			customSetpoints: false,
			customText: false,
			reverseButtons: false,
			//isTwoPositionCover: false,
			openPosition: 99,
			midOpenPosition: 66,
			midClosePosition: 33,
			closePosition: 0,
			width: '30px',
			height: '30px',
			isOpenedColor: '#f44c09',
			isMidOpenedColor: '#f44c09',
			isMidClosedColor: '#f44c09',
			isClosedColor: '#43A047',
			buttonInactiveColor: '#759aaa',
			customOpenText: '99%',
			customMidOpenText: '66%',
			customMidClosedText: '33%',
			customClosedText: '0%',
			...config
		};
	}

	hassChanged(hass) {

		const config = this._config;
		const stateObj = hass.states[config.entity];
		const custTheme = config.customTheme;
		const custSetpoint = config.customSetpoints;
		const custTxt = config.customText;
		const revButtons = config.reverseButtons;
		//const twoPosCvr = config.isTwoPositionCover;
		const buttonWidth = config.width;
		const buttonHeight = config.height;
		const openedClr = config.isOpenedColor;
		const midOpenedClr = config.isMidOpenedColor;
		const midClosedClr = config.isMidClosedColor;
		const closedClr = config.isClosedColor;
		const buttonOffClr = config.buttonInactiveColor;
		const openSetpoint = config.openPosition;
		const midOpenSetpoint = config.midOpenPosition;
		const midCloseSetpoint = config.midClosePosition;
		const closeSetpoint = config.closePosition;
		const custOpenTxt = config.customOpenText;
		const custMidOpenTxt = config.customMidOpenText;
		const custMidClosedTxt = config.customMidClosedText;
		const custClosedTxt = config.customClosedText;
						
				
		let openSP;
		let midOpenSP;
		let midCloseSP;
		let closeSP;
		let opened;
		let midOpened;
		let midClosed;
		let closed;
				
		if (custSetpoint) {
			midOpenSP = parseInt(midOpenSetpoint);
			midCloseSP = parseInt(midCloseSetpoint);
			if (parseInt(openSetpoint) < 1) {
				openSP = 1;
			} else {
				openSP =  parseInt(openSetpoint);
			}
			if (parseInt(closeSetpoint) > 100) {	
				closeSP = 100;
			} else {
				closeSP = parseInt(closeSetpoint);
			}
			if (stateObj && stateObj.attributes) {
				if (stateObj.state == 'open' && stateObj.attributes.current_position <= 100 && stateObj.attributes.current_position >= ((openSP + midOpenSP)/2 ) ) {
					opened = 'on';
				} else if (stateObj.state == 'open' && stateObj.attributes.current_position < ((openSP + midOpenSP)/2 ) && stateObj.attributes.current_position >= ((midCloseSP + midOpenSP)/2)) {
					midOpened = 'on';
				} else if (stateObj.state == 'open' && stateObj.attributes.current_position < ((midOpenSP + midCloseSP)/2) && stateObj.attributes.current_position >= ((midCloseSP + closeSP)/2)) {
					midClosed = 'on';
				} else {
					closed = 'on';
				}	
			}
			
		} else {
			openSP =  99;
			midOpenSP = 66;
			midCloseSP = 33;
			closeSP = 0;
			if (stateObj && stateObj.attributes) {
				if (stateObj.state == 'open' && stateObj.attributes.current_position <= 100 && stateObj.attributes.current_position >= 83) {
					opened = 'on';
				} else if (stateObj.state == 'open' && stateObj.attributes.current_position <= 82 && stateObj.attributes.current_position >= 50) {
					midOpened= 'on';
				} else if (stateObj.state == 'open' && stateObj.attributes.current_position <= 49 && stateObj.attributes.current_position >= 17) {
					midClosed = 'on';
				} else {
					closed = 'on';
				}
			}
		}
		
		let openedcolor;
		let midopenedcolor;
		let midclosedcolor;
		let closedcolor;

				
		if (custTheme) {
			if (opened == 'on') {
				openedcolor = 'background-color:' + openedClr;
			} else {
				openedcolor = 'background-color:' + buttonOffClr;
			}
			if (midOpened == 'on') {
				midopenedcolor = 'background-color:'  + midOpenedClr;
			} else {
				midopenedcolor = 'background-color:' + buttonOffClr;
			}
			if (midClosed == 'on') {
				midclosedcolor = 'background-color:'  + midClosedClr;
			} else {
				midclosedcolor = 'background-color:' + buttonOffClr;
			}
			if (closed == 'on') {
				closedcolor = 'background-color:'  + closedClr;
			} else {
				closedcolor = 'background-color:' + buttonOffClr;
			}
		} else {
			if (opened == 'on') {
				openedcolor = 'background-color: var(--switch-checked-color)';
			} else {
				openedcolor = 'background-color: var(--switch-unchecked-color)';
			}
			if (midOpened == 'on') {
				midopenedcolor = 'background-color: var(--switch-checked-color)';
			} else {
				midopenedcolor = 'background-color: var(--switch-unchecked-color)';
			}
			if (midClosed == 'on') {
				midclosedcolor = 'background-color: var(--switch-checked-color)';
			} else {
				midclosedcolor = 'background-color: var(--switch-unchecked-color)';
			}
			if (closed == 'on') {
				closedcolor = 'background-color: var(--switch-checked-color)';
			} else {
				closedcolor = 'background-color: var(--switch-unchecked-color)';
			}
		}

		//let opentext = custOpenTxt;
		//let midopentext = custMidOpenTxt;
		//let midclosedtext = custMidClosedTxt;
		//let closedtext = custClosedTxt;


		let opentext;
		let midopentext;
		let midclosedtext;
		let closedtext;
		
		if (custTxt) {
			opentext = custOpenTxt;
			midopentext = custMidOpenTxt;
			midclosedtext = custMidClosedTxt;
			closedtext = custClosedTxt;
		} else if (custSetpoint) {
			//if custom setpoints but no custom text assigned
			opentext = openSetpoint.toString(10) + '%';
			midopentext = midOpenSetpoint.toString(10) + '%';
			midclosedtext = midCloseSetpoint.toString(10) + '%';
			closedtext = closeSetpoint.toString(10) + '%';
		} else {
			opentext = '99%';
			midopentext = '66%';
			midclosedtext = '33%';
			closedtext = '0%';
			
		}
		
		/*
		let hidemedium = 'display:block';
		let nohide = 'display:block';
		
		if (twoPosCvr) {
			hidemedium = 'display:none';
		} else {
			hidemedium = 'display:block';
		}
		*/
		
		let buttonwidth = buttonWidth;
		let buttonheight = buttonHeight;
		
		let openName = 'open';
		let midOpenName = 'midopen';
		let midCloseName = 'midclose';
		let closeName = 'close';
		
		if (revButtons) {
			this.setProperties({
				_stateObj: stateObj,
				_leftPosition: opened === 'on',
				_midLeftPosition: midOpened === 'on',
				_midRightPosition: midClosed === 'on',
				_rightPosition: closed === 'on',
				_width: buttonwidth,
				_height: buttonheight,
				_leftColor: openedcolor,
				_midLeftColor: midopenedcolor,
				_midRightColor: midclosedcolor,
				_rightColor: closedcolor,
				_openSP: openSP,
				_midOpenSP: midOpenSP,
				_midCloseSP: midCloseSP,
				_closeSP: closeSP,
				_leftText: opentext,
				_midLeftText: midopentext,
				_midRightText: midclosedtext,
				_rightText: closedtext,
				_leftName: openName,
				_midLeftName: midOpenName,
				_midRightName: midCloseName,
				_rightName: closeName,
				//_hideMidLeft: nohide,
				//_hideMidRight: hidemedium,
			});
		} else {
			this.setProperties({
				_stateObj: stateObj,
				_leftPosition: closed === 'on',
				_midLeftPosition: midClosed === 'on',
				_midRightPosition: midOpened === 'on',
				_rightPosition: opened === 'on',
				_width: buttonwidth,
				_height: buttonheight,
				_leftColor: closedcolor,
				_midLeftColor: midclosedcolor,
				_midRightColor: midopenedcolor,
				_rightColor: openedcolor,
				_closeSP: closeSP,
				_midCloseSP: midCloseSP,
				_midOpenSP: midOpenSP,
				_openSP: openSP,
				_leftText: closedtext,
				_midLeftText: midclosedtext,
				_midRightText: midopentext,
				_rightText: opentext,
				_leftName: closeName,
				_midLeftName: midCloseName,
				_midRightName: midOpenName,
				_rightName: openName,
				//_hideMidRight: nohide,
				//_hideMidLeft: hidemedium,
			});
		}
	}

	
	stopPropagation(e) {
		e.stopPropagation();
	}
	
	setPosition(e) {
		const position = e.currentTarget.getAttribute('name');
		const param = {entity_id: this._config.entity};
		if( position == 'open' ){
			param.position = this._openSP
			this.hass.callService('cover', 'set_cover_position', param);
		} else if (position == 'midopen') {
			param.position = this._midOpenSP
			this.hass.callService('cover', 'set_cover_position', param);
		} else if (position == 'midclose') {
			param.position = this._midCloseSP
			this.hass.callService('cover', 'set_cover_position', param);
		} else if (position == 'close') {
			param.position = this._closeSP
			this.hass.callService('cover', 'set_cover_position', param);
		}
	}
}
	
customElements.define('cover-position-preset-row', CustomCoverPositionRow);
