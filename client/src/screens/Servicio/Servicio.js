import React, { Component } from "react";
import Axios from "axios";
import { Busqueda } from '../../components/Busqueda/Busqueda'
import { Tabla } from './TablaProducto'
import add from "../../image/add24.png"
import { FormDescripcion } from "../../components/FormCategoria";
import ok from "../../image/accept24.png"
import cancel from "../../image/cancel24.png"
import { servicioService } from '../../_services/servicios.services';
import { authenticationService } from '../../_services/authentication.service';
import { productosService } from '../../_services/productos.service'
import "bootstrap/dist/css/bootstrap.min.css";

import "./Servicio.css";
import { validacionService } from "../../_services/validacion.services";

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
    InputGroup,
    InputGroupAddon,
    UncontrolledCollapse
} from "reactstrap";

class Servicio extends Component {

    state = {
        modulo: "",
        filtro: "",
        formulario: "",
        servicios: [],
        formulario: "",
        mostrarForm: false,
        mostrarDetalles: false,
        form: {
            codigo: "",
            categoria_id: 0,
            categoria: "",
            descripcion: "",
            precio: 0,
            cantidad_modulos: 0,
            id: 0,
            fecha_modificacion: ""
        },
        form_combo: {
            categorias: [],
        },

    };

    componentDidMount() { // se ejecuta al inicio
        this.buscarServicios2(this.state.filtro);
    }

    cerrarForm = () => {
        this.setState({ mostrarForm: false });
    };

    cerrarDetalles = () => {
        this.setState({ mostrarDetalles: false });
    };

    mostrarDetalles = (servicios) => {
        let formulario = "Detalles";
        this.setState({ formulario: formulario, mostrarDetalles: true, form: servicios });
    }

    buscarServicios2 = query => {
        servicioService.buscarServicios2(query)
            .then((res) => this.setState({ servicios: res, filtro: query }));
    }

    buscarCategorias = () => {
        servicioService.buscarCategorias()
            .then((res) => this.setState({
                form_combo: {
                    ...this.state.form_combo,
                    categorias: res
                }
            }));
    }
    confirmar = (serv) => {

        if (this.validar(serv)) {
            if (serv.id === 0) {
                this.insertarServicio(serv);
                console.log("insertar");

            }
            else {
                this.editarServicio(serv);
                console.log("editar");

            }
        }
    }

    validar = (serv) => {
        var camposValidos = true;

        //Categoria
        var alertaCategoria = document.getElementById("categoriaid");
        if (serv.categoria_id == 0) {
            alertaCategoria.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaCategoria.style.display = "none";
        }

        //Descripcion
        var regex_descripcion = /^(?!\s*$).+/;
        var descripcionValida = regex_descripcion.test(serv.descripcion);
        var alertaDescripcion = document.getElementById("descripcionid");
        if (!descripcionValida) {
            alertaDescripcion.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaDescripcion.style.display = "none";
        }

        //Precio
        var regex_precio = /^\d{1,9}$/;
        var precioValido = regex_precio.test(serv.precio);
        var alertaPrecio = document.getElementById("precioid");
        if (!precioValido) {
            alertaPrecio.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaPrecio.style.display = "none";
        }

        //Modulos
        var regex_modulos = /^[1-9]$/;
        var modulosValidos = regex_modulos.test(serv.cantidad_modulos);
        var alertaModulos = document.getElementById("modulosid");
        if (!modulosValidos) {
            alertaModulos.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaModulos.style.display = "none";
        }


        return camposValidos;
    }

    editarServicio = (serv) => {
        servicioService.editarServicio(serv.id, authenticationService.currentUserValue.id, serv.categoria_id, serv.descripcion, serv.precio, serv.cantidad_modulos)
            .then(() => {
                this.cerrarForm();
                this.setState({ servicios: [] });
                this.buscarServicios2(this.state.filtro);
            });

    };
    eliminarServicio = (serv) => {
        var opcion = window.confirm("Estás Seguro que deseas eliminar el Servicio " + serv.codigo);
        if (opcion === true) {
            servicioService.eliminarServicio(serv.id)
                .then(() => {
                    this.setState({ servicios: [] });
                    this.buscarServicios2(this.state.filtro);
                });
        }
    }

    insertarServicio = (serv) => {
        servicioService.insertarServicio(authenticationService.currentUserValue.id, serv.categoria_id, serv.descripcion, serv.precio, serv.cantidad_modulos)
            .then(() => {
                this.cerrarForm();
                this.setState({ servicios: [] });
                this.buscarServicios2(this.state.filtro);

            });
    }
    cerrarFormDescripcion = () => {
        this.setState({ formularioTitulo: "", mostrarComboMarcas: false, });

    }
    handleChange = (e) => {

        validacionService.validar(e.target, e.target.name, e.target.value);
        /*
                if (e.target.name === "categoria_id") {
                    this.buscarCategorias()
                }
        */
        if (e.target.name === "categoria_id") {
            if (e.target.value === "-1") {
                this.nuevaCategoria()
                this.buscarCategorias()
            }
        }

        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    };

    mostrarForm = (servicios) => {

        let formulario = "";

        this.buscarCategorias();

        if (servicios.categoria_id !== 0) {
            formulario = "Modificar Producto " + servicios.codigo;
        }
        else {
            formulario = "Nuevo Servicio ";
            this.inicializarForm();

        }

        this.setState({ formulario: formulario, mostrarForm: true, form: servicios });

    };

    nuevaCategoria = () => {
        console.log("nuevoCategoria");
        this.setState({ mostrarFormDescripcion: true, formularioTitulo: "Nueva Categoria" })
    };

    insertarCategoria = () => {
        servicioService.insertarCategoria(authenticationService.currentUserValue.id, this.state.form.descripcion2)
            .then((res) => {
                this.cerrarFormDescripcion();
                this.setState({
                    form: { ...this.state.form, categoria_id: res.insertId }
                })
                this.buscarCategorias();
            });
    }

    inicializarForm = () => {
        this.setState({
            form: {
                codigo: "",
                categoria_id: 0,
                descripcion: "",
                precio: 0,
                cantidad_modulos: 0,
                categoria: "",
                id: 0,
                fecha_modificacion: ""
            }
        })
    }

    rolAdmitido() {
        var rol = authenticationService.currentUserValue.role;
        return rol == "Administrador" || rol == "Supervisor de ventas" || rol == "Gerente" || rol == "Administrativo";
    }


    render() {

        const servicios = this.state.servicios;
        console.log(this.state);
        console.log(servicios);
        return (
            <>
                <Container hidden={this.state.formularioTitulo !== "Nueva Categoria"}>
                    <FormDescripcion
                        visible={this.state.formularioTitulo === "Nueva Categoria"}
                        titulo={this.state.formularioTitulo}
                        confirmar={this.insertarCategoria}
                        handleChange={this.handleChange}
                        cerrar={this.cerrarFormDescripcion}
                        categoria={this.state.form.categoria}
                    >
                    </FormDescripcion>
                </Container>
                <Container hidden={this.props.visible}>

                    {/*Barra de busqueda*/}
                    <Busqueda modulo="Servicios" search={this.buscarServicios2} />

                    <br />
                    {/*Boton agregar Nuevo Servicio*/}
                    {this.rolAdmitido() ?
                        <Form inline>
                            <Button
                                color="success"
                                onClick={() => this.mostrarForm({
                                    codigo: "",
                                    categoria_id: 0,
                                    descripcion: "",
                                    precio: 0,
                                    cantidad_modulos: 0,
                                    categoria: "",
                                    id: 0,
                                    fecha_modificacion: ""
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
                    <Tabla columnas={{ codigo: "Codigo", categoria_descripcion: "Categoria", descripcion: "Descripción", precio: "Importe (ARS)", cantidad_modulos: "Cant. Modulos, " }}
                        datos={this.state.servicios}
                        editar={this.rolAdmitido() ? this.mostrarForm : ""}
                        eliminar={this.rolAdmitido() ? this.eliminarServicio : ""}
                        ver={this.mostrarDetalles} />
                </Container>
                <Modal isOpen={this.state.mostrarDetalles}>
                    <ModalHeader>
                        <h2 color="primary" ><i> Detalles</i></h2>
                    </ModalHeader>
                    <ModalBody>

                        <label>
                            <p><strong>  Modificado por:  </strong>{this.state.form.usuario_nombre}</p>
                        </label>
                        <br />
                        <label>
                            <p><strong>  Fecha de Modificación: </strong>{this.state.form.fecha_modificacion}</p>
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

                {/* Formulario Insertar/editar */}
                <Modal isOpen={this.state.mostrarForm}>

                    <ModalHeader>
                        <div><h3>{this.state.formulario}</h3></div>
                    </ModalHeader>

                    {/* Formulario Insertar/editar */}
                    <ModalBody>

                        {/* Categoría*/}
                        <label>
                            Categoría: *
                            </label>

                        <Input
                            name="categoria_id"
                            type="select"
                            value={this.state.form.categoria_id}
                            onChange={this.handleChange}
                        >
                            <option value="">Seleccione Categoria</option>
                            {
                                this.state.form_combo.categorias.map(categoria => {
                                    return (
                                        <option value={categoria.id} >{categoria.descripcion}</option>
                                    )
                                })
                            }
                            <option value="-1"> (+) Agregar Nuevo categoria</option>
                        </Input>
                        <p id="categoriaid"> Seleccione una Categoria </p>

                        {/* Descipcion */}
                        <FormGroup inline>
                            <label>
                                Descripción: *
                            </label>
                            <input
                                className="form-control"
                                name="descripcion"
                                value={this.state.form.descripcion}
                                type="text"
                                placeholder="Ingrese la descripción"
                                onChange={this.handleChange}
                            />
                            <p id="descripcionid"> Descripción inválida </p>

                            <label>
                                Precio (ARS):
                            </label>
                            <input
                                className="form-control"
                                name="precio"
                                value={this.state.form.precio}
                                type="number"
                                placeholder="Ingrese el precio"
                                onChange={this.handleChange}
                            />
                            <p id="precioid"> Precio inválido </p>

                            <label>
                                Cantidad de módulos: *
                            </label>
                            <input
                                className="form-control"
                                name="cantidad_modulos"
                                value={this.state.form.cantidad_modulos}
                                type="number"
                                placeholder="Ingrese el cantidad de modulos"
                                onChange={this.handleChange}
                            />
                            <p id="modulosid"> Cantidad inválida (Ej: 2) </p>

                        </FormGroup>
                        <p>(*) Campos Obligatorios</p>
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
export { Servicio };
