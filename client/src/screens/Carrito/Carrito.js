import React, {Component} from "react";
import { Lista } from '../../components/Lista'
import { Tabla } from '../../components/Tabla'

import ok from '../../image/accept24.png'
import cancel from '../../image/cancel24.png'
import del from '../../image/delete24.png'

import "./Carrito.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Button } from "reactstrap";

class Carrito extends Component{
  
  state = {
    visible:false,
    carrito:[],
    total:0,
    actualiza_estado: false
  };

  componentDidMount(){
    this.setState({visible: this.props.visible, items: this.props.items, carrito: this.props.carrito})
  }

  actualizarEstado = () =>{
    this.setState({actualiza_estado:!this.state.actualiza_estado})
  }

  agregarItem = item_selected =>{
    const item = {...item_selected, 
      cantidad: 1,
      importe: item_selected.precio
    }
    item_selected.stock -= 1
    console.log(item)
    const item_carrito = this.state.carrito.find(i => i.id === item.id);

    if ( item_carrito )
      item_carrito.cantidad += 1
    else{
      item.item = this.state.carrito.length+1;
      this.state.carrito.push(item);
    }
 
    this.totalItems()
    this.totalCarrito()
    this.actualizarEstado()
  
  }
  quitarItem = item_selected =>{

    const item_carrito = this.state.carrito.find(i => i.id === item_selected.id);
    
    if ( item_carrito ){
      item_selected.stock += 1
      console.log(item_carrito)
      if (item_carrito["cantidad"] > 1){
        item_carrito["cantidad"] -= 1
      }else{
        this.state.carrito = this.state.carrito.filter( i => i.id !== item_carrito.id);
        this.state.carrito.map((c, i) =>{
          c.item = i+1
        })
      }
        
    }
    this.totalItems()
    this.totalCarrito()
    this.actualizarEstado()
  }
  eliminarItem = item_selected =>{
    
    const item_carrito = this.state.carrito.find(i => i.id === item_selected.id);
    if ( item_carrito ){
      item_selected.stock += item_carrito.cantidad
      this.state.carrito = this.state.carrito.filter( i => i.id !== item_carrito.id);
      this.state.carrito.map((c, i) =>{
        c.item = i+1
      })
    }
    
    this.totalCarrito()
    this.actualizarEstado()
  }
  vaciarCarrito = () =>{
   
    this.setState({carrito:[], total: 0, items: this.props.items})
  }

  totalItems = () => {
    this.state.carrito.map(item => item.importe = item.cantidad*item.precio)
  }

  totalCarrito = () =>{
    this.state.total = this.state.carrito.reduce((importe_acumulado, item) => importe_acumulado + item.importe, 0)
  }

  confirmar = () =>{
    this.props.confirmar(this.state.carrito, this.state.total)
    this.setState({carrito:[], total:0})
  }

  cancelar = () =>{
    this.props.cancelar()
    this.setState({carrito:[], total:0})
  }

  render() {
    const items = this.props.items;
    const carrito = this.state.carrito;
   // console.log(carrito)
    return (
      <>
        <Container /*hidden={!this.props.visible}*/>
          <br />            
          <Row>
            <Col>
            
              <Lista datos={items} agregar={this.agregarItem} quitar={this.quitarItem} eliminar={this.eliminarItem}/>
             
            </Col>
            <Col xs={3}>
              <Row>
                <Col>
                  <Button 
                    color="danger"
                    onClick={this.vaciarCarrito}
                    hidden={true}
                  ><img src={del} alt=''/>Vaciar
                  </Button>
                </Col>
                <Col>
                  <h2 align="align-right">Total: ${this.state.total}</h2>
                </Col>
              </Row>
              <Row>
                <Tabla columnas={{descripcion:"Descripción", cantidad:"Cant", precio:"Precio", importe:"Importe"}} datos={carrito}/>
              </Row>
              <Row>
                <Col>
                  <Button 
                        color="primary"
                        onClick={this.confirmar}
                        disabled={carrito.length === 0}
                      ><img src={ok} alt=''/>Confirmar
                  </Button>
                </Col>
                <Col>
                  <Button 
                        color="danger"
                        onClick={this.cancelar}
                      ><img src={cancel} alt=''/>Cancelar
                  </Button>
                </Col>

              </Row>
             
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export { Carrito };
