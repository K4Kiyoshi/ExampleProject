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
  CFormGroup,
  CImg,
} from "@coreui/react";
import background from "../../assets/icons/Bg2.png";
import SuccessError from "../common/SuccessError";
import mobaBg from "../../assets/icons/Login.svg";

const UserLoginForm = (props) => {
  let {
    keyDownHandler,
    inputHandleChange,
    submitClick,
    resendClick,
    ssnValues,
    zoomSize,
    error,
    success,
  } = props;

  return (
    <>
      {zoomSize < 150 && (
        <div
          className="c-app c-default-layout flex-row login-bg "
          style={{ backgroundImage: `url(${background})` }}
        >
          <CCol lg="6">
            <CRow className="email-veri-sec" lg="12" sm="10" xs="8">
              <CCol
                lg="12"
                md="12"
                sm="12"
                xs="12"
                className="email-veri-login-card-col"
              >
                <CRow
                  className="email-veri-login-card-row"
                  style={{ marginBottom: "100px" }}
                >
                  <CCard className="email-veri-login-card-web">
                    <CCardBody>
                      <CFormGroup
                        inline
                        style={{
                          marginTop: "1rem",
                          borderBox: "box-sizing",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "23px",
                            fontWeight: "bold",
                          }}
                        >
                          Verification Code
                        </h3>
                        <p
                          style={{
                            marginTop: "10px",
                            marginBottom: "20px",
                            fontSize: "15px",
                            fontWeight: "600",
                          }}
                        >
                          Please type the verification code sent to your email.
                        </p>
                        <CRow className="login-err">
                          <SuccessError error={error} success={success} />
                        </CRow>
                        <CLabel
                          style={{ fontWeight: "600", fontSize: "14px" }}
                          className="required"
                        >
                          Passcode
                        </CLabel>
                        <CRow className="passcode-row">
                          <CInput
                            type="text"
                            className="passcode-input"
                            onChange={inputHandleChange}
                            name="1"
                            autoFocus="focus"
                            value={ssnValues[0]["value"]}
                            onKeyDown={keyDownHandler}
                            onPaste={(e) => {
                              e.preventDefault();
                              return false;
                            }}
                          />
                          <CInput
                            type="text"
                            className="passcode-input"
                            onChange={inputHandleChange}
                            name="2"
                            value={ssnValues[1]["value"]}
                            onKeyDown={keyDownHandler}
                            onPaste={(e) => {
                              e.preventDefault();
                              return false;
                            }}
                          />
                          <CInput
                            type="text"
                            className="passcode-input"
                            onChange={inputHandleChange}
                            name="3"
                            value={ssnValues[2]["value"]}
                            onKeyDown={keyDownHandler}
                            onPaste={(e) => {
                              e.preventDefault();
                              return false;
                            }}
                          />
                          <CInput
                            type="text"
                            className="passcode-input"
                            onChange={inputHandleChange}
                            name="4"
                            value={ssnValues[3]["value"]}
                            onKeyDown={keyDownHandler}
                            onPaste={(e) => {
                              e.preventDefault();
                              return false;
                            }}
                          />
                          <CInput
                            type="text"
                            className="passcode-input"
                            onChange={inputHandleChange}
                            name="5"
                            value={ssnValues[4]["value"]}
                            onKeyDown={keyDownHandler}
                            onPaste={(e) => {
                              e.preventDefault();
                              return false;
                            }}
                          />
                          <CInput
                            type="text"
                            className="passcode-input"
                            onChange={inputHandleChange}
                            name="6"
                            style={{ marginRight: "0.2rem" }}
                            value={ssnValues[5]["value"]}
                            onKeyDown={keyDownHandler}
                            onPaste={(e) => {
                              e.preventDefault();
                              return false;
                            }}
                          />
                        </CRow>
                        <CRow className="submit-div mt-3">
                          <CCol className="text-right">
                            <CButton
                              className="cooreate-bold-btn"
                              onClick={() => resendClick()}
                            >
                              Resend
                            </CButton>
                            &nbsp; &nbsp;
                            <CButton
                              className="cooreate-bold-btn"
                              onClick={() => submitClick()}
                            >
                              Submit
                            </CButton>
                          </CCol>
                        </CRow>
                      </CFormGroup>
                    </CCardBody>
                  </CCard>
                </CRow>
              </CCol>
            </CRow>
          </CCol>
          <CCol lg="6" className="brycen-bg-col"></CCol>
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

            <CRow className="mb-5">
              <CImg
                src={process.env.PUBLIC_URL + "/image/resumegb.svg"}
                width={"100%"}
              ></CImg>
            </CRow>

            <br></br>
            <br></br>

            <CRow
              className="email-veri-login-card-row email-veri-login-card-web-moba"
              style={{ marginBottom: "100px" }}
            >
              <CFormGroup
                inline
                style={{
                  marginTop: "1rem",
                  borderBox: "box-sizing",
                }}
              >
                <h3
                  style={{
                    fontSize: "23px",
                    fontWeight: "bold",
                  }}
                >
                  Verification Code
                </h3>
                <p
                  style={{
                    marginTop: "10px",
                    marginBottom: "20px",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  Please type the verification code sent to your email.
                </p>
                <CRow className="login-err">
                  <SuccessError error={error} success={success} />
                </CRow>
                <CLabel
                  style={{ fontWeight: "600", fontSize: "14px" }}
                  className="required"
                >
                  Passcode
                </CLabel>
                <CRow className="passcode-row">
                  <CInput
                    type="text"
                    className="passcode-input"
                    onChange={inputHandleChange}
                    name="1"
                    autoFocus="focus"
                    value={ssnValues[0]["value"]}
                    onKeyDown={keyDownHandler}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                  <CInput
                    type="text"
                    className="passcode-input"
                    onChange={inputHandleChange}
                    name="2"
                    value={ssnValues[1]["value"]}
                    onKeyDown={keyDownHandler}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                  <CInput
                    type="text"
                    className="passcode-input"
                    onChange={inputHandleChange}
                    name="3"
                    value={ssnValues[2]["value"]}
                    onKeyDown={keyDownHandler}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                  <CInput
                    type="text"
                    className="passcode-input"
                    onChange={inputHandleChange}
                    name="4"
                    value={ssnValues[3]["value"]}
                    onKeyDown={keyDownHandler}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                  <CInput
                    type="text"
                    className="passcode-input"
                    onChange={inputHandleChange}
                    name="5"
                    value={ssnValues[4]["value"]}
                    onKeyDown={keyDownHandler}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                  <CInput
                    type="text"
                    className="passcode-input"
                    onChange={inputHandleChange}
                    name="6"
                    style={{ marginRight: "0.2rem" }}
                    value={ssnValues[5]["value"]}
                    onKeyDown={keyDownHandler}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                </CRow>
                <CRow className="submit-div mt-3">
                  <CCol className="text-right">
                    <CButton
                      className="cooreate-bold-btn"
                      onClick={() => resendClick()}
                    >
                      Resend
                    </CButton>
                    &nbsp; &nbsp;
                    <CButton
                      className="cooreate-bold-btn"
                      onClick={() => submitClick()}
                    >
                      Submit
                    </CButton>
                  </CCol>
                </CRow>
              </CFormGroup>
            </CRow>

            <CRow style={{ height: "60px" }}>&nbsp;</CRow>
          </div>
        </>
      )}
    </>
  );
};

export default UserLoginForm;
