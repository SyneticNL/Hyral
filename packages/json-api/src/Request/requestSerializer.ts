import { IRequestSerializer, Task } from '@hyral/core';
import { IData } from '../__types__';
import serializeCreateUpdateTask from './Serializers/serializeCreateUpdateTask';

/**
 * Serializes the request for the repository
 */
const requestSerializer: IRequestSerializer<IData> = (task: Task<IData>) => serializeCreateUpdateTask(task);
// TODO: Temporarilly removed relationships mutation serializer because it's not implemented
// if (task.type === 'create' || task.type === 'update') {

// } else {
//    return serializeRelationTask(task);
// }
//

export default requestSerializer;
