import fetch from 'isomorphic-unfetch';

export const fetchAPIData = async (url, option = {}) => {
  const r = await fetch(url, option);
  const data = await r.json();
  return data;
};

export const processAPIData = (apiData) => {
  let fetchData = {};
  if (apiData) {
    apiData.forEach((item, key) => {
      fetchData.data = item.data ? [...item.data] : [];
      fetchData.name = item.name ? item.name : '';
    });
  }
  const data = fetchData ? fetchData.data : [];
  return data;
};

export const getAPIData = async (apiUrl) => {
  const promises = apiUrl.map(async (repo) => {
    const apiPath = `${process.env.SERVER_API}/data`;
    const api = `${apiPath}/${repo.endpoint}.json`;
    const response = await fetchAPIData(api);
    return {
      name: repo.name,
      data: response,
    };
  });
  const receviedData = await Promise.all(promises);
  return receviedData;
};
