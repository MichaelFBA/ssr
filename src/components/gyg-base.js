import { html, render } from "lit-html";
import { isHeadless } from "../helpers";

class GygBase extends HTMLElement {
	constructor() {
		super();

		/**
		 * Render Interface
		 * Currently uses the lit-html render method
		 * @returns {function} lit-html render interface
		 */
		this.render = render;

		/**
		 * Template Interface
		 * Currently uses the lit-html html method
		 * @extends {Template Literal} lit-html html interface
		 * @returns {function}
		 */
		this.html = html;

		/**
		 * isHeadless
		 * Can be used to prevent #double-render on the client
		 * @returns {boolean}
		 */
		this.isHeadless = isHeadless;
	}
}

export default GygBase;
