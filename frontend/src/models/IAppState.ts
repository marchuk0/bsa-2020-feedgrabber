import {IUserState} from "./user/types";
import {IUsersState} from "./users/types";
import {IQuestionnairesState} from "./forms/Questionnaires/types";
import {IAdditionalState} from "../reducers/app/reducer";
import {ITeamsState} from "../reducers/teams/reducer";
import {IQuestionsState} from "../reducers/questions/reducer";
import {IInvitationState} from "../reducers/invitation/reducer";
import {IInvitationSignUpState} from "../reducers/invitationSignUp/reducer";
import {ICompanyState} from '../reducers/companies/reducer';
import {ICompanyFeedState} from '../reducers/companyFeed/reducer';
import {IQuestionnaireReportsState} from "../reducers/questionnaireReport/reducer";
import {INotificationsState} from "../reducers/notifications";
import {IQuestionnaireResponseState} from "./forms/Response/types";
import {IRoleState} from "../reducers/role/reducer";
import {ISearchResultState} from "./search/Search";
import {IDashboardState} from "../reducers/dashboard/reducer";
import {IFormEditorState} from "./forms/IFormEditorState";
import {ICategoriesState} from "../reducers/categories/reducer";


export interface IAppState {
    toastr: any;
    user: IUserState;
    invitation: IInvitationState;
    invitationSignUp: IInvitationSignUpState;
    users: IUsersState;
    role: IRoleState;
    questionnaires: IQuestionnairesState;
    formEditor: IFormEditorState;
    questionnaireReports: IQuestionnaireReportsState;
    questionnaireResponse: IQuestionnaireResponseState;
    questions: IQuestionsState;
    categories: ICategoriesState;
    app: IAdditionalState;
    teams: ITeamsState;
    company: ICompanyState;
    companyFeed: ICompanyFeedState;
    isLoading: boolean;
    notifications: INotificationsState;
    search: ISearchResultState;
    dashboard: IDashboardState;
}
