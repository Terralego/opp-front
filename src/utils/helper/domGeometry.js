function getBoundedScaledValue ({
  initial,
  upperBound,
  value,
  scale,
}) {
  const scaledLowerBound = initial - (initial / scale);
  const offset = upperBound - initial;
  const scaledUpperBound = offset - (offset / scale);
  return Math.min(
    Math.max(-scaledUpperBound, value),
    scaledLowerBound,
  );
}

export function getAllowedTranslation ({
  transformOrigin,
  container,
  translation,
  scale,
}) {
  const translationX = getBoundedScaledValue({
    initial: transformOrigin.x,
    upperBound: container.width,
    value: translation.x,
    scale,
  });
  const translationY = getBoundedScaledValue({
    initial: transformOrigin.y,
    upperBound: container.height,
    value: translation.y,
    scale,
  });
  return { x: translationX, y: translationY };
}

export function getDimensionsToCenterCoordinates (container) {
  return {
    x: container.width / 2,
    y: container.height / 2,
  };
}

export default { getAllowedTranslation, getDimensionsToCenterCoordinates };
