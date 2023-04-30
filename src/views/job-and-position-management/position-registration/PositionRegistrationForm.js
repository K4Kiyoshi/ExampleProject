/* Position Registeration Form
 * @author Yuwa Ko Ko
 * @create 27/09/2022
 */

import { CRow, CCol, CInput, CButton, CLabel } from "@coreui/react";
import React from "react";
import { useTranslation } from "react-i18next";

const PositionRegistrationForm = (props) => {
  const { t } = useTranslation();
  let {
    positionName,
    handleChangePositionName,
    saveClick,
    updateStatus,
    loginPermission,
  } = props;

  return (
    <>
      <CRow>
        <CCol lg="6">
          <CRow>
            <CCol lg="1" style={{ maxWidth: "8%" }}></CCol>
            <CCol lg="11">
              <CLabel className="required">{t("Position Name")}</CLabel>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1" style={{ maxWidth: "8%" }}></CCol>
            <CCol lg="8">
              <CInput
                className="input-field-blue-background "
                placeholder="Enter Position Name"
                type="text"
                value={positionName}
                onChange={(e) => handleChangePositionName(e)}
                style={{ marginBottom: "10px" }}
              />
            </CCol>
            <CCol lg="3">
              {loginPermission &&
                loginPermission.length > 0 &&
                updateStatus == false && (
                  <CButton className="btn-create btn-add" onClick={saveClick}>
                    {t("Save")}
                  </CButton>
                )}
              {loginPermission &&
                loginPermission.length > 0 &&
                loginPermission.includes("Update") &&
                updateStatus == true && (
                  <CButton className="btn-create btn-add" onClick={saveClick}>
                    {t("Update")}
                  </CButton>
                )}
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  );
};

export default PositionRegistrationForm;
