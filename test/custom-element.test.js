import '../src/custom-element.js';
import '../demo/demo-element.js';

describe('custom-element', () => {
  let element;
  const state = {
    title: 'custom-element test',
    data: {
      items: ['foo', 'bar'],
    },
    user: {
      name: 'Name',
      address: {
        city: 'City'
      }
    }
  };

  beforeEach(function() {
    element = document.createElement('demo-element');

    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should do correct data binding for primitive values', () => {
    element.setState({
      title: 'custom-element test'
    });

    const actual = element.shadowRoot.querySelector('#title').textContent;
    const expected = state.title;

    assert.equal(actual, expected);
  });

  it('should do correct data binding for objects', () => {
    element.setState({
      user: {
        name: 'Name',
        address: {
          city: 'City'
        }
      }
    });

    const actual1 = element.shadowRoot.querySelector('#name').textContent;
    const expected1 = state.user.name;

    const actual2 = element.shadowRoot.querySelector('#city').textContent;
    const expected2 = state.user.address.city;

    assert.equal(actual1, expected1);
    assert.equal(actual2, expected2);
  });

  it('should do correct data binding for arrays on the correct property specified before ":"', () => {
    const state = {
      data: {
        items: ['foo', 'bar'],
      }
    };

    element.setState(state);

    const dataRepeater = element.shadowRoot.querySelector('data-repeater');
    const items = dataRepeater.shadowRoot.querySelectorAll('li');

    assert.equal(dataRepeater.data, state.data.items);
    assert.equal(items.length, 2);
    assert.equal(items[0].textContent, state.data.items[0]);
    assert.equal(items[1].textContent, state.data.items[1]);
  });

  it('should not update the existing properties of the state object when these are not specified when updating state', () => {
    element.setState({
      user: {
        name: 'Name',
        address: {
          city: 'City'
        }
      }
    });

    const actual1 = element.shadowRoot.querySelector('#name').textContent;
    const expected1 = state.user.name;

    const actual2 = element.shadowRoot.querySelector('#city').textContent;
    const expected2 = state.user.address.city;

    assert.equal(actual1, expected1);
    assert.equal(actual2, expected2);

    const newState = {
      user: {
        name: 'New name'
      }
    };

    element.setState(newState);

    const actual3 = element.shadowRoot.querySelector('#name').textContent;
    const expected3 = newState.user.name;
    const actual4 = element.shadowRoot.querySelector('#city').textContent;

    assert.equal(actual3, expected3);
    assert.equal(actual4, expected2);
  });

  it('should correctly test if a given value is an array', () => {
    assert.equal(element.isArray([]), true);
    assert.equal(element.isArray({}), false);
    assert.equal(element.isArray('foo'), false);
    assert.equal(element.isArray(7), false);
    assert.equal(element.isArray(null), false);
    assert.equal(element.isArray(undefined), false);
    assert.equal(element.isArray(class {}), false);
    assert.equal(element.isArray(function() {}), false);
    assert.equal(element.isArray(() => {}), false);
    assert.equal(element.isArray(new Map()), false);
    assert.equal(element.isArray(new WeakMap()), false);
    assert.equal(element.isArray(new Set()), false);
    assert.equal(element.isArray(new WeakSet()), false);
  });

  it('should correctly test if a given value is an object', () => {
    assert.equal(element.isObject({}), true);
    assert.equal(element.isObject([]), false);
    assert.equal(element.isObject('foo'), false);
    assert.equal(element.isObject(7), false);
    assert.equal(element.isObject(null), false);
    assert.equal(element.isObject(undefined), false);
    assert.equal(element.isObject(class {}), false);
    assert.equal(element.isObject(function() {}), false);
    assert.equal(element.isObject(() => {}), false);
    assert.equal(element.isObject(new Map()), false);
    assert.equal(element.isObject(new WeakMap()), false);
    assert.equal(element.isObject(new Set()), false);
    assert.equal(element.isObject(new WeakSet()), false);
  });

  it('should select the correct DOM element', () => {
    const actual = element.select('#name');
    const expected = element.shadowRoot.querySelector('#name');

    assert.equal(actual, expected);
  });

  it('should select the correct collection of DOM elements', () => {
    const actual = element.shadowRoot.querySelectorAll('p');
    const expected = element.selectAll('p');

    assert.deepEqual(actual, expected);
  });

  it('should hide the component when "hide()" is called', () => {
    element.hide();

    assert.equal(element.style.display, 'none');
    assert.equal(element.hasAttribute('hidden'), true)
  });

  it('should display a hidden component when "show()" is called', () => {
    element.hide();
    element.show();

    assert.equal(element.style.display, '');
    assert.equal(element.hasAttribute('hidden'), false)
  });
});
