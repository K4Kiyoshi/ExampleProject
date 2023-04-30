/**
 * Job Annocement Date Modal
 * @author yaminzaw
 * @create 28/09/2022
 */
import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CButtonToolbar,
  CRow,
  CImg,
  CCol,
  CLabel,
} from "@coreui/react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import Moment from "moment";
import SuccessError from "../../common/SuccessError";
import { useTranslation } from "react-i18next";

const JobModal = (props) => {
  const { t } = useTranslation();
  let { error, cancel, show, selectModalEndDate, selectModalOpenDate, setSelectModalEndDate, setSelectModalOpenDate, saveDate } = props;
  return (
    <>
      <CModal
        style={{ overflow: "initial" }}
        centered
        closeOnBackdrop={false}
        show={show}
        id="advanced"
        onClose={cancel}
      >
        <CModalBody style={{ marginBottom: "30px" }}>
          <CImg
            style={{ float: "right", cursor: "pointer" }}
            onClick={props.cancel}
            src={process.env.PUBLIC_URL + "/image/close.png"}
            width={12}
            height={12}
          ></CImg>
          <CRow style={{ margin: "20px" }}>
            <CCol lg="12" style={{ width: "100%" }}><SuccessError error={error} /></CCol>
          </CRow>
          <CRow
            id="approver-modal"
            lg="12"
            style={{ marginBottom: "20px", justifyContent: "center" }}
          >
            <h4>{t("Job Announcement Date")}</h4>
          </CRow>
          <CRow id="approver-modal" lg="12" style={{ marginBottom: "10px" }}>
            <CCol lg="1"></CCol>
            <CCol lg="10" sm="10" xs="10" md="10">
              <CLabel className="required">
                {t("Job Open Date")}
              </CLabel>
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
                  className="input-field"
                  placeholder="yyyy/mm/dd"
                  disablePast
                />
              </MuiPickersUtilsProvider>
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
          <CRow id="approver-modal" lg="12" style={{ marginBottom: "10px" }}>
            <CCol lg="1"></CCol>
            <CCol lg="10" sm="10" xs="10" md="10">
              <CLabel className="required">
                {t("Job Close Date")}
              </CLabel>
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
                  className="input-field"
                  placeholder="yyyy/mm/dd"
                  disablePast
                  minDate={selectModalOpenDate}
                />
              </MuiPickersUtilsProvider>
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
          <CButtonToolbar
            style={{ justifyContent: "center", marginTop: "30px" }}
          >
            <CButton
              className="btn-create btn-add"
              onClick={() => saveDate(selectModalOpenDate, selectModalEndDate)}
            >
              {t("Save")}
            </CButton>
          </CButtonToolbar>
        </CModalBody>
      </CModal>
    </>
  );
};
export default JobModal;
