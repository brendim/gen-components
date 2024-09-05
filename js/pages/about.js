import { checkcomponents } from "./helper/checkcomponents.js";

export default class AboutUs extends HTMLElement {
  async connectedCallback() {
    const [BotonModule, InputFieldmodule] = await Promise.all([
      import("../components/button/button.js"),
      import("../components/form/inputField.js"),
    ]);

    checkcomponents("mi-boton", BotonModule);
    checkcomponents("my-inputfield", InputFieldmodule);

    this.innerHTML = `
    <div class="page">
      <mi-boton>Mi Boton</mi-boton>
      <mi-boton icon outlined>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
        </svg>
      </mi-boton>
      <mi-boton outlined>Mi Boton</mi-boton>
      <my-inputfield max-width="400px";>  </my-input-field>
    </div>
  `;
  }
}

customElements.define("my-about", AboutUs);
