import React from 'react';

import { useTranslation } from 'react-i18next';
import CollapsiblePanel from '../../../../../components/CollapsiblePanel';

import { connectViewpointProvider } from '../../../context';

const labelFromDocument = ({ key, properties: { label = key } }) => label;

const filenameFromDocument = ({ document, properties: { label } }) => {
  // source: https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
  const ext = document.slice((Math.max(0, document.lastIndexOf('.')) || Infinity) + 1);
  const name = label.replace(' ', '_').toLocaleLowerCase();
  return ext ? `${name}.${ext}` : name;
};

const linkStyle = {
  backgroundColor: 'rgba(216, 216, 216, 0.3)',
  padding: '0.5em',
  margin: '0 5px',
  borderRadius: '3px',
  color: 'white',
};

export const DescriptionTab = ({
  viewpoint: {
    related,
    properties: { histoire, dynamiques, paysage },
  },
}) => {
  const { t } = useTranslation();

  // Keep only type doc files and add meta info
  const docList = React.useMemo(
    () =>
      related
        .filter(({ properties: { type } }) => type === 'doc')
        .map(document => ({
          ...document,
          label: labelFromDocument(document),
          filename: filenameFromDocument(document),
        })),
    [],
  );

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
        <CollapsiblePanel title={t('viewPoint.detail.description.documents')} initialState>
          <div className="panel-content panel-content--related_documents">
            {docList.map(({ key, document, label, filename }) => (
              <a
                href={document}
                key={key}
                download={filename}
                style={linkStyle}
                target="_blank"
                rel="noreferrer noopener"
              >
                {label}
              </a>
            ))}
          </div>
        </CollapsiblePanel>
      )}
    </div>
  );
};

export default connectViewpointProvider('viewpoint')(DescriptionTab);
