import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import "react-datepicker/dist/react-datepicker.css"; // Import Datepicker styles
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
