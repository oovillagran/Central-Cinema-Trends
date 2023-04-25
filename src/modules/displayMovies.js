export const displayMovieDetails = (movieId) => {
  const overlay = document.createElement('div');
  overlay.classList.add('popup-overlay');
  document.body.appendChild(overlay);
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=f1d1819ff16bbb7177fc5279dc3acaef`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Movie details not found.');
    })
    .then((data) => {
      const popup = `
          <div class="popup">
            <button class="close-button">X</button>
            <h2>${data.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}">
            <p>${data.overview}</p>
            <p>Release date: ${data.release_date}</p>
          </div>
        `;
      document.body.insertAdjacentHTML('beforeend', popup);
      const closeButton = document.querySelector('.popup .close-button');
      closeButton.addEventListener('click', () => {
        overlay.remove();
        document.querySelector('.popup').remove();
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

export default displayMovieDetails;