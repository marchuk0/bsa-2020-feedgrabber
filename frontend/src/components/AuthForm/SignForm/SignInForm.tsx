import React, {FC, useEffect} from 'react';
import Typography from './Typography';
import Input from './Input';
import Button from './Button';
import * as yup from "yup";
import {Formik} from 'formik';
import {getUserShortRoutine, loginRoutine, sendEmailToResetPasswordRoutine} from 'sagas/auth/routines';
import {connect, ConnectedProps} from 'react-redux';
import {Button as SemanticButton, Grid, Header, Icon, Message, Segment} from "semantic-ui-react";
import {IAppState} from "../../../models/IAppState";
import CompanySelectorForm from "./CompanySelectorForm";
import styles from "./CompanySelectorForm/styles.module.sass";
import {dropCompanyRoutine} from "../../../sagas/companies/routines";
import LoaderWrapper from "../../helpers/LoaderWrapper";
import {useTranslation} from "react-i18next";

const schema = yup.object().shape({
    password: yup
        .string()
        .required("Password required"),
    username: yup
        .string()
        .required("Username required")
});

const SignInForm: FC<SignInFormProps & { className: string }> = ({
    signIn,
    dropCompany,
    className,
    error,
    company,
    userEmail,
    resetPassword,
    isLoading,
    userName,
    loadUserName
}) => {
    const [ t ] = useTranslation();

    useEffect(() => {
      if(company && userEmail) {
        loadUserName({email: userEmail, companyId: company.id});
      }}, [company, loadUserName, userEmail]);
    if (!company) {
        return (<CompanySelectorForm className={className}/>);
    }

    const companyCard = (
        <Segment style={{width: '284px'}}>
            <Grid>
                <Grid.Column width={4}>
                    <SemanticButton type='button'
                                    icon
                                    basic
                                    size='small'
                                    onClick={() => dropCompany()}>
                        <Icon name='arrow left' inverted color='red' size='large'/>
                    </SemanticButton>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Header textAlign='left' as='h4' className={styles.company}>
                        {company.name}
                    </Header>
                </Grid.Column>
            </Grid>
        </Segment>);

    return (
        <LoaderWrapper loading={isLoading}>
        <Formik
            initialValues={{password: '', username: userName}}
            validationSchema={schema}
            onSubmit={values => {
                signIn({
                    password: values.password,
                    username: values.username,
                    companyId: company.id
                });
            }}
        >
            {({
                  touched,
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit
              }) => {
                const errorText = (touched.username && errors.username)
                    || (touched.password && errors.password)
                    || error;

                return (
                    <form className={className} onSubmit={handleSubmit} autoComplete="off">
                        <Typography fontWeight="bold" variant="h4">{t("Sign In")}</Typography>
                        <Typography variant="body2">{t("or use your account")}</Typography>
                        <Input name="username" placeholder="Username" value={values.username}
                               disabled
                        />
                        <Input name="password" type="password" placeholder="Password" value={values.password}
                               onChange={handleChange} onBlur={handleBlur}
                        />
                        {/* eslint-disable-next-line */ }
                        <a href="#"
                            onClick={() => resetPassword({userEmail, companyId: company.id})}
                        >{t("Reset password")}</a>
                        {
                            companyCard
                        }
                        {
                            errorText && <Message attached="top" error size="small" content={t(errorText)}/>
                        }
                        <Button disabled={!!errorText && errorText !== error}
                                variant="secondary"
                                type="submit"
                                marginTop="1.17rem">
                            {t("Sign In")}
                        </Button>
                    </form>);
            }}
        </Formik>
        </LoaderWrapper>
    );
};

const mapState = (state: IAppState) => ({
    isLoading: state.user.isLoading,
    error: state.user.error?.login,
    company: state.company.currentCompany,
    userEmail: state.user.info?.email,
    userName: state.user.shortInfo?.username
});

const mapDispatch = {
    signIn: loginRoutine,
    dropCompany: dropCompanyRoutine,
    resetPassword: sendEmailToResetPasswordRoutine,
    loadUserName: getUserShortRoutine
};

const connector = connect(mapState, mapDispatch);

type SignInFormProps = ConnectedProps<typeof connector>;

export default connector(SignInForm);

