import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  const sortedBlogs = response.data.sort((a, b) => b.likes - a.likes);
  return sortedBlogs;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, updatedObject) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config);
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    throw error;
  }
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    await axios.delete(`${baseUrl}/${id}`, config);
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

export default {
  getAll,
  create,
  update,
  setToken,
  getById,
  remove,
};
