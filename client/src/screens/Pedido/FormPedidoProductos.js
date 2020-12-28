import React, {useState} from "react";
import { Button, Col, Row, Input, InputGroup, Container, ModalHeader, ModalBody, ModalFooter, Modal, Label, Alert, ButtonGroup } from "reactstrap";
import { FormSelectList } from '../../components/FormSelectList';
import { Tabla } from '../../components/Tabla'
import { clienteService } from '../../_services/clientes.services'
import { automotorService } from '../../_services/automotores.services'

import search from "../../image/search16.png"
import ok from "../../image/accept24.png"
import cancel from '../../image/cancel24.png'
import warning from '../../image/warning24.png'

const FormPedidoProductos = (props) => {
    const [clientes, setClientes] = useState([])
    const [automotores, setAutomotores] = useState([])
    const [lista, setLista] = useState("")

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

    const handleChange = (e) =>{
        props.handleChange(e)
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
        return (props.pedido.estado === 'RESERVADO')
    }

    const validarEstadoCancelar = () =>{
        let res = true
        res &= (props.pedido.estado !== 'ENTREGADO')
        res &= (props.pedido.estado !== 'FACTURADO')
        res &= (props.pedido.estado !== 'PAGADO')
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

    console.log(props)
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
            
            <Modal isOpen={props.visible} size="lg">
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
                            <Row>
                                <Col>
                                    <h6>Cliente</h6>
                                    <Alert size="sm" color="warning" hidden={props.pedido.cliente_id > 0}>
                                        Seleccione un cliente
                                        <img src={warning} alt='' align="right"/>
                                    </Alert>
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
                                </Col>
                            </Row>
                            <Row>
                                <Col>
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
                                </Col>
                                <Col>
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
                                    <Input 
                                        value={"Factura Tipo: " + props.pedido.cliente_tipo_factura}
                                        placeholder="Email del cliente"
                                        disabled>
                                    </Input>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <h6>Productos</h6>
                           {/* <Button color="info" onClick={props.editarServicios}><img src={edit} alt=''/></Button>*/}
                            <Tabla columnas={{item: "Item", descripcion:"Descripción", cantidad:"Cantidad", precio:"Precio", importe:"Importe"}} datos={props.pedido.productos}/>
                        </Col>
                    </Row>   
                    <Row>
                        <br/>
                            <Col xs={7}></Col><Col><h5>Total: $ {props.pedido.importe}</h5></Col>
                        <br/>
                    </Row>   

                    <Row>
                        <br/>
                            <Col>
                            <Input placeholder="Observacion" name="observacion" value={props.pedido.observacion} onChange={handleChange}/>
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
                                <Button color="primary" hidden={!validarEstadoConfirmar()}onClick={props.confirmar}><img src={ok} alt=''/></Button>
                                <Button color="danger" onClick={props.cancelar}><img src={cancel} alt=''/></Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        </>
    )
}

export { FormPedidoProductos };