import { isEmpty, isError, mapValues, attempt } from 'lodash';
import DEFAULTS from '../constants/defaultValues';
import {objectFields} from "../constants/listOfFields";

export const getFieldsWithMaxWeight = wObj => {
  const complexFields = [
    objectFields.button,
    objectFields.address,
    objectFields.website,
    objectFields.link,
    objectFields.status,
  ];
  if (!wObj || (wObj && isEmpty(wObj.fields))) return '';
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
  maxWeightedFields = mapValues(maxWeightedFields, 'body');
  complexFields.forEach(field => {
    if (maxWeightedFields[field]) {
      const parsed = attempt(JSON.parse, maxWeightedFields[field]);
      if (!isError(parsed)) maxWeightedFields[field] = parsed;
    }
  });
  return maxWeightedFields;
};

export const getClientWObj = serverWObj => {
  /* eslint-disable no-underscore-dangle */
  /* eslint-disable camelcase */
  const {
    author_permlink,
    followers_names,
    weight,
    created_at,
    updated_at,
    user_count,
    object_type,
  } = serverWObj;

  if (!serverWObj || isEmpty(serverWObj)) return {};
  const result = {
    id: author_permlink,
    avatar: DEFAULTS.AVATAR,
    weight: weight || '',
    createdAt: created_at || Date.now(),
    updatedAt: updated_at || Date.now(),
    userCount: user_count || 0,
    followersNames: followers_names,
    type: (object_type && object_type.toLowerCase()) || 'item',
    ...getFieldsWithMaxWeight(serverWObj),
    ...serverWObj,
  };

  if (serverWObj.parent) {
    if (result.avatar === DEFAULTS.AVATAR) {
      const parentFieldMaxWeight = getFieldsWithMaxWeight(serverWObj.parent);
      if (parentFieldMaxWeight && parentFieldMaxWeight.avatar) {
        result.avatar = parentFieldMaxWeight.avatar;
      }
    }
  }

  return result;
};


export default null;
