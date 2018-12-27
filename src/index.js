import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import store from './store';
import App from './components/App';
import List from './components/Salons';
import Salon from './components/Salon';
import { updateSalon } from './routes';
import styles from './styles.scss';

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to='/list'/>

        <Router path="/list" component={List} />
        <Route path="/list/salon/:id" component={Salon} onEnter={updateSalon}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
