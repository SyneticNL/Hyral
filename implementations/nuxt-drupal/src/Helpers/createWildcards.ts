export default (depth: number, component: unknown): {
  path: string,
  name: string,
  component: unknown
  props: { drupal: boolean }
}[] => {
  const list = [];
  let name = '';
  for (let i = 0; i < depth; i += 1) {
    name += `/:wildcard_${i + 1}`;
    list.push({
      path: name,
      name: `drupal_${i + 1}`,
      component,
      props: {
        drupal: true,
      },
    });
  }
  return list;
};
