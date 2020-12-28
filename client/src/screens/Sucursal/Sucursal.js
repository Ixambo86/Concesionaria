import React, { Component } from "react";
import Axios from "axios";
import { Busqueda } from '../../components/Busqueda/Busqueda'
import { Tabla } from '../../components/Tabla'
import add from "../../image/add24.png"
import ok from "../../image/accept24.png"
import cancel from "../../image/cancel24.png"
import { sucursalesService } from '../../_services/sucursales.service'
import { sucursalessService } from '../../_services/proveedores.service'
import { authenticationService } from '../../_services/authentication.service';
import { validacionService } from "../../_services/validacion.services";
import { FormDescripcion } from "../../components/FormDescripcion";
import { proveedoresService } from '../../_services/proveedores.service';
import "./Sucursal.css";


import "bootstrap/dist/css/bootstrap.min.css";
import {
    Label,
    Alert,
    Button,

    Navbar,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
    Input,
    Form,
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    UncontrolledCollapse
} from "reactstrap";

class Sucursal extends Component {

    state = {
        modulo: "",
        filtro: "",
        formulario: "",
        sucursales: [],
        formulario: "",
        mostrarFormNuevaLoc: false,
        mostrarForm: false,

        form: {
            sucursal_id: 0,
            sucursal_nombre: "",
            sucursal_calle: "",
            sucursal_altura: "",
            localidad_id: 0,
            provincia_id: 0,
            pais_id: 0,
            sucursal_telefono: "",
            sucursal_email: "",
            nuevaLocalidad: ""

        },
        form_combo: {
            localidades: [],
            paises: [],
            provincias: []

        },

    };

    componentDidMount() { // se ejecuta al inicio
        this.buscarSucursales(this.state.filtro);
    }

    cerrarFormDescripcion = () => {
        this.setState({ formularioTitulo: "", mostrarComboMarcas: false, });

    }

    cerrarForm = () => {
        this.setState({ mostrarForm: false });
        this.setState({ form: { ...this.state.form, nuevoColor: "" } })
        this.setState({ mostrarFormNuevoCol: false, mostrarFormNuevaLoc: false, });
    };

    buscarSucursales = query => {
        sucursalesService.buscarSucursales(query)
            .then((res) => this.setState({ sucursales: res, filtro: query }));
    }

    confirmar = (sucu) => {
        console.log("this.state.mostrarFormNuevaLoc");
        console.log(this.state.mostrarFormNuevaLoc);

        if (this.camposValidos(sucu)) {
            if (this.state.mostrarFormNuevaLoc) {
                this.InsertarNuevaLicalidad(sucu, sucu.nuevaLocalidad);
            }
            else {
                if (sucu.sucursal_id === 0) {
                    this.insertarSucursal(sucu);
                    console.log("insertar");

                }
                else {
                    this.editarSucursal(sucu);
                    console.log("editar");

                }
            }

        }
        this.setState({ form: { ...this.state.form, nuevaLocalidad: "" } })
        this.setState({ mostrarFormNuevaLoc: false });
    }

    camposValidos = (sucu) => {

        var camposValidos = true;

        //Validaciones select
        var alertaLocalidad = document.getElementById("localidadid");
        if (sucu.localidad_id <= 0 || sucu.localidad_id === undefined) {
            alertaLocalidad.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaLocalidad.style.display = "none";
        }

        var alertaPais = document.getElementById("paisid");
        if (sucu.pais_id <= 0 || sucu.pais_id === undefined ) {
            alertaPais.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaPais.style.display = "none";
        }

        var alertaProvincia = document.getElementById("provinciaid");
        if (sucu.provincia_id <= 0  || sucu.provincia_id === undefined ) {
            alertaProvincia.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaProvincia.style.display = "none";
        }

        //Validaciones input

        var regex_sucursal_nombre = /^(?!\s*$).+/;
        var nombreValido = regex_sucursal_nombre.test(sucu.sucursal_nombre)

        var alertaNombre = document.getElementById("sucursalnombreid");
        if (!nombreValido) {
            alertaNombre.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaNombre.style.display = "none";
        }

        var calleValida = regex_sucursal_nombre.test(sucu.sucursal_calle)
        var alertaCalle = document.getElementById("calleid");
        if (!calleValida) {
            alertaCalle.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaCalle.style.display = "none";
        }

        var regex_sucursal_altura = /^\d{1,4}$/;
        var alturaValida = regex_sucursal_altura.test(sucu.sucursal_altura)

        var alertaAltura = document.getElementById("alturaid");
        if (!alturaValida) {
            alertaAltura.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaAltura.style.display = "none";
        }

        var regex_sucursal_mecanicos = /^\d{1,2}$/;
        var mecanicosValidos = regex_sucursal_mecanicos.test(sucu.sucursal_cant_mecanicos)

        var alertaMecanicos = document.getElementById("mecanicosid");
        if (!mecanicosValidos) {
            alertaMecanicos.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaMecanicos.style.display = "none";
        }

        var regex_sucursal_telefono = /^((\d{10})|(\d{2}-\d{4}-\d{4}))$/;
        var telefonoValido = regex_sucursal_telefono.test(sucu.sucursal_telefono)

        var alertaTelefono = document.getElementById("telefonoid");
        if (!telefonoValido) {
            alertaTelefono.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaTelefono.style.display = "none";
        }

        var regex_sucursal_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        var emailValido = regex_sucursal_email.test(sucu.sucursal_email)

        var alertaEmail = document.getElementById("emailid");
        if (!emailValido) {
            alertaEmail.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaEmail.style.display = "none";
        }


        return camposValidos;

    }

    InsertarNuevaLicalidad = (sucu, localidad) => {

        sucursalesService.InsertarNuevaLicalidad(localidad)
            .then((res) => {

                let id = res.insertId;
                this.setState({
                    form: { ...this.state.form, localidad_id: id }
                })
                if (sucu.sucursal_id === 0) {
                    this.insertarSucursal(this.state.form);
                    console.log("insertar Localidad");

                }
                else {
                    this.editarSucursal(this.state.form);
                    console.log("editar Localidad");

                }

            });
        this.setState({ form: { ...this.state.form, nuevaLocalidad: "" } })
    }

    insertarSucursal = (sucu) => {

        sucursalesService.insertarSucursal(sucu.sucursal_nombre, sucu.sucursal_calle, sucu.sucursal_altura, sucu.localidad_id, sucu.pais_id, sucu.provincia_id, sucu.sucursal_cant_mecanicos, sucu.sucursal_telefono, sucu.sucursal_email)
            .then(() => {
                this.cerrarForm();
                this.setState({ sucursales: [] });
                this.buscarSucursales(this.state.filtro);
                this.setState({ mostrarFormNuevaLoc: false });
            });
    }

    editarSucursal = (sucu) => {
        sucursalesService.editarSucursal(sucu.sucursal_id, sucu.sucursal_nombre, sucu.sucursal_calle, sucu.sucursal_altura, sucu.localidad_id, sucu.pais_id, sucu.provincia_id, sucu.sucursal_cant_mecanicos, sucu.sucursal_telefono, sucu.sucursal_email)
            .then(() => {
                this.cerrarForm();
                this.setState({ sucursales: [] });
                this.buscarSucursales(this.state.filtro);
                this.setState({ mostrarFormNuevaLoc: false });
            });

    };


    eliminarSucursal = (sucu) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar la Sucursal:  " + sucu.sucursal_nombre);
        sucursalesService.eliminarSucursal(sucu.sucursal_id)
            .then(() => {
                this.setState({ sucursales: [] });
                this.buscarSucursales(this.state.filtro);
                this.setState({ mostrarFormNuevaLoc: false });
            });

    }

    mostrarFormNuevaLocalidad = () => {
        this.setState({ mostrarFormNuevaLoc: true });
    }


    mostrarForm = (sucursales) => {

        let formulario = "";
        
        this.buscarPaises();
        

        if (sucursales.sucursal_id !== 0) {
            formulario = "Modificar Sucursal " + sucursales.sucursal_nombre;
        }
        else {
            formulario = "Nueva Sucursal ";
            this.inicializarForm();
        }

        this.setState({ formulario: formulario, mostrarForm: true, form: sucursales });
    };


    inicializarForm = () => {
        this.setState({
            form: {
                sucursal_id: 0,
                sucursal_nombre: "",
                sucursal_calle: "",
                sucursal_altura: "",
                localidad_id: 0,
                provincia_id: 0,
                pais_id: 0,
                sucursal_telefono: "",
                sucursal_email: "",
                nuevaLocalidad: ""
            }
        })
    }

    buscarLocalidades = query => {
        proveedoresService.buscarLocalidades(query)
            .then((res) => this.setState({
                form_combo: {
                    ...this.state.form_combo,
                    localidades: res
                }
            }));
    }

    buscarProvincias = query => {
        proveedoresService.buscarProvincias(query)
            .then((res) => this.setState({
                form_combo: {
                    ...this.state.form_combo,
                    provincias: res
                }
            }));
    }

    buscarPaises = () => {
        proveedoresService.buscarPaises()
            .then((res) => this.setState({
                form_combo: {
                    ...this.state.form_combo,
                    paises: res
                }
            }));
    }


    handleChange = (e) => {

        if (e.target.name === "pais_id") {
            if (e.target.value === "-1") {
                this.nuevoPais();
            } else {

                this.buscarProvincias(e.target.value)
                this.buscarLocalidades(e.target.name)
            }

        }

        if (e.target.name === "provincia_id") {
            if (e.target.value === "-1") {
                this.nuevaProvincia();
            } else {

                this.buscarLocalidades(e.target.value)
            }

        }

        if (e.target.name === "localidad_id") {
            if (e.target.name === "localidad") {
                this.buscarLocalidades(e.target.value)
            }
            if (e.target.value === "-1") {
                this.nuevaLocalidad();
            }

        }
        //this.buscarLocalidades(e.target.value)
        //this.buscarPaises();


        if(e.target.name == "descripcion") {
            validacionService.validar(e.target,"sucursal_descripcion_id",e.target.value)
        }
        else if(e.target.name == "localidad_id") {
            validacionService.validar(e.target, "sucursal_localidad_id", e.target.value)
        }    
        else{
            validacionService.validar(e.target, e.target.name, e.target.value);
        }
            


        
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    };

    rolAdmitido() {
        var rol = authenticationService.currentUserValue.role;
        return rol == "Administrador" || rol == "Supervisor de ventas" || rol == "Gerente";
    }

    nuevoPais = () => {
        this.setState({ mostrarFormDescripcion: true, formularioTitulo: "Nuevo Pais" })
    };

    insertarPais = () => {

        if(this.validarDescripcion(this.state.form.descripcion)){

        proveedoresService.insertarPais(this.state.form.descripcion)
            .then((res) => {
                this.cerrarFormDescripcion();
                this.setState({
                    form: { ...this.state.form, pais_id: res.insertId }
                })
                this.buscarPaises();
            });
            this.state.form.descripcion = "";
            this.validarNuevoPais();
        }    
    }

    nuevaProvincia = () => {
        this.setState({ mostrarFormDescripcion: true, formularioTitulo: "Nueva Provincia" })
    };

    insertarProvincia = () => {

        if(this.validarDescripcion(this.state.form.descripcion)){
        proveedoresService.insertarProvincia(this.state.form.descripcion, this.state.form.pais_id)
            .then((res) => {
                this.cerrarFormDescripcion();
                this.setState({
                    form: { ...this.state.form, provincia_id: res.insertId }
                })
                this.buscarProvincias(this.state.form.pais_id);
            });
            this.state.form.descripcion = "";
            this.validarNuevaProvincia();
        }    
    }

    nuevaLocalidad = () => {
        this.setState({ mostrarFormDescripcion: true, formularioTitulo: "Nueva Localidad" })
    };

    insertarLocalidad = () => {

        if(this.validarDescripcion(this.state.form.descripcion)){
        proveedoresService.insertarLocalidad(this.state.form.descripcion, this.state.form.provincia_id)
            .then((res) => {
                this.cerrarFormDescripcion();
                this.setState({
                    form: { ...this.state.form, localidad_id: res.insertId }
                })
                this.buscarLocalidades(this.state.form.provincia_id);
            });
            this.state.form.descripcion = "";
            this.validarNuevaLocalidad();
        }    
    }
    
    validarNuevoPais = () =>{
        var alertaPais = document.getElementById("paisid");
        if (this.state.form.pais_id != -1 ) {    
            alertaPais.style.display = "block";
        }
        else {
            alertaPais.style.display = "none";
        }
    }

    validarNuevaProvincia = () =>{
        var alertaProvincia = document.getElementById("provinciaid");
        if (this.state.form.provincia_id != -1 ) {
            alertaProvincia.style.display = "block";
        }
        else {
            alertaProvincia.style.display = "none";
        }
    }

    validarNuevaLocalidad = () => {
        var alertaLocalidad = document.getElementById("localidadid");
        if (this.state.form.localidad_id != -1 ) {
            alertaLocalidad.style.display = "block";
        }
        else {
            alertaLocalidad.style.display = "none";
        }

    }

    validarDescripcion = (descripcion) =>{
        
        var camposValidos = true;
        var regex_descripcion = /^(?!\s*$).+/;
        var descripcionValida = regex_descripcion.test(descripcion);

        var alertaDescripcion = document.getElementById("descripcionid");
        if (!descripcionValida || descripcion == undefined) {
            alertaDescripcion.style.display = "block";
            camposValidos = false; 
        }
        else {
            alertaDescripcion.style.display = "none";        
        }

        return camposValidos;
    }

    render() {
        const sucursales = this.state.sucursales;
        return (
            <>
                <Container hidden={this.state.formularioTitulo !== "Nuevo Pais"}>
                    <FormDescripcion
                        visible={this.state.formularioTitulo === "Nuevo Pais"}
                        titulo={this.state.formularioTitulo}
                        confirmar={this.insertarPais}
                        handleChange={this.handleChange}
                        cerrar={this.cerrarFormDescripcion}
                        descripcion={this.state.form.pais}
                    >
                    </FormDescripcion>
                </Container>
                <Container hidden={this.state.formularioTitulo !== "Nuevo Provincia"}>
                    <FormDescripcion
                        visible={this.state.formularioTitulo === "Nueva Provincia"}
                        titulo={this.state.formularioTitulo}
                        confirmar={this.insertarProvincia}
                        handleChange={this.handleChange}
                        cerrar={this.cerrarFormDescripcion}
                        descripcion={this.state.form.provincia}
                    >
                    </FormDescripcion>
                </Container>
                <Container hidden={this.state.formularioTitulo !== "Nuevo Localidad"}>
                    <FormDescripcion
                        visible={this.state.formularioTitulo === "Nueva Localidad"}
                        titulo={this.state.formularioTitulo}
                        confirmar={this.insertarLocalidad}
                        handleChange={this.handleChange}
                        cerrar={this.cerrarFormDescripcion}
                        descripcion={this.state.form.localidad}
                    >
                    </FormDescripcion>
                </Container>
                <Container hidden={this.props.visible}>

                    {/*Barra de busqueda*/}
                    <Busqueda modulo="Sucursales" search={this.buscarSucursales} />

                    <br />
                    {/*Boton agregar Nuevo Proveedor*/}
                    {this.rolAdmitido() ?
                        <Form inline>
                            <Button
                                color="success"
                                onClick={() => this.mostrarForm({
                                    sucursal_id: 0,
                                    sucursal_nombre: "",
                                    sucursal_calle: "",
                                    sucursal_altura: "",
                                    provincia_id: 0,
                                    pais_id: 0,
                                    localidad_id: 0,
                                    localidad_nombre: "",
                                    sucursal_cant_mecanicos: 0,
                                    sucursal_telefono: "",
                                    sucursal_email: "",
                                    nuevaLocalidad: ""

                                }, "Nuevo")}
                            >
                                <Form inline>
                                    <img src={add} />
                                </Form>
                            </Button>
                        </Form>
                        : ""}
                    <br />

                    {/*Tabla que muestra los proveedores*/}
                    <Tabla columnas={{ sucursal_nombre: "Nombre", sucursal_calle: "Calle", sucursal_altura: "Altura", sucursal_telefono: "Telefono", sucursal_email: "Email", pais_nombre: "Pais", provincia_nombre: "Provincia", localidad_nombre: "Localidad", sucursal_cant_mecanicos: "Mecánicos" }}
                        datos={this.state.sucursales}
                        editar={this.rolAdmitido() ? this.mostrarForm : ""}
                        eliminar={this.rolAdmitido() ? this.eliminarSucursal : ""} />
                </Container>


                {/* Formulario Insertar/editar */}
                <Modal isOpen={this.state.mostrarForm}>

                    <ModalHeader>
                        <div><h3>{this.state.formulario}</h3></div>
                    </ModalHeader>

                    {/* Formulario Insertar/editar */}
                    <ModalBody>
                        <Row>
                            <Col >
                                <div>
                                    Nombre de la Sucursal: *
                                    </div>
                                <input
                                    className="form-control"
                                    name="sucursal_nombre"
                                    value={this.state.form.sucursal_nombre}
                                    type="text"
                                    placeholder="Ingrese la Sucursal"
                                    onChange={this.handleChange}
                                />
                                <p id="sucursalnombreid" > Nombre inválido (Ej: "Sucursal Polvorines") </p >
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col >
                                <div>
                                    Calle: *
                                    </div>
                                <input
                                    className="form-control"
                                    name="sucursal_calle"
                                    value={this.state.form.sucursal_calle}
                                    type="text"
                                    placeholder="Ingrese la Calle"
                                    onChange={this.handleChange}
                                />
                                <p id="calleid" > Calle inválida (Ej: "Rivadavia") </p >
                            </Col>

                            <Col >
                                <div>
                                    Altura: *
                                    </div>
                                <input
                                    className="form-control"
                                    name="sucursal_altura"
                                    value={this.state.form.sucursal_altura}
                                    type="number"
                                    placeholder="Ingrese la Altura"
                                    onChange={this.handleChange}
                                />
                                <p id="alturaid" > Altura inválida (Ej: "3600") </p >
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <label>
                                    Pais: *
                            </label>
                                <Input
                                    placeholder="Nuevo pais"
                                    name="pais_id"
                                    type="select"
                                    value={this.state.form.pais_id}
                                    onChange={this.handleChange}
                                >
                                    <option value="0">Seleccionar</option>
                                    {
                                        this.state.form_combo.paises.map(pais => {
                                            return (
                                                <option value={pais.pais_id} selected={this.state.form.pais === pais.pais_nombre} >{pais.pais_nombre}</option>
                                            )
                                        })
                                    }
                                    <option value="-1">(+) Agregar Nuevo País</option>
                                </Input>
                                <p id="paisid" > Seleccione un País </p >
                            </Col>
                            <Col>
                                <label>
                                    Provincia: *
                                 </label>
                                <Input
                                    name="provincia_id"
                                    type="select"
                                    value={this.state.form.provincia_id}
                                    onChange={this.handleChange}
                                >
                                    <option value="0">Seleccionar</option>
                                    {
                                        this.state.form_combo.provincias.map(provincia => {
                                            return (
                                                <option value={provincia.provincia_id} selected={this.state.form.provincia === provincia.provincia_nombre}>{provincia.provincia_nombre}</option>
                                            )
                                        })
                                    }
                                    <option value="-1">(+) Agregar Nueva Provincia</option>

                                </Input>
                                <p id="provinciaid" > Seleccione una Provincia </p >
                            </Col>
                            <Col>
                                <label>
                                    Localidad: *
                                </label>
                                <Input
                                    name="localidad_id"
                                    type="select"
                                    value={this.state.form.localidad_id}
                                    onChange={this.handleChange}
                                    disabled={this.state.mostrarFormNuevaLoc}
                                >
                                    <option value="">Seleccionar</option>
                                    {
                                        this.state.form_combo.localidades.map(localidad => {
                                            return (
                                                <option value={localidad.id} >{localidad.nombre}</option>
                                            )
                                        })
                                    }
                                    <option value="-1">(+) Agregar Nueva Localidad</option>
                                </Input>
                                <p id="localidadid" > Seleccione una Localidad</p >
                            </Col>
                        </Row>

                        <br />
                        <Row>
                            <Col>
                                <div>
                                    Cantidad de Mecánicos: *
                                    </div>
                                <input
                                    className="form-control"
                                    name="sucursal_cant_mecanicos"
                                    value={this.state.form.sucursal_cant_mecanicos}
                                    type="number"
                                    placeholder="Mecánicos"
                                    onChange={this.handleChange}
                                />
                                <p id="mecanicosid" > Cantidad inválida (Ej: "3") </p >
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <div>
                                    Telefono: *
                                    </div>
                                <input
                                    className="form-control"
                                    name="sucursal_telefono"
                                    value={this.state.form.sucursal_telefono}
                                    type="text"
                                    placeholder="Telefono"
                                    onChange={this.handleChange}
                                />
                                <p id="telefonoid" > Telefono inválido (Ej: "1132329789") </p >
                            </Col>
                            <Col>
                                <div>
                                    Email: *
                                    </div>
                                <input
                                    className="form-control"
                                    name="sucursal_email"
                                    value={this.state.form.sucursal_email}
                                    type="text"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                />
                                <p id="emailid" > Email inválido (Ej: "usuario@autobot.com") </p >
                            </Col>
                        </Row>

                        <br />

                        <p> (*) Campos Obligatorios </p >
                        {/*Botones insertar/editar y cancelar*/}
                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={() => this.confirmar(this.state.form)}
                            >
                                <img src={ok} />
                            </Button>
                            <Button
                                color="danger"
                                onClick={() => this.cerrarForm()}
                            >
                                <img src={cancel} />
                            </Button>
                        </ModalFooter>
                    </ModalBody>
                </Modal>


            </>
        );
    }
}
export { Sucursal };