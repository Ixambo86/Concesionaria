import React, {Component} from 'react';
import { Col, Row, FormGroup,Container, DropdownItem, DropdownMenu, DropdownToggle, Form, UncontrolledButtonDropdown, Button,PopoverHeader, PopoverBody, UncontrolledPopover } from "reactstrap";
import { Busqueda } from '../../components/Busqueda/Busqueda'
import { Tabla } from '../../components/Tabla'
import { FormPedidoProductos } from './FormPedidoProductos'
import { FormPedidoAutomotor } from './FormPedidoAutomotor'
import { FormFiltro } from '../../components/FormFiltro'
import { pedidosService } from '../../_services/pedidos.services'
import { Carrito } from "../Carrito/Carrito";
import { Catalogo } from "../Catalogo/Catalogo";
import add from "../../image/add24.png"
import img_productos from "../../image/producto192.png"
import ayuda from '../../image/informacion.png'
import "bootstrap/dist/css/bootstrap.min.css";
import {productosInventarioService} from '../../_services/productosInventario.service';

import { authenticationService } from '../../_services/authentication.service';
import { automotorService } from '../../_services/automotores.services';
import { ordenesCompraService } from '../../_services/ordenesCompra.service'
import { FormDetalleAutomotor } from './FormDetalleAutomotor';

class Pedido extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            productos:[],
            adicionales:[],
            productos_adicionales: [],
            automotores:[],
            filtroPedidos: {
                buscar:''
            },
            filtroProductos: {
                buscar:''
            },
            filtroAutomotores: {
                buscar:''
            },
            pedidos: [],
            mostrarFormPedidoAutomotor: false,
            mostrarFormPedidoProductos: false,
            mostrarDetalleAutomotor: false,
            formulario: '',
            pedido: {
                id: 0,
                nro_pedido: '',
                fecha_hora: '',
                cliente_id: 0,
                cliente_nro:'',
                cliente_documento:'', 
                cliente_condicion_iva:'', 
                cliente_tipo_factura:'', 
                cliente_razon_social: '', 
                cliente_nombre:'',
                cliente_telefono:'',
                cliente_email:'',
                cliente_domicilio:'',                
                automotor_id: 0,
                automotor_version_config_id: 0,
                automotor_dominio:'',
                automotor_descripcion:'',
                automotor_motor:'',
                automotor_km:0,
                automotor_origen:"",
                bonificacion: 0,
                importe:0,
                observacion: "",
                estado:'INICIADO',
                usuario_id:0,
                usuario:'',
                sucursal:'',
                documentos:[],
                cambios: [],
                productos:[],
                historia:[]
            },
            automotor:{
     //           id: 0, 
                marca: '', 
     //           marca_id,
                modelo: '', 
     //           modelo_id, 
                version: '', 
    //            version_id,
                tipo_motor: '', 
    //            tipo_motor_id,
                anio: 0, 
                dominio: '',
                km: 0,
                color: '',
    //            color_id,
                precio: 0,
                img:'', 
                plazo_entrega_0km: 0,
                costo: 0,
                nro_motor: '',
                nro_chasis: '',
     //           version_config_id,
                descripcion: '',
                origen: ''
            },
            filtros_pedidos_campos:{
                cliente_nombre:{
                    tipo:"text",
                    descripcion: "Cliente / Razón Social",
                    valor:""
                },
                estado:{
                    tipo:"select",
                    descripcion: "Estado",
                    valor:"",
                    opciones:[]
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
            },
            filtros_productos_campos:{
                proveedor_nombre:{
                    tipo:"text",
                    descripcion: "Proveedor",
                    valor:""
                },
                marca:{
                    tipo:"text",
                    descripcion: "Marca",
                    valor:""
                },   
                precio_desde:{
                    tipo:"number",
                    descripcion: "Precio desde",
                    valor: 0
                },   
                precio_hasta:{
                    tipo:"number",
                    descripcion: "Precio hasta",
                    valor: 0
                },              
            },
            filtros_catalogo_campos:{
                motor:{
                    tipo:"select",
                    descripcion: "Motor",
                    valor:"",
                    opciones:["Nafta", "Diesel"]
                },
                precio_desde:{
                    tipo:"number",
                    descripcion: "Precio desde",
                    valor:0
                },   
                precio_hasta:{
                    tipo:"number",
                    descripcion: "Precio hasta",
                    valor:0
                },  
                anio_desde:{
                    tipo:"select",
                    descripcion: "Año desde",
                    valor:2011,
                    opciones:[2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]
                },   
                anio_hasta:{
                    tipo:"select",
                    descripcion: "Año hasta",
                    valor:2021,
                    opciones:[2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]
                },  
                km_desde:{
                    tipo:"number",
                    descripcion: "Km desde",
                    valor:0
                },   
                km_hasta:{
                    tipo:"number",
                    descripcion: "Km hasta",
                    valor:0
                }, 
                sucursal:{
                    tipo:"select",
                    descripcion: "Sucursal",
                    valor:"",
                    opciones:[]
                } 
            }
        }
    
    }

    inicializarDatos = () =>{
        this.setState({
            pedido: {
                id: 0,
                nro_pedido: '',
                fecha_hora: '',
                cliente_id: 0,
                cliente_nro:'',
                cliente_documento:'', 
                cliente_condicion_iva:'', 
                cliente_tipo_factura:'', 
                cliente_razon_social: '', 
                cliente_nombre:'',
                cliente_telefono:'',
                cliente_email:'',
                cliente_domicilio: '',               
                automotor_id: 0,
                automotor_version_config_id: 0,
                automotor_dominio:'',
                automotor_descripcion:'',
                automotor_motor:'',
                automotor_km:0,
                automotor_origen: '',
                bonificacion: 0,
                importe:0,
                observacion: "",
                estado:'INICIADO',
                usuario_id:0,
                usuario:'',
                sucursal:'',
                documentos:[],
                cambios: [],
                productos:[],
                historia:[]
            }
        })
    }
  
    componentDidMount() {
        this.buscarPedidos(this.state.filtroPedidos.buscar);
        this.buscarProductos(this.state.filtroProductos.buscar)
        this.obtenerCatalogo(this.state.filtroAutomotores.buscar)
    }

    llamarCarrito = () => {
        this.inicializarDatos()
        this.setState({formulario: "Carrito", mostrarFormPedidoProductos:false});
    }

    confirmarCarrito = (carrito, total) => {
        this.setState({pedido:{...this.state.pedido, productos: carrito, importe: total}, filtroProductos:''}, ()=>{
            this.mostrarFormPedidoProductos("Nuevo Pedido ", this.state.pedido)
            this.obtenerHistoriaPedido('')
        })    

    }

    cancelarCarrito = () => {
        this.setState({formulario: "", filtroProductos:''})
        this.buscarProductos('')
    }

    llamarCatalogo = () => {
        this.inicializarDatos()
        this.setState({formulario: "Catálogo", mostrarFormPedidoAutomotor:false});
    }

    confirmarCatalogo = (automotor) => {
        this.buscarCategoriasAdicionales(automotor.id)
        .then(() =>{
            this.buscarProductosAdicionales(automotor.id, automotor.version_config_id, this.state.adicionales)
            .then(()=>{
                this.setState({
                    pedido:{...this.state.pedido,
                        automotor_version_config_id : automotor.version_config_id,
                        automotor_id: automotor.id,
                        automotor_descripcion: automotor.marca + " " + automotor.modelo + " " + automotor.version,                    
                        automotor_dominio: automotor.dominio,
                        automotor_motor: automotor.tipo_motor + " " + automotor.cilindrada + " " + automotor.hp + "HP",
                        automotor_km: automotor.km,
                        automotor_origen: automotor.origen,
                        automotor_precio: automotor.precio,  
                        importe: automotor.precio}, 
                        filtroProductos:''
                    }, ()=>{
                        this.mostrarFormPedidoAutomotor("Nuevo Pedido ", this.state.pedido)
                        this.obtenerHistoriaPedido('')
                    }
                )
            })            
        })
    }

    cancelarCatalogo = () => {
        this.setState({formulario: "", filtroAutomotores:''})
        this.obtenerCatalogo('')
    }

    detalleCatalogo = (automotor) =>{
        this.setState({automotor: automotor, mostrarDetalleAutomotor: true})
    }

    cerrarDetalleCatalogo = () =>{
        this.setState({mostrarDetalleAutomotor:false})
    }

    buscarDocumentos = (pedido_id) =>{
        pedidosService.buscarDocumentosPedido(pedido_id)
        .then(res =>{
            this.setState({pedido:{...this.state.pedido, documentos: res}})
        })
    }

    insertarDocumentosPedido = (pedido_id, version_config_id) =>{
        if (version_config_id && version_config_id > 0)
            pedidosService.insertarDocumentosPedido(pedido_id, version_config_id, authenticationService.currentUserValue.id) 
    }

    actualizarDocumento = (documento) =>{
        pedidosService.actualizarDocumentosPedido(this.state.pedido.id, documento)
        .then(() =>{
            pedidosService.buscarDocumentosPedido(this.state.pedido.id)
            .then(res =>{
                this.setState({pedido:{...this.state.pedido, documentos: res}})
            })
        })  
    }

    buscarCategoriasAdicionales = (automotor_id) =>{
        let promise = new Promise((resolve) =>{
            productosInventarioService.buscarCategoriasAdicionales(automotor_id)
            .then((res)=>{
                this.setState({adicionales: res}, ()=>{
                    resolve(true)
                })
            })
        })
        return promise
    }

    buscarProductosAdicionales = (automotor_id, version_config_id, adicionales) =>{
        let promises = []
        this.state.productos_adicionales = []
        adicionales && adicionales.map(categ =>{
            promises.push(productosInventarioService.buscarProductosAdicionales(automotor_id, version_config_id, categ.id))
        })
        let promise = new Promise((resolve)=>{  
            Promise.all(promises)
            .then((results) =>{
                console.log(results)
                results.map((res, item) =>{
                    Object.keys(res).map(prod =>{
                        this.state.productos_adicionales[item] = this.state.productos_adicionales[item] ||[]
                        this.state.productos_adicionales[item][res[prod].id] = this.state.productos_adicionales[item][res[prod].id] || []
                        this.setState({
                            productos_adicionales: {...this.state.productos_adicionales, 
                                [item]: this.state.productos_adicionales[item] || [],
                                [item]:{...this.state.productos_adicionales[item], 
                                    [res[prod].id] : this.state.productos_adicionales[item][res[prod].id] ||[],
                                    [res[prod].id] : res[prod]
                                }
                            }        
                        }, ()=>{
                                resolve(true)
                        })
                    })
                    
                })
                
            })            
        })
        return promise
    }
    confirmarPedido = () => {
       // console.log(this.state.pedido)
        if (this.state.pedido.id === 0)
            this.insertarPedido(this.state.pedido)
        else
            this.actualizarPedido(this.state.pedido)
        this.cerrarForm()
        
    }

    mostrarFormPedidoAutomotor = (formulario) => {
        this.setState({formulario: formulario, mostrarFormPedidoAutomotor: true})
    }

    cerrarForm = () => {
        this.setState({ formulario:"", mostrarFormPedidoAutomotor: false, mostrarFormPedidoProductos: false });
        this.buscarPedidos(this.state.filtroPedidos.buscar);
        this.inicializarDatos()
    }

    mostrarFormPedidoProductos = (formulario) => {
        this.setState({formulario: formulario, mostrarFormPedidoProductos: true})
    }

    

    /************************************************************/

    buscarPedidos = query => {
        pedidosService.buscarPedidos(query)
        .then((res) => {
            this.setState(
                {
                    pedidos: res, 
                    filtroPedidos:{ 
                        buscar: query
                    },
                    filtros_pedidos_campos:{
                        ...this.state.filtros_pedidos_campos,
                        estado:{
                            ...this.state.filtros_pedidos_campos.estado,
                            opciones: [...new Set(res.map(o => { return o.estado }))]
                        },
                        sucursal:{
                            ...this.state.filtros_pedidos_campos.sucursal,
                            opciones:[...new Set(res.map(o => { return o.sucursal }))]
                        }
                    }     
                }, ()=>{
                this.limpiarFiltroPedidos()                
            })        
        }) 
    }

    editarPedido = (pedido) =>{
        console.log(pedido)
        let promises = []
        this.setState({pedido:{ ...pedido, productos:[], documentos:[], cambios:[]}}, ()=>{
            promises.push(pedidosService.buscarProductosPedido(pedido.id))
            promises.push(pedidosService.buscarDocumentosPedido(pedido.id))
            promises.push(pedidosService.buscarHistoriaPedido(pedido.id))
            Promise.all(promises)
            .then((res) => {
                this.setState({pedido:{...this.state.pedido, productos: res[0], documentos: res[1], historia: res[2]}})
            })
        })

        if (pedido.version_config_id > 0){
            
            this.buscarCategoriasAdicionales(pedido.automotor_id)
            .then(() =>{
                this.buscarProductosAdicionales(pedido.automotor_id, pedido.version_config_id, this.state.adicionales)
                .then(()=>this.mostrarFormPedidoAutomotor("Modificar Pedido " + pedido.nro_pedido))
            })   
            
        }else{
            this.mostrarFormPedidoProductos("Modificar Pedido " + pedido.nro_pedido)
        }
                
    }

    actualizarPedido = (pedido) => {
        if (pedido.observacion !== ""){
            this.insertarHistoriaPedido(pedido.id, pedido.observacion)
        }
        return pedidosService.actualizarPedido(pedido)
    };

    eliminarPedido = (pedido) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el pedido " + pedido.nro_pedido);
        if (opcion === true) {
            pedidosService.eliminarPedido(pedido.id)
            .then(() => this.buscarPedidos(this.state.filtroPedidos.buscar))
        }
    };

    insertarPedido= (pedido)=>{
        console.log(pedido)
        let promise = new Promise((resolve)=>{
            pedidosService.insertarPedido(pedido, authenticationService.currentUserValue.id)
        .then((res) => {
            this.setState({pedido:{...this.state.pedido, id: res.insertId}, mostrarForm:false},
                () => {
                    if (this.state.pedido.observacion !== "")
                        this.insertarHistoriaPedido(res.insertId, this.state.pedido.observacion)
                    this.insertarProductosPedido(res.insertId, pedido.productos)
                    this.insertarDocumentosPedido(res.insertId, pedido.automotor_version_config_id)
                    this.buscarPedidos(this.state.filtroPedidos.buscar);
                    resolve(true)
                })
            });
        }) 
        return promise       
    }

    insertarProductosPedido =(pedido_id, productos)=>{
        Object.keys(productos).map((index, item) => {
            if (productos[index]){
                pedidosService.insertarProductosPedido(
                    pedido_id, 
                    item+1, 
                    productos[index]["id"],
                    productos[index]["precio"], 
                    productos[index]["cantidad"],     
                    productos[index]["importe"], 
                    productos[index]["nro_lote"], 
                )
            }
        })
    }

    reservarProductos = (productos) =>{
        //console.log(productos)
        Object.keys(productos).map((index) => {     
            if (productos[index]){      
                (productos[index].nro_lote !== 0) && 
                productosInventarioService.reservarProducto(
                    productos[index].id, 
                    productos[index].cantidad, 
                    productos[index].nro_lote
                )            
            }
        })        
    }

    borrarReservaProductos = (productos) =>{   
        let promises = []
        Object.keys(productos).map((index) => {
            if (productos[index]){
                (productos[index].nro_lote !== 0) && 
                promises.push(productosInventarioService.borrarReservaProducto(
                        productos[index].id, 
                        productos[index].cantidad, 
                        productos[index].nro_lote
                    )
                )
            }
        })           
        return Promise.all(promises)        
    }

    utilizarReservaProductos = (productos) =>{       
        Object.keys(productos).map((index) => {  
            if (productos[index]){         
                (productos[index].nro_lote !== 0) && 
                productosInventarioService.utilizarReservaProducto(
                    productos[index].id, 
                    productos[index].cantidad, 
                    productos[index].nro_lote
                )
            }            
        })
    }

    /*************************************************************************/

    seleccionarCliente = async(cliente) => {
        let promise = new Promise((resolve, reject) => {
            this.setState({
                pedido:{...this.state.pedido, 
                    cliente_id: cliente.id, 
                    cliente_nro: cliente.nro_cliente,
                    cliente_documento: cliente.documento, 
                    cliente_condicion_iva: cliente.condicion_iva, 
                    cliente_tipo_factura: cliente.tipo_factura, 
                    cliente_razon_social: cliente.razon_social,
                    cliente_nombre: cliente.apellidos + ", " + cliente.nombres,
                    cliente_telefono: cliente.telefono,
                    cliente_email: cliente.email,
                    cliente_domicilio: cliente.domicilio
                }
            }, ()=>resolve(true))
        }) 
        return promise;       
    }

    obtenerImporte = () =>{
        let importe = this.state.pedido.automotor_precio
        Object.keys(this.state.pedido.productos).map(prod =>{
            importe += (this.state.pedido.productos[prod]?
                this.calcularImporte(this.state.pedido.productos[prod]):0)
        })
        importe = importe *(1-(parseFloat(this.state.pedido.bonificacion)/100))
        return importe;
    }

    calcularImporte = (prod) =>{
        console.log(prod)
        return parseFloat(prod.cantidad)*parseFloat(prod.precio)
    }

    insertarHistoriaPedido =(pedido_id, observacion) =>{
       // console.log(pedido_id, observacion)
        pedidosService.insertarHistoriaPedido(pedido_id, observacion, authenticationService.currentUserValue.id)
    }

    obtenerHistoriaPedido = (pedido_id) =>{
        let promise = new Promise((resolve) =>{
            pedidosService.buscarHistoriaPedido(pedido_id)
            .then((res) => {
                this.setState({pedido:{...this.state.pedido, historia: res}}, ()=>{
                    resolve(true)
                })
            })
        })
        return promise
    }

    buscarProductos = (query) => {
        productosInventarioService.buscarProductos({buscar:query})
        .then((res) => {
            this.setState(
                {
                    productos: res, 
                    filtroProductos:{ 
                        buscar: query
                    },
                    filtros_productos_campos:{
                        ...this.state.filtros_productos_campos,
                        sucursal:{
                            ...this.state.filtros_productos_campos.sucursal,
                            opciones:[...new Set(res.map(o => { return o.sucursal }))]
                        }
                    }     
                }, ()=>{
                    this.state.productos = this.state.productos.map(p => {
                        return {...p, img: img_productos}
                    })
                this.limpiarFiltroProductos()                
            })        
        }) 
    }

    obtenerCatalogo = (query) =>{
        automotorService.obtenerCatalogo({buscar:query})
        .then((res) => {
            this.setState(
                {
                    automotores: res, 
                    filtroAutomotores:{ 
                        buscar: query
                    },
                    filtros_catalogo_campos:{
                        ...this.state.filtros_catalogo_campos,
                        sucursal:{
                            ...this.state.filtros_catalogo_campos.sucursal,
                            opciones:[...new Set(res.map(o => { return o.sucursal }))]
                        }
                    }     
                }, ()=>{
                this.limpiarFiltroCatalogo()                
            })        
        }) 
    }

    setEstadoPedido = (estado) =>{
        let estado_anterior = this.state.pedido.estado
        console.log(this.state.pedido)
        let promise = new Promise((resolve) => {
            this.setState({pedido:{...this.state.pedido, estado: estado, usuario_id: authenticationService.currentUserValue.id}}, ()=>{
                if (this.state.pedido.id === 0){
                    this.insertarPedido(this.state.pedido)
                    .then(()=> resolve(true))
                }else{
                    this.actualizarPedido(this.state.pedido)
                    .then(()=>resolve(true))
                }
            })
        })
        promise.then(()=>{
            this.insertarHistoriaPedido(this.state.pedido.id, estado_anterior + ' => ' + estado)
            if (estado === "RESERVADO"){                        
                this.reservarProductos(this.state.pedido.productos);    
                this.generarOrdenCompra(this.state.pedido.productos)      
            }
            if (estado === "ENTREGADO"){            
                pedidosService.asignarAutomotorCliente(this.state.pedido.automotor_id, this.state.pedido.cliente_id)            
                this.utilizarReservaProductos(this.state.pedido.productos);
                this.cerrarForm()
            }    
            if (estado === "CANCELADO"){                        
                this.borrarReservaProductos(this.state.pedido.id);
                this.cerrarForm()
            }

            if (estado === 'FACTURADO'){
                
                let factura = this.generarFactura(this.state.pedido)
                
                this.props.history.push('/facturacion', {factura: factura, pedido_id: this.state.pedido.id});
                this.cerrarForm()
            }

        })      
     
    }

    generarFactura = (pedido) =>{
        console.log(pedido)
        let detalle = []
        if (pedido.automotor_id !== 0){
            detalle.push({
                item: 1,
                descripcion: pedido.automotor_descripcion,
                precio: pedido.automotor_precio,
                cantidad: 1,
                importe: pedido.automotor_precio
            })
        }
        Object.keys(pedido.productos).map((p) => {
            if (pedido.productos[p]){
                detalle.push({
                    item: detalle.length + 1,
                    descripcion: pedido.productos[p].descripcion,
                    precio: pedido.productos[p].precio,
                    cantidad: pedido.productos[p].cantidad,
                    importe: pedido.productos[p].cantidad * pedido.productos[p].precio
                })
            }
        })
        if (pedido.bonificacion > 0){
            detalle.push({
                item: detalle.length + 1,
                descripcion: "Bonificación %    ",
                precio: pedido.importe/ (1-(pedido.bonificacion/100)),
                cantidad: -pedido.bonificacion,
                importe: -(pedido.importe/ (1-(pedido.bonificacion/100))) * (pedido.bonificacion/100)
            })
        }
        let factura = {
            id: 0,
            nro_factura: '',
            tipo: pedido.cliente_tipo_factura,
            fecha_hora: '',
            cliente_nro: pedido.cliente_nro,
            cliente_id: pedido.cliente_id,
            cliente_nombre: pedido.cliente_razon_social ? pedido.cliente_razon_social : pedido.cliente_nombre,
            cliente_documento: pedido.cliente_documento,
            cliente_telefono: pedido.cliente_telefono,
            cliente_email: pedido.cliente_email,
            cliente_condicion_iva: pedido.cliente_condicion_iva,
            estado: 'INICIADA',
            iva: pedido.cliente_tipo_factura === 'E' ? 0 : Math.round(pedido.importe - (pedido.importe/1.21), -2),
            total: pedido.cliente_tipo_factura === 'E' ? Math.round((pedido.importe/1.21), -2) : pedido.importe,
            saldo: pedido.cliente_tipo_factura === 'E' ? Math.round((pedido.importe/1.21), -2) : pedido.importe,
            eliminado: 0,
            usuario_id: pedido.usuario_id,
            sucursal: pedido.sucursal,
            fecha_modificacion: '',
            detalle: detalle,
            pagos:[],
            historia:[]
        }
        console.log(factura)
        return factura
    }

    handleChange = (e) =>{
        console.log(authenticationService.currentUserValue)
        if (e.target.name === "bonificacion"){
            if (parseInt(e.target.value)< 0)
                e.target.value = "0"
            
            if (parseInt(e.target.value) > authenticationService.currentUserValue.bonificacion_maxima)
                e.target.value = authenticationService.currentUserValue.bonificacion_maxima
        }

        this.setState({
            pedido:{...this.state.pedido,                
                [e.target.name]:e.target.value                
            }}, ()=>{
                this.setState({pedido:{...this.state.pedido, importe: this.obtenerImporte()}})
            }
        )
    }

    generarOrdenCompra = async(productos) =>{
        Object.keys(productos).map(p =>{
            if (productos[p]){
                if ((productos[p].stock - productos[p].cantidad) < productos[p].stock_minimo){
                    ordenesCompraService.generarOrdenCompra(productos[p].id, authenticationService.currentUserValue.sucursal)
                }
            }
        })
        
    }

    selectChange = (e) => {    
        e.preventDefault()
        console.log(e.target.name, e.target.value)
        console.log(this.state)
       
        if (e.currentTarget.value === "0"){
            this.state.pedido.cambios.push('cambio de producto: ' + 
            (this.state.pedido.productos[e.target.name]?this.state.pedido.productos[e.target.name].descripcion: 'Ninguno') + ' => Ninguno')
            this.state.pedido.productos = {
                ...this.state.pedido.productos,
                [e.target.name] : undefined
            }
            this.setState({
                pedido:{...this.state.pedido, 
                    importe: this.obtenerImporte(this.state.pedido.productos)/*, 
                    fecha_minima_turno: this.obtenerFechaMinimaTurno(this.state.pedido.productos[e.target.name])*/
                }
            })
        }
        else{
            this.state.pedido.cambios.push('cambio de producto: ' + 
            (this.state.pedido.productos[e.target.name]?this.state.pedido.productos[e.target.name].descripcion: 'Ninguno') + ' => ' + 
            this.state.productos_adicionales[e.target.name][e.target.value].descripcion)
            this.setState({
                pedido: {
                    ...this.state.pedido,
                        productos:{
                        ...this.state.pedido.productos,
                        [e.target.name]: (e.target.value === 0 ? 
                            null:
                            {...this.state.productos_adicionales[e.target.name][e.currentTarget.value], 
                                importe: this.state.productos_adicionales[e.target.name][e.target.value].precio})                    
                        }
                    }
                }, 
                () => {
                   
                    this.setState({
                        pedido:{...this.state.pedido, 
                            importe: this.obtenerImporte(this.state.pedido.productos)/*, 
                            fecha_minima_turno: this.obtenerFechaMinimaTurno(this.state.pedido.productos[e.target.name])*/
                        }
                    })
                }                
            );
        }
        
    }

    cantidadChange = (e) => {    
        e.preventDefault()
        
        this.state.pedido.cambios.push( 
            this.state.pedido.productos[e.target.name].descripcion + 
            ' - Cantidad: ' + this.state.pedido.productos[e.target.name].cantidad + ' => ' + e.currentTarget.value)
            //console.log(this.state.pedido.cambios) */
            this.state.pedido.productos[e.target.name].cantidad = parseFloat(e.target.value)
        this.setState({
            pedido: {
                ...this.state.pedido,
                    productos:{
                        ...this.state.pedido.productos,
                        [e.target.name]:{
                            ...this.state.pedido.productos[e.target.name],
                            importe: this.calcularImporte(this.state.pedido.productos[e.target.name])
                        }                  
                    }
                }
            }, 
            () => {
               
                this.setState({
                    pedido:{...this.state.pedido, 
                        importe: this.obtenerImporte(this.state.pedido.productos)
                    }
                })
            }                
        );
    }

    onChangeFiltroPedidos = (e) =>{
        console.log(e.target.name, e.target.value)
        this.setState({
            filtros_pedidos_campos:{
                ...this.state.filtros_pedidos_campos,
                [e.target.name]: {
                    ...this.state.filtros_pedidos_campos[e.target.name],
                    valor: e.target.value
                }
            }
        })
    }

    aplicarFiltroPedidos = () =>{
        let filtros = {}
        Object.keys(this.state.filtros_pedidos_campos).map(f =>{
            if (this.state.filtros_pedidos_campos[f].valor !== ''){
                filtros = {
                    ...filtros,
                    [f] : this.state.filtros_pedidos_campos[f].valor
                }
            }
        })
        console.log(filtros)
        this.setState({
            filtroPedidos:{
                buscar: this.state.filtroPedidos.buscar,
                ...filtros
            }
        }, ()=>{
            pedidosService.buscarPedidos(this.state.filtroPedidos)
            .then(res =>{
                this.setState({pedidos: res, mostrarFiltro: false})
            })
        })
        
        
    }

    limpiarFiltroPedidos= () =>{
        Object.keys(this.state.filtros_pedidos_campos).map(f =>{
            this.state.filtros_pedidos_campos[f].valor = ''
        })
        this.setState({filtros_pedidos_campos: this.state.filtros_pedidos_campos})
    }

    onChangeFiltroProductos = (e) =>{
        console.log(e.target.name, e.target.value)
        this.setState({
            filtros_productos_campos:{
                ...this.state.filtros_productos_campos,
                [e.target.name]: {
                    ...this.state.filtros_productos_campos[e.target.name],
                    valor: e.target.value
                }
            }
        })
    }

    aplicarFiltroProductos = () =>{
        let filtros = {}
        Object.keys(this.state.filtros_productos_campos).map(f =>{
            if (this.state.filtros_productos_campos[f].valor !== ''){
                filtros = {
                    ...filtros,
                    [f] : this.state.filtros_productos_campos[f].valor
                }
            }
        })
        console.log(filtros)
        this.setState({
            filtroProductos:{
                buscar: this.state.filtroProductos.buscar,
                ...filtros
            }
        }, ()=>{
            productosInventarioService.buscarProductos(this.state.filtroProductos)
            .then(res =>{
                this.setState({productos: res, mostrarFiltro: false})
            })
        })
        
        
    }

    limpiarFiltroProductos = () =>{
        Object.keys(this.state.filtros_productos_campos).map(f =>{
            this.state.filtros_productos_campos[f].valor = ''
        })
        this.setState({filtros_productos_campos: this.state.filtros_productos_campos})
    }

    onChangeFiltroCatalogo = (e) =>{
        console.log(e.target.name, e.target.value)
        this.setState({
            filtros_catalogo_campos:{
                ...this.state.filtros_catalogo_campos,
                [e.target.name]: {
                    ...this.state.filtros_catalogo_campos[e.target.name],
                    valor: e.target.value
                }
            }
        })
    }

    aplicarFiltroCatalogo = () =>{
        let filtros = {}
        Object.keys(this.state.filtros_catalogo_campos).map(f =>{
            if (this.state.filtros_catalogo_campos[f].valor !== ''){
                filtros = {
                    ...filtros,
                    [f] : this.state.filtros_catalogo_campos[f].valor
                }
            }
        })
        console.log(filtros)
        this.setState({
            filtroAutomotores:{
                buscar: this.state.filtroAutomotores.buscar,
                ...filtros
            }
        }, ()=>{
            automotorService.obtenerCatalogo(this.state.filtroAutomotores)
            .then(res =>{
                this.setState({automotores: res, mostrarFiltro: false})
            })
        })
        
        
    }

    limpiarFiltroCatalogo = () =>{
        Object.keys(this.state.filtros_catalogo_campos).map(f =>{
            this.state.filtros_catalogo_campos[f].valor = ''
        })
        this.setState({filtros_catalogo_campos: this.state.filtros_catalogo_campos})
    }
    
    botonFiltro = () =>{
        this.setState({mostrarFiltro: !this.state.mostrarFiltro})
    }

  
    rolAdmitido(){
        var rol = authenticationService.currentUserValue.role;
        return rol == "Administrador" || rol == "Supervisor de ventas" || rol == "Gerente" || rol == "Administrativo";
     }

    /*************************************************************************/

    render() {
        const pedidos = this.state.pedidos
        return (
            <>
                <Container hidden={this.state.formulario !== ""}>
                    <Busqueda 
                        modulo="Pedidos" 
                        search={this.buscarPedidos}
                        botonFiltro={this.botonFiltro}
                        />
                    <br />
                   
                    <Row>
                        <Col>
                            <FormGroup inline>
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="success"><img src={add} alt=''/>
                                        <DropdownMenu color="success">
                                            <DropdownItem color="success" onClick={ this.llamarCarrito} >
                                                Pedido de Productos            
                                            </DropdownItem>
                                            <DropdownItem color="success" onClick={ this.llamarCatalogo} >
                                                Pedido de Automotor            
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </DropdownToggle>
                                </UncontrolledButtonDropdown>    
                                <Button id="PopoverLegacy1" type="right" color="white">
                                <img src={ayuda} className="menu_ayuda" alt='ayuda' />
                            </Button>
                            <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy1">
                                <PopoverHeader>Pedidos</PopoverHeader>
                                <PopoverBody> Pueden agregarse los pedidos de productos o automotores que el cliente realice. </PopoverBody>
                                <PopoverBody> Cuentan con un estado que representa su situación<br/> <b>(INCIADO, RESERVADO, FACTURADO, ENTREGADO, CANCELADO).</b></PopoverBody>
                                <PopoverBody> Al facturar el pedido, el mismo podrá ser entregado una vez que se haya completado el pago.</PopoverBody>
                            </UncontrolledPopover>                            
                            </FormGroup>
                            
                            <br />
                            <Tabla columnas={{nro_pedido:"Nro Pedido", fecha_hora:"Fecha", cliente_nombre: "Cliente", estado:"Estado", fecha_entrega:"Fecha de entrega", usuario:"Usuario", sucursal:"Sucursal"}} datos={pedidos} editar={this.editarPedido} /*eliminar={this.eliminarPedido}*/ />    
                        </Col>
                        <Col hidden={!this.state.mostrarFiltro} xs={2}>
                            <FormFiltro 
                                filtros={this.state.filtros_pedidos_campos}
                                limpiarFiltros={this.limpiarFiltroPedidos}
                                aplicarFiltro={this.aplicarFiltroPedidos}
                                onChange={this.onChangeFiltroPedidos}
                            />
                        </Col>
                    </Row>
                </Container>
                
                <Container hidden={this.state.formulario !== "Carrito"}>
                    <Busqueda 
                        modulo="Productos" 
                        search={this.buscarProductos}
                        botonFiltro={this.botonFiltro}
                        />
                    <br/>
                    <Row>
                        <Col>
                            <Carrito visible={this.state.formulario === "Carrito"} items={this.state.productos} carrito={this.state.pedido.productos} confirmar={this.confirmarCarrito} cancelar={this.cancelarCarrito}/>
                        </Col>
                        <Col hidden={!this.state.mostrarFiltro} xs={2}>
                            <FormFiltro 
                                filtros={this.state.filtros_productos_campos}
                                limpiarFiltros={this.limpiarFiltroProductos}
                                aplicarFiltro={this.aplicarFiltroProductos}
                                onChange={this.onChangeFiltroProductos}
                            />
                        </Col>
                    </Row>
                </Container>

                <Container hidden={this.state.formulario !== "Catálogo"}>
                    <Busqueda 
                        modulo="Catálogo de automotores" 
                        search={this.obtenerCatalogo}
                        botonFiltro={this.botonFiltro}
                        />
                    <br/>
                    <Row>
                        <Col>
                            <Catalogo visible={this.state.formulario === "Catálogo"} items={this.state.automotores} confirmar={this.confirmarCatalogo} cancelar={this.cancelarCatalogo} detalle={this.detalleCatalogo}/>
                        </Col>
                        <Col hidden={!this.state.mostrarFiltro} xs={2}>
                            <FormFiltro 
                                filtros={this.state.filtros_catalogo_campos}
                                limpiarFiltros={this.limpiarFiltroCatalogo}
                                aplicarFiltro={this.aplicarFiltroCatalogo}
                                onChange={this.onChangeFiltroCatalogo}
                            />
                        </Col>
                    </Row>
                </Container>

                <Container hidden={!this.state.mostrarDetalleAutomotor}>
                    <FormDetalleAutomotor
                        visible={this.state.mostrarDetalleAutomotor}
                        titulo={this.state.automotor.descripcion}
                        automotor={this.state.automotor}
                        cerrar={this.cerrarDetalleCatalogo}
                    />
                </Container>

                <Container hidden={!this.state.mostrarFormPedidoProductos}>
                    <FormPedidoProductos 
                        visible={this.state.mostrarFormPedidoProductos} 
                        formulario={this.state.formulario} 
                        pedido={this.state.pedido} 
                        handleChange={this.handleChange}
                        seleccionarCliente={this.seleccionarCliente}
                        confirmar={this.confirmarPedido} 
                        cancelar={this.cerrarForm} 
                        setEstadoPedido={this.setEstadoPedido}
                        >
                    </FormPedidoProductos>
                </Container>
              
                <Container hidden={!this.state.mostrarFormPedidoAutomotor}>
                    <FormPedidoAutomotor 
                        visible={this.state.mostrarFormPedidoAutomotor} 
                        formulario={this.state.formulario} 
                        pedido={this.state.pedido} 
                        adicionales={this.state.adicionales}
                        productos={this.state.productos_adicionales}
                        selectChange={this.selectChange}
                        handleChange={this.handleChange}
                        cantidadChange={this.cantidadChange}
                        seleccionarCliente={this.seleccionarCliente}
                        confirmar={this.confirmarPedido} 
                        cancelar={this.cerrarForm} 
                        setEstadoPedido={this.setEstadoPedido}
                        documentos={this.state.pedido.documentos}
                        actualizarDocumento={this.actualizarDocumento}
                        >
                    </FormPedidoAutomotor>
                </Container>
            </>
        );
    }
}
export { Pedido };