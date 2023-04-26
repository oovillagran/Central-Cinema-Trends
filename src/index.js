import 'lodash';
import './style.css';
import loadMovies from './modules/functions.js';
import countElementsOnPage from './modules/countElements.js';

loadMovies().then(() => {
  countElementsOnPage();
});
