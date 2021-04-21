import { ParameterBag } from '@hyral/core';
import { IserializedPaging } from '../../__types__';

/**
 * Serializes the paging from the ParameterBag
 */
export default function serializePaging(parameterBag: ParameterBag | Partial<ParameterBag>): IserializedPaging {
  return {
    page: parameterBag.paging,
  };
}
