import { AxiosRequestHeaders } from "axios";
import { axiosInstance } from "./api";

export const axiosGetRequest = async <T>(
  route: string,
  optionalQueryParams: string
): Promise<T> => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      method: "get",
      url: route + optionalQueryParams,
    })
      .then((response) => {
        let parsedResponse = response.data;

        resolve(parsedResponse);
      })
      .catch((error) => {
        if (error) {
          reject(error);
        }
      });
  });
};

export const axiosPostRequest = async <T1, T2>(
  route: string,
  optionalQueryParams: string,
  data: T1
): Promise<T2> => {
  let headers = {} as { [key: string]: number | string };

  headers["Content-Type"] = "application/json";
  return new Promise((resolve, reject) => {
    axiosInstance({
      method: "post",
      url: route + optionalQueryParams,
      data: data,
      headers: headers as AxiosRequestHeaders,
    })
      .then((response) => {
        let parsedResponse = response.data;
        resolve(parsedResponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//TODO: test implementations for axios put and delete requests
export const axiosPutRequest = async <T1, T2>(
  url: string,
  id: number,
  optionalQueryParams: string,
  data: T1
): Promise<T2> => {
  let headers = {} as { [key: string]: number | string };

  headers["Content-Type"] = "application/json";
  return new Promise((resolve, reject) => {
    axiosInstance({
      method: "put",
      url: url + `/${id}` + optionalQueryParams,
      data: data,
      headers: headers as AxiosRequestHeaders,
    })
      .then((response) => {
        let parsedResponse = response.data;

        resolve(parsedResponse);
      })
      .catch((error) => {
        if (error) {
          reject(error);
        }
      });
  });
};

export const axiosDeleteRequest = async <T>(url: string): Promise<T> => {
  const headers = {} as { [key: string]: number | string };

  headers["Content-Type"] = "application/json";
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(url, { headers: headers as AxiosRequestHeaders})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error) {
          reject(error);
        }
      });
  });
};