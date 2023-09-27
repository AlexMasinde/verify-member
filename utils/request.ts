import { api } from "@/api";

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000;

export const postDataWithRetries = async (
  payload: any,
  url: string,
  accessToken?: string
) => {
  let retryAttempts = 0;

  while (retryAttempts < MAX_RETRY_ATTEMPTS) {
    try {
      const response = await api.post(url, payload, {
        ...(accessToken && {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      });
      return response.data;
    } catch (error: any) {
      retryAttempts++;
      if (error.response && error.response.status >= 500) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else if (!error.response && retryAttempts < MAX_RETRY_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else {
        throw error;
      }
    }
  }

  throw new Error("Request failed");
};

export const getDataWithRetries = async (url: string, authToken: string) => {
  let retryAttempts = 0;

  while (retryAttempts < MAX_RETRY_ATTEMPTS) {
    try {
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      retryAttempts++;
      if (error.response && error.response.status >= 500) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else if (!error.response && retryAttempts < MAX_RETRY_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else {
        throw error;
      }
    }
  }

  throw new Error("Request failed");
};

export const putDataWithRetries = async (url: string, authToken: string) => {
  let retryAttempts = 0;

  while (retryAttempts < MAX_RETRY_ATTEMPTS) {
    try {
      const response = await api.put(url, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data;
    } catch (error: any) {
      retryAttempts++;
      if (error.response && error.response.status >= 500) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else if (!error.response && retryAttempts < MAX_RETRY_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else {
        throw error;
      }
    }
  }

  throw new Error("Request failed");
};

export const updateArrears = async (url: string, authToken: string) => {
  let retryAttempts = 0;

  while (retryAttempts < MAX_RETRY_ATTEMPTS) {
    try {
      const response = await api.put(
        url,
        { data: { arrears: 0 } },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      retryAttempts++;
      if (error.response && error.response.status >= 500) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else if (!error.response && retryAttempts < MAX_RETRY_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else {
        throw error;
      }
    }
  }

  throw new Error("Request failed");
};
