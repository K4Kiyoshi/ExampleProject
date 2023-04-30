/**
 * Template Registration
 * @author yaminzaw
 * @create 17/06/2022
 */
import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CButtonToolbar,
  CRow,
  CCol,
  CLabel,
  CInput,
  CInputCheckbox,
  CSelect,
  CImg,
  CInputRadio,
} from "@coreui/react";
import SuccessError from "../../common/SuccessError";
import { useTranslation } from "react-i18next";

const TemplateCreateModal = (props) => {
  const { t } = useTranslation();
  let {
    templateCreateModalCloseBtn,
    show,
    checked,
    checkRequire,
    label,
    handleChangeLabel,
    selectField,
    selectTypeValue,
    selectTypeOnChange,
    error,
    clickAddField,
    multiChooseField,
    subLabelChange,
    deleteFieldClick,
    levelRadio,
    clickLevel,
    levelId,
    handleChangeNumber,
    selectNumber,
    comment,
    handleChangeComment,
    showNum,
    showCharacter,
    editStatus,
    commonAddUpdate,
    subError,
    levelNumError,
    commentError
  } = props;
  if (error.length > 0 && subError.length === 0 && levelNumError.length === 0 && commentError.length === 0) {
    let element = document.getElementById("advanced");
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <>
      <CModal
        size="lg"
        centered
        closeOnBackdrop={false}
        show={show}
        id="advanced"
        onClose={templateCreateModalCloseBtn}
        style={{ backgroundColor: "#eff1fe" }}
      >
        <CModalBody style={{ marginBottom: "30px" }}>
          <CRow style={{ marginBottom: "30px" }}>
            <CCol lg="12" style={{ width: "100%" }}><SuccessError error={error} /></CCol>
          </CRow>
          <CRow id="approver-modal" lg="12" style={{ marginBottom: "10px" }}>
            <CCol lg="1"></CCol>
            <CCol lg="10" sm="10" xs="10" md="10" >
              <CLabel className="required">
                {t("Template Field Label")}
              </CLabel>
              <CInput
                autoFocus="focus"
                className="input-field-blue-background"
                placeholder={t("Enter Template Field Label")}
                type="text"
                value={label}
                onChange={(e) => handleChangeLabel(e)}
              />
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
          <CRow id="approver-modal" style={{ marginBottom: "10px" }}>
            <CCol lg="1"></CCol>
            <CCol lg="10" sm="10" xs="10" md="10" style={{ textAlign: "end" }}>
              <CInputCheckbox
                className="chk-style"
                onChange={checkRequire}
                checked={checked ? false : true}
                id="check_req"
                style={{ cursor: "pointer" }}
              />
              <CLabel className="normal-label" style={{ color: "red", cursor: "pointer" }} htmlFor="check_req">{t("Is this field required?")}</CLabel>
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
          <CRow id="approver-modal" lg="12">
            <CCol lg="1"></CCol>
            <CCol lg="10" sm="10" xs="10" md="10">
              <CLabel className="required">
                {t("Template Field Label Type")}
              </CLabel>
              <CSelect
                className="input-field-blue-background"
                value={selectTypeValue}
                onChange={selectTypeOnChange}
              >
                <option value="">{t("---Select Template Field Label Type---")}</option>
                {selectField.length > 0 &&
                  selectField.map((data, index) => {
                    return (
                      <option key={index} id={data.id} value={data.id}>
                        {data.element_name}
                      </option>
                    );
                  })}
              </CSelect>
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
          {selectTypeValue == 1 && (
            <>
              <CRow className="divide-div">
                <CCol lg="1"></CCol>
                <CCol lg="5" sm="5" md="5" xs="8">
                  <CLabel>{t("Add Field")}</CLabel>
                  <CImg
                    className="add-field-img"
                    src={process.env.PUBLIC_URL + "/image/plus-icon.svg"}
                    onClick={clickAddField}
                  />
                </CCol>
              </CRow>
              {multiChooseField.length > 0 &&
                multiChooseField.map((data, index) => {
                  return (
                    <CRow key={index}>
                      <CCol lg="1" ></CCol>
                      <CCol lg="10" sm="10" xs="10" md="10">
                        <CInput
                          className="input-field-blue-background sub-div"
                          placeholder={t("Enter Add Field Label")}
                          type="text"
                          id={data.id}
                          value={data.value}
                          onChange={(e) => subLabelChange(e, data.id)}
                        />
                        {subError.length > 0 &&
                          subError.map((d, i) => {
                            return (
                              data.id == d.id &&
                              <span key={i} style={{ color: "red" }}>{d.value}</span>
                            )
                          })}
                      </CCol>
                      <CCol lg="1" xs="1" md="1" sm="1" className="minus-div">
                        <CImg
                          className="delete-field-img"
                          src={process.env.PUBLIC_URL + "/image/minus.svg"}
                          onClick={() => deleteFieldClick(data.id)}
                        />
                      </CCol>
                    </CRow>
                  );
                })}
            </>
          )}
          {selectTypeValue == 2 && (
            <>
              <CRow className="divide-div">
                <CCol lg="1"></CCol>
                <CCol lg="5" sm="5" md="5" xs="8">
                  <CLabel>{t("Add Field")}</CLabel>
                  <CImg
                    className="add-field-img"
                    src={process.env.PUBLIC_URL + "/image/plus-icon.svg"}
                    onClick={clickAddField}
                  />
                </CCol>
              </CRow>
              {multiChooseField.length > 0 &&
                multiChooseField.map((data, index) => {
                  return (
                    <CRow key={index}>
                      <CCol lg="1"></CCol>
                      <CCol lg="10" sm="10" xs="10" md="10">
                        <CInput
                          className="input-field-blue-background sub-div"
                          placeholder={t("Enter Add Field Label")}
                          type="text"
                          id={data.id}
                          value={data.value}
                          onChange={(e) => subLabelChange(e, data.id)}
                        />
                        {subError.length > 0 &&
                          subError.map((d, i) => {
                            return (
                              data.id == d.id &&
                              <span key={i} style={{ color: "red" }}>{d.value}</span>
                            )
                          })}
                      </CCol>
                      <CCol lg="1" sm="1" xs="1" md="1" className="minus-div">
                        <CImg
                          className="delete-field-img"
                          src={process.env.PUBLIC_URL + "/image/minus.svg"}
                          onClick={() => deleteFieldClick(data.id)}
                        />
                      </CCol>
                    </CRow>
                  );
                })}
              <div style={{ marginTop: "30px" }}>
                {levelRadio.length > 0 &&
                  levelRadio.map((data, index) => {
                    return (
                      <CRow key={index} className="radio-label" style={{ marginBottom: "20px" }} >
                        <CCol lg="1" ></CCol>
                        <CCol lg="5" sm="5" xs="5" md="5" style={{ marginLeft: "2rem" }}>
                          <CInputRadio
                            id={`radio${index}`}
                            className="radio"
                            name={data.name}
                            value={data.id}
                            onChange={() => clickLevel(data)}
                            checked={levelId == data.id ? true : false}
                          />
                          <CLabel className="normal-label" htmlFor={`radio${index}`} >{data.name}</CLabel>
                        </CCol>
                        {(data.id == 1 && showCharacter == true) && (
                          <>
                            <CCol lg="1" sm="5" xs="5" md="1" style={{ marginRight: "-1rem", minWidth: "10.66667%", marginBottom: "10px" }}>
                              <CInput className="input-field-blue-background"
                                maxLength="2"
                                type="text"
                                value={selectNumber}
                                onChange={(e) => handleChangeNumber(e)}
                                style={{ textAlign: "center" }}
                              />
                            </CCol>
                            <CCol lg="4" sm="12" xs="12" md="5" style={{ marginBottom: "10px" }}>
                              <CInput className="input-field-blue-background"
                                type="text"
                                placeholder={t("Enter Level Comment")}
                                value={comment}
                                onChange={(e) => handleChangeComment(e)}
                              />
                            </CCol>
                            {levelNumError.length > 0 &&
                              <>
                                <CCol lg="6"></CCol>
                                <CCol lg="6" sm="12" xs="12" md="12">
                                  <span style={{ color: 'red', paddingRight: "30px" }}>{levelNumError}</span>
                                </CCol>
                              </>
                            }
                            {commentError.length > 0 &&
                              <>
                                <CCol lg="5"></CCol>
                                <CCol lg="7" sm="12" xs="12" md="12">
                                  <span style={{ color: 'red', paddingRight: "30px" }}>{commentError}</span>
                                </CCol>
                              </>
                            }
                          </>
                        )}
                        {(data.id == 2 && showNum == true) && (
                          <>
                            <CCol lg="1" sm="5" xs="5" md="1" style={{ marginRight: "-1rem", minWidth: "10.66667%", marginBottom: "10px" }}>
                              <CInput className="input-field-blue-background"
                                maxLength="2"
                                type="text"
                                value={selectNumber}
                                onChange={(e) => handleChangeNumber(e)}
                                style={{ textAlign: "center" }}
                              />
                            </CCol>
                            <CCol lg="4" sm="12" xs="12" md="5" style={{ marginBottom: "10px" }}>
                              <CInput className="input-field-blue-background"
                                type="text"
                                placeholder={t("Enter Level Comment")}
                                value={comment}
                                onChange={(e) => handleChangeComment(e)}
                              />
                            </CCol>
                            {levelNumError.length > 0 &&
                              <>
                                <CCol lg="6"></CCol>
                                <CCol lg="6" sm="12" xs="12" md="12">
                                  <span style={{ color: 'red', paddingRight: "30px" }}>{levelNumError}</span>
                                </CCol>
                              </>
                            }
                            {commentError.length > 0 &&
                              <>
                                <CCol lg="5"></CCol>
                                <CCol lg="7" sm="12" xs="12" md="12">
                                  <span style={{ color: 'red', paddingRight: "30px" }}>{commentError}</span>
                                </CCol>
                              </>
                            }
                          </>
                        )}
                        {(data.id == 4 && levelId == 4) && (
                          <>
                            <CCol lg="4" sm="12" xs="12" md="5" style={{ marginBottom: "10px" }}>
                              <CInput className="input-field-blue-background"
                                type="text"
                                placeholder={t("Enter Level Comment")}
                                value={comment}
                                onChange={(e) => handleChangeComment(e)}
                              />
                            </CCol>
                            {commentError.length > 0 &&
                              <>
                                <CCol lg="5"></CCol>
                                <CCol lg="7" sm="12" xs="12" md="12">
                                  <span style={{ color: 'red', paddingRight: "30px" }}>{commentError}</span>
                                </CCol>
                              </>
                            }
                          </>
                        )}
                        <CCol lg="1" sm="0" xs="0" md="0"></CCol>
                      </CRow>
                    );
                  })}
              </div>
            </>
          )}
          {selectTypeValue == 3 && (
            <>
              <CRow className="divide-div">
                <CCol lg="1"></CCol>
                <CCol lg="5" sm="5" md="5" xs="8">
                  <CLabel>{t("Add Field")}</CLabel>
                  <CImg
                    className="add-field-img"
                    src={process.env.PUBLIC_URL + "/image/plus-icon.svg"}
                    onClick={clickAddField}
                  />
                </CCol>
              </CRow>
              {multiChooseField.length > 0 &&
                multiChooseField.map((data, index) => {
                  return (
                    <CRow key={index}>
                      <CCol lg="1"></CCol>
                      <CCol lg="10" sm="10" xs="10" md="10">
                        <CInput
                          className="input-field-blue-background sub-div"
                          placeholder={t("Enter Add Field Label")}
                          type="text"
                          id={data.id}
                          value={data.value}
                          onChange={(e) => subLabelChange(e, data.id)}
                        />
                        {subError.length > 0 &&
                          subError.map((d, i) => {
                            return (
                              data.id == d.id &&
                              <span key={i} style={{ color: "red" }}>{d.value}</span>
                            )
                          })}
                      </CCol>
                      <CCol lg="1" xs="1" md="1" sm="1" className="minus-div">
                        <CImg
                          className="delete-field-img"
                          src={process.env.PUBLIC_URL + "/image/minus.svg"}
                          onClick={() => deleteFieldClick(data.id)}
                        />
                      </CCol>
                    </CRow>
                  );
                })}
            </>
          )}
          <CButtonToolbar>
            <CCol lg="1"></CCol>
            <CCol lg="10" sm="10" xs="10" md="10" style={{ textAlign: "end", paddingRight: "0rem" }}>
              <CButton style={{ marginRight: "10px", marginTop: "30px" }}
                className="btn-cancel"
                onClick={templateCreateModalCloseBtn}
              >
                {t("Cancel")}
              </CButton>
              {!editStatus && (
                <CButton
                  style={{ marginTop: "30px" }}
                  className="btn-create btn-add"
                  onClick={() => commonAddUpdate(selectTypeValue)}
                >
                  <CImg className="info-add-img" src={process.env.PUBLIC_URL + "/image/plus-white.png"} />
                  {t("Add")}
                </CButton>
              )}
              {editStatus && (
                <CButton
                  style={{ marginTop: "30px" }}
                  className="btn-create btn-add"
                  onClick={() => commonAddUpdate(selectTypeValue)}
                >
                  <CImg className="info-add-img" src={process.env.PUBLIC_URL + "/image/plus-white.png"} />
                  {t("Update")}
                </CButton>
              )}
            </CCol>
            <CCol lg="1" sm="1" xs="1" md="1"></CCol>
          </CButtonToolbar>
        </CModalBody>
      </CModal>
    </>
  );
};
export default TemplateCreateModal;