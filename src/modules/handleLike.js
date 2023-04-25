export const handleLike = async (event, updateLikes, getLikes) => {
  const likeButton = event.target;
  const movieContainer = likeButton.parentElement;
  const movieId = movieContainer.dataset.movieId;

  // get the current likes number of a movie
  // let likes = parseInt(movieContainer.querySelector('.likes-count').textContent);
  let likes = await getLikes(movieId);

  // if likeButton has not been pressed, increases the likes count in 1
  if (!likeButton.classList.contains('liked')) {
    likes += 1;
    likeButton.classList.add('liked');
  } else {
    // if likeButton has been pressed, decrease the likes count in 1
    likes -= 1;
    likeButton.classList.remove('liked');
  }

  // update the likes count
  movieContainer.querySelector('.likes-count').textContent = likes;

  // update the likes count on the server
  await updateLikes(movieId, likes);
};

