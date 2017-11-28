import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(

    <Provider store={store}>
        <MuiThemeProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter> 
        </MuiThemeProvider>
    </Provider>,

    document.getElementById('root'));
registerServiceWorker();
