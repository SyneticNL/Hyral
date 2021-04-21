import { Task, Resource } from '@hyral/core';
import { IData } from '../../__types__';

/**
 * Serializes tasks for create and update mutations
 */
export default function serializeCreateUpdateTask(task: Task<IData>): { data: unknown } {
  const type: Partial<Resource<IData>> = { type: task.payload.type };
  const id = task.payload.id !== null ? { id: task.payload.id?.toString() } : {};
  const { relationships, ...attributes } = task.payload;

  const data: Record<string, unknown> = {
    ...type,
    ...id,
    attributes: attributes.data,
  };

  if (!data.id || data.id === null) delete data.id;
  if (!data.meta || data.meta === undefined) delete data.meta;

  return {
    data,
  };
}
