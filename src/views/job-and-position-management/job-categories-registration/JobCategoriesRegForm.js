/**  Job Categories Registration Form
 * @author yamin zaw
 */
import { CRow, CCol, CInput, CButton,CLabel } from "@coreui/react";
import React from "react";
import { useTranslation } from 'react-i18next';

const JobCategoriesRegForm = (props) => {
  const { t } = useTranslation();
  let { categoryName, handleChangeCategoryName, saveClick, error, updateStatus, success, loginPermission } = props;

  return (
    <>
      <CRow>
        <CCol lg="6">
          <CRow>
            <CCol lg="1" style={{ maxWidth: "8%" }}></CCol>
            <CCol lg="11">
              <CLabel className="required">
                {t("Category Name")}
              </CLabel>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1" style={{ maxWidth: "8%" }}></CCol>
            <CCol lg="8">
              <CInput
                className="input-field-blue-background "
                placeholder="Enter Category Name"
                type="text"
                value={categoryName}
                onChange={(e) => handleChangeCategoryName(e)}
                style={{ marginBottom: "10px" }}
              />
            </CCol>
            <CCol lg="3">
              {(loginPermission && loginPermission.length > 0  && updateStatus == false) &&
                <CButton
                  type="button"
                  className="btn-create btn-add"
                  onClick={saveClick}
                >
                  {t("Save")}
                </CButton>
              }
              {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Update") && updateStatus == true) && (
                <CButton
                  type="button"
                  className="btn-create btn-add"
                  onClick={saveClick}
                >
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

export default JobCategoriesRegForm;
