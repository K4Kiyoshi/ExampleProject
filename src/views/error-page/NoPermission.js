/**
 * No Permission Page
 *
 * @author  Nay Zaw Linn
 * @create  10/06/2022 (D/M/Y)
 * @param
 * @return
 */
import React, { useState } from "react";
import { CImg, CButton, CCol, CContainer, CRow, CLabel } from "@coreui/react";
import { useHistory } from "react-router-dom";
import ApiPath from "../common/ApiPath";
import { ApiRequest } from "../common/ApiRequest";
import Loading from "../common/Loading";
import { use } from "i18next";
let customer_name = window.location.href.split("/")[3];

const NoPermission = () => {
  const [loading, setLoading] = useState(false);
  const styles = {
    button: {
      background: "#7582FF",
      color: "white",
    },
  };

  let history = useHistory();

  const backHome = async () => {
    setLoading(true);
    let loginData = {
      login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
      employee_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
      company_id: localStorage.getItem(`${customer_name}_COMPANY_ID`),
      role_id: localStorage.getItem(`${customer_name}_ROLE_ID`),
      language: localStorage.getItem(`${customer_name}_LANGUAGE`),
      access_token: "token",
    };
    let access = false;

    // Package Menu
    let obj1 = {
      method: "post",
      url: ApiPath.ERPChoosePackage,
      package_name: "erp",
      params: {
        ...loginData,
        device_flag: "1",
      },
    };
    let chooseResponse = await ApiRequest(obj1);
    if (chooseResponse.flag !== false) {
      let all_package = chooseResponse.data.access_package;
      all_package.forEach((data) => {
        if (data.short_name == "recruit") {
          access = true;
        }
      });
    }
    setLoading(false);
    if (access == true) {
      let obj2 = {
        package_name: "recruit",
        method: "get",
        url: ApiPath.RecruitRegisterCheck,
        params: {
          login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
          company_id: localStorage.getItem(`${customer_name}_COMPANY_ID`),
          language: localStorage.getItem(`${customer_name}_LANGUAGE`),
        },
      };
      let response2 = await ApiRequest(obj2);
      access = response2.data.recruit_access;

      access == false
        ? history.push(`/${customer_name}/recruit/dashboard-no-permission`)
        : history.push(`/${customer_name}/recruit/Dashboard`);
    } else {
      history.push(`/${customer_name}/recruit/not-register`);
    }
  };

  return (
    <>
      <Loading start={loading} />
      <CContainer className="d-flex align-items-center min-vh-100 justify-content-center bg-white">
        <CRow className="text-center flex-md-row flex-sm-column">
          <CCol lg="6">
            <CImg
              className="selector"
              src="/image/NoPermission.svg"
              width={300}
            />
          </CCol>

          <CCol
            lg="6"
            className="text-center text-lg-left mt-5 mt-lg-0 d-flex flex-column"
          >
            <CLabel className="font-xl mb-4">No Permission Page</CLabel>
            <CLabel className="font-xs mb-3">
              You don't have permission to view this page. To access, please
              contact the administrator
            </CLabel>
            <CCol
              lg="4"
              xs="4"
              className="mt-auto p-0 d-flex align-items-end align-self-center align-self-lg-start"
            >
              <CButton
                size="lg"
                style={styles.button}
                className="d-flex align-items-center mt-4 mt-lg-0"
                block
                onClick={backHome}
              >
                <i className="fa fa-arrow-left"></i>
                <span className="font-xs m-auto">Back Home</span>
              </CButton>
            </CCol>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default NoPermission;
