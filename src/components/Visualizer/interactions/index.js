import React from 'react';
import ReactDOM from 'react-dom';
import { Classes } from '@blueprintjs/core';

import {
  INTERACTION_DISPLAY_TOOLTIP,
  INTERACTION_FN,
  INTERACTION_ZOOM,
} from '@terralego/core/modules/Map/InteractiveMap';
import ClusterList from './ClusterList';

export const generateClusterList = props => {
  const tooltipContainer = document.createElement('div');
  tooltipContainer.className = Classes.DARK;

  ReactDOM.render(<ClusterList {...props} />, tooltipContainer);

  return tooltipContainer;
};

export function getInteractions(API_PROVIDER, history) {
  return [
    {
      id: 'viewpoints-unclustered-0',
      interaction: INTERACTION_DISPLAY_TOOLTIP,
      trigger: 'mouseover',
      template: `
[![]({{ viewpoint_picture }})](/viewpoint/{{ viewpoint_id }})

[{{ viewpoint_label }}](/viewpoint/{{ viewpoint_id }})<br/>
{{ viewpoint_city }}
`,
      unique: true,
      fixed: true,
      anchor: 'top',
    },
    {
      id: 'viewpoints-unclustered-0',
      interaction: INTERACTION_FN,
      trigger: 'click',
      async fn({ feature }) {
        if (!feature) return;

        const {
          properties: { viewpoint_id: viewpointId },
        } = feature;
        history.push(`/viewpoint/${viewpointId}`);
      },
    },
    {
      id: 'viewpoints-count',
      interaction: INTERACTION_ZOOM,
      trigger: 'click',
      step: 1,
      constraints: [
        {
          isCluster: true,
          maxZoom: 16.99,
        },
      ],
    },
    {
      id: 'viewpoints-count',
      interaction: INTERACTION_FN,
      trigger: 'click',
      constraints: [
        {
          isCluster: true,
          minZoom: 17,
          maxZoom: 17,
        },
      ],
      async fn({ feature, clusteredFeatures, event, instance: { displayTooltip }, layerId }) {
        displayTooltip({
          layerId,
          feature,
          event,
          fixed: true,
          element: generateClusterList({
            features: clusteredFeatures,
            history,
          }),
          className: 'clustered-features-list-container',
          unique: true,
          maxWidth: '300px',
        });
      },
    },
  ];
}

export default { getInteractions };
