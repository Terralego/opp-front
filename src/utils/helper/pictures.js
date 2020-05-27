export const getZoom = (x, y, newScale) => ({
  scale: newScale,
  translate: { x: 0, y: 0 },
  transformOrigin: newScale === 1 ? { x: 0, y: 0 } : { x, y },
});

export const getNewScale = (scale, delta, step) => (
  // Determine the new scale, bounded between 1 and 4
  Math.min(Math.max(scale + (step * (delta > 0 ? -1 : 1)), 1), 4)
);

export default { getZoom, getNewScale };
