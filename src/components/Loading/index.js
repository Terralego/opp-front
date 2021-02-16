import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import { Spinner } from '@blueprintjs/core';

import './styles.scss';

export const Loading = ({ className, ...props }) => {
  const { t } = useTranslation();
  return (
    <div aria-label={t('common.loading')} className={classnames(className, 'loading')} {...props}>
      <Spinner />
    </div>
  );
};

Loading.propTypes = {
  className: PropTypes.string,
};

Loading.defaultProps = {
  className: '',
};
export default Loading;
