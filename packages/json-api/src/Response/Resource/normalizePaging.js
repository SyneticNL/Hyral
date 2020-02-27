import parse from 'qs/lib/parse';
import url from 'url';

/**
 * @param {JsonApiResponse} response
 *
 * @returns {{count: number, pages: number}}
 */
export default function normalizePaging(response) {
  if (!response.links || !response.links.last) {
    return {
      count: 0,
      pages: 0,
    };
  }

  if (url.parse(response.links.last).query) {
    const query = parse(
      url.parse(response.links.last).query,
    );

    const numPages = parseInt(query.page.number, 10);
    const numPerPage = parseInt(query.page.size, 10);

    return {
      count: numPages * numPerPage,
      pages: numPages,
    };
  }
  return {
    count: 1,
    pages: 1,
  };
}
