/* Position Registeration Index Form
 * @author Yuwa Ko Ko
 * @create 27/09/2022
 */

import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import PositionRegistrationForm from "./PositionRegistrationForm";
import {
  validationWhiteSpace,
  checkNullOrBlank,
  containsSpecialChars,
} from "../../common/CommonValidation";
import PositionRegistrationTable from "./PositionRegistrationTable";
import ResumeConfirmMessage from "../../common/ResumeConfirmMessage";
import Loading from "../../common/Loading";
import CommonMessage from "../../common/CommonMessage";
import { useHistory } from "react-router-dom";
import { ApiRequest } from "../../common/ApiRequest";
import ApiPath from "../../common/ApiPath";
import { useTranslation } from "react-i18next";
import PermissionCheck from "../../common/permission-check/PermissionCheck";
import { specificPermission } from "../../common/specific-permission/SpecificPermission";
import SuccessError from "../../common/SuccessError";

const PositionRegistrationIndex = () => {
  const { t } = useTranslation();
  let customer_name = window.location.href.split("/")[3];
  const [loading, setLoading] = useState(false); // For Loading
  const [currentPage, setCurrentPage] = useState(); // current page for pagination
  const [lastPage, setLastPage] = useState(); // last page for pagination
  const [total, setTotal] = useState(""); // total rows
  const [success, setSuccess] = useState([]); //success message
  const [error, setError] = useState([]); //error message
  const [positionName, setPositionName] = useState(""); //for get position name
  const [positionNameSearch, setPositionNameSearch] = useState(""); //for get search position name
  const [indexNumber, setIndexNumber] = useState("0"); // auto increase index for table
  const [mainTable, setMainTable] = useState([]); // main table data for job position list table
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
  const [pageEnd, setPageEnd] = useState(); //for get end page
  const [loginId, setLoginId] = useState(
    localStorage.getItem(`${customer_name}_LOGIN_ID`)
  );
  const [loginPermission, setLoginPermission] = useState([]);
  const history = useHistory(); // route Change state
  let errArry = []; //for error array
  let tempIndexNumber = ""; // temporaray index for table index

  /**
   * User Effect
   * @author YuwaKoKo
   * @create 26/09/2022
   */
  useEffect(() => {
    document.body.style.overflow = "auto";
    (async () => {
      setLoading(true);
      await PermissionCheck();
      let loginData = {
        login_id: loginId,
      };
      let permit = await specificPermission("Position Registration", loginData);
      Promise.all([permit]).then((values) => {
        permit = values[0];
        setLoginPermission(permit);
      });

      await allPositionFormLoad();
      setLoading(false);
    })();
    if (selectPaginateValue != undefined && mainTable.length > 0) {
      search();
    }
  }, [selectPaginateValue]);

  /**
   * get position name from input field
   * @author YuwaKoKo
   * @create 26/09/2022
   * @param e
   */
  const handleChangePositionName = (e) => {
    setPositionName(validationWhiteSpace(e.target.value));
  };

  /**
   * get Position name for search from input field
   * @author YuwaKoKo
   * @create 26/09/2022
   * @param e
   */
  const handleChangeSearchPositionName = (e) => {
    setPositionNameSearch(e.target.value);
  };

  /**
   * Position formload from API
   * @author YuwaKoKo
   * @create 26/09/2022
   */
  let allPositionFormLoad = async (page = 1) => {
    setError([]);
    setSuccess([]);
    let form_load = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.PositionList + `?page=${page}`,
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
        setSuccess([]);
        setError([response.data.message]);
      }
    }
  };

  /**
   * click save position button
   * @author YuwaKoKo
   * @create 26/09/2022
   */
  const saveClick = () => {
    if (!checkNullOrBlank(positionName)) {
      errArry.push(t(CommonMessage.JSE005).replace("%s", t("Position Name")));
    } else if (containsSpecialChars(positionName)) {
      errArry.push(t(CommonMessage.JSE028).replace("%s", t("Position Name")));
    } else if (positionName.length > 50) {
      errArry.push(
        t(CommonMessage.JSE033)
          .replace("%s", t("Position Name"))
          .replace("%s", "50")
      );
    }
    if (errArry.length > 0) {
      setError(errArry);
      setSuccess([]);
    } else {
      setError([]);
      if (updateStatus) {
        setPositionNameSearch("");
        setConfirmShow(true);
        setConfirmHeader(
          `<h5 style='color:#4e57aa'>${t("Update Confirmation")}</h5>`
        );
        setConfirmContent(`<p>${t("Are you sure want to update?")}</p>`);
        setConfirmType("update");
        setContentOk(t("Yes"));
      } else if (!updateStatus) {
        setPositionNameSearch("");
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

  const saveOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    setUpdateStatus(false);
    let saveData = {
      package_name: "recruit",
      method: "post",
      url: ApiPath.PositionRegister,
      params: {
        position_name: positionName,
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
        setPositionName("");
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
   * @author YuwaKoKo
   * @create 26/09/2022
   */
  let search = async (page = 1) => {
    setError([]);
    setSuccess([]);
    setLoading(true);

    let search = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.PositionSearch + `?page=${page}`,
      params: {
        login_id: loginId,
        position_name: positionNameSearch,
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
        setMainTable([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }

    setLoading(false);
  };

  /**
   * search function with API(temp search for delete)
   * @author YuwaKoKo
   * @create 26/09/2022
   */
  let tempSearch = async (page = 1) => {
    let search = {
      package_name: "recruit",
      method: "get",
      url: ApiPath.PositionSearch + `?page=${page}`,
      params: {
        login_id: loginId,
        position_name: positionNameSearch,
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setMainTable([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
        //setSuccess([]);
        setMainTable([]);
        setError([response.data.message]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  };

  /**
   * edit click function with API
   * @author YuwaKoKo
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
      url: ApiPath.PositionEdit + id,
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
        setPositionName(response.data.data.position_name);
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
   * onClick (Ok) function of Yes button to update position
   * @author YuwaKoKo
   * @create 27/09/2022
   */
  const updateOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    let updatePosition = {
      package_name: "recruit",
      method: "put",
      url: ApiPath.PositionUpdate + editId,
      params: {
        login_id: loginId,
        position_name: positionName,
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(updatePosition);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        setPositionName("");
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
   * @author YuwaKoKo
   * @create 26/09/2022
   */
  const deleteClick = (id) => {
    setUpdateStatus(false);
    setPositionName("");
    setDeleteId(id);
    setConfirmShow(true);
    setConfirmHeader(`<h5 style='color:red'>${t("Delete Confirmation")}</h5>`);
    setConfirmContent(`<p>${t("Are you sure want to delete?")}</p>`);
    setConfirmType("delete");
    setContentOk(t("Delete"));
  };

  /**
   * onClick (Delete) function of delete button
   * @author YuwaKoKo
   * @create 03/10/2022
   */
  const deleteOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    let obj = {
      package_name: "recruit",
      method: "delete",
      url: ApiPath.PositionDelete + deleteId,
      params: {
        position_id: deleteId,
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
        let page = currentPage;
        setSuccess([response.data.message]);
        if (mainTable.length - 1 == 0) {
          page = currentPage - 1;
        }
        tempSearch(page);
        setError([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  };

  /**
   * pagination function
   * @author YuwaKoKo
   * @create 03/10/2022
   */
  const setActivePage = (page) => {
    setSuccess([]);
    setError([]);
    search(page);
  };

  /**
   * onChange function of select box(pagination)
   * @author YuwaKoKo
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
                    {t("Position Registration")}
                  </h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <PositionRegistrationForm
                handleChangePositionName={handleChangePositionName}
                positionName={positionName}
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
              <PositionRegistrationTable
                loginPermission={loginPermission}
                positionNameSearch={positionNameSearch}
                handleChangeSearchPositionName={handleChangeSearchPositionName}
                search={() => search()}
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

export default PositionRegistrationIndex;
