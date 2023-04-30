import React, { Component, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import "./scss/style.scss";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
let bamawlDomain = process.env.REACT_APP_BAMAWL_DOMAIN;
// Containers
const TheLayout = React.lazy(() => import("./containers/RecruitMainLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/error-page/Page404"));
const Page403 = React.lazy(() => import("./views/error-page/Page403"));
const InvalidURL = React.lazy(() => import("./views/error-page/InvalidURL"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const UserForm = React.lazy(() => import("./views/userform/UserFormIndex"));
const SignIn = React.lazy(() => import("./views/login/SingIn"));
const Auth = React.lazy(() => import("./views/login/Auth"));
const RecruitAuth = React.lazy(() => import("./views/login/AuthForm"));
const Logout = React.lazy(() => import("./views/logout/Logout"));
const UserLogin = React.lazy(() => import("./views/applicant-login/UserLoginIndex"));
const NoPermission = React.lazy(() => import("./views/error-page/NoPermission"));

const EmailValidation = React.lazy(() =>
  import("./views/applicant-login/EmailValidationIndex")
);

const App = () => {
  let customer_name = window.location.href.split("/")[3];
  let project_name = window.location.href.split("/")[4];
  const loginEvt = useSelector((state) => state.login);

  if (customer_name === "" || customer_name === null) {
    customer_name = "demo";
  }

  // let lastUrl = "";

  // if (window.location.href) {
  //   lastUrl = window.location.href.split("/").pop();
  // }

  useEffect(() => {
    window.addEventListener("storage", (event) => {
      if (
        localStorage.getItem(`${customer_name}_SIGN_OUT`) &&
        window.location.href.split("/").pop() !== "sign-in"
      ) {
        window.location.href = `/${customer_name}/sign-in`;
        localStorage.removeItem(`${customer_name}_SIGN_OUT`);
      }
    });
  }, []);

  useEffect(() => {
    if (loginEvt && window.location.href.split("/").pop() === "sign-in") {
      window.location.href = `/${customer_name}/recruit/Dashboard`;
    }
  }, [loginEvt]);

  // let baseUrl = process.env.REACT_APP_CUSTOMER_SECRET_KEY;

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path={`/${customer_name}/logout`}
            name="Logout"
            render={(props) => <Logout {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/erp/auth`}
            name="ERP Dashboard"
            render={(props) =>
              window.location.assign(
                `${bamawlDomain}/${customer_name}/erp/auth`
              )
            }
          />
          <Route
            exact
            path={`/${customer_name}/hr/auth`}
            name="HR Dashboard"
            render={(props) =>
              window.location.assign(`${bamawlDomain}/${customer_name}/hr/auth`)
            }
          />
          <Route
            exact
            path={`/${customer_name}/loan/auth`}
            name="Loan Dashboard"
            render={(props) =>
              window.location.assign(
                `${bamawlDomain}/${customer_name}/loan/auth`
              )
            }
          />
          <Route
            exact
            path={`/${customer_name}/expense/auth`}
            name="Expense Dashboard"
            render={(props) =>
              window.location.assign(
                `${bamawlDomain}/${customer_name}/expense/auth`
              )
            }
          />

          <Route
            exact
            path={`/${customer_name}/plan/auth`}
            name="Plan Calendar"
            render={(props) =>
              window.location.assign(
                `${bamawlDomain}/${customer_name}/plan/auth`
              )
            }
          />

          <Route
            exact
            path={`/${customer_name}/recruit/resume-management/job-applied-list-detail`}
            name="Resume Detail Form"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}`}
            name="Sign In"
            render={(props) => <SignIn {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/sign-in`}
            name="Sign In"
            render={(props) => <SignIn {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}`}
            name="Sign In"
            render={(props) => <SignIn {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/recruit/auth`}
            name="Auth"
            render={(props) => <RecruitAuth {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/auth`}
            name="Auth"
            render={(props) => <Auth {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/template/user-login/:id`}
            name="User Login Page"
            render={(props) => <UserLogin {...props} />}
          ></Route>
          <Route
            exact
            path={`/${customer_name}/template/email-verification`}
            name="Email Verification"
            render={(props) => <EmailValidation {...props} />}
          ></Route>
          <Route
            exact
            path={`/${customer_name}/template/user-form`}
            name="User-Form"
            render={(props) => <UserForm {...props} />}
          ></Route>
          <Route
            exact
            path={`/${customer_name}/recruit/no-permission`}
            name="No Permission"
            render={(props) => <NoPermission {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/${project_name}/403`}
            name="Page 403"
            render={(props) => <Page403 {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/${project_name}/404`}
            name="No Permission"
            render={(props) => <Page404 {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/${project_name}/500`}
            name="Page 500"
            render={(props) => <Page500 {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/recruit/Dashboard`}
            name="Dashboard"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/dashboard-no-permission`}
            name="Dashboard No Permission"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/hr/dashboard-no-permission`}
            name="Dashboard No Permission"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/expense/dashboard-no-permission`}
            name="Dashboard No Permission"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/loan/dashboard-no-permission`}
            name="Dashboard No Permission"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/plan/dashboard-no-permission`}
            name="Dashboard No Permission"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/job-and-position-management/job-categories-registration`}
            name="Job Categories Registration"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/job-and-position-management/position-registration`}
            name="Position Registration"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/job-and-position-management/job-and-position-registration`}
            name="Job & Position Registration"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/user-management/user-registration`}
            name="User Registration"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/user-management/user-list`}
            name="User List"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/template-management/template-create`}
            name="Create New CV"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/template-management/template-list`}
            name="Template List"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/recruit/resume-management/interview-page`}
            name="Interview Page"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/recruit/resume-management/approval-page`}
            name="Approval Page"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/resume-management/job-applied-list`}
            name="Applied job Position List"
            render={(props) => <TheLayout {...props} />}
          />

          <Route
            path={`/${customer_name}/recruit/applicant-management/applicant-user-list`}
            name="Applicant User List"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/applicant-management/applicant-user-registration`}
            name="Applicant User Registration"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/recruit/role-management/role-&-permission-register`}
            name="Role and Permission Register"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/recruit/role-management/role-register`}
            name="Role Register"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/recruit/role-management/role-&-permission-list`}
            name="Role and Permission List"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/recruit/role-management/role-&-permission-list-detail`}
            name="Role and Permission Detail"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            exact
            path={`/${customer_name}/recruit/role-management/employee-role-registration`}
            name="Employee Role Registration"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/resume-management/skill-test-page`}
            name="SkillTest Page"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/not-register`}
            name="Not Register"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/hr/not-register`}
            name="Not Register"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/plan/not-register`}
            name="Not Register"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/expense/not-register`}
            name="Not Register"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path={`/${customer_name}/recruit/loan/not-register`}
            name="Not Register"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path="/"
            name="Home"
            render={() => {
              window.location.href = `/${customer_name}/recruit/404`;
            }}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
