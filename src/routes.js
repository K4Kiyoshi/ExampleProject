import React from "react";

//use customize customer name
let customer_name = window.location.href.split("/")[3];

const Dashboard = React.lazy(() => import("./views/dashboard/DashboardIndex"));
const DashboardNoPermission = React.lazy(() => import("./views/dashboard/DashboardNoPermission"));

const NotRegister =React.lazy(() => import("./views/dashboard/NotRegister"));

const SignIn = React.lazy(()=> import("./views/login/SingIn"))
const TemplateListIndex = React.lazy(() =>
  import("./views/template-management/template-list/TemplateListIndex")
);
const ResumeDetailForm = React.lazy(() =>
  import("./views/resume-management/job-applicant-list/ResumeDetailForm")
);
const TemplateRegisterIndex = React.lazy(() =>
  import("./views/template-management/template-create/TemplateRegisterIndex")
);
const RoleRegisterIndex = React.lazy(() =>
import("./views/user-role-management/role-register/RoleRegisterIndex")
);
const RolePermissionRegisterIndex = React.lazy(() =>
import("./views/user-role-management/role-and-permission-register/RolePermissionRegIndex")
);
const JobAndPositionRegistrationIndex = React.lazy(() =>
import("./views/job-and-position-management/job-and-position-registration/JobAndPositionRegistrationIndex")
);

const JobCategoriesRegistrationIndex = React.lazy(() =>
import("./views/job-and-position-management/job-categories-registration/JobCategoriesRegistrationIndex")
);
const PositionRegistrationIndex = React.lazy(() =>
import("./views/job-and-position-management/position-registration/PositionRegistrationIndex")
);

const AppliedJobPositionListIndex = React.lazy(() =>
  import("./views/resume-management/job-applicant-list/AppliedJobPositionListIndex")
);

const InterviewPage = React.lazy(() =>
  import("./views/resume-management/job-applicant-list/InterviewPage")
);
const ApprovalPage = React.lazy(() =>
  import("./views/resume-management/job-applicant-list/ApprovalPage")
);
const SkillTestPage = React.lazy(() =>
  import("./views/resume-management/job-applicant-list/SkillTestPage")
);
const RoleAndPermissionRegisterListIndex = React.lazy(() =>
  import("./views/user-role-management/role-and-permission-list/RoleAndPermissionListIndex.js")
)
const RolePermissionDetailIndex = React.lazy(()=>
  import("./views/user-role-management/role-and-permission-detail/RolePermissionDetailIndex")
)
const EmpRoleRegistrationIndex = React.lazy(()=>
  import("./views/user-role-management/emp-role-registration/EmpRoleRegistrationIndex")
)
const UserLogin = React.lazy(()=> import("./views/applicant-login/UserLoginIndex"))
const EmailValidation = React.lazy(() =>import("./views/applicant-login/EmailValidationIndex"));
const UserForm = React.lazy(() => import("./views/userform/UserFormIndex"));

const Logout = React.lazy(() => import("./views/logout/Logout"))

//
const routes = [

  { path: "/", exact: true, name: "Home" },
  { path: `/${customer_name}/recruit/Dashboard`, name: "Dashboard", component: Dashboard, exact: true },
  { path: `/${customer_name}/recruit/dashboard-no-permission`, name: "Dashboard No Permission", component: DashboardNoPermission, exact: true },
  { path: `/${customer_name}/hr/dashboard-no-permission`, name: "No Permission In HR", component: DashboardNoPermission, exact: true },
  { path: `/${customer_name}/expense/dashboard-no-permission`, name: "No Permission In Expense", component: DashboardNoPermission, exact: true },
  { path: `/${customer_name}/plan/dashboard-no-permission`, name: "No Permission In Plan", component: DashboardNoPermission, exact: true },
  { path: `/${customer_name}/loan/dashboard-no-permission`, name: "No Permission In Loan", component: DashboardNoPermission, exact: true },
  { path: `/${customer_name}/recruit/not-register`, name: "Not Register In Recruitment System", component: NotRegister, exact: true },
  {
    path:  `/${customer_name}/recruit/job-and-position-management`,
    name: "Job And Position Management",
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/job-and-position-management/job-and-position-registration`,
    name: "Job And Position Registration",
    component: JobAndPositionRegistrationIndex,
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/job-and-position-management/job-categories-registration`,
    name: "Job Categories Registration",
    component: JobCategoriesRegistrationIndex,
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/job-and-position-management/position-registration`,
    name: "Position Registration",
    component: PositionRegistrationIndex,
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/user-management`,
    name: "User Management",
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/template-management`,
    name: "Template Management",
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/template-management/template-create`,
    name: "Template Creation",
    component: TemplateRegisterIndex,
    exact: true,
  },
  {
    path:`/${customer_name}/recruit/template-management/template-list`,
    name: "Template List",
    component: TemplateListIndex,
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/resume-management`,
    name: "Resume Management",
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/resume-management/job-applied-list`,
    name: "Applied Job Position List",
    component: AppliedJobPositionListIndex,
    exact: true,
  },
  {
    path: `/${customer_name}/recruit/resume-management/job-applied-list-detail`,
    name: "Resume Detail Form",
    component: ResumeDetailForm,
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/resume-management/interview-page`,
    name: "Interview Page",
    component: InterviewPage,
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/resume-management/approval-page`,
    name: "Approval Page",
    component: ApprovalPage,
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/resume-management/skill-test-page`,
    name: "SkillTest Page",
    component: SkillTestPage,
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/role-management`,
    name: "User Role Management",
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/role-management/role-register`,
    name: "Role Register",
    component: RoleRegisterIndex,
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/role-management/role-&-permission-register`,
    name: "Role and Permission Register",
    component: RolePermissionRegisterIndex,
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/role-management/role-&-permission-list`,
    name: "Role and Permission List",
    component: RoleAndPermissionRegisterListIndex,
    exact: true,
  },
  {
    path:  `/${customer_name}/recruit/role-management/role-&-permission-list-detail`,
    name: "Role and Permission Detail",
    component: RolePermissionDetailIndex,
    exact: true,
  },

  {
    path:  `/${customer_name}/recruit/role-management/employee-role-registration`,
    name: "Employee Role Registration",
    component: EmpRoleRegistrationIndex,
    exact: true,
  },
  {
    path: `/${customer_name}/logout`,
    name: "Logout",
    component: Logout,
    exact: true,
  },



];

export default routes;


