import React, {Component} from "react";
import search from '../../image/search2.png'
import filter from '../../image/filter.png'
import ayuda from '../../image/informacion.png'
import "./Busqueda.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Input, InputGroup, Navbar, Form, Popover, PopoverHeader, PopoverBody,UncontrolledPopover} from "reactstrap";


class Busqueda extends Component{
    constructor(props) {
        super(props)
        this.state = {
          query: '',
          mostrarFiltro:false
        }
    }
    
    handleChange = e => {
        const query = e.target.value
        this.setState({ query })
    }
    
    handleSubmit = e => {
        e.preventDefault()
        const {query} = this.state
        const {filtro} = this.state
        console.log(query)
        this.props.search(query/*, filtro*/)
    }
    
    aplicarFiltro = () =>{
        this.props.aplicarFiltro()
        this.ocultarFiltro()
    }

    render(){
        return (
            <>
                <Navbar color="primary">
                    <Form>
                        <h2 className="titulo">{this.props.modulo}</h2>
                    </Form>
                    <Form onSubmit={this.handleSubmit}>
                        
                        <InputGroup>
                        <div className="filt">
                            <Input autoFocus
                                size='sm'
                                type="search" 
                                placeholder={this.props.placeholder?this.props.placeholder:"Buscar"}
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                img={search}
                            /></div>
                            <Button size="sm" variant="outlined" color="info" data-toggle="tooltip" data-placement="top" 
                            title="Aplicar Filtros" onClick={this.props.botonFiltro} hidden={!this.props.botonFiltro}><img src={filter} alt=''/></Button>
                       
                       <Button id="PopoverLegacy" type="right" color="white"> 
                     <img src={ayuda} className = "menu_ayuda" alt='ayuda'/> 
              </Button>
              <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy">
                  
                    <PopoverHeader placement="left">Buscar Rápida</PopoverHeader>
                    <PopoverBody>Para obtener información utilizando la <b>búsqueda rápida</b>, puede ingresar datos que se conozcan para la acción a realizar.</PopoverBody>
                    <PopoverBody><h5>Ejemplos</h5></PopoverBody>
                    <PopoverBody>Información del automotor</PopoverBody>
                    <PopoverBody><b>Marca de Automotor: </b> Ford</PopoverBody>
                    <PopoverBody><b>Patente de Automotor: </b> AB123AA</PopoverBody>
                    <PopoverHeader>Filtro Personalizado</PopoverHeader>
                    <PopoverBody> En el caso de estar disponible, se podrá hacer uso del filtro personalizado <Button size="sm" variant="outlined" color="info" data-toggle="tooltip" data-placement="top" 
                            title="Aplicar Filtros" ><img src={filter} alt=''/></Button></PopoverBody>
                    <PopoverBody>Permite ingresar información más específica dependiento la acción que se intente realizar </PopoverBody>        
                    <PopoverBody><h5>Ejemplos</h5></PopoverBody> 
                    <PopoverBody><b>Nro de Orden: </b>Permite ingresar información más específica dependiento la acción que se intente realizar </PopoverBody>             
                    </UncontrolledPopover>
            
                        </InputGroup>
                    </Form>
                </Navbar>
               
            </>
        )
    }
}

export { Busqueda };