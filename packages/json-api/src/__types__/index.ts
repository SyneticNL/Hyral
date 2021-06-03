import { INormalizedResponse, IResource } from '@hyral/core';

// =====
// TYPES
// =====
export type IserializedFilter = { filter?: Record<string, string> };
export type IserializedPaging = { page?: Record<string, unknown> };
export type IserializedSorting = { sort?: string };
export type ISerializedParams = Record<string, unknown>;

export type IData = Record<string, any>;

export type IJsonApiResource = {
  id: string | number;
  type: string;
  attributes: Record<string, any>;
  relationships: Record<string, IResource<IData>>;
  meta: Record<string, any>;
};

export type IJsonApiResponse = {
  included: IJsonApiResource[];
  data: IJsonApiResource[] | IJsonApiResource | null;
  links: Record<string, string>;
  jsonapi: {
    version: string;
  }
  metadata: any;
  errors: any;
};

// The response object is made of a normalized response or the api response itself
export type IResponse = INormalizedResponse<any> | IJsonApiResponse;
