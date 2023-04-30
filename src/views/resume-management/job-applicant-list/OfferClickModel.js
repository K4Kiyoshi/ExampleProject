/* eslint-disable jsx-a11y/alt-text */

/**
 * Offer Click Model Form
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
  CModalBody,
  CRow,
  CLabel,
  CInput,
  CTextarea,
  CButton,
  CInputGroup,
} from "@coreui/react";
import SuccessError from "../../common/SuccessError";
import { useTranslation } from "react-i18next";
const OfferClickModel = (props) => {
  const {
    show,
    closeBtn,
    handleFileInputOffer,
    fileSelectError,
    offerRemark,
    offerRemarkChange,
    fileNameOffer,
    clearImage,
    finalOfferClick,
  } = props;
  const { t } = useTranslation();
  return (
    <>
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
                {t("Sending Offer Letter")}
              </CLabel>
            </CCol>
          </CRow>
          <CRow>
            <CCol lg="12" className="remark-field">
              {t("Remark")}
            </CCol>
          </CRow>
          <CRow>
            <CCol lg="12">
              <CTextarea
                className="area-input-field"
                onChange={offerRemarkChange}
                value={offerRemark}
              />
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="12" className="remark-field">
              {t("Attach File")}
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="12">
              <CInputGroup className="mb-3">
                <CInput className="input-field-blue-background" readOnly />

                <CLabel
                  className="userform-attach"
                  htmlFor={`inputGroupFile01`}
                >
                  {t("Pick File")}
                </CLabel>
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CInput
              className="input-field"
              hidden
              accept=".pdf,.xlsx,.doc,.docx"
              type="file"
              value=""
              id={`inputGroupFile01`}
              onChange={(e) => handleFileInputOffer(e)}
            />
          </CRow>

          {fileNameOffer.length > 0 &&
            fileNameOffer.map((file, index) => {
              return (
                <div key={index}>
                  {file != "" && (
                    <>
                      <CRow style={{ marginBottom: "20px" }}>
                        <CCol lg="10">
                          <ul>
                            <li>{file}</li>
                          </ul>
                        </CCol>
                        <CCol lg="1">
                          <CButton
                            style={{ padding: "0px" }}
                            onClick={() => clearImage(index)}
                          >
                            <CImg
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50px",
                              }}
                              src={
                                process.env.PUBLIC_URL +
                                "/avatars/crossblack.png"
                              }
                            />
                          </CButton>
                        </CCol>
                        <CCol lg="1"></CCol>
                      </CRow>
                    </>
                  )}
                </div>
              );
            })}

          <CRow>
            <CCol lg="5" sm="5" xs="5"></CCol>
            <CCol lg="2" sm="2" xs="2" style={{ textAlign: "center" }}>
              <CButton
                type="button"
                className="btn-create btn-add"
                onClick={finalOfferClick}
              >
                {t("Send")}
              </CButton>
            </CCol>
            <CCol lg="5" sm="5" xs="5"></CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </>
  );
};
export default OfferClickModel;
