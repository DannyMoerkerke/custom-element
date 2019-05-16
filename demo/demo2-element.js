import {CustomElement} from '../src/custom-element.js';
import './data-repeater.js';

export class Demo2Element extends CustomElement {

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          border: 1px solid #000000;
          padding: 20px;
        }
      </style>
      
      <h3>title</h3>
      <p data-bind="title" id="title"></p>
  `;

  }
}

customElements.define('demo2-element', Demo2Element);
