import GygBase from "../../components/gyg-base";
import "../../components/gyg-card/gyg-card";

class HomePage extends GygBase {
	constructor() {
		super();
		//@TODO use this.isHeadless when puppeteer goto is fixed
		this.headlessHack = !!~window.location.href.indexOf("DOCTYPE")

		if (this.headlessHack) {
			console.log('re-render not allowed')
			this.render(this.template(),this);
		}
	}
	template() {
		return this.html`
		<div class="wrapper">
			Inside
			<gyg-card>
				<h1 slot="title">Card Title</h1>
			</gyg-card>
		</div>
	`;
	}
}

customElements.define("home-page", HomePage);

export default HomePage;
