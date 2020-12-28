import React, {useState} from "react";
import { Button, Col, Row, Input, InputGroup, Container, ModalHeader, ModalBody, ModalFooter, Modal, Label, ButtonDropdown, ButtonGroup } from "reactstrap";
import { FormSelectList } from '../../components/FormSelectList';
import { Tabla } from '../../components/Tabla'
import { proveedoresService } from '../../_services/proveedores.service'

import search from "../../image/search16.png"
import ok from "../../image/accept24.png"
import cancel from '../../image/cancel24.png'
import edit from '../../image/edit24.png'

const FormOrdenCompra = (props) => {
    const [proveedores, setProveedores] = useState([])
    const [lista, setLista] = useState("")

    const mostrarListaProveedores = () =>{
        buscarProveedores("");
        setLista("Proveedores")
    }

    const cerrarLista = () => {
        setLista("")
    }

    const buscarProveedores = (filtro) => {
        proveedoresService.buscarProveedores(filtro)
        .then((res) => setProveedores(res))
    }

    const seleccionarProveedor = (proveedor) => {
        props.seleccionarProveedor(proveedor)
        cerrarLista()
    }

    const handleChange = (e) =>{
        props.handleChange(e)
    }

    const validarEstadoAprobar = () =>{
        let res = true
        res &= (props.orden.estado === 'INICIADA')
        res &= (props.orden.proveedor_id !== 0)

        return res
    }

    const validarEstadoCancelar = () =>{
        let res = true
        res &= (props.orden.estado === 'INICIADA')
        res &= (props.orden.id !== 0)

        return res
    }

    const validarEstadoConfirmar = () =>{
        let res = true
        res &= (props.orden.estado !== 'APROBADA')
        res &= (props.orden.estado !== 'FINALIZADA')
        res &= (props.orden.estado !== 'CANCELADA')
        res &= (props.orden.proveedor_id !== 0)

        return res
    }

    console.log(props)
    return (
        <>
            <Container hidden={lista !== "Proveedores"}>
                <FormSelectList 
                    visible={lista === "Proveedores"} 
                    titulo={lista} 
                    columnas={{documento:"Documento", apellidos:"Apellidos", nombres:"Nombres"}} 
                    datos={proveedores} 
                    seleccionar={seleccionarProveedor}
                    cerrar={cerrarLista} 
                    buscar={buscarProveedores}>
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
                            <Input value={props.orden.fecha_hora}  disabled/>
                        </Col>
                        <Col>
                            <span>Estado</span>
                            <Input value={props.orden.estado}  disabled/>
                        </Col>
                        <Col>
                            <span>Nro Remito</span>
                            <Input value={props.orden.nro_remito}  disabled/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <h6>Proveedor</h6>                                   
                                    <Input 
                                        value={"Nro Proveedor: " + props.orden.proveedor_nro}
                                        placeholder="Seleccionar proveedor"
                                        disabled >
                                    </Input>                                           
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Input 
                                        value={"Razón Social: " + props.orden.proveedor_razon_social}
                                        placeholder="Nombre del proveedor"
                                        disabled >
                                    </Input>
                                    <Input 
                                        value={"Documento: " + props.orden.proveedor_documento}
                                        placeholder="Documento del proveedor"
                                        disabled >
                                    </Input>
                                    <Input 
                                        value={"Condición IVA: " + props.orden.proveedor_condicion_iva}
                                        placeholder="Condición IVA"
                                        disabled >
                                    </Input>
                                </Col>
                                <Col>
                                    <Input 
                                        value={"Tel: " + props.orden.proveedor_telefono}
                                        placeholder="Telefono del proveedor"
                                        disabled>
                                    </Input>
                                    <Input 
                                        value={"Email: " + props.orden.proveedor_email}
                                        placeholder="Email del proveedor"
                                        disabled>
                                    </Input>
                                    <Input 
                                        value={"Domicilio: " + props.orden.proveedor_domicilio}
                                        placeholder="Domicilio del proveedor"
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
                            <Tabla columnas={{item: "Item", descripcion:"Descripción", cantidad:"Cantidad"}} datos={props.orden.productos}/>
                        </Col>
                    </Row>   
                    <Row>
                        <br/>
                            <Col>
                            <Input placeholder="Observacion" name="observacion" value={props.orden.observacion} onChange={handleChange}/>
                            </Col>
                        <br/>
                    </Row>   
                    <Row>
                        <Col>
                            <br/>
                            <div>
                                <h6>Historia</h6>
                                <Tabla columnas={{fecha:"Fecha", observacion:"Descripcion", nombre:"Usuario"}} datos={props.orden.historia}/>
                            </div>
                        </Col>
                    </Row>               
                </ModalBody>
               <ModalFooter>
                   <Row>
                       <Col>
                            <ButtonGroup size="md">
                                <Button color="success" onClick={()=>props.setEstadoOrden('APROBADA')} hidden={!validarEstadoAprobar()}>APROBAR</Button>
                                <Button color="danger" onClick={()=>props.setEstadoOrden('CANCELADA')}  hidden={!validarEstadoCancelar()}>CANCELAR</Button>
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

export { FormOrdenCompra };