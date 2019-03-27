
import normalizeResources from './resource/normalizeResources';
import relationshipApplyToData from './resource/relationship/relationshipApplyToData';

/**
 * @param {{included: Array, data: Array|Object}} response
 *
 * @returns {HyralResource[]}
 */
export default function responseNormalizer(response) {
  const singleMode = !Array.isArray(response.data);

  const includedResources = response.included ? normalizeResources(response.included) : {};
  relationshipApplyToData(includedResources, includedResources);

  const rootResources = normalizeResources(singleMode ? [response.data] : response.data);
  relationshipApplyToData(rootResources, includedResources);

  const normalizedItems = Object.values(rootResources);
  return singleMode ? normalizedItems.shift() : normalizedItems;
}
