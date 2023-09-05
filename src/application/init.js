import onChange from "on-change";
import * as yup from 'yup';
import render from './render.js';
import {setLocale} from "yup";
import i18next from "i18next";
import i18nextInstance from './utils/i18init';
import axios from "axios";
import parser from "./utils/parser";

export default () => {
    const state = {
        data: {
            urls: [],
            feeds: [],
            posts: []
        },
        form: {
            state: 'filling',
            error: null
        }
    }

    const elements = {
        form: document.querySelector('.rss-form'),
        feedback: document.querySelector('.feedback'),
        input: document.querySelector('input'),
        feeds: document.querySelector('.feeds'),
        posts: document.querySelector('.posts')
    }

    const watchedState = onChange(state, render(elements));

    elements.form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const url = formData.get('url');

        const urls = state.data.urls;

        setLocale({
            mixed: {
                notOneOf: i18nextInstance.t('existenceError'),
            },
            string: {
                url: i18nextInstance.t('validationError'),
            }
        });

        const schema = yup.string().required().url().notOneOf(urls);
        schema.validate(url)
            .then((url) => {
                const newUrl = new URL('https://allorigins.hexlet.app/get');
                newUrl.searchParams.set('disableCache', 'true');
                newUrl.searchParams.set('url', url);
                return axios.get(newUrl);
            })
            .then((response) => {
                watchedState.form.state = 'success';
                const {feed, posts} = parser(response.data.contents);
                watchedState.data.urls.push(url);
                watchedState.data.feeds.push(feed);
                watchedState.data.posts = [...state.data.posts, ...posts];
            })
            .catch((error) => {
                watchedState.form.error = error;
                watchedState.form.state = 'failed';
            })
    })
}