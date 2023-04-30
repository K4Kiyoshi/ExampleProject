import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CInput,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import EventEmitter from "../views/utils/EventEmitter";
import { ApiRequest } from "../views/common/ApiRequest";
import Loading from "../views/common/Loading";

// routes config
import routes from "../routes";

import {
  // TheHeaderDropdown,
  // TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  //TheHeaderDropdownTasks,
} from "./index";
import { useTranslation } from "react-i18next";

const TheHeader = () => {

  const { t } = useTranslation();
  let [rout, setRout] = useState([]);
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  // let tempIndex; // temporaray index for table index

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  useEffect(() => {
    let ro = routes;
    for (let i = 0; i < ro.length; i++) {
      ro[i].name = ro[i].name;
    }
    setRout(ro);

  }, [rout]);

  return (
    <>
      {/* <Loading start={loading} /> */}
      <CHeader withSubheader className="templateList-heading">
        <div className="icon-path-style">
          <CToggler
            inHeader
            className="ml-md-3 d-lg-none"
            onClick={toggleSidebarMobile}
          />
          <CToggler
            inHeader
            className="ml-3 d-md-down-none"
            onClick={toggleSidebar}
          />

          <CHeaderNav>
            <CHeaderNavItem className="px-3 responsive-heading">
              <CBreadcrumbRouter
                className="border-0 c-subheader-nav m-0 px-0 px-md-0"
                routes={rout}
              />
            </CHeaderNavItem>

          </CHeaderNav>
        </div>

        <CHeaderNav className="px-3">
          <TheHeaderDropdownNotif />
          <CImg
            style={{ width: "175px", marginRight: "10px" }}
            src={process.env.PUBLIC_URL + "/image/bamawl-logo.png"}
            alt="photo"
          />
        </CHeaderNav>

      </CHeader>
    </>
  );
};

export default TheHeader;
