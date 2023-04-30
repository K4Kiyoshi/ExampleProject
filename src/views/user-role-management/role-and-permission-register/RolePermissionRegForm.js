import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CRow, CCol, CImg, CFormGroup, CInputCheckbox, CLabel, CButton } from "@coreui/react";
import SuccessError from "../../common/SuccessError";
import { useTranslation } from "react-i18next";

const RolePermissionRegister = (props) => {
    const { t } = useTranslation();
    let {
        userLevel,
        levelShow,
        userLevelChange,
        userLevelMainChange,
        userLevelSubChange,
        levelMain,
        firstIcon,
        processFirst,
        secondIcon,
        company,
        processSecond,
        processThird,
        save,
        processMain,
        btnName,
        loginPermission,
        editID,
    } = props;
    return (
        <>
            <CRow>
                <CCol lg="1" style={{ maxWidth: "4%" }}></CCol>
                <CCol lg="4">
                    <CCard
                        style={{
                            paddingBottom: "30px",
                            borderRadius: "10px",
                            overflow: "hidden",
                        }}
                    >
                        <CCardHeader style={{ backgroundColor: "rgb(78, 87, 170)" }}>
                            <CRow>
                                <CCol lg="12" style={{ paddingLeft: "25px" }}>
                                    <h3
                                        style={{
                                            color: "white",
                                            fontSize: "16px",
                                            marginTop: "10px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {t("User Level")}
                                    </h3>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody style={{ paddingLeft: "40px" }}>

                            {
                                (userLevel != "" && userLevel != null && userLevel != undefined) &&
                                userLevel.length > 0 &&
                                <CRow>
                                    {
                                        levelShow === false &&
                                        <CImg
                                            src={process.env.PUBLIC_URL + "/avatars/add-square.svg"} className="mr-2"
                                            draggable={false} onClick={userLevelChange}
                                        />
                                    }
                                    {
                                        levelShow === true &&
                                        <CImg
                                            src={process.env.PUBLIC_URL + "/avatars/minus-square.svg"} className="mr-2"
                                            draggable={false} onClick={userLevelChange}
                                        />
                                    }
                                    <CFormGroup variant="custom-checkbox" inline>
                                        <CInputCheckbox
                                            custom id="main" name="main"
                                            onChange={userLevelMainChange} checked={levelMain}
                                        />
                                        <CLabel className="normal-label" variant="custom-checkbox" htmlFor="main">
                                            {company}
                                        </CLabel>
                                    </CFormGroup>
                                </CRow>
                            }
                            {
                                (userLevel != "" && userLevel != null && userLevel != undefined && levelShow === true) &&
                                userLevel.length > 0 &&
                                userLevel.map(level => {
                                    return (
                                        <CRow key={level.id} className='mt-1 ml-5'>
                                            <CFormGroup variant="custom-checkbox" inline>
                                                <CInputCheckbox
                                                    custom id={level.admin_level_name} name={level.admin_level_name}
                                                    onChange={()=>userLevelSubChange(level)}
                                                    checked={level.is_checked === true}
                                                />
                                                <CLabel className="normal-label" variant="custom-checkbox" htmlFor={level.admin_level_name}>
                                                    {level.admin_level_name}
                                                </CLabel>
                                            </CFormGroup>
                                        </CRow>
                                    )
                                })
                            }

                        </CCardBody>

                    </CCard>
                </CCol>
                <CCol lg="1"></CCol>
                <CCol lg="6">
                    <CCard
                        className="template-list-cardBody"
                        style={{
                            paddingBottom: "30px",
                            borderRadius: "10px",
                            overflow: "hidden",
                        }}
                    >
                        <CCardHeader style={{ backgroundColor: "rgb(78, 87, 170)" }}>
                            <CRow>
                                <CCol lg="12" style={{ paddingLeft: "25px" }}>
                                    <h3
                                        style={{
                                            color: "white",
                                            fontSize: "16px",
                                            marginTop: "10px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {t("Process")}
                                    </h3>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody style={{ paddingLeft: "40px" }}>
                            {
                                (processMain.length > 0 && processMain != "" && processMain != null && processMain != undefined) &&
                                processMain.map((first, first_index) => {
                                    return (
                                        <div key={first_index} >
                                            <CRow style={{ marginTop: "8px" }}>
                                                {
                                                    first.show === false &&
                                                    <CImg
                                                        src={process.env.PUBLIC_URL + "/avatars/add-square.svg"} className="mr-2"
                                                        draggable={false} onClick={()=>firstIcon(first)}
                                                    />
                                                }
                                                {
                                                    first.show === true &&
                                                    <CImg
                                                        src={process.env.PUBLIC_URL + "/avatars/minus-square.svg"} className="mr-2"
                                                        draggable={false} onClick={()=>firstIcon(first)}
                                                    />
                                                }
                                                <CFormGroup variant="custom-checkbox" inline>
                                                    <CInputCheckbox
                                                        custom id={first.main_menu} name={first.main_menu}
                                                        onChange={()=>processFirst(first)}
                                                        checked={first.is_checked}
                                                    />
                                                    <CLabel className="normal-label" variant="custom-checkbox" htmlFor={first.main_menu}>
                                                        {t(first.main_menu)}
                                                    </CLabel>
                                                </CFormGroup>
                                            </CRow>
                                            {
                                                first.show === true &&
                                                first.sub.length > 0 &&
                                                first.sub.map((second, second_index) => {
                                                    return (
                                                        <div key={second_index}>
                                                            <CRow className="ml-4 mt-2">
                                                                {
                                                                    second.sub_show === false &&
                                                                    <CImg
                                                                        src={process.env.PUBLIC_URL + "/avatars/add-square.svg"} className="mr-2"
                                                                        draggable={false} value={first_index} id={second_index}
                                                                        onClick={secondIcon}
                                                                    />
                                                                }
                                                                {
                                                                    second.sub_show === true &&
                                                                    <CImg
                                                                        src={process.env.PUBLIC_URL + "/avatars/minus-square.svg"} className="mr-2"
                                                                        draggable={false} value={first_index} id={second_index}
                                                                        onClick={secondIcon}
                                                                    />
                                                                }
                                                                <CFormGroup variant="custom-checkbox" inline>
                                                                    <CInputCheckbox
                                                                        custom id={second.sub_menu_name} name={second.sub_menu_name}
                                                                        value={first_index} data-ref={second_index}
                                                                        onChange={processSecond} checked={second.is_checked}
                                                                    />
                                                                    <CLabel
                                                                        variant="custom-checkbox" htmlFor={second.sub_menu_name}
                                                                        className="normal-label"
                                                                    >
                                                                        {t(second.sub_menu_name)}
                                                                    </CLabel>
                                                                </CFormGroup>
                                                            </CRow>
                                                            {
                                                                second.sub_show === true &&
                                                                second.sub.length > 0 &&
                                                                second.sub.map((third, third_index) => {
                                                                    return (
                                                                        <CRow key={third_index} className='mt-2' style={{ marginLeft: 90 }}>
                                                                            <CFormGroup variant="custom-checkbox" inline>
                                                                                <CInputCheckbox
                                                                                    custom id={third.action_id} name={third_index} value={first_index}
                                                                                    data-ref={second_index} onChange={processThird} checked={third.is_checked}
                                                                                />
                                                                                <CLabel variant="custom-checkbox" htmlFor={third.action_id} className="normal-label">
                                                                                    {t(third.action_name)}
                                                                                </CLabel>
                                                                            </CFormGroup>
                                                                        </CRow>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }

                        </CCardBody>

                    </CCard>
                </CCol>
            </CRow>
            {
                <CRow alignHorizontal="center" className='mt-5 mb-5'>
                    {(loginPermission && loginPermission.length > 0 && loginPermission.includes("Save") && editID == null) && (
                        <CButton
                            className="btn-create btn-add"
                            onClick={save}
                        >
                            {t(btnName)}
                        </CButton>
                    )}
                    {(editID != null) && (
                        <CButton
                            className="btn-create btn-add"
                            onClick={save}
                        >
                            {t("Update")}
                        </CButton>
                    )}
                </CRow>
            }
        </>

    )
}

export default RolePermissionRegister;