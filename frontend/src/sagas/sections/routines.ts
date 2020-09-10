import {createRoutine} from "redux-saga-routines";
import {IQuestion} from "../../models/forms/Questions/IQuesion";

export const setCurrentSectionRoutine = createRoutine("SECTION:SET_CURRENT");
export const loadSectionsByQuestionnaireRoutine = createRoutine("SECTION:LOAD_BY_QUESTIONNAIRE");
export const createSectionRoutine = createRoutine("SECTION:CREATE");
export const deleteSectionRoutine = createRoutine("SECTION:DELETE");
export const addQuestionToSectionRoutine = createRoutine("SECTION:ADD_QUESTION");
export const addExistingQuestionToSectionRoutine = createRoutine("SECTION:ADD_EXISTING_QUESTION");
export const updateQuestionInSectionRoutine = createRoutine('QUESTION:UPDATE_QUESTION_IN_SECTION');
export const setCurrentQuestionInSection = createRoutine('QUESTION:SET_CURRENT_ONE');
export const deleteQuestionFromSectionRoutine = createRoutine("SECTION:DELETE_QUESTION");
export const updateSectionRoutine = createRoutine("SECTION:UPDATE");
export const updateQuestionsOrderRoutine = createRoutine("SECTION:UPDATE_QUESTION_ORDER");
export const loadSavedSectionsByQuestionnaireRoutine = createRoutine("SECTION:LOAD_SAVED");
export const moveQuestionInSectionRoutine = createRoutine("SECTION:MOVE_QUESTION");
export const updateSections = createRoutine("SECTION:REPLACE_STATE");
export const setNoSectionsRoutine = createRoutine("SECTION:SET_BLANK");

type sectionQuestionAdd = {
    sectionId: string;
    questionId: string;
    questions: IQuestion[];
}
