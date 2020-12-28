import React, { Component } from "react";
import { Busqueda } from '../../components/Busqueda/Busqueda';
import { TablaUser } from './TablaUsuarios';
import { userService } from "../../_services/user.services";
import { turnoService } from '../../_services/turnos.services';
import { authenticationService } from '../../_services/authentication.service';
import { validacionService } from "../../_services/validacion.services";

import add from "../../image/add24.png"
import ok from "../../image/accept24.png"
import cancel from "../../image/cancel24.png"

import "bootstrap/dist/css/bootstrap.min.css";
import "./Usuarios.css";
import { Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from "reactstrap";

class GestionUsuarios extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filtro: '',
      usuarios: [],
      roles: [],
      sucursales: [],
      formulario: '',
      mostrar: false,
      form: {
        dni: '',
        legajo: '',
        usuario: '',
        nombre: '',
        password: '',
        email: '',
        sucursal_id: authenticationService.currentUserValue.sucursal,
        estado: 'Activo',
        roles: []
      }
    };
  }
  
  componentDidMount() {
    this.buscar(this.state.filtro)
    this.buscarSucursales()
    this.buscarRoles()
  }

  buscar = (query) => {
    userService.getAll(query)
    .then(res => this.setState({usuarios: res}))
  }

  buscarSucursales = () => {
    turnoService.buscarSucursales()
    .then((res) => {
        this.setState({sucursales: res})
    })
  }

  buscarRoles = () => {
      userService.getRoles()
      .then((res) => {
          this.setState({roles :res})
      })
  }

  setRol = (e) => {
    let aux = this.state.form.roles
    const index = aux.indexOf(parseInt(e.target.value));
    if (index < 0) {
      aux.push(parseInt(e.target.value));
    } else {
      aux.splice(index, 1);
    }
    this.setState({
      form: {
      ...this.state.form,
      roles: aux
      }
    })
    e.target.checked = !e.target.checked;
  }

  borrarForm = () => {
    this.setState({
      formulario: '',
      form: {
        dni: '',
        legajo: '',
        usuario: '',
        nombre: '',
        password: '',
        email: '',
        sucursal_id: authenticationService.currentUserValue.sucursal,
        estado: 'Activo',
        roles: []
      }
    });
    this.setState({mostrar: !this.state.mostrar})
  }

  agregarUser = () => {

    //Validacion
    var camposValidos =  this.validar(this.state.form,false);
    
    if(camposValidos)
    {

      const datos = {
        dni: this.state.form.dni,
        username: this.state.form.usuario,
        password: this.state.form.password,
        nombre: this.state.form.nombre,
        email: this.state.form.email,
        sucursal: this.state.form.sucursal_id,
        estado: this.state.form.estado
      }
      userService.agregarUsuario(datos)
      .then((res) => userService.setRolesUsuario(res.insertId, this.state.form.roles))
      .then(() => this.borrarForm())
      .then(() => this.buscar(this.state.filtro))
      .catch((err) => console.log(err))
    } 
  }

  actualizarUser = () => {

    //Validacion
    var camposValidos =  this.validar(this.state.form,true);
    
    if(camposValidos)
    {
      const datos = {
        dni: this.state.form.dni,
        id: this.state.form.legajo,
        username: this.state.form.usuario,
        password: this.state.form.password,
        nombre: this.state.form.nombre,
        email: this.state.form.email,
        sucursal: this.state.form.sucursal_id,
        estado: this.state.form.estado
      }
      userService.actualizarUser(datos)
      .then(() => userService.deleteRolesUsuario(datos.id))
      .then(() => userService.setRolesUsuario(datos.id, this.state.form.roles))
      .then(() => this.borrarForm())
      .then(() => this.buscar(this.state.filtro))
      .catch((err) => console.log(err))
    }
  }

  editar = (user) => {
    userService.getById(user.id)
    .then((result) => {this.setState({form: {...result, roles: []}})})
    .then(() => userService.getRolesUsuario(this.state.form.legajo))
    .then((result2) => {
      let aux = [];
      result2.forEach(e => aux.push(e.rol_id));
      this.setState({form: {...this.state.form, roles: aux}})
      this.setState({mostrar: !this.state.mostrar ,formulario: 'edit'})
    })
  }

  eliminar = (user) => {
    var opcion = window.confirm("Esta Seguro que desea Eliminar el Usuario " + user.nombre);
    if (opcion === true) {
      userService.eliminarUser(user.id)
      .then(() => this.buscar(this.state.filtro))
    }
  }

  handleChange = (e) => {
    validacionService.validar(e.target,e.target.name,e.target.value);

    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
        
      }
    });
  };

  //Este metodo recibe el form con los valores de sus campos y un flag que le especifica si se ejecuta 
  //desde la ventana de edición (para no contemplar la Contraseña y el Dni)
  validar = (user,esEditar) => {

    var camposValidos = true;
    //Validacion de Inputs

    if(esEditar == false)
    {
      //Formato de DNI tipo 24321905 (entre 7 y 8 digitos)
      var regex_nro_dni = /^(\d{7,8})$/; 
      var nroDniValido = regex_nro_dni.test(user.dni)

      var alertaDni  = document.getElementById("dniid");
      if (!nroDniValido){
      alertaDni.style.display = "block";
      camposValidos = false;
    }
    else{
      alertaDni.style.display = "none";
    }
  }
  
  //Formato de Nombre del tipo Alberto Pinelli (entre 3 y 15 caracteres para nombre y apellido, separados por espacio o un nombre solo)
   var regex_nombre = /^([A-Za-z]{3,15}\s[A-Za-z]{3,15}|[A-Za-z]{3,15})$/; 
   var nombreValido = regex_nombre.test(user.nombre)

   var alertaNombre  = document.getElementById("nombreid");
   if (!nombreValido){
    alertaNombre.style.display = "block";
    camposValidos = false;
    alertaNombre.innerHTML = "";
    alertaNombre.textContent += " Nombre inválido (Ej: " + this.elegirUno() + ")";
  }
  else{
    alertaNombre.style.display = "none";
  }

  //Formato del Usuario del tipo AlberPinelli o Apinelli (sin espacios, hasta 15 caracteres)
   var regex_usuario = /^([A-Za-z]{3,15})$/; 
   var usuarioValido = regex_usuario.test(user.usuario)

   var alertaUsuario  = document.getElementById("usuarioid");
   if (!usuarioValido){
    alertaUsuario.style.display = "block";
    camposValidos = false;
  }
  else{
    alertaUsuario.style.display = "none";
  }
  
  
    //Formato de Contraseña (al menos 8 digitos sin espacios, de ellos al menos: 1 mayuscula, 1 minuscula y un numero)
    if(esEditar == false){
      var regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; 
      var passwordValida = regex_password.test(user.password); 

      console.log(user.password)
      var alertaPassword  = document.getElementById("passwordid");
      if (!passwordValida){
        alertaPassword.style.display = "block";
        camposValidos = false;
      }
      else{
        alertaPassword.style.display = "none";
      }
    }

   //Formato de Email del tipo usuario@gmail.com (con o sin .ar)
   var regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
   var emailValido = regex_email.test(user.email);

   var alertaEmail  = document.getElementById("emailid");
   if (!emailValido){
    alertaEmail.style.display = "block";
    camposValidos = false;
  }
  else{
    alertaEmail.style.display = "none";
  }

   //Validacion de ComboBox y CheckBox

   var alertaSucursal  = document.getElementById("sucursalid");
     if(user.sucursal_id == 0){
       alertaSucursal.style.display = "block";
       camposValidos = false;
     }
     else{
       alertaSucursal.style.display = "none";
     }

    var alertaRoles = document.getElementById("rolesid");
     if(user.roles == 0 || user.roles.length > 1){
      alertaRoles.style.display = "block";
      camposValidos = false;
     }
     else{
      alertaRoles.style.display = "none";
     }

     return camposValidos;
  }

  elegirUno = () =>
  {
    let integrantes = ["Alberto Pinelli","Andres Geiser","Daniel Carrillo","Gabriel Carrillo","Ezequiel Milanese","Maximiliano Chamarro"];
    var elegido = Math.floor(Math.random() * integrantes.length);
    return integrantes[elegido];
  }

  rolAdmitido(){
    var rol = authenticationService.currentUserValue.role;
    return rol == "Administrador" || rol == "Gerente";
 }

  render() {
    return (
      
      <Container >
        {/*Barra de busqueda*/}
        <Busqueda modulo="Usuarios" search={this.buscar} />
        <br />
        {/*Boton agregar usuario*/}
        {this.rolAdmitido()?
        <Form inline>
          <Button
            color="success"
            onClick={() => this.setState({mostrar: !this.state.mostrar, formulario: 'add'})}>
            <img src={add} alt=''/>
          </Button>
        </Form>
        :""}
        <br />

        {/*Tabla que muestra los usuarios*/}
        <TablaUser columnas={{legajo: 'Legajo', dni: 'DNI', usuario: 'Usuario', nombre: 'Nombre', email: 'Email', estado: 'Estado', sucursal: 'Sucursal'}}
          datos={this.state.usuarios} 
          editar={this.rolAdmitido()?this.editar:""} 
          eliminar={this.rolAdmitido()?this.eliminar:""} />
        <Modal isOpen={this.state.mostrar}>
          <ModalHeader>
            <div>{this.state.formulario === 'add' ? <h3>Alta de Usuario</h3> : (this.state.formulario === 'edit' ? <h3>Editar Usuario</h3> : '')}</div>
          </ModalHeader>

          <ModalBody>                                  
            <FormGroup inline>
              {this.state.formulario === 'edit' && <label>Legajo</label>}
              {this.state.formulario === 'edit' && <Input name="legajo" type="text" value={this.state.form.legajo} disabled='true'></Input>}
              <label>DNI: *</label>
              <Input name="dni" type="text" value={this.state.form.dni} disabled={this.state.formulario === 'edit' ? true : false} onChange={this.handleChange}></Input>
              <p id="dniid" > DNI inválido (Ej: 24321905) </p>
              <label>Nombre: *</label>
              <Input name="nombre" type="text" value={this.state.form.nombre} onChange={this.handleChange}></Input>
              <p id="nombreid" > Nombre inválido </p>
              <label>Usuario: *</label>
              <Input name="usuario" type="text" value={this.state.form.usuario} onChange={this.handleChange}></Input>
              <p id="usuarioid" > Usuario inválido (Ej: Apinelli)</p>
              {this.state.formulario === 'add' && <label>Password: *</label>}
              {this.state.formulario === 'add' && <Input name="password" type="password" value={this.state.form.password} onChange={this.handleChange}></Input>}
              <p id="passwordid" > Password inválida (Ej: Usuario123)</p>
              <label>Email: *</label>
              <Input name="email" type="text" value={this.state.form.email} onChange={this.handleChange}></Input>
              <p id="emailid" > Email inválido (Ej: usuario@autobot.com)</p>
              <label>Sucursal: *</label>
              <Input name="sucursal_id" type="select" value={this.state.form.sucursal_id} onChange={this.handleChange}>
                <option value="0" key='0'>Seleccionar sucursal</option>
                {
                  this.state.sucursales.map(sucursal => {
                  return (<option value={sucursal.id} key={sucursal.id}>{sucursal.nombre}</option>)})
                }
              </Input>
              <p id="sucursalid" > Seleccione una Sucursal </p>
              <label>Estado: *</label>
              <Input name="estado" type="select" value={this.state.form.estado} onChange={this.handleChange}>
                <option value="Activo" key='Activo'>Activo</option>
                <option value="Bloqueado" key='Bloqueado'>Bloqueado</option>
                <option value="Eliminado" key='Eliminado'>Eliminado</option>
              </Input>
              <br/>
              <label>Rol: *</label>
              <br/>
              {
                this.state.roles.map(rol => {
                  return (
                    <FormGroup check inline>
                      <Label >
                        <Input type="checkbox" name='roles' class = "radioCheck" value={rol.id} key={rol.id} checked={this.state.form.roles.includes(rol.id)} onChange={this.setRol}/>{' '}{rol.descripcion}{' '}
                      </Label>
                    </FormGroup>
                  )
                })
              }
              <p id="rolesid" > Seleccione un Rol</p>
            </FormGroup>
            <p > (*) Campos Obligatorios </p>
          </ModalBody>
    
          <ModalFooter>
            <Button color="primary" onClick={this.state.formulario === 'add' ? this.agregarUser : this.actualizarUser}><img src={ok} alt=''/></Button>
            <Button color="danger" onClick={this.borrarForm}><img src={cancel} alt=''/></Button>
          </ModalFooter>
        </Modal>
  
      </Container>
    )
  }
}

export {GestionUsuarios}


/*



*/