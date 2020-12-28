import React from "react";

import { Busqueda } from './Busqueda/Busqueda'
import { Tabla } from '../components/Tabla'
import cancel from '../image/cancel24.png'

import { Modal, ModalFooter, ModalHeader, ModalBody, Button } from "reactstrap";

export const FormSelectList = (props) => {
    return (
        <>
            <Modal isOpen={props.visible}>
                <ModalHeader>
                    {props.titulo}
                </ModalHeader>
                <ModalBody>
                    <Busqueda search={props.buscar}/>
                    <Tabla columnas={props.columnas} datos={props.datos} seleccionar={props.seleccionar}/>
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


