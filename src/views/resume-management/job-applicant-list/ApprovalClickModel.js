/* eslint-disable jsx-a11y/alt-text */

/**
 * Approval Click Model
 *
 * @author YuwaKoKo
 *
 * @create 20/9/2022
 *
 */

import React from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import {
  CModal,
  CImg,
  CCardBody,
  CCol,
  CRow,
  CLabel,
  CInput,
  CButton,
  CTooltip,
  CTextarea,
} from "@coreui/react";
import SuccessError from "../../common/SuccessError";
import { useTranslation } from "react-i18next";
const ApprovalClickModel = (props) => {
  const { t } = useTranslation();
  const {
    show,
    closeBtn,
    deleteFieldClick,
    error,
    finalApprovalClick,
    email,
    mainTable,
    selectJoinDateHandleChange,
    interviewJoinDateSelectedValue,
    finalMainCheckboxChange,
    childJoinDateChange,
    finalAllCheck,
    finalSubCheckboxChange,
    remarkHandleChange,
    salaryHandleChange,
    hotelHandleChange,
    transportHandleChange,
  } = props;

  return (
    <>
      <CModal
        size="xl"
        centered
        closeOnBackdrop={false}
        show={show}
        id="advanced"
        onClose={closeBtn}
      >
        <CCardBody
          style={{
            background: "#eff1fe",
            borderRadius: "10px",
            paddingRight: "30px",
            paddingLeft: "30px",
          }}
        >
          <CRow>
            <CCol lg="11"></CCol>
            <CCol lg="1">
              <CImg
                style={{ cursor: "pointer", marginLeft: "30px" }}
                // className="cross-img cursorStyle"
                onClick={closeBtn}
                src={process.env.PUBLIC_URL + "/image/Close.svg"}
                width={33}
                height={33}
              ></CImg>
            </CCol>
          </CRow>
          <br></br>
          <CRow style={{ padding: "13px" }}>
            <SuccessError error={error} />
          </CRow>
          <CRow>
            <CCol lg="12">
              {" "}
              <CLabel
                style={{
                  color: "white",
                  marginTop: "1px",
                  background: "#4e57aa",
                  width: "98%",
                  fontSize: "22px",
                  padding: "13px",
                  margin: "17px",
                  borderRadius: "7px",
                }}
              >
                {t("Approval Candidates")}
              </CLabel>
            </CCol>
          </CRow>

          <CCol lg="12" style={{ overflow: "auto" }}>
            <div style={{ borderRadius: "7px" }} className="tableFixHead">
              <table className="templateList-table-approval main-table">
                <thead className="text-center">
                  <tr>
                    <>
                      <th style={{ width: "45px" }}>
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
                    </>
                    <th style={{ width: "90px" }}>{t("Name")}</th>
                    <th style={{ width: "80px" }}>{t("Position")}</th>
                    <th style={{ width: "163px" }}>
                      {t("Joined Date")}
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        libInstance={moment}
                      >
                        <KeyboardDatePicker
                          InputProps={{
                            readOnly: true,
                            disableUnderline: true,
                          }}
                          clearable
                          format="yyyy/mm/dd"
                          style={{
                            borderRadius: "5px",
                            overflow: "hidden",
                            borderBottom: "1px solid",
                            width: "80%",
                          }}
                          value={
                            interviewJoinDateSelectedValue == "" ||
                            interviewJoinDateSelectedValue == null
                              ? null
                              : interviewJoinDateSelectedValue
                          }
                          disablePast
                          className="input-field-blue-background"
                          placeholder="yyyy/mm/dd"
                          onChange={(e) => selectJoinDateHandleChange(e)}
                        />
                      </MuiPickersUtilsProvider>
                    </th>
                    <th style={{ width: "100px" }}>{t("Salary")} </th>
                    <th style={{ width: "100px" }}>{t("Hostel Allowance")} </th>
                    <th style={{ width: "100px" }}>
                      {t("Transportation Allowance")}{" "}
                    </th>
                    <th style={{ width: "250px" }}>{t("Remark")}</th>
                  </tr>
                </thead>
                <tbody>
                  {mainTable.length > 0 &&
                    mainTable.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ width: "45px" }} className="text-center">
                            <input
                              type="CheckBox"
                              style={{
                                width: "17px",
                                height: "17px",
                                marginTop: "6px",
                              }}
                              checked={data.isChecked === true}
                              onChange={() =>
                                finalSubCheckboxChange(data.applicant_id)
                              }
                            />
                          </td>
                          <td style={{ width: "90px" }} className="text-center">
                            {data.name === "" && "_"}
                            {data.name}
                          </td>
                          <td style={{ width: "80px" }} className="text-center">
                            {data.position_name === "" && "_"}
                            {data.position_name}
                          </td>
                          <td style={{ width: "163px", padding: "17px" }}>
                            <CInput
                              id={data.applicant_id}
                              style={{ width: "100%" }}
                              className="tinput-field"
                              type="text"
                              onChange={(e) =>
                                childJoinDateChange(data.applicant_id, e)
                              }
                              value={
                                mainTable[index]["mainTable"] == undefined
                                  ? data.applied_date
                                  : mainTable[index]["mainTable"]
                              }
                            />
                          </td>
                          <td
                            style={{ width: "100px", padding: "17px" }}
                            className="text-center"
                          >
                            <CInput
                              className="tinput-field"
                              type="text"
                              value={mainTable[index]["mainTable"]}
                              onChange={(e) =>
                                salaryHandleChange(data.applicant_id, e)
                              }
                            />
                          </td>
                          <td
                            style={{ width: "100px", padding: "17px" }}
                            className="text-center"
                          >
                            <CInput
                              className="tinput-field"
                              type="text"
                              value={mainTable[index]["mainTable"]}
                              onChange={(e) =>
                                hotelHandleChange(data.applicant_id, e)
                              }
                            />
                          </td>
                          <td
                            style={{ width: "100px", padding: "17px" }}
                            className="text-center"
                          >
                            <CInput
                              className="tinput-field"
                              type="text"
                              value={mainTable[index]["mainTable"]}
                              onChange={(e) =>
                                transportHandleChange(data.applicant_id, e)
                              }
                            />
                          </td>
                          <td
                            style={{ width: "250px", padding: "17px" }}
                            className="text-center"
                          >
                            <CTextarea
                              className="area1-input-field"
                              style={{ height: "65px" }}
                              type="text"
                              value={mainTable[index]["mainTable"]}
                              onChange={(e) =>
                                remarkHandleChange(data.applicant_id, e)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </CCol>

          <CRow className="divide-div" style={{ paddingLeft: "20px" }}>
            <CCol lg="5" sm="5" md="5" xs="8">
              <CLabel style={{ fontWeight: "bold", fontSize: "18px" }}>
                {t("Approver Email")}
              </CLabel>
            </CCol>
          </CRow>
          {email.map((data, index) => {
            return (
              <CRow key={index} style={{ paddingLeft: "20px" }}>
                <CCol lg="4" sm="4" xs="4" md="4">
                  <CInput
                    className="input-field-blue-background sub-div"
                    type="text"
                    id={data.id}
                    value={data.approver_email}
                    readOnly
                  />
                </CCol>
                <CCol lg="1" xs="1" md="1" sm="1" className="minus-div">
                  <CImg
                    className="delete-field-img"
                    src={process.env.PUBLIC_URL + "/image/minus.svg"}
                    onClick={() => deleteFieldClick(data.id)}
                  />
                </CCol>
                <CCol lg="1" xs="1" md="1" sm="1"></CCol>
              </CRow>
            );
          })}
          <br></br>
          <CRow>
            <CCol lg="5" sm="5" xs="5"></CCol>
            <CCol lg="2" sm="2" xs="2" style={{ textAlign: "center" }}>
              <CButton
                type="button"
                className="btn-create btn-add"
                onClick={finalApprovalClick}
              >
                {t("Save")}
              </CButton>
            </CCol>
            <CCol lg="5" sm="5" xs="5"></CCol>
          </CRow>
        </CCardBody>
      </CModal>
    </>
  );
};
export default ApprovalClickModel;
