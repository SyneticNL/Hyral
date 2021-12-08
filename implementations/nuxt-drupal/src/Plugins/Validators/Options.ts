import isEmpty from 'lodash/isEmpty';
import { IMapping, IOptions } from '../../__types__';

/**
 * Checks the validity of the options
 */
export const validateOptions = (options: IOptions<IMapping>): void => {
  if (!options) throw new Error('DrupalNuxtPlugin requires options as a parameter');
};

/**
 * Checks the validity of the mapping.
 *
 * @param options: IOptions<IMapping>
 */
export const validateMapping = (options: IOptions<IMapping>): void => {
  const { mapping } = options;

  if (!mapping) {
    throw new Error('DrupalNuxtPlugin requires a mapping in options');
  }

  const isFunction = (entry: any) => typeof entry === 'function';
  const isRecordOfFunctions = (entry: any) => !Object.values(entry).some((item) => typeof item !== 'function');
  const isNull = (entry: any) => entry === null;

  Object.values(mapping).forEach((entry) => {
    const error = 'Mapping should consist of: \n\n1: An async component\n2: A record of async components \n3: Have a null value';

    if (!(isNull(entry) || isFunction(entry) || (isRecordOfFunctions(entry) && !isEmpty(entry)))) {
      throw Error(error);
    }
  });
};
