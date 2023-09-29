import i18nextInstance from './i18init.js';

const createTitleAndUl = (area, nameOfTitle) => {
  const card = document.createElement('div');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h2');
  const feedUl = document.createElement('ul');

  card.classList.add('card', 'border-0');
  cardBody.classList.add('card-body');
  feedUl.classList.add('list-group', 'border-0', 'rounded-0');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = i18nextInstance.t(nameOfTitle);

  cardBody.append(cardTitle);
  card.append(cardBody);
  card.append(feedUl);
  area.append(card);
};

export default createTitleAndUl;
