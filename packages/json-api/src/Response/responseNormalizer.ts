import { IAxiosResponseType, IResource } from '@hyral/core';
import normalizeResources from './Resource/normalizeResources';
import relationshipApplyToData from './Resource/Relationship/relationshipApplyToData';
import normalizePaging from './Resource/normalizePaging';
import { IJsonApiResponse, IResponse } from '../__types__';

/**
 * The normalizer parses the JSON response to resources
 */
function responseNormalizer(response: IJsonApiResponse): IResponse {
  if (response.errors) {
    return response;
  }

  if (!response.data) {
    return response;
  }

  const includedResources = response.included ? normalizeResources(response.included) : {};
  relationshipApplyToData(includedResources, includedResources);

  const rootResources = normalizeResources(!Array.isArray(response.data) ? [response.data] : response.data);
  relationshipApplyToData(rootResources, includedResources);

  const normalizedItems = Object.values(rootResources);
  if (!Array.isArray(response.data)) {
    return {
      data: normalizedItems.shift() || {} as IResource<any>,
    };
  }

  return {
    data: normalizedItems,
    paging: normalizePaging(response),
  };
}

responseNormalizer.responseType = 'json' as IAxiosResponseType;

export default responseNormalizer;
