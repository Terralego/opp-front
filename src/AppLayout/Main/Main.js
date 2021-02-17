import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';

import Nav from '../Nav';
import Content from '../Content';

import './main.scss';

export const Main = ({ isNavBarVisible, env: { favicon, language, title } = {} }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!language) return;
    i18n.changeLanguage(language);
  }, [i18n, language]);

  return (
    <main className="main">
      <Helmet>
        <html lang={i18n.language} prefix="og:http://ogp.me/ns#" />
        {title && <title>{title}</title>}
        {title && <meta property="og:title" content={title} />}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={global.location.href} />
        {favicon && <link rel="shortcut icon" href={favicon} />}
      </Helmet>
      {isNavBarVisible && <Nav />}
      <Content />
    </main>
  );
};

Main.propTypes = {
  isNavBarVisible: PropTypes.bool,
  env: PropTypes.shape({
    favicon: PropTypes.string,
    language: PropTypes.string,
    title: PropTypes.string,
  }),
};

Main.defaultProps = {
  isNavBarVisible: false,
  env: {
    favicon: undefined,
    language: undefined,
    title: undefined,
  },
};

export default Main;
