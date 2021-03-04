import React from 'react';
import { useTranslation } from 'react-i18next';
import IconBlock from '../../../../../components/IconBlock';
import CollapsiblePanel from '../../../../../components/CollapsiblePanel';
import DateDisplay from '../../../../../components/DateDisplay';

import { connectViewpointProvider } from '../../../context';
import Minimap from './Minimap';

export const InformationTab = ({
  viewpoint: {
    city,
    pictures,
    themes,
    properties: { site, voie },
  },
}) => {
  const { t } = useTranslation();
  return (
    <div className="panel-details">
      <CollapsiblePanel title={t('viewPoint.detail.information.location')}>
        <Minimap />
        {(voie || city || site) && (
          <IconBlock
            title={t('viewPoint.detail.information.locationContent')}
            icon="map-marker"
            content={`${site || voie || city}`}
          />
        )}
      </CollapsiblePanel>
      <CollapsiblePanel
        title={t('viewPoint.detail.information.rephotography')}
        initialState={false}
      >
        {pictures && (
          <IconBlock
            title={t('viewPoint.detail.information.rephotographyContent', {
              count: pictures.length,
            })}
            icon="calendar"
            content={
              <ul>
                {pictures.map(({ id, date }) => (
                  <li key={id}>
                    <DateDisplay date={date} />
                  </li>
                ))}
              </ul>
            }
          />
        )}
      </CollapsiblePanel>
      {themes && (
        <CollapsiblePanel title={t('viewPoint.detail.information.landscapes')} initialState={false}>
          <IconBlock
            title={t('viewPoint.detail.information.landscapesContent')}
            icon="tag"
            content={[...new Set(themes)].map(theme => (
              <p key={theme} className="badge">
                {theme}
              </p>
            ))}
          />
        </CollapsiblePanel>
      )}
    </div>
  );
};

export default connectViewpointProvider('viewpoint')(InformationTab);
