import React, {Component} from 'react';
import { Container, Row, Col, Badge,PopoverHeader, PopoverBody, UncontrolledPopover,Button } from "reactstrap";
import { Busqueda } from '../../components/Busqueda/Busqueda'
import { Tabla } from '../../components/Tabla'
import { FormOrdenCompra } from './FormOrdenCompra'
import { FormFiltro} from "../../components/FormFiltro";
import { ordenesCompraService } from '../../_services/ordenesCompra.service'
import "bootstrap/dist/css/bootstrap.min.css";
import {productosInventarioService} from '../../_services/productosInventario.service';

import del from "../../image/delete24.png"
import ayuda from '../../image/informacion.png'
import { authenticationService } from '../../_services/authentication.service';

class OrdenCompra extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            filtroOrdenes: {
                buscar:''
            },
            ordenes: [],
            mostrarForm: false,
            mostrarFiltro:false,
            formulario: '',
            orden: {
                id: 0,
                nro_orden: '',
                fecha_hora: '',
                proveedor_id: 0,
                proveedor_nro:'',
                proveedor_documento:'', 
                proveedor_nombre:'',
                proveedor_telefono:'',
                proveedor_email:'',
                proveedor_condicion_iva:'',
                proveedor_domicilio:'',
                observacion: "",
                estado:'',
                usuario_id:0,
                usuario:'',
                sucursal:'',
                cambios: [],
                productos:[],
                historia:[]
            },
            filtros_campos: {
                proveedor_nombre:{
                    tipo:"text",
                    descripcion: "Proveedor",
                    valor:""
                },
                nro_orden:{
                    tipo:"text",
                    descripcion: "Nro de Orden",
                    valor:""
                },
                estado:{
                    tipo:"select",
                    descripcion: "Estado",
                    valor:"",
                    opciones:[]
                },
                producto_descripcion:{
                    tipo:"text",
                    descripcion: "Descripción del Producto",
                    valor:""
                },
                sucursal:{
                    tipo:"select",
                    descripcion: "Sucursal",
                    valor:"",
                    opciones:[]
                },
                fecha_desde:{
                    tipo:"date",
                    descripcion: "Fecha desde",
                    valor:""
                },
                fecha_hasta:{
                    tipo:"date",
                    descripcion: "fecha hasta",
                    valor:""
                }
            }
        }
    
    }

    inicializarDatos = () =>{
        this.setState({
            orden: {
                id: 0,
                nro_orden: '',
                fecha_hora: '',
                proveedor_id: 0,
                proveedor_nro:'',
                proveedor_documento:'', 
                proveedor_nombre:'',
                proveedor_telefono:'',
                proveedor_email:'',
                proveedor_condicion_iva:'',
                proveedor_domicilio:'',       
                importe:0,
                observacion: "",
                estado:'INICIADO',
                usuario_id:0,
                usuario:'',
                sucursal:'',
                cambios: [],
                productos:[],
                historia:[]
            }
        })
    }
  
    componentDidMount() {
        this.buscarOrdenes(this.state.filtroOrdenes.buscar);
    }

    confirmarOrden = () => {
       // console.log(this.state.orden)
        if (this.state.orden.id === 0)
            this.insertarOrden(this.state.orden)
        else
            this.actualizarOrden(this.state.orden)
        this.cerrarForm()
        
    }

    cerrarForm = () => {
        this.setState({ formulario:"", mostrarForm: false });
        this.buscarOrdenes(this.state.filtroOrdenes.buscar);
        this.inicializarDatos()
    }

    mostrarForm = (formulario) => {
        this.setState({formulario: formulario, mostrarForm: true})
    }

    

    /************************************************************/

    buscarOrdenes = query => {
        ordenesCompraService.buscarOrdenes({buscar:query})
        .then((res) => {
            this.setState(
                {
                    ordenes: res, 
                    filtroOrdenes:{ 
                        buscar: query
                    },
                    filtros_campos:{
                        ...this.state.filtros_campos,
                        estado:{
                            ...this.state.filtros_campos.estado,
                            opciones: [...new Set(res.map(o => { return o.estado }))]
                        },
                        sucursal:{
                            ...this.state.filtros_campos.sucursal,
                            opciones:[...new Set(res.map(o => { return o.sucursal }))]
                        }
                    }     
                }, ()=>{
                this.limpiarFiltros()                
            })        
        })        
    }

    editarOrden = (orden) =>{
        console.log(orden)
        this.setState({orden:{ ...orden, productos:[]}}, ()=>{
            ordenesCompraService.buscarProductosOrden(orden.id)
            .then((res) => {
                this.setState({orden:{...orden, productos: res}}, () => {
                    this.obtenerHistoriaOrden(orden.id)
                })
            })
        })

        this.mostrarForm("Modificar Orden " + orden.nro_orden)
            
    }

    actualizarOrden = (orden) => {
        if (orden.observacion && orden.observacion !== ""){
            this.insertarHistoriaOrden(orden.id, orden.observacion)
        }
        return ordenesCompraService.actualizarOrden(orden)
    };

    eliminarOrden = (orden) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el orden " + orden.nro_orden);
        if (opcion === true) {
            ordenesCompraService.eliminarOrden(orden.id)
            .then(() => this.buscarOrdenes(this.state.filtroOrdenes.buscar))
        }
    };

    insertarOrden= (orden)=>{
        let promise = new Promise((resolve)=>{
            ordenesCompraService.insertarOrden(orden, authenticationService.currentUserValue.id)
        .then((res) => {
            this.setState({orden:{...this.state.orden, id: res.insertId}, mostrarForm:false},
                () => {
                    if (this.state.orden.observacion !== "")
                        this.insertarHistoriaOrden(res.insertId, this.state.orden.observacion)
                    this.insertarProductosOrden(res.insertId, orden.productos)
                    this.buscarOrdenes(this.state.filtroOrdenes.buscar);
                    resolve(true)
                })
            });
        }) 
        return promise       
    }

    insertarProductosOrden =(orden_id, productos)=>{
        Object.keys(productos).map((index, item) => {
            ordenesCompraService.insertarProductosOrden(
                orden_id, 
                item+1, 
                productos[index]["id"],
                productos[index]["precio"],
                productos[index]["cantidad"], 
                productos[index]["precio"], 
                productos[index]["nro_lote"], 
            )
        })
    }

    /*************************************************************************/

    seleccionarProveedor = async(proveedor) => {
        let promise = new Promise((resolve, reject) => {
            this.setState({
                orden:{...this.state.orden, 
                    proveedor_id: proveedor.proveedor_id, 
                    proveedor_nro: proveedor.proveedor_nro,
                    proveedor_documento: proveedor.proveedor_documento,
                    proveedor_nombre: proveedor.proveedor_apellido + ", " + proveedor.proveedor_nombre,
                    proveedor_telefono: proveedor.proveedor_telefono,
                    proveedor_email: proveedor.proveedor_email,
                    proveedor_condicion_iva: proveedor.iva_descripcion,
                    proveedor_domicilio: proveedor.proveedor_calle + " " + proveedor.proveedor_altura + " " + proveedor.proveedor_piso + "°" + proveedor.proveedor_dpto + ", " + proveedor.localidad_nombre,
                }
            }, ()=>resolve(true))
        }) 
        return promise;       
    }

    insertarHistoriaOrden =(orden_id, observacion) =>{
       // console.log(orden_id, observacion)
        ordenesCompraService.insertarHistoriaOrden(orden_id, observacion, authenticationService.currentUserValue.id)
    }

    obtenerHistoriaOrden = (orden_id) =>{
        let promise = new Promise((resolve) =>{
            ordenesCompraService.buscarHistoriaOrden(orden_id)
            .then((res) => {
                this.setState({orden:{...this.state.orden, historia: res}}, ()=>{
                    resolve(true)
                })
            })
        })
        return promise
    }

    setEstadoOrden = (estado) =>{
        let estado_anterior = this.state.orden.estado
        console.log(this.state.orden)
        let promise = new Promise((resolve) => {
            this.setState({orden:{...this.state.orden, estado: estado, usuario_id: authenticationService.currentUserValue.id}}, ()=>{
                if (this.state.orden.id === 0){
                    this.insertarOrden(this.state.orden)
                    .then(()=> resolve(true))
                }else{
                    this.actualizarOrden(this.state.orden)
                    .then(()=>resolve(true))
                }
            })
        })
        promise.then(()=>{
            this.insertarHistoriaOrden(this.state.orden.id, estado_anterior + ' => ' + estado)
            
            if (estado === "APROBADA"){                        
                this.cerrarForm()
            }    
            if (estado === "CANCELADA"){                        
                this.cerrarForm()
            }
        })      
     
    }

    handleChange = (e) =>{
        this.setState({
            orden:{...this.state.orden, 
                [e.target.name]:e.target.value
            }
        })
    }

    onChangeFiltro = (e) =>{
        console.log(e.target.name, e.target.value)
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
        console.log(filtros)
        this.setState({
            filtroOrdenes:{
                buscar: this.state.filtroOrdenes.buscar,
                ...filtros
            }
        }, ()=>{
            ordenesCompraService.buscarOrdenes(this.state.filtroOrdenes)
            .then(res =>{
                this.setState({ordenes: res, mostrarFiltro: false})
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

    /*************************************************************************/

    render() {
        console.log(this.state)
        const ordenes = this.state.ordenes
        return (
            <>
                <Container hidden={this.state.formulario !== ""}>
                    <Busqueda 
                        modulo="Ordenes de Compra" 
                        search={this.buscarOrdenes}
                        botonFiltro={this.botonFiltro}
                        />
                         <Button id="PopoverLegacy1" type="right" color="white">
                                <img src={ayuda} className="menu_ayuda" alt='ayuda' />
                            </Button>
                            <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy1">
                                <PopoverHeader>Ordenes de Compra</PopoverHeader>
                                <PopoverBody> </PopoverBody>
                                <PopoverBody> Las ordenes de compra se generan automáticamente al detectar que un producto se encuentra con bajo stock. </PopoverBody>
                                <PopoverBody> Una vez creada, las ordenes pueden ser aprobadas o rechazadas por el administrador del taller. </PopoverBody>
                            </UncontrolledPopover>
                    <Row>
                        <Col>
                            {
                                Object.keys(this.state.filtroOrdenes).map(f =>{
                                    
                                    return( f !== 'buscar' && 
                    
                                    <Badge color="info" size="lg"
                                        hidden={this.state.filtros_campos[f].valor === ""}>
                                            {this.state.filtros_campos[f].descripcion + ' : ' + this.state.filtros_campos[f].valor}
                                            <img src={del} alt='' 
                                                onClick={() => {
                                                        this.state.filtros_campos[f].valor = ''
                                                        this.aplicarFiltro()
                                                    }
                                                }
                                            />
                                    </Badge>
                                    )        
                                })
                            }
                            <Tabla columnas={{nro_orden:"Nro Orden", fecha_hora:"Fecha", proveedor_razon_social: "Proveedor", estado:"Estado", nro_remito:"Nro de Remito"}} datos={ordenes} editar={this.editarOrden} /*eliminar={this.eliminarOrden}*/ />    
                        </Col>   
                        <Col hidden={!this.state.mostrarFiltro} xs={3}>
                            <FormFiltro 
                                filtros={this.state.filtros_campos}
                                limpiarFiltros={this.limpiarFiltros}
                                aplicarFiltro={this.aplicarFiltro}
                                onChange={this.onChangeFiltro}
                            />
                        </Col>
                    </Row>     
                </Container>
                
                <Container hidden={!this.state.mostrarForm}>
                    <FormOrdenCompra 
                        visible={this.state.mostrarForm} 
                        formulario={this.state.formulario} 
                        orden={this.state.orden} 
                        handleChange={this.handleChange}
                        seleccionarProveedor={this.seleccionarProveedor}
                        confirmar={this.confirmarOrden} 
                        cancelar={this.cerrarForm} 
                        setEstadoOrden={this.setEstadoOrden}
                        >
                    </FormOrdenCompra>
                </Container>
            </>
        );
    }
}
export { OrdenCompra };