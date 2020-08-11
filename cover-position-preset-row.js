class CustomCoverPositionRow extends Polymer.Element {

	static get template() {
		return Polymer.html`
			<style is="custom-style" include="iron-flex iron-flex-alignment"></style>
			<style>
				:host {
					line-height: inherit;
				}
				.position {
					min-width: 30px;
					max-width: 30px;
					height: 30px;
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
							style='[[_openedColor]]'
							toggles name="open"
							on-click='setPosition'
							disabled='[[_isOpen]]'>[[_openText]]</button>
						<button
							class='position'
							style='[[_midOpenedColor]]'
							toggles name="midopen"
							on-click='setPosition'
							disabled='[[_isMidOpen]]'>[[_midOpenText]]</button>
						<button
							class='position'
							style='[[_midClosedColor]]'
							toggles name="midclosed"
							on-click='setPosition'
							disabled='[[_isMidClosed]]'>[[_midClosedText]]</button>
						<button
							class='position'
							style='[[_closedColor]]'
							toggles name="closed"
							on-click='setPosition'
							disabled='[[_isClosed]]'>[[_closedText]]</button>
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
				_openedColor: String,
				_midOpenedColor: String,
				_midClosedColor: String,
				_closedColor: String,
				_openText: String,
				_midOpenText: String,
				_midClosedText: String,
				_closedText: String,
				_isOpened: Boolean,
				_isMidOpened: Boolean,
				_isMidClosed: Boolean,
				_isClosed: Boolean,
				_openSP: Number,
				_midOpenSP: Number,
				_midCloseSP: Number,
				_closeSP: Number,
		}
	}

	setConfig(config) {
		this._config = config;
		
		this._config = {
			customTheme: false,
			customSetpoints: false,
			customText: false,
			OpenPosition: 99,
			MidOpenPosition: 66,
			MidClosePosition: 33,
			ClosePosition: 0,
			IsOpenedColor: '#f44c09',
			IsMidOpenedColor: '#f44c09',
			IsMidClosedColor: '#f44c09',
			IsClosedColor: '#43A047',
			ButtonInactiveColor: '#759aaa',
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
		const openedClr = config.IsOpenedColor;
		const midOpenedClr = config.IsMidOpenedColor;
		const midClosedClr = config.IsMidClosedColor;
		const closedClr = config.IsClosedColor;
		const buttonOffClr = config.ButtonInactiveColor;
		const openSetpoint = config.OpenPosition;
		const midOpenSetpoint = config.MidOpenPosition;
		const midCloseSetpoint = config.MidClosePosition;
		const closeSetpoint = config.ClosePosition;
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
			openSP =  parseInt(openSetpoint);
			midOpenSP = parseInt(midOpenSetpoint);
			midCloseSP = parseInt(midCloseSetpoint);
			closeSP = parseInt(closeSetpoint);
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
		
					
		this.setProperties({
			_stateObj: stateObj,
			_isOffState: stateObj.state == 'off',
			_isOpened: opened === 'on',
			_isMidOpened: midOpened === 'on',
			_isMidclosed: midClosed === 'on',
			_isClosed: closed === 'on',
			_openedColor: openedcolor,
			_midOpenedColor: midopenedcolor,
			_midClosedColor: midclosedcolor,
			_closedColor: closedcolor,
			_openSP: openSP,
			_midOpenSP: midOpenSP,
			_midCloseSP: midCloseSP,
			_closeSP: closeSP,
			_openText: opentext,
			_midOpenText: midopentext,
			_midClosedText: midclosedtext,
			_closedText: closedtext,
		});
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
			param.position = this._midClosedSPSP
			this.hass.callService('cover', 'set_cover_position', param);
		} else if (position == 'close') {
			param.position = this._closedSP
			this.hass.callService('cover', 'set_cover_position', param);
		}
	}
}
	
customElements.define('cover-position-preset-row', CustomCoverPositionRow);