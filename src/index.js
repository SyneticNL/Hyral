import createHttpConnector from './Connector/CreateHttpConnector';
import createResourceRepository from './Resource/RepositoryFactory';
import jsonApiParamsSerializer from './Transformers/JsonApi/paramsSerializer';
import jsonApiResponseNormalizer from './Transformers/JsonApi/responseNormalizer';
import jsonApiRequestSerializer from './Transformers/JsonApi/requestSerializer';
import jsonApiUrlSerializer from './Transformers/JsonApi/urlSerializer';
import ParameterBag from './Resource/ParameterBag';

const jsonApiSerializers = {
  pramsSerializer: jsonApiParamsSerializer,
  responseNormalizer: jsonApiResponseNormalizer,
  requestSerializer: jsonApiRequestSerializer,
  urlSerializer: jsonApiUrlSerializer,
};

export { createHttpConnector, jsonApiSerializers, ParameterBag };
export default createResourceRepository;
