import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import * as Yup from 'yup';
import './Login.css'
import logo from '../../image/logo.svg'

import { authenticationService } from '../../_services/authentication.service';
import { userService } from '../../_services/user.services'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            recu: false
        }

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
        }
    }

    handleChange = (e) => {
        this.setState({
            user: e.target.value
            }
        );
    };

    solicitarRecu = (user) => {
        userService.solicitudRecu(user)
    }


    render() {
        return (           
            
            <div className="login">
                
                <Modal isOpen={this.state.recu}>
                    <ModalHeader>
                        <div><h3>Recuperar Password</h3></div>
                    </ModalHeader>

                    <ModalBody>                                  
                        <label>Usuario</label>
                        <input className="form-control" name="user" type="text" onChange={this.handleChange} value={this.state.user}/>
                    </ModalBody>
                
                    <ModalFooter>
                        <Button color="primary" onClick={() => {
                            this.solicitarRecu(this.state.user)
                            this.setState({recu: !this.state.recu})
                        }}
                        >
                            Enviar Email
                        </Button>
                        <Button color="danger" onClick={() => this.setState({recu: !this.state.recu})}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                
                <img src={logo} alt='logo.png' name='logo'/>
                <h2>AutoBot</h2>
                <h3>Iniciar Sesión</h3>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Ingrese su Nombre de Usuario'),
                        password: Yup.string().required('Ingrese su Contraseña')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    >{({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form">
                                <label htmlFor="username">Usuario: </label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form">
                                <label htmlFor="password">Contraseña: </label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form">
                                <button type="submit" className="loginButton" disabled={isSubmitting}>Login</button>
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                        
                    )}
                </Formik>
                <Button color="link" onClick={() => this.setState({recu: !this.state.recu})}>Recuperar Contraseña</Button> 
            </div>
        )
    }
}

export { Login };