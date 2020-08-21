import {all, put, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {loadQuestionnaireReportRoutine} from "./routines";
import {IQuestionnaireReport} from "../../models/report/IReport";
import {QuestionType} from "../../models/forms/Questions/IQuesion";

const mockReport: IQuestionnaireReport = {
  questionnaireTitle: "Awesome Questionnaire",
  questions: [
    {
      id: "00000",
      title: "Multichoice question",
      type: QuestionType.multichoice,
      answers: 18,
      data: {
        options: [
          {title: "First Option", amount: 8},
          {title: "Second Option", amount: 16},
          {title: "Third Option", amount: 3}
        ]
      }
    },
    {
      id: "11111",
      title: "Radio question",
      type: QuestionType.radio,
      answers: 24,
      data: {
        options: [{title: "First Option", amount: 8}, {title: "Other Option", amount: 16}]
      }
    },
    {
      id: "33333",
      title: "Scale question",
      type: QuestionType.scale,
      answers: 26,
      data: {
        options: [
          {title: "1", amount: 3},
          {title: "2", amount: 2},
          {title: "3", amount: 6},
          {title: "4", amount: 5},
          {title: "5", amount: 10}
        ]
      }
    },
    {
      id: "22222",
      title: "Free Text question",
      type: QuestionType.freeText,
      answers: 3,
      data: {
        values: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
          "labore et dolore magna aliqua. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque.\n" +
          "Fames ac turpis egestas sed tempus urna. Arcu cursus euismod quis viverra nibh cras pulvinar " +
          "mattis. Magna etiam tempor orci eu lobortis. Amet cursus sit amet dictum sit amet justo donec.\n\n" +
          " Vitae sapien pellentesque habitant morbi tristique. In vitae turpis massa sed elementum tempus.\n " +
          "Ultricies lacus sed turpis tincidunt id. Volutpat consequat mauris nunc congue. Bibendum arcu" +
          " vitae elementum curabitur. Porttitor massa id neque aliquam vestibulum. Convallis convallis " +
          "tellus id interdum velit laoreet. Eu non diam phasellus vestibulum lorem sed risus.",

          "Orci eu lobortis elementum nibh tellus molestie nunc non. Vitae suscipit tellus mauris " +
          "a diam maecenas sed enim ut. Vestibulum lorem sed risus ultricies tristique nulla aliquet " +
          "enim tortor. Ipsum dolor sit amet consectetur adipiscing elit duis. Posuere urna nec " +
          "tincidunt praesent semper feugiat nibh. Egestas maecenas pharetra convallis " +
          "posuere morbi leo urna. Risus nec feugiat in fermentum. Elementum sagittis vitae et" +
          " leo duis ut diam quam. Laoreet suspendisse interdum consectetur libero. Ullamcorper " +
          "morbi tincidunt ornare massa. Eu feugiat pretium nibh ipsum consequat nisl.\n\n" +
          "Sed vulputate odio ut enim blandit volutpat maecenas. Rutrum tellus pellentesque eu" +
          " tincidunt tortor aliquam nulla. Interdum varius sit amet mattis vulputate enim.\n\n" +
          "Nam libero justo laoreet sit amet cursus sit amet.",

          "Congue mauris rhoncus aenean vel elit. A iaculis at erat pellentesque.\n" +
          "Netus et malesuada fames ac turpis egestas. Laoreet suspendisse interdum consectetur libero. " +
          "Neque vitae tempus quam pellentesque nec nam aliquam sem et.\n\n" +
          "Nunc consequat interdum varius sit amet mattis vulputate. Ut aliquam purus sit amet luctus. " +
          "Cum sociis natoque penatibus et magnis dis parturient montes nascetur. " +
          "Vitae proin sagittis nisl rhoncus mattis rhoncus urna.\n\n" +
          "Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam.\n" +
          "Congue mauris rhoncus aenean vel elit. A iaculis at erat pellentesque.\n" +
          "Netus et malesuada fames ac turpis egestas. Laoreet suspendisse interdum consectetur libero. " +
          "Neque vitae tempus quam pellentesque nec nam aliquam sem et.\n\n" +
          "Nunc consequat interdum varius sit amet mattis vulputate. Ut aliquam purus sit amet luctus. " +
          "Cum sociis natoque penatibus et magnis dis parturient montes nascetur. " +
          "Vitae proin sagittis nisl rhoncus mattis rhoncus urna.\n\n" +
          "Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam."
        ]
      }
    },
    {
      id: "55555",
      title: "Checkbox question",
      type: QuestionType.checkbox,
      answers: 15,
      data: {
        options: [{title: "English", amount:8}, {title: "Ukrainian", amount:13}]
      }
    }
  ]
};

function* loadReport(action: any) {
  try {
    const id: string = action.payload;
    // here will be API call
    // here also check if JSON response.questions[].statistics is valid - serialize it
    const report: IQuestionnaireReport = mockReport;
    yield put(loadQuestionnaireReportRoutine.success(report));
  } catch (e) {
    yield put(loadQuestionnaireReportRoutine.failure());
    toastr.error("Unable to load questionnaire report");
  }
}

export default function* questionnaireReportSagas() {
  yield all([
    yield takeEvery(loadQuestionnaireReportRoutine.TRIGGER, loadReport)
  ]);
}