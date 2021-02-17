import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const DateDisplay = ({ date, dayOnly, fallback, forceLocale }) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const locale = forceLocale || language;

  if (!date || !locale) {
    return fallback || t('date.undefined');
  }

  if (dayOnly) {
    return new Date(date).toLocaleDateString(locale);
  }

  return new Date(date).toLocaleString(locale).slice(0, -3);
};

DateDisplay.defaultProps = {
  date: undefined,
  dayOnly: false,
  fallback: undefined,
  forceLocale: undefined,
};

DateDisplay.propTypes = {
  date: PropTypes.string,
  dayOnly: PropTypes.bool,
  fallback: PropTypes.node,
  forceLocale: PropTypes.string,
};

export default React.memo(DateDisplay);
