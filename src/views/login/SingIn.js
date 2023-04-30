/**
 * SignIn
 * @author Yamin Zaw
 * @create
 */

import React, { useState, useEffect } from "react";
import {
  CCol,
  CImg,
  CRow,
  CButton,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CDropdown,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import background from "../../assets/icons/Bg2.png";
import mobaBg from "../../assets/icons/Bg.png";
import $ from "jquery";
import i18n from "../../i18n";
import { withTranslation } from "react-i18next";
import { FRONTEND_URL } from "./Constant";
import getPkce from "oauth-pkce";
import axios from "axios";

const SignIn = ({ t }) => {
  let history = useHistory(); //for history
  const [menuStatus, setMenuStatus] = useState(false);
  const [validate, setValidate] = useState(true);
  const [pkce, setPkce] = useState({});
  const [error, setError] = useState(""); // for error message localStorage.getItem('LOGIN_ERROR')
  const [errorShow, setErrorShow] = useState(false); // for error message show

  const [items] = useState([
    { label: t("English"), value: "en", img: "/image/english.png" },
    { label: t("Myanmar"), value: "mm", img: "/image/myanmar.png" },
    // { label: t('Japan'), value: "jp", img: "/image/japan.png" },
  ]);
  const [language, setLanguage] = useState("en");
  const [img, setImg] = useState("english");
  const [dValue, setdValue] = useState("English");

  const [zoomSize, setZoomSize] = useState(
    Math.round(window.devicePixelRatio * 100)
  );

  const AUTH_SERVER_URL = process.env.REACT_APP_API_ERP_URL;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  //use customize customer name
  let customer_name = window.location.href.split("/")[3];
  if (customer_name === "" || customer_name === null) {
    customer_name = "demo";
  }

  // sample -> http://project-erp.test/web/cliEntA/oauth/authorize?
  const authorizeURL = `${AUTH_SERVER_URL}/web/${customer_name}/oauth/authorize`;
  // sample -> http://localhost:3000/cliEntA/auth
  const redirectURI = `${FRONTEND_URL}/${customer_name}/auth`;

  const validateURL = `${AUTH_SERVER_URL}/api/${customer_name}/token-validation`;

  function stateGenerator(num) {
    return [...Array(num)].map(() => Math.random().toString(36)[2]).join("");
  }
  const state = stateGenerator(40);
  if (localStorage.getItem(`${customer_name}_SIGN_OUT`)) {
    localStorage.removeItem(`${customer_name}_SIGN_OUT`);
  }
  useEffect(() => {
    $(window).resize(function () {
      setZoomSize(Math.round(window.devicePixelRatio * 100));
    });

    let language = localStorage.getItem(`${customer_name}_LANGUAGE`);
    if(language == undefined){
      language ="en";
    }
    i18n.changeLanguage(language);
    if (language === "mm") {
      setdValue("Myanmar");
      setImg("myanmar");
      setLanguage(language);
    } else if (language === "en") {
      setdValue("English");
      setImg("english");
      setLanguage(language);
    }
    (async () => {
      // getPkce relies on the window object for its crypto api
      // put in in useEffect
      getPkce(50, (error, { verifier, challenge }) => {
        setPkce({ verifier, challenge });
      });

      if (
        window.localStorage.getItem(`${customer_name}_TOKEN`) !== null &&
        window.localStorage.getItem(`${customer_name}_REFRESH_TOKEN`) !== null
      ) {
        let validationResult = await validateToken(
          window.localStorage.getItem(`${customer_name}_TOKEN`)
        );

        if (validationResult) {
          setValidate(true);
          history.push(`/${customer_name}/recruit/Dashboard`);
        } else {
          setValidate(false);
          clearSession();
        }
      } else {
        setValidate(false);

        if (
          window.localStorage.getItem(`${customer_name}_LOGIN_ERROR`) !== null
        ) {
          setError(window.localStorage.getItem(`${customer_name}_LOGIN_ERROR`));
          setErrorShow(true);
          window.localStorage.removeItem(`${customer_name}_LOGIN_ERROR`);
        }
      }
    })();
  }, []);

  $(window).resize(function () {
    setZoomSize(Math.round(window.devicePixelRatio * 100));
  });
  const linkClick = (event) => {
    event.preventDefault();
    makeAuthorization();
  };

  //click menu icon
  const menuClick = () => {
    setMenuStatus(!menuStatus);
  };

  //to select dropdown value and translate english or myanmar
  let changeValue = (e) => {
    let data = e;
    let lng = data["value"];
    let language = data["label"];
    i18n.changeLanguage(lng);
    setdValue(language);
    localStorage.removeItem(`${customer_name}_LANGUAGE`);
    localStorage.setItem(`${customer_name}_LANGUAGE`, lng);
    window.location.reload(false);
  };

  //to pass authorization flow
  const makeAuthorization = () => {
    localStorage.setItem(`${customer_name}_state`, state);
    localStorage.setItem(`${customer_name}_verifier`, pkce.verifier);
    localStorage.setItem(`${customer_name}_LANGUAGE`, language);
    window.open(
      `${authorizeURL}?client_id=${CLIENT_ID}&language=${language}&redirect_uri=${redirectURI}&response_type=code&scope=*&state=${state}&code_challenge=${pkce.challenge}&code_challenge_method=S256`,
      "_self"
    );
  };

  //to know token is validate or not
  const validateToken = async (token) => {
    let result;
    const headers = {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        withCredentials: true, // to send cookie in request
      },
    };

    await axios
      .get(validateURL, headers)
      .then((response) => {
        result = true;
      })
      .catch((error) => {
        result = false;
      });

    return result;
  };

  //to clear session
  const clearSession = () => {
    localStorage.removeItem(`${customer_name}_TOKEN`);
    localStorage.removeItem(`${customer_name}_LANGUAGE`);
    localStorage.removeItem(`${customer_name}_TOKEN_TYPE`);
    localStorage.removeItem(`${customer_name}_EXPIRE`);
    localStorage.removeItem(`${customer_name}_EXPIRE_TIME`);
    localStorage.removeItem(`${customer_name}_REFRESH_TOKEN`);
    localStorage.removeItem(`${customer_name}_DEPARTMENT_ID`);
    localStorage.removeItem(`${customer_name}_POSITION_ID`);
    localStorage.removeItem(`${customer_name}_POSITION_RANK`);
    localStorage.removeItem(`${customer_name}_DEPARTMENT_POSITION`);
    localStorage.removeItem(`${customer_name}_LOGIN_ID`);
    localStorage.removeItem(`${customer_name}_COMPANY_ID`);
    localStorage.removeItem(`${customer_name}_PHOTO`);
    localStorage.removeItem(`${customer_name}_EMP_NAME`);
    localStorage.removeItem(`${customer_name}_EMAIL`);
    localStorage.removeItem(`${customer_name}_ROLE_ID`);
    localStorage.removeItem(`${customer_name}_EMPLOYEE_TYPE`);
    localStorage.removeItem(`${customer_name}_HR_MENU_COUNT`);
    localStorage.removeItem(`${customer_name}_PLAN_MENU_COUNT`);
    localStorage.removeItem(`${customer_name}_PERMISSION`);
    localStorage.removeItem(`${customer_name}_CNAME`);
    localStorage.removeItem(`${customer_name}_ENAME`);
    localStorage.removeItem(`${customer_name}_PACKAGE_NAME`);
    localStorage.removeItem(`${customer_name}_TOTAL_PACKAGE`);
    localStorage.removeItem(`${customer_name}_PACKAGE_SHORT_NAME`);
    localStorage.removeItem(`${customer_name}_PACKAGE_LINK`);
  };

  return (
    <>
      {zoomSize <= 140 && (
        <CRow
          className="c-app c-default-layout flex-row  login-bg"
          style={{ backgroundImage: `url(${background})` }}
        >
          <CCol
            lg="8"
            style={{ marginTop: "3rem", marginLeft: "2rem", fontSize: "17px" }}
          >
            <CRow style={{ textAlign: "center" }}>
              <CCol lg="2" style={{ maxWidth: "11%" }}>
                <a
                  className="link-style"
                  href="https://www.brycenmyanmar.com.mm/"
                >
                  {t("Home")}
                </a>
              </CCol>
              <CCol lg="2" style={{ maxWidth: "11%" }}>
                <a
                  className="link-style"
                  href="https://www.brycenmyanmar.com.mm/bamawl-hr/"
                >
                  {t("Products")}
                </a>
              </CCol>
              <CCol lg="2" style={{ maxWidth: "11%" }}>
                <a
                  className="link-style"
                  href="https://www.brycenmyanmar.com.mm/webinar/"
                >
                  {t("Webinar")}
                </a>
              </CCol>
              <CCol lg="2" style={{ maxWidth: "13%" }}>
                <a
                  className="link-style"
                  href="https://www.brycenmyanmar.com.mm/about-brycen-myanmar/"
                >
                  {t("About Us")}
                </a>
              </CCol>
              <CCol lg="2" style={{ maxWidth: "13%" }}>
                <a
                  className="link-style"
                  href="https://www.brycenmyanmar.com.mm/contact-us/"
                >
                  {t("Contact Us")}
                </a>
              </CCol>
              <CCol lg="2">
                <CDropdown
                  inNav
                  className="pr-width language language-menu"
                  style={{ marginTop: "-8px" }}
                >
                  <CDropdownToggle>
                    <div>
                      <div className="float-left pr-2">
                        <CImg
                          src={"/image/" + img + ".png"}
                          className="d-img"
                          alt={img + " logo"}
                        />
                      </div>
                    </div>
                    <span className="link-style">{t(dValue)}</span>
                  </CDropdownToggle>
                  <CDropdownMenu className="p-0">
                    {items.map((item) => (
                      <CDropdownItem
                        key={item.value}
                        value={item.value}
                        onClick={changeValue.bind(this, item)}
                      >
                        <div className="float-left">
                          <CImg
                            src={item.img}
                            className="d-img"
                            alt="admin@bootstrapmaster.com"
                          />
                        </div>
                        <div className="pl-2">{t(item.label)}</div>
                      </CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            </CRow>
            <CRow>
              <CCol lg="9">
                {" "}
                <h3 style={{ marginTop: "100px", marginBottom: "30px" }}>
                  Bamawl ERP System
                </h3>
                <h5>
                  Arranging payroll, storing accurate employee information,
                  keeping up-to-date attendance and monitoring performance of
                  employee workforce in system lead to provide the best support
                  of HR activities
                </h5>
              </CCol>
              <CCol lg="3"></CCol>
            </CRow>

            <CButton
              style={{ marginTop: "30px", width: "46%", height: "43px" }}
              className="signin-btn btn"
              onClick={linkClick}
            >
              {t("Sign In")}
            </CButton>
          </CCol>
        </CRow>
      )}

      {zoomSize > 140 && (
        <>
          <CRow
            className="c-app c-default-layout flex-row  login-bg"
            style={{
              backgroundImage: `url(${mobaBg})`,
              paddingTop: "2rem",
              paddingBottom: "2rem",
              justifyContent: "center",
            }}
          >
            <CCol
              lg="6"
              style={{
                marginTop: "3rem",
                marginLeft: "2rem",
                fontSize: "17px",
              }}
            >
              <CRow>
                <CCol lg="6" sm="6" xs="6"></CCol>
                <CCol lg="3" sm="3" xs="3">
                  <CDropdown inNav className="pr-width language language-menu">
                    <CDropdownToggle>
                      <div>
                        <div className="float-left pr-2">
                          <CImg
                            src={"/image/" + img + ".png"}
                            className="d-img"
                            alt={img + " logo"}
                          />
                        </div>
                      </div>
                      <span className="link-style">{t(dValue)}</span>
                    </CDropdownToggle>
                    <CDropdownMenu className="p-0">
                      {items.map((item) => (
                        <CDropdownItem
                          key={item.value}
                          value={item.value}
                          onClick={changeValue.bind(this, item)}
                        >
                          <div className="float-left">
                            <CImg
                              src={item.img}
                              className="d-img"
                              alt="admin@bootstrapmaster.com"
                            />
                          </div>
                          <div className="pl-2">{t(item.label)}</div>
                        </CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                </CCol>
                <CCol lg="3" sm="3" xs="3" style={{ textAlign: "end" }}>
                  <CImg
                    onClick={menuClick}
                    src="/image/menu.svg"
                    width={40}
                    height={40}
                  />
                </CCol>
                {menuStatus == true && (
                  <>
                    <CCol lg="6"></CCol>
                    <CCol lg="6">
                      <CRow style={{ justifyContent: "center" }}>
                        <a
                          className="link-style"
                          href="https://www.brycenmyanmar.com.mm/"
                        >
                          {t("Home")}
                        </a>
                      </CRow>
                      <CRow style={{ justifyContent: "center" }}>
                        <a
                          className="link-style"
                          href="https://www.brycenmyanmar.com.mm/bamawl-hr/"
                        >
                          {t("Products")}
                        </a>
                      </CRow>
                      <CRow style={{ justifyContent: "center" }}>
                        <a
                          className="link-style"
                          href="https://www.brycenmyanmar.com.mm/webinar/"
                        >
                          {t("Webinar")}
                        </a>
                      </CRow>
                      <CRow style={{ justifyContent: "center" }}>
                        <a
                          className="link-style"
                          href="https://www.brycenmyanmar.com.mm/about-brycen-myanmar/"
                        >
                          {t("About Us")}
                        </a>
                      </CRow>
                      <CRow style={{ justifyContent: "center" }}>
                        <a
                          className="link-style"
                          href="https://www.brycenmyanmar.com.mm/contact-us/"
                        >
                          {t("Contact Us")}
                        </a>
                      </CRow>
                    </CCol>
                  </>
                )}
              </CRow>
              <CRow>
                <CCol lg="9">
                  {" "}
                  <h3 style={{ marginTop: "100px", marginBottom: "30px" }}>
                    Bamawl ERP System
                  </h3>
                  <h5>
                    Arranging payroll, storing accurate employee information,
                    keeping up-to-date attendance and monitoring performance of
                    employee workforce in system lead to provide the best
                    support of HR activities
                  </h5>
                </CCol>
                <CCol lg="3"></CCol>
              </CRow>
              <CButton
                style={{ marginTop: "30px", width: "46%", height: "43px" }}
                className="create-btn btn"
                onClick={linkClick}
              >
                {t("Sign In")}
              </CButton>
            </CCol>
          </CRow>
        </>
      )}
    </>
  );
};

export default withTranslation()(SignIn);
