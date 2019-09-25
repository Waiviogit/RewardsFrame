import _ from 'lodash';
import {
  supportedObjectFields,
  objectFieldsWithInnerData,
  objectFields,
} from '../constants/listOfFields';

export const getFieldWithMaxWeight = (wObject, currentField, defaultValue = '') => {
  if (!wObject || !currentField || !supportedObjectFields.includes(currentField))
    return defaultValue;

  const fieldValues = _.filter(wObject.fields, ['name', currentField]);
  if (!fieldValues.length) return defaultValue;

  const orderedValues = _.orderBy(fieldValues, ['weight'], ['desc']);

  if (!_.isEmpty(orderedValues[0].body)) return orderedValues[0].body;
  return defaultValue;
};

export const getFieldsWithMaxWeight = wObj => {
  const complexFields = [
    objectFields.button,
    objectFields.address,
    objectFields.website,
    objectFields.link,
    objectFields.status,
  ];
  if (!wObj || (wObj && _.isEmpty(wObj.fields))) return '';
  let maxWeightedFields = wObj.fields
    .filter(f => !Object.keys(wObj).includes(f.name))
    .reduce((acc, curr) => {
      if (acc[curr.name]) {
        if (curr.weight > acc[curr.name].weight) {
          acc[curr.name] = curr;
        }
      } else {
        acc[curr.name] = curr;
      }
      return acc;
    }, {});
  maxWeightedFields = _.mapValues(maxWeightedFields, 'body');
  complexFields.forEach(field => {
    if (maxWeightedFields[field]) {
      const parsed = _.attempt(JSON.parse, maxWeightedFields[field]);
      if (!_.isError(parsed)) maxWeightedFields[field] = parsed;
    }
  });
  return maxWeightedFields;
};

export const getInnerFieldWithMaxWeight = (wObject, currentField, innerField) => {
  if (_.includes(objectFieldsWithInnerData, currentField)) {
    const fieldBody = getFieldWithMaxWeight(wObject, currentField);
    if (fieldBody) {
      const parsed = _.attempt(JSON.parse, fieldBody);
      if (_.isError(parsed)) return '';
      if (!innerField) return parsed;
      return parsed[innerField];
    }
  }
  return '';
};

export const getFieldsByName = (wObject, currentField) => {
  if (!supportedObjectFields.includes(currentField) || !wObject) return [];
  return _.filter(wObject.fields, ['name', currentField]);
};

