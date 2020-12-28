import React, { Component } from "react";
import { Busqueda } from '../../components/Busqueda/Busqueda'
import { Tabla } from '../../components/Tabla'
import { FormFiltro } from "../../components/FormFiltro";
import add from "../../image/add24.png"
import ok from "../../image/accept24.png"
import del from "../../image/cancel16.png"
import cancel from "../../image/cancel24.png"
import { clienteService } from '../../_services/clientes.services'
import { authenticationService } from '../../_services/authentication.service';
import { validacionService } from "../../_services/validacion.services";

import "./Cliente.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Label, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Input, Form, Row, Col, Badge} from "reactstrap";

class Cliente extends Component {

    state = {
        formulario: "",
        clientes: [],
        formulario: "",
        filtroClientes: {
            buscar:''
        },
        mostrarForm: false,
        mostrarDetalles: false,
        mostrarFormEliminar: false,
        mostrarFiltro:false,
        cliente_eliminado: [],
        mostrarFormEliminado: false,
        form: {
            cliente_nro: "",
            cliente_id: 0,
            cliente_iva: "",
            cliente_nombre: "",
            cliente_apellido: "",
            cliente_genero: "Masculino",
            cliente_persona_fisica: "Si",
            cliente_razon_social: "",
            cliente_tipo_doc_id: 0,
            cliente_documento: "",
            cliente_condicion_iva_id: 0,
            cliente_fecha_nac: "",
            cliente_telefono: "",
            cliente_email: "",
            cliente_calle: "",
            cliente_altura: 0,
            cliente_piso: 0,
            cliente_dpto: "",
            pais_id: 0,
            provincia_id: 0,
            localidad: 0,
            loc_id: 0,
            ci_id: 0,
            cliente_motivo_eliminado: "",
            usuario_id: 0,
            cliente_fecha_modificacion: ""
        },
        form_combo: {
            tipos_documentos: [],
            usuarios: [],
            genero: ["Masculino", "Femenino", "Otro"],
            persona_fisica: ["Si", "No"],
            paises: [],
            provincias: [],
            localidades: [],
            ivas: []
        },
        filtros_campos: {
            nombre:{
                tipo:"text",
                descripcion: "Cliente",
                valor:""
            },
            razon: {
                tipo:"text",
                descripcion: "Razon social",
                valor:""
            },
            nro:{
                tipo:"text",
                descripcion: "Nro de Cliente",
                valor:""
            },
            documento:{
                tipo:"text",
                descripcion: "ID Fiscal",
                valor:""
            },
            genero:{
                tipo:"select",
                descripcion: "Genero",
                valor:"",
                opciones: ["Masculino", "Femenino", "Otro"],
            },
            fecha_nac:{
                tipo:"date",
                descripcion: "Fecha nacimiento",
                valor:""
            },
        }
    };

    componentDidMount() {
        this.buscarCliente('');
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
        this.setState({ mostrarFormEliminado: false });
        this.cerrarForm();
    };

    buscarCliente = query => {
        clienteService.buscarCliente({buscar:query})
        .then((res) => {
            this.setState(
                {
                    clientes: res, 
                    filtroClientes:{ 
                        buscar: query
                    }
                }, ()=>{
                this.limpiarFiltros()                
            })        
        })  
    }

    confirmar = (cliente) => {
        var datosValidos = this.validar(cliente);

        if (datosValidos) {
            if (cliente.cliente_id === 0) {
                this.verificarClienteEliminado(cliente);
            }
            else {
                this.editarCliente(cliente);
            }
        }
    }

    validar = (cliente) => {
        var camposValidos = true;

        var regex_nombre_apellido = /^(([A-Za-z]{3,15}\s[A-Za-z]{3,15}|[A-Za-z]{3,15})|[A-Za-z]{3,15})$/;
        var nombreValido = regex_nombre_apellido.test(cliente.cliente_nombre)

        var alertaNombre = document.getElementById("cli_nombre_id");
        if (!nombreValido) {
            alertaNombre.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaNombre.style.display = "none";
        }

        var apellidoValido = regex_nombre_apellido.test(cliente.cliente_apellido)

        var alertaApellido = document.getElementById("cli_apellido_id");
        if (!apellidoValido) {
            alertaApellido.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaApellido.style.display = "none";
        }

        var alertaGenero = document.getElementById("cli_genero_id")
        if (cliente.cliente_genero == "") {
            alertaGenero.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaGenero.style.display = "none";
        }

        var alertaFecha = document.getElementById("cli_fecha_nac_id")
        if (cliente.cliente_fecha_nac >= '2003-01-01' || cliente.cliente_fecha_nac <= '1900-01-01') {
            alertaFecha.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaFecha.style.display = "none";
        }

        var alertaPersona = document.getElementById("cli_fisica_id")
        if (cliente.cliente_persona_fisica == "") {
            alertaPersona.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaPersona.style.display = "none";
        }

        var alertaRazonSocial = document.getElementById("cli_razon_id");
        if (cliente.cliente_razon_social.length <= 1) {
            alertaRazonSocial.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaRazonSocial.style.display = "none";
        }

        var alertaIva = document.getElementById("cli_iva_id");
        if(cliente.ci_id == 0 || cliente.ci_id == undefined){
            alertaIva.style.display = "block";
            camposValidos = false;
        }
        else{
            alertaIva.style.display = "none";
        }

        var regex_nro_dni = /^([0-9]){7,}$/; 
        var dniValido = regex_nro_dni.test(cliente.cliente_documento);

        var alertaDni = document.getElementById("cli_dni_id");
        if (!dniValido) {
            alertaDni.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaDni.style.display = "none";
        }

        var dniSinRepetir = true;

        var alertaDniRep = document.getElementById("cli_dni_rep_id");
        for (var i=0; i<this.state.clientes.length; i++)
            dniSinRepetir = dniSinRepetir && (cliente.cliente_documento !== this.state.clientes[i].cliente_documento);
        dniSinRepetir = (dniSinRepetir || (cliente.cliente_id > 0))
        if (!dniSinRepetir) {
            alertaDniRep.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaDniRep.style.display = "none";
        }

        var regex_telefono = /^((\d{10})|(\d{2}-\d{4}-\d{4}))$/;
        var telefonoValido = regex_telefono.test(cliente.cliente_telefono);

        var alertaTelefono = document.getElementById("cli_telefono_id");
        if (!telefonoValido) {
            alertaTelefono.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaTelefono.style.display = "none";
        }

        var regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        var emailValido = regex_email.test(cliente.cliente_email);

        var alertaEmail = document.getElementById("cli_email_id");
        if (!emailValido) {
            alertaEmail.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaEmail.style.display = "none";
        }

        var regex_calle = /^(\w{1,} ?\w{1,}? ?\w{1,}?|^$)$/;
        var calleValida = regex_calle.test(cliente.cliente_calle);

        var alertaCalle = document.getElementById("cli_calle_id");
        if (!calleValida) {
            alertaCalle.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaCalle.style.display = "none";
        }

        var regex_altura = /^\d{1,4}$/;
        var alturaValida = regex_altura.test(cliente.cliente_altura);

        var alertaAltura = document.getElementById("cli_altura_id");
        if (!alturaValida) {
            alertaAltura.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaAltura.style.display = "none";
        }

        var regex_piso = /^\d{1,2}$/;
        var pisoValido = regex_piso.test(cliente.cliente_piso);

        var alertaPiso = document.getElementById("cli_piso_id");
        if (!pisoValido) {
            alertaPiso.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaPiso.style.display = "none";
        }

        var regex_dpto = /^([A-Za-z]{1}|^$)/;
        var dptoValido = regex_dpto.test(cliente.cliente_dpto);

        var alertaDpto = document.getElementById("cli_dpto_id");
        if (!dptoValido) {
            alertaDpto.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaDpto.style.display = "none";
        }

        var alertaPais = document.getElementById("cli_pais_id")
        if (cliente.pais_id == 0 || cliente.pais_id == undefined) {
            alertaPais.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaPais.style.display = "none";
        }

        var alertaProvincia = document.getElementById("cli_prov_id")
        if (cliente.provincia_id == 0 || cliente.provincia_id == undefined) {
            alertaProvincia.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaProvincia.style.display = "none";
        }

        var alertaLocalidad = document.getElementById("cli_loc_id")
        if (cliente.loc_id == 0 || cliente.loc_id == undefined) {
            alertaLocalidad.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaLocalidad.style.display = "none";
        }
        return camposValidos;
    }

    verificarClienteEliminado = (cli) => {
        clienteService.verificarClienteEliminado(cli.cliente_documento)
            .then((res) => {
                this.setState({ cliente_eliminado: res });
                if (this.state.cliente_eliminado.length !== 0) {
                    let formulario = "El cliente con ID Fiscal " + cli.cliente_documento + " fué eliminado anteriormente";
                    this.setState({form: {...this.state.form, cliente_id: this.state.cliente_eliminado[0].cl_id}});
                    this.setState({ formulario: formulario, mostrarFormEliminado: true, cliente_eliminado: this.state.cliente_eliminado });
                }
                else {
                    this.insertarCliente(cli);
                }
            });
    }

    insertarCliente = (cli) => {
        clienteService.insertarCliente(authenticationService.currentUserValue.id, cli.cliente_nombre, cli.cliente_apellido, cli.cliente_genero, cli.cliente_persona_fisica, cli.cliente_razon_social, cli.ci_id, cli.cliente_documento, cli.cliente_fecha_nac, cli.cliente_telefono, cli.cliente_email, cli.cliente_calle, cli.cliente_altura, cli.cliente_piso, cli.cliente_dpto, cli.loc_id, cli.pais_id, cli.provincia_id)
            .then(() => {
                this.setState({ clientes: [] });
                this.buscarCliente(this.state.filtro);
                this.cerrarForm();
            });
    }

    editarCliente = (cli) => {
        clienteService.editarCliente(cli.cliente_id, cli.cliente_nombre, cli.cliente_apellido, cli.cliente_genero, cli.cliente_persona_fisica, cli.cliente_razon_social, cli.ci_id, cli.cliente_documento, cli.cliente_fecha_nac.slice(0,10), cli.cliente_telefono, cli.cliente_email, cli.cliente_calle, cli.cliente_altura, cli.cliente_piso, cli.cliente_dpto, cli.loc_id, cli.pais_id, cli.provincia_id)
            .then(() => {
                this.cerrarForm();
                this.cerrarEliminarAntes();
                this.setState({ clientes: [] });
                this.buscarCliente(this.state.filtro);
            });

    };

    mostrarFormEliminar = (cli) => {
        let formulario = "Eliminar Cliente: " + cli.cliente_nombre + ' ' + cli.cliente_apellido +', D.N.I. ' + cli.cliente_documento;
        this.setState({ formulario: formulario, mostrarFormEliminar: true, form: cli });
    }

    eliminarCliente = (cli) => {
        if(this.validarMotivo(cli.cliente_motivo_eliminado)){

            clienteService.eliminarCliente(cli.cliente_id, cli.cliente_motivo_eliminado, authenticationService.currentUserValue.id)
                .then(() => {
                    this.setState({ clientes: [] });
                    this.buscarCliente(this.state.filtro);
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

    mostrarForm = (clientes) => {
        var formulario = "";
        this.buscarIvas();
        this.buscarPaises();

        if (clientes.cliente_id !== 0) {
            formulario = "Modificar cliente " + clientes.cliente_nro;
        }
        else {
            formulario = "Nuevo cliente ";
            this.inicializarForm();
        }
        this.setState({ formulario: formulario, mostrarForm: true, form: clientes });
    };

    mostrarDetalles = (cliente) => {
        let formulario = "Detalles";
        this.setState({ formulario: formulario, mostrarDetalles: true, form: cliente });
    }

    inicializarForm = () => {
        this.setState({
            form: {
                cliente_nro: "",
                cliente_id: 0,
                cliente_iva: "",
                cliente_nombre: "",
                cliente_apellido: "",
                cliente_genero: "Masculino",
                cliente_persona_fisica: "Si",
                cliente_razon_social: "",
                cliente_documento: "",
                cliente_condicion_iva_id: 0,
                cliente_fecha_nac: "",
                cliente_telefono: "",
                cliente_email: "",
                cliente_calle: "",
                cliente_altura: 0,
                cliente_piso: 0,
                cliente_dpto: "",
                pais_id: 0,
                provincia_id: 0,
                localidad: 0,
                loc_id: 0,
                ci_id: 0,
                cliente_motivo_eliminado: "",
                usuario_id: 0,
                cliente_fecha_modificacion: ""
            }
        })
    }

    buscarPaises = () => {
        clienteService.buscarPaises()
            .then((res) => this.setState({
                form_combo: {
                    ...this.state.form_combo,
                    paises: res,
                    // provincias: [],
                    // localidades: []
                }
            }));
    }

    buscarProvincia= (pais) => {
        clienteService.buscarProvincias(pais)
            .then((res) => 
                this.setState({
                form_combo: {
                    ...this.state.form_combo,
                    provincias: res,
                    localidades: []
                }
            }));                 
    }

    buscarLocalidades = (prov) => {
        clienteService.buscarLocalidades(prov)
            .then((res) => this.setState({
                form_combo: {
                    ...this.state.form_combo,
                    localidades: res
                }
            }));
    }

    buscarIvas = () => {
        clienteService.buscarIvas()
            .then((res) => this.setState({
                form_combo: {
                    ...this.state.form_combo,
                    ivas: res
                }
            }));
    }

    handleChange = (e) => {
        validacionService.validarClient(e.target, e.target.name, e.target.value);

        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    handleChangePais = (e) => {
        validacionService.validarClient(e.target, e.target.name, e.target.value);
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value, 
                provincias: [],
                localidades: []
            }
        });
        const pais = e.target.value
        this.buscarProvincia(pais);
    }

    handleChangeProvincia = (e) => {
        validacionService.validarClient(e.target, e.target.name, e.target.value);
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
                localidades: []
            }
        });
        const prov = e.target.value;
        this.buscarLocalidades(prov);
    }

   onChangeFiltro = (e) =>{
        this.setState({
            filtros_campos:{
                ...this.state.filtros_campos,
                [e.target.name]: {
                    ...this.state.filtros_campos[e.target.name],
                    valor: e.target.value
                }
            }
        })
    }

    aplicarFiltro = () =>{
        let filtros = {}
        Object.keys(this.state.filtros_campos).map(f =>{
            if (this.state.filtros_campos[f].valor !== ''){
                filtros = {
                    ...filtros,
                    [f] : this.state.filtros_campos[f].valor
                }
            }
        })
        this.setState({
            filtroClientes:{
                buscar: this.state.filtroClientes.buscar,
                ...filtros
            }
        }, ()=>{
            clienteService.buscarCliente(this.state.filtroClientes)
            .then(res =>{
                console.log(res)
                this.setState({clientes: res, mostrarFiltro: false})
            })
        })        
    }

    limpiarFiltros = () =>{
        Object.keys(this.state.filtros_campos).map(f =>{
            this.state.filtros_campos[f].valor = ''
        })
        this.setState({filtros_campos: this.state.filtros_campos})
    }

    botonFiltro = () =>{
        this.setState({mostrarFiltro: !this.state.mostrarFiltro})
    }

    render() {
        const clientes = this.state.clientes;
        return (
            <>
                <Container size="lg">
                    <Busqueda modulo="Clientes" search={this.buscarCliente} botonFiltro={this.botonFiltro}/> <br />
                    <Form inline>
                        <Button color="success"
                            onClick={() => this.mostrarForm({
                                cliente_nro: "",
                                cliente_id: 0,
                                cliente_iva: "",
                                cliente_nombre: "",
                                cliente_apellido: "",
                                cliente_genero: "Masculino",
                                cliente_persona_fisica: "Si",
                                cliente_razon_social: "",
                                cliente_tipo_doc_id: 0,
                                cliente_documento: "",
                                cliente_condicion_iva_id: 0,
                                cliente_fecha_nac: "",
                                cliente_telefono: "",
                                cliente_email: "",
                                cliente_calle: "",
                                cliente_altura: 0,
                                cliente_piso: 0,
                                cliente_dpto: "",
                                pais_id: 0,
                                provincia_id: 0,
                                localidad: 0,
                                localidad_id: 0,
                                iva_id: 0,
                                cliente_motivo_eliminado: "",
                                usuario_id: 0,
                                cliente_fecha_modificacion: ""
                            }, "Nuevo")}>
                            <Form inline>
                                <img src={add} />
                            </Form>
                        </Button>
                    </Form>
                    <Row>
                        <Col>
                        {
                    
                        Object.keys(this.state.filtroClientes).map(f =>{                                    
                            return( f !== 'buscar' &&             
                                <Badge color="info" size="lg" hidden={this.state.filtros_campos[f].valor === ""}>
                                    {this.state.filtros_campos[f].descripcion + ' : ' + this.state.filtros_campos[f].valor}
                                    <img src={del} alt='' onClick={() => {this.state.filtros_campos[f].valor = '' 
                                    this.aplicarFiltro()}}/>
                                </Badge>)        
                        })
                    
                        }
                    <br />
                    <Tabla columnas={{ cliente_nro: "Nro. Cliente", cliente_nombre: "Nombre/s", cliente_apellido: "Apellido/s", cliente_razon_social: "Razon social", cliente_genero: "Genero", cliente_documento: "ID Fiscal", cliente_telefono: "Telefono", cliente_email: "Email"}}
                        datos={clientes} editar={this.mostrarForm} eliminar={this.mostrarFormEliminar} ver={this.mostrarDetalles} />
                    </Col>   
                        <Col hidden={!this.state.mostrarFiltro} xs={3}>
                            <FormFiltro filtros={this.state.filtros_campos} limpiarFiltros={this.limpiarFiltros}
                                aplicarFiltro={this.aplicarFiltro} onChange={this.onChangeFiltro}/>
                        </Col>
                    </Row> 
                </Container>

                <Modal isOpen={this.state.mostrarDetalles}>
                    <ModalHeader>
                        <h2 color="primary" ><i> Detalles</i></h2>
                    </ModalHeader>
                    <ModalBody>
                        <label><p><strong>  Nombre/s y Apeliido/s: </strong> {this.state.form.cliente_nombre + ' ' + this.state.form.cliente_apellido}</p></label><br/>
                        <label><p><strong>  Razon Social: </strong> {this.state.form.cliente_razon_social}</p></label><br/>
                        <label><p><strong>  ID Fiscal: </strong> {this.state.form.cliente_documento}</p></label><br/>
                        <label><p><strong>  Fecha de Nacimiento: </strong> {this.state.form.cliente_fecha_nac.slice(8,10) + '/' + this.state.form.cliente_fecha_nac.slice(5,7) + '/' + this.state.form.cliente_fecha_nac.slice(0,4)}</p></label><br/>
                        <label><p><strong>  Genero: </strong> {this.state.form.cliente_genero}</p></label><br/> 
                        <label><p><strong>  Persona Física: </strong>{this.state.form.cliente_persona_fisica}</p></label><br/>
                        <label><p><strong>  Calle: </strong>{this.state.form.cliente_calle}</p></label><br/>
                        <label><p><strong>  Altura: </strong>{this.state.form.cliente_altura}</p></label><br/>
                        <label><p><strong>  Piso: </strong>{this.state.form.cliente_piso}</p></label><br/>
                        <label><p><strong>  Dpto: </strong>{this.state.form.cliente_dpto}</p></label><br/>
                        <label><p><strong>  Modificado por: </strong>{this.state.form.usuario_nombre}</p></label><br/>
                        <label><p><strong>  Fecha de Modificación: </strong>{this.state.form.cliente_fecha_modificacion + 'hs.'}</p></label>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.cerrarDetalles()}><img src={cancel}/></Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.mostrarFormEliminar}>
                    <ModalHeader ><h3 color="primary" > {this.state.formulario} </h3></ModalHeader><br/>
                    <ModalBody>
                        <FormGroup>
                            <Label for="exampleText">Ingrese un Motivo: </Label>
                            <Input name="cliente_motivo_eliminado" type="textarea" onChange={this.handleChange}/>
                        </FormGroup>
                        <p id="cli_motivo"> Motivo inválido</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" data-toggle="tooltip" data-placement="top" title="Eliminar Cliente" onClick={() => this.eliminarCliente(this.state.form)}><img src={ok} /></Button>
                        <Button color="danger" data-toggle="tooltip" data-placement="top" title="Cancelar" onClick={() => this.cerrarEliminar()}><img src={cancel} /></Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.mostrarFormEliminado}>
                    <ModalHeader ><h3 color="primary" > {this.state.formulario} </h3></ModalHeader><br/>
                    <ModalBody>
                        <Container>
                            <label><strong>Fúe Eliminado por: </strong>
                                { this.state.cliente_eliminado.map(cliente => {
                                        return (<option>{cliente.usuario_nombre}</option>)
                                    })
                                }
                            </label><br />
                            <label>
                                <strong>En la fecha: </strong>
                                {
                                    this.state.cliente_eliminado.map(cliente => {
                                        return (<option>{cliente.fecha_modificacion + 'hs.'}</option>)
                                    })
                                }
                            </label><br/>
                            <label>
                                <strong>Email: : </strong>
                                {
                                    this.state.cliente_eliminado.map(cliente => {
                                        return (<option > {cliente.usuario_email} </option>)
                                    })
                                }
                            </label><br/>     
                            <label>
                                <strong>El usuario se encuentra: </strong>
                                {
                                    this.state.cliente_eliminado.map(cliente => {
                                        return (<option >{cliente.usuario_estado}</option>)
                                    })
                                }
                            </label><br/>
                            <label>
                                <strong>Con motivo: </strong>
                                {
                                    this.state.cliente_eliminado.map(cliente => {
                                        return (<option >{cliente.motivo_eliminado}</option>)
                                    })
                                }
                            </label><br/>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <label><strong>¿Desea volverlo a cargar? </strong></label>
                        <Button color="primary" data-toggle="tooltip" data-placement="top" title="Volver a cargar cliente" onClick={() => this.editarCliente(this.state.form)}><img src={ok} /></Button>
                        <Button color="danger" data-toggle="tooltip" data-placement="top" title="Cancelar"onClick={() => this.cerrarEliminarAntes()}><img src={cancel} /></Button>
                    </ModalFooter>
                </Modal>
                <Modal size="xl" isOpen={this.state.mostrarForm}>
                    <ModalHeader>
                        <div><h3>{this.state.formulario}</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup inline>
                            <Row>
                                <Col>
                                    <label>Nombre/s: *</label>
                                    <input className="form-control" name="cliente_nombre" value={this.state.form.cliente_nombre}
                                        type="text" placeholder="Nombre" onChange={this.handleChange}/>
                                    <p id="cli_nombre_id">Nombre inválido (Ej: Fernando)</p>
                                </Col>
                                <Col>
                                    <label>Apellido/s: *</label>
                                    <input className="form-control" name="cliente_apellido" value={this.state.form.cliente_apellido}
                                        type="text" placeholder="Apellido" onChange={this.handleChange}/>
                                    <p id="cli_apellido_id">Apellido inválido (Ej: Alvarez)</p>
                                </Col>
                                <Col>
                                    <label>Genero: *</label>
                                    <Input name="cliente_genero" type="select" value={this.state.form.cliente_genero} onChange={this.handleChange}>
                                        {this.state.form_combo.genero.map(cliente_genero => {
                                                return (<option value={cliente_genero} >{cliente_genero}</option>)
                                            })
                                        }
                                    </Input>
                                    <p id="cli_genero_id">Genero inválido (Ej: Femenino)</p>
                                </Col>
                                <Col>
                                    <label>Persona Física: *</label>
                                    <Input name="cliente_persona_fisica" type="select" value={this.state.form.cliente_persona_fisica} onChange={this.handleChange}>
                                        {
                                        this.state.form_combo.persona_fisica.map(cliente_persona_fisica => {
                                                return (<option value={cliente_persona_fisica} >{cliente_persona_fisica}</option>)
                                            })
                                        }
                                    </Input>
                                    <p id="cli_fisica_id">Persona Física inválida (Ej: Si)</p>
                                </Col>
                            </Row><br/>
                            <Row>
                                <Col>
                                    <label>Razón Social: *</label>
                                    <input className="form-control" name="cliente_razon_social" value={this.state.form.cliente_razon_social}
                                        type="text" placeholder="Ingrese la razón social" onChange={this.handleChange}/>
                                    <p id="cli_razon_id">Razón Social inválida (Ej: Filtros SA)</p>
                                </Col>
                                <Col>
                                    <label>ID Fiscal: *</label>
                                    <input className="form-control" name="cliente_documento" value={this.state.form.cliente_documento}
                                        type="text" placeholder="Ingrese el Documento" onChange={this.handleChange}/>
                                    <p id="cli_dni_id">ID Fiscal inválido (Ej: 24321905)</p>
                                    <p id="cli_dni_rep_id">Ya existe un cliente con el ID Fiscal</p>
                                </Col>
                                <Col>
                                    <label>Condición Iva: *</label>
                                    <Input name="ci_id" type="select" value={this.state.form.ci_id} onChange={this.handleChange}>
                                        <option value="">Seleccione Tipo de Factura</option>
                                        {
                                            this.state.form_combo.ivas.map(iva => {
                                                return (<option value={iva.ci_id} >{iva.ci_descripcion + " ( " + iva.ci_tipo_factura + " )"}</option>)
                                            })
                                        }
                                    </Input>
                                    <p id="cli_iva_id">Seleccione el tipo de factura</p>
                                </Col>
                            </Row><br/>
                            <Row>
                            <Col>
                                    <label>País: *</label>
                                    <Input name="pais_id" type="select" value={this.state.form.pais_id} onChange={this.handleChangePais}>
                                        <option value="">País</option>
                                        {
                                            this.state.form_combo.paises.map(pais => {
                                                return (
                                                    <option value={pais.pais_id} >{pais.pais_nombre}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                    <p id="cli_pais_id">Seleccione un país</p>
                                </Col>
                                <Col>
                                    <label>Provincia: *</label>
                                    <Input name="provincia_id" type="select" value={this.state.form.provincia_id} onChange={this.handleChangeProvincia}>
                                        <option value="">Provincia</option>
                                        {
                                            this.state.form_combo.provincias.map(prov => {
                                                return (
                                                    <option value={prov.provincia_id} >{prov.provincia_nombre}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                    <p id="cli_prov_id">Seleccione una provincia</p>
                                </Col>
                                <Col>
                                    <label>Localidad: *</label>
                                    <Input name="loc_id" type="select" value={this.state.form.loc_id} onChange={this.handleChange}>
                                        <option value="">Localidad</option>
                                        {
                                            this.state.form_combo.localidades.map(localidad => {
                                                return (
                                                    <option value={localidad.loc_id} >{localidad.loc_nombre}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                    <p id="cli_loc_id">Seleccione una Localidad</p>
                                </Col>
                            </Row><br/>                     
                            <Row>
                                <Col>
                                    <label>Teléfono: *</label>
                                    <input className="form-control" name="cliente_telefono" value={this.state.form.cliente_telefono}
                                        type="text" placeholder="Ingrese un Teléfono" onChange={this.handleChange}/>
                                    <p id="cli_telefono_id">Teléfono inválido (Ej: 1133381643)</p>
                                </Col>
                                <Col>
                                    <label>Email: *</label>
                                    <input className="form-control" name="cliente_email" value={this.state.form.cliente_email}
                                        type="text" placeholder="Ingrese un Email" onChange={this.handleChange}/>
                                    <p id="cli_email_id">Email inválido (Ej: repuestos@autoz.com.ar)</p>
                                </Col>
                                <Col>
                                    <label>Fecha de nacimiento: *</label>
                                    <input className="form-control" name="cliente_fecha_nac" value={this.state.form.cliente_fecha_nac.slice(0,10)}
                                        type="date" min="1900-01-01" max="2003-01-01"  onChange={this.handleChange}/>
                                    <p id="cli_fecha_nac_id">Fecha Invalida (Ej: entre 01/01/1900 y el 01/01/2003)</p>
                                </Col>

                                
                            </Row><br/>
                            <Row>
                                <Col >
                                    <label>Calle:</label>
                                    <input className="form-control" name="cliente_calle" value={this.state.form.cliente_calle}
                                    type="text" placeholder="Ingrese la Calle" onChange={this.handleChange}/>
                                    <p id="cli_calle_id">Calle inválida (Ej: 9 de Julio)</p>
                                </Col>
                                <Col xs="2">
                                    <label>Altura:</label>
                                    <input className="form-control" name="cliente_altura" value={this.state.form.cliente_altura}
                                        type="number" placeholder="Ingrese la Altura" onChange={this.handleChange}/>
                                    <p id="cli_altura_id">Altura inválida (Ej: 1900)</p>
                                </Col><br/>
                                <Col xs="2">
                                    <label>Piso:</label>
                                    <input className="form-control" name="cliente_piso" value={this.state.form.cliente_piso}
                                        type="number" placeholder="Ingrese el Piso" onChange={this.handleChange}/>
                                    <p id="cli_piso_id">Piso inválido (Ej: 5)</p>
                                </Col>
                                <Col xs="2">
                                    <label>Dpto:</label>
                                    <input className="form-control" name="cliente_dpto" value={this.state.form.cliente_dpto}
                                        type="text" placeholder="Dpto" onChange={this.handleChange}/>
                                    <p id="cli_dpto_id">Dpto inválido (Ej: B)</p>
                                </Col>
                            </Row>
                        </FormGroup>
                        <p >(*) Campos Obligatorios</p>
                        <ModalFooter>
                            <Button  color="primary" data-toggle="tooltip" data-placement="top" title="Aceptar" onClick={() => this.confirmar(this.state.form)}><img src={ok}/></Button>
                            <Button color="danger" data-toggle="tooltip" data-placement="top" title="Cancelar" onClick={() => this.cerrarForm()}><img src={cancel}/></Button>
                        </ModalFooter>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}
export { Cliente };