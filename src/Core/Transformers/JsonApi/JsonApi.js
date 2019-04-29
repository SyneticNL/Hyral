import jsonApiParamsSerializer from './Request/paramsSerializer';
import jsonApiResponseNormalizer from './Response/responseNormalizer';
import jsonApiRequestSerializer from './Request/requestSerializer';
import jsonApiUrlSerializer from './Request/urlSerializer';

export default {
  paramsSerializer: jsonApiParamsSerializer,
  responseNormalizer: jsonApiResponseNormalizer,
  requestSerializer: jsonApiRequestSerializer,
  urlSerializer: jsonApiUrlSerializer,
};
