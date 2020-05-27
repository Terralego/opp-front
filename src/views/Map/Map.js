import React, { useEffect } from 'react';

import Visualizer from '../../components/Visualizer';
import OppInformation from './OppInformation';
import Search from './Search';
import Results from './Results';

import './map.scss';

export const Map = ({ isNavBarVisible, toggleNavBar }) => {
  useEffect(() => {
    !isNavBarVisible && toggleNavBar();
  }, [isNavBarVisible, toggleNavBar]);

  return (
    <div className="map">
      <Search />
      <Results />
      <Visualizer />
      <OppInformation />
    </div>
  );
};

export default Map;
