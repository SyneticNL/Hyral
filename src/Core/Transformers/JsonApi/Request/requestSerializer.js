/**
 * @param {Object} data
 * @param {Object} headers
 */
import serializeCreateTask from './Serializers/serializeCreateTask';
import serializeUpdateTask from './Serializers/serializeUpdateTask';
import serializeRelationTask from './Serializers/serializeRelationTask';

export default function requestSerializer(data) {
  const serializers = [
    serializeCreateTask,
    serializeUpdateTask,
    serializeRelationTask,
  ];

  return serializers.reduce((result, serializer) => {
    return serializer(result);
  }, data);
}
