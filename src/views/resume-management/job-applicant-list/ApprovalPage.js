/* eslint-disable jsx-a11y/alt-text */
/**
 *Approval
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
  CSelect,
  CImg,
  CTooltip,
  CTextarea,
} from "@coreui/react";
import SuccessError from "../../common/SuccessError";
import { ApiRequest } from "../../common/ApiRequest";
import Loading from "../../common/Loading";
import CommonMessage from "../../common/CommonMessage";
import { nullChk, numberSpaceChk } from "../../common/CommonValidation";
import { useHistory } from "react-router-dom";
import CommonAutocomplete from "../../common/CommonAutocomplete";
import ResumeConfirmMessage from "../../common/ResumeConfirmMessage";
import ApiPath from "../../common/ApiPath";
import { useTranslation } from "react-i18next";
const ApprovalPage = () => {
  let customer_name = window.location.href.split("/")[3];
  const { t } = useTranslation();
  let history = useHistory();
  const [success, setSuccess] = useState([]); // for success messages
  const [loading, setLoading] = useState(false); // For Loading
  const [finalAllCheck, setFinalAllCheck] = useState(true); // for final check box (true,false)
  const [erp, setErp] = useState(false); // confirmation box show
  const [finalClickedData, setFinalClickedData] = useState([]); // for finalClicked data
  const [mainTable, setMainTable] = useState([]); //for status data
  const [fileSelectError, setFileSelectError] = useState([]); // for clicked data
  const [mail, setMail] = useState(["yuwakoko98998@gmail.com", "a@gmail.com"]); // for clicked data
  const [interviewJoinDateSelectedValue, setInterviewJoinDateSelectedValue] =
    useState(""); // interview Date Selected Value
  const [checkerEmail, setCheckerEmail] = useState(""); //checker email name state
  const [empName, setEmpName] = useState(""); // emp name state
  const [tableAllCheck, setTableAllCheck] = useState(false); // for final check box (true,false)
  const [checkerPosition, setCheckerPosition] = useState(""); // checker Position Name State
  const [checkedClickedData, setCheckedClickedData] = useState([]);
  const [checkTable, setCheckTable] = useState([]);
  const [confirmHeader, setConfirmHeader] = useState(""); //for confirm header
  const [confirmShow, setConfirmShow] = useState(false); // confirmation box show
  const [deleteId, setDeleteId] = useState(""); //for delete id
  const [contentOK, setContentOk] = useState(""); //for ok button of comfirm box
  const [confirmContent, setConfirmContent] = useState(""); //for confirm content
  const [confirmType, setConfirmType] = useState(""); // confirmation box type
  const [empNameData, setEmpNameData] = useState([]); // empNameData autoComplete
  const [position, setPosition] = useState("");
  const [positionData, setPositionData] = useState([]);

  //auto complete useEffect
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

  //Delete Click function
  const deleteClick = (id) => {
    setDeleteId(id);
    setConfirmShow(true);
    setConfirmHeader(`<h5 style='color:red'>${t("Delete Confirmation")}</h5>`);
    setConfirmContent(`<p>${t("Are you sure want to delete?")}</p>`);
    setConfirmType("delete");
    setContentOk(t("Delete"));
  };

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

  //Delete Click confirm box Delete Click
  const deleteOK = () => {
    let resultArray = checkTable.filter((data) => data.employee_id != deleteId);
    setCheckTable(resultArray);
    setConfirmShow(false);
  };

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

  //Position select change function
  const positionSelectChange = (e) => {
    setCheckerPosition(e.target.value);
  };

  //Final Approval On click function with API
  const finalApprovalClick = async () => {
    let errArray = [];
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    let checktrue = [];

    checkTable.forEach((main) => {
      if (main.bio_time_emp_id == true) {
        arr2.push(main.employee_id);
        arr3.push(main.email);
      }
    });

    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      // setSuccess([]);
      errArray.push(
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox"))
      );
    } else {
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr1.push(main);
          setFinalClickedData(arr1);
        }
      });
    }

    arr1.forEach((main) => {
      if (main.applied_date != "") {
        if (!numberSpaceChk(main.applied_date)) {
          errArray.push(
            t(CommonMessage.JSE005).replace(
              "%s",
              t("date format only in Joined Date")
            )
          );
        }
        if (main.applied_date.length > 11) {
          errArray.push(
            t(CommonMessage.JSE028).replace("%s", t("Date Format"))
          );
        }
      }

      if (main.hostel != "") {
        if (!numberSpaceChk(main.hostel)) {
          errArray.push(
            t(CommonMessage.JSE005).replace(
              "%s",
              t("number only in Hostel Allowance")
            )
          );
        }

        if (main.hostel.length > 8) {
          errArray.push(
            t(CommonMessage.JSE033)
              .replace("%s", t("Hostel Allowance"))
              .replace("%s", "7")
          );
        }
      }

      if (main.salary_pay != "") {
        if (!numberSpaceChk(main.salary_pay)) {
          errArray.push(
            t(CommonMessage.JSE005).replace("%s", t("number only in Salary"))
          );
        }

        if (main.salary_pay.length > 8) {
          errArray.push(
            t(CommonMessage.JSE033)
              .replace("%s", t("Salary"))
              .replace("%s", "7")
          );
        }
      }

      if (main.transport != "") {
        if (!numberSpaceChk(main.transport)) {
          errArray.push(
            t(CommonMessage.JSE005).replace(
              "%s",
              t("number only in Transporation Allowance")
            )
          );
        }

        if (main.salary_pay.length > 8) {
          errArray.push(
            t(CommonMessage.JSE033)
              .replace("%s", t("Transporation Allowance"))
              .replace("%s", "7")
          );
        }
      }
    });

    if (arr2.length == 0) {
      errArray.push(
        t(CommonMessage.JSE001).replace("%s", t("at least one approver"))
      );
    }

    if (errArray == [] || errArray == "") {
      setLoading(true);
      let pass = {
        method: "post",
        package_name: "recruit",
        url: ApiPath.ApprovalPageFinalApprovalCLick,
        params: {
          login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
          data: arr1,
          approver_id: arr2,
          approver_email: arr3,
          template_job_position_id: parseInt(
            localStorage.getItem(`${customer_name}_R_ID`)
          ),
          state_id: parseInt(
            localStorage.getItem(`${customer_name}_STATE_TMP_INTERVIEW`)
          ),
          status: parseInt(
            localStorage.getItem(`${customer_name}_STATUS_TMP_INTERVIEW`)
          ),
          new_state_id: 6,
          new_status: 1,
        },
      };
      let response = await ApiRequest(pass);

      if (response.flag == false) {
        setFileSelectError(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
  //search Click function
  const searchClick = () => {
    setFileSelectError([]);
    if (checkerPosition == "" && empName == "") {
      setFileSelectError([
        t(CommonMessage.JSE001).replace(
          "%s",
          t("Approver Name or Approver Position")
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
          setFileSelectError(["Your search did not match any checker!"]);
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

  //backkey function
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
  let finalSubCheckboxChange = (id) => {
    setFileSelectError([]);
    let flg = true;
    let data = mainTable.map((data) => {
      if (data.applicant_id == id) {
        data.isChecked = !data.isChecked;
        return data;
      }
      return data;
    });
    data.forEach((main) => {
      if (main.isChecked == false) {
        flg = false;
      }
    });
    setFinalAllCheck(flg);
    setMainTable(data);
  };

  //applicant main check box change
  let finalMainCheckboxChange = () => {
    setFileSelectError([]);
    setFinalAllCheck(!finalAllCheck);
    let data = mainTable.map((data) => {
      data.isChecked = !finalAllCheck;
      return data;
    });
    setMainTable(data);
  };
  const selectJoinDateHandleChange = (val) => {
    let date = "";
    if (val != null) {
      date = moment(val).format("YYYY-MM-DD");
    }
    setInterviewJoinDateSelectedValue(date);
    let res = mainTable.map((data) => {
      data.applied_date = date;
      return data;
    });
    setMainTable(res);
  };

  //Child Date Change function in interview pop up box
  const childJoinDateChange = (id, val) => {
    let res = mainTable.map((data) => {
      if (data.applicant_id == id) {
        data.applied_date = val.target.value;
        return data;
      }
      return data;
    });
    setMainTable(res);
  };

  //checker email on  change
  const handleCheckerEmail = (e) => {
    setCheckerEmail(e.target.value);
  };

  //emp Name change function
  const empNameChange = (e) => {
    setEmpName(e.target.value);
  };

  //hontel fees handle change function
  const hotelHandleChange = (id, val) => {
    let res = mainTable.map((data) => {
      if (data.applicant_id == id) {
        data.hostel = val.target.value;
        return data;
      }
      return data;
    });
    setMainTable(res);
  };

  //salary Change function in pass pop up box
  const salaryHandleChange = (id, val) => {
    let res = mainTable.map((data) => {
      if (data.applicant_id == id) {
        data.salary_pay = val.target.value;
        return data;
      }
      return data;
    });
    setMainTable(res);
  };

  //hotel Change function in pass pop up box
  const transportHandleChange = (id, val) => {
    let res = mainTable.map((data) => {
      if (data.applicant_id == id) {
        data.transport = val.target.value;
        return data;
      }
      return data;
    });
    setMainTable(res);
  };

  //Remark Change function in interview pop up box
  const remarkHandleChange = (id, val) => {
    let res = mainTable.map((data) => {
      if (data.applicant_id == id) {
        data.remark = val.target.value;
        return data;
      }
      return data;
    });
    setMainTable(res);
  };

  let tableMainCheckboxChange = () => {
    setFileSelectError([]);
    setTableAllCheck(!tableAllCheck);
    let data = checkTable.map((data) => {
      data.bio_time_emp_id = !tableAllCheck;
      return data;
    });
    setCheckTable(data);
  };

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

  return (
    <>
      {" "}
      <Loading start={loading} />
      <SuccessError error={fileSelectError} success={success} />
      <CCard style={{ background: "#eff1fe", borderRadius: "10px" }}>
        <CCardBody>
          <CRow style={{ padding: "0" }}>
            <CCol lg="12">
              {" "}
              <CLabel
                style={{
                  color: "#4e57aa",
                  marginTop: "1px",
                  fontWeight: "bold",
                  width: "100%",
                  fontSize: "22px",
                  margin: "17px",
                  borderRadius: "7px",
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
                ></CImg>{" "}
                &nbsp; {t("Approval Candidates")}
              </CLabel>
            </CCol>
          </CRow>
          <CRow>
            <CLabel
              className="remark-text mt-2"
              style={{ marginLeft: "20px", fontSize: "18px", color: "#4e57aa" }}
            >
              {t("Candidates List")}
            </CLabel>
          </CRow>

          <CCol lg="12" style={{ overflow: "auto", padding: "0" }}>
            <div className="tableFixHead">
              <table className="templateList-table-approval page-table main-table ">
                <thead className="text-center">
                  <tr>
                    <>
                      <th style={{ width: "45px" }}>
                        <input
                          type="CheckBox"
                          onChange={finalMainCheckboxChange}
                          checked={finalAllCheck}
                          style={{
                            width: "50px",
                            height: "17px",
                            marginTop: "6px",
                          }}
                        />
                      </th>
                    </>
                    <th style={{ width: "90px" }}>{t("Name")}</th>
                    <th style={{ width: "80px" }}>{t("Position")}</th>
                    <th style={{ width: "163px" }}>
                      {t("Joined Date")}
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
                          format="yyyy/mm/dd"
                          style={{
                            borderRadius: "5px",
                            overflow: "hidden",
                            borderBottom: "1px solid",
                            width: "80%",
                          }}
                          value={
                            interviewJoinDateSelectedValue == "" ||
                            interviewJoinDateSelectedValue == null
                              ? null
                              : interviewJoinDateSelectedValue
                          }
                          disablePast
                          className="input-field-blue-background"
                          placeholder="yyyy/mm/dd"
                          onChange={(e) => selectJoinDateHandleChange(e)}
                        />
                      </MuiPickersUtilsProvider>
                    </th>
                    <th style={{ width: "100px" }}>{t("Salary")} </th>
                    <th style={{ width: "100px" }}>{t("Hostel Allowance")} </th>
                    <th style={{ width: "100px" }}>
                      {t("Transportation Allowance")}{" "}
                    </th>
                    <th style={{ width: "250px" }}>{t("Remark")}</th>
                  </tr>
                </thead>
                <tbody>
                  {mainTable.length > 0 &&
                    mainTable.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ width: "45px" }} className="text-center">
                            <input
                              type="CheckBox"
                              style={{
                                width: "17px",
                                height: "17px",
                                marginTop: "6px",
                              }}
                              checked={data.isChecked === true}
                              onChange={() =>
                                finalSubCheckboxChange(data.applicant_id)
                              }
                            />
                          </td>
                          <td style={{ width: "90px" }} className="text-center">
                            {data.name === "" && "_"}
                            {data.name}
                          </td>
                          <td style={{ width: "80px" }} className="text-center">
                            {data.position_name === "" && "_"}

                            {data.position_name}
                          </td>
                          <td style={{ width: "163px", padding: "17px" }}>
                            <CInput
                              id={data.applicant_id}
                              style={{ width: "100%" }}
                              className="tinput-field"
                              type="text"
                              onChange={(e) =>
                                childJoinDateChange(data.applicant_id, e)
                              }
                              value={
                                mainTable[index]["mainTable"] == undefined
                                  ? data.applied_date
                                  : mainTable[index]["mainTable"]
                              }
                            />
                          </td>
                          <td
                            style={{ width: "100px", padding: "17px" }}
                            className="text-center"
                          >
                            <CInput
                              className="tinput-field"
                              type="text"
                              value={mainTable[index]["mainTable"]}
                              onChange={(e) =>
                                salaryHandleChange(data.applicant_id, e)
                              }
                            />
                          </td>
                          <td
                            style={{ width: "100px", padding: "17px" }}
                            className="text-center"
                          >
                            <CInput
                              className="tinput-field"
                              type="text"
                              value={mainTable[index]["mainTable"]}
                              onChange={(e) =>
                                hotelHandleChange(data.applicant_id, e)
                              }
                            />
                          </td>
                          <td
                            style={{ width: "100px", padding: "17px" }}
                            className="text-center"
                          >
                            <CInput
                              className="tinput-field"
                              type="text"
                              value={mainTable[index]["mainTable"]}
                              onChange={(e) =>
                                transportHandleChange(data.applicant_id, e)
                              }
                            />
                          </td>
                          <td
                            style={{ width: "250px", padding: "17px" }}
                            className="text-center"
                          >
                            <CTextarea
                              className="area1-input-field"
                              style={{ height: "65px" }}
                              type="text"
                              value={mainTable[index]["mainTable"]}
                              onChange={(e) =>
                                remarkHandleChange(data.applicant_id, e)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </CCol>
        </CCardBody>
      </CCard>
      <CCard style={{ borderRadius: "10px" }}>
        <CCardBody>
          <div style={{ paddingRight: "30px", paddingLeft: "30px" }}>
            <CRow className="mt-">
              <CCol lg="5">
                <CLabel className="remark-text">
                  {t("Search Approver Name")}
                </CLabel>
              </CCol>
              <CCol lg="2"></CCol>
              <CCol lg="5">
                <CLabel className="remark-text">
                  {t("Search Approver Position")}
                </CLabel>
              </CCol>
            </CRow>
            <CRow className="mt-1">
              <CCol lg="5">
                <CommonAutocomplete
                  style={{ width: "100%", marginTop: "7px" }}
                  onChange={empNameChange}
                  onSelect={selectAutocomplete}
                  items={empNameData}
                  name={empName}
                  placeholder="Enter Name"
                />
              </CCol>
              <CCol lg="2"></CCol>
              <CCol lg="5">
                <CSelect
                  className="input-field auto-complete-top"
                  onChange={positionSelectChange}
                  value={checkerPosition}
                >
                  <option value="">{"---Select Position---"}</option>
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
                    {t("Approver Table")}
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
                      <tbody>
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
                    onClick={finalApprovalClick}
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

export default ApprovalPage;
