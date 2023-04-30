/* eslint-disable jsx-a11y/alt-text */

/**
 *Hire Click Model Form
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
  CRow,
  CButton,
} from "@coreui/react";
import SuccessError from "../../common/SuccessError";
import { useTranslation } from "react-i18next";
const ApproveClickModel = (props) => {
  const { show, closeBtn, fileSelectError, finalApproveClick } = props;
  const { t } = useTranslation();
  return (
    <>
      <CModal
        size=""
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
            paddingBottom: "0px",
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
          }}
        >
          <CRow>
            <SuccessError error={fileSelectError} />
          </CRow>
          <CRow>
            <CCol lg="2"></CCol>
            <CCol lg="9" className="remark-header-field">
              {t("Candidate Approve")}
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>

          <CRow>
            <CCol lg="2"></CCol>
            <CCol lg="9" className="remark-field">
              {t("Are you sure all candidates to approve?")}
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
          <CRow>
            <CCol lg="4" sm="4" xs="4"></CCol>
            <CCol lg="2" sm="2" xs="2" style={{ textAlign: "center" }}>
              <CButton
                type="button"
                className="create-btn btn"
                onClick={finalApproveClick}
                style={{
                  height: "45px",
                  width: "60px",
                  marginBottom: "10px",
                  marginTop: "30px",
                }}
              >
                {t("Yes")}
              </CButton>
            </CCol>
            <CCol lg="2" sm="2" xs="2" style={{ textAlign: "center" }}>
              <CButton
                type="button"
                className="ccreate-btn btn"
                onClick={closeBtn}
                style={{
                  height: "45px",
                  width: "100px",
                  marginBottom: "10px",
                  marginTop: "30px",
                }}
              >
                {t("Cancel")}
              </CButton>
            </CCol>
            <CCol lg="4" sm="4" xs="4"></CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </>
  );
};
export default ApproveClickModel;
