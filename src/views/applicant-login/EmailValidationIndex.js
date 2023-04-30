/* Email Verification Form
 *
 * @author Zeyar Min,Yuwa Ko Ko
 *
 * @create 17/06/2022
 *
 */

import { checkNullOrBlank } from "../common/CommonValidation";
import EmailVerifiactionForm from "./EmailValidationForm";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../common/Loading";
import { ApiRequest } from "../common/ApiRequest";
import CommonMessage from "../common/CommonMessage";
import $ from "jquery";
import ApiPath from "../common/ApiPath";

const EmailVerifiaction = () => {
  let customer_name = window.location.href.split("/")[3];
  const history = useHistory(); // for history
  const [error, setError] = useState([]); // for error message
  const [loading, setLoading] = useState([]); // for loading
  const [email, setEmail] = useState(""); //for eamil input
  const [tempID, setTempID] = useState(""); //for template ID
  const [success, setSuccess] = useState([]); // for loading 
  const [zoomSize, setZoomSize] = useState(
    Math.round(window.devicePixelRatio * 100)
  ); //browser zoom level
  const [ssnValues, setSSNValue] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
    { id: 4, value: "" },
    { id: 5, value: "" },
    { id: 6, value: "" },
  ]);
  const [ssnValuesMobile, setSSNValueMobile] = useState([
    { id: 7, value: "" },
    { id: 8, value: "" },
    { id: 9, value: "" },
    { id: 10, value: "" },
    { id: 11, value: "" },
    { id: 12, value: "" },
  ]);

  //UseEffect Function
  useEffect(() => {
    let localEmail, localTempID;
    localEmail = JSON.parse(localStorage.getItem(`${customer_name}_USER_EMAIL`));
    localTempID = JSON.parse(localStorage.getItem(`${customer_name}_TEMPLATE_ID`));
    setEmail(localEmail);
    setTempID(localTempID);
    $(window).resize(function () {
      setZoomSize(Math.round(window.devicePixelRatio * 100));
    });
  }, []);

  /** Key handler function for admin login
   * @author Yuwa Ko Ko
   * @create 30/06/2022
   * @param  e
   */
  const keyDownHandler = async (e) => {
    let { name, value } = e.target;
    if (e.key == "Enter") {
      submitClick();
    } else if (e.key == "Backspace" && value == "") {
      if (name != "1" && value.length == 0) {
        const preSibling = document.querySelector(
          `input[name="${parseInt(name) - 1}"]`
        );
        preSibling.focus();
        e.preventDefault();
      }
    }
  };

  /** input email verification code handler
   * @author Zeyar Min
   * @create 19/06/2022
   * @param e
   * @return SSNValue
   */
  const inputHandleChange = async (e) => {
    const { value, name } = e.target;
    // let text = await navigator.clipboard.readText();
    let flg = /^[0-9]+$/.test(value);
    if (flg == true || value == "") {
      let result = [];
      if (value.length > 1) {
        result = ssnValues.map((data) => {
          if (data.id == name) {
            data.value = value.substring(1);
            return data;
          }
          return data;
        });
      } else {
        //if (value.length === 1)
        result = ssnValues.map((data) => {
          if (data.id == name) {
            data.value = value;
            return data;
          }
          return data;
        });
      }
      const nextSibling = document.querySelector(
        `input[name="${parseInt(name) + 1}"]`
      );
      if (value.length >= 1 && name != "6") {
        //nextSibling !== null
        nextSibling.focus();
      } else if (value.length == 0) {
        if (name !== "1") {
          const preSibling = document.querySelector(
            `input[name="${parseInt(name) - 1}"]`
          );
          preSibling.focus();
        }
      }
      setSSNValue(result);
    }
  };

  //Mobile View Input Handle Change Method
  const inputHandleChangeMobile = async (e) => {
    const { value, name } = e.target;
    // let text = await navigator.clipboard.readText();
    let flg = /^[0-9]+$/.test(value);
    if (flg == true || value == "") {
      let result = [];
      if (value.length > 1) {
        result = ssnValuesMobile.map((data) => {
          if (data.id == name) {
            data.value = value.substring(1);
            return data;
          }
          return data;
        });
      } else {
        //if (value.length === 1)
        result = ssnValuesMobile.map((data) => {
          if (data.id == name) {
            data.value = value;
            return data;
          }
          return data;
        });
      }
      const nextSibling = document.querySelector(
        `input[name="${parseInt(name) + 1}"]`
      );
      if (value.length >= 1 && name != "12") {
        //nextSibling !== null
        nextSibling.focus();
      } else if (value.length == 0) {
        if (name !== "1") {
          const preSibling = document.querySelector(
            `input[name="${parseInt(name) - 1}"]`
          );
          preSibling.focus();
        }
      }
      setSSNValueMobile(result);
    }
  };

  /** submit button click function
   * @author Yuwa Ko Ko
   * @create 19/06/2022
   * @param
   * @return error
   */
  const submitClick = async () => {
    let emailTemp = `${email}${tempID}`;
    let inputOtp = "";
    for (let i = 0; i < 6; i++) {
      inputOtp += ssnValues[i].value;
    }

    for (let i = 0; i < 6; i++) {
      inputOtp += ssnValuesMobile[i].value;
    }
    let err = [];
    if (!checkNullOrBlank(inputOtp)) {
      err.push(CommonMessage.JSE005.replace("%s", "verification codes"));
    } else if (inputOtp.length < 6) {
      err.push(
        CommonMessage.JSE018.replace("%s", "complete verification code")
      );
    }
    if (err.length > 0) {
      setError(err);
    } else {
      setLoading(true);
      let emailVeri = {
        package_name: "recruit",
        method: "post",
        url: ApiPath.EmailValidationSubmit+email,
        params: {
          passcode: inputOtp,
        },
      };
      let response = await ApiRequest(emailVeri);
      setLoading(false);
      if (response.flag == false) {
        setError(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        if (response.data.status == "OK") {
          setError([]);
          localStorage.setItem(`${customer_name}_USER_ACCEPT`, emailTemp);
          history.push(`/${customer_name}/template/user-form`);
        } else {
          setError(response.data.message);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
    }
  };

  //Resend Click function
  const resendClick = async () => {
    setSSNValue([
      { id: 1, value: "" },
      { id: 2, value: "" },
      { id: 3, value: "" },
      { id: 4, value: "" },
      { id: 5, value: "" },
      { id: 6, value: "" },
    ]);
    setError([]);
    document.querySelector(`input[name="1"]`).focus();
    setLoading(true);
    let userlogin = {
      method: "post",
      package_name: "recruit",
      url: ApiPath.EmailValidationResend+tempID,
      params: {
        email: email,
        edit_status: false,
      },
    };
    let response = await ApiRequest(userlogin);
    setLoading(false);
    if (response.flag == false) {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        setError([]);
        localStorage.setItem(`${customer_name}_USER_EMAIL`, JSON.stringify(email));
        localStorage.setItem(`${customer_name}_TEMPLATE_ID`, JSON.stringify(tempID));
        setSuccess([response.data.message]);
        history.push(`/${customer_name}/template/email-verification`);
      } else {
        setError(response.data.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <Loading start={loading} />
      <EmailVerifiactionForm
        keyDownHandler={keyDownHandler}
        inputHandleChange={inputHandleChange}
        submitClick={submitClick}
        resendClick={resendClick}
        ssnValues={ssnValues}
        zoomSize={zoomSize}
        error={error}
        success={success}
        inputHandleChangeMobile={inputHandleChangeMobile}
        ssnValuesMobile={ssnValuesMobile}
      />
    </>
  );
};
export default EmailVerifiaction;
