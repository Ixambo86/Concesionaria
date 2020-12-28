import React from "react";

import del from '../image/delete24.png'
import ok from '../image/accept24.png'
import cancel from '../image/cancel24.png'

import { Container, Button, Input, Row, Col } from "reactstrap";

export const FormFiltro= (props) => {
    return (
        <>  
            <Container>
                    {
                        
                   props.filtros && Object.keys(props.filtros).map(f =>{
                       if ( props.filtros[f].tipo === "select"){
                           return(
                               <>
                                    <span>{props.filtros[f].descripcion}</span>
                                    <Input 
                                        type={props.filtros[f].tipo}
                                        name={f}
                                        value={props.filtros[f].valor}
                                        onChange={props.onChange}
                                    >
                                        <option value="">Seleccione un valor</option>
                                        {
                                             Object.keys(props.filtros[f]["opciones"]).map(o =>{
                                             
                                                return(
                                                    <option value={props.filtros[f]["opciones"][o]}>{props.filtros[f]["opciones"][o]}</option>
                                                )
                                            })                                            
                                        }
                                    </Input>
                                </>
                           )
                       }
                       else{
                           return(
                               <>
                                    <span>{props.filtros[f].descripcion}</span>
                                    <Input 
                                        type={props.filtros[f].tipo}
                                        name={f}
                                        value={props.filtros[f].valor}
                                        onChange={props.onChange}
                                    />
                                </>
                            )
                       }
                   })
                }
                    <br/>
                    <Row>
                        <Col>
                            <Button color="danger" onClick={props.limpiarFiltros} block>
                                <img src={del} alt=''/>
                            </Button>
                        </Col>
                        <Col>
                            <Button color="success" onClick={props.aplicarFiltro}block><img src={ok} alt=''/></Button>
                        </Col>
                    </Row>
                </Container>
        </>
    )
}


