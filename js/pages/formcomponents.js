// import "../components/form/inputField";

export default class FormComponents extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="page">
         <my-inputfield max-width="400px";>  </my-input-field>
        </div>
      `;
  }
}

/* se pueden agregar otras propiedades como id, nombre, si es requerido o no, para el label se necesitara el for, atributo placeholder debe ir si o si*/

customElements.define("my-formcomponents", FormComponents);
