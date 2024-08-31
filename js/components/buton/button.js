import { buttonStyle } from "./buttonStyle.js";

const template = document.createElement('template');
template.innerHTML = `

<style>
${buttonStyle}
</style>
<button type="button">
  <span>
  <slot></slot>
  </span>
</button>`;

class MiBoton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true)); 


    // Agregar clases basadas en atributos
    this.shadowRoot.querySelector('button').classList.add('btn');
    if (this.hasAttribute('outlined')) {
      this.shadowRoot.querySelector('button').classList.add('btn-outlined');
    }
    if (this.hasAttribute('icon')) {
      this.shadowRoot.querySelector('button').classList.add('btn-icon');
    }
  }
}

customElements.define('mi-boton', MiBoton);