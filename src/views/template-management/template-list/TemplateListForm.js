import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  CButton,
  CRow,
  CCard,
  CCardBody,
  CImg,
  CPagination,
  CLink,
  CInput,
  CSpinner,
  CTooltip,
  CSelect,
  CLabel,
  CCardHeader,
  CCol,
} from "@coreui/react";
import SuccessError from "../../common/SuccessError";
import moment from "moment";
import { useTranslation } from "react-i18next";

const TemplateListForm = (props) => {
  const { t } = useTranslation();
  let {
    error,
    success,
    inputChange,
    mainTable,
    totalRows,
    currentPage,
    lastPage,
    setActivePage,
    copyLinkClick,
    viewClick,
    editClick,
    deleteClick,
    searchClick,
    indexNumber,
    clickCopyLink,
    copied,
    activeClick,
    inActiveClick,
    activeChange,
    selectJobCategory,
    selectCategoryOnChange,
    selectCategoryValue,
    selectedStartDate,
    selectedEndDate,
    setSelectedStartDate,
    setSelectedEndDate,
    jobOpenClick,
    selectPosition,
    selectPositionOnChange,
    selectPositionValue,
    paginateArr,
    selectPaginateOnChange,
    selectPaginateValue,
    pageStart,
    pageEnd,
    changeStatus,
    selectPositionChange,
    copyClick,
    searchData,
    loginPermission
  } = props;
  return (
    <>
      <SuccessError success={success} error={error} />
      <CCard
        style={{
          background: "#eff1fe",
          paddingBottom: "30px",
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      >
        <CCardHeader style={{ backgroundColor: "#eff1fe" }}>
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
                {t("Template List")}
              </h3>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>

          <CRow style={{ marginBottom: "30px" }}>
            <CCol lg="6">
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="11">
                  <CLabel>
                    {t("Job Category Name")}
                  </CLabel>
                </CCol>
              </CRow>

              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="10">
                  <CSelect
                    className="input-field-blue-background"
                    value={selectCategoryValue}
                    onChange={selectCategoryOnChange}
                  >
                    <option value="">{t("---Select Job Category---")}</option>
                    {selectJobCategory.length > 0 &&
                      selectJobCategory.map((data, index) => {
                        return (
                          <option key={index} value={data.id}>
                            {data.category_name}
                          </option>
                        );
                      })}
                  </CSelect>
                </CCol>
                <CCol lg="1"></CCol>
              </CRow>
            </CCol>

            <CCol lg="6">
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="11">
                  <CLabel>
                    {t("Position Name")}
                  </CLabel>
                </CCol>
              </CRow>
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="10">
                  <CSelect
                    className="input-field-blue-background"
                    value={selectPositionValue}
                    onChange={selectPositionOnChange}
                  >
                    <option value="">{t("---Select Position---")}</option>
                    {changeStatus == false && (
                      <>
                        {selectPosition.length > 0 &&
                          selectPosition.map((data, index) => {
                            return (
                              <option key={index} value={data.id}>
                                {data.position_name}
                              </option>
                            );
                          })}
                      </>
                    )}
                    {changeStatus == true && (
                      <>
                        {selectPositionChange.length > 0 &&
                          selectPositionChange.map((data, index) => {
                            return (
                              <option key={index} value={data.position_id}>
                                {data.position_name}
                              </option>
                            );
                          })}
                      </>
                    )}
                  </CSelect>

                </CCol>
                <CCol lg="1"></CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow style={{ marginBottom: "30px" }}>
            <CCol lg="6">
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="11">
                  <CLabel>
                    {t("Job Open Date")}
                  </CLabel>
                </CCol>
              </CRow>

              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="10">
                  <MuiPickersUtilsProvider utils={DateFnsUtils} libInstance={moment}>
                    <KeyboardDatePicker
                      InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                      }}
                      clearable
                      placeholder="yyyy/mm/dd"
                      value={
                        selectedStartDate == "" ||
                          selectedStartDate == null
                          ? null
                          : selectedStartDate
                      }
                      onChange={setSelectedStartDate}
                      format="yyyy/MM/dd"
                      style={{
                        borderRadius: "5px",
                        overflow: "hidden",
                        borderBottom: "1px solid",
                        width: "100%",
                      }}
                      className="input-field-blue-background"
                    />
                  </MuiPickersUtilsProvider>
                </CCol>
                <CCol lg="1"></CCol>
              </CRow>
            </CCol>

            <CCol lg="6">
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="11">
                  <CLabel>
                    {t("Job Close Date")}
                  </CLabel>
                </CCol>
              </CRow>
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="10">
                  <MuiPickersUtilsProvider utils={DateFnsUtils} libInstance={moment}>
                    <KeyboardDatePicker
                      InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                      }}
                      clearable
                      placeholder="yyyy/mm/dd"
                      value={
                        selectedEndDate == "" ||
                          selectedEndDate == null
                          ? null
                          : selectedEndDate
                      }
                      onChange={setSelectedEndDate}
                      format="yyyy/MM/dd"
                      style={{
                        borderRadius: "5px",
                        overflow: "hidden",
                        borderBottom: "1px solid",
                        width: "100%",
                      }}
                      className="input-field-blue-background"
                    />
                  </MuiPickersUtilsProvider>
                </CCol>
                <CCol lg="1"></CCol>
              </CRow>
            </CCol>
          </CRow>

          <CRow style={{ marginBottom: "30px" }}>
            <CCol lg="6">
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="11">
                  <CLabel>
                    {t("Resume Title")}
                  </CLabel>
                </CCol>
              </CRow>

              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="10">
                  <CInput
                    className="input-field-blue-background "
                    placeholder={t("Enter Resume Title")}
                    type="text"
                    onChange={inputChange}
                    value={searchData}
                  />
                </CCol>
                <CCol lg="1"></CCol>
              </CRow>
            </CCol>

            <CCol lg="6">
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="11">
                  <CLabel>
                    {t("Resume Status")}
                  </CLabel>
                </CCol>
              </CRow>
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="10">
                  <CSelect
                    className="input-field-blue-background"
                    onChange={activeChange}
                  >
                    <option value="">{t("All")}</option>
                    <option value="1">{t("Active")}</option>
                    <option value="0">{t("Inactive")}</option>
                  </CSelect>
                </CCol>
                <CCol lg="1"></CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow style={{ marginBottom: "45px", justifyContent: "center", marginTop: "10px" }}>
            {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Search")) && (
              <CButton
                className="btn-create btn-add"
                onClick={searchClick}
              >
                {t("Search")}
              </CButton>
            )}
          </CRow>
          {mainTable.length > 0 && (
            <div className="templateList-bg">
              <div className="template-list-heading mr-3">
                <h5 className="font-weight-bold responsive-list-heading-font" style={{ marginLeft: "17px" }}>
                  {t("Template List Table")}
                </h5>
                <p className="font-weight-bold">
                  <span className="hideRow">{t("Total Row")}:</span> {totalRows} {t("row(s)")}
                </p>
              </div>
              <div className="overflow-style">
                <table className="main-table templateList-table border-change-table template-width-table">
                  <thead className="text-center">
                    <tr>
                      <th style={{ width: 30 }} rowSpan="2">
                        {t("No")}
                      </th>
                      <th style={{ width: 250 }} rowSpan="2">
                        {t("Title")}
                      </th>
                      <th style={{ width: 200 }} rowSpan="2">
                        {t("Job Category")}
                      </th>
                      <th style={{ width: 200 }} rowSpan="2">
                        {t("Position")}
                      </th>
                      <th style={{ width: 160 }} rowSpan="2">
                        {t("Applied Job Link")}
                      </th>
                      <th style={{ width: 160 }} rowSpan="2">
                        {t("Job Open Date")}
                      </th>
                      <th style={{ width: 160 }} rowSpan="2">
                        {t("Job Close Date")}
                      </th>
                      <th style={{ width: 230 }} colSpan="6">
                        {t("Action")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {mainTable.length > 0 &&
                      mainTable.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {parseInt(indexNumber) + index + 1}
                            </td>
                            <td>{data.resume_title}</td>
                            <td>{data.category_name}</td>
                            <td>{data.position_name}</td>
                            <td>
                              {clickCopyLink == data.template_job_position_id && (
                                <CSpinner
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                  }}
                                  component="span"
                                  aria-hidden="true"
                                  color="primary"
                                />
                              )}
                              {(data.active_flag == 1 && (data.job_open_date != null && data.job_close_date != null)) && (
                                <CLink
                                  className="copyLink-style"
                                  onClick={() => {
                                    copyLinkClick(data.template_job_position_id, data.template_link);
                                  }}
                                >
                                  {clickCopyLink != data.template_job_position_id &&
                                    copied != data.template_job_position_id && (
                                      <>{t("Copy Link")}</>
                                    )}
                                </CLink>
                              )}
                              {(data.active_flag == 0 || (data.job_open_date == null && data.job_close_date == null)) && (
                                <CLink className="inactive-link">
                                  {clickCopyLink != data.template_job_position_id &&
                                    copied != data.template_job_position_id && (
                                      <>{t("Copy Link")}</>
                                    )}
                                </CLink>
                              )}
                              {copied == data.template_job_position_id && (
                                <span className="copied px-2 py-1">
                                  Link Copied
                                </span>
                              )}
                            </td>
                            <td>{data.job_open_date}</td>
                            <td>{data.job_close_date}</td>
                            {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Job Open")) && (
                              <td style={{paddingRight: "10px" }} >
                                <CLabel
                                  style={{ color: "#dc2454", textDecoration: "underline", marginTop: "4px", fontWeight: "normal" }}
                                  onClick={() => jobOpenClick(data.template_job_position_id, data.job_open_date, data.job_close_date, data.job_position_id)}>
                                  {t("Job Open")}
                                </CLabel>
                              </td>
                            )}
                            {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Active/Inactive")) && (
                              <td>
                                {data.active_flag == 1 && (
                                  <div className="user-before">
                                    <CImg
                                      src={process.env.PUBLIC_URL + "/image/Active.svg"}
                                      onClick={() =>
                                        activeClick(
                                          data.template_job_position_id,
                                          data.active_flag
                                        )
                                      }
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        cursor: "pointer",
                                      }}
                                    ></CImg>
                                    <>
                                      <CTooltip
                                        content={t("Active")}
                                        placement="top"
                                      >
                                        <CImg
                                          className="user-after"
                                          src={process.env.PUBLIC_URL + "/image/Active Hover.svg"}
                                          onClick={() =>
                                            activeClick(
                                              data.template_job_position_id,
                                              data.active_flag
                                            )
                                          }
                                          style={{
                                            width: "40px",
                                            height: "40px",
                                            cursor: "pointer",
                                          }}
                                        ></CImg>
                                      </CTooltip>
                                    </>
                                  </div>
                                )}
                                {data.active_flag == 0 && (
                                  <div className="user-before">
                                    <CImg
                                      src={process.env.PUBLIC_URL + "/image/Inactive.svg"}
                                      onClick={() =>
                                        inActiveClick(
                                          data.template_job_position_id,
                                          data.active_flag
                                        )
                                      }
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        cursor: "pointer",
                                      }}
                                    ></CImg>
                                    <CTooltip
                                      content={t("Inactive")}
                                      placement="top"
                                    >
                                      <CImg
                                        className="user-after"
                                        src={process.env.PUBLIC_URL + "/image/Inactive Hover.svg"}
                                        onClick={() =>
                                          inActiveClick(
                                            data.template_job_position_id,
                                            data.active_flag
                                          )
                                        }
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          cursor: "pointer",
                                        }}
                                      ></CImg>
                                    </CTooltip>
                                  </div>
                                )}
                              </td>
                            )}
                            {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Detail")) && (
                              <td>
                                <div className="user-before">
                                  <CImg
                                    src={process.env.PUBLIC_URL + "/image/Screen Resume.svg"}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      viewClick(data.template_job_position_id);
                                    }}
                                  ></CImg>
                                  <CImg
                                    className="user-after"
                                    src={process.env.PUBLIC_URL + "/image/Screen Resume Hover.svg"}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      viewClick(data.template_job_position_id);
                                    }}
                                  ></CImg>
                                </div>
                              </td>
                            )}
                            {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Copy Template")) && (
                              <td>
                                <div className="user-before">
                                  <CImg
                                    src={process.env.PUBLIC_URL + "/image/Copy List.svg"}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      copyClick(data.template_job_position_id);
                                    }}
                                  ></CImg>
                                  <CTooltip
                                    content={t("Copy")}
                                    placement="top"
                                  >
                                    <CImg
                                      className="user-after"
                                      src={process.env.PUBLIC_URL + "/image/Copy Hover List.svg"}
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        copyClick(data.template_job_position_id);
                                      }}
                                    ></CImg>
                                  </CTooltip>
                                </div>
                              </td>
                            )}
                            {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Edit")) && (
                              <td>
                                {data.active_flag == 1 && (
                                  <>
                                    {data.is_use === false && (
                                      <div className="user-before">
                                        <CImg
                                          src={process.env.PUBLIC_URL + "/image/Edit-List.svg"}
                                          onClick={() => {
                                            editClick(data.template_job_position_id);
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
                                              editClick(data.template_job_position_id);
                                            }}
                                            style={{
                                              width: "40px",
                                              height: "40px",
                                              cursor: "pointer",
                                            }}
                                          ></CImg>
                                        </CTooltip>

                                      </div>
                                    )}
                                    {data.is_use === true && (
                                      <CImg
                                        src={process.env.PUBLIC_URL + "/image/Edit_disable_Component.svg"}
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          cursor: "not-allowed",
                                        }}
                                      ></CImg>
                                    )}
                                  </>
                                )}
                                {data.active_flag == 0 && (
                                  <CImg
                                    src={process.env.PUBLIC_URL + "/image/Edit_disable_Component.svg"}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      cursor: "not-allowed",
                                    }}
                                  ></CImg>
                                )}
                              </td>
                            )}
                            {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Delete")) && (
                              <td>
                                {data.is_use === false && (
                                  <div className="user-before">
                                    <CImg
                                      src={process.env.PUBLIC_URL + "/image/Delete List.svg"}
                                      onClick={() =>
                                        deleteClick(data.template_job_position_id)
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
                                          deleteClick(data.template_job_position_id)
                                        }
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          cursor: "pointer",
                                        }}
                                      ></CImg>
                                    </CTooltip>
                                  </div>
                                )}
                                {data.is_use === true && (
                                  <CImg
                                    src={process.env.PUBLIC_URL + "/image/Delete Disable.svg"}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      cursor: "not-allowed",
                                    }}
                                  ></CImg>
                                )}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                {totalRows > 10 && (
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
                        {pageStart}-{pageEnd} of {totalRows}
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
            </div>
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default TemplateListForm;
