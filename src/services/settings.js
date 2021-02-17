import Api from '@terralego/core/modules/Api';
import merge from 'deepmerge';

const SETTINGS_PATH = '/settings.json';

const DEFAULT_SETTINGS = {
  favicon: '/favicon.png',
  title: 'TerraOPP',
  version: 'v0.1',
  credits: 'Source: TerraOpp',
  map: {
    minZoom: 6,
    maxZoom: 20,
  },
  theme: {
    logo: '/images/logo.png',
    logoUrl: '/',
    styles: [],
  },
};

const getCustomSettings = async () => {
  try {
    const customSettings = await fetch(SETTINGS_PATH);
    return await customSettings.json();
  } catch (e) {
    return {};
  }
};

export const getSettings = async () => {
  const customSettings = await getCustomSettings();
  const APISettings = await Api.request('settings/');
  // Legacy API returns `configMap` instead of `map`
  if (APISettings.map === undefined) {
    APISettings.map = APISettings.configMap;
  }
  return merge.all([DEFAULT_SETTINGS, customSettings, APISettings]);
};

export default getSettings;
