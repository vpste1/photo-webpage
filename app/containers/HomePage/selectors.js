import { createSelector } from 'reselect';

/**
 * Direct selector to the homepage state domain
 */
const selectHomePageDomain = (state) => state.get('homepage');

/**
 * Other specific selectors
 */

const makeSelectHomePage = () => createSelector(
   selectHomePageDomain,
   (substate) => substate.toJS()
 );

const makeSelectActivePage = () => createSelector(
  selectHomePageDomain,
  (substate) => substate.get('activePage')
);

const makeSelectDataRetrieved = () => createSelector(
  selectHomePageDomain,
  (substate) => substate.get('dataRetrieved')
);

const makeSelectTitleList = () => createSelector(
  selectHomePageDomain,
  (substate) => substate.get('titleList')
);

const makeSelectUrlList = () => createSelector(
  selectHomePageDomain,
  (substate) => substate.get('urlList')
);

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectActivePage,
  makeSelectDataRetrieved,
  makeSelectTitleList,
  makeSelectUrlList,
};
