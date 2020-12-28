import React from "react";
import view from "../image/view24.png"
import edit from "../image/edit24.png"
import del from "../image/delete24.png"
import ok from "../image/accept24.png"

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
                    ((props.ver || props.editar || props.eliminar) || props.seleccionar)?
                        <th>Acción</th>
                    :<th></th>
                    }
                </tr>
                </thead>
                <tbody>
                {
                     
                    datos && datos.map((dato) => {
                        return (
                            <tr key={dato.id}>                                
                                {
                                    
                                    Object.keys(columnas).map((element, index) => {
                                        return(
                                            <td key={dato[index]}>{dato[element]}</td>
                                        )
                                    })
                                }
                            <td key='botones'>
                                <Button size="sm"
                                    color="warning"
                                    data-toggle="tooltip" data-placement="top" title="Detalles"
                                    hidden={!props.ver}
                                    onClick={() => props.ver(dato, "editar")}>

                                    <img src={view} alt=''/>
                                </Button>{" "}
                                <Button size="sm"
                                    color="info"
                                    data-toggle="tooltip" data-placement="top" title="Editar"
                                    hidden={!props.editar}
                                    onClick={() => props.editar(dato, "editar")}>
                                    <img src={edit} alt=''/>
                                </Button>{" "}
                                <Button  size="sm"
                                    color="danger"
                                    data-toggle="tooltip" data-placement="top" title="Eliminar"
                                    hidden={!props.eliminar}
                                    onClick={()=> props.eliminar(dato)}>
                                    <img src={del} alt=''/>
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