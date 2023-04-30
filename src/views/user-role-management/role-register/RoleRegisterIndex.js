/**
 * Role Registration Index
 * @author yaminzaw
 */
import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import RoleRegisterForm from "./RoleRegisterForm";
import RoleRegisterTable from "./RoleRegisterTable";
import {
  validationWhiteSpace,
  checkNullOrBlank,
} from "../../common/CommonValidation";
import ResumeConfirmMessage from "../../common/ResumeConfirmMessage";
import Loading from "../../common/Loading";
import CommonMessage from "../../common/CommonMessage";
import { useHistory } from "react-router-dom";
import { ApiRequest } from "../../common/ApiRequest";
import { useTranslation } from "react-i18next";
import ApiPath from "../../common/ApiPath";
import PermissionCheck from "../../common/permission-check/PermissionCheck";
import { specificPermission } from "../../common/specific-permission/SpecificPermission";
import SuccessError from "../../common/SuccessError";

const RoleRegisterIndex = () => {
  const { t } = useTranslation();
  let customer_name = window.location.href.split("/")[3];
  const [loading, setLoading] = useState(false); // For Loading
  const [currentPage, setCurrentPage] = useState(); // current page for pagination
  const [lastPage, setLastPage] = useState(); // last page for pagination
  const [total, setTotal] = useState(""); // total rows
  const [success, setSuccess] = useState([]); //success message
  const [error, setError] = useState([]); //error message
  const [roleName, setRoleName] = useState([]);//for get role name to register
  const [description, setDescription] = useState([]);//for get description to register
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
  const [pageStart, setPageStart] = useState(); //for get start page
  const [loginId, setLoginId] = useState(localStorage.getItem(`${customer_name}_LOGIN_ID`))
  const [pageEnd, setPageEnd] = useState(); //for get end page
  const [deleteRadio, setDeleteRadio] = useState([
    { id: 1, name: "Delete All Data" },
    { id: 2, name: "None" },
  ]); //for choose level of multiple choice
  const [finalAllCheck, setFinalAllCheck] = useState(false); // for final check box (true,false)
  const [loginPermission, setLoginPermission] = useState([]);
  const [deleteRadioId, setDeleteRadioId] = useState(0); //for delete radio id
  const history = useHistory(); // route Change state
  let errArry = []; //for error array
  let tempCheckArr = [];//for store
  let tempIndexNumber = ""; // temporaray index for table index

  /**
   * User Effect
   * @author yaminzaw
   * @create 20/12/2022
   */
  useEffect(() => {
    document.body.style.overflow = "auto";
    (async () => {
      setLoading(true);
      await PermissionCheck();
      let loginData = {
        login_id: loginId,
      }
      let permit = await specificPermission("Role Register", loginData);
      Promise.all([permit]).then((values) => {
        permit = values[0];
        setLoginPermission(permit);
      });

      await allRoleFormLoad();
      setLoading(false);
    })();
    if (selectPaginateValue != undefined && mainTable.length > 0) {
      allRoleFormLoad();
    }
  }, [selectPaginateValue]);

  /**
   * get role name from input field
   * @author yaminzaw
   * @create 19/12/2022
   * @param e
   */
  const handleChangeRole = (e) => {
    setRoleName(validationWhiteSpace(e.target.value));
  };

  /**
   * get description name from input field
   * @author yaminzaw
   * @create 19/12/2022
   * @param e
   */
  const handleChangeDescription = (e) => {
    setDescription(validationWhiteSpace(e.target.value));
  };

  /**
   * category formload from API
   * @author yaminzaw
   * @create 20/12/2022
   */
  let allRoleFormLoad = async (page = 1) => {
    setError([]);
    setSuccess([]);
    setLoading(true);
    let form_load = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.RoleRegistrationList + `?page=${page}`,
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
  * @create 29/12/2022
  */
  let tempFormLoad = async (page = 1) => {
    setLoading(true);
    let form_load = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.RoleRegistrationList + `?page=${page}`,
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
   * click save
   * @author yaminzaw
   * @create 20/12/2022
   */
  const saveClick = () => {
    clearCheck();
    if (!checkNullOrBlank(roleName)) {
      errArry.push(t(CommonMessage.JSE005).replace("%s", t("Role Name")));
    }
    else if (roleName.length < 3 || roleName.length > 50) {
      errArry.push(t(CommonMessage.JSE056).replace("%s", t("Role Name")).replace("%s", "3").replace("%s", "50"));
    }
    if (!checkNullOrBlank(description)) {
      errArry.push(t(CommonMessage.JSE005).replace("%s", t("Description")));
    }
    else if (description.length < 3 || description.length > 50) {
      errArry.push(t(CommonMessage.JSE056).replace("%s", t("Description")).replace("%s", "3").replace("%s", "50"));
    }
    if (errArry.length > 0) {
      setError(errArry);
      setSuccess([]);
    } else {
      setError([]);
      if (updateStatus) {
        setConfirmShow(true);
        setConfirmHeader(`<h5 style='color:#4e57aa'>${t('Update Confirmation')}</h5>`);
        setConfirmContent(`<p>${t('Are you sure want to update?')}</p>`);
        setConfirmType("update");
        setContentOk(t("Yes"));
      } else if (!updateStatus) {
        setConfirmShow(true);
        setConfirmHeader(`<h5 style='color:#4e57aa'>${t('Save Confirmation')}</h5>`);
        setConfirmContent(`<p>${t('Are you sure want to save?')}</p>`);
        setConfirmType("save");
        setContentOk(t("Yes"));
      }
    }
  };

  /**
   * click save
   * @author yaminzaw
   * @create 20/12/2022
   */
  const saveOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    setUpdateStatus(false);
    let saveData = {
      package_name: "recruit",
      method: "post",
      url: ApiPath.RoleRegistrationSave,
      params: {
        name: roleName,
        description: description,
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
        tempFormLoad(page);
        setRoleName("");
        setDescription("");
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
  * edit click function with API
  * @author yaminzaw
  * @create 20/12/2022
  */
  const editClick = async (id) => {
    clearCheck();
    setUpdateStatus(true);
    setEditId(id);
    setLoading(true);
    setSuccess([]);
    setError([]);
    let obj = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.RoleRegistrationEdit,
      params: {
        login_id: loginId,
        paginate: selectPaginateValue,
        role_id: id
      },
    };
    let response = await ApiRequest(obj);
    if (response.flag == false) {
      setError(response.message);
    } else {
      if (response.data.status == "OK") {
        setRoleName(response.data.data.name);
        setDescription(response.data.data.description)
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
   * @create 20/12/2022
   */
  const updateOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    let updateCategory = {
      package_name: "recruit",
      method: "post",
      url: ApiPath.RoelRegistrationUpdate,
      params: {
        login_id: loginId,
        paginate: selectPaginateValue,
        role_id: editId,
        name: roleName,
        description: description
      },
    };
    let response = await ApiRequest(updateCategory);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        setRoleName("");
        setDescription("");
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setUpdateStatus(false);
        let page = currentPage;
        setSuccess([response.data.message]);
        tempFormLoad(page);
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
   * @create 20/12/2022
   */
  const deleteClick = (id) => {
    setSuccess([])
    let temp_arr = [];
    temp_arr.push(id);
    clearCheck();
    setDeleteId(temp_arr);
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
   * @create 20/12/2022
   */
  const deleteOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    let obj = {
      package_name: "recruit",
      method: "post",
      url: ApiPath.RoleRegistrationDelete,
      params: {
        role_id: deleteId,
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
        tempFormLoad(page);
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
   * @create 20/12/2022
   */
  const setActivePage = (page) => {
    setSuccess([]);
    setError([]);
    allRoleFormLoad(page);
    clearCheck();
  };

  /**
  * onChange function on radio(delete radio)
  * @author yaminzaw
  * @create 20/12/2022
  * @param data
  */
  const clickDeleteRadio = (data) => {
    setDeleteRadioId(data.id);
  };

  /**
   * onChange function of select box(pagination)
   * @author yaminzaw
   * @create 20/12/2022
   * @param e
   */
  const selectPaginateOnChange = (e) => {
    setSelectPaginateValue(e.target.value);
  };

  /**
   * Delete All Click Function
   * @author yaminzaw
   * @create 20/12/2022
   * @param e
   */
  const deleteAllCLick = () => {
    mainTable.forEach((main) => {
      if (main.isChecked == true) {
        tempCheckArr.push(main.id);
      }
    });
    setDeleteId(tempCheckArr)

    if (tempCheckArr.length == 0) {
      errArry.push(t(CommonMessage.JSE001).replace("%s", t("at least one checkbox")));
    }
    if (errArry.length > 0) {
      setError(errArry);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setConfirmShow(true);
      setConfirmHeader(`<h5 style='color:red'>${t('Delete Confirmation')}</h5>`);
      setConfirmContent(
        `<p>${t('Are you sure want to delete?')}</p>`
      );
      setConfirmType("delete");
      setContentOk(t("Delete"));
    }
  }

  /**
   * Delete All Click Function
   * @author yaminzaw
   * @create 20/12/2022
   * @param e
   */
  let finalSubCheckboxChange = (id) => {
    setError([]);
    let flg = true;
    let data = mainTable.map((data) => {
      if (data.id == id) {
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

  let finalMainCheckboxChange = () => {
    setError([]);
    setFinalAllCheck(!finalAllCheck);
    let data = mainTable.map((data) => {
      data.isChecked = !finalAllCheck;
      return data;
    });
    setMainTable(data);
  };

  const clearCheck = () => {
    let data = mainTable.map((data) => {
      data.isChecked = false;
      return data;
    });
    setMainTable(data);
    setFinalAllCheck(false);
    setDeleteRadioId(0);
  }

  return (
    <>
      <Loading start={loading} />
      <SuccessError error={error} success={success} />
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
                    {t("Role Registration")}
                  </h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <RoleRegisterForm
                handleChangeRole={handleChangeRole}
                handleChangeDescription={handleChangeDescription}
                roleName={roleName}
                description={description}
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
          {mainTable.length > 0 && (
            <CCard style={{ paddingBottom: "30px", borderRadius: "1rem" }}>
              <CCardBody>
                <RoleRegisterTable
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
                  deleteRadio={deleteRadio}
                  deleteRadioId={deleteRadioId}
                  clickDeleteRadio={clickDeleteRadio}
                  deleteAllCLick={deleteAllCLick}
                  finalMainCheckboxChange={finalMainCheckboxChange}
                  finalSubCheckboxChange={finalSubCheckboxChange}
                  finalAllCheck={finalAllCheck}
                  loginPermission={loginPermission}
                />
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>
    </>
  );
};

export default RoleRegisterIndex;
