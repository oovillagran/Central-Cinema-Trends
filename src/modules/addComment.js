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
        console.log(itemId);
        console.log('Comment added successfully.');
      } else {
        throw new Error('Failed to add comment.');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default addComment;