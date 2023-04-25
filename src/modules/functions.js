const loadMovies = async() => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=f1d1819ff16bbb7177fc5279dc3acaef');
  
    console.log(response);

    // if response is ok
    if(response.status === 200) {
      const data = await response.json();
      
      let movies = '';
      data.results.forEach(movie => {
        movies += `
          <div class="movie">
              <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">    
              <h4 class="title">${movie.title}</h4>
          </div>
        `
      });

      document.getElementById('movies-page').innerHTML = movies;

    } else if(response.status === 401){
      console.log('wrong key');
    } else if(response.status === 404){
      console.log('The movie doesn\'t exist.')
    } else {
      console.log('error')
    }

  } catch(error) {
    console.log(error);
  }
}

//loadMovies();

export { loadMovies };
