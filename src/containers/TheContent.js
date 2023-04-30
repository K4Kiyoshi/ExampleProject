import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

// routes config
import { router } from "../routes/index";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {

  let customer_name = window.location.href.split("/")[3];
  const readFile = () => {
    try {
      return require("../routes/customize.json");
    } catch (err) {
      return null;
    }
  };
  let fileExit = readFile();
  if (customer_name === "" || customer_name === null) {
    customer_name = "demo";
  }
  let routes = {};
  if (customer_name === "demo") {
    routes = router.routes;
  } else {
    if (fileExit != null) {
      if (fileExit.hasOwnProperty(`${customer_name}`) == true) {
        routes =
          router[
          `routes_${fileExit[`${customer_name}`]["abbreviation_name"]}`
          ];
      } else {
        routes = router.routes;
      }
    } else {
      routes = router.routes;
    }
  }


  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
              );
            })}

            <Redirect from="/" to={`/${customer_name}/sign-in`} />

          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
