import React from "react";
import { Button, Col, Row, Input, ModalHeader, ModalBody, ModalFooter, Modal, ButtonGroup, Container, PopoverHeader, PopoverBody, UncontrolledPopover } from "reactstrap";
import { Tabla } from '../../components/Tabla'

import ok from "../../image/accept24.png"
import cancel from '../../image/cancel24.png'
import add from "../../image/add24.png"
import ayuda from '../../image/informacion.png'

const FormPago = (props) => {

    const validarNuevoDetalle = () =>{
        let ret=true
        ret &= (parseInt(props.pago.aux_medio_pago_id) > 0)
        ret &= (props.pago.aux_nro_transaccion !== '')
        ret &= (parseFloat(props.pago.aux_importe) > 0 && parseFloat(props.pago.aux_importe) <= parseFloat(props.pago.saldo))
        ret &= (parseFloat(props.pago.saldo) > 0 || props.pago.saldo > 0)

        return ret
    }

    const validarConfirmar = () =>{
        let ret = true
        ret &= (parseFloat(props.pago.importe) !== 0)
        ret &= (parseInt(props.pago.id) === 0)
        
        return ret
    }

    console.log(props)
    return (
        <>               
            <Modal isOpen={props.visible}>
                <ModalHeader>
                   <h3>{props.formulario}</h3>
                </ModalHeader>
                <ModalBody>
                    <Container hidden={props.pago.id !== 0}>
                        <Row >  
                            <Col>                     
                                <span >Medio de Pago</span>
                                <Button id="PopoverLegacy1" type="right" color="white">
                                <img src={ayuda} className="menu_ayuda" alt='ayuda' />
                            </Button>
                            <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy1">
                                <PopoverHeader>Medios de Pagos</PopoverHeader>
                                <PopoverBody> Se pueden realizar pagos parciales simultáneos con distintos medios de pagos cubriendo el importe total o no de la factura.</PopoverBody>
                                <PopoverBody> En el caso de no cubrir el saldo total, la factura permanecerá con estado de pago  <b>PAGO PARCIAL</b> hasta que sea cubierto el monto total.</PopoverBody>
                                <PopoverHeader>Ejemplo de Pago</PopoverHeader>
                                <PopoverBody><b>Monto total: $10.000</b></PopoverBody>
                                <PopoverBody><b>Primer pago:</b>
                                    <br/>Medio de pago: Efectivo
                                    <br/> Monto: $5.000
                                </PopoverBody>
                                <PopoverBody><b>Segundo pago:</b>
                                    <br/>Medio de pago: MercadoPago
                                    <br/> Monto: $5.000
                                </PopoverBody>

                            </UncontrolledPopover>
                                <Input
                                    type="select"
                                    name="aux_medio_pago_id" 
                                    value={props.pago.aux_medio_pago_id ? props.pago.aux_medio_pago_id : 0}
                                    onChange={props.handleChange}>
                                    <option value="0">Seleccionar</option>
                                    {
                                        props.medios_pago.map(mp => {
                                            return(
                                                <option value={mp.id}>{mp.descripcion}</option>
                                            )                                    
                                        })
                                    }
                                </Input>
                                <span>Nro transacción</span>
                                <Input
                                    type="text"
                                    name="aux_nro_transaccion" 
                                    value={props.pago.aux_nro_transaccion}
                                    onChange={props.handleChange}
                                />
                                <Row>
                                    <Col>
                                        <span>Importe</span>
                                        <Input
                                            type="number"
                                            name="aux_importe" 
                                            value={props.pago.aux_importe}
                                            onChange={props.handleChange}
                                        />
                                    </Col>
                                    <Col>
                                        <span>Saldo</span>
                                        <Input
                                            type="number"
                                            name="aux_importe" 
                                            value={props.pago.saldo}
                                            disabled
                                        />
                                    </Col>
                                </Row>
                                <br/>
                                <Button color="success" disabled={!validarNuevoDetalle()}onClick={props.agregarDetallePago}><img src={add} alt=''/></Button>                        
                            </Col>
                        </Row>
                    </Container>
                    <br/>
                    <Row>
                        <Col>
                            <h6>Detalle de pago</h6>           
                            <Tabla columnas={{medio_pago:"Medio de Pago", nro_transaccion:"Nro de Transacción", importe:"Importe"}} datos={props.pago.detalle}/>                           
                        </Col>
                    </Row>                    
                    <Row>
                        <br/>
                            <Col></Col><Col></Col><Col><h6>Total: $ {props.pago.importe}</h6></Col>
                        <br/>
                    </Row>   
                </ModalBody>
               <ModalFooter>
                   <Row>                    
                       <Col>
                            <ButtonGroup size="md">
                                <Button color="primary"onClick={props.confirmar} disabled={!validarConfirmar()}><img src={ok} alt=''/></Button>
                                <Button color="danger" onClick={props.cancelar}><img src={cancel} alt=''/></Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        </>
    )
}

export { FormPago };