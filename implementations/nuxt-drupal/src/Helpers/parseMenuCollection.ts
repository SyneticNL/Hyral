import { ICollection } from '@hyral/core';
import { IMenu } from '../__types__';

/**
 * Parses a menu collection with hierarchy
 */
export default (collection: ICollection<IMenu>): unknown[] => {
  if (!collection || !collection.data) {
    return [];
  }

  const list = collection.data.map((item) => ({ ...item.data, children: [], id: item.id }));

  list
    .filter((item) => item.parent !== '')
    .forEach((item) => list.find((rootItem) => rootItem.id === item.parent)?.children.push(item as never));

  return list.filter((item) => item.parent === '');
};
