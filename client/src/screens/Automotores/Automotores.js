import React, { Component } from "react";
import { Busqueda } from '../../components/Busqueda/Busqueda'
import { Tabla } from '../../components/Tabla'
import { automotorService } from '../../_services/automotores.services'
import { validacionService } from '../../_services/validacion.services'
import add from "../../image/add24.png"
import { marcaService } from '../../_services/marcas.services';
import { modeloService } from '../../_services/modelos.services';
import { pedidosService } from '../../_services/pedidos.services';
import add16 from "../../image/add16.png"
import ok from "../../image/accept24.png"
import cancel from "../../image/cancel24.png"
import ok16 from "../../image/accept16.png"

import cancel16 from "../../image/cancel16.png"
import ayuda from '../../image/informacion.png'
import { FormDescripcion } from "../../components/FormDescripcion";
import "./automotor.css";
import { authenticationService } from '../../_services/authentication.service';

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar,Container, Col, Popover, UncontrolledPopover,PopoverHeader, PopoverBody, Label, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Input, Form, InputGroup, InputGroupAddon, Row } from "reactstrap";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

class Automotor extends Component {

  state = {
    modulo: "",
    filtro: "",
    formulario: "",
    marcas: [],
    automotores: [],
    formulario: "",
    mostrarForm: false,
    mostrarFormNuevoCol: false,
    mostrarAlerta: false,
    mostrarComboMarcas: false,
    mostrarFormAutomotores: false,
    mostrarAño: false,
    mostrarFormDescripcion: false,
    form: {
      anio: 0,
      origen: "",
      //carroceria: "",
      nuevoColor: "",
      //carroceria_id: 0,
      cilindrada: "",
      color: "",
      color_id: 0,
      plazo_entrega_0km: 0,
      costo: 0,
      dominio: "",
      hp: 0,
      id: 0,
      km: 0,
      img: "",
      nuevo: 0,
      marca: "",
      marca_id: 0,
      modelo: "",
      modelo_id: 0,
      nro_chasis: "",
      nro_motor: "",
      plazo_entrega_0km: 0,
      precio: 0,
      puertas: 0,
      tipo_motor: "",
      tipo_motor_id: 0,
      turbo: "",
      version: "",
      sucursal_id: 0,
      sucursal: "",
      version_config_id: 0,
      version_id: 0,
      pedido_id: 0
    },
    form_combo: {
      marcas: [],
      modelos: [],
      versiones: [],
      //carrocerias: [],
      puertas: [2, 3, 4, 5],
      tipos_motores: [],
      sucursales: [],
      transmisiones: [],
      colores: [],
      nro_motor: [],
      costo: [],
      nro_chasis: [],
      turbos: ["SI", "NO"],
      anios: [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010],
      origens: ["Nacional", "Importado"],
      pedidos: []
    },


  };
  cerrarFormDescripcion = () => {
    this.setState({ formularioTitulo: "", mostrarComboMarcas: false, });

  }
  componentDidMount() { // se ejecuta al inicio
    this.buscar(this.state.filtro);

  }

  mostrarFormNuevoColor = () => {
    this.setState({ mostrarFormNuevoCol: true });
  }

  buscar = query => {
    automotorService.buscarAutomotores(query, null)
      .then((res) => {

        this.setState({ automotores: res, filtro: query })

      });
  }

  buscarMarcas = query => {
    automotorService.buscarMarca(query)
      .then((res) => {

        this.setState({
          form_combo: {
            ...this.state.form_combo,
            marcas: res
          }
        })
      });
  }

  buscarModelos = query => {
    automotorService.buscarModelos(query)
      .then((res) => {

        this.setState({
          form_combo: {
            ...this.state.form_combo,
            modelos: res
          }
        })
      });
  }

  buscarVersiones = query => {
    automotorService.buscarVersiones(query)
      .then((res) => {
        //console.log(res)
        this.setState({
          form_combo: {
            ...this.state.form_combo,
            versiones: res
          }
        })
      });
  }


  buscarTipoMotor = () => {
    automotorService.buscarTipoMotor()
      .then((res) => {
        //console.log(res)
        this.setState({
          form_combo: {
            ...this.state.form_combo,
            tipos_motores: res
          }
        })
      });
  }

  buscarSucursales = () => {
    automotorService.buscarSucursales()
      .then((res) => {
        this.setState({
          form_combo: {
            ...this.state.form_combo,
            sucursales: res
          }
        })
      });
  }

  buscarColor = () => {
    automotorService.buscarColor()
      .then((res) => {
        //console.log(res)
        this.setState({
          form_combo: {
            ...this.state.form_combo,
            colores: res
          }
        })
      });
  }

  buscarPedidosSinAutomotor = (version_config_id) => {
    pedidosService.obtenerPedidosSinAutomotor(version_config_id)
      .then((res) => {
        //console.log(res)
        this.setState({
          form_combo: {
            ...this.state.form_combo,
            pedidos: res
          }
        })
      });
  }

  inicializarForm = () => {
    this.setState({
      form: {
        anio: 2021,
        origen: "Nacional",
        //carroceria: "",
        //carroceria_id: 0,
        cilindrada: "",
        color: "",
        color_id: 0,
        costo: 0,
        dominio: "",
        hp: 0,
        id: 0,
        km: 0,
        img: "",
        nuevoColor: "",
        marca: "",
        marca_id: 0,
        modelo: "",
        modelo_id: 0,
        marca: "",
        nro_chasis: "",
        nro_motor: "",
        plazo_entrega_0km: 0,
        nuevo: 0,
        plazo_entrega_0km: 0,
        precio: 0,
        puertas: 0,
        tipo_motor: "",
        tipo_motor_id: 0,
        turbo: "",
        version: "",
        version_config_id: 0,
        version_id: 0,
        mostrarComboMarcas: false,

      }
    })
  }

  mostrarForm = (automotor) => {

    let formulario = "";

    this.buscarMarcas();

    if (automotor.id !== 0) {
      this.buscarModelos(automotor.marca_id);
      this.buscarVersiones(automotor.modelo_id);
      formulario = "Modificar Automotor " + automotor.id;
    }
    else {
      formulario = "Nueva Versión / Automotor ";
      this.inicializarForm();
    }

    this.buscarModelos(automotor.marca_id);
    this.buscarVersiones(automotor.modelo_id);
    this.buscarTipoMotor();
    this.buscarSucursales();
    this.buscarColor();
    //this.buscarCarrocerias();
    this.setState({
      formulario: formulario, mostrarForm: true, form: automotor, mostrarFormAutomotores: false
    });
  };

  cerrarForm = () => {
    this.setState({ mostrarForm: false });
    this.setState({ form: { ...this.state.form, nuevoColor: "" } })
    this.setState({
      mostrarFormNuevoCol: false, mostrarFormAutomotores: false,
      mostrarAño: false,
    });
  };
  cerrarFormEditar = () => {
    this.setState({ mostrarFormEditar: false });
    this.setState({ form: { ...this.state.form, nuevoColor: "" } })
    this.setState({
      mostrarFormNuevoCol: false, mostrarFormAutomotores: false,
      mostrarAño: false,
    });
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  confirmar = () => {

    if (this.state.mostrarFormNuevoCol) {
      this.InsertarNuevoColor(this.state.form, this.state.form.nuevoColor);
    }
    else {
      this.ObtenerVersionConfigId(this.state.form);
    }


    this.setState({ form: { ...this.state.form, nuevoColor: "" } })
    this.setState({ mostrarFormNuevoCol: false });
    this.cerrarForm();
  }




  ObtenerVersionConfigId = (automotor) => {


    automotorService.ObtenerVersionConfigId(automotor)
      .then((res) => {
        if (res.length !== 0) {

          automotor.version_config_id = res[0].id;



          if (this.state.form.id === 0) {

            if (!this.state.mostrarFormAutomotores) {
              this.insertar(this.state.form, automotor.version_config_id)

            }
          }
          else {
            this.editarAutomotor(this.state.form, automotor.version_config_id);


          }
        }
        else {
          this.insertarVersionConfig(automotor);
        }

      });
  }


  insertarVersionConfig = (automotor) => {

    automotorService.insertarVersionConfig(automotor, authenticationService.currentUserValue.id)
      .then((res) => {
        automotor.version_config_id = res.insertId;

        if (this.state.mostrarFormNuevoCol) {
          this.InsertarNuevoColor(this.state.form, this.state.form.nuevoColor);
        }

        else {
          if (this.state.form.id === 0) {

            if (!this.state.mostrarFormAutomotores) {

              this.insertar(this.state.form, automotor.version_config_id)

            }
          }
          else {
            this.editarAutomotor(this.state.form, automotor.version_config_id);

          }
        }

      });
  }

  insertar = (automotor, version_config_id) => {

    automotorService.insertarAutomotor(automotor, version_config_id, authenticationService.currentUserValue.id)
      .then((res) => {
        console.log(res)
        if (automotor.pedido_id > 0){
          pedidosService.asignarAutomotorPedido(res.insertId, automotor.pedido_id)
        }
        this.setState({ mostrarForm: false })
        this.buscar(this.state.filtro);

      });

  }

  editarAutomotor = (automotor, version_config_id) => {

    automotorService.editarAutomotor(automotor, version_config_id)
      .then(() => {
        this.cerrarFormEditar();
        this.setState({ automotores: [] });
        this.buscar(this.state.filtro);
      });

  }



  eliminar = (automotor) => {

    var opcion = window.confirm("Estás Seguro que deseas Eliminar el " + automotor.marca + " " + automotor.modelo + " " + automotor.version + " [" + automotor.dominio + "]");
    if (opcion === true) {
      automotorService.eliminarAutomotor(automotor.id)
        .then(() => {
          this.setState({ automotores: [] });
          this.buscar(this.state.filtro);
        });


    }
  }

  nuevaMarca = () => {
    this.setState({ mostrarFormDescripcion: true, formularioTitulo: "Nueva Marca" })
  };

  insertarMarca = () => {
    this.setState({ mostrarComboMarcas: false })

    if(this.validarDescripcion(this.state.form.descripcion)){
      marcaService.insertarMarca(authenticationService.currentUserValue.id, this.state.form.descripcion)
        .then((res) => {
          this.cerrarFormDescripcion();
          this.setState({
            form: { ...this.state.form, marca_id: res.insertId }
          })
          this.buscarMarcas();
        });
        this.state.form.descripcion = "";
        this.validarNuevoIngresado(this.state.form.marca_id,"marcaid");
    }
  }

  nuevoModelo = () => {
    console.log("nuevoModelo");
    this.setState({ mostrarFormDescripcion: true, formularioTitulo: "Nuevo Modelo" })
  };

  insertarModelo = () => {
    if(this.validarDescripcion(this.state.form.descripcion)){
      modeloService.insertarModelo(authenticationService.currentUserValue.id, this.state.form.descripcion, this.state.form.marca_id)
        .then((res) => {
          this.cerrarFormDescripcion();
          this.setState({
            form: { ...this.state.form, modelo_id: res.insertId }
          })
          this.buscarModelos(this.state.form.marca_id);
        });
        this.state.form.descripcion = "";
        this.validarNuevoIngresado(this.state.form.modelo_id,"modeloid");
    }    
  }

  nuevaVersion = () => {
    console.log("nuevoVersion");
    this.setState({ mostrarFormDescripcion: true, formularioTitulo: "Nueva Version" })
  };



  insertarVersion = () => {
    if(this.validarDescripcion(this.state.form.descripcion)){
      automotorService.insertarVersion(authenticationService.currentUserValue.id, this.state.form.descripcion, this.state.form.modelo_id)
        .then((res) => {
          console.log("version")
          console.log(res)
          this.cerrarFormDescripcion();
          this.setState({
            form: { ...this.state.form, version_id: res.insertId }
          })
          this.buscarVersiones(this.state.form.modelo_id);
        });
        this.state.form.descripcion = "";
        this.validarNuevoIngresado(this.state.form.version_id,"versionid");
    }    
  }

  nuevoColor = () => {
    this.setState({ mostrarFormDescripcion: true, formularioTitulo: "Nuevo Color" })
  };

  insertarColor = () => {
    if(this.validarDescripcion(this.state.form.descripcion)){
      automotorService.InsertarNuevoColor(this.state.form.descripcion)
        .then((res) => {

          this.cerrarFormDescripcion();
          this.setState({
            form: { ...this.state.form, color_id: res.insertId }
          })
          this.buscarColor();
        });
        this.state.form.descripcion = "";
        this.validarNuevoIngresado(this.state.form.color_id,"colorid");
    }    
  }

  validarDescripcion = (descripcion) =>{
        
    var camposValidos = true;
    var regex_descripcion = /^(?!\s*$).+/;
    var descripcionValida = regex_descripcion.test(descripcion);

    var alertaDescripcion = document.getElementById("descripcionid");
    if (!descripcionValida || descripcion == undefined) {
        alertaDescripcion.style.display = "block";
        camposValidos = false; 
    }
    else {
        alertaDescripcion.style.display = "none";        
    }

    return camposValidos;
  }

  validarNuevoIngresado = (campo, alerta) => {
    var alerta = document.getElementById(alerta);
    if (campo != -1 ) {
        alerta.style.display = "block";
    }
    else {
        alerta.style.display = "none";
    }

}

/*
  InsertarNuevoColor = (automotor, color) => {
    console.log("Insertar Nuevo Color")
    automotorService.InsertarNuevoColor(color)
      .then((res) => {

        let id = res.insertId;
        this.setState({
          form: { ...this.state.form, color_id: id }
        })
        console.log("this.state.form.color_id")
        console.log(this.state.form.color_id)
        this.ObtenerVersionConfigId(this.state.form);
      });
    this.setState({ mostrarFormNuevoCol: false });
  }*/

  handleChange = (e) => {

    console.log(e.target.name + ' [' + e.target.value + '] ')
    validacionService.validar(e.target,e.target.name,e.target.value);

    if (e.target.name === "marca_id") {

      if (e.target.value === "-1") {
        this.nuevaMarca();
      } else {
        this.buscarModelos(e.target.value)
      }

    }

    if (e.target.name === "modelo_id") {
      console.log("modelo_id")
      if (e.target.value === "-1") {
        console.log("-1");
        this.nuevoModelo();
      } else {
        this.buscarVersiones(e.target.value)
      }
    }

    if (e.target.name === "version_id") {
      if (e.target.value === "-1") {
        this.nuevaVersion();
      }
    }

    
    if (e.target.name === "color_id") {
      if (e.target.value === "-1") {
        this.nuevoColor();
      }
    }

    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });


  };

  AutomotorEnSucursal = () => {
    if (this.state.mostrarFormAutomotores === false) {
      this.setState({ mostrarFormAutomotores: true });
      automotorService.ObtenerVersionConfigId(this.state.form)
      .then(res =>{
        if (res.length > 0 && res[0].id > 0)
          this.buscarPedidosSinAutomotor(res[0].id)
      })
    }
    else {
      this.setState({ mostrarFormAutomotores: false });
    }

  };

  AutomotorOkm = () => {

    if (this.state.mostrarAño === false) {
      this.setState({ mostrarAño: true });
      this.setState({
        form: {
          ...this.state.form,
          ["nuevo"]: 1
        }
      });
    }
    else {
      this.setState({ mostrarAño: false });
      this.setState({
        form: {
          ...this.state.form,
          ["nuevo"]: 0
        }
      });
    }


  };

  encodeImageFileAsURL = () => {
    var srcData = "";

    const fileUpload = (document.getElementById('inputFileToLoad'));
    var filesSelected = fileUpload.files;

    const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg)$/;

    //if (regex.test(fileUpload.value.toLowerCase())) {
      if (filesSelected.length > 0) {

        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = (fileLoadedEvent) => {
          var srcData = fileLoadedEvent.target.result; // <--- data: base64
          console.log(srcData)

          this.setState({
            form: {
              ...this.state.form,
              img: srcData
            }
          });

        }
        fileReader.readAsDataURL(fileToLoad);
      }
    //} else {
     // fileUpload.onchange = () => {
       // alert("Por favor, ingrese un archivo png o jpg válido")
     // }
    //}
  }

  //TESTING-VALIDACIONES
  validar = (automotor) => {
    
    var automotorValido = true;
    var nuevaVersionValida = true;

    if(this.state.mostrarFormAutomotores)
    {
      automotorValido = this.validarObligatorios(automotor) && this.validarOpcionales(automotor);
    }
    else{
      nuevaVersionValida = this.validarNuevaVersion(automotor);
    }

    if (automotorValido && nuevaVersionValida) {
      this.confirmar()
    }

  };


  validarNuevaVersion = (automotor) => {
    var camposValidos = true;

    var alertaMarca = document.getElementById("marcaid");
    if (automotor.marca_id == 0) {
      alertaMarca.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaMarca.style.display = "none";
    }

    var alertaModelo = document.getElementById("modeloid");
    if (automotor.modelo_id == 0) {
      alertaModelo.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaModelo.style.display = "none";
    }

    var alertaVersion = document.getElementById("versionid");
    if (automotor.version_id == 0) {
      alertaVersion.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaVersion.style.display = "none";
    }

    var alertaTipomotor = document.getElementById("tipomotorid")
    if (automotor.tipo_motor_id == 0) {
      alertaTipomotor.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaTipomotor.style.display = "none";
    }

    var alertaColor = document.getElementById("colorid");
    if (automotor.color_id == 0) {
      alertaColor.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaColor.style.display = "none";
    }

    var alertaCosto = document.getElementById("costoid");
    var regex_costo = /^\d{1,9}$/;
    var nroCosto = regex_costo.test(automotor.costo)

    if (!nroCosto) {
      alertaCosto.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaCosto.style.display = "none";
    }

    var alertaPlazo = document.getElementById("plazoid");
    var regex_plazo = /^\d{1,3}$/;
    var nroPlazo = regex_plazo.test(automotor.plazo_entrega_0km)

    if (!nroPlazo) {
      alertaPlazo.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaPlazo.style.display = "none";
    }

    var alertaPrecio = document.getElementById("precioid");
    var regex_precio = /^\d{1,9}$/;
    var nroPrecio = regex_precio.test(automotor.precio)

    if (!nroPrecio) {
      alertaPrecio.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaPrecio.style.display = "none";
    }


    return camposValidos;
  }

  validarObligatorios = (automotor) => {

    //VALIDACIONES COMBOBOX

    var camposValidos = true;

    var alertaMarca = document.getElementById("marcaid");
    if (automotor.marca_id == 0) {
      alertaMarca.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaMarca.style.display = "none";
    }

    var alertaColor = document.getElementById("colorid");
    if (automotor.color_id == 0) {
      alertaColor.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaColor.style.display = "none";
    }

    var alertaSucursal = document.getElementById("sucursalid")
    if (automotor.sucursal_id == 0){
       alertaSucursal.style.display = "block";
       camposValidos = false;
    }
    else {
      alertaSucursal.style.display = "none";
    }

    var alertaModelo = document.getElementById("modeloid");
    if (automotor.modelo_id == 0) {
      alertaModelo.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaModelo.style.display = "none";
    }

    var alertaVersion = document.getElementById("versionid");
    if (automotor.version_id == 0) {
      alertaVersion.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaVersion.style.display = "none";
    }

    var alertaTipomotor = document.getElementById("tipomotorid")
    if (automotor.tipo_motor_id == 0) {
      alertaTipomotor.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaTipomotor.style.display = "none";
    }

    //VALIDACION INPUT

    //Formato de patente del tipo ABC123 o AA123EE
    var regex_nro_patente = /(^(\w{3}\d{3})$)|(^(\w{2}\d{3}\w{2})$)/;
    var nroPatenteValido = regex_nro_patente.test(automotor.dominio)

    var alertaPatente = document.getElementById("dominioid");
    if (!nroPatenteValido) {
      alertaPatente.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaPatente.style.display = "none";
    }

    return camposValidos;

  }


  validarOpcionales = (automotor) => {
    //Validaciones Input
    var camposValidos = true;

    //Formato de nro de Motor del tipo AA-012345-AA
    var alertaNroMotor = document.getElementById("nromotorid");
    var regex_nro_motor = /^(([A-Za-z]{2,3}-[0123456789]{4,6}-[A-Za-z]{2,3})|0)$/;
    var nroMotorValido = regex_nro_motor.test(automotor.nro_motor)

    if (!nroMotorValido) {
      alertaNroMotor.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaNroMotor.style.diplay = "none";
    }

    //Formato de nro de Chasis del tipo 8ABC012345678993
    var alertaNroChasis = document.getElementById("nrochasisid");
    var regex_nro_chasis = /^((8[AE][A-Za-z]{2}[0123456789]{10,17})|0)$/;
    var nroChasisValido = regex_nro_chasis.test(automotor.nro_chasis)

    if (!nroChasisValido) {
      alertaNroChasis.style.display = "block";
      camposValidos = false;
    } else {
      alertaNroChasis.style.display = "none";
    }

    //Formato de kilometraje de 0 hasta 9.999.999
    var alertaKilometraje = document.getElementById("kmid");
    var regex_kilometraje = /^(\d{1,7})$/;
    var nroKilometraje = regex_kilometraje.test(automotor.km)

    if (!nroKilometraje) {
      alertaKilometraje.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaKilometraje.style.display = "none";
    }

    //Formato de Costo de 0 hasta 999.999.999
    var alertaCosto = document.getElementById("costoid");
    var regex_costo = /^\d{1,9}$/;
    var nroCosto = regex_costo.test(automotor.costo)

    if (!nroCosto) {
      alertaCosto.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaCosto.style.display = "none";
    }

    //Formato de Plazo de 0 hasta 999
    var alertaPlazo = document.getElementById("plazoid");
    var regex_plazo = /^\d{1,3}$/;
    var nroPlazo = regex_plazo.test(automotor.plazo_entrega_0km)

    if (!nroPlazo) {
      alertaPlazo.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaPlazo.style.display = "none";
    }

    //Formato de Precio de 0 hasta 999.999.999
    var alertaPrecio = document.getElementById("precioid");
    var regex_precio = /^\d{1,9}$/;
    var nroPrecio = regex_precio.test(automotor.precio)

    if (!nroPrecio) {
      alertaPrecio.style.display = "block";
      camposValidos = false;
    }
    else {
      alertaPrecio.style.display = "none";
    }


    return camposValidos;
  }

  rolAdmitido() {
    var rol = authenticationService.currentUserValue.role;
    return rol == "Administrador" || rol == "Supervisor de ventas" || rol == "Gerente";
  }

  render() {
    const automotores = this.state.automotores;
 
    return (
      <>
        <Container hidden={this.state.formularioTitulo !== "Nueva Marca"}>
          <FormDescripcion
            visible={this.state.formularioTitulo === "Nueva Marca"}
            titulo={this.state.formularioTitulo}
            confirmar={this.insertarMarca}
            handleChange={this.handleChange}
            cerrar={this.cerrarFormDescripcion}
            descripcion={this.state.form.marca}
          >
          </FormDescripcion>
        </Container>

        <Container hidden={this.state.formularioTitulo !== "Nuevo Modelo"}>
          <FormDescripcion
            visible={this.state.formularioTitulo === "Nuevo Modelo"}
            titulo={this.state.formularioTitulo}
            confirmar={this.insertarModelo}
            handleChange={this.handleChange}
            cerrar={this.cerrarFormDescripcion}
            descripcion={this.state.form.modelo}
          >
          </FormDescripcion>
        </Container>

        <Container hidden={this.state.formularioTitulo !== "Nueva Version"}>
          <FormDescripcion
            visible={this.state.formularioTitulo === "Nueva Version"}
            titulo={this.state.formularioTitulo}
            confirmar={this.insertarVersion}
            handleChange={this.handleChange}
            cerrar={this.cerrarFormDescripcion}
            descripcion={this.state.form.version}
          >
          </FormDescripcion>
        </Container>

        <Container hidden={this.state.formularioTitulo !== "Nuevo Color"}>
          <FormDescripcion
            visible={this.state.formularioTitulo === "Nuevo Color"}
            titulo={this.state.formularioTitulo}
            confirmar={this.insertarColor}
            handleChange={this.handleChange}
            cerrar={this.cerrarFormDescripcion}
            descripcion={this.state.form.color}
          >
          </FormDescripcion>
        </Container>

        <Container hidden={this.props.visible}>
          {/*Ayuda */}
        
             
                  {/*Barra de busqueda*/}
          <Busqueda modulo="Automotores" search={this.buscar}  />
          
   
        

          <br/>
          {/*Boton agregar automotor*/}
          {this.rolAdmitido() ?
            <Form inline>
              <Button
                color="success"
                onClick={() => this.mostrarForm({
                  id: 0,
                  version_config_id: 0,
                  marca_id: 0,
                  version_id: 0,
                  //carroceria_id: 0,
                  modelo_id: 0,
                  tipo_motor_id: 0,
                  color_id: 0,
                  anio: 2021,
                  origen: "Nacional",
                  nro_motor: 0,
                  nro_chasis: 0,
                  img: "",
                  dominio: 0,
                  nuevoColor: "",
                  nuevo: 0,
                  km: 0,
                  cilindrada: "",
                  sucursal_id: 0,
                  plazo_entrega_0km: 0,
                  cliente_id: 0,
                  costo: 0,
                  precio: 0,
                  turbo: 0,
                  hp: 0,

                }, "Nuevo")}
              >
                <Form inline>
                  <img src={add} />
                </Form>
              </Button>
            </Form>
            : ""}
          <br />

          {/*Tabla que muestra los automotores*/}
          <Tabla columnas={{ marca: "Marca", modelo: "Modelo", version: "Versión", tipo_motor: "Motor", anio: "Año", dominio: "Patente", km: "KM", costo: "Costo", precio: "Precio", nro_motor: "Nro_motor", nro_chasis: "Nro_Chasis", origen: "Origen" }}
            datos={this.state.automotores}
            editar={this.rolAdmitido() ? this.mostrarForm : ""}
            eliminar={this.rolAdmitido() ? this.eliminar : ""} />

        </Container>


        <Modal size="xl" isOpen={this.state.mostrarForm}>

          <ModalHeader size="xl">

            <div><h3>{this.state.formulario}</h3></div>

          </ModalHeader>

          <ModalBody>


            <hr />
            <div><h4>Versión   <Button id="PopoverLegacy" type="right" color="white"> 
                     <img src={ayuda} className = "menu_ayuda" alt='ayuda'/> 
              </Button>
              <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy">
                    <PopoverHeader>Agregar Nuevo Versión</PopoverHeader>
                    <PopoverBody> Permite agregar nuevas versiones de automotores.</PopoverBody>
                    <PopoverBody> En el caso de no existir la opción deseada <b>(Marca, Modelo, Versión y Motor)</b> se podrán crear
                                  ingresando al menú correspondiente a través de la opción <b>Agregar Nuevo.</b> 
                    </PopoverBody>
                   </UncontrolledPopover></h4></div>
            <hr />
            <Row> <Col>
              <Container hidden={this.state.mostrarComboMarcas}>
                <FormGroup inline >
                  <label>
                    Marca: *
              </label>
                  <InputGroup >
                    <Input

                      placeholder="Nueva marca"
                      name="marca_id"
                      type="select"
                      value={this.state.form.marca_id}
                      onChange={this.handleChange}
                    >
                      <option value="0">Seleccionar Nueva Marca</option>
                      {
                        this.state.form_combo.marcas.map(marca => {
                          return (
                            <option value={marca.id} selected={this.state.form.marca === marca.descripcion} >{marca.descripcion}</option>
                          )
                        })
                      }
                      <option value="-1"> (+) Agregar Nueva Marca</option>
                    </Input>



                  </InputGroup>
                  <p id="marcaid" > (+) Seleccione una Marca </p >

                </FormGroup>
              </Container>

            </Col>
              <Col>
                <FormGroup>
                  <label>
                    Modelo: *
              </label>

                  <Input
                    name="modelo_id"
                    type="select"
                    value={this.state.form.modelo_id}
                    onChange={this.handleChange}
                  >
                    <option value="0">Seleccionar Nuevo Modelo</option>
                    {
                      this.state.form_combo.modelos.map(modelo => {
                        return (
                          <option value={modelo.id} selected={this.state.form.modelo === modelo.descripcion}>{modelo.descripcion}</option>
                        )
                      })
                    }
                    <option value="-1"> (+) Agregar Nuevo Modelo</option>

                  </Input>
                  <p id="modeloid" > (+) Seleccione un Modelo </p >


                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label>
                    Versión: *
              </label>

                  <Input
                    name="version_id"
                    type="select"
                    value={this.state.form.version_id}
                    onChange={this.handleChange}
                  >
                    <option value="0">Seleccionar Nueva Versión</option>
                    {
                      this.state.form_combo.versiones.map(version => {
                        return (
                          <option value={version.id} selected={this.state.form.version === version.descripcion}>{version.descripcion}</option>
                        )
                      })
                    }
                    <option value="-1">(+) Agregar Nueva Versión</option>
                  </Input>
                  <p id="versionid" > (+) Seleccione una Version </p >

                </FormGroup>
              </Col>
            </Row>

            <Row>

              <Col>

                <label>
                  Tipo Motor: *
              </label>
                <Input
                  name="tipo_motor_id"
                  type="select"
                  value={this.state.form.tipo_motor_id}
                  onChange={this.handleChange}
                >
                  <option value="0">Seleccionar un Tipo Motor</option>
                  {
                    this.state.form_combo.tipos_motores.map(tipo_motor => {
                      return (
                        <option value={tipo_motor.id} selected={this.state.form.tipo_motor === tipo_motor.descripcion}>{tipo_motor.descripcion}</option>
                      )
                    })
                  }
                </Input>
                <p id="tipomotorid" > Seleccione un tipo de Motor </p >

              </Col>

              <Col>
                <label>
                  Color: *
                </label>

                <Input
                  name="color_id"
                  type="select"
                  value={this.state.form.color_id}
                  onChange={this.handleChange}
                  disabled={this.state.mostrarFormNuevoCol}
                >
                  <option value="0">Seleccionar Nuevo Color</option>
                  {
                    this.state.form_combo.colores.map(color => {
                      return (
                        <option value={color.id} selected={this.state.form.color === color.descripcion}>{color.descripcion}</option>
                      )
                    })
                  }
                  <option value="-1">(+) Agregar Nuevo Color</option>
                </Input>

                <p id="colorid" > (+) Seleccione un Color </p >

              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <label>
                    Costo:
              </label>
                  <input
                    className="form-control"
                    name="costo"
                    type="number"
                    value={this.state.form.costo}
                    onChange={this.handleChange}
                    placeholder="Ingrese el Costo"
                  />
                  <p id="costoid" > Costo inválido (0 - 999999999) </p >
                </FormGroup>
              </Col>
              <Col>

                <FormGroup>
                  <label>
                    Precio:
                  </label>
                  <input
                    className="form-control"
                    name="precio"
                    type="number"
                    value={this.state.form.precio}
                    onChange={this.handleChange}
                    placeholder="Ingrese el Precio"
                  />
                  <p id="precioid" > Precio inválido (0 - 999999999)</p >
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>
                  Imagen del automotor:
              </label>
                <input id="inputFileToLoad" type="file" on onClick={() => this.encodeImageFileAsURL()} />

              </Col>
              <Col>

                <label>
                  Plazo de Entrega:
              </label>
                <input
                  className="form-control"
                  name="plazo_entrega_0km"
                  type="number"
                  value={this.state.form.plazo_entrega_0km}
                  onChange={this.handleChange}
                  placeholder="Plazo de entrega (Días)"
                />
                <p id="plazoid" > Plazo inválido (0 - 999) </p >

              </Col>
              <Col>
                <label>
                  Origen:
                    </label>

                <Input
                  name="origen"
                  type="select"
                  value={this.state.form.origen}
                  onChange={this.handleChange}
                >
                  {
                    this.state.form_combo.origens.map(origen => {
                      return (
                        <option value={origen} selected={this.state.form.origen === origen}>{origen}</option>
                      )
                    })
                  }

                </Input>

              </Col>
            </Row>

            <hr />
            
              <div><h4>Automotor en Sucursal  <Button id="PopoverLegacy2" type="right" color="white"> 
                     <img src={ayuda} className = "menu_ayuda" alt='ayuda'/> 
              </Button>
              <UncontrolledPopover trigger="legacy" placement="right" target="PopoverLegacy2">
                    <PopoverHeader>Agregar Automotor en Sucursal</PopoverHeader>
                     <PopoverBody> Para agregar el automotor en una sucursal se debe habilitar el formulario a través del check. 
                       <FormGroup check >
                         <Input type="checkbox"/>Habilitar                  
                       </FormGroup>
                     </PopoverBody>
                   
                      <PopoverBody> Una vez habilitado se podrá seleccionar la sucursal e indicar los datos del automotor.
                      </PopoverBody>
                  </UncontrolledPopover></h4> </div>
                  <div><FormGroup check>
                  <Label check >
                    <Input type="checkbox" onChange={this.AutomotorEnSucursal} />Habilitar
                  </Label>
                </FormGroup></div>
              

            
            <hr />
            <Container hidden={!this.state.mostrarFormAutomotores}>
              <Row>
                <Col>
                  <label>
                    Sucursal: *
              </label>
                  <Input
                    name="sucursal_id"
                    type="select"
                    value={this.state.form.sucursal_id}
                    onChange={this.handleChange}
                  >
                    <option value="0">Seleccionar una sucursal</option>
                    {
                      this.state.form_combo.sucursales.map(sucursal => {
                        return (
                          <option value={sucursal.id}>{sucursal.nombre}</option>
                        )
                      })
                    }
                  </Input>

                  <p id="sucursalid" > Seleccione una Sucursal </p >

                </Col>

                {/*<Col>
                  <FormGroup check>
                    <Input type="checkbox" name="nuevo" id="exampleCheck" value={this.state.form.nuevo} onChange={this.AutomotorOkm} />

                    <Label for="exampleCheck" check>0km:</Label>
                  </FormGroup>
                </Col>*/}
              </Row>
              <Row>
                <Col><Container hidden={this.state.mostrarAño}>
                  <FormGroup>
                    <label>
                      Año:
                    </label>

                    <Input
                      name="anio"
                      type="select"
                      value={this.state.form.anio}
                      onChange={this.handleChange}
                    >

                      {
                        this.state.form_combo.anios.map(anio => {
                          return (
                            <option value={anio} selected={this.state.form.anio === anio}>{anio}</option>
                          )
                        })
                      }

                    </Input>
                    <p id="anioid" > Seleccione un Año </p >

                  </FormGroup>
                </Container>
                </Col>


                <Col>
                  <FormGroup>
                    <label>
                      Nro Motor:
              </label>
                    <input
                      className="form-control"
                      name="nro_motor"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.form.nro_motor}
                      placeholder="Nuevo Nro de Motor"
                    />
                    <p id="nromotorid" > Número de Motor inválido (Ej: AA-012345-AA) </p >
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      Nro Chasis:
              </label>
                    <input
                      className="form-control"
                      name="nro_chasis"
                      type="text"
                      value={this.state.form.nro_chasis}
                      onChange={this.handleChange}
                      placeholder="Nuevo Nro de Chasis"
                    />
                    <p id="nrochasisid" > Número de Chasis inválido (Ej: 8ABC012345678993) </p >

                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      Patente: *
              </label>
                    <input
                      className="form-control"
                      name="dominio"
                      type="text"
                      value={this.state.form.dominio}
                      onChange={this.handleChange}
                      placeholder="Nueva Patente"
                    />
                    <p id="dominioid" > Patente inválida (Ej: ABC123 ó AB123CD)</p >

                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      Kilometraje:
              </label>
                    <input
                      className="form-control"
                      name="km"
                      type="number"
                      value={this.state.form.km}
                      onChange={this.handleChange}
                      placeholder="Ingrese el Kilometraje"

                    />
                    <p id="kmid" > Kilometraje inválido (0 - 9999999) </p >
                  </FormGroup>
                </Col>
              </Row>
              <Row hidden={this.state.form.id > 0}>
                <Col xs={4}>
                  <label>
                  Asignar el automotor al pedido:
              </label>
                  <Input
                    name="pedido_id"
                    type="select"
                    value={this.state.form.pedido_id}
                    onChange={this.handleChange}
                  >
                    <option value="0">Seleccionar Pedido</option>
                    {
                      this.state.form_combo.pedidos.map(p => {
                        return (
                          <option value={p.id}>{p.nro_pedido}</option>
                        )
                      })
                    }
                  </Input>
                </Col>
              </Row>
            </Container>
            <p> (*) Campos Obligatorios</p>
            <p> (+) Campos Editables</p>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => this.validar(this.state.form)}
              >
                <img src={ok} />
              </Button>
              <Button
                color="danger"
                onClick={() => this.cerrarForm()}
              >
                <img src={cancel} />
              </Button>
            </ModalFooter>

          </ModalBody>
        </Modal>
      </>
    );
  }
}
export { Automotor };