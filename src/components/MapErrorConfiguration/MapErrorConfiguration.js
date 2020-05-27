import React, { useEffect } from 'react';
import { Callout, Intent } from '@blueprintjs/core';
import { useTranslation } from 'react-i18next';

const MapErrorConfiguration = props => {
  const { t } = useTranslation();
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("'accessToken' or 'backgroundStyle' keys from `map` settings are missing. Please verify your `settings.json` file or `api/settings` response.");
  }, []);
  return (
    <Callout
      intent={Intent.DANGER}
      title={t('map.error.configuration.title')}
      {...props}
    >
      <div>{t('map.error.configuration.information')}</div>
      <p>{t('map.error.configuration.contact')}</p>
    </Callout>
  );
};

export default MapErrorConfiguration;
