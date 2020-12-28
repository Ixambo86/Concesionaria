import React from "react";
import { Button, Col, Row, Input, ModalHeader, ModalBody, ModalFooter, Modal, ButtonGroup } from "reactstrap";
import { Tabla } from '../../components/Tabla'

import cancel from '../../image/cancel24.png'

const FormRemito = (props) => {

    const validarEstadoPagar = () =>{
           return props.remito.estado !== 'PAGADO'
    }

    console.log(props)
    return (
        <>
            <Modal isOpen={props.visible} size="lg">
                <ModalHeader>
                   <h3>{props.formulario}</h3>
                </ModalHeader>
                <ModalBody style={{"overflow-y":"auto"}}>
                    <Row>
                        <Col>
                            <span>Fecha de Creación</span>
                            <Input value={props.remito.fecha_hora}  disabled/>
                        </Col>
                        <Col>
                            <span>Estado</span>
                            <Input value={props.remito.estado}  disabled/>
                        </Col>
                        <Col>
                            <span>Orden de Compra</span>
                            <Input value={props.remito.nro_orden}  disabled/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                        <h6>Proveedor</h6>   
                            <Row>
                                <Col>
                                                                   
                                    <Input 
                                        value={"Nro Proveedor: " + props.remito.proveedor_nro}
                                        placeholder="Nro Proveedor"
                                        disabled /> 
                                     <Input 
                                        value={"Razón Social: " + props.remito.proveedor_razon_social}
                                        placeholder="Razon Social"
                                        disabled >
                                    </Input>
                                    <Input 
                                        value={"Documento: " + props.remito.proveedor_documento}
                                        placeholder="Documento"
                                        disabled >
                                    </Input>
                                </Col>
                                <Col> 
                                    <Input 
                                        value={"Tel: " + props.remito.proveedor_telefono}
                                        placeholder="Telefono"
                                        disabled>
                                    </Input>
                                    <Input 
                                        value={"Email: " + props.remito.proveedor_email}
                                        placeholder="Email"
                                        disabled>
                                    </Input>
                                    <Input 
                                        value={"Condición IVA: " + props.remito.proveedor_condicion_iva}
                                        placeholder="Condicion IVA"
                                        disabled >
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
                            <Tabla columnas={{item: "Item", descripcion:"Descripción", nro_lote:"Nro de Lote", cantidad:"Cantidad", costo:"Costo", importe:"Importe"}} datos={props.remito.productos}/>
                        </Col>
                    </Row>   
                    <Row>
                        <br/>
                            <Col xs={7}></Col><Col><h5>Total: $ {props.remito.importe}</h5></Col>
                        <br/>
                    </Row>   

                </ModalBody>
               <ModalFooter>
                   <Row>
                       <Col>
                            <ButtonGroup size="md">
                                <Button color="success" onClick={props.pagarRemito} hidden={!validarEstadoPagar()}>PAGAR</Button>
                               
                            </ButtonGroup>
                       </Col>
                    
                       <Col>
                            <ButtonGroup size="md">
                                <Button color="danger" onClick={props.cancelar}><img src={cancel} alt=''/></Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        </>
    )
}

export { FormRemito };