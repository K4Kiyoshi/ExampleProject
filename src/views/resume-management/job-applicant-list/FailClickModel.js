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
const FailClickModel = (props) => {
  const { show, closeBtn, finalFailClick, fileSelectError } = props;
  const { t } = useTranslation();
  return (
    <>
      <CModal
        centered
        closeOnBackdrop={false}
        show={show}
        id="advanced"
        onClose={closeBtn}
        style={{ textAlign: "center" }}
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
          <CRow style={{ margin: "10px" }}>
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
              {t("Are you sure let all candidates to fail?")}
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>

          <CRow>
           
            <CCol lg="6" sm="6" xs="6" style={{ textAlign: "end" }}>
              <CButton
                type="button"
                className="create-btn add-btn"
                onClick={finalFailClick}
                style={{
                  marginBottom: "10px",
                  marginTop: "30px",
                  width:"51%"
                }}
              >
                {" "}
                {t("Yes")}
              </CButton>
            </CCol>
          
            <CCol lg="6" sm="6" xs="6" style={{ textAlign: "start" }}>
              <CButton
                type="button"
                className="ccreate-btn add-btn"
                onClick={closeBtn}
                style={{
                  marginBottom: "10px",
                  marginTop: "30px",
                  width:"51%"
                }}
              >
                {t("Cancel")}
              </CButton>
            </CCol>
    
          </CRow>
        </CModalBody>
      </CModal>
    </>
  );
};
export default FailClickModel;
