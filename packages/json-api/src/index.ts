import jsonApiParamsSerializer from './Request/paramsSerializer';
import jsonApiRequestSerializer from './Request/requestSerializer';
import jsonApiUrlSerializer from './Request/urlSerializer';
import jsonApiResponseNormalizer from './Response/responseNormalizer';

export default {
  paramsSerializer: jsonApiParamsSerializer,
  responseNormalizer: jsonApiResponseNormalizer,
  requestSerializer: jsonApiRequestSerializer,
  urlSerializer: jsonApiUrlSerializer,
};

export * from './__types__';
