export const showComments = (appId, itemId) => {
    const commentsList = document.querySelector('.comments-list');
    fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments?item_id=${itemId}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Comments not found.');
      })
      .then((data) => {
        commentsList.innerHTML = '';
        data.forEach((comment) => {
          const commentListItem = document.createElement('li');
          commentListItem.innerHTML = `
          <small>${comment.creation_date} - ${comment.username}:</small> <strong>${comment.comment}</strong>
          `;
          commentsList.appendChild(commentListItem);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

export default showComments;