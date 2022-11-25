import { createDOMElement } from './utils.js';

const COMMENTS_STEP = 5;

export const initComments = (wrapper) => {
  const socialComments = wrapper.querySelector('.social__comments');
  const commentCount = wrapper.querySelector('.social__comment-count');
  const loadCommentsButton = wrapper.querySelector('.comments-loader');
  let showedComments = [];

  const renderComments = (comments) => {
    const commentFragments = document.createDocumentFragment();

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

  const initCommentsOnOpen = (comments) => {
    socialComments.innerHTML = '';

    const renderNextSlice = () => {
      const nextSliceComments = comments.slice(
        showedComments.length,
        showedComments.length + COMMENTS_STEP
      );

      renderComments(nextSliceComments);
      showedComments = [...showedComments, ...nextSliceComments];
      commentCount.textContent = `${showedComments.length} из ${comments.length}
      комментариев`;

      if (showedComments.length === comments.length) {
        loadCommentsButton.removeEventListener('click', renderNextSlice);
        loadCommentsButton.hidden = true;
      }
    };

    loadCommentsButton.addEventListener('click', renderNextSlice);
    renderNextSlice();

    const resetComments = () => {
      loadCommentsButton.hidden = false;
      loadCommentsButton.removeEventListener('click', renderNextSlice);
      showedComments = [];
    };
    return resetComments;
  };

  return initCommentsOnOpen;
};
