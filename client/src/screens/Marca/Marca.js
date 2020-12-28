import React, { Component } from "react";
import Axios from "axios";
import { Busqueda } from '../../components/Busqueda/Busqueda'
import { Tabla } from '../../components/Tabla'
import add from "../../image/add24.png"
import ok from "../../image/accept24.png"
import cancel from "../../image/cancel24.png"
import { marcaService } from '../../_services/marcas.services';
import { authenticationService } from '../../_services/authentication.service';
import { validacionService } from '../../_services/validacion.services';
import "./Marca.css";
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
    InputGroup,
    InputGroupAddon,
    UncontrolledCollapse
} from "reactstrap";

class Marca extends Component {

    state = {
        modulo: "",
        filtro: "",
        formulario: "",
        marcas: [],
        marcasyModelos: [],
        formulario: "",
        mostrarForm: false,
        mostrarDetalles: false,
        form: {
            marca_descripcion: "",
            marca_id: 0,
            modelo_descripcion: "",
            modelo_id: 0,
            fecha_modificacion: ""
        },
        form_combo: {
           
        },

    };

    componentDidMount() { // se ejecuta al inicio
        this.buscarMarcas(this.state.filtro);
    }

    cerrarForm = () => {
        this.setState({ mostrarForm: false });
    };

    buscarMarcas = query => {
        marcaService.buscarMarcas(query)
            .then((res) => this.setState({ marcas: res, filtro: query }));
    }

    confirmar = (marc) => {
        
        if(this.validar(marc))
        {
            if (marc.marca_id === 0) {
                this.insertarMarca(marc);
                console.log("insertar");
                
            }
            else {
                this.editarMarca(marc);
                console.log("editar");
                
            }
        }
    }

    validar = (marc) => {
        var camposValidos = true;
        
        if (!(marc.descripcion === undefined))
        {
            var regex_descripcion = /^(?!\s*$).+/;
            var descripcionValida = regex_descripcion.test(marc.descripcion);
            var alertaDescripcion = document.getElementById("descripcionid");
            
            if(!descripcionValida ){
                alertaDescripcion.style.display = "block";
                camposValidos = false;
            }
            else{
                alertaDescripcion.style.display = "none";
            }

            return camposValidos;
        }
        else{
            var alertaDescripcion = document.getElementById("descripcionid");
            alertaDescripcion.style.display = "block";
            
            return camposValidos = false;
        }
        
    }

    editarMarca = (marc) => {
      marcaService.editarMarca(marc.id, authenticationService.currentUserValue.id, marc.descripcion)
            .then(() => {
                this.cerrarForm();
                this.setState({ marcas: [] });
                this.buscarMarcas(this.state.filtro);
            });

    };

    eliminarMarca = (marc) => {
      
        var opcion = window.confirm("Estás Seguro que deseas eliminar la marca " + marc.descripcion);
        if (opcion === true){
          
          marcaService.eliminarMarca(marc.id)
            .then(() => {
                this.setState({ marcas: [] });
                this.buscarMarcas(this.state.filtro);
            });
        }

      
    }

    insertarMarca = (marc) => {
      console.log("Estoy en eliminarservicio");
      marcaService.insertarMarca(authenticationService.currentUserValue.id,  marc.descripcion)
            .then(() => {
                this.cerrarForm();
                this.setState({ marcas: [] });
                this.buscarMarcas(this.state.filtro);

            });
    }

    handleChange = (e) => {

        validacionService.validar(e.target,e.target.name,e.target.value);

        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    };

    mostrarForm = (marcas) => {

        let formulario = "";

        this.buscarMarcas();

        if (marcas.marca_id !== 0) {
            formulario = "Modificar Marca " + marcas.descripcion;
        }
        else {
            formulario = "Nueva Marca ";
            this.inicializarForm();

        }

        this.setState({ formulario: formulario, mostrarForm: true, form: marcas });
    }
    

    inicializarForm = () => {
        this.setState({
            form: {
                marca_descripcion: "",
                marca_id: 0,
                modelo_descripcion: "",
                modelo_id: 0,
                fecha_modificacion: ""
            }
        })
    }

    rolAdmitido(){
       var rol = authenticationService.currentUserValue.role;
       return rol == "Administrador" || rol == "Supervisor de ventas" || rol == "Gerente";
    } 


    render() {
        const marcas = this.state.marcas;
        return (
            <>
                <Container hidden={this.props.visible}>
                    
                    {/*Barra de busqueda*/}
                    <Busqueda modulo="Marcas" search={this.buscarMarcas} />

                    <br />
                    {/*Boton agregar Nuevo Marca*/}
                    {this.rolAdmitido()?
                    <FormGroup inline>
                        
                        
                            <Button
                            color="success"
                            onClick={() => this.mostrarForm({
                                marca_descripcion: "",
                                marca_id: 0,
                                modelo_descripcion: "",
                                modelo_id: 0,
                                fecha_modificacion: ""
                            }, "Nuevo")}
                        >
                            <Form inline>
                                <img src={add} />
                            </Form>
                        </Button>
                                         
                     
                        </FormGroup>
                        :""}
                    <br />


                    {/*Tabla que muestra los marcas*/}
                    <Tabla columnas={{ descripcion: "Descripcion"}}
                        datos={this.state.marcas} 
                        editar={this.rolAdmitido()? this.mostrarForm : ""} 
                        eliminar={this.rolAdmitido()? this.eliminarMarca : ""} />
                </Container>

                {/* Formulario Insertar/editar */}
                <Modal isOpen={this.state.mostrarForm}>

                    <ModalHeader>
                        <div><h3>{this.state.formulario}</h3></div>
                    </ModalHeader>

                    {/* Formulario Insertar/editar */}
                    <ModalBody>

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
export { Marca };

