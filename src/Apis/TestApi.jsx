import axios from "axios";
import { env } from "../config/EnvironmentConfig";

async function login({ email, password }) {
  try {
    const response = await axios({
      method: "post",
      url: `${env.API_ENDPOINT_URL}/login`,
      data: { email, password },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
}

export { login };
