import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { Provider } from 'react-redux';
import store from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <Provider store={store}>
    <React.StrictMode>
        <GlobalStyles>         
            <App />    
        </GlobalStyles>
    </React.StrictMode>
  </Provider>
);
reportWebVitals();
