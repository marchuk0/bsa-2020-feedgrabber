import React from 'react';
import {Form} from 'semantic-ui-react';
import {IQuestion} from '../../models/forms/Questions/IQuesion';
import {history} from '../../helpers/history.helper';
import styles from './styles.module.scss';
import {Formik} from 'formik';
import {IAppState} from 'models/IAppState';
import {connect} from "react-redux";
import {IAnswer, IAnswerBody, IQuestionnaireResponse} from 'models/forms/Response/types';
import {loadOneQuestionnaireRoutine, loadOneSavedQuestionnaireRoutine} from 'sagas/qustionnaires/routines';
import UIPageTitle from 'components/UI/UIPageTitle';
import UIButton from 'components/UI/UIButton';
import UIListHeader from 'components/UI/UIQuestionListHeader';
import UIListItem from 'components/UI/UIQuestionItemCard';
import ResponseQuestion from 'components/ResponseQuestion';
import {saveResponseRoutine} from 'sagas/response/routines';
import { getSectionsByQuestionnaireRoutine } from 'sagas/sections/routines';
import { ISection } from 'models/forms/Sections/types';
import sectionsReducer from 'reducers/section/reducer';

interface IComponentState {
    question: IQuestion;
    isAnswered: boolean;
}

interface IQuestionnaireResponseState {
    isCompleted: boolean;
    showErrors: boolean;
    currentSectionIndex: number;
    answers: IAnswer<IAnswerBody>[];
}

interface IQuestionnaireResponseAnswers {
    id: string;
    payload: IAnswer<any>[];
}

interface IQuestionnaireResponseProps {
    match: any; // requestId
    response: IQuestionnaireResponse;
    title: string;
    description: string;
    // questions: IQuestion[];
    isLoading: boolean;
    sections: ISection[];

    loadSections(questionnaireId: string): void;

    loadOneSaved(payload: {questionnaireId: string; responseId: string}): void;

    loadQuestionnaire(id: string): void;

    saveResponseAnswers(answers: IQuestionnaireResponseAnswers): void;
}

class QuestionnaireResponse extends React.Component<IQuestionnaireResponseProps, IQuestionnaireResponseState> {

    constructor(props: IQuestionnaireResponseProps) {
        super(props);
        this.state = {
            isCompleted: false,
            showErrors: false,
            currentSectionIndex: 0,
            answers: []
        };
        this.handleComponentChange = this.handleComponentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleComponentChange(state: IComponentState) {
        const {sections} = this.props;
        const {currentSectionIndex} = this.state;
        const questions = sections[currentSectionIndex].questions;
        let updatedQuestions: IQuestion[] = questions;
        if (state.isAnswered) {
            updatedQuestions = questions.map(question => {
                if (question.id === state.question.id) {
                    return state.question;
                }
                return question;
            });
        }
        const completeStates = updatedQuestions.map(question => question.answer);
        this.setState({
            isCompleted: !completeStates.includes(undefined)
        });
    }

    componentDidMount() {
        const {match, loadQuestionnaire, loadOneSaved, loadSections} = this.props;
        loadSections(match.params.id);
        !match.params.responseId
            ? loadQuestionnaire(match.params.id)
            : loadOneSaved({questionnaireId: match.params.id ,responseId: match.params.responseId});
    }

    getAnswers = () => {
        const {sections} = this.props;
        const {currentSectionIndex} = this.state;
        const questions = sections[currentSectionIndex].questions;
        return questions.map(question => {
            return {
                questionId: question.id,
                type: question.type,
                body: question.answer
            };
        });
    }

    handleSubmit = () => {
        if (this.state.isCompleted) {
            const answers: IAnswer<IAnswerBody>[] = this.getAnswers();
            const payload = {
                id: this.props.response.id,
                payload: this.state.answers.concat(answers)
            };
            this.props.saveResponseAnswers(payload);
            history.goBack();
        } else {
            this.setState({
                showErrors: true
            });
        }
    }

    handlePreviousClick = () => {
        this.setState({
            isCompleted: true,
            showErrors: false,
            currentSectionIndex: this.state.currentSectionIndex + 1
        });
    };

    handleNextClick = () => {
        if (this.state.isCompleted) {
            const answers: IAnswer<IAnswerBody>[] = this.getAnswers();
            this.setState({
                answers: this.state.answers.concat(answers),
                isCompleted: false,
                showErrors: false,
                currentSectionIndex: this.state.currentSectionIndex + 1
            });
        } else {
            this.setState({
                showErrors: true
            });
        }
        
    };

    render() {
        const {description, sections} = this.props;
        const {showErrors, currentSectionIndex} = this.state;
        const section = sections[currentSectionIndex];

        return (
            <div className={styles.response_container}>
                <UIPageTitle title="Response"/>
                <UIListHeader title={section.title} description={description}/>
                <Formik
                    initialValues={this.state}
                    onSubmit={this.handleSubmit}
                >{formik => (
                    <Form onSubmit={formik.handleSubmit} className={styles.questionsListContainer}>
                        <ul>
                            {section.questions.map(question => {
                                return (
                                    <UIListItem
                                        key={question.id}
                                        name={question.name}
                                        category={question.categoryTitle}>
                                        <ResponseQuestion question={question} answerHandler={(data: IAnswerBody) => {
                                            question["answer"] = data;
                                            this.handleComponentChange({
                                                question,
                                                isAnswered: !!data
                                            });
                                        }}/>
                                        {showErrors && !question.answer ?
                                            <div className={styles.error_message}>
                                                Please, fill the question</div> : null}
                                    </UIListItem>);
                            })}
                        </ul>
                        <div className={styles.submit}>
                            {sections.length === currentSectionIndex + 1 ? <UIButton title="Send" submit/> :
                            <div>
                                <UIButton title="Previous" onClick={this.handlePreviousClick}/>
                                <UIButton title="Next" onClick={this.handleNextClick}/>
                            </div>
                        }
                        </div>
                    </Form>)}
                </Formik>
            </div>);
    }
}

const mapStateToProps = (state: IAppState) => ({
    questions: state.questionnaires.current.questions,
    title: state.questionnaires.current.get.title,
    description: state.questionnaires.current.get.description,
    response: state.questionnaireResponse.current,
    sections: state.sections.list
});

const mapDispatchToProps = {
    loadQuestionnaire: loadOneQuestionnaireRoutine,
    saveResponseAnswers: saveResponseRoutine,
    loadOneSaved: loadOneSavedQuestionnaireRoutine,
    loadSections: getSectionsByQuestionnaireRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireResponse);
