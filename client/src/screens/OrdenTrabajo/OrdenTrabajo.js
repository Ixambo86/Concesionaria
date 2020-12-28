import React, {Component} from 'react';
import { Badge, Button, Container, Form, Row, Col } from "reactstrap";
import { Busqueda } from '../../components/Busqueda/Busqueda'
import { Tabla } from '../../components/Tabla'
import { FormOrdenTrabajo } from './FormOrdenTrabajo'
import { ordenesTrabajoService } from '../../_services/ordenesTrabajo.services'
import { ordenesCompraService } from '../../_services/ordenesCompra.service'
import { Carrito } from "../Carrito/Carrito";
import { servicioService } from '../../_services/servicios.services';
import { FormFiltro } from "../../components/FormFiltro";
import add from "../../image/add24.png"
import del from "../../image/delete24.png"
import img_servicio from "../../image/service.png"

import "bootstrap/dist/css/bootstrap.min.css";
import {productosInventarioService} from '../../_services/productosInventario.service';
import {turnoService} from '../../_services/turnos.services';

import { authenticationService } from '../../_services/authentication.service';
import { useHistory } from 'react-router-dom';

class OrdenTrabajo extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            filtroServicios: '',
            servicios:[],
            productos:[],
            filtroOrdenes: {
                buscar:''
            },
            ordenes: [],
            mostrarForm: false,
            mostrarFiltro:false,
            formulario: '',
            orden: {
                id: 0,
                nro_orden: 0,
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
                automotor_dominio:'',
                automotor_descripcion:'',
                automotor_motor:'',
                automotor_km:0,
                importe_servicios: 0,
                importe_productos:0,
                importe:0,
                fecha_minima_turno: '',
                observacion: "",
                estado:'',
                cambios: [],
                servicios:[],
                productos:[],
                historia:[]
            },
            filtros_campos: {
                cliente_nombre:{
                    tipo:"text",
                    descripcion: "Cliente",
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
                automotor_descripcion:{
                    tipo:"text",
                    descripcion: "Descripción del automotor",
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
                nro_orden: 0,
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
                automotor_dominio:'',
                automotor_descripcion:'',
                automotor_motor:'',
                automotor_km:0,
                importe_servicios: 0,
                importe_productos:0,
                importe:0,
                fecha_minima_turno: '',
                observacion: "",
                estado:'',
                cambios: [],
                servicios:[],
                productos:[],
                historia:[]
            },
            productos:[]
        })
    }
  
    componentDidMount() {
        this.buscarOrdenes(this.state.filtroOrdenes.buscar);
        this.buscarServicios(this.state.filtroServicios)
    }

    llamarCarrito = () => {
        this.inicializarDatos()
        this.setState({formulario: "Carrito", mostrarForm:false});
    }

    confirmarCarrito = (carrito, total) => {
        this.setState({orden:{...this.state.orden, servicios: carrito, importe_servicios: total, cantidad_modulos: this.obtenerCantidadModulos(carrito)}, filtroServicios:''}, ()=>{
            this.mostrarForm("Nueva Orden de Trabajo", this.state.orden)
            this.buscarServicios('')
        })    
    }

    cancelarCarrito = () => {
        this.setState({formulario: "", filtroServicios:""})
        this.buscarServicios('')
    }

    confirmarOrden = () => {
       // console.log(this.state.orden)
        if (this.state.orden.id === 0)
            this.insertarOrden(this.state.orden)
        else
            this.actualizarOrden(this.state.orden)
        this.cerrarForm()
        
    }

    mostrarForm = (formulario) => {
        this.setState({formulario: formulario, mostrarForm: true})
    }

    cerrarForm = () => {
        this.buscarOrdenes(this.state.filtroOrdenes.buscar);
        this.setState({ formulario:"", mostrarForm: false });
        
    }

    /************************************************************/

    buscarOrdenes = query => {
        ordenesTrabajoService.buscarOrdenes({buscar:query})
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

    buscarServicios = query => {
        servicioService.buscarServicios(query)
        .then((res) => {
            this.setState(
                {
                    servicios: res.map( s => {return {...s, img: img_servicio}}), 
                    filtroServicios: query
                }
            )
        });            
    }

    editarOrden = (orden) =>{
        
        let promises = []
        promises.push(ordenesTrabajoService.buscarProductosOrden(orden.id))
        promises.push(ordenesTrabajoService.buscarServiciosOrden(orden.id))
        promises.push(ordenesTrabajoService.buscarHistoriaOrden(orden.id))
        Promise.all(promises)
        .then((res) => {
            this.obtenerProductos(orden.automotor_id, res[1])
            this.setState({
                orden:{...orden, 
                    productos: res[0],
                    importe_productos: this.obtenerImporte(res[0]),
                    servicios: res[1],
                    importe_servicios: this.obtenerImporteServicios(res[1]),
                    historia: res[2], 
                    cantidad_modulos: this.obtenerCantidadModulos(res[1]),
                    cambios:[], 
                    observacion:""
                }
            },()=>{
                this.mostrarForm("Modificar Orden de Trabajo " + orden.nro_orden)
            })
        })  
    }

    obtenerFechaMinimaTurno = (producto) =>{
        let fecha_minima = this.state.orden.fecha_minima_turno ? 
            this.state.orden.fecha_minima_turno.substr(6,4) + 
            this.state.orden.fecha_minima_turno.substr(3,2) + 
            this.state.orden.fecha_minima_turno.substr(0,2) 
            : '00000000'
       
            let aux = producto?producto.fecha_entrega.substr(6,4) + producto.fecha_entrega.substr(3,2) + producto.fecha_entrega.substr(0,2) : '00000000'    
            if (aux > fecha_minima)
                fecha_minima = aux
        return fecha_minima.substr(6, 2) + '/' + fecha_minima.substr(4, 2) + '/' + fecha_minima.substr(0, 4)
    }

    actualizarOrden = (orden) => {
      //  console.log(orden.cambios)
      if (orden.observacion !== ""){
        this.insertarHistoriaOrden(orden.id, orden.observacion)
      }
        ordenesTrabajoService.actualizarOrden(orden)
        .then(()=>{
            this.buscarOrdenes(this.state.filtroOrdenes.buscar)
        })
       
        orden.cambios.map(c =>{
            this.insertarHistoriaOrden(orden.id, c)
        })
        if (orden.cambios.length > 0) {                
            this.borrarReservaProductos(orden.id)
            .then(() => {
                this.reservarProductos(orden.productos);
                ordenesTrabajoService.borrarProductosOrden(orden.id)
                .then(() => this.insertarProductosOrden(orden.id, orden.productos))
            })
            
        }
        this.cerrarForm()    
    };

    eliminarOrden = (orden) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar la orden " + orden.nro_orden);
        if (opcion === true) {
            ordenesTrabajoService.buscarProductosOrden(orden.id)
            .then((res) =>{
                this.borrarReservaProductos(res)
            })
            
            this.insertarHistoriaOrden(orden.id, "Orden eliminada")
            ordenesTrabajoService.eliminarOrden(orden.id)
            .then(() => {
                this.buscarOrdenes(this.state.filtroOrdenes.buscar)
            })
        }
    };

    insertarOrden= (orden)=>{
        
       ordenesTrabajoService.insertarOrden(orden, authenticationService.currentUserValue.id)
       .then((res) => {
        this.setState({orden:{...this.state.orden, id: res.insertId}, mostrarForm:false},
            () => {
                if (this.state.orden.observacion !== "")
                    this.insertarHistoriaOrden(res.insertId, this.state.orden.observacion)
                this.insertarProductosOrden(res.insertId, orden.productos)
                this.reservarProductos(orden.productos)
                this.generarOrdenCompra(orden.productos)
                this.insertarServiciosOrden(res.insertId, orden.servicios)
                this.buscarOrdenes(this.state.filtroOrdenes.buscar);
            })
        });
    }

    insertarProductosOrden =(orden_id, productos)=>{
        Object.keys(productos).map((index, item) => {
            ordenesTrabajoService.insertarProductosOrden(
                orden_id, 
                item, 
                productos[index]["id"], 
                productos[index]["cantidad"], 
                productos[index]["precio"], 
                productos[index]["nro_lote"] 
            )
        })
    }

    insertarServiciosOrden =(orden_id,servicios)=>{
        servicios.map((serv, item) => {
            ordenesTrabajoService.insertarServiciosOrden(orden_id, item, serv.id, serv.cantidad, serv.importe)
        })
    }

    reservarProductos = (productos) =>{
        //console.log(productos)
        Object.keys(productos).map((index) => {
           
            (productos[index].nro_lote !== 0) && productosInventarioService.reservarProducto(
                    productos[index].id, 
                    productos[index].cantidad, 
                    productos[index].nro_lote)
            
        })        
    }

    borrarReservaProductos = (productos) =>{   
        let promises = []
        Object.keys(productos).map((index) => {
           
            (productos[index].nro_lote !== 0) && 
            promises.push(productosInventarioService.borrarReservaProducto(
                    productos[index].id, 
                    productos[index].cantidad, 
                    productos[index].nro_lote))
        })           
        return Promise.all(promises)        
    }

    utilizarReservaProductos = (productos) =>{       
        Object.keys(productos).map((index) => {           
            (productos[index].nro_lote !== 0) && 
            productosInventarioService.utilizarReservaProducto(
                productos[index].id, 
                productos[index].cantidad, 
                productos[index].nro_lote)            
        })
    }

    /*************************************************************************/

    seleccionarCliente = async(cliente) => {
        let promise = new Promise((resolve, reject) => {
            this.setState({
                orden:{...this.state.orden, 
                    cliente_id: cliente.id, 
                    cliente_nro: cliente.nro_cliente,
                    cliente_documento: cliente.documento, 
                    cliente_condicion_iva: cliente.condicion_iva, 
                    cliente_tipo_factura: cliente.tipo_factura, 
                    cliente_razon_social: cliente.razon_social,
                    cliente_nombre: cliente.apellidos + ", " + cliente.nombres,
                    cliente_telefono: cliente.telefono,
                    cliente_email: cliente.email,
                    cliente_domicilio: cliente.domicilio,
                    automotor_id: 0,
                    automotor_descripcion: "", 
                    automotor_dominio: "",
                    automotor_motor: "",
                    automotor_km: 0
                }
            }, ()=>resolve(true))
        }) 
        return promise;       
    }

    seleccionarAutomotor = (automotor) => {
        
        let promise = new Promise((resolve, reject) => {
            this.obtenerProductos(automotor.id, this.state.orden.servicios)
            .then((res) =>{
                this.setState({
                    orden:{...this.state.orden, 
                        automotor_id: automotor.id,
                        automotor_descripcion: automotor.marca + " " + automotor.modelo + " " + automotor.version ,
                        automotor_dominio: automotor.dominio,
                        automotor_motor: automotor.tipo_motor,
                        automotor_km: automotor.km
                    }
                }, ()=>resolve(true))
                
            })
        })           
        return promise;        
    }

    obtenerCantidadModulos = (servicios) =>{
        let cantidad_modulos = 0;
        servicios.map(s => {
            cantidad_modulos += s.cantidad_modulos
        })
        return Math.ceil(cantidad_modulos)
    }

    obtenerImporte = (productos) =>{
        let importe = 0
        Object.keys(productos).map(prod =>{
            importe += (productos[prod]?parseFloat(productos[prod]["cantidad"])*productos[prod]["precio"]:0)
        })
        return importe;
    }

    obtenerImporteServicios = (servicios) =>{
        let importe = 0
        servicios.map(serv =>{
            importe += serv.precio
        })
        return importe;
    }

    handleChange = (e) =>{
        this.setState({
            orden:{...this.state.orden, 
                [e.target.name]:e.target.value
            }
        })
    }

    selectChange = (e) => {    
        e.preventDefault()

        this.state.orden.cambios.push('cambio de producto: ' + 
            (this.state.orden.productos[e.target.name]?this.state.orden.productos[e.target.name].descripcion: 'Ninguno') + ' => ' + 
            this.state.productos[e.target.name][e.currentTarget.value].descripcion)
            //console.log(this.state.orden.cambios) 
        this.setState({
            orden: {
                ...this.state.orden,
                    productos:{
                    ...this.state.orden.productos,
                    [e.target.name]: (e.target.value === 0 ? null:this.state.productos[e.target.name][e.currentTarget.value])                    
                    }
                }
            }, 
            () => {
               
                this.setState({
                    orden:{...this.state.orden, 
                        importe_productos: this.obtenerImporte(this.state.orden.productos), 
                        importe: this.state.orden.importe_servicios + this.obtenerImporte(this.state.orden.productos), 
                        fecha_minima_turno: this.obtenerFechaMinimaTurno(this.state.orden.productos[e.target.name])
                    }
                })
            }                
        );
    }

    cantidadChange = (e) => {    
        e.preventDefault()
        
        this.state.orden.cambios.push( 
            this.state.orden.productos[e.target.name].descripcion + 
            ' - Cantidad: ' + this.state.orden.productos[e.target.name].cantidad + ' => ' + e.currentTarget.value)
            //console.log(this.state.orden.cambios) */
        this.setState({
            orden: {
                ...this.state.orden,
                    productos:{
                        ...this.state.orden.productos,
                        [e.target.name]:{
                            ...this.state.orden.productos[e.target.name],
                            cantidad: parseFloat(e.target.value)
                        }                  
                    }
                }
            }, 
            () => {
               
                this.setState({
                    orden:{...this.state.orden, 
                        importe_productos: this.obtenerImporte(this.state.orden.productos), 
                        importe: this.state.orden.importe_servicios + this.obtenerImporte(this.state.orden.productos), 
                        fecha_minima_turno: this.obtenerFechaMinimaTurno(this.state.orden.productos[e.target.name])
                    }
                })
            }                
        );
    }

    insertarHistoriaOrden =(orden_id, observacion) =>{
       // console.log(orden_id, observacion)
        ordenesTrabajoService.insertarHistoriaOrden(orden_id, observacion, authenticationService.currentUserValue.id)
    }

    

    obtenerProductos = (automotor_id, servicios) => {
        //  this.setState({productos:[]})
      //  console.log(servicios)
        let finalizo = false
        let promises = [] 
        this.state.productos = []
        //console.log(servicios)
        servicios && servicios.map((s) => {    
            //console.log("entre servicios")
            promises.push(servicioService.obtenerProductos(automotor_id, s.id))     
            //console.log(promises)
        })
        //console.log(promises)
        let promise = new Promise((resolve) =>{
            Promise.all(promises)
            .then((results) => {
                if (!results)
                    resolve(false)
                results.map((res, item) =>{
                    Object.keys(res).map( (prod, index) => {
                        this.state.productos[item] = this.state.productos[item] ||[]
                        this.state.productos[item][res[prod].id] = this.state.productos[item][res[prod].id] || []
                    //   this.state.productos[item][res[prod].id] = res[prod]
                    
                        this.setState({
                            productos: {...this.state.productos, 
                                [item]: this.state.productos[item] || [],
                                [item]:{...this.state.productos[item], 
                                    [res[prod].id] : this.state.productos[item][res[prod].id] ||[],
                                    [res[prod].id] : res[prod]
                                }
                            }               
                        }, ()=>{
                            //if (item ===)
                            resolve(true)
                        })      
                    })
                })                
            })
        })
        
        return promise;
    }

    setEstadoOrden = (estado) =>{
        
        if (estado === 'CANCELADA' || estado === 'AUSENTE'){
            this.borrarReservaProductos(this.state.orden.productos)
            this.cerrarForm() 
        }
        if (estado === 'FINALIZADA'){
            this.utilizarReservaProductos(this.state.orden.productos)
        }

        this.insertarHistoriaOrden(this.state.orden.id, this.state.orden.estado + ' => ' + estado)
        // this.state.orden.estado = estado
        this.setState({orden:{...this.state.orden, estado: estado}}, ()=>{
            ordenesTrabajoService.actualizarOrden(this.state.orden)
            .then(()=>{ 
                this.buscarOrdenes(this.state.filtroOrdenes.buscar)
                ordenesTrabajoService.buscarHistoriaOrden(this.state.orden.id)
                if (estado === 'FACTURADA'){
                    this.cerrarForm()
                    let factura = this.generarFactura(this.state.orden)
                    
                    this.props.history.push('/facturacion', {factura: factura, orden_id: this.state.orden.id});
                }
            })
        })  
        
    }

    generarFactura = (orden) =>{
        let factura = {
            id: 0,
            nro_factura: '',
            tipo: orden.cliente_tipo_factura,
            fecha_hora: '',
            cliente_id: orden.cliente_id,
            cliente_nro: orden.cliente_nro,
            cliente_nombre: orden.cliente_razon_social ? orden.cliente_razon_social : orden.cliente_nombre,
            cliente_documento: orden.cliente_documento,
            cliente_telefono: orden.cliente_telefono,
            cliente_email: orden.cliente_email,
            estado: 'INICIADA',
            iva: orden.cliente_tipo_factura === 'E' ? 0 : Math.round(orden.importe - (orden.importe/1.21), -2),
            total: orden.cliente_tipo_factura === 'E' ? Math.round((orden.importe/1.21), -2) : orden.importe,
            saldo: orden.cliente_tipo_factura === 'E' ? Math.round((orden.importe/1.21), -2) : orden.importe,
            eliminado: 0,
            usuario_id: orden.usuario_id,
            sucursal: orden.sucursal,
            fecha_modificacion: '',
            detalle: [
                ...orden.servicios.map((s, i) => {
                    return {
                        item: i+1,
                        descripcion: s.descripcion,
                        precio: s.precio,
                        cantidad: 1,
                        importe: s.precio
                    }
                }),
                ...orden.productos.map((p, i) => {
                    return{
                        item: i+ orden.servicios.length+1,
                        descripcion: p.descripcion,
                        precio: p.precio,
                        cantidad: p.cantidad,
                        importe: p.cantidad * p.precio
                    }
                })                
            ],
            pagos:[],
            historia:[]
        }
        return factura
    }

    generarOrdenCompra = (productos) =>{
        console.log("generar orden compra", productos)
        Object.keys(productos).map(p =>{
            if ((productos[p].stock - productos[p].cantidad) < productos[p].stock_minimo){
                console.log("stock minimo", productos[p])
                ordenesCompraService.generarOrdenCompra(productos[p].id, authenticationService.currentUserValue.sucursal)
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
            ordenesTrabajoService.buscarOrdenes(this.state.filtroOrdenes)
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
    
    rolAdmitido(){
        var rol = authenticationService.currentUserValue.role;
        return rol == "Administrador" || rol == "Gerente" || rol == "Administrativo";
     }


    render() {
        
        const ordenes = this.state.ordenes
        return (
            <>
                <Container hidden={this.state.formulario !== ""}>
                
                    <Busqueda 
                        modulo="Ordenes de Trabajo" 
                        search={this.buscarOrdenes}
                        botonFiltro={this.botonFiltro}
                        />
                    <br />
                    <Row>
                        <Col>
                            {this.rolAdmitido()?
                            <Form inline>
                                <Button color="success" onClick={this.llamarCarrito} >
                                    <img src={add} alt=''/>             
                                </Button>                                                
                            </Form>
                            :""}
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
                            <br />
                    
                            <Tabla columnas={{nro_orden:"Nro Orden", fecha_hora:"Fecha", cliente_nombre: "Cliente", automotor_descripcion:"Automotor", estado:"Estado", usuario:"Usuario", sucursal:"Sucursal"}} datos={ordenes} editar={this.rolAdmitido()?this.editarOrden:""}/* eliminar={this.eliminarOrden} *//>    
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
                
                <Container hidden={this.state.formulario !== "Carrito"}>
                    <Busqueda modulo="Servicios" search={this.buscarServicios}/>
                    <br/>
                <Carrito visible={this.state.formulario === "Carrito"} items={this.state.servicios} carrito={this.state.orden.servicios} confirmar={this.confirmarCarrito} cancelar={this.cancelarCarrito}/>
                </Container>
                
                <Container hidden={!this.state.mostrarForm}>
                    <FormOrdenTrabajo 
                        visible={this.state.mostrarForm} 
                        formulario={this.state.formulario} 
                        orden={this.state.orden} 
                        editarServicios={this.llamarCarrito}
                      //  servicios={this.state.servicios}
                        productos={this.state.productos}
                        cantidadChange={this.cantidadChange}
                        selectChange={this.selectChange}
                        handleChange={this.handleChange}
                        seleccionarCliente={this.seleccionarCliente}
                        seleccionarAutomotor={this.seleccionarAutomotor}
                        confirmar={this.confirmarOrden} 
                        cancelar={this.cerrarForm} 
                        setEstadoOrden={this.setEstadoOrden}
                        >
                    </FormOrdenTrabajo>
                </Container>
            </>
        );
    }
}
export { OrdenTrabajo };