const countElementsOnPage = () => {
  const movieElements = document.querySelectorAll('.movie');
  const count = movieElements.length;
  const moviesCountElement = document.getElementById('movies-count');
  if (moviesCountElement) {
    moviesCountElement.textContent = `(${count})`;
  }
};

export default countElementsOnPage;
