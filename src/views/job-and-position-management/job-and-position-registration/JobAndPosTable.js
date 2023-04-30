/**  Job and Position Table
 * @author yamin zaw
 */
import React from "react";
import {
  CRow,
  CCol,
  CLabel,
  CTooltip,
  CImg,
  CSelect,
  CPagination,
} from "@coreui/react";
import { useTranslation } from "react-i18next";

const JobAndPosTable = (props) => {
  let {
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
    loginPermission,
  } = props;

  const { t } = useTranslation();

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
                {t("Job And Position Table")}
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
              <table className="main-table templateList-table position-table">
                <thead className="text-center">
                  <tr>
                    <th style={{ width: 70 }}>{t("No")}</th>
                    <th style={{ width: 350 }}>{t("Category Name")}</th>
                    <th style={{ width: 350 }}>{t("Position Name")}</th>
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
                <tbody>
                  {mainTable.length > 0 &&
                    mainTable.map((data, index) => {
                      return (
                        <tr key={index} className="text-center row-height">
                          <td style={{ width: 70 }}>
                            {parseInt(indexNumber) + index + 1}
                          </td>
                          <td style={{ width: 700 }}>{data.category_name}</td>
                          <td style={{ width: 700 }}>{data.position_name}</td>
                          {loginPermission &&
                            loginPermission.length > 0 &&
                            loginPermission.includes("Edit") && (
                              <td style={{ width: 80 }}>
                                <div className="user-before">
                                  <CImg
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/image/Edit-List.svg"
                                    }
                                    onClick={() => {
                                      editClick(data.id,data.job_category_id,data.position_id);
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
                                        editClick(data.id,data.job_category_id,data.position_id);
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
                              </td>
                            )}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            {total > 10 && (
              <CRow alignHorizontal="end" className="mt-3">
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

export default JobAndPosTable;
