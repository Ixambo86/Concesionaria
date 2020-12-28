import React, { Component } from "react";
import * as XLSX from 'xlsx'
import Axios from "axios";
import { Busqueda } from '../../components/Busqueda/Busqueda'
import { Tabla } from '../../components/Tabla'

import ok from "../../image/accept24.png"
import cancel from "../../image/cancel24.png"
import { remitosService } from '../../_services/remitos.service';
import { authenticationService } from '../../_services/authentication.service';
import search from "../../image/search16.png";
import add from "../../image/add.png";
import ayuda from '../../image/informacion.png'

import "bootstrap/dist/css/bootstrap.min.css";
import {
    Label,
    Alert,
    Button,
    Navbar,
    Container,
    ButtonGroup,
    Modal,
    Row,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
    Col,
    Input,
    Form,
    InputGroup,
    InputGroupAddon,
    UncontrolledCollapse,
    Popover,
    PopoverHeader, 
    PopoverBody,
    UncontrolledPopover
} from "reactstrap";
import { FormRemito } from "./FormRemito";

class Remito extends Component {

    state = {

        formulario: "",
        remitos: [],
        nombreDelArchivo: "",
        mostrarFormRemito: false,
        remitosTabla: [],
        productos_ordenes_compra: [],
        filtro: "",
        archivoCargado: false,
        numeroRemito: "",
        mostrarRemitoYaCargado: false,
        ordenNoExiste: false,
        mostrarCostoBajo: false,
        mostrarCostoAlto: false,
        productoBajo: [],
        productoNoExiste: [],
        archivoValidado: false,
        productoAlto: [],
        productoNoExisteEnRemito: [],
        mostrarProductoNoExisteEnOrdenCompra: false,
        mostrarProductoNoExisteEnRemito: false,
        mostrarFormRemitoDetalle: false,
        remito: {
            id: 0,
            nro_remito: '',
            fecha_hora: '',
            nro_orden: '',
            estado: '', 
            proveedor_nro: '',
            proveedor_razon_social: '',
            proveedor_documento: '',
            proveedor_condicion_iva: '',
            proveedor_telefono: '',
            proveedor_email: '',
            importe: 0,
            productos:[]
        }
    };


    Upload() {
        console.log("Upload");
        const fileUpload = (document.getElementById('fileUpload'));

        fileUpload.onchange = () => {
            //const selectedFile = fileUpload.files[0];
            const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
            if (regex.test(fileUpload.value.toLowerCase())) {
                let fileName = fileUpload.files[0].name;

                this.setState({ nombreDelArchivo: fileName });
                console.log("this.state.nombreDelArchivo");
                console.log(this.state.nombreDelArchivo);

                if (typeof (FileReader) !== 'undefined') {
                    const reader = new FileReader();
                    if (reader.readAsBinaryString) {
                        reader.onload = (e) => {
                            this.processExcel(reader.result);
                        };
                        reader.readAsBinaryString(fileUpload.files[0]);
                        //this.mostrarForm();
                    }
                } else {
                    console.log("This browser does not support HTML5.");
                }
            } else {
                alert("Por favor, ingrese un archivo Excel válido")
                console.log("Please upload a valid Excel file.");

            }

            //console.log(selectedFile);
        }
    }
    processExcel(data) {

        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheet = workbook.SheetNames[0];
        const excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
        this.setState({ remitos: excelRows, archivoCargado: true });

        let numeroRemito2 = this.state.nombreDelArchivo.split('.')[0];
        let formulario = numeroRemito2;

        this.setState({ formulario: formulario, numeroRemito: numeroRemito2, ordenNoExiste: false })
        console.log("estoy en mostrarForm")
        console.log("numeroRemito")
        console.log(numeroRemito2)
    }

    componentDidMount() { // se ejecuta al inicio
        this.buscarRemitos(this.state.filtro);
    }

    buscarRemitos = (filtro) => {
        remitosService.buscarRemitos(filtro)
            .then((res) => {
                console.log(res);
                this.setState({ remitosTabla: res, filtro: filtro })
            });
    }

    mostrarForm = () => {

        this.setState({ mostrarFormRemito: true })

    }

    cerrarForm = () => {
        this.setState({
            formulario: "",
            remitos: [],
            nombreDelArchivo: "",
            mostrarFormRemito: false,
            filtro: "",
            numeroRemito: "",
            archivoCargado: false,
            mostrarCostoBajo: false,
            mostrarCostoAlto: false,
            archivoValidado: false,
            mostrarProductoNoExisteEnOrdenCompra: false,
            productoBajo: [],
            productoNoExiste: [],
            productoAlto: [],
            productoNoExisteEnRemito: [],
            mostrarProductoNoExisteEnRemito: false,
            ordenNoExiste: false
        });
    };

    cerrarRemitoYaCargado = () => {
        this.setState({ mostrarRemitoYaCargado: false });
    };


    buscar = () => {
        //this.buscarOrdenesCompra(this.state.remitos[0].nro_orden_compra);
        this.remitoYaCargado(this.state.remitos)
    }

    buscarOrdenesCompra = (nro_orden) => {
        remitosService.buscarOrdenesCompra(nro_orden)
            .then((res) => {
                console.log(res)

                if (res.length !== 0) {
                    //this.remitoYaCargado(this.state.remitos)
                }
                else {
                    this.setState({ ordenNoExiste: true })

                }
            });
    }


    remitoYaCargado = (remito) => {
        console.log("this.state.numeroRemito")
        console.log(this.state.numeroRemito)
        remitosService.remitoYaCargado(this.state.numeroRemito)
            .then((res) => {

                if (res[0]) {
                    console.log("Estoy en remito ya cargado true")
                    this.buscarRemitos(this.state.filtro);
                    this.setState({
                        formulario: "",
                        remitos: [],
                        nombreDelArchivo: "",
                        mostrarFormRemito: false,
                        remitosTabla: [],
                        filtro: "",
                        archivoCargado: false,
                        numeroRemito: "",
                        mostrarRemitoYaCargado: true,
                        mostrarCostoBajo: false,
                        mostrarCostoAlto: false,
                        archivoValidado: false,
                        mostrarProductoNoExisteEnOrdenCompra: false,
                        costobajo: [],
                        productoBajo: [],
                        mostrarProductoNoExisteEnRemito: false,
                        productoNoExiste: [],
                        productoNoExisteEnRemito: [],
                        mostrarProductoNoExisteEnRemito: false,
                        productoAlto: [],
                        ordenNoExiste: false
                    });
                    this.cerrarForm();
                    return false;
                }
                else {
                    console.log("Estoy en remito ya cargado false")
                    for (let i = 0; i < this.state.remitos.length; i++) {
                        this.buscarIdProductos(this.state.remitos[i]);
                        this.insertarCostoEnProducto(this.state.remitos[i]);
                    }

                    this.insertarRemito(remito);

                    return true;

                }

            });
    }

    insertarCostoEnProducto = (remito) => {
        
        remitosService.insertarCostoEnProducto(remito.SKU, parseFloat(remito.Costo))
    }

    buscarIdProductos = (remito) => {
        remitosService.buscarIdProductos(remito.NroLote, remito.Descripcion, remito.SKU)
            .then((res) =>{
                this.VerificarProductoInventario(res, remito);
                remitosService.asignarNroLoteOTP(remito.NroLote, remito.SKU)
                remitosService.asignarNroLotePED(remito.NroLote, remito.SKU)
            })
    }

    VerificarProductoInventario = (producto, remito) => {
        if (producto.length === 0) {
            console.log("Estoy en insertar producto lote nuevo");

            this.insertarRemitoInventario(remito);
        }
        else {
            console.log("Estoy en modificar cant lote existente");
            this.modificarStock(producto, remito);
        }

    }

    insertarOrdenCompra = (remitos) => {
        console.log("estoy en insertar remito")
        remitosService.insertarOrdenCompra(remitos[0].nro_orden_compra, this.state.numeroRemito, remitos[0].SKU, authenticationService.currentUserValue.id)
    }


    insertarRemito = () => {

        this.EnviarMailValidacionesRemito();
        console.log("estoy en insertar remito")
        remitosService.insertarRemito(this.state.numeroRemito, this.state.remitos[0].SKU, this.state.remitos[0].Descripcion, this.state.remitos[0].nro_orden_compra, authenticationService.currentUserValue.id)
            .then((res) => {
                this.state.remitos.map((rd, item) =>{
                    remitosService.insertarRemitoDetalle(res.insertId, item+1, rd.SKU, rd.NroLote, rd.Costo, rd.Cantidad)
                })
                if (this.state.ordenNoExiste === false) {
                    this.insertarRemitoEnOrdenCompra(res.insertId);
                }
                else {
                    this.insertarOrdenCompra(this.state.remitos);
                }

                this.setState({
                    formulario: "",
                    remitos: [],
                    nombreDelArchivo: "",
                    mostrarFormRemito: false,
                    remitosTabla: [],
                    filtro: "",
                    numeroRemito: "",
                    archivoCargado: false,
                    mostrarCostoBajo: false,
                    mostrarCostoAlto: false,
                    mostrarProductoNoExisteEnOrdenCompra: false,
                    productoBajo: [],
                    productoNoExiste: [],
                    mostrarProductoNoExisteEnRemito: false,
                    productoNoExisteEnRemito: [],
                    productoAlto: [],
                    mostrarProductoNoExisteEnRemito: false,
                    ordenNoExiste: false
                });
                this.buscarRemitos(this.state.filtro);
                this.cerrarForm();
            });

    }

    insertarRemitoEnOrdenCompra = (remito_id) => {
        console.log("estoy insertarRemitoEnOrdenCompra")
        console.log(this.state.remitos[0].nro_orden_compra)
        remitosService.insertarRemitoEnOrdenCompra(remito_id, this.state.remitos[0].nro_orden_compra)

        this.setState({
            formulario: "",
            remitos: [],
            nombreDelArchivo: "",
            mostrarFormRemito: false,
            remitosTabla: [],
            filtro: "",
            numeroRemito: "",
            archivoCargado: false,
            mostrarCostoBajo: false,
            mostrarCostoAlto: false,
            mostrarProductoNoExisteEnOrdenCompra: false,
            productoBajo: [],
            productoNoExiste: [],
            mostrarProductoNoExisteEnRemito: false,
            productoAlto: [],
            ordenNoExiste: false
        });
        this.buscarRemitos(this.state.filtro);
        this.cerrarForm();
    }

    insertarRemitoInventario = (remito) => {

        console.log("estoy en insertarRemitoInventario remito")
        remitosService.insertarRemitoInventario(remito.SKU, remito.Descripcion, remito.NroLote, remito.Cantidad, remito.FechaVenc, authenticationService.currentUserValue.id)
    }

    modificarStock = (producto, remito) => {
        let nuevoStock = producto[0].stock + remito.Cantidad;
        remitosService.modificarStock(producto[0].producto_id, producto[0].nro_lote, nuevoStock, authenticationService.currentUserValue.id)
    }

    ValidacionRemito = () => {
        this.ObtenerInfoProducto(this.state.remitos[0].nro_orden_compra)
    }

    validarCosto = () => {
        this.setState({ archivoValidado: true })

        for (let i = 0; i < this.state.remitos.length; i++) {
            let bandera = false;
            for (let k = 0; k < this.state.productos_ordenes_compra.length; k++) {

                if (this.state.remitos[i].SKU === this.state.productos_ordenes_compra[k].producto_nombre) {
                    console.log(this.state.remitos[i].Costo + " " + this.state.productos_ordenes_compra[k].producto_costo)
                    if (this.state.remitos[i].Costo < this.state.productos_ordenes_compra[k].producto_costo) {
                        console.log("costo del " + this.state.remitos[i].SKU + " remito más bajo")
                        bandera = true;
                        this.state.productoBajo.push(" " + this.state.remitos[i].SKU + " ")
                        this.setState({ mostrarCostoBajo: true })

                    } else {
                        if (this.state.remitos[i].Costo > this.state.productos_ordenes_compra[k].producto_costo) {

                            bandera = true
                            //this.state.productoAlto.push(" "+this.state.remitos[i].SKU + " ")
                            //this.setState({mostrarCostoAlto:true})
                        }
                        else {
                            if (this.state.remitos[i].Costo === this.state.productos_ordenes_compra[k].producto_costo) {
                                console.log("costo " + this.state.remitos[i].SKU + " es igual")
                                bandera = true

                            }
                        }

                    }
                }


            }
            if (!bandera) {
                console.log("No existe el producto " + this.state.remitos[i].SKU)
                this.state.productoNoExiste.push(" " + this.state.remitos[i].SKU + " ")
                this.setState({ mostrarProductoNoExisteEnOrdenCompra: true })
            }
        }
        console.log(this.state.costobajo)
    }

    ObtenerInfoProducto = (orden_compra) => {
        remitosService.ObtenerInfoProducto(orden_compra)
            .then((res) => {
                this.setState({ productos_ordenes_compra: res })
                this.validarCosto();
                this.validarOrdenSiRemitoNo();
                this.buscarOrdenesCompra(this.state.remitos[0].nro_orden_compra);
                console.log("Validaciones")
                console.log(this.state.productoBajo)
                console.log(this.state.productoNoExiste)
                console.log(this.state.productoNoExisteEnRemito)
            });
    }

    validarOrdenSiRemitoNo = () => {

        for (let k = 0; k < this.state.productos_ordenes_compra.length; k++) {
            let ret = false;
            console.log(k)
            for (let i = 0; i < this.state.remitos.length; i++) {
                console.log(i)
                if (this.state.remitos[i].SKU === this.state.productos_ordenes_compra[k].producto_nombre) {
                    console.log(this.state.remitos[i].SKU + " === " + this.state.productos_ordenes_compra[k].producto_nombre)
                    console.log(ret)
                    ret = ret || true;
                    console.log(ret)
                }

            }
            if (ret === false) {
                this.state.productoNoExisteEnRemito.push(" " + this.state.productos_ordenes_compra[k].producto_nombre + " ")
                this.setState({ mostrarProductoNoExisteEnRemito: true })
            }
        }

    }




    EnviarMailValidacionesRemito = () => {
        var ordenNoExisteMail = "";
        var costoBajo = "";
        var NoExisteEnOrden = "";
        var NoExisteEnRemito = "";

        if (!this.state.ordenNoExiste) {
            if (this.state.productoNoExiste.length !== 0) {
                var NoExisteEnOrden = 'Estos productos no tienen una orden de compra: ';
                for (var i = 0; i < this.state.productoNoExiste.length; i++) {
                    NoExisteEnOrden = NoExisteEnOrden + this.state.productoNoExiste[i]
                }
            }
            else {
                var NoExisteEnOrden = "";
            }
        }
        else {
            NoExisteEnOrden = "";
            var ordenNoExisteMail = 'El remito no tenía orden de compra ';
        }

        if (this.state.productoBajo.length !== 0) {
            costoBajo = 'Estos productos tienen un precio más bajo: ';
            for (let i = 0; i < this.state.productoBajo.length; i++) {
                costoBajo = costoBajo + this.state.productoBajo[i]
            }
        }

        else {
            var costoBajo = "";
        }

        if (this.state.productoNoExisteEnRemito.length !== 0) {
            var NoExisteEnRemito = 'Estos productos faltaron en el remito: ';
            for (let i = 0; i < this.state.productoNoExisteEnRemito.length; i++) {
                NoExisteEnRemito = NoExisteEnRemito + this.state.productoNoExisteEnRemito[i]
            }
        }
        else {
            var NoExisteEnRemito = "";
        }

        console.log("Envio de mail en curso... afuera")
        if (NoExisteEnOrden !== "" || costoBajo !== "" || ordenNoExisteMail !== "" || NoExisteEnRemito !== "") {
            console.log("Envio de mail en curso...")
            remitosService.EnviarMailValidacionesRemito(this.state.numeroRemito, costoBajo, NoExisteEnOrden, NoExisteEnRemito, authenticationService.currentUserValue.id, ordenNoExisteMail)
            
        }

    }

    editarRemito = (remito) => {
        console.log(remito)
        this.setState({remito: remito})
        remitosService.obtenerRemitoProductos(remito.id)
        .then(res =>{
            this.setState({remito:{...remito, productos: res}, mostrarFormRemitoDetalle: true})
        })
    } 
    
    pagarRemito = () =>{
        remitosService.pagarRemito(this.state.remito.id, authenticationService.currentUserValue.id)
        .then(()=>{
            this.buscarRemitos(this.state.filtro)
            this.setState({mostrarFormRemitoDetalle: false})
        })
        
        
    }

    render() {

        console.log("this.state.remitosTabla");
        console.log(this.state.remitosTabla);
        console.log("this.state.remitos");
        console.log(this.state.remitos);
        return (
            <div>

                <Container hidden={!this.state.mostrarFormRemitoDetalle}>
                    <FormRemito
                        visible={this.state.mostrarFormRemitoDetalle}
                        formulario={"Remito " + this.state.remito.nro_remito}
                        remito={this.state.remito}
                        pagarRemito={this.pagarRemito}
                        cancelar={()=>this.setState({mostrarFormRemitoDetalle: false})}
                    />
                </Container>

                <Container hidden={this.props.visible}>
                    {/*Barra de busqueda*/}
                    <Busqueda modulo="Remitos" search={this.buscarRemitos} />
                    <br />
                    <Form inline>
                        <Button
                            color="success"
                            onClick={() => this.mostrarForm({
                            }, "Nuevo")}
                        >
                            <Form inline>
                                <img src={add} />
                            </Form>
                        </Button>
                    </Form>

                    <br />
                    <Container >
                        <Tabla columnas={{ nro_remito: "Nro Remito", fecha_hora: "Fecha/Hora", proveedor_razon_social: "Proveedor", proveedor_nro: "Nro Proveedor", nro_orden: "Orden de compra", estado:"Estado" }} datos={this.state.remitosTabla} editar={this.editarRemito}/>
                    </Container>
                </Container>
                <Container >
                    <Modal isOpen={this.state.mostrarFormRemito} size="lg">
                        <ModalHeader>
                            <h3>Remito: {this.state.formulario}</h3>

                            </ModalHeader>
                          
                            <ModalBody style={{ "overflow-y": "auto" }}>
                            
                            
                            <div><b> Adjuntar Archivo</b>
                            <Button id="PopoverLegacy" type="right" color="white"> 
                     <img src={ayuda} className = "menu_ayuda" alt='ayuda'/> 
              </Button>
                  <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy">
                    <PopoverHeader placement="left">Adjuntar Remito</PopoverHeader>

                    <PopoverBody> Al adjuntar remitos solo se aceptarán planillas con formato <b>.xls / .xlsx</b>.
                    </PopoverBody>

                    <PopoverBody> Luego se realizará la revisión de su contenido y en el caso de haber algún error el sistema lo notificará.
                    </PopoverBody>
                    <PopoverBody> Si hay alertas, se enviará un email al cliente y a la sucursal informando la incorporación de los productos.
                    </PopoverBody>
                 </UncontrolledPopover>
            
                 
                 </div> 
                               <input type="file" id="fileUpload" on onClick={() => this.Upload()} color="success" />
                               
                                <br />
                                <br />
                                <Row>
                                
                                <Col></Col><br/><h2>Productos</h2><Col></Col>

                                <br />
                                <Tabla columnas={{ SKU: "SKU", Descripcion: "Descripción", NroLote: "Nro Lote", FechaVenc: "Fecha Vencimiento", Cantidad: "Cantidad", Costo: "Importe" }} datos={this.state.remitos} />

                            </Row>
                        </ModalBody>

                        <hr />
                        <Container hidden={!this.state.ordenNoExiste}>
                            <Alert color="danger">
                                No existe una orden de comprar para este remito.
                            </Alert>
                        </Container>
                        <Container hidden={!this.state.mostrarCostoBajo}>
                            <Alert color="info">
                                Hay productos con precio más bajo: {this.state.productoBajo}.
                            </Alert>
                        </Container>
                        <Container hidden={!this.state.mostrarCostoAlto}>
                            <Alert color="info">
                                Hay productos con precio más alto: {this.state.productoAlto}.
                            </Alert>
                        </Container>
                        <Container hidden={!this.state.mostrarProductoNoExisteEnOrdenCompra}>
                            <Alert color="warning">
                                Hay productos que no están en la orden de compra: {this.state.productoNoExiste}.
                            </Alert>
                        </Container>
                        <Container hidden={!this.state.mostrarProductoNoExisteEnRemito}>
                            <Alert color="secondary">
                                Hay productos que estan en la orden de compra pero no en remito: {this.state.productoNoExisteEnRemito}.
                            </Alert>
                        </Container>

                        <hr />

                        <ModalFooter>
                            <Row>
                                <Col>
                                    <ButtonGroup size="md">
                                        <Button color="success" disabled={!this.state.archivoCargado} onClick={() => this.ValidacionRemito()} >Validar remito</Button>
                                         </ButtonGroup>
                                </Col>

                                <Col>
                                    <ButtonGroup size="md">
                                        <Button color="primary" disabled={!this.state.archivoValidado} onClick={this.buscar}><img src={ok} alt='' /></Button>
                                        <Button color="danger" onClick={this.cerrarForm}><img src={cancel} alt='' /></Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </ModalFooter>
                    </Modal>
                </Container>
                <Container >
                    <Modal isOpen={this.state.mostrarRemitoYaCargado} >
                        <ModalHeader>
                            <h3>Remito ya cargado..</h3>
                        </ModalHeader>

                        <ModalFooter>
                            <Row>
                                <Col>
                                    <ButtonGroup size="md">
                                        <Button color="danger" onClick={this.cerrarRemitoYaCargado}><img src={cancel} alt='' /></Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </ModalFooter>
                    </Modal>
                </Container>
            </div>
        );

    }
}
export { Remito };

