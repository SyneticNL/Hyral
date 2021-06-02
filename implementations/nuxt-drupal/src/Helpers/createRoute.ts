import { IDrupalRoute, IRoute } from '../__types__';

/**
 * creates a vue-router route with Drupal meta
 *
 * @augments resolve
 * @Param route
 */
export default (route: IDrupalRoute): IRoute => (
  ({ resolve, ...otherProps }) => (
    {
      ...otherProps,
      meta: {
        ...route.meta,
        resolve: route.resolve,
        services: [...route.meta?.services ?? [], 'drupal'],
      },
    }
  )
)(route);
