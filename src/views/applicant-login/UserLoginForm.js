/* Admin Login Form Index
 * @author Yuwa Ko Ko
 * @create 17/06/2022
 */

import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CLabel,
  CRow,
  CButtonToolbar,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CImg,
} from "@coreui/react";
import background from "../../assets/icons/Bg2.png";
import mobaBg from "../../assets/icons/Login.svg";
import SuccessError from "../common/SuccessError";
import Loading from "../common/Loading";

const UserLoginForm = (props) => {
  let {
    loading,
    zoomSize,
    email,
    error,
    emailChange,
    userKeyDownHandler,
    userSignInClick,
  } = props;

  return (
    <>
      {zoomSize < 150 && (
        <div
          className="c-app c-default-layout flex-row align-items-center login-bg "
          style={{ backgroundImage: `url(${background})` }}
        >
          <CContainer>
            <CRow className="forgot-form justify-content-center">
              <CCol>
                <CCardGroup>
                  <CCard
                    className="p-4 reset-pwd border-0"
                    style={{ borderRadius: "1rem", background: "#fafafa" }}
                  >
                    <CCardBody>
                      <CForm>
                        <CRow className="login-err">
                          <Loading start={loading} />
                          <SuccessError error={error} />
                        </CRow>
                        <div>
                          <h2
                            style={{
                              fontWeight: "bold",
                              fontSize: "28px",
                              color: "#5a636f",
                              textAlign: "center",
                            }}
                          >
                            Login
                            <br></br>
                          </h2>
                          <CLabel></CLabel>
                          <label
                            style={{
                              color: "#5a636f",
                              fontWeight: "600",
                              fontSize: "14px",
                              marginTop: "20px",
                            }}
                          >
                            Email{" "}
                          </label>
                          &nbsp;<span style={{ color: "red" }}>*</span>
                          <CInputGroup className="mb-2 mt-3">
                            <CInputGroupPrepend>
                              <CInputGroupText
                                style={{ height: "40px", border: "none" }}
                              >
                                <CImg
                                  style={{ width: "20px" }}
                                  src={
                                    process.env.PUBLIC_URL + "/image/mail.png"
                                  }
                                ></CImg>
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              className="input-field1"
                              type="text"
                              style={{ height: "40px", fontSize: "13px" }}
                              onChange={emailChange}
                              value={email}
                              onKeyDown={userKeyDownHandler}
                              placeholder="Enter Email"
                            />
                          </CInputGroup>
                        </div>

                        <CButtonToolbar className="mt-4" justify="end">
                          <CButton
                            className="cooreate-bold-btn btn"
                            onClick={userSignInClick}
                            style={{ color: "#eff1fe", fontSize: "13px" }}
                          >
                            Submit
                          </CButton>
                        </CButtonToolbar>
                        <br></br>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      )}

      {zoomSize > 149 && (
        <>
          <div className="login-bg-mobile">
            <br></br>
            <br></br>
            <h2 style={{ textAlign: "center", fontWeight: "800" }}>
              Recruitment System
            </h2>

            <CRow>
              <CImg
                src={process.env.PUBLIC_URL + "/image/resumegb.svg"}
                width={"100%"}
              ></CImg>
            </CRow>

            <CRow className="login-err">
              <Loading start={loading} />
              <SuccessError error={error} />
            </CRow>

            <h2 style={{ textAlign: "center", fontWeight: "600" }}>Log In</h2>

            <CRow
              lg="12"
              style={{ paddingLeft: "100px", paddingRight: "100px" }}
            >
              <label
                style={{
                  fontWeight: "800",
                  color: "#5a636f",
                  fontSize: "15px",
                  marginTop: "20px",
                }}
              >
                Email{" "}
              </label>

              <CInputGroup className="mb-2">
                <CInputGroupPrepend>
                  <CInputGroupText style={{ height: "30px", border: "none" }}>
                    <CImg
                      style={{ width: "20px" }}
                      src={process.env.PUBLIC_URL + "/image/mail.png"}
                    ></CImg>
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  className="input-field1"
                  type="text"
                  style={{ height: "30px", fontSize: "13px" }}
                  onChange={emailChange}
                  value={email}
                  onKeyDown={userKeyDownHandler}
                  placeholder="Enter Email"
                />
              </CInputGroup>
            </CRow>

            <CRow
              style={{
                paddingLeft: "100px",
                paddingRight: "100px",
                justifyContent: "center",
              }}
            >
              <CButtonToolbar className="mt-4" style={{ width: "100%" }}>
                <CButton
                  className="cooreate-bold-btn btn"
                  onClick={userSignInClick}
                  style={{ color: "#eff1fe", fontSize: "15px", width: "100%" }}
                >
                  Submit
                </CButton>
              </CButtonToolbar>
            </CRow>
            <CRow style={{ height: "100px" }}>&nbsp;</CRow>
          </div>
        </>
      )}
    </>
  );
};

export default UserLoginForm;
