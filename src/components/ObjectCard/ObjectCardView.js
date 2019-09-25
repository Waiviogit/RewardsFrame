import { Icon } from 'antd';
import React from 'react';
import _ from 'lodash';
import RatingsWrap from './RatingsWrap/RatingsWrap';
// import WeightTag from '../components/WeightTag';
import { objectFields as objectTypes } from '../../constants/listOfFields';
import './ObjectCardView.less';
import DEFAULTS from "../../constants/defaultValues";
import {getFieldWithMaxWeight} from "../../helpers/wObjectHelper";

const ObjectCardView = ({ wObject, showSmallVersion = false, pathNameAvatar }) => {
  const getObjectRatings = () => _.filter(wObject.fields, ['name', 'rating']);
  const pathName = pathNameAvatar || `/object/${wObject.id}`;
  const ratings = getObjectRatings();

  const avatarLayout = (avatar = DEFAULTS.AVATAR) => {
    let url = avatar;
    if (_.includes(url, 'waivio.')) url = `${url}_medium`;

    return (
      <div
        className="avatar-image"
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    );
  };
  const parentName = wObject.parent ? getFieldWithMaxWeight(wObject.parent, objectTypes.name) : '';
  const goToObjTitle = wobjName => 'go to wobj';
  return (
    <React.Fragment>
      <div className="ObjectCardView">
        <div className="ObjectCardView__content">
          <div className="ObjectCardView__content-row">
            <a
              href={pathName}
              title={goToObjTitle(wObject.name)}
              className="ObjectCardView__avatar"
            >
              {avatarLayout(wObject.avatar)}
            </a>
            <div className={`ObjectCardView__info${showSmallVersion ? ' small' : ''}`}>
              {parentName && (
                  <a
                      href={`/object/${wObject.parent.author_permlink}`}
                  title={goToObjTitle(parentName)}
                  className="ObjectCardView__type"
                >
                  {parentName}
                </a>
              )}
              <div className="ObjectCardView__name">
                <a
                    href={pathName}
                  className="ObjectCardView__name-truncated"
                  title={goToObjTitle(wObject.name)}
                >
                  {wObject.name}
                </a>
                {/*{wObject.weight && <WeightTag weight={wObject.weight} />}*/}
              </div>
              {ratings && <RatingsWrap ratings={ratings} />}
              {wObject.title && (
                <div className="ObjectCardView__title" title={wObject.title}>
                  {wObject.title}
                </div>
              )}
              {wObject.price && (
                <span className="ObjectCardView__price" title={wObject.price}>
                  <Icon type="dollar" />
                  {wObject.price}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ObjectCardView;
