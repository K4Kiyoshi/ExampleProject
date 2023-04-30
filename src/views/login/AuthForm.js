import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FRONTEND_URL } from "../common/Constant";
import { ApiRequest } from "../common/ApiRequest";
import ApiPath from "../common/ApiPath";
import getPkce from "oauth-pkce";
// import PackageAccessCheck from '../../containers/PackageAccessCheck';
// import ApiPath from "../brycen-common/api-path/ApiPath";

const AuthForm = () => {
    //use customize customer name
    let customer_name = window.location.href.split("/")[3];
    if (customer_name === "" || customer_name === null) {
        customer_name = "demo";
    }
    // const lang = localStorage.getItem(`${customer_name}_LANGUAGE`);
    const lang = "en";

    const AUTH_SERVER_URL = process.env.REACT_APP_API_ERP_URL;
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    // sample -> http://project-erp.test/web/cliEntA/oauth/authorize?
    const authorizeURL = `${AUTH_SERVER_URL}/web/${customer_name}/oauth/authorize`;

    // sample -> http://localhost:3000/cliEntA/auth
    const redirectURI = `${FRONTEND_URL}/${customer_name}/auth`;

    function stateGenerator(num) {
        return [...Array(num)].map(() => Math.random().toString(36)[2]).join("");
    }
    
    useEffect(() => {
        let state = stateGenerator(40);
        getPkce(50, (error, { verifier, challenge }) => {
            redirectFun(verifier, challenge,state);
        });
    }, []);

    let redirectFun = (verifier, challenge,state) => {
        localStorage.setItem(`${customer_name}_state`, state);
        localStorage.setItem(`${customer_name}_verifier`, verifier);
        localStorage.setItem(`${customer_name}_LANGUAGE`, lang);
        window.open(
            `${authorizeURL}?client_id=${CLIENT_ID}&language=${lang}&redirect_uri=${redirectURI}&response_type=code&scope=*&state=${state}&code_challenge=${challenge}&code_challenge_method=S256`,
            "_self"
        );
    }


    return <></>;
};

export default AuthForm;
