import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
  CTooltip,
  CLabel,
} from "@coreui/react";
import DynamicMenu from "./DynamicMenu";
import { useTranslation } from "react-i18next";
import ApiPath from "../views/common/ApiPath";
import { ApiRequest } from "../views/common/ApiRequest";
import PackageAccessCheck from "./PackageAccessCheck";
import { useHistory } from "react-router-dom";
import { isEmpty } from "../views/common/CommonValidation";
const RecruitMainSidebar = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [navItem, setNavItem] = useState();
  const show = useSelector((state) => state.sidebarShow);
  let customer_name = window.location.href.split("/")[3];
  let menu_name = window.location.href.split("/")[5]; // project name in url
  let [photo, setPhoto] = useState("");
  let [name, setName] = useState("");
  useEffect(() => {
    let photo = localStorage.getItem(`${customer_name}_PHOTO`);
    setPhoto(photo);
    let name = localStorage.getItem(`${customer_name}_EMP_NAME`);
    setName(name);
    (async () => {
      await fetchData();
      props.onMount();
    })();
  }, []);

  async function fetchData() {
    if (localStorage.getItem(`${customer_name}_REFRESH_TOKEN`) != null) {
      const menu = await DynamicMenu();
      let dashboardRoute = "";
      Promise.all([menu]).then((values) => {
        let data = values[0][0]["data"];
        let recruitFlag = values[0][0]["recruit-flag"];
        let recruitPermission = values[0][0]["recruit-permission"];

        if (
          (menu_name == "Dashboard" || menu_name == "dashboard" ||
            menu_name == "dashboard-no-permission" ||
            menu_name == "not-register") &&
          recruitFlag == true
        ) {
          if (recruitPermission == false) {
            dashboardRoute = "/recruit/dashboard-no-permission";
            history.push(`/${customer_name}/recruit/dashboard-no-permission`);
          } else {
            history.push(`/${customer_name}/recruit/Dashboard`);
          }
        } else if (
          (menu_name == "Dashboard" || menu_name == "dashboard" ||
            menu_name == "dashboard-no-permission" ||
            menu_name == "not-register") &&
          recruitFlag == false
        ) {
          dashboardRoute = "/recruit/not-register";
          history.push(`/${customer_name}/recruit/not-register`);
        }else if(recruitFlag == true){
          if (recruitPermission == false) {
            dashboardRoute = "/recruit/dashboard-no-permission";
            history.push(`/${customer_name}/recruit/dashboard-no-permission`);
          } 
        }else if(recruitFlag == false){
          dashboardRoute = "/recruit/not-register";
          history.push(`/${customer_name}/recruit/not-register`);
        }

        let count = data.length;
       
        for (let i = 0; i < count; i++) {
          if (data[i].name === "Dashboard") {
            data[i].className = "dashboard";
            if (dashboardRoute == "") {
              data[i].to = "/" + customer_name + "/recruit/dashboard";
              data[i].route = "/dashboard";
            } else {
              data[i].to = "/" + customer_name + dashboardRoute;
              data[i].route = "/dashboard";
            }
          }
          if (data[i].name === "Job and Position Management") {
            data[i].className = "job-and-position-management";
          }
          if (data[i].name === "User Management") {
            data[i].className = "user-management";
          }
          if (data[i].name === "Template Management") {
            data[i].route = "/template-management";
            data[i].to = "/" + customer_name + "/recruit/template-management";
            data[i].className = "template-management";
          }
          if (data[i].name === "Resume Management") {
            data[i].route = "/resume-management";
            data[i].to = "/" + customer_name + "/recruit/resume-management";
            data[i].className = "resume-management";
          }
          if (data[i].name === "Role Management") {
            data[i].className = "role-management";
            data[i].route = "/role-management";
            data[i].to = "/" + customer_name + "/recruit/role-management";
          }

          if (data[i].name === "HR Management") {
            data[i].className = "hr-management";
            data[i].to = "/" + customer_name + "/" + data[i].to;
          }

          if (data[i].name === "Plan Management") {
            data[i].className = "plan-management";
            data[i].to = "/" + customer_name + "/" + data[i].to;
          }

          if (data[i].name === "Expense") {
            data[i].className = "expense-management";
            data[i].to = "/" + customer_name + "/" + data[i].to;
          }

          if (data[i].name === "Loan Management") {
            data[i].className = "loan-management";
            data[i].to = "/" + customer_name + "/" + data[i].to;
          }
          if (data[i].name === "ERP") {
            data[i].className = "erp-management";
            data[i].route = "/erp/auth";
            data[i].to = "/" + customer_name + "/erp/auth";
          }

          if (data[i].name === "Logout") {
            data[i].className = "logout";
            data[i].route = `/${customer_name}/logout`;
            data[i].to = "/" + customer_name + "/logout";
          }
          if (data[i].hasOwnProperty("_children")) {
            let child_count = data[i]["_children"].length;
            for (let j = 0; j < child_count; j++) {
              data[i]["_children"][j]._tag = "CSidebarNavItem";
              data[i]["_children"][j].name = t(data[i]["_children"][j].name);
            }
          }
          data[i].name = t(data[i].name);
        } // end for loop

        setNavItem(data);
      });
    }
  }

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <div className="c-avatar">
        {isEmpty(photo) ? (
          <div className="c-avatar-img  mt-3 mb-2">
            <CImg
              style={{
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                border: "2px solid #7bbe35",
              }}
              src={process.env.PUBLIC_URL + "/image/profile_default.png"}
            ></CImg>
          </div>
        ) : (
          <>
            <br></br>
            <CImg
              src={photo}
              alt="photo"
              style={{
                borderRadius: "50%",
                display: "block",
                width: "100px",
                height: "100px",
                marginLeft: "72px",
                border: "2px solid #7bbe35",
              }}
            />
            <br></br>
          </>
        )}
        {name != "" && name != null && (
          <CLabel
            style={{
              fontWeight: "bold",
              marginTop: isEmpty(photo) ? "35px" : "0px",
            }}
          >
            {name.length <= 15 && name}
            {name.length > 15 && (
              <>
                {name.substring(0, 15)}
                <CTooltip content={name} placement="right">
                  <span>...</span>
                </CTooltip>
              </>
            )}
          </CLabel>
        )}
      </div>
      <div
        className="c-avatar"
        style={{
          borderBottom: "1px dotted",
          display: "flex",
          marginTop: name != "" && name != null ? "0px" : "41px",
        }}
      >
        <CImg
          style={{ width: "10%", marginBottom: "18px" }}
          src={process.env.PUBLIC_URL + "/image/Resume.svg"}
        ></CImg>{" "}
        &nbsp; &nbsp;
        <p
          style={{
            fontWeight: "bold",
            fontSize: "17px",
          }}
        >
          Recruitment System
        </p>
      </div>
      <br></br>
      <CSidebarNav>
        <CCreateElement
          items={navItem}
          //items={nav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      {/* <CSidebarMinimizer className="c-d-md-down-none"/> */}
    </CSidebar>
  );
};

export default React.memo(RecruitMainSidebar);
