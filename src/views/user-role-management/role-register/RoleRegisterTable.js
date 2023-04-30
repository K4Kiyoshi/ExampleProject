/**
 * Role Registration
 * @author yaminzaw
 */
import React from "react";
import {
  CRow,
  CCol,
  CLabel,
  CInputRadio,
  CImg,
  CPagination,
  CSelect,
  CButton,
  CTooltip
} from "@coreui/react";
import { useTranslation } from "react-i18next";

const RoleRegisterTable = (props) => {
  const { t } = useTranslation();
  let {
    rolePermission,
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
    deleteRadio,
    deleteRadioId,
    clickDeleteRadio,
    deleteAllCLick,
    finalMainCheckboxChange,
    finalAllCheck,
    finalSubCheckboxChange,
    loginPermission
  } = props;

  return (
    <>
      {mainTable.length > 0 && (
        <>
          <div className="templateList-bg">
            <div className="template-list-heading mr-3">
              <h5
                className="font-weight-bold responsive-list-heading-font"
                style={{ marginLeft: "17px" }}
              >
                {t("Role Table")}
              </h5>
              <div style={{ display: "flex" }}>
                <p
                  className="font-weight-bold"
                  style={{ paddingRight: "10px" }}
                >
                  <span className="hideRow">{t("Total Row")}:</span> {total} {t("row(s)")}
                </p>
              </div>
            </div>
            <CRow>
              {deleteRadio.length > 0 &&
                deleteRadio.map((data, index) => {
                  return (
                    <CCol lg="2" key={index} style={{ marginLeft: "38px" }}>
                      <CInputRadio
                        id={`radio${index}`}
                        className="radio"
                        name={data.name}
                        value={data.id}
                        onChange={() => clickDeleteRadio(data)}
                        checked={deleteRadioId == data.id ? true : false}
                      />
                      <CLabel className="normal-label" htmlFor={`radio${index}`} >{t(data.name)}</CLabel>
                    </CCol>
                  )
                })}
            </CRow>
            <div className="overflow-style">
              <table className="main-table templateList-table position-table">
                <thead className="text-center">
                  <tr>
                    <th style={{ width: 20 }}>
                      <input
                        type="CheckBox"
                        onChange={finalMainCheckboxChange}
                        checked={finalAllCheck}
                        style={{
                          width: "17px",
                          height: "17px",
                          marginTop: "6px",
                        }}
                      />
                    </th>
                    <th style={{ width: 50 }}>{t("No")}</th>
                    <th style={{ width: 600 }}>{t("Role Name")}</th>
                    <th style={{ width: 600 }}>{t("Description")}</th>
                    <th style={{ width: 160 }} colSpan="2">
                      {t("Action")}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {mainTable.length > 0 &&
                    mainTable.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ width: 20 }} className="text-center">
                            <input
                              type="CheckBox"
                              checked={data.isChecked === true}
                              onChange={() =>
                                finalSubCheckboxChange(data.id)
                              }
                              style={{
                                width: "17px",
                                height: "17px",
                                marginTop: "6px",
                              }}
                            />
                          </td>
                          <td style={{ width: 50 }}>
                            {parseInt(indexNumber) + index + 1}
                          </td>
                          <td style={{ width: 600 }}>{data.name}</td>
                          <td style={{ width: 600 }}>{data.description}</td>
                          {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Edit")) && (
                            <td style={{ width: 80 }}>
                              <div className="user-before">
                                <CImg
                                  src={process.env.PUBLIC_URL + "/image/Edit-List.svg"}
                                  onClick={() => {
                                    editClick(data.id);
                                  }}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    cursor: "pointer",
                                  }}
                                ></CImg>
                                <CTooltip
                                  content={t("Edit")}
                                  placement="top"
                                >
                                  <CImg
                                    className="user-after"
                                    src={process.env.PUBLIC_URL + "/image/Edit Hover.svg"}
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
                            </td>
                          )}
                          {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Delete")) && (
                            <td style={{ width: 80 }}>
                              <div className="user-before">
                                <CImg
                                  src={process.env.PUBLIC_URL + "/image/Delete List.svg"}
                                  onClick={() =>
                                    deleteClick(data.id)
                                  }
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
                                    src={process.env.PUBLIC_URL + "/image/Delete Hover.svg"}
                                    onClick={() =>
                                      deleteClick(data.id)
                                    }
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      cursor: "pointer",
                                    }}
                                  ></CImg>
                                </CTooltip>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                </tbody>
              </table>

            </div>
            {total > 10 && (
              <CRow alignHorizontal="end" className="mt-4" style={{ paddingRight: "33px" }}>
                <CCol lg="4" style={{ display: "flex" }}>
                  <CLabel className="normal-label" style={{ marginTop: "10px", paddingRight: "10px" }}>
                    {t("Row Per Page")}
                  </CLabel>
                  <CSelect
                    style={{ width: "65px" }}
                    value={selectPaginateValue}
                    onChange={selectPaginateOnChange}
                  >
                    <option value="">--</option>
                    {paginateArr.length > 0 &&
                      paginateArr.map((data, index) => {
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
                  firstButton={<CImg
                    className="user-after"
                    src={process.env.PUBLIC_URL + "/image/previous.svg"}
                    style={{
                      width: "18px",
                      height: "15px",
                      cursor: "pointer",
                    }}
                  ></CImg>}
                  lastButton={<CImg
                    className="user-after"
                    src={process.env.PUBLIC_URL + "/image/Next.svg"}
                    style={{
                      width: "18px",
                      height: "15px",
                      cursor: "pointer",
                    }}
                  ></CImg>}
                  onActivePageChange={(i) => setActivePage(i)}
                ></CPagination>
              </CRow>
            )}
          </div>
          {deleteRadioId == 1 && (loginPermission && loginPermission.length > 0 && loginPermission.includes("Delete")) && (
            <div className="card-footer">
              {deleteRadioId == 1 &&
                <CRow style={{ marginTop: "20px" }}>
                  <CCol lg="10"></CCol>
                  <CCol lg="2" style={{ textAlign: "end" }}>
                    <CButton
                      className="created-btn btn-add"
                      onClick={deleteAllCLick}
                    >
                      {t("Delete")}
                    </CButton>
                  </CCol>
                </CRow>
              }
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RoleRegisterTable;
