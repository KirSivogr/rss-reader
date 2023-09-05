import createTitleAndUl from "./createTitleAndUl.js";

const createNewFeed = (title, description, feedUl) => {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');

    p.classList.add('m-0', 'small', 'text-black-50');
    p.innerHTML = description;
    h3.classList.add('h6', 'm-0');
    h3.innerHTML = title;
    li.classList.add('list-group-item', 'border-0', 'border-end-0');

    li.append(h3);
    li.append(p);
    feedUl.append(li);
}

export default (elements, value, prevValue) => {
    console.log(prevValue.length);
    if (prevValue.length === 0) {
        createTitleAndUl(elements.feeds, 'Фиды');
    }

    const feedUl = elements.feeds.querySelector('ul');
    createNewFeed(value[value.length - 1].feedTitle, value[value.length - 1].feedDescription, feedUl);
}