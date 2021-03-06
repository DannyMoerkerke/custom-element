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

    const actual = element.select('#title').textContent;
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

    const actual1 = element.select('#name').textContent;
    const expected1 = state.user.name;

    const actual2 = element.select('#city').textContent;
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

    const dataRepeater = element.select('data-repeater');
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

    const actual1 = element.select('#name').textContent;
    const expected1 = state.user.name;

    const actual2 = element.select('#city').textContent;
    const expected2 = state.user.address.city;

    assert.equal(actual1, expected1);
    assert.equal(actual2, expected2);

    const newState = {
      user: {
        name: 'New name'
      }
    };

    element.setState(newState);

    const actual3 = element.select('#name').textContent;
    const expected3 = newState.user.name;
    const actual4 = element.select('#city').textContent;

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
    const expected = element.select('#name');

    assert.equal(actual, expected);
  });

  it('should select the correct collection of DOM elements', () => {
    const actual = element.selectAll('p');
    const expected = element.selectAll('p');

    assert.deepEqual(actual, expected);
  });

  it('should hide the component when "hide()" is called', () => {
    element.hide();

    assert.equal(element.style.display, 'none');
    assert.equal(element.hasAttribute('hidden'), true);
  });

  it('should hide multiple elements when "hide()" is called with arguments', () => {
    const title = element.select('#title');
    const name = element.select('#name');
    element.hide([title, name]);

    assert.equal(title.style.display, 'none');
    assert.equal(title.hasAttribute('hidden'), true);
    assert.equal(name.style.display, 'none');
    assert.equal(name.hasAttribute('hidden'), true);
  });

  it('should display a hidden component when "show()" is called', () => {
    element.hide();
    element.show();

    assert.equal(element.style.display, '');
    assert.equal(element.hasAttribute('hidden'), false)
  });

  it('should show multiple elements when "show()" is called with arguments', () => {
    const title = element.select('#title');
    const name = element.select('#name');
    element.hide([title, name]);
    element.show([title, name]);

    assert.equal(title.style.display, '');
    assert.equal(title.hasAttribute('hidden'), false);
    assert.equal(name.style.display, '');
    assert.equal(name.hasAttribute('hidden'), false);
  });

  it('should correctly set multiple styles on an element', () => {
    element.setState({
      title: 'custom-element test'
    });

    const heading = element.select('h3');
    const styles = {
      color: 'red',
      textDecoration: 'underline',
      textAlign: 'center'
    };

    element.css(heading, styles);

    Object.entries(styles).forEach(([prop, style]) => {
      assert.equal(heading.style[prop], style);
    })
  });

  it('should correctly set multiple styles on multiple elements', () => {
    element.setState(state);

    const title = element.select('#title');
    const name = element.select('#name');

    const styles = {
      color: 'red',
      textDecoration: 'underline',
      textAlign: 'center'
    };

    element.css([title, name], styles);

    Object.entries(styles).forEach(([prop, style]) => {
      assert.equal(title.style[prop], style);
      assert.equal(name.style[prop], style);
    })
  });

  it('should correctly select multiple elements and set these as properties on the element', () => {
    element.setState(state);

    const title = element.select('#title');
    const name = element.select('#name');
    const city = element.select('#city');

    element.multiSelect({
      titleObj: '#title',
      nameObj: '#name',
      cityObj: '#city'
    });

    assert.deepEqual(element.titleObj, title);
    assert.deepEqual(element.nameObj, name);
    assert.deepEqual(element.cityObj, city);
  });

  it('should add a template to an element', () => {
    element.setState(state);
    const container = element.select('#container');

    element.addTemplate(container, '#template');

    assert.equal(element.shadowRoot.contains(element.select('#template-content')), true);
  });

  it('should add a template to an element and remove any existing elements', () => {
    element.setState(state);
    const container = element.select('#container');

    element.addTemplate(container, '#template', true);

    assert.equal(container.children.length, 1);
  });
});
