import i18next from 'i18next';

const i18nextInstance = i18next.createInstance();

i18nextInstance.init({
  fallbackLng: 'ru',
  debug: true,
  resources: {
    ru: {
      translation: {
        successAnswer: 'RSS успешно загружен',
        validationError: 'Ссылка должна быть валидным URL',
        existenceError: 'RSS уже существует',
        axiosErrorAnswer: 'Ошибка сети',
        typeErrorAnswer: 'Ресурс не содержит валидный RSS',
        feeds: 'Фиды',
        posts: 'Посты',
      },
    },
  },
});

export default i18nextInstance;
