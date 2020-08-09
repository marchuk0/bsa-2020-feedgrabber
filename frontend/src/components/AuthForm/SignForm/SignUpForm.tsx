import React, {FC} from 'react';
import Typography from './Typography';
import Input from './Input';
import Button from './Button';
import {Formik} from "formik";
import * as yup from "yup";
import {registerRoutine} from "../routines";
import {connect, ConnectedProps} from "react-redux";
import {Message} from "semantic-ui-react";
import {IAppState} from "../../../models/IAppState";

const schema = yup.object().shape({
    companyName: yup
        .string()
        .required("Company name required")
        .min(6, "Company name too short!")
        .max(20, "Company name too long!"),
    email: yup
        .string()
        .email("Email must be valid")
        .required("Email must be valid"),
    password: yup
        .string()
        .required("Password required")
        .min(6, "Password too short!")
        .max(30, "Password too long!"),
    username: yup
        .string()
        .required("Username required")
        .min(5, "Username too short!")
        .max(15, "Username too long!")
});

const SignUpForm: FC<SignUpFormProps & {className: string}> = props => {
    const {signUp, className, error} = props;

    return (
        <Formik
            initialValues={{email: '', password: '', companyName: '', username: ''}}
            validationSchema={schema}
            onSubmit={values => {
                signUp({
                    email: values.email,
                    password: values.password,
                    companyName: values.companyName,
                    username: values.username
                });
            }
            }
        >
            {({
                  errors,
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit
              }) => {
                const errorText = errors.username || errors.email || errors.companyName || errors.password || error;

                return (
                    <form className={className} onSubmit={handleSubmit} autoComplete="off">
                        <Typography fontWeight="bold" variant="h4">Create Account</Typography>
                        <Typography variant="body2">or use your email for registration</Typography>
                        <Input name="username" placeholder="Username" value={values.username}
                               onChange={handleChange} onBlur={handleBlur}
                        />
                        <Input name="email" placeholder="Email" value={values.email}
                               onChange={handleChange} onBlur={handleBlur}
                        />
                        <Input name="companyName" placeholder="Company" value={values.companyName}
                               onChange={handleChange} onBlur={handleBlur}
                        />
                        <Input name="password" type="password" placeholder="Password" value={values.password}
                               onChange={handleChange} onBlur={handleBlur}
                        />
                        {
                            errorText && <Message attached="top" error size="small" content={errorText}/>
                        }
                        <Button disabled={!!errorText && errorText !== error}
                                variant="secondary"
                                type="submit"
                                marginTop="1.17rem">
                            Sign Up
                        </Button>
                    </form>);}}
        </Formik>
    );
};

const mapState = (state: IAppState) => ({
    isLoading: state.user.isLoading,
    error: state.user.error.register
});

const mapDispatch = {
    signUp: registerRoutine
};

const connector = connect(mapState, mapDispatch);

type SignUpFormProps = ConnectedProps<typeof connector>;

export default connector(SignUpForm);

