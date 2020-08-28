import { IAppState } from "models/IAppState";
import { setCurrentSectionRoutine, 
    createSectionRoutine, 
    loadSectionsByQuestionnaireRoutine, 
    setCurrentSectionIdRoutine,
    updateSectionsRoutine,
    deleteQuestionFromSectionRoutine} from "sagas/sections/routines";
import { loadQuestionsBySectionRoutine } from "sagas/questions/routines";
import { ISection } from "models/forms/Sections/types";

export interface ISectionsState {
    list?: ISection[];
    current?: ISection; 
    isLoading?: boolean;
}

const initialValues = {
    list: [] as ISection[],
    current: {title: ''} as ISection,
    isLoading: false
};

const sectionsReducer = (state: IAppState["sections"] = initialValues, {type, payload}) => {
    switch(type) {
        case setCurrentSectionRoutine.TRIGGER:
        case createSectionRoutine.SUCCESS:
        case deleteQuestionFromSectionRoutine.SUCCESS:
            return {
                ...state,
                current: payload
            };
        case loadSectionsByQuestionnaireRoutine.TRIGGER:
        case loadQuestionsBySectionRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case loadSectionsByQuestionnaireRoutine.SUCCESS:
        case updateSectionsRoutine.SUCCESS:
            return {
                ...state,
                list: payload,
                current: payload[0],
                isLoading: false
            };
        case loadSectionsByQuestionnaireRoutine.FAILURE:
        case loadQuestionsBySectionRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case loadQuestionsBySectionRoutine.SUCCESS:
            return {
                ...state,
                isLoading: false,
                current: {
                    ...state.current,
                    questions: payload
                }
            };
        case setCurrentSectionIdRoutine.SUCCESS:
            return {
                ...state,
                current: {
                    ...state.current,
                    id: payload
                }
            };
        default:
            return state;
    }
};

export default sectionsReducer;