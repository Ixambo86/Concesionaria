import React, { Component } from "react";
import ok from "../../image/accept24.png"
import { authenticationService } from '../../_services/authentication.service';
import { turnoService } from '../../_services/turnos.services';
import { reporteService } from '../../_services/reportes.services';

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, FormGroup, Input } from "reactstrap";

class Reportes extends Component {

    state = {
        sucursales: [],
        form: {
            sucursal_id: authenticationService.currentUserValue.sucursal,
            fecha_desde: '',
            fecha_hasta: '',
        }
    };

    componentDidMount() {
        this.buscarSucursales();
        this.hoy();
    }

    hoy = () => {
        let dia = new Date().toISOString();
        dia = dia.slice(0,10)
        this.setState({
            form: {
                ...this.state.form,
                fecha_desde: dia,
                fecha_hasta: dia
            }
        })
    }
    buscarSucursales = () => {
        turnoService.buscarSucursales()
        .then((res) => {
            this.setState({sucursales: res})
        })
    }

    handleChange = (e) => {
        this.setState({
          form: {
            ...this.state.form,
            [e.target.name]: e.target.value
          }
        });
      };

    confirmar = (form) => {
        reporteService.balanceIngresosEgresos(form.sucursal_id, form.fecha_desde, form.fecha_hasta)
    }

    render() {
        return (
            <Container>
                <FormGroup inline>
                    <h3>Balance de ingresos/egresos</h3>
                    <label>Sucursal: *</label>
                    <Input name="sucursal_id" type="select" value={this.state.form.sucursal_id} onChange={this.handleChange}>
                        <option value="0" key='0'>Seleccionar sucursal</option>
                        {
                        this.state.sucursales.map(sucursal => {
                        return (<option value={sucursal.id} key={sucursal.id}>{sucursal.nombre}</option>)})
                        }
                    </Input>
                    <p id="sucursalid" > Seleccione una Sucursal </p>
                    <label>Desde: *</label>
                    <Input name="fecha_desde" value={this.state.form.fecha_desde} type="date" min="1980-01-01" max="2500-12-31"  onChange={this.handleChange}/>
                    <label>Hasta: *</label>
                    <Input name="fecha_hasta" value={this.state.form.fecha_hasta} type="date" min="1980-01-01" max="2500-12-31"  onChange={this.handleChange}/>
                </FormGroup>
                <p > (*) Campos Obligatorios </p>
                <Button  color="primary" data-toggle="tooltip" data-placement="top" title="Aceptar" onClick={() => this.confirmar(this.state.form)}><img src={ok} alt=''/></Button>
            </Container>
        )
    }

}
export { Reportes }