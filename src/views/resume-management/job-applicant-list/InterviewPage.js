/* eslint-disable jsx-a11y/alt-text */

/**
 *Interview
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
  CInputGroup,
  Clabel,
} from "@coreui/react";
import SuccessError from "../../common/SuccessError";
import { ApiRequest } from "../../common/ApiRequest";
import Loading from "../../common/Loading";
import CommonMessage from "../../common/CommonMessage";
import { numberSpaceChk } from "../../common/CommonValidation";
import { useHistory } from "react-router-dom";
import CommonAutocomplete from "../../common/CommonAutocomplete";
import ResumeConfirmMessage from "../../common/ResumeConfirmMessage";
import ApiPath from "../../common/ApiPath";
import { useTranslation } from "react-i18next";
const InterviewPage = () => {
  let customer_name = window.location.href.split("/")[3];
  const { t } = useTranslation();
  let history = useHistory();
  const [checkedClickedData, setCheckedClickedData] = useState([]); //checked Data applicant
  const [success, setSuccess] = useState([]); // for success messages
  const [loading, setLoading] = useState(false); // For Loading
  const [hourSelectValue, setHourSelectValue] = useState(""); // hour select value for interview pop up box
  const [minSelectValue, setMinSelectValue] = useState(""); // interval time value for interview pop up box
  const [minSelectValueShow, setMinSelectValueShow] = useState(""); // interval time value for interview pop up box
  const [finalAllCheck, setFinalAllCheck] = useState(true); // for final check box (true,false)
  const [tableAllCheck, setTableAllCheck] = useState(false); // for final check box (true,false)
  const [finalClickedData, setFinalClickedData] = useState([]); // for finalClicked data
  const [interviewDateSelectedValue, setInterviewDateSelectedValue] =
    useState(""); // interview Date Selected Value
  const [mainTable, setMainTable] = useState([]); //for status data
  const [fileSelectError, setFileSelectError] = useState([]); // for clicked data
  const [newState, setNewState] = useState([]); // new state data for api
  const [newStatus, setNewStatus] = useState([]); //new status data for api
  const [empName, setEmpName] = useState(""); //EmpName autoComplete
  const [empNameData, setEmpNameData] = useState([]); // empNameData autoComplete
  const [tempId, setTempId] = useState("");
  const [tempHr, setTempHr] = useState("");
  const [planAccess, setPlanAccess] = useState(false);

  const [erp, setErp] = useState(false); // confirmation box show
  const [checkerEmail, setCheckerEmail] = useState(""); //checker Email State
  const [checkTable, setCheckTable] = useState([]); //Checker Data get from search
  const [confirmHeader, setConfirmHeader] = useState(""); //for confirm header
  const [confirmShow, setConfirmShow] = useState(false); // confirmation box show
  const [deleteId, setDeleteId] = useState(""); //for delete id
  const [contentOK, setContentOk] = useState(""); //for ok button of comfirm box
  const [confirmContent, setConfirmContent] = useState(""); //for confirm content
  const [confirmType, setConfirmType] = useState(""); // confirmation box type
  const [checkerPosition, setCheckerPosition] = useState(""); //checker Position from api
  const [positionData, setPositionData] = useState([]);
  const [hourData] = useState([
    { value: "8", main_value: 480 },
    { value: "9", main_value: 540 },
    { value: "10", main_value: 600 },
    { value: "11", main_value: 660 },
    { value: "12", main_value: 720 },
    { value: "13", main_value: 780 },
    { value: "14", main_value: 840 },
    { value: "15", main_value: 900 },
    { value: "16", main_value: 960 },
    { value: "17", main_value: 1020 },
  ]); // hour data

  const [minData] = useState([
    { value: "00:15", main_value: 15 },
    { value: "00:30", main_value: 30 },
    { value: "00:45", main_value: 45 },
    { value: "01:00", main_value: 60 },
    { value: "01:15", main_value: 75 },
    { value: "01:30", main_value: 90 },
    { value: "01:45", main_value: 105 },
    { value: "02:00", main_value: 120 },
  ]); // interval time data

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

    setTimeout(() => {
      if (
        localStorage.getItem(`${customer_name}_STATE_TMP_INTERVIEW`) == 1 &&
        localStorage.getItem(`${customer_name}_STATUS_TMP_INTERVIEW`) == 2
      ) {
        setNewState([3]);
        setNewStatus([1]);
      }
      if (
        localStorage.getItem(`${customer_name}_STATE_TMP_INTERVIEW`) == 2 &&
        localStorage.getItem(`${customer_name}_STATUS_TMP_INTERVIEW`) == 2
      ) {
        setNewState([3, 0, 6]);
        setNewStatus([1, 0, 1]);
      }
      if (
        localStorage.getItem(`${customer_name}_STATE_TMP_INTERVIEW`) == 3 &&
        localStorage.getItem(`${customer_name}_STATUS_TMP_INTERVIEW`) == 2
      ) {
        setNewState([4, 0, 6]);
        setNewStatus([1, 0, 1]);
      }
      if (
        localStorage.getItem(`${customer_name}_STATE_TMP_INTERVIEW`) == 4 &&
        localStorage.getItem(`${customer_name}_STATUS_TMP_INTERVIEW`) == 2
      ) {
        setNewState([5, 0, 6]);
        setNewStatus([1, 0, 1]);
      }

      getLoginData();
    }, 500);
  }, []);

  const getLoginData = async () => {
    let loginData = {
      login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
      employee_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
      role_id: localStorage.getItem(`${customer_name}_ROLE_ID`),
      language: localStorage.getItem(`${customer_name}_LANGUAGE`),
      access_token: localStorage.getItem("demo_TOKEN"),
    };

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
      all_package.forEach((data) => {
        if (data.short_name == "plan") {
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
          language: localStorage.getItem(`${customer_name}_LANGUAGE`),
        },
      };
      let response2 = await ApiRequest(obj2);
      access = response2.data.recruit_access;
      setPlanAccess(access);
    }
  };

  useEffect(() => {
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

  //delete Click function
  const deleteClick = (id) => {
    setDeleteId(id);
    setConfirmShow(true);
    setConfirmHeader(`<h5 style='color:red'>${t("Delete Confirmation")}</h5>`);
    setConfirmContent(`<p>${t("Are you sure want to delete?")}</p>`);
    setConfirmType("delete");
    setContentOk(t("Delete"));
  };

  //time Change function in interview pop up box
  const inTimeHandleChange = (id, val) => {
    let res = mainTable.map((data) => {
      if (data.applicant_id == id) {
        data.salary_pay = val.target.value;
        return data;
      }
      return data;
    });
    setMainTable(res);
  };

  //child date change method
  const childDateChange = (id, val) => {
    let res = mainTable.map((data) => {
      if (data.applicant_id == id) {
        data.interview_date = val.target.value;
        return data;
      }
      return data;
    });
    setMainTable(res);
  };

  //EmpName auto Complete on Chnage method
  const empNameChange = (e) => {
    setEmpName(e.target.value);
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

  //Start Date Handle Change Method
  const selectStartDateHandleChange = (val) => {
    setFileSelectError([]);
    let date = "";
    if (val != null) {
      date = moment(val).format("YYYY-MM-DD");
    }
    setInterviewDateSelectedValue(date);
    let res = mainTable.map((data) => {
      data.interview_date = date;
      return data;
    });
    setMainTable(res);
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

  //Api call method when u click send buttom
  const finalInterviewClick = async () => {
    setFileSelectError([]);
    let errArray = [];
    let arr1 = [];
    let arr2 = [];
    let minutes1 = 0;
    let minutes2 = 0;
    let total = 0;
    let checktrue = [];
    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });

    if (checktrue.length == 0) {
      errArray.push(
        t(CommonMessage.JSE001).replace("%s", t("at least one candidate"))
      );
    } else {
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr1.push(main);
          setFinalClickedData(arr1);
        }
      });
    }
    checkTable.forEach((main) => {
      if (main.bio_time_emp_id == true) {
        arr2.push(main);
      }
    });
    if (arr2.length == 0) {
      errArray.push(
        t(CommonMessage.JSE001).replace("%s", t("at least one interviewer"))
      );
    }

    arr1.forEach((main) => {
      if (main.interview_date != "") {
        if (!numberSpaceChk(main.interview_date)) {
          errArray.push(
            t(CommonMessage.JSE005).replace(
              "%s",
              t("number only in Interview Date")
            )
          );
        }
      } else {
        errArray.push(
          t(CommonMessage.JSE005).replace("%s", t("Interview Date"))
        );
      }

      if (main.time != "") {
        var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
          main.time
        );
        if (isValid) {
        } else {
          errArray.push(
            t(CommonMessage.JSE005).replace(
              "%s",
              t("Time Format in Interview Time")
            )
          );
        }

        var time1 = main.salary_pay;
        var d = new Date("2000-01-01 " + time1 + ":00");
        minutes1 = d.getMinutes() + d.getHours() * 60;
        var time2 = main.time;
        let arr = time2.split(":");
        let calcuHour = arr[0];
        let calcuMin = arr[1];
        let finalMin = parseInt(calcuHour) * 60 + parseInt(calcuMin);
        total = minutes1 + finalMin;
        let final = toHoursAndMinutes(total);

        main.end_time = final;
      } else {
        errArray.push(t(CommonMessage.JSE005).replace("%s", t("Start Time")));
      }

      if (minSelectValue == 0) {
        errArray.push(
          t(CommonMessage.JSE005).replace("%s", t("Interval Time"))
        );
      }
    });

    if (errArray == [] || errArray == "") {
      setLoading(true);
      let pass = {
        method: "post",
        package_name: "recruit",
        url: ApiPath.InterviewPageFinalInterviewClick,
        params: {
          login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
          data: arr1,
          plan_access: planAccess,
          state_id: parseInt(
            localStorage.getItem(`${customer_name}_STATE_TMP_INTERVIEW`)
          ),
          status: parseInt(
            localStorage.getItem(`${customer_name}_STATUS_TMP_INTERVIEW`)
          ),
          new_state_id: newState[0],
          new_status: newStatus[0],
          interviewer_data: arr2,
          template_job_position_id: parseInt(
            localStorage.getItem(`${customer_name}_R_ID`)
          ),
        },
      };
      let response = await ApiRequest(pass);
      if (response.flag == false) {
        if (checktrue.length == mainTable.length) {
          setFinalAllCheck(true);
        }
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

  //delete function
  const deleteOK = () => {
    let resultArray = checkTable.filter((data) => data.employee_id != deleteId);
    setCheckTable(resultArray);
    setConfirmShow(false);
  };

  //backkey function go to job applied form
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
      localStorage.getItem(`${customer_name}_PAGE`)
    );
    localStorage.getItem(
      `${customer_name}_CURRENCY`,
      localStorage.getItem(`${customer_name}_CURRENCY`)
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

  //hour select change function
  let hourSelectChange = (e) => {
    setFileSelectError([]);
    setHourSelectValue(e.target.value);
    let res = mainTable.map((data, i) => {
      data.start_time = parseInt(e.target.value);
      let num = data.start_time + minSelectValue * (i + 1) - minSelectValue;
      let hours = num / 60;
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);
      data.time =
        (rhours < 10 ? `0${rhours}` : rhours) +
        ":" +
        (rminutes < 1 ? `0${rminutes}` : rminutes);
      return data;
    });
    setMainTable(res);
  };

  //time handle change function
  const timeHandleChange = (id, val) => {
    var minutes = 0;
    var minutes1 = 0;
    var isValid = false;
    let res = mainTable.map((data) => {
      if (data.applicant_id == id) {
        isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
          val.target.value
        );
        data.time = val.target.value;

        setFileSelectError([]);
        var time1 = data.salary_pay;
        var d = new Date("2000-01-01 " + time1 + ":00");
        minutes1 = d.getMinutes() + d.getHours() * 60;
        var time = val.target.value;
        var d = new Date("2000-01-01 " + time + ":00");
        minutes = d.getMinutes() + d.getHours() * 60;
        setTempId(id);
        setTempHr(minutes);

        return data;
      }

      return data;
    });

    setMainTable(res);
    let num = 1;

    if (isValid) {
      let temp = res.map((data) => {
        if (data.applicant_id > id) {
          let value = recursiveTime(minutes, minutes1, num);
          data.time = value;
          num = num + 1;
        }
        return data;
      });
      setMainTable(temp);
    }
  };

  let recursiveTime = (minutes, minutes1, num) => {
    let a = minutes + minutes1 * num;

    parseInt(a);
    return toHoursAndMinutes(a);
  };

  const toHoursAndMinutes = (totalMinutes) => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  //Link on Change function
  const linkHandleChange = (id, val) => {
    let res = mainTable.map((data) => {
      if (data.applicant_id == id) {
        data.meeting_link = val.target.value;
        return data;
      }
      return data;
    });
    setMainTable(res);
  };

  //minute select change function
  const minSelectChange = (e) => {
    setFileSelectError([]);
    let val = parseInt(e.target.value);
    let a = "";
    setMinSelectValue(val.length == 1 ? `0${val}` : val);
    if (val == "") {
      setMinSelectValueShow("00:00");
      a = "00:00";
    }
    if (val == 15) {
      setMinSelectValueShow("00:15");
      a = "00:15";
    }
    if (val == 30) {
      setMinSelectValueShow("00:30");
      a = "00:30";
    }
    if (val == 45) {
      setMinSelectValueShow("00:45");
      a = "00:45";
    }
    if (val == 60) {
      setMinSelectValueShow("01:00");
      a = "01:00";
    }
    if (val == 75) {
      setMinSelectValueShow("01:15");
      a = "01:15";
    }
    if (val == 90) {
      setMinSelectValueShow("01:30");
      a = "01:30";
    }
    if (val == 105) {
      setMinSelectValueShow("01:45");
      a = "01:45";
    }
    if (val == 120) {
      setMinSelectValueShow("02:00");
      a = "02:00";
    }
    let res = mainTable.map((data, i) => {
      data.interval_time = val;
      let num =
        data.start_time + (data.interval_time * (i + 1) - data.interval_time);
      let hours = num / 60;
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);
      data.time =
        (rhours < 10 ? `0${rhours}` : rhours) +
        ":" +
        (rminutes < 1 ? `0${rminutes}` : rminutes);
      data.salary_pay = a;
      return data;
    });
    setMainTable(res);
  };

  // applicant sub check box change function
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

  //Applicant main check box change function
  let finalMainCheckboxChange = () => {
    setFileSelectError([]);
    setFinalAllCheck(!finalAllCheck);
    let data = mainTable.map((data) => {
      data.isChecked = !finalAllCheck;
      return data;
    });
    setMainTable(data);
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

  //Position select change function
  const positionSelectChange = (e) => {
    setCheckerPosition(e.target.value);
  };

  const searchClick = () => {
    setFileSelectError([]);
    if (checkerPosition == "" && empName == "") {
      setFileSelectError([
        t(CommonMessage.JSE001).replace(
          "%s",
          t("Interviewer Name or Interviewer Position")
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

  return (
    <>
      {" "}
      <Loading start={loading} />
      <SuccessError error={fileSelectError} success={success} />
      <CCard style={{ background: "#eff1fe", borderRadius: "10px" }}>
        <CCardBody>
          <CRow>
            <CCol lg="12">
              <CRow>
                <CLabel
                  style={{
                    color: "#4e57aa",
                    fontWeight: "bold",
                    width: "100%",
                    fontSize: "22px",
                    padding: "13px",
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
                  ></CImg>
                  &nbsp; {t("Interview Invitation")}
                </CLabel>
              </CRow>
              <CRow>
                <CLabel
                  className="remark-text"
                  style={{
                    marginLeft: "20px",
                    fontSize: "18px",
                    color: "#4e57aa",
                  }}
                >
                  {t("Candidates List")}
                </CLabel>
              </CRow>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="12">
              <div className="tableFixHead">
                <table className="templateListss-table page-table main-table">
                  <thead className="text-center">
                    <tr style={{ color: "black" }}>
                      {/* {detailStatus == false && ( */}
                      <th style={{ width: 20 }}>
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
                      {/* )} */}
                      <th style={{ width: 60 }}>{t("Name")} </th>

                      <th style={{ width: 111 }}>
                        <CLabel className="required">{t("Date")}</CLabel>

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
                              interviewDateSelectedValue == "" ||
                              interviewDateSelectedValue == null
                                ? null
                                : interviewDateSelectedValue
                            }
                            disablePast
                            className="input-field-blue-background"
                            placeholder="yyyy/mm/dd"
                            onChange={(e) => selectStartDateHandleChange(e)}
                          />
                        </MuiPickersUtilsProvider>
                      </th>
                      <th style={{ width: 80, borderRight: "none" }}>
                        <CLabel className="required">{t("Start Time")}</CLabel>

                        <CSelect
                          className="input-field-blue-background "
                          style={{
                            borderRadius: "7px",
                            borderBottom: "1px solid black",
                          }}
                          onChange={hourSelectChange}
                          value={hourSelectValue}
                        >
                          <option value="0">{t("---Select--")}</option>
                          {hourData.length > 0 &&
                            hourData.map((data, index) => {
                              return (
                                <option key={index} value={data.main_value}>
                                  {data.value}
                                </option>
                              );
                            })}
                        </CSelect>
                      </th>

                      <th style={{ width: 80 }}>
                        <CLabel className="required">
                          {t("Interval Time")}
                        </CLabel>
                        <CInputGroup>
                          <CSelect
                            // custom
                            className="input-field-blue-background "
                            style={{
                              borderRadius: "7px",
                              borderBottom: "1px solid black",
                            }}
                            onChange={minSelectChange}
                            value={minSelectValue}
                          >
                            <option value="0">{t("---Select--")}</option>
                            {minData.length > 0 &&
                              hourSelectValue != "" &&
                              hourSelectValue != 0 &&
                              minData.map((data, index) => {
                                return (
                                  <option key={index} value={data.main_value}>
                                    {data.value}
                                  </option>
                                );
                              })}
                          </CSelect>
                        </CInputGroup>
                      </th>
                      <th style={{ width: 230 }}>{t("Meeting Invitation")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mainTable.length > 0 &&
                      mainTable.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: 20 }} className="text-center">
                              <input
                                type="CheckBox"
                                checked={data.isChecked === true}
                                onChange={() =>
                                  finalSubCheckboxChange(data.applicant_id)
                                }
                                style={{
                                  width: "17px",
                                  height: "17px",
                                  marginTop: "6px",
                                }}
                              />
                            </td>

                            <td style={{ width: 30 }} className="text-center">
                              {data.name === "" && "_"}
                           
                              {data.name}
                            </td>

                            <td
                              style={{ width: 111, padding: "17px" }}
                              className="text-center"
                            >
                              <CInput
                                id={data.applicant_id}
                                style={{ width: "100%" }}
                                className="tinput-field"
                                type="text"
                                onChange={(e) =>
                                  childDateChange(data.applicant_id, e)
                                }
                                value={
                                  mainTable[index]["mainTable"] == undefined
                                    ? data.interview_date
                                    : mainTable[index]["mainTable"]
                                }
                              />
                            </td>

                            <td
                              style={{ width: 80, padding: "17px" }}
                              className="text-center"
                            >
                              <CRow alignHorizontal="center">
                                {minSelectValue == 0 && (
                                  <CCol lg="12">
                                    <CInput
                                      readOnly
                                      id={data.applicant_id}
                                      style={{ width: "100%" }}
                                      className="tinput-field"
                                      type="text"
                                      onChange={(e) =>
                                        timeHandleChange(data.applicant_id, e)
                                      }
                                      value={
                                        mainTable[index]["mainTable"] ==
                                        undefined
                                          ? data.time
                                          : mainTable[index]["mainTable"]
                                      }
                                    />
                                  </CCol>
                                )}
                                {minSelectValue != 0 && (
                                  <CCol lg="12">
                                    <CInput
                                      id={data.applicant_id}
                                      style={{ width: "100%" }}
                                      className="tinput-field"
                                      type="text"
                                      onChange={(e) =>
                                        timeHandleChange(data.applicant_id, e)
                                      }
                                      value={
                                        mainTable[index]["mainTable"] ==
                                        undefined
                                          ? data.time
                                          : mainTable[index]["mainTable"]
                                      }
                                    />
                                  </CCol>
                                )}
                              </CRow>
                            </td>

                            <td
                              style={{ width: 80, padding: "17px" }}
                              className="text-center"
                            >
                              <CRow alignHorizontal="center">
                                <CCol lg="12">
                                  <CInput
                                    id={data.applicant_id}
                                    style={{
                                      width: "100%",
                                      cursor: "not-allowed",
                                    }}
                                    className="tinput-field"
                                    type="text"
                                    onChange={(e) =>
                                      inTimeHandleChange(data.applicant_id, e)
                                    }
                                    value={
                                      mainTable[index]["mainTable"] == undefined
                                        ? data.salary_pay
                                        : mainTable[index]["mainTable"]
                                    }
                                    readOnly
                                  />
                                </CCol>
                              </CRow>
                            </td>

                            <td
                              style={{ width: 230, padding: "17px" }}
                              className="text-center"
                            >
                              <CTextarea
                                className="area1-input-field"
                                type="text"
                                value={mainTable[index]["mainTable"]}
                                onChange={(e) =>
                                  linkHandleChange(data.applicant_id, e)
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
          </CRow>
          <br></br>
        </CCardBody>
      </CCard>
      <CCard style={{ borderRadius: "10px" }}>
        <CCardBody>
          <div style={{ paddingRight: "30px", paddingLeft: "30px" }}>
            <CRow className="mt-">
              <CCol lg="5">
                <CLabel className="remark-text">
                  {t("Search Interviewer Name")}
                </CLabel>
              </CCol>
              <CCol lg="2"></CCol>
              <CCol lg="5">
                <CLabel className="remark-text">
                  {t("Search Interviewer Position")}
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
                  <option value="">{"---Select Position---"}</option>
                  {positionData.length > 0 &&
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
                    <table className="templateList-table position-table autocomplete-table main-table">
                      <thead className="text-center auto-fix-head">
                        <tr style={{ color: "black" }}>
                          {/* {detailStatus == false && ( */}
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
                          {/* )} */}
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
                                {/* {detailStatus == false && ( */}
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

                                {/* )} */}
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
                                    src={process.env.PUBLIC_URL + "/image/Delete List.svg"}
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
                                      src={process.env.PUBLIC_URL + "/image/Delete Hover.svg"}
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
                    onClick={finalInterviewClick}
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

export default InterviewPage;
