/**  Job Categories Registration Index
 * @author yamin zaw
 */
import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import JobCategoriesRegForm from "./JobCategoriesRegForm";
import {
  validationWhiteSpace,
  checkNullOrBlank,
  containsSpecialChars
} from "../../common/CommonValidation";
import JobCategoriesTable from "./JobCategoriesTable";
import ResumeConfirmMessage from "../../common/ResumeConfirmMessage";
import Loading from "../../common/Loading";
import CommonMessage from "../../common/CommonMessage";
import { ApiRequest } from "../../common/ApiRequest";
import PermissionCheck from "../../common/permission-check/PermissionCheck";
import { specificPermission } from "../../common/specific-permission/SpecificPermission";
import { useTranslation } from 'react-i18next';
import ApiPath from "../../common/ApiPath";
import SuccessError from "../../common/SuccessError";

const JobCategoriesRegistrationIndex = () => {
  const { t } = useTranslation();
  let customer_name = window.location.href.split("/")[3];
  const [loading, setLoading] = useState(false); // For Loading
  const [currentPage, setCurrentPage] = useState(); // current page for pagination
  const [lastPage, setLastPage] = useState(); // last page for pagination
  const [total, setTotal] = useState(""); // total rows
  const [success, setSuccess] = useState([]); //success message
  const [error, setError] = useState([]); //error message
  const [categoryName, setCategoryName] = useState(""); //for get category name
  const [categoryNameSearch, setCategoryNameSearch] = useState(""); //for get search category name
  const [indexNumber, setIndexNumber] = useState("0"); // auto increase index for table
  const [mainTable, setMainTable] = useState([]); // main table data for job category list table
  const [confirmShow, setConfirmShow] = useState(false); // confirmation box show
  const [confirmType, setConfirmType] = useState(""); // confirmation box type
  const [confirmHeader, setConfirmHeader] = useState(""); //for confirm header
  const [confirmContent, setConfirmContent] = useState(""); //for confirm content
  const [contentOK, setContentOk] = useState(""); //for ok button of comfirm box
  const [updateStatus, setUpdateStatus] = useState(false); //for update status
  const [deleteId, setDeleteId] = useState(""); //for delete id
  const [editId, setEditId] = useState(""); //for edit id
  const [paginateArr, setPaginateArr] = useState([]); //for paginate array
  const [selectPaginateValue, setSelectPaginateValue] = useState(10); //for get selected role
  const [loginId, setLoginId] = useState(localStorage.getItem(`${customer_name}_LOGIN_ID`))
  const [pageStart, setPageStart] = useState(); //for get start page
  const [pageEnd, setPageEnd] = useState(); //for get end page
  const [loginPermission, setLoginPermission] = useState([]);
  let errArry = []; //for error array
  let tempIndexNumber = ""; // temporaray index for table index

  /**
   * User Effect
   * @author yaminzaw
   * @create 26/09/2022
   */
  useEffect(() => {
    document.body.style.overflow = "auto";
    (async () => {
      setLoading(true);
      await PermissionCheck();
      let loginData = {
        login_id: loginId,
      }
      let permit = await specificPermission("Job Categories Registration", loginData);
      Promise.all([permit]).then((values) => {
        permit = values[0];
        setLoginPermission(permit);
      });

      await allCategoryFormLoad();
      setLoading(false);
    })();
    if (selectPaginateValue != undefined && mainTable.length > 0) {
      search();
    }
  }, [selectPaginateValue]);

  /**
   * get category name from input field
   * @author yaminzaw
   * @create 26/09/2022
   * @param e
   */
  const handleChangeCategoryName = (e) => {
    setCategoryName(validationWhiteSpace(e.target.value));
  };

  /**
   * get category name for search from input field
   * @author yaminzaw
   * @create 26/09/2022
   * @param e
   */
  const handleChangeSearchCategoryName = (e) => {
    setCategoryNameSearch(e.target.value);
  };

  /**
   * category formload from API
   * @author yaminzaw
   * @create 26/09/2022
   */
  let allCategoryFormLoad = async (page = 1) => {
    setError([]);
    setSuccess([]);
    let form_load = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.JobCategoryList+`?page=${page}`,
      params: {
        login_id: loginId,
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(form_load);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
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
  };

  /**
   * click save category button
   * @author yaminzaw
   * @create 26/09/2022
   */
  const saveClick = () => {
    if (!checkNullOrBlank(categoryName)) {
      errArry.push(t(CommonMessage.JSE005).replace("%s", t("Category Name")));
    }
    else if (containsSpecialChars(categoryName)) {
      errArry.push(t(CommonMessage.JSE028).replace("%s", t("Category Name")));
    }
    else if (categoryName.length > 50) {
      errArry.push(t(CommonMessage.JSE033).replace("%s", t("Category Name")).replace("%s", "50"));
    }
    if (errArry.length > 0) {
      setError(errArry);
      setSuccess([]);
    } else {
      setError([]);
      if (updateStatus) {
        setCategoryNameSearch("");
        setConfirmShow(true);
        setConfirmHeader(`<h5 style='color:#4e57aa'>${t('Update Confirmation')}</h5>`);
        setConfirmContent(
          `<p>${t('Are you sure want to update?')}</p>`
        );
        setConfirmType("update");
        setContentOk(t("Yes"));
      } else if (!updateStatus) {
        setCategoryNameSearch("");
        setConfirmShow(true);
        setConfirmHeader(
          `<h5 style='color:#4e57aa'>${t('Save Confirmation')}</h5>`
        );
        setConfirmContent(
          `<p>${t('Are you sure want to save?')}</p>`
        );
        setConfirmType("save");
        setContentOk(t("Yes"));
      }
    }
  };

  /**
   * onClick (Ok) function of Yes button to save Job Category
   * @author yaminzaw
   */
  const saveOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    setUpdateStatus(false);
    let saveData = {
      package_name: "recruit",
      method: "post",
      url: ApiPath.JobCategoryRegister,
      params: {
        category_name: categoryName,
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
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        let page = currentPage;
        setSuccess([response.data.message]);
        tempSearch(page);
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
   * search function with API
   * @author yaminzaw
   * @create 26/09/2022
   */
  let search = async (page = 1) => {
    setError([]);
    setSuccess([]);
    setLoading(true);
    let search = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.JobCategorySearch+`?page=${page}`,
      params: {
        login_id: loginId,
        category_name: categoryNameSearch,
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(search);

    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
        setMainTable([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }

    setLoading(false);
  };

  /**
   * search function with API(temp search for delete)
   * @author yaminzaw
   * @create 26/09/2022
   */
  let tempSearch = async (page = 1) => {
    let search = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.JobCategorySearch+`?page=${page}`,
      params: {
        login_id: loginId,
        category_name: categoryNameSearch,
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(search);
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
  };

  /**
   * edit click function with API
   * @author yaminzaw
   * @create 26/09/2022
   */
  const editClick = async (id) => {
    setUpdateStatus(true);
    setEditId(id);
    setLoading(true);
    setSuccess([]);
    setError([]);
    let obj = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.JobCategoryEdit + id,
      params: {
        login_id: loginId,
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(obj);
    if (response.flag == false) {
      setError(response.message);
    } else {
      if (response.data.status == "OK") {
        setCategoryName(response.data.data.category_name);
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
   * @create 27/09/2022
   */
  const updateOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    let updateCategory = {
      package_name: "recruit",
      method: "put",
      url: ApiPath.JobCategoryUpdate + editId,
      params: {
        login_id: loginId,
        category_name: categoryName,
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(updateCategory);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setUpdateStatus(false);
        let page = currentPage;
        setSuccess([response.data.message]);
        tempSearch(page);
      } else {
        setError([response.data.message]);
        setSuccess([]);
      }
    }
    setLoading(false);
  };

  /**
   * onClick (Delete) function
   * @author yaminzaw
   * @create 26/09/2022
   */
  const deleteClick = (id) => {
    setUpdateStatus(false);
    setCategoryName("");
    setDeleteId(id);
    setConfirmShow(true);
    setConfirmHeader(`<h5 style='color:red'>${t('Delete Confirmation')}</h5>`);
    setConfirmContent(
      `<p>${t('Are you sure want to delete?')}</p>`
    );
    setConfirmType("delete");
    setContentOk(t("Delete"));
  };

  /**
   * onClick (Delete) function of delete button
   * @author yaminzaw
   * @create 03/10/2022
   */
  const deleteOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    let obj = {
      package_name: "recruit",
      method: "delete",
      url: ApiPath.JobCategoryDelete + deleteId,
      params: {
        category_id: deleteId,
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
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setError([response.data.message]);
        setSuccess([]);
      }
    }
  };

  /**
   * pagination function
   * @author yaminzaw
   * @create 03/10/2022
   */
  const setActivePage = (page) => {
    setSuccess([]);
    setError([]);
    search(page);
  };

  /**
   * onChange function of select box(pagination)
   * @author yaminzaw
   * @create 03/10/2022
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
                    {t("Category Registration")}
                  </h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <JobCategoriesRegForm
                handleChangeCategoryName={handleChangeCategoryName}
                categoryName={categoryName}
                saveClick={saveClick}
                error={error}
                updateStatus={updateStatus}
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
          <CCard style={{ paddingBottom: "30px", borderRadius: "1rem" }}>
            <CCardBody>
              <JobCategoriesTable
                loginPermission={loginPermission}
                categoryNameSearch={categoryNameSearch}
                handleChangeSearchCategoryName={handleChangeSearchCategoryName}
                search={()=>search()}
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
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default JobCategoriesRegistrationIndex;
