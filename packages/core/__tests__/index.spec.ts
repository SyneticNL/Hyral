import * as core from '../src';

import HttpConnector from '../src/Connector/HttpConnector';
import repositoryManager from '../src/Resource/repositoryManager';
import Resource from '../src/Resource/Resource';
import ParameterBag from '../src/Resource/ParameterBag';
import Collection from '../src/Resource/Collection';
import Task from '../src/Resource/Task/Task';

describe('the core index', () => {
  test('that core exports the correct features', () => {
    expect(core).toEqual(expect.objectContaining({
      ParameterBag,
      Collection,
      Resource,
      Task,
      HttpConnector,
      repositoryManager,
    }));
  });
});
