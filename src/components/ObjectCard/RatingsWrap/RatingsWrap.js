import React from 'react';
import { Col, Rate, Row } from 'antd';
import { sortBy } from 'lodash';
import { averageRate, avrRate } from '../../../helpers/rateHelper';
import './RatingsWrap.less';

const RatingsWrap = ({ ratings, showSmallVersion = false}) => {
  const sortedRatings = sortBy(ratings, ['body']);
  let layout = null;

  const rateLayout = (colNum, rateIndex, dividerClass) => (
    <Col className={`RatingsWrap__rate ${dividerClass}`} span={colNum}>
      <Rate
        allowHalf
        disabled
        value={averageRate(sortedRatings[rateIndex])}
        className="RatingsWrap__stars"
      />
      <div className="RatingsWrap__rate-title">{sortedRatings[rateIndex].body}</div>
    </Col>
  );
  if (sortedRatings[0]) {
    if (!showSmallVersion) {
      layout = (
        <div className="RatingsWrap">
          <Row>
            {rateLayout(sortedRatings[1] ? 12 : 24, 0, '')}
            {sortedRatings[1] && rateLayout(12, 1, 'RatingsWrap__divider')}
          </Row>
          {sortedRatings[2] && (
            <Row>
              {rateLayout(sortedRatings[3] ? 12 : 24, 2, '')}
              {sortedRatings[3] && rateLayout(12, 3, 'RatingsWrap__divider')}
            </Row>
          )}
        </div>
      );
    } else {
      layout = (
        <div className="RatingsWrap">
          <div className="RatingsWrap-rate">
            <Rate allowHalf disabled value={avrRate(sortedRatings)} />
          </div>
        </div>
      );
    }
  }
  return layout;
};

export default RatingsWrap;
