import React,{Component} from 'react';
import { render } from "react-dom";
import { Chart } from "react-google-charts";

import { userService } from '../../_services/user.services';
import { pedidosService } from '../../_services/pedidos.services';
import { authenticationService } from '../../_services/authentication.service';
import "./HomePage.css";
import usuario from "../../image/usuarioHome.png";
import {Button} from "reactstrap";
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Navbar, Form,PopoverHeader, PopoverBody, UncontrolledPopover} from "reactstrap";
import ayuda from '../../image/informacion.png'

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            cantidadUsuarios: 0,
            cantidadActivos: 0,
            cantidadEliminados: 0,
            cantidadBloqueados: 0,
            cantidadAdministradores: 0,
            cantidadMecanicos: 0,
            cantidadGerentes: 0,
            cantidadAdministrativos: 0,
            cantidadVendedores: 0,
            cantidadSupervisores: 0,

            cantidadVentas:0,
            cantidadVentasIniciadas:0,
            cantidadVentasReserva:0,
            cantidadVentasCanceladas:0,
            cantidadVentasFinalizadas:0,
            fechaUltimaVenta:null,
            ingresosTotales:0,
            egresosTotales:0,
            ventaPromedio:0,
            ventasVendedores: [],
            ventasVendedoresFinal: [],

            dataFinal: [],

            cantidadOrdenesTrabajo:0,
            cantidadOrdenesTrabajoIniciadas:0,
            cantidadOrdenesTrabajoFacturadas:0,
            cantidadOrdenesTrabajoCanceladas:0,
            cantidadOrdenesTrabajoFinalizadas:0,
            cantidadOrdenesTrabajoPendientes:0,
            fechaUltimaOrdenTrabajo:null,


    
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
        if(currentUser.role == "Administrador"){
            this.buscarTotalUsuarios();
            this.buscarUsuariosActivos();
            this.buscarUsuariosEliminados();
            this.buscarUsuariosBloqueados();
            this.buscarUsuariosAdministradores();
            this.buscarUsuariosMecanicos();
            this.buscarUsuariosVendedores();
            this.buscarUsuariosSupervisores();
            this.buscarUsuariosAdministrativos();
            this.buscarUsuariosGerentes();
        }
        if(currentUser.role == "Supervisor de ventas" || currentUser.role == "Vendedor"){
           this.buscarCantidadVentas();
           this.buscarCantidadReservas();
           this.buscarVentasCanceladas();
           this.buscarVentasFinalizadas();
           this.buscarVentasIniciadas();
           this.buscarUltimaVenta(currentUser.sucursal).
           then(()=>{this.setState({fechaUltimaVenta:this.armarFecha()}) });
        }
        
        if(currentUser.role == "Gerente"){
            this.buscarIngresosTotales(currentUser.sucursal);
            this.buscarVentaPromedio(currentUser.sucursal);
            this.buscarUltimaVenta(currentUser.sucursal).
            then(()=>{this.setState({fechaUltimaVenta:this.armarFecha()}) });;
            this.buscarVentasFinalizadas(currentUser.sucursal);
            this.buscarEgresosTotales(currentUser.sucursal);
            this.buscarVentasVendedor(currentUser.sucursal).
            then(()=>{this.setState({dataFinal:this.armarLista()}) });
        }

        if(currentUser.role == "Administrativo" || currentUser.role == "Mecanico"){
            this.buscarOrdenesTotales();
            this.buscarOrdenesFinalizadas();
            this.buscarOrdenesIniciadas();
            this.buscarUltimaOrden();
            this.buscarOrdenesCanceladas();
            this.buscarOrdenesFacturadas();
            this.buscarOrdenesPendientes();
        }
    }

    buscarTotalUsuarios = () => {
        userService.buscarTotalUsuarios()
        .then((res) => {

            console.log(res[0].cantidad)
            this.setState({cantidadUsuarios: res[0].cantidad})
      
        });
    }

    buscarUsuariosActivos = () => {
        userService.buscarUsuariosActivos()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadActivos: res[0].cantidad})
      
        });
    }

    buscarUsuariosEliminados = () => {
        userService.buscarUsuariosEliminados()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadEliminados: res[0].cantidad})
      
        });
    }

    buscarUsuariosBloqueados = () => {
        userService.buscarUsuariosBloqueados()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadBloqueados: res[0].cantidad})
      
        });
    }

    buscarUsuariosAdministradores = () => {
        userService.buscarUsuariosAdministradores()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadAdministradores: res[0].cantidad})
      
        });
    }

    buscarUsuariosMecanicos = () => {
        userService.buscarUsuariosMecanicos()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadMecanicos: res[0].cantidad})
      
        });
    }

    buscarUsuariosVendedores = () => {
        userService.buscarUsuariosVendedores()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadVendedores: res[0].cantidad})
      
        });
    }

    buscarUsuariosAdministrativos = () => {
        userService.buscarUsuariosAdministrativos()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadAdministrativos: res[0].cantidad})
      
        });
    }

    buscarUsuariosSupervisores = () => {
        userService.buscarUsuariosSupervisores()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadSupervisores: res[0].cantidad})
      
        });
    }

    buscarUsuariosGerentes = () => {
        userService.buscarUsuariosGerentes()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadGerentes: res[0].cantidad})
      
        });
    }


    buscarCantidadVentas = () => {
        userService.buscarCantidadVentas()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadVentas: res[0].cantidad})
      
        });
    }

    
    buscarVentasIniciadas = () => {
        userService.buscarVentasIniciadas()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadVentasIniciadas: res[0].cantidad})
      
        });
    }

    
    buscarCantidadReservas = () => {
        userService.buscarCantidadReservas()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadVentasReserva: res[0].cantidad})
      
        });
    }

    
    buscarVentasFinalizadas = (sucursal) => {
        userService.buscarVentasFinalizadas(sucursal)
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadVentasFinalizadas: res[0].cantidad})
      
        });
    }

    
    buscarVentasCanceladas = () => {
        userService.buscarVentasCanceladas()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadVentasCanceladas: res[0].cantidad})
      
        });
    }

    buscarUltimaVenta = (sucursal) => {
        let promise = new Promise(resolve => {
        userService.buscarUltimaVenta(sucursal)
        .then((res) => {
            this.setState({fechaUltimaVenta: res[0].cantidad})
            resolve(true)
        });
    })
        return promise;
    }

    buscarVentaPromedio = (sucursal) => {
        userService.buscarVentaPromedio(sucursal)
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({ventaPromedio: res[0].cantidad})
      
        });
    }

    buscarIngresosTotales = (sucursal) => {
        userService.buscarIngresosTotales(sucursal)
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({ingresosTotales: res[0].cantidad})
      
        });
    }
    
    buscarEgresosTotales = (sucursal) => {
        userService.buscarEgresosTotales(sucursal)
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({egresosTotales: res[0].cantidad})
      
        });
    }

    buscarOrdenesTotales = () => {
        userService.buscarOrdenesTotales()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadOrdenesTrabajo: res[0].cantidad})
      
        });
    }

    buscarOrdenesFinalizadas = () => {
        userService.buscarOrdenesFinalizadas()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadOrdenesTrabajoFinalizadas: res[0].cantidad})
      
        });
    }

    buscarOrdenesCanceladas = () => {
        userService.buscarOrdenesCanceladas()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadOrdenesTrabajoCanceladas: res[0].cantidad})
      
        });
    }

    buscarUltimaOrden = () => {
        userService.buscarUltimaOrden()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({fechaUltimaOrdenTrabajo: res[0].cantidad})
      
        });
    }
    
    buscarOrdenesIniciadas = () => {
        userService.buscarOrdenesIniciadas()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadOrdenesTrabajoIniciadas: res[0].cantidad})
      
        });
    }

    buscarOrdenesPendientes = () => {
        userService.buscarOrdenesPendientes()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadOrdenesTrabajoPendientes: res[0].cantidad})
      
        });
    }

    buscarOrdenesFacturadas = () => {
        userService.buscarOrdenesFacturadas()
        .then((res) => {
            console.log(res[0].cantidad)
            this.setState({cantidadOrdenesTrabajoFacturadas: res[0].cantidad})
      
        });
    }

    buscarVentasVendedor = (sucursal) => {
        let promise = new Promise(resolve => {
            userService.buscarVentasVendedor(sucursal)
        .then((res) => {
            this.setState({ventasVendedores: res})
            resolve(true)     
        }); 
        })
        return promise;
    }


    armarFecha = () =>{
        var fecha = new Date (this.state.fechaUltimaVenta);
        var fechaParseada = fecha.getDate() + '-' + (fecha.getMonth()+1) + '-' + fecha.getFullYear() + ' ' + fecha.getHours() + ':' + fecha.getMinutes();
        return fechaParseada;
    }

    obtenerDatosGrafico = () => {
        const data = [
            ["Tipo de ingreso", "Valor"],
            ["Ingresos", this.state.ingresosTotales],
            ["Egresos", this.state.egresosTotales]
          ];

        return data;  
    }

    obtenerConfigGrafico = () =>{
        const options = {
            title: "Balance de Ingresos",
            pieHole: 0.5,
            is3D: false,
            chartArea:{left:0,top:0,width:'100%',height:'100%'}
          };
        return options;  
    }

    armarLista = () =>{
        var listaVentas = [];
        var vendedores = this.state.ventasVendedores;

        for (var i in vendedores){
            listaVentas.push([vendedores[i].Sucursal,vendedores[i].Usuario,vendedores[i].Total,vendedores[i].Cant_Ventas]);
        }

        const data = [
            [
                {type: 'string', label: 'Sucursal'},
                {type: 'string', label: 'Usuario'},
                {type: 'number', label: 'Importe Total'},
                {type: 'number', label: 'Cant. Ventas'},
            ],

            ...listaVentas
        ]

        return data;  
    }
    

    obtenerConfigTabla = () =>{
        const options={
            showRowNumber: true,
        }

        return options;
    }


    render() {
        const { currentUser, userFromApi } = this.state;
        var hoy = new Date();
            return (
                <container>
                    <Navbar color="primary">
                        <Form>
                            <h2 className="titulo">AutoBot</h2>
                        </Form>
                    </Navbar>

                    <div class= "menuPrincipal">
                        <div class="card" >
                        <img class = "imageUser" src={usuario} alt="Avatar"/>
                            <div class="container">
                                <h4><b>{currentUser.user}</b></h4>
                                <p>Rol: {currentUser.role}</p>
                                <p>Legajo: {currentUser.id} </p>
                                <p>Último ingreso: {hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()}</p>
                            </div>
                        </div>

                        <div class="card2" hidden={currentUser.role != "Administrador"}>
                            <div class="container">
                                
                                <div class = "cantidadUsuarios">
                                    <h4><b>Usuarios</b></h4>
                                    <br/>
                                    <h4>Total: {this.state.cantidadUsuarios} </h4>
                                    <br/>
                                    <h4>Activos: {this.state.cantidadActivos} </h4>
                                    <br/>
                                    <h4>Eliminados: {this.state.cantidadEliminados} </h4>
                                    <br/>
                                    <h4>Bloqueados: {this.state.cantidadBloqueados} </h4>
                                    <br/>
                                    <h4>Administradores: {this.state.cantidadAdministradores} </h4>
                                    <br/>
                                    <h5>Último Backup : {hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()} </h5>
                                </div>

                                <div class="datosUsuarios">
                                <h4><b> &nbsp;</b></h4>
                                    <br/>
                                    <h4>Vendedores: {this.state.cantidadVendedores} </h4>
                                    <br/>
                                    <h4>Mecanicos:  {this.state.cantidadMecanicos} </h4>
                                    <br/>
                                    <h4>Supervisores de ventas: {this.state.cantidadSupervisores} </h4>
                                    <br/>
                                    <h4>Administrativos: {this.state.cantidadAdministrativos}</h4>
                                    <br/>
                                    <h4>Gerentes: {this.state.cantidadGerentes} </h4>
                                    <h4><b> &nbsp;</b></h4>
                                </div>
                            </div>
                        </div>


                        <div class="card2" hidden={currentUser.role != "Supervisor de ventas" && currentUser.role != "Vendedor"}>
                            <div class="container">
                                
                                <div class = "cantidadUsuarios">
                                    <h4><b>Ventas</b></h4>
                                    <br/>
                                    <h4>Total: {this.state.cantidadVentas} </h4>
                                    <br/>
                                    <h4>Iniciadas: {this.state.cantidadVentasIniciadas} </h4>
                                    <br/>
                                    <h4>Reservas: {this.state.cantidadVentasReserva} </h4>
                                    <br/>
                                    <h5>Última Venta: {this.state.fechaUltimaVenta} </h5>
                                </div>
                                
                                <div class="datosUsuarios">
                                <h4><b> &nbsp;</b></h4>
                                    <br/>
                                    <h4>Finalizadas: {this.state.cantidadVentasFinalizadas} </h4>
                                    <br/>
                                    <h4>Canceladas: {this.state.cantidadVentasCanceladas} </h4>
                                    <br/>
                                    <h4><b> &nbsp;</b></h4>
                                </div>
                            </div>
                        </div>

                        <div class="card2" hidden={currentUser.role != "Administrativo" && currentUser.role != "Mecanico"}>
                            <div class="container">
                                
                                <div class = "cantidadUsuarios">
                                    <h4><b>Ordenes de Trabajo</b></h4>
                                    <br/>
                                    <h4>Total: {this.state.cantidadOrdenesTrabajo} </h4>
                                    <br/>
                                    <h4>Iniciadas: {this.state.cantidadOrdenesTrabajoIniciadas} </h4>
                                    <br/>
                                    <h4>Pendientes: {this.state.cantidadOrdenesTrabajoPendientes} </h4>
                                    <br/>
                                    <h5>Última Modificación: {this.state.fechaUltimaOrdenTrabajo} </h5>
                                </div>
                                
                                <div class="datosUsuarios">
                                <h4><b> &nbsp;</b></h4>
                                    <br/>
                                    <h4>Canceladas: {this.state.cantidadOrdenesTrabajoCanceladas} </h4>
                                    <br/>
                                    <h4>Finalizadas: {this.state.cantidadOrdenesTrabajoFinalizadas} </h4>
                                    <br/>
                                    <h4>Facturadas: {this.state.cantidadOrdenesTrabajoFacturadas} </h4>
                                    <br/>
                                    <h4><b> &nbsp;</b></h4>
                                </div>
                            </div>
                        </div>

                        <div class="card2" hidden={currentUser.role != "Gerente"}>
                        
                            <div class = "cantidadUsuarios">

                                    <h4><b>Ganancias</b></h4>
                                    <br/>
                                    <Chart class= "balance"
                                        chartType="PieChart"
                                        width="100%"
                                        height="350px"
                                        data={this.obtenerDatosGrafico()}
                                        options={this.obtenerConfigGrafico()}
                                    />
                                    

                                      <h4>Ingresos Totales: <b><font class = "mensajeIngreso">$ {Intl.NumberFormat().format(parseInt(this.state.ingresosTotales))}</font> </b></h4>
                                        <br/>
                                    
                                        <h5>Última Venta: {this.state.fechaUltimaVenta } </h5>             
                                
                            </div>

                            <div class ="graficoTabla">
                                            <h5>Ventas Totales por Empleado</h5>             

                                           <Chart
                                            width={'400px'}
                                            height={'125px'}
                                            chartType="Table"
                                            loader={<div>Cargando Tabla</div>}
                                            data={this.state.dataFinal}
                                            options={this.obtenerConfigTabla()}
                                            rootProps={{ 'data-testid': '1' }}
                                            />
                                            <h4>Venta Promedio:  <b><font color='green'>$ {Intl.NumberFormat().format(Math.round(this.state.ventaPromedio))}</font> </b> </h4>
                                            <br/>
                                            <h4>Ventas Concretadas: <b><font color='blue'>{this.state.cantidadVentasFinalizadas}</font> </b> </h4>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <h4>Egresos Totales: <b><font class = "mensajeEgreso">$ {Intl.NumberFormat().format(parseInt(this.state.egresosTotales))}</font> </b></h4>

                            </div>                                         
                                                    

                        </div>


                        <div class = "botones">
                            <h4>Acciones rápidas<Button id="PopoverLegacy1" type="right" color="white">
                                <img src={ayuda} className="menu_ayuda" alt='ayuda' />
                            </Button>
                            <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy1">
                                <PopoverHeader>Acciones Rápidas</PopoverHeader>
                                <PopoverBody>Las acciones rápidas se encuentran disponibles para ofrecer un rápido acceso a las funcionalidades principales.</PopoverBody>
                                <PopoverBody>También se podrán acceder desde el menú principal donde adicionalmente se incluyen las funcionalidades restantes.</PopoverBody>
                            </UncontrolledPopover></h4>

                            <Button size = "lg" block hidden={currentUser.role != "Gerente"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/reportes')}
                                > Ver Reportes 
                            </Button>

                            
                            <Button size = "lg" block hidden={currentUser.role != "Administrador" && currentUser.role != "Gerente"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/gestion_usuarios')}
                                > Configurar Usuarios
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Vendedor" && currentUser.role != "Supervisor de ventas"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/cliente')}
                                > Configurar Clientes 
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Vendedor" && currentUser.role != "Supervisor de ventas"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/pedidos')}
                                > Nueva Venta
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Vendedor" && currentUser.role != "Supervisor de ventas" && currentUser.role != "Gerente"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/facturacion')}
                                > Ver Facturas
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Administrador"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/sucursal')}
                                > Configurar Sucursales 
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Mecanico"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/sucursal')}
                                > Ver Sucursales 
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Administrativo"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/orden_trabajo')}
                                > Nueva Orden de trabajo 
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Administrativo"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/sucursal')}
                                > Ver Sucursales 
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Mecanico" && currentUser.role != "Administrativo"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/turnos')}
                                > Ver turnos 
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Mecanico" }
                                    color="primary"
                                    onClick={() => this.props.history.push('/orden_trabajo')}
                                > Ver Ordenes de Trabajo 
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Administrador" && currentUser.role != "Gerente"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/costumer')}
                                > Configurar Mensajes 
                            </Button>
                            
                            <Button size = "lg" block hidden={currentUser.role != "Administrador"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/marca')}
                                    > Configurar Marcas 
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Administrador" && currentUser.role != "Supervisor de ventas"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/modelo')}
                                > Configurar Modelos 
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Supervisor de ventas"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/automotor')}
                                > Configurar Automotores 
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Administrativo"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/producto')}
                                > Cargar Producto
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Administrativo"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/servicio')}
                                > Cargar Servicio 
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Administrativo" && currentUser.role != "Supervisor de ventas"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/remito')}
                                > Importar Remito 
                            </Button>

                            <Button size = "lg" block hidden={currentUser.role != "Gerente" && currentUser.role != "Administrador"}
                                    color="primary"
                                    onClick={() => this.props.history.push('/documentacion')}
                                > Configurar Documentación 
                            </Button>

                        </div>

                    </div>
                </container>
            );
    }
}

export { HomePage };