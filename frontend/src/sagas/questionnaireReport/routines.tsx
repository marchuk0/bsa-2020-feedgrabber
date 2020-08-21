import { createRoutine } from 'redux-saga-routines';

export const clearQuestionnaireReportRoutine = createRoutine('QUESTIONNAIRE_REPORT:CLEAR');
export const loadQuestionnaireReportRoutine = createRoutine('QUESTIONNAIRE_REPORT:LOAD');
export const loadRespondentReportsRoutine = createRoutine('RESPONDENT_REPORTS:LOAD');
