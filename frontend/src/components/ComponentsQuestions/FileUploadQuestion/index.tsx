import React, {useEffect} from "react";
import QuestionField from "./QuestionField";
import {Dropdown} from "semantic-ui-react";
import styles from "./styles.module.sass";
import {IGenericQuestionComponent, invalidState, useInitValue, validState} from "../IQuestionInputContract";
import {IFileUploadAnswerDetails} from "../../../models/forms/Questions/IQuesion";
import {fileTypesArray} from "./types";
import {useTranslation} from "react-i18next";

const options = fileTypesArray.map(option => {
    return {
        key: option,
        text: option,
        value: option
    };
});

const FileUploadQuestion: IGenericQuestionComponent<IFileUploadAnswerDetails> =
    ({value: propValue, onValueChange}) => {
        const [ t ] = useTranslation();

        const values = useInitValue(
            {value: {filesType: "", filesNumber: 1, filesSize: 1}, isCompleted: true},
            propValue,
            onValueChange
        );

        const check = (details: IFileUploadAnswerDetails) => {
            if(details.filesNumber<1){details.filesNumber=1;}
            if(details.filesSize<1){details.filesSize=1;}
            if(details.filesType){
                onValueChange(validState(details));
            }else{
                onValueChange(invalidState(details));
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(() => check(values), [values]);

        return (
            <div className={styles.fileUploadQuestion}>
                <div className={styles.questionField}>
                    <span className={styles.description}>{t("Type of files")}</span>
                    <Dropdown
                        error={!values.filesType}
                        className={styles.inputField} name="filesType" selection placeholder={t("Choose file type")}
                        options={options} value={values.filesType}
                        onChange={(e, data) => {
                            onValueChange(validState({
                                ...values,
                                filesType: data.value as string
                            }));
                        }}
                    />
                </div>
                <QuestionField
                    text={t("Maximum number of files")} name={"filesNumber"} type={"number"}
                    inputProps={{min: 1, max: 10}} value={values.filesNumber}
                    onChange={(e, data) => {
                        check({
                                ...values,
                                filesNumber: Number(data.value)
                            });
                    }}
                />
                <div className={styles.questionField}>
                    <span className={styles.description}>{t("Maximum files size")}</span>
                    <Dropdown
                        name="filesType"
                        className={styles.inputField}
                        selection
                        value={values.filesSize}
                        onChange={(e, data) => {
                            check({
                                ...values,
                                filesSize: Number(data.value)
                            });
                        }}
                        options={[
                            {
                                key: '1',
                                text: `1 ${t("MB")}`,
                                value: 1
                            },
                            {
                                key: '10',
                                text: `10 ${t("MB")}`,
                                value: 10
                            }
                        ]}
                    />
                </div>
            </div>
        );
    };

export default FileUploadQuestion;
