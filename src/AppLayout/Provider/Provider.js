import React from 'react';

import { fitZoom } from '@terralego/core/modules/Map/services/mapUtils';

import { context } from '../context';

import { fetchPaginatedFilteredViewpoints } from '../../services/viewpoints';
import { connectSettingsProvider } from '../../components/SettingsProvider';

const { Provider } = context;

// Force the obtaining of all viewpoints
const forceItemPage = 999;
const padding = { top: 200, bottom: 200, left: 200, right: 200 };

export class AppProvider extends React.Component {
  state = {
    isNavBarVisible: true,
    isSearchUnfold: false,
    isResultUnfold: false,
    mapIsResizing: false,
    map: {},
    mapPosition: {},
    filteredViewpoints: {
      current: {},
    },
    allFilteredFeatures: [],
    searchFormProperties: {},
  };

  componentWillUnmount () {
    this.isUnmount = true;
  }

  /**
   * Get the first page of filtered viewpoints
   * Prevent page conflict when updating filters
   * Get all filtered viewpoints to display on map
   * @param data
   * @param page
   * @param itemsPerPage
   * @returns {Promise<boolean>}
   */
  getFirstPageFilteredViewpoints = async (data, itemsPerPage, page) => {
    const { map, isResultUnfold } = this.state;
    try {
      const currentPagedFilteredViewpoints = await fetchPaginatedFilteredViewpoints({
        data,
        page,
        itemsPerPage,
      });

      const allFilteredViewpoints = await fetchPaginatedFilteredViewpoints({
        data,
        page,
        itemsPerPage: forceItemPage,
      });

      const allFilteredFeatures = allFilteredViewpoints.results.map(({
        point: geometry,
        id,
        label,
        city,
        picture: { thumbnail },
      }) => ({
        geometry,
        properties: {
          viewpoint_id: id,
          viewpoint_label: label,
          viewpoint_picture: thumbnail,
          viewpoint_city: city,
        },
      }));

      this.setState(
        {
          filteredViewpoints: {
            current: currentPagedFilteredViewpoints,
            [page]: currentPagedFilteredViewpoints,
          },
          filters: data,
          allFilteredFeatures,
        },
        () => map.fire('refreshCluster'),
      );

      if (allFilteredFeatures.length > 0) {
        if (allFilteredFeatures.length === 1) {
          const { point: { coordinates } } = allFilteredFeatures[0];
          map.easeTo({ center: coordinates });
        } else if (isResultUnfold) {
          fitZoom({ feature: allFilteredFeatures, map, padding });
        } else {
          // We need to wait for the result to unfold and the map to have resized
          map.once(
            'resize',
            () => fitZoom({ feature: allFilteredFeatures, map, padding }),
          );
        }
      }
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return false;
    }
  };

  /**
   * Get filtered viewpoint according to page
   * @param page
   * @param itemsPerPage
   * @returns {Promise<void>}
   */
  getPaginatedFilteredViewpoints = async (itemsPerPage, page) => {
    const { filteredViewpoints: { [page]: existingPagedViewpoints }, filters } = this.state;

    if (existingPagedViewpoints) {
      this.setState(prevState => ({
        filteredViewpoints: {
          ...prevState.filteredViewpoints,
          current: existingPagedViewpoints,
        },
      }));
    }

    try {
      const currentPagedFilteredViewpoints = await fetchPaginatedFilteredViewpoints({
        data: filters,
        page,
        itemsPerPage,
      });
      this.setState(prevState => ({
        filteredViewpoints: {
          ...prevState.filteredViewpoints,
          current: currentPagedFilteredViewpoints,
          [page]: currentPagedFilteredViewpoints,
        },
      }));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  resetSearchForm = async () => {
    const { isResultUnfold } = this.state;
    this.setSearchFormProperties({});
    await this.getFirstPageFilteredViewpoints({});
    isResultUnfold && this.toggleResultFoldedState();
    this.setState({
      filteredViewpoints: {
        results: null,
      },
    });
  };

  resetMapInitialState = () => {
    const { map } = this.state;
    const { configMap } = this.props;
    map.easeTo({ center: configMap.center, zoom: configMap.zoom });
  };

  setMapPosition = () => {
    const { map } = this.state;
    return this.setState({
      mapPosition: {
        lat: map.getCenter().lat,
        lng: map.getCenter().lng,
        zoom: map.getZoom(),
      },
    });
  };

  setMap = map => {
    if (!this.isUnmount) {
      map.on('zoomend', this.setMapPosition);
      map.on('moveend', this.setMapPosition);
      this.setState({ map });
    }
  };

  forceResultUnfolding = () => {
    const { isResultUnfold } = this.state;
    this.setState({ isResultUnfold: true }, () => !isResultUnfold && this.resizingMap());
  };

  resizingMap = () => {
    const { map } = this.state;
    this.setState({ mapIsResizing: true });
    setTimeout(() => {
      if (map && map.resize) {
        map.resize();
      }

      if (this.isUnmount) return;

      this.setState({ mapIsResizing: false });
    }, 800);
  };

  toggleSearchFoldedState = () => {
    this.setState(({ isSearchUnfold }) => ({ isSearchUnfold: !isSearchUnfold }));
    this.resizingMap();
  };

  toggleResultFoldedState = () => {
    this.setState(({ isResultUnfold }) => ({ isResultUnfold: !isResultUnfold }));
    this.resizingMap();
  };

  toggleNavBar = () => {
    this.setState(({ isNavBarVisible }) => ({ isNavBarVisible: !isNavBarVisible }));
    this.resizingMap();
  };

  setSearchFormProperties = properties => {
    this.setState({ searchFormProperties: properties });
  };

  interactiveMapInit = ({ addHighlight, removeHighlight }) =>
    this.setState({ addHighlight, removeHighlight });

  onMouseEnterResult = id => {
    const { addHighlight } = this.state;
    addHighlight({
      layerId: 'viewpoints-unclustered-0',
      featureId: id,
      propertyId: 'viewpoint_id',
      highlightColor: 'red',
      source: true,
      unique: true,
    });
  };

  onMouseLeaveResult = id => {
    const { removeHighlight } = this.state;

    removeHighlight({ layerId: 'viewpoints-unclustered-0', featureId: id });
  };

  render () {
    const {
      isNavBarVisible,
      isSearchUnfold,
      isResultUnfold,
      mapIsResizing,
      filteredViewpoints,
      allFilteredFeatures,
      mapPosition,
      searchFormProperties,
    } = this.state;
    const { children } = this.props;
    return (
      <Provider
        value={{
          isNavBarVisible,
          isSearchUnfold,
          isResultUnfold,
          mapIsResizing,
          filteredViewpoints,
          allFilteredFeatures,
          mapPosition,
          searchFormProperties,
          actions: {
            toggleSearchFoldedState: this.toggleSearchFoldedState,
            toggleResultFoldedState: this.toggleResultFoldedState,
            forceResultUnfolding: this.forceResultUnfolding,
            setMap: this.setMap,
            resizingMap: this.resizingMap,
            getFirstPageFilteredViewpoints: this.getFirstPageFilteredViewpoints,
            getPaginatedFilteredViewpoints: this.getPaginatedFilteredViewpoints,
            toggleNavBar: this.toggleNavBar,
            setSearchFormProperties: this.setSearchFormProperties,
            interactiveMapInit: this.interactiveMapInit,
            onMouseEnterResult: this.onMouseEnterResult,
            onMouseLeaveResult: this.onMouseLeaveResult,
            resetSearchForm: this.resetSearchForm,
            resetMapInitialState: this.resetMapInitialState,
          },
        }}
      >
        {children}
      </Provider>
    );
  }
}

export default connectSettingsProvider(({ env: { map } }) => ({
  configMap: map,
}))(AppProvider);
