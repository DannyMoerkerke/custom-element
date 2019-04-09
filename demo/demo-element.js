import {CustomElement} from '../src/custom-element.js';
import './data-repeater.js';

export class DemoElement extends CustomElement {

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <style>
          
      </style>
      
      <h2 data-bind="title"></h2>
      <p data-bind="user.name"></p>
      <p data-bind="user.address.city"></p>
      
      <data-repeater data-bind="data:data.items"></data-repeater>
  `;
  }
}

customElements.define('demo-element', DemoElement);
