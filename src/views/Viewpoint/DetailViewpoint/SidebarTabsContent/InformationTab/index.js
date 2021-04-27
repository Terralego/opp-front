import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Api from '@terralego/core/modules/Api';

import { useQuery } from 'react-query';
import IconBlock from '../../../../../components/IconBlock';
import CollapsiblePanel from '../../../../../components/CollapsiblePanel';
import DateDisplay from '../../../../../components/DateDisplay';

import { connectViewpointProvider } from '../../../context';
import { useSettings } from '../../../../../components/SettingsProvider';
import Minimap from './Minimap';

const pageSize = 100;

export const InformationTab = ({
  viewpoint: {
    city,
    pictures,
    themes,
    properties: { site, voie },
  },
}) => {
  const { t } = useTranslation();
  const {
    modules: {
      OPP: { theme_categories: themeCategories },
    },
  } = useSettings();

  const getViewpointInfos = useCallback(
    (streetName, cityName, siteName) => {
      if (streetName || cityName) {
        return [streetName, cityName].filter(Boolean).join(' - ');
      }
      return siteName || t('viewpoint.detail.information.no-info');
    },
    [t],
  );

  const { data: allThemes, loaded } = useQuery('themes', async () => {
    // First page to know total
    const { results: firstPage, num_pages: pageCount } = await Api.request('themes/', {
      querystring: { page_size: pageSize },
    });

    // Get all next pages
    const all = await Promise.all(
      Array.from({ length: pageCount - 1 }, async (_, index) => {
        const { results: nextPage } = await Api.request('themes/', {
          querystring: { page_size: pageSize, page: index + 2 },
        });
        return nextPage;
      }),
    );

    // Flatten all results
    return [firstPage, ...all].flat(1);
  });

  const themeMap = React.useMemo(
    () =>
      loaded
        ? allThemes
            .filter(({ label }) => themes.includes(label))
            .reduce((acc, theme) => {
              if (!acc[theme.category]) {
                acc[theme.category] = [];
              }
              acc[theme.category].push(theme);
              return acc;
            }, {})
        : {},
    [allThemes, loaded, themes],
  );

  return (
    <div className="panel-details">
      <CollapsiblePanel title={t('viewPoint.detail.information.location')}>
        <Minimap />
        {(voie || city || site) && (
          <IconBlock
            title={t('viewPoint.detail.information.locationContent')}
            icon="map-marker"
            content={getViewpointInfos(voie, city, site)}
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
          {themeMap &&
            themeCategories
              .filter(({ id }) => Object.keys(themeMap).includes(id))
              .map(({ id, name, color }) => {
                if (themeMap[id]) {
                  return (
                    <IconBlock
                      title={name}
                      icon="tag"
                      content={themeMap[id].map(({ label }) => (
                        <p key={label} className="badge" style={{ backgroundColor: color }}>
                          {label}
                        </p>
                      ))}
                    />
                  );
                }
                return null;
              })}
        </CollapsiblePanel>
      )}
    </div>
  );
};

export default connectViewpointProvider('viewpoint')(InformationTab);
