/**
 *
 * @author Yuwa Ko Ko
 * @create  22/01/2023 (D/M/Y)
 * @param
 * @return
 */

import React, { useEffect , useState} from "react";
import axios from "axios";
import Loading from "../common/Loading";
import { useHistory } from "react-router-dom";
import { isEmpty } from "../common/CommonValidation";

const Logout = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(true); // change back to true later
  let customer_name = window.location.href.split("/")[3];

  let logoutURL;
 
  const webLogoutURL = `${process.env.REACT_APP_API_ERP_URL}/web/${customer_name}/logout`;
  useEffect(() => {
      // localStorage.clear();
      // clearSession()
      const AUTH_SERVER_URL = process.env.REACT_APP_API_ERP_URL;
      logoutURL = `${AUTH_SERVER_URL}/api/${customer_name}/logout`;
      IntegrateLogout()
     
    document.body.style.overflow = "hidden";
  });

  const IntegrateLogout = async () => {
    const headers = {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(`${customer_name}_TOKEN`),
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
        setLoading(false); 
        var frontEndLoginUrl = `${process.env.REACT_APP_RECRUITMENT_DOMAIN}/${customer_name}/sign-in`;;  
        window.location.href = `${webLogoutURL}?${new URLSearchParams({
          redirect_uri: frontEndLoginUrl,
        }).toString()}`;
        localStorage.setItem(`${customer_name}_SIGN_OUT`, true);
      })
      .catch((error) => {
        clearSession();
        setLoading(false); 
        var frontEndLoginUrl = `${process.env.REACT_APP_RECRUITMENT_DOMAIN}/${customer_name}/sign-in`;;  
        window.location.href = `${webLogoutURL}?${new URLSearchParams({
          redirect_uri: frontEndLoginUrl,
        }).toString()}`;
        localStorage.setItem(`${customer_name}_SIGN_OUT`, true);
      });
  };


  const clearSession = () => {
    localStorage.removeItem(`${customer_name}_PHOTO`);
    localStorage.removeItem(`${customer_name}_EMP_NAME`);
    localStorage.removeItem(`${customer_name}_LANGUAGE`);
    localStorage.removeItem(`${customer_name}_TOKEN_TYPE`);
    localStorage.removeItem(`${customer_name}_EXPIRE`);
    localStorage.removeItem(`${customer_name}_EXPIRE_TIME`);
    localStorage.removeItem(`${customer_name}_TOKEN`);
    localStorage.removeItem(`${customer_name}_REFRESH_TOKEN`);
    localStorage.removeItem(`${customer_name}_LOGIN_ERROR`);
    localStorage.removeItem(`${customer_name}_JOB_ID`);
    localStorage.removeItem(`${customer_name}_POS_ID`);
    localStorage.removeItem(`${customer_name}_R_ID`);
    localStorage.removeItem(`${customer_name}_ST_ID`);
    localStorage.removeItem(`${customer_name}_LOGIN_ID`);
    localStorage.removeItem(`${customer_name}_ROLE_ID`);
    localStorage.removeItem(`${customer_name}_CHECK_APPROVER`);
    localStorage.removeItem(`${customer_name}_USER_ACCEPT`);
    localStorage.removeItem(`${customer_name}_USER_EMAIL`);
    localStorage.removeItem(`${customer_name}_TEMPLATE_ID`);
    localStorage.removeItem(`${customer_name}_state`);
    localStorage.removeItem(`${customer_name}_verifier`);
    localStorage.removeItem(`${customer_name}_USER_EMAIL`);
    localStorage.removeItem(`${customer_name}_CLICKED_DATA`);
    localStorage.removeItem(`${customer_name}_STATE_TMP_INTERVIEW`);
    localStorage.removeItem(`${customer_name}_STATUS_TMP_INTERVIEW`);
    localStorage.removeItem(`${customer_name}_PID`);
    localStorage.removeItem(`${customer_name}_JID`);
    localStorage.removeItem(`${customer_name}_STATUS_ID`);
    localStorage.removeItem(`${customer_name}_STATE_ID`);
    localStorage.removeItem(`${customer_name}_PAGE`);
    localStorage.removeItem(`${customer_name}_SHOW_ARRAY`);
    localStorage.removeItem(`${customer_name}_STATUS_TMP`);
    localStorage.removeItem(`${customer_name}_STATUS_TMP`);
    localStorage.removeItem(`${customer_name}_APP_ID`);
    localStorage.removeItem(`${customer_name}_TEMP_ID`);
    localStorage.removeItem(`${customer_name}_INFO_ID`);
    localStorage.removeItem(`${customer_name}_JOB_NAME`);
    localStorage.removeItem(`${customer_name}_POS_NAME`);
    localStorage.removeItem(`${customer_name}_CURRENCY`);
    localStorage.removeItem(`${customer_name}_SU_ID`);
    localStorage.removeItem(`${customer_name}_SARRAY`);
    localStorage.removeItem(`${customer_name}_SUCCESS`);
    localStorage.removeItem(`${customer_name}_TEMPLATE_EDIT_DATA`);
    localStorage.removeItem(`${customer_name}_EDIT_ID`);
    localStorage.removeItem(`${customer_name}_ROLE_MENU_BACK_DATA`);
    localStorage.removeItem(`${customer_name}_MENU_SETTING_DETAIL_DATA`);
    localStorage.removeItem(`${customer_name}_MENU_SETTING_EDIT_DATA`);
    localStorage.removeItem(`${customer_name}_EDIT_USER_MENU_RETURN`);
    localStorage.removeItem(`${customer_name}_EMPLOYEE_TYPE`);
    localStorage.removeItem(`${customer_name}_EMAIL`);
    localStorage.removeItem(`${customer_name}_POSITION_ID`);
    localStorage.removeItem(`${customer_name}_DEPARTMENT_ID`);
    localStorage.removeItem(`${customer_name}_SIGN_OUT`);
    localStorage.removeItem(`${customer_name}_POSITION_RANK`);
    localStorage.removeItem(`${customer_name}_COMPANY_ID`);
    localStorage.removeItem(`${customer_name}_DEPARTMENT_POSITION`);
    
  };

  return <></>;


};



export default Logout;