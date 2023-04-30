/* eslint-disable jsx-a11y/alt-text */

/**
 * Applied Job Position Form
 *
 * @author YuwaKoKo
 *
 * @create 17/6/2022
 *
 */

import React, { Fragment } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import {
  CButton,
  CCol,
  CInput,
  CLabel,
  CRow,
  CInputRadio,
  CSelect,
} from "@coreui/react";
import { useTranslation } from "react-i18next";

const AppliedJobPositionForm = (props) => {
  const { t } = useTranslation();
  let {
    threeSixRadioValue,
    threeSixRadioChange,
    threeSevenRadioValue,
    threeSevenRadioChange,
    threeEightRadioValue,
    threeEightRadioChange,
    fromData,
    statusData,
    expCheckChange,
    expCheck,
    salaryCheck,
    statusSelectChange,
    statusSelectValue,
    applicantNameHandleChange,
    emailHandleChange,
    applicantName,
    email,
    stateSelectChange,
    positionNameSelectChange,
    jobCatSelectChange,
    stateSelectValue,
    positionNameSelectValue,
    jobCatSelectValue,
    stateData,
    salaryCheckChange,
    positionNameData,
    selectAppliedDateHandleChange,
    appliedDateSelectedValue,
    appliedDateSelectedValueEnd,
    selectAppliedDateHandleChangeEnd,
    jobCatData,
    genderData,
    genderChange,
    selectGenderValue,
    searchClick,
    salaryEndChange,
    salaryEndValue,
    salaryStartChange,
    salaryStartValue,
    expEndChange,
    expEndValue,
    expStartChange,
    expStartValue,
    resumeSelectChange,
    resumeSelectValue,
    resumeData,
    compData,
    fourSixTextBoxChange,
    fourSixTextBoxValue,
    fourSevenTextBoxChange,
    fourSevenTextBoxValue,
    fourEightTextBoxChange,
    fourEightTextBoxValue,
    oneSixDataListValue,
    oneSixDataListChange,
    oneSevenDataListValue,
    oneSevenDataListChange,
    oneEightDataListValue,
    oneEightDataListChange,
    twoSixMultiChange,
    twoSixMultiValue,
    twoSixLevelChange,
    twoSixLevelValue,
    twoSixCompChange,
    twoSixCompValue,
    twoSevenMultiChange,
    twoSevenMultiValue,
    twoSevenLevelChange,
    twoSevenLevelValue,
    twoSevenCompChange,
    twoSevenCompValue,
    twoEightMultiChange,
    twoEightMultiValue,
    twoEightLevelChange,
    twoEightLevelValue,
    twoEightCompChange,
    twoEightCompValue,
    twoSixLevelCatValue,
    twoSevenLevelCatValue,
    twoEightLevelCatValue,
    currency,
    currencyChange,
    currencySelectValue,
  } = props;

  return (
    <>
      <CRow>
        <CCol lg="6">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="11">
              <p
                style={{ fontWeight: "bold", color: "#2f302f" }}
                className="required"
              >
                {t("Resume Title")}
              </p>
            </CCol>
          </CRow>
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CSelect
                className="input-field-blue-background "
                onChange={resumeSelectChange}
                value={resumeSelectValue}
              >
                <option value="">{t("---Select Resume Title---")}</option>
                {resumeData.length > 0 &&
                  resumeData.map((data, index) => {
                    return (
                      <option key={index} value={data.template_job_position_id}>
                        {data.resume_title}
                      </option>
                    );
                  })}
              </CSelect>
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
              <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                {t("Job Category Name")}
              </p>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CSelect
                className="input-field-blue-background "
                onChange={jobCatSelectChange}
                value={jobCatSelectValue}
              >
                <option value="">{t("---Select Job Category---")}</option>
                {jobCatData.length > 0 &&
                  jobCatData.map((data, index) => {
                    return (
                      <option key={index} value={data.category_id}>
                        {data.category_name}
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
                {t("Position Name")}
              </p>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CSelect
                className="input-field-blue-background "
                onChange={positionNameSelectChange}
                value={positionNameSelectValue}
              >
                <option value="">{t("---Select Position Name---")}</option>
                {positionNameData.map((data, index) => {
                  return (
                    <option key={index} value={data.position_id}>
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
      <br></br>
      <CRow>
        <CCol lg="6">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="11">
              <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                {t("State")}
              </p>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CSelect
                className="input-field-blue-background "
                onChange={stateSelectChange}
                value={stateSelectValue}
              >
                <option value="">{t("---Select State---")}</option>
                {stateData.length > 0 &&
                  stateData.map((data, index) => {
                    return (
                      <option key={index} value={data.id}>
                        {data.state_name.length <= 20 && data.state_name}
                        {data.state_name.length > 20 &&
                          data.state_name.substring(0, 20).concat("....")}
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
                {t("Status")}
              </p>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CSelect
                className="input-field-blue-background "
                onChange={statusSelectChange}
                value={statusSelectValue}
              >
                <option value="">{t("---Select Status---")}</option>
                {statusData.length > 0 &&
                  statusData.map((data, index) => {
                    return (
                      <option key={index} value={data}>
                        {data == 1 && "Ongoing"}
                        {data == 2 && "Pass"}
                        {data == 3 && "Cancel"}
                        {data == 4 && "Reject"}
                        {data == 5 && "Approve"}
                        {data == 6 && "Accept"}
                      </option>
                    );
                  })}
              </CSelect>
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
              <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                {t("Applicant Name")}
              </p>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CInput
                onChange={applicantNameHandleChange}
                value={applicantName}
                className="input-field-blue-background "
                placeholder={t("Enter Applicant Name")}
                type="text"
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
                {t("Email")}
              </p>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CInput
                onChange={emailHandleChange}
                value={email}
                className="input-field-blue-background "
                placeholder={t("Enter Email")}
                type="text"
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
              <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                {t("Expected Salary")}
              </p>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>

            <CCol lg="10">
              <CRow>
                <CCol lg="4">
                  <CInput
                    onChange={salaryStartChange}
                    value={salaryStartValue}
                    className="input-field-blue-background "
                    placeholder={t("Enter Amount")}
                    type="number"
                  />
                </CCol>
                <CCol lg="1" className="padding-fix">
                  <span style={{ marginTop: "10px" }}>{t("To")}</span>
                </CCol>

                {salaryStartValue == "" && (
                  <CCol lg="4">
                    <CInput
                      onChange={salaryEndChange}
                      value={salaryEndValue}
                      className="conditionfield-text"
                      placeholder={t("Enter Amount")}
                      type="number"
                      readOnly
                    />
                  </CCol>
                )}
                {salaryStartValue != "" && (
                  <CCol lg="4">
                    <CInput
                      onChange={salaryEndChange}
                      value={salaryEndValue}
                      className="input-field-blue-background "
                      placeholder={t("Enter Amount")}
                      type="number"
                    />
                  </CCol>
                )}

                <CCol lg="3">
                  <CSelect
                    className="input-field-blue-background "
                    onChange={currencyChange}
                    value={currencySelectValue}
                  >
                    <option value="">{t("Select")}</option>
                    {currency.length > 0 &&
                      currency.map((data, index) => {
                        return (
                          <option key={index} value={data.name}>
                            {data.name}
                          </option>
                        );
                      })}
                  </CSelect>
                </CCol>
              </CRow>
            </CCol>

            <CCol lg="1"></CCol>
          </CRow>

          <CRow className="mt-2">
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CRow>
                <CCol lg="12" style={{ marginLeft: "5px", display: "flex" }}>
                  <input
                    type="CheckBox"
                    id="check2"
                    style={{
                      width: "17px",
                      height: "17px",
                      marginTop: "4px",
                      borderBottom: "1px solid rgb(214, 214, 214) !important",
                    }}
                    checked={salaryCheck === true}
                    onChange={salaryCheckChange}
                  />
                  <CLabel htmlFor="check2" className="include-padding">
                    &nbsp;
                    {t("Include")}
                  </CLabel>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCol>

        <CCol lg="6">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="11">
              <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                {t("Experience")}
              </p>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CRow>
                <CCol lg="5">
                  <CInput
                    onChange={expStartChange}
                    value={expStartValue}
                    className="input-field-blue-background "
                    placeholder={t("Enter Year (1,2,3,...)")}
                    type="number"
                  />
                </CCol>

                <CCol lg="2" className="padding-fix">
                  <span style={{ marginTop: "10px" }}>{t("To")}</span>
                </CCol>

                {expStartValue != "" && (
                  <CCol lg="5">
                    <CInput
                      onChange={expEndChange}
                      value={expEndValue}
                      className="input-field-blue-background "
                      placeholder={t("Enter Year (1,2,3,...)")}
                      type="number"
                    />
                  </CCol>
                )}
                {expStartValue == "" && (
                  <CCol lg="5">
                    <CInput
                      onChange={expEndChange}
                      value={expEndValue}
                      className="conditionfield-text "
                      placeholder={t("Enter Year (1,2,3,...)")}
                      type="number"
                      readOnly
                    />
                  </CCol>
                )}
              </CRow>
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
          <CRow className="mt-2">
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CRow>
                <CCol lg="12" style={{ marginLeft: "5px", display: "flex" }}>
                  <input
                    type="CheckBox"
                    id="check1"
                    style={{
                      width: "17px",
                      height: "17px",
                      marginTop: "4px",
                      borderBottom: "1px solid rgb(214, 214, 214) !important",
                    }}
                    checked={expCheck === true}
                    onChange={expCheckChange}
                  />
                  <CLabel htmlFor="check1" className="include-padding">
                    &nbsp;
                    {t("Include")}
                  </CLabel>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <br></br>
      <CRow style={{ marginTop: "-8px" }}>
        <CCol lg="6">
          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="11">
              <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                {t("Gender")}
              </p>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CSelect
                className="input-field-blue-background "
                onChange={genderChange}
                value={selectGenderValue}
              >
                <option value="">{t("---Select Gender---")}</option>
                {genderData.length > 0 &&
                  genderData.map((data, index) => {
                    return (
                      <option key={index} value={data.name}>
                        {data.name}
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
                {t("Applied Date")}
              </p>
            </CCol>
          </CRow>

          <CRow>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              <CRow>
                <CCol lg="5">
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    libInstance={moment}
                  >
                    <KeyboardDatePicker
                      InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                      }}
                      clearable
                      format="yyyy/MM/dd"
                      style={{
                        borderRadius: "5px",
                        overflow: "hidden",
                        borderBottom: "1px solid",
                        width: "100%",
                      }}
                      value={
                        appliedDateSelectedValue == "" ||
                        appliedDateSelectedValue == null
                          ? null
                          : appliedDateSelectedValue
                      }
                      className="input-field-blue-background"
                      placeholder={t("Select Start Date")}
                      onChange={(e) => selectAppliedDateHandleChange(e)}
                    />
                  </MuiPickersUtilsProvider>
                </CCol>

                <CCol lg="2" className="padding-fix">
                  <span style={{ marginTop: "10px" }}>{t("To")}</span>
                </CCol>

                <CCol lg="5">
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    libInstance={moment}
                  >
                    <KeyboardDatePicker
                      InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                      }}
                      clearable
                      format="yyyy/MM/dd"
                      style={{
                        borderRadius: "5px",
                        overflow: "hidden",
                        borderBottom: "1px solid #98847e",
                        width: "100%",
                      }}
                      value={
                        appliedDateSelectedValueEnd == "" ||
                        appliedDateSelectedValueEnd == null
                          ? null
                          : appliedDateSelectedValueEnd
                      }
                      className="input-field-blue-background"
                      placeholder={t("Select End Date")}
                      onChange={(e) => selectAppliedDateHandleChangeEnd(e)}
                    />
                  </MuiPickersUtilsProvider>
                </CCol>
              </CRow>
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
        </CCol>
      </CRow>

      {/* THIS IS DYNAMIC */}
      <CRow>
        {fromData.length > 0 &&
          fromData.map((value, index) => {
            if (value.virtual_column == 7 && value.element_type_id == 4) {
              return (
                <CCol lg="6" className="mt-4" key={Math.random()}>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="11">
                      <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                        {value.label_name}
                      </p>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="10">
                      <CInput
                        onChange={fourSixTextBoxChange}
                        value={fourSixTextBoxValue}
                        className="input-field-blue-background "
                        placeholder={`Enter ${value.label_name}`}
                        type="text"
                      />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>
              );
            }
            if (value.virtual_column == 8 && value.element_type_id == 4) {
              return (
                <CCol lg="6" className="mt-4" key={Math.random()}>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="11">
                      <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                        {value.label_name}
                      </p>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="10">
                      <CInput
                        onChange={fourSevenTextBoxChange}
                        value={fourSevenTextBoxValue}
                        className="input-field-blue-background "
                        placeholder={`Enter ${value.label_name}`}
                        type="text"
                      />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>
              );
            }
            if (value.virtual_column == 9 && value.element_type_id == 4) {
              return (
                <CCol lg="6" className="mt-4" key={Math.random()}>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="11">
                      <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                        {value.label_name}
                      </p>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="10">
                      <CInput
                        onChange={fourEightTextBoxChange}
                        value={fourEightTextBoxValue}
                        className="input-field-blue-background "
                        placeholder={`Enter ${value.label_name}`}
                        type="text"
                      />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>
              );
            }
            if (value.virtual_column == 7 && value.element_type_id == 1) {
              return (
                <CCol lg="6" className="mt-4" key={Math.random()}>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="11">
                      <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                        {value.label_name}
                      </p>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="10">
                      <CSelect
                        className="input-field-blue-background "
                        onChange={oneSixDataListChange}
                        value={oneSixDataListValue}
                      >
                        <option value="">Select Value</option>
                        {value.subheadings != "" &&
                          value.subheadings.map((data, index) => {
                            return (
                              <option key={index} value={data.input_data_name}>
                                {data.input_data_name}
                              </option>
                            );
                          })}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>
              );
            }
            if (value.virtual_column == 8 && value.element_type_id == 1) {
              return (
                <CCol lg="6" className="mt-4" key={Math.random()}>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="11">
                      <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                        {value.label_name}
                      </p>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="10">
                      <CSelect
                        className="input-field-blue-background "
                        onChange={oneSevenDataListChange}
                        value={oneSevenDataListValue}
                      >
                        <option value="">Select Value</option>
                        {value.subheadings != "" &&
                          value.subheadings.map((data, index) => {
                            return (
                              <option key={index} value={data.input_data_name}>
                                {data.input_data_name}
                              </option>
                            );
                          })}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>
              );
            }
            if (value.virtual_column == 9 && value.element_type_id == 1) {
              return (
                <CCol lg="6" className="mt-4" key={Math.random()}>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="11">
                      <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                        {value.label_name}
                      </p>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="10">
                      <CSelect
                        className="input-field-blue-background "
                        onChange={oneEightDataListChange}
                        value={oneEightDataListValue}
                      >
                        <option value="">Select Value</option>
                        {value.subheadings != "" &&
                          value.subheadings.map((data, index) => {
                            return (
                              <option key={index} value={data.input_data_name}>
                                {data.input_data_name}
                              </option>
                            );
                          })}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>
              );
            }
            if (value.virtual_column == 7 && value.element_type_id == 2) {
              return (
                <CCol lg="6" className="mt-4" key={Math.random()}>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="11">
                      <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                        {value.label_name}
                      </p>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="4">
                      <CSelect
                        className="input-field-blue-background "
                        onChange={(e) => twoSixMultiChange(e)}
                        value={twoSixMultiValue}
                      >
                        <option value="">--Select--</option>
                        {value.subheadings.map((data, index) => {
                          return (
                            <option key={index} value={data.input_data_name}>
                              {data.input_data_name}
                            </option>
                          );
                        })}
                      </CSelect>
                    </CCol>
                    <CCol lg="3">
                      <CSelect
                        // style={{ width: "124px" }}
                        className="input-field-blue-background "
                        onChange={twoSixLevelChange}
                        value={`${twoSixLevelValue},${twoSixLevelCatValue}`}
                      >
                        <option value="">--Select--</option>
                        {twoSixMultiValue != "" &&
                          value.levels.map((data, index) => {
                            return (
                              <option
                                key={index}
                                value={`${data.template_label_level_id},${data.level_category_id}`}
                              >
                                {data.level_name}
                              </option>
                            );
                          })}
                        {twoSixMultiValue == ""}
                      </CSelect>
                    </CCol>
                    <CCol lg="3">
                      <CSelect
                        // style={{ width: "124px" }}
                        className="input-field-blue-background "
                        onChange={twoSixCompChange}
                        value={twoSixCompValue}
                      >
                        <option value="">Equal</option>
                        {twoSixLevelValue != "" &&
                          compData.map((data, index) => {
                            return (
                              <option key={index} value={data.comp_id}>
                                {data.comp_name}
                              </option>
                            );
                          })}
                        {twoSixLevelValue == ""}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>
              );
            }
            if (value.virtual_column == 8 && value.element_type_id == 2) {
              return (
                <CCol lg="6" className="mt-4" key={Math.random()}>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="11">
                      <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                        {value.label_name}
                      </p>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="4">
                      <CSelect
                        className="input-field-blue-background "
                        onChange={twoSevenMultiChange}
                        value={twoSevenMultiValue}
                      >
                        <option value="">--Select--</option>
                        {value.subheadings.map((data, index) => {
                          return (
                            <option key={index} value={data.input_data_name}>
                              {data.input_data_name}
                            </option>
                          );
                        })}
                      </CSelect>
                    </CCol>
                    <CCol lg="3">
                      <CSelect
                        // style={{ width: "124px" }}
                        className="input-field-blue-background "
                        onChange={twoSevenLevelChange}
                        value={`${twoSevenLevelValue},${twoSevenLevelCatValue}`}
                      >
                        <option value="">--Select--</option>
                        {twoSevenMultiValue != "" &&
                          value.levels.map((data, index) => {
                            return (
                              <option
                                key={index}
                                value={`${data.template_label_level_id},${data.level_category_id}`}
                              >
                                {data.level_name}
                              </option>
                            );
                          })}
                        {twoSevenMultiValue == ""}
                      </CSelect>
                    </CCol>
                    <CCol lg="3">
                      <CSelect
                        // style={{ width: "124px" }}
                        className="input-field-blue-background "
                        onChange={twoSevenCompChange}
                        value={twoSevenCompValue}
                      >
                        <option value="">Equal</option>
                        {twoSevenLevelValue != "" &&
                          compData.map((data, index) => {
                            return (
                              <option key={index} value={data.comp_id}>
                                {data.comp_name}
                              </option>
                            );
                          })}
                        {twoSevenLevelValue == ""}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>
              );
            }
            if (value.virtual_column == 9 && value.element_type_id == 2) {
              return (
                <CCol lg="6" className="mt-4" key={Math.random()}>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="11">
                      <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                        {value.label_name}
                      </p>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="4">
                      <CSelect
                        className="input-field-blue-background "
                        onChange={twoEightMultiChange}
                        value={twoEightMultiValue}
                      >
                        <option value="">--Select--</option>
                        {value.subheadings.map((data, index) => {
                          return (
                            <option key={index} value={data.input_data_name}>
                              {data.input_data_name}
                            </option>
                          );
                        })}
                      </CSelect>
                    </CCol>
                    <CCol lg="3">
                      <CSelect
                        // style={{ width: "124px" }}
                        className="input-field-blue-background "
                        onChange={twoEightLevelChange}
                        value={`${twoEightLevelValue},${twoEightLevelCatValue}`}
                      >
                        <option value="">--Select--</option>
                        {twoEightMultiValue != "" &&
                          value.levels.map((data, index) => {
                            return (
                              <option
                                key={index}
                                value={`${data.template_label_level_id},${data.level_category_id}`}
                              >
                                {data.level_name}
                              </option>
                            );
                          })}
                        {twoEightMultiValue == ""}
                      </CSelect>
                    </CCol>
                    <CCol lg="3">
                      <CSelect
                        // style={{ width: "124px" }}
                        className="input-field-blue-background "
                        onChange={twoEightCompChange}
                        value={twoEightCompValue}
                      >
                        <option value="">Equal</option>
                        {twoEightLevelValue != "" &&
                          compData.map((data, index) => {
                            return (
                              <option key={index} value={data.comp_id}>
                                {data.comp_name}
                              </option>
                            );
                          })}
                        {twoEightLevelValue == ""}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>
              );
            }

            if (value.virtual_column == 7 && value.element_type_id == 3) {
              return (
                <CCol lg="6" className="mt-4" key={Math.random()}>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="11">
                      <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                        {value.label_name}
                      </p>
                    </CCol>
                  </CRow>

                  <CRow
                    className="ml-4"
                    style={{
                      display: "flex",
                      marginLeft: "15px",
                    }}
                  >
                    {value.subheadings.map((singleChoice, index) => {
                      return (
                        <Fragment key={index}>
                          <CCol lg="3" style={{ marginLeft: "30px" }}>
                            <CLabel style={{ wordBreak: "break-word" }}>
                              <CInputRadio
                                style={{ cursor: "pointer" }}
                                value={singleChoice.input_data_name}
                                className="Radio"
                                name={singleChoice.input_data_name}
                                checked={
                                  threeSixRadioValue ==
                                  singleChoice.input_data_name
                                    ? true
                                    : false
                                }
                                onChange={(e) => threeSixRadioChange(e)}
                              />
                              {singleChoice.input_data_name}
                            </CLabel>
                            <br />
                          </CCol>
                        </Fragment>
                      );
                    })}
                  </CRow>
                </CCol>
              );
            }

            if (value.virtual_column == 8 && value.element_type_id == 3) {
              return (
                <CCol lg="6" className="mt-4" key={Math.random()}>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="11">
                      <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                        {value.label_name}
                      </p>
                    </CCol>
                  </CRow>

                  <CRow
                    className="ml-4"
                    style={{
                      display: "flex",
                      marginLeft: "15px",
                    }}
                  >
                    {value.subheadings.map((singleChoice, index) => {
                      return (
                        <Fragment key={index}>
                          <CCol key={index} style={{ marginLeft: "30px" }}>
                            <CLabel style={{ wordBreak: "break-word" }}>
                              <CInputRadio
                                style={{ cursor: "pointer" }}
                                value={singleChoice.input_data_name}
                                className="Radio"
                                name={singleChoice.input_data_name}
                                checked={
                                  threeSevenRadioValue ==
                                  singleChoice.input_data_name
                                    ? true
                                    : false
                                }
                                onChange={(e) => threeSevenRadioChange(e)}
                              />
                              {singleChoice.input_data_name}
                            </CLabel>
                            <br />
                          </CCol>
                        </Fragment>
                      );
                    })}
                  </CRow>
                </CCol>
              );
            }

            if (value.virtual_column == 9 && value.element_type_id == 3) {
              return (
                <CCol lg="6" className="mt-4" key={Math.random()}>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="11">
                      <p style={{ fontWeight: "bold", color: "#2f302f" }}>
                        {value.label_name}
                      </p>
                    </CCol>
                  </CRow>

                  <CRow
                    className="ml-4"
                    style={{
                      display: "flex",
                      marginLeft: "15px",
                    }}
                  >
                    {value.subheadings.map((singleChoice, index) => {
                      return (
                        <Fragment key={index}>
                          <CCol lg="3" style={{ marginLeft: "30px" }}>
                            <CLabel style={{ wordBreak: "break-word" }}>
                              <CInputRadio
                                style={{ cursor: "pointer" }}
                                value={singleChoice.input_data_name}
                                className="Radio"
                                name={singleChoice.input_data_name}
                                checked={
                                  threeEightRadioValue ==
                                  singleChoice.input_data_name
                                    ? true
                                    : false
                                }
                                onChange={(e) => threeEightRadioChange(e)}
                              />
                              {singleChoice.input_data_name}
                            </CLabel>
                            <br />
                          </CCol>
                        </Fragment>
                      );
                    })}
                  </CRow>
                </CCol>
              );
            }
          })}
      </CRow>

      <br></br>
      <br></br>
      <CRow>
        <CCol lg="5" sm="5" xs="5"></CCol>
        <CCol lg="2" sm="2" xs="2" style={{ textAlign: "center" }}>
          <CButton
            type="button"
            className="btn-create btn-add"
            onClick={searchClick}
            style={{
              marginBottom: "10px",
            }}
          >
            {t("Search")}
          </CButton>
        </CCol>
        <CCol lg="5" sm="5" xs="5"></CCol>
      </CRow>
    </>
  );
};

export default AppliedJobPositionForm;
