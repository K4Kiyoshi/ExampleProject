/* eslint-disable jsx-a11y/alt-text */

/**
 *SkillTestPage
 *
 * @author YuwaKoKo
 *
 * @create 20/12/2022
 *
 */

import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CLabel,
  CInput,
  CImg,
  CInputGroup,
  CTooltip,
  CSelect,
} from "@coreui/react";
import SuccessError from "../../common/SuccessError";
import { ApiRequest } from "../../common/ApiRequest";
import Loading from "../../common/Loading";
import CommonMessage from "../../common/CommonMessage";
import { useHistory } from "react-router-dom";
import CommonAutocomplete from "../../common/CommonAutocomplete";
import ResumeConfirmMessage from "../../common/ResumeConfirmMessage";
import ApiPath from "../../common/ApiPath";
import { useTranslation } from "react-i18next";

const SkillTestPage = () => {
  let customer_name = window.location.href.split("/")[3];
  const { t } = useTranslation();
  let history = useHistory();
  const [success, setSuccess] = useState([]); // for success messages
  const [loading, setLoading] = useState(false); // For Loading
  const [startDate, setStartDate] = useState(""); // start date for pop up box
  const [endDate, setEndDate] = useState(""); // end date for pop up box
  const [mainTable, setMainTable] = useState([]); //for status data
  const [fileSelectError, setFileSelectError] = useState([]); // for clicked data
  const [uploadFile, setUploadFile] = useState([]); // file data for skill test pop up box
  const [uploadFileName, setUploadFileName] = useState([]); // file name for skill test pop up box
  const [skillEmail, setSkillEmail] = useState(""); // email state for skill test pop up box
  const [finalAllCheck, setFinalAllCheck] = useState(false); // for final check box (true,false)
  const [empName, setEmpName] = useState(""); //empName autoComplete
  const [empNameData, setEmpNameData] = useState([]); // empNameData autoComplete
  const [checkerPosition, setCheckerPosition] = useState(""); //checkerPosition State
  const [checkerEmail, setCheckerEmail] = useState(""); //Checker Email
  const [checkedClickedData, setCheckedClickedData] = useState([]); //
  const [confirmHeader, setConfirmHeader] = useState(""); //for confirm header
  const [confirmShow, setConfirmShow] = useState(false); // confirmation box show
  const [deleteId, setDeleteId] = useState(""); //for delete id
  const [tableAllCheck, setTableAllCheck] = useState(false); // for final check box (true,false)
  const [contentOK, setContentOk] = useState(""); //for ok button of comfirm box
  const [confirmContent, setConfirmContent] = useState(""); //for confirm content
  const [confirmType, setConfirmType] = useState(""); // confirmation box type
  const [checkTable, setCheckTable] = useState([]);

  const [positionData, setPositionData] = useState([]);

  /**Start select autocomplete */
  const selectAutocomplete = async (val, obj) => {
    let object;

    object = {
      url: ApiPath.ERPNameAutocompleteSelect,
      method: "post",
      package_name: "erp",
      params: {
        id: obj.id,
      },
    };

    let response = await ApiRequest(object);
    if (response.flag === false) {
      setFileSelectError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setFileSelectError([]);
      if (response.data.name !== null) {
        setEmpName(response.data.data[0].name);
      } else {
        setEmpName("");
      }
    }
  };
  //status from database called by api
  let getPosition = async (i) => {
    setLoading(true);
    let obj = {
      method: "get",
      package_name: "erp",
      url: ApiPath.ERPPosition,
    };
    let response = await ApiRequest(obj);
    if (response.flag == false) {
      setFileSelectError(response.message);
    } else {
      if (response.data.status == "OK") {
        setPositionData(response.data.data);

        setFileSelectError([]);
      } else {
        setSuccess([]);
        setFileSelectError([response.data.data]);
        setPositionData([]);
      }
    }
    setLoading(false);
  };

  //delete buttom Click function
  const deleteClick = (id) => {
    setDeleteId(id);
    setConfirmShow(true);
    setConfirmHeader(`<h5 style='color:red'>${t("Delete Confirmation")}</h5>`);
    setConfirmContent(`<p>${t("Are you sure want to delete?")}</p>`);
    setConfirmType("delete");
    setContentOk(t("Delete"));
  };

  //Interviewer main check box change function
  let tableMainCheckboxChange = () => {
    setFileSelectError([]);
    setTableAllCheck(!tableAllCheck);
    let data = checkTable.map((data) => {
      data.bio_time_emp_id = !tableAllCheck;
      return data;
    });
    setCheckTable(data);
  };

  //Interviewer sub check box change function
  let tableSubCheckboxChange = (id) => {
    setFileSelectError([]);
    let flg = true;
    let data = checkTable.map((data) => {
      if (data.employee_id == id) {
        data.bio_time_emp_id = !data.bio_time_emp_id;
        return data;
      }
      return data;
    });
    data.forEach((main) => {
      if (main.bio_time_emp_id == false) {
        flg = false;
      }
    });
    setTableAllCheck(flg);
    setCheckTable(data);
  };

  //Back key function
  const backkey = () => {
    let checkedID = [];
    mainTable.map((data) => {
      if (data.isChecked == true) {
        checkedID.push(data.applicant_id);
        return data;
      }
      return data;
    });

    localStorage.setItem(
      `${customer_name}_CHECK_ID`,
      JSON.stringify(checkedID)
    );
    localStorage.setItem(
      `${customer_name}_JOB_ID`,
      localStorage.getItem(`${customer_name}_JID`)
    );
    localStorage.setItem(
      `${customer_name}_POS_ID`,
      localStorage.getItem(`${customer_name}_PID`)
    );
    localStorage.setItem(
      `${customer_name}_SU_ID`,
      localStorage.getItem(`${customer_name}_STATUS_ID`)
    );
    localStorage.setItem(
      `${customer_name}_ST_ID`,
      localStorage.getItem(`${customer_name}_STATE_ID`)
    );
    localStorage.setItem(
      `${customer_name}_R_ID`,
      localStorage.getItem(`${customer_name}_R_ID`)
    );
    localStorage.setItem(
      `${customer_name}_SARRAY`,
      localStorage.getItem(`${customer_name}_SARRAY`)
    );
    localStorage.setItem(
      `${customer_name}_SHOW_ARRAY`,
      localStorage.getItem(`${customer_name}_SHOW_ARRAY`)
    );
    localStorage.getItem(
      `${customer_name}_PAGE`,
      localStorage.getItem(`${customer_name}_page`)
    );

    history.push(
      `/${customer_name}/recruit/resume-management/job-applied-list`
    );
    localStorage.removeItem(`${customer_name}_JID`);
    localStorage.removeItem(`${customer_name}_PID`);
    localStorage.removeItem(`${customer_name}_STATUS_ID`);
    localStorage.removeItem(`${customer_name}_STATE_ID`);
    localStorage.removeItem(`${customer_name}_JOB_NAME`);
    localStorage.removeItem(`${customer_name}_POS_NAME`);
  };

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem(`${customer_name}_CLICKED_DATA`)) ==
        null ||
      JSON.parse(localStorage.getItem(`${customer_name}_CLICKED_DATA`)) ==
        undefined
    ) {
      history.push(`/${customer_name}/recruit/job-applied-list`);
    } else {
      setMainTable(
        JSON.parse(localStorage.getItem(`${customer_name}_CLICKED_DATA`))
      );
      localStorage.removeItem(`${customer_name}_CLICKED_DATA`);
    }

    getPosition();
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      let obj = {
        package_name: "erp",
        url: ApiPath.ERPNameAutocompleteSearch,
        method: "post",
        params: {
          search_item: empName,
        },
      };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setFileSelectError(response.message);
        setEmpName("");
      } else {
        setEmpNameData(response.data.data);
      }
      setLoading(false);
    }, 1);

    return () => clearTimeout(delayDebounceFn);
  }, [empName]);

  //Position select change function
  const positionSelectChange = (e) => {
    setCheckerPosition(e.target.value);
  };

  //Final Skill Test on Click function with API
  const finalSkillTestClick = async () => {
    let arr2 = [];

    checkTable.forEach((main) => {
      if (main.bio_time_emp_id == true) {
        arr2.push(main);
      }
    });

    var filtered = uploadFile.filter(function (el) {
      return el != "";
    });
    let errArray = [];
    setFileSelectError([]);

    if (filtered.length > 1) {
      errArray.push(t(CommonMessage.JSE054));
    }
    if (startDate == "") {
      errArray.push(t(CommonMessage.JSE005).replace("%s", t("Start Date")));
    }
    if (endDate == "") {
      errArray.push(t(CommonMessage.JSE005).replace("%s", t("End Date")));
    }

    var mStart = moment(startDate);
    var mEnd = moment(endDate);
    let dateCompare = mStart.isSameOrBefore(mEnd);

    if (dateCompare == false) {
      errArray.push(t(CommonMessage.JSE048));
    }

    if (arr2.length == 0) {
      errArray.push(
        t(CommonMessage.JSE001).replace("%s", t("at least one Checker"))
      );
    }

    if (errArray == [] || errArray == "") {
      setLoading(true);
      let a = [];
      let formData = new FormData();
      formData.append(
        "login_id",
        localStorage.getItem(`${customer_name}_LOGIN_ID`)
      );
      formData.append("state_id", 1);
      formData.append("status", 2);
      formData.append("new_state_id", 2);
      formData.append("new_status", 1);
      formData.append(`resume_title`, mainTable[0].resume_title);

      if (filtered.length == 0) {
        formData.append(`attachment_file`, a);
      } else {
        filtered.forEach((data, i) => {
          formData.append(`attachment_file[${i}]`, data[0]);
        });
      }
      formData.append("ccEmail", skillEmail);
      formData.append("start_date", startDate);
      formData.append("end_date", endDate);
      mainTable.forEach((data, i) => {
        formData.append(
          `template_job_position_id`,
          data.template_job_position_id
        );
        formData.append(`applicant_info[${i}][name]`, data.name);
        formData.append(`applicant_info[${i}][email]`, data.email);
        formData.append(
          `applicant_info[${i}][applicant_id]`,
          data.applicant_id
        );
      });
      arr2.forEach((data, i) => {
        formData.append(`checker_data[${i}][checker_id]`, data.employee_id);
        formData.append(`checker_data[${i}][checker_mail]`, data.email);
      });

      let test = {
        method: "post",
        package_name: "recruit",
        url: ApiPath.SkillTestPageFinalSkillTestClick,
        params: formData,
      };

      let response = await ApiRequest(test);
      if (response.flag == false) {
        setFileSelectError(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        if (finalAllCheck == true) {
          setFinalAllCheck(true);
        } else {
          setFinalAllCheck(false);
        }
      } else {
        if (response.data.status == "OK") {
          setFileSelectError([]);
          setSuccess([response.data.message]);
          localStorage.setItem(
            `${customer_name}_JOB_ID`,
            localStorage.getItem(`${customer_name}_JID`)
          );
          localStorage.setItem(
            `${customer_name}_POS_ID`,
            localStorage.getItem(`${customer_name}_PID`)
          );
          localStorage.setItem(
            `${customer_name}_SU_ID`,
            localStorage.getItem(`${customer_name}_STATUS_ID`)
          );
          localStorage.setItem(
            `${customer_name}_ST_ID`,
            localStorage.getItem(`${customer_name}_STATE_ID`)
          );
          localStorage.setItem(
            `${customer_name}_R_ID`,
            localStorage.getItem(`${customer_name}_R_ID`)
          );
          localStorage.setItem(
            `${customer_name}_SARRAY`,
            localStorage.getItem(`${customer_name}_SARRAY`)
          );
          localStorage.setItem(
            `${customer_name}_SHOW_ARRAY`,
            localStorage.getItem(`${customer_name}_SHOW_ARRAY`)
          );
          localStorage.getItem(
            `${customer_name}_PAGE`,
            localStorage.getItem(`${customer_name}_page`)
          );
          localStorage.setItem(
            `${customer_name}_SUCCESS`,
            response.data.message
          );

          history.push(
            `/${customer_name}/recruit/resume-management/job-applied-list`
          );
          localStorage.removeItem(`${customer_name}_JID`);
          localStorage.removeItem(`${customer_name}_PID`);
          localStorage.removeItem(`${customer_name}_STATUS_ID`);
          localStorage.removeItem(`${customer_name}_STATE_ID`);
          localStorage.removeItem(`${customer_name}_JOB_NAME`);
          localStorage.removeItem(`${customer_name}_POS_NAME`);
          setMainTable([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
          setFileSelectError([response.data.message]);
          setSuccess([]);
        }
      }
      setLoading(false);
    } else {
      setSuccess([]);
      setFileSelectError(errArray);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      errArray = [];
    }
  };

  //Start Date Select Change function in skill test pop up box
  const startDateHandleChange = (val) => {
    setFileSelectError([]);
    let date = "";
    if (val != null) {
      date = moment(val).format("YYYY-MM-DD");
    }
    setStartDate(date);
  };

  //auto complete empName change
  const empNameChange = (e) => {
    setEmpName(e.target.value);
  };

  //End Date Select Change function in skill test pop up box
  const endDateHandleChange = (val) => {
    setFileSelectError([]);
    let date = "";
    if (val != null) {
      date = moment(val).format("YYYY-MM-DD");
    }
    setEndDate(date);
  };

  //delete confirm box delete buttom function
  const deleteOK = () => {
    let resultArray = checkTable.filter((data) => data.employee_id != deleteId);
    setCheckTable(resultArray);
    setConfirmShow(false);
  };

  //File change method
  const handleFileInput = (e) => {
    let tempfile = [];
    let tempName = [];
    let reader = new FileReader();
    let file = e.target.files[0];
    const extension = file.name.substring(
      file.name.lastIndexOf(".") + 1,
      file.name.length
    );

    if (
      extension == "pdf" ||
      extension == "xlsx" ||
      extension == "doc" ||
      extension == "docx"
    ) {
      if (Math.round(e.target.files[0].size / 1024) > 2048) {
        setFileSelectError([t("File must be less than 2 MB.")]);
      } else {
        setFileSelectError([]);
        if (file) {
          reader.onloadend = () => {
            tempfile.push(file);
            tempName.push(file.name);

            uploadFileName.map((fname) => {
              if (fname == file.name) {
                setFileSelectError([t(CommonMessage.JSE022)]);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                tempfile.pop();
                tempName.pop();
              }
            });

            setUploadFile([...uploadFile, tempfile]);
            // setUploadFileName(file.name);
            setUploadFileName([...uploadFileName, tempName]);
          };
          reader.readAsDataURL(file);
        }
      }
    } else {
      setFileSelectError([t(CommonMessage.JSE024)]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  //file clear function
  const clearFile = (i) => {
    let res1 = uploadFile.filter((data, index) => index != i);
    let res2 = uploadFileName.filter((data, index) => index != i);
    setUploadFile(res1);
    setUploadFileName(res2);
  };

  //Skill Email input Value onChange function
  let skillEmailHandleChange = (e) => {
    setSkillEmail(e.target.value);
  };

  const searchClick = () => {
    setFileSelectError([]);
    if (checkerPosition == "" && empName == "") {
      setFileSelectError([
        t(CommonMessage.JSE001).replace(
          "%s",
          t("Checker Name or Checker Position")
        ),
      ]);
    } else {
      search();
      setTableAllCheck(false);
      setCheckTable([]);
    }
  };

  // search API
  let search = async () => {
    setFileSelectError([]);
    setSuccess([]);
    setLoading(true);
    let search;
    search = {
      method: "post",
      package_name: "erp",
      url: ApiPath.ERPNameFinalAutoCompleteSearch,
      params: {
        employee_name: empName,
        email: checkerEmail,
        position_id: checkerPosition,
      },
    };

    let response = await ApiRequest(search);

    if (response.flag === false) {
      setSuccess([]);
      setFileSelectError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status === "OK") {
        let res = response.data.data.map((data) => {
          data.bio_time_emp_id = false;
          return data;
        });
        setCheckTable(res);

        if (response.data.data == "") {
          setFileSelectError([t("Your search did not match any checker!")]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      } else {
        setSuccess([]);
        setFileSelectError([response.data.message]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }

    setLoading(false);
  };
  return (
    <>
      {" "}
      <Loading start={loading} />
      <SuccessError error={fileSelectError} success={success} />
      <CCard style={{ background: "#eff1fe", borderRadius: "10px" }}>
        <CCardBody
          style={{
            background: "#eff1fe",
            borderRadius: "10px",
          }}
        >
          <CRow style={{ borderBottom: "1px solid #4e57aa" }}>
            <CCol lg="12">
              {" "}
              <CLabel
                style={{
                  color: "#4e57aa",
                  width: "100%",
                  fontSize: "22px",
                  padding: "13px",
                  borderRadius: "7px",
                  fontWeight: "bold",
                }}
              >
                <CImg
                  className="user-after"
                  src={
                    process.env.PUBLIC_URL +
                    "/image/material-symbols_arrow-back-rounded.svg"
                  }
                  style={{
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                  }}
                  onClick={backkey}
                ></CImg>
                &nbsp; {t("Skill Assessment")}
              </CLabel>
            </CCol>
          </CRow>
          <u></u>
          <div
            style={{ paddingRight: "30px", paddingLeft: "30px" }}
            className="mt-4"
          >
            <CRow>
              <CCol
                lg="6"
                style={{ textAlign: "start" }}
                className="remark-field"
              >
                <CLabel className="required">{t("Start Date")} </CLabel>
              </CCol>
              <CCol
                lg="6"
                style={{ textAlign: "start" }}
                className="remark-field"
              >
                <CLabel className="required">{t("End Date")}</CLabel>
              </CCol>
            </CRow>

            <CRow style={{ marginBottom: "10px" }}>
              <CCol lg="6">
                <MuiPickersUtilsProvider
                  utils={DateFnsUtils}
                  libInstance={moment}
                >
                  <KeyboardDatePicker
                    InputProps={{
                      readOnly: true,
                      disableUnderline: true,
                    }}
                    clearable
                    format="yyyy/MM/dd"
                    style={{
                      borderRadius: "5px",
                      overflow: "hidden",
                      borderBottom: "1px solid",
                      width: "100%",
                    }}
                    value={
                      startDate == "" || startDate == null ? null : startDate
                    }
                    className="input-field-blue-background"
                    placeholder="yyyy/mm/dd"
                    disablePast
                    onChange={(e) => startDateHandleChange(e)}
                  />
                </MuiPickersUtilsProvider>
              </CCol>
              <CCol lg="6">
                <MuiPickersUtilsProvider
                  utils={DateFnsUtils}
                  libInstance={moment}
                >
                  <KeyboardDatePicker
                    InputProps={{
                      readOnly: true,
                      disableUnderline: true,
                    }}
                    clearable
                    format="yyyy/MM/dd"
                    style={{
                      borderRadius: "5px",
                      overflow: "hidden",
                      borderBottom: "1px solid",
                      width: "100%",
                    }}
                    value={endDate == "" || endDate == null ? null : endDate}
                    className="input-field-blue-background"
                    placeholder="yyyy/mm/dd"
                    minDate={startDate}
                    onChange={(e) => endDateHandleChange(e)}
                  />
                </MuiPickersUtilsProvider>
              </CCol>
            </CRow>
            <br></br>
            <CRow>
              <CCol lg="6" className="remark-field">
                {t("Attachment File")}
              </CCol>
              <CCol lg="6" className="remark-field">
                {t("Inform To")}
              </CCol>
            </CRow>

            <CRow>
              <CCol lg="6" className="mt-2">
                <CInputGroup className="mb-3">
                  <CInput className="input-field-blue-background" readOnly />

                  <CLabel
                    className="userform-attach"
                    htmlFor={`inputGroupFile02`}
                  >
                    {t("Browse")}
                  </CLabel>
                </CInputGroup>
              </CCol>
              <CCol lg="6">
                <CInput
                  className="input-field-blue-background sub-div"
                  placeholder="Enter Email Address"
                  type="text"
                  value={skillEmail}
                  onChange={(e) => skillEmailHandleChange(e)}
                />
              </CCol>
            </CRow>
            <CRow>
              <input
                className="input-field"
                hidden
                accept=".pdf,.xlsx,.doc,.docx"
                type="file"
                value=""
                id="inputGroupFile02"
                onChange={(e) => handleFileInput(e)}
              />
            </CRow>

            <CRow>
              <CCol lg="6">
                {uploadFile.length > 0 &&
                  uploadFileName.map((file, index) => {
                    return (
                      <div key={index}>
                        {file != "" && (
                          <>
                            <CRow style={{ marginBottom: "20px" }}>
                              <CCol lg="10">
                                <ul>
                                  <li>{file}</li>
                                </ul>
                              </CCol>
                              <CCol lg="1">
                                <CButton
                                  style={{ padding: "0px" }}
                                  onClick={() => clearFile(index)}
                                >
                                  <CImg
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      borderRadius: "50px",
                                    }}
                                    src="/avatars/crossblack.png"
                                  />
                                </CButton>
                              </CCol>
                              <CCol lg="1"></CCol>
                            </CRow>
                          </>
                        )}
                      </div>
                    );
                  })}
              </CCol>
              <CCol lg="6"></CCol>
            </CRow>
          </div>
        </CCardBody>
      </CCard>
      <CCard style={{ borderRadius: "10px" }}>
        <CCardBody>
          <div style={{ paddingRight: "30px", paddingLeft: "30px" }}>
            <CRow className="mt-">
              <CCol lg="5">
                <CLabel className="remark-text">
                  {t("Search Checker Name")}
                </CLabel>
              </CCol>
              <CCol lg="2"></CCol>
              <CCol lg="5">
                <CLabel className="remark-text">
                  {t("Search Checker Position")}
                </CLabel>
              </CCol>
            </CRow>
            <CRow className="mt-1">
              <CCol lg="5">
                <CommonAutocomplete
                  style={{ width: "100%" }}
                  onChange={empNameChange}
                  onSelect={selectAutocomplete}
                  items={empNameData}
                  name={empName}
                  placeholder={t("Enter Name")}
                />
              </CCol>
              <CCol lg="2"></CCol>
              <CCol lg="5">
                <CSelect
                  className="input-field auto-complete-top"
                  onChange={positionSelectChange}
                  value={checkerPosition}
                >
                  <option value="">{t("---Select Position---")}</option>
                  {positionData != "" &&
                    positionData.map((data, index) => {
                      return (
                        <option key={index} value={data.id}>
                          {data.position_name}
                        </option>
                      );
                    })}
                </CSelect>
              </CCol>
            </CRow>
            <br></br>
            <br></br>
            <CRow>
              <CCol lg="5" sm="5" xs="5"></CCol>
              <CCol lg="2" sm="2" xs="2" style={{ textAlign: "center" }}>
                <CButton
                  type="button"
                  className="btn-create btn-add"
                  onClick={searchClick}
                >
                  {t("Search")}
                </CButton>
              </CCol>
              <CCol lg="5" sm="5" xs="5"></CCol>
            </CRow>
          </div>
          {checkTable.length > 0 && (
            <>
              <CRow
                style={{ borderBottom: "1px solid #EBECEE", marginTop: "20px" }}
              ></CRow>

              <CRow className="mt-4">
                <CCol lg="10">
                  <CLabel
                    className="remark-text"
                    style={{ marginLeft: "20px", fontSize: "18px" }}
                  >
                    {t("Interviewer List")}
                  </CLabel>
                </CCol>
                <CCol lg="2" style={{ textAlign: "end" }}>
                  <p className="font-weight-bold" style={{ marginTop: "5px" }}>
                    <span className="hideRow">{t("Total Row")}:</span>{" "}
                    {checkTable.length} {t("row(s)")}
                  </p>
                </CCol>
              </CRow>

              <CRow>
                <CCol
                  lg="12"
                  style={{ paddingRight: "0px", paddingLeft: "0px" }}
                >
                  <div className="tableFixHead">
                    <table className="templateList-table autocomplete-table position-table main-table">
                      <thead className="text-center auto-fix-head">
                        <tr style={{ color: "black" }}>
                          <th style={{ width: 70 }}>
                            <input
                              type="CheckBox"
                              onChange={tableMainCheckboxChange}
                              checked={tableAllCheck}
                              style={{
                                width: "17px",
                                height: "17px",
                                marginTop: "6px",
                              }}
                            />
                          </th>

                          <th style={{ width: 100 }}>{t("No")} </th>

                          <th style={{ width: 100 }}>{t("ID")}</th>
                          <th style={{ width: 300 }}>{t("Full Name")}</th>

                          <th style={{ width: 500 }}>{t("Email")}</th>
                          <th style={{ width: 50 }}>{t("Action")}</th>
                        </tr>
                      </thead>
                      <tbody className="scroll-body">
                        {checkTable.length > 0 &&
                          checkTable.map((data, index) => {
                            return (
                              <tr key={index}>
                                <td
                                  style={{ width: 20 }}
                                  className="text-center"
                                >
                                  <input
                                    type="CheckBox"
                                    checked={data.bio_time_emp_id === true}
                                    onChange={() =>
                                      tableSubCheckboxChange(data.employee_id)
                                    }
                                    style={{
                                      width: "17px",
                                      height: "17px",
                                      marginTop: "6px",
                                    }}
                                  />
                                </td>
                                <td
                                  style={{ width: 30 }}
                                  className="text-center"
                                >
                                  {index + 1}
                                </td>

                                <td
                                  style={{ width: 111, padding: "17px" }}
                                  className="text-center"
                                >
                                  {data.employee_id}
                                </td>

                                <td
                                  style={{ width: 80, padding: "17px" }}
                                  className="text-center"
                                >
                                  {data.name === "" && "_"}
                                  {data.name}
                                </td>

                                <td
                                  style={{ width: 80, padding: "17px" }}
                                  className="text-center"
                                >
                                  {data.email === "" && "_"}
                                  {data.email}
                                </td>

                                <td
                                  style={{ width: 230, padding: "17px" }}
                                  className="text-center"
                                >
                                  <div className="user-before">
                                    <CImg
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/image/Delete List.svg"
                                      }
                                      onClick={() =>
                                        deleteClick(data.employee_id)
                                      }
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        cursor: "pointer",
                                      }}
                                    ></CImg>
                                    <CImg
                                      className="user-after icon-fix-ho"
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/image/Delete Hover.svg"
                                      }
                                      onClick={() =>
                                        deleteClick(data.employee_id)
                                      }
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        cursor: "pointer",
                                      }}
                                    ></CImg>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol lg="10" sm="10" xs="10"></CCol>

                <CCol lg="2" sm="2" xs="2">
                  <CButton
                    type="button"
                    className="btn-create btn-add"
                    onClick={finalSkillTestClick}
                    style={{
                      marginBottom: "10px",
                      marginLeft: "70px",
                      marginTop: "35px",
                    }}
                  >
                    {t("Send")}
                  </CButton>
                </CCol>
              </CRow>
            </>
          )}
        </CCardBody>
      </CCard>
      <ResumeConfirmMessage
        show={confirmShow}
        type={confirmType}
        header={confirmHeader}
        content={confirmContent}
        cancel={() => setConfirmShow(false)}
        deleteOK={deleteOK}
        okButton={contentOK}
        cancelButton={"Cancel"}
      />
    </>
  );
};

export default SkillTestPage;
