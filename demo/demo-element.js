import {CustomElement} from '../src/custom-element.js';
import './data-repeater.js';

export class DemoElement extends CustomElement {

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <h3>title</h3>
      <p data-bind="title" id="title"></p>
      
      <h3>user.name</h3>
      <p data-bind="user.name" id="name"></p>
      
      <h3>user.address.city</h3>
      <p data-bind="user.address.city" id="city"></p>
      
      <h3>data.items</h3>
      
      <data-repeater data-bind="data:data.items"></data-repeater>
      
  `;
  }
}

customElements.define('demo-element', DemoElement);
