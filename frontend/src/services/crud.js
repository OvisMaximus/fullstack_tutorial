import axios from "axios";

const authorizationHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const get = async (baseUrl, id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getAll = async (baseUrl) => {
  const response = await axios.get(baseUrl);
  console.log("getAll: ", response);
  return response.data;
};

const create = (baseUrl, newObject, token) => {
  const request = token
    ? axios.post(baseUrl, newObject, authorizationHeader(token))
    : axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = async (baseUrl, updatedObject, token) => {
  console.log("crud update with ", updatedObject);
  const response = token
    ? await axios.put(
        `${baseUrl}/${updatedObject.id}`,
        updatedObject,
        authorizationHeader(token),
      )
    : await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject);
  console.log("crud update: ", response.data);
  return response.data;
};

const deleteId = (baseUrl, id, token) => {
  const request = token
    ? axios.delete(`${baseUrl}/${id}`, authorizationHeader(token))
    : axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { get, getAll, create, update, deleteId };
