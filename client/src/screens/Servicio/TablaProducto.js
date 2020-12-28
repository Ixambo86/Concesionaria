import React from "react";
import view from "../../image/view24.png"
import edit from "../../image/edit24.png"
import del from "../../image/delete24.png"
import ok from "../../image/accept24.png"
import det from "../../image/view24.png"

import { Button, Table } from "reactstrap";

function Tabla(props) {
    const datos = props.datos;
    const columnas = props.columnas;
  //  console.log(datos)  
    return (
        <>
            <Table striped size="sm">
                <thead>
                <tr>
                    {
                        Object.keys(columnas).map( col => {
                            return(
                                <th key={col}>{columnas[col]}</th>
                            )
                        })    
                    }
                    {
                    (props.ver || props.editar || props.eliminar || props.detalles) || props.seleccionar?
                        <th>Acción</th>
                    :<th></th>
                    }
                </tr>
                </thead>
                <tbody>
                {
                     
                    datos && datos.map((dato, index) => {
                        return (
                            <tr key={dato}>                                
                                {
                                    
                                    Object.keys(columnas).map(element => {
                                        return(
                                            <td key={dato[element]}>{dato[element]}</td>
                                        )
                                    })
                                }
                            <td >
                                <Button size="sm"
                                    color="warning"
                                    hidden={!props.ver}
                                    onClick={() => props.ver(dato, "editar")}>
                                    <img src={view} alt=''/>
                                </Button>{" "}
                                <Button size="sm"
                                    color="info"
                                    hidden={!props.editar}
                                    onClick={() => props.editar(dato, "editar")}>
                                    <img src={edit} alt=''/>
                                </Button>{" "}
                                <Button  size="sm"
                                    color="danger"
                                    hidden={!props.eliminar}
                                    onClick={() => props.eliminar(dato)}>
                                    <img src={del} alt=''/>
                                </Button>
                                <Button  size="sm"
                                    color="warning"
                                    hidden={!props.detalles}
                                    onClick={() => props.detalles(dato)}>
                                    <img src={det} alt=''/>
                                </Button>
                                <Button  size="sm"
                                    color="primary"
                                    hidden={!props.seleccionar}
                                    onClick={() =>props.seleccionar(dato)}
                                    >
                                    <img src={ok} alt=''/>
                                </Button>
                            </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </>
    )
}

export { Tabla };