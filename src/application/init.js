import onChange from 'on-change';
import * as yup from 'yup';
import { setLocale } from 'yup';
import axios from 'axios';
import _ from 'lodash';
import i18nextInstance from './utils/i18init';
import parser from './utils/parser';
import render from './render.js';
import updatePosts from './utils/updatePosts';

export default () => {
  const state = {
    data: {
      urls: [],
      feeds: [],
      posts: [],
      readPosts: [],
    },
    form: {
      state: 'filling',
      error: null,
    },
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    feedback: document.querySelector('.feedback'),
    input: document.querySelector('input'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
    addButton: document.querySelector('.btn'),
  };

  const watchedState = onChange(state, render(elements, state));

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url');

    const { urls } = state.data;

    setLocale({
      mixed: {
        notOneOf: i18nextInstance.t('existenceError'),
      },
      string: {
        url: i18nextInstance.t('validationError'),
      },
    });

    const schema = yup.string().required().url().notOneOf(urls);
    schema.validate(url)
      .then((urlAfterValidation) => {
        const newUrl = new URL('https://allorigins.hexlet.app/get');
        newUrl.searchParams.set('disableCache', 'true');
        newUrl.searchParams.set('url', urlAfterValidation);
        return axios.get(newUrl);
      })
      .then((response) => {
        console.log(response.data.contents);
        const feedId = _.uniqueId();
        watchedState.form.state = 'success';
        const { feed, posts } = parser(response.data.contents, feedId);
        watchedState.data.urls.push(url);
        watchedState.data.feeds = [feed, ...state.data.feeds];
        watchedState.data.posts = [...posts, ...state.data.posts];
        updatePosts(state, watchedState);
      })
      .catch((error) => {
        watchedState.form.error = error;
        watchedState.form.state = 'failed';
      });
  });
};
