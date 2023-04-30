import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSelect, CLabel } from '@coreui/react';
import EmpRoleRegistrationForm from './EmpRoleRegistrationForm';
import EmpRoleListTable from './EmpRoleListTable';
import SuccessError from '../../common/SuccessError';
import Loading from '../../common/Loading';
import { ApiRequest } from '../../common/ApiRequest';
import ApiPath from '../../common/ApiPath';
import { checkNullOrBlank } from '../../common/CommonValidation';
import CommonMessage from '../../common/CommonMessage';
import ResumeConfirmMessage from '../../common/ResumeConfirmMessage';
import { useTranslation } from "react-i18next";
import PermissionCheck from "../../common/permission-check/PermissionCheck";
import { specificPermission } from "../../common/specific-permission/SpecificPermission";


/**
 * Main Component
 * @author phyoewaiaung
 * @create 01/25/2023
 */
const EmpRoleRegistrationIndex = () => {
  const { t } = useTranslation();
  let customer_name = window.location.href.split("/")[3];
  const [loginId, setLoginId] = useState(localStorage.getItem(`${customer_name}_LOGIN_ID`));
  const [error, setError] = useState([]); // for Error Array messages
  const [success, setSuccess] = useState([]); // for success messages
  const [loading, setLoading] = useState(false); // for loading condition (true,false)
  const [empId, setEmpId] = useState(""); // for employee id
  const [empIdData, setEmpIdData] = useState([]); // for employee id
  const [empCode, setEmpCode] = useState(""); // for employee code
  const [empCodeData, setEmpCodeData] = useState([]); // for employee code
  const [empName, setEmpName] = useState(""); // for employee name
  const [empNameData, setEmpNameData] = useState([]); // for employee name
  const [deptId, setDeptId] = useState(""); // for department id
  const [postId, setPostId] = useState(""); // for position id
  const [roleId, setRoleId] = useState(""); // for role name
  const [deptData, setDeptData] = useState([]); // for departments array
  const [postData, setPostData] = useState([]); // for positions array
  const [roleData, setRoleData] = useState([]); // for roles array
  const [totalRow, setTotalRow] = useState(5); // for total row
  const [currentPage, setCurrentPage] = useState(); // current page for pagination
  const [lastPage, setLastPage] = useState(); // last page for pagination
  const [pageStart, setPageStart] = useState(); //for get start page
  const [pageEnd, setPageEnd] = useState(); //for get end page
  const [paginateArr, setPaginateArr] = useState([]); //for paginate array
  const [selectPaginateValue, setSelectPaginateValue] = useState(10); //for get selected role
  const [allCheck, setAllCheck] = useState(false); // for all check box (true,false)
  const [mainTable, setMainTable] = useState([]); // for employee table data array
  const [perPage, setPerPage] = useState(""); // for per page
  const [confirmShow, setConfirmShow] = useState(false); // confirmation box show
  const [confirmType, setConfirmType] = useState(""); // confirmation box type
  const [confirmHeader, setConfirmHeader] = useState(""); //for confirm header
  const [confirmContent, setConfirmContent] = useState(""); //for confirm content
  const [contentOK, setContentOk] = useState(""); //for ok button of comfirm box
  const [empIdArr, setEmpIdArr] = useState([]); // for selected empid array
  const [loginPermission, setLoginPermission] = useState([]);


  useEffect(() => {
    (async () => {
      setLoading(true);
      await PermissionCheck(); // check form permission
      let loginData = {
        login_id: loginId,
      }
      let permit = await specificPermission("Employee Role Registration", loginData);
      Promise.all([permit]).then((values) => {
        permit = values[0];
        setLoginPermission(permit);
      });

      await deptFormLoad();
      await positionFormLoad();
      await roleFormLoad();

      setLoading(false);
    })();
  }, [])

  /** Start auto complete */
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      let obj = {
        package_name: "erp",
        url: ApiPath.ERPIdAutoComplete,
        method: "post",
        params: {
          search_item: empId,
        },
      };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setError(response.message);
        setEmpId("");
        setEmpName("");
        setEmpCode("");
      } else {
        setEmpIdData(response.data.data);
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [empId]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      let obj = {
        package_name: "erp",
        url: ApiPath.ERPCodeAutoComplete,
        method: "post",
        params: {
          search_item: empCode,
        },
      };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setError(response.message);
        setEmpId("");
        setEmpName("");
        setEmpCode("");
      } else {
        setEmpCodeData(response.data.data);
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [empCode]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
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
        setError(response.message);
        setEmpId("");
        setEmpName("");
        setEmpCode("");
      } else {
        setEmpNameData(response.data.data);
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [empName]);

  /** select autocomplete result */
  const selectAutocomplete = async (val, obj) => {
    let object = {
      package_name: "erp",
      url: ApiPath.ERPAutoCompleteResult,
      method: "post",
      params: {
        id: obj.id,
      },
    };
    let response = await ApiRequest(object);
    if (response.flag === false) {
      setError(response.message);
    } else {
      if (response.data.data[0].employee_id !== null) {
        setEmpId(response.data.data[0].employee_id);
      } else {
        setEmpId("");
      }
      if (response.data.data[0].name !== null) {
        setEmpName(response.data.data[0].name);
      } else {
        setEmpName("");
      }
      if (response.data.data[0].employee_code !== null) {
        setEmpCode(response.data.data[0].employee_code);
      } else {
        setEmpCode("");
      }
    }
  };
  /**End autocomplete */

  /*** for emp id change function */
  let empIdChange = (e) => {
    setEmpId(e.target.value);
    setEmpCode("");
    setEmpName("");
  };

  /*** for emp code change function */
  let empCodeChange = (e) => {
    setEmpId("");
    setEmpCode(e.target.value);
    setEmpName("");
  };

  /*** for emp name change function */
  let empNameChange = (e) => {
    setEmpId("");
    setEmpCode("");
    setEmpName(e.target.value);
  };

  /*** Get All Departments */
  let deptFormLoad = async () => {
    setError([]);
    setSuccess([]);
    let job_form_load = {
      method: "get",
      package_name: "erp",
      url: ApiPath.ERPDepartment,
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
        setDeptData(response.data.data);
        setError([]); setSuccess([]);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
  };

  /*** Get All Positions */
  let positionFormLoad = async () => {
    setError([]);
    setSuccess([]);
    let job_form_load = {
      method: "get",
      package_name: "erp",
      url: ApiPath.ERPPosition,
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
        setPostData(response.data.data);
        setError([]); setSuccess([]);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
  };

  /*** Get All Roles */
  let roleFormLoad = async () => {
    setError([]);
    setSuccess([]);
    let job_form_load = {
      method: "get",
      url: ApiPath.getAllRole,
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
        setRoleData(response.data.data);
        setError([]); setSuccess([]);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
  };

  /*** department select change function */
  const deptIdChange = async (e) => {
    setDeptId(e.target.value);

    setError([]);
    setSuccess([]);
    setLoading(true);
    if (e.target.value != "") {
      let job_form_load = {
        method: "get",
        package_name: "erp",

        url: ApiPath.ERPDeptPost + `/${e.target.value}`,
        params: {
          login_id: loginId,
        },
      };
      let response = await ApiRequest(job_form_load);
      setLoading(false);
      if (response.flag === false) {
        setPostData([]);
        setSuccess([]);
        setError(response.message);
      } else {
        setError([]); setSuccess([]);
        setPostData(response.data[0].positions);
      }
    } else {
      await positionFormLoad();
      setLoading(false);
    }
  }

  /*** position select change function */
  const postIdChange = (e) => {
    setPostId(e.target.value);
  }

  /*** search employee  */
  let searchClick = async (per_page, page = 1) => {
    setError([]); setAllCheck(false);
    setSuccess([]);
    setLoading(true);
    let obj = {
      method: "get",
      url: ApiPath.EmpRoleSearch + `?page=${page}`,
      params: {
        login_id: loginId,
        department_id: deptId,
        position_id: postId,
        employee_code: empCode,
        employee_id: empId,
        employee_name: empName,
        per_page: per_page == "" || per_page == null ? perPage : per_page
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      setMainTable([]);
    } else {
      if (response.data.status === "OK") {
        setTotalRow(response.data.data.total);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setPageStart(response.data.data.from);
        setPageEnd(response.data.data.to);
        setMainTable(response.data.data.data);
        let temp_total = Math.floor(response.data.data.total / 10);
        if (temp_total >= 5) {
          setPaginateArr([10, 20, 30, 40, 50]);
        } else if (temp_total == 4) {
          setPaginateArr([10, 20, 30, 40]);
        } else if (temp_total == 3) {
          setPaginateArr([10, 20, 30]);
        } else if (temp_total == 2) {
          setPaginateArr([10, 20]);
        } else if (temp_total == 1 || temp_total == 0 || temp_total == "" || temp_total == null) {
          setPaginateArr([10]);
        }
        setError([]); setSuccess([]);
      } else {
        setSuccess([]);
        setError([response.data.message]);
        setMainTable([]);
      }
    }
  }

  /*** search employee without success, error message */
  let tempSearch = async (per_page, page = 1) => {
    let obj = {
      method: "get",
      url: ApiPath.EmpRoleSearch + `?page=${page}`,
      params: {
        login_id: loginId,
        department_id: deptId,
        position_id: postId,
        employee_code: empCode,
        employee_id: empId,
        employee_name: empName,
        per_page: per_page == "" || per_page == null ? perPage : per_page
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setMainTable([]);
    } else {
      if (response.data.status === "OK") {
        setTotalRow(response.data.data.total);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setPageStart(response.data.data.from);
        setPageEnd(response.data.data.to);
        setMainTable(response.data.data.data);
        let temp_total = Math.floor(response.data.data.total / 10);
        if (temp_total >= 5) {
          setPaginateArr([10, 20, 30, 40, 50]);
        }
        if (temp_total == 4) {
          setPaginateArr([10, 20, 30, 40]);
        } else if (temp_total == 3) {
          setPaginateArr([10, 20, 30]);
        } else if (temp_total == 2) {
          setPaginateArr([10, 20]);
        } else if (temp_total == 1 || temp_total == 0 || temp_total == "" || temp_total == null) {
          setPaginateArr([10]);
        }
      } else {
        setMainTable([]);
      }
    }
  }

  /*** role name onChange function */
  const roleNameChange = (e) => {
    setRoleId(e.target.value);
  }

  /*** save button */
  let saveClick = async () => {
    setError([]); setSuccess([]); setEmpIdArr([]);
    let id_array = [];
    let err = [];
    mainTable.map(d => {
      if (d.isChecked == true) {
        return id_array.push(d.employee_id);
      }
    })
    setEmpIdArr(id_array);

    if (id_array.length == 0) {
      err.push(t(CommonMessage.JSE001).replace("%s", t("at least one employee")));
    }

    if (!checkNullOrBlank(roleId)) {
      err.push(t(CommonMessage.JSE019).replace("%s", t("Role Name")));
    }

    if (err.length > 0) {
      setError(err);
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      setConfirmShow(true);
      setConfirmHeader(`<h5 style='color:#4e57aa'>${t('Save Confirmation')}</h5>`);
      setConfirmContent(`<p>${t('Are you sure want to save?')}</p>`);
      setConfirmType("save");
      setContentOk(t("Yes"));
    }
  }
  /*** save employee role data in database */
  const saveOK = async () => {
    setConfirmShow(false);
    setError([]);
    setSuccess([]);
    setLoading(true);
    let obj = {
      method: "post",
      url: ApiPath.EmpRoleSave,
      params: {
        login_id: loginId,
        employee_id: empIdArr,
        role_id: roleId
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      if (response.data.status === "OK") {
        setRoleId("");
        setAllCheck(false);
        mainTable.map((data) => {
          return data.isChecked = false;
        });
        setSuccess([response.data.message]);
        setError([]);
        setTimeout(() => {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        }, 300)
        tempSearch(selectPaginateValue, currentPage);
      } else {
        setSuccess([]);
        setError([response.data.message]);
        setTimeout(() => {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        }, 300)
      }
    } else {
      if (response.data.data.over_write) {
        setConfirmShow(true);
        setConfirmHeader(`<h5 style='color:#4e57aa'>${t('Update Confirmation')}</h5>`);
        setConfirmContent(`<p>${t('Data is already exist! Are you sure want to overwrite?')}</p>`);
        setConfirmType("update");
        setContentOk(t("Yes"));
      } else {
        setSuccess([]);
        setError(response.message);
        setMainTable([]);
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
  }

  /*** update employee role data in database */
  const updateOK = async () => {
    setConfirmShow(false);
    setError([]); setSuccess([]);
    setLoading(true);
    let obj = {
      method: "post",
      url: ApiPath.EmpRoleOverwrite,
      params: {
        login_id: loginId,
        employee_id: empIdArr,
        role_id: roleId
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      setTimeout(() => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      }, 300)
    } else {
      if (response.data.status === "OK") {
        setRoleId("");
        setAllCheck(false);
        mainTable.map((data) => {
          return data.isChecked = false;
        });
        setSuccess([response.data.message]);
        setError([]);
        setTimeout(() => {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        }, 300)
        tempSearch(selectPaginateValue, currentPage);
      } else {
        setSuccess([]);
        setError([response.data.message]);
        setTimeout(() => {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        }, 300)
      }
    }
  }

  /*** Delete button */
  let deleteClick = () => {
    setError([]); setSuccess([]); setEmpIdArr([]);
    let id_array = [];
    let err = [];
    mainTable.map(d => {
      if (d.isChecked == true) {
        return id_array.push(d.employee_id);
      }
    })
    setEmpIdArr(id_array);

    if (id_array.length == 0) {
      err.push(t(CommonMessage.JSE001).replace("%s", t("at least one employee")));
    }

    if (err.length > 0) {
      setError(err);
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      setConfirmShow(true);
      setConfirmHeader(`<h5 style='color:red'>${t('Delete Confirmation')}</h5>`);
      setConfirmContent(`<p>${t('Are you sure want to delete?')}</p>`);
      setConfirmType("delete");
      setContentOk(t("Delete"));
    }
  }

  /*** delete employee role data in database */
  const deleteOK = async () => {
    setConfirmShow(false);
    setError([]); setSuccess([]);
    setLoading(true);
    let obj = {
      method: "delete",
      url: ApiPath.EmpRoleDelete,
      params: {
        login_id: loginId,
        employee_id: empIdArr
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      setTimeout(() => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      }, 300)
    } else {
      if (response.data.status === "OK") {
        setAllCheck(false);
        mainTable.map((data) => {
          return data.isChecked = false;
        });
        setSuccess([response.data.message]);
        setError([]);
        setTimeout(() => {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        }, 300)
        tempSearch(selectPaginateValue, currentPage);
      } else {
        setSuccess([]);
        setError([response.data.message]);
        setTimeout(() => {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        }, 300)
      }
    }
  }

  /*** click paginate function */
  const setActivePage = (page) => {
    setSuccess([]);
    setError([]);
    searchClick(selectPaginateValue, page);
  };

  /*** paginate dropdown onChange */
  const selectPaginateOnChange = (e) => {
    setPerPage(e.target.value);
    setSelectPaginateValue(e.target.value);
    searchClick(e.target.value, currentPage);
  };

  //main Check box change function
  let mainCheckboxChange = () => {
    setAllCheck(!allCheck);
    let data = mainTable.map((data) => {
      data.isChecked = !allCheck;
      return data;
    });
    setMainTable(data);
  };

  //sub check box change function
  let subCheckboxChange = (id) => {
    let flg = true;
    let data = mainTable.map((data) => {
      if (data.employee_id == id) {
        data.isChecked = !data.isChecked;
        return data;
      }
      return data;
    });

    data.forEach((item) => {
      if (item.isChecked == false) {
        flg = false;
      }
    });
    setAllCheck(flg);
    setMainTable(data);
  };

  return (
    <>
      <SuccessError error={error} success={success} />
      <Loading start={loading} />
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
      <CRow>
        <CCol xs="12">
          <CCard style={{ background: "#eff1fe", borderRadius: "1rem" }}>
            <CCardHeader className='emp-role-header'>
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
                    {t("Employee Role Registration")}
                  </h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <EmpRoleRegistrationForm
                empId={empId}
                empIdChange={empIdChange}
                empCode={empCode}
                empCodeChange={empCodeChange}
                empName={empName}
                empNameChange={empNameChange}
                deptData={deptData}
                postData={postData}
                deptId={deptId}
                deptIdChange={deptIdChange}
                postId={postId}
                postIdChange={postIdChange}
                selectAutocomplete={selectAutocomplete}
                empIdData={empIdData}
                empCodeData={empCodeData}
                empNameData={empNameData}
                searchClick={() => searchClick()}
                loginPermission={loginPermission}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12">
          <EmpRoleListTable
            mainTable={mainTable}
            total={totalRow}
            currentPage={currentPage}
            lastPage={lastPage}
            setActivePage={setActivePage}
            paginateArr={paginateArr}
            selectPaginateOnChange={selectPaginateOnChange}
            selectPaginateValue={selectPaginateValue}
            pageStart={pageStart}
            pageEnd={pageEnd}
            mainCheckboxChange={mainCheckboxChange}
            subCheckboxChange={subCheckboxChange}
            allCheck={allCheck}
          />
        </CCol>
      </CRow>
      {mainTable.length > 0 &&
        <CRow>
          <CCol xs="12">
            <CCard className="p-3" style={{ background: "#eff1fe", borderRadius: "1rem", overflow: "hidden" }}>
              <CRow>
                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="11">
                      <CLabel className="required" style={{ fontWeight: "bold", color: "#2f302f" }}>
                        {t("Role Name")}
                      </CLabel>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="10">
                      <CSelect
                        className="input-field-blue-background "
                        style={{ borderBottom: "1px solid", height: "40px" }}
                        onChange={roleNameChange}
                        value={roleId}
                      >
                        <option value="">{t("---Select Role Name---")}</option>

                        {roleData.length > 0 &&
                          roleData.map((data, index) => {
                            return (
                              <option key={index} value={data.id}>
                                {data.name}
                              </option>
                            );
                          })}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow style={{ justifyContent: "center", marginTop: "30px" }}>
                {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Save")) ?
                  <CButton
                    className="btn-create btn-add"
                    onClick={saveClick}
                    style={{ marginRight: '15px' }}
                  >
                    {t("Save")}
                  </CButton> : ""
                }
                {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Delete")) ?
                  <CButton
                    className="created-btn btn-add"
                    onClick={deleteClick}
                  >
                    {t("Delete")}
                  </CButton> : ""
                }
              </CRow>
            </CCard>
          </CCol>
        </CRow>
      }
    </>
  )
}

export default EmpRoleRegistrationIndex
