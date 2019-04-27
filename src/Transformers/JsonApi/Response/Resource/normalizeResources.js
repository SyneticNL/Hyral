import normalizeResource from './normalizeResource';

/**
 * @param {Array} items
 *
 * @returns {Object}
 */
export default function normalizeResources(items) {
  const normalizedItems = {};

  items.forEach((item) => {
    normalizedItems[`${item.type}-${item.id}`] = normalizeResource(item);
  });

  return normalizedItems;
}
