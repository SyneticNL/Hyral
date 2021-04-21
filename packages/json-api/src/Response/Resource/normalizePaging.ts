import { parse } from 'qs';
import { URL } from 'whatwg-url';
import { IJsonApiResponse } from '../../__types__';

/**
 * Normalizes the paging of the response
 */
export default function normalizePaging(response: IJsonApiResponse): { count: number, pages: number } {
  if (!response.links || !response.links.last) {
    return {
      count: 0,
      pages: 0,
    };
  }

  const whatwgUrl = new URL(response.links.last, 'http://_');
  const query = parse(whatwgUrl.search.substring(1)) as { page: { number: string, size: string } };
  const numPages = parseInt(query.page.number, 10);
  const numPerPage = parseInt(query.page.size, 10);

  return {
    count: numPages * numPerPage,
    pages: numPages,
  };
}
