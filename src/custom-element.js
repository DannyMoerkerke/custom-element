
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

      const target = [...this.shadowRoot.querySelectorAll(node.tagName)].find(el => el === node);
      if(this.isObject(bindValue) || this.isArray(bindValue)) {

        if(dataProp.includes(':') && typeof target.setState === 'function') {
          target.setState({
            [`${bindProp}`]: bindValue
          });
        }
        else {
          target[bindProp] = bindValue;
        }
      }
      else {
        if(dataProp.includes(':') && typeof target.setState === 'function') {
          target.setState({
            [`${bindProp}`]: bindValue
          });
        }
        else {
          node.textContent = bindValue.toString();
        }
      }
    });
  }

  setState(newState) {
    Object.entries(newState)
    .forEach(([key, value]) => {
      this.state[key] = this.isObject(this.state[key]) && this.isObject(value)? {...this.state[key], ...value} : value;
    });
  }

  isArray(arr) {
    return Array.isArray(arr)
  }

  isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  show() {
    this.style.display = '';
    this.removeAttribute('hidden');
  }

  hide() {
    this.style.display = 'none';
    this.setAttribute('hidden', '');
  }
}

