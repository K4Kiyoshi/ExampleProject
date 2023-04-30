import { ApiRequest } from "../ApiRequest";
import ApiPath from "../ApiPath";

const PermissionCheck = async () => {
  let customer_name = window.location.href.split("/")[3];
  let short_name = window.location.href.split("/")[4];
  let main_menu = window.location.href.split("/")[5];
  let sub_menu = window.location.href.split("/")[6];
  if (main_menu == "dashboard") {
    sub_menu = "dashboard";
  }
  if (customer_name === "" || customer_name === null) {
    customer_name = "demo";
  }
  let obj = {
    package_name: "recruit",
    url: ApiPath.PermissionCheckFormPermission,
    method: "get",
    params: {
      login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
      main_menu: main_menu,
      sub_menu: sub_menu,
      device_flag: 1,
      language: localStorage.getItem(`${customer_name}_LANGUAGE`),
    },
  };
  let response = await ApiRequest(obj);

  if (response.data.status == "NG") {
    // window.localStorage.clear();
    // window.location.href = `/${customer_name}/${short_name}/no-permission`;
  } else {
    if (response.data.form_access == false) {
      // window.localStorage.clear();
      window.location.href = `/${customer_name}/${short_name}/no-permission`;
    }
  }
};
export default PermissionCheck;
