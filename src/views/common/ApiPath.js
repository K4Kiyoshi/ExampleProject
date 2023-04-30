let customer_name = window.location.href.split("/")[3];
if(customer_name === "" || customer_name === null) {
  customer_name = "demo";
}
export default {
    /*Common Temp*/
    companyID: localStorage.getItem(`${customer_name}_COMPANY_ID`),
    createdEmp: localStorage.getItem(`${customer_name}_LOGIN_ID`),
    updatedEmp: localStorage.getItem(`${customer_name}_LOGIN_ID`),
    loginEmp: localStorage.getItem(`${customer_name}_LOGIN_ID`),
    lang: localStorage.getItem(`${customer_name}_i18nextLng`),
    deviceFlag: 1,

    /* Yuwa */

    //Login Form
    AdminLoginIndexSignin: `api/user/login`,
    EmailValidationResend: `api/resume/applicant/login/`,
    EmailValidationSubmit: `api/resume/applicant/check-otp/`,
    ForgetPasswordIndexsubmitOk: `api/password-reset`,
    UserLoginIndexUserSignInClick: `api/resume/applicant/login/`,

    //resume-management
    AppliedJobPositionListIndexGetState: `api/job-applicant-lists/states`,
    AppliedJobPositionListIndexGetResume: `api/templates/get-resume-title`,
    AppliedJobPositionListIndexGetPosition: `api/job_category_positions/select`,
    AppliedJobPositionListIndexGetStatus: `api/job-applicant-lists/state-status`,
    AppliedJobPositionListIndexAllJobFormLoad:  `api/templates/get-category`,
    AppliedJobPositionListIndexGetFromData:  `api/templates/template-heading`,
    AppliedJobPositionListIndexSearch:  `api/job-applicant-lists/search?page=`,
    AppliedJobPositionListIndexPassRejectCancel:  `api/job-applicant-lists/pass-reject-cancel`,
    AppliedJobPositionListIndexDeleteOK:  `api/job-applicant-lists/delete`,
    AppliedJobPositionListIndexDownloadClick:  `api/job-applicant-lists/pdf-download`,
    AppliedJobPositionListIndexFinalHireClick:  `api/job-applicant-lists/accept`,
    AppliedJobPositionListIndexFinalOfferClick:  `api/job-applicant-lists/offer-link`,

    //Dashboard
    DashboardGetData: `api/dashboard`,

    //DyanamicMenu
    DyanamicMenuGetData: `api/get-left-menu-list`,

    //ApprovalPage
    ApprovalPageUseEffect: `api/get/login-name`,
    ApprovalPageSelectAutocomplete: `api/get/complete-name`,
    ApprovalPageFinalApprovalCLick: `api/job-applicant-lists/approval`,
    ApprovalSearch : `api/search/login-user`,

    //InterviewPage
    InterviewPageUseEffect: `api/get/login-name`,
    InterviewPageSelectAutocomplete: `api/get/complete-name`,
    InterviewPageFinalInterviewClick: `api/job-applicant-lists/interview`,
    InterviewPageSearch: `api/search/login-user`,

    //ResumeDetailForm
    ResumeDetailFormGetAllData: `api/applicants/view`,

    //SkillTestPage

    SkillTestPageSelectAutocomplete : `api/get/complete-name`,
    SkillTestPageUseEffect: `api/get/login-name`,
    SkillTestPageFinalSkillTestClick: `api/job-applicant-lists/coding-test`,
    SkillTestPageSearch: `api/search/login-user`,

    //RoleAndPermissionList

    RoleAndPermissionListRoleFormLoad:  `api/role-registration/search?page=`,
    RoleAndPermissionListDelete: `api/permissions/`,
    /* Yuwa */

    /* Yamin Start */

    //Job Category Registration
    JobCategoryList: `api/job_category/list`,
    JobCategoryRegister: `api/job_category/register`,
    JobCategorySearch: `api/job_category/search`,
    JobCategoryEdit: `api/job_category/edit/`,
    JobCategoryUpdate: `api/job_category/update/`,
    JobCategoryDelete: `api/job_category/delete/`,

    //Position Registration
    PositionList: `api/position/list`,
    PositionRegister: `api/position/register`,
    PositionSearch: `api/position/search`,
    PositionEdit: `api/position/edit/`,
    PositionUpdate: `api/position/update/`,
    PositionDelete: `api/position/delete/`,

    //Job and Position Registration
    JobCategoryAll: `api/job_category/all`,
    PositionAll: `api/position/all`,
    JobAndPositionAll: `api/job_category_positions/all`,
    JobAndPositionSave: `api/job_category_positions/save`,
    JobAndPositionDelete: `api/job_category_positions/delete`,
    JobAndPositionEdit: `api/job_category_positions/edit`,
    JobAndPositionUpdate: `api/job_category_positions/update`,

    //Template Management
    //Template Create
    TemplateCrateEssentialFields: `api/templates/essential-field`,
    TemplateCreateSave: `api/templates/save`,
    TemplateCreateUpdate: `api/templates/update`,
    TemplateCreateType: `api/templates/types`,

    //Template List
    TemplateListSearch: `api/templates/search`,
    TemplateListJobOpen: `api/templates/job-open/`,
    TemplateListCopy: `api/templates/copy/`,
    TemplateListList: `api/templates/list`,
    TemplateListDelete: `api/templates/delete`,
    TemplateListDetail: `api/templates/detail/`,
    TemplateListActiveInactive: `api/templates/active-inactive`,
    TemplateListEdit: `api/templates/edit/`,

    //User Role Management
    //Role and Permission Detail
    RolePermissionDetail: `api/role-permission/detail`,

    //Role and Permission Register
    RolePermission: `api/permissions`,
    RolePermissionEdit: `api/permissions/edit`,

    //Role Registration
    RoleRegistrationList: `api/role-registration/list`,
    RoleRegistrationSave: `api/role-registration/save`,
    RoleRegistrationEdit: `api/role-registration/edit`,
    RoelRegistrationUpdate: `api/role-registration/update`,
    RoleRegistrationDelete: `api/role-registration/delete`,

    //User Form
    UserFormFormLoad: `api/resume/applicant/form-load/`,
    UserFormSave: `api/applicants/save`,

    //Permission Check
    PermissionCheckFormPermission: `api/form-permission`,

    //Specific Permission
    SpecificPermission: `api/specific-permission`,

    // for Recruit Permission
    RecruitRegisterCheck: `api/recruit-permission`,
    HRRegisterCheck: `api/hr-permission`,
    PlanRegisterCheck: `api/plan-permission`,

    // for choose package
    ERPChoosePackage: `api/choose_emp_package`,

    // for name autocomplete search
    ERPNameAutocompleteSearch: `api/employee/name-autocomplete-search`,
    ERPNameAutocompleteSelect: `api/employee/autocomplete-result`,
    ERPNameFinalAutoCompleteSearch: `api/employee/search`,
    ERPPosition:`api/position/get-all-position`,
    /* Yamin End */

    /** PHYOE WAI AUNG START */
    ERPDepartment: `api/department/get-all-department`,
    ERPDeptPost: `api/get_dept_pos`,
    ERPtest: `api/emp-register`,
    ERPIdAutoComplete: `api/employee/id-autocomplete-search`,
    ERPCodeAutoComplete: `api/employee/code-autocomplete-search`,
    ERPAutoCompleteResult: `api/employee/autocomplete-result`,
    EmpRoleSearch: `api/employee-role-registration/list`,
    EmpRoleSave: `api/employee-role-registration/save`,
    EmpRoleOverwrite: `api/employee-role-registration/save-overwrite`,
    EmpRoleDelete: `api/employee-role-registration/delete`,
    getAllRole: `api/employee-role-registration/get-all-role`,
    /** PHYOE WAI AUNG END */

}
