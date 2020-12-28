import React, { Component } from "react";
import Axios from "axios";
import { Busqueda } from '../../components/Busqueda/Busqueda'
import { Tabla } from '../../components/Tabla'
import add from "../../image/add24.png"
import ok from "../../image/accept24.png"
import cancel from "../../image/cancel24.png"
import ayuda from '../../image/informacion.png'
import advertencia from "../../image/advertencia.png"

import { authenticationService } from '../../_services/authentication.service';
import { validacionService } from "../../_services/validacion.services";
import { proveedoresService } from '../../_services/proveedores.service';
import { FormDescripcion } from "../../components/FormDescripcion";

import "./Proveedor.css";
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
    PopoverHeader,
    PopoverBody,
    UncontrolledPopover
} from "reactstrap";

class Proveedor extends Component {

    state = {
        modulo: "",
        filtro: "",
        formulario: "",
        proveedores: [],
        formulario: "",
        mostrarForm: false,
        mostrarDetalles: false,
        mostrarFormEliminar: false,
        localidad_id: 0,
        provincia_id: 0,
        pais_id: 0,
        proveedor_eliminado: [],
        mostrarFormEliminadoAntes: false,
        form: {
            proveedor_nro: "",
            proveedor_id: 0,
            proveedor_iva: "",
            proveedor_nombre: "",
            proveedor_apellido: "",
            proveedor_genero: "",
            proveedor_persona_fisica: "",
            proveedor_razon_social: "",
            proveedor_tipo_doc_id: 0,
            proveedor_documento: "",
            proveedor_fecha_nac: "",
            proveedor_telefono: "",
            proveedor_email: "",
            proveedor_calle: "",
            proveedor_altura: 0,
            proveedor_piso: 0,
            proveedor_dpto: "",
            iva_id: 0,
            localidad_id: 0,
            provincia_id: 0,
            pais_id: 0,
            proveedor_motivo_eliminado: "",
            usuario_id: 0,
            proveedor_fecha_modificacion: ""
        },
        form_combo: {
            tipos_documentos: [],
            usuarios: [],
            persona_fisica: ["Si", "No"],
            localidades: [],
            paises: [],
            provincias: [],
            ivas: []
        },

    };

    componentDidMount() { // se ejecuta al inicio
        this.buscarProveedores(this.state.filtro);
    }

    cerrarFormDescripcion = () => {
        this.setState({ formularioTitulo: "", mostrarComboMarcas: false, });

    }
    cerrarForm = () => {
        this.setState({ mostrarForm: false });
    };

    cerrarDetalles = () => {
        this.setState({ mostrarDetalles: false });
    };

    cerrarEliminar = () => {
        this.setState({ mostrarFormEliminar: false });
    };

    cerrarEliminarAntes = () => {
        this.setState({ mostrarFormEliminadoAntes: false });
        this.cerrarForm();
    };

    buscarProveedores = query => {
        proveedoresService.buscarProveedores(query)
            .then((res) => this.setState({ proveedores: res, filtro: query }));
    }

    confirmar = (prov) => {

        var datosValidos = this.validar(prov);
        //var datosValidos = true;


        if (datosValidos) {
            if (prov.proveedor_id === 0) {
                this.verificarProveedorEliminado(prov);
                //this.insertarProveedor(prov);
            }
            else {
                this.editarProveedor(prov);
            }
        }

    }

    validar = (prov) => {

        var camposValidos = true;
        //Validaciones select
        var alertaLocalidad = document.getElementById("localidadid");
        if (prov.localidad_id <= 0 || prov.localidad_id === undefined) {
            alertaLocalidad.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaLocalidad.style.display = "none";
        }

        var alertaPais = document.getElementById("paisid");
        if (prov.pais_id <= 0 || prov.pais_id === undefined) {
            alertaPais.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaPais.style.display = "none";
        }

        var alertaProvincia = document.getElementById("provinciaid");
        if (prov.provincia_id <= 0 || prov.provincia_id === undefined) {
            alertaProvincia.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaProvincia.style.display = "none";
        }

        //Validaciones Input

        var regex_nombre_apellido = /^(([A-Za-z]{3,15}\s[A-Za-z]{3,15}|[A-Za-z]{3,15})|[A-Za-z]{3,15})$/;
        var nombreValido = regex_nombre_apellido.test(prov.proveedor_nombre)

        var alertaNombre = document.getElementById("prov_nombre_id");
        if (!nombreValido) {
            alertaNombre.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaNombre.style.display = "none";
        }

        var apellidoValido = regex_nombre_apellido.test(prov.proveedor_apellido)

        var alertaApellido = document.getElementById("prov_apellido_id");
        if (!apellidoValido) {
            alertaApellido.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaApellido.style.display = "none";
        }

        //Se valida que la razon social no este vacia
        var alertaRazonSocial = document.getElementById("prov_razon_id");
        if (prov.proveedor_razon_social.length <= 1) {
            alertaRazonSocial.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaRazonSocial.style.display = "none";
        }

        //Se valida que ingrese el iva
        var alertaIva = document.getElementById("prov_iva_id");
        if (prov.iva_id == 0 || prov.iva_id == undefined) {
            alertaIva.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaIva.style.display = "none";
        }

        //Se valida que el cuil sea del tipo 32243219059
        var regex_cuil = /^([0-9]){7,}$/;
        var cuilValido = regex_cuil.test(prov.proveedor_documento);

        var alertaCuil = document.getElementById("prov_cuil_id");
        if (!cuilValido) {
            alertaCuil.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaCuil.style.display = "none";
        }

        //Se valida que el telefono sea del tipo 1126118109 o 11-2611-8109
        var regex_telefono = /^((\d{10})|(\d{2}-\d{4}-\d{4}))$/;
        var telefonoValido = regex_telefono.test(prov.proveedor_telefono);

        var alertaTelefono = document.getElementById("prov_telefono_id");
        if (!telefonoValido) {
            alertaTelefono.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaTelefono.style.display = "none";
        }

        //Formato de Email del tipo usuario@gmail.com (con o sin .ar)
        var regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        var emailValido = regex_email.test(prov.proveedor_email);

        var alertaEmail = document.getElementById("prov_email_id");
        if (!emailValido) {
            alertaEmail.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaEmail.style.display = "none";
        }

        //Formato del nombre de la calle del tipo 9 de julio o comodoro rivadavia
        var regex_calle = /^(\w{1,} ?\w{1,}? ?\w{1,}?|^$)$/;
        var calleValida = regex_calle.test(prov.proveedor_calle);

        var alertaCalle = document.getElementById("prov_calle_id");
        if (!calleValida) {
            alertaCalle.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaCalle.style.display = "none";
        }

        //Formato de altura de hasta 4 digitos
        var regex_altura = /^\d{1,4}$/;
        var alturaValida = regex_altura.test(prov.proveedor_altura);

        var alertaAltura = document.getElementById("prov_altura_id");
        if (!alturaValida) {
            alertaAltura.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaAltura.style.display = "none";
        }

        //Formato de piso de hasta 2 digitos
        var regex_piso = /^\d{1,2}$/;
        var pisoValido = regex_piso.test(prov.proveedor_piso);

        var alertaPiso = document.getElementById("prov_piso_id");
        if (!pisoValido) {
            alertaPiso.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaPiso.style.display = "none";
        }

        //Formato de dpto del tipo A o B
        var regex_dpto = /^([A-Za-z]{1}|^$)/;
        var dptoValido = regex_dpto.test(prov.proveedor_dpto);

        var alertaDpto = document.getElementById("prov_dpto_id");
        if (!dptoValido) {
            alertaDpto.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaDpto.style.display = "none";
        }

        return camposValidos;
    }

    verificarProveedorEliminado = (prov) => {

        proveedoresService.verificarProveedorEliminado(prov.proveedor_documento)
            .then((res) => {
                this.setState({ proveedor_eliminado: res });
                if (this.state.proveedor_eliminado.length !== 0) {
                    let formulario = "El proveedor con CUIT/CUIL " + prov.proveedor_documento + " fué eliminado anteriormente";
                    this.setState({ formulario: formulario, mostrarFormEliminadoAntes: true, proveedor_eliminado: this.state.proveedor_eliminado });
                }
                else {
                    this.insertarProveedor(prov);
                }

            });
    }

    insertarProveedor = (prov) => {

        proveedoresService.insertarProveedor(authenticationService.currentUserValue.id, prov.proveedor_nombre, prov.proveedor_apellido, prov.proveedor_persona_fisica, prov.proveedor_razon_social, prov.proveedor_tipo_doc_id, prov.iva_id, prov.proveedor_documento, prov.proveedor_fecha_nac, prov.proveedor_telefono, prov.proveedor_email, prov.proveedor_calle, prov.proveedor_altura, prov.proveedor_piso, prov.proveedor_dpto, prov.localidad_id, prov.pais_id, prov.provincia_id)
            .then(() => {
                this.cerrarEliminarAntes();
                this.setState({ proveedores: [] });
                this.buscarProveedores(this.state.filtro);

            });
    }

    editarProveedor = (prov) => {
        proveedoresService.editarProveedor(prov.proveedor_id, prov.proveedor_nombre, prov.proveedor_apellido, prov.proveedor_persona_fisica, prov.proveedor_razon_social, prov.proveedor_tipo_doc_id, prov.iva_id, prov.proveedor_documento, prov.proveedor_fecha_nac, prov.proveedor_telefono, prov.proveedor_email, prov.proveedor_calle, prov.proveedor_altura, prov.proveedor_piso, prov.proveedor_dpto, prov.localidad_id, prov.pais_id, prov.provincia_id)
            .then(() => {
                this.cerrarForm();
                this.setState({ proveedores: [] });
                this.buscarProveedores(this.state.filtro);
            });

    };

    mostrarFormEliminar = (prov) => {
        let formulario = "Eliminar proveedor: " + prov.proveedor_razon_social;
        this.setState({ formulario: formulario, mostrarFormEliminar: true, form: prov });
    }

    eliminarProveedor = (prov) => {
        if(this.validarMotivo(prov.proveedor_motivo_eliminado)){
        proveedoresService.eliminarProveedor(prov.proveedor_id, prov.proveedor_motivo_eliminado, authenticationService.currentUserValue.id)
            .then(() => {
                this.setState({ proveedores: [] });
                this.buscarProveedores(this.state.filtro);
            });
        this.cerrarEliminar();
        } 
    }

    validarMotivo = (motivo) =>{
        var camposValidos = true;
        var regex_motivo = /^(?!\s*$).+/;
        var motivoValido = regex_motivo.test(motivo);

        var alertaMotivo = document.getElementById("cli_motivo");
        if (!motivoValido || motivo == undefined) {
            alertaMotivo.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaMotivo.style.display = "none";
        }

        return camposValidos;
    }

    mostrarForm = (proveedores) => {
        let formulario = "";
        this.buscarIvas();
        this.buscarTipoDocumentos();
       
        this.buscarPaises();
     

        if (proveedores.proveedor_id !== 0) {
            formulario = "Modificar Proveedor " + proveedores.proveedor_nro;
        }
        else {
            formulario = "Nuevo proveedor ";
            this.inicializarForm();
        }

        this.setState({ formulario: formulario, mostrarForm: true, form: proveedores });
    };

    mostrarDetalles = (proveedor) => {
        let formulario = "Detalles";
        this.setState({ formulario: formulario, mostrarDetalles: true, form: proveedor });
    }



    inicializarForm = () => {
        this.setState({
            form: {
                proveedor_nro: "",
                proveedor_id: 0,
                proveedor_nombre: "",
                proveedor_apellido: "",
                proveedor_persona_fisica: "",
                proveedor_razon_social: "",
                proveedor_tipo_doc_id: 0,
                proveedor_documento: "",
                proveedor_iva: "",
                proveedor_fecha_nac: "",
                proveedor_telefono: "",
                proveedor_email: "",
                proveedor_calle: "",
                proveedor_altura: 0,
                proveedor_piso: 0,
                proveedor_dpto: "",
                localidad_id: 0,
                provincia_id: 0,
                pais_id: 0,
                iva_id: 0,
                proveedor_motivo_eliminado: "",
                usuario_id: 0,
                proveedor_fecha_modificacion: ""
            }
        })
    }

    buscarTipoDocumentos = () => {
        proveedoresService.buscarTipoDocumentos()
            .then((res) => this.setState({
                form_combo: {
                    ...this.state.form_combo,
                    tipos_documentos: res
                }
            }));
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



    buscarIvas = () => {
        proveedoresService.buscarIvas()
            .then((res) => this.setState({
                form_combo: {
                    ...this.state.form_combo,
                    ivas: res
                }
            }));

    }


    nuevoPais = () => {
        this.setState({ mostrarFormDescripcion: true, formularioTitulo: "Nuevo Pais" })
    };

    insertarPais = () => {

        if (this.validarDescripcion(this.state.form.descripcion)) {

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

        if (this.validarDescripcion(this.state.form.descripcion)) {
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

        if (this.validarDescripcion(this.state.form.descripcion)) {
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


        if (e.target.name == "descripcion") {
            validacionService.validar(e.target, "sucursal_descripcion_id", e.target.value)
        }
        else if (e.target.name == "localidad_id") {
            validacionService.validar(e.target, "sucursal_localidad_id", e.target.value)
        }
        else if (e.target.name == "proveedor_motivo_eliminado"){
            validacionService.validarClient(e.target, "cliente_motivo_eliminado", e.target.value)
        }
        else {
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
        return rol == "Administrador" || rol == "Supervisor de ventas" || rol == "Gerente" || rol == "Administrativo";
    }

    validarNuevaLocalidad = () => {
        var alertaLocalidad = document.getElementById("localidadid");
        if (this.state.form.localidad_id != -1) {
            alertaLocalidad.style.display = "block";
        }
        else {
            alertaLocalidad.style.display = "none";
        }

    }

    validarDescripcion = (descripcion) => {

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

    validarNuevoPais = () => {
        var alertaPais = document.getElementById("paisid");
        if (this.state.form.pais_id != -1) {
            alertaPais.style.display = "block";
        }
        else {
            alertaPais.style.display = "none";
        }
    }

    validarNuevaProvincia = () => {
        var alertaProvincia = document.getElementById("provinciaid");
        if (this.state.form.provincia_id != -1) {
            alertaProvincia.style.display = "block";
        }
        else {
            alertaProvincia.style.display = "none";
        }
    }

    render() {

        const proveedores = this.state.proveedores;

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
                    <Busqueda modulo="Proveedores" search={this.buscarProveedores} />

                    <br />
                    {/*Boton agregar Nuevo Proveedor*/}
                    {this.rolAdmitido() ?
                        <FormGroup inline>
                            <Button
                                color="success"
                                onClick={() => this.mostrarForm({
                                    proveedor_nro: "",
                                    proveedor_nombre: "",
                                    proveedor_id: 0,
                                    proveedor_apellido: "",
                                    proveedor_iva: "",
                                    proveedor_genero: "",
                                    proveedor_persona_fisica: 0,
                                    proveedor_razon_social: "",
                                    proveedor_tipo_doc_id: 0,
                                    proveedor_documento: "",
                                    proveedor_fecha_nac: "",
                                    proveedor_telefono: "",
                                    proveedor_email: "",
                                    proveedor_calle: "",
                                    proveedor_altura: 0,
                                    proveedor_piso: 0,
                                    proveedor_dpto: "",
                                    localidad_id: 0,
                                    provincia_id: 0,
                                    pais_id: 0,
                                    localidad_id: 0,
                                    iva_id: 0,
                                    proveedor_motivo_eliminado: "",
                                    usuario_id: 0,
                                    proveedor_tipo_doc_descripcion: "",
                                    proveedor_fecha_modificacion: 0

                                }, "Nuevo")}
                            >
                                <Form inline>
                                    <img src={add} />
                                </Form>
                            </Button>
                            <Button id="PopoverLegacy1" type="right" color="white">
                                <img src={ayuda} className="menu_ayuda" alt='ayuda' />
                            </Button>
                            <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy1">
                                <PopoverHeader>Agregar Nuevo Proveedor </PopoverHeader>
                                <PopoverBody> Permite registrar en el sistema a los nuevos provedores del concesionario.</PopoverBody>
                                <PopoverHeader>Eliminar Proveedor </PopoverHeader>
                                <PopoverBody>Al eliminar el proveedor se requiere indicar el motivo de su inhabilitación. El mismo será utilizado para notificarlo ante un reingreso en el sistema.</PopoverBody>
                            </UncontrolledPopover>
                        </FormGroup>
                        : ""}
                    <br />

                    {/*Tabla que muestra los proveedores*/}
                    <Tabla columnas={{ proveedor_nro: "Nro Proveedor", proveedor_nombre: "Nombre", proveedor_apellido: "Apellido", proveedor_razon_social: "Razón Social", iva_descripcion: "Condición Iva", iva_tipo_factura: "Tipo", proveedor_telefono: "Telefono", proveedor_email: "Email", pais_nombre: "Pais", provincia_nombre: "Provincia", localidad_nombre: "Localidad" }}
                        datos={this.state.proveedores}
                        editar={this.rolAdmitido() ? this.mostrarForm : ""}
                        eliminar={this.rolAdmitido() ? this.mostrarFormEliminar : ""}
                        ver={this.mostrarDetalles} />
                </Container>

                <Modal isOpen={this.state.mostrarDetalles}>
                    <ModalHeader>
                        <h2 color="primary" ><i> Detalles</i></h2>
                    </ModalHeader>
                    <ModalBody>

                        <label>
                            <p><strong>  ID Fiscal: </strong> {this.state.form.proveedor_documento}</p>
                        </label>
                        <br />
                        <label>
                            <p><strong>  Persona Física: </strong>{this.state.form.proveedor_persona_fisica}</p>
                        </label>
                        <br />
                        <label>
                            <p><strong>  Calle: </strong>{this.state.form.proveedor_calle}</p>
                        </label>
                        <br />
                        <label>
                            <p><strong>  Altura: </strong>{this.state.form.proveedor_altura}</p>
                        </label>
                        <br />
                        <label>
                            <p><strong>  Piso: </strong>{this.state.form.proveedor_piso}</p>
                        </label>
                        <br />
                        <label>
                            <p><strong>  Dpto: </strong>{this.state.form.proveedor_dpto}</p>
                        </label>
                        <br />
                        <label>
                            <p><strong>  Modificado por: </strong>{this.state.form.usuario_nombre}</p>
                        </label>
                        <br />
                        <label>
                            <p><strong>  Fecha de Modificación: </strong>{this.state.form.proveedor_fecha_modificacion}</p>
                        </label>

                    </ModalBody>
                    <ModalFooter>

                        <Button
                            color="danger"
                            onClick={() => this.cerrarDetalles()}
                        >
                            <img src={cancel} />
                        </Button>
                    </ModalFooter>

                </Modal>

                {/*Form Eliminar*/}
                <Modal isOpen={this.state.mostrarFormEliminar}>

                    <ModalHeader >

                        <h3 color="primary" ><img src={advertencia} /> {this.state.formulario} </h3>
                    </ModalHeader>

                    <br />
                    <ModalBody>

                        <FormGroup>
                            <div><Label><b> Debe ingresar un motivo:</b></Label></div>
                            <Input name="proveedor_motivo_eliminado" type="textarea" onChange={this.handleChange} />
                        </FormGroup>
                        <p id="cli_motivo"> Motivo inválido</p>
                    </ModalBody>
                    <ModalFooter>

                        <Button
                            color="primary"
                            onClick={() => this.eliminarProveedor(this.state.form)}
                        >
                            <img src={ok} />
                        </Button>

                        <Button
                            color="danger"
                            onClick={() => this.cerrarEliminar()}
                        >
                            <img src={cancel} />
                        </Button>

                    </ModalFooter>

                </Modal>

                {/*Form Eliminado Antes*/}
                <Modal isOpen={this.state.mostrarFormEliminadoAntes}>

                    <ModalHeader >
                        <h3 color="primary" > {this.state.formulario} </h3>
                    </ModalHeader>

                    <br />
                    <ModalBody>
                        <Container>
                            <label>
                                <strong>Fué Eliminado por: </strong>
                                {
                                    this.state.proveedor_eliminado.map(proveedor => {
                                        return (
                                            <option > {proveedor.usuario_nombre} </option>

                                        )
                                    })
                                }
                            </label>

                            <br />
                            <label>
                                <strong>En la fecha: </strong>
                                {
                                    this.state.proveedor_eliminado.map(proveedor => {
                                        return (
                                            <option >{proveedor.fecha_modificacion}</option>

                                        )
                                    })
                                }
                            </label>
                            <br />
                            <label>
                                <strong>Email: : </strong>
                                {
                                    this.state.proveedor_eliminado.map(proveedor => {
                                        return (
                                            <option > {proveedor.usuario_email} </option>

                                        )
                                    })
                                }
                            </label>
                            <br />


                            <label>
                                <strong>El usuario se encuentra: </strong>
                                {
                                    this.state.proveedor_eliminado.map(proveedor => {
                                        return (
                                            <option >{proveedor.usuario_estado}</option>

                                        )
                                    })
                                }
                            </label>


                            <br />
                            <label>
                                <strong>Con motivo: </strong>
                                {
                                    this.state.proveedor_eliminado.map(proveedor => {
                                        return (
                                            <option >{proveedor.motivo_eliminado}</option>
                                        )
                                    })
                                }
                            </label>

                            <br />



                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <label>
                            <strong>¿Desea volverlo a cargar? </strong>
                        </label>
                        <Button
                            color="primary"
                            onClick={() => this.insertarProveedor(this.state.form)}
                        >SI
                            <img src={ok} />
                        </Button>

                        <Button
                            color="danger"
                            onClick={() => this.cerrarEliminarAntes()}
                        >NO
                            <img src={cancel} />
                        </Button>

                    </ModalFooter>

                </Modal>


                {/* Formulario Insertar/editar */}
                <Modal size="xl" isOpen={this.state.mostrarForm}>

                    <ModalHeader>
                        <div><h3>{this.state.formulario}</h3></div>
                    </ModalHeader>

                    {/* Formulario Insertar/editar */}
                    <ModalBody>

                        {/* Nombre */}
                        <FormGroup inline>
                            <Row>
                                <Col>
                                    <label>
                                        Nombre: *
                            </label>
                                    <input
                                        className="form-control"
                                        name="proveedor_nombre"
                                        value={this.state.form.proveedor_nombre}
                                        type="text"
                                        placeholder="Nombre"
                                        onChange={this.handleChange}
                                    />
                                    <p id="prov_nombre_id">Nombre inválido (Ej: Fernando)</p>
                                    {/* Apellido */}
                                </Col>
                                <Col>
                                    <label>
                                        Apellido: *
                            </label>
                                    <input
                                        className="form-control"
                                        name="proveedor_apellido"
                                        value={this.state.form.proveedor_apellido}
                                        type="text"
                                        placeholder="Apellido"
                                        onChange={this.handleChange}
                                    />
                                    <p id="prov_apellido_id">Apellido inválido (Ej: Alvarez)</p>
                                </Col>
                                {/* Persona Física */}
                                <Col>
                                    <label>
                                        Persona Física: *
                            </label>

                                    <Input
                                        name="proveedor_persona_fisica"
                                        type="select"
                                        value={this.state.form.proveedor_persona_fisica}
                                        onChange={this.handleChange}
                                    >

                                        {
                                            this.state.form_combo.persona_fisica.map(proveedor_persona_fisica => {
                                                return (
                                                    <option value={proveedor_persona_fisica} >{proveedor_persona_fisica}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    {/* Razón Social */}
                                    <label>
                                        Razón Social: *
                            </label>
                                    <input
                                        className="form-control"
                                        name="proveedor_razon_social"
                                        value={this.state.form.proveedor_razon_social}
                                        type="text"
                                        placeholder="Ingrese la razón social"
                                        onChange={this.handleChange}
                                    />
                                    <p id="prov_razon_id">Razón Social inválida (Ej: Filtros SA)</p>
                                </Col>
                                {/* Documento */}
                                <Col>
                                    <label>
                                        ID Fiscal: *
                            </label>
                                    <input
                                        className="form-control"
                                        name="proveedor_documento"
                                        value={this.state.form.proveedor_documento}
                                        type="text"
                                        placeholder="Ingrese el ID Fiscal"
                                        onChange={this.handleChange}
                                    />
                                    <p id="prov_cuil_id">ID Fiscal inválido (Ej: 23243219059)</p>
                                </Col>
                                <Col>
                                    {/* Localidad */}
                                    <label>
                                        Condición Iva: *
                            </label>

                                    <Input
                                        name="iva_id"
                                        type="select"
                                        value={this.state.form.iva_id}
                                        onChange={this.handleChange}
                                    >
                                        <option value="">Seleccione Tipo de Factura</option>
                                        {
                                            this.state.form_combo.ivas.map(iva => {
                                                return (
                                                    <option value={iva.id} >{iva.descripcion + " ( " + iva.tipo_factura + " )"}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                    <p id="prov_iva_id">Seleccione el tipo de factura</p>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    {/* Telefono */}
                                    <label>
                                        Teléfono: *
                            </label>
                                    <input
                                        className="form-control"
                                        name="proveedor_telefono"
                                        value={this.state.form.proveedor_telefono}
                                        type="text"
                                        placeholder="Ingrese un Teléfono"
                                        onChange={this.handleChange}
                                    />
                                    <p id="prov_telefono_id">Teléfono inválido (Ej: 1133381643)</p>
                                </Col>
                                <Col>
                                    {/* Email */}
                                    <label>
                                        Email: *
                            </label>
                                    <input
                                        className="form-control"
                                        name="proveedor_email"
                                        value={this.state.form.proveedor_email}
                                        type="text"
                                        placeholder="Ingrese un Email"
                                        onChange={this.handleChange}
                                    />
                                    <p id="prov_email_id">Email inválido (Ej: repuestos@autoz.com.ar)</p>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col >
                                    {/* Calle */}
                                    <label>
                                        Calle:
                            </label>
                                    <input
                                        className="form-control"
                                        name="proveedor_calle"
                                        value={this.state.form.proveedor_calle}
                                        type="text"
                                        placeholder="Ingrese la Calle"
                                        onChange={this.handleChange}
                                    />
                                    <p id="prov_calle_id">Calle inválida (Ej: 9 de Julio)</p>
                                </Col>
                                {/* Altura */}
                                <Col xs="2">
                                    <label>
                                        Altura:
                            </label>
                                    <input
                                        className="form-control"
                                        name="proveedor_altura"
                                        value={this.state.form.proveedor_altura}
                                        type="number"
                                        placeholder="Ingrese la Altura"
                                        onChange={this.handleChange}
                                    />
                                    <p id="prov_altura_id">Altura inválida (Ej: 1900)</p>
                                </Col>

                                <br />

                                <Col xs="2">
                                    {/* Piso */}
                                    <label>
                                        Piso:
                            </label>
                                    <input
                                        className="form-control"
                                        name="proveedor_piso"
                                        value={this.state.form.proveedor_piso}
                                        type="number"
                                        placeholder="Ingrese el Piso"
                                        onChange={this.handleChange}
                                    />
                                    <p id="prov_piso_id">Piso inválido (Ej: 5)</p>
                                </Col>
                                <Col xs="2">
                                    {/* Departamento */}
                                    <label>
                                        Dpto:
                            </label>
                                    <input
                                        className="form-control"
                                        name="proveedor_dpto"
                                        value={this.state.form.proveedor_dpto}
                                        type="text"
                                        placeholder="Dpto"
                                        onChange={this.handleChange}
                                    />
                                    <p id="prov_dpto_id">Dpto inválido (Ej: B)</p>
                                </Col>

                            </Row>

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
                        </FormGroup>

                        <p >(*) Campos Obligatorios</p>

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
export { Proveedor };