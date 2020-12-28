import React from "react";

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
                        name="descripcion"
                        value={props.descripcion}
                        type="text"
                        placeholder="Ingrese la descripción"
                        onChange={props.handleChange}
                    />
                </ModalBody>
                <p id="descripcionid"> Formato inválido</p>
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