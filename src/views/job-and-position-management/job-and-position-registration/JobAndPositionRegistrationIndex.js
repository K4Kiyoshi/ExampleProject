/**  Job and Position Registration Index
 * @author yamin zaw
 */
import React from "react";
import { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import JobAndPosForm from "./JobAndPosForm";
import { checkNullOrBlank } from "../../common/CommonValidation";
import JobAndPosTable from "./JobAndPosTable";
import Loading from "../../common/Loading";
import CommonMessage from "../../common/CommonMessage";
import { ApiRequest } from "../../common/ApiRequest";
import ResumeConfirmMessage from "../../common/ResumeConfirmMessage";
import { withTranslation } from "react-i18next";
import PermissionCheck from "../../common/permission-check/PermissionCheck";
import { specificPermission } from "../../common/specific-permission/SpecificPermission";
import SuccessError from "../../common/SuccessError";
import ApiPath from "../../common/ApiPath";

function LegacyWelcomeClass({ t, i18n }) {
  let customer_name = window.location.href.split("/")[3];
  const [loading, setLoading] = useState(false); // For Loading
  const [total, setTotal] = useState(""); // total rows
  const [success, setSuccess] = useState([]); //success message
  const [error, setError] = useState([]); //error message
  const [currentPage, setCurrentPage] = useState(); // current page for pagination
  const [lastPage, setLastPage] = useState(); // last page for pagination
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectPosition, setSelectPosition] = useState([]);
  const [selectCategoryValue, setSelectCategoryValue] = useState(); //for get selected role
  const [selectPositionValue, setSelectPositionValue] = useState();
  const [mainTable, setMainTable] = useState([]);
  const [indexNumber, setIndexNumber] = useState("0"); // auto increase index for table
  const [selectPaginateValue, setSelectPaginateValue] = useState(10); //for get selected role
  const [pageStart, setPageStart] = useState(); //for get start page
  const [pageEnd, setPageEnd] = useState(); //for get end page
  const [paginateArr, setPaginateArr] = useState([]); //for paginate array
  const [updateStatus, setUpdateStatus] = useState(false); //for update status
  const [confirmShow, setConfirmShow] = useState(false); // confirmation box show
  const [confirmType, setConfirmType] = useState(""); // confirmation box type
  const [confirmHeader, setConfirmHeader] = useState(""); //for confirm header
  const [confirmContent, setConfirmContent] = useState(""); //for confirm content
  const [contentOK, setContentOk] = useState(""); //for ok button of comfirm box
  const [deleteId, setDeleteId] = useState(""); //for delete id
  const [editId, setEditId] = useState(""); //for edit id
  const [loginId, setLoginId] = useState(
    localStorage.getItem(`${customer_name}_LOGIN_ID`)
  );
  const [loginPermission, setLoginPermission] = useState([]);
  let tempIndexNumber = ""; // temporaray index for table index
  let errArry = []; //for error array
  /**
   * User Effect
   * @author yaminzaw
   * @create 04/10/2022
   */
  useEffect(() => {
    document.body.style.overflow = "auto";
    (async () => {
      setLoading(true);
      await PermissionCheck();
      let loginData = {
        login_id: loginId,
      };
      let permit = await specificPermission(
        "Job And Position Registration",
        loginData
      );
      Promise.all([permit]).then((values) => {
        permit = values[0];
        setLoginPermission(permit);
      });

      await allJobFormLoad();
      await allPositionFormLoad();
      await allJobPosFormLoad();
      setLoading(false);
    })();
    if (selectPaginateValue != undefined && mainTable.length > 0) {
      allJobPosFormLoad();
    }
  }, [selectPaginateValue]);

  /**
   * category formload from API
   * @author yaminzaw
   * @create 05/10/2022
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
        setSelectCategory(response.data.data);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
  };

  /**
   * position formload from API
   * @author yaminzaw
   * @create 05/10/2022
   */
  let allPositionFormLoad = async () => {
    setError([]);
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
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
  };

  /**
   * category formload from API
   * @author yaminzaw
   * @create 05/10/2022
   */
  let allJobPosFormLoad = async (page = 1) => {
    setError([]);
    setLoading(true);
    let form_load = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.JobAndPositionAll + `?page=${page}`,
      params: {
        login_id: loginId,
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(form_load);
    if (response.flag === false) {
      setMainTable([]);
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
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
    setLoading(false);
  };

   /**
   * category formload from API
   * @author yaminzaw
   * @create 05/10/2022
   */
   let tempSearch = async (page = 1) => {
    setLoading(true);
    let form_load = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.JobAndPositionAll + `?page=${page}`,
      params: {
        login_id: loginId,
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(form_load);
    if (response.flag === false) {
      setMainTable([]);
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
      } else {
        setMainTable([]);
      }
    }
    setLoading(false);
  };

  /**
   * onChange function of select box(select category)
   * @author yaminzaw
   * @create 26/09/2022
   * @param e
   */
  const selectCategoryOnChange = (e) => {
    let id = e.target.value;
    setSelectCategoryValue(id);
    setError([]);
    setSuccess([]);
  };

  /**
   * onChange function of select box(select position)
   * @author yaminzaw
   * @create 26/09/2022
   * @param e
   */
  const selectPositionOnChange = (e) => {
    let id = e.target.value;
    setSelectPositionValue(id);
    setError([]);
    setSuccess([]);
  };

  /**
   * click save button
   * @author yaminzaw
   * @create 04/10/2022
   */
  const saveClick = () => {
    if (!checkNullOrBlank(selectPositionValue)) {
      errArry.push(t(CommonMessage.JSE019).replace("%s", t("Position")));
    }
    if (!checkNullOrBlank(selectCategoryValue)) {
      errArry.push(t(CommonMessage.JSE019).replace("%s", t("Job Category")));
    }
    if (errArry.length > 0) {
      setError(errArry);
    } else {
      if (updateStatus) {
        setConfirmShow(true);
        setConfirmHeader(
          `<h5 style='color:#4e57aa'>${t("Update Confirmation")}</h5>`
        );
        setConfirmContent(`<p>${t("Are you sure want to update?")}</p>`);
        setConfirmType("update");
        setContentOk(t("Yes"));
      } else if (!updateStatus) {
        setConfirmShow(true);
        setConfirmHeader(
          `<h5 style='color:#4e57aa'>${t("Save Confirmation")}</h5>`
        );
        setConfirmContent(`<p>${t("Are you sure want to save?")}</p>`);
        setConfirmType("save");
        setContentOk(t("Yes"));
      }
    }
  };

  /**
   * onClick (Ok) function of Yes button to save Job and Position pair
   * @author yaminzaw
   */
  const saveOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    setUpdateStatus(false);
    let saveData = {
      package_name: "recruit",
      method: "post",
      url: ApiPath.JobAndPositionSave,
      params: {
        job_category_id: selectCategoryValue,
        position_id: selectPositionValue,
        login_id: loginId,
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        setSelectCategoryValue("");
        setSelectPositionValue("");
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        let page = currentPage;
        setSuccess([response.data.message]);
        allJobPosFormLoad(page);
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  };

  /**
   * onClick function of delete
   * @author yaminzaw
   * @create 26/09/2022
   * @param e
   */
  const deleteClick = (id) => {
    setUpdateStatus(false);
    setSelectCategoryValue("");
    setSelectPositionValue("");
    setDeleteId(id);
    setConfirmShow(true);
    setConfirmHeader(`<h5 style='color:red'>${t("Delete Confirmation")}</h5>`);
    setConfirmContent(`<p>${t("Are you sure want to delete?")}</p>`);
    setConfirmType("delete");
    setContentOk(t("Delete"));
  };

  /**
   * onClick (Delete) function of delete button
   * @author yaminzaw
   * @create 05/10/2022
   */
  const deleteOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    let obj = {
      package_name: "recruit",
      method: "delete",
      url: ApiPath.JobAndPositionDelete,
      params: {
        job_position_id: deleteId,
        login_id: loginId,
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status === "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        let page = currentPage;
        setSuccess([response.data.message]);
        if (mainTable.length - 1 == 0) {
          page = currentPage - 1;
        }
        tempSearch(page);
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  };

  /**
   * onClick function of edit
   * @author yaminzaw
   * @create 05/10/2022
   * @param e
   */
  const editClick = async (id,job_category_id,position_id) => {
    setUpdateStatus(true);
    setEditId(id);
    setLoading(true);
    setSuccess([]);
    setError([]);
    let obj = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.JobAndPositionEdit,
      params: {
        login_id: loginId,
        paginate: selectPaginateValue,
        job_position_id: id,
        job_category_id: job_category_id,
        position_id: position_id
      },
    };
    let response = await ApiRequest(obj);
    if (response.flag == false) {
      setError(response.message);
    } else {
      if (response.data.status == "OK") {
        setSelectCategoryValue(response.data.data.job_category_id);
        setSelectPositionValue(response.data.data.position_id);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setSuccess([]);
        setError([response.data.message]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  };

  /**
   * onClick (Ok) function of Yes button to update category
   * @author yaminzaw
   * @create 05/10/2022
   */
  const updateOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    let updateCategory = {
      package_name: "recruit",
      method: "put",
      url: ApiPath.JobAndPositionUpdate,
      params: {
        login_id: loginId,
        job_category_id: selectCategoryValue,
        position_id: selectPositionValue,
        paginate: selectPaginateValue,
        job_position_id: editId,
      },
    };
    let response = await ApiRequest(updateCategory);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        setSelectCategoryValue("");
        setSelectPositionValue("");
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setUpdateStatus(false);
        let page = currentPage;
        setSuccess([response.data.message]);
        allJobPosFormLoad(page);
      } else {
        setError([response.data.message]);
        setSuccess([]);
      }
    }
    setLoading(false);
  };

  /**
   * pagination function
   * @author yaminzaw
   * @create 05/10/2022
   */
  const setActivePage = (page) => {
    setSuccess([]);
    setError([]);
    allJobPosFormLoad(page);
  };

  /**
   * onChange function of select box(pagination)
   * @author yaminzaw
   * @create 05/10/2022
   * @param e
   */
  const selectPaginateOnChange = (e) => {
    setSelectPaginateValue(e.target.value);
  };

  return (
    <>
      <Loading start={loading} />
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
                    {t("Job & Position Registration")}
                  </h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <JobAndPosForm
                selectCategory={selectCategory}
                selectCategoryValue={selectCategoryValue}
                selectCategoryOnChange={selectCategoryOnChange}
                selectPosition={selectPosition}
                selectPositionValue={selectPositionValue}
                selectPositionOnChange={selectPositionOnChange}
                saveClick={saveClick}
                updateStatus={updateStatus}
                error={error}
                success={success}
                loginPermission={loginPermission}
              />
            </CCardBody>
          </CCard>
          <ResumeConfirmMessage
            show={confirmShow}
            type={confirmType}
            header={confirmHeader}
            content={confirmContent}
            cancel={() => setConfirmShow(false)}
            deleteOK={deleteOK}
            saveOK={saveOK}
            updateOK={updateOK}
            okButton={contentOK}
            cancelButton={t("Cancel")}
          />
          {mainTable.length > 0 && (
            <CCard style={{ paddingBottom: "30px", borderRadius: "1rem" }}>
              <CCardBody>
                <JobAndPosTable
                  deleteClick={deleteClick}
                  editClick={editClick}
                  mainTable={mainTable}
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
                  loginPermission={loginPermission}
                />
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>
    </>
  );
}

export default withTranslation()(LegacyWelcomeClass);
