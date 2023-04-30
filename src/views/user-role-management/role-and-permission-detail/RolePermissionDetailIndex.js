/**
 * Role and Permisiion Detail Index
 * @author yaminzaw
 */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../common/Loading";
import SuccessError from "../../common/SuccessError";
import Detail from "./Detail";
import { ApiRequest } from "../../common/ApiRequest";
import ApiPath from "../../common/ApiPath";
import PermissionCheck from "../../common/permission-check/PermissionCheck";

const RolePermissionDetailIndex = () => {
    let customer_name = window.location.href.split("/")[3];
    const history = useHistory();   // link
    const [error, setError] = useState([]);     // For Error Message
    const [success, setSuccess] = useState([]);     // For Success Message
    const [loading, setLoading] = useState(false);  // For Loading
    const [mainTable, setMainTable] = useState([]);     // For Main Table 
    const [header, setHeader] = useState([]);     // table header
    const [detailID, setDetailID] = useState('');     // detail id
    const [returnData, setReturnData] = useState(null);   // data from list
    const [mainTmpState, setMainTmpState] = useState([])

    useEffect(() => {
        (async () => {
            setLoading(true);
            await PermissionCheck();
            setLoading(false);
            let detail_data = JSON.parse(localStorage.getItem(`${customer_name}_MENU_SETTING_DETAIL_DATA`));
            if (detail_data) {
                setReturnData(detail_data);
                setDetailID(detail_data);
                await formLoad(detail_data);
                localStorage.removeItem(`${customer_name}_MENU_SETTING_DETAIL_DATA`);
            } else {
                history.push(`/${customer_name}/recruit/role-management/role-&-permission-list`);
            }
        })();
    }, []);

    const formLoad = async (id) => {
        setError([]); setSuccess([]);
        setLoading(true);
        let obj = {
            package_name: "recruit",
            method: 'get',
            url: ApiPath.RolePermissionDetail,
            params: {
                login_id: localStorage.getItem(`${customer_name}_LOGIN_ID`),
                detail_role_id: id
            }
        }
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } else {
            setMainTable(response.data.data);
            setHeader(response.data.data[0].levels);
        }
    }

    // go back function
    const goBackList = () => {
        localStorage.setItem(`${customer_name}_ROLE_MENU_BACK_DATA`, JSON.stringify(returnData));
        history.push(`/${customer_name}/recruit/role-management/role-&-permission-list`);
    }

    return (
        <>
            <Loading start={loading} />
            <SuccessError success={success} error={error} />
            <Detail mainTable={mainTable} header={header} goBackList={goBackList} />
        </>
    )

}

export default RolePermissionDetailIndex;