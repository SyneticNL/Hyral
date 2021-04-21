import { IFilter, IParameterBag, ISorting } from '../__types__';

/**
 * All information for a request to the backend that is not a resource is contained in a parameterBag
 */
export default class ParameterBag implements IParameterBag {
  filters: IFilter[];
  sorting: ISorting[];
  paging: Record<string, unknown>;
  params: Record<string, unknown>;

  constructor(
    filters: IFilter[] = [],
    sorting: ISorting[] = [],
    paging = {},
    params = {},
  ) {
    this.filters = filters;
    this.sorting = sorting;
    this.paging = paging;
    this.params = params;
  }

  addFilter(filter: IFilter): void {
    this.filters.push(filter);
  }

  setFilters(filters: IFilter[]): void {
    this.filters = filters;
  }

  setSorting(sorting: ISorting[]): void {
    this.sorting = sorting.map(({ field, direction }) => ({
      field,
      direction: direction || 'asc',
    }));
  }

  setPaging(paging: Record<string, unknown>): void {
    this.paging = paging;
  }

  addParam(key: string, value: unknown): void {
    this.params = { ...this.params, [key]: value };
  }

  setParams(params: Record<string, unknown>): void {
    this.params = params;
  }
}
