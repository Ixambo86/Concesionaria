import React, { Component } from 'react';
import { Badge, Input, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter,PopoverHeader, PopoverBody, UncontrolledPopover} from 'reactstrap';
import { TablaTurnos } from './TablaTurnos'
import DatePicker from 'react-date-picker';
import { Busqueda } from '../../components/Busqueda/Busqueda'
import { FormFiltro } from "../../components/FormFiltro";
import { config } from "../../config"
import { turnoService } from '../../_services/turnos.services';
import del from "../../image/cancel16.png"

import ok from "../../image/accept24.png"
import cancel from "../../image/cancel24.png"
import ayuda from '../../image/informacion.png'
import './Turnos.css';

class Turnos extends Component {
    constructor (props){        
        const hoy = new Date();
        hoy.setHours(hoy.getHours() - 3);
        super(props)
        this.state = {
            date: hoy,
            sucursal: config.sucursal,
            query: [],
            turnos: [],
            sucursales: [],
            ordenes: [],
            mod: 0,
            deshabilitar: false,
            adelante: false,
            filtroOrdenes: {
                buscar:''
            },
            mecanico: '',
            modulo: 0,
            orden:0,
            form: false,
            numOt: 0,
            cliente_id: 0,
            disponible: false,
            cantModulos: 0,
            mostrarFiltro:false,
            filtros_campos: {
                cliente_nombre:{
                    tipo:"text",
                    descripcion: "Cliente",
                    valor:""
                },
                nro_orden:{
                    tipo:"text",
                    descripcion: "Nro de Orden",
                    valor:""
                },
                automotor_descripcion:{
                    tipo:"text",
                    descripcion: "Descripción del automotor",
                    valor:""
                },
                sucursal:{
                    tipo:"select",
                    descripcion: "Sucursal",
                    valor:"",
                    opciones:[]
                },
                fecha_desde:{
                    tipo:"date",
                    descripcion: "Fecha desde",
                    valor:""
                },
                fecha_hasta:{
                    tipo:"date",
                    descripcion: "fecha hasta",
                    valor:""
                }
            }
        }
    };

    componentDidMount(){       
        this.buscar(this.cambiarFecha(this.state.date)); 
        this.armarColumnas();
        this.buscarSucursal();
        this.buscarOrden(this.state.filtroOrdenes.buscar);
 
    };

    armarColumnas =() => {
        var recursos = [];
        recursos.push({hora_inicio:"Desde"});
        recursos.push({hora_fin:"Hasta"});
        const recurso = this.getMecanicos();
        for (var i=1; i<=recurso;i++){
            var key = 'mecanico_' + i;
            var obj = {}; 
            obj[key] = 'Mécanico: ' +i;
            recursos.push(obj);
        }
        return recursos.reduce((a, b) => Object.assign(a, b), {})
    }

    completarTurnos = query => {
        var aux = [];
        var j = 0;
        for (var i=8; i<19; i++){
          
          var inicio1 = '' + i + ':00:00';
          var inicio2 = '' + i + ':30:00';
          var fin1 = '' + i + ':30:00';
          var fin2 = ''+ (i +1) + ':00:00';
          if (inicio1.length===7)
            inicio1= '0' + inicio1;
          if (inicio2.length===7)
            inicio2= '0' + inicio2;
          if (fin1.length===7)
            fin1= '0' + fin1;
          if (fin2.length===7)
            fin2= '0' + fin2;
       
          aux.push({id: null, modulo: (j), hora_inicio: inicio1, hora_fin: fin1});
          aux.push({id: null, modulo: (j+1), hora_inicio: inicio2, hora_fin: fin2});
          j = j + 2;
        }
        for (var g= 0; g<aux.length; g++){
          aux[g].hora_inicio= aux[g].hora_inicio.slice(0,5);
          aux[g].hora_fin= aux[g].hora_fin.slice(0,5);
            for (var h=1; h <= this.getMecanicos(); h++){
                var key = 'mecanico_' + h;
                var obj = {};
                obj[key] = '';
                let merge = {...aux[g], ...obj}
                aux[g] = merge;
            }
        }

        for (var e= 0; e<aux.length; e++){
          for (var f = 0; f< query.length; f++){
            if ((aux[e].modulo == query[f].modulo)){
                var key = query[f].mecanico;
                aux[e][key] = query[f].nro_orden;
                var x = e+1;
                for (var l= 1; l< query[f].cantidad_modulos; l++){                    
                    aux[x][key] = '*';
                    x++;
                }
            }
          }        
        } 
        this.setState({turnos: aux});
    }

    getMecanicos = () => {
        for (var e= 0; e<this.state.sucursales.length; e++){
          if (this.state.sucursales[e].id == this.state.sucursal)
            return this.state.sucursales[e].cant_mecanicos;
        }
      }

    cambiarFecha = date => {
        const fechaLocal = date.toISOString();
        const fecha = fechaLocal.slice(0,10);
        return  fecha;
    };

    mostrarForm = (modu, modo, mec) => {
        var sucu = [];
        for (var e= 0; e<this.state.sucursales.length; e++)
            sucu.push(this.state.sucursales[e].nombre)
        this.setState({filtros_campos:{...this.state.filtros_campos, sucursal:{...this.state.filtros_campos.sucursal, opciones : sucu}}})
        this.setState({modulo: modu});
        this.setState({mecanico: mec});
        this.setState({form: modo});
    };

    cerrarForm = () => {
        this.setState({form: false});
    };

     stearTiempo =  () => {
        const hoy = new Date();
        const hora = hoy.toTimeString().slice(0,2);
        const min = hoy.toTimeString().slice(3,5);
        var mod = (parseInt(hora) -8) * 2;
        if (parseInt(min) >29)
            mod++;
        hoy.setHours(hoy.getHours() - 3);
        const fechaLocal = hoy.toISOString();
        const fecha = fechaLocal.slice(0,10);
        const deshabilitar = this.cambiarFecha(this.state.date) < fecha;
        const adelante = this.cambiarFecha(this.state.date) <= fecha;
        this.setState({mod: mod, deshabilitar: deshabilitar, adelante: adelante});
    }

    buscar = fecha => {
        this.stearTiempo();
        turnoService.buscarTurnos(fecha, this.state.sucursal)          
        .then((res) => {
            this.completarTurnos(res);
            })
    }
    
    buscarOrden = query => {
        turnoService.buscarOrdenes({buscar:query})
        .then((res) => {
            this.setState(
                {
                    ordenes: res, 
                    filtroOrdenes:{ 
                        buscar: query
                    }
                }, ()=>{
                this.limpiarFiltros()                
            })        
        })  
    }

    buscarSucursal = ()=> {
        turnoService.buscarSucursales()
        .then((res) => {
            this.setState({sucursales: res})});
    } 

    cancelar = (turno, index) => {
        var mec = 'mecanico_' + index;
        turnoService.cancelarTurno(this.cambiarFecha(this.state.date), turno.modulo, this.state.sucursal, turno[mec], mec)
        .then(() => {
            this.buscar(this.cambiarFecha(this.state.date));
            this.buscarOrden(this.state.filtroOrdenes.buscar);
        });
    } 

    eliminar = (turno, index) => {
        var mec = 'mecanico_' + index;
        var opcion = window.confirm("Estás Seguro que deseas rechazar la Orden de Trabajo: " + turno[mec] + " asignada en la fecha: "+ this.cambiarFecha(this.state.date) +
        " desde las: " + turno.hora_inicio + "hs. hasta las: " + turno.hora_fin + "hs. al : " + mec);
        if (opcion === true) {      
            turnoService.eliminarTurno(this.cambiarFecha(this.state.date), turno.modulo, this.state.sucursal, turno[mec], mec)
            .then(() => {
                this.buscar(this.cambiarFecha(this.state.date));
                this.buscarOrden(this.state.filtroOrdenes.buscar);
            });
        }
        else {
            this.buscar(this.cambiarFecha(this.state.date));
            this.buscarOrden(this.state.filtroOrdenes.buscar);
        }
    }

    insertar = ()=>{
        if(!this.state.disponible){
            window.alert('No hay espacio disponible')
            this.cerrarForm();
            return;
        }
        if (this.state.numOt === 0 && this.state.cantModulos === 0) {
            window.alert('Seleccionar una orden de trabajo')
        }
        else {         
            turnoService.insertarTurno(this.cambiarFecha(this.state.date), this.state.modulo, this.state.sucursal, this.state.orden, this.state.numOt, this.state.cantModulos, this.state.mecanico, this.state.cliente_id)
                .then(() => {
                    this.cerrarForm();                    
                    this.buscar(this.cambiarFecha(this.state.date));
                    this.buscarOrden(this.state.filtroOrdenes.buscar);
                    this.setState({numOt: 0, cantModulos: 0})
                }); 
        } 
    }

    buscarOt = (orden) => {
        var ot='';
        var modulos = 0;
        var cliente = 0;
        for (var e= 0; e<this.state.ordenes.length; e++){
            if (this.state.ordenes[e].id == orden){
                ot = this.state.ordenes[e].nro_orden;
                modulos = this.state.ordenes[e].cantidad_modulos
                cliente = this.state.ordenes[e].cliente_id
            }
        }
        this.setState({numOt: ot});
        this.setState({cliente_id: cliente});        
        this.comprobarDisponibilidad(modulos);
    }

    comprobarDisponibilidad = (cantMod) => {
        var disp = true;
        var mod = this.state.modulo; 
        var key = this.state.mecanico;
        var alcance = (mod + cantMod);
        if (alcance > this.state.turnos.length){
            this.setState({cantModulos: cantMod});
            this.setState({disponible: false});
        }
        else {
            for (var e= 0; e<cantMod; e++){
                disp = (disp && this.state.turnos[mod][key] === '') || (disp && this.state.turnos[mod][key] === undefined);
                mod ++;
            }
            this.setState({cantModulos: cantMod});
            this.setState({disponible: disp});
        }
    }

    modHoras = (num) =>{ 
        var numero= num * 30;
        var hours = Math.floor(numero / 60);
        if (hours.toString().length === 1)
            hours = '0' + hours; 
        var minutes = numero % 60;
        if (minutes.toString().length === 1)
        minutes = '0' + minutes; 
        return hours + ':' + minutes + 'hs.';         
    }

   onChangeFiltro = (e) =>{
    console.log(e.target.name, e.target.value)
    this.setState({
        filtros_campos:{
            ...this.state.filtros_campos,
            [e.target.name]: {
                ...this.state.filtros_campos[e.target.name],
                valor: e.target.value
            }
        }
    })
}

    aplicarFiltro = () =>{
        let filtros = {}
        Object.keys(this.state.filtros_campos).map(f =>{
            if (this.state.filtros_campos[f].valor !== ''){
                filtros = {
                    ...filtros,
                    [f] : this.state.filtros_campos[f].valor
                }
            }
        })
        this.setState({
            filtroOrdenes:{
                buscar: this.state.filtroOrdenes.buscar,
                ...filtros
            }
        }, ()=>{
            turnoService.buscarOrdenes(this.state.filtroOrdenes)
            .then(res =>{
                this.setState({ordenes: res, mostrarFiltro: false})
            })
        })        
    }

    limpiarFiltros = () =>{
        Object.keys(this.state.filtros_campos).map(f =>{
            this.state.filtros_campos[f].valor = ''
        })
        this.setState({filtros_campos: this.state.filtros_campos})
    }

    botonFiltro = () =>{
        this.setState({mostrarFiltro: !this.state.mostrarFiltro})
    }

                
    render() {
        const turnos = this.state.turnos;
        return (
            <>
            <Container>
                <div className='fondo'>
                <h2 className= 'titutur'><b>Turnos</b></h2>
                <div className='almanaque'>
                
                <DatePicker onChange={date => this.buscar(this.cambiarFecha(date))} onClickDay={date => this.setState({date})} value={this.state.date} clearIcon= {null}/>
                </div>
                <Button id="PopoverLegacy1" type="right" color="white"> 
                     <img src={ayuda} className = "menu_ayuda" alt='ayuda'/> 
              </Button>
              <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy1">
                    <PopoverHeader> Revisón de Turnos </PopoverHeader>
                    <PopoverBody> Através del calendario podemos obsarvar los turnos que se encuentran reservados y la disponibilidad de cada día.</PopoverBody>
                    <PopoverBody> Tener encuenta que tambien podemos verificar las reservas resalizadas en las distintas sucursales.</PopoverBody>
                    <PopoverHeader>Asignación de turnos </PopoverHeader>
                    <PopoverBody>Antes de asignar un turno debe estar creada la orden de trabajo.</PopoverBody>
                    <PopoverBody>Se debe verificar la duración estimada del servicio ya que el sistema solo nos permitirá resevar turnos en franjas horarias que cuenten con dicha disponibilidad.</PopoverBody>
                    <PopoverBody>Observar que algunas sucursales cuentan con más de un mecánico disponible.</PopoverBody>
                   </UncontrolledPopover>
                <div className="sucursales">
                <Input  name="sucursal" type="select" value={this.state.sucursal} onClickCapture={() => this.buscar(this.cambiarFecha(this.state.date))} onChange={(e) => this.setState({sucursal: e.target.value})}/*onChange={(e) => this.setState({sucursal: e.target.value}, this.buscar(this.cambiarFecha(this.state.date)))}*/>
                    <option value="0" key='0'>Seleccionar sucursal</option>
                    {
                        this.state.sucursales.map(sucursal => {
                        return (<option value={sucursal.id} key={sucursal.id} id={sucursal.id}>{sucursal.nombre}</option>)})
                    }                  
                </Input> 
                </div>
                </div>
                <br/>     
                   
                <TablaTurnos columnas={this.armarColumnas()} datos={turnos} mod={this.state.mod} adelante={this.state.adelante} deshabilitar={this.state.deshabilitar} agregar={this.mostrarForm} cancelar={this.cancelar} eliminar={this.eliminar}/>  
            </Container>
            <Modal isOpen={this.state.form}>
                <ModalHeader>
                    <div><h3>Nuevo Turno</h3></div>
                </ModalHeader>
                <ModalBody>
                <Busqueda 
                        modulo="Buscar orden" 
                        search={this.buscarOrden}
                        botonFiltro={this.botonFiltro}
                        />
                <br />
                <div className="fil">
                {
                    
                    Object.keys(this.state.filtroOrdenes).map(f =>{                                    
                        return( f !== 'buscar' &&             
                            <Badge color="info" size="lg" hidden={this.state.filtros_campos[f].valor === ""}>
                                {this.state.filtros_campos[f].descripcion + ' : ' + this.state.filtros_campos[f].valor}
                                <img src={del} alt='' onClick={() => {this.state.filtros_campos[f].valor = '' 
                                this.aplicarFiltro()}}/>
                            </Badge>)        
                    })
                    
                }</div>
                <div hidden={!this.state.mostrarFiltro} xs={3}>
                <FormFiltro 
                    filtros={this.state.filtros_campos}
                        limpiarFiltros={this.limpiarFiltros}
                        aplicarFiltro={this.aplicarFiltro}
                        onChange={this.onChangeFiltro}
                    />
                </div>
                    <label>Asignar a mécanico: </label> <br/>
                <Input name={'orden'} type="select" onChange={(e) => this.setState({orden: e.target.value}, this.buscarOt(e.target.value))}>
                <option value="0">Orden de Trabajo...</option> {
                      this.state.ordenes.map(orden => {
                        return (<option value={orden.id} key={orden.id} id= {orden.id}>{orden.nro_orden+ ' | '+ orden.cliente_nombre + ' | ' + orden.automotor_dominio + ' | '+ this.modHoras(orden.cantidad_modulos) + ' |'}</option>)})
                    }             
                </Input>                                
                </ModalBody>
                <ModalFooter>
                <Button color="primary" data-toggle="tooltip" data-placement="top" title="Aceptar" onClick={this.insertar}><img src={ok} alt=''/>
                </Button>
                <Button color="danger" data-toggle="tooltip" data-placement="top" title="Cancelar" onClick={() => this.cerrarForm()}><img src={cancel} alt=''/></Button>
                </ModalFooter>
            </Modal>
            </>
        );
    }
}

export { Turnos };