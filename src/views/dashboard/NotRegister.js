/**
 *
 * @author Yuwa Ko Ko
 * @create  22/01/2023 (D/M/Y)
 * @param
 * @return
 */

import React from "react";
import { CCol, CContainer, CRow, CImg, CLabel } from "@coreui/react";

const NotRegister = () => {
  return (
    <CContainer className="d-flex align-items-center min-vh-95 justify-content-center">
      <CRow className="text-center">
        <CCol lg="12" style={{ marginTop: "6rem" }}>
          <CImg className="selector" src="/image/notRegister.svg" width={400} />
        </CCol>
        <CCol lg="12" className="mt-5">
          <CLabel className="font-xl" style={{ fontWeight: "bold" }}>
            Not Register!
          </CLabel>
        </CCol>
        <CCol lg="12">
          <CLabel className="font-m">
            Your employee ID is not registered in this system.
          </CLabel>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default NotRegister;
