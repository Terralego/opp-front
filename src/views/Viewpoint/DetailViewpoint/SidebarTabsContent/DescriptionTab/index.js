import React from 'react';
import { Button, Classes } from '@blueprintjs/core';

import { useTranslation } from 'react-i18next';
import CollapsiblePanel from '../../../../../components/CollapsiblePanel';

import { connectViewpointProvider } from '../../../context';
import DownloadButton from '../../../../../components/DownloadButton';

const iconMapping = {
  image: 'media',
  xls: 'th',
};

export const DescriptionTab = ({ viewpoint: {
  related,
  properties: { histoire, dynamiques, paysage },
} }) => {
  const { t } = useTranslation();
  return (
    <div className="panel-details">
      {paysage && (
        <CollapsiblePanel title={t('viewPoint.detail.description.landscape')} initialState={false}>
          {/* eslint-disable-next-line react/no-danger */}
          <div className="panel-content" dangerouslySetInnerHTML={{ __html: paysage }} />
        </CollapsiblePanel>
      )}
      {histoire && (
        <CollapsiblePanel title={t('viewPoint.detail.description.history')} initialState={false}>
          {/* eslint-disable-next-line react/no-danger */}
          <div className="panel-content" dangerouslySetInnerHTML={{ __html: histoire }} />
        </CollapsiblePanel>
      )}
      {dynamiques && (
        <CollapsiblePanel title={t('viewPoint.detail.description.dynamics')} initialState={false}>
          {/* eslint-disable-next-line react/no-danger */}
          <div className="panel-content" dangerouslySetInnerHTML={{ __html: dynamiques }} />
        </CollapsiblePanel>
      )}
      {!!related.length && (
        <CollapsiblePanel title={t('viewPoint.detail.description.documents')} initialState={false}>
          <div className="panel-content panel-content--related_documents">
            {related.map(({ document, key }) => {
              const [MIMEType] = document.split(':')[1].split(';');
              const [type, extension] = MIMEType.split('/');
              return (
                <DownloadButton
                  endpoint={document}
                  as={Button}
                  filename={`${key}.${extension}`}
                  size={25}
                  className={Classes.MINIMAL}
                  icon={iconMapping[type] || 'document'}
                  key={key}
                >
                  {key.charAt(0).toUpperCase()}{key.slice(1)}
                </DownloadButton>
              );
            })}
          </div>
        </CollapsiblePanel>
      )}
    </div>
  );
};

export default connectViewpointProvider('viewpoint')(DescriptionTab);
