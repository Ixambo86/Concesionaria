import React, {useState} from "react";
import { Button, Col, Row, Input, InputGroup, Container, ModalHeader, ModalBody, ModalFooter, Modal, Alert, ButtonDropdown, ButtonGroup } from "reactstrap";
import { FormSelectList } from '../../components/FormSelectList';
import { Tabla } from '../../components/Tabla'
import { clienteService } from '../../_services/clientes.services'
import { automotorService } from '../../_services/automotores.services'

import search from "../../image/search16.png"
import ok from "../../image/accept24.png"
import cancel from '../../image/cancel24.png'
import warning from '../../image/warning24.png'

const FormOrdenTrabajo = (props) => {
    const [clientes, setClientes] = useState([])
    const [automotores, setAutomotores] = useState([])
    const [lista, setLista] = useState("")

    const mostrarListaClientes = () =>{
        buscarClientes("");
        setLista("Clientes")
    }
   
    const mostrarListaAutomotores = () => {
        buscarAutomotores("", props.orden.cliente_id);
        setLista("Automotores")
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
        buscarAutomotores("", cliente.id);      
    }
 
    const buscarAutomotores = (filtro, cliente_id) => {
        automotorService.buscarAutomotores(filtro, cliente_id)
        .then((res) => {
            setAutomotores(res)
            // if (automotores.length === 1) {
            //     seleccionarAutomotor(automotores[0])
            // }            
        })
    }

    const seleccionarAutomotor = (automotor) =>{
        props.seleccionarAutomotor(automotor)
        .then((res)=>{
            cerrarLista()
        })      
    }

    const selectChange = (e) =>{
        props.selectChange(e)
    }

    const handleChange = (e) =>{
        props.handleChange(e)
    }

    const validarEstadoProcesar = () =>{
        let res = true
        res &= (props.orden.estado === 'PENDIENTE')

        return res
    }

    const validarEstadoAusente = () =>{
        let res = true
        res &= (props.orden.estado === 'PENDIENTE')

        return res
    }

    const validarEstadoFinalizar = () =>{
        let res = true
        res &= (props.orden.estado === 'EN PROCESO')

        return res
    }

    const validarEstadoCancelar = () =>{
        let res = true
        res &= (props.orden.estado !== 'FINALIZADA')
        res &= (props.orden.estado !== 'AUSENTE')
        res &= (props.orden.estado !== 'CANCELADA')
        res &= (props.orden.id !== 0)

        return res
    }

    const validarEstadoFacturar = () =>{
        return (props.orden.estado === 'FINALIZADA')
    }

    const validarComboProductos = () =>{
        let res = false
        res |= (props.orden.estado === '')
        res |= (props.orden.estado === 'INICIADA')
        return res
    }

    const validarConfirmar = () =>{
        if (props.orden.cliente_id === 0)
            return false
        if (props.orden.automotor_id === 0)
            return false
      
        if (props.orden.id !== 0){
            let res = false
            res |= (props.orden.observacion !== "")
            res |= (props.orden.cambios.length > 0)
            return res
        }
        
        let res = true
    //    res &= (props.productos.length > 0)
   //     res &= (props.productos.length === props.orden.productos.length)
        
        return res
    }

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
            
            <Container hidden={lista !== "Automotores"}>
                <FormSelectList 
                    visible={lista === "Automotores"} 
                    titulo={lista} 
                    columnas={{marca:"Marca", modelo:"Modelo", version:"Version", dominio:"Dominio"}} 
                    datos={automotores} 
                    seleccionar={seleccionarAutomotor} 
                    cerrar={cerrarLista}  
                    buscar={buscarAutomotores}>
                </FormSelectList>
            </Container>
            
            <Modal isOpen={props.visible} size="xl">
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
                            <span>Fecha mínima de turno</span>
                            <Input value={props.orden.fecha_minima_turno}  disabled/>
                        </Col>
                        <Col>
                            <span>Duración</span>
                            <Input value={props.orden.cantidad_modulos*30 + " minutos"}  disabled/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>                           
                            <h6>Cliente</h6>
                            <Alert size="sm" color="warning" hidden={props.orden.cliente_id > 0}>
                                 Seleccione un cliente
                                 <img src={warning} alt='' align="right"/>
                            </Alert>
                            <InputGroup>
                                <Input 
                                    value={"Nro Cliente: " + props.orden.cliente_nro}
                                    placeholder="Seleccionar cliente"
                                    disabled >
                                </Input>
                                    <Button color="primary" size="md" onClick={mostrarListaClientes} >
                                        <img src={search} alt=''/>
                                    </Button>
                            </InputGroup>
                            <Input 
                                value={"Nombre: " + props.orden.cliente_nombre ? props.orden.cliente_nombre : props.orden.cliente_razon_social}
                                placeholder="Nombre del cliente"
                                disabled >
                            </Input>
                            <Row>
                            <Col>
                            
                            <Input 
                                value={"Documento: " + props.orden.cliente_documento}
                                placeholder="Documento del cliente"
                                disabled >
                            </Input>
                            <Input 
                                value={"Tel: " + props.orden.cliente_telefono}
                                placeholder="Telefono del cliente"
                                disabled>
                            </Input>
                            </Col>
                            <Col>
                            <Input 
                                value={"Condicion IVA: " + props.orden.cliente_condicion_iva}
                                placeholder="Email del cliente"
                                disabled>
                            </Input>
                            <Input 
                                value={"Email: " + props.orden.cliente_email}
                                placeholder="Email del cliente"
                                disabled>
                            </Input>
                            </Col>
                            </Row>
                            
                        </Col>
                        <Col>                            
                            <h6>Automotor</h6>
                            <Alert size="sm" color="warning" hidden={props.orden.automotor_id > 0 || props.orden.cliente_id === 0}>
                                 Seleccione un Automotor
                                 <img src={warning} alt='' align="right"/>
                            </Alert>
                            <InputGroup>
                                <Input 
                                    value={"Dominio: " + props.orden.automotor_dominio}
                                    placeholder="Dominio del vehiculo"
                                    disabled>
                                </Input>
                                    <Button color="primary" size="md" onClick={mostrarListaAutomotores} disabled={props.orden.cliente_id === 0}>
                                        <img src={search} alt=''/>
                                    </Button>
                            </InputGroup>
                            <Input 
                                value={props.orden.automotor_descripcion}
                                placeholder="Descripcion del vehiculo"
                                disabled >
                            </Input>
                            <Input 
                                value={"Kms: " + props.orden.automotor_km}
                                placeholder="KMs del vehiculo"
                                disabled >
                            </Input>
                            <Input 
                                value={"Motor: " + props.orden.automotor_motor}
                                placeholder="Motor del vehiculo"
                                disabled >
                            </Input>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <h6>Servicios</h6>
                           {/* <Button color="info" onClick={props.editarServicios}><img src={edit} alt=''/></Button>*/}
                            <Tabla columnas={{descripcion:"Descripción", precio:"Precio", cantidad:"Cantidad", importe:"Importe"}} datos={props.orden.servicios}/>
                            <Row>
                                <br/>
                                <Col xs={10}></Col><Col><h6>Subtotal: $ {props.orden.importe_servicios}</h6></Col>
                                <br/>
                            </Row>   
                            <Row>  
                                <Col>
                                    <h6>Productos</h6>
                                    
                                    { 
                                        Object.keys(props.productos).map((item, i) => {
                                            return(
                                                <Row>
                                                    <Col xs={4}>
                                                    <b hidden={i>0}>Descripción</b>
                                                        <Input 
                                                            name={item}
                                                            type="select"
                                                            value={ props.orden.productos[item]?props.orden.productos[item].id:0}
                                                            onChange={selectChange} 
                                                            invalid={!props.orden.productos[item]}
                                                            valid={props.orden.productos[item]}>
                                                            <option hidden={props.orden.productos[item]} value="0">Seleccionar producto</option>
                                                            {
                                                                Object.keys(props.productos[item]).map(prod=> {
                                                                    return(
                                                                        <option value={prod} selected={props.orden.productos[item]?prod===props.orden.productos[item].id:false} disabled={!validarComboProductos()}>
                                                                        
                                                                                {props.productos[item][prod].descripcion}
                                                                        
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                                        </Input>
                                                    </Col>
                                                    <Col xs={1}>
                                                        <b hidden={i>0}>Stock</b>
                                                        <Input  
                                                            type="text"
                                                            value={ props.orden.productos[item]?props.orden.productos[item].stock:0}
                                                            disabled
                                                        />
                                                    </Col>
                                                    <Col xs={2}>
                                                        <b hidden={i>0}>Disponible</b>
                                                        <Input  
                                                            type="text"
                                                            value={ props.orden.productos[item]?props.orden.productos[item].fecha_entrega:0}
                                                            disabled
                                                        />
                                                    </Col>
                                                    <Col xs={1}>
                                                        <b hidden={i>0}>Precio</b>
                                                        <Input  
                                                            type="text"
                                                            value={ props.orden.productos[item]?props.orden.productos[item].precio:0}
                                                            disabled
                                                        />
                                                    </Col>
                                                    <Col xs={2}>
                                                        <b hidden={i>0}>Cantidad</b>
                                                        <Input  
                                                            name={item}
                                                            type="number"
                                                            value={ props.orden.productos[item]?props.orden.productos[item].cantidad:0}
                                                            onChange={props.cantidadChange}
                                                            disabled={!props.orden.productos[item]}
                                                        />
                                                    </Col>
                                                    <Col xs={2}>
                                                        <b hidden={i>0}>Importe</b>
                                                        <Input  
                                                            type="text"
                                                            value={ props.orden.productos[item]?parseFloat(props.orden.productos[item].cantidad)*props.orden.productos[item].precio:0}
                                                            disabled
                                                        />
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    }
                                </Col>                             
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <br/>
                        <Col xs={10}></Col><Col><h6>Subtotal: $ {props.orden.importe_productos}</h6></Col>
                        <br/>
                    </Row>   
                    <Row>
                        <br/>
                        <Col xs={10}></Col><Col><h5>Total: $ {props.orden.importe}</h5></Col>
                        <br/>
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
                                <Button color="success" onClick={()=>props.setEstadoOrden('EN PROCESO')} hidden={!validarEstadoProcesar()}>PROCESAR</Button>
                                <Button color="warning" onClick={()=>props.setEstadoOrden('AUSENTE')} hidden={!validarEstadoAusente()}>AUSENTE</Button>
                                <Button color="primary" onClick={()=>props.setEstadoOrden('FINALIZADA')} hidden={!validarEstadoFinalizar()}>FINALIZAR</Button>
                                <Button color="info" onClick={()=>props.setEstadoOrden('FACTURADA')} hidden={!validarEstadoFacturar()}>FACTURAR</Button>
                                <Button color="danger" onClick={()=>{
                                    var opcion = window.confirm("Estás Seguro que deseas cancelar la orden " + props.orden.nro_orden)
                                    if (opcion === true)
                                        props.setEstadoOrden('CANCELADA')
                                    
                                }}  hidden={!validarEstadoCancelar()}>CANCELAR</Button>
                            </ButtonGroup>
                       </Col>
                    
                       <Col>
                            <ButtonGroup size="md">
                                <Button color="primary" hidden={!validarConfirmar()}onClick={props.confirmar}><img src={ok} alt=''/></Button>
                                <Button color="danger" onClick={props.cancelar}><img src={cancel} alt=''/></Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        </>
    )
}

export { FormOrdenTrabajo };