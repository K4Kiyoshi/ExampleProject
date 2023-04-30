/**
 * Make Common Authorization Function
 * @author Zin Min Myat
 * @create
 */

import React, { useState, useEffect } from "react";
import getPkce from "oauth-pkce";
import { FRONTEND_URL } from "./Constant";

export const MakeAuthorization = async () => {

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
    const state = stateGenerator(40);

    getPkce(50, (error, { verifier, challenge }) => {
        redirectFun(verifier, challenge);
    });

    let redirectFun = (verifier, challenge) => {
        localStorage.setItem(`${customer_name}_state`, state);
        localStorage.setItem(`${customer_name}_verifier`, verifier);
        localStorage.setItem(`${customer_name}_LANGUAGE`, lang);
        window.open(
            `${authorizeURL}?client_id=${CLIENT_ID}&language=${lang}&redirect_uri=${redirectURI}&response_type=code&scope=*&state=${state}&code_challenge=${challenge}&code_challenge_method=S256`,
            "_self"
        );
    }

}
