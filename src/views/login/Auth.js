import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FRONTEND_URL } from "./Constant";
import { ApiRequest } from "../common/ApiRequest";
import ApiPath from "../common/ApiPath";
import Loading from "../common/Loading"
// import PackageAccessCheck from '../../containers/PackageAccessCheck';
// import ApiPath from "../brycen-common/api-path/ApiPath";

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const AUTH_SERVER_URL = process.env.REACT_APP_API_ERP_URL;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  //use customize customer name
  let customer_name = window.location.href.split("/")[3];

  if (customer_name === "" || customer_name === null) {
    customer_name = "demo";
  }

  // sample -> http://project-erp.test/web/cliEntA/oauth/token
  const oauthTokenURL = `${AUTH_SERVER_URL}/web/${customer_name}/oauth/token`;

  // sample -> http://localhost:3000/cliEntA/auth
  const redirectURI = `${FRONTEND_URL}/${customer_name}/auth`;

  // sample -> http://project-erp.test/api/cliEntA/logout
  const logoutURL = `${AUTH_SERVER_URL}/api/${customer_name}/logout`;

  // sample -> http://project-erp.test/web/cliEntA/logout
  const webLogoutURL = `${AUTH_SERVER_URL}/web/${customer_name}/logout`;

  // prepare front-end login route -> http://localhost:3000/cliEntA
  const frontEndLoginUrl = `${FRONTEND_URL}/${customer_name}/sign-in`;

  useEffect(() => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
  
    if (code && state) {
      if (state === window.localStorage.getItem(`${customer_name}_state`)) {
        let params = {
          grant_type: "authorization_code",
          client_id: CLIENT_ID,
          redirect_uri: redirectURI,
          code_verifier: window.localStorage.getItem(`${customer_name}_verifier`),
          code,
        };

        axios
          .post(oauthTokenURL, params)
          .then((response) => {
            localStorage.removeItem(`${customer_name}_state`);
            localStorage.removeItem(`${customer_name}_verifier`);
            localStorage.removeItem(`${customer_name}_EXPIRE_TIME`);
            localStorage.removeItem(`${customer_name}_TOKEN`);
            let expire_time = new Date(parseInt(Date.now()) + parseInt(response.data.expires_in * 1000));

            // write into local storage
            localStorage.setItem(`${customer_name}_TOKEN_TYPE`, response.data.token_type);
            localStorage.setItem(`${customer_name}_EXPIRE`, response.data.expires_in);
            localStorage.setItem(`${customer_name}_EXPIRE_TIME`, expire_time);
            localStorage.setItem(`${customer_name}_TOKEN`, response.data.access_token);
            localStorage.setItem(`${customer_name}_REFRESH_TOKEN`, response.data.refresh_token);

            (async () => {
              await getLoginData(response.data.access_token);
            })();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log('second wrong', window.localStorage.getItem(`${customer_name}_state`))
        window.location.href = `${window.location.origin}/${customer_name}/invalid-url`;
      }
    } else {
      window.location.href = `${window.location.origin}/${customer_name}/invalid-url`;
    }
  }, []);

  const getLoginData = async (token) => {
    let obj2 = {
      package_name: "erp",
      method: "get",
      url: `api/get-login-data`,
      params: { device_flag: 1 },
    };

    let response1 = await ApiRequest(obj2);
    if (response1.flag === false) {
      // clear token, expire token and redirect
      await logoutHandler(token);
      localStorage.setItem(`${customer_name}_LOGIN_ERROR`, response1.message[0]);
    } else {
      let resData = response1.data;
      localStorage.removeItem(`LOGIN_ERROR`);
      localStorage.setItem(
        `${customer_name}_DEPARTMENT_ID`,
        JSON.stringify(resData.department_id)
      );
      localStorage.setItem(`${customer_name}_POSITION_ID`, JSON.stringify(resData.position_id));
      localStorage.setItem(
        `${customer_name}_POSITION_RANK`,
        JSON.stringify(resData.position_rank)
      );
      localStorage.setItem(
        `${customer_name}_DEPARTMENT_POSITION`,
        JSON.stringify(resData.dept_pos)
      );
      let login_data = resData.login_data;
      localStorage.setItem(`${customer_name}_LOGIN_ID`, login_data.login_id);
      localStorage.setItem(`${customer_name}_COMPANY_ID`, login_data.company_id);
      localStorage.setItem(`${customer_name}_PHOTO`, login_data.photo);
      localStorage.setItem(`${customer_name}_EMP_NAME`, login_data.employee_name);
      localStorage.setItem(`${customer_name}_EMAIL`, login_data.email);
      localStorage.setItem(`${customer_name}_ROLE_ID`, login_data.role_id);
      localStorage.setItem(`${customer_name}_EMPLOYEE_TYPE`, login_data.employee_type);

      let loginData = {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        employee_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        company_id: localStorage.getItem(`${customer_name}_COMPANY_ID`),
        role_id: localStorage.getItem(`${customer_name}_ROLE_ID`),
        language: localStorage.getItem(`${customer_name}_LANGUAGE`),
        access_token: token,
      };
      dispatch({ type: "login", login: true });
      let access = false;

      // Package Menu
      let obj1 = {
        method: "post",
        url: ApiPath.ERPChoosePackage,
        package_name: "erp",
        params: {
          ...loginData,
          device_flag: "1",
        },
      };
      let chooseResponse = await ApiRequest(obj1);
      if (chooseResponse.flag !== false) {
        let all_package = chooseResponse.data.access_package;
        let login_data = chooseResponse.data.login_data;
        localStorage.setItem(`${customer_name}_LOGIN_ID`, login_data.login_id);
        localStorage.setItem(`${customer_name}_COMPANY_ID`, login_data.company_id);
        localStorage.setItem(`${customer_name}_PHOTO`, login_data.photo);
        localStorage.setItem(`${customer_name}_EMP_NAME`, login_data.employee_name);
        localStorage.setItem(`${customer_name}_EMAIL`, login_data.email);
        localStorage.setItem(`${customer_name}_ROLE_ID`, login_data.role_id);
        localStorage.setItem(`${customer_name}_EMPLOYEE_TYPE`, login_data.employee_type);
        all_package.forEach(data => {
          if (data.short_name == "recruit") {
            access = true;
          }

        });
      }
      
      if (access == true) {
        let obj2 = {
          package_name: "recruit",
          method: "get",
          url: ApiPath.RecruitRegisterCheck,
          params: {
            login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
            company_id: localStorage.getItem(`${customer_name}_COMPANY_ID`),
            language: localStorage.getItem(`${customer_name}_LANGUAGE`),
          },
        };
        let response2 = await ApiRequest(obj2);
        access = response2.data.recruit_access;
        
        access == false ?
          history.push(`/${customer_name}/recruit/dashboard-no-permission`)
          : history.push(`/${customer_name}/recruit/Dashboard`)

      } else {
        history.push(`/${customer_name}/recruit/not-register`)
      }

    }
  };

  const logoutHandler = async (token) => {
    const headers = {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        withCredentials: true, // to send cookie in request
      },
    };

    // API logout to revoke token
    axios
      .post(logoutURL, {}, headers)
      .then((response) => {
        localStorage.removeItem(`${customer_name}_TOKEN_TYPE`);
        localStorage.removeItem(`${customer_name}_LANGUAGE`);
        localStorage.removeItem(`${customer_name}_EXPIRE`);
        localStorage.removeItem(`${customer_name}_EXPIRE_TIME`);
        localStorage.removeItem(`${customer_name}_TOKEN`);
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
        // after API logout, need to delete session cookie of authentication server
        window.location.href = `${webLogoutURL}?${new URLSearchParams({
          redirect_uri: frontEndLoginUrl,
        }).toString()}`;
      }
      )
      .catch((error) => {
        console.log(error);
      });
  }

  return <>
    <Loading start={loading} />
  </>;
};

export default Auth;
