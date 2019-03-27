
/**
 * @typedef HyralRepository
 * @type {Object}
 * @property {HyralConnector} connector
 * @property {string} resourceType
 * @property {string} identifier
 * @property {function} find
 * @property {function} findOne
 * @property {function} findById
 * @property {function} create
 * @property {function} update
 * @property {function} delete
 */

import Repository from './Repository';

function createResourceRepository(repository, connector, resourceType, identifier = 'id') {
  return Object.create(repository, {
    connector: {
      writable: false,
      enumerable: false,
      value: connector,
    },
    resourceType: {
      writable: false,
      enumerable: false,
      value: resourceType,
    },
    identifier: {
      writable: false,
      enumerable: false,
      value: identifier,
    },
  });
}

export default createResourceRepository.bind({}, Repository);
