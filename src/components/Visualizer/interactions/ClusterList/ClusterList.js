import React from 'react';
import { Menu } from '@blueprintjs/core';

import './styles.scss';

const ID = '_id';

export const ClusterList = ({ features, history }) => (
  <div className="clustered-features-list">
    <div className="clustered-features-list__scroll">
      <Menu>
        {features.map(feature => (
          <Menu.Item
            key={feature.properties[ID]}
            onClick={() => history.push(`/viewpoint/${feature.properties.viewpoint_id}`)}
            text={feature.properties.viewpoint_label + ', ' + feature.properties.viewpoint_city}
            className="capitalize"
          />
        ))}
      </Menu>
    </div>
  </div>
);

export default ClusterList;
