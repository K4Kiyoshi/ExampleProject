/**
 * Role and Permisiion Detail
 * @author yaminzaw
 */
import {
  CRow, CCol, CImg, CCard, CCardHeader, CCardBody
} from '@coreui/react'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Detail = (props) => {
  const { t } = useTranslation();
  let {
    mainTable,
    header,
    goBackList
  } = props;

  return (
    <CCard style={{
      background: "white",
      paddingBottom: "30px",
      borderRadius: "1rem",
      overflow: "hidden",
    }}>
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
              onClick={goBackList}
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
              onClick={goBackList}
            >
              {t("Back")}
            </h3>
          </div>
        </CRow>
      </CCardHeader>
      <CCardBody>
        {mainTable.length > 0 && (
          <>
            <div className="templateList-bg">
              <div className="template-list-heading mr-3">
                <h5
                  className="font-weight-bold responsive-list-heading-font"
                  style={{ marginLeft: "17px" }}
                >
                  {t("Role & Permission Table")}
                </h5>
                <div style={{ display: "flex" }}>
                  <p
                    className="font-weight-bold"
                    style={{ paddingRight: "10px" }}
                  >
                  </p>
                </div>
              </div>
              <div className="overflow-style">
                <table className="main-table templateList-table position-table">
                  <thead>
                    <tr>
                      <th>{t("Action Name")}</th>
                      {
                        header.length > 0 &&
                        header.map((i, index) => {
                          return (
                            <th key={index} style={{ textAlign: 'center' }}>{i.name}</th>
                          )
                        })
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {mainTable.length > 0 &&
                      mainTable.map((i, index) => {
                        return (
                          <tr key={index}>
                            <td>{i.action_name}</td>
                            {
                              i.levels.length > 0 &&
                              i.levels.map((ii, index2) => {
                                return (
                                  <td key={index2} style={{ textAlign: 'center' }}>
                                    {
                                      ii.level_action === true &&
                                      <CImg
                                        src={process.env.PUBLIC_URL + "/image/Right.svg"}
                                        alt="yes"
                                      />
                                    }
                                    {
                                      ii.level_action === false &&
                                      <CImg
                                        src={process.env.PUBLIC_URL + "/image/Wrong.svg"}
                                        alt="no"
                                      />
                                    }
                                  </td>
                                )
                              })
                            }
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </CCardBody>
    </CCard>
  )
}
export default Detail