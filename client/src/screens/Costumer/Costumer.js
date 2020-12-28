import React, { Component } from "react";
import { Tabla } from '../../components/Tabla'
import ok from "../../image/accept24.png"
import cancel from "../../image/cancel24.png"
import { costumerService } from '../../_services/costumer.services';

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Alert} from "reactstrap";
import "./Customer.css";
import warning from '../../image/warning24.png'

class Costumer extends Component{
  
  state = {
    costumers:[],
    mostrarForm: false,
    form: {
        tipo:"",
        asunto: "",
        titulo: "",
        mensaje: "",
        frecuencia:""
    },
    costum: ""
    };

    componentDidMount() {
        this.buscarCostumers();
    }

    cerrarForm = () => {
        this.setState({ mostrarForm: false });
    };

    buscarCostumers = () => {
    costumerService.buscarCostumers()
        .then((res) => {
            console.log(res);
            this.setState({costumers: res});
        });
    }

    editar = (msj) => {
        console.log(msj)
        if(this.camposValidos(msj)){
        costumerService.editarMsj(msj.id, msj.asunto, msj.titulo, msj.mensaje)
             .then(() => {
                 this.cerrarForm();
                 this.setState({ costumers: [] });
                 this.buscarCostumers();
             });
        }     
    };

    camposValidos = (msj) => {
        var camposValidos = true;
        var regex_campos = /^(?!\s*$).+/;

        //Validación del Asunto
        var asuntoValido = regex_campos.test(msj.asunto)
        var alertaAsunto = document.getElementById("msj_asunto_id");
        if (!asuntoValido || msj.asunto == undefined) {
            alertaAsunto.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaAsunto.style.display = "none";
        }

        //Validación del Titulo
        var tituloValido = regex_campos.test(msj.titulo)
        var alertaTitulo = document.getElementById("msj_titulo_id");
        if (!tituloValido || msj.titulo == undefined) {
            alertaTitulo.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaTitulo.style.display = "none";
        }

        //Validación del Mensaje
        var mensajeValido = regex_campos.test(msj.mensaje)
        var alertaMensaje = document.getElementById("msj_mensaje_id");
        if (!mensajeValido || msj.mensaje == undefined) {
            alertaMensaje.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaMensaje.style.display = "none";
        }

        return camposValidos;
    }

    handleChange = (e) => {
//        validacionService.validar(e.target,e.target.name,e.target.value);
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    };

    mostrarForm = (modelo) => {
         this.setState({ mostrarForm: true, form: modelo, costum: modelo.tipo});
    };

    render() {

        const mensajes = this.state.costumers;
        return (
            <>
                <Container hidden={this.props.visible}>
                    <div className='fondoCost'>
                        <h2 className= 'costum'><b>Costumer Journy</b></h2>
                    </div>
                    <br/>
                    <Tabla columnas={{ tipo: "Tipo", asunto: "Asunto Email", titulo: "Titulo mensaje", mensaje: "Cuerpo mensaje" }}
                        datos={mensajes} editar={this.mostrarForm} />
                </Container>
                <Modal isOpen={this.state.mostrarForm}>

                    <ModalHeader>
                        <div><h3>{"Editar Costumer Journy: '"}{this.state.costum + "'"}</h3></div>
                    </ModalHeader>
                    <ModalBody>
                    <FormGroup inline>
                        <label>Asunto: *</label>
                        <input className="form-control" placeholder="Ingrese Asunto"
                            name="asunto" value={this.state.form.asunto} type="text" onChange={this.handleChange}/>
                        <p id= "msj_asunto_id"> Asunto inválido </p>
                        <label>Titulo: *</label>
                        <input className="form-control"
                            name="titulo" value={this.state.form.titulo} type="text" onChange={this.handleChange}/>
                        <p id= "msj_titulo_id"> Titulo inválido </p>
                        <label>Mensaje: *</label>
                        <textarea className="form-control" rows="10"
                            name="mensaje" value={this.state.form.mensaje} type="text" onChange={this.handleChange}/>
                        <p id= "msj_mensaje_id"> Mensaje inválido </p>
                    
                    </FormGroup>
                    <Alert className='alertcost' size="sm" color="warning" hidden={false}>
                    {this.state.form.frecuencia}</Alert>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.editar(this.state.form)}><img src={ok} /></Button>
                            <Button color="danger" onClick={() => this.cerrarForm()}> <img src={cancel} /></Button>
                        </ModalFooter>
                        <p > (*) Campos Obligatorios </p>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}
export { Costumer };