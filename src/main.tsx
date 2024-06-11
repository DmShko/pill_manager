import React from 'react'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './pmStore/index.ts'
import { HashRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <Provider store={store}>
      <HashRouter basename="/pill_manager">
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </HashRouter>
    </Provider>
    
  </React.StrictMode>,
)