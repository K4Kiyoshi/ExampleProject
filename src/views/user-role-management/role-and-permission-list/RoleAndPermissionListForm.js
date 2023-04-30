import React from "react";
import {
  CRow,
  CCol,
  CLabel,
  CInput,
  CButton,
  CImg,
  CPagination,
  CSelect,
  CTooltip,
} from "@coreui/react";
import { useTranslation } from "react-i18next";

const RoleAndPermissionRegisterListForm = (props) => {
  const { t } = useTranslation();
  let {
    rolePermission,
    search,
    roleName,
    handleChangeSearchRoleName,
    mainTable,
    deleteClick,
    editClick,
    indexNumber,
    total,
    currentPage,
    lastPage,
    setActivePage,
    paginateArr,
    selectPaginateOnChange,
    selectPaginateValue,
    pageStart,
    pageEnd,
    linkClick,
    loginPermission,
  } = props;
  return (
    <>
      <CRow className="permission-category">
        <CCol lg="6">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="11">
              <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                {t("Search Role")}
              </p>
            </CCol>
          </CRow>
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="8">
              <CInput
                className="input-field-blue-background"
                placeholder={t("Enter Role")}
                type="text"
                value={roleName}
                onChange={(e) => handleChangeSearchRoleName(e)}
                style={{ marginBottom: "10px" }}
              />
            </CCol>
            <CCol lg="3">
              {loginPermission &&
                loginPermission.length > 0 &&
                loginPermission.includes("Search") && (
                  <CButton
                    type="button"
                    className="btn-create btn-add"
                    onClick={search}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    {t("Search")}
                  </CButton>
                )}
            </CCol>
          </CRow>
        </CCol>
      </CRow>

      <br></br>
      {mainTable.length > 0 && (
        <>
          <div className="templateList-bg">
            <div className="template-list-heading mr-3">
              <h5
                className="font-weight-bold responsive-list-heading-font"
                style={{ marginLeft: "17px" }}
              >
                {t("Role & Permission List Table")}
              </h5>
              <div style={{ display: "flex" }}>
                <p
                  className="font-weight-bold"
                  style={{ paddingRight: "10px" }}
                >
                  <span className="hideRow">{t("Total Row")}:</span> {total}{" "}
                  {t("row(s)")}
                </p>
              </div>
            </div>
            <div className="overflow-style">
              <table className="templateList-table position-table autocomplete-table">
                <thead className="text-center">
                  <tr>
                    <th style={{ width: 70 }}>{t("No")}</th>
                    <th style={{ width: 160 }}>{t("User Role")}</th>
                    {loginPermission &&
                      loginPermission.length > 0 &&
                      loginPermission.includes("Detail") && (
                        <th style={{ width: 600 }}>{t("Action Name")}</th>
                      )}
                    {loginPermission &&
                      loginPermission.length > 0 &&
                      (loginPermission.includes("Edit") ||
                        loginPermission.includes("Delete")) && (
                        <th style={{ width: 160 }} colSpan="2">
                          {t("Action")}
                        </th>
                      )}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {mainTable.length > 0 &&
                    mainTable.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ width: 70 }} className="row-height">
                            {parseInt(indexNumber) + index + 1}
                          </td>
                          <td style={{ width: 100 }} className="row-height">
                            {data.name}{" "}
                          </td>
                          {loginPermission &&
                            loginPermission.length > 0 &&
                            loginPermission.includes("Detail") && (
                              <td
                                style={{ width: 600 }}
                                className="row-height linkTxT"
                                onClick={() => {
                                  linkClick(data.id);
                                }}
                              >
                                {t("Go to detail action name")}
                              </td>
                            )}
                          {loginPermission &&
                            loginPermission.length > 0 &&
                            loginPermission.includes("Edit") && (
                              <td style={{ width: 80 }} className="row-height">
                                <div className="user-before">
                                  <CImg
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/image/Edit-List.svg"
                                    }
                                    onClick={() => {
                                      editClick(data.id);
                                    }}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      cursor: "pointer",
                                    }}
                                  ></CImg>
                                  <CTooltip content={t("Edit")} placement="top">
                                    <CImg
                                      className="user-after"
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/image/Edit Hover.svg"
                                      }
                                      onClick={() => {
                                        editClick(data.id);
                                      }}
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        cursor: "pointer",
                                      }}
                                    ></CImg>
                                  </CTooltip>
                                </div>

                                {rolePermission == 2 && (
                                  <td style={{ width: 40 }}>
                                    <CImg
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/image/Edit_disable_Component.svg"
                                      }
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        cursor: "not-allowed",
                                      }}
                                    ></CImg>
                                  </td>
                                )}
                              </td>
                            )}
                          {loginPermission &&
                            loginPermission.length > 0 &&
                            loginPermission.includes("Delete") && (
                              <td style={{ width: 80 }}>
                                <div className="user-before">
                                  <CImg
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/image/Delete List.svg"
                                    }
                                    onClick={() => deleteClick(data.id)}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      cursor: "pointer",
                                    }}
                                  ></CImg>
                                  <CTooltip
                                    content={t("Delete")}
                                    placement="top"
                                  >
                                    <CImg
                                      className="user-after"
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/image/Delete Hover.svg"
                                      }
                                      onClick={() => deleteClick(data.id)}
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        cursor: "pointer",
                                      }}
                                    ></CImg>
                                  </CTooltip>
                                </div>

                                {rolePermission == 2 && (
                                  <td style={{ width: 40 }}>
                                    <CImg
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/image/Delete disable Component.svg"
                                      }
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        cursor: "not-allowed",
                                      }}
                                    ></CImg>
                                  </td>
                                )}
                              </td>
                            )}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          <br></br>
          <div>
            {total > 10 && (
              <CRow alignHorizontal="end" className="mt-3">
                <CCol lg="4" style={{ display: "flex" }}>
                  <CLabel style={{ marginTop: "10px", paddingRight: "10px" }}>
                    Row Per Page
                  </CLabel>
                  <CSelect
                    style={{ width: "65px" }}
                    value={selectPaginateValue}
                    onChange={selectPaginateOnChange}
                  >
                    <option value="">--</option>
                    {paginateArr.map((data, index) => {
                      return (
                        <option key={index} value={data}>
                          {data}
                        </option>
                      );
                    })}
                  </CSelect>
                </CCol>
                <CCol lg="2">
                  <p style={{ marginTop: "10px" }}>
                    {pageStart}-{pageEnd} of {total}
                  </p>
                </CCol>
                <CPagination
                  activePage={currentPage}
                  pages={lastPage}
                  dots={false}
                  arrows={false}
                  align="center"
                  firstButton={
                    <CImg
                      className="user-after"
                      src={process.env.PUBLIC_URL + "/image/previous.svg"}
                      style={{
                        width: "18px",
                        height: "15px",
                        cursor: "pointer",
                      }}
                    ></CImg>
                  }
                  lastButton={
                    <CImg
                      className="user-after"
                      src={process.env.PUBLIC_URL + "/image/Next.svg"}
                      style={{
                        width: "18px",
                        height: "15px",
                        cursor: "pointer",
                      }}
                    ></CImg>
                  }
                  onActivePageChange={(i) => setActivePage(i)}
                ></CPagination>
              </CRow>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default RoleAndPermissionRegisterListForm;
