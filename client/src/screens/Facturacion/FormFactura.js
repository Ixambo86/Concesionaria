import React, { useState } from "react";
import { Button, Col, Row, Input, ModalHeader, ModalBody, ModalFooter, Modal, ButtonGroup, Container, PopoverHeader, PopoverBody, UncontrolledPopover } from "reactstrap";
import { Tabla } from '../../components/Tabla'
import { FormPago } from './FormPago'

import ok from "../../image/accept24.png"
import cancel from '../../image/cancel24.png'
import add from "../../image/add24.png"
import ayuda from '../../image/informacion.png'

const FormFactura = (props) => {

    let [verFormPago, setVerFormPago] = useState(false)
    let [tituloPago, setTituloPago] = useState('')

    const mostrarFormPago = (titulo) =>{
        setTituloPago(titulo)
        setVerFormPago(true)
    }

    const confirmarPago = () =>{
        props.confirmarPago()
        setVerFormPago(false)
    }

    const cerrarFormPago = () =>{
        setTituloPago('')
        setVerFormPago(false)
    }

    const handleChange = (e) =>{
        props.handleChange(e)
    }

    const verPago = (pago) =>{
        console.log(pago)
        props.verPago(pago)
        .then(()=>{
            mostrarFormPago("Pago " + pago.nro_pago)
        })
        
    }

    const nuevoPago = () =>{
        props.nuevoPago()
        mostrarFormPago('Nuevo Pago')
    }

    console.log(props)
    return (
        <>    
            <Container hidden={!props.mostrarFormPago}>
                <FormPago
                    visible={verFormPago}
                    formulario={tituloPago}
                    pago={props.pago}
                    handleChange={props.onChangePago}
                    medios_pago={props.mediosPago}
                    agregarDetallePago={props.agregarDetallePago}
                    confirmar={confirmarPago}
                    cancelar={cerrarFormPago}
                />
            </Container>           
            <Modal isOpen={props.visible} size="lg">
                <ModalHeader>
                   <h3>{props.formulario}</h3>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <span>Tipo Factura</span>
                            <Input
                                type="text"
                                name="tipo" 
                                value={props.factura.tipo}
                                disabled 
                                />
                        </Col>
                        <Col>
                            <span>Fecha de Creación</span>
                            <Input value={props.factura.fecha_hora}  disabled/>
                        </Col>
                        <Col>
                            <span>Estado</span>
                            <Input value={props.factura.estado}  disabled/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                <h6>Cliente</h6>                                      
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={5}>                                    
                                    <Input 
                                        value={"Nro Cliente: " + props.factura.cliente_nro}
                                        placeholder="Seleccionar cliente"
                                        disabled >
                                    </Input>     
                                    <Input 
                                        value={"Nombre: " + props.factura.cliente_nombre}
                                        placeholder="Nombre del cliente"
                                        disabled >
                                    </Input>
                                    <Input 
                                        value={"Documento: " + props.factura.cliente_documento}
                                        placeholder="Documento del cliente"
                                        disabled >
                                    </Input>
                                    <Input 
                                        value={"Condición IVA: " + props.factura.cliente_condicion_iva}
                                        placeholder="Condicion IVA"
                                        disabled >
                                    </Input>
                                </Col>
                                <Col>
                                    <Input 
                                        value={"Tel: " + props.factura.cliente_telefono}
                                        placeholder="Telefono del cliente"
                                        disabled>
                                    </Input>
                                    <Input 
                                        value={"Email: " + props.factura.cliente_email}
                                        placeholder="Email del cliente"
                                        disabled>
                                    </Input>
                                    <Input 
                                        value={props.factura.cliente_domicilio}
                                        placeholder="Domicilio del cliente"
                                        disabled>
                                    </Input>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <h6>Detalle</h6>
                           {/* <Button color="info" onClick={props.editarServicios}><img src={edit} alt=''/></Button>*/}
                            <Tabla columnas={{item: "Item", descripcion:"Descripción", cantidad:"Cantidad", precio:"Precio", importe:"Importe"}} datos={props.factura.detalle}/>
                        </Col>
                    </Row>
                    <Row>
                        <br/>
                            <Col xs={4}><h6 hidden={props.factura.tipo === "B"}>Total sin IVA: $ {props.factura.total-props.factura.iva}</h6></Col>
                            <Col xs={5}><h6 hidden={props.factura.tipo === "B"}>IVA: $ {props.factura.iva}</h6></Col>
                            <Col><h5>Total: $ {props.factura.total}<Button id="PopoverLegacy1" type="right" color="white">
                                <img src={ayuda} className="menu_ayuda" alt='ayuda' />
                            </Button>
                            <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy1">
                                <PopoverHeader>Total</PopoverHeader>
                                <PopoverBody> Corresponde al monto total que el cliente debe abonar en la factura.</PopoverBody>
                            </UncontrolledPopover></h5></Col>
                        <br/>
                    </Row>     
                    <Row>
                        <Col>
                            <br/>
                            <Button color="success" onClick={()=>nuevoPago()}hidden={!props.editable || props.factura.saldo === 0}><img src={add} alt=''/>Nuevo Pago</Button>
                            <div>
                                <h6>Detalle de pagos</h6>
                                <Tabla columnas={{fecha_hora:"Fecha", concepto:"Concepto", importe:"Importe", usuario:"usuario"}} datos={props.factura.pagos}  ver={verPago}/>
                            </div>
                        </Col>
                    </Row>  
                    <Row>
                        <br/>
                            <Col xs={9}></Col><Col><h6>Saldo: $  {props.factura.saldo}<Button id="PopoverLegacy3" type="right" color="white">
                                <img src={ayuda} className="menu_ayuda" alt='ayuda' />
                            </Button>
                            <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy3">
                                <PopoverHeader>Saldo Pendiente</PopoverHeader>
                                <PopoverBody> Informa el saldo pendiente de pago. El cliente deberá liquidar el saldo restante para que la factura se considere <b>PAGADA</b></PopoverBody>
                            </UncontrolledPopover></h6></Col>
                            
                        <br/>
                    </Row>   
                    <Row>
                        <br/>
                            <Col>
                            <Input placeholder="Observacion" name="observacion" value={props.factura.observacion} onChange={handleChange}/>
                            </Col>
                        <br/>
                    </Row>   
                    <Row>
                        <Col>
                            <br/>
                            <div>
                                <h6>Historia</h6>
                                <Tabla columnas={{fecha_hora:"Fecha", observacion:"Descripcion", usuario:"Usuario"}} datos={props.factura.historia}/>
                            </div>
                        </Col>
                    </Row>               
                </ModalBody>
               <ModalFooter>
                   <Row>                    
                       <Col>
                            <ButtonGroup size="md">
                                <Button color="primary" hidden={!props.editable} onClick={props.confirmar}><img src={ok} alt=''/></Button>
                                <Button color="danger" hidden={props.editable && props.factura.estado === 'INICIADA'} onClick={props.cancelar}><img src={cancel} alt=''/></Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        </>
    )
}

export { FormFactura };