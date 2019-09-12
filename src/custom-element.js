
export class CustomElement extends HTMLElement {
  constructor() {
    super();

    this.state = {};
  }

  isCustomElement(element) {
    return Object.getPrototypeOf(customElements.get(element.tagName.toLowerCase())).name === 'CustomElement';
  }

  updateBindings(prop, value = '') {
    const bindings = [...this.selectAll(`[data-bind$="${prop}"]`)];

    bindings.forEach(node => {
      const dataProp = node.dataset.bind;
      const bindProp = dataProp.includes(':') ? dataProp.split(':').shift() : dataProp;
      const bindValue = dataProp.includes('.') ? dataProp.split('.').slice(1).reduce((obj, p) => obj[p], value) : value;
      const target = [...this.selectAll(node.tagName)].find(el => el === node);
      const isStateUpdate = dataProp.includes(':') && this.isCustomElement(target);

      isStateUpdate ? target.setState({[`${bindProp}`]: bindValue}) :
      this.isArray(bindValue) ? target[bindProp] = bindValue : node.textContent = bindValue.toString();
    });
  }

  setState(newState) {
    Object.entries(newState)
    .forEach(([key, value]) => {
      this.state[key] = this.isObject(this.state[key]) && this.isObject(value)? {...this.state[key], ...value} : value;

      const bindKey = this.isObject(value) ? this.getBindKey(key, value) : key;
      const bindKeys = this.isArray(bindKey) ? bindKey : [bindKey];

      bindKeys.forEach(key => this.updateBindings(key, value));
    });
  }

  getBindKey(key, obj) {
    return Object.keys(obj).map(k => this.isObject(obj[k]) ? `${key}.${this.getBindKey(k, obj[k])}` : `${key}.${k}`);
  }

  isArray(arr) {
    return Array.isArray(arr)
  }

  isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  select(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  selectAll(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

  multiSelect(config) {
    Object.entries(config).forEach(([prop, selector]) => {
      this[prop] = this.select(selector);
    });
  }

  show() {
    this.style.display = '';
    this.removeAttribute('hidden');
  }

  hide() {
    this.style.display = 'none';
    this.setAttribute('hidden', '');
  }

  style(element, styles) {
    Object.assign(element.style, styles);
  }

  addTemplate(element, selector, replaceContents = false) {
    const template = this.select(selector).content.cloneNode(true);
    replaceContents ? element.innerHTML = '' : null;

    element.appendChild(template);
  }
}

