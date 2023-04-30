/**  User Form Index
 *
 * @author Myo Thiha Naing
 * @modified by Yamin Zaw
 * @create 17/6/2022
 *
 */
import React, { useEffect, useState } from "react";
import Loading from "../common/Loading";
import ResumeConfirmMessage from "../common/ResumeConfirmMessage";
import { useHistory } from "react-router-dom";
import CommonMessage from "../common/CommonMessage";
import Moment from "moment";
import {
  containsSpecialChars,
  isValidURL,
  numberChk,
  validateName
} from "../common/CommonValidation";
import { ApiRequest } from "../common/ApiRequest";
import UserFormTemplateTwo from "./UserFormTemplateTwo";
import UserFormTemplateOne from "./UserFormTemplateOne";
import UserFormTemplateThree from "./UserFormTemplateThree";
import MsgBox from "./MsgBox";
import ApiPath from "../common/ApiPath";
import { is2Decimal } from "../common/CommonValidation";

const UserFormIndex = () => {
  let customer_name = window.location.href.split("/")[3];
  const [loading, setLoading] = useState(false); //For Loading
  const [checked, setChecked] = useState(false); //for check is require field or not
  const [agreeChecked, setAgreeChecked] = useState(true); //for check is require field or not
  const [downloadcheck, setDownloadcheck] = useState(0); //For Download Check
  const [value, setValue] = useState([]); //To Send Value for Save Api and Update Api
  const [applicantid, setApplicantID] = useState(); //for Applicant-ID FormLoad ID
  const [show, setShow] = useState(false); // Confirmation Box Show
  const [confirmType, setConfirmType] = useState(""); // confirmation box type
  const [confirmHeader, setConfirmHeader] = useState(""); // Conffirmation Header Type
  const [confirmContent, setConfirmContent] = useState(""); // Confirmation Content Type
  const [error, setError] = useState([]); //for Error Message
  const [captureError, setCaptureError] = useState(); //for capture error message
  const [agreeError, setAgreeError] = useState(); //for agree error message
  const [success, setSuccess] = useState([]); //for Succsess Message
  const [heading, setHeading] = useState([]); //for Heading Data
  const [templatename, setTemplateName] = useState(""); //for Resume Content Name
  const [editstatus, setEditStatus] = useState(false); // For Update Api Status
  const [headingname, setHeadingName] = useState([]); //For Error Message HeadingName
  const [image, setImage] = useState(""); //Image Attach
  const [layoutId, setLayoutId] = useState(); //for layout id
  const [errorMessage, setErrorMessage] = useState(""); //for error message of error message form
  const [successShow, setSuccessShow] = useState(false);//for show success modal box
  const [positionName, setPositionName] = useState("");//for position name
  const [categoryName, setCategoryName] = useState("");//for category name
  const [imagepreviewurl, setImagePreviewUrl] = useState(process.env.PUBLIC_URL + "/image/selectpic.png"); //For Image Preview UR
  const [filename, setFileName] = useState([]); // for file name in uploading file
  const [captureValue, setCaptureValue] = useState(""); //for store capture value
  const [currency, setCurrency] = useState("");//for currency value
  let user_email = JSON.parse(localStorage.getItem(`${customer_name}_USER_EMAIL`)); //Session Data Email
  let template_id = JSON.parse(localStorage.getItem(`${customer_name}_TEMPLATE_ID`)); //Session Data Template ID
  const [resumeTitle, setResumeTitle] = useState(false);//for know resume title
  const [captchaText, setCaptchaText] = useState();//for show captcha text
  const history = useHistory(); // route Change state
  let file_err;//for file error
  let temp_cap_err;//for tempory capture error
  let list = ""; // for form load api heading list
  var re = /^\d+((.)|(.\d{0,2})?)$/;
  var rgx = /[^0-9a-zA-Z.]/g;

  useEffect(() => {
    (async () => {
      document.body.style.overflow = "auto";
      if (template_id == null) {
        history.push(`/${customer_name}/template/user-login/:id`);
      } else {
        await FormLoad(template_id, user_email);
        makeCaptcha(6)
        document.body.style.overflowY = "auto";
        return;
      }
    })();
  }, []);

  function makeCaptcha(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setCaptchaText(result);
  }

  //FormLoad API for applicant
  const FormLoad = async (id, email) => {
    setLoading(true);
    let err = [];
    let headname = [];
    let user_accept = localStorage.getItem(`${customer_name}_USER_ACCEPT`);
    let obj = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.UserFormFormLoad + id + "/" + email,
    };
    let response = await ApiRequest(obj);
    setTemplateName(response.data.data.resume_title);
    if (user_accept != `${email}${id}`) {
      history.push(`/${customer_name}/template/user-login/${id}`);
    }
    if (response.flag == false) {
      setError(response.message);
      if (response.message == "Template does not exist!") {
        history.push(`/${customer_name}/template/user-login/` + template_id);
      }
      if (response.message == "You've already filled this form!") {
        history.push(`/${customer_name}/template/user-login/` + template_id);
      }
      setSuccess([]);
    } else {
      if (response.data.status == "OK") {
        setApplicantID(response.data.data.applicant_id);
        setResumeTitle(response.data.data.resume_title);
        setLayoutId(response.data.data.layout_id);
        setPositionName(response.data.data.position_name);
        setCategoryName(response.data.data.category_name);
        let arr = [];
        let sub_value = [];
        list = response.data.data.template_element_labels;
        list.map((data) => {
          headname.push(data.label_name);
        });
        setHeadingName(headname);
        if (response.data.data.applicant_id == null) {
          list.forEach((data) => {
            if (data.element_type_id == 9) {
              arr.push({
                template_element_label_id: data.template_element_label_id,
                essential_field_id: data.essential_field_id,
                virtual_column: data.virtual_column,
                element_type_id: data.element_type_id,
                require_flag: data.require_flag,
                label_name: data.label_name,
                sub_error: "",
                value: user_email,
              });
            } else if (
              data.element_type_id != 2 &&
              data.element_type_id != 7 &&
              data.element_type_id != 9 &&
              data.label_name != "Currency Type"
            ) {
              arr.push({
                template_element_label_id: data.template_element_label_id,
                essential_field_id: data.essential_field_id,
                virtual_column: data.virtual_column,
                element_type_id: data.element_type_id,
                require_flag: data.require_flag,
                label_name: data.label_name,
                value: "",
                sub_error: "",
              });
            }
            else if (
              data.label_name == "Currency Type"
            ) {
              arr.push({
                template_element_label_id: data.template_element_label_id,
                essential_field_id: data.essential_field_id,
                virtual_column: data.virtual_column,
                element_type_id: data.element_type_id,
                require_flag: data.require_flag,
                label_name: data.label_name,
                value: "MMK",
                sub_error: "",
              });
            }
            else if (data.element_type_id == 7) {
              arr.push({
                template_element_label_id: data.template_element_label_id,
                essential_field_id: data.essential_field_id,
                virtual_column: data.virtual_column,
                element_type_id: data.element_type_id,
                require_flag: data.require_flag,
                label_name: data.label_name,
                value: [],
                sub_error: "",
              });
            } else {
              data.input_data_name.forEach((sub) => {
                if (data.level.level_category_id == 0) {
                  sub_value.push({
                    input_data_name: sub,
                    check: false,
                  });
                } else {
                  sub_value.push({
                    input_data_name: sub,
                    level_category_id: "",
                    level_name: "",
                    check: false,
                  });
                }
              });
              arr.push({
                template_element_label_id: data.template_element_label_id,
                essential_field_id: data.essential_field_id,
                virtual_column: data.virtual_column,
                element_type_id: data.element_type_id,
                require_flag: data.require_flag,
                label_name: data.label_name,
                value: sub_value,
                sub_error: "",
              });
              sub_value = [];
            }
          });
          setValue(arr);
        }
        setError([]);
        setHeading(response.data.data.template_element_labels);
      } else {
        setError(response.data.data.message);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    if (response.data.data.status == 2) {
      err.push("This form has already been rejected.");
    }
    if (response.data.data.status == 3) {
      err.push("This form has already been processed.");
    }
    if (response.data.data.status == 4) {
      err.push("This form has already been passed.");
    }
    if (response.data.data.status == 5) {
      err.push("This form has already failed.");
    }
    setError(err);
    setLoading(false);
  };

  //Applicant User Info Save and Update
  const SaveData = () => {
    let err = [];
    let result = [];
    const re = /^[0-9\b]|[၀-၉\b]+$/;

    result = value.map((data) => {
      headingname.map((name) => {
        if (data.label_name == name && data.label_name != "Currency Type") {
          if (
            data.value == "" &&
            (data.element_type_id == 1 || data.element_type_id == 3 || data.element_type_id == 6) &&
            data.require_flag == 1
          ) {
            data.sub_error = CommonMessage.JSE001.replace("%s", name);
            return data;
          }
          else if (
            data.value != "" &&
            (data.element_type_id == 1 || data.element_type_id == 3 || data.element_type_id == 6) &&
            data.require_flag == 1
          ) {
            data.sub_error = "";
            return data;
          }

          if (
            data.value == "" &&
            (data.element_type_id == 4 ||
              data.element_type_id == 5 ||
              data.element_type_id == 9 ||
              data.element_type_id == 10 ||
              data.element_type_id == 11 ||
              data.element_type_id == 12) &&
            data.require_flag == 1
          ) {
            data.sub_error = CommonMessage.JSE005.replace("%s", name);
            return data;
          }
          else if (
            data.element_type_id == 4 &&
            data.value != "" &&
            data.label_name == "Name" &&
            (containsSpecialChars(data.value) &&
              !validateName(data.value)) &&
            (data.require_flag == 1 || data.require_flag == 2)
          ) {
            data.sub_error = CommonMessage.JSE028.replace("%s", name);
            return data;
          }
          else if (
            data.element_type_id == 4 &&
            data.value != "" &&
            data.value.length > 255 &&
            (data.require_flag == 1 || data.require_flag == 2)
          ) {
            data.sub_error = CommonMessage.JSE033.replace("%s", name).replace(
              "%s",
              "255"
            );
            return data;
          }
          else if (
            data.element_type_id == 4 &&
            data.value != "" &&
            (data.value.length <= 255) &&
            (data.require_flag == 1 || data.require_flag == 2)
          ) {
            data.sub_error = "";
            return data;
          }
          else if (
            data.value != "" &&
            data.element_type_id == 4 &&
            data.label_name.toLowerCase().includes("age") &&
            (data.require_flag == 1 || data.require_flag == 2) &&
            !re.test(data.value)
          ) {
            data.sub_error = CommonMessage.JSE030.replace("%s", "0")
              .replace("%s", "9")
              .concat(" at " + name, " field!");
            return data;
          } else if (
            data.value != "" &&
            data.element_type_id == 4 &&
            data.label_name.toLowerCase().includes("age") &&
            (data.require_flag == 1 || data.require_flag == 2) &&
            re.test(data.value)
          ) {
            data.sub_error = "";
            return data;
          }
          else if (
            data.element_type_id == 5 &&
            data.value != "" &&
            data.value.length > 1500
          ) {
            data.sub_error = CommonMessage.JSE033.replace("%s", name).replace(
              "%s",
              "1500"
            );
            return data;
          } else if (
            data.element_type_id == 5 &&
            data.value != "" &&
            data.value.length <= 1500
          ) {
            data.sub_error = "";
            return data;
          }
          else if (
            data.element_type_id == 12 &&
            data.value != "" &&
            (data.require_flag == 1 || data.require_flag == 2) &&
            isValidURL(data.value) == false
          ) {
            data.sub_error = CommonMessage.JSE046.replace(
              "%s",
              "URL"
            ).replace("%s", name);
            return data;
          }
          else if (
            data.element_type_id == 12 &&
            data.value != "" &&
            (data.require_flag == 1 || data.require_flag == 2) &&
            isValidURL(data.value) == true
          ) {
            data.sub_error = "";
            return data;
          }
          else if (
            data.element_type_id == 10 &&
            data.label_name != "Total Experience (Year)" &&
            data.value != "" &&
            (data.require_flag == 1 || data.require_flag == 2) &&
            numberChk(data.value) == false
          ) {
            data.sub_error = CommonMessage.JSE046.replace(
              "%s",
              "number"
            ).replace("%s", name);
            return data;
          }
          else if (
            data.element_type_id == 10 &&
            data.label_name == "Total Experience (Year)" &&
            data.value != "" &&
            (data.require_flag == 1 || data.require_flag == 2) &&
            (!re.test(data.value) || rgx.test(data.value))
          ) {
            data.sub_error = CommonMessage.JSE005.replace("%s", "number and two decimal place in Total Experience (Year) field");
            return data;
          }
          else if (
            data.element_type_id == 10 &&
            data.value != "" &&
            (data.require_flag == 1 || data.require_flag == 2) &&
            numberChk(data.value) == true
          ) {
            data.sub_error = "";
            return data;
          }

          if (
            data.value != "" &&
            (data.element_type_id == 10) &&
            (data.require_flag == 1 || data.require_flag == 2) &&
            !re.test(data.value)
          ) {
            data.sub_error = CommonMessage.JSE030.replace("%s", "0")
              .replace("%s", "9")
              .concat(" at " + name, " field!");
            return data;
          }
          else if (
            data.element_type_id == 11 &&
            data.value != "" &&
            data.value.length > 20
          ) {
            data.sub_error = name + " must be less than or equal 20 characters!";
            return data;
          } else if (
            data.value != "" &&
            (data.element_type_id == 10) &&
            (data.require_flag == 1 || data.require_flag == 2) &&
            re.test(data.value)
          ) {
            data.sub_error = "";
            return data;
          } else if (
            data.value != "" &&
            (data.element_type_id == 11) &&
            (data.require_flag == 1 || data.require_flag == 2)
          ) {
            data.sub_error = "";
            return data;
          }

          if (
            data.value == "" &&
            (data.element_type_id == 8) &&
            data.require_flag == 1
          ) {
            data.sub_error = CommonMessage.JSE051.replace("%s", "profile");
            return data;
          } else if (
            data.value != "" &&
            (data.element_type_id == 8)
          ) {
            data.sub_error = "";
            return data;
          }

          if (
            data.value == "" &&
            (data.element_type_id == 7) &&
            data.require_flag == 1
          ) {
            data.sub_error = CommonMessage.JSE051.replace("%s", "attach file");
            return data;
          }
          else if (
            data.element_type_id == 7
          ) {
            data.sub_error = "";
            return data;
          }

          if (data.element_type_id == 2 && data.require_flag == 1) {
            let checkFlag = false;
            let selectFlag = true;
            data.value.map((d) => {
              if (d.check == true) {
                checkFlag = true;
                if (d.level_name == "") {
                  selectFlag = false;
                }
              }
            });

            if (checkFlag == false) {
              data.sub_error = CommonMessage.JSE001.replace("%s", name);
              return data;
            }
            if (selectFlag == false) {
              data.sub_error =
                CommonMessage.JSE052.replace("%s", name);
              return data;
            }
            if (checkFlag == true && selectFlag == true) {
              data.sub_error = "";
              return data;
            }
          }
          if (data.element_type_id == 2 && data.require_flag == 2) {
            let isCheck = false;
            let isSelect = true;
            data.value.map((checkbox) => {
              if (checkbox.check) {
                isCheck = true;
                if (checkbox.level_name == "") {
                  isSelect = false;
                }
              }
            });
            if (isCheck) {
              if (!isSelect) {
                data.sub_error =
                  CommonMessage.JSE052.replace("%s", name);
                return data;
              } else {
                data.sub_error = "";
                return data;
              }
            }
          }
        }
        return name;
      });
      return data;
    });
    if (captureValue == captchaText) {
      setCaptureError("");
      temp_cap_err = "";
    }
    else if (captureValue == "" || captureValue == null) {
      setCaptureError(CommonMessage.JSE005.replace("%s", "captcha value"));
      temp_cap_err = "cap_err";
    } else {
      setCaptureError(CommonMessage.JSE047.replace("%s", "Captcha value"));
      temp_cap_err = "cap_err";
    }

    if (agreeChecked == false) {
      setAgreeError(CommonMessage.JSE043.replace("%s", "agree"));
    }

    //If No Error Save and Update ConfirmBox Pop-up
    {
      value.map((v) => {
        if (v.sub_error != "") {
          err.push(v.sub_error);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      });
    }
    setValue(result);
    if (!editstatus && err.length == 0 && agreeChecked == true && temp_cap_err == "") {
      setShow(true);
      setConfirmHeader("<h5 style='color:#4e57aa'>Save Comfirmation</h5>");
      setConfirmContent("<p>Are you sure want to save?</p>");
      setConfirmType("save");;
    }
  };

  //Confirmation Box Save Function
  const saveOK = async () => {
    setLoading(true);
    setShow(false);
    if (downloadcheck == 1) {
      let obj = {
        package_name: "recruit",
        method: "post",
        url: ApiPath.UserFormSave,
        params: {
          template_job_position_id: template_id,
          applicant_email: user_email,
          resume_title: templatename,
          fields: value,
          checked: downloadcheck,
        },
        type: "blob",
      };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setError("Something went wrong,Please try again");
        setSuccessShow(true);
        if (
          response.message ==
          "This template is no longer avaliable. For more info, please contact with admin!"
        ) {
          setTimeout(() => {
            history.push(`/${customer_name}/template/user-login/` + template_id);
          }, 2500);
        }
        setSuccess([]);
      } else {
        if (response.statusText == "OK") {
          setSuccess("You have applied job successfully!");
          setSuccessShow(true);
          let tmpName = "";
          let getHeader = response.headers["content-disposition"];
          // check header contains utf-8 encoding
          if (getHeader.indexOf("filename*=utf-8") !== -1) {
            // get only utf-8 file name from getHeader variable
            tmpName = getHeader.split("filename*=utf-8")[1];
            tmpName = decodeURIComponent(tmpName);
          } else {
            tmpName = getHeader.split("filename=")[1];
          }
          let filename = tmpName.replace(/['"]+/g, "");
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          let arr = [];
          let sub_value = [];
          heading.forEach((sec) => {
            if (
              sec.element_type_id != 2 &&
              sec.element_type_id != 7 &&
              sec.element_type_id != 6
            ) {
              arr.push({
                template_element_label_id: sec.template_element_label_id,
                element_type_id: sec.element_type_id,
                essential_field_id: sec.essential_field_id,
                require_flag: sec.require_flag,
                label_name: sec.label_name,
                value: "",
              });
            } else if (sec.element_type_id == 6) {
              arr.push({
                template_element_label_id: sec.template_element_label_id,
                element_type_id: sec.element_type_id,
                essential_field_id: sec.essential_field_id,
                require_flag: sec.require_flag,
                label_name: sec.label_name,
                value: "",
              });
            } else if (sec.element_type_id == 7) {
              arr.push({
                template_element_label_id: sec.template_element_label_id,
                element_type_id: sec.element_type_id,
                essential_field_id: sec.essential_field_id,
                require_flag: sec.require_flag,
                label_name: sec.label_name,
                value: [],
              });
            } else {
              sec.input_data_name.forEach((sub) => {
                if (sec.level.level_category_id == 0) {
                  sub_value.push({
                    input_data_name: sub,
                    check: false,
                    value: "",
                  });
                } else {
                  sub_value.push({
                    input_data_name: sub,
                    level_category_id: "",
                    level_name: "",
                    check: false,
                  });
                }
              });
              arr.push({
                template_element_label_id: sec.template_element_label_id,
                element_type_id: sec.element_type_id,
                essential_field_id: sec.essential_field_id,
                require_flag: sec.require_flag,
                label_name: sec.label_name,
                value: sub_value,
              });
              sub_value = [];
            }
          });
          setValue(arr);
          setChecked(checked.is_checked == false);
          setFileName([]);
          setImage("");
          setImagePreviewUrl(process.env.PUBLIC_URL + "/image/selectpic.png");
          localStorage.removeItem(`${customer_name}_EMAIL_VERIFIED`);
          localStorage.removeItem(`${customer_name}_USER_ACCEPT`);
          localStorage.removeItem(`${customer_name}_TEMPLATE_ID`)
          setError([]);
          setImage({});
          setAgreeChecked(true);
          setCaptureValue("");

        } else {
          setError("Something went wrong,Please try again");
          setSuccessShow(true);
          setSuccess([]);
        }
      }
    } else {
      let obj = {
        package_name: "recruit",
        method: "post",
        url: ApiPath.UserFormSave,
        params: {
          template_job_position_id: template_id,
          applicant_email: user_email,
          resume_title: templatename,
          fields: value,
          checked: downloadcheck,
        },
      };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setError("Something went wrong,Please try again");
        setSuccessShow(true);
        if (
          response.message ==
          "This template is no longer avaliable. For more info, please contact with admin!"
        ) {
          setTimeout(() => {
            history.push(`/${customer_name}/template/user-login/` + template_id);
          }, 2500);
        }
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        if (response.data.status == "OK") {
          setSuccess(response.data.message);
          setSuccessShow(true);
          let arr = [];
          let sub_value = [];
          heading.forEach((sec) => {
            if (
              sec.element_type_id != 2 &&
              sec.element_type_id != 7 &&
              sec.element_type_id != 6
            ) {
              arr.push({
                template_element_label_id: sec.template_element_label_id,
                element_type_id: sec.element_type_id,
                essential_field_id: sec.essential_field_id,
                require_flag: sec.require_flag,
                label_name: sec.label_name,
                value: "",
              });
            } else if (sec.element_type_id == 6) {
              arr.push({
                template_element_label_id: sec.template_element_label_id,
                element_type_id: sec.element_type_id,
                essential_field_id: sec.essential_field_id,
                require_flag: sec.require_flag,
                label_name: sec.label_name,
                value: "",
              });
            } else if (sec.element_type_id == 7) {
              arr.push({
                template_element_label_id: sec.template_element_label_id,
                element_type_id: sec.element_type_id,
                essential_field_id: sec.essential_field_id,
                require_flag: sec.require_flag,
                label_name: sec.label_name,
                value: [],
              });
            } else {
              sec.input_data_name.forEach((sub) => {
                if (sec.level.level_category_id == 0) {
                  sub_value.push({
                    input_data_name: sub,
                    check: false,
                    value: "",
                  });
                } else {
                  sub_value.push({
                    input_data_name: sub,
                    level_category_id: "",
                    level_name: "",
                    check: false,
                    value: "",
                  });
                }
              });
              arr.push({
                template_element_label_id: sec.template_element_label_id,
                element_type_id: sec.element_type_id,
                essential_field_id: sec.essential_field_id,
                require_flag: sec.require_flag,
                label_name: sec.label_name,
                value: sub_value,
              });
              sub_value = [];
            }
          });
          setValue(arr);
          setFileName([]);
          setImage("");
          setImagePreviewUrl(process.env.PUBLIC_URL + "/image/selectpic.png");
          localStorage.removeItem(`${customer_name}_EMAIL_VERIFIED`);
          localStorage.removeItem(`${customer_name}_USER_ACCEPT`);
          localStorage.removeItem(`${customer_name}_TEMPLATE_ID`)
          setError([]);
          setAgreeChecked(true);
          setCaptureValue("");
        } else {
          setError("Something went wrong,Please try again");
          setSuccessShow(true);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
    }

    setLoading(false);
  };

  // PDF Download for Applicant Template Checked and Unchecked
  const DownloadCheck = (e) => {
    let check = e.target.checked;
    setChecked(check);
    if (check) {
      setDownloadcheck(1);
    } else {
      setDownloadcheck(0);
    }
  };
  // for Type ID one Dropdown change function Select Box
  const typeIDOneDropDownChange = (id, val) => {
    let res = value.map((data) => {
      if (data.template_element_label_id == id) {
        data.value = val.target.value;
        return data;
      }
      return data;
    });
    setValue(res);
  };
  // for type ID two check-box change function
  const typeIDTwoChange = (id, checkId) => {
    let res = [];
    res = value.map((data) => {
      if (data.template_element_label_id == id) {
        if (data.value.length > 0) {
          data.value.map((sub) => {
            if (sub.input_data_name == checkId) {
              sub.check = !sub.check;
              return sub;
            }
            return data;
          });
        }
      }
      return data;
    });
    setValue(res);
  };

  // for Type ID two dropdown change function Select Box
  const typeIDTwoDropDownChange = (id, inputChoice, checkId, e) => {
    let res = value.map((data) => {
      if (data.value.length > 0) {
        if (data.template_element_label_id == id) {
          data.value.map((sub) => {
            if (sub.input_data_name == inputChoice) {
              if (
                e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text ==
                "---Select---"
              ) {
                sub.level_category_id = "";
                sub.level_name = "";
              } else {
                sub.level_category_id = checkId;
                sub.level_name =
                  e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text;
              }
              return sub;
            }
            return data;
          });
        }
      }
      return data;
    });
    setValue(res);
  };

  // for Type ID three radio button change function
  const typeIDThreeChange = (id, val, name) => {
    let res = value.map((data) => {
      if (data.template_element_label_id == id) {
        data.value = name;
        return data;
      }
      return data;
    });
    setValue(res);
  };
  // for type ID four text change function
  const typeIDFourChange = (id, val) => {
    let res = value.map((data) => {
      if (data.template_element_label_id == id) {
        data.value = val.target.value;
        return data;
      }
      return data;
    });
    setValue(res);
  };
  //for Type ID five text area change function
  const typeIDFiveChange = (id, val) => {
    let res = value.map((data) => {
      if (data.template_element_label_id == id) {
        data.value = val.target.value;
        return data;
      }
      return data;
    });
    setValue(res);
  };
  //for Type ID six Date Change Function
  const typeIDSixChange = (id, val) => {
    let date = "";
    if (val != null) {
      date = Moment(val).format("YYYY-MM-DD");
    }
    let res = value.map((data) => {
      if (data.template_element_label_id == id) {
        data.value = date;
        return data;
      }
      return data;
    });
    setValue(res);
  };
  //for Type ID seven File Change Function
  const typeIDSevenChange = (id, val) => {
    let res = [];
    let tmp_err = [];
    let base64data = "";
    let tmp = [];
    let File = val.target.files;
    let fSize = "";
    let size = "";
    let name = "";
    setLoading(true);
    for (let i = 0; i < File.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(File[i]);
      reader.onloadend = () => {
        base64data = reader.result;
        fSize = File[i].size;
        name = File[i].name;
        size = Math.round(fSize / 1024);

        const extension = name.substring(name.lastIndexOf('.') + 1, name.length);

        if (extension == "pdf" ||
          extension == "xlsx" ||
          extension == "xls" ||
          extension == "doc" ||
          extension == "docx" ||
          extension == "jpg" || extension == "jpeg" || extension == "png") {
          if (size >= 1025) {
            setSuccess([]);
            file_err = CommonMessage.JSE014.replace("%s", "This file's size").replace("%s", "1M");
            setFileName(filename);
          } else {
            setError([]);
            if (i == File.length - 1) {
              let filtered = value.filter((item) => {
                return item.template_element_label_id == id;
              });
              filtered[i].value.map((element) => {
                tmp.push(element.name);
              });
            }
            setFileName(tmp);
            if (tmp.length > 2) {
              file_err = CommonMessage.JSE009;
              setSuccess([]);
            } else {
              res = value.map((data) => {
                if (data.template_element_label_id == id) {
                  data.value.push({ data: base64data, name: name });
                  duplicateTest(name, id, tmp);
                  return data;
                }
                return data;
              });
              setValue(res);
            }
          }
        } else {
          file_err = CommonMessage.JSE024;
        }

        if (file_err != "") {
          tmp_err = value.map((v) => {
            if (v.template_element_label_id == id) {
              v.sub_error = file_err
            }
            return v;
          })
        }
        setValue(tmp_err)
      };

    }
    setLoading(false);
  };

  const duplicateTest = (name, id, file_name) => {
    let tmp_err = [];
    file_name.map((i) => {
      if (i == name) {
        file_err = CommonMessage.JSE022;
        value.map((subData) => {
          if (subData.value.length >= 0) {
            if (subData.template_element_label_id == id) {
              file_err = CommonMessage.JSE022;
              subData.value.pop();
            }
          }
        });
      }
      if (file_err != "") {
        tmp_err = value.map((v) => {
          if (v.template_element_label_id == id) {
            v.sub_error = file_err
          }
          return v;
        })
        setValue(tmp_err)
      }
    });
  };

  // Clear File Attach
  const Clear = (file, e) => {
    let arr;
    let res = [];
    let arr_del = [];

    value.map((v) => {
      if (v.template_element_label_id == e) {
        v.value.map((val) => {
          return arr_del.push(val.name);
        });
      }
    });
    arr = arr_del.filter((d) => {
      return file != d;
    });

    setFileName(arr);
    res = value.map((data) => {
      if (data.template_element_label_id == e) {
        let filter = data.value.filter((el) => {
          return arr.includes(el.name);
        });
        data.value = [...filter];
        data.sub_error = "";
        return data;
      }
      return data;
    });
    setValue(res);
  };

  // Clear FileList from input file
  const clearFile = (id, val) => {
    val.target.value = null;
  };
  //for Type ID eight Image Upload Change Function
  const typeIDEightChange = (id, val) => {
    let res = "";
    let base64data = "";
    let img_err = "";
    let tmp_err = [];
    let File = val.target.files;
    if (File.length > 0) {
      let tmp_name = val.target.files[0].name;
      const extension = tmp_name.substring(tmp_name.lastIndexOf('.') + 1, tmp_name.length);
      if (extension != "jpg" && extension !== "jpeg" && extension != "png") {
        img_err = CommonMessage.JSE024;
        res = value.map((data) => {
          if (data.template_element_label_id == id) {
            data.value = "";
            return data;
          }
          return data;
        });
        setValue(res);
        setImagePreviewUrl(process.env.PUBLIC_URL + "/image/selectpic.png");
        setImage({});
      }
      else if (extension == "jpg" || extension == "jpeg" || extension == "png") {
        setError([]);
        var reader = new FileReader();
        reader.readAsDataURL(File[0]);
        reader.onload = function () {
          base64data = reader.result;
          setImagePreviewUrl(base64data);
          res = value.map((data) => {
            if (data.template_element_label_id == id) {
              data.value = base64data;
              data.sub_error = "";
              return data;
            }
            return data;
          });
          setValue(res);
        };
        let img = val.target.files[0];
        setImage(img);
      }
    }
    if (img_err != "") {
      tmp_err = value.map((v) => {
        if (v.template_element_label_id == id) {
          v.sub_error = img_err
        }
        return v;
      })
      setValue(tmp_err)
    }
  };

  const ClearImage = (id, e) => {
    let res = value.map((data) => {
      if (data.template_element_label_id == id) {
        data.value = "";
      }
      return data;
    });
    setValue(res);
    setImagePreviewUrl(process.env.PUBLIC_URL + "/image/selectpic.png");
    setImage({});
  };

  // for type ID nine mail textbox function
  const typeIDNineChange = (id, val) => {
    let res = value.map((data) => {
      if (data.template_element_label_id == id) {
        data.value = val.target.value;
        return data;
      }
      return data;
    });
    setValue(res);
  };

  const typeIDTenChange = (id, val, label) => {
    let result = "";
    if (label == "Total Experience (Year)") {
      let value = val.target.value;

      let res = is2Decimal(value);
      if (value != "") {
        if (res == true && value != "00") {
          if (value.length > 1) {
            let first = value.charAt(0);
            let second = value.charAt(1);
            if (first == 0 && second == ".") {
              result = value;
            } else if (first != 0) {
              result = value;
              if (Math.trunc(result) > 99) {
                result = "";
              }
              else if (value.includes(".")) {
                var getDecimalVal = result.toString().indexOf(".");
                var decimalPart = result.toString().substring(getDecimalVal + 1);
                if (decimalPart > 11) {
                  result = "";
                }
              }

            }
          } else {
            result = value;
          }
        }
      } else {
        result = "";
      }
    }

    let res_ten = value.map((data) => {
      if (data.template_element_label_id == id) {
        if (data.label_name != "Total Experience (Year)") {
          data.value = val.target.value;
        } else if (data.label_name == "Total Experience (Year)") {
          data.value = result;
        }
        return data;
      }
      return data;
    });
    setValue(res_ten);

  };

  // for type ID eleven phone number text box change
  const typeIDElevenChange = (id, val) => {
    let res = value.map((data) => {
      if (data.template_element_label_id == id) {
        data.value = val.target.value;
        return data;
      }
      return data;
    });
    setValue(res);
  };

  // for type ID twelve url textbox
  const typeIDTwelveChange = (id, val) => {
    let res = value.map((data) => {
      if (data.template_element_label_id == id) {
        data.value = val.target.value;
        return data;
      }
      return data;
    });
    setValue(res);
  };

  /**
   * get template title from input field
   * @author yaminzaw
   * @create 17/06/2022
   * @param e
   */
  const handleChangeCapture = (e) => {
    setCaptureValue(e.target.value);
  };

  /**
   * OK button of success modal
   * @author yaminzaw
   * @create 16/11/2022
   * @param e
   */
  const successOk = () => {
    setSuccessShow(false);
    history.push(`/${customer_name}/template/user-login/` + template_id);
  };

  /**
   * change for currency of expected salary
   * @author yaminzaw
   * @create 25/01/2023
   * @param e
   */
  const currencyChange = (e) => {
    setCurrency(e.target.value);
    let res = value.map((data) => {
      if (data.label_name == "Currency Type") {
        data.value = e.target.value;
        return data;
      }
      return data;
    });
    setValue(res);
  };
  return (
    <>
      <Loading start={loading} />
      <ResumeConfirmMessage
        show={show}
        type={confirmType}
        header={confirmHeader}
        content={confirmContent}
        cancel={() => setShow(false)}
        saveOK={saveOK}
        okButton={"Yes"}
        cancelButton={"Cancel"}
      />
      {layoutId == 3 && (
        <UserFormTemplateThree
          heading={heading}
          checked={checked}
          value={value}
          image={image}
          headingname={headingname}
          imagepreviewurl={imagepreviewurl}
          templatename={templatename}
          editstatus={editstatus}
          Clear={Clear}
          SaveData={SaveData}
          DownloadCheck={DownloadCheck}
          typeIDOneDropDownChange={typeIDOneDropDownChange}
          typeIDTwoChange={typeIDTwoChange}
          typeIDTwoDropDownChange={typeIDTwoDropDownChange}
          typeIDThreeChange={typeIDThreeChange}
          typeIDFourChange={typeIDFourChange}
          typeIDFiveChange={typeIDFiveChange}
          typeIDSixChange={typeIDSixChange}
          typeIDSevenChange={typeIDSevenChange}
          typeIDEightChange={typeIDEightChange}
          typeIDNineChange={typeIDNineChange}
          typeIDTenChange={typeIDTenChange}
          typeIDElevenChange={typeIDElevenChange}
          typeIDTwelveChange={typeIDTwelveChange}
          clearFile={clearFile}
          ClearImage={ClearImage}
          agreeChecked={agreeChecked}
          captureValue={captureValue}
          handleChangeCapture={handleChangeCapture}
          categoryName={categoryName}
          positionName={positionName}
          captchaText={captchaText}
          captureError={captureError}
          makeCaptcha={makeCaptcha}
          currencyChange={currencyChange}
          currency={currency}
          resumeTitle={resumeTitle}
        />
      )}
      {layoutId == 2 && (
        <UserFormTemplateTwo
          heading={heading}
          checked={checked}
          value={value}
          image={image}
          filename={filename}
          headingname={headingname}
          imagepreviewurl={imagepreviewurl}
          templatename={templatename}
          editstatus={editstatus}
          Clear={Clear}
          SaveData={SaveData}
          DownloadCheck={DownloadCheck}
          typeIDOneDropDownChange={typeIDOneDropDownChange}
          typeIDTwoChange={typeIDTwoChange}
          typeIDTwoDropDownChange={typeIDTwoDropDownChange}
          typeIDThreeChange={typeIDThreeChange}
          typeIDFourChange={typeIDFourChange}
          typeIDFiveChange={typeIDFiveChange}
          typeIDSixChange={typeIDSixChange}
          typeIDSevenChange={typeIDSevenChange}
          typeIDEightChange={typeIDEightChange}
          typeIDNineChange={typeIDNineChange}
          typeIDTenChange={typeIDTenChange}
          typeIDElevenChange={typeIDElevenChange}
          typeIDTwelveChange={typeIDTwelveChange}
          clearFile={clearFile}
          ClearImage={ClearImage}
          agreeChecked={agreeChecked}
          captureValue={captureValue}
          handleChangeCapture={handleChangeCapture}
          captureError={captureError}
          agreeError={agreeError}
          categoryName={categoryName}
          positionName={positionName}
          captchaText={captchaText}
          makeCaptcha={makeCaptcha}
          currencyChange={currencyChange}
          currency={currency}
          resumeTitle={resumeTitle}
        />
      )}
      {layoutId == 1 && (
        <UserFormTemplateOne
          heading={heading}
          checked={checked}
          value={value}
          image={image}
          headingname={headingname}
          imagepreviewurl={imagepreviewurl}
          templatename={templatename}
          editstatus={editstatus}
          Clear={Clear}
          SaveData={SaveData}
          DownloadCheck={DownloadCheck}
          typeIDOneDropDownChange={typeIDOneDropDownChange}
          typeIDTwoChange={typeIDTwoChange}
          typeIDTwoDropDownChange={typeIDTwoDropDownChange}
          typeIDThreeChange={typeIDThreeChange}
          typeIDFourChange={typeIDFourChange}
          typeIDFiveChange={typeIDFiveChange}
          typeIDSixChange={typeIDSixChange}
          typeIDSevenChange={typeIDSevenChange}
          typeIDEightChange={typeIDEightChange}
          typeIDNineChange={typeIDNineChange}
          typeIDTenChange={typeIDTenChange}
          typeIDElevenChange={typeIDElevenChange}
          typeIDTwelveChange={typeIDTwelveChange}
          clearFile={clearFile}
          ClearImage={ClearImage}
          agreeChecked={agreeChecked}
          captureValue={captureValue}
          handleChangeCapture={handleChangeCapture}
          captureError={captureError}
          agreeError={agreeError}
          categoryName={categoryName}
          positionName={positionName}
          captchaText={captchaText}
          makeCaptcha={makeCaptcha}
          currencyChange={currencyChange}
          currency={currency}
          resumeTitle={resumeTitle}
        />
      )}
      <MsgBox
        show={successShow}
        cancel={() => setSuccessShow(false)}
        successOk={successOk}
        success={success}
        error={error}
        layoutId={layoutId}
      />
    </>
  );
};
export default UserFormIndex;
