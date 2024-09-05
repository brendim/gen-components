export const checkcomponents = (tagName, module) => {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, module.default);
  }
};
