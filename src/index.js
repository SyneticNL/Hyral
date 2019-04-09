import createHttpConnector from './Connector/CreateHttpConnector';
import RepositoryManager from './Resource/Repository/RepositoryManager';
import jsonApiParamsSerializer from './Transformers/JsonApi/paramsSerializer';
import jsonApiResponseNormalizer from './Transformers/JsonApi/responseNormalizer';
import jsonApiRequestSerializer from './Transformers/JsonApi/requestSerializer';
import jsonApiUrlSerializer from './Transformers/JsonApi/urlSerializer';
import ParameterBag from './Resource/ParameterBag';
import Collection from './Resource/Resource/Collection';

const jsonApiTransformers = {
  paramsSerializer: jsonApiParamsSerializer,
  responseNormalizer: jsonApiResponseNormalizer,
  requestSerializer: jsonApiRequestSerializer,
  urlSerializer: jsonApiUrlSerializer,
};

export {
  jsonApiTransformers,
  ParameterBag,
  Collection,
  createHttpConnector,
  RepositoryManager,
};
