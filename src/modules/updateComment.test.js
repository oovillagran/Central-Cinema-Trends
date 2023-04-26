import { updateCommentCount } from './updateCommentCount.js';

describe('updateCommentCount', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve([
        { id: 1, message: 'Comment 1' },
        { id: 2, message: 'Comment 2' },
        { id: 3, message: 'Comment 3' },
      ]),
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('updates the comment count element with the correct count', async () => {
    document.body.innerHTML = `
      <div class="popup">
        <span class="comment-count">(0)</span>
      </div>
    `;
    const appId = 'QQjOshxTvisitjLIZJus';
    const itemId = '1';

    async function updateCommentCount(appId, itemId) {
      const comments = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments?item_id=${itemId}`)
        .then((response) => response.json());
      const commentCountElement = document.querySelector('.popup .comment-count');
      commentCountElement.textContent = `(${comments.length})`;
    }

    await updateCommentCount(appId, itemId);
    expect(fetch).toHaveBeenCalledWith(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments?item_id=${itemId}`);
    const commentCountElement = document.querySelector('.popup .comment-count');
    expect(commentCountElement.textContent).toBe('(3)');
  });

  it('does not update the comment count element if there are no comments', async () => {
    document.body.innerHTML = `
      <div class="popup">
        <span class="comment-count">(0)</span>
      </div>
    `;
    const appId = 'QQjOshxTvisitjLIZJus';
    const itemId = '1';

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve([]),
    }));

    await updateCommentCount(appId, itemId);

    expect(fetch).toHaveBeenCalledWith(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments?item_id=${itemId}`);

    const commentCountElement = document.querySelector('.popup .comment-count');
    expect(commentCountElement.textContent).toBe('(0)');
  });
});