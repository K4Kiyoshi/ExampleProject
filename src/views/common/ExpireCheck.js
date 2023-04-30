/**
 * To check Expire Time
 *
 * @author  Zin Min Myat, Aung Khant Kyaw
 * @create  05/04/2022
 */

import axios from "axios";
import moment from "moment";
import { FRONTEND_URL } from "./Constant";
import { MakeAuthorization } from "./MakeAuthorization";

//use customize customer name
let customer_name = window.location.href.split("/")[3];
if (customer_name === "" || customer_name === null) {
  customer_name = "demo";
}

const AUTH_SERVER_URL = process.env.REACT_APP_API_ERP_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const oauthTokenURL = `${AUTH_SERVER_URL}/web/${customer_name}/oauth/token`;
const webLogoutURL = `${AUTH_SERVER_URL}/web/${customer_name}/logout`;
const logoutURL = `${AUTH_SERVER_URL}/api/${customer_name}/logout`;

const frontEndLoginUrl = `${FRONTEND_URL}/${customer_name}/sign-in`;

/**
 * Check whether expire time is greater than current time
 * If current time is greater than expire time, call refresh token api
 * Else return true
 * @returns true or false
 */
export const checkExpire = async () => {
  if (
    localStorage.getItem(`${customer_name}_EXPIRE_TIME`) !== null &&
    localStorage.getItem(`${customer_name}_REFRESH_TOKEN`) !== null
  ) {
    const expireTime = moment(localStorage.getItem(`${customer_name}_EXPIRE_TIME`));
    const currentTime = moment();
    if (expireTime < currentTime) {
      const result = await refreshToken();
      if (!result) {
        await logoutUser();
        return true;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    await MakeAuthorization();
    return true;
  }
};

export const refreshToken = async () => {
  let result = "";

  const params = {
    grant_type: "refresh_token",
    refresh_token: localStorage.getItem(`${customer_name}_REFRESH_TOKEN`),
    client_id: CLIENT_ID,
    scope: "",
  };

  await axios
    .post(oauthTokenURL, params)
    .then((response) => {
      let expire_time = new Date(
        parseInt(Date.now()) + parseInt(response.data.expires_in * 1000)
      );

      // write into local storage
      localStorage.setItem(`${customer_name}_TOKEN_TYPE`, response.data.token_type);
      localStorage.setItem(`${customer_name}_EXPIRE`, response.data.expires_in);
      localStorage.setItem(`${customer_name}_EXPIRE_TIME`, expire_time);
      localStorage.setItem(`${customer_name}_TOKEN`, response.data.access_token);
      localStorage.setItem(`${customer_name}_REFRESH_TOKEN`, response.data.refresh_token);

      result = true;
    })
    .catch((error) => {
      result = false;
    });

  return result;
};

export const logoutUser = async () => {
  if (localStorage.getItem(`${customer_name}_TOKEN`) !== null) {
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(`${customer_name}_TOKEN`),
        Accept: "application/json",
        withCredentials: true, // to send cookie in request
      },
    };

    // API logout to revoke token
    axios
      .post(logoutURL, {}, headers)
      .then((response) => {
        // after API logout, need to delete session cookie of authentication server
        clearSession();
        localStorage.setItem(`${customer_name}_LOGIN_ERROR`, "Session Expired");
        window.location.href = `${webLogoutURL}?${new URLSearchParams({
          redirect_uri: frontEndLoginUrl,
        }).toString()}`;
      })
      .catch((error) => {
        clearSession();
        localStorage.setItem(`${customer_name}_LOGIN_ERROR`, "Session Expired");
        window.location.href = `${webLogoutURL}?${new URLSearchParams({
          redirect_uri: frontEndLoginUrl,
        }).toString()}`;
      });
  }
};

export const clearSession = () => {
  localStorage.removeItem(`${customer_name}_TOKEN`);
  localStorage.removeItem(`${customer_name}_LANGUAGE`);
  localStorage.removeItem(`${customer_name}_TOKEN_TYPE`);
  localStorage.removeItem(`${customer_name}_EXPIRE`);
  localStorage.removeItem(`${customer_name}_EXPIRE_TIME`);
  localStorage.removeItem(`${customer_name}_REFRESH_TOKEN`);
  localStorage.removeItem(`${customer_name}_DEPARTMENT_ID`);
  localStorage.removeItem(`${customer_name}_POSITION_ID`);
  localStorage.removeItem(`${customer_name}_POSITION_RANK`);
  localStorage.removeItem(`${customer_name}_DEPARTMENT_POSITION`);
  localStorage.removeItem(`${customer_name}_LOGIN_ID`);
  localStorage.removeItem(`${customer_name}_COMPANY_ID`);
  localStorage.removeItem(`${customer_name}_PHOTO`);
  localStorage.removeItem(`${customer_name}_EMP_NAME`);
  localStorage.removeItem(`${customer_name}_EMAIL`);
  localStorage.removeItem(`${customer_name}_ROLE_ID`);
  localStorage.removeItem(`${customer_name}_EMPLOYEE_TYPE`);
  localStorage.removeItem(`${customer_name}_HR_MENU_COUNT`);
  localStorage.removeItem(`${customer_name}_PLAN_MENU_COUNT`);
  localStorage.removeItem(`${customer_name}_PERMISSION`);
  localStorage.removeItem(`${customer_name}_CNAME`);
  localStorage.removeItem(`${customer_name}_ENAME`);
  localStorage.removeItem(`${customer_name}_PACKAGE_NAME`);
  localStorage.removeItem(`${customer_name}_TOTAL_PACKAGE`);
  localStorage.removeItem(`${customer_name}_PACKAGE_SHORT_NAME`);
  localStorage.removeItem(`${customer_name}_PACKAGE_LINK`);
};
