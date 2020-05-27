import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@blueprintjs/core';

import Filters from '@terralego/core/modules/Forms/Filters';
import { toast } from '../../../../utils/toast';
import { isDate, parsePropertiesToData } from '../../../../utils/helper/validateFormSearch';
import translateMock from '../../../../utils/translate';

import './search-form.scss';

export class SearchForm extends React.Component {
  static propTypes = {
    filters: PropTypes.arrayOf(
      PropTypes.object,
    ),
    properties: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array,
      ]),
    ),
    t: PropTypes.func,
  };

  static defaultProps = {
    filters: [],
    properties: {},
    t: translateMock({
      'form.reset': 'Reset',
      'form.search': 'Search',
    }),
  };

  state = {
    // Inform user of state of form : 0 = clickable, 1 = disabled
    isFormDisabled: false,
    isResetFormDisabled: false,
  };


  onChange = properties => {
    const { setProperties } = this.props;
    setProperties(properties);
  };

  onReset = async () => {
    const {
      resetMapInitialState,
      resetSearchForm,
    } = this.props;
    this.setState({ isResetFormDisabled: true });
    await resetSearchForm();
    resetMapInitialState();
    this.setState({ isResetFormDisabled: false });
  };

  onSubmit = async event => {
    event.preventDefault();
    const {
      getFirstPageFilteredViewpoints,
      forceResultUnfolding,
      itemsPerPage,
      rawData,
      properties,
    } = this.props;
    this.setState({ isFormDisabled: true });
    const data = properties ? parsePropertiesToData(properties, rawData) : {};
    const res = await getFirstPageFilteredViewpoints(data, itemsPerPage, 1);
    res ? forceResultUnfolding() : toast.displayError('Le serveur est indisponible.');
    this.setState({ isFormDisabled: false });
  };

  render () {
    const { isFormDisabled, isResetFormDisabled } = this.state;
    const { filters, properties, t } = this.props;

    const isDateInvalid = properties.viewpointDate
      && !properties.viewpointDate.every(date => isDate(date));

    return (
      <form
        className="filters"
        onSubmit={this.onSubmit}
      >
        <div>
          <Filters
            onChange={this.onChange}
            properties={properties}
            filters={filters}
            translate={t}
          />
          <div className="action-search">
            <Button
              text={t('form.reset')}
              loading={isResetFormDisabled}
              onClick={this.onReset}
            />
            <Button
              text={t('form.search')}
              type="submit"
              loading={isFormDisabled}
              disabled={isDateInvalid || isFormDisabled}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default SearchForm;
