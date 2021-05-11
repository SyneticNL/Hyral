import { IComponentContext } from '../__types__';

/**
 * Returns a list of routes from all urls given to the function
 *
 * @param list of url endpoints
 */
export default function dispatchRoutes(this: IComponentContext, list: string[]): Promise<unknown> {
  return Promise.all(
    list.map(async (url) => {
      const route = await this.$store.dispatch('druxtRouter/getRoute', url);

      if (route.error) throw route.error;

      return { url, route };
    }),
  );
}
