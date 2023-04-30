/**
 * Success Message Modal
 * @author yaminzaw
 * @create 04/11/2022
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

const MsgBox = (props) => {
  let { success, show, cancel, error, layoutId } = props;
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
        <CModalBody style={{ marginBottom: "30px", textAlign: "center" }}>
          {success != "" && (
            <>
              {layoutId == 1 &&
                <CImg
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50px",
                    marginBottom: "30px"
                  }}
                  src={process.env.PUBLIC_URL + "/image/Success Template 1.svg"}
                />
              }
              {layoutId == 2 &&
                <CImg
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50px",
                    marginBottom: "30px"
                  }}
                  src={process.env.PUBLIC_URL + "/image/success_msg.png"}
                />
              }
              {layoutId == 3 &&
                <CImg
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50px",
                    marginBottom: "30px"
                  }}
                  src={process.env.PUBLIC_URL + "/image/Success Template 3.svg"}
                />
              }
              <h2 style={{ marginBottom: "10px", fontWeight: "bold" }}>Congratulations!</h2>
              <h5>{success}</h5>
              {layoutId == 1 &&
                <CButton className="userform-btn" style={{ marginTop: "30px", backgroundColor: "rgb(90, 180, 171)" }} onClick={props.successOk}>
                  OK
                </CButton>
              }
              {layoutId == 2 &&
                <CButton className="userform-btn" style={{ marginTop: "30px" }} onClick={props.successOk}>
                  OK
                </CButton>
              }
              {layoutId == 3 &&
                <CButton className="userform-btn" style={{ marginTop: "30px", backgroundColor: "#8993ef" }} onClick={props.successOk}>
                  OK
                </CButton>
              }

            </>
          )}
          {error != "" &&
            <>
              <CImg
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50px",
                  marginBottom: "30px"
                }}
                src={process.env.PUBLIC_URL + "/image/err_msg.png"}
              />

              <h2 style={{ marginBottom: "10px", fontWeight: "bold" }}>Sorry!</h2>
              <h5>{error}</h5>
              <CButton className="userform-btn" style={{ marginTop: "30px", backgroundColor: "#FF4D4F" }} onClick={props.cancel}>
                Try Again
              </CButton>
            </>
          }

        </CModalBody>
      </CModal>
    </>
  );
};
export default MsgBox;
