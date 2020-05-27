import React,  { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { MainMenu } from '@terralego/core/components/MainMenu';

import Logo from '../../components/Logo';
import './nav.scss';

export const MainNav = ({ logo, logoUrl, resetMapInitialState, toggleSearchFoldedState }) => {
  const { t } = useTranslation();

  const menu = useMemo(() => ({
    navHeader: {
      href: logoUrl,
      icon: <Logo src={logo} alt={t('menu.logoName')} />,
      label: t('menu.logoLink'),
      onClick: resetMapInitialState,
    },
    navItems: [[{
      href: '/',
      icon: 'search',
      id: 'search',
      onClick: toggleSearchFoldedState,
      label: t('menu.search'),
    }]],
  }), [logo, logoUrl, resetMapInitialState, t, toggleSearchFoldedState]);

  return (
    <MainMenu className="main__header" {...menu} />
  );
};

MainNav.propTypes = {
  logo: PropTypes.string,
  logoUrl: PropTypes.string,
  resetMapInitialState: PropTypes.func,
  toggleSearchFoldedState: PropTypes.func,
};

MainNav.defaultProps = {
  logo: undefined,
  logoUrl: '/',
  resetMapInitialState: () => {},
  toggleSearchFoldedState: () => {},
};

export default MainNav;
