import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Nav from '../Nav';
import Content from '../Content';

import './main.scss';

export const Main = ({
  isNavBarVisible,
  env: { language } = {},
}) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!language) return;
    i18n.changeLanguage(language);
  }, [i18n, language]);

  return (
    <main className="main">
      {isNavBarVisible && <Nav />}
      <Content />
    </main>
  );
};

Main.propTypes = {
  isNavBarVisible: PropTypes.bool,
  env: PropTypes.shape({
    language: PropTypes.string,
  }),
};

Main.defaultProps = {
  isNavBarVisible: false,
  env: {
    language: undefined,
  },
};

export default Main;
