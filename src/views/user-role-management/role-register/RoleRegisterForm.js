/**
 * Role Registration
 * @author yaminzaw
 */
import { CRow, CCol, CLabel, CInput, CButton} from "@coreui/react";
import React from "react";
import { useTranslation } from "react-i18next";

const RoleRegisterForm = (props) => {
  let { roleName, description, handleChangeRole, handleChangeDescription, saveClick, error, updateStatus, success, loginPermission } = props;
  const { t } = useTranslation();

  return (
    <>
      <CRow>
        <CCol lg="1" style={{ maxWidth: "4%" }}></CCol>
        <CCol lg="5">
          <CLabel className="required">
            {t("Role Name")}
          </CLabel>
          <CInput
            className="input-field-blue-background "
            placeholder={t("Enter Role Name")}
            type="text"
            value={roleName}
            onChange={(e) => handleChangeRole(e)}
          />
        </CCol>
        <CCol lg="1"></CCol>
        <CCol lg="5">
          <CLabel className="required">
            {t("Description")}
          </CLabel>
          <CInput
            className="input-field-blue-background "
            placeholder={t("Enter Description")}
            type="text"
            value={description}
            onChange={(e) => handleChangeDescription(e)}
          />
        </CCol>
      </CRow>
      <CRow style={{ justifyContent: "center", marginTop: "30px" }}>
        {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Save") && updateStatus == false) && (
          <CButton
            className="btn-create btn-add"
            onClick={saveClick}
          >
            {t("Save")}
          </CButton>
        )}
        {updateStatus == true && (
          <CButton
            className="btn-create btn-add"
            onClick={saveClick}
          >
            {t("Update")}
          </CButton>
        )}
      </CRow>
    </>
  );
};

export default RoleRegisterForm;
