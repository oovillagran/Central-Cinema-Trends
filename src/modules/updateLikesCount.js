const updateLikesCount = () => {
  fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Qp9S5HEfXuHClmKBYUwG/likes')
    .then((response) => response.json())
    .then((likes) => {
      if (likes.length > 0) {
        const likeCounts = {};
        likes.forEach((like) => {
          if (like.item_id in likeCounts) {
            likeCounts[like.item_id] += 1;
          } else {
            likeCounts[like.item_id] = like.likes;
          }
        });
        const likeCountElements = document.querySelectorAll('.count-likes');
        likeCountElements.forEach((element) => {
          const itemId = element.getAttribute('data-movie-id');
          if (itemId in likeCounts) {
            element.textContent = `(${likeCounts[itemId]})`;
          }
        });
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export default updateLikesCount;
