import { IDrupalRoute, IRoute } from '../__types__';

export default ({ path, component, resolve }: IDrupalRoute): IRoute => ({
  path,
  component,
  meta: {
    resolve,
    services: ['drupal'],
  },
});
