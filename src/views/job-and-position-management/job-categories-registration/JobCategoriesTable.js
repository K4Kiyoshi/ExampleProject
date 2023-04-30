/**  Job Categories Table
 * @author yamin zaw
 */
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
  CTooltip
} from "@coreui/react";
import { useTranslation } from "react-i18next";

const JobCategoriesTable = (props) => {
  let {
    loginPermission,
    search,
    categoryNameSearch,
    handleChangeSearchCategoryName,
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
  } = props;

  const { t } = useTranslation();

  return (
    <>
      <CRow className="rowCategory">
        <CCol lg="6">
          <CRow>
            <CCol lg="1" style={{ maxWidth: "8%" }}></CCol>
            <CCol lg="11">
              <CLabel>
                {t("Search Job Category")}
              </CLabel>
            </CCol>
          </CRow>
          <CRow>
            <CCol lg="1" style={{ maxWidth: "8%" }}></CCol>
            <CCol lg="8">
              <CInput
                className="input-field"
                placeholder="Enter Category Name"
                type="text"
                value={categoryNameSearch}
                onChange={(e) => handleChangeSearchCategoryName(e)}
                style={{ marginBottom: "10px" }}
              />
            </CCol>
            <CCol lg="3">
              {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Search")) && (
                <CButton
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
      {mainTable.length > 0 && (
        <>
          <div className="templateList-bg">
            <div className="template-list-heading mr-3">
              <h5
                className="font-weight-bold responsive-list-heading-font"
                style={{ marginLeft: "17px" }}
              >
                {t("Job Category Table")}
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
            <div className="overflow-style">
              <table className="main-table templateList-table position-table">
                <thead className="text-center">
                  <tr>
                    <th style={{ width: 70 }}>{t("No")}</th>
                    <th style={{ width: 700 }}>{t("Categories Name")}</th>
                    {(loginPermission && loginPermission.length > 0 && (loginPermission.includes("Edit") || loginPermission.includes("Delete"))) && (
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
                        <tr key={index} className="row-height">
                          <td style={{ width: 70 }}>
                            {parseInt(indexNumber) + index + 1}
                          </td>
                          <td style={{ width: 700 }}>{data.category_name}</td>
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
        </>
      )}
    </>
  );
};

export default JobCategoriesTable;
