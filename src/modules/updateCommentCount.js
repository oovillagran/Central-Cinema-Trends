export const updateCommentCount = (appId, itemId) => {
  const commentCountElement = document.querySelector('.popup .comment-count');
  fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments?item_id=${itemId}`)
    .then((response) => response.json())
    .then((comments) => {
      if (comments.length > 0) {
        const commentCount = comments.length;
        commentCountElement.textContent = `(${commentCount})`;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
export default updateCommentCount;
