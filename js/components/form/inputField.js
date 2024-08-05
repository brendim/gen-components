import { inputFieldStyle } from "./inputFieldStyle.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
${inputFieldStyle}
</style>  
<div class="container-input"> 
 <label for="email">Correo electrónico</label>
 <input type="mail" name="mail" id="mail" required>
</div>
`;

export default class InputField extends HTMLElement {
  static get observedAttributes() {
    return ["max-width"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "max-width") {
      this.updateStyle();
    }
  }

  updateStyle() {
    const maxWidth = this.getAttribute("max-width") || "100%"; // Valor predeterminado
    this.shadowRoot.querySelector(".container-input").style.maxWidth = maxWidth;
  }

  connectedCallback() {
    this.updateStyle(); // Aplicar el estilo cuando se adjunta el componente al DOM
  }
}

window.customElements.define("my-inputfield", InputField);
