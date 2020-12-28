import React, {Component} from "react";

import no_photo from "../image/no_photo.png"
import ok from "../image/accept24.png"
import info from "../image/view24.png"
import add_cart from "../image/add_cart.png"
import remove_cart from "../image/quit_cart.png"
import delete_cart from "../image/delete_cart.png"

//import "./index.css";
import { Button, CardFooter, CardHeader, CardImg, CardBody, Card, CardColumns, Container, CardText, CardDeck } from "reactstrap";

class Lista extends Component{
    constructor(props) {
        super(props)
        this.state = {
          datos: []
        }
    }

  
    render(){
        const datos = this.props.datos;
        console.log(datos)
        return (
            <Container>
               
                   {
                       datos && datos.map((dato, index) =>{
                           return(
                                <Card key={index} style={{width:"20%"}}>
                                    <CardHeader>{dato.descripcion}</CardHeader>
                                    <CardImg src={dato.img ? dato.img : no_photo} style={{width:"256px"}}/>
                                        <CardBody>
                                            <CardText hidden={!dato.precio}><b>Precio: </b> $ {dato.precio} </CardText>                                        
                                            <CardText hidden={!dato.stock || dato.stock === 'undefined'}><b>Stock: </b> {dato.stock} </CardText>  
                                            <CardText hidden={!dato.anio}><b>Año: </b> {dato.anio} </CardText>   
                                            <CardText hidden={!dato.sucursal}><b>Sucursal: </b> {dato.sucursal} </CardText>                                        
                                        </CardBody>
                                    <CardFooter>
                                        <Button hidden={!this.props.agregar} color="success" disabled={dato.stock === 0} onClick={()=>this.props.agregar(dato)}>
                                            <img src={add_cart} alt=''/>
                                        </Button>
                                        {" "}       
                                        <Button hidden={!this.props.quitar} color="primary" onClick={()=>this.props.quitar(dato)}>
                                            <img src={remove_cart} alt=''/>
                                        </Button>
                                        {" "}
                                        <Button hidden={!this.props.eliminar} color="danger" onClick={()=>this.props.eliminar(dato)}>
                                            <img src={delete_cart} alt=''/>
                                        </Button>
                                        {" "}
                                        <Button hidden={!this.props.seleccionar} color="success" onClick={()=>this.props.seleccionar(dato)}>
                                            <img src={ok} alt=''/>
                                        </Button>
                                        {" "}
                                        <Button hidden={!this.props.detalle} color="info" onClick={()=>this.props.detalle(dato)}>
                                            <img src={info} alt=''/>
                                        </Button>
                                    </CardFooter>
                                </Card>
                           )
                       })
                    }
            </Container>
        )
    }
}

export { Lista };