import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-http-backend';
import {ThemeProvider} from 'react-jss';

import App from './App';
// Control the colors the app for this demo (we can add more later). Check this url for more details https://cssinjs.org/react-jss/?v=v10.9.1-alpha.2#theming
import THEME from 'helper/theme';
import reportWebVitals from './reportWebVitals';

// Control the language of the app for this demo (English only at the moment). Check this url for more details https://react.i18next.com/
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    supportedLngs: ['en'],
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback="...is loading">
      <ThemeProvider theme={THEME}>
        <App />
      </ThemeProvider>
    </Suspense>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
