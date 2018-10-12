import GygBase from "../gyg-base";
import { when } from "lit-html/directives/when";

class GygCard extends GygBase {
	constructor() {
		super();
		this.counter = 0;
		this._shadowRoot = this.attachShadow({ mode: "open" });

		this.abTest = !!~window.location.href.indexOf("test-a")
		setInterval(() => {
			this.counter++;
			this.reRender();
			
		}, 1000);

		this.reRender();
	}
	reRender() {
		this.render(
			this.html`
				${this.styles()}
				${this.template()}
			`,
			this._shadowRoot
		);
	}
	styles() {
		return this.html`
		<style>
			slot[name='title']{color: red}
		</style>
		`;
	}
	template() {
		return this.html`
			<slot name="title"></slot>
			${this.counter}
			${
				when(this.abTest,
				() => this.html`Test: A Active`,
				() => this.html`Test: B Active`)
			}
		`;
	}
}

customElements.define("gyg-card", GygCard);

export default GygCard;


