import React from 'react';
import * as PropTypes from 'prop-types';

import { Button, Card, Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';

import ResultItem from './ResultItem';
import translateMock from '../../../utils/translate';

import './ResultItem/result-item.scss';

const itemsPerPage = 5;

export class Results extends React.PureComponent {
  static propTypes = {
    isResultUnfold: PropTypes.bool,
    toggleResultFoldedState: PropTypes.func,
    onMouseEnterResult: PropTypes.func,
    onMouseLeaveResult: PropTypes.func,
    filteredViewpoints: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    ),
    t: PropTypes.func,
  };

  static defaultProps = {
    isResultUnfold: false,
    toggleResultFoldedState() {},
    onMouseEnterResult() {},
    onMouseLeaveResult() {},
    filteredViewpoints: {},
    t: translateMock({
      'map.results.title': 'Results',
    }),
  };

  contentPane = React.createRef();

  handlePageClick = ({ selected }) => {
    const { getPaginatedFilteredViewpoints } = this.props;
    getPaginatedFilteredViewpoints(itemsPerPage, selected + 1);
    this.contentPane.current.scrollTo(0, 0);
  };

  render() {
    const {
      t,
      isResultUnfold,
      toggleResultFoldedState,
      onMouseEnterResult,
      onMouseLeaveResult,
      filteredViewpoints: { count, results, num_pages: numPages } = {},
    } = this.props;

    if (!results) return null;

    return (
      <div className={classNames('resultlist', { hidden: !isResultUnfold }, Classes.DARK)}>
        <div className="resultlist-header">
          <h3 className="resultlist-title">{t('map.results.title')}</h3>
          <Button
            className="result__button"
            onClick={toggleResultFoldedState}
            icon="arrow-left"
            minimal
          />
        </div>

        <p className="resultlist-count">
          {t('map.results.number-viewpoints')} {count}
        </p>

        {!!count && (
          <div className="resultlist-content" ref={this.contentPane}>
            {results.map(result => (
              <ResultItem
                t={t}
                key={result.id}
                {...result}
                onMouseEnterResult={onMouseEnterResult}
                onMouseLeaveResult={onMouseLeaveResult}
              />
            ))}

            {count > itemsPerPage && (
              <ReactPaginate
                previousLabel="<<<"
                nextLabel=">>>"
                breakLabel="..."
                breakClassName="break-me"
                pageCount={numPages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={this.handlePageClick}
                containerClassName="pagination"
                subContainerClassName="pages pagination"
                activeClassName="active"
              />
            )}
          </div>
        )}

        {!count && (
          <Card className="no-result">
            <img src="/images/no_result.png" alt="" className="result-picture" />
            <h3>{t('map.results.no-results')}</h3>
          </Card>
        )}
      </div>
    );
  }
}

export default Results;
