import axios from 'axios';
import parse from './parser';

const updatePosts = (state, watchedState) => {
  if (state.data.urls.length === 0) {
    setTimeout(updatePosts, 5000, state, watchedState);
    return;
  }

  const allOrigins = 'https://allorigins.hexlet.app/get?disableCache=true&url=';
  const promises = state.data.urls.map((url) => axios.get(`${allOrigins}${encodeURIComponent(url)}`)
    .then((response) => {
      const { feed, posts } = parse(response.data.contents);
      let feedId = 0;
      state.data.feeds.forEach((oldFeed) => {
        if (feed.feedTitle === oldFeed.feedTitle) {
          feedId = oldFeed.feedId;
        }
      });
      const oldPostsWithSameFeedId = state.data.posts.filter((post) => post.feedId === feedId);
      const oldTitles = oldPostsWithSameFeedId.map((post) => post.title);
      const newPosts = posts.filter((post) => !oldTitles.includes(post.title));
      newPosts.forEach((post) => {
        post.feedId = feedId;
      });
      return newPosts;
    })
    .catch(() => {
      throw TypeError;
    }));

  const promise = Promise.all(promises);
  promise.then((data) => {
    data.forEach((newPosts) => {
      console.log(newPosts);
      watchedState.data.posts = [...newPosts, ...state.data.posts];
    });
    setTimeout(updatePosts, 5000, state, watchedState);
  }).catch(() => {
    throw TypeError;
  });
};

export default updatePosts;
