/**
 *
 * Asynchronously loads the component for PhotoCard
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
