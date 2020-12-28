import React, { Component } from "react";
import Axios from "axios";
import { Busqueda } from '../../components/Busqueda/Busqueda'
import { Tabla } from '../../components/Tabla'
import add from "../../image/add24.png"
import ok from "../../image/accept24.png"
import cancel from "../../image/cancel24.png"
import { productosService } from '../../_services/productos.service'
import { authenticationService } from '../../_services/authentication.service';
import { FormDescripcion } from "../../components/FormCategoria";

import "./Producto.css";
import { validacionService } from "../../_services/validacion.services";

import "bootstrap/dist/css/bootstrap.min.css";
import {
    Label,
    Alert,
    Button,
    Navbar,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col,
    FormGroup,
    ModalFooter,
    Input,
    Form,
    InputGroup,
    InputGroupAddon,
    UncontrolledCollapse
} from "reactstrap";

class Producto extends Component {

    state = {
        modulo: "",
        filtro: "",
        formulario: "",
        productos: [],
        formulario: "",
        mostrarForm: false,
        mostrarDetalles: false,
        form: {
            producto_codigo: "",
            producto_id: 0,
            marca_id: 0,
            categoria_id: 0,
            categoria: "",
            categoria_descripcion: "",
            producto_descripcion: "",
            producto_detalle: "",
            producto_costo: 0,
            producto_precio: 0,
            producto_stock_minimo: 0,
            producto_compra_minima: 0,
            producto_plazo_entrega: 0,
            proveedor_id: 0,
            proveedor_nro: "",
            producto_eliminado: 0,
            usuario_id: 0,
            marca_descripcion: "",
            producto_fecha_modificacion: ""
        },
        form_combo: {
            marcas: [],
            categorias: [],
            proveedores: [],
        },

    };

    componentDidMount() { // se ejecuta al inicio
        this.buscarProductos(this.state.filtro);
    }

    cerrarFormDescripcion = () => {
        this.setState({ formularioTitulo: "" });
    }

    cerrarForm = () => {
        this.setState({ mostrarForm: false });
    };

    cerrarDetalles = () => {
        this.setState({ mostrarDetalles: false });
    };

    mostrarDetalles = (productos) => {
        let formulario = "Detalles";
        this.setState({ formulario: formulario, mostrarDetalles: true, form: productos });
    }

    buscarProductos = query => {
        productosService.buscarProductos(query)
            .then((res) => this.setState({ productos: res, filtro: query }));
    }

    buscarMarcas = () => {
        productosService.buscarMarcas()
            .then((res) => this.setState({
                form_combo: {
                    ...this.state.form_combo,
                    marcas: res
                }
            }));
    }
    buscarCategorias = () => {
        productosService.buscarCategorias()
            .then((res) => this.setState({
                form_combo: {
                    ...this.state.form_combo,
                    categorias: res
                }
            }));
    }

    buscarProveedores = () => {
        productosService.buscarProveedores()
            .then((res) => this.setState({
                form_combo: {
                    ...this.state.form_combo,
                    proveedores: res
                }
            }));
    }

    confirmar = (prod) => {

        if (prod.producto_id === 0) {
            this.insertarProducto(prod);
            console.log("insertar");

        }
        else {
            this.editarProducto(prod);
            console.log("editar");

        }
    }

    insertarProducto = (prod) => {
        productosService.insertarProducto(authenticationService.currentUserValue.id, prod.marca_id, prod.categoria_id, prod.producto_descripcion, prod.producto_detalle, prod.producto_precio, prod.producto_costo, prod.producto_stock_minimo, prod.producto_compra_minima, prod.producto_plazo_entrega, prod.proveedor_id)
            .then(() => {
                this.cerrarForm();
                this.setState({ productos: [] });
                this.buscarProductos(this.state.filtro);

            });
    }

    editarProducto = (prod) => {
        productosService.editarProducto(authenticationService.currentUserValue.id, prod.producto_id, prod.marca_id, prod.categoria_id, prod.producto_descripcion, prod.producto_detalle, prod.producto_precio, prod.producto_costo, prod.producto_stock_minimo, prod.producto_compra_minima, prod.producto_plazo_entrega, prod.proveedor_id)
            .then(() => {
                this.cerrarForm();
                this.setState({ productos: [] });
                this.buscarProductos(this.state.filtro);
            });

    };

    eliminarProducto = (prod) => {
        var opcion = window.confirm("Estás Seguro que deseas eliminar el Producto " + prod.producto_codigo);
        if (opcion === true) {
            productosService.eliminarProducto(prod.producto_id)
                .then(() => {
                    this.setState({ productos: [] });
                    this.buscarProductos(this.state.filtro);
                });
        }
    }

    mostrarForm = (productos) => {
        console.log("proveedores");
        console.log(productos);
        let formulario = "";

        this.buscarMarcas();
        this.buscarCategorias();
        this.buscarProveedores();

        if (productos.marca_id !== 0) {
            formulario = "Modificar Producto " + productos.producto_codigo;
        }
        else {
            formulario = "Nuevo Producto ";
            this.inicializarForm();
        }

        this.setState({ formulario: formulario, mostrarForm: true, form: productos });
    };

    inicializarForm = () => {
        this.setState({
            form: {
                producto_codigo: "",
                producto_id: 0,
                marca_id: 0,
                categoria_id: 0,
                categoria_descripcion: "",
                producto_descripcion: "",
                producto_detalle: "",
                producto_costo: 0,
                producto_precio: 0,
                categoria: "",
                producto_stock_minimo: 0,
                producto_compra_minima: 0,
                producto_plazo_entrega: 0,
                proveedor_id: 0,
                proveedor_nro: "",
                producto_eliminado: 0,
                usuario_id: 0,
                marca_descripcion: "",
                producto_fecha_modificacion: ""
            }
        })
    }

    validar = (producto) => {
        if (this.validarCampos(producto)) {
            this.confirmar(producto);
        }
    }

    validarCampos = (producto) => {
        var camposValidos = true;

        //Validación ComboBox
        var alertaMarca = document.getElementById("marcaid");
        if (producto.marca_id == 0) {
            alertaMarca.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaMarca.style.display = "none";
        }

        var alertaCategoria = document.getElementById("categoriaid");
        if (producto.categoria_id == 0) {
            alertaCategoria.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaCategoria.style.display = "none";
        }

        var alertaProveedor = document.getElementById("proveedorid");
        if (producto.proveedor_id == 0) {
            alertaProveedor.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaProveedor.style.display = "none";
        }

        //Validación Input

        //La expresión sirve para validar conjuntamente descripción y detalle
        var regex_descripcion = /^(?!\s*$).+/;
        var descripcionValida = regex_descripcion.test(producto.producto_descripcion);

        var alertaDescripcion = document.getElementById("descripcionid");
        if (!descripcionValida) {
            alertaDescripcion.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaDescripcion.style.display = "none";
        }

        var regex_detalle = /^(?!\s*$).+|^$/;
        var detalleValido = regex_detalle.test(producto.producto_detalle);

        var alertaDetalles = document.getElementById("detallesid");
        if (!detalleValido) {
            alertaDetalles.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaDetalles.style.display = "none";
        }

        //La expresión sirve para evaluar todos los campos numéricos
        var regex_precio = /^\d{1,9}$/;

        var precioValido = regex_precio.test(producto.producto_precio);

        var alertaPrecio = document.getElementById("precioid");
        if (!precioValido) {
            alertaPrecio.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaPrecio.style.display = "none";
        }

        var costoValido = regex_precio.test(producto.producto_costo);

        var alertaCosto = document.getElementById("costoid");
        if (!costoValido) {
            alertaCosto.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaCosto.style.display = "none";
        }

        var stockValido = regex_precio.test(producto.producto_stock_minimo);

        var alertaStock = document.getElementById("stockid");
        if (!stockValido) {
            alertaStock.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaStock.style.display = "none";
        }

        var compraValida = regex_precio.test(producto.producto_compra_minima);

        var alertaCompra = document.getElementById("compraminimaid");
        if (!compraValida) {
            alertaCompra.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaCompra.style.display = "none";
        }

        var plazoValido = regex_precio.test(producto.producto_plazo_entrega);

        var alertaPlazo = document.getElementById("plazoid");
        if (!plazoValido) {
            alertaPlazo.style.display = "block";
            camposValidos = false;
        }
        else {
            alertaPlazo.style.display = "none";
        }

        return camposValidos;

    }

    nuevaCategoria = () => {
        console.log("nuevoCategoria");
        this.setState({ mostrarFormDescripcion: true, formularioTitulo: "Nueva Categoria" })
    };

    insertarCategoria = () => {
        productosService.insertarCategoria(authenticationService.currentUserValue.id, this.state.form.descripcion2)
            .then((res) => {
                this.cerrarFormDescripcion();
                this.setState({
                    form: { ...this.state.form, categoria_id: res.insertId }
                })
                this.buscarCategorias();
            });
    }

    handleChange = (e) => {

        validacionService.validar(e.target, e.target.name, e.target.value);

        if (e.target.name === "marca_id") {
            this.buscarMarcas()
        }

        if (e.target.name === "categoria_id") {
            if (e.target.value === "-1") {
                this.nuevaCategoria()
                this.buscarCategorias()
            }
        }

        if (e.target.name === "proveedor_id") {
            this.buscarProveedores()
        }

        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    };

    rolAdmitido() {
        var rol = authenticationService.currentUserValue.role;
        return rol == "Administrador" || rol == "Supervisor de ventas" || rol == "Gerente" || rol == "Administrativo";
    }

    render() {

        const productos = this.state.productos;
        console.log(this.state);
        console.log(productos);
        return (
            <>

                <Container hidden={this.state.formularioTitulo !== "Nueva Categoria"}>
                    <FormDescripcion
                        visible={this.state.formularioTitulo === "Nueva Categoria"}
                        titulo={this.state.formularioTitulo}
                        confirmar={this.insertarCategoria}
                        handleChange={this.handleChange}
                        cerrar={this.cerrarFormDescripcion}
                        categoria={this.state.form.categoria}
                    >
                    </FormDescripcion>
                </Container>
                <Container hidden={this.props.visible}>

                    {/*Barra de busqueda*/}
                    <Busqueda modulo="Productos" search={this.buscarProductos} />

                    <br />
                    {/*Boton agregar Nuevo Proveedor*/}
                    {this.rolAdmitido() ?
                        <Form inline>
                            <Button
                                color="success"
                                onClick={() => this.mostrarForm({
                                    producto_codigo: "",
                                    producto_id: 0,
                                    marca_id: 0,
                                    categoria_id: 0,
                                    categoria_descripcion: "",
                                    producto_descripcion: "",
                                    producto_detalle: "",
                                    producto_costo: 0,
                                    producto_precio: 0,
                                    producto_stock_minimo: 0,
                                    producto_compra_minima: 0,
                                    producto_plazo_entrega: 0,
                                    categoria: "",
                                    proveedor_id: 0,
                                    proveedor_nro: "",
                                    producto_eliminado: 0,
                                    usuario_id: 0,
                                    marca_descripcion: "",
                                    producto_fecha_modificacion: ""

                                }, "Nuevo")}
                            >
                                <Form inline>
                                    <img src={add} />
                                </Form>
                            </Button>
                        </Form>
                        : ""}
                    <br />

                    {/*Tabla que muestra los proveedores*/}
                    <Tabla columnas={{ producto_codigo: "Codigo", marca_descripcion: "Marca", categoria_descripcion: "Categoria", producto_descripcion: "Descripción", producto_detalle: "Detalle", producto_precio: "Precio (ARS)" }}
                        datos={this.state.productos}
                        editar={this.rolAdmitido() ? this.mostrarForm : ""}
                        eliminar={this.rolAdmitido() ? this.eliminarProducto : ""}
                        ver={this.mostrarDetalles} />
                </Container>


                <Modal isOpen={this.state.mostrarDetalles}>
                    <ModalHeader>
                        <h2 color="primary" ><i> Detalles</i></h2>
                    </ModalHeader>
                    <ModalBody>

                        <label>
                            <p><strong>  Costo (ARS): </strong> {this.state.form.producto_costo}</p>
                        </label>
                        <br />
                        <label>
                            <p><strong>  Stock_minimo: </strong>{this.state.form.producto_stock_minimo} un.</p>
                        </label>
                        <br />
                        <label>
                            <p><strong>  Compra_minima: </strong>{this.state.form.producto_compra_minima} un.</p>
                        </label>
                        <br />
                        <label>
                            <p><strong>  Plazo_entrega: </strong>{this.state.form.producto_plazo_entrega} días</p>
                        </label>
                        <br />
                        <label>
                            <p><strong>  Nro de proveedor: </strong>{this.state.form.proveedor_nro}</p>
                        </label>
                        <br />
                        <label>
                            <p><strong>  Modificado por: </strong>{this.state.form.usuario_nombre}</p>
                        </label>
                        <br />
                        <label>
                            <p><strong>  Fecha de Modificación: </strong>{this.state.form.producto_fecha_modificacion}</p>
                        </label>

                    </ModalBody>
                    <ModalFooter>

                        <Button
                            color="danger"
                            onClick={() => this.cerrarDetalles()}
                        >
                            <img src={cancel} />
                        </Button>
                    </ModalFooter>

                </Modal>

                {/* Formulario Insertar/editar */}
                <Modal size="lg" isOpen={this.state.mostrarForm}>

                    <ModalHeader>
                        <div><h3>{this.state.formulario}</h3></div>
                    </ModalHeader>

                    {/* Formulario Insertar/editar */}
                    <ModalBody color="primary">
                        <Row>
                            <Col >
                                {/* Marca*/}
                                <div >
                                    Marca: *
                                </div>

                                <Input
                                    name="marca_id"
                                    type="select"
                                    value={this.state.form.marca_id}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Seleccione Marca</option>
                                    {
                                        this.state.form_combo.marcas.map(marca => {
                                            return (
                                                <option value={marca.id} >{marca.descripcion}</option>
                                            )
                                        })
                                    }
                                </Input>
                                <p id="marcaid"> Seleccione una Marca</p>
                            </Col>
                            <Col>

                                {/* Categoría*/}
                                <div>
                                    Categoría: *
                                </div>

                                <Input
                                    name="categoria_id"
                                    type="select"
                                    value={this.state.form.categoria_id}
                                    onChange={this.handleChange}
                                >
                                    <option value="0">Seleccione Categoria</option>
                                    {
                                        this.state.form_combo.categorias.map(categoria => {
                                            return (
                                                <option value={categoria.id} >{categoria.descripcion}</option>
                                            )
                                        })
                                    }
                                    <option value="-1" color="muted"> (+) Agregar Nueva Categoria</option>
                                </Input>
                                <p id="categoriaid"> Seleccione una Categoria</p>
                            </Col>
                        </Row>
                        <br />

                        {/* Descipcion */}
                        <FormGroup inline>
                            <div>
                                Descripción: *
                            </div>
                            <input
                                className="form-control"
                                name="producto_descripcion"
                                value={this.state.form.producto_descripcion}
                                type="text"
                                placeholder="Ingrese la descripción"
                                onChange={this.handleChange}
                            />
                            <p id="descripcionid"> Descripción inválida (Ej: Aceite 5L)</p>
                            <br />
                            <div>
                                Detalles:
                            </div>
                            <input
                                className="form-control"
                                name="producto_detalle"
                                value={this.state.form.producto_detalle}
                                type="text"
                                placeholder="Ingrese algún detalle"
                                onChange={this.handleChange}
                            />
                            <p id="detallesid"> Detalles inválidos</p>
                            <br />
                            <Row>
                                <Col>
                                    <div>
                                        Precio (ARS):
                                    </div>
                                    <input
                                        className="form-control"
                                        name="producto_precio"
                                        value={this.state.form.producto_precio}
                                        type="number"
                                        placeholder="Ingrese el precio"
                                        onChange={this.handleChange}
                                    />
                                    <p id="precioid"> Precio inválido (0 - 999999999)</p>
                                </Col>
                                <Col>
                                    <div>
                                        Costo (ARS):
                                    </div>
                                    <input
                                        className="form-control"
                                        name="producto_costo"
                                        value={this.state.form.producto_costo}
                                        type="number"
                                        placeholder="Ingrese el costo"
                                        onChange={this.handleChange}
                                    />
                                    <p id="costoid"> Costo inválido (0 - 999999999)</p>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>

                                    <div>
                                        Stock mínimo (unid):
                                    </div>
                                    <input
                                        className="form-control"
                                        name="producto_stock_minimo"
                                        value={this.state.form.producto_stock_minimo}
                                        type="number"
                                        placeholder="Ingrese el stock mínimo"
                                        onChange={this.handleChange}
                                    />
                                    <p id="stockid"> Stock inválido</p>
                                </Col>
                                <Col>
                                    <div>
                                        Compra mínima (unid):
                            </div>
                                    <input
                                        className="form-control"
                                        name="producto_compra_minima"
                                        value={this.state.form.producto_compra_minima}
                                        type="number"
                                        placeholder="Ingrese la compra mínima"
                                        onChange={this.handleChange}
                                    />
                                    <p id="compraminimaid"> Cantidad inválida</p>
                                </Col>
                                <Col>
                                    <div>
                                        Plazo de entrega (días):
                            </div>
                                    <input
                                        className="form-control"
                                        name="producto_plazo_entrega"
                                        value={this.state.form.producto_plazo_entrega}
                                        type="number"
                                        placeholder="Ingrese el plazo de entrega"
                                        onChange={this.handleChange}
                                    />
                                    <p id="plazoid"> Plazo inválido</p>
                                </Col>
                            </Row>
                            <br />
                        </FormGroup>
                        {/* Proveedor*/}
                        <div>
                            Proveedor: *
                            </div>

                        <Input
                            name="proveedor_id"
                            type="select"
                            value={this.state.form.proveedor_id}
                            onChange={this.handleChange}
                        >
                            <option value="">Seleccione Proveedor</option>
                            {
                                this.state.form_combo.proveedores.map(proveedor => {
                                    return (
                                        <option value={proveedor.id} >{proveedor.nro_proveedor} - {proveedor.razon_social} - {proveedor.documento} </option>
                                    )
                                })
                            }
                        </Input>
                        <p id="proveedorid"> Seleccione un Proveedor</p>

                        <p>(*) Campos Obligatorios</p>

                        {/*Botones insertar/editar y cancelar*/}
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
export { Producto };
