// import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
// import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);
const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(app)