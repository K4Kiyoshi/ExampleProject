/* eslint-disable jsx-a11y/alt-text */

/**
 * Applied Job Position Model
 *
 * @author YuwaKoKo
 *
 * @create 17/9/2022
 *
 */

import React from "react";
import {
  CCol,
  CImg,
  CRow,
  CTooltip,
  CLabel,
  CButton,
  CSelect,
  CPagination,
  CInputRadio,
} from "@coreui/react";
import { useTranslation } from "react-i18next";
const AppliedJobPositionTable = (props) => {
  const { t } = useTranslation();
  let {
    rolePermission,
    mainTable,
    clickLevel,
    deleteBtnShow,
    statusTmp,
    stateTmp,
    passClick,
    subCheckboxChange,
    mainCheckboxChange,
    allCheck,
    rejectClick,
    cancelClick,
    hireClick,
    approvalClick,
    offerClick,
    interviewClick,
    skillTestClick,
    failClick,
    deleteCLick,
    offerStaus,
    downloadClick,
    viewClick,
    indexNumber,
    checkApprover,
    deleteRadio,
    total,
    currentPage,
    lastPage,
    setActivePage,
    paginateArr,
    selectPaginateOnChange,
    selectPaginateValue,
    pageStart,
    pageEnd,
    approveClick,
    buttomShowCondition,
    shortListClick,
    onBoardStatus,
    onBoardClick,
    deleteRadioId,
    clickDeleteRadio,
    loginPermission,
  } = props;

  return (
    <>
      {mainTable.length > 0 && (
        <>
          <div className="templateList-bg">
            <div className="template-list-heading mr-3">
              <h5 className="font-weight-bold responsive-list-heading-font">
                &nbsp;&nbsp;
                {t("Job Applied List Table")}
              </h5>
              <p className="font-weight-bold">
                <span className="hideRow">{t("Total Row")}:</span> {total}{" "}
                {t("row(s)")}
              </p>
            </div>
            <CRow lg="12" style={{ padding: "8px" }}>
              {deleteRadio.map((data, index) => {
                return (
                  <CCol
                    lg="2"
                    key={index}
                    style={{ marginLeft: "38px", maxWidth: "13%" }}
                  >
                    <CInputRadio
                      id={`radio${index}`}
                      className="radio"
                      name={data.name}
                      value={data.id}
                      onChange={() => clickDeleteRadio(data)}
                      checked={deleteRadioId == data.id ? true : false}
                    />
                    <CLabel className="normal-label" htmlFor={`radio${index}`}>
                      {t(data.name)}
                    </CLabel>
                  </CCol>
                );
              })}
            </CRow>
            <div
              className="overflow-style"
              style={{
                maxHeight: "450px",
              }}
            >
              {mainTable.length > 0 && (
                <table className="templateList-table main-table checkbox-sticky ">
                  <thead className="text-center auto-fix-head">
                    <tr>
                      <th style={{ minWidth: "2rem" }}>
                        <input
                          type="CheckBox"
                          onChange={mainCheckboxChange}
                          style={{
                            width: "17px",
                            height: "17px",
                            marginTop: "4px",
                          }}
                          checked={allCheck}
                        />
                      </th>
                      <th style={{ minWidth: "2rem" }}>{t("No")}</th>
                      <th style={{ minWidth: "4rem" }}>{t("Profile")}</th>
                      <th style={{ minWidth: "3rem" }}>{t("Name")}</th>
                      <th style={{ minWidth: "5rem" }}>{t("Resume Title")}</th>
                      <th style={{ minWidth: "8rem" }}>{t("Job Category")}</th>
                      <th style={{ minWidth: "8rem" }}>{t("Position")}</th>
                      <th style={{ minWidth: "5rem" }}>
                        {t("Total Experience(Year)")}
                      </th>
                      <th style={{ minWidth: "8rem" }}>
                        {t("Expected Salary")}
                      </th>
                      <th style={{ minWidth: "5rem" }}>{t("Currency Type")}</th>
                      <th style={{ minWidth: "10rem" }}>{t("Email")}</th>
                      <th style={{ minWidth: "8rem", padding: "20px" }}>
                        {t("Phone No")}
                      </th>
                      <th style={{ minWidth: "5rem", padding: "20px" }}>
                        {t("Applied Date")}
                      </th>
                      <th style={{ minWidth: "6rem" }}>{t("State")}</th>
                      <th style={{ minWidth: "5rem" }}>{t("Status")}</th>
                      {offerStaus == false && onBoardStatus == false && (
                        <th style={{ minWidth: "8rem" }} colSpan="2">
                          {t("Action")}
                        </th>
                      )}
                      {offerStaus == true && (
                        <th style={{ minWidth: "9rem" }} colSpan="3">
                          {t("Action")}
                        </th>
                      )}
                      {onBoardStatus == true && (
                        <th style={{ minWidth: "9rem" }} colSpan="3">
                          {t("Action")}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {mainTable.length > 0 &&
                      mainTable.map((data, index) => {
                        return (
                          <tr key={index} className="sticky-body">
                            <td className="white-bg">
                              <input
                                type="CheckBox"
                                style={{
                                  width: "17px",
                                  height: "17px",
                                  marginTop: "4px",
                                }}
                                checked={data.isChecked === true}
                                onChange={() =>
                                  subCheckboxChange(data.applicant_id)
                                }
                              />
                            </td>
                            <td
                              style={{
                                minWidth: "2rem",
                                marginLeft: 0,
                                paddingLeft: 0,
                              }}
                            >
                              {parseInt(indexNumber) + index + 1}
                            </td>
                            {data.image_link === "" && (
                              <td className="white-bg">
                                <CImg
                                  style={{
                                    borderRadius: "50%",
                                  }}
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/image/DefaultProfile.png"
                                  }
                                  width={50}
                                  height={50}
                                ></CImg>
                              </td>
                            )}
                            {data.image_link !== "" && (
                              <td
                                style={{ padding: "12px" }}
                                className="white-bg"
                              >
                                <CImg
                                  style={{
                                    borderRadius: "50%",
                                  }}
                                  src={data.image_link}
                                  width={50}
                                  height={50}
                                ></CImg>
                              </td>
                            )}
                            <td className="white-bg">
                              {data.name === "" && "_"}

                              <>{data.name}</>
                            </td>
                            <td className="white-bg">
                              {data.resume_title === "" && "_"}

                              <> {data.resume_title}</>
                            </td>
                            <td>
                              {data.category_name === "" && "_"}

                              <>{data.category_name}</>
                            </td>
                            <td>
                              {data.position_name === "" && "_"}

                              <>{data.position_name}</>
                            </td>
                            <td>
                              {data.total_experience === "" && "_"}

                              <>{data.total_experience}</>
                            </td>

                            <td style={{ padding: "10px" }}>
                              {data.expected_salary === "" && "_"}

                              <>{data.expected_salary}</>
                            </td>
                            <td style={{ padding: "10px" }}>
                              {data.currency_type === "" && "_"}
                              {data.currency_type != "" && data.currency_type}
                            </td>
                            <td>
                              <>
                                {data.email === "" && "_"}

                                {data.email}
                              </>
                            </td>
                            <td>
                              {data.phone_number === "" && "_"}

                              <>{data.phone_number}</>
                            </td>
                            <td>
                              {data.date === "" && "_"}

                              <>{data.date}</>
                            </td>
                            <td>
                              {data.state_name === "" && "_"}

                              <>{data.state_name}</>
                            </td>
                            <td>
                              {data.status === "" && "_"}

                              <>{data.status}</>
                            </td>

                            <>
                              {loginPermission &&
                                loginPermission.length > 0 &&
                                loginPermission.includes("Offer") &&
                                offerStaus == true && (
                                  <td style={{ minWidth: "2rem" }}>
                                    <div className="user-before">
                                      <CTooltip
                                        content={t("Offer")}
                                        placement="top"
                                      >
                                        <CImg
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/image/emailbf.svg"
                                          }
                                          style={{
                                            width: "24px",
                                            height: "24px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            offerClick(
                                              data.applicant_id,
                                              data.template_job_position_id,
                                              data.name
                                            )
                                          }
                                        ></CImg>
                                      </CTooltip>
                                      <CTooltip
                                        content={t("Offer")}
                                        placement="top"
                                      >
                                        <CImg
                                          className="user-after icon-fix-ho"
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/image/emailaf.svg"
                                          }
                                          style={{
                                            width: "24px",
                                            height: "24px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            offerClick(
                                              data.applicant_id,
                                              data.template_job_position_id,
                                              data.name
                                            )
                                          }
                                        ></CImg>
                                      </CTooltip>
                                    </div>
                                  </td>
                                )}
                            </>

                            <>
                              {loginPermission &&
                                loginPermission.length > 0 &&
                                loginPermission.includes(
                                  "Change Onboard Status"
                                ) &&
                                onBoardStatus == true && (
                                  <td style={{ minWidth: "2rem" }}>
                                    <div className="user-before">
                                      <CTooltip
                                        content={t("Onboard")}
                                        placement="top"
                                      >
                                        <CImg
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/image/both.svg"
                                          }
                                          style={{
                                            width: "24px",
                                            height: "24px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            onBoardClick(
                                              data.applicant_id,
                                              data.template_job_position_id,
                                              data.name,
                                              data.applicant_email,
                                              data.image_link,
                                              data.date_of_birth,
                                              data.gender,
                                              data.phone_number,
                                              data.applied_date
                                            )
                                          }
                                        ></CImg>
                                      </CTooltip>
                                      <CTooltip
                                        content={t("Onboard")}
                                        placement="top"
                                      >
                                        <CImg
                                          className="user-after icon-fix-ho"
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/image/boteHover.svg"
                                          }
                                          style={{
                                            width: "24px",
                                            height: "24px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            onBoardClick(
                                              data.applicant_id,
                                              data.template_job_position_id,
                                              data.name,
                                              data.applicant_email,
                                              data.image_link,
                                              data.date_of_birth,
                                              data.gender,
                                              data.phone_number,
                                              data.applied_date
                                            )
                                          }
                                        ></CImg>
                                      </CTooltip>
                                    </div>
                                  </td>
                                )}
                            </>

                            {loginPermission &&
                              loginPermission.length > 0 &&
                              loginPermission.includes("Download") && (
                                <td style={{ minWidth: "2rem" }}>
                                  <div className="user-before">
                                    <CTooltip
                                      content={t("Download")}
                                      placement="top"
                                    >
                                      <CImg
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/image/Download_Default.svg"
                                        }
                                        style={{
                                          width: "24px",
                                          height: "24px",
                                          cursor: "pointer",
                                          paddingBottom: "2px",
                                        }}
                                        onClick={() =>
                                          downloadClick(
                                            data.applicant_id,
                                            data.template_job_position_id
                                          )
                                        }
                                      ></CImg>
                                    </CTooltip>
                                    <CTooltip
                                      content={t("Download")}
                                      placement="top"
                                    >
                                      <CImg
                                        className="user-after icon-fix-ho"
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/image/Download_Hover.svg"
                                        }
                                        style={{
                                          width: "28px",
                                          height: "28px",
                                          cursor: "pointer",
                                          paddingBottom: "2px",
                                        }}
                                        onClick={() =>
                                          downloadClick(
                                            data.applicant_id,
                                            data.template_job_position_id
                                          )
                                        }
                                      ></CImg>
                                    </CTooltip>
                                  </div>
                                </td>
                              )}

                            {loginPermission &&
                              loginPermission.length > 0 &&
                              loginPermission.includes("Detail") && (
                                <td
                                  style={{
                                    minWidth: "2rem",
                                    paddingRight: "10px",
                                  }}
                                >
                                  <div className="user-before">
                                    <CTooltip
                                      content={t("Detail")}
                                      placement="top"
                                    >
                                      <CImg
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/image/View_Default.svg"
                                        }
                                        style={{
                                          width: "28px",
                                          height: "28px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          viewClick(
                                            data.applicant_id,
                                            data.template_job_position_id,
                                            data.applicant_status_info_id,
                                            data.category_name,
                                            data.position_name
                                          )
                                        }
                                      ></CImg>
                                    </CTooltip>
                                    <CTooltip
                                      content={t("Detail")}
                                      placement="top"
                                    >
                                      <CImg
                                        className="user-after icon-fix-ho"
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/image/View_Hover.svg"
                                        }
                                        style={{
                                          width: "28px",
                                          height: "28px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          viewClick(
                                            data.applicant_id,
                                            data.template_job_position_id,
                                            data.applicant_status_info_id,
                                            data.category_name,
                                            data.position_name
                                          )
                                        }
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
              )}
            </div>
          </div>
          <br></br>
        </>
      )}

      <>
        {deleteBtnShow == false && buttomShowCondition == true && (
          <CRow>
            <CCol lg="4" sm="4" xs="4"></CCol>
            {stateTmp == 1 && statusTmp == 1 && (
              <>
                <CCol lg="8" sm="8" xs="8" style={{ textAlign: "end" }}>
                  <CButton
                    type="button"
                    className="btn-create btn-add"
                    onClick={shortListClick}
                    style={{
                      marginBottom: "10px",
                      marginRight: "15px",
                    }}
                  >
                    {t("Short Listed")}
                  </CButton>
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Reject") && (
                      <CButton
                        type="button"
                        className="created-btn add-btn"
                        onClick={rejectClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Reject")}
                      </CButton>
                    )}
                </CCol>
              </>
            )}
            {stateTmp == 2 && statusTmp == 1 && (
              <>
                <CCol lg="8" sm="8" xs="8" style={{ textAlign: "end" }}>
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Pass") && (
                      <CButton
                        type="button"
                        className="btn-create btn-add"
                        onClick={passClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Pass")}
                      </CButton>
                    )}
                  <CButton
                    type="button"
                    className="created-btn add-btn"
                    onClick={failClick}
                    style={{
                      marginBottom: "10px",
                      marginRight: "15px"
                    }}
                  >
                    {t("Fail")}
                  </CButton>
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Cancel") && (
                      <CButton
                        type="button"
                        className="ccreate-btn add-btn"
                        onClick={cancelClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Cancel")}
                      </CButton>
                    )}
                </CCol>
              </>
            )}
            {stateTmp == 1 && statusTmp == 2 && (
              <>
                <CCol lg="8" sm="8" xs="8" style={{ textAlign: "end" }}>
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Coding Test") && (
                      <CButton
                        type="button"
                        className="btn-create btn-add"
                        onClick={skillTestClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Skill Test")}
                      </CButton>
                    )}
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Interview") && (
                      <CButton
                        type="button"
                        className="btn-create btn-add"
                        onClick={interviewClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("1st Interview")}
                      </CButton>
                    )}
                </CCol>
              </>
            )}
            {stateTmp == 2 && statusTmp == 2 && (
              <>
                <CCol lg="8" sm="8" xs="8" style={{ textAlign: "end" }}>
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Interview") && (
                      <CButton
                        type="button"
                        className="btn-create btn-add"
                        onClick={interviewClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("1st Interview")}
                      </CButton>
                    )}
                </CCol>
              </>
            )}
            {stateTmp == 3 && statusTmp == 1 && (
              <>
           

                <CCol lg="8" sm="8" xs="8" style={{ textAlign: "end" }}>
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Pass") && (
                      <CButton
                        type="button"
                        className="btn-create btn-add"
                        onClick={passClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Pass")}
                      </CButton>
                    )}
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Reject") && (
                      <CButton
                        type="button"
                        className="created-btn add-btn"
                        onClick={rejectClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Reject")}
                      </CButton>
                    )}
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Cancel") && (
                      <CButton
                        type="button"
                        className="ccreate-btn add-btn"
                        onClick={cancelClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Cancel")}
                      </CButton>
                    )}
                </CCol>
              </>
            )}

            {stateTmp == 3 && statusTmp == 2 && (
              <>
                <CCol lg="8" sm="8" xs="8" style={{ textAlign: "end" }}>
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Interview") && (
                      <CButton
                        type="button"
                        className="btn-create btn-add"
                        onClick={interviewClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("2nd Interview")}
                      </CButton>
                    )}
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Approval") && (
                      <CButton
                        type="button"
                        className="btn-create btn-add"
                        onClick={approvalClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Approval")}
                      </CButton>
                    )}
                </CCol>
              </>
            )}

            {stateTmp == 4 && statusTmp == 1 && (
              <>
                <CCol lg="8" sm="8" xs="8" style={{ textAlign: "end" }}>
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Pass") && (
                      <CButton
                        type="button"
                        className="btn-create btn-add"
                        onClick={passClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Pass")}
                      </CButton>
                    )}
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Reject") && (
                      <CButton
                        type="button"
                        className="created-btn add-btn"
                        onClick={rejectClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Reject")}
                      </CButton>
                    )}
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Cancel") && (
                      <CButton
                        type="button"
                        className="ccreate-btn add-btn"
                        onClick={cancelClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Cancel")}
                      </CButton>
                    )}
                </CCol>
              </>
            )}

            {stateTmp == 6 && statusTmp == 1 && (
              <>
                <CCol lg="8" sm="8" xs="8" style={{ textAlign: "end" }}>
                  <>
                    {loginPermission &&
                      loginPermission.length > 0 &&
                      loginPermission.includes("Accept") && (
                        <CButton
                          type="button"
                          className="btn-create btn-add"
                          onClick={approveClick}
                          style={{
                            marginBottom: "10px",
                            marginRight: "15px",
                          }}
                        >
                          {t("Approve")}
                        </CButton>
                      )}
                    {loginPermission &&
                      loginPermission.length > 0 &&
                      loginPermission.includes("Reject") && (
                        <CButton
                          type="button"
                          className="created-btn add-btn"
                          onClick={rejectClick}
                          style={{
                            marginBottom: "10px",
                            marginRight: "15px",
                          }}
                        >
                          {t("Reject")}
                        </CButton>
                      )}
                  </>
                  {/* )} */}
                </CCol>
              </>
            )}
            {stateTmp == 4 && statusTmp == 2 && (
              <>
                <CCol lg="8" sm="8" xs="8" style={{ textAlign: "end" }}>
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Interview") && (
                      <CButton
                        type="button"
                        className="btn-create btn-add"
                        onClick={interviewClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("3rd Interview")}
                      </CButton>
                    )}
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Approval") && (
                      <CButton
                        type="button"
                        className="btn-create btn-add"
                        onClick={approvalClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Approval")}
                      </CButton>
                    )}
                </CCol>
              </>
            )}

            {stateTmp == 5 && statusTmp == 1 && (
              <>
                <CCol lg="8" sm="8" xs="8" style={{ textAlign: "end" }}>
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Pass") && (
                      <CButton
                        type="button"
                        className="btn-create btn-add"
                        onClick={passClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Pass")}
                      </CButton>
                    )}
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Reject") && (
                      <CButton
                        type="button"
                        className="created-btn add-btn"
                        onClick={rejectClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Reject")}
                      </CButton>
                    )}
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Cancel") && (
                      <CButton
                        type="button"
                        className="ccreate-btn add-btn"
                        onClick={cancelClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Cancel")}
                      </CButton>
                    )}
                </CCol>
              </>
            )}
            {stateTmp == 5 && statusTmp == 2 && (
              <>
                <CCol lg="8" sm="8" xs="8" style={{ textAlign: "end" }}>
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Approval") && (
                      <CButton
                        type="button"
                        className="btn-create btn-add"
                        onClick={approvalClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Approval")}
                      </CButton>
                    )}
                </CCol>
              </>
            )}
            {stateTmp == 5 && statusTmp == 5 && (
              <>
                <CCol lg="8" sm="8" xs="8" style={{ textAlign: "end" }}>
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Approval") && (
                      <CButton
                        type="button"
                        className="btn-create btn-add"
                        onClick={approvalClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Approval")}
                      </CButton>
                    )}
                </CCol>
              </>
            )}

            {stateTmp == 7 && statusTmp == 1 && (
              <>
                <CCol lg="8" sm="8" xs="8" style={{ textAlign: "end" }}>
                  <CButton
                    type="button"
                    className="btn-create btn-add"
                    onClick={hireClick}
                    style={{
                      marginBottom: "10px",
                      marginRight: "15px",
                    }}
                  >
                    {t("Hire")}
                  </CButton>
                  {loginPermission &&
                    loginPermission.length > 0 &&
                    loginPermission.includes("Cancel") && (
                      <CButton
                        type="button"
                        className="ccreate-btn add-btn"
                        onClick={cancelClick}
                        style={{
                          marginBottom: "10px",
                          marginRight: "15px",
                        }}
                      >
                        {t("Cancel")}
                      </CButton>
                    )}
                </CCol>
              </>
            )}
          </CRow>
        )}
        {loginPermission &&
          loginPermission.length > 0 &&
          loginPermission.includes("Delete") && (
            <CRow style={{ marginTop: "20px" }}>
              <CCol lg="10"></CCol>
              <CCol lg="2" style={{ textAlign: "end" }}>
                {deleteBtnShow == true && (
                  <CButton
                    type="button"
                    className="created-btn btn"
                    onClick={deleteCLick}
                    style={{
                      marginTop: "-22px",
                      marginBottom: "34px",
                      marginRight: "15px",
                    }}
                  >
                    {t("Delete")}
                  </CButton>
                )}
              </CCol>
            </CRow>
          )}
      </>

      <div className="card-footer">
        {total > 10 && (
          <CRow alignHorizontal="end" className="mt-3">
            <CCol lg="4" style={{ display: "flex" }}>
              <CLabel style={{ marginTop: "10px", paddingRight: "10px" }}>
                {t("Row Per Page")}
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
  );
};

export default AppliedJobPositionTable;
