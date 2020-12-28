import React from "react";

import { Busqueda } from './Busqueda/Busqueda'
import { Tabla } from './Tabla'
import cancel from '../image/cancel24.png'
import ok from "../image/accept24.png"

import { Modal, ModalFooter, ModalHeader, ModalBody, Button } from "reactstrap";

export const FormDescripcion = (props) => {
    return (
        <>
            <Modal isOpen={props.visible}>
                <ModalHeader>
                    {props.titulo}
                </ModalHeader>
                <ModalBody>
                    <label>
                        Descripción: *
                    </label>
                    <input
                        name="descripcion2"
                        value={props.descripcion2}
                        type="text"
                        placeholder="Ingrese la descripción"
                        onChange={props.handleChange}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={props.confirmar}>
                        <img src={ok} alt='' />
                    </Button>

                    <Button color="danger" onClick={props.cerrar}>
                        <img src={cancel} alt='' />
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}


