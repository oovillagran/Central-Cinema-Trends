let page = 1;

const countElementsOnPage = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f1d1819ff16bbb7177fc5279dc3acaef&page=${page}`)
    const data = await response.json();
    const moviesCount = data.results.length;
    const countElements = document.getElementById('movies-count');
    countElements.textContent = `(${moviesCount})`;

  } catch(error) {
    throw new Error(error);
  }
}

export default countElementsOnPage;