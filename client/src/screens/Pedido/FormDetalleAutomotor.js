import React from "react";
import cancel from '../../image/cancel24.png'

import { Modal, ModalFooter, ModalHeader, ModalBody, Button, Row, Col, Input } from "reactstrap";

export const FormDetalleAutomotor = (props) => {
    return (
        <>
            <Modal isOpen={props.visible}>
                <ModalHeader>
                    {props.titulo}
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <img src={props.automotor.img} alt=''/>
                        </Col>
                    </Row>
                    <Row>                        
                        <Col>
                            <span>Año</span>
                            <Input 
                                value={props.automotor.anio}
                                disabled/>
                        </Col>
                    </Row>
                    <Row>                        
                        <Col>
                            <span>KM</span>
                            <Input 
                                value={props.automotor.km}
                                disabled/>
                        </Col>
                    </Row>
                    <Row>                        
                        <Col>
                            <span>Color</span>
                            <Input 
                                value={props.automotor.color}
                                disabled/>
                        </Col>
                    </Row>
                    <Row>                        
                        <Col>
                            <span>Motor</span>
                            <Input 
                                value={props.automotor.motor}
                                disabled/>
                        </Col>
                    </Row>
                    <Row>                        
                        <Col>
                            <span>Origen</span>
                            <Input 
                                value={props.automotor.origen}
                                disabled/>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={props.cerrar}>
                        <img src={cancel} alt=''/>
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}


