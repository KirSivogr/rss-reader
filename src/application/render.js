import i18nextInstance from './utils/i18init';
import renderFeeds from './utils/renderFeeds';
import renderPosts from './utils/renderPosts';

export default (elements, state) => (path, value, prevValue) => {
  if (path === 'form.state') {
    if (value === 'success') {
      elements.feedback.classList.add('text-success');
      elements.feedback.classList.remove('text-danger');
      elements.feedback.textContent = i18nextInstance.t('successAnswer');
      elements.input.classList.remove('is-invalid');
      elements.form.reset();
      elements.input.focus();
    } else {
      elements.feedback.classList.add('text-danger');
      elements.feedback.classList.remove('text-success');
      elements.input.classList.add('is-invalid');
    }
  } else if (path === 'form.error') {
    const { name, errors } = value;
    if (name === 'ValidationError') {
      const firstError = errors[0];
      elements.feedback.textContent = firstError;
    } else if (name === 'TypeError') {
      elements.feedback.textContent = i18nextInstance.t('typeErrorAnswer');
    } else if (name === 'AxiosError') {
      elements.feedback.textContent = i18nextInstance.t('axiosErrorAnswer');
    }
  } else if (path === 'data.feeds') {
    renderFeeds(elements, value, prevValue);
  } else if (path === 'data.posts') {
    renderPosts(elements, value, prevValue, state);
  }
};
