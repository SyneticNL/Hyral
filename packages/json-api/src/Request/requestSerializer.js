/**
 * @param {Object} data
 * @param {Object} headers
 */
import serializeRelationTask from './Serializers/serializeRelationTask';
import serializeCreateUpdateTask from './Serializers/serializeCreateUpdateTask';

export default function requestSerializer(data) {
  const serializers = [
    serializeCreateUpdateTask,
    serializeRelationTask,
  ];

  return serializers.reduce((result, serializer) => serializer(result), data);
}
