import React, {useState} from "react";
import { Label,Button, Col, Row, Input, InputGroup, Container, ModalHeader, ModalBody, ModalFooter, Modal, Alert, ButtonDropdown, ButtonGroup,PopoverHeader, PopoverBody, UncontrolledPopover, } from "reactstrap";
import { FormSelectList } from '../../components/FormSelectList';
import { FormDocumentos } from './FormDocumentos';
import { Tabla } from '../../components/Tabla'
import { clienteService } from '../../_services/clientes.services'

import search from "../../image/search16.png"
import ok from "../../image/accept24.png"
import cancel from '../../image/cancel24.png'
import warning from '../../image/warning24.png'
import ayuda from '../../image/informacion.png'
const FormPedidoAutomotor = (props) => {
    const [clientes, setClientes] = useState([])
    const [lista, setLista] = useState("")
    const [mostrarDocumentos, setMostrarDocumentos] = useState(false)

    const mostrarListaClientes = () =>{
        buscarClientes("");
        setLista("Clientes")
    }

    const cerrarLista = () => {
        setLista("")
    }

    const buscarClientes = (filtro) => {
        clienteService.buscarClientes(filtro)
        .then((res) => setClientes(res))
    }

    const seleccionarCliente = (cliente) => {
        props.seleccionarCliente(cliente)
        cerrarLista()
    }

    const validarEstadoReservar = () =>{
        let res = true
        res &= (props.pedido.estado === 'INICIADO')
        res &= (props.pedido.cliente_id !== 0)

        return res
    }

    const validarEstadoEntregar = () =>{
        let res = true
        res &= (props.pedido.estado === 'FACTURADO')

        return res
    }

    const validarEstadoFacturar = () =>{
        let res = true
        res &= props.pedido.estado === 'RESERVADO'
        res &= validarDocumentacion()
        res &= props.pedido.automotor_id > 0
        return res
    }

    const validarEstadoCancelar = () =>{
        let res = true
        res &= (props.pedido.estado !== 'ENTREGADO')
        res &= (props.pedido.estado !== 'CANCELADO')
        res &= (props.pedido.id !== 0)

        return res
    }

    const validarEstadoConfirmar = () =>{
        let res = true
        res &= (props.pedido.estado !== 'ENTREGADO')
        res &= (props.pedido.estado !== 'CANCELADO')
        res &= (props.pedido.cliente_id !== 0)

        return res
    }

    const validarComboProductos = () =>{
        let res = false
        res |= (props.pedido.estado === '')
        res |= (props.pedido.estado === 'INICIADO')
        return res
    }

    const validarDocumentacion = () =>{
        let res=(props.documentos.length > 0)
       
        return res
    }

    console.log("props.documentos.length", props.documentos.length)
    return (
        <>
            <Container hidden={lista !== "Clientes"}>
                <FormSelectList 
                    visible={lista === "Clientes"} 
                    titulo={lista} 
                    columnas={{documento:"Documento", apellidos:"Apellidos", nombres:"Nombres"}} 
                    datos={clientes} 
                    seleccionar={seleccionarCliente}
                    cerrar={cerrarLista} 
                    buscar={buscarClientes}>
                </FormSelectList>
            </Container>

            <Container hidden={!mostrarDocumentos}>
                <FormDocumentos 
                    visible={mostrarDocumentos}
                    titulo="Documentación Requerida"
                    documentos={props.documentos}
                    actualizarDocumento={props.actualizarDocumento}
                    cerrar={()=>setMostrarDocumentos(false)}
                />
            </Container>
            
            <Modal isOpen={props.visible} size="xl">
                <ModalHeader>
                   <h3>{props.formulario}</h3>
                </ModalHeader>
                <ModalBody style={{"overflow-y":"auto"}}>
                    <Row>
                        <Col>
                            <span>Fecha de Creación</span>
                            <Input value={props.pedido.fecha_hora}  disabled/>
                        </Col>
                        <Col>
                            <span>Estado</span>
                            <Input value={props.pedido.estado}  disabled/>
                        </Col>
                        <Col>
                            <span>Fecha de Entrega</span>
                            <Input value={props.pedido.fecha_entrega}  disabled/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Alert size="sm" color="warning" hidden={props.pedido.cliente_id > 0}>
                                <Col><Col><Col><Col><Col><Col><Col><Col><Col>
                                    Seleccione un cliente
                                 <Button id="PopoverLegacy1" type="right" color="white">
                                 <img src={warning} alt='' align="right"/>
                            </Button>
                            <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy1">
                                <PopoverBody> En el caso de que el cliente no exista, debe registrarse desde la sección <b>Clientes</b></PopoverBody>
                            </UncontrolledPopover></Col></Col></Col></Col></Col></Col></Col></Col></Col>
                            </Alert>
                            <h6>Cliente</h6>
                            <InputGroup>
                                <Input 
                                    value={"Nro Cliente: " + props.pedido.cliente_nro}
                                    placeholder="Seleccionar cliente"
                                    disabled >
                                </Input>
                                    <Button color="primary" size="md" onClick={mostrarListaClientes} >
                                        <img src={search} alt=''/>
                                    </Button>
                            </InputGroup>
                            <Input 
                                value={"Nombre: " + props.pedido.cliente_nombre}
                                placeholder="Nombre del cliente"
                                disabled >
                            </Input>
                            <Input 
                                value={"Documento: " + props.pedido.cliente_documento}
                                placeholder="Documento del cliente"
                                disabled >
                            </Input>
                            <Input 
                                value={"Condición IVA: " + props.pedido.cliente_condicion_iva}
                                placeholder="Condicion IVA"
                                disabled >
                            </Input>
                            <Input 
                                value={"Tel: " + props.pedido.cliente_telefono}
                                placeholder="Telefono del cliente"
                                disabled>
                            </Input>
                            <Input 
                                value={"Email: " + props.pedido.cliente_email}
                                placeholder="Email del cliente"
                                disabled>
                            </Input>
                        </Col>
                        <Col>
                            <h6>Automotor</h6>
                            <Input 
                                value={"Dominio: " + props.pedido.automotor_dominio}
                                placeholder="Dominio del vehiculo"
                                disabled>
                            </Input>
                            <Input 
                                value={props.pedido.automotor_descripcion}
                                placeholder="Descripcion del vehiculo"
                                disabled >
                            </Input>
                            <Input 
                                value={"Kms: " + props.pedido.automotor_km}
                                placeholder="KMs del vehiculo"
                                disabled >
                            </Input>
                            <Input 
                                value={"Origen: " + props.pedido.automotor_origen}
                                placeholder="Origen del vehiculo"
                                disabled >
                            </Input>
                            <Input 
                                value={"Precio: $" + props.pedido.automotor_precio}
                                placeholder="Precio del vehiculo"
                                disabled >
                            </Input>
                        </Col>
                    </Row>
                    <br/>
                    <Row >
                        <Col>
                            <h6>Adicionales</h6>
                            { 
                                Object.keys(props.productos).map((item, i) => {
                                    return(
                                        <Row xs={8}>
                                            <Col xs={3}>
                                            <b hidden={i>0}>Descripción</b>
                                                <Input 
                                                    name={item}
                                                    type="select"
                                                    value={ props.pedido.productos[item]?props.pedido.productos[item].id:0}
                                                    onChange={props.selectChange} 
                                                 >
                                                    <option value="0"  hidden={props.pedido.productos[item]}>Seleccionar {props.adicionales[item].descripcion}</option>
                                                    <option value="0"  hidden={!props.pedido.productos[item]}>Quitar {props.adicionales[item].descripcion}</option>
                                                    {
                                                        Object.keys(props.productos[item]).map(prod=> {
                                                            return(
                                                                <option value={prod} selected={props.pedido.productos[item]?prod===props.pedido.productos[item].id:false} disabled={!validarComboProductos()}>
                                                                
                                                                        {props.productos[item][prod].descripcion}
                                                                
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </Input>
                                            </Col>
                                            <Col>
                                                <b hidden={i>0}>Stock</b>
                                                <Input  
                                                    type="text"
                                                    value={ props.pedido.productos[item]?props.pedido.productos[item].stock:0}
                                                    disabled
                                                />
                                            </Col>
                                            <Col>
                                                <b hidden={i>0}>Disponible</b>
                                                <Input  
                                                    type="text"
                                                    value={ props.pedido.productos[item]?props.pedido.productos[item].fecha_entrega:0}
                                                    disabled
                                                />
                                            </Col>
                                            <Col>
                                                <b hidden={i>0}>Precio</b>
                                                <Input  
                                                    type="text"
                                                    value={ props.pedido.productos[item]? "$ " + props.pedido.productos[item].precio: "$ " + 0}
                                                    disabled
                                                />
                                            </Col>
                                            <Col>
                                                <b hidden={i>0}>Cantidad</b>
                                                <Input  
                                                    name={item}
                                                    type="number"
                                                    value={ props.pedido.productos[item]?props.pedido.productos[item].cantidad:0}
                                                    onChange={props.cantidadChange}
                                                    disabled={!props.pedido.productos[item]}
                                                />
                                            </Col>
                                            <Col >
                                                <b hidden={i>0}>Importe</b>
                                                <Input  
                                                    type="text"
                                                    value={ props.pedido.productos[item]? "$ " + props.pedido.productos[item].importe: "$ " + 0}
                                                    disabled
                                                />
                                            </Col>
                                        </Row>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                            <Col xs={8}>
                                <Button color="success" hidden={!validarDocumentacion()}
                                    onClick={()=>setMostrarDocumentos(true)}>
                                    <img src={ok} alt=''/>Documentación Requerida
                                </Button>
                            </Col>
                            <Col xs={1}>
                                <h6>Bonificación</h6>
                            </Col>
                            <Col xs={1}>
                                <Input 
                                    type="number"
                                    name="bonificacion"
                                    value={props.pedido.bonificacion}
                                    onChange={props.handleChange}
                                />
                            </Col>
                            <Col><h5>Total: $ {props.pedido.importe}</h5></Col>
                    </Row>   
                    <br/>
                    <Row>
                        <br/>
                            <Col>
                            <Input placeholder="Observacion" name="observacion" value={props.pedido.observacion} onChange={(e)=>props.handleChange(e)}/>
                            </Col>
                        <br/>
                    </Row>   
                    <Row>
                        <Col>
                            <br/>
                            <div>
                                <h6>Historia</h6>
                                <Tabla columnas={{fecha:"Fecha", observacion:"Descripcion", nombre:"Usuario"}} datos={props.pedido.historia}/>
                            </div>
                        </Col>
                    </Row>               
                </ModalBody>
               <ModalFooter>
                   <Row>
                       <Col>
                            <ButtonGroup size="md">
                                <Button color="success" onClick={()=>props.setEstadoPedido('RESERVADO')} hidden={!validarEstadoReservar()}>RESERVAR</Button>
                                <Button color="primary" onClick={()=>props.setEstadoPedido('ENTREGADO')} hidden={!validarEstadoEntregar()}>ENTREGAR</Button>
                                <Button color="info" onClick={()=>props.setEstadoPedido('FACTURADO')} hidden={!validarEstadoFacturar()}>FACTURAR</Button>
                                <Button color="danger" onClick={()=>props.setEstadoPedido('CANCELADO')}  hidden={!validarEstadoCancelar()}>CANCELAR</Button>
                            </ButtonGroup>
                       </Col>
                    
                       <Col>
                            <ButtonGroup size="md">
                                <Button color="primary" onClick={props.confirmar} hidden={!validarEstadoConfirmar()}><img src={ok} alt=''/></Button>
                                <Button color="danger" onClick={props.cancelar}><img src={cancel} alt=''/></Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        </>
    )
}

export { FormPedidoAutomotor };