import {ICompanyDomain} from "../../models/companies/ICompanyDomain";
import {IAppState} from "../../models/IAppState";
import {chooseCompanyRoutine, dropCompanyRoutine, loadCompaniesRoutine} from "../../sagas/companies/routines";

export interface ICompanyState {
    list?: ICompanyDomain[];
    currentCompany?: ICompanyDomain;
    isLoading: boolean;
    error?: string;
}

const initialState: ICompanyState = {
    list: null,
    currentCompany: null,
    isLoading: false,
    error: null
};

const companyReducer = (state: IAppState['company'] = initialState, {type, payload}) => {
    switch (type) {
        case(loadCompaniesRoutine.TRIGGER):
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case(loadCompaniesRoutine.SUCCESS):
            return {
                ...state,
                isLoading: false,
                list: payload,
                error: null
            };
        case(loadCompaniesRoutine.FAILURE):
            return {
                ...state,
                isLoading: false,
                error: payload
            };
        case(chooseCompanyRoutine.TRIGGER):
            return {
                ...state,
                currentCompany: payload
            };
        case(dropCompanyRoutine.TRIGGER):
            return initialState;
        default:
            return state;
    }
};

export default companyReducer;