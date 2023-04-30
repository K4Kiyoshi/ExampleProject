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
const HireClickModel = (props) => {
  const { show, closeBtn, finalHireClick, fileSelectError } = props;
  const { t } = useTranslation();
  return (
    <>
      <CModal
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
            <CCol lg="1"></CCol>
            <CCol lg="10" className="remark-header-field">
              {t("Candidate Acceptance")}
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10" className="remark-field">
              {t("Are you sure all candidates are accept offer?")}
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
          <CRow>
            <CCol lg="3" sm="3" xs="3"></CCol>
            <CCol lg="2" sm="2" xs="2" style={{ textAlign: "center" }}>
              <CButton
                type="button"
                className="create-btn btn"
                onClick={finalHireClick}
                style={{
                  height: "36px",
                  width: "60px",
                  marginBottom: "10px",
                  marginTop: "30px",
                }}
              >
                <p style={{ marginTop: "2px" }}> {t("Yes")} </p>
              </CButton>
            </CCol>
            <CCol lg="2" sm="2" xs="2"></CCol>
            <CCol lg="2" sm="2" xs="2" style={{ textAlign: "center" }}>
              <CButton
                type="button"
                className="ccreate-btn btn"
                onClick={closeBtn}
                style={{
                  height: "36px",
                  width: "100px",
                  marginBottom: "10px",
                  marginTop: "30px",
                  marginLeft: "-30px",
                }}
              >
                <p style={{ marginTop: "2px" }}> {t("Cancel")} </p>
              </CButton>
            </CCol>
            <CCol lg="3" sm="3" xs="3"></CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </>
  );
};
export default HireClickModel;
