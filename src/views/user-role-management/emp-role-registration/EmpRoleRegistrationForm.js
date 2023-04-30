import React from 'react';
import { CButton, CCol, CRow, CSelect} from "@coreui/react";
import CommonAutocomplete from "../../common/CommonAutocomplete";
import { useTranslation } from "react-i18next";

/**
 * Employee Role Register Form Component
 * @author phyoewaiaung
 * @create 01/25/2023
 */
const EmpRoleRegistrationForm = (props) => {
  const {t} = useTranslation();

  let {selectAutocomplete,empIdData,empId,empIdChange,empCode,empCodeChange,empName,empNameData,
       empNameChange,deptId,deptIdChange,postId,postIdChange,deptData,postData,searchClick,
       empCodeData,loginPermission} = props;

  return (
    <>
      <CRow>
        <CCol lg="6">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="11">
              <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                {t("Employee ID")}
              </p>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CommonAutocomplete
                style={{ width: "100%" }}
                onChange={empIdChange}
                onSelect={selectAutocomplete}
                items={empIdData}
                name={empId}
                placeholder={t("Enter Employee ID")}
              />
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
        </CCol>
      </CRow>
      <br></br>

      <CRow>
        <CCol lg="6">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="11">
              <p style={{ fontWeight: "bold", color: "#2f302f" }}>{t("Employee Code")}</p>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CommonAutocomplete
                style={{ width: "100%" }}
                onChange={empCodeChange}
                onSelect={selectAutocomplete}
                items={empCodeData}
                name={empCode}
                placeholder={t("Enter Employee Code")}
              />
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
        </CCol>

        <CCol lg="6">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="11">
              <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                {t("Employee Name")}
              </p>
            </CCol>
          </CRow>
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CommonAutocomplete
                style={{ width: "100%" }}
                onChange={empNameChange}
                onSelect={selectAutocomplete}
                items={empNameData}
                name={empName}
                placeholder={t("Enter Employee Name")}
              />
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
        </CCol>
      </CRow>
      <br></br>

      <CRow style={{ marginBottom: "30px" }}>
        <CCol lg="6">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="11">
              <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                {t("Department Name")}
              </p>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CSelect
               className="input-field-blue-background "
                style={{ borderBottom: "1px solid", height: "40px" }}
                onChange={deptIdChange}
                value={deptId}
              >
                <option value="">{t("---Select Department Name---")}</option>

                {deptData.length > 0 &&
                  deptData.map((data, index) => {
                    return (
                      <option key={index} value={data.id}>
                        {data.department_name}
                      </option>
                    );
                  })}
              </CSelect>
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
        </CCol>

        <CCol lg="6">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="11">
              <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                {t("Position")}
              </p>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CSelect
               className="input-field-blue-background "
                style={{ borderBottom: "1px solid", height: "40px" }}
                onChange={postIdChange}
                value={postId}
              >
                <option value="">{t("---Select Position---")} </option>

                {postData.length > 0 &&
                  postData.map((data, index) => {
                    return (
                      <option key={index} value={data.id}>
                        {data.position_name}
                      </option>
                    );
                  })}
              </CSelect>
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow style={{ justifyContent: "center" }}>
       {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Search")) ?
        <CButton
          className="btn-create btn-add"
          onClick={searchClick}
        >
          {t("Search")}
        </CButton> : ""
       }
      </CRow>
    </>
  )
}

export default EmpRoleRegistrationForm
