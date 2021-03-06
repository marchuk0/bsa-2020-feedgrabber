export enum Permissions {
    managingQuestions = "Managing questions(CRUD) via question editor",
    managingQuestionnaires = "Managing questionnaires  via form editor",
    createQuestionnaireRequest = "Creating a questionnaire request",
    createPostsAndPolls = "Create posts and polls on company feed",
    createTeams = "Crate teams",
    manageTeams = "Manage teams",
    manageCompanySettings = "Manage company settings",
    signUpViaCorporateEmail = "Enable sign up via the corporate email",
    generateInviteLinks = "Generate invite links",
    blockUserAccount = "Block user account"
}

export interface IRole {
    endpoints: string[];
    static: string[];
    dynamic: any[];
}

const employee: IRole = {
    endpoints: [
        "/",
        "/auth",
        "/sign-up/:id",
        "/reset/:id",
        "/home",
        "/profile",
        "/profile/settings",
        "/profile/security",
        "/requests",
        "/help",
        "/assign",
        "/pending",
        "/company",
        "/people/:tab",
        "/people/teams/:id",
        "/report/:id",
        "/report/:id/:respondent/:username",
        "/response/:id",
        "/company/news/:id",
        "/response/:id/",
        "/response/:id/modify/:responseId"
    ],
    static: [],
    dynamic: []
};

const hr: IRole = {
    endpoints: [
        ...employee.endpoints,
        "/questionnaires",
        "/company/:id",
        "/questionnaires/:id",
        "/questionnaires/:id/preview",
        "/questionnaires/:id/new-request",
        "/questionnaires/:id/requests",
        "/questions",
        "/question/:id"
    ],
    static: [
        ...employee.static,
        Permissions.managingQuestions,
        Permissions.managingQuestionnaires,
        Permissions.createQuestionnaireRequest,
        Permissions.createPostsAndPolls,
        Permissions.createTeams,
        Permissions.manageTeams
    ],
    dynamic: []
};

const companyOwner: IRole = {
    endpoints: [
        ...hr.endpoints,
        "/people/employees",
        "/invitations",
        "companyOwnerEndpointAccess"
    ],
    static: [
        ...hr.static,
        Permissions.manageCompanySettings,
        Permissions.signUpViaCorporateEmail,
        Permissions.generateInviteLinks,
        Permissions.blockUserAccount
    ],
    dynamic: []
};

const rolesRules = {
    employee,
    hr,
    "company_owner": companyOwner
};

export default rolesRules;
