export class DataRepeater extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.html = this.innerHTML;
  }

  set data(items) {
    this.shadowRoot.innerHTML = `
      <ul>
        ${items.reduce((acc, item) => `${acc}<li>${item}</li>`, ``)}
      </ul>`;
  }
}

customElements.define('data-repeater', DataRepeater);

