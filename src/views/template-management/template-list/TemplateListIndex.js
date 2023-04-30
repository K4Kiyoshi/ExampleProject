import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TemplateListForm from "./TemplateListForm";
import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";
import TemplateThree from "./TemplateThree";
import EventEmitter from "../../utils/EventEmitter";
import { ApiRequest } from "../../common/ApiRequest";
import ResumeConfirmMessage from "../../common/ResumeConfirmMessage";
import Loading from "../../common/Loading";
import JobModal from "./JobModal";
import Moment from "moment";
import CommonMessage from "../../common/CommonMessage";
import CopyModal from "./CopyModal";
import { validationWhiteSpace, nullChk } from "../../common/CommonValidation";
import { useTranslation } from "react-i18next";
import ApiPath from "../../common/ApiPath";
import PermissionCheck from "../../common/permission-check/PermissionCheck";
import { specificPermission } from "../../common/specific-permission/SpecificPermission";

const TemplateListIndex = () => {
  let customer_name = window.location.href.split("/")[3];
  const { t } = useTranslation();
  const history = useHistory(); // route Change state
  const [success, setSuccess] = useState([]); // templatelist page success message
  const [error, setError] = useState([]); // templatelist page error message
  const [searchData, setSearchData] = useState(""); // value from search box
  const [mainTable, setMainTable] = useState([]); // main table data for templateList table
  const [viewData, setViewData] = useState([]); // view data for view button
  const [filterViewDataTwo, setFilterViewDataTwo] = useState([]);//for show data such as skill and url link
  const [deleteId, setDeleteId] = useState(""); // delete Id for template list table
  const [templateOneShow, setTemplateOneShow] = useState(false); // templateOne detail modal show
  const [templateTwoShow, setTemplateTwoShow] = useState(false); // templateOne detail modal show
  const [templateThreeShow, setTemplateThreeShow] = useState(false); // templateOne detail modal show
  const [totalRows, setTotalRows] = useState(""); // total rows
  const [currentPage, setCurrentPage] = useState(); // current page for pagination
  const [lastPage, setLastPage] = useState(); // last page for pagination
  const [filterArray, setFilterArray] = useState([]); // array except from "Email,Phone,Address"
  const [loading, setLoading] = useState(false); // Loading condition
  const [confirmShow, setConfirmShow] = useState(false); // confirmation box show
  const [confirmType, setConfirmType] = useState(""); // confirmation box type
  const [confirmHeader, setConfirmHeader] = useState(""); // confirmation box header text
  const [confirmContent, setConfirmContent] = useState(""); // confirmation box content text
  const [clickCopyLink, setClickCopyLink] = useState(""); // for copyLink status
  const [copied, setCopied] = useState(""); // for copied data status
  const [activeFlag, setActiveFlag] = useState(""); // activeFlag status
  const [indexNumber, setIndexNumber] = useState("0"); // auto increase index for table
  const [loginId, setLoginId] = useState(localStorage.getItem(`${customer_name}_LOGIN_ID`))
  const [contentOK, setContentOk] = useState(""); //for ok button of comfirm box
  const [activeId, setActiveId] = useState();//for active id (to inactive)
  const [activateFlag, setActivateFlag] = useState();//for active flag (to inactive)
  const [inactiveId, setInactiveId] = useState();//for inactive id (to active)
  const [inactivateFlag, setInactivateFlag] = useState();//for inactive flag (to active)
  const [selectCategoryValue, setSelectCategoryValue] = useState(""); //for get value of selected job category
  const [selectCategoryCopyValue, setSelectCategoryCopyValue] = useState(""); //for get value of selected job category
  const [selectJobCategory, setSelectJobCategory] = useState([]);
  const [selectPositionValue, setSelectPositionValue] = useState(""); //for get value of selected position
  const [selectPositionCopyValue, setSelectPositionCopyValue] = useState(""); //for get value of selected position
  const [selectPosition, setSelectPosition] = useState([]);//for get position array formload
  const [selectPositionChange, setSelectPositionChange] = useState([]);//for get position array on change of job
  const [changeStatus, setChangeStatus] = useState(false);//for job category change status
  const [selectedStartDate, setSelectedStartDate] = useState();//for job start date
  const [selectedEndDate, setSelectedEndDate] = useState();//for job end date 
  const [jobPosID, setJobPosId] = useState();//for job_position_id
  const [selectModalOpenDate, setSelectModalOpenDate] = useState();//for job start date
  const [selectModalEndDate, setSelectModalEndDate] = useState();//for job end date
  const [showOpenJobModal, setShowOpenJobModal] = useState(false); //for show template choose modal
  const [showCopyModal, setShowCopyModal] = useState(false); //for show template choose modal
  const [paginateArr, setPaginateArr] = useState([]); //for paginate array
  const [selectPaginateValue, setSelectPaginateValue] = useState(10); //for get selected role
  const [positionName, setPositionName] = useState("");//for position name
  const [categoryName, setCategoryName] = useState("");//for category name
  const [pageStart, setPageStart] = useState(); //for get start page
  const [pageEnd, setPageEnd] = useState(); //for get end page
  const [templateId, setTemplateId] = useState();//for get template id
  const [jobErr, setJobErr] = useState([]);//for job open error
  const [copyErr, setCopyErr] = useState([]);//for copy error array
  const [title, setTitle] = useState(""); //for template title
  const [copyTemplateId, setCopyTemplateId] = useState("");//for copy template id
  const [loginPermission, setLoginPermission] = useState([]);//for store login permission
  let temp = []; // temp array for filterArray
  let errArry = [];
  let tempIndexNumber = ""; // temporaray index for table index


  useEffect(() => {
    document.body.style.overflow = "auto";
    (async () => {
      setLoading(true);
      await PermissionCheck();
      let loginData = {
        login_id: loginId,
      }
      let permit = await specificPermission("Template List", loginData);
      Promise.all([permit]).then((values) => {
        permit = values[0];
        setLoginPermission(permit);
      });

      await systemFormLoad();
      await allJobFormLoad();
      await allPositionFormLoad();
      setLoading(false);
    })();
    if (selectPaginateValue != undefined && mainTable.length > 0) {
      searchClick();
    }

    // get input change data immediately from header search box onchange function
    const onDirect = (eventData) => {
      setSearchData(eventData.searchData == "" ? "" : eventData.searchData);
    }

    // get API data from header component's search box
    const onNewLog = (eventData) => {
      setIndexNumber(eventData.tempIndex == "" ? "0" : eventData.tempIndex)
      setSearchData(eventData.searchData == "" ? "" : eventData.searchData);
      setCopied(eventData.copied == "" ? "" : eventData);
      setError(eventData.error == [] ? [] : eventData.error);
      setSuccess(eventData.success == [] ? [] : eventData.success);
      setMainTable(eventData.mainTableData ? eventData.mainTableData : []);
      setTotalRows(eventData.totalRow == "" ? "" : eventData.totalRow);
      setCurrentPage(
        eventData.current_page == "" ? "" : eventData.current_page
      );
      setLastPage(eventData.last_page == "" ? "" : eventData.last_page);
    };
    const listener = EventEmitter.addListener("NewLog", onNewLog);
    const listener1 = EventEmitter.addListener("direct", onDirect);
    return () => {
      listener.remove();
      listener1.remove();
    };
  }, [selectPaginateValue]);

  //Key Handler for search box
  const keyHandler = (e) => {
    if (e.key == "Enter") {
      searchClick();
    }
  };

  //  formload function
  const systemFormLoad = async () => {
    let obj = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.TemplateListList,
      params: {
        login_id: loginId,
      },
    };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        tempIndexNumber =
          (response.data.data.current_page - 1) * selectPaginateValue;
        setIndexNumber(tempIndexNumber);
        setError([]);
        setMainTable(response.data.data.data);
        setTotalRows(response.data.data.total);
        let temp_total = Math.floor(response.data.data.total / 10);
        if (temp_total >= 5) {
          setPaginateArr([10, 20, 30, 40, 50]);
        }else if (temp_total == 4) {
          setPaginateArr([10, 20, 30, 40]);
        } else if (temp_total == 3) {
          setPaginateArr([10, 20, 30]);
        } else if (temp_total == 2) {
          setPaginateArr([10, 20]);
        } else if (temp_total == 1) {
          setPaginateArr([10]);
        }
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setPageStart(response.data.data.from);
        setPageEnd(response.data.data.to);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
  };

  /**
   * category formload from API
   * @author yaminzaw
   * @create 06/10/2022
   */
  let allJobFormLoad = async () => {
    setError([]);
    let job_form_load = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.JobCategoryAll,
      params: {
        login_id: loginId,
      },
    };
    let response = await ApiRequest(job_form_load);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        setSelectJobCategory(response.data.data);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
  };

  /**
   * onChange function of select box(select type)
   * @author yaminzaw
   * @create 27/09/2022
   * @param e
   */
  const selectCategoryOnChange = (e) => {
    setError([]);
    setSelectCategoryValue(e.target.value);
    if (e.target.value == "" || e.target.value == null) {
      allPositionFormLoad();
    } else {
      jobChangePositionShow(e.target.value);
    }
  };

  /**
   * onChange function of select box(select type) for copy modal
   * @author yaminzaw
   */
  const selectCategoryCopyOnChange = (e) => {
    setError([]);
    setSelectCategoryCopyValue(e.target.value);
    if (e.target.value == "" || e.target.value == null) {
      allPositionFormLoad();
    } else {
      jobChangePositionShow(e.target.value);
    }
  };

  /**
   * category formload from API
   * @author yaminzaw
   * @create 06/10/2022
   */
  let allPositionFormLoad = async () => {
    setError([]);
    setLoading(true);
    let job_form_load = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.PositionAll,
      params: {
        login_id: loginId,
      },
    };
    let response = await ApiRequest(job_form_load);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        setSelectPosition(response.data.data);
        setChangeStatus(false);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
    setLoading(false);
  };

  /**
   * position formload from API
   * @author yaminzaw
   * @create 06/10/2022
   */
  let jobChangePositionShow = async (id) => {
    setError([]);
    setLoading(true);
    let pos_form_load = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.AppliedJobPositionListIndexGetPosition,
      params: {
        login_id: loginId,
        job_category_id: id,
      },
    };
    let response = await ApiRequest(pos_form_load);
    if (response.flag === false) {
      setSuccess([]);
      setSelectPositionChange([]);
      setChangeStatus(true);
    } else {
      if (response.data.status === "OK") {
        setSelectPositionChange(response.data.data);
        setChangeStatus(true);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
    setLoading(false);
  };


  /**
   * onChange function of select box(select type)
   * @author yaminzaw
   * @create 28/09/2022
   */
  const selectPositionOnChange = (e) => {
    setError([]);
    setSelectPositionValue(e.target.value);
  };

  /**
   * onChange function of select box(select type)
   * @author yaminzaw
   */
  const selectPositionCopyOnChange = (e) => {
    setError([]);
    setSelectPositionCopyValue(e.target.value);
  };

  // scrollTop function
  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  // setActivePage pagination onClick
  const setActivePage = (page) => {
    setSuccess([]);
    setError([]);
    searchClick(page);
  };

  // confirmation box for delete btn from TemplateList
  const deleteClick = (id) => {
    setDeleteId(id);
    setConfirmShow(true);
    setConfirmHeader(`<h5 style='color:red'>${t('Delete Confirmation')}</h5>`);
    setConfirmContent(
      `<p>${t('Are you sure want to delete?')}</p>`
    );
    setConfirmType("delete");
    setContentOk(t("Delete"));
  };

  // deleteOK function( delete data from db )
  const deleteOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    let obj = {
      package_name: "recruit",
      method: "delete",
      url: ApiPath.TemplateListDelete,
      params: {
        template_job_position_id: deleteId,
        login_id: loginId,
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      scrollTop();
    } else {
      if (response.data.status === "OK") {
        let page = currentPage;
        setSuccess([response.data.message]);
        if (mainTable.length - 1 == 0) {
          page = currentPage - 1;
        }
        tempSearch(page);
        setError([]);
        scrollTop();
      } else {
        setError([response.data.message]);
        setSuccess([]);
        scrollTop();
      }
    }
  };

  // view detail data
  const viewClick = async (id) => {
    setError([]);
    setSuccess([]);
    setLoading(true);
    let obj = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.TemplateListDetail + id,
      params: {
        login_id: loginId,
        edit_status: false
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      scrollTop();
    } else {
      if (response.data.status === "OK") {
        setViewData(response.data.data.template_element_labels);
        setCategoryName(response.data.data.category_name);
        setPositionName(response.data.data.position_name)
        if (response.data.data.template_element_labels.length > 0) {
          temp = response.data.data.template_element_labels.filter((para) => {
            return (
              para.essential_field_id == null
            );
          });
          setFilterArray(temp);
        }

        let filterTwo = response.data.data.template_element_labels.filter((para) => {
          return (
            para.essential_field_id != null
          );
        });
        setFilterViewDataTwo(filterTwo);

        if (response.data.data.layout_id == 1) {
          setTemplateOneShow(true);
        }
        else if (response.data.data.layout_id == 2) {
          setTemplateTwoShow(true);
        }
        else if (response.data.data.layout_id == 3) {
          setTemplateThreeShow(true);
        }
      } else {
        setSuccess([]);
        setError([response.data.message]);
        scrollTop();
      }
    }
  };


  /**
  * get template title from input field
  * @author yaminzaw
  * @create 23/12/2022
  * @param e
  */
  const handleChangeTitle = (e) => {
    setTitle(validationWhiteSpace(e.target.value));
  };

  /**
   * active click function
   * @author yaminzaw
   * @create 09/09/2022
   */
  const activeClick = (id, flag) => {
    setActiveId(id);
    setActivateFlag(flag);
    setConfirmShow(true);
    setConfirmHeader(`<h5 style='color:#4e57aa'>${t('Inactivate Confirmation')}</h5>`);
    setConfirmContent(
      `<p>${t('Are you sure want to inactivate this template?')}</p>`
    );
    setConfirmType("save");
    setContentOk(t("OK"));
  };

  // Active Click
  const activeOK = async () => {
    setConfirmShow(false);
    setSuccess([]);
    setError([]);
    setLoading(true);
    let obj = {
      package_name: "recruit",
      method: "put",
      url: ApiPath.TemplateListActiveInactive,
      params: {
        template_job_position_id: activeId,
        active_flag: activateFlag == 1 ? 0 : 1,
        login_id: loginId,
      },
    };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      scrollTop();
    } else {
      if (response.data.status === "OK") {
        searchClick(currentPage);
      } else {
        setSuccess([]);
        setError([response.data.message]);
        scrollTop();
      }
    }
    setLoading(false);
  };

  /**
   * active click function
   * @author yaminzaw
   * @create 09/09/2022
   */
  const inActiveClick = (id, flag) => {
    setInactiveId(id);
    setInactivateFlag(flag);
    setConfirmShow(true);
    setConfirmHeader(`<h5 style='color:#4e57aa'>${t('Activate Confirmation')}</h5>`);
    setConfirmContent(
      `<p>${t('Are you sure want to activate this template?')}</p>`
    );
    setConfirmType("save-data");
    setContentOk(t("OK"));
  };

  // In Active Click
  const inActiveOk = async () => {
    setConfirmShow(false);
    setSuccess([]);
    setError([]);
    setLoading(true);
    let obj = {
      package_name: "recruit",
      method: "put",
      url: ApiPath.TemplateListActiveInactive,
      params: {
        template_job_position_id: inactiveId,
        active_flag: inactivateFlag == 1 ? 0 : 1,
        login_id: loginId,
      },
    };

    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      scrollTop();
    } else {
      if (response.data.status === "OK") {
        searchClick(currentPage);
      } else {
        setSuccess([]);
        setError([response.data.message]);
        scrollTop();
      }
    }
    setLoading(false);
  };

  // active inactive change
  const activeChange = async (e) => {
    EventEmitter.emit("active", {flagId: e.target.value});
    setActiveFlag(e.target.value);
  };

  //cancel Click modal box
  const cancelClick = () => {
    setTemplateOneShow(false);
    setTemplateTwoShow(false);
    setTemplateThreeShow(false);
  };

  // edit click
  const editClick = async (id) => {
    let obj = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.TemplateListEdit + id,
      params: {
        login_id: loginId,
        edit_status: true
      },
    };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      scrollTop();
    } else {
      if (response.data.status === "OK") {
        localStorage.setItem(`${customer_name}_TEMPLATE_EDIT_DATA`, JSON.stringify(response.data.data));
        history.push(`/${customer_name}/recruit/template-management/template-create`);
      } else {
        setSuccess([]);
        setError([response.data.message]);
        scrollTop();
      }
    }
  };

  //copyLink onChange
  const copyLinkClick = async (id, link) => {
    navigator.clipboard.writeText(window.location.host + process.env.PUBLIC_URL + link);
    setClickCopyLink(id);
    setTimeout(() => {
      setClickCopyLink("");
      setCopied(id);
      setTimeout(() => {
        setCopied("");
      }, 2000);
    }, 1000);
  };

  // input value from search box
  const inputChange = (e) => {
    setSearchData(e.target.value);
  };

  // templateList Search
  const searchClick = async (page = 1) => {
    let selectedOpen;
    let selectedEnd;
    if (selectedStartDate != undefined) {
      selectedOpen = Moment(selectedStartDate).format("YYYY-MM-DD")
    } else if (selectedStartDate == undefined) {
      selectedOpen = "";
    }
    if (selectedEndDate != undefined) {
      selectedEnd = Moment(selectedEndDate).format("YYYY-MM-DD")
    } else if (selectedEndDate == undefined) {
      selectedEnd = "";
    }

    setSuccess([]);
    setError([]);
    setLoading(true);
    let obj = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.TemplateListSearch + `?page=${page}`,
      params: {
        login_id: loginId,
        resume_title: searchData,
        job_category_id: selectCategoryValue,
        position_id: selectPositionValue,
        job_open_date: selectedOpen,
        job_close_date: selectedEnd,
        active_flag: activeFlag,
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      setMainTable([]);
    } else {
      if (response.data.status === "OK") {
        tempIndexNumber =
          (response.data.data.current_page - 1) * selectPaginateValue;
        setIndexNumber(tempIndexNumber);
        setCopied("");
        setError([]);
        setMainTable(response.data.data.data);
        setTotalRows(response.data.data.total);
        let temp_total = Math.floor(response.data.data.total / 10);
        if (temp_total >= 5) {
          setPaginateArr([10, 20, 30, 40, 50]);
        }else if (temp_total == 4) {
          setPaginateArr([10, 20, 30, 40]);
        } else if (temp_total == 3) {
          setPaginateArr([10, 20, 30]);
        } else if (temp_total == 2) {
          setPaginateArr([10, 20]);
        } else if (temp_total == 1) {
          setPaginateArr([10]);
        }
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setPageStart(response.data.data.from);
        setPageEnd(response.data.data.to);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
  };

  // templateList Search (tempory search for success message not show)
  const tempSearch = async (page = 1) => {
    let selectedOpen;
    let selectedEnd;
    if (selectedStartDate != undefined) {
      selectedOpen = Moment(selectedStartDate).format("YYYY-MM-DD")
    } else if (selectedStartDate == undefined) {
      selectedOpen = "";
    }
    if (selectedEndDate != undefined) {
      selectedEnd = Moment(selectedEndDate).format("YYYY-MM-DD")
    } else if (selectedEndDate == undefined) {
      selectedEnd = "";
    }
    setLoading(true);
    let obj = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.TemplateListSearch + `?page=${page}`,
      params: {
        login_id: loginId,
        resume_title: searchData,
        job_category_id: selectCategoryValue,
        position_id: selectPositionValue,
        job_open_date: selectedOpen,
        job_close_date: selectedEnd,
        active_flag: activeFlag,
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setMainTable([]);
    } else {
      if (response.data.status === "OK") {
        tempIndexNumber =
          (response.data.data.current_page - 1) * selectPaginateValue;
        setIndexNumber(tempIndexNumber);
        setMainTable(response.data.data.data);
        setTotalRows(response.data.data.total);
        let temp_total = Math.floor(response.data.data.total / 10);
        if (temp_total >= 5) {
          setPaginateArr([10, 20, 30, 40, 50]);
        }else if (temp_total == 4) {
          setPaginateArr([10, 20, 30, 40]);
        } else if (temp_total == 3) {
          setPaginateArr([10, 20, 30]);
        } else if (temp_total == 2) {
          setPaginateArr([10, 20]);
        } else if (temp_total == 1) {
          setPaginateArr([10]);
        }
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
      } else {
        setMainTable([]);
      }
    }
  };


  /**
  * save job open modal open click
  * @author yaminzaw
  */
  const jobOpenClick = (id, open, close, job_pos_id) => {
    setShowOpenJobModal(true);
    setJobErr([]);
    setTemplateId(id);
    setJobPosId(job_pos_id);
    if (open != null && close != null) {
      setSelectModalOpenDate(open);
      setSelectModalEndDate(close)
    }
    else if (open == null && close == null) {
      setSelectModalOpenDate("");
      setSelectModalEndDate("")
    }
  }

  /**
  * save job open date
  * @author yaminzaw
  */
  const saveDate = async (openDate, closeDate) => {
    let temp_job_err = [];
    if (openDate == "" || openDate == null) {
      temp_job_err.push(t(CommonMessage.JSE001).replace("%s", t("open date")))
    }
    if (closeDate == "" || closeDate == null) {
      temp_job_err.push(t(CommonMessage.JSE001).replace("%s", t("end date")))
    }
    if (temp_job_err.length > 0) {
      setJobErr(temp_job_err);
    }
    else {
      setShowOpenJobModal(false);
      setLoading(true);
      let obj = {
        package_name: "recruit",
        method: "get",
        url: ApiPath.TemplateListJobOpen + templateId,
        params: {
          login_id: loginId,
          job_open_date: Moment(openDate).format("YYYY-MM-DD"),
          job_close_date: Moment(closeDate).format("YYYY-MM-DD"),
          job_position_id: jobPosID
        },
      };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message);
        setMainTable([]);
      } else {
        if (response.data.status === "OK") {
          searchClick();
        } else {
          setError([response.data.message]);
        }
      }
    }


  }
  /**
  * onChange function of select box(pagination)
  * @author yaminzaw
  * @create 12/10/2022
  * @param e
  */
  const selectPaginateOnChange = (e) => {
    setSelectPaginateValue(e.target.value);
  };

  /**
  * template copy click
  * @author yaminzaw
  * @create 23/12/2022
  */
  const copyClick = (id) => {
    setSuccess([]);
    setError([]);
    setSelectPositionCopyValue("");
    setSelectCategoryCopyValue("");
    setCopyTemplateId(id);
    setShowCopyModal(true);
    setTitle("");
    setSelectJobCategory([]);
    setSelectPosition([]);
    setSelectCategoryValue("");
    setSelectPositionChange([]);
    setSelectPositionValue("");
    allJobFormLoad();
    setSearchData("");
    setError([]);
  }

  /**
  * cancel click of template copy modal
  * @author yaminzaw
  */
  const cancelCopyModal = () => {
    setShowCopyModal(false);
    setTitle("");
    setSelectCategoryValue("");
    setSelectPosition([]);
    setSelectPositionChange([]);
    setSelectPositionValue("");
    setError([]);
  }

  /**
  * copy template api call
  * @author yaminzaw
  */
  const copyTemplate = async () => {
    if (!nullChk(title)) {
      errArry.push(t(CommonMessage.JSE005).replace("%s", t("Resume Title")));
    }
    if (!nullChk(selectCategoryCopyValue)) {
      errArry.push(t(CommonMessage.JSE001).replace("%s", t("Job Category")));
    }
    if (!nullChk(selectPositionCopyValue)) {
      errArry.push(t(CommonMessage.JSE001).replace("%s", t("Position")));
    }
    if (errArry.length > 0) {
      setCopyErr(errArry)
    }
    else {
      setShowCopyModal(false);
      setLoading(true);
      let obj = {
        package_name: "recruit",
        method: "get",
        url: ApiPath.TemplateListCopy + copyTemplateId,
        params: {
          login_id: loginId,
          resume_title: title,
          job_position_id: selectPositionCopyValue,
          template_job_position_id: copyTemplateId
        },
      };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message);
        setMainTable([]);
      } else {
        if (response.data.status === "OK") {
          setSuccess([response.data.message]);
          tempSearch();
        } else {
          setError([response.data.message]);
        }
      }
    }
  }

  return (
    <>
      <Loading start={loading} />
      <TemplateOne
        show={templateOneShow}
        cancel={cancelClick}
        viewData={viewData}
        filterArray={filterArray}
        categoryName={categoryName}
        positionName={positionName}
      />
      <TemplateTwo
        show={templateTwoShow}
        cancel={cancelClick}
        viewData={viewData}
        filterArray={filterArray}
        filterViewDataTwo={filterViewDataTwo}
        categoryName={categoryName}
        positionName={positionName}
      />
      <TemplateThree
        show={templateThreeShow}
        cancel={cancelClick}
        viewData={viewData}
        filterArray={filterArray}
        categoryName={categoryName}
        positionName={positionName}
      />
      <ResumeConfirmMessage
        show={confirmShow}
        type={confirmType}
        header={confirmHeader}
        content={confirmContent}
        cancel={() => setConfirmShow(false)}
        deleteOK={deleteOK}
        okButton={contentOK}
        cancelButton={t("Cancel")}
        saveOK={activeOK}
        saveConfirmData={inActiveOk}
      />
      <TemplateListForm
        loginPermission={loginPermission}
        mainTable={mainTable}
        totalRows={totalRows}
        currentPage={currentPage}
        lastPage={lastPage}
        setActivePage={setActivePage}
        deleteClick={deleteClick}
        viewClick={viewClick}
        editClick={editClick}
        activeClick={activeClick}
        inActiveClick={inActiveClick}
        copyLinkClick={copyLinkClick}
        searchClick={()=>searchClick()}
        indexNumber={indexNumber}
        keyHandler={keyHandler}
        inputChange={inputChange}
        error={error}
        success={success}
        clickCopyLink={clickCopyLink}
        copied={copied}
        activeChange={activeChange}
        selectJobCategory={selectJobCategory}
        selectCategoryOnChange={selectCategoryOnChange}
        selectCategoryValue={selectCategoryValue}
        selectPosition={selectPosition}
        selectPositionOnChange={selectPositionOnChange}
        selectPositionValue={selectPositionValue}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        setSelectedStartDate={setSelectedStartDate}
        setSelectedEndDate={setSelectedEndDate}
        jobOpenClick={jobOpenClick}
        paginateArr={paginateArr}
        selectPaginateOnChange={selectPaginateOnChange}
        selectPaginateValue={selectPaginateValue}
        pageStart={pageStart}
        pageEnd={pageEnd}
        changeStatus={changeStatus}
        selectPositionChange={selectPositionChange}
        copyClick={copyClick}
        searchData={searchData}
      />
      <JobModal
        show={showOpenJobModal}
        cancel={() => setShowOpenJobModal(false)}
        selectModalEndDate={selectModalEndDate}
        selectModalOpenDate={selectModalOpenDate}
        setSelectModalEndDate={setSelectModalEndDate}
        setSelectModalOpenDate={setSelectModalOpenDate}
        saveDate={saveDate}
        error={jobErr}
      />
      <CopyModal
        show={showCopyModal}
        cancel={cancelCopyModal}
        handleChangeTitle={handleChangeTitle}
        title={title}
        selectJobCategory={selectJobCategory}
        selectCategoryCopyOnChange={selectCategoryCopyOnChange}
        selectCategoryCopyValue={selectCategoryCopyValue}
        selectPositionChange={selectPositionChange}
        selectPositionCopyOnChange={selectPositionCopyOnChange}
        selectPositionCopyValue={selectPositionCopyValue}
        copyTemplate={copyTemplate}
        error={copyErr}
      />
    </>
  );
};

export default TemplateListIndex;
