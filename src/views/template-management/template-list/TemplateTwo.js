/**  User Form Design for layout id 2
 * @author yamin zaw(update)
 * @create 4/10/2022
 */
import {
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
  CModal,
  CModalBody
} from "@coreui/react";
import React from "react";

const TemplateTwo = (props) => {
  let { viewData, filterArray, filterViewDataTwo, positionName, categoryName } = props;
  return (
    <>
      {viewData != 0 && (
        <CModal
          size="xl"
          centered
          onClose={props.cancel}
          closeOnBackdrop={false}
          show={props.show}
          style={{
            boxShadow: "rgb(0 0 0 / 25%) 0px 3px 7px",
            borderRadius: "unset",
          }}
        >
          <CModalBody className="p-0">
            <CImg
              className="cross-img cursorStyle"
              onClick={props.cancel}
              style={{ right: "-30px" }}
              src={process.env.PUBLIC_URL + "/avatars/close.png"}
              width={33}
              height={33}
            ></CImg>
            <CRow>
              <CCol lg="7" md="7" sm="7" xs="7" className="word-break" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                <>
                  {filterArray.length > 0 &&
                    filterArray.map((data, idx) => {
                      return (
                        <div key={idx} style={{ marginBottom: "24px" }}>
                          {data.element_type_id == 1 && (
                            <>
                              <CRow>
                                <CCol lg="12" sm="12" xs="12" md="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                  <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                    {data.label_name}
                                  </CLabel>
                                  <CSelect
                                    className="input-field-layout"
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
                                                    style={{
                                                      width: "15px",
                                                      height: "15px",
                                                      accentColor: "#818ce1",
                                                      cursor: "pointer",
                                                      marginLeft: "-1.5rem",
                                                    }}
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
                                                    style={{
                                                      width: "15px",
                                                      height: "15px",
                                                      accentColor: "#818ce1",
                                                      cursor: "pointer",
                                                    }}
                                                  />
                                                  {multiChoice}
                                                </CLabel>
                                              </CCol>
                                              <CCol lg="8" style={{ marginLeft: "10px" }} >
                                                <CSelect
                                                  className="input-field-layout"
                                                  style={{ marginBottom: "10px" }}
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
                                                  className="Radio"
                                                  name={singleChoice}
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
                            </>
                          )}
                          {(data.element_type_id == 4 || data.element_type_id == 10 || data.element_type_id == 11 || data.element_type_id == 12) && (
                            <CRow>
                              <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                  {data.label_name}
                                </CLabel>
                                <CInput
                                  id={data.template_element_label_id}
                                  className="input-field-layout"
                                />
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
                                  className="input-cmt-layout"
                                />
                              </CCol>
                            </CRow>
                          )}
                          {data.element_type_id == 6 && (
                            <CRow>
                              <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                  {data.label_name}
                                </CLabel>
                                <CInput
                                  placeholder="yyyy/mm/dd"
                                  style={{
                                    borderRadius: "5px",
                                    overflow: "hidden",
                                    width: "100%",
                                    border: "1px solid #5d8389"
                                  }}
                                  className="input-field-layout">
                                </CInput>
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
                                    />
                                    <CLabel>
                                      <img
                                        src={process.env.PUBLIC_URL + "/image/attach.png"}
                                        className="cross-img-userform"
                                      />
                                    </CLabel>

                                  </CInputGroup>
                                </CCol>
                              </CRow>
                            </>
                          )}
                        </div>
                      );
                    })}
                </>
              </CCol>
              <CCol lg="5" md="5" sm="5" xs="5" className="templateTwo word-break" style={{ paddingTop: "30px" }}>
                {filterViewDataTwo.length > 0 &&
                  filterViewDataTwo.map((data, idx) => {
                    return (
                      <div key={idx} style={{ textAlign: "center" }}>
                        {data.element_type_id == 8 && (
                          <>
                            <CInputGroup style={{ justifyContent: "center" }}>
                              <CLabel htmlFor="photo-upload">
                                <CImg
                                  className="profileImg responsive-img"
                                  src={process.env.PUBLIC_URL + "/avatars/bi_person-fill.svg"}
                                  width={150}
                                  height={150}
                                ></CImg>
                              </CLabel>
                            </CInputGroup>
                          </>
                        )}
                      </div>
                    )
                  })}
                <CRow style={{ justifyContent: "center", alignItems: "center" }}>
                  <CCol lg="12" style={{ textAlign: "center" }}>
                    <CLabel className="userform-label">{categoryName}&nbsp;(&nbsp;{positionName}&nbsp;)</CLabel>
                  </CCol>
                </CRow>
                {filterViewDataTwo.length > 0 &&
                  filterViewDataTwo.map((data, idx) => {
                    return (
                      <div key={idx} style={{ marginBottom: "24px" }}>
                        {data.element_type_id == 1 && (
                          <>
                            <CRow>
                              <CCol lg="12" sm="12" xs="12" md="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                  {data.label_name}
                                </CLabel>
                                <CSelect
                                  className="input-field-layout"
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
                              </CCol>
                            </CRow>
                          </>
                        )}
                        {(data.element_type_id == 4 || data.element_type_id == 9 || data.element_type_id == 10 || data.element_type_id == 11 || data.element_type_id == 12) && (
                          <CRow>
                            <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                              {(data.label_name != "Currency Type") &&
                                <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                  {data.label_name}
                                </CLabel>
                              }
                              {data.label_name == "Total Experience (Year)" &&
                                <>
                                  <CInput
                                    id={data.template_element_label_id}
                                    className="input-field-layout"
                                    style={{ marginBottom: "10px" }}
                                    placeholder="Enter Year"
                                  />
                                  <CRow>
                                    <CLabel className="normal-label" style={{ marginLeft: "15px" }}>Total Experience (Year) can accept maximum year up to 99 and 11 Months.</CLabel>
                                  </CRow>
                                </>
                              }
                              {(data.label_name != "Total Experience (Year)" && data.label_name != "Expected Salary" && data.label_name != "Currency Type") &&
                                <CInput
                                  id={data.template_element_label_id}
                                  className="input-field-layout"
                                />
                              }
                              {data.label_name == "Expected Salary" &&
                                <div style={{ display: "flex" }}>
                                  <CInput
                                    id={data.template_element_label_id}
                                    style={{ marginRight: "10px" }}
                                    className="input-field-layout"
                                  />
                                  <CSelect
                                    className="input-field-layout"
                                    style={{ width: "120px" }}
                                  >
                                    <option>MMK</option>
                                    <option>USD</option>
                                  </CSelect>
                                </div>
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
                                className="input-cmt-layout"
                              />
                            </CCol>

                          </CRow>
                        )}
                        {data.element_type_id == 6 && (
                          <CRow>
                            <CCol lg="12" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                              <CLabel className={`${data.require_flag == 1 ? "userform-label required" : "userform-label"}`}>
                                {data.label_name}
                              </CLabel>
                              <CInput
                                placeholder="yyyy/mm/dd"
                                style={{
                                  borderRadius: "5px",
                                  overflow: "hidden",
                                  width: "100%",
                                  border: "1px solid #5d8389"
                                }}
                                className="input-field-layout">
                              </CInput>
                            </CCol>

                          </CRow>
                        )}
                      </div>
                    );
                  })}
              </CCol>
            </CRow>
          </CModalBody>
        </CModal>
      )}
    </>
  );
};

export default TemplateTwo;
