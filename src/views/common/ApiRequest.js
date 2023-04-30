import axios from "axios";
import { ApiRequestErrorHandler } from "./ApiRequestErrorHandler";
import { checkExpire, refreshToken, logoutUser } from "./ExpireCheck";
import { ignore_api } from "./IgnoreApi";
import {ignore_language} from "./IgnoreLanguage";
import { MakeAuthorization } from "./MakeAuthorization";
export const ApiRequest = async (value) => {
  let result,
    responseType,
    parameter,
    message,
    url_string = [],
    path = "";
  let isNotExpire = true;
  let form_name = window.location.href.split("/")[5]; // project name in url
  let customer_name = window.location.href.split("/")[3]; // customer name in url
  let project_name = window.location.href.split("/")[4]; // project name in url
  let lang = "en"; let originalURL = "";let company_id = "";

  if (localStorage.getItem(`${customer_name}_COMPANY_ID`) != undefined) {
    company_id = localStorage.getItem(`${customer_name}_COMPANY_ID`);
  }

  if (value.url.split("/")[3] != undefined) {
    originalURL = `${value.url.split("/")[0]}/${value.url.split("/")[1]}/${value.url.split("/")[2]}/${value.url.split("/")[3]}/`
  } else {
    originalURL = `${value.url.split("/")[0]}/${value.url.split("/")[1]}/${value.url.split("/")[2]}/`
  }

  if (ignore_api.includes(originalURL) === false && form_name !== "ResetPassword" && form_name !== "ForgotPassword") {
    isNotExpire = await checkExpire();
  }
  if (ignore_language.includes(originalURL) === false &&    localStorage.getItem(`${customer_name}_LANGUAGE`) != undefined) {
    lang = localStorage.getItem(`${customer_name}_LANGUAGE`);
  }
  if (!isNotExpire) {
    MakeAuthorization();
    // window.location.href = `${window.location.origin}/${customer_name}/sign-in`;
    // return {
    //   flag: false,
    //   message: ["Error in authentication"],
    //   data: { status: "NG" },
    // };
  } else {
    // Set the AUTH token for any request
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem(`${customer_name}_TOKEN`);
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      config.headers.Accept = "application/json";
      return config;
    });
    // handle error
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // if status is 401 unauthenticated, remove session and redirect to login page
        if (error.response.status === 401) {
            MakeAuthorization();
          // window.location.href = `${process.env.PUBLIC_URL}/logout`;
        } else if (error.response.status === 404) {
          window.location.href = `${process.env.PUBLIC_URL}/${customer_name}/recruit/404`;
        } else if (error.response.status === 500) {
          const errMsg =
            "Internal Server Error! Please contact with developer.";
          // window.location.href = `${process.env.PUBLIC_URL}/${customer_name}/${project_name}/500`;
          return {
            flag: false,
            message:
              error.response.data.message === undefined
                ? [errMsg]
                : [error.response.data.message],
            data: error.response,
          };
        } else if (error.response.status === 403) {
          window.location.href = `${process.env.PUBLIC_URL}/${customer_name}/recruit/403`;
        }
        // if not 401, send error response to user page
        else {
          throw error;
        }
      }
    );

    // if value.package_name has data, get value.domain and check condition
    if (value.package_name !== undefined) {
      // if package_name is erp, then call api with ERP domain
      if (value.package_name === "erp")
        path = process.env.REACT_APP_API_ERP_URL;
      // if package_name is wms, then call api with WMS domain
      if (value.package_name === "wms")
        path = process.env.REACT_APP_API_WMS_URL;
      // if package_name is hr, then call api with HR domain
      if (value.package_name === "hr") path = process.env.REACT_APP_API_HR_URL;
      // if package_name is plan, then call api with PLAN domain
      if (value.package_name === "plan")
        path = process.env.REACT_APP_API_PLAN_URL;

      // if package_name is recruit, then call api with recruit domain
      if (value.package_name === "recruit")
        path = process.env.REACT_APP_API_URL;
    }
    // if value.package_name hasn't data, get url path
    else {
      let url = window.location.href; // get project name from url (wms, erp, hr, etc)
      let name = url.split("/")[4]; // call different api domain based on url path

      // if name is erp, then call api with ERP domain
      if (name === "erp") path = process.env.REACT_APP_API_ERP_URL;
      // if name is wms, then call api with WMS domain
      if (name === "wms") path = process.env.REACT_APP_API_WMS_URL;
      // if name is hr, then call api with HR domain
      if (name === "hr") path = process.env.REACT_APP_API_HR_URL;
      // if name is plan, then call api with PLAN domain
      if (name === "plan") path = process.env.REACT_APP_API_PLAN_URL;

      // if name is recruit, then call api with PLAN domain
      if (name === "recruit") path = process.env.REACT_APP_API_URL;
    }

    if (value.params != undefined && value.params.hasOwnProperty("language") == false) {
      Object.assign(value.params, { language: lang });
    }

    if (value.params != undefined && value.params.hasOwnProperty("company_id") == false) {
      Object.assign(value.params, { company_id: company_id });
    }

    // to decide responseType is exists or not
    value.type !== undefined ? (responseType = value.type) : (responseType = "");

    value.url.split("/").forEach((t, i) => {
      i === 0 ? (url_string = [t, customer_name]) : url_string.push(t);
    });
    value.url = url_string.join("/");

    // to decide responseType is exists or not
    value.type !== undefined
      ? (responseType = value.type)
      : (responseType = "");

    // set parameter based on api request method
    if (
      value.method === "post" ||
      value.method === "patch" ||
      value.method === "put" ||
      value.method === "delete"
    ) {
      parameter = {
        baseURL: path,
        method: value.method,
        url: value.url,
        data: value.params,
        responseType,
      };
    } else {
      parameter = {
        baseURL: path,
        method: value.method,
        url: value.url,
        params: value.params,
        responseType,
      };
    }

    if (value.headers !== undefined) {
      parameter.headers = value.headers;
    }

    // calling api
    await axios(parameter)
      .then(async (response) => {
        // call api response error handler
        message = await ApiRequestErrorHandler(response);
        message === true
          ? (result = response)
          : (result = { flag: false, message: message, data: response });
      })
      .catch(async (error) => {
        // if(error.response.status === 401) {
        //     const refreshRes = await refreshToken();
        //     if(refreshRes) {
        //         const resData = await ApiRequest(value);
        //         result = resData;
        //     } else {
        //         await logoutUser();
        //         result = { "flag": false, "message": ["Error in authentication"],"data": {status: "NG"} };
        //     }
        // } else {
        try {
          // call api response error handler
          message = await ApiRequestErrorHandler(error.response);
          result = { flag: false, message: message, data: error.response };
        } catch (error1) {
          if (error1.response !== undefined) {
            if (error.response !== undefined) {
              result = {
                flag: false,
                message: error.response.data.message,
                data: error.response.data.data,
              };
            } else {
              let data = { status: "OK" };
              result = {
                flag: false,
                message: ["Cannot connect to server"],
                data: data,
              };
            }
          } else {
            let data = { status: "OK" };
            result = {
              flag: false,
              message: ["Cannot connect to server"],
              data: data,
            };
          }
        }
        // }
      });
    return result;
  }
};
