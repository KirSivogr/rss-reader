import createTitleAndUl from "./createTitleAndUl.js";

const createNewPosts = (link, title, postsUl) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const button = document.createElement('button');

    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.textContent = 'Просмотр';
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#exampleModal';
    a.href = link;
    a.classList.add('fw-bold');
    a.textContent = title;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');


    li.append(a);
    li.append(button);
    postsUl.append(li);
}

export default (elements, value, prevValue) => {
    if (prevValue.length === 0) {
        createTitleAndUl(elements.posts, 'Посты');
    }

    const postsUl = elements.posts.querySelector('ul');
    value = value.slice(prevValue.length);
    value.forEach((post) => {
        createNewPosts(post.link, post.title, postsUl);
    })
}