export class DataRepeater extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});

    this.css = `
      <style>
        
      </style>
    `
  }

  connectedCallback() {
    this.html = this.innerHTML;
  }

  get data() {
    return this._data;
  }

  set data(items) {
    this._data = items;
    this.shadowRoot.innerHTML = `
      ${this.css}
      <ul>
        ${items.reduce((acc, item) => `${acc}<li>${item}</li>`, ``)}
      </ul>`;
  }
}

customElements.define('data-repeater', DataRepeater);

