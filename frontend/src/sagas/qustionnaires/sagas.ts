import {all, call, put, takeEvery, select} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {
    addQuestionnaireRoutine,
    deleteQuestionnaireRoutine,
    hideModalQuestionnaireRoutine,
    loadQuestionnairesRoutine,
    updateQuestionnaireRoutine
} from './routines';
import apiClient from '../../helpers/apiClient';
import {IQuestionnaire} from "../../models/forms/Questionnaires/types";

function* loadQuestionnairesList(action: any) {
  try {
    const store = yield select();
    const {page, size} = store.questionnaires.list.pagination;
      const res = yield call(
      apiClient.get,
      `api/questionnaires?page=${page}&size=${size}`
    );
    const items = res.data.data;

    yield put(loadQuestionnairesRoutine.success(items));
  } catch (error) {
    yield put(loadQuestionnairesRoutine.failure(error));
    toastr.error("Unable to fetch data");
  }
}
function* addQuestionnaire(action: any) {
  try {
    const questionnaire: IQuestionnaire = action.payload;
    yield call(apiClient.post, `api/questionnaires`, questionnaire);

    yield put(hideModalQuestionnaireRoutine.trigger());
    yield put(loadQuestionnairesRoutine.trigger());
    toastr.success("Added questionnaire");
  } catch (errorResponse) {
    yield put(addQuestionnaireRoutine.failure(errorResponse.response?.data?.error || 'No response'));
  }
}

function* updateQuestionnaire(action: any) {
  try {
    const questionnaire: IQuestionnaire = action.payload;
    yield call(apiClient.put, `api/questionnaires`, questionnaire);

    yield put(hideModalQuestionnaireRoutine.trigger());
    yield put(loadQuestionnairesRoutine.trigger());
    toastr.success("Updated questionnaire");
  } catch (errorResponse) {
    yield put(updateQuestionnaireRoutine.failure(errorResponse.response?.data?.error || 'No response'));
  }
}

function* deleteQuestionnaire(action: any) {
  try {
    const id: string = action.payload;
    yield call(apiClient.delete, `api/questionnaires/${id}`);

    yield put(deleteQuestionnaireRoutine.success());
    toastr.success("Deleted questionnaire");
    yield put(loadQuestionnairesRoutine.trigger());
  } catch (errorResponse) {
    yield put(deleteQuestionnaireRoutine.failure());
    toastr.error(errorResponse.response?.data?.error || 'No response');
    yield put(loadQuestionnairesRoutine.trigger());
  }
}

export default function* questionnairesSagas() {
  yield all([
    yield takeEvery(loadQuestionnairesRoutine.TRIGGER, loadQuestionnairesList),
    yield takeEvery(addQuestionnaireRoutine.TRIGGER, addQuestionnaire),
    yield takeEvery(deleteQuestionnaireRoutine.TRIGGER, deleteQuestionnaire),
    yield takeEvery(updateQuestionnaireRoutine.TRIGGER, updateQuestionnaire)
  ]);
}