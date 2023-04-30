import ApiPath from '../views/common/ApiPath';
import { ApiRequest } from '../views/common/ApiRequest';

const PackageAccessCheck = async () => {
    let customer_name = window.location.href.split("/")[3];
    if (customer_name === "" || customer_name === null) {
        customer_name = "demo";
    }
    
    let hrFlag = false, expenseFlag = false, loanFlag = false, planFlag = false, recruitFlag = false;
    let hrPermission = false, expensePermission = false, loanPermission = false, planPermission = false, recruitPermission = false;
    let result;
    let login_id = localStorage.getItem(`${customer_name}_LOGIN_ID`);
    let lang = localStorage.getItem(`${customer_name}_LANGUAGE`), token = localStorage.getItem(`${customer_name}_TOKEN`), role_id = localStorage.getItem(`${customer_name}_ROLE_ID`), company_id = localStorage.getItem(`${customer_name}_COMPANY_ID`);


    let loginData = {
        login_id: login_id,
        employee_id: login_id,
        company_id: company_id,
        role_id: role_id,
        language: lang,
        access_token: token,
    };

    // Package Menu
    let obj1 = {
        method: "post",
        url: ApiPath.ERPChoosePackage,
        package_name: "erp",
        params: {
            ...loginData,
            device_flag: "1",
        },
    };
    let response1 = await ApiRequest(obj1);

    if (response1.flag !== false) {
        let all_package = response1.data.access_package;
        let pkg_count = all_package.length;
        let zero = 0;
        let flg = true;

        if (pkg_count > zero) {
            let pkg_name_array = [];
            let pkg_link_array = [];
            let short_name_array = [];

            for (let i = 0; i < pkg_count; i++) {
                let short_name = all_package[i].short_name;
                let pkg_name = all_package[i].package_name;
                let pkg_link = all_package[i].package_link;

                pkg_name_array +=
                    pkg_name_array.length > 0 ? "," + pkg_name : pkg_name;
                pkg_link_array +=
                    pkg_link_array.length > 0 ? "," + pkg_link : pkg_link;
                short_name_array +=
                    short_name_array.length > 0 ? "," + short_name : short_name;


                let tmpData = {};
                let access = "";

                // add access package short_name
                let short_array = ["hr", "expense", "plan", "loan", "recruit"];
                let short_flag = short_array.includes(short_name);


                if (short_flag) {
                    let url = "";
                    let p_name = "";
                    if (short_name === "expense" ) {
                        p_name = "hr"; expenseFlag = true;
                    } else if (short_name === "hr") {
                        p_name = "hr"; hrFlag = true;
                    } else if (short_name == "loan") {
                        p_name = "hr"; loanFlag = true;
                    } else if (short_name === "plan") {
                        p_name = "plan"; planFlag = true;
                    } else if (short_name === "recruit") {
                        p_name = "recruit"; recruitFlag = true;
                    }
                    url =
                        (short_name === "expense" || short_name === "hr" || short_name === "loan")
                            ? ApiPath.HRRegisterCheck
                            : (short_name === "plan") ? ApiPath.PlanRegisterCheck
                                : ApiPath.RecruitRegisterCheck;

                    let obj2 = {
                        package_name: p_name,
                        method: "get",
                        url: url,
                        params: {
                            login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
                            company_id: localStorage.getItem(`${customer_name}_COMPANY_ID`),
                            language: localStorage.getItem(`${customer_name}_LANGUAGE`),
                        },
                    };
                    let response2 = await ApiRequest(obj2);


                    access =
                        (short_name === "expense" || short_name === "hr" || short_name === "loan")
                            ? response2.data.hr_access
                            : (short_name === "plan")
                                ? response2.data.plan_access
                                : response2.data.recruit_access;
                }

                if (access == true) {
                    (short_name === "expense")
                        ? expensePermission = true
                        : (short_name === "hr")
                            ? hrPermission = true
                            : (short_name === "loan")
                                ? loanPermission = true
                                : (short_name === "plan")
                                    ? planPermission = true
                                    : recruitPermission = true
                }


            }

        }

        result = {
            expenseFlag: expenseFlag,
            hrFlag: hrFlag,
            loanFlag: loanFlag,
            planFlag: planFlag,
            recruitFlag: recruitFlag,
            expensePermission: expensePermission,
            hrPermission: hrPermission,
            loanPermission: loanPermission,
            planPermission: planPermission,
            recruitPermission: recruitPermission

        }
    }else{
        result = {
            expenseFlag: expenseFlag,
            hrFlag: hrFlag,
            loanFlag: loanFlag,
            planFlag: planFlag,
            recruitFlag: recruitFlag,
            expensePermission: expensePermission,
            hrPermission: hrPermission,
            loanPermission: loanPermission,
            planPermission: planPermission,
            recruitPermission: recruitPermission

        }
    }
    return result;

}

export default PackageAccessCheck
