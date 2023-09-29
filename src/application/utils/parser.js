import _ from 'lodash';

export default (content, feedId = 0) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/xml');
    const feedTitle = doc.querySelector('title').textContent;
    const feedDescription = doc.querySelector('description').textContent;
    const postsArray = Array.from(doc.querySelectorAll('item'));
    const posts = postsArray.map((item) => ({
      feedId,
      id: _.uniqueId(),
      title: item.querySelector('title').textContent,
      link: item.querySelector('link').textContent,
      description: item.querySelector('description').textContent,
    }));
    const feed = {
      feedId,
      feedTitle,
      feedDescription,
    };
    return {
      feed,
      posts,
    };
  } catch (e) {
    throw TypeError;
  }
};
