/**
 * Template Registration
 * @author yaminzaw
 * @create 17/06/2022
 */
import React from "react";
import { CButton, CModal, CModalBody, CButtonToolbar, CRow, CImg, CCol } from "@coreui/react";
import { useTranslation } from "react-i18next";


const TemplateChooseModal = (props) => {
  const { t } = useTranslation();
  let { cancel, show, applyClick, imgClick, showApplyBtn, imgId, diffImgOne, diffImgTwo, diffImgThree, mainImgOne, mainImgTwo, mainImgThree } = props;
  return (
    <>
      <CModal
        //style={{overflow:"initial"}}
        size="xl"
        centered
        closeOnBackdrop={false}
        show={show}
        id="advanced"
        onClose={cancel}
      >
        <CModalBody style={{ marginBottom: "30px", overflow: "initial" }}>
          <CImg
            className="cross-img cursorStyle"
            onClick={cancel}
            src={process.env.PUBLIC_URL + "/avatars/close.png"}
            width={33}
            height={33}
          ></CImg>
          <CRow>
            <CCol lg="4">
              {mainImgOne == true &&
                <CImg id="img" className="choose-img" src={process.env.PUBLIC_URL + "/image/Template 1.png"} onClick={() => imgClick(1)} />
              }
              {diffImgOne == true &&
                <CImg id="img" className="choose-img-diff" src={process.env.PUBLIC_URL + "/image/Template 1.png"} onClick={() => imgClick(1)} />
              }
            </CCol>
            <CCol lg="4">
              {mainImgTwo == true &&
                <CImg id="img" className="choose-img" src={process.env.PUBLIC_URL + "/image/Template 2.png"} onClick={() => imgClick(2)} />
              }

              {diffImgTwo == true &&
                <CImg id="img" className="choose-img-diff" src={process.env.PUBLIC_URL + "/image/Template 2.png"} onClick={() => imgClick(2)} />
              }
            </CCol>
            <CCol lg="4">
              {mainImgThree == true &&
                <CImg id="img" className="choose-img" src={process.env.PUBLIC_URL + "/image/Template 3.png"} onClick={() => imgClick(3)} />
              }
              {diffImgThree == true &&
                <CImg id="img" className="choose-img-diff" src={process.env.PUBLIC_URL + "/image/Template 3.png"} onClick={() => imgClick(3)} />
              }
            </CCol>
          </CRow>
          <CButtonToolbar>
            {(showApplyBtn == true && imgId == 1) && (
              <CCol lg="4" style={{ textAlign: "center", marginTop: "30px" }}>
                <CButton className="btn-create btn-add" onClick={() => applyClick(1)}>{t("Apply")}</CButton>
              </CCol>
            )}
            {(showApplyBtn == true && imgId == 2) && (
              <>
                <CCol lg="4"></CCol>
                <CCol lg="4" style={{ textAlign: "center", marginTop: "30px" }}>
                  <CButton className="btn-create btn-add" onClick={() => applyClick(2)}>{t("Apply")}</CButton>
                </CCol>
                <CCol lg="4"></CCol>
              </>
            )}
            {(showApplyBtn == true && imgId == 3) && (
              <>
                <CCol lg="8"></CCol>
                <CCol lg="4" style={{ textAlign: "center", marginTop: "30px" }}>
                  <CButton className="btn-create btn-add" onClick={() => applyClick(3)}>{t("Apply")}</CButton>
                </CCol>
              </>
            )}
          </CButtonToolbar>
        </CModalBody>
      </CModal>
    </>
  );
};
export default TemplateChooseModal;
