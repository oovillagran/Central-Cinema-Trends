export const updateCommentCount = (app_id, item_id) => {
    const commentCountElement = document.querySelector('.popup .comment-count');
    fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${app_id}/comments?item_id=${item_id}`)
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
