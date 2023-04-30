/* eslint-disable jsx-a11y/alt-text */

/**
 * Cancel Click model
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
  CCol,
  CRow,
  CLabel,
  CModalBody,
  CTextarea,
  CButton,
} from "@coreui/react";
import SuccessError from "../../common/SuccessError";
import { useTranslation } from "react-i18next";
const CancelClickModel = (props) => {
  const {
    show,
    closeBtn,
    finalCancelClick,
    cancelRemarkChange,
    cancelRemark,
    fileSelectError,
  } = props;
  const { t } = useTranslation();
  return (
    <CModal
      size="lg"
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
        <CRow style={{ marginRight: "10px" }}>
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
        <CRow>
          <SuccessError error={fileSelectError} />
        </CRow>
        <CRow>
          <CCol lg="12">
            {" "}
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
              {t("Cancellation Reason")}
            </CLabel>
          </CCol>
        </CRow>
        <CRow>
          <CCol lg="12" className="remark-field">
            <CLabel className="required">{t("Remark")}</CLabel>
          </CCol>
        </CRow>
        <CRow>
          <CCol lg="12">
            <CTextarea
              className="area-input-field"
              style={{ height: "100px" }}
              onChange={cancelRemarkChange}
              value={cancelRemark}
            />
          </CCol>
        </CRow>
        <br></br>
        <CRow>
          <CCol lg="4" sm="4" xs="4"></CCol>
          <CCol lg="4" sm="4" xs="4" style={{ textAlign: "center" }}>
            <CButton
              type="button"
              className="btn-create btn-add"
              onClick={finalCancelClick}
            >
              {t("Save")}
            </CButton>
          </CCol>
          <CCol lg="4" sm="4" xs="4"></CCol>
        </CRow>
      </CModalBody>
    </CModal>
  );
};
export default CancelClickModel;
