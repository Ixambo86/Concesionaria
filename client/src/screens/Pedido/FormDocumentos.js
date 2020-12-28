import React from "react";

import check from '../../image/check.png'
import uncheck from '../../image/uncheck.png'
import cancel from '../../image/cancel24.png'

import { Modal, ModalFooter, ModalHeader, ModalBody, Button, Row, Col } from "reactstrap";

export const FormDocumentos = (props) => {
   
    const entregado = (documento) =>{
        documento.entregado = true;
        props.actualizarDocumento(documento)
    }

    const noEntregado = (documento) =>{
        documento.entregado = false;
        props.actualizarDocumento(documento)
    }

    console.log(props.documentos)

    return (
        
        <>
            <Modal isOpen={props.visible}>
                <ModalHeader>
                    {props.titulo}
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col><strong>Documento</strong></Col>
                        <Col><strong>Entregado</strong></Col>
                    </Row>
                    <br/>
                    {
                        props.documentos.map(d =>{
                            return(
                            <Row>
                                <Col>
                                    <h6>{d.documento}</h6>
                                </Col>
                                <Col>
                                    <img src={uncheck} alt='' onClick={()=>entregado(d)} hidden={d.entregado} align="center"/>
                                    <img src={check} alt='' onClick={()=>noEntregado(d)} hidden={!d.entregado}align="center"/>
                                </Col>
                            </Row>
                            )
                        })
                    }
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


