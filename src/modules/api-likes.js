const api = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ITl2aH3zGUPdLzyWIFmA';

const updateLikes = (movieId, countLikes, likeData) => {
  let movieLike = null;
  let likeQuantity = null;

  for (let i = 0; i < likeData.length; i += 1) {
    if (likeData[i].item_id === movieId) {
      movieLike = likeData[i];
      break;
    }
  }

  if (movieLike != null) {
    likeQuantity = movieLike.likes;
    countLikes.textContent = likeQuantity;
  } else {
    countLikes.textContent = `${0}`;
  }
};

export async function getLikes(movieId, countLikes) {
  const response = await fetch(`${api}/likes/`);
  const data = await response.json();
  updateLikes(movieId, countLikes, data)
}

export const likeMovie = (selectedId, likeCountEmptyContainer) => {
  const body = JSON.stringify({ item_id: selectedId});
  fetch(`${api}/likes/`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  .then((response) => {
    if (response.ok) {
      getLikes(selectedId, likeCountEmptyContainer)
    } else {
      return new Error ('Movie Id not found');
    }
  })
  .catch((error) => error);
}
