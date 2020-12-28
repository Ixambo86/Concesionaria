import React, { Component } from "react";
import Axios from "axios";
import { Busqueda } from '../../components/Busqueda/Busqueda'
import { Tabla } from '../../components/Tabla'
import add from "../../image/add24.png"
import ok from "../../image/accept24.png"
import cancel from "../../image/cancel24.png"
import ayuda from '../../image/informacion.png'
import { documentacionService } from '../../_services/documentacion.services';
import { authenticationService } from '../../_services/authentication.service';
import { validacionService } from '../../_services/validacion.services';
import "./Documentacion.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Row,
    Col,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
    Form,
    Input,
    UncontrolledPopover,PopoverHeader, PopoverBody
} from "reactstrap";

class Documentacion extends Component {

    state = {
        modulo: "",
        filtro: "",
        documentos: [],
        formulario: "",
        mostrarDetalles: false,
        form: {
            id: 0,
            descripcion: "",
            fecha_desde: new Date(),
            fecha_hasta: null,
            fecha_desde_str:"Sin definir",
            fecha_hasta_str:"Sin definir",
            exigido_a: "TODOS"
        }
    };

    componentDidMount() { // se ejecuta al inicio
        this.buscarDocumentos(this.state.filtro);
    }

    
    cerrarForm = () => {
        this.setState({ formulario: ""});
    };

    buscarDocumentos = query => {
        documentacionService.buscarDocumentos(query)
            .then((res) => this.setState({ documentos: res, filtro: query }));
    }

    confirmar = (documento) => {
        console.log(documento)
        if(this.validar(documento))
        {
            if (documento.id === 0) {
                this.insertarDocumento(documento);
                console.log("insertar");
                
            }
            else {
                this.actualizarDocumento(documento);
                console.log("editar");
                
            }
        }
    }

    validar = (documento) => {
        var camposValidos = true;

        var regex_descripcion = /^(?!\s*$).+/;
        var descripcionValida = regex_descripcion.test(documento.descripcion);
        var alertaDescripcion = document.getElementById("descripcionid");
            
        if(!descripcionValida || documento.descripcion == undefined){
            alertaDescripcion.style.display = "block";
            camposValidos = false;
        }
        else{
            alertaDescripcion.style.display = "none";
        }

        var alertaFecha = document.getElementById("vigentedesdeid")
        if (documento.fecha_desde <= '1900-01-01' || documento.fecha_desde == undefined || documento.fecha_desde == null) {
            alertaFecha.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaFecha.style.display = "none";
        }

        return camposValidos;        
    }
        
    

    actualizarDocumento = (documento) => {
        documentacionService.actualizarDocumento(documento, authenticationService.currentUserValue.id)
            .then(() => {
                this.cerrarForm();
                this.buscarDocumentos(this.state.filtro);
            });

    };

    eliminarDocumento = (documento) => {
      
        var opcion = window.confirm("Estás Seguro que deseas eliminar el documento " + documento.descripcion);
        if (opcion === true){
          
          documentacionService.eliminarDocumento(documento.id, authenticationService.currentUserValue.id)
            .then(() => {
                this.setState({ documentos: [] });
                this.buscarDocumentos(this.state.filtro);
            });
        }

      
    }

    insertarDocumento = (documento) => {
      documentacionService.insertarDocumento(documento, authenticationService.currentUserValue.id)
            .then(() => {
                this.cerrarForm();
                this.setState({ documentos: [] });
                this.buscarDocumentos(this.state.filtro);

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

    mostrarForm = (documento, titulo) => {
        this.setState({ formulario: titulo, form: documento})       
    }

    rolAdmitido(){
       var rol = authenticationService.currentUserValue.role;
       return rol == "Administrador" || rol == "Supervisor de ventas" || rol == "Gerente";
    } 

    nuevoDocumento = () =>{
        this.mostrarForm( {
            id: 0,
            descripcion: "",
            fecha_desde: null,
            fecha_hasta: null,
            fecha_desde_str:"Sin definir",
            fecha_hasta_str:"Sin definir",
            exigido_a: "Todos"
        }, "Nuevo Documento")
    }

    editarDocumento = (documento) =>{
        console.log(documento)
        this.mostrarForm( documento, "Modificar Documento")
    }

    toDate = (stringDate) => {
        
        return stringDate ? 
            stringDate.toString().substr(6, 4) + "-" + stringDate.toString().substr(3, 2) + "-" + stringDate.toString().substr(0, 2)
            : ""
    }

    rolAdmitido(){
        var rol = authenticationService.currentUserValue.role;
        return rol == "Administrador" || rol == "Gerente" || rol == "Supervisor de ventas";
    }

    render() {
        const documentos = this.state.documentos;
        return (
            <>
                <Container >
                    
                    {/*Barra de busqueda*/}
                    <Busqueda modulo="Documentación" search={this.buscarDocumentos} />

                    <br />
                    {/*Boton agregar Nuevo Marca*/}
                    {this.rolAdmitido()?
                    <FormGroup inline>                     
                        
                            <Button
                            color="success"
                            onClick={() => this.nuevoDocumento()}
                        >
                            <Form inline>
                                <img src={add} />
                            </Form>
                        </Button>                                        
                        <Button id="PopoverLegacy1" type="right" color="white"> 
                     <img src={ayuda} className = "menu_ayuda" alt='ayuda'/> 
              </Button>
              <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy1">
                    <PopoverHeader>Agregar Documentos Solicitantes </PopoverHeader>
                    <PopoverBody> Permite agregar la documentación que debe ser solicitada para la entrega de automotores nacionales e importados.</PopoverBody>
                   </UncontrolledPopover>
                        </FormGroup>
                        :""}
                    <br />


         
                    <Tabla columnas={{ descripcion: "Descripcion", exigido_a:"Exigido a", fecha_desde_str: "Vigente desde", fecha_hasta_str: "Vigente hasta"}}
                        datos={this.state.documentos} 
                        editar={this.rolAdmitido()? this.editarDocumento : ""} 
                        eliminar={this.rolAdmitido()? this.eliminarDocumento : ""} />
                </Container>

                {/* Formulario Insertar/editar */}
                <Modal isOpen={this.state.formulario !== ""}>

                    <ModalHeader>
                        <div><h3>{this.state.formulario}</h3></div>
                    </ModalHeader>

                    <ModalBody>

                        <Row>
                            <Col>
                            <label>
                                Descripción: *
                            </label>
                            <Input
                                name="descripcion"
                                value={this.state.form.descripcion}
                                type="text"
                                placeholder="Ingrese la descripción"
                                onChange={this.handleChange}
                            />                            
                            <p id="descripcionid"> Descripción inválida </p>
                            </Col>
                            <Col>
                            <label>
                                Exigido a: *
                            </label>
                            <Input
                                name="exigido_a"
                                value={this.state.form.exigido_a}
                                type="select"
                                onChange={this.handleChange}
                            >
                                <option value="Todos">Todos</option>
                                <option value="Nacionales">Nacionales</option>
                                <option value="Importados">Importados</option>
                            </Input>                            
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <label>
                                Vigente desde: *
                            </label>
                            <Input
                                name="fecha_desde"
                                value={this.state.form.fecha_desde}
                                type="date"
                                onChange={this.handleChange}
                            />                  
                            <p id="vigentedesdeid">Seleccione una Fecha</p>
                            </Col>
                            <Col>
                            <label>
                                Vigente hasta: 
                            </label>
                            <Input
                                name="fecha_hasta"
                                value={this.state.form.fecha_hasta}
                                type="date"
                                onChange={this.handleChange}
                            />                              
                            </Col>
                        </Row>
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
export { Documentacion };

