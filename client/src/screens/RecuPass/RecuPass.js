import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userService } from '../../_services/user.services'

function RecuPass({ history }) {
    const TokenStatus = {
        Validating: 'Validating',
        Valid: 'Valid',
        Invalid: 'Invalid'
    }
    
    const [id, setId] = useState(null);
    const [token, setToken] = useState(null);
    const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        const aux = queryString.parse(location.search);
        const token = aux.t;
        const id = aux.u;

        // remove token from url to prevent http referer leakage
        // eslint-disable-next-line no-restricted-globals
        history.replace(location.pathname);

        userService.validateResetToken(id, token)
            .then(() => {
                setId(id);
                setToken(token);
                setTokenStatus(TokenStatus.Valid);
            })
            .catch(() => {
                setTokenStatus(TokenStatus.Invalid);
            });
    }, []);

    function getForm() {
        const initialValues = {
            password: '',
            confirmPassword: ''
        };

        const validationSchema = Yup.object().shape({
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        });

        function onSubmit( { password }, { setSubmitting }) {
            console.log('1')
            userService.resetPassword(id, token, password)
                .then(() => {
                    alert('Password reset successful, you can now login');
                    history.push('login');
                })
                .catch(error => {
                    setSubmitting(false);
                    alert(error);
                });
        }

        return (
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label>Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Reset Password
                                </button>
                                <Link to="/login" className="btn btn-link">Cancel</Link>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }

    function getBody() {
        switch (tokenStatus) {
            case TokenStatus.Valid:
                return getForm();
            case TokenStatus.Invalid:
                return <div>Token validation failed, if the token has expired you can get a new one.</div>;
            case TokenStatus.Validating:
                return <div>Validating token...</div>;
            default:
                return;
        }
    }

    return (
        <div>
            <h3 className="card-header">Reset Password</h3>
            <div className="card-body">{getBody()}</div>
        </div>
    )
}

export { RecuPass };