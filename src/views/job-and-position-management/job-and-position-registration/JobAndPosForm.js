/**  Job and Position Form
 * @author yamin zaw
 */
import { CRow, CCol, CButton, CSelect, CLabel } from "@coreui/react";
import React from "react";
import { useTranslation } from "react-i18next";

const JobAndPosForm = (props) => {
  let {
    selectCategory,
    selectCategoryValue,
    selectCategoryOnChange,
    selectPosition,
    selectPositionValue,
    selectPositionOnChange,
    saveClick,
    updateStatus,
    loginPermission,
  } = props;

  const { t } = useTranslation();

  return (
    <>
      <CRow>
        <CCol lg="1" style={{ maxWidth: "4%" }}></CCol>
        <CCol lg="5">
          <CLabel className="required">
            {t("Job Category Name")}
          </CLabel>
          <CSelect
            className="input-field-blue-background"
            value={selectCategoryValue}
            onChange={selectCategoryOnChange}
          >
            <option value="">{t("---Select Job Category---")}</option>
            {selectCategory.length > 0 &&
              selectCategory.map((data, index) => {
                return (
                  <option key={index} value={data.id}>
                    {data.category_name}
                  </option>
                );
              })}
          </CSelect>
        </CCol>
        <CCol lg="1"></CCol>
        <CCol lg="5">
          <CLabel className="required">
            {t("Position Name")}
          </CLabel>
          <CSelect
            className="input-field-blue-background"
            value={selectPositionValue}
            onChange={selectPositionOnChange}
          >
            <option value="">{t("---Select Position---")}</option>
            {selectPosition.length > 0 &&
              selectPosition.map((data, index) => {
                return (
                  <option key={index} value={data.id}>
                    {data.position_name}
                  </option>
                );
              })}
          </CSelect>
        </CCol>
      </CRow>
      <CRow style={{ justifyContent: "center", marginTop: "30px" }}>
        {loginPermission &&
          loginPermission.length > 0 &&
          loginPermission.includes("Save") &&
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
      </CRow>
    </>
  );
};

export default JobAndPosForm;
