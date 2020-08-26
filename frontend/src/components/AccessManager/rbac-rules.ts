export enum Credentials {
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
        "/layout",
        "/auth",
        "/sign-up/:id",
        "/reset/:id",
        "/",
        "/profile",
        "/profile/settings",
        "/requests",
        "/help",
        "/editor",
        "/assign",
        "/pending",
        "/company",
        "/teams",
        "/teams/:id",
        "/report/:id",
        "/report/:id/:respondent/:username",
        "/response/:id"
    ],
    static: [],
    dynamic: []
};

const hr: IRole = {
    endpoints: [
        ...employee.endpoints,
        "/questionnaires",
        "/questionnaires/:id",
        "/questionnaires/:id/preview",
        "/questionnaires/:id/new-request",
        "/questionnaires/:id/requests",
        "/questions",
        "/question/:id"
    ],
    static: [
        ...employee.static,
        Credentials.managingQuestions,
        Credentials.managingQuestionnaires,
        Credentials.createQuestionnaireRequest,
        Credentials.createPostsAndPolls,
        Credentials.createTeams,
        Credentials.manageTeams
    ],
    dynamic: []
};

const companyOwner: IRole = {
    endpoints: [
        ...hr.endpoints,
        "/employees",
        "/invitations",
        "companyOwnerEndpointAccess"
    ],
    static: [
        ...hr.static,
        Credentials.manageCompanySettings,
        Credentials.signUpViaCorporateEmail,
        Credentials.generateInviteLinks,
        Credentials.blockUserAccount
    ],
    dynamic: []
};

const rolesRules = {
    employee,
    hr,
    "company_owner": companyOwner
};

const getRolesRules = () => rolesRules;
export default getRolesRules;
