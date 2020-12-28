import React, { Component } from "react";
import { Busqueda } from '../../components/Busqueda/Busqueda';
import { Tabla } from '../../components/Tabla';
import { FormFactura} from "./FormFactura";
import { FormFiltro} from "../../components/FormFiltro";
import { factuService } from "../../_services/facturacion.services";
import { pagosService } from "../../_services/pagos.services";
import { turnoService } from "../../_services/turnos.services";
import { Badge,PopoverHeader, PopoverBody, UncontrolledPopover,Button } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col} from "reactstrap";
import { authenticationService } from "../../_services/authentication.service";
import { pedidosService } from "../../_services/pedidos.services";
import { ordenesTrabajoService } from "../../_services/ordenesTrabajo.services";
import del from "../../image/delete24.png"
import ayuda from '../../image/informacion.png'

class Facturacion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filtro:{
                buscar:''
            },
            mostrarForm: 'OCULTO',            
            mostrarFiltro:false,
            formulario: '',
            facturas: [],
            factura: {
                id: 0,
                nro_factura: '',
                tipo: 'A',
                fecha_hora: '',
                cliente_id: '',
                cliente_nombre: '',
                cliente_documento:'',
                cliente_telefono:'',
                cliente_email:'',
                estado: '',
                iva: '',
                total: '',
                saldo: '',
                eliminado: '',
                usuario_id: '',
                sucursal: '',
                fecha_modificacion: '',
                detalle: [],
                pagos:[],
                historia:[]
            },
            pago:{
                id: 0,
                nro_pago: '',
                factura_id: 0,
                aux_medio_pago_id: 0,
                aux_nro_transaccion:'',
                aux_importe: 0,
                saldo: 0,
                importe: 0,
                detalle:[]
            },
            medios_pago:[],
            filtros_campos: {
                cliente_nombre:{
                    tipo:"text",
                    descripcion: "Cliente",
                    valor:""
                },
                nro_factura:{
                    tipo:"text",
                    descripcion: "Nro de Factura",
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
            }
        }
    };

    componentDidMount() {
        this.buscarFacturas('');
        this.buscarMediosPago()
        console.log(this.props.location)
        if (this.props.location.state){
            this.setState({factura: this.props.location.state.factura}, ()=>{
                this.insertarFactura(this.state.factura)
                .then((res)=>{
                    if (this.props.location.state.pedido_id){
                        pedidosService.asignarFactura(this.props.location.state.pedido_id, res.insertId)
                    }
                    if (this.props.location.state.orden_id){
                        ordenesTrabajoService.asignarFactura(this.props.location.state.orden_id, res.insertId)
                    }
                    this.props.history.replace({...this.props.location, state: undefined})
                    this.setState({formulario: "Nueva Factura", mostrarForm:"ESCRITURA"})
                    this.inicializarPago()
                })
            })
        }

    }

    buscarFacturas = (query) => {
        factuService.buscarFacturas({buscar: query})
        .then((res) => {
            this.setState(
                {
                    facturas: res, 
                    filtro:{ 
                        buscar: query
                    },
                    filtros_campos:{
                        ...this.state.filtros_campos,
                        estado:{
                            ...this.state.filtros_campos.estado,
                            opciones: [...new Set(res.map(f => { return f.estado }))]
                        },
                        sucursal:{
                            ...this.state.filtros_campos.sucursal,
                            opciones:[...new Set(res.map(f => { return f.sucursal }))]
                        }
                    }                    
                }, ()=>{
                this.limpiarFiltros()                
            })        
        })        
    }

    borrarFactura = () => {
        this.setState({factura: {
            id: 0,
            nro_factura: '',
            tipo: 'A',
            fecha_hora: '',
            cliente_id: '',
            cliente_nombre: '',
            cliente_documento:'',
            cliente_condicion_iva: '',
            cliente_razon_social:'',
            cliente_telefono:'',
            cliente_email:'',
            estado: '',
            iva: '',
            total: '',
            saldo: '',
            eliminado: '',
            usuario_id: '',
            sucursal: '',
            fecha_modificacion: '',
            detalle: [],
            pagos:[],
            historia:[]
        }})
        this.setState({formulario: ''})

    }

    buscarMediosPago = () =>{
        pagosService.buscarMediosPago()
        .then((res)=>{
            this.setState({medios_pago: res})
        })
    }

    verFactura = (factura) =>{
        this.cargarFactura(factura, 'LECTURA')
    }

    editarFactura = (factura) =>{
        this.cargarFactura(factura, 'ESCRITURA')
    }

    cargarFactura = (factura, modo) => {
        let promises = []
        promises.push(factuService.buscarFacturaDetalle(factura.id))
        promises.push(pagosService.buscarPagos('', factura.id))
        promises.push(factuService.buscarHistoriaFactura(factura.id))
        Promise.all(promises)
        .then((res) =>{
            console.log(res)
            this.setState({formulario: "Ver Factura nro: " + factura.nro_factura, mostrarForm:modo, 
                factura:{...factura,
                    detalle: res[0],
                    pagos: res[1],
                    historia: res[2]
                }
            }, ()=>{
                this.inicializarPago()
            })
        })
    }

    insertarFactura = (factura) =>{
        let promises = []
        let promise = new Promise(resolve =>{
            factuService.insertarFactura(factura)
            .then(res => {
                factura.id = res.insertId
                factura.detalle.map(det => {
                    det = {...det, factura_id: res.insertId}
                    promises.push(factuService.insertarFacturaDetalle(det))
                })
            })
            Promise.all(promises)
            .then(res =>{
                resolve(true)
            })
        })
        
        return promise        
    }

    actualizarFactura = (factura) =>{
        factura = {...factura, usuario_id: authenticationService.currentUserValue.id}
        factuService.actualizarFactura(factura)
    }

    confirmarForm = () =>{
        
        if (this.state.factura.id === 0){
           this.insertarFactura(this.state.factura)
        }
        this.cerrarForm()
    }

    cerrarForm = () =>{
        this.setState({mostrarForm:'OCULTO'})
        this.buscarFacturas(this.state.filtro.buscar)
    }

    handleChangeFactura = (e) => {
        this.setState({
          factura: {
            ...this.state.factura,
            [e.target.name]: e.target.value
          }
        });
    };

    handleChangePago = (e) => {
        this.setState({
          pago: {
            ...this.state.pago,
            [e.target.name]: e.target.value
          }
        });
    };

    agregarDetallePago = () =>{
        this.state.pago.detalle.push(
            {
                id_pago: 0,
                medio_pago_id: parseInt(this.state.pago.aux_medio_pago_id),
                medio_pago: this.state.medios_pago.filter(mp => mp.id === parseInt(this.state.pago.aux_medio_pago_id)).map( mp => {return mp.descripcion}),
                nro_transaccion: this.state.pago.aux_nro_transaccion,
                importe: this.state.pago.aux_importe
            }
        )
        this.setState(
            {pago:
                {
                    ...this.state.pago,
                    aux_medio_pago_id: 0,
                    aux_nro_transaccion: '',
                    aux_importe: this.state.factura.total - this.calcularImportePago(), 
                    saldo: this.state.factura.total - this.calcularImportePago(),
                    importe: this.calcularImportePago()
                }
            }
        )    
    }

    calcularImportePago=()=>{
        let importe = 0
        this.state.pago.detalle.map(det =>{
            importe += parseFloat(det.importe)
        })
        return importe
    }

    inicializarPago = () =>{
        this.setState(
            {
                pago:{
                    id: 0,
                    nro_pago: '',
                    aux_medio_pago_id: 0,
                    aux_nro_transaccion: '',
                    aux_importe: this.state.factura.saldo, 
                    saldo: this.state.factura.saldo,
                    importe: this.calcularImportePago(),
                    detalle:[]
                }
            }
        )
    }

    verPago = (pago) =>{
        console.log(pago)
        console.log(this.state)
        let promise = new Promise(resolve =>{
            pagosService.obtenerDetallePago(pago.id)
            .then(res =>{                
                this.setState(
                    {
                        pago:{
                            ...this.state.pago,
                            id: pago.id,
                            nro_pago: pago.nro_pago,
                            importe: pago.importe,
                            detalle: res
                        }
                    }, ()=>{
                        resolve(true)
                    }
                )
            })
        })
        return promise     
    }

    confirmarPago=()=>{
        this.setState(
            {
                pago:{...this.state.pago, 
                    cliente_id: this.state.factura.cliente_id,
                    usuario_id: authenticationService.currentUserValue.id
                }
            }, ()=>{
            pagosService.insertarPago(this.state.pago)
            .then(res=>{
                this.state.factura.pagos.push(this.state.pago)
                factuService.insertarFacturaPago(res.insertId, this.state.factura.id)
                this.state.pago.detalle.map(det =>{
                    det = {...det, pago_id: res.insertId}
                    pagosService.insertarPagoDetalle(det)
                })
            })
        })        
        this.setState(
            {
                factura:{
                    ...this.state.factura,
                    saldo: this.calcularSaldo(),
                    estado: this.calcularSaldo() === 0 ? 'PAGADA' : 'PAGO PARCIAL'               
                }
            }, ()=>{
                factuService.actualizarFactura(this.state.factura)
                .then(() => {
                   this.verFactura(this.state.factura)
                })                
            }
        )
        

    }

    calcularSaldo = () =>{
        let saldo = this.state.factura.total
        this.state.factura.pagos.map(p => {
            saldo -= p.importe
        }) 
        return saldo - this.state.pago.importe
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
            filtro:{
                buscar: this.state.filtro.buscar,
                ...filtros
            }
        }, ()=>{
            factuService.buscarFacturas(this.state.filtro)
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

    render() {
        console.log(this.state)
        return (
        <>
            <Container size="lg">
                <Busqueda 
                    modulo="Facturas" 
                    search={this.buscarFacturas}
                    botonFiltro={this.botonFiltro}                    
                    />
             
                <Button id="PopoverLegacy1" type="right" color="white">
                                <img src={ayuda} className="menu_ayuda" alt='ayuda' />
                            </Button>
                            <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy1">
                                <PopoverHeader>Facturas</PopoverHeader>
                                <PopoverBody> Las facturas corresponden a pedidos de productos y automotores.  </PopoverBody>
                                <PopoverBody> Cuentan con un estado que representa la situación del pago <br/> <b>(INICIADA, PAGO PARCIAL, PAGADA)</b></PopoverBody>
                                <PopoverBody> A través de la edición de factura es posible ingresar los pagos que efectúe el cliente.</PopoverBody>
                            </UncontrolledPopover>
                <Row>
                <Col>
                        {
                            Object.keys(this.state.filtro).map(f =>{
                                
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
                        
                        <Tabla columnas={{nro_factura:"Nro Factura", fecha_hora:"Fecha", cliente_nombre: "Cliente", total:"Total", saldo:"Saldo", estado:"Estado", usuario:"Usuario", sucursal:"Sucursal"}} 
                            datos={this.state.facturas} 
                            editar={this.editarFactura} 
                            ver={this.verFactura} />
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
            <Container hidden={this.state.mostrarForm === 'OCULTO'}>
                <FormFactura
                    visible={this.state.mostrarForm !== 'OCULTO'}
                    editable={this.state.mostrarForm === 'ESCRITURA'}
                    formulario={this.state.formulario}
                    factura={this.state.factura}
                    confirmar={this.confirmarForm}
                    cancelar={this.cerrarForm}
                    onChange={this.handleChangeFactura}
                    pago={this.state.pago}
                    onChangePago={this.handleChangePago}
                    mediosPago={this.state.medios_pago}
                    agregarDetallePago={this.agregarDetallePago}
                    confirmarPago={this.confirmarPago}
                    verPago={this.verPago}
                    nuevoPago={this.inicializarPago}
                />
            </Container>                    
        </>
        )
    }
}

export {Facturacion}
