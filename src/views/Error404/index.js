import React from 'react';
import { NavLink } from 'react-router-dom';
import { H1 } from '@blueprintjs/core';
import { Trans, useTranslation } from 'react-i18next';

import './error404.scss';

const Error404View = () => {
  const { t } = useTranslation();
  return (
    <div className="error-404">
      <H1 className="error-404--title">{t('error.404.title')}</H1>
      <p className="error-404--message">
        <Trans i18nKey="error.404.message">
          Go back to <NavLink to="/">homepage</NavLink>
        </Trans>
      </p>
    </div>
  );
};

export default Error404View;
