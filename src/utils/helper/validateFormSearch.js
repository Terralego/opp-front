const isEmpty = value => value.length < 1
  || (Array.isArray(value) && !value.some(elem => elem !== null))
  || (typeof value === 'string' && value === '');

const removeEmptyProperties = obj =>
  Object.keys(obj).reduce((acc, key) =>
    (isEmpty(obj[key]) ? acc : { ...acc, [key]: obj[key] }), {});

const getIsoDate = date => date.toISOString().substr(0, 10);

export function parsePropertiesToData (properties) {
  let data = removeEmptyProperties(properties);
  let parsedDate = {};

  if (data.viewpointDate) {
    const { viewpointDate, ...props } = data;
    if (viewpointDate.every(date => date !== null)) {
      parsedDate = {
        date_from: getIsoDate(data.viewpointDate[0]),
        date_to: getIsoDate(data.viewpointDate[1]),
      };
    } else {
      const pos = data.viewpointDate.findIndex(date => date !== null);
      parsedDate = pos === 0
        ? { date_from: getIsoDate(data.viewpointDate[pos]) }
        : { date_to: getIsoDate(data.viewpointDate[pos]) };
    }

    data = { ...props, ...parsedDate };
  }

  if (data.photographer) {
    const { photographer, ...props } = data;
    data = { ...props, pictures__owner__uuid: photographer };
  }

  return data;
}

export const isDate = date => new Date(date).getDate() > 0;

export default { parsePropertiesToData, isDate };
