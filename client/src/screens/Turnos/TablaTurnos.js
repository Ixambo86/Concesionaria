import React from "react";
import ok from "../../image/add16.png"
import cancel from "../../image/cancel16.png"
import './TablaTurno.css';
import { Button, Table } from "reactstrap";

function TablaTurnos (props) {
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
                    </tr> 
                </thead>
                    <tbody>
                    {                        
                        datos.map(dato  => {
                            return (
                                <tr key={dato.modulo}>                                
                                    {    
                                        Object.keys(columnas).map((element,index) => {
                                            return(
                                                ((dato[element] === '' || dato[element] === undefined) ? 
                                                <td key={columnas[index]}>{
                                               <div className= 'boton'>     
                                                <Button size = 'sm' color="success" data-toggle="tooltip" title="Nuevo Turno" disabled={ (dato.modulo <= props.mod && props.adelante) || props.deshabilitar} onClick={() => props.agregar(dato.modulo, true, 'mecanico_' + (index -1))}><img src={ok} alt=''/></Button>
                                               </div>}
                                               </td>
                                               : ((index > 1 && dato[element] !== '' && dato[element] !== '*') ?                                                        
                                                <td key={columnas[index]}>{dato[element]}{' '}
                                                <div className= 'boton'>
                                                    <Button size = 'sm' color="info" data-toggle="tooltip" data-placement="top" title="Cancelar Turno"  disabled={ (dato.modulo <= props.mod && props.adelante) || props.deshabilitar} onClick={() => props.cancelar(dato, (index -1))}><img src={cancel} alt=''/></Button>{' '}
                                                    <Button size = 'sm' color="danger" data-toggle="tooltip" title="Rechazar Orden de Trabajo" disabled={ (dato.modulo <= props.mod && props.adelante) || props.deshabilitar} onClick={() => props.eliminar(dato, (index -1))}><img src={cancel} alt=''/></Button>
                                                </div></td>
                                                : (dato[element] !== '*') ?
                                                <td key={columnas[index]}>{dato[element]} </td>
                                                :<td key={columnas[index]}>{''} </td>))
                                            ) 
                                            
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </>
        )
}export { TablaTurnos };