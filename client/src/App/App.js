import React from 'react';
import { Router, Route, NavLink as ReactLink} from 'react-router-dom';
import { NavLink, Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, Container, UncontrolledButtonDropdown } from "reactstrap";

import { history } from '../_helpers/history';
import { Role } from '../_helpers/role'
import { authenticationService } from '../_services/authentication.service';
import { PrivateRoute } from '../_components/PrivateRoute';
import { HomePage } from '../screens/HomePage/HomePage';
import { GestionUsuarios } from '../screens/GestionUsuarios/GestionUsuarios';
import { Costumer } from '../screens/Costumer/Costumer';
import { Login } from '../screens/Login/Login';
import { Turnos } from '../screens/Turnos/Turnos';
import { OrdenTrabajo } from '../screens/OrdenTrabajo/OrdenTrabajo';
import { Automotor } from '../screens/Automotores/Automotores';
import { Proveedor } from '../screens/Proveedor/Proveedor';
import { Sucursal } from '../screens/Sucursal/Sucursal';
import { Producto } from '../screens/Producto/Producto';
import { Servicio } from '../screens/Servicio/Servicio';
import { Pedido } from '../screens/Pedido/Pedido';
import { Facturacion } from '../screens/Facturacion/Facturacion';
import { Documentacion } from '../screens/Documentacion/Documentacion';
import { Marca } from '../screens/Marca/Marca';
import { Modelo } from '../screens/Modelo/Modelo';
import { OrdenCompra } from '../screens/OrdenCompra/OrdenCompra';
import { Remito } from '../screens/Remito/Remito';
import { RecuPass } from '../screens/RecuPass/RecuPass';
import { Cliente } from '../screens/Cliente/Cliente';
import { Reportes } from '../screens/Reportes/Reportes';
import { Encuesta } from '../screens/Encuesta/Encuesta';
import { Arqueo } from '../screens/Arqueo/Arqueo';

import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";

import inicio from "../image/hogar.png";
import logout from "../image/logout.png";
import taller from "../image/herramienta.png";
import turnos from "../image/turno.png";
import orden_trabajo from "../image/ordendetrabajo.png";
import usuarios from "../image/usuario.png";
import compras from "../image/venta.png";
import orden_compra from "../image/ordendecompra.png";
import maestros from "../image/abm.png";
import automotores from "../image/automotor.png";
import sucursales from "../image/sucursal.png";
import proveedores from "../image/proveedor.png";
import productos from "../image/producto.png";
import servicios from "../image/servicios.png";
import marcas from "../image/marca.png";
import modelos from "../image/modelo.png";
import pedidos from "../image/pedido.png";
import facturacion from "../image/factura.png";
import remito from "../image/remito.png";
import documentacion from "../image/remito.png";
import clientes from "../image/cliente.png";
import administracion from "../image/administracion.png";
import mensaje from "../image/mensaje.png";
import reporte from "../image/reporte.png";




class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => {
            console.log(x)
            this.setState({
            currentUser: x,
            isAdmin: x && x.role.includes(Role.Admin) 
        })
      });
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    isValidUser(modulo){
        var rol = authenticationService.currentUserValue.role;
        switch (modulo) {

            case "usuarios":
                return rol != "Vendedor" && rol != "Mecanico";
 
            case "compras":
                return rol != "Vendedor" && rol != "Mecanico";
            
            case "remitos":
                return rol != "Vendedor" && rol != "Mecanico";

            case "automotores":
                return rol != "Mecanico";

            case "proveedores":
                return rol != "Mecanico";    

            case "productos":
                return rol != "Mecanico"; 

            case "servicios":
                return rol != "Mecanico";  

            case "marcas":
                return rol != "Mecanico";  

            case "modelos":
                return rol != "Mecanico";  
                                
            case "pedidos":
                return rol != "Mecanico"; 
             
            case "facturas":
                return rol != "Mecanico";    
            
            case "clientes":
                return rol != "Mecanico";    

            case "taller":
                return rol != "Vendedor" && rol != "Supervisor de ventas";   
            
            case "documentacion":
                return rol != "Mecanico" && rol != "Administrativo";   
            
            case "reportes":
                return rol == "Gerente" ;

            case "costumer":
                return rol == "Gerente" || rol == "Administrador";    
                
            case "administracion":
                return rol != "Mecanico" && rol != "Vendedor";

            case "encuesta":
                return rol == "Gerente" || rol == "Administrador";    
            
            case "arqueo":
                return rol == "Gerente" || rol == "Supervisor de ventas";   
                
            default:    
                return true;
    }
}

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            <Router history={history}>
                {currentUser &&
                    <Navbar className="menu" dark expand="md" >
                        <Nav className="mr-auto" pills >
                            <NavItem>
                                <NavLink tag={ReactLink} to="/" active ><img src={inicio} className = "menuNav" alt='Inicio'/> Inicio</NavLink>
                            </NavItem>
                            {this.isValidUser("administracion") && <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle caret color="primary"><img src={administracion} className = "menuNav" alt='Administracion'/> Administración</DropdownToggle>
                                    <DropdownMenu >
                                        {this.isValidUser("usuarios") && <DropdownItem tag={ReactLink} to="/gestion_usuarios" active><img src={usuarios} className = "menuNav" alt='Usuarios'/> Usuarios</DropdownItem>}
                                        {this.isValidUser("costumer") && <DropdownItem tag={ReactLink} to="/costumer" active><img src={mensaje} className = "menuNav" alt='Mensajes'/> C. Journey</DropdownItem>}
                                        {this.isValidUser("reportes") && <DropdownItem tag={ReactLink} to="/reportes" active><img src={reporte} className = "menuNav" alt='Reportes'/> Reportes</DropdownItem>}
                            
                                </DropdownMenu>
                            </UncontrolledDropdown>}
                    
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle caret color="primary"><img src={maestros} className = "menuNav" alt='Maestros'/> Maestros</DropdownToggle>
                                <DropdownMenu >
                                {this.isValidUser("automotores") && <DropdownItem tag={ReactLink} to="/automotor" active><img src={automotores} className = "menuNav" alt='Automotores'/> Automotores</DropdownItem>}
                                {this.isValidUser("clientes") && <DropdownItem tag={ReactLink} to="/cliente" active><img src={clientes} className = "menuNav" alt='Clientes'/> Clientes</DropdownItem>}
                                    <DropdownItem tag={ReactLink} to="/sucursal" active><img src={sucursales} className = "menuNav" alt='Sucursales'/> Sucursales</DropdownItem>
                                {this.isValidUser("proveedores") && <DropdownItem tag={ReactLink} to="/proveedor" active><img src={proveedores} className = "menuNav" alt='Proveedores'/> Proveedores</DropdownItem>}
                                {this.isValidUser("productos") && <DropdownItem tag={ReactLink} to="/producto" active><img src={productos} className = "menuNav" alt='Productos'/> Productos</DropdownItem>}
                                {this.isValidUser("servicios") && <DropdownItem tag={ReactLink} to="/servicio" active><img src={servicios} className = "menuNav" alt='Servicios'/> Servicios</DropdownItem>}
                                {this.isValidUser("marcas") && <DropdownItem tag={ReactLink} to="/marca" active><img src={marcas} className = "menuNav" alt='Marcas'/> Marcas</DropdownItem>}
                                {this.isValidUser("modelos") && <DropdownItem tag={ReactLink} to="/modelo" active><img src={modelos} className = "menuNav" alt='Modelos'/> Modelos</DropdownItem>}
                                {this.isValidUser("documentacion") && <DropdownItem tag={ReactLink} to="/documentacion" active><img src={documentacion} className = "menuNav" alt='Documentacion'/> Documentación</DropdownItem>}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            {this.isValidUser("taller") && <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle caret color="primary"><img src={taller} className = "menuNav" alt='Taller'/> Taller</DropdownToggle>
                                <DropdownMenu >
                                <DropdownItem tag={ReactLink} to="/turnos" active><img src={turnos} className = "menuNav" alt='Turnos'/> Turnos</DropdownItem>
                                <DropdownItem tag={ReactLink} to="/orden_trabajo" active><img src={orden_trabajo} className = "menuNav" alt='Ordenes de trabajo'/> Ordenes de Trabajo</DropdownItem>                                    
                                </DropdownMenu>
                            </UncontrolledDropdown>}
                            {this.isValidUser("pedidos") && <NavItem><NavLink tag={ReactLink} to="/pedidos" active><img src={pedidos} className = "menuNav" alt='Pedidos'/> Pedidos</NavLink></NavItem>}                           
                            
                            {this.isValidUser("facturas") && <UncontrolledDropdown nav inNavbar> 
                                <DropdownToggle caret color="primary"><img src={facturacion} className = "menuNav" alt='Facturas'/> Facturacion</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem tag={ReactLink} to="/facturacion" active><img src={facturacion} className = "menuNav" alt='Facturas'/> Facturas</DropdownItem>
                                    {this.isValidUser("arqueo") && <DropdownItem tag={ReactLink} to="/arqueo" active><img src={remito} className = "menuNav" alt='Remito'/> Arqueo</DropdownItem>}
                                </DropdownMenu>
                            </UncontrolledDropdown>}
                            
                            
                            {this.isValidUser("compras") && <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle caret color="primary"><img src={compras} className = "menuNav" alt='Compra'/> Compras</DropdownToggle>
                                <DropdownMenu >
                                    <DropdownItem tag={ReactLink} to="/ordenes_compra" active><img src={orden_compra} className = "menuNav" alt='Ordenes de Compra'/> Ordenes de Compra</DropdownItem>                                   
                                </DropdownMenu>
                            </UncontrolledDropdown>}
                            {this.isValidUser("remitos") && <NavItem><NavLink tag={ReactLink} to="/remito" active><img src={remito} className = "menuNav" alt='Remito'/> Remitos</NavLink></NavItem>}
                            <NavItem>
                                <NavLink tag={ReactLink} to="#" onClick={this.logout} active>Salir <img src={logout} className = "menuNav" alt='Salir'/></NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>   
                }
                
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute path="/gestion_usuarios" roles={[Role.Admin, Role.Gerente, Role.SupervisorVentas, Role.Administrativo_taller]} component={GestionUsuarios} />
                <PrivateRoute path="/costumer" roles={[Role.Admin, Role.Gerente, Role.SupervisorVentas, Role.Administrativo_taller]} component={Costumer} />
                <PrivateRoute path="/automotor" roles={[Role.Admin, Role.Vendedor, Role.Administrativo_taller, Role.SupervisorVentas, Role.Gerente]} component={Automotor} />
                <PrivateRoute path="/cliente" roles={[Role.Admin, Role.Gerente, Role.SupervisorVentas, Role.Administrativo_taller, Role.Vendedor]} component={Cliente} />
                <PrivateRoute path="/sucursal" roles={[Role.Admin, Role.Vendedor, Role.Administrativo_taller, Role.SupervisorVentas, Role.Gerente, Role.Mecanico]} component={Sucursal} />
                <PrivateRoute path="/proveedor" roles={[Role.Admin, Role.Vendedor, Role.Administrativo_taller, Role.SupervisorVentas, Role.Gerente]} component={Proveedor} />
                <PrivateRoute path="/producto" roles={[Role.Admin, Role.Vendedor, Role.Administrativo_taller, Role.SupervisorVentas, Role.Gerente]} component={Producto} />
                <PrivateRoute path="/servicio" roles={[Role.Admin, Role.Vendedor, Role.Administrativo_taller, Role.SupervisorVentas, Role.Gerente]} component={Servicio} />
                <PrivateRoute path="/marca"  roles={[Role.Admin, Role.Vendedor, Role.Administrativo_taller, Role.SupervisorVentas, Role.Gerente]}  component={Marca} />
                <PrivateRoute path="/modelo" roles={[Role.Admin, Role.Vendedor, Role.Administrativo_taller, Role.SupervisorVentas, Role.Gerente]} component={Modelo} />
                <PrivateRoute path="/orden_trabajo" roles={[Role.Admin, Role.Mecanico, Role.Administrativo_taller, Role.Gerente]} component={OrdenTrabajo} />
                <PrivateRoute path="/pedidos" roles={[Role.Admin, Role.Administrativo_taller,Role.SupervisorVentas, Role.Vendedor, Role.Gerente]} component={Pedido} />
                <PrivateRoute path="/turnos" roles={[Role.Admin, Role.Mecanico, Role.Administrativo_taller, Role.Gerente]} component={Turnos} />
                <PrivateRoute path="/facturacion" roles={[Role.Admin, Role.Vendedor, Role.Administrativo_taller, Role.SupervisorVentas, Role.Gerente]} component={Facturacion} />
                <PrivateRoute path="/ordenes_compra" roles={[Role.Admin, Role.Administrativo_taller, Role.SupervisorVentas, Role.Gerente]} component={OrdenCompra} />
                <PrivateRoute path="/remito" roles={[Role.Admin, Role.Administrativo_taller, Role.SupervisorVentas, Role.Gerente]} component={Remito} />
                <PrivateRoute path="/documentacion" roles={[Role.Admin, Role.SupervisorVentas, Role.Gerente, Role.Vendedor]} component={Documentacion} />
                <PrivateRoute path="/reportes" roles={[Role.Admin, Role.Gerente]} component={Reportes} />
                <PrivateRoute path="/arqueo" roles={[Role.SupervisorVentas, Role.Gerente]} component={Arqueo} />
                <Route path="/login" component={Login} />
                <Route path="/encuesta"  component={Encuesta} />
                <Route path="/recuperar_pass" component={RecuPass} />               
            </Router>
        );
    }
}

export { App };
