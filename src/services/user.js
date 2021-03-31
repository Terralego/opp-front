export const getFullName = user =>
  [user.properties.first_name, user.properties.last_name].join(' ').trim();

export default { getFullName };
