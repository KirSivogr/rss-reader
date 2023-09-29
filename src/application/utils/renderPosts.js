import createTitleAndUl from './createTitleAndUl.js';

const createNewPosts = (id, link, title, description, postsUl, state) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const button = document.createElement('button');

  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.setAttribute('type', 'button');
  button.textContent = 'Просмотр';
  button.dataset.bsToggle = 'modal';
  button.dataset.bsTarget = '#exampleModal';
  button.dataset.id = id;

  a.dataset.id = id;
  a.href = link;
  a.classList.add('fw-bold');
  a.textContent = title;
  a.setAttribute('target', '_blank');
  a.setAttribute('rel', 'noopener noreferrer');

  a.addEventListener('click', () => {
    a.classList.remove('fw-bold');
    a.classList.add('fw-normal', 'link-secondary');
    state.readPosts.push({
      id, link, title, description,
    });
  });

  button.addEventListener('click', () => {
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');
    const article = document.querySelector('.full-article');
    modalTitle.textContent = title;
    modalBody.classList.add('text-break');
    modalBody.textContent = description;
    article.href = link;
    a.classList.remove('fw-bold');
    a.classList.add('fw-normal', 'link-secondary');
    state.readPosts.push({
      id, link, title, description,
    });
  });

  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  li.append(a);
  li.append(button);
  postsUl.prepend(li);
};

export default (elements, value, prevValue, state) => {
  if (prevValue.length === 0) {
    createTitleAndUl(elements.posts, 'Посты');
  }

  const postsUl = elements.posts.querySelector('ul');
  value = value.slice(0, value.length - prevValue.length).reverse();
  value.forEach((post) => {
    createNewPosts(post.id, post.link, post.title, post.description, postsUl, state);
  });
};
