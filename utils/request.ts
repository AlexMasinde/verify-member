import { api } from "@/api";

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000;

const postDataWithRetries = async (payload: any, url: string) => {
  let retryAttempts = 0;

  while (retryAttempts < MAX_RETRY_ATTEMPTS) {
    try {
      const response = await api.post(url, payload);
      return response.data;
    } catch (error: any) {
      console.log("at request log", error.response);
      retryAttempts++;
      if (error.response && error.response.status >= 500) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else if (!error.response && retryAttempts < MAX_RETRY_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else {
        throw error;
      }
    }
  }

  throw new Error("Request failed");
};

export default postDataWithRetries;
