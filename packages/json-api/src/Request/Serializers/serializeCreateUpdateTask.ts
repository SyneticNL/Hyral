import { Task } from '@hyral/core';
import { IData } from '../../__types__';

/**
 * Serializes tasks for create and update mutations
 */
export default function serializeCreateUpdateTask(task: Task<IData>): { data: unknown } {
  const type = { type: task.payload.type };
  const id = { id: task.payload.id?.toString() };
  const { relationships, ...attributes } = task.payload;

  const data: Record<string, unknown> = {
    ...type,
    ...id,
    attributes: attributes.data,
  };

  if (!data.id || data.id === null) delete data.id;

  return {
    data,
  };
}
