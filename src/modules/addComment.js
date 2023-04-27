export const addComment = (appId, itemId, username, comment) => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: itemId, username, comment }),
  })
    .then((response) => {
      if (response.status === 201) {
        return 'Comment added successfully.';
      }
      throw new Error('Failed to add comment.');
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export default addComment;