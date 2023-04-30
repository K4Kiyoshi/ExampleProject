/**
 * Template Copy Modal
 * @author yaminzaw
 * @create 23/12/2022
 */
import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CButtonToolbar,
  CRow,
  CImg,
  CLabel,
  CInput,
  CSelect,
  CCol
} from "@coreui/react";
import SuccessError from "../../common/SuccessError";
import { useTranslation } from "react-i18next";

const CopyModal = (props) => {
  const { t } = useTranslation();
  let {
    show,
    cancel,
    title,
    handleChangeTitle,
    selectJobCategory,
    selectCategoryCopyOnChange,
    selectCategoryCopyValue,
    selectPositionChange,
    selectPositionCopyOnChange,
    selectPositionCopyValue,
    copyTemplate,
    error
  } = props;

  return (
    <>
      <CModal
        style={{ overflow: "initial" }}
        centered
        closeOnBackdrop={false}
        show={show}
        id="advanced"
        onClose={cancel}
      >
        <CModalBody style={{ marginBottom: "30px" }}>
          <CImg
            style={{ float: "right", cursor: "pointer" }}
            onClick={props.cancel}
            src={process.env.PUBLIC_URL + "/image/close.png"}
            width={12}
            height={12}
          ></CImg>
          <CRow style={{ margin: "19px" }}>
            <CCol lg="12" style={{ width: "100%" }}><SuccessError error={error} /></CCol>
          </CRow>
          <CRow
            id="approver-modal"
            lg="12"
            style={{ marginBottom: "20px", justifyContent: "center" }}
          >
            <h4>{t("Copy Resume Template")}</h4>
          </CRow>
          <CRow id="approver-modal" lg="12" style={{ marginBottom: "10px", paddingLeft: "40px", paddingRight: "40px" }}>
            <CLabel className="required">
              {t("Resume Title")}
            </CLabel>
            <CInput
              className="input-field "
              placeholder={t("Enter Resume Title")}
              type="text"
              value={title}
              onChange={(e) => handleChangeTitle(e)}
            />
          </CRow>
          <CRow id="approver-modal" lg="12" style={{ marginBottom: "10px", paddingLeft: "40px", paddingRight: "40px" }}>
            <CLabel className="required">
              {t("Job Category Name")}
            </CLabel>
            <CSelect
              className="input-field"
              value={selectCategoryCopyValue}
              onChange={selectCategoryCopyOnChange}
            >
              <option value="">{t("---Select Category---")}</option>
              {selectJobCategory.length > 0 &&
                selectJobCategory.map((data, index) => {
                  return (
                    <option key={index} value={data.id}>
                      {data.category_name}
                    </option>
                  );
                })}
            </CSelect>
          </CRow>
          <CRow id="approver-modal" lg="12" style={{ marginBottom: "10px", paddingLeft: "40px", paddingRight: "40px" }}>
            <CLabel className="required">
              {t("Position Name")}
            </CLabel>
            <CSelect
              className="input-field"
              value={selectPositionCopyValue}
              onChange={selectPositionCopyOnChange}
            >
              <option value="">{t("---Select Position---")}</option>
              {selectPositionChange.length > 0 &&
                selectPositionChange.map((data, index) => {
                  return (
                    <option key={index} value={data.job_position_id}>
                      {data.position_name}
                    </option>
                  );
                })}
            </CSelect>
          </CRow>
          <CButtonToolbar
            style={{ justifyContent: "end", marginTop: "30px" }}
          >
            <CCol lg="1"></CCol>
            <CCol lg="10" sm="10" xs="10" md="10" style={{ textAlign: "end", paddingRight: "0rem" }}>
              <CButton style={{ marginRight: "10px" }}
                className="btn-cancel"
                onClick={cancel}
              >
                {t("Cancel")}
              </CButton>
              <CButton
                className="btn-create btn-add"
                onClick={copyTemplate}
              >
                {t("Copy")}
              </CButton>
            </CCol>
            <CCol lg="1"></CCol>
          </CButtonToolbar>
        </CModalBody>
      </CModal>
    </>
  );
};
export default CopyModal;
