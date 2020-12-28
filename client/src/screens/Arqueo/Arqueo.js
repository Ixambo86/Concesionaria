import React, { Component } from "react";
import ok from "../../image/accept24.png";
import cancel from "../../image/cancel24.png";
import { authenticationService } from '../../_services/authentication.service';
import { arqueoService } from '../../_services/arqueo.services';

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "reactstrap";

class Arqueo extends Component {
    constructor(props){
        super(props)
        this.state = {
            sucursal_id: authenticationService.currentUserValue.sucursal,
            sucursal: '',
            total_ingresos: 0,
            total_egresos: 0,
            hoy: '',
            habilitar: false,
            mostrar: false,
            cargado: false
        };
    }

    componentDidMount() {
        this.hoy();
        this.buscarSucursal();
    }

    hoy = () => {
        let dia = new Date().toISOString();
        dia = dia.slice(0,10)
        this.setState({hoy: dia})
        this.buscarArqueo(dia)
    }

    buscarArqueo = (hoy) => {
        arqueoService.buscarArqueo(hoy, this.state.sucursal_id)
        .then(r => this.setState({cargado: r.length > 0}))
    }

    setHabilitar = () => {
        this.buscarArqueo(this.state.hoy);
        let now = new Date();
        let apartir = new Date(this.state.hoy + ' 19:40:00.000')
        let aux1 = now >= apartir
        this.setState({habilitar: this.rolAdmitido() && aux1 && !this.state.cargado})
    }

    buscarSucursal = () => {
        arqueoService.buscarSucursal(this.state.sucursal_id)
        .then((res) => {
            this.setState({sucursal: res[0].nombre})
        })
    }

    buscarIngreso = () => {
        arqueoService.buscarTotalIngresos(this.state.sucursal_id, this.state.hoy)
        .then((res) => {
            this.setState({total_ingresos: res[0].total ? res[0].total : 0})
        })
    }

    buscarEgreso = () => {
        arqueoService.buscarTotalEgresos(this.state.sucursal_id, this.state.hoy)
        .then((res) => {
            this.setState({total_egresos: res[0].total ? res[0].total : 0})
        })
    }

    calcular = () => {
        this.setHabilitar();
        this.buscarIngreso();
        this.buscarEgreso();
        this.setState({mostrar: true});
    }

    aceptar = () => {
        const data = {
            sucur_id: this.state.sucursal_id,
            ingreso: this.state.total_ingresos,
            egreso: this.state.total_egresos,
            fecha: this.state.hoy,
            estado: 'ACEPTADO',
            usuario_id: authenticationService.currentUserValue.id
        };
        arqueoService.guardarArqueo(data)
        this.setState({cargado: true, habilitar: false})
    }

    rechazar = () => {
        const data = {
            sucur_id: this.state.sucursal_id,
            ingreso: this.state.total_ingresos,
            egreso: this.state.total_egresos,
            fecha: this.state.hoy,
            estado: 'RECHAZADO',
            usuario_id: authenticationService.currentUserValue.id
        };
        arqueoService.guardarArqueo(data)
        this.setState({cargado: true, habilitar: false})
    }

    rolAdmitido = () => {
        return authenticationService.currentUserValue.role == "Gerente" || authenticationService.currentUserValue.role == "Supervisor de Ventas";
    }

    render() {
        return (
            <Container>
                <h2>Arqueo de caja de la sucursal {this.state.sucursal}</h2>
                <h3>{this.state.hoy}</h3>
                <Button color="primary" data-toggle="tooltip" data-placement="top" title="Calcular" onClick={() => this.calcular()}>Calcular</Button>
                <Form hidden={!this.state.mostrar}>
                    <label>Total de ingresos</label>
                    <h4>{this.state.total_ingresos.toLocaleString('es-AR', {style: "currency", currency: "ARS"})}</h4>
                    <label>Total de egresos</label>
                    <h4>{this.state.total_egresos.toLocaleString('es-AR', {style: "currency", currency: "ARS"})}</h4>
                    <label>Ganancia</label>
                    <h4>{(this.state.total_ingresos - this.state.total_egresos).toLocaleString('es-AR', {style: "currency", currency: "ARS"})}</h4>
                    <Button color="primary" data-toggle="tooltip" data-placement="top" title="Aceptar" disabled={!this.state.habilitar} onClick={() => this.aceptar()}><img src={ok} alt=''/></Button>
                    <Button color="danger" data-toggle="tooltip" data-placement="top" title="Rechazar" disabled={!this.state.habilitar} onClick={() => this.rechazar()}><img src={cancel} alt=''/></Button>
                </Form>
            </Container>
        )
    }

}
export { Arqueo }