/**  Job Applied Index
 * @author YuwaKoKo
 * @create 22/9/2022
 */
import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { ApiRequest } from "../../common/ApiRequest";
import { numberChk } from "../../common/CommonValidation";
import Loading from "../../common/Loading";
import AppliedJobPositionForm from "./AppliedJobPositionForm";
import AppliedJobPositionTable from "./AppliedJobPositionTable";
import SuccessError from "../../common/SuccessError";
import CommonMessage from "../../common/CommonMessage";
import PassClickModel from "./PassClickModel";
import ShortListedClickModel from "./ShortListedClickModel";
import RejectClickModel from "./RejectClickModel";
import CancelClickModel from "./CancelClickModel";
import HireClickModel from "./HireClickModel";
import OfferClickModel from "./OfferClickModel";
import FailClickModel from "./FailClickModel";
import ResumeConfirmMessage from "../../common/ResumeConfirmMessage";
import moment from "moment";
import { useHistory } from "react-router-dom";
import ApproveClickModel from "./ApproveClickModel";
import { nullChk } from "../../common/CommonValidation";
import ApiPath from "../../common/ApiPath";
import { useTranslation } from "react-i18next";
import PermissionCheck from "../../common/permission-check/PermissionCheck";
import { specificPermission } from "../../common/specific-permission/SpecificPermission";
import { validationWhiteSpace } from "../../common/CommonValidation";
const AppliedJobPositionListIndex = () => {
  let customer_name = window.location.href.split("/")[3];
  const { t } = useTranslation();
  const [statusData, setStatusData] = useState([]); //for status data
  const [loading, setLoading] = useState(false); // For Loading
  const [rolePermission] = useState(
    localStorage.getItem(`${customer_name}_PERMISSION`)
  ); //to get role permission
  const [deleteShow, setDeleteShow] = useState(false); // for confirmation message box (true,false)
  const [statusSelectValue, setStatusSelectValue] = useState(""); // for Status Selected Value
  const [success, setSuccess] = useState([]); // for success messages
  const [error, setError] = useState([]); //for error messages
  const [applicantName, setApplicantName] = useState(""); //for search applicant name
  const [email, setEmail] = useState(""); // for search email
  const [expSalary, setExpSalary] = useState(""); // for search exp salary
  const [indexNumber, setIndexNumber] = useState(""); // indexNumber for total Row
  const [jobCatData, setJobCatData] = useState([]); // job catagory main data from api
  const [positionNameData, setPositionNameData] = useState([]); // position main data from api
  const [deleteType, setDeleteType] = useState(""); //for confirmation box type
  const [confirmHeader, setConfirmHeader] = useState(""); // confirmation box header text
  const [confirmContent, setConfirmContent] = useState(""); // confirmation box content text
  const [appliedDateSelectedValue, setAppliedDateSelectedValue] = useState(""); // applied date select value
  const [appliedDateSelectedValueEnd, setAppliedDateSelectedValueEnd] =
    useState(""); // confirmation box content text
  const [stateData, setStateData] = useState([]); // state main data from api
  const [paginateArr, setPaginateArr] = useState([]); //for paginate array
  const [searchArrayFinal, setSearchArrayFinal] = useState([]); //for paginate array
  const [selectPaginateValue, setSelectPaginateValue] = useState(10); //for get selected role
  const [pageStart, setPageStart] = useState(); //for get start page
  const [pageEnd, setPageEnd] = useState(); //for get end page
  const [currentPage, setCurrentPage] = useState(); // current page for pagination
  const [lastPage, setLastPage] = useState(); // last page for pagination
  const [total, setTotal] = useState(""); // total rows
  const [onBoardStatus, setOnBoardStatus] = useState(false); // total rows
  const [checkApprover, setCeckApprover] = useState(
    localStorage.getItem(`${customer_name}CHECK_APPROVER`)
  ); // total rows
  const [deleteRadioId, setDeleteRadioId] = useState(0); //for delete radio id
  const [tmpDelete, setTmpDelete] = useState(""); // total rows
  const [jobCatSelectValue, setJobCatSelectValue] = useState(""); // job catagory select value main
  const [allCheck, setAllCheck] = useState(false); // for all check box (true,false)
  const [finalAllCheck, setFinalAllCheck] = useState(true); // for final check box (true,false)
  const [positionNameSelectValue, setPositionNameSelectValue] = useState(""); // position select value main
  const [stateSelectValue, setStateSelectValue] = useState(""); // state select main value
  const [stateTmp, setStateTmp] = useState(""); // state tamp value for buttom condition
  const [statusTmp, setStatusTmp] = useState(""); // status tamp value for buttom condition
  const [deleteBtnShow, setDeleteBtnShow] = useState(false); //Delete buttom show or hide
  const [detailStatus, setDetailStatus] = useState(false); //Detail condition
  const [failClickShow, setFailClickShow] = useState(false); //Fail pop up box condition
  const [passClickShow, setPassClickShow] = useState(false); //Pass pop up box condition
  const [shortListShow, setShortListShow] = useState(false); //Pass pop up box condition
  const [rejectClickShow, setRejectClickShow] = useState(false); //Reject pop up box condition
  const [cancelClickShow, setCancelClickShow] = useState(false); //Cancel pop up box condition
  const [hireClickShow, setHireClickShow] = useState(false); //Hire pop up box condition
  const [offerClickShow, setOfferClickShow] = useState(false); //Offer pop up box condition
  const [offerStaus, setOfferStatus] = useState(false); //Offer status condition in table
  const [approveClickShow, setApproveClickShow] = useState(false); //Approve pop up box condition
  const [clickedData, setClickedData] = useState([]); // for clicked data
  const [finalClickedData, setFinalClickedData] = useState([]); // for finalClicked data
  const [fileSelectError, setFileSelectError] = useState([]); // for clicked data
  const [cancelRemark, setCancelRemark] = useState(""); // remark text for cancel pop up box
  const [offerRemark, setOfferRemark] = useState(""); // remark text for offer pop up box
  const [newState, setNewState] = useState([]); // new state data for api
  const [newStatus, setNewStatus] = useState([]); //new status data for api
  const [offerID, setOfferID] = useState(""); //offer applicant id for api
  const history = useHistory(); // route Change state
  const [mainTable, setMainTable] = useState([]); // main data get from api
  const [threeSixRadioValue, setThreeSixRadioValue] = useState("");
  const [threeSevenRadioValue, setThreeSevenRadioValue] = useState();
  const [threeEightRadioValue, setThreeEightRadioValue] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [fileNameOffer, setFileNameOffer] = useState([]); //file name for offer pop up box
  const [uploadFileOffer, setUploadFileOffer] = useState([]); // file data for offer pop up box
  const [deleteRadio, setDeleteRadio] = useState([
    { id: 1, name: "Delete All Data" },
    { id: 2, name: "Delete Related Data" },
    { id: 3, name: "None" },
  ]); //for choose level of multiple choice
  const [searchArrayTmp, setSearchArrayTmp] = useState([
    { first_value: "", virtual_column: 1 },
    { first_value: "", virtual_column: 2 },
    { first_value: "", second_value: "", include: "", virtual_column: 3 },
    { first_value: "", second_value: "", include: "", virtual_column: 4 },
    { first_value: "", virtual_column: 5 },
    { first_value: "", second_value: "", virtual_column: 6 },
    { currency_type: "", virtual_column: 10 },
    {
      first_value: "",
      second_value: "",
      compare: "",
      virtual_column: "",
      element_type_id: "",
      level_category_id: "",
      template_element_label_id: "",
    },
    {
      first_value: "",
      second_value: "",
      compare: "",
      virtual_column: "",
      element_type_id: "",
      level_category_id: "",
      template_element_label_id: "",
    },
    {
      first_value: "",
      second_value: "",
      compare: "",
      virtual_column: "",
      element_type_id: "",
      level_category_id: "",
      template_element_label_id: "",
    },
  ]); // searchTmp Array
  const [offerTemp, setOfferTemp] = useState(""); // offer Tmp state
  const [poTmp, setPoTmp] = useState(0); // Position Tmp
  const [joTmp, setJoTmp] = useState(0); // Category Tmp
  const [applicantsName, setApplicantsName] = useState(""); //applicant Name state
  let searchArray = [
    { first_value: "", virtual_column: 1 },
    { first_value: "", virtual_column: 2 },
    { first_value: "", second_value: "", include: "", virtual_column: 3 },
    { first_value: "", second_value: "", include: "", virtual_column: 4 },
    { first_value: "", virtual_column: 5 },
    { first_value: "", second_value: "", virtual_column: 6 },
    { currency_type: "", virtual_column: 10 },
    {
      first_value: "",
      second_value: "",
      compare: "",
      virtual_column: "",
      element_type_id: "",
      level_category_id: "",
      template_element_label_id: "",
    },
    {
      first_value: "",
      second_value: "",
      compare: "",
      virtual_column: "",
      element_type_id: "",
      level_category_id: "",
      template_element_label_id: "",
    },
    {
      first_value: "",
      second_value: "",
      compare: "",
      virtual_column: "",
      element_type_id: "",
      level_category_id: "",
      template_element_label_id: "",
    },
  ]; // search Array data
  const [compSelectValue, setCompSelectValue] = useState(0); // compare select value
  const [levelSkillNameSelectValue, setLevelSkillNameSelectValue] =
    useState(""); // level skill name select value
  const [levelSkillDataSelectValue, setLevelSkillDataSelectValue] =
    useState(""); // level skill data select value
  const [buttomShowCondition, setButtomShowCondition] = useState(false); // buttom show condition boolean
  const [compData, setcompData] = useState([
    { comp_id: 1, comp_name: "Above" },
    { comp_id: 2, comp_name: "Below" },
    { comp_id: 3, comp_name: "Equal Above" },
    { comp_id: 4, comp_name: "Equal Below" },
  ]); // compare Data
  const [currency, setCurrency] = useState([
    { id: 1, name: "MMK" },
    { id: 2, name: "USD" },
  ]); // currency Data
  const [currencySelectValue, setCurrencySelectValue] = useState(""); //resumeData array
  const [resumeData, setResumeData] = useState([]); //resumeData array
  const [genderData] = useState([
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
  ]); // gender Data
  const [resumeSelectValue, setResumeSelectValue] = useState(""); // resume select value
  const [selectGenderValue, setSelectGenderValue] = useState(""); // select gender value
  const [expStartValue, setExpStartValue] = useState(""); // experenice start value
  const [expEndValue, setExpEndValue] = useState(""); // experience end value
  const [salaryEndValue, setSalaryEndValue] = useState(""); // salary start value
  const [salaryStartValue, setSalaryStartValue] = useState(""); // salary end value
  const [salaryCheck, setSalaryCheck] = useState(false); // salary check include boolean
  const [expCheck, setExpCheck] = useState(false); // experience check include boolean
  const [fromData, setFromData] = useState([]); // from Data from back key
  const [fourSixTextBoxValue, setFourSixTextBoxValue] = useState(""); //dynamic states change
  const [fourSevenTextBoxValue, setFourSevenTextBoxValue] = useState(""); //dynamic states change
  const [fourEightTextBoxValue, setFourEightTextBoxValue] = useState(""); //dynamic states change
  const [oneSixDataListValue, setOneSixDataListValue] = useState(""); //dynamic states change
  const [oneSevenDataListValue, setOneSevenDataListValue] = useState(""); //dynamic states change
  const [oneEightDataListValue, setOneEightDataListValue] = useState(""); //dynamic states change
  const [twoSixMultiValue, setTwoSixMultiValue] = useState(""); //dynamic states change
  const [twoSixLevelValue, setTwoSixLevelValue] = useState(""); //dynamic states change
  const [twoSixCompValue, setTwoSixCompValue] = useState(""); //dynamic states change
  const [twoSevenMultiValue, setTwoSevenMultiValue] = useState(""); //dynamic states change
  const [twoSevenLevelValue, setTwoSevenLevelValue] = useState(""); //dynamic states change
  const [twoSevenCompValue, setTwoSevenCompValue] = useState(""); //dynamic states change
  const [twoEightMultiValue, setTwoEightMultiValue] = useState(""); //dynamic states change
  const [twoEightLevelValue, setTwoEightLevelValue] = useState(""); //dynamic states change
  const [twoEightCompValue, setTwoEightCompValue] = useState(""); //dynamic states change
  const [twoSixLevelCatValue, setTwoSixLevelCatValue] = useState(""); //dynamic states change
  const [twoSevenLevelCatValue, setTwoSevenLevelCatValue] = useState(""); //dynamic states change
  const [twoEightLevelCatValue, setTwoEightLevelCatValue] = useState(""); //dynamic states change
  const [tmpSearchArray, setTmpSearchArray] = useState([]); // tmp search array from formload
  const [formComplete, setFormComplete] = useState(false); // for form complete condition
  const [loginPermission, setLoginPermission] = useState([]);
  const [loginId, setLoginId] = useState(
    localStorage.getItem(`${customer_name}_LOGIN_ID`)
  );
  let tempIndexNumber; // for number of table auto increment
  let checktrue = []; // checked data

  //useEffect function
  useEffect(() => {
    setLoading(true);
    document.body.style.overflow = "auto";

    (async () => {
      await PermissionCheck();
      let loginData = {
        login_id: loginId,
        role_id: localStorage.getItem(`${customer_name}_ROLE_ID`),
      };
      let permit = await specificPermission("Job Applied List", loginData);
      Promise.all([permit]).then((values) => {
        permit = values[0];
        setLoginPermission(permit);
      });
    })();

    let autoPosID = localStorage.getItem(`${customer_name}_POS_ID`);
    let autoJobID = localStorage.getItem(`${customer_name}_JOB_ID`);
    let autoStateID = localStorage.getItem(`${customer_name}_ST_ID`);
    let autoStatusID = "";
    if (localStorage.getItem(`${customer_name}_SU_ID`) == undefined) {
      autoStatusID = "";
    } else {
      autoStatusID = localStorage.getItem(`${customer_name}_SU_ID`);
    }
    let successMessage = localStorage.getItem(`${customer_name}_SUCCESS`);
    if (successMessage != null) {
      setSuccess([localStorage.getItem(`${customer_name}_SUCCESS`)]);
    }
    localStorage.removeItem(`${customer_name}_SUCCESS`);
    let R_ID = localStorage.getItem(`${customer_name}_R_ID`);
    let SHOW_ARRAY = localStorage.getItem(`${customer_name}_SHOW_ARRAY`);
    let page = localStorage.getItem(`${customer_name}_PAGE`);
    if (autoStateID == 8 && autoStatusID == 6) {
      setOnBoardStatus(true);
    } else {
      setOnBoardStatus(false);
    }
    if (autoStatusID == 5) {
      setOfferStatus(true);
    } else {
      setOfferStatus(false);
    }
    if (autoStateID == 1 && autoStatusID == 1) {
      setNewState([1, 1]);
      setNewStatus([2, 4]);
    }
    if (autoStateID == 1 && autoStatusID == 2) {
      setNewState([3, 2]);
      setNewStatus([1, 1]);
    }
    if (autoStateID == 2 && autoStatusID == 1) {
      setNewState([2, 2, 2]);
      setNewStatus([2, 4, 3]);
    }
    if (autoStateID == 2 && autoStatusID == 2) {
      setNewState([3]);
      setNewStatus([1]);
    }
    if (autoStateID == 3 && autoStatusID == 1) {
      setNewState([3, 3, 3]);
      setNewStatus([2, 4, 3]);
    }
    if (autoStateID == 3 && autoStatusID == 2) {
      setNewState([4, 0, 6]);
      setNewStatus([1, 0, 1]);
    }
    if (autoStateID == 4 && autoStatusID == 1) {
      setNewState([4, 4, 4]);
      setNewStatus([2, 4, 3]);
    }
    if (autoStateID == 4 && autoStatusID == 2) {
      setNewState([5, 0, 6]);
      setNewStatus([1, 0, 1]);
    }
    if (autoStateID == 5 && autoStatusID == 1) {
      setNewState([5, 5, 5]);
      setNewStatus([2, 4, 3]);
    }
    if (autoStateID == 5 && autoStatusID == 2) {
      setNewState([0, 0, 6]);
      setNewStatus([0, 0, 1]);
    }
    if (autoStateID == 6 && autoStatusID == 1) {
      setNewState([0, 6, 6]);
      setNewStatus([0, 4, 5]);
    }
    if (autoStateID == 6 && autoStatusID == 5) {
      setNewState([7, 0, 6]);
      setNewStatus([1, 0, 3]);
    }
    if (autoStateID == 7 && autoStatusID == 1) {
      setNewState([8, 0, 7]);
      setNewStatus([6, 0, 3]);
    }

    localStorage.removeItem(`${customer_name}_POS_ID`);
    localStorage.removeItem(`${customer_name}_SHOW_ARRAY`);
    localStorage.removeItem(`${customer_name}_JOB_ID`);
    localStorage.removeItem(`${customer_name}_ST_ID`);
    localStorage.removeItem(`${customer_name}_SU_ID`);
    localStorage.removeItem(`${customer_name}_R_ID`);
    if (
      localStorage.getItem(`${customer_name}_ST_ID`) != "" &&
      localStorage.getItem(`${customer_name}_SU_ID`) != ""
    ) {
      setButtomShowCondition(true);
    }
    (async () => {
      await getResume();
      await getState();

      if (selectPaginateValue != undefined && mainTable.length > 0) {
        search();
      }
    })();
    (async () => {
      if (R_ID != null) {
        allJobFormLoad(R_ID);
        if (autoStateID != "") {
          await getStatus(autoStateID);
        }
        if (autoJobID != "") {
          await getPosition(autoJobID);
          await allJobFormLoad(R_ID);
        }
        getFromData(R_ID);
        setResumeSelectValue(R_ID);
        setPositionNameSelectValue(autoPosID);
        setStateSelectValue(autoStateID);
        setStatusSelectValue(autoStatusID);
        setJobCatSelectValue(autoJobID);
        setStateTmp(autoStateID);
        setStatusTmp(autoStatusID);

        if (SHOW_ARRAY == null) {
          let a = [
            { first_value: "", virtual_column: 1 },
            { first_value: "", virtual_column: 2 },
            {
              first_value: "",
              second_value: "",
              include: "",
              virtual_column: 3,
            },
            {
              first_value: "",
              second_value: "",
              include: "",
              virtual_column: 4,
            },
            { first_value: "", virtual_column: 5 },
            { first_value: "", second_value: "", virtual_column: 6 },
            { currency_type: "", virtual_column: 10 },
            {
              first_value: "",
              second_value: "",
              compare: "",
              virtual_column: "",
              element_type_id: "",
              level_category_id: "",
              template_element_label_id: "",
            },
            {
              first_value: "",
              second_value: "",
              compare: "",
              virtual_column: "",
              element_type_id: "",
              level_category_id: "",
              template_element_label_id: "",
            },
            {
              first_value: "",
              second_value: "",
              compare: "",
              virtual_column: "",
              element_type_id: "",
              level_category_id: "",
              template_element_label_id: "",
            },
          ];
          setTimeout(() => {
            formloadSearch(
              autoJobID,
              autoPosID,
              autoStateID,
              R_ID,
              a,
              autoStatusID,
              page
            );
          }, 500);
        } else {
          setTmpSearchArray(JSON.parse(SHOW_ARRAY));
          let a = JSON.parse(SHOW_ARRAY);
          setTimeout(() => {
            formloadSearch(
              autoJobID,
              autoPosID,
              autoStateID,
              R_ID,
              a,
              autoStatusID,
              page
            );
          }, 500);

          setApplicantName(a[0].first_value);
          setEmail(a[1].first_value);
          setSalaryStartValue(a[2].first_value);
          setSalaryEndValue(a[2].second_value);
          setSalaryCheck(a[2].include);
          setExpStartValue(a[3].first_value);
          setExpEndValue(a[3].second_value);
          setExpCheck(a[3].include);

          setSelectGenderValue(a[4].first_value);
          setAppliedDateSelectedValue(a[5].first_value);
          setAppliedDateSelectedValueEnd(a[5].second_value);
          setCurrencySelectValue(a[6].currency_type);

          if (a.length > 10) {
            setFourSixTextBoxValue(a[7].first_value);
            setThreeSixRadioValue(a[7].first_value);
            setTwoSixMultiValue(a[7].first_value);
            setTwoSixLevelValue(a[7].second_value);
            setTwoSixLevelCatValue(a[7].level_category_id);
            setTwoSixCompValue(a[7].compare);
            setOneSixDataListValue(a[7].first_value);

            setFourSevenTextBoxValue(a[8].first_value);
            setThreeSevenRadioValue(a[8].first_value);
            setTwoSevenMultiValue(a[8].first_value);
            setTwoSevenLevelValue(a[8].second_value);
            setTwoSevenLevelCatValue(a[8].level_category_id);
            setTwoSevenCompValue(a[8].compare);
            setOneSevenDataListValue(a[8].first_value);

            setFourEightTextBoxValue(a[9].first_value);
            setThreeEightRadioValue(a[9].first_value);
            setTwoEightMultiValue(a[9].first_value);
            setTwoEightLevelCatValue(a[9].level_category_id);
            setTwoEightLevelValue(a[9].second_value);
            setTwoEightCompValue(a[9].compare);
            setOneEightDataListValue(a[9].first_value);
          }
        }
      } else {
        setFormComplete(true);
        setLoading(false);
      }
    })();
    setLoading(false);
  }, [selectPaginateValue]);

  //For new state and status condtion function
  let stateAndSatus = () => {
    if (stateSelectValue != "" && statusSelectValue != "") {
      setButtomShowCondition(true);
    }
    if (stateSelectValue == 1 && statusSelectValue == 1) {
      setNewState([1, 1]);
      setNewStatus([2, 4]);
    }
    if (stateSelectValue == 1 && statusSelectValue == 2) {
      setNewState([3, 2]);
      setNewStatus([1, 1]);
    }
    if (stateSelectValue == 2 && statusSelectValue == 1) {
      setNewState([2, 2, 2]);
      setNewStatus([2, 4, 3]);
    }
    if (stateSelectValue == 2 && statusSelectValue == 2) {
      setNewState([3]);
      setNewStatus([1]);
    }
    if (stateSelectValue == 3 && statusSelectValue == 1) {
      setNewState([3, 3, 3]);
      setNewStatus([2, 4, 3]);
    }
    if (stateSelectValue == 3 && statusSelectValue == 2) {
      setNewState([4, 0, 6]);
      setNewStatus([1, 0, 1]);
    }
    if (stateSelectValue == 4 && statusSelectValue == 1) {
      setNewState([4, 4, 4]);
      setNewStatus([2, 4, 3]);
    }
    if (stateSelectValue == 4 && statusSelectValue == 2) {
      setNewState([5, 0, 6]);
      setNewStatus([1, 0, 1]);
    }
    if (stateSelectValue == 5 && statusSelectValue == 1) {
      setNewState([5, 5, 5]);
      setNewStatus([2, 4, 3]);
    }
    if (stateSelectValue == 5 && statusSelectValue == 2) {
      setNewState([0, 0, 6]);
      setNewStatus([0, 0, 1]);
    }
    if (stateSelectValue == 6 && statusSelectValue == 1) {
      setNewState([0, 6, 6]);
      setNewStatus([0, 4, 5]);
    }
    if (stateSelectValue == 6 && statusSelectValue == 5) {
      setNewState([7, 0, 6]);
      setNewStatus([1, 0, 3]);
    }

    if (statusSelectValue == 5) {
      setOfferStatus(true);
    }

    if (stateSelectValue == 7 && statusSelectValue == 1) {
      setNewState([8, 0, 7]);
      setNewStatus([6, 0, 3]);
    }

    if (stateSelectValue == 8 && statusSelectValue == 6) {
      setOnBoardStatus(true);
    } else {
      setOnBoardStatus(false);
    }
  };
  // for formload condition loading close function
  let close = () => {
    if (formComplete == true) {
      setLoading(false);
    }
  };

  //resume select change function
  const resumeSelectChange = (e) => {
    setJobCatData([]);
    setMainTable([]);
    setStateSelectValue("");
    setStatusSelectValue("");
    setStatusData([]);
    setPositionNameData([]);
    setPositionNameSelectValue("");
    setJobCatSelectValue("");
    setFourSixTextBoxValue("");
    setThreeSixRadioValue("");
    setTwoSixMultiValue("");
    setTwoSixLevelValue("");
    setTwoSixCompValue("");
    setOneSixDataListValue("");
    setFourSevenTextBoxValue("");
    setThreeSevenRadioValue("");
    setTwoSevenMultiValue("");
    setTwoSevenLevelValue("");
    setTwoSevenCompValue("");
    setOneSevenDataListValue("");
    setFourEightTextBoxValue("");
    setThreeEightRadioValue("");
    setTwoEightMultiValue("");
    setTwoEightLevelValue("");
    setTwoEightCompValue("");
    setOneEightDataListValue("");
    setJobCatSelectValue("");
    setPositionNameSelectValue("");
    setStateSelectValue("");
    setStatusSelectValue("");
    setApplicantName("");
    setEmail("");
    setSalaryStartValue("");
    setSalaryEndValue("");
    setSalaryCheck(false);
    setExpStartValue("");
    setExpEndValue("");
    setExpCheck(false);
    setSelectGenderValue("");
    setAppliedDateSelectedValue("");
    setAppliedDateSelectedValueEnd("");

    setResumeSelectValue(e.target.value);
    if (e.target.value != "") {
      getFromData(e.target.value);
      allJobFormLoad(e.target.value);
    }
  };

  // State get data function from api
  let getState = async () => {
    setError([]);
    let states = {
      method: "get",
      package_name: "recruit",
      url: ApiPath.AppliedJobPositionListIndexGetState,
      params: { login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`) },
    };
    let response = await ApiRequest(states);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        setStateData(response.data.data);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
      close();
    }
  };

  //resume data api
  let getResume = async () => {
    setLoading(true);
    setError([]);
    let states = {
      method: "get",
      package_name: "recruit",
      url: ApiPath.AppliedJobPositionListIndexGetResume,
      params: { login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`) },
    };
    let response = await ApiRequest(states);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        setResumeData(response.data.data);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
  };

  //Status Select Value onChange function
  let statusSelectChange = (e) => {
    if (e.target.value == "" || e.target.value == 1) {
      setOfferStatus(false);
    }
    setError([]);
    setSuccess([]);
    setStatusSelectValue(e.target.value);
  };

  //Applicant Name input Value onChange function
  let applicantNameHandleChange = (e) => {
    setApplicantName(e.target.value);
  };

  //Status Select Value onChange function
  let emailHandleChange = (e) => {
    setError([]);
    setSuccess([]);
    setEmail(e.target.value);
  };

  //Exp Salary Input Value onChange function
  let expSalaryHandleChange = (e) => {
    setError([]);
    setSuccess([]);
    setExpSalary(e.target.value);
  };

  //Job Category Select Value onChange function
  let jobCatSelectChange = (e) => {
    setError([]);
    setSuccess([]);
    setPositionNameData([]);
    setPositionNameSelectValue("");
    setJobCatSelectValue(e.target.value);

    if (e.target.value != "") {
      getPosition(e.target.value);
    }
  };

  //Position Name Select Value onChange function
  let positionNameSelectChange = (e) => {
    setError([]);
    setSuccess([]);
    setPositionNameSelectValue(e.target.value);
  };

  //State Select value onChange function
  let stateSelectChange = async (e) => {
    setOfferStatus(false);
    setError([]);
    setSuccess([]);
    setStateSelectValue(e.target.value);
    setStatusSelectValue("");
    setStatusData([]);
    if (e.target.value != "") {
      getStatus(e.target.value);
    }
  };

  //positon from database called by api
  let getPosition = async (i) => {
    setLoading(true);
    let pos_form_load = {
      method: "get",
      package_name: "recruit",
      url: ApiPath.AppliedJobPositionListIndexGetPosition,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        job_category_id: i,
      },
    };
    let response = await ApiRequest(pos_form_load);
    if (response.flag === false) {
      setSuccess([]);
      setPositionNameData([]);
    } else {
      if (response.data.status === "OK") {
        setPositionNameData(response.data.data);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
    close();
  };

  //status from database called by api
  let getStatus = async (i) => {
    setLoading(true);
    let obj = {
      method: "get",
      package_name: "recruit",
      url: ApiPath.AppliedJobPositionListIndexGetStatus,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        state_id: i,
      },
    };
    let response = await ApiRequest(obj);
    if (response.flag == false) {
      setError(response.message);
    } else {
      if (response.data.status == "OK") {
        setStatusData(response.data.data.status);

        setError([]);
      } else {
        setSuccess([]);
        setError([response.data.data.message]);
        setStatusData([]);
      }
    }
    close();
  };

  //create field from template create called by api
  let allJobFormLoad = async (i) => {
    setLoading(true);
    let obj = {
      method: "get",
      package_name: "recruit",
      url: ApiPath.AppliedJobPositionListIndexAllJobFormLoad,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        template_id: i,
      },
    };
    let response = await ApiRequest(obj);
    if (response.flag == false) {
      setError(response.message);
    } else {
      if (response.data.status == "OK") {
        setJobCatData(response.data.data);
        setError([]);
      } else {
        setSuccess([]);
        setError([response.data.data.message]);
        setStatusData([]);
      }
    }
    close();
  };

  let getFromData = async (i) => {
    setLoading(true);
    let obj = {
      method: "get",
      package_name: "recruit",
      url: ApiPath.AppliedJobPositionListIndexGetFromData,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        template_id: i,
      },
    };
    let response = await ApiRequest(obj);
    if (response.flag == false) {
      setError(response.message);
    } else {
      if (response.data.status == "OK") {
        setFromData(response.data.data);
        setError([]);
      } else {
        setSuccess([]);
        setError([response.data.data.message]);
        setStatusData([]);
      }
    }
    // setLoading(false);
  };

  //Search onClick function
  let searchClick = () => {
    if (tmpDelete == 1 || tmpDelete == 2) {
      setDeleteBtnShow(true);
    } else {
      setDeleteBtnShow(false);
    }
    setError([]);
    setSuccess([]);
    let errArray = [];
    var mStart = moment(appliedDateSelectedValue);
    var mEnd = moment(appliedDateSelectedValueEnd);
    let dateCompare = mStart.isSameOrBefore(mEnd);

    if (resumeSelectValue == "") {
      errArray.push(t(CommonMessage.JSE001).replace("%s", t("Resume Title")));
    }
    if (
      nullChk(appliedDateSelectedValue) &&
      nullChk(appliedDateSelectedValueEnd)
    ) {
      if (dateCompare == false) {
        errArray.push(t(CommonMessage.JSE048));
      }
    }
    if (nullChk(salaryStartValue)) {
      if (salaryStartValue.length > 19) {
        errArray.push(t(CommonMessage.JSE055).replace("%s", t("Salary Value")));
      }
    }
    if (nullChk(salaryEndValue)) {
      if (salaryEndValue.length > 19) {
        errArray.push(t(CommonMessage.JSE055).replace("%s", t("Salary Value")));
      }
    }
    if (nullChk(expEndValue)) {
      if (expEndValue.length > 19) {
        errArray.push(
          t(CommonMessage.JSE055).replace("%s", t("Experience Value"))
        );
      }
    }
    if (nullChk(expStartValue)) {
      if (expStartValue.length > 19) {
        errArray.push(
          t(CommonMessage.JSE055).replace("%s", t("Experience Value"))
        );
      }
    }
    if (nullChk(salaryStartValue) && nullChk(salaryEndValue)) {
      if (!numberChk(salaryStartValue) || !numberChk(salaryEndValue)) {
        errArray.push(
          t(CommonMessage.JSE005).replace(
            "%s",
            t("number only in expected salary")
          )
        );
      } else if (parseInt(salaryStartValue) >= parseInt(salaryEndValue)) {
        errArray.push(t(CommonMessage.JSE049));
      }
    }
    if (nullChk(expStartValue) && nullChk(expEndValue)) {
      if (!numberChk(expStartValue) || !numberChk(expEndValue)) {
        errArray.push(
          t(CommonMessage.JSE005).replace("%s", t("number only in experience"))
        );
      } else if (parseInt(expStartValue) >= parseInt(expEndValue)) {
        errArray.push(t(CommonMessage.JSE050));
      }
    }
    if (errArray == [] || errArray == "") {
      setError([]);
      setStateTmp(stateSelectValue);
      setStatusTmp(statusSelectValue);
      setPoTmp(positionNameSelectValue);
      setJoTmp(jobCatSelectValue);
      stateAndSatus();
      searchArray[0].first_value = applicantName;
      searchArray[1].first_value = email;
      searchArray[2].first_value = salaryStartValue;
      searchArray[2].second_value = salaryEndValue;
      searchArray[2].include = salaryCheck;
      searchArray[3].first_value = expStartValue;
      searchArray[3].second_value = expEndValue;
      searchArray[3].include = expCheck;
      searchArray[4].first_value = selectGenderValue;
      searchArray[5].first_value = appliedDateSelectedValue;
      searchArray[5].second_value = appliedDateSelectedValueEnd;
      searchArray[6].currency_type = currencySelectValue;

      fromData.length > 0 &&
        fromData.map((value, index) => {
          if (value.virtual_column == 7 && value.element_type_id == 4) {
            searchArray[7].first_value = fourSixTextBoxValue;
            searchArray[7].virtual_column = 7;
            searchArray[7].element_type_id = 4;
            searchArray[7].template_element_label_id =
              fromData[6].template_element_label_id;
          }
          if (value.virtual_column == 8 && value.element_type_id == 4) {
            searchArray[8].first_value = fourSevenTextBoxValue;
            searchArray[8].virtual_column = 8;
            searchArray[8].element_type_id = 4;
            searchArray[8].template_element_label_id =
              fromData[7].template_element_label_id;
          }
          if (value.virtual_column == 9 && value.element_type_id == 4) {
            searchArray[9].first_value = fourEightTextBoxValue;
            searchArray[9].virtual_column = 9;
            searchArray[9].element_type_id = 4;
            searchArray[9].template_element_label_id =
              fromData[8].template_element_label_id;
          }

          if (value.virtual_column == 7 && value.element_type_id == 3) {
            searchArray[7].first_value = threeSixRadioValue;
            searchArray[7].virtual_column = 7;
            searchArray[7].element_type_id = 3;
            searchArray[7].template_element_label_id =
              fromData[6].template_element_label_id;
          }
          if (value.virtual_column == 8 && value.element_type_id == 3) {
            searchArray[8].first_value = threeSevenRadioValue;
            searchArray[8].virtual_column = 8;
            searchArray[8].element_type_id = 3;
            searchArray[8].template_element_label_id =
              fromData[7].template_element_label_id;
          }
          if (value.virtual_column == 9 && value.element_type_id == 3) {
            searchArray[9].first_value = threeEightRadioValue;
            searchArray[9].virtual_column = 9;
            searchArray[9].element_type_id = 3;
            searchArray[9].template_element_label_id =
              fromData[8].template_element_label_id;
          }

          if (value.virtual_column == 7 && value.element_type_id == 2) {
            searchArray[7].first_value = twoSixMultiValue;
            searchArray[7].second_value = twoSixLevelValue;
            searchArray[7].compare = twoSixCompValue;
            searchArray[7].virtual_column = 7;
            searchArray[7].element_type_id = 2;
            searchArray[7].template_element_label_id =
              fromData[6].template_element_label_id;
            searchArray[7].level_category_id = twoSixLevelCatValue;
          }
          if (value.virtual_column == 8 && value.element_type_id == 2) {
            searchArray[8].first_value = twoSevenMultiValue;
            searchArray[8].second_value = twoSevenLevelValue;
            searchArray[8].compare = twoSevenCompValue;
            searchArray[8].virtual_column = 8;
            searchArray[8].element_type_id = 2;
            searchArray[8].template_element_label_id =
              fromData[7].template_element_label_id;
            searchArray[8].level_category_id = twoSevenLevelCatValue;
          }
          if (value.virtual_column == 9 && value.element_type_id == 2) {
            searchArray[9].first_value = twoEightMultiValue;
            searchArray[9].second_value = twoEightLevelValue;
            searchArray[9].compare = twoEightCompValue;
            searchArray[9].virtual_column = 9;
            searchArray[9].element_type_id = 2;
            searchArray[9].template_element_label_id =
              fromData[8].template_element_label_id;
            searchArray[9].level_category_id = twoEightLevelCatValue;
          }

          if (value.virtual_column == 7 && value.element_type_id == 1) {
            searchArray[7].first_value = oneSixDataListValue;
            searchArray[7].virtual_column = 7;
            searchArray[7].element_type_id = 1;
            searchArray[7].template_element_label_id =
              fromData[6].template_element_label_id;
          }

          if (value.virtual_column == 8 && value.element_type_id == 1) {
            searchArray[8].first_value = oneSevenDataListValue;
            searchArray[8].virtual_column = 8;
            searchArray[8].element_type_id = 1;
            searchArray[8].template_element_label_id =
              fromData[7].template_element_label_id;
          }

          if (value.virtual_column == 9 && value.element_type_id == 1) {
            searchArray[9].first_value = oneEightDataListValue;
            searchArray[9].virtual_column = 9;
            searchArray[9].element_type_id = 1;
            searchArray[9].template_element_label_id =
              fromData[8].template_element_label_id;
          }
        });
      if (
        searchArray[7].first_value == "" &&
        searchArray[8].first_value == "" &&
        searchArray[9].first_value == ""
      ) {
        searchArray.splice(7, 8, 9);
      }
      search();
      setSearchArrayFinal(searchArray);
    } else {
      setSuccess([]);
      setError(errArray);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  //Search API
  let search = async (page = 1) => {
    clearDelete();
    let statusNullCheck = "";
    let stateNullCheck = "";
    let job_category_idNullCheck = "";
    let position_idNullCheck = "";

    if (statusSelectValue == "null") {
      statusNullCheck = "";
    } else {
      statusNullCheck = statusSelectValue;
    }
    if (stateSelectValue == "null") {
      stateNullCheck = "";
    } else {
      stateNullCheck = stateSelectValue;
    }
    if (jobCatSelectValue == "null") {
      job_category_idNullCheck = "";
    } else {
      job_category_idNullCheck = jobCatSelectValue;
    }

    if (positionNameSelectValue == "null") {
      position_idNullCheck = "";
    } else {
      position_idNullCheck = positionNameSelectValue;
    }
    setError([]);
    setSuccess([]);
    setLoading(true);
    let search = {
      method: "post",
      package_name: "recruit",
      url: ApiPath.AppliedJobPositionListIndexSearch + page,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        search_data: searchArray,
        template_id: resumeSelectValue,
        paginate: selectPaginateValue,
        job_category_id: job_category_idNullCheck,
        position_id: position_idNullCheck,
        state_id: stateNullCheck,
        status: statusNullCheck,
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setError(response.message);
      setMainTable([]);
      setDeleteBtnShow(false);
    } else {
      if (response.data.status === "OK") {
        setSearchArrayTmp(searchArray);
        setAllCheck(false);
        tempIndexNumber =
          (response.data.data.current_page - 1) * selectPaginateValue;
        setIndexNumber(tempIndexNumber);
        setMainTable(response.data.data.data);
        setPageStart(response.data.data.from);
        setPageEnd(response.data.data.to);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setTotal(response.data.data.total);
        let temp_total = Math.floor(response.data.data.total / 10);
        if (temp_total > 4) {
          setPaginateArr([10, 20, 30, 40, 50]);
        }
        if (temp_total >= 4) {
          setPaginateArr([10, 20, 30, 40]);
        } else if (temp_total == 3) {
          setPaginateArr([10, 20, 30]);
        } else if (temp_total == 2) {
          setPaginateArr([10, 20]);
        } else if (temp_total == 1) {
          setPaginateArr([10]);
        }
      } else {
        setSuccess([]);
        setError([response.data.message]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setMainTable([]);
      }
    }
    close();
    // setLoading(false);
  };

  // onChange function on radio(delete radio)

  const clickDeleteRadio = (data) => {
    setDeleteRadioId(data.id);
    if (data.id == 1 || data.id == 2) {
      setDeleteBtnShow(true);
    } else {
      setDeleteBtnShow(false);
    }
  };

  // FormLoad Search API
  let formloadSearch = async (
    jobCatSelectValue,
    positionNameSelectValue,
    stateSelectValue,
    resumeSelectValue,
    searchArray,
    statusSelectValue,
    page
  ) => {
    let tus = statusSelectValue;
    if (statusSelectValue == "null") {
      tus = "";
    }
    let tate = stateSelectValue;
    if (stateSelectValue == "null") {
      tate = "";
    }
    let jobNullCHk = jobCatSelectValue;
    if (jobCatSelectValue == "null") {
      jobNullCHk = "";
    }
    let posNullCHk = positionNameSelectValue;
    if (positionNameSelectValue == "null") {
      posNullCHk = "";
    }

    let pvalue = "";
    if (selectPaginateValue == "") {
      pvalue = 10;
    } else {
      pvalue = selectPaginateValue;
    }
    setError([]);
    clearDelete();
    let search = {
      method: "post",
      package_name: "recruit",
      url: ApiPath.AppliedJobPositionListIndexSearch,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        paginate: pvalue,
        job_category_id: jobNullCHk,
        position_id: posNullCHk,
        state_id: tate,
        template_id: resumeSelectValue,
        search_data: searchArray,
        status: tus,
        page: page,
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      // setSuccess([]);
      // setError(response.message);
      setMainTable([]);
      setDeleteBtnShow(false);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status === "OK") {
        setPoTmp(positionNameSelectValue);
        setJoTmp(jobCatSelectValue);
        tempIndexNumber =
          (response.data.data.current_page - 1) * selectPaginateValue;
        setIndexNumber(tempIndexNumber);

        let v = localStorage.getItem(`${customer_name}_CHECK_ID`);
        let checkedArray = JSON.parse(v);
        if (checkedArray != null) {
          response.data.data.data.map((data) => {
            checkedArray.map((i) => {
              if (data.applicant_id == i) {
                data.isChecked = true;
                return data;
              }
              return data;
            });
          });

          if (checkedArray.length == response.data.data.data.length) {
            setAllCheck(true);
          }
          localStorage.removeItem(`${customer_name}_CHECK_ID`);
        }
        setMainTable(response.data.data.data);
        setPageStart(response.data.data.from);
        setPageEnd(response.data.data.to);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setTotal(response.data.data.total);
        let temp_total = Math.floor(response.data.data.total / 10);
        if (temp_total >= 5) {
          setPaginateArr([10, 20, 30, 40, 50]);
        } else if (temp_total == 4) {
          setPaginateArr([10, 20, 30, 40]);
        } else if (temp_total == 3) {
          setPaginateArr([10, 20, 30]);
        } else if (temp_total == 2) {
          setPaginateArr([10, 20]);
        } else if (temp_total == 1) {
          setPaginateArr([10]);
        }
      } else {
        // setSuccess([]);
        // setError([response.data.message]);
        setMainTable([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setFormComplete(true);
    setLoading(false);
  };

  // tempSearch API
  let tempSearch = async (page = 1) => {
    clearDelete();
    setLoading(true);
    let search = {
      method: "post",
      package_name: "recruit",
      url: ApiPath.AppliedJobPositionListIndexSearch,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        search_data: searchArrayTmp,
        template_id: resumeSelectValue,
        paginate: selectPaginateValue,
        job_category_id: jobCatSelectValue,
        position_id: positionNameSelectValue,
        state_id: stateSelectValue,
        status: statusSelectValue,
        page: page,
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setDeleteBtnShow(false);
    } else {
      if (response.data.status === "OK") {
        tempIndexNumber =
          (response.data.data.current_page - 1) * selectPaginateValue;
        setIndexNumber(tempIndexNumber);
        setMainTable(response.data.data.data);
        setPageStart(response.data.data.from);
        setPageEnd(response.data.data.to);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setTotal(response.data.data.total);
        setAllCheck(false);
        let temp_total = Math.floor(response.data.data.total / 10);
        if (temp_total > 4) {
          setPaginateArr([10, 20, 30, 40, 50]);
        }
        if (temp_total >= 4) {
          setPaginateArr([10, 20, 30, 40]);
        } else if (temp_total == 3) {
          setPaginateArr([10, 20, 30]);
        } else if (temp_total == 2) {
          setPaginateArr([10, 20]);
        } else if (temp_total == 1) {
          setPaginateArr([10]);
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  };

  //Pass onClick function
  const passClick = async () => {
    let checktrue = [];
    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      setError([
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox")),
      ]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      let arr = [];
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr.push(main);
          setClickedData(arr);
          setPassClickShow(true);
          setButtomShowCondition(false);
        }
      });
    }
  };

  //Pass onClick function
  const shortListClick = async () => {
    let checktrue = [];
    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      setError([
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox")),
      ]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      let arr = [];
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr.push(main);
          setClickedData(arr);
          setShortListShow(true);
          setButtomShowCondition(false);
        }
      });
    }
  };

  //close short list function
  const closeShortList = (i) => {
    setButtomShowCondition(true);
    if (i == 1) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    setClickedData([]);
    setFinalClickedData([]);
    setError([]);
    setFileSelectError([]);
    setShortListShow(false);
    if (finalAllCheck == true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
    setFinalAllCheck(true);
  };

  //Final Pass Click Pass Pop up function with Pass API
  const finalPassClick = async () => {
    setFileSelectError([]);
    let errArray = [];
    let arr = [];
    clickedData.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      errArray.push(
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox"))
      );
    } else {
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr.push(main);
          setFinalClickedData(arr);
        }
      });
    }
    arr.forEach((main) => {
      if (main.score == "") {
        errArray.push(t(CommonMessage.JSE005).replace("%s", t("score")));
      }
      if (main.score != "") {
        if (!numberChk(main.score)) {
          errArray.push(
            t(CommonMessage.JSE005).replace("%s", t("number only in score"))
          );
        }
      }

      if (main.score.length > 10) {
        errArray.push(
          t(CommonMessage.JSE033).replace("%s", t("score")).replace("%s", "10")
        );
      }
      if (main.remark == "") {
        errArray.push(t(CommonMessage.JSE005).replace("%s", t("remark")));
      }
    });

    if (errArray == [] || errArray == "") {
      setLoading(true);
      let pass = {
        method: "post",
        package_name: "recruit",
        url: ApiPath.AppliedJobPositionListIndexPassRejectCancel,
        params: {
          login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
          state_id: parseInt(stateTmp),
          status: parseInt(statusTmp),
          new_state_id: newState[0],
          new_status: newStatus[0],
          data: arr,
        },
      };
      let response = await ApiRequest(pass);
      if (response.flag == false) {
        if (checktrue.length == clickedData.length) {
          setFinalAllCheck(true);
        }
        setFileSelectError(response.message);
        if (finalAllCheck == true) {
          setFinalAllCheck(true);
        } else {
          setFinalAllCheck(false);
        }
      } else {
        if (response.data.status == "OK") {
          let page = currentPage;
          setFileSelectError([]);
          setSuccess([response.data.message]);
          setTimeout(() => {
            tempSearch(page);
          }, 2000);
          closePassClick(1);
          setMainTable([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          arr = [];
        } else {
          setFileSelectError([response.data.message]);
          setSuccess([]);
        }
      }
      setLoading(false);
    } else {
      setSuccess([]);
      setFileSelectError(errArray);
      errArray = [];
    }
  };

  //Final Pass Click Pass Pop up function with Pass API
  const finalShortListedClick = async () => {
    setFileSelectError([]);
    let errArray = [];
    let arr = [];
    clickedData.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      errArray.push(
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox"))
      );
    } else {
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr.push(main);
          setFinalClickedData(arr);
        }
      });
    }
    arr.forEach((main) => {
      if (main.remark == "") {
        errArray.push(t(CommonMessage.JSE005).replace("%s", t("remark")));
      }
    });

    if (errArray == [] || errArray == "") {
      setLoading(true);
      let pass = {
        method: "post",
        package_name: "recruit",
        url: ApiPath.AppliedJobPositionListIndexPassRejectCancel,
        params: {
          login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
          state_id: parseInt(stateTmp),
          status: parseInt(statusTmp),
          new_state_id: newState[0],
          new_status: newStatus[0],
          data: arr,
        },
      };
      let response = await ApiRequest(pass);
      if (response.flag == false) {
        if (checktrue.length == clickedData.length) {
          setFinalAllCheck(true);
        }
        setFileSelectError(response.message);
        if (finalAllCheck == true) {
          setFinalAllCheck(true);
        } else {
          setFinalAllCheck(false);
        }
      } else {
        if (response.data.status == "OK") {
          let page = currentPage;
          setFileSelectError([]);
          setSuccess([response.data.message]);
          setTimeout(() => {
            tempSearch(page);
          }, 2000);
          closeShortList(1);
          setMainTable([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          arr = [];
        } else {
          setFileSelectError([response.data.message]);
          setSuccess([]);
        }
      }
      setLoading(false);
    } else {
      setSuccess([]);
      setFileSelectError(errArray);
      errArray = [];
    }
  };

  //Final Reject Click Reject Pop Up function with API
  const finalRejectClick = async () => {
    setFileSelectError([]);
    let errArray = [];
    let arr = [];
    clickedData.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      errArray.push(
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox"))
      );
    } else {
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr.push(main);
          setFinalClickedData(arr);
        }
      });
    }
    arr.forEach((main) => {
      if (main.score != "") {
        if (!numberChk(main.score)) {
          errArray.push(
            t(CommonMessage.JSE005).replace("%s", t("number only in score"))
          );
        }
        if (main.score.length > 10) {
          errArray.push(
            t(CommonMessage.JSE033)
              .replace("%s", t("score"))
              .replace("%s", "10")
          );
        }
      }

      if (main.remark == "") {
        errArray.push(t(CommonMessage.JSE005).replace("%s", t("remark")));
      }
    });
    if (errArray == [] || errArray == "") {
      setLoading(true);
      let pass = {
        method: "post",
        package_name: "recruit",
        url: ApiPath.AppliedJobPositionListIndexPassRejectCancel,
        params: {
          login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
          data: arr,
          state_id: stateTmp,
          status: statusTmp,
          new_state_id: newState[1],
          new_status: newStatus[1],
        },
      };
      let response = await ApiRequest(pass);
      if (response.flag == false) {
        if (checktrue.length == clickedData.length) {
          setFinalAllCheck(true);
        }
        setFileSelectError(response.message);
        if (finalAllCheck == true) {
          setFinalAllCheck(true);
        } else {
          setFinalAllCheck(false);
        }
      } else {
        if (response.data.status == "OK") {
          let page = currentPage;
          setFileSelectError([]);
          setSuccess([response.data.message]);
          setTimeout(() => {
            tempSearch(page);
          }, 2000);
          closeRejectClick(1);
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
      errArray = [];
    }
  };

  //Close Click from Pass Pop up Box
  const closePassClick = (i) => {
    setButtomShowCondition(true);

    if (i == 1) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    setClickedData([]);
    setFinalClickedData([]);
    setError([]);
    setFileSelectError([]);
    setPassClickShow(false);
    if (finalAllCheck == true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
    setFinalAllCheck(true);
  };

  // Reject On Click Function
  const rejectClick = () => {
    let checktrue = [];
    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      setError([
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox")),
      ]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      let arr = [];
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr.push(main);
        }
      });
      setClickedData(arr);
      setRejectClickShow(true);
      setButtomShowCondition(false);
    }
  };

  //Close Reject On Click from Reject Pop Up Box
  const closeRejectClick = (i) => {
    setButtomShowCondition(true);
    if (i == 1) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    setClickedData([]);
    setFinalClickedData([]);
    setError([]);
    setFileSelectError([]);
    setRejectClickShow(false);

    // mainTable.forEach((main) => { main.isChecked = false;});   setAllCheck(false);
    if (mainTable.length == clickedData.length) {
      if (finalAllCheck == true) {
        setAllCheck(true);
      } else {
        setAllCheck(false);
      }
    }
    setFinalAllCheck(true);
  };

  //Cancel On Click Function
  const cancelClick = () => {
    let checktrue = [];
    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      setError([
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox")),
      ]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      let arr = [];
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr.push(main);
          setClickedData(arr);
          setCancelClickShow(true);
          setButtomShowCondition(false);
        }
      });
    }
  };

  //Close On Click Function from Cancel pop up box
  const closeCancelClick = (i) => {
    setButtomShowCondition(true);
    if (i == 1) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    setClickedData([]);
    setFileSelectError([]);
    setCancelRemark("");
    if (mainTable.length == clickedData.length) {
      if (finalAllCheck == true) {
        setAllCheck(true);
      } else {
        setAllCheck(false);
      }
    }
    // mainTable.forEach((main) => { main.isChecked = false; }); setAllCheck(false);
    setCancelClickShow(false);
  };

  //Hire On Click Function
  const hireClick = () => {
    let checktrue = [];
    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      setError([
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox")),
      ]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      let arr = [];
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr.push(main);
          setClickedData(arr);
          setHireClickShow(true);
          setButtomShowCondition(false);
        }
      });
    }
  };

  //Close On Click Function from Hire pop up box
  const closeHireClick = (i) => {
    setButtomShowCondition(true);
    if (i == 1) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    setClickedData([]);
    setFileSelectError([]);
    if (mainTable.length == clickedData.length) {
      if (finalAllCheck == true) {
        setAllCheck(true);
      } else {
        setAllCheck(false);
      }
    }
    // mainTable.forEach((main) => { main.isChecked = false;}); setAllCheck(false);
    setHireClickShow(false);
  };

  //Close On Click Function from Approve pop up box

  //Offer on Click Function
  const offerClick = (app_id, temp_id, app_name) => {
    let flg = false;
    mainTable.forEach((main) => {
      if (main.applicant_id == app_id && main.isChecked == true) {
        flg = true;
      }
    });
    if (flg == false) {
      setSuccess([]);
      setError([t(CommonMessage.JSE001).replace("%s", t("related check box"))]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      // checktrue.forEach((main) => {
      setOfferID(app_id);
      setOfferTemp(temp_id);
      setApplicantsName(app_name);
      setOfferClickShow(true);
      // });
    }
  };

  //Close On Click Function from Offer pop up box
  const closeOfferClick = (i) => {
    if (i == 1) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    setOfferID("");
    setOfferRemark("");
    setOfferTemp("");
    setFileSelectError("");
    setClickedData([]);
    setUploadFileOffer([]);
    setFileNameOffer([]);
    if (mainTable.length == clickedData.length) {
      if (finalAllCheck == true) {
        setAllCheck(true);
      } else {
        setAllCheck(false);
      }
    }
    // mainTable.forEach((main) => {main.isChecked = false; }); setAllCheck(false);
    setOfferClickShow(false);
  };

  //Close On Click Function from Fail pop up box
  const closeFailClick = (i) => {
    setButtomShowCondition(true);
    if (i == 1) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    setClickedData([]);
    setFileSelectError([]);
    if (mainTable.length == clickedData.length) {
      if (finalAllCheck == true) {
        setAllCheck(true);
      } else {
        setAllCheck(false);
      }
    }
    // mainTable.forEach((main) => { main.isChecked = false;});  setAllCheck(false);
    setFailClickShow(false);
  };

  //Approval on Click function
  const approvalClick = async () => {
    let checktrue = [];
    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      setError([
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox")),
      ]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      let arr = [];
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr.push(main);
          setClickedData(arr);
        }
      });
      localStorage.setItem(
        `${customer_name}_CLICKED_DATA`,
        JSON.stringify(arr)
      );
      localStorage.setItem(`${customer_name}_STATE_TMP_INTERVIEW`, stateTmp);
      localStorage.setItem(`${customer_name}_STATUS_TMP_INTERVIEW`, statusTmp);
      localStorage.setItem(`${customer_name}_PID`, poTmp);
      localStorage.setItem(`${customer_name}_JID`, joTmp);
      localStorage.setItem(`${customer_name}_STATUS_ID`, statusTmp);
      localStorage.setItem(`${customer_name}_STATE_ID`, stateTmp);
      localStorage.setItem(`${customer_name}_R_ID`, resumeSelectValue);
      localStorage.setItem(`${customer_name}_PAGE`, currentPage);
      localStorage.setItem(`${customer_name}_TEMPLATE_ID`, resumeSelectValue);
      localStorage.setItem(`${customer_name}_CURRENCY`, currencySelectValue);
      if (searchArrayFinal.length > 0) {
        localStorage.setItem(
          `${customer_name}_SHOW_ARRAY`,
          JSON.stringify(searchArrayFinal)
        );
      } else if (tmpSearchArray.length > 0) {
        localStorage.setItem(
          `${customer_name}_SHOW_ARRAY`,
          JSON.stringify(tmpSearchArray)
        );
      } else {
        localStorage.setItem(
          `${customer_name}_SHOW_ARRAY`,
          JSON.stringify(searchArray)
        );
      }
      history.push(`/${customer_name}/recruit/resume-management/approval-page`);
    }
  };

  //Approve on Click function
  const approveClick = async () => {
    let checktrue = [];
    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      setError([
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox")),
      ]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      let arr = [];
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr.push(main);
          setClickedData(arr);
        }
      });
      setError([]);
      setApproveClickShow(true);
      setButtomShowCondition(false);
    }
  };

  //Interview On Click function
  const interviewClick = () => {
    let checktrue = [];
    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      setError([
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox")),
      ]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      let arr = [];
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr.push(main);
        }
      });
      setClickedData(arr);
      localStorage.setItem(
        `${customer_name}_CLICKED_DATA`,
        JSON.stringify(arr)
      );
      localStorage.setItem(`${customer_name}_STATE_TMP_INTERVIEW`, stateTmp);
      localStorage.setItem(`${customer_name}_STATUS_TMP_INTERVIEW`, statusTmp);
      localStorage.setItem(`${customer_name}_PID`, poTmp);
      localStorage.setItem(`${customer_name}_JID`, joTmp);
      localStorage.setItem(`${customer_name}_STATUS_ID`, statusTmp);
      localStorage.setItem(`${customer_name}_STATE_ID`, stateTmp);
      localStorage.setItem(`${customer_name}_R_ID`, resumeSelectValue);
      localStorage.setItem(`${customer_name}_PAGE`, currentPage);
      localStorage.setItem(`${customer_name}_CURRENCY`, currencySelectValue);
      if (searchArrayFinal.length > 0) {
        localStorage.setItem(
          `${customer_name}_SHOW_ARRAY`,
          JSON.stringify(searchArrayFinal)
        );
      } else if (tmpSearchArray.length > 0) {
        localStorage.setItem(
          `${customer_name}_SHOW_ARRAY`,
          JSON.stringify(tmpSearchArray)
        );
      } else {
        localStorage.setItem(
          `${customer_name}_SHOW_ARRAY`,
          JSON.stringify(searchArray)
        );
      }
      history.push(
        `/${customer_name}/recruit/resume-management/interview-page`
      );
      setButtomShowCondition(false);
    }
  };

  //Skill test on Click funtion
  const skillTestClick = () => {
    let checktrue = [];
    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });

    if (checktrue.length == 0) {
      setSuccess([]);
      setError([
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox")),
      ]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      let arr = [];
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr.push(main);
          setClickedData(arr);
          // setSkillTestClickShow(true);
          setButtomShowCondition(false);
        }
      });
      localStorage.setItem(
        `${customer_name}_CLICKED_DATA`,
        JSON.stringify(arr)
      );
      localStorage.setItem(`${customer_name}_STATE_TMP_INTERVIEW`, stateTmp);
      localStorage.setItem(`${customer_name}_STATUS_TMP_INTERVIEW`, statusTmp);
      localStorage.setItem(`${customer_name}_PID`, poTmp);
      localStorage.setItem(`${customer_name}_JID`, joTmp);
      localStorage.setItem(`${customer_name}_STATUS_ID`, statusTmp);
      localStorage.setItem(`${customer_name}_STATE_ID`, stateTmp);
      localStorage.setItem(`${customer_name}_R_ID`, resumeSelectValue);
      localStorage.setItem(`${customer_name}_PAGE`, currentPage);
      localStorage.setItem(`${customer_name}_CURRENCY`, currencySelectValue);
      localStorage.setItem(
        `${customer_name}_CLICKED_DATA`,
        JSON.stringify(arr)
      );
      if (searchArrayFinal.length > 0) {
        localStorage.setItem(
          `${customer_name}_SHOW_ARRAY`,
          JSON.stringify(searchArrayFinal)
        );
      } else if (tmpSearchArray.length > 0) {
        localStorage.setItem(
          `${customer_name}_SHOW_ARRAY`,
          JSON.stringify(tmpSearchArray)
        );
      } else {
        localStorage.setItem(
          `${customer_name}_SHOW_ARRAY`,
          JSON.stringify(searchArray)
        );
      }
      history.push(
        `/${customer_name}/recruit/resume-management/skill-test-page`
      );
      setButtomShowCondition(false);
    }
  };
  //Fail on Click function
  const failClick = () => {
    let checktrue = [];
    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      setError([
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox")),
      ]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      let arr = [];
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr.push(main);
          setClickedData(arr);
          setFailClickShow(true);
          setButtomShowCondition(false);
        }
      });
    }
  };

  //close approve click function
  const closeApproveClick = (i) => {
    setButtomShowCondition(true);
    if (i == 1) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    setClickedData([]);
    setFileSelectError([]);
    if (mainTable.length == clickedData.length) {
      if (finalAllCheck == true) {
        setAllCheck(true);
      } else {
        setAllCheck(false);
      }
    }
    setApproveClickShow(false);
  };

  //sub check box change function
  let subCheckboxChange = (id) => {
    setError([]);
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
    setAllCheck(flg);
    setMainTable(data);
  };

  //main Check box change function
  let mainCheckboxChange = () => {
    setError([]);
    setAllCheck(!allCheck);
    let data = mainTable.map((data) => {
      data.isChecked = !allCheck;
      return data;
    });
    setMainTable(data);
  };

  // pop up main check box change function
  let finalMainCheckboxChange = () => {
    setError([]);
    setFinalAllCheck(!finalAllCheck);
    let data = clickedData.map((data) => {
      data.isChecked = !finalAllCheck;
      return data;
    });
    setClickedData(data);
  };

  //pop up sub check box change function
  let finalSubCheckboxChange = (id) => {
    setError([]);
    let flg = true;
    let data = clickedData.map((data) => {
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
    setClickedData(data);
  };

  //Score Change function in pass pop up box
  const scoreHandleChange = (id, val) => {
    let res = clickedData.map((data) => {
      if (data.applicant_id == id) {
        data.score = val.target.value;
        return data;
      }
      return data;
    });
    setClickedData(res);
  };

  //file input change method in offer skill test pop up box
  const handleFileInputOffer = (e) => {
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
      if (Math.round(e.target.files[0].size / 1024) > 1000) {
        setFileSelectError(["File must be less than 1 MB."]);
      } else {
        setFileSelectError([]);
        if (file) {
          reader.onloadend = () => {
            tempfile.push(file);
            tempName.push(file.name);

            fileNameOffer.map((fname) => {
              if (fname == file.name) {
                setFileSelectError([t(CommonMessage.JSE022)]);
                tempfile.pop();
                tempName.pop();
              }
            });
            setUploadFileOffer([...uploadFileOffer, tempfile]);
            setFileNameOffer([...fileNameOffer, tempName]);
          };
          reader.readAsDataURL(file);
        }
      }
    } else {
      setFileSelectError([t(CommonMessage.JSE024)]);
    }
  };

  //Delete it on Click in Delete pop up box
  const deleteOK = async () => {
    setClickedData([]);
    setDeleteShow(false);
    let checktrue = [];
    let arr = [];
    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
        arr.push(main);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      setError(["Please select at least one CheckBox"]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setSuccess([]);
      setError([]);
      setLoading(true);
      let deleteData = {
        method: "post",
        package_name: "recruit",
        url: ApiPath.AppliedJobPositionListIndexDeleteOK,
        params: {
          checked: deleteRadioId,
          applicant_id: checktrue,
          login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
          data: arr,
        },
      };
      let response = await ApiRequest(deleteData);
      if (response.flag == false) {
        setError(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        if (allCheck == true) {
          setAllCheck(true);
        } else {
          setAllCheck(false);
        }
      } else {
        if (response.data.status == "OK") {
          setDeleteBtnShow(false);
          setSuccess([response.data.message]);
          let page = currentPage;
          if (mainTable.length - 1 == 0) {
            page = currentPage - 1;
          }
          if (allCheck == true) {
            page = currentPage - 1;
          }
          setError([]);
          setMainTable([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          setTimeout(() => {
            tempSearch(page);
          }, 2000);
          setAllCheck(false);
        } else {
          setError([response.data.message]);
          setSuccess([]);
          setAllCheck(false);

          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
    }
    setLoading(false);
  };

  //Delete on Click function for show delete confirm box
  const deleteCLick = () => {
    let checktrue = [];
    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      setError([
        t(CommonMessage.JSE001).replace("%s", t("at least one checkbox")),
      ]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      let arr = [];
      mainTable.forEach((main) => {
        if (main.isChecked == true) {
          arr.push(main);
          setClickedData(arr);
        }
      });
      setDeleteShow(true);
      setConfirmHeader(
        `<h5 style='color:red'>${t("Delete Confirmation")}</h5>`
      );
      setConfirmContent(`<p>${t("Are you sure want to delete?")}</p>`);
      setDeleteType("delete");
    }
  };

  //Download Click function with API
  const downloadClick = async (id, templatesID) => {
    const downSelId = id;
    setAllCheck(false);
    setSuccess([]);
    setError([]);
    setLoading(true);
    let DownloadData = {
      method: "post",
      package_name: "recruit",
      url: ApiPath.AppliedJobPositionListIndexDownloadClick,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        applicant_id: downSelId,
        template_job_position_id: templatesID,
      },
      type: "blob",
    };
    let response = await ApiRequest(DownloadData);
    if (response.flag == false) {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      let getHeader = response.headers["content-disposition"];
      let tmpName = getHeader.split("filename=")[1];
      let fileName = tmpName.replace(/['"]+/g, "");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setSuccess(["Successfully Downloaded!"]);
      setError([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    setLoading(false);
  };

  //Cancel Final Click Function with API
  const finalCancelClick = async () => {
    let errArray = [];

    if (cancelRemark == "") {
      errArray.push(t(CommonMessage.JSE005).replace("%s", t("remark")));
      setFileSelectError([t(CommonMessage.JSE005).replace("%s", t("remark"))]);
    }

    if (errArray == [] || errArray == "") {
      setLoading(true);
      let pass = {
        method: "post",
        package_name: "recruit",
        url: ApiPath.AppliedJobPositionListIndexPassRejectCancel,
        params: {
          login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
          data: clickedData,
          state_id: stateTmp,
          status: statusTmp,
          new_state_id: newState[2],
          new_status: newStatus[2],
        },
      };
      let response = await ApiRequest(pass);
      if (response.flag == false) {
        setFileSelectError(response.message);
      } else {
        if (response.data.status == "OK") {
          let page = currentPage;
          setFileSelectError([]);
          setSuccess([response.data.message]);
          setTimeout(() => {
            tempSearch(page);
          }, 2000);
          closeCancelClick(1);
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
      errArray = [];
    }
  };

  //Hire Final on Click function with API
  const finalHireClick = async () => {
    setLoading(true);
    let pass = {
      method: "post",
      package_name: "recruit",
      url: ApiPath.AppliedJobPositionListIndexFinalHireClick,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        data: clickedData,
        state_id: stateTmp,
        status: statusTmp,
        new_state_id: newState[0],
        new_status: newStatus[0],
      },
    };
    let response = await ApiRequest(pass);
    if (response.flag == false) {
      setFileSelectError(response.message);
    } else {
      if (response.data.status == "OK") {
        closeHireClick(1);
        setFileSelectError([]);
        setSuccess([response.data.message]);
        let page = currentPage;
        setTimeout(() => {
          tempSearch(page);
        }, 2000);
        closeFailClick(1);
        setMainTable([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setFileSelectError([response.data.message]);
        setSuccess([]);
      }
    }
    setLoading(false);
  };

  //fail Final on Click function with API
  const finalFailClick = async () => {
    setLoading(true);
    let pass = {
      method: "post",
      package_name: "recruit",
      url: ApiPath.AppliedJobPositionListIndexFinalHireClick,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        data: clickedData,
        state_id: stateTmp,
        status: statusTmp,
        new_state_id: newState[1],
        new_status: newStatus[1],
      },
    };
    let response = await ApiRequest(pass);
    if (response.flag == false) {
      setFileSelectError(response.message);
    } else {
      if (response.data.status == "OK") {
        closeFailClick(1);
        setFileSelectError([]);
        setSuccess([response.data.message]);
        let page = currentPage;
        setTimeout(() => {
          tempSearch(page);
        }, 2000);
        setMainTable([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setFileSelectError([response.data.message]);
        setSuccess([]);
      }
    }
    setLoading(false);
  };

  //Final OnClick function with API
  const finalOfferClick = async () => {
    let errArray = [];
    var filtered = uploadFileOffer.filter(function (el) {
      return el != "";
    });

    if (filtered.length > 3) {
      errArray.push(t(CommonMessage.JSE053));
    }
    setFileSelectError([]);

    if (errArray == [] || errArray == "") {
      setLoading(true);
      let a = [];
      let formData = new FormData();
      formData.append(
        "login_id",
        localStorage.getItem(`${customer_name}_LOGIN_ID`)
      );
      formData.append("state_id", stateTmp);
      formData.append("status", statusTmp);
      formData.append("new_state_id", parseInt(newState[0]));
      formData.append("new_status", parseInt(newStatus[0]));
      if (filtered.length == 0) {
        formData.append(`attachment_file`, a);
      } else {
        filtered.forEach((data, i) => {
          formData.append(`attachment_file[${i}]`, data[0]);
        });
      }
      formData.append("applicant_id", offerID);
      formData.append("template_job_position_id", offerTemp);
      formData.append("name", applicantsName);
      let pass = {
        package_name: "recruit",
        method: "post",
        url: ApiPath.AppliedJobPositionListIndexFinalOfferClick,
        params: formData,
      };
      let response = await ApiRequest(pass);
      if (response.flag == false) {
        setFileSelectError(response.message);
      } else {
        if (response.data.status == "OK") {
          let page = currentPage;
          setFileSelectError([]);
          setSuccess([response.data.message]);
          closeOfferClick(1);
          setTimeout(() => {
            tempSearch(page);
          }, 2000);
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
      errArray = [];
    }
  };

  //Detail View Click on Click function
  const viewClick = (
    app_id,
    temp_id,
    applicant_status_info_id,
    JOB_NAME,
    POS_NAME
  ) => {
    localStorage.setItem(`${customer_name}_APP_ID`, app_id);
    localStorage.setItem(`${customer_name}_TEMP_ID`, temp_id);
    localStorage.setItem(`${customer_name}_PID`, poTmp);
    localStorage.setItem(`${customer_name}_JID`, joTmp);
    localStorage.setItem(`${customer_name}_STATUS_ID`, statusTmp);
    localStorage.setItem(`${customer_name}_STATE_ID`, stateTmp);
    localStorage.setItem(`${customer_name}_R_ID`, resumeSelectValue);
    localStorage.setItem(`${customer_name}_INFO_ID`, applicant_status_info_id);
    localStorage.setItem(`${customer_name}_JOB_NAME`, JOB_NAME);
    localStorage.setItem(`${customer_name}_POS_NAME`, POS_NAME);
    localStorage.setItem(`${customer_name}_CURRENCY`, currencySelectValue);
    localStorage.setItem(`${customer_name}_PAGE`, currentPage);

    if (searchArrayFinal.length > 0) {
      localStorage.setItem(
        `${customer_name}_SHOW_ARRAY`,
        JSON.stringify(searchArrayFinal)
      );
    } else if (tmpSearchArray.length > 0) {
      localStorage.setItem(
        `${customer_name}_SHOW_ARRAY`,
        JSON.stringify(tmpSearchArray)
      );
    } else {
      localStorage.setItem(
        `${customer_name}_SHOW_ARRAY`,
        JSON.stringify(searchArray)
      );
    }
    history.push(
      `/${customer_name}/recruit/resume-management/job-applied-list-detail`
    );
  };

  //Pagination select change function
  const selectPaginateOnChange = (e) => {
    setSelectPaginateValue(e.target.value);
  };

  //Active Page Set Function
  const setActivePage = (page) => {
    setSuccess([]);
    setError([]);
    setPageNumber(page);
    // search(page);
    formloadSearch(
      jobCatSelectValue,
      positionNameSelectValue,
      stateTmp,
      resumeSelectValue,
      searchArrayTmp,
      statusTmp,
      page
    );
  };
  //Remark on Change function in Cancel pop up box
  const cancelRemarkChange = (e) => {
    setCancelRemark(validationWhiteSpace(e.target.value));
    let res = clickedData.map((data) => {
      data.remark = e.target.value;
      data.score = "";
      return data;
    });
    setClickedData(res);
  };

  //Remark on Change function in Offer pop up box
  const offerRemarkChange = (e) => {
    setOfferRemark(e.target.value);
  };

  //Applied date select handle change from search
  const selectAppliedDateHandleChange = (val) => {
    let date = "";
    if (val != null) {
      date = moment(val).format("YYYY-MM-DD");
    }
    setAppliedDateSelectedValue(date);
  };

  //Applied date end handle change from search
  const selectAppliedDateHandleChangeEnd = (val) => {
    let date = "";
    if (val != null) {
      date = moment(val).format("YYYY-MM-DD");
    }
    setAppliedDateSelectedValueEnd(date);
  };

  //Remark Change function in interview pop up box
  const remarkHandleChange = (id, val) => {
    let res = clickedData.map((data) => {
      if (data.applicant_id == id) {
        let whiteSpacevali = validationWhiteSpace(val.target.value);
        data.remark = whiteSpacevali;
        return data;
      }
      return data;
    });
    setClickedData(res);
  };

  //final approve click call api
  const finalApproveClick = async () => {
    setLoading(true);
    let pass = {
      method: "post",
      package_name: "recruit",
      url: ApiPath.AppliedJobPositionListIndexFinalHireClick,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        data: clickedData,
        state_id: stateTmp,
        status: statusTmp,
        new_state_id: newState[2],
        new_status: newStatus[2],
      },
    };
    let response = await ApiRequest(pass);
    if (response.flag == false) {
      setError(response.message);
      setSuccess([]);
      closeApproveClick();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        closeApproveClick(1);
        setFileSelectError([]);
        setSuccess([response.data.message]);
        let page = currentPage;
        setTimeout(() => {
          tempSearch(page);
        }, 2000);
        setMainTable([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setFileSelectError([response.data.message]);
        setSuccess([]);
      }
    }
    setLoading(false);
  };

  // clear image function
  const clearImage = (i) => {
    setFileSelectError([]);
    let res1 = uploadFileOffer.filter((data, index) => index != i);
    let res2 = fileNameOffer.filter((data, index) => index != i);
    setUploadFileOffer(res1);
    setFileNameOffer(res2);
  };

  //gender change method
  const genderChange = (e) => {
    setError([]);
    setSuccess([]);
    setSelectGenderValue(e.target.value);
  };

  //salary end change method
  const salaryEndChange = (e) => {
    setError([]);
    setSuccess([]);
    setSalaryEndValue(e.target.value);
  };

  //salary start change method
  const salaryStartChange = (e) => {
    setError([]);
    setSuccess([]);
    setSalaryStartValue(e.target.value);
    if (e.target.value == "") {
      setSalaryEndValue("");
    }
  };

  //experenice start change method
  const expStartChange = (e) => {
    setError([]);
    setSuccess([]);
    setExpStartValue(e.target.value);
    if (e.target.value == "") {
      setExpEndValue("");
    }
  };

  //experenice end change method
  const expEndChange = (e) => {
    setError([]);
    setSuccess([]);
    setExpEndValue(e.target.value);
  };

  //salary check check box change function
  const salaryCheckChange = () => {
    setError([]);
    setSuccess([]);
    setSalaryCheck(!salaryCheck);
  };

  //experience check box change function
  const expCheckChange = () => {
    setError([]);
    setSuccess([]);
    setExpCheck(!expCheck);
  };

  //formload field change
  const threeSixRadioChange = (e) => {
    setThreeSixRadioValue(e.target.value);
  };
  const threeSevenRadioChange = (e) => {
    setThreeSevenRadioValue(e.target.value);
  };
  const threeEightRadioChange = (e) => {
    setThreeEightRadioValue(e.target.value);
  };

  const fourSixTextBoxChange = (e) => {
    setFourSixTextBoxValue(e.target.value);
  };

  const fourSevenTextBoxChange = (e) => {
    setFourSevenTextBoxValue(e.target.value);
  };

  const fourEightTextBoxChange = (e) => {
    setFourEightTextBoxValue(e.target.value);
  };

  const oneSixDataListChange = (e) => {
    setOneSixDataListValue(e.target.value);
  };

  const oneSevenDataListChange = (e) => {
    setOneSevenDataListValue(e.target.value);
  };

  const oneEightDataListChange = (e) => {
    setOneEightDataListValue(e.target.value);
  };

  const twoSixMultiChange = (e) => {
    setTwoSixMultiValue(e.target.value);
    setTwoSixLevelValue("");
  };

  const twoSixLevelChange = (e) => {
    let arr1 = e.target.value.split(",");
    let levelID = arr1[0];
    let catID = arr1.slice(1).join(",");
    setTwoSixLevelCatValue(catID);
    setTwoSixCompValue("");
    setTwoSixLevelValue(levelID);
  };

  const twoSixCompChange = (e) => {
    setTwoSixCompValue(e.target.value);
  };

  const twoSevenMultiChange = (e) => {
    setTwoSevenLevelValue("");
    setTwoSevenMultiValue(e.target.value);
  };

  const twoSevenLevelChange = (e) => {
    setTwoSevenCompValue("");

    let arr2 = e.target.value.split(",");
    let levelID = arr2[0];
    let catID = arr2.slice(1).join(",");
    setTwoSevenLevelCatValue(catID);
    setTwoSevenLevelValue(levelID);
  };

  const twoSevenCompChange = (e) => {
    setTwoSevenCompValue(e.target.value);
  };

  const twoEightMultiChange = (e) => {
    setTwoEightLevelValue("");
    setTwoEightMultiValue(e.target.value);
  };

  const twoEightLevelChange = (e) => {
    setTwoEightCompValue("");
    let arr3 = e.target.value.split(",");
    let levelID = arr3[0];
    let catID = arr3.slice(1).join(",");
    setTwoEightLevelCatValue(catID);
    setTwoEightLevelValue(levelID);
  };

  const twoEightCompChange = (e) => {
    setTwoEightCompValue(e.target.value);
  };

  const currencyChange = (e) => {
    setCurrencySelectValue(e.target.value);
  };

  //clearDeleteBtn

  const clearDelete = () => {
    setDeleteRadioId(0);
  };
  //onBoard API function
  const onBoardClick = async (
    app_id,
    temp_id,
    app_name,
    email,
    image_link,
    dob,
    gender,
    phno,
    applied_date
  ) => {
    let flg = false;
    mainTable.forEach((main) => {
      if (main.applicant_id == app_id && main.isChecked == true) {
        flg = true;
      }
    });
    if (flg == false) {
      setSuccess([]);
      setError([t(CommonMessage.JSE001).replace("%s", t("related check box"))]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      let maleFemale;
      if (gender == "Male") {
        maleFemale = "M";
      } else if (gender == "Female") {
        maleFemale = "F";
      }
      let params = `name=${app_name}&&&&&email=${email}&&&&&appID=${app_id}&&&&&tempID=${temp_id}&&&&&image=${image_link}&&&&&dob=${dob}&&&&&gender=${maleFemale}&&&&&phno=${phno}&&&&&applied_date=${applied_date}&&&&&status=6&&&&&state=8&&&&&login_id=${loginId}`;
      window.location.href = `${process.env.REACT_APP_BAMAWL_DOMAIN}/${customer_name}/authorization?package=erp&page=employee-management/employee-registration&params=${params}`;
    }
  };

  return (
    <>
      <SuccessError success={success} error={error} />
      <CRow>
        <CCol xs="12">
          <CCard
            style={{
              background: "#eff1fe",
              paddingBottom: "30px",
              borderRadius: "1rem",
              overflow: "hidden",
            }}
          >
            <CCardHeader style={{ background: "#eff1fe" }}>
              <CRow>
                <CCol lg="1" style={{ maxWidth: "4%" }}></CCol>
                <CCol lg="11">
                  <h3
                    style={{
                      color: "#373d77",
                      marginTop: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    {" "}
                    {t("Job Applied List")}
                  </h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <AppliedJobPositionForm
                currency={currency}
                loginPermission={loginPermission}
                currencyChange={currencyChange}
                currencySelectValue={currencySelectValue}
                twoSixLevelCatValue={twoSixLevelCatValue}
                twoSevenLevelCatValue={twoSevenLevelCatValue}
                twoEightLevelCatValue={twoEightLevelCatValue}
                threeSevenRadioValue={threeSevenRadioValue}
                threeSevenRadioChange={threeSevenRadioChange}
                threeEightRadioValue={threeEightRadioValue}
                threeEightRadioChange={threeEightRadioChange}
                threeSixRadioValue={threeSixRadioValue}
                fourSixTextBoxChange={fourSixTextBoxChange}
                fourSixTextBoxValue={fourSixTextBoxValue}
                fourSevenTextBoxChange={fourSevenTextBoxChange}
                fourSevenTextBoxValue={fourSevenTextBoxValue}
                fourEightTextBoxChange={fourEightTextBoxChange}
                fourEightTextBoxValue={fourEightTextBoxValue}
                oneSixDataListValue={oneSixDataListValue}
                oneSixDataListChange={oneSixDataListChange}
                oneSevenDataListValue={oneSevenDataListValue}
                oneSevenDataListChange={oneSevenDataListChange}
                oneEightDataListValue={oneEightDataListValue}
                oneEightDataListChange={oneEightDataListChange}
                twoSixMultiChange={twoSixMultiChange}
                twoSixMultiValue={twoSixMultiValue}
                twoSixLevelChange={twoSixLevelChange}
                twoSixLevelValue={twoSixLevelValue}
                twoSixCompChange={twoSixCompChange}
                twoSixCompValue={twoSixCompValue}
                twoSevenMultiChange={twoSevenMultiChange}
                twoSevenMultiValue={twoSevenMultiValue}
                twoSevenLevelChange={twoSevenLevelChange}
                twoSevenLevelValue={twoSevenLevelValue}
                twoSevenCompChange={twoSevenCompChange}
                twoSevenCompValue={twoSevenCompValue}
                twoEightMultiChange={twoEightMultiChange}
                twoEightMultiValue={twoEightMultiValue}
                twoEightLevelChange={twoEightLevelChange}
                twoEightLevelValue={twoEightLevelValue}
                twoEightCompChange={twoEightCompChange}
                twoEightCompValue={twoEightCompValue}
                threeSixRadioChange={threeSixRadioChange}
                fromData={fromData}
                compData={compData}
                expCheck={expCheck}
                expCheckChange={expCheckChange}
                salaryCheck={salaryCheck}
                salaryCheckChange={salaryCheckChange}
                salaryEndValue={salaryEndValue}
                salaryEndChange={salaryEndChange}
                salaryStartChange={salaryStartChange}
                salaryStartValue={salaryStartValue}
                expEndChange={expEndChange}
                expEndValue={expEndValue}
                expStartChange={expStartChange}
                expStartValue={expStartValue}
                selectAppliedDateHandleChangeEnd={
                  selectAppliedDateHandleChangeEnd
                }
                appliedDateSelectedValueEnd={appliedDateSelectedValueEnd}
                resumeData={resumeData}
                resumeSelectChange={resumeSelectChange}
                resumeSelectValue={resumeSelectValue}
                levelSkillDataSelectValue={levelSkillDataSelectValue}
                levelSkillNameSelectValue={levelSkillNameSelectValue}
                compSelectValue={compSelectValue}
                appliedDateSelectedValue={appliedDateSelectedValue}
                selectAppliedDateHandleChange={selectAppliedDateHandleChange}
                statusData={statusData}
                statusSelectChange={statusSelectChange}
                statusSelectValue={statusSelectValue}
                applicantNameHandleChange={applicantNameHandleChange}
                emailHandleChange={emailHandleChange}
                expSalaryHandleChange={expSalaryHandleChange}
                applicantName={applicantName}
                email={email}
                expSalary={expSalary}
                stateSelectChange={stateSelectChange}
                positionNameSelectChange={positionNameSelectChange}
                jobCatSelectChange={jobCatSelectChange}
                stateSelectValue={stateSelectValue}
                positionNameSelectValue={positionNameSelectValue}
                jobCatSelectValue={jobCatSelectValue}
                stateData={stateData}
                positionNameData={positionNameData}
                jobCatData={jobCatData}
                searchClick={searchClick}
                genderData={genderData}
                genderChange={genderChange}
                selectGenderValue={selectGenderValue}
              />
            </CCardBody>
          </CCard>
          {mainTable.length > 0 && (
            <CCard style={{ borderRadius: "1rem" }}>
              <CCardBody>
                <AppliedJobPositionTable
                  clickDeleteRadio={clickDeleteRadio}
                  deleteRadioId={deleteRadioId}
                  deleteRadio={deleteRadio}
                  loginPermission={loginPermission}
                  onBoardClick={onBoardClick}
                  onBoardStatus={onBoardStatus}
                  checkApprover={checkApprover}
                  shortListClick={shortListClick}
                  buttomShowCondition={buttomShowCondition}
                  downloadClick={downloadClick}
                  offerStaus={offerStaus}
                  mainTable={mainTable}
                  deleteBtnShow={deleteBtnShow}
                  stateTmp={stateTmp}
                  statusTmp={statusTmp}
                  passClick={passClick}
                  subCheckboxChange={subCheckboxChange}
                  mainCheckboxChange={mainCheckboxChange}
                  allCheck={allCheck}
                  rejectClick={rejectClick}
                  cancelClick={cancelClick}
                  hireClick={hireClick}
                  offerClick={offerClick}
                  approveClick={approveClick}
                  rolePermission={rolePermission}
                  approvalClick={approvalClick}
                  interviewClick={interviewClick}
                  skillTestClick={skillTestClick}
                  failClick={failClick}
                  deleteCLick={deleteCLick}
                  viewClick={viewClick}
                  indexNumber={indexNumber}
                  total={total}
                  currentPage={currentPage}
                  lastPage={lastPage}
                  setActivePage={setActivePage}
                  paginateArr={paginateArr}
                  selectPaginateOnChange={selectPaginateOnChange}
                  selectPaginateValue={selectPaginateValue}
                  pageStart={pageStart}
                  pageEnd={pageEnd}
                />
              </CCardBody>
            </CCard>
          )}
          <PassClickModel
            show={passClickShow}
            closeBtn={closePassClick}
            mainTable={clickedData}
            remarkHandleChange={remarkHandleChange}
            scoreHandleChange={scoreHandleChange}
            detailStatus={detailStatus}
            finalSubCheckboxChange={finalSubCheckboxChange}
            finalMainCheckboxChange={finalMainCheckboxChange}
            finalAllCheck={finalAllCheck}
            finalPassClick={finalPassClick}
            fileSelectError={fileSelectError}
          />

          <ShortListedClickModel
            show={shortListShow}
            closeBtn={closeShortList}
            mainTable={clickedData}
            remarkHandleChange={remarkHandleChange}
            detailStatus={detailStatus}
            finalSubCheckboxChange={finalSubCheckboxChange}
            finalMainCheckboxChange={finalMainCheckboxChange}
            finalAllCheck={finalAllCheck}
            finalShortListedClick={finalShortListedClick}
            fileSelectError={fileSelectError}
          />

          <RejectClickModel
            show={rejectClickShow}
            closeBtn={closeRejectClick}
            mainTable={clickedData}
            remarkHandleChange={remarkHandleChange}
            scoreHandleChange={scoreHandleChange}
            detailStatus={detailStatus}
            finalSubCheckboxChange={finalSubCheckboxChange}
            finalMainCheckboxChange={finalMainCheckboxChange}
            finalAllCheck={finalAllCheck}
            finalRejectClick={finalRejectClick}
            fileSelectError={fileSelectError}
          />
          <CancelClickModel
            show={cancelClickShow}
            closeBtn={closeCancelClick}
            finalCancelClick={finalCancelClick}
            cancelRemark={cancelRemark}
            cancelRemarkChange={cancelRemarkChange}
            fileSelectError={fileSelectError}
          />
          <HireClickModel
            show={hireClickShow}
            closeBtn={closeHireClick}
            finalHireClick={finalHireClick}
            fileSelectError={fileSelectError}
          />
          <OfferClickModel
            show={offerClickShow}
            clearImage={clearImage}
            finalOfferClick={finalOfferClick}
            closeBtn={closeOfferClick}
            fileSelectError={fileSelectError}
            fileNameOffer={fileNameOffer}
            offerRemarkChange={offerRemarkChange}
            offerRemark={offerRemark}
            uploadFileOffer={uploadFileOffer}
            handleFileInputOffer={handleFileInputOffer}
          />
        </CCol>
        <FailClickModel
          show={failClickShow}
          closeBtn={closeFailClick}
          finalFailClick={finalFailClick}
          fileSelectError={fileSelectError}
        />
        <ApproveClickModel
          show={approveClickShow}
          closeBtn={closeApproveClick}
          finalApproveClick={finalApproveClick}
        />
        <ResumeConfirmMessage
          show={deleteShow}
          type={deleteType}
          header={confirmHeader}
          content={confirmContent}
          cancel={() => setDeleteShow(false)}
          deleteOK={deleteOK}
          okButton={t("Yes")}
          cancelButton={t("Cancel")}
        />
        <Loading start={loading} />
      </CRow>
    </>
  );
};
export default AppliedJobPositionListIndex;
