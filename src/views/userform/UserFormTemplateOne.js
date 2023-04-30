/**  User Form Design for layout id 2
 * @author yamin zaw
 * @create 10/11/2022
 */
import {
  CButton,
  CCol,
  CImg,
  CInput,
  CInputRadio,
  CLabel,
  CRow,
  CSelect,
  CTextarea,
  CInputCheckbox,
  CInputGroup,
} from "@coreui/react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import moment from "moment";

const UserFormTemplateOne = (props) => {
  let lower_data = []; //for not essentail data
  let lower_value = [];//for not essentail value
  let upper_data = [];//for essential data
  let upper_value = [];//for essential value

  const {
    value,
    typeIDFourChange,
    image,
    imagepreviewurl,
    Clear,
    DownloadCheck,
    SaveData,
    typeIDTwoChange,
    typeIDTwoDropDownChange,
    typeIDOneDropDownChange,
    typeIDThreeChange,
    typeIDFiveChange,
    typeIDSixChange,
    typeIDSevenChange,
    typeIDEightChange,
    checked,
    editstatus,
    heading,
    ClearImage,
    clearFile,
    agreeChecked,
    typeIDNineChange,
    typeIDTenChange,
    typeIDElevenChange,
    typeIDTwelveChange,
    captureValue,
    handleChangeCapture,
    captureError,
    categoryName,
    positionName,
    captchaText,
    makeCaptcha,
    currencyChange,
    currency,
    resumeTitle
  } = props;
  return (
    <div style={{ overflow: "hidden" }}>
      <CRow style={{ marginTop: "50px", justifyContent: "center", marginBottom: "20px" }}>
        <h2 style={{ fontWeight: "bold" }}>{resumeTitle}</h2>
      </CRow>
      <CRow>
        <CCol lg="2"></CCol>
        <CCol lg="8" style={{ border: "1px solid #E8E8E8", boxShadow: "5px 10px #F5F5F5", marginBottom: "80px", }}>
          <CRow style={{ backgroundColor: "#5ab4ab" }}>
            <>
              {heading.length > 0 &&
                heading.map((h) => {
                  if (h.label_name == "Name" || h.label_name == "Email Address" || h.label_name == "Phone No." || h.label_name == "Upload Profile") {
                    upper_data.push(h);
                  }
                })}
              {value.length > 0 &&
                value.map((h) => {
                  if (h.label_name == "Name" || h.label_name == "Email Address" || h.label_name == "Phone No." || h.label_name == "Upload Profile") {
                    upper_value.push(h);
                  }
                })}
              <CCol lg="5" style={{ paddingTop: "20px" }}>
                <>
                  <CRow style={{ paddingTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {upper_data.length > 0 &&
                      upper_data.map((data, idx) => {
                        return (
                          <div key={idx} style={{ textAlign: "center" }}>
                            {data.element_type_id == 8 && (
                              <>
                                <CInputGroup style={{ justifyContent: "center" }}>
                                  <CLabel htmlFor="photo-upload">
                                    <CImg
                                      style={{ width: "200px", height: "200px" }}
                                      className="templateOne-profile"
                                      id="photo-upload-id"
                                      htmlFor="photo-upload"
                                      src={imagepreviewurl}
                                      value={image}
                                    />
                                  </CLabel>
                                  <div>
                                    <input
                                      id="photo-upload"
                                      htmlFor="photo-upload-id"
                                      type="file"
                                      accept=".png, .jpg, .jpeg"
                                      hidden
                                      onChange={(e) =>
                                        typeIDEightChange(data.template_element_label_id, e)
                                      }
                                    />
                                    {image.name != undefined &&
                                      <CImg
                                        className="camera-one"
                                        id="photo-upload-id"
                                        value={image}
                                        src={process.env.PUBLIC_URL + "/image/remove icon.png"}
                                        onClick={(e) =>
                                          ClearImage(data.template_element_label_id, e)
                                        }
                                      />}
                                    {image.name == undefined &&
                                      <CImg
                                        className="camera-one"
                                      />}
                                  </div>
                                </CInputGroup>
                                {upper_value[idx]["sub_error"] != "" &&
                                  <CLabel className="label-error">
                                    {upper_value[idx]["sub_error"]}
                                  </CLabel>
                                }
                              </>
                            )}
                          </div>
                        )
                      })}
                  </CRow>
                  <CRow style={{ justifyContent: "center", alignItems: "center" }}>
                    <CCol lg="12" style={{ textAlign: "center" }}>
                      <CLabel className="label-white">{categoryName}&nbsp;(&nbsp;{positionName}&nbsp;)</CLabel>
                    </CCol>
                  </CRow>
                </>
              </CCol>
              <CCol lg="1"></CCol>
              <CCol lg="6" style={{ paddingTop: "20px", paddingBottom: "10px" }}>
                {upper_data.length > 0 &&
                  upper_data.map((data, idx) => {
                    return (
                      <div key={idx} style={{ marginBottom: "24px" }}>
                        {data.element_type_id == 4 && (
                          <CRow>
                            <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                              <CLabel className={`${data.require_flag == 1 ? "label-white required" : "label-white"}`}>
                                {data.label_name}
                              </CLabel>
                              <CInput
                                id={data.template_element_label_id}
                                className="input-field-layout"
                                value={upper_value[idx]["value"]}
                                onChange={(e) =>
                                  typeIDFourChange(
                                    data.template_element_label_id,
                                    e
                                  )
                                }
                              />
                              {upper_value[idx]["sub_error"] != "" &&
                                <CLabel className="label-error">
                                  {upper_value[idx]["sub_error"]}
                                </CLabel>
                              }
                            </CCol>
                          </CRow>
                        )}
                        {data.element_type_id == 9 && (
                          <CRow>
                            <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                              <CLabel className={`${data.require_flag == 1 ? "label-white required" : "label-white"}`}>
                                {data.label_name}
                              </CLabel>
                              <CInput
                                id={data.template_element_label_id}
                                className="input-field-layout"
                                value={upper_value[idx]["value"]}
                                onChange={(e) =>
                                  typeIDNineChange(
                                    data.template_element_label_id,
                                    e
                                  )
                                }
                                readOnly
                              />
                              {upper_value[idx]["sub_error"] != "" &&
                                <CLabel className="label-error">
                                  {upper_value[idx]["sub_error"]}
                                </CLabel>
                              }
                            </CCol>
                          </CRow>
                        )}
                        {data.element_type_id == 10 && (
                          <CRow>
                            <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                              <CLabel className={`${data.require_flag == 1 ? "label-white required" : "label-white"}`}>
                                {data.label_name}
                              </CLabel>
                              <CInput
                                id={data.template_element_label_id}
                                className="input-field-layout"
                                value={upper_value[idx]["value"]}
                                onChange={(e) =>
                                  typeIDTenChange(data.template_element_label_id, e)
                                }
                              />
                              {upper_value[idx]["sub_error"] != "" &&
                                <CLabel className="label-error">
                                  {upper_value[idx]["sub_error"]}
                                </CLabel>
                              }
                            </CCol>
                          </CRow>
                        )}
                        {data.element_type_id == 11 && (
                          <CRow>
                            <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                              <CLabel className={`${data.require_flag == 1 ? "label-white required" : "label-white"}`}>
                                {data.label_name}
                              </CLabel>
                              <CInput
                                id={data.template_element_label_id}
                                className="input-field-layout"
                                value={upper_value[idx]["value"]}
                                onChange={(e) =>
                                  typeIDElevenChange(
                                    data.template_element_label_id,
                                    e
                                  )
                                }
                              />
                              {upper_value[idx]["sub_error"] != "" &&
                                <CLabel className="label-error">
                                  {upper_value[idx]["sub_error"]}
                                </CLabel>
                              }
                            </CCol>
                          </CRow>
                        )}
                      </div>
                    );
                  })}
              </CCol>
            </>
          </CRow>
          <CRow>
            <>
              <CCol lg="12" style={{ paddingTop: "30px" }}>
                {heading.length > 0 &&
                  heading.map((h) => {
                    if (h.label_name != "Name" && h.label_name != "Email Address" && h.label_name != "Phone No.") {
                      lower_data.push(h);
                    }
                  })}
                {value.length > 0 &&
                  value.map((h) => {
                    if (h.label_name != "Name" && h.label_name != "Email Address" && h.label_name != "Phone No.") {
                      lower_value.push(h);
                    }
                  })}
                {lower_data.length > 0 &&
                  lower_data.map((data, idx) => {
                    return (
                      <div key={idx} style={{ marginBottom: "24px" }}>
                        {data.label_name != "Currency Type" && (
                          <>
                            {data.element_type_id == 1 && (
                              <>
                                <CRow>
                                  <CCol lg="12" sm="12" xs="12" md="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                    <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                      {data.label_name}
                                    </CLabel>
                                    <CSelect
                                      className="input-field-layout"
                                      onChange={(e) =>
                                        typeIDOneDropDownChange(
                                          data.template_element_label_id,
                                          e
                                        )
                                      }
                                      value={lower_value[idx]["value"]}
                                    >
                                      <option value="">---Select---</option>
                                      {data.input_data_name.length > 0 &&
                                        data.input_data_name.map(
                                          (singleChoice, index) => {
                                            return (
                                              <option
                                                style={{ backgroundColor: "#e6e8ff" }}
                                                key={index}
                                              >
                                                {singleChoice}
                                              </option>
                                            );
                                          }
                                        )}
                                    </CSelect>
                                    {lower_value[idx]["sub_error"] != "" &&
                                      <CLabel className="label-error">
                                        {lower_value[idx]["sub_error"]}
                                      </CLabel>
                                    }
                                  </CCol>
                                </CRow>
                              </>
                            )}
                            {data.element_type_id == 2 && (
                              <>
                                <CRow>
                                  <CCol lg="12" sm="12" xs="12" md="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                    <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                      {data.label_name}
                                    </CLabel>
                                  </CCol>
                                </CRow>
                                {data.level.level_category_id == 0 && (
                                  <CRow>
                                    <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                      <CRow
                                        className="ml-4"
                                        style={{
                                          display: "flex",
                                          marginLeft: "15px",
                                        }}
                                      >
                                        {data.input_data_name.length > 0 &&
                                          data.input_data_name.map(
                                            (multiChoice, index) => {
                                              let input_data_name = "";

                                              let filtered = lower_value[idx]["value"].filter(
                                                (item) => {
                                                  return (
                                                    item.input_data_name == multiChoice
                                                  );
                                                }
                                              );

                                              if (filtered.length > 0) {
                                                input_data_name =
                                                  filtered[0].input_data_name;
                                              }
                                              return (
                                                <CCol
                                                  lg="4"
                                                  key={index}
                                                  style={{ marginLeft: "-18px" }}
                                                >
                                                  <CLabel
                                                    className="normal-label"
                                                    style={{
                                                      wordBreak: "break-word",
                                                      paddingLeft: "5px",
                                                      paddingTop: "3px",
                                                    }}
                                                  >
                                                    <CInputCheckbox
                                                      value={multiChoice}
                                                      checked={lower_value[idx]["value"].some(
                                                        (e) =>
                                                          e.input_data_name ==
                                                          multiChoice && e.check
                                                      )}
                                                      style={{
                                                        width: "15px",
                                                        height: "15px",
                                                        accentColor: "#818ce1",
                                                        cursor: "pointer",
                                                        marginLeft: "-1.5rem",
                                                      }}
                                                      onChange={(e) =>
                                                        typeIDTwoChange(
                                                          data.template_element_label_id,
                                                          multiChoice
                                                        )
                                                      }
                                                    />
                                                    {multiChoice}
                                                  </CLabel>
                                                </CCol>
                                              );
                                            }
                                          )}
                                      </CRow>
                                    </CCol>
                                  </CRow>
                                )}
                                {(data.level.level_category_id == 1 ||
                                  data.level.level_category_id == 2 ||
                                  data.level.level_category_id == 3 ||
                                  data.level.level_category_id == 4) && (
                                    <>
                                      {data.input_data_name.length > 0 &&
                                        data.input_data_name.map((multiChoice, index) => {
                                          let input_data_name = "";
                                          let filtered = lower_value[idx]["value"].filter(
                                            (item) => {
                                              return item.input_data_name == multiChoice;
                                            }
                                          );
                                          if (filtered.length > 0) {
                                            input_data_name = filtered[0].input_data_name;
                                          }
                                          return (
                                            <div key={index}>
                                              <CRow>
                                                <CCol lg="3" style={{ marginLeft: "30px", marginTop: "9px" }}>
                                                  <CLabel
                                                    className="normal-label"
                                                    style={{
                                                      wordBreak: "break-word",
                                                      paddingLeft: "5px",
                                                      paddingTop: "3px",
                                                    }}
                                                  >
                                                    <CInputCheckbox
                                                      value={multiChoice}
                                                      checked={lower_value[idx]["value"].some(
                                                        (e) =>
                                                          e.input_data_name == multiChoice &&
                                                          e.check
                                                      )}
                                                      style={{
                                                        width: "15px",
                                                        height: "15px",
                                                        accentColor: "#818ce1",
                                                        cursor: "pointer",
                                                      }}
                                                      onChange={(e) =>
                                                        typeIDTwoChange(
                                                          data.template_element_label_id,
                                                          multiChoice
                                                        )
                                                      }
                                                    />
                                                    {multiChoice}
                                                  </CLabel>
                                                </CCol>
                                                <CCol lg="8" style={{ marginLeft: "10px" }}>
                                                  <CSelect
                                                    className="input-field-layout"
                                                    value={
                                                      lower_value[idx]["value"][index]["level_name"]
                                                    }
                                                    style={{ marginBottom: "10px" }}
                                                    onChange={(e) =>
                                                      typeIDTwoDropDownChange(
                                                        data.template_element_label_id,
                                                        multiChoice,
                                                        data.level.level_category_id,
                                                        e
                                                      )
                                                    }
                                                  >
                                                    <option
                                                      key={index}
                                                      value=""
                                                      level_name=""
                                                    >
                                                      ---Select---
                                                    </option>
                                                    {data.level.level_data.length > 0 &&
                                                      data.level.level_data.map(
                                                        (levelid, index) => {
                                                          return (
                                                            <option
                                                              style={{
                                                                backgroundColor: "#e6e8ff",
                                                              }}
                                                              key={index}
                                                              value={levelid}
                                                              level_name={levelid}
                                                            >
                                                              {levelid}
                                                            </option>
                                                          );
                                                        }
                                                      )}
                                                  </CSelect>
                                                </CCol>
                                              </CRow>
                                              <CRow>
                                                <CLabel className="comment-label" style={{ marginLeft: "40px" }}>{data.level.level_comment}</CLabel>
                                              </CRow>
                                            </div>
                                          );
                                        })}
                                    </>
                                  )}
                                {lower_value[idx]["sub_error"] != "" &&
                                  <CLabel className="label-error" style={{ marginLeft: "13px" }}>
                                    {lower_value[idx]["sub_error"]}
                                  </CLabel>
                                }
                              </>
                            )}
                            {data.element_type_id == 3 && (
                              <>
                                <CRow>
                                  <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                    <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                      {data.label_name}
                                    </CLabel>
                                  </CCol>
                                </CRow>
                                <CRow>
                                  <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                    <CRow
                                      className="ml-4"
                                      style={{
                                        display: "flex",
                                        marginLeft: "15px",
                                      }}
                                    >
                                      {data.input_data_name.length > 0 &&
                                        data.input_data_name.map(
                                          (singleChoice, index) => {
                                            return (
                                              <CCol
                                                lg="4"
                                                key={index}
                                                style={{ marginLeft: "-18px" }}
                                              >
                                                <CLabel
                                                  style={{ wordBreak: "break-all" }}
                                                  className="normal-label"
                                                >
                                                  <CInputRadio
                                                    style={{ cursor: "pointer" }}
                                                    value={singleChoice}
                                                    className="Radio"
                                                    name={singleChoice}
                                                    checked={
                                                      lower_value[idx]["value"] == singleChoice
                                                        ? true
                                                        : false
                                                    }
                                                    onChange={(e) =>
                                                      typeIDThreeChange(
                                                        data.template_element_label_id,
                                                        e.target.value,
                                                        e.target.name
                                                      )
                                                    }
                                                  />
                                                  {singleChoice}
                                                </CLabel>
                                                <br />
                                              </CCol>
                                            );
                                          }
                                        )}
                                    </CRow>
                                  </CCol>
                                </CRow>
                                {lower_value[idx]["sub_error"] != "" &&
                                  <CLabel className="label-error" style={{ marginLeft: "13px" }}>
                                    {lower_value[idx]["sub_error"]}
                                  </CLabel>
                                }
                              </>
                            )}
                            {data.element_type_id == 4 && (
                              <CRow>
                                <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                  <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                    {data.label_name}
                                  </CLabel>
                                  <CInput
                                    id={data.template_element_label_id}
                                    className="input-field-layout"
                                    value={lower_value[idx]["value"]}
                                    onChange={(e) =>
                                      typeIDFourChange(
                                        data.template_element_label_id,
                                        e
                                      )
                                    }
                                  />
                                  {lower_value[idx]["sub_error"] != "" &&
                                    <CLabel className="label-error">
                                      {lower_value[idx]["sub_error"]}
                                    </CLabel>
                                  }
                                </CCol>
                              </CRow>
                            )}
                            {data.element_type_id == 5 && (
                              <CRow>
                                <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                  <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                    {data.label_name}
                                  </CLabel>
                                  <CTextarea
                                    value={lower_value[idx]["value"]}
                                    onChange={(e) =>
                                      typeIDFiveChange(
                                        data.template_element_label_id,
                                        e
                                      )
                                    }
                                    className="input-cmt-layout"
                                  />
                                  {lower_value[idx]["sub_error"] != "" &&
                                    <CLabel className="label-error">
                                      {lower_value[idx]["sub_error"]}
                                    </CLabel>
                                  }
                                </CCol>
                              </CRow>
                            )}
                            {data.element_type_id == 6 && (
                              <CRow>
                                <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                  <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                    {data.label_name}
                                  </CLabel>
                                  <MuiPickersUtilsProvider
                                    libInstance={moment}
                                    utils={DateFnsUtils}
                                  >
                                    <KeyboardDatePicker
                                      InputProps={{
                                        readOnly: true,
                                        disableUnderline: true,
                                      }}
                                      clearable
                                      placeholder="yyyy/mm/dd"
                                      value={
                                        lower_value[idx]["value"] == "" ||
                                          lower_value[idx]["value"] == null
                                          ? null
                                          : lower_value[idx]["value"]
                                      }
                                      onChange={(e) =>
                                        typeIDSixChange(
                                          data.template_element_label_id,
                                          e
                                        )
                                      }
                                      format="yyyy/MM/dd"
                                      style={{
                                        borderRadius: "5px",
                                        overflow: "hidden",
                                        width: "100%",
                                        border: "1px solid #5d8389"
                                      }}
                                      className="input-field-layout"
                                    />
                                  </MuiPickersUtilsProvider>
                                  {lower_value[idx]["sub_error"] != "" &&
                                    <CLabel className="label-error">
                                      {lower_value[idx]["sub_error"]}
                                    </CLabel>
                                  }
                                </CCol>
                              </CRow>
                            )}
                            {data.element_type_id == 7 && (
                              <>
                                <CRow>
                                  <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                    <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                      {data.label_name}
                                    </CLabel>
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
                                </CRow>
                                <CRow>
                                  <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                    <CInput
                                      className="input-field"
                                      hidden
                                      accept=".pdf,.xlsx,.xls,.doc,.docx,.png, .jpg, .jpeg"
                                      type="file"
                                      id={`inputGroupFile02${data.template_element_label_id}`}
                                      onChange={(e) =>
                                        typeIDSevenChange(
                                          data.template_element_label_id,
                                          e
                                        )
                                      }
                                      onClick={(e) =>
                                        clearFile(data.template_element_label_id, e)
                                      }
                                    />
                                  </CCol>
                                </CRow>
                                {lower_value.length > 0 &&
                                  lower_value.map((v, i) => {
                                    if (v.element_type_id == 7) {
                                      return (
                                        <div key={i}>
                                          {v.value.length > 0 &&
                                            v.value.map((file, index) => {
                                              return (
                                                <div key={index}>
                                                  {v.template_element_label_id ==
                                                    data.template_element_label_id && (
                                                      <CRow style={{ marginBottom: "20px" }}>
                                                        <CCol lg="2"></CCol>
                                                        <CCol lg="6" sm="8" md="6" xs="8">
                                                          <ul>
                                                            <li>{file.name}</li>
                                                          </ul>
                                                        </CCol>
                                                        <CCol lg="1" sm="2" md="1" xs="1">
                                                          <CButton
                                                            style={{ padding: "0px" }}
                                                            onClick={() =>
                                                              Clear(
                                                                file.name,
                                                                data.template_element_label_id
                                                              )
                                                            }
                                                          >
                                                            <CImg
                                                              style={{
                                                                width: "20px",
                                                                height: "20px",
                                                                borderRadius: "50px",
                                                              }}
                                                              src={process.env.PUBLIC_URL + "/avatars/crossblack.png"}
                                                            />
                                                          </CButton>
                                                        </CCol>
                                                        <CCol lg="2"></CCol>
                                                      </CRow>
                                                    )}
                                                </div>
                                              );
                                            })}
                                        </div>
                                      );
                                    }
                                  })}
                                {lower_value[idx]["sub_error"] != "" &&
                                  <CLabel className="label-error" style={{ marginLeft: "13px" }}>
                                    {lower_value[idx]["sub_error"]}
                                  </CLabel>
                                }
                              </>
                            )}
                            {data.element_type_id == 9 && (
                              <CRow>
                                <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                  <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                    {data.label_name}
                                  </CLabel>
                                  <CInput
                                    id={data.template_element_label_id}
                                    className="input-field-layout"
                                    value={lower_value[idx]["value"]}
                                    onChange={(e) =>
                                      typeIDNineChange(
                                        data.template_element_label_id,
                                        e
                                      )
                                    }
                                    readOnly
                                  />
                                  {lower_value[idx]["sub_error"] != "" &&
                                    <CLabel className="label-error">
                                      {lower_value[idx]["sub_error"]}
                                    </CLabel>
                                  }
                                </CCol>
                              </CRow>
                            )}
                            {data.element_type_id == 10 && (
                              <CRow>
                                <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                  <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                    {data.label_name}
                                  </CLabel>
                                  {data.label_name == "Total Experience (Year)" &&
                                    <>
                                      <CInput
                                        id={data.template_element_label_id}
                                        className="input-field-layout"
                                        style={{ marginBottom: "10px" }}
                                        placeholder="Enter Year"
                                        value={lower_value[idx]["value"]}
                                        onChange={(e) =>
                                          typeIDTenChange(data.template_element_label_id, e, data.label_name)
                                        }
                                      />
                                      <CRow>
                                        <CLabel className="comment-label" style={{ marginLeft: "15px" }}>Total Experience (Year) can accept maximum year up to 99 and 11 Months.</CLabel>
                                      </CRow>
                                    </>
                                  }
                                  {data.label_name == "Expected Salary" &&
                                    <div style={{ display: "flex" }}>
                                      <CInput
                                        id={data.template_element_label_id}
                                        className="input-field-layout"
                                        style={{ marginRight: "10px" }}
                                        value={lower_value[idx]["value"]}
                                        onChange={(e) =>
                                          typeIDTenChange(data.template_element_label_id, e)
                                        }
                                      />

                                      <CSelect
                                        className="input-field-layout"
                                        style={{ width: "200px" }}
                                        onChange={(e) => currencyChange(e)}
                                        value={currency}
                                      >
                                        <option>MMK</option>
                                        <option>USD</option>
                                      </CSelect>
                                    </div>
                                  }
                                  {(data.label_name != "Total Experience (Year)" && data.label_name != "Expected Salary") &&
                                    <CInput
                                      id={data.template_element_label_id}
                                      className="input-field-layout"
                                      value={lower_value[idx]["value"]}
                                      onChange={(e) =>
                                        typeIDTenChange(data.template_element_label_id, e)
                                      }
                                    />
                                  }
                                  {lower_value[idx]["sub_error"] != "" &&
                                    <CLabel className="label-error label-orange-error">
                                      {lower_value[idx]["sub_error"]}
                                    </CLabel>
                                  }
                                </CCol>

                              </CRow>
                            )}
                            {data.element_type_id == 11 && (
                              <CRow>
                                <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                  <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                    {data.label_name}
                                  </CLabel>
                                  <CInput
                                    id={data.template_element_label_id}
                                    className="input-field-layout"
                                    value={lower_value[idx]["value"]}
                                    onChange={(e) =>
                                      typeIDElevenChange(
                                        data.template_element_label_id,
                                        e
                                      )
                                    }
                                  />
                                  {lower_value[idx]["sub_error"] != "" &&
                                    <CLabel className="label-error">
                                      {lower_value[idx]["sub_error"]}
                                    </CLabel>
                                  }
                                </CCol>
                              </CRow>
                            )}
                            {data.element_type_id == 12 && (
                              <CRow>
                                <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                  <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                    {data.label_name}
                                  </CLabel>
                                  <CInput
                                    id={data.template_element_label_id}
                                    className="input-field-layout"
                                    value={lower_value[idx]["value"]}
                                    onChange={(e) =>
                                      typeIDTwelveChange(
                                        data.template_element_label_id,
                                        e
                                      )
                                    }
                                  />
                                  {lower_value[idx]["sub_error"] != "" &&
                                    <CLabel className="label-error">
                                      {lower_value[idx]["sub_error"]}
                                    </CLabel>
                                  }
                                </CCol>
                              </CRow>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
              </CCol>
            </>
          </CRow>
          <CRow style={{ marginBottom: "30px" }}>
            <CCol lg="12" style={{ paddingLeft: "45px" }}>
              <CInputCheckbox
                id="check-agree"
                checked={agreeChecked}
                onChange={() => agreeChecked}
                className="userform-label"
                style={{
                  cursor: "pointer",
                  width: "17px",
                  height: "17px",
                  accentColor: "#818ce1",
                  marginLeft: "-1rem",
                }}
              />
              <CLabel className="userform-downloadbtn normal-label"
                htmlFor="check-agree"
                style={{
                  cursor: "pointer",
                }}>
                All informations that you provide are only for this
                position and not intended for other positions. You agree
                not to use this information to another sections.
              </CLabel>
            </CCol>
          </CRow>
          <CRow style={{ marginBottom: "30px", textAlign: "center" }}>
            <CCol lg="4"></CCol>
            <CCol lg="4" style={{ textAlign: "center", justifyContent: "center" }}>
              <p className="captcha-text" style={{ display: "inline-block" }}>
                {captchaText}
              </p>
              <CImg
                style={{ marginTop: "22px", marginLeft: "-20px", marginRight: "-8px" }}
                onClick={(e) => makeCaptcha(6)}
                src={process.env.PUBLIC_URL + "/image/reload.png"}
              />
              <p>Type the characters above</p>
              {agreeChecked == true && (
                <CInput
                  className="input-field-layout"
                  placeholder="Enter Captcha"
                  type="text"
                  value={captureValue}
                  onChange={(e) => handleChangeCapture(e)}
                  style={{ marginTop: "10px", width: "160px", display: "inline-block" }}
                />
              )}
            </CCol>
            <CCol lg="4"></CCol>
          </CRow>
          {captureError != undefined && (
            <CRow style={{ marginTop: "-30px", marginBottom: "30px", justifyContent: "center" }}>
              <CLabel className="label-error">
                {captureError}
              </CLabel>
            </CRow>
          )}
          <CRow style={{ marginBottom: "30px", textAlign: "center" }}>
            <CCol lg="4"></CCol>
            <CCol
              lg="4"
              style={{ marginLeft: "1rem" }}
            >
              {!editstatus && (
                <>
                  <CInputCheckbox
                    onChange={DownloadCheck}
                    checked={checked}
                    className="userform-label"
                    id="download-resume"
                    style={{
                      cursor: "pointer",
                      width: "17px",
                      height: "17px",
                      accentColor: "#818ce1",
                      marginTop: "10px",
                    }}
                  />
                  <CLabel
                    className="userform-downloadbtn normal-label"
                    htmlFor="download-resume"
                    style={{ marginTop: "7px", cursor: "pointer" }}
                  >
                    Download Resume
                  </CLabel>
                  <CButton className="userform-btn" onClick={SaveData} style={{ backgroundColor: "rgb(90, 180, 171)" }}>
                    Save
                  </CButton>
                </>
              )}
            </CCol>
            <CCol lg="4"></CCol>
          </CRow>
        </CCol>
        <CCol lg="2"></CCol>
      </CRow>
    </div>
  );
};

export default UserFormTemplateOne;
