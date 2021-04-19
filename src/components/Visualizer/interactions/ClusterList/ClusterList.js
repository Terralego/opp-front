import React from 'react';
import { Menu } from '@blueprintjs/core';

import './styles.scss';

const ID = '_id';

export const ClusterList = ({ features, history }) => (
  <div className="clustered-features-list">
    <div className="clustered-features-list__scroll">
      <Menu>
        {features.map(({
          properties: {
            viewpoint_id: id,
            viewpoint_label: label,
            viewpoint_city: city,
            [ID]: propertiesId,
          }
        }) => (
          <Menu.Item
            key={propertiesId}
            onClick={() => history.push(`/viewpoint/${id}`)}
            text={`#${id} ${label}, ${city}`}
            className="capitalize"
          />
        ))}
      </Menu>
    </div>
  </div>
);

export default ClusterList;
