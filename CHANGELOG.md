
0.2.1 / 2021-04-07
==================

  * Remove feature flag for active viewpoint filtering

0.2.0 / 2021-04-07
==================

  * Upgrade @terralego/core from 1.26.6 to 1.27.0
  * Add active status into properties of filtered features

0.1.3 / 2021-03-31
==================

  * Display identifier instead of properties index in picture meta data
  * Add feature flag for active viewpoint retrieve
  * Fix photographer name in search and metadata

0.1.2 / 2021-03-30
==================

  * Retrieve active viewpoint only
  * Add translation for weather condition

0.1.1 / 2021-03-04
==================

  * Fix after upgrade


0.1.0 / 2021-02-21
==================

  * Parametize base layer config
  * Update mapbox-gl
  * Update some deps
  * Fix prettier
  * Update deps
  * Minimap config wait for dedicated config or fallback to map config
  * Upscale default map maxzoom to 20
  * Add scale control to Minimap
  * Changing viewpoints properties properties__commune to city and properties__themes to themes
  * Changing search properties properties__commune to city and properties__themes to themes
  * Remove some useless i18n code
  * Rename SyncMap component to Minimap
  * Remplace the SyncMap by a minimap
  * Put active style for MainMenu
  * Add placeholder to invite the user to drag and drop picture
  * Avoid app to crash when the key CompareItem passed from picture to null
  * Filters properties in search form by filled fields
  * Avoid manipulation of state if SearchForm component was unmounted
  * Add translations to SearchForm component
  * Render SearchForm as a functional component
  * Move SearchForm propTypes outside of the component
  * Set locales to map default buttons
  * Upgrade i18next and react-i18next packages
  * Make oppInformation popin responsive
  * Update Header component to fit with the breaking change from terralego/core
  * Upgrade @terralego/core package to 1.24.1
  * Changing viewpoint pdf generation url
  * Changing viewpoint zip pictures url
  * Set generated name for photographer with no name
  * Remove useless rawdata state
  * Use Photographer ID as value instead of his name in the search form
  * Remove useless translateMock
  * Add some locales
  * App won't crash anymore if viewpoint has no pictures
  * Fix some translations
  * Use Helmet to change dynamically HEAD content tag
  * Install 'react-helmet' package
  * Settings can force the language to use
  * Let the browser detection define the language of the App
  * Add "en" locales
  * Set default logo
  * improve readme
  * First commit
