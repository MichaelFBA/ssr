var main = (function () {
	'use strict';

	// https://antoinevastel.com/bot%20detection/2018/01/17/detect-chrome-headless-v2.html
	const isHeadless = navigator.webdriver;

	class HomePage extends HTMLElement {
		constructor() {
			super(); // always call super() first in the constructor.
			if (isHeadless) {
				console.log("shouldnt render");
				this._shadowRoot = this.attachShadow({ mode: "open" });
				this._shadowRoot.innerHTML = '<div class="wrapper">Inside</div>';
			}
		}
		connectedCallback() {
			// When creating closed shadow trees, you'll need to stash the shadow root
			// for later if you want to use it again. Kinda pointless.
			// const wrapper = this._shadowRoot.querySelector(".wrapper");
		}
	}

	customElements.define("home-page", HomePage);

	return HomePage;

}());
