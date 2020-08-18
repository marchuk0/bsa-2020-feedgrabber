import React, { FC, useEffect, useState } from "react";
import { IQuestion } from "../../models/forms/Questions/IQuesion";
import { IAppState } from "models/IAppState";
import { connect, ConnectedProps } from "react-redux";
import { loadCategoriesRoutine } from "sagas/categories/routines";
import { loadQuestionByIdRoutine, saveQuestionToQuestionnaireRoutine } from "../../sagas/questions/routines";
import { useHistory } from "react-router-dom";
import QuestionDetails from "../../components/QuestionDetails";
import { Button, Loader } from "semantic-ui-react";
import { IComponentState } from "../../components/ComponentsQuestions/IQuestionInputContract";
import styles from "./styles.module.sass";

const QuestionDetailsPage: FC<QuestionDetailsProps & { match; isPreview }> = (
    {
        currentQuestion,
        loadQuestion,
        isLoading,
        saveQuestion,
        loadCategories,
        questionnaireId,
        categories,
        match,
        isPreview
    }) => {
    const history = useHistory();
    const [isQuestionDetailsValid, setIsQuestionDetailsValid] = useState(false);
    const [question, setQuestion] = useState<IQuestion>(currentQuestion);

    const handleQuestionDetailsUpdate = (state: IComponentState<IQuestion>) => {
        const { isCompleted, value } = state;
        setIsQuestionDetailsValid(isCompleted);
        setQuestion(value);
    };
    // useEffect(() => {
    //     loadQuestion('empty');
    //     loadCategories();
    // }, [loadCategories, loadQuestion]);

    useEffect(() => {
        if (match.params.id === 'new') {
            loadQuestion('empty');
        }
        else {
            if (!isPreview)
                loadQuestion({ id: match.params.id });
            loadCategories();
        }
    }, [loadQuestion, match.params.id, loadCategories]);

    useEffect(() => {
        setQuestion(currentQuestion);
    }, [currentQuestion]);

    const onClose = () => {
        isPreview ? isPreview.close() : history.push("/questions");
    };

    const onSubmit = () => {
        if (isQuestionDetailsValid) {
            saveQuestion({
                ...question,
                questionnaireId
            });
        }
        isPreview ? isPreview.close() : history.goBack();
    };

    return (
        <div className={`${styles.question_container} ${isPreview ? styles.question_container_preview : ''}`}>
            {isLoading && (
                <Loader active inline='centered' />
            )}
            {!isLoading && (
                <div>
                    <QuestionDetails
                        key={currentQuestion.id}
                        currentQuestion={currentQuestion}
                        categories={categories}
                        onValueChange={handleQuestionDetailsUpdate}
                    />
                    <div className={`${styles.question_actions} ${isPreview ? styles.question_actions_preview : ''}`}>
                        <Button className="ui button" color="red" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className="ui button"
                            color="green"
                            disabled={!isQuestionDetailsValid}
                            onClick={onSubmit}>
                            Save
                        </Button>
                    </div>
                </div>
            )}

        </div>
    );
};

const mapState = (state: IAppState) => ({
    currentQuestion: state.questions.current,
    isLoading: state.questions.categories.isLoading,
    categories: state.questions.categories.list,
    questionnaireId: state.questionnaires.current.get.id
});

const mapDispatch = {
    saveQuestion: saveQuestionToQuestionnaireRoutine,
    loadQuestion: loadQuestionByIdRoutine,
    loadCategories: loadCategoriesRoutine
};

const connector = connect(mapState, mapDispatch);

type QuestionDetailsProps = ConnectedProps<typeof connector>;

export default connector(QuestionDetailsPage);
