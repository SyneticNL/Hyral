import HttpConnector from './Core/Connector/HttpConnector';
import ResourceManager from './Core/Resource/ResourceManager';
import jsonApiTransformers from './Core/Transformers/JsonApi/JsonApi';
import ParameterBag from './Core/Resource/ParameterBag';
import Collection from './Core/Resource/Collection';
import createVuexPlugin from './Integrations/Vue/createVuexPlugin';
import VueCollectionMixin from './Integrations/Vue/Mixin/Collection';
import VueResourceMixin from './Integrations/Vue/Mixin/Resource';

export default {
  Vue: {
    createVuexPlugin,
    Mixin: {
      VueCollectionMixin,
      VueResourceMixin,
    },
  },
  jsonApiTransformers,
  ParameterBag,
  Collection,
  HttpConnector,
  ResourceManager,
};
