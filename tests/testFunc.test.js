/* eslint no-undef: "off" */
import testFunc from '../src/testFunc';

test('basic test, 1 + 2 equals 3', () => {
  expect(testFunc(1, 2)).toBe(3);
});
