import countElementsOnPage from './countElements.js';

describe('Count movies on Page Test', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="movie">Movie1</div>
      <div class="movie">Movie2</div>
      <div class="movie">Movie3</div>
      <div class="movie">Movie4</div>
    `;
  });

  test('Should update the number of movies shown on Homepage', () => {
    const moviesCountElement = document.createElement('span');
    moviesCountElement.setAttribute('id', 'movies-count');
    document.body.appendChild(moviesCountElement);

    countElementsOnPage();

    expect(moviesCountElement.textContent).toBe('(4)');
  });

  test('Should return undefined when there are no movies on Homepage', () => {
    const result = countElementsOnPage();
    expect(result).toBeUndefined();
  });
});
