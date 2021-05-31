import { IRoute } from '../__types__';

export default (depth: number, component: unknown): IRoute[] => {
  const list = [];
  let name = '';
  for (let i = 0; i < depth; i += 1) {
    name += `/:wildcard_${i + 1}`;
    list.push({
      path: name,
      name: `drupal_${i + 1}`,
      component,
      meta: {
        services: ['drupal'],
      },
    });
  }
  return list;
};
