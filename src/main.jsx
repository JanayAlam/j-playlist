import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StoreProvider } from 'easy-peasy';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './store/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <StoreProvider store={store}>
        <App />
    </StoreProvider>
);

