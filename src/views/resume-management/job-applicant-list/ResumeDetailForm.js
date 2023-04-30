/**
 * Resume Detail Form
 *
 * @author YuwaKoKo
 *
 * @create 17/9/2022
 *
 */
import React, { Fragment, useEffect, useState } from "react";
import Loading from "../../common/Loading";
import SuccessError from "../../common/SuccessError";
import { ApiRequest } from "../../common/ApiRequest";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CImg,
  CLabel,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import ApiPath from "../../common/ApiPath";
import { useTranslation } from "react-i18next";
import PermissionCheck from "../../common/permission-check/PermissionCheck";

const ResumeDetailForm = () => {
  let history = useHistory();
  const { t } = useTranslation();
  const [displayData, setDisplayData] = useState([]);
  const [scoreRemark, setScoreRemark] = useState([]);
  const [interviewer, setInterviewer] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  const [loading, setLoading] = useState(false); // For Loading
  const [success, setSuccess] = useState([]); // for success messages
  const [error, setError] = useState([]); //for error messages
  const [curreny, setCurrency] = useState();
  let customer_name = window.location.href.split("/")[3];

  useEffect(() => {
    (async () => {
      setLoading(true);
      await PermissionCheck();

      await getAllData();
    })();
  }, []);

  const backkey = () => {
    localStorage.setItem(
      `${customer_name}_JOB_ID`,
      localStorage.getItem(`${customer_name}_JID`)
    );
    localStorage.setItem(
      `${customer_name}_POS_ID`,
      localStorage.getItem(`${customer_name}_PID`)
    );
    localStorage.setItem(
      `${customer_name}_SU_ID`,
      localStorage.getItem(`${customer_name}_STATUS_ID`)
    );
    localStorage.setItem(
      `${customer_name}_ST_ID`,
      localStorage.getItem(`${customer_name}_STATE_ID`)
    );
    localStorage.setItem(
      `${customer_name}_R_ID`,
      localStorage.getItem(`${customer_name}_R_ID`)
    );
    localStorage.setItem(
      `${customer_name}_SARRAY`,
      localStorage.getItem(`${customer_name}_SARRAY`)
    );
    localStorage.setItem(
      `${customer_name}_SHOW_ARRAY`,
      localStorage.getItem(`${customer_name}_SHOW_ARRAY`)
    );
    localStorage.setItem(
      `${customer_name}_PAGE`,
      localStorage.getItem(`${customer_name}_PAGE`)
    );
    localStorage.getItem(
      `${customer_name}_CURRENCY`,
      localStorage.getItem(`${customer_name}_CURRENCY`)
    );

    history.push(
      `/${customer_name}/recruit/resume-management/job-applied-list`
    );
    localStorage.removeItem(`${customer_name}_JID`);
    localStorage.removeItem(`${customer_name}_PID`);
    localStorage.removeItem(`${customer_name}_STATUS_ID`);
    localStorage.removeItem(`${customer_name}_STATE_ID`);
    localStorage.removeItem(`${customer_name}_JOB_NAME`);
    localStorage.removeItem(`${customer_name}_POS_NAME`);
  };

  //State all data function from api
  let getAllData = async () => {
    setError([]);
    let states = {
      method: "get",
      package_name: "recruit",
      url: ApiPath.ResumeDetailFormGetAllData,
      params: {
        login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
        applicant_id: localStorage.getItem(`${customer_name}_APP_ID`),
        template_job_position_id: localStorage.getItem(
          `${customer_name}_TEMP_ID`
        ),
        applicant_status_info_id: localStorage.getItem(
          `${customer_name}_INFO_ID`
        ),
      },
    };
    let response = await ApiRequest(states);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        setDisplayData(response.data.data);
        response.data.data.template_element_labels.map((data, index) => {
          if (data.label_name == "Currency Type") {
            setCurrency(data.applicant_info[0].applicant_detail);
          }
        });
        setScoreRemark(
          response.data.data.template_element_labels[0].score_remark
        );
        setInterviewer(
          response.data.data.template_element_labels[0].interviewer
        );
        setDataTable(response.data.data.template_element_labels[0].offer_datas);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <CRow>
        <SuccessError success={success} error={error} />
      </CRow>
      <CRow>
        <CCol xs="12">
          <CCard
            style={{
              background: "white",
              paddingBottom: "30px",
              borderRadius: "1rem",
              overflow: "hidden",
            }}
          >
            <Loading start={loading} />
            <CCardHeader style={{ background: "#eff1fe" }}>
              <CRow>
                <div>
                  <CImg
                    className="user-after"
                    src={process.env.PUBLIC_URL + "/image/arrow.svg"}
                    style={{
                      width: "24px",
                      height: "24px",
                      cursor: "pointer",
                      marginTop: "18px",
                      marginLeft: "15px",
                    }}
                    onClick={backkey}
                  ></CImg>
                </div>
                <div>
                  <h3
                    style={{
                      color: "#373d77",
                      marginTop: "15px",
                      marginBottom: "20px",
                      cursor: "pointer",
                    }}
                    onClick={backkey}
                  >
                    {t("Back")}
                  </h3>
                </div>
              </CRow>
            </CCardHeader>
            <CCardBody style={{ background: "white" }}>
              {displayData.length > 0 &&
                displayData != "null" &&
                displayData.template_element_labels.map((data, idex) => {
                  if (data.element_type_id == 8) {
                    return (
                      <Fragment key={idex}>
                        <CRow className="mt-3">
                          <CCol lg="12" style={{ textAlign: "center" }}>
                            {" "}
                            {data.applicant_info.length > 0 &&
                              data.applicant_info.map((val, i) => {
                                if (val.applicant_cloud_file == "") {
                                } else {
                                  return (
                                    <CImg
                                      key={i}
                                      style={{
                                        borderRadius: "50%",
                                        border: "1px solid ",
                                      }}
                                      src={val.applicant_cloud_file}
                                      width={150}
                                      height={150}
                                    ></CImg>
                                  );
                                }
                              })}
                          </CCol>
                        </CRow>
                        <br></br>
                      </Fragment>
                    );
                  }
                })}
              <CRow>
                {displayData.length > 0 &&
                  displayData != "null" &&
                  displayData.template_element_labels.map((data, index) => {
                    if (
                      data.element_type_id == 4 &&
                      data.label_name.toLowerCase() == "name"
                    ) {
                      return (
                        <CCol lg="12" key={index}>
                          <CRow>
                            <CCol
                              lg="12"
                              style={{
                                fontWeight: "bold",
                                textAlign: "center",
                                fontSize: "30px",
                              }}
                            >
                              {data.applicant_info.length > 0 &&
                                data.applicant_info.map((val, i) => {
                                  return (
                                    <Fragment key={i}>
                                      {" "}
                                      {val.applicant_detail != "" &&
                                        val.applicant_detail}
                                      {val.applicant_detail == "" && "-"}
                                    </Fragment>
                                  );
                                })}
                            </CCol>
                          </CRow>
                        </CCol>
                      );
                    }
                  })}

                {localStorage.getItem(`${customer_name}_JOB_NAME`) != "" &&
                  localStorage.getItem(`${customer_name}_POS_NAME`) != "" && (
                    <CCol
                      lg="12"
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      {localStorage.getItem(`${customer_name}_POS_NAME`)}
                    </CCol>
                  )}
              </CRow>
              <CRow className="mt-3">
                <CCol lg="12">
                  {" "}
                  <CLabel
                    style={{
                      color: "white",
                      marginTop: "7px",
                      background: "#4e57aa",
                      width: "100%",
                      fontSize: "22px",
                      padding: "13px",
                      borderRadius: "7px",
                    }}
                  >
                    {t("Candidate Information")}
                  </CLabel>
                </CCol>
              </CRow>
              <CRow className="mt-3">
                {displayData.length > 0 &&
                  displayData != "null" &&
                  displayData.template_element_labels.map((data, index) => {
                    if (
                      data.element_type_id == 4 &&
                      data.label_name.toLowerCase() != "name"
                    ) {
                      return (
                        <CCol lg="12" key={index} style={{ padding: "10px" }}>
                          <CRow>
                            <CCol
                              lg="1"
                              style={{ maxWidth: "3.33333%" }}
                            ></CCol>
                            <CCol lg="2">{data.label_name}</CCol>

                            <CCol lg="9" style={{ fontWeight: "bold" }}>
                              {data.applicant_info.length > 0 &&
                                data.applicant_info.map((val, i) => {
                                  return (
                                    <Fragment key={i}>
                                      {val.applicant_detail != "" &&
                                        val.applicant_detail}
                                      {val.applicant_detail == "" && "-"}
                                    </Fragment>
                                  );
                                })}
                            </CCol>
                          </CRow>
                        </CCol>
                      );
                    }
                    if (data.element_type_id == 5) {
                      return (
                        <CCol lg="12" key={index} style={{ padding: "10px" }}>
                          <CRow>
                            <CCol
                              lg="1"
                              style={{ maxWidth: "3.33333%" }}
                            ></CCol>
                            <CCol lg="2">{data.label_name}</CCol>

                            <CCol lg="9" style={{ fontWeight: "bold" }}>
                              {data.applicant_info.length > 0 &&
                                data.applicant_info.map((val, i) => {
                                  return (
                                    <Fragment key={i}>
                                      {" "}
                                      {val.applicant_detail != "" &&
                                        val.applicant_detail}
                                      {val.applicant_detail == "" && "-"}
                                    </Fragment>
                                  );
                                })}
                            </CCol>
                          </CRow>
                        </CCol>
                      );
                    }
                    if (data.element_type_id == 6) {
                      return (
                        <CCol lg="12" key={index} style={{ padding: "10px" }}>
                          <CRow>
                            <CCol
                              lg="1"
                              style={{ maxWidth: "3.33333%" }}
                            ></CCol>
                            <CCol lg="2">{data.label_name}</CCol>

                            <CCol lg="9" style={{ fontWeight: "bold" }}>
                              {data.applicant_info.length > 0 &&
                                data.applicant_info.map((val, i) => {
                                  return (
                                    <Fragment key={i}>
                                      {val.applicant_detail != "" &&
                                        val.applicant_detail}
                                      {val.applicant_detail == "" && "-"}
                                    </Fragment>
                                  );
                                })}
                            </CCol>
                          </CRow>
                        </CCol>
                      );
                    }
                    if (data.element_type_id == 11) {
                      return (
                        <CCol lg="12" key={index} style={{ padding: "10px" }}>
                          <CRow>
                            <CCol
                              lg="1"
                              style={{ maxWidth: "3.33333%" }}
                            ></CCol>
                            <CCol lg="2">{data.label_name}</CCol>

                            <CCol lg="9" style={{ fontWeight: "bold" }}>
                              {data.applicant_info.length > 0 &&
                                data.applicant_info.map((val, i) => {
                                  return (
                                    <Fragment key={i}>
                                      {val.applicant_detail != "" &&
                                        val.applicant_detail}
                                      {val.applicant_detail == "" && "-"}
                                    </Fragment>
                                  );
                                })}
                              {data.applicant_info.length == 0 && "-"}
                            </CCol>
                          </CRow>
                        </CCol>
                      );
                    }

                    if (
                      data.element_type_id == 10 &&
                      data.label_name != "Currency Type"
                    ) {
                      return (
                        <CCol lg="12" key={index} style={{ padding: "10px" }}>
                          <CRow>
                            <CCol
                              lg="1"
                              style={{ maxWidth: "3.33333%" }}
                            ></CCol>
                            <CCol lg="2">{data.label_name}</CCol>
                            {data.label_name == "Expected Salary" && (
                              <CCol lg="9" style={{ fontWeight: "bold" }}>
                                {data.applicant_info.length > 0 &&
                                  data.applicant_info.map((val, i) => {
                                    return (
                                      <Fragment key={i}>
                                        {" "}
                                        {val.applicant_detail != "" &&
                                          val.applicant_detail}{" "}
                                        ({curreny})
                                        {val.applicant_detail == "" && "-"}
                                      </Fragment>
                                    );
                                  })}
                              </CCol>
                            )}
                            {data.label_name != "Expected Salary" && (
                              <CCol lg="9" style={{ fontWeight: "bold" }}>
                                {data.applicant_info.length > 0 &&
                                  data.applicant_info.map((val, i) => {
                                    return (
                                      <Fragment key={i}>
                                        {" "}
                                        {val.applicant_detail != "" &&
                                          val.applicant_detail}
                                        {val.applicant_detail == "" && "-"}
                                      </Fragment>
                                    );
                                  })}
                              </CCol>
                            )}
                          </CRow>
                        </CCol>
                      );
                    }
                    if (data.element_type_id == 9) {
                      return (
                        <CCol lg="12" key={index} style={{ padding: "10px" }}>
                          <CRow>
                            <CCol
                              lg="1"
                              style={{ maxWidth: "3.33333%" }}
                            ></CCol>
                            <CCol lg="2">{data.label_name}</CCol>

                            <CCol lg="9" style={{ fontWeight: "bold" }}>
                              {data.applicant_info.length > 0 &&
                                data.applicant_info.map((val, i) => {
                                  return (
                                    <Fragment key={i}>
                                      {" "}
                                      {val.applicant_detail != "" &&
                                        val.applicant_detail}
                                      {val.applicant_detail == "" && "-"}
                                    </Fragment>
                                  );
                                })}
                              {data.applicant_info.length == 0 && "-"}
                            </CCol>
                          </CRow>
                        </CCol>
                      );
                    }
                    if (data.element_type_id == 12) {
                      return (
                        <CCol lg="12" key={index} style={{ padding: "10px" }}>
                          <CRow>
                            <CCol
                              lg="1"
                              style={{ maxWidth: "3.33333%" }}
                            ></CCol>
                            <CCol lg="2">{data.label_name}</CCol>

                            <CCol lg="9" style={{ fontWeight: "bold" }}>
                              {data.applicant_info.length > 0 &&
                                data.applicant_info.map((val, i) => {
                                  return (
                                    <Fragment key={i}>
                                      {val.applicant_info != "" && (
                                        <a href={val.applicant_detail}>
                                          {" "}
                                          {val.applicant_detail}
                                        </a>
                                      )}
                                      {val.applicant_detail == "" && "-"}
                                    </Fragment>
                                  );
                                })}
                            </CCol>
                          </CRow>
                        </CCol>
                      );
                    }
                    if (data.element_type_id == 1) {
                      return (
                        <CCol lg="12" key={index} style={{ padding: "10px" }}>
                          <CRow>
                            <CCol
                              lg="1"
                              style={{ maxWidth: "3.33333%" }}
                            ></CCol>
                            <CCol lg="2">{data.label_name}</CCol>

                            <CCol lg="9" style={{ fontWeight: "bold" }}>
                              {data.applicant_info.length > 0 &&
                                data.applicant_info.map((val, i) => {
                                  return (
                                    <Fragment key={i}>
                                      {val.applicant_detail != "" &&
                                        val.applicant_detail}
                                      {val.applicant_detail == "" && "-"}
                                    </Fragment>
                                  );
                                })}
                            </CCol>
                          </CRow>
                        </CCol>
                      );
                    }
                    if (data.element_type_id == 3) {
                      return (
                        <CCol lg="12" key={index} style={{ padding: "10px" }}>
                          <CRow>
                            <CCol
                              lg="1"
                              style={{ maxWidth: "3.33333%" }}
                            ></CCol>
                            <CCol lg="2">{data.label_name}</CCol>

                            <CCol lg="9" style={{ fontWeight: "bold" }}>
                              {data.applicant_info.length > 0 &&
                                data.applicant_info.map((val, i) => {
                                  return (
                                    <Fragment key={i}>
                                      {" "}
                                      {val.applicant_detail != "" &&
                                        val.applicant_detail}
                                      {val.applicant_detail == "" && "-"}
                                    </Fragment>
                                  );
                                })}
                            </CCol>
                          </CRow>
                        </CCol>
                      );
                    }

                    if (data.element_type_id == 2 && data.levels.length < 1) {
                      return (
                        <CCol lg="12" key={index} style={{ padding: "10px" }}>
                          <CRow>
                            <CCol
                              lg="1"
                              style={{ maxWidth: "3.33333%" }}
                            ></CCol>
                            <CCol lg="2">{data.label_name}</CCol>

                            <CCol lg="9" style={{ fontWeight: "bold" }}>
                              {data.applicant_info.length > 0 &&
                                data.applicant_info.map((val, i) => {
                                  if (val.applicant_detail == "") return <>-</>;
                                  if (val.applicant_detail != "")
                                    return (
                                      <Fragment key={i}>
                                        {val.applicant_detail}
                                        &nbsp;&nbsp;
                                      </Fragment>
                                    );
                                })}
                            </CCol>
                          </CRow>
                        </CCol>
                      );
                    } else if (data.element_type_id == 2) {
                      return (
                        <CCol lg="12" key={index} style={{ padding: "10px" }}>
                          <CRow>
                            <CCol
                              lg="1"
                              style={{ maxWidth: "3.33333%" }}
                            ></CCol>
                            <CCol lg="2">{data.label_name}</CCol>

                            <CCol lg="9" style={{ fontWeight: "bold" }}>
                              {data.applicant_info.length > 0 &&
                                data.applicant_info.map((val, i) => {
                                  if (val.applicant_detail == "") return <>-</>;
                                  if (val.applicant_detail != "")
                                    return (
                                      <Fragment key={i}>
                                        {val.applicant_detail}({val.level_id}
                                        )&nbsp;&nbsp;
                                      </Fragment>
                                    );
                                })}
                            </CCol>
                          </CRow>
                        </CCol>
                      );
                    }
                  })}
              </CRow>
              {scoreRemark.length != 0 && scoreRemark != "null" && (
                <>
                  <CRow className="mt-3">
                    <CCol lg="12">
                      {" "}
                      <CLabel
                        style={{
                          color: "white",
                          marginTop: "7px",
                          background: "#4e57aa",
                          width: "100%",
                          fontSize: "22px",
                          padding: "13px",
                          borderRadius: "7px",
                        }}
                      >
                        {t("Candidate States")}
                      </CLabel>
                    </CCol>
                  </CRow>
                </>
              )}
              {scoreRemark.length > 0 &&
                scoreRemark != "null" &&
                scoreRemark.map((data, i) => {
                  if (data.state_id == 2 && data.status == 2) {
                    return (
                      <Fragment key={i}>
                        <CRow className="mt-3">
                          <CCol lg="1" style={{ maxWidth: "5.33333%" }}></CCol>
                          <CCol lg="1">
                            <CImg
                              className="user-after"
                              src={process.env.PUBLIC_URL + "/image/circle.png"}
                              style={{
                                width: "48px",
                                height: "48px",
                                marginTop: "15px",
                                marginLeft: "15px",
                              }}
                            ></CImg>
                          </CCol>
                          <CCol
                            lg="10"
                            style={{ fontWeight: "bold", marginTop: "10px" }}
                          >
                            <span style={{ fontSize: "16px" }}>
                              {t("Skill Test")}{" "}
                            </span>
                            <CLabel
                              style={{
                                color: "white",
                                background: "#4e57aa",
                                padding: "2px",
                                marginLeft: "102px",
                                borderRadius: "20px",
                              }}
                            >
                              &nbsp;&nbsp;{t("Score")} &nbsp;&nbsp;{data.score}
                              &nbsp;&nbsp;
                            </CLabel>
                            <br></br>
                            <p style={{ fontWeight: "normal" }}>
                              {data.remark}
                            </p>
                          </CCol>
                        </CRow>
                      </Fragment>
                    );
                  }

                  if (data.state_id == 2 && data.status == 4) {
                    return (
                      <Fragment key={i}>
                        <CRow className="mt-3">
                          <CCol lg="1" style={{ maxWidth: "5.33333%" }}></CCol>
                          <CCol lg="1">
                            <CImg
                              className="user-after"
                              src={
                                process.env.PUBLIC_URL + "/image/circlfalse.svg"
                              }
                              style={{
                                width: "48px",
                                height: "48px",
                                marginTop: "15px",
                                marginLeft: "15px",
                              }}
                            ></CImg>
                          </CCol>
                          <CCol
                            lg="10"
                            style={{ fontWeight: "bold", marginTop: "10px" }}
                          >
                            <span style={{ fontSize: "16px" }}>
                              {t("Skill Test (Reject)")}
                            </span>
                            <CLabel
                              style={{
                                color: "white",
                                background: "red",
                                padding: "2px",
                                marginLeft: "30px",
                                borderRadius: "20px",
                              }}
                            >
                              &nbsp;&nbsp;{t("Score")} &nbsp;&nbsp;{data.score}
                              &nbsp;&nbsp;
                            </CLabel>
                            <br></br>
                            <p style={{ fontWeight: "normal" }}>
                              {data.remark}
                            </p>
                          </CCol>
                        </CRow>
                      </Fragment>
                    );
                  }
                  if (data.state_id == 3 && data.status == 2) {
                    return (
                      <CRow className="mt-3" key={i}>
                        <CCol lg="1" style={{ maxWidth: "5.33333%" }}></CCol>
                        <CCol lg="1">
                          <CImg
                            className="user-after"
                            src={process.env.PUBLIC_URL + "/image/circle.png"}
                            style={{
                              width: "48px",
                              height: "48px",
                              marginTop: "25px",
                              marginLeft: "15px",
                            }}
                          ></CImg>
                        </CCol>
                        <CCol
                          lg="10"
                          style={{ fontWeight: "bold", marginTop: "25px" }}
                        >
                          <span style={{ fontSize: "16px" }}>
                            {t("1st Interview")}{" "}
                          </span>
                          <CLabel
                            style={{
                              color: "white",
                              background: "#4e57aa",
                              padding: "2px",
                              marginLeft: "80px",
                              borderRadius: "20px",
                            }}
                          >
                            &nbsp;&nbsp;{t("Score")} &nbsp;&nbsp;{data.score}
                            &nbsp;&nbsp;
                          </CLabel>
                          <br></br>
                          <p>
                            <span
                              style={{ fontWeight: "normal", opacity: "0.8" }}
                            >
                              {t("Interviewer")}
                            </span>
                            <br></br>
                            {data.interviewer_name}
                          </p>
                          <p style={{ fontWeight: "normal" }}>{data.remark}</p>
                        </CCol>
                      </CRow>
                    );
                  }

                  if (data.state_id == 3 && data.status == 4) {
                    return (
                      <CRow className="mt-3" key={i}>
                        <CCol lg="1" style={{ maxWidth: "5.33333%" }}></CCol>
                        <CCol lg="1">
                          <CImg
                            className="user-after"
                            src={
                              process.env.PUBLIC_URL + "/image/circlfalse.svg"
                            }
                            style={{
                              width: "48px",
                              height: "48px",
                              marginTop: "25px",
                              marginLeft: "15px",
                            }}
                          ></CImg>
                        </CCol>
                        <CCol
                          lg="10"
                          style={{ fontWeight: "bold", marginTop: "25px" }}
                        >
                          <span style={{ fontSize: "16px" }}>
                            {t("1st Interview (Reject)")}
                          </span>
                          <CLabel
                            style={{
                              color: "white",
                              background: "red",
                              padding: "2px",
                              marginLeft: "29px",
                              borderRadius: "20px",
                            }}
                          >
                            &nbsp;&nbsp;{t("Score")} &nbsp;&nbsp;{data.score}
                            &nbsp;&nbsp;
                          </CLabel>
                          <br></br>
                          <p>
                            <span
                              style={{ fontWeight: "normal", opacity: "0.8" }}
                            >
                              {t("Interviewer")}
                            </span>
                            <br></br>
                            {data.interviewer_name}
                          </p>
                          <p style={{ fontWeight: "normal" }}>{data.remark}</p>
                        </CCol>
                      </CRow>
                    );
                  }
                  if (data.state_id == 4 && data.status == 2) {
                    return (
                      <CRow className="mt-3" key={i}>
                        <CCol lg="1" style={{ maxWidth: "5.33333%" }}></CCol>
                        <CCol lg="1">
                          <CImg
                            className="user-after"
                            src={process.env.PUBLIC_URL + "/image/circle.png"}
                            style={{
                              width: "48px",
                              height: "48px",
                              marginTop: "25px",
                              marginLeft: "15px",
                            }}
                          ></CImg>
                        </CCol>
                        <CCol
                          lg="10"
                          style={{ fontWeight: "bold", marginTop: "25px" }}
                        >
                          <span style={{ fontSize: "16px" }}>
                            {t("2nd Interview")}
                          </span>
                          <CLabel
                            style={{
                              color: "white",
                              background: "#4e57aa",
                              padding: "2px",
                              marginLeft: "80px",
                              borderRadius: "20px",
                            }}
                          >
                            &nbsp;&nbsp;{t("Score")} &nbsp;&nbsp;{data.score}
                            &nbsp;&nbsp;
                          </CLabel>
                          <br></br>
                          <p>
                            <span
                              style={{ fontWeight: "normal", opacity: "0.8" }}
                            >
                              {t("Interviewer")}
                            </span>
                            <br></br>
                            {data.interviewer_name}
                          </p>
                          <p style={{ fontWeight: "normal" }}>{data.remark}</p>
                        </CCol>
                      </CRow>
                    );
                  }

                  if (data.state_id == 4 && data.status == 4) {
                    return (
                      <CRow className="mt-3" key={i}>
                        <CCol lg="1" style={{ maxWidth: "5.33333%" }}></CCol>
                        <CCol lg="1">
                          <CImg
                            className="user-after"
                            src={
                              process.env.PUBLIC_URL + "/image/circlfalse.svg"
                            }
                            style={{
                              width: "48px",
                              height: "48px",
                              marginTop: "25px",
                              marginLeft: "15px",
                            }}
                          ></CImg>
                        </CCol>
                        <CCol
                          lg="10"
                          style={{ fontWeight: "bold", marginTop: "25px" }}
                        >
                          <span style={{ fontSize: "16px" }}>
                            {t("2nd Interview (Reject)")}
                          </span>
                          <CLabel
                            style={{
                              color: "white",
                              background: "red",
                              padding: "2px",
                              marginLeft: "29px",
                              borderRadius: "20px",
                            }}
                          >
                            &nbsp;&nbsp;{t("Score")} &nbsp;&nbsp;{data.score}
                            &nbsp;&nbsp;
                          </CLabel>
                          <br></br>
                          <p>
                            <span
                              style={{ fontWeight: "normal", opacity: "0.8" }}
                            >
                              {t("Interviewer")}
                            </span>
                            <br></br>
                            {data.interviewer_name}
                          </p>
                          <p style={{ fontWeight: "normal" }}>{data.remark}</p>
                        </CCol>
                      </CRow>
                    );
                  }

                  if (data.state_id == 5 && data.status == 2) {
                    return (
                      <CRow className="mt-3" key={i}>
                        <CCol lg="1" style={{ maxWidth: "5.33333%" }}></CCol>
                        <CCol lg="1">
                          <CImg
                            className="user-after"
                            src={process.env.PUBLIC_URL + "/image/circle.png"}
                            style={{
                              width: "48px",
                              height: "48px",
                              marginTop: "25px",
                              marginLeft: "15px",
                            }}
                          ></CImg>
                        </CCol>
                        <CCol
                          lg="10"
                          style={{ fontWeight: "bold", marginTop: "25px" }}
                        >
                          <span style={{ fontSize: "16px" }}>
                            {t("3rd Interview")}
                          </span>
                          <CLabel
                            style={{
                              color: "white",
                              background: "#4e57aa",
                              padding: "2px",
                              marginLeft: "80px",
                              borderRadius: "20px",
                            }}
                          >
                            &nbsp;&nbsp;{t("Score")} &nbsp;&nbsp;{data.score}
                            &nbsp;&nbsp;
                          </CLabel>
                          <br></br>
                          <p>
                            <span
                              style={{ fontWeight: "normal", opacity: "0.8" }}
                            >
                              {t("Interviewer")}
                            </span>
                            <br></br>
                            {data.interviewer_name}
                          </p>
                          <p style={{ fontWeight: "normal" }}>{data.remark}</p>
                        </CCol>
                      </CRow>
                    );
                  }

                  if (data.state_id == 5 && data.status == 4) {
                    return (
                      <CRow className="mt-3" key={i}>
                        <CCol lg="1" style={{ maxWidth: "5.33333%" }}></CCol>
                        <CCol lg="1">
                          <CImg
                            className="user-after"
                            src={
                              process.env.PUBLIC_URL + "/image/circlfalse.svg"
                            }
                            style={{
                              width: "48px",
                              height: "48px",
                              marginTop: "25px",
                              marginLeft: "15px",
                            }}
                          ></CImg>
                        </CCol>
                        <CCol
                          lg="10"
                          style={{ fontWeight: "bold", marginTop: "25px" }}
                        >
                          <span style={{ fontSize: "16px" }}>
                            {t("3rd Interview (Reject)")}
                          </span>
                          <CLabel
                            style={{
                              color: "white",
                              background: "red",
                              padding: "2px",
                              marginLeft: "29px",
                              borderRadius: "20px",
                            }}
                          >
                            &nbsp;&nbsp;{t("Score")} &nbsp;&nbsp;{data.score}
                            &nbsp;&nbsp;
                          </CLabel>
                          <br></br>
                          <p>
                            <span
                              style={{ fontWeight: "normal", opacity: "0.8" }}
                            >
                              {t("Interviewer")}
                            </span>
                            <br></br>
                            {data.interviewer_name}
                          </p>
                          <p style={{ fontWeight: "normal" }}>{data.remark}</p>
                        </CCol>
                      </CRow>
                    );
                  }
                })}
              <br></br> <br></br>
              {dataTable.length == 0 && (
                <CRow
                  lg="12"
                  style={{ borderBottom: "1px solid #d6d6d6" }}
                ></CRow>
              )}
              {dataTable.length > 0 && (
                <>
                  <CRow>
                    <CCol lg="12">
                      <table className="main-table templateList-table-detail">
                        <thead className="text-center">
                          <tr>
                            <th
                              style={{
                                width: 130,
                                borderTopLeftRadius: "10px",
                              }}
                            >
                              {t("Joined Date")}
                            </th>
                            <th style={{ width: 130 }}>{t("Salary")}</th>
                            <th style={{ width: 130 }}>
                              {t("Transportation Allowance")}
                            </th>
                            <th style={{ width: 130 }}>
                              {t("Hostel Allowance")}
                            </th>
                            <th
                              style={{
                                width: 500,
                                borderTopRightRadius: "10px",
                              }}
                            >
                              {" "}
                              {t("Remark")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                width: 130,
                                borderBottomLeftRadius: "10px",
                              }}
                              className="text-center"
                            >
                              {dataTable[0].applied_date == null && "-"}
                              {dataTable[0].applied_date}
                            </td>
                            <td style={{ width: 130 }} className="text-center">
                              {dataTable[0].checker == true &&
                                dataTable[0].salary_pay}
                              {(dataTable[0].salary_pay == null ||
                                dataTable[0].checker == false) &&
                                "-"}
                            </td>
                            <td style={{ width: 130 }} className="text-center">
                              {" "}
                              {dataTable[0].checker == true &&
                                dataTable[0].transport}
                              {(dataTable[0].transport == null ||
                                dataTable[0].checker == false) &&
                                "-"}
                            </td>
                            <td style={{ width: 130 }} className="text-center">
                              {dataTable[0].checker == true &&
                                dataTable[0].hostel}
                              {(dataTable[0].hostel == null ||
                                dataTable[0].checker == false) &&
                                "-"}
                            </td>
                            <td
                              style={{
                                width: 500,
                                wordBreak: "break-all",
                                borderBottomRightRadius: "10px",
                              }}
                              className="text-center"
                            >
                              {dataTable[0].remark}
                              {dataTable[0].remark == null && "-"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </CCol>
                  </CRow>
                </>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ResumeDetailForm;
