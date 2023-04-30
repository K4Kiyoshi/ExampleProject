/**
 * show/ hide action button by login user permission
 * @author Thin Thin Nwe
 * @date 12/14/2021
 * @param 
 *
 */
 
import { ApiRequest } from "../ApiRequest";
import ApiPath from "../ApiPath";
 
export const specificPermission = async(page_name, loginData) => {
  let permit = [];
  let getPermission = {
    ...loginData,
    "page_name" : page_name,
  }
  let obj = {package_name: "recruit", method: 'get', url: ApiPath.SpecificPermission, params: getPermission }
  let response = await ApiRequest(obj);
  if(response.flag === false){
    let customer_name = window.location.href.split("/")[3];
    if(customer_name === "" || customer_name === null) {
      customer_name = "demo";
    }
    window.localStorage.clear();
    window.location.href = `/${customer_name}/sign-in`;
  } else {
    permit = response.data.permission
    permit.forEach((per, i) => {
      permit[i] = per["display_name"]        
    });
  }
  return permit;
}