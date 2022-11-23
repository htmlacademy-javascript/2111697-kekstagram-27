import { createDOMElement } from './utils.js';

//зададим константу равную 5
const COMMENTS_STEP = 5;

export const createRendererComments = (socialComments) => (comments) => {
  //создаём фрагмент
  const commentFragments = document.createDocumentFragment();

  //переберем список методом forEach и создадим функцию с комментарием
  comments.forEach(({ avatar, name, message }) => {
    const commentContainer = createDOMElement('li', 'social__comment');

    const avatarUser = createDOMElement('img', 'social__picture');
    avatarUser.src = avatar;
    avatarUser.alt = name;

    avatarUser.width = 35;
    avatarUser.height = 35;
    commentContainer.append(avatarUser);

    const commentText = createDOMElement('p', 'social__text');
    commentText.textContent = message;
    commentContainer.append(commentText);
    commentFragments.append(commentContainer);
  });
  return socialComments.append(commentFragments);
};

export const initComments = ({
  socialComments,
  comments,
  commentCount,
  loadCommentButton,
  renderComments,
}) => {
  socialComments.innerHTML = '';
  let showedComments = [];

  function renderNextSlice() {
    const nextSliceComments = comments.slice(
      showedComments.length,
      showedComments.length + COMMENTS_STEP
    );

    renderComments(nextSliceComments);
    showedComments = [...showedComments, ...nextSliceComments];
    commentCount.textContent = `${showedComments.length} из ${comments.length}
      комментариев`;

    if (showedComments.length === comments.length) {
      loadCommentButton.removeEventListener('click', renderNextSlice);
      loadCommentButton.hidden = true;
    }
  }

  loadCommentButton.addEventListener('click', renderNextSlice);
  renderNextSlice();

  return () => {
    loadCommentButton.hidden = false;
    loadCommentButton.removeEventListener('click', renderNextSlice);
  };
};
