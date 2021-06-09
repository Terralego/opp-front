import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';

import { Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import translateMock from '../../../../utils/translate';

import './result-item.scss';

const ResultItem = ({
  t,
  id,
  label,
  onMouseEnterResult,
  onMouseLeaveResult,
  picture: { list: picture },
}) => {
  // remove highligh when component is unmounted
  useEffect(() => () => onMouseLeaveResult(id), [onMouseLeaveResult]);
  return (
    <Link
      to={`viewpoint/${id}`}
      className="result"
      onMouseEnter={() => onMouseEnterResult(id)}
      onMouseLeave={() => onMouseLeaveResult(id)}
      onFocus={() => onMouseEnterResult(id)}
      onBlur={() => onMouseLeaveResult(id)}
    >
      <h3 className="result-title">{label}</h3>
      <img className="result-picture" src={picture} alt={label} />
      <Button className="result-action" text={t('map.results.access')} />
    </Link>
  );
};

ResultItem.propTypes = {
  id: PropTypes.number,
  label: PropTypes.string,
  onMouseEnterResult: PropTypes.func,
  onMouseLeaveResult: PropTypes.func,
  t: PropTypes.func,
};

ResultItem.defaultProps = {
  id: 0,
  label: '',
  onMouseEnterResult() {},
  onMouseLeaveResult() {},
  t: translateMock({
    'map.results.access': 'Access',
  }),
};

export default ResultItem;
