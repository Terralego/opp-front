import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { MainMenu } from '@terralego/core/components/MainMenu';
import LoginButton from '@terralego/core/components/LoginButton';
import { context as authContext } from '@terralego/core/modules/Auth/services/context';

import Logo from '../../components/Logo';
import './nav.scss';

const getLinkProps = link =>
  !link.startsWith('http') && {
    link: {
      component: NavLink,
      linkProps: {
        exact: true,
        hrefAttribute: 'to',
      },
    },
  };

export const MainNav = ({ logo, logoUrl, resetMapInitialState, toggleSearchFoldedState }) => {
  const { t } = useTranslation();
  const { authenticated } = React.useContext(authContext);

  const menu = useMemo(
    () => ({
      navHeader: {
        href: logoUrl,
        icon: <Logo src={logo} alt={t('menu.logoName')} />,
        label: t('menu.logoLink'),
        onClick: resetMapInitialState,
        ...getLinkProps(logoUrl),
      },
      navItems: [
        [
          {
            href: '/',
            icon: 'search',
            id: 'search',
            onClick: toggleSearchFoldedState,
            label: t('menu.search'),
            ...getLinkProps('/'),
          },
        ],
        [
          {
            id: 'nav-connexion',
            component: () => (
              <LoginButton
                icon={authenticated ? 'log-out' : 'log-in'}
                label={authenticated ? t('menu.logout') : t('menu.login')}
                className={authenticated ? 'log-out' : 'log-in'}
                translate={t}
                allowUserRegistration
              />
            ),
          },
        ],
      ],
    }),
    [authenticated, logo, logoUrl, resetMapInitialState, t, toggleSearchFoldedState],
  );

  return <MainMenu className="main__header" {...menu} />;
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
