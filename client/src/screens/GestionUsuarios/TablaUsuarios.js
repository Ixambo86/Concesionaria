import React from "react";
import edit from "../../image/edit24.png"
import del from "../../image/delete24.png"

import { Button, Table } from "reactstrap";

function TablaUser(props) {
    const datos = props.datos;
    const columnas = props.columnas;
    return (
        <>
            <Table striped size="sm">
                <thead>
                <tr>
                    {
                        Object.keys(columnas).map( (col, index) => {
                            return(
                                <th key={index}>{columnas[col]}</th>
                            )
                        })    
                    }
                    {
                    (props.editar || props.eliminar)?
                        <th>Acción</th>
                    :<th></th>
                    }
                </tr>
                </thead>
                <tbody>
                {
                    
                    datos.map(dato => {
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
                                    <Button
                                        key={'edit_' + dato.id}
                                        color="info"
                                        hidden={!props.editar}
                                        onClick={() => props.editar(dato, "editar")}>
                                        <img src={edit} alt=''/>
                                    </Button>{" "}
                                    <Button 
                                        key={'delete_' + dato.id}
                                        color="danger"
                                        hidden={!props.eliminar}
                                        onClick={()=> props.eliminar(dato)}>
                                        <img src={del} alt=''/>
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

export { TablaUser };