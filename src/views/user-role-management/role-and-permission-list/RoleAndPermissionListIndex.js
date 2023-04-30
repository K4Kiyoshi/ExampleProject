import React, { useState, useEffect } from "react";
import RoleAndPermissionRegisterListForm from "./RoleAndPermissionListForm";
import { ApiRequest } from "../../common/ApiRequest";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import SuccessError from "../../common/SuccessError";
import ResumeConfirmMessage from "../../common/ResumeConfirmMessage";
import Loading from "../../common/Loading";
import { useHistory } from "react-router-dom";
import ApiPath from "../../common/ApiPath";
import { useTranslation } from "react-i18next";
import PermissionCheck from "../../common/permission-check/PermissionCheck";
import { specificPermission } from "../../common/specific-permission/SpecificPermission";

const RoleAndPermissionRegisterListIndex = () => {
  let customer_name = window.location.href.split("/")[3];
  const { t } = useTranslation();
  const history = useHistory(); // link
  const [rolePermission] = useState(
    localStorage.getItem(`${customer_name}_PERMISSION`)
  ); //to get role permission
  const [loading, setLoading] = useState(false); // For Loading
  const [currentPage, setCurrentPage] = useState(); // current page for pagination
  const [lastPage, setLastPage] = useState(); // last page for pagination
  const [total, setTotal] = useState(""); // total rows
  const [success, setSuccess] = useState([]); //success message
  const [error, setError] = useState([]); //error message
  const [selectPaginateValue, setSelectPaginateValue] = useState(10); //for get selected role
  const [mainTable, setMainTable] = useState([]); // main table data for job category list table
  const [indexNumber, setIndexNumber] = useState("0"); // auto increase index for table
  const [pageStart, setPageStart] = useState(); //for get start page
  const [pageEnd, setPageEnd] = useState(); //for get end page
  const [paginateArr, setPaginateArr] = useState([]); //for paginate array
  const [roleName, setRoleName] = useState(""); //for get search category name
  const [categoryName, setCategoryName] = useState(""); //for get category name
  const [deleteId, setDeleteId] = useState(""); //for delete id
  const [editId, setEditId] = useState(""); //for edit id
  const [confirmShow, setConfirmShow] = useState(false); // confirmation box show
  const [confirmHeader, setConfirmHeader] = useState(""); //for confirm header
  const [confirmContent, setConfirmContent] = useState(""); //for confirm content
  const [contentOK, setContentOk] = useState(""); //for ok button of comfirm box
  const [confirmType, setConfirmType] = useState(""); // confirmation box type
  const [loginPermission, setLoginPermission] = useState([]);
  const [loginId, setLoginId] = useState(
    localStorage.getItem(`${customer_name}_LOGIN_ID`)
  );
  let tempIndexNumber = ""; // temporaray index for table index

  useEffect(() => {
    setLoading(true);
    document.body.style.overflow = "auto";
    //  localStorage.removeItem("EDIT_USER_MENU_RETURN");
    (async () => {
      await PermissionCheck();
      let loginData = {
        login_id: loginId,
        role_id: localStorage.getItem(`${customer_name}_ROLE_ID`),
      };
      let permit = await specificPermission(
        "Role & Permission List",
        loginData
      );
      Promise.all([permit]).then((values) => {
        permit = values[0];
        setLoginPermission(permit);
      });

      await roleFormload();
    })();
    if (selectPaginateValue != undefined && mainTable.length > 0) {
      tempSearch();
    }

    let successMessage = JSON.parse(
      localStorage.getItem(`${customer_name}_EDIT_USER_MENU_RETURN`)
    );
    if (successMessage != null) {
      setSuccess([successMessage]);
    }
    localStorage.removeItem(`${customer_name}_EDIT_USER_MENU_RETURN`);
    setLoading(false);
  }, [selectPaginateValue]);

  let roleFormload = async (page = 1) => {
    // setError([]);
    // setSuccess([]);
    setLoading(true);
    let form_load = {
      method: "get",
      package_name: "recruit",
      url: ApiPath.RoleAndPermissionListRoleFormLoad + page,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(form_load);
    if (response.flag === false) {
      // setSuccess([]);
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
        // setSuccess([]);
        setError([response.data.message]);
      }
    }

    setLoading(false);
  };

  let search = async (page = 1) => {
    setError([]);
    setSuccess([]);
    setLoading(true);

    let search = {
      method: "get",
      package_name: "recruit",
      url: ApiPath.RoleAndPermissionListRoleFormLoad,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        name: roleName,
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

  let tempSearch = async (page = 1) => {
    let search = {
      method: "get",
      package_name: "recruit",
      url: ApiPath.RoleAndPermissionListRoleFormLoad,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        name: roleName,
        paginate: selectPaginateValue,
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      //setSuccess([]);
      setMainTable([]);
      //setError(response.message);
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
        setError([response.data.message]);
        setMainTable([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  };

  const deleteOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    let obj = {
      method: "delete",
      package_name: "recruit",
      url: ApiPath.RoleAndPermissionListDelete,
      params: {
        delete_role_id: deleteId,
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        paginate: selectPaginateValue,
        customer_name: customer_name,
        company_id: localStorage.getItem(`${customer_name}_COMPANY_ID`),
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

  const linkClick = (id) => {
    localStorage.setItem(`${customer_name}_MENU_SETTING_DETAIL_DATA`, id);
    history.push(
      `/${customer_name}/recruit/role-management/role-&-permission-list-detail`
    );
  };

  const setActivePage = (page) => {
    setSuccess([]);
    setError([]);
    search(page);
  };
  const selectPaginateOnChange = (e) => {
    setSelectPaginateValue(e.target.value);
  };

  const handleChangeSearchRoleName = (e) => {
    setRoleName(e.target.value);
  };

  const deleteClick = (id) => {
    setDeleteId(id);
    setConfirmShow(true);
    setConfirmHeader(`<h5 style='color:red'>${t("Delete Confirmation")}</h5>`);
    setConfirmContent(`<p>${t("Are you sure want to delete?")}</p>`);
    setConfirmType("delete");
    setContentOk(t("Delete"));
  };

  const editClick = async (id) => {
    localStorage.setItem(`${customer_name}_MENU_SETTING_EDIT_DATA`, id);
    // history.push("/role-management/role-and-permission-register")
    history.push(
      `/${customer_name}/recruit/role-management/role-&-permission-register`
    );
  };

  // detail function
  const goDetail = (i) => {
    i.page = currentPage;
    localStorage.setItem(
      `${customer_name}_MENU_SETTING_DETAIL_DATA`,
      JSON.stringify(i)
    );
    history.push(
      `/${customer_name}/recruit/role-management/role-&-permission-list-detail`
    );
  };

  return (
    <>
      <SuccessError error={error} success={success} />
      <Loading start={loading} />
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
                {t("Role & Permission List")}
              </h3>
            </CCol>
          </CRow>
        </CCardHeader>

        <CCardBody>
          <RoleAndPermissionRegisterListForm
            loginPermission={loginPermission}
            rolePermission={rolePermission}
            linkClick={linkClick}
            roleName={roleName}
            handleChangeSearchRoleName={handleChangeSearchRoleName}
            search={search}
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
            goDetail={goDetail}
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
        okButton={contentOK}
        cancelButton={t("Cancel")}
      />
    </>
  );
};

export default RoleAndPermissionRegisterListIndex;
