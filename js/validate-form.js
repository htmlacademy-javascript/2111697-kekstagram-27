const uploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(uploadForm, {
  classTo:
  errorClass:
  successClass:
  errorTextParent:
  errorTextTag:
  errorTextClass:
});

pristine.addValidator(uploadForm.querySelector())

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if(isValid) {
    console.log('Можно отправлять');
  } else ('Форма невалидна');
});

const hashTag = /^#[a-zа-яё0-9]{1,19}$/i;

