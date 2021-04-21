import { Repository, IUrlSerializer } from '@hyral/core';

/**
 * Serializer for the url
 */
const urlSerializer: IUrlSerializer<any> = {
  fetch(repository: Repository<any>): string {
    return `/${repository.resourceType}`;
  },

  fetchOne(repository: Repository<any>, id: string | number): string {
    return `/${repository.resourceType}/${id}`;
  },

  create(resourceType: string): string {
    return `/${resourceType}`;
  },

  update(resourceType: string, id: string | number): string {
    return `/${resourceType}/${id}`;
  },

  delete(resourceType: string, id: string | number): string {
    return `/${resourceType}/${id}`;
  },
};

export default urlSerializer;
