import React, { Component } from "react";
import { Busqueda } from '../../components/Busqueda/Busqueda'
import { Tabla } from '../../components/Tabla'
import add from "../../image/add24.png"
import ok from "../../image/accept24.png"
import cancel from "../../image/cancel24.png"
import { modeloService } from '../../_services/modelos.services.js';
import { authenticationService } from '../../_services/authentication.service';
import { validacionService } from '../../_services/validacion.services';
import "./Modelo.css";

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


class Modelo extends Component{
  
  state = {
    modulo: "",
    filtro: "",
    formulario: "",
    modelos:[],
    formulario: "",
    mostrarForm: false,
    mostrarDetalles: false,
    form: {
        modelo_marca_id:"",
        marca_descripcion: "",
        marca_id: 0,
        modelo_descripcion: "",
        modelo_id: 0,
        fecha_modificacion: "",
        usuario_id: "",
        usuario_nombre:""
    },
    form_combo: {
      marcas: [],
    },

};

componentDidMount() { // se ejecuta al inicio
    this.buscarModelos(this.state.filtro);
}

cerrarForm = () => {
    this.setState({ mostrarForm: false });
};

buscarMarcas = query => {
  modeloService.buscarMarcas(query)
        .then((res) => this.setState({
          form_combo: {
              ...this.state.form_combo,
              marcas: res
          }
      }));

}

buscarModelos = query => {
  modeloService.buscarModelos(query)
      .then((res) => this.setState({ modelos: res, filtro: query }));
}

confirmar = (model) => {
    
    if(this.validar(model))
    {
        if (model.modelo_id === 0) {
            this.insertarModelo(model);
            console.log("insertar");
            
        }
        else {
            this.editarModelo(model);
            console.log("editar");
            
        }
    }
}

validar = (model) => {
    var camposValidos = true;

    var alertaMarca  = document.getElementById("marcaid");
    if(model.marca_id == 0){
        alertaMarca.style.display = "block";
        camposValidos = false;
    }
     else{
      alertaMarca.style.display = "none";
    }

    var regex_descripcion = /^(?!\s*$).+/;
    var descripcionValida = regex_descripcion.test(model.modelo_descripcion);
        
    var alertaDescripcion = document.getElementById("descripcionid");
    if(!descripcionValida){
        alertaDescripcion.style.display = "block";
        camposValidos = false;
    }
    else{
        alertaDescripcion.style.display = "none";
    }

    return camposValidos;
}


editarModelo = (model) => {
  modeloService.editarModelo(model.modelo_id, authenticationService.currentUserValue.id, model.modelo_descripcion, model.marca_id)
        .then(() => {
            this.cerrarForm();
            this.setState({ modelos: [] });
            this.buscarModelos(this.state.filtro);
        });

};

eliminarModelo = (model) => {
  
    var opcion = window.confirm("Estás Seguro que deseas eliminar el Modelo " + model.descripcion);
    if (opcion === true){
      
      modeloService.eliminarModelo(model.modelo_id)
        .then(() => {
            this.setState({ modelos: [] });
            this.buscarModelos(this.state.filtro);
        });
    }
    
}

insertarModelo = (model) => {
  
  modeloService.insertarModelo(authenticationService.currentUserValue.id,  model.modelo_descripcion, model.marca_id)
        .then(() => {
            this.cerrarForm();
            this.setState({ model: [] });
            this.buscarModelos(this.state.filtro);

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

mostrarForm = (modelo) => {

    let formulario = "";

    this.buscarMarcas();

    if (modelo.modelo_id !== 0) {
        formulario = "Modificar Modelo " + modelo.descripcion;
    }
    else {
        formulario = "Nuevo Modelo ";
        this.inicializarForm();

    }

    this.setState({ formulario: formulario, mostrarForm: true, form: modelo });

};


inicializarForm = () => {
    this.setState({
        form: {
          modelo_marca_id:"",
          marca_descripcion: "",
          marca_id: 0,
          modelo_descripcion: "",
          modelo_id: 0,
          fecha_modificacion: "",
          usuario_id: "",
          usuario_nombre:""
        }
    })
}

rolAdmitido(){
    var rol = authenticationService.currentUserValue.role;
    return rol == "Administrador" || rol == "Supervisor de ventas" || rol == "Gerente" || rol == "Administrativo";
 } 



render() {

    const modelos = this.state.modelos;
    return (
        <>
            <Container hidden={this.props.visible}>
                
                {/*Barra de busqueda*/}
                <Busqueda modulo="Modelos" search={this.buscarModelos} />

                <br />
                {/*Boton agregar Nuevo Marca*/}
                {this.rolAdmitido()?
                <FormGroup inline>
                    
                    <Button
                        color="success"
                        onClick={() => this.mostrarForm({
                          modelo_marca_id:"",
                          marca_descripcion: "",
                          marca_id: 0,
                          modelo_descripcion: "",
                          modelo_id: 0,
                          fecha_modificacion: "",
                          usuario_id: "",
                          usuario_nombre:""

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
                <Tabla columnas={{ marca_descripcion: "Marcas", modelo_descripcion: "Modelos", usuario_nombre: "Modificado por Usuario", fecha_modificacion: "Fecha" }}
                    datos={this.state.modelos} 
                    editar={this.rolAdmitido()? this.mostrarForm : ""} 
                    eliminar={this.rolAdmitido()? this.eliminarModelo : ""} />
            </Container>

            {/* Formulario Insertar/editar */}
            <Modal isOpen={this.state.mostrarForm}>

                <ModalHeader>
                    <div><h3>{this.state.formulario}</h3></div>
                </ModalHeader>

                {/* Formulario Insertar/editar */}
                <ModalBody>
                        {/* Marca*/}
                        <label>
                            Marca: *
                            </label>

                        <Input
                            name="marca_id"
                            type="select"
                            value={this.state.form.marca_id}
                            onChange={this.handleChange}
                        >
                            <option value="">Seleccione Marca</option>
                            {
                                this.state.form_combo.marcas.map(marca => {
                                    return (
                                        <option value={marca.id} >{marca.descripcion}</option>
                                    )
                                })
                            }
                        </Input>
                        <p id= "marcaid"> Seleccione una Marca </p>
                        <br/>
                    {/* Descipcion */}
                    <FormGroup inline>
                        <label>
                            Descripción de Nuevo Modelo: *
                        </label>
                        <input
                            className="form-control"
                            name="modelo_descripcion"
                            value={this.state.form.modelo_descripcion}
                            type="text"
                            placeholder="Ingrese un nuevo modelo"
                            onChange={this.handleChange}
                        />
                        <p id= "descripcionid"> Descripción inválida </p>
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
export { Modelo };


