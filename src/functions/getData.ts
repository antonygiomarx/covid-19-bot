import axios from "axios";
import { config } from "src/config/config";

const uri = config.uriApi;
export const getData = async (endpoint = `/`) => {
  const result = await axios.get(`${uri + endpoint}`);
  const data = result.data;
  return data;
};
