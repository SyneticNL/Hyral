const ResourceManager = {};

Object.assign(ResourceManager, {
  /**
   * @param {Resource} resource
   */
  freezeResource(resource) {
    Object.freeze(resource.state);
  },
});

export default ResourceManager;
