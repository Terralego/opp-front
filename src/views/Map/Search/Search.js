import React from 'react';
import PropTypes from 'prop-types';

import { Button, Tab, Tabs } from '@blueprintjs/core';
import classNames from 'classnames';

import SearchForm from './SearchForm';
import { getSchema } from './utils/schemaForm';
import {
  configAdvancedSearch,
  configSimplesSearch,
} from './utils/configForm';

import translateMock from '../../../utils/translate';
import { fetchFilterOptions } from '../../../services/viewpoints';

import './search.scss';

const ID_SEARCH_PANEL = 'search';
const ID_SEARCH_SIMPLE = 'searchSimple_tab';
const ID_SEARCH_ADVANCED = 'searchAdvanced_tab';

const itemsPerPage = 5;

const getValuesFilters = (schemaForm, { photographers, ...data }) => {
  const cleanedData = {
    ...data,
    photographers: photographers.map(item => ({
      label: item.properties.name,
      value: item.uuid,
    })),
  };
  return schemaForm.map(filter => {
    const values = cleanedData[filter.name] !== undefined
      ? { values: cleanedData[filter.name] }
      : {};
    return { ...filter, ...values };
  });
};

const getFiltersBySearch = (schemaForm, config) => (
  config.map(name => {
    const index = schemaForm.findIndex(filter => filter.name === name);
    return { ...schemaForm[index] };
  })
);

export class Search extends React.PureComponent {
  static propTypes = {
    isSearchUnfold: PropTypes.bool,
    toggleSearchFoldedState: PropTypes.func,
    t: PropTypes.func,
  };

  static defaultProps = {
    isSearchUnfold: false,
    toggleSearchFoldedState () {},
    t: translateMock({
      'map.title': 'Search viewpoints',
      'map.simple-search': 'Simple Search',
      'map.advanced-search': 'Advanced Search',
    }),
  };

  state = {
    navTabId: ID_SEARCH_SIMPLE,
    simplesSearchFilters: [],
    advancedSearchFilters: [],
  };

  componentDidMount () {
    this.getFilters();
  }


  componentWillUnmount () {
    this.isUnmount = true;
  }

  handleNavSearchTabChange = navTabId => this.setState({ navTabId });

  getFilters = async () => {
    try {
      const data = await fetchFilterOptions();
      const schema = getSchema(this.props);
      const filters = await getValuesFilters(schema, data);
      if (this.isUnmount) {
        return;
      }
      this.setState({
        simplesSearchFilters: getFiltersBySearch(filters, configSimplesSearch),
        advancedSearchFilters: getFiltersBySearch(filters, configAdvancedSearch),
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  render () {
    const {
      t,
      isSearchUnfold,
      toggleSearchFoldedState,
    } = this.props;
    const {
      navTabId,
      simplesSearchFilters,
      advancedSearchFilters,
    } = this.state;

    return (
      <>
        <div
          className={classNames('search', { search_hide: !isSearchUnfold })}
        >
          <div className="search_tabs_title">
            <h3>{t('map.title')}</h3>
            <Button
              className="search__button"
              onClick={toggleSearchFoldedState}
              icon="arrow-left"
              minimal
            />
          </div>
          <Tabs
            id={ID_SEARCH_PANEL}
            onChange={this.handleNavSearchTabChange}
            selectedTabId={navTabId}
          >
            <Tab
              id={ID_SEARCH_SIMPLE}
              className="search-filters search-simple-content"
              title={t('map.simple-search')}
              panel={(
                <SearchForm
                  itemsPerPage={itemsPerPage}
                  filters={simplesSearchFilters}
                />
              )}
            />

            <Tab
              id={ID_SEARCH_ADVANCED}
              className="search-filters search-advanced-content"
              title={t('map.advanced-search')}
              panel={(
                <SearchForm
                  itemsPerPage={itemsPerPage}
                  filters={advancedSearchFilters}
                />
              )}
            />
          </Tabs>
        </div>
      </>
    );
  }
}

export default Search;
