import {
  currentState,
  mutateState,
  setState,
} from '../../src/State/State';

describe('The State', () => {
  test('that the current state can be retrieved', () => {
    const state = [{ prop: 'value' }];

    expect(currentState(state)).toHaveProperty('prop');
    expect(currentState(state).prop).toEqual('value');
  });

  test('that the state can be set', () => {
    const state = [{ prop: 'value' }];

    setState(state, { prop: 'new value', otherProp: 'other value' });

    expect(state).toHaveLength(2);
    expect(currentState(state)).toHaveProperty('prop');
    expect(currentState(state)).toHaveProperty('otherProp');
    expect(currentState(state).prop).toEqual('new value');
    expect(state[0].prop).toEqual('value');
  });

  test('that a state can be set via mutation', () => {
    const state = [{ prop: 'value' }];

    mutateState(state, { otherProp: 'other value' });

    expect(state).toHaveLength(2);
    expect(currentState(state)).toHaveProperty('prop');
    expect(currentState(state)).toHaveProperty('otherProp');
    expect(currentState(state).prop).toEqual('value');
    expect(currentState(state).otherProp).toEqual('other value');
    expect(state[0].prop).toEqual('value');
  });

  test('that a complex object retains it original reference when not touched via mutateState', () => {
    const otherObject = {
      get getterProp() {
        return 'getterProp value';
      },
    };

    const resource = {
      data: {
        test: 1,
      },
      prop: 'value',
      nonReplacedProp: 'exists',
      otherObject,
    };

    const state = [resource];

    expect(currentState(state)).toHaveProperty('prop');
    expect(currentState(state)).toHaveProperty('otherObject');
    expect(currentState(state)).toHaveProperty('nonReplacedProp');
    expect(currentState(state).otherObject).toHaveProperty('getterProp');
    expect(currentState(state).otherObject.getterProp).toEqual('getterProp value');

    mutateState(state, {
      data: {
        test: 2,
      },
      prop: 'new value',
      otherObject,
    });

    expect(currentState(state).otherObject).toBe(otherObject);
    expect(currentState(state).prop).toEqual('new value');
    expect(currentState(state).data.test).toEqual(2);
    expect(currentState(state)).toHaveProperty('nonReplacedProp');
    expect(state[0].prop).toEqual('value');
    expect(state[0].data.test).toEqual(1);
  });
});
