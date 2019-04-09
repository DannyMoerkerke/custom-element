export class CustomElement extends HTMLElement {
  constructor() {
    super();

    const handler = {
      get(target, prop) {
        return target[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        target.updateBindings(prop, value);

        return true;
      }
    };

    this.state = new Proxy(this, handler);
  }

  updateBindings(prop, value = '') {
    const bindings = [
      ...this.shadowRoot.querySelectorAll(`[data-bind^="${prop}"]`),
      ...this.shadowRoot.querySelectorAll(`[data-bind$=":${prop}"]`)
    ];

    bindings.forEach(node => {
      const dataProp = node.dataset.bind;
      const bindProp = dataProp.includes(':') ? dataProp.split(':').shift() : dataProp;
      const bindValue = dataProp.includes('.') ? dataProp.split('.').slice(1).reduce((obj, p) => obj[p], value) : value;

      if(this.isObject(bindValue) || this.isArray(bindValue)) {
        const target = this.shadowRoot.querySelector(node.tagName);
        target[bindProp] = bindValue;
      }
      else {
        node.textContent = bindValue.toString();
      }
    });
  }

  setState(newState) {
    Object.entries(newState)
    .forEach(([key, value]) => {
      this.state[key] = this.isObject(this.state[key]) ? {...this.state[key], ...value} : value;
    });
  }

  isArray(arr) {
    return Array.isArray(arr)
  }

  isObject(obj) {
    return typeof obj === 'object' && !this.isArray(obj);
  }

  html(templateObject, ...substs) {
    const raw = templateObject.raw;

    let result = substs.reduce((acc, subst, i) => `${acc}${raw[i]}${subst}`, '');

    result += raw[raw.length - 1];

    return result;
  };

  show() {
    this.style.display = '';
    this.removeAttribute('hidden');
  }

  hide() {
    this.style.display = 'none';
    this.setAttribute('hidden', '');
  }
}
