/**
 * @file
 * A decorator that adds all parameterBag functions to the collection for easy use.
 */

/**
 * @param collection
 * @param {string} key
 * @param {object} propertyDescriptor
 * @returns {object}
 */
function createProxyProperty(collection, key, propertyDescriptor) {
  if (typeof propertyDescriptor.value !== 'function') {
    return Object.assign(
      propertyDescriptor,
      {
        get: () => collection.parameterBag[key],
      },
    );
  }

  return Object.assign(
    propertyDescriptor,
    {
      value: (...params) => {
        const { parameterBag } = collection;
        parameterBag[key].apply(null, params);

        // eslint-disable-next-line no-param-reassign
        collection.parameterBag = parameterBag;
      },
    },
  );
}

/**
 * @param collection
 *
 * @returns {object}
 */
export default function collectionParameterBagDecorator(collection) {
  const { parameterBag } = collection;

  Object.defineProperties(
    collection,
    Object.keys(parameterBag)
      .filter(key => ['state', 'stateStack', 'stateId'].indexOf(key) === -1)
      .reduce((properties, key) => Object.assign(
        properties,
        {
          [key]: createProxyProperty(
            collection,
            key,
            Object.getOwnPropertyDescriptor(parameterBag, key),
          ),
        },
      ),
      {}),
  );

  return collection;
}
