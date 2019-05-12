import jsonApiParamsSerializer from './Request/paramsSerializer';
import jsonApiResponseNormalizer from './Response/responseNormalizer';
import jsonApiRequestSerializer from './Request/requestSerializer';
import jsonApiUrlSerializer from './Request/urlSerializer';
import jsonApiUrlSerializerPlural from './Request/urlSerializerPlural';


const jsonApi = {
  paramsSerializer: jsonApiParamsSerializer,
  responseNormalizer: jsonApiResponseNormalizer,
  requestSerializer: jsonApiRequestSerializer,
  urlSerializer: jsonApiUrlSerializer,
};

export const jsonApiPlural = {
  paramsSerializer: jsonApiParamsSerializer,
  responseNormalizer: jsonApiResponseNormalizer,
  requestSerializer: jsonApiRequestSerializer,
  urlSerializer: jsonApiUrlSerializerPlural,
};

export default jsonApi;
