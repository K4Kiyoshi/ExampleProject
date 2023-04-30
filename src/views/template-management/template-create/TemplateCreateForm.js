/**
 * Template Registration Form
 * @author yaminzaw
 * @create 17/06/2022
 */
import React, { Fragment } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  CCol,
  CRow,
  CLabel,
  CInput,
  CButton,
  CImg,
  CCard,
  CCardBody,
  CTextarea,
  CInputRadio,
  CInputGroup,
  CSelect,
  CInputCheckbox,
  CCardHeader,
} from "@coreui/react";
import moment from "moment";
import Moment from "moment";
import SuccessError from "../../common/SuccessError";
import { useTranslation } from "react-i18next";
const TemplateCreateForm = (props) => {
  let {
    handleChangeTitle,
    title,
    addMoreInfoClick,
    data,
    remove,
    edit,
    doneClick,
    error,
    essentialData,
    selectJobCategory,
    selectCategoryOnChange,
    selectCategoryValue,
    selectPosition,
    selectPositionOnChange,
    selectPositionValue,
    success,
    searchSwitch,
    limitSwitch,
    selectModalEndDate,
    selectModalOpenDate,
    setSelectModalEndDate,
    setSelectModalOpenDate,
    loginPermission
  } = props;

  const { t } = useTranslation();

  return (
    <>
      <SuccessError error={error} success={success} />
      <CCard
        style={{
          background: "#eff1fe",
          paddingBottom: "30px",
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      >
        <CCardHeader style={{ backgroundColor: "#eff1fe" }}>
          <CRow>
            <CCol lg="1" style={{ maxWidth: "4%" }}></CCol>
            <CCol lg="11">
              <h3
                style={{
                  color: "#373d77",
                  marginTop: "15px",
                  marginBottom: "20px",
                }}
              >
                {t("Template Creation")}
              </h3>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow style={{ marginBottom: "30px" }}>
            <CCol lg="6">
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="11">
                  <CLabel className="required">
                    {t("Resume Title")}
                  </CLabel>
                </CCol>
              </CRow>

              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="10">
                  <CInput
                    className="input-field-blue-background "
                    placeholder={t("Enter Resume Title")}
                    type="text"
                    value={title}
                    onChange={(e) => handleChangeTitle(e)}
                  />
                </CCol>
                <CCol lg="1"></CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow style={{ marginBottom: "30px" }}>
            <CCol lg="6">
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="11">
                  <CLabel className="required">
                    {t("Job Category Name")}
                  </CLabel>
                </CCol>
              </CRow>

              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="10">
                  <CSelect
                    className="input-field-blue-background"
                    value={selectCategoryValue}
                    onChange={selectCategoryOnChange}
                  >
                    <option value="">{t("---Select Job Category---")}</option>
                    {selectJobCategory.length > 0 &&
                      selectJobCategory.map((data, index) => {
                        return (
                          <option key={index} value={data.id}>
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
                  <CLabel className="required">
                    {t("Position Name")}
                  </CLabel>
                </CCol>
              </CRow>
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="10">
                  <CSelect
                    className="input-field-blue-background"
                    value={selectPositionValue}
                    onChange={selectPositionOnChange}
                  >
                    <option value="">{t("---Select Position---")}</option>
                    {selectPosition.length > 0 &&
                      selectPosition.map((data, index) => {
                        return (
                          <option key={index} value={data.job_position_id}>
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
          <CRow style={{ marginBottom: "30px" }}>
            <CCol lg="6">
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="11">
                  <CLabel>
                    {t("Job Open Date")}
                  </CLabel>
                </CCol>
              </CRow>

              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="10">
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
                      value={
                        selectModalOpenDate == "" ||
                          selectModalOpenDate == null
                          ? null
                          : selectModalOpenDate
                      }
                      onChange={setSelectModalOpenDate}
                      style={{
                        borderRadius: "5px",
                        overflow: "hidden",
                        borderBottom: "1px solid",
                        width: "100%",
                      }}
                      className="input-field-blue-background"
                      placeholder="yyyy/mm/dd"
                      disablePast
                    />
                  </MuiPickersUtilsProvider>
                </CCol>
                <CCol lg="1"></CCol>
              </CRow>
            </CCol>

            <CCol lg="6">
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="11">
                  <CLabel>
                    {t("Job Close Date")}
                  </CLabel>
                </CCol>
              </CRow>
              <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="10">
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
                      value={
                        selectModalEndDate == "" ||
                          selectModalEndDate == null
                          ? null
                          : selectModalEndDate
                      }
                      onChange={setSelectModalEndDate}
                      style={{
                        borderRadius: "5px",
                        overflow: "hidden",
                        borderBottom: "1px solid",
                        width: "100%",
                      }}
                      className="input-field-blue-background"
                      placeholder="yyyy/mm/dd"
                      disablePast
                      minDate={selectModalOpenDate}
                    />
                  </MuiPickersUtilsProvider>
                </CCol>
                <CCol lg="1"></CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <>
        <CCard
          style={{
            borderRadius: "1rem",
            overflow: "hidden",
          }}>
          <CCardBody>
            <CRow>
              <CCol lg="6">
                <CRow>
                  <CCol lg="1"></CCol>
                  <CCol lg="11">
                    <h5 style={{ fontWeight: "bold", color: "#4e57aa" }}>
                      {t("Essential Fields")}
                    </h5>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            {essentialData.length > 0 &&
              essentialData.map((main, index) => {
                return (
                  <Fragment key={index}>
                    <CRow>
                      {main.map((data, ind) => {
                        return (
                          <Fragment key={ind}>
                            <CCol lg="6">
                              <CRow>
                                <CCol lg="1"></CCol>
                                <CCol lg="10">
                                  {(data.essential_field_id != null && data.label_name != "Currency Type") && (
                                    <CLabel
                                      style={{
                                        wordBreak: "break-all",
                                      }}
                                      className={`${data.require_flag == 1 ? "required" : ""}`}
                                    >
                                      {data.label_name}
                                    </CLabel>
                                  )}
                                  {data.element_type_id == 1 &&
                                    data.essential_field_id != null && (
                                      <>
                                        <CSelect className="input-field" style={{ marginBottom: "20px" }}>
                                          {data.input_data_name.length > 0 &&
                                            data.input_data_name.map(
                                              (singleChoice, index) => {
                                                return (
                                                  <option key={index}>{singleChoice}</option>
                                                );
                                              }
                                            )}
                                        </CSelect>
                                      </>
                                    )}
                                  {(data.element_type_id == 4 || data.element_type_id == 11 || data.element_type_id == 9) &&
                                    data.essential_field_id != null && (
                                      <>
                                        <CInput className="input-field" style={{ marginBottom: "20px" }} />
                                      </>
                                    )}
                                  {(data.element_type_id == 10 && data.label_name != "Expected Salary" && data.label_name != "Currency Type") &&
                                    data.essential_field_id != null && (
                                      <>
                                        <CInput className="input-field" style={{ marginBottom: "20px" }} />
                                      </>
                                    )}


                                  {(data.element_type_id == 10 && data.label_name == "Expected Salary") &&
                                    data.essential_field_id != null && (
                                      <div style={{ display: "flex" }}>
                                        <CInput className="input-field" style={{ marginBottom: "20px", marginRight: "10px" }} />
                                        <CSelect className="input-field" style={{ marginBottom: "20px", width: "150px" }}>
                                          <option>MMK</option>
                                          <option>USD</option>
                                        </CSelect>
                                      </div>
                                    )}
                                  {data.element_type_id == 6 &&
                                    data.essential_field_id != null && (
                                      <>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                          <KeyboardDatePicker
                                            style={{
                                              borderRadius: "5px",
                                              overflow: "hidden",
                                              borderBottom: "1px solid",
                                              width: "100%",
                                              marginBottom: "20px"
                                            }}
                                            className="input-field"
                                            placeholder="yyyy/mm/dd"
                                            value={"yyyy/mm/dd"}
                                            format="yyyy/MM/dd"
                                            disabled
                                            InputProps={{
                                              readOnly: true,
                                              disableUnderline: true,
                                            }}
                                          />
                                        </MuiPickersUtilsProvider>
                                      </>
                                    )}
                                  {data.element_type_id == 8 &&
                                    data.essential_field_id != null && (
                                      <>
                                        <CInputGroup
                                          className="mb-3"
                                        >
                                          <CInput
                                            className="input-field-layout"
                                            disabled
                                            placeholder="Upload Image"
                                            htmlFor={`inputGroupFile02${data.template_element_label_id}`}
                                          />
                                          <CLabel htmlFor={`inputGroupFile02${data.template_element_label_id}`}>
                                            <img
                                              src={process.env.PUBLIC_URL + "/image/Upload Image.png"}
                                              className="cross-img-userform"

                                            />
                                          </CLabel>

                                        </CInputGroup>
                                      </>
                                    )}
                                </CCol>
                              </CRow>
                            </CCol>
                          </Fragment>
                        )
                      })}
                    </CRow>
                  </Fragment>
                );
              })}
            <CRow style={{ marginBottom: "50px" }}></CRow>
            {data.length > 0 &&
              data.map((data, index) => {
                return (
                  <CRow key={index}>
                    <CCol lg="8">
                      <CRow>
                        <CCol lg="1" style={{ maxWidth: "6%", minWidth: "6%" }}></CCol>
                        <CCol lg="11">
                          {data.element_type_id == 1 &&
                            data.essential_field_id == null && (
                              <>
                                <CLabel
                                  style={{
                                    wordBreak: "break-all",
                                  }}
                                  className={`${data.require_flag == 1 ? "required" : ""}`}
                                >
                                  {data.label_name}
                                </CLabel>
                                <CRow>
                                  <CCol lg="8" style={{ minWidth: "68.5%" }}>
                                    <CSelect
                                      className="input-field"
                                      style={{ marginBottom: "20px" }}
                                    >
                                      {data.input_data_name.length > 0 &&
                                        data.input_data_name.map(
                                          (singleChoice, index) => {
                                            return (
                                              <option key={index}>
                                                {singleChoice}
                                              </option>
                                            );
                                          }
                                        )}
                                    </CSelect>
                                  </CCol>
                                  <CCol
                                    lg="2"
                                    style={{ display: "flex" }}
                                  >
                                    <CImg
                                      className="edit-img"
                                      src={process.env.PUBLIC_URL + "/image/Edit Temp.svg"}
                                      onClick={() => edit(data)}
                                    />
                                    <CImg
                                      style={{ marginLeft: "10px" }}
                                      className="delete-img"
                                      src={process.env.PUBLIC_URL + "/image/Delete Temp.svg"}
                                      onClick={() => remove(data)}
                                    />
                                  </CCol>
                                </CRow>
                                <CRow>
                                  <CCol lg="12" style={{ marginTop: "10px" }}>
                                    <CLabel className="normal-label">{t("Do you want to add Search Condition?")}</CLabel>
                                    {data.can_search == 1 &&
                                      <CImg
                                        className="switch"
                                        src={process.env.PUBLIC_URL + "/image/Toggle Active.png"}
                                        onClick={() => searchSwitch(data)}
                                      />
                                    }
                                    {data.can_search == 2 &&
                                      <CImg
                                        className="switch"
                                        src={process.env.PUBLIC_URL + "/image/Toggle Unactive.png"}
                                        onClick={() => searchSwitch(data)}
                                      />
                                    }
                                    <CLabel className="normal-label">{t("Do you want to limit in Search Condition?")}</CLabel>
                                    {data.can_search == 1 &&
                                      <>
                                        {data.search_by_limit == 1 &&
                                          <CImg
                                            className="switch"
                                            src={process.env.PUBLIC_URL + "/image/Toggle Active.png"}
                                            onClick={() => limitSwitch(data)}
                                          />
                                        }
                                        {data.search_by_limit == 2 &&
                                          <CImg
                                            className="switch"
                                            src={process.env.PUBLIC_URL + "/image/Toggle Unactive.png"}
                                            onClick={() => limitSwitch(data)}
                                          />
                                        }
                                      </>
                                    }
                                    {data.can_search == 2 &&
                                      <CImg
                                        className="switch"
                                        style={{ cursor: "not-allowed" }}
                                        src={process.env.PUBLIC_URL + "/image/Toggle Unactive.png"}
                                      />
                                    }
                                  </CCol>
                                </CRow>
                                <CRow style={{ marginBottom: "30px" }}></CRow>
                              </>
                            )}
                          {data.element_type_id == 2 &&
                            data.essential_field_id == null && (
                              <>
                                <CLabel
                                  style={{
                                    wordBreak: "break-all",
                                  }}
                                  className={`${data.require_flag == 1 ? "required" : ""}`}
                                >
                                  {data.label_name}
                                </CLabel>
                                <CRow>
                                  <CCol lg="8" style={{ minWidth: "68.5%" }}>
                                    {data.level.level_category_id == 0 && (
                                      <CRow style={{ display: "flex" }}>
                                        {data.input_data_name.length > 0 &&
                                          data.input_data_name.map(
                                            (multiChoice, index) => {
                                              return (
                                                <CCol
                                                  lg="3"
                                                  key={index}
                                                  style={{
                                                    marginLeft: "20px",
                                                  }}
                                                >
                                                  <CInputCheckbox className="chk-style" />
                                                  <CLabel
                                                    className="normal-label"
                                                    style={{
                                                      wordBreak: "break-word",
                                                      paddingLeft: "5px",
                                                    }}
                                                  >
                                                    {multiChoice}
                                                  </CLabel>
                                                </CCol>
                                              );
                                            }
                                          )}
                                      </CRow>
                                    )}
                                    {(data.level.level_category_id == 1 ||
                                      data.level.level_category_id == 2 ||
                                      data.level.level_category_id == 3 ||
                                      data.level.level_category_id == 4) && (
                                        <>
                                          {data.input_data_name.length > 0 &&
                                            data.input_data_name.map(
                                              (multiChoice, index) => {
                                                return (
                                                  <div key={index}>
                                                    <CRow >
                                                      <CCol
                                                        lg="4"
                                                        style={{ marginLeft: "20px", marginTop: "9px" }}
                                                      >
                                                        <CInputCheckbox className="chk-style" />
                                                        <CLabel
                                                          className="normal-label"
                                                          style={{
                                                            wordBreak: "break-word",
                                                            paddingLeft: "5px",
                                                          }}
                                                        >
                                                          {multiChoice}
                                                        </CLabel>
                                                      </CCol>
                                                      <CCol
                                                        lg="8"
                                                        style={{ minWidth: "61.9%", maxWidth: "61.6%" }}
                                                      >
                                                        <CSelect
                                                          style={{ marginBottom: "5px" }}
                                                          className="input-field "
                                                        >

                                                          <option>{("---Select---")}</option>
                                                          {(data.level.level_category_id ==
                                                            1 ||
                                                            data.level.level_category_id ==
                                                            2) &&
                                                            (data.level.level_data.length > 0 &&
                                                              data.level.level_data.map(
                                                                (data, index) => {
                                                                  return (
                                                                    <option key={index}>
                                                                      {data}
                                                                    </option>
                                                                  );
                                                                }
                                                              ))}
                                                          {data.level.level_category_id ==
                                                            3 && (
                                                              <>
                                                                <option>Beginner</option>
                                                                <option>Intermediate</option>
                                                                <option>Advanced</option>
                                                              </>
                                                            )}
                                                          {data.level.level_category_id ==
                                                            4 && (
                                                              <>
                                                                <option>N1</option>
                                                                <option>N2</option>
                                                                <option>N3</option>
                                                                <option>N4</option>
                                                                <option>N5</option>
                                                              </>
                                                            )}
                                                        </CSelect>
                                                      </CCol>
                                                    </CRow>
                                                    <CRow>
                                                      <CLabel className="comment-label" style={{ marginLeft: "40px" }}>{data.level.level_comment}</CLabel>
                                                    </CRow>
                                                  </div>
                                                );
                                              }
                                            )}
                                        </>
                                      )}
                                  </CCol>
                                  <CCol
                                    lg="2"
                                    style={{ display: "flex" }}
                                  >
                                    <CImg
                                      className="edit-img"
                                      src={process.env.PUBLIC_URL + "/image/Edit Temp.svg"}
                                      onClick={() => edit(data)}
                                    />
                                    <CImg
                                      style={{ marginLeft: "10px" }}
                                      className="delete-img"
                                      src={process.env.PUBLIC_URL + "/image/Delete Temp.svg"}
                                      onClick={() => remove(data)}
                                    />
                                  </CCol>
                                </CRow>
                                <CRow>
                                  <CCol lg="12" style={{ marginTop: "10px" }}>
                                    <CLabel className="normal-label">{t("Do you want to add Search Condition?")}</CLabel>
                                    {data.can_search == 1 &&
                                      <CImg
                                        className="switch"
                                        src={process.env.PUBLIC_URL + "/image/Toggle Active.png"}
                                        onClick={() => searchSwitch(data)}
                                      />
                                    }
                                    {data.can_search == 2 &&
                                      <CImg
                                        className="switch"
                                        src={process.env.PUBLIC_URL + "/image/Toggle Unactive.png"}
                                        onClick={() => searchSwitch(data)}
                                      />
                                    }
                                    {data.level.level_category_id != 0 &&
                                      <>
                                        <CLabel className="normal-label">{t("Do you want to limit in Search Condition?")}</CLabel>
                                        {data.can_search == 1 &&
                                          <>
                                            {data.search_by_limit == 1 &&
                                              <CImg
                                                className="switch"
                                                src={process.env.PUBLIC_URL + "/image/Toggle Active.png"}
                                                onClick={() => limitSwitch(data)}
                                              />
                                            }
                                            {data.search_by_limit == 2 &&
                                              <CImg
                                                className="switch"
                                                src={process.env.PUBLIC_URL + "/image/Toggle Unactive.png"}
                                                onClick={() => limitSwitch(data)}
                                              />
                                            }
                                          </>
                                        }
                                        {data.can_search == 2 &&
                                          <CImg
                                            className="switch"
                                            style={{ cursor: "not-allowed" }}
                                            src={process.env.PUBLIC_URL + "/image/Toggle Unactive.png"}
                                          />
                                        }
                                      </>
                                    }

                                  </CCol>
                                </CRow>
                                <CRow style={{ marginBottom: "30px" }}></CRow>
                              </>
                            )}
                          {data.element_type_id == 3 &&
                            data.essential_field_id == null && (
                              <>
                                <CLabel
                                  style={{
                                    wordBreak: "break-all",
                                  }}
                                  className={`${data.require_flag == 1 ? "required" : ""}`}
                                >
                                  {data.label_name}
                                </CLabel>
                                <CRow>
                                  <CCol lg="8" style={{ minWidth: "68.5%" }}>
                                    <CRow
                                      style={{ display: "flex" }}
                                    >
                                      {data.input_data_name.length > 0 &&
                                        data.input_data_name.map(
                                          (singleChoice, index) => {
                                            return (
                                              <CCol
                                                key={index}
                                                lg="3"
                                                className="radio-label"
                                                style={{
                                                  marginLeft: "20px",
                                                }}
                                              >
                                                <CInputRadio className="radio" />
                                                <CLabel
                                                  className="normal-label"
                                                  style={{
                                                    wordBreak: "break-word",
                                                  }}
                                                >
                                                  {singleChoice}
                                                </CLabel>
                                              </CCol>
                                            );
                                          }
                                        )}
                                    </CRow>
                                  </CCol>
                                  <CCol
                                    lg="2"
                                    style={{ display: "flex" }}
                                  >
                                    <CImg
                                      className="edit-img"
                                      src={process.env.PUBLIC_URL + "/image/Edit Temp.svg"}
                                      onClick={() => edit(data)}
                                    />
                                    <CImg
                                      style={{ marginLeft: "10px" }}
                                      className="delete-img"
                                      src={process.env.PUBLIC_URL + "/image/Delete Temp.svg"}
                                      onClick={() => remove(data)}
                                    />
                                  </CCol>
                                </CRow>
                                <CRow>
                                  <CCol lg="12" style={{ marginTop: "10px" }}>
                                    <CLabel className="normal-label">{t("Do you want to add Search Condition?")}</CLabel>
                                    {data.can_search == 1 &&
                                      <CImg
                                        className="switch"
                                        src={process.env.PUBLIC_URL + "/image/Toggle Active.png"}
                                        onClick={() => searchSwitch(data)}
                                      />
                                    }
                                    {data.can_search == 2 &&
                                      <CImg
                                        className="switch"
                                        src={process.env.PUBLIC_URL + "/image/Toggle Unactive.png"}
                                        onClick={() => searchSwitch(data)}
                                      />
                                    }
                                  </CCol>
                                </CRow>
                                <CRow style={{ marginBottom: "30px" }}></CRow>
                              </>
                            )}
                          {(data.element_type_id == 4 ||
                            data.element_type_id == 9 ||
                            data.element_type_id == 10 ||
                            data.element_type_id == 11 ||
                            data.element_type_id == 12) &&
                            data.essential_field_id == null && (
                              <>
                                <CLabel
                                  style={{
                                    wordBreak: "break-all"
                                  }}
                                  className={`${data.require_flag == 1 ? "required" : ""}`}
                                >
                                  {data.label_name}
                                </CLabel>
                                <CRow>
                                  <CCol lg="8" style={{ minWidth: "68.5%" }}>
                                    <CInput className="input-field" />
                                  </CCol>
                                  <CCol
                                    lg="2"
                                    style={{ display: "flex" }}
                                  >
                                    <CImg
                                      className="edit-img"
                                      src={process.env.PUBLIC_URL + "/image/Edit Temp.svg"}
                                      onClick={() => edit(data)}
                                    />
                                    <CImg
                                      style={{ marginLeft: "10px" }}
                                      className="delete-img"
                                      src={process.env.PUBLIC_URL + "/image/Delete Temp.svg"}
                                      onClick={() => remove(data)}
                                    />
                                  </CCol>
                                </CRow>
                                {data.element_type_id == 4 &&
                                  <CRow>
                                    <CCol lg="12" style={{ marginTop: "10px" }}>
                                      <CLabel className="normal-label">{t("Do you want to add Search Condition?")}</CLabel>
                                      {data.can_search == 1 &&
                                        <CImg
                                          className="switch"
                                          src={process.env.PUBLIC_URL + "/image/Toggle Active.png"}
                                          onClick={() => searchSwitch(data)}
                                        />
                                      }
                                      {data.can_search == 2 &&
                                        <CImg
                                          className="switch"
                                          src={process.env.PUBLIC_URL + "/image/Toggle Unactive.png"}
                                          onClick={() => searchSwitch(data)}
                                        />
                                      }
                                    </CCol>
                                  </CRow>
                                }
                                <CRow style={{ marginBottom: "30px" }}></CRow>
                              </>
                            )}
                          {data.element_type_id == 5 &&
                            data.essential_field_id == null && (
                              <>
                                <CLabel
                                  style={{
                                    wordBreak: "break-all"
                                  }}
                                  className={`${data.require_flag == 1 ? "required" : ""}`}
                                >
                                  {data.label_name}
                                </CLabel>
                                <CRow>
                                  <CCol lg="8" style={{ minWidth: "68.5%" }}>
                                    <CTextarea className="input-field-cmt" />
                                  </CCol>
                                  <CCol
                                    lg="2"
                                    style={{ display: "flex" }}
                                  >
                                    <CImg
                                      className="edit-img"
                                      src={process.env.PUBLIC_URL + "/image/Edit Temp.svg"}
                                      onClick={() => edit(data)}
                                    />
                                    <CImg
                                      style={{ marginLeft: "10px" }}
                                      className="delete-img"
                                      src={process.env.PUBLIC_URL + "/image/Delete Temp.svg"}
                                      onClick={() => remove(data)}
                                    />
                                  </CCol>
                                </CRow>
                                <CRow style={{ marginBottom: "30px" }}></CRow>
                              </>
                            )}
                          {data.element_type_id == 6 &&
                            data.essential_field_id == null && (
                              <>
                                <CLabel
                                  style={{
                                    wordBreak: "break-all",
                                  }}
                                  className={`${data.require_flag == 1 ? "required" : ""}`}
                                >
                                  {data.label_name}
                                </CLabel>
                                <CRow>
                                  <CCol lg="8" style={{ minWidth: "68.5%" }}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        style={{
                                          borderRadius: "5px",
                                          overflow: "hidden",
                                          borderBottom: "1px solid",
                                          width: "100%",
                                        }}
                                        className="input-field"
                                        placeholder="yyyy/mm/dd"
                                        value={"yyyy/mm/dd"}
                                        format="yyyy/MM/dd"
                                        disabled
                                        InputProps={{
                                          readOnly: true,
                                          disableUnderline: true,
                                        }}
                                      />
                                    </MuiPickersUtilsProvider>
                                  </CCol>
                                  <CCol
                                    lg="2"
                                    style={{ display: "flex" }}
                                  >
                                    <CImg
                                      className="edit-img"
                                      src={process.env.PUBLIC_URL + "/image/Edit Temp.svg"}
                                      onClick={() => edit(data)}
                                    />
                                    <CImg
                                      style={{ marginLeft: "10px" }}
                                      className="delete-img"
                                      src={process.env.PUBLIC_URL + "/image/Delete Temp.svg"}
                                      onClick={() => remove(data)}
                                    />
                                  </CCol>
                                </CRow>
                                <CRow style={{ marginBottom: "30px" }}></CRow>
                              </>
                            )}
                          {data.element_type_id == 7 &&
                            data.essential_field_id == null && (
                              <>
                                <CLabel
                                  style={{
                                    wordBreak: "break-all",
                                  }}
                                  className={`${data.require_flag == 1 ? "required" : ""}`}
                                >
                                  {data.label_name}
                                </CLabel>
                                <CRow>
                                  <CCol lg="8" style={{ minWidth: "68.5%" }}>
                                    <CInputGroup
                                      className="mb-3"
                                    >
                                      <CInput
                                        className="input-field-layout"
                                        style={{ borderStyle: "dashed" }}
                                        disabled
                                        placeholder="Attach File"
                                        htmlFor={`inputGroupFile02${data.template_element_label_id}`}
                                      />
                                      <CLabel htmlFor={`inputGroupFile02${data.template_element_label_id}`}>
                                        <img
                                          src={process.env.PUBLIC_URL + "/image/attach.png"}
                                          className="cross-img-userform"

                                        />
                                      </CLabel>

                                    </CInputGroup>
                                  </CCol>
                                  <CCol
                                    lg="2"
                                    style={{ display: "flex" }}
                                  >
                                    <CImg
                                      className="edit-img"
                                      src={process.env.PUBLIC_URL + "/image/Edit Temp.svg"}
                                      onClick={() => edit(data)}
                                    />
                                    <CImg
                                      style={{ marginLeft: "10px" }}
                                      className="delete-img"
                                      src={process.env.PUBLIC_URL + "/image/Delete Temp.svg"}
                                      onClick={() => remove(data)}
                                    />
                                  </CCol>
                                </CRow>
                                <CRow style={{ marginBottom: "30px" }}></CRow>
                              </>
                            )}
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                )
              })}
            <CRow style={{ marginBottom: "30px" }}>
              <CCol lg="1" style={{ maxWidth: "4%" }}></CCol>
              <CCol lg="10">
                <CButton
                  className="add-more-btn"
                  onClick={addMoreInfoClick}
                  style={{ marginRight: "10px", marginBottom: "10px" }}
                >
                  {t("Add More Information")}
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CRow
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            justifyContent: "center",
          }}
        >
          {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Create Template")) && (
            <CButton
              className="btn-create btn-add"
              onClick={doneClick}
              style={{ marginBottom: "10px" }}
            >
              {t("Create")}
            </CButton>
          )}
        </CRow>
      </>
    </>
  );
};

export default TemplateCreateForm;
