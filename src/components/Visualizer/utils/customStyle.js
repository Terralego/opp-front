export function getCustomStyle({ apiProvider, layerId, layerName }) {
  return {
    sources: [
      {
        id: 'OPP',
        type: 'vector',
        tiles: [`${apiProvider}/layer/${layerId}/tiles/{z}/{x}/{y}/`],
      },
    ],
    layers: [
      {
        type: 'symbol',
        source: 'OPP',
        id: 'viewpoints',
        cluster: {
          radius: 40,
          steps: [2, 20, 100],
          sizes: [5, 10, 15, 22],
          colors: ['#f08a18', '#f08a18', '#f08a18', '#f08a18'],
          font: {
            color: '#ffffff',
            family: ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          },
          paint: {
            'circle-opacity': 0.9,
            'circle-stroke-opacity': 1,
          },
        },
        layout: {
          'icon-image': 'marker-poi',
          'icon-size': 0.5,
          'icon-anchor': 'bottom',
          'icon-allow-overlap': true,
        },
        filter: ['==', ['get', 'viewpoint_active'], true],
        'source-layer': layerName,
        weight: 850,
      },
      {
        type: 'symbol',
        source: 'OPP',
        id: 'symbol-viewpoints-unclustered-0-highlight',
        layout: {
          'icon-image': 'marker-poi-highlighted',
          'icon-size': 0.5,
          'icon-anchor': 'bottom',
          'icon-allow-overlap': true,
        },
        filter: false,
        'source-layer': layerName,
        weight: 850,
      },
    ],
  };
}

export default { getCustomStyle };
