/**
 * Dashboard form
 *
 * @author YuwaKoKo
 *
 * @create 17/20/2022
 *
 */

import React, { Fragment } from "react";
import SuccessError from "../common/SuccessError";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImg,
  CLabel,
  CRow,
} from "@coreui/react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";

const DashboardForm = (props) => {
  let {
    options,
    series,
    topData,
    candidateCard,
    success,
    error,
    barHeigh,
    appliedClick,
    skillTestClick,
    interview1stClick,
    interview2ndClick,
    approveClick,
    offerClick,
  } = props;

  const { t } = useTranslation();

  return (
    <>
      <CRow>
        <SuccessError success={success} error={error} />
      </CRow>
      <CRow>
        <CCol lg="12" xs="12">
          <CCard
            style={{
              background: "#eff1fe",
              paddingBottom: "30px",
              borderRadius: "1rem",
              overflow: "hidden",
            }}
          >
            <CRow>
              <CCol lg="1" style={{ maxWidth: "0.33333%" }}></CCol>
              <CCol lg="5">
                <CRow>
                  <CCol lg="12" style={{ marginLeft: "5px" }}>
                    <h3
                      style={{
                        color: "#373d77",
                        marginTop: "15px",
                        marginBottom: "20px",
                      }}
                    >
                      {t("Total Applied Candidates")}
                    </h3>
                  </CCol>
                </CRow>
                <CRow style={{ marginTop: "25px" }}>
                  {topData.length > 0 &&
                    topData.map((data, index) => {
                      return (
                        <Fragment key={Math.random()}>
                          <CCol lg="6">
                            <CCard
                              style={{ padding: "10px" }}
                              onClick={() =>
                                candidateCard(data.template_job_position_id)
                              }
                            >
                              <CRow>
                                <CCol
                                  lg="12"
                                  style={{
                                    textAlign: "start",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    wordBreak: "break-all",
                                  }}
                                >
                                  {" "}
                                  <CLabel>
                                    {data.category_name}({data.position_name})
                                  </CLabel>
                                </CCol>
                              </CRow>

                              <CRow>
                                <CCol
                                  lg="9"
                                  style={{
                                    textAlign: "start",
                                    fontSize: "11px",
                                  }}
                                >
                                  {" "}
                                  <CLabel>{t("Today Apply")}</CLabel>
                                </CCol>
                                <CCol
                                  lg="3"
                                  style={{
                                    textAlign: "end",
                                    paddingLeft: "16px",
                                    fontSize: "11px",
                                  }}
                                >
                                  {" "}
                                  <CLabel>{data.today_applicant}</CLabel>
                                </CCol>
                              </CRow>

                              <CRow>
                                <CCol
                                  lg="9"
                                  style={{
                                    textAlign: "start",
                                    fontSize: "11px",
                                  }}
                                >
                                  {" "}
                                  <CLabel>{t("Total Apply")}</CLabel>
                                </CCol>
                                <CCol
                                  lg="3"
                                  style={{
                                    textAlign: "end",
                                    paddingLeft: "16px",
                                    fontSize: "11px",
                                  }}
                                >
                                  {" "}
                                  <CLabel>{data.total_applicant}</CLabel>
                                </CCol>
                              </CRow>
                            </CCard>
                          </CCol>
                        </Fragment>
                      );
                    })}
                </CRow>
              </CCol>
              <CCol lg="6">
                <CRow>
                  <CCol lg="1" style={{ maxWidth: "0.33333%" }}></CCol>
                  <CCol lg="11" style={{ marginLeft: "5px" }}>
                    <h3
                      style={{
                        color: "#373d77",
                        marginTop: "15px",
                        marginBottom: "20px",
                      }}
                    >
                      {t("Graph of Total Candidates")}
                    </h3>
                  </CCol>
                </CRow>

                <ReactApexChart
                  style={{ marginLeft: "5px" }}
                  options={options}
                  series={series}
                  type="bar"
                  height={barHeigh}
                />
              </CCol>
            </CRow>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        {topData.length > 0 &&
          topData.map((data, index) => {
            let c_card = "";
            let c_card_hearder = "";
            if ((index + 1) % 12 == 1) {
              c_card = "#f3ecff";
              c_card_hearder = "#775ea6";
            } else if ((index + 1) % 12 == 2) {
              c_card = "#f5feff";
              c_card_hearder = "#039daf";
            } else if ((index + 1) % 12 == 3) {
              c_card = "#feecf3";
              c_card_hearder = "#f86fa9";
            } else if ((index + 1) % 12 == 4) {
              c_card = "#f4ebff";
              c_card_hearder = "#ab66ff";
            } else if ((index + 1) % 12 == 5) {
              c_card = "#f2f5f7";
              c_card_hearder = "#a1b7c4";
            } else if ((index + 1) % 12 == 6) {
              c_card = "#ebf9ff";
              c_card_hearder = "#67d3fe";
            } else if ((index + 1) % 12 == 7) {
              c_card = "#f2f4f8";
              c_card_hearder = "#9ca9c9";
            } else if ((index + 1) % 12 == 8) {
              c_card = "#feecfc";
              c_card_hearder = "#f86fea";
            } else if ((index + 1) % 12 == 9) {
              c_card = "#ebebff";
              c_card_hearder = "#666cff";
            } else if ((index + 1) % 12 == 10) {
              c_card = "#fff3eb";
              c_card_hearder = "#fca769";
            } else if ((index + 1) % 12 == 11) {
              c_card = "#effbf1";
              c_card_hearder = "#85e099";
            } else if ((index + 1) % 12 == 0) {
              c_card = "#f9f8f1";
              c_card_hearder = "#b3af5b";
            }

            return (
              <CCol
                lg="4"
                key={index}
                id={`card${data.template_job_position_id}`}
              >
                {" "}
                <CCard
                  style={{
                    background: `${c_card}`,
                    paddingBottom: "-10px",
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                  }}
                >
                  <CCardHeader style={{ background: `${c_card_hearder}` }}>
                    <CRow style={{ color: "white", marginTop: "10px" }}>
                      <CImg
                        src={process.env.PUBLIC_URL + "/image/user.svg"}
                        style={{
                          width: "20px",
                          height: "20px",
                          marginLeft: "17px",
                        }}
                      ></CImg>
                      <CLabel
                        style={{
                          fontSize: "13px",
                          fontWeight: "bold",
                          marginLeft: "10px",
                          marginTop: "1px",
                        }}
                      >
                        {data.category_name}({data.position_name})
                      </CLabel>
                    </CRow>
                  </CCardHeader>
                  <CCardBody style={{ background: `${c_card}` }}>
                    <CRow>
                      <CCol
                        lg="8"
                        style={{
                          textAlign: "start",
                          padding: "3px",
                          fontSize: "12px",
                        }}
                      >
                        <CLabel>{t("Applied")} -</CLabel>
                      </CCol>
                      <CCol
                        lg="4"
                        style={{
                          textAlign: "end",
                          paddingLeft: "16px",
                          padding: "3px",
                          fontSize: "12px",
                        }}
                      >
                        {data.job_category_apply == 0 ? (
                          <CLabel>
                            {data.job_category_apply} {t("Candidates")}
                          </CLabel>
                        ) : (
                          <CLabel
                            className="linkTxT"
                            onClick={() =>
                              appliedClick(
                                data.job_category_id,
                                data.position_id,
                                data.template_job_position_id
                              )
                            }
                          >
                            {data.job_category_apply} {t("Candidates")}
                          </CLabel>
                        )}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol
                        lg="8"
                        style={{
                          textAlign: "start",
                          padding: "3px",
                          fontSize: "12px",
                        }}
                      >
                        <CLabel>{t("Skill Test")} -</CLabel>
                      </CCol>
                      <CCol
                        lg="4"
                        style={{
                          textAlign: "end",
                          paddingLeft: "16px",
                          padding: "3px",
                          fontSize: "12px",
                        }}
                      >
                        {data.job_category_codingtest == 0 ? (
                          <CLabel>
                            {data.job_category_codingtest} {t("Candidates")}
                          </CLabel>
                        ) : (
                          <CLabel
                            className="linkTxT"
                            onClick={() =>
                              skillTestClick(
                                data.job_category_id,
                                data.position_id,
                                data.template_job_position_id
                              )
                            }
                          >
                            {data.job_category_codingtest} {t("Candidates")}
                          </CLabel>
                        )}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol
                        lg="8"
                        style={{
                          textAlign: "start",
                          padding: "3px",
                          fontSize: "12px",
                        }}
                      >
                        <CLabel>{t("1st Interview")} -</CLabel>
                      </CCol>
                      <CCol
                        lg="4"
                        style={{
                          textAlign: "end",
                          paddingLeft: "16px",
                          padding: "3px",
                          fontSize: "12px",
                        }}
                      >
                        {data.job_category_1st_interview == 0 ? (
                          <CLabel>
                            {data.job_category_1st_interview} {t("Candidates")}
                          </CLabel>
                        ) : (
                          <CLabel
                            className="linkTxT"
                            onClick={() =>
                              interview1stClick(
                                data.job_category_id,
                                data.position_id,
                                data.template_job_position_id
                              )
                            }
                          >
                            {data.job_category_1st_interview} {t("Candidates")}
                          </CLabel>
                        )}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol
                        lg="8"
                        style={{
                          textAlign: "start",
                          padding: "3px",
                          fontSize: "12px",
                        }}
                      >
                        <CLabel>{t("2nd Interview")} -</CLabel>
                      </CCol>
                      <CCol
                        lg="4"
                        style={{
                          textAlign: "end",
                          paddingLeft: "16px",
                          padding: "3px",
                          fontSize: "12px",
                        }}
                      >
                        {data.job_category_2nd_interview == 0 ? (
                          <CLabel>
                            {data.job_category_2nd_interview} {t("Candidates")}
                          </CLabel>
                        ) : (
                          <CLabel
                            className="linkTxT"
                            onClick={() =>
                              interview2ndClick(
                                data.job_category_id,
                                data.position_id,
                                data.template_job_position_id
                              )
                            }
                          >
                            {data.job_category_2nd_interview} {t("Candidates")}
                          </CLabel>
                        )}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol
                        lg="8"
                        style={{
                          textAlign: "start",
                          padding: "3px",
                          fontSize: "12px",
                        }}
                      >
                        <CLabel>{t("Waiting Approver")} -</CLabel>
                      </CCol>
                      <CCol
                        lg="4"
                        style={{
                          textAlign: "end",
                          paddingLeft: "16px",
                          padding: "3px",
                          fontSize: "12px",
                        }}
                      >
                        {data.job_category_approvel == 0 ? (
                          <CLabel>
                            {data.job_category_approvel} {t("Candidates")}
                          </CLabel>
                        ) : (
                          <CLabel
                            className="linkTxT"
                            onClick={() =>
                              approveClick(
                                data.job_category_id,
                                data.position_id,
                                data.template_job_position_id
                              )
                            }
                          >
                            {data.job_category_approvel} {t("Candidates")}
                          </CLabel>
                        )}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol
                        lg="8"
                        style={{
                          textAlign: "start",
                          padding: "3px",
                          fontSize: "12px",
                        }}
                      >
                        <CLabel>{t("Send Offer Letter")} -</CLabel>
                      </CCol>
                      <CCol
                        lg="4"
                        style={{
                          textAlign: "end",
                          paddingLeft: "16px",
                          padding: "3px",
                          fontSize: "12px",
                        }}
                      >
                        {data.job_category_offerletter == 0 ? (
                          <CLabel>
                            {data.job_category_offerletter} {t("Candidates")}
                          </CLabel>
                        ) : (
                          <CLabel
                            className="linkTxT"
                            onClick={() =>
                              offerClick(
                                data.job_category_id,
                                data.position_id,
                                data.template_job_position_id
                              )
                            }
                          >
                            {data.job_category_offerletter} {t("Candidates")}
                          </CLabel>
                        )}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol
                        lg="8"
                        style={{
                          textAlign: "start",
                          padding: "3px",
                          fontSize: "12px",
                        }}
                      >
                        <CLabel> {t("Reject & Cancel")} -</CLabel>
                      </CCol>
                      <CCol
                        lg="4"
                        style={{
                          textAlign: "end",
                          paddingLeft: "16px",
                          padding: "3px",
                          fontSize: "12px",
                        }}
                      >
                        <CLabel>
                          {data.total_cancel_reject} {t("Candidates")}
                        </CLabel>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            );
          })}
      </CRow>
    </>
  );
};

export default DashboardForm;
