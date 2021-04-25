import { IMapping, IOptions, IStore } from '../../__types__';

/**
 * Loads the menu items
 */
// eslint-disable-next-line import/prefer-default-export
export const loadMenuItems = (options: IOptions<IMapping>, hyralService: string, store: IStore): void => {
  const dispatchQuery = `hyral_${hyralService}/LOAD_COLLECTION`;

  const dispatch = (menu: string) => {
    const payload = { name: menu, resourceType: `menu_items/${menu}` };
    return store.dispatch(dispatchQuery, payload);
  };

  options.mapping.menus.map((menu: string) => dispatch(menu));
};
