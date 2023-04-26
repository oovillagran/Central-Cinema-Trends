const countElementsOnPage = () => {
  const movieElements = document.querySelectorAll('.movie');
  const count = movieElements.length;
  const moviesCountElement = document.getElementById('movies-count');
  moviesCountElement.textContent = `(${count})`;
};

export default countElementsOnPage;
