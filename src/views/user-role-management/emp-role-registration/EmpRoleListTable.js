import { CCard, CCardBody, CCol, CImg, CLabel, CPagination, CRow, CSelect } from '@coreui/react';
import React from 'react'
import { useTranslation } from "react-i18next";

  /**
   * Employee Role List Table Component
   * @author phyoewaiaung
   * @create 01/25/2023
   */
function EmpRoleListTable(props) {
  const {t} = useTranslation();
  let {mainTable,total,paginateArr,selectPaginateOnChange,selectPaginateValue,pageStart,pageEnd,
       currentPage,lastPage,setActivePage,mainCheckboxChange,allCheck,subCheckboxChange} = props;
  return (
    <>
      {mainTable.length > 0 && (
          <CCard style={{paddingBottom:"20px", borderRadius: "1rem",overflow:"hidden"}}>
            <CCardBody>
            <div className="templateList-bg">
              <div className="template-list-heading mr-3">
                <h5 className="font-weight-bold responsive-list-heading-font" style={{ marginLeft: "17px" }}>
                  {t("Employee Role Registration List Table")}
                </h5>
                <p className="font-weight-bold">
                  <span className="hideRow">{t("Total Row")}:</span> {total} {t("row(s)")}
                </p>
              </div>
              <div className="overflow-style">
                <table className="emp-role-list-table word-break">
                  <thead>
                    <tr>
                      <th className='text-center' style={{ width:50 }}>
                        <input
                          type="CheckBox"
                          onChange={mainCheckboxChange}
                          style={{
                            width: "17px",
                            height: "17px",
                            marginTop: "4px",
                          }}
                          checked={allCheck}
                        />
                      </th>
                      <th className='text-center' style={{ width: 62 }}>{t("ID")}</th>
                      <th className='text-left' style={{ width: 130 }}>{t("Employee ID")}</th>
                      <th className='text-left' style={{ width: 130 }}>{t("Employee Code")}</th>
                      <th style={{ width: 200 }}>{t("Employee Name")}</th>
                      <th style={{ width: 225 }}>{t("Department Name")}</th>
                      <th style={{ width: 225 }}>{t("Position")}</th>
                      <th className='text-center' style={{ width: 130 }}>{t("Role Name")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mainTable.length > 0 &&
                      mainTable.map((item,index) => {
                        return (
                          <tr key={index}>
                            <td className="white-bg text-center pl9" style={{width:50}}>
                              <input
                                type="CheckBox"
                                style={{
                                  width: "17px",
                                  height: "17px",
                                  marginTop: "4px",
                                }}
                                checked={item.isChecked}
                                onChange={() =>
                                  subCheckboxChange(item.employee_id)
                                }
                              />
                            </td>
                            <td className='text-center' style={{ width: 62 }}>{pageStart + index}</td>
                            <td className='text-left' style={{ width: 130 }}>{item.employee_id}</td>
                            <td className='text-left' style={{ width: 130 }}>{item.employee_code}</td>
                            <td className='text-left' style={{ width: 200 }}>{item.employee_name}</td>
                            <td className='text-left' style={{ width: 225 }}>
                            {item.departments.map((d,idx) => {
                              if(item.departments.length-1 == idx){
                                  return d.department_name;
                              }else{
                                return d.department_name+', ';
                              }
                            })}
                            </td>
                            <td className='text-left' style={{ width: 225 }}>
                            {item.positions.map((d,idx) => {
                              if(item.positions.length-1 == idx){
                                  return d.position_name;
                              }else{
                                return d.position_name+', ';
                              }
                            })}
                            </td>
                            <td className='text-center' style={{ width: 130 }}>{item.role_name === "" || item.role_name === null ? "-" : item.role_name}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
            </CCardBody>
            <div className="card-footer">
            {total > 10 && (
              <CRow alignHorizontal="end" className="mt-3">
                <CCol lg="3" style={{ display: "flex" }}>
                  <CLabel style={{ marginTop: "10px", paddingRight: "10px" }}>
                    Row Per Page
                  </CLabel>
                  <CSelect
                    style={{ width: "65px" }}
                    value={selectPaginateValue}
                    onChange={selectPaginateOnChange}
                  >
                    <option value="10">--</option>
                    {paginateArr.map((data, index) => {
                      return (
                        <option key={index} value={data}>
                          {data}
                        </option>
                      );
                    })}
                  </CSelect>
                </CCol>
                <CCol lg="2">
                  <p style={{ marginTop: "10px" }}>
                    {pageStart}-{pageEnd} of {total}
                  </p>
                </CCol>
                <CPagination
                  activePage={currentPage}
                  pages={lastPage}
                  dots={false}
                  arrows={false}
                  align="center"
                  firstButton={<CImg
                    className="user-after"
                    src={process.env.PUBLIC_URL +"/image/previous.svg"}
                    style={{
                      width: "18px",
                      height: "15px",
                      cursor: "pointer",
                    }}
                  ></CImg>}
                  lastButton={<CImg
                    className="user-after"
                    src={process.env.PUBLIC_URL +"/image/Next.svg"}
                    style={{
                      width: "18px",
                      height: "15px",
                      cursor: "pointer",
                    }}
                  ></CImg>}
                  onActivePageChange={(i) => setActivePage(i)}
                ></CPagination>
              </CRow>
            )}
            </div>
            </CCard>
      )}
    </>
  )
}

export default EmpRoleListTable
