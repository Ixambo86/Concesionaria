import React, {Component} from "react";
import { Lista } from '../../components/Lista'


import cancel from '../../image/cancel24.png'

import "./Catalogo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "reactstrap";

class Catalogo extends Component{
  
  state = {
    visible:false,
    item:{},
    total:0,
    actualiza_estado: false
  };

 
  confirmar = (item) =>{
    console.log(item)
    this.setState({item:item, total: item.precio}, ()=>{
      this.props.confirmar(this.state.item, this.state.total)
      this.setState({item:{}})
    })
    
  }

  cancelar = () =>{
    this.props.cancelar()
    this.setState({item:{}})
  }

  render() {
    const items = this.props.items;
    return (
      <>
        <Container /*hidden={!this.props.visible}*/>
          <br/>
          <Button color="danger" onClick={this.cancelar}><img src={cancel} alt=''/>Cancelar</Button>
          <br />                     
              <Lista datos={items} seleccionar={ this.confirmar} detalle={this.props.detalle}/>    
        </Container>
      </>
    );
  }
}
export { Catalogo };
