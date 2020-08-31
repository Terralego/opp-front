import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@blueprintjs/core';

import Filters from '@terralego/core/modules/Forms/Filters';
import { toast } from '../../../../utils/toast';
import { isDate, parsePropertiesToData } from '../../../../utils/helper/validateFormSearch';

import './search-form.scss';

export const SearchForm = ({
  filters,
  forceResultUnfolding,
  getFirstPageFilteredViewpoints,
  itemsPerPage,
  properties,
  resetMapInitialState,
  resetSearchForm,
  setProperties,
  t,
}) => {
  // Inform user of state of form : true = clickable, false = disabled
  const [isFormDisabled, setFormDisabled] = useState(false);
  const [isResetFormDisabled, setResetFormDisabled] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const filteredProperties = useMemo(() => (
    Object.entries(properties).reduce((list, [key, value]) => (
      filters.find(item => item.property === key) ? ({ ...list, [key]: value }) : list
    ), {})
  ), [filters, properties]);

  const onReset = useCallback(async () => {
    setResetFormDisabled(true);
    await resetSearchForm();
    if (!isMounted.current) return;
    resetMapInitialState();
    setResetFormDisabled(false);
  }, [resetMapInitialState, resetSearchForm]);

  const onSubmit = useCallback(async event => {
    event.preventDefault();
    setFormDisabled(true);
    const data = filteredProperties ? parsePropertiesToData(filteredProperties) : {};
    const res = await getFirstPageFilteredViewpoints(data, itemsPerPage, 1);
    res ? forceResultUnfolding() : toast.displayError(t('error.unavailable'));
    if (!isMounted.current) return;
    setFormDisabled(false);
  }, [filteredProperties, forceResultUnfolding, getFirstPageFilteredViewpoints, itemsPerPage, t]);

  const isDateInvalid = useMemo(() => (
    properties.viewpointDate && properties.viewpointDate.some(date => !isDate(date))
  ), [properties.viewpointDate]);

  return (
    <form
      className="filters"
      onSubmit={onSubmit}
    >
      <div>
        <Filters
          onChange={setProperties}
          properties={filteredProperties}
          filters={filters}
          translate={t}
        />
        <div className="action-search">
          <Button
            text={t('form.reset')}
            loading={isResetFormDisabled}
            onClick={onReset}
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
};

export default SearchForm;

SearchForm.propTypes = {
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

SearchForm.defaultProps = {
  filters: [],
  properties: {},
  t: () => {},
};
