import Api from '@terralego/core/modules/Api';

export async function getViewpointData(id) {
  try {
    return Api.request(`viewpoints/${id}/`);
  } catch (e) {
    return null;
  }
}

export const fetchFilterOptions = () => Api.request('viewpoints/filters/');

export async function fetchPaginatedFilteredViewpoints({ data, itemsPerPage = 10, page = 1 }) {
  return Api.request('viewpoints/active/', {
    querystring: {
      ...data,
      page_size: itemsPerPage,
      page,
    },
  });
}

export default {
  getViewpointData,
  fetchFilterOptions,
  fetchPaginatedFilteredViewpoints,
};
