import updateLikesCount from "./updateLikesCount.js";

export const countLikes = (itemId) => {
  fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Qp9S5HEfXuHClmKBYUwG/likes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item_id: itemId })
  })
  .then(response => {
    if(response.status === 201) {
      return fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Qp9S5HEfXuHClmKBYUwG/likes');
    }
    throw new Error('Failed to count likes');
  })
  .then(response => response.json())
  .then(data => {
    const likeCountElement = document.querySelector(`.count-likes[data-movie-id="${itemId}"]`);
 
    updateLikesCount();
  })
  .catch(error => {
    console.error(error);
  });
};
