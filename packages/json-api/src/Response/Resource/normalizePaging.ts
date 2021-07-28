import { URLSearchParams, URL } from 'url';
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

  const url = new URL(`http://${response.links.last}`);
  const params = new URLSearchParams(url.searchParams);
  const numPages = parseInt(params.get('page[number]') || '0', 10);
  const numPerPage = parseInt(params.get('page[size]') || '0', 10);

  return {
    count: numPages * numPerPage,
    pages: numPages,
  };
}
