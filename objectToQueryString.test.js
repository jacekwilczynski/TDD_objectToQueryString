const objectToQueryString = require('./objectToQueryString');

expect.extend({
  toBeOfType: (received, argument) => ({
    pass: typeof received === argument,
    message: () => `Expected type: "${argument}", received "${received}"`
  })
});

describe('objectToQueryString', function() {
  const proto = {
    inheritedProperty: 'abcd'
  };

  const obj = Object.assign(
    Object.create(proto),
    {
      num: 5,
      'key with spaces': true,
      aString: '"Hello World!"'
    }
  );
  Object.defineProperty(obj, 'nonEnumerableProperty', {
    value: 10,
    enumerable: false
  });

  const correctParamString = 'num=5&key%20with%20spaces=true&aString=%22Hello%20World!%22';

  test(
    'takes an object as the first argument ' +
    'and returns a string with all of its own enumerable ' +
    'properties in the: "key=value" format, separated with ' +
    'the "&" character, URI-encoded, and preceded with a ' +
    'question mark',
    function() {
      expect(objectToQueryString(obj)).toBe('?' + correctParamString);
    }
  );

  test(
    'given an empty or null object or undefined, returns an empty string',
    function() {
      const empty = Object.create(proto);
      Object.defineProperty(empty, 'nonEnumerableProperty', {
        value: 10,
        enumerable: false
      });
      expect(objectToQueryString()).toBe('');
      expect(objectToQueryString({})).toBe('');
      expect(objectToQueryString(empty)).toBe('');
    }
  );

  test(
    'given a value whose typeof !== "object", throws an error',
    function() {
      expect(() => objectToQueryString('a')).toThrow();
      expect(() => objectToQueryString(5)).toThrow();
      expect(() => objectToQueryString(false)).toThrow();
      expect(() => objectToQueryString(() => {})).toThrow();
    }
  );

  test(
    'takes an optional custom prefix to use instead of ' +
    'the question mark as the second argument',
    function() {
      expect(objectToQueryString(obj, 'zxc')).toBe('zxc' + correctParamString);
    }
  );
});
