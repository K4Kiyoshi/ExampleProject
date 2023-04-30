/* eslint-disable jsx-a11y/alt-text */

/**
 * Pass Click Model Form
 *
 * @author YuwaKoKo
 *
 * @create 20/9/2022
 *
 */

import React from "react";
import {
  CModal,
  CImg,
  CModalHeader,
  CModalBody,
  CCol,
  CButton,
  CTooltip,
  CRow,
  CLabel,
  CInput,
  CTextarea,
} from "@coreui/react";
import SuccessError from "../../common/SuccessError";
import { useTranslation } from "react-i18next";
const PassClickModel = (props) => {
  const { t } = useTranslation();
  const {
    show,
    closeBtn,
    mainTable,
    scoreHandleChange,
    remarkHandleChange,
    detailStatus,
    finalSubCheckboxChange,
    finalMainCheckboxChange,
    finalAllCheck,
    finalPassClick,
    fileSelectError,
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
        <CModalHeader
          style={{
            background: "#eff1fe",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            justifyContent: "end",
            borderBottomColor: "#eff1fe",
            paddingBottom: "10px",
          }}
        >
          <CRow style={{ marginRight: "10px", cursor: "pointer" }}>
            <CImg
              // className="cross-img cursorStyle"
              onClick={closeBtn}
              src={process.env.PUBLIC_URL + "/image/Close.svg"}
              width={33}
              height={33}
            />
          </CRow>
        </CModalHeader>
        <CModalBody
          style={{
            background: "#eff1fe",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            paddingRight: "30px",
            paddingLeft: "30px",
          }}
        >
          <SuccessError error={fileSelectError} />
          <CRow>
            <CCol lg="12">
              <CLabel
                style={{
                  color: "white",
                  marginTop: "7px",
                  background: "#4e57aa",
                  width: "100%",
                  fontSize: "22px",
                  padding: "13px",
                  borderRadius: "7px",
                }}
              >
                {t("Qualified Candidates")}
              </CLabel>
            </CCol>
          </CRow>
          <CRow>
            <CCol lg="12" style={{ overflow: "auto" }}>
              <div style={{ borderRadius: "7px" }} className="tableFixHead">
                <table className="templateListss-tabless main-table">
                  <thead className="text-center">
                    <tr>
                      {detailStatus == false && (
                        <>
                          <th style={{ width: 50 }}>
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
                      )}

                      <th style={{ width: 60 }}>{t("Applicant Name")}</th>
                      <th style={{ width: 60 }}>
                        <CLabel className="required">{t("Score")}</CLabel>
                      </th>
                      <th style={{ width: 200 }}>
                        <CLabel className="required">{t("Remark")}</CLabel>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mainTable.length > 0 &&
                      mainTable.map((data, index) => {
                        return (
                          <tr key={index}>
                            {detailStatus == false && (
                              <td style={{ width: 50 }} className="text-center">
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
                            )}
                            <td style={{ width: 60 }} className="text-center">
                              {data.name === "" && "_"}
                              {data.name}
                            </td>
                            <td
                              style={{ width: 60, padding: "17px" }}
                              className="text-center"
                            >
                              <CInput
                                className="tinput-field"
                                type="text"
                                value={mainTable[index]["mainTable"]}
                                onChange={(e) =>
                                  scoreHandleChange(data.applicant_id, e)
                                }
                              />
                            </td>
                            <td
                              style={{ width: 200, padding: "17px" }}
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
          </CRow>
          <br></br>
          <CRow>
            <CCol lg="5" sm="5" xs="5"></CCol>
            <CCol lg="2" sm="2" xs="2" style={{ textAlign: "center" }}>
              <CButton
                type="button"
                className="btn-create btn-add"
                onClick={finalPassClick}
              >
                {t("Save")}
              </CButton>
            </CCol>
            <CCol lg="5" sm="5" xs="5"></CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </>
  );
};
export default PassClickModel;
