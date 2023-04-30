import React, { useEffect, useState } from "react";
import ApiPath from '../views/common/ApiPath';
import { ApiRequest } from '../views/common/ApiRequest';
import PackageAccessCheck from './PackageAccessCheck';
import { cibOsi } from "@coreui/icons";

const DynamicMenu = async () => {

    let allData = []; let recruitFlag = "", recruitPermission = ""; let obj = "";
    let freshToken = localStorage.getItem(`${customer_name}_REFRESH_TOKEN`);
    let customer_name = window.location.href.split("/")[3];
    if (customer_name === "") {
        customer_name = 'demo';
    }
    const packageAccess = await PackageAccessCheck();
    recruitFlag = packageAccess['recruitFlag'];
    recruitPermission = packageAccess['recruitPermission'];
   
    obj = {
        package_name: "recruit", method: 'get', url: ApiPath.DyanamicMenuGetData,
        params: {
            //"login_id" : localStorage.getItem(`LOGIN_ID`), 
            "login_id": localStorage.getItem(`${customer_name}_LOGIN_ID`),
            "hr_flag": packageAccess['hrFlag'],
            "expense_flag": packageAccess['expenseFlag'],
            "plan_flag": packageAccess['planFlag'],
            "loan_flag": packageAccess['loanFlag'],
            "hr_permission": packageAccess['hrPermission'],
            "expense_permission": packageAccess['expensePermission'],
            "plan_permission": packageAccess['planPermission'],
            "loan_permission": packageAccess['loanPermission'],
            "recruit_permission": packageAccess['recruitPermission'],

        }
    }

    let response = await ApiRequest(obj);

    if (response.flag === false) {
        return [];
    } else {
        let status = response.data.status;
        if (status == "NG") {
            return [];
        } else {
            let data = response.data.menus;
            let route = "";
            let to = "";

            if(data.length > 0){
                data = data.filter((menu) => {
                    if (menu.hasOwnProperty('_children')) {
                        return menu;
                    } else {
                        return menu;
    
                    }
                });
                let count = data.length;
                for (let i = 0; i < count; i++) {
                    if (data[i].name != "Dashboard" && data[i].name != "Logout") {
                        if (data[i].hasOwnProperty('_children')) {
                            data[i]._tag = 'CSidebarNavDropdown';
                            let child_count = data[i]['_children'].length;
                            for (let j = 0; j < child_count; j++) {
                                data[i]['_children'][j]._tag = 'CSidebarNavItem';
                                to = '/' + customer_name + '/recruit' + data[i]['_children'][j].to;
                                data[i]['_children'][j].to = to;
                            }
                        } else {
                            route = data[i].route;
                            data[i]._tag = 'CSidebarNavItem';
                        }
                    }
                }
                allData = [
                    {
                        "data": data,
                        "recruit-permission": recruitPermission,
                        "recruit-flag": recruitFlag
                    }
    
                ]
            
                return allData; 
            }
           
        }
    }

}

export default DynamicMenu
