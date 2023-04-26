import countElementsOnPage from "./countElements";

describe('countElementsOnPage function', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="test1" class="test-class"></div>
      <div id="test2" class="test-class"></div>
      <div id="test3" class="test-class"></div>
      <div id="test4" class="test-class"></div>
    `;
  });

  test('Should return the correct number of elements given a class name', () => {
    const count = countElementsOnPage('.test-class');
    expect(count).toBe(4);
  });

  test('Should return 0 when no elements with the given class name are found', () => {
    const count = countElementsOnPage('.another-class');
    expect(count).toBe(0);
  });

  test('Should return the correct number of elements given an element id', () => {
    const count = countElementsOnPage('#test1');
    expect(count).toBe(1);
  });

  test('Should return 0 when no elements with the given id are found', () => {
    const count = countElementsOnPage('#another-id');
    expect(count).toBe(0);
  });

  test('Should return 0 when given id an invalid selector', () => {
    const count = countElementsOnPage('invalid-selector');
    expect(count).toBe(0);
  });

})