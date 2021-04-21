import { ParameterBag } from '@hyral/core';
import { ISerializedParams } from '../../__types__';

/**
 * Serializes the params from the ParameterBag
 */
export default function serializeParams(parameterBag?: ParameterBag | Partial<ParameterBag>): ISerializedParams {
  return parameterBag?.params || {};
}
