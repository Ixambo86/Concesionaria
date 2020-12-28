DROP DATABASE IF EXISTS concesionario;
CREATE DATABASE concesionario;
USE concesionario;

CREATE TABLE paises
(
	id int NOT NULL AUTO_INCREMENT,
    nombre varchar(50),
     PRIMARY KEY (id)
);
CREATE TABLE provincias
(
	id int NOT NULL AUTO_INCREMENT,
    nombre varchar(50),
     pais_id int NOT NULL,
     PRIMARY KEY (id),
     FOREIGN KEY (pais_id) REFERENCES paises(id)
);
CREATE TABLE localidades
(
	id int NOT NULL AUTO_INCREMENT,
    nombre varchar(50),
     provincia_id int NOT NULL,
     PRIMARY KEY (id),
     FOREIGN KEY (provincia_id) REFERENCES provincias(id)
);
CREATE TABLE sucursales
(
	id int NOT NULL AUTO_INCREMENT,
    nombre varchar(50),
	calle varchar(50),
	altura int,
	localidad_id int,
    pais_id int,
    provincia_id int,
    cant_mecanicos int,
    telefono varchar(20),
    email varchar(50),
    eliminado int,
     PRIMARY KEY (id)
);
CREATE TABLE usuarios
(
	id int NOT NULL AUTO_INCREMENT,
	dni int UNIQUE NOT NULL,
	usuario varchar(20) UNIQUE NOT NULL,
    password_hash varchar(255) NOT NULL,
    nombre varchar(50),
    email varchar(255) UNIQUE NOT NULL,
    estado varchar(20) NOT NULL,
    sucursal_id int NOT NULL,
    bonificacion_maxima float,
	PRIMARY KEY (id),
    FOREIGN KEY (sucursal_id) REFERENCES sucursales(id)
);
CREATE TABLE roles
(
	id int NOT NULL AUTO_INCREMENT,
    descripcion varchar(50),
     PRIMARY KEY (id)
);
CREATE TABLE usuarios_roles
(
	usuario_id int NOT NULL,
    rol_id int NOT NULL,
     PRIMARY KEY (usuario_id, rol_id),
     FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
     FOREIGN KEY (rol_id) REFERENCES roles(id)
);
CREATE TABLE condiciones_iva
(
	id int NOT NULL AUTO_INCREMENT,
    descripcion varchar(50),
    tipo_factura varchar(1),
     PRIMARY KEY (id)
);
CREATE TABLE tipos_documento
(
	id int NOT NULL AUTO_INCREMENT,
    descripcion varchar(50),
     PRIMARY KEY (id)
);
CREATE TABLE empleados
(
	id int NOT NULL AUTO_INCREMENT,
	nombres varchar(50),
	apellidos varchar(50),
	genero varchar(1),
	tipo_documento_id int,
	documento varchar(20),
	fecha_nacimiento date,
	telefono varchar(20),
	email varchar(255),
	calle varchar(50),
	altura int,
	piso int,
	dpto varchar(3),
	localidad_id int,
    usuario_id int,
	PRIMARY KEY (id),
	FOREIGN KEY (tipo_documento_id) REFERENCES tipos_documento(id),
	FOREIGN KEY (localidad_id) REFERENCES localidades(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE clientes
(
  id int NOT NULL AUTO_INCREMENT,
  nro_cliente varchar(20),
  nombres varchar(50),
  apellidos varchar(50),
  genero varchar(9),
  persona_fisica varchar(4),
  razon_social varchar(50) NOT NULL,  
  tipo_documento_id int,
  documento varchar(20),
  condicion_iva_id int, 
  fecha_nacimiento date,
  telefono varchar(20),
  motivo_eliminado varchar (20),
  email varchar(255),
  calle varchar(50),
  altura int,
  piso int,
  dpto varchar(3),
  pais_id int,
  provincia_id int,
  localidad_id int,
  eliminado boolean default false,
  usuario_id int,
  fecha_modificacion datetime,
  PRIMARY KEY (id),
  FOREIGN KEY (tipo_documento_id) REFERENCES tipos_documento(id),
  FOREIGN KEY (pais_id) REFERENCES paises(id),
  FOREIGN KEY (provincia_id) REFERENCES provincias(id),
  FOREIGN KEY (localidad_id) REFERENCES localidades(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE categorias_servicio
(
	id int NOT NULL AUTO_INCREMENT,
    padre_id int,
    descripcion varchar(50) NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
     PRIMARY KEY (id),
     FOREIGN KEY (padre_id) REFERENCES categorias_servicio(id)
);
CREATE TABLE servicios
(
	id int NOT NULL AUTO_INCREMENT,
    categoria_id int NOT NULL,
    codigo varchar(20) NOT NULL,
    descripcion varchar(50) NOT NULL,
    precio float NOT NULL,
    cantidad_modulos float,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
     PRIMARY KEY (id),
     FOREIGN KEY (categoria_id) REFERENCES categorias_servicio(id)
);
CREATE TABLE proveedores
(
  id int NOT NULL AUTO_INCREMENT,
  nro_proveedor varchar(20),
  nombres varchar(50),
  apellidos varchar(50),
  genero varchar(1),
  persona_fisica varchar(4),
  razon_social varchar(50) NOT NULL,  
  tipo_documento_id int,
  documento varchar(20),
  condicion_iva_id int, 
  fecha_nacimiento date,
  telefono varchar(20),
  motivo_eliminado varchar (20),
  email varchar(255),
  calle varchar(50),
  altura int,
  piso int,
  dpto varchar(3),
  localidad_id int,
  provincia_id int,
  pais_id int,
    eliminado int,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  PRIMARY KEY (id),
  FOREIGN KEY (tipo_documento_id) REFERENCES tipos_documento(id),
  FOREIGN KEY (localidad_id) REFERENCES localidades(id)
);
CREATE TABLE marcas_automotor
(
	id int NOT NULL AUTO_INCREMENT,
	descripcion varchar(50) NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY (id)
);
CREATE TABLE modelos_automotor
(
	id int NOT NULL AUTO_INCREMENT,
    marca_id int NOT NULL,
	descripcion varchar(50) NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY (id),
    FOREIGN KEY (marca_id) REFERENCES marcas_automotor(id)
);
CREATE TABLE versiones_automotor
(
	id int NOT NULL AUTO_INCREMENT,
    modelo_id int NOT NULL,
	descripcion varchar(50) NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY (id),
    FOREIGN KEY (modelo_id) REFERENCES modelos_automotor(id)
);
CREATE TABLE tipos_motor
(
	id int NOT NULL AUTO_INCREMENT,
	descripcion varchar(50) NOT NULL,
    eliminado boolean default false,
    PRIMARY KEY (id)
);

CREATE TABLE colores_automotor
(
	id int NOT NULL AUTO_INCREMENT,
	descripcion varchar(50) NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY (id)
);
CREATE TABLE versiones_configuracion
(
	id int NOT NULL AUTO_INCREMENT,
	version_id int NOT NULL,
    tipo_motor_id int,
    color_id int,
    costo float,
    precio float,
    plazo_entrega_0km int,
    img mediumtext,
    eliminado boolean default false,
    usuario_id int,
    origen varchar(50),
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY (id),
    FOREIGN KEY (version_id) REFERENCES versiones_automotor(id),
    FOREIGN KEY (tipo_motor_id) REFERENCES tipos_motor(id),
    FOREIGN KEY (color_id) REFERENCES colores_automotor(id)
);
CREATE TABLE categorias_producto
(
	id int NOT NULL AUTO_INCREMENT,
    padre_id int, 
    descripcion varchar(50) NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
     PRIMARY KEY (id),
     FOREIGN KEY (padre_id) REFERENCES categorias_producto(id)
);
CREATE TABLE servicios_productos_categoria
(
	servicio_id int NOT NULL,
    categ_prod_id int NOT NULL,
    cantidad float default 1,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
     PRIMARY KEY (servicio_id, categ_prod_id),
    FOREIGN KEY (categ_prod_id) REFERENCES categorias_producto(id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);
CREATE TABLE marcas_producto
(
	id int NOT NULL AUTO_INCREMENT,
    descripcion varchar(50) NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
     PRIMARY KEY (id)
);
CREATE TABLE productos
(
	id int NOT NULL AUTO_INCREMENT,
    codigo varchar(10),
    marca_id int not null,
    categoria_id int not null,
    descripcion varchar(50) NOT NULL,
    detalle varchar(255),
    costo float NOT NULL,
    precio float NOT NULL,
    stock_minimo float NOT NULL,
    compra_minima float NOT NULL,
    plazo_entrega int NOT NULL, -- en dias
    proveedor_id int NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
	PRIMARY KEY (id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias_producto(id),
    FOREIGN KEY (marca_id) REFERENCES marcas_producto(id)
);
CREATE TABLE productos_inventario
(
	producto_id int not null,
    nro_lote int not null,
    stock float not null,
    reservado float not null,
    fecha_vencimiento date,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY(producto_id, nro_lote),
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE productos_compatibilidad
(
	producto_id int not null,
    marca_id int,
    modelo_id int,
    version_id int,
    tipo_motor_id int,
    anio_desde int,
    anio_hasta int
);
CREATE TABLE automotores
(
	id int NOT NULL AUTO_INCREMENT,
    version_config_id int NOT NULL,
    anio int NOT NULL,
    nro_motor varchar(20) NOT NULL,
    nro_chasis varchar(20) NOT NULL,
    dominio varchar(10),
    km int NOT NULL,
    sucursal_id int,
    cliente_id int,
    costo float,
    precio float,
    nuevo boolean,
    img mediumtext,
    estado varchar(20),
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
	PRIMARY KEY (id),
    FOREIGN KEY (version_config_id) REFERENCES versiones_configuracion(id),
    FOREIGN KEY (sucursal_id) REFERENCES sucursales(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
CREATE TABLE detalles_automotor
(
	automotor_id int NOT NULL,
    detalle varchar(4000),
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
     PRIMARY KEY (automotor_id)
);

CREATE TABLE ordenes_trabajo
(
	id int NOT NULL AUTO_INCREMENT,
    nro_orden varchar(20),
    factura_id int,
    fecha_hora datetime not null,
    cliente_id int NOT NULL,
    automotor_id int NOT NULL,
    estado varchar(20) NOT NULL,
    importe float NOT NULL,
	bonificacion float,  -- porcentaje (0 a 100)
    fecha_minima_turno date,
    cantidad_modulos int,
	total float NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY (id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (automotor_id) REFERENCES automotores(id)
);
CREATE TABLE ordenes_trabajo_servicio
(
	id int NOT NULL AUTO_INCREMENT,
    orden_trabajo_id int,
    item int NOT NULL,
    servicio_id int,
    cantidad float NOT NULL,
    importe float NOT NULL,
    eliminado boolean,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
     PRIMARY KEY (id),
     FOREIGN KEY (orden_trabajo_id) REFERENCES ordenes_trabajo(id),
     FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);
CREATE TABLE ordenes_trabajo_producto
(
	id int NOT NULL AUTO_INCREMENT,
    orden_trabajo_id int,
    servicio_id int,
    item int NOT NULL,
    producto_id int,
    nro_lote int,
    cantidad float NOT NULL,
    importe float NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
     PRIMARY KEY (id),
     FOREIGN KEY (orden_trabajo_id) REFERENCES ordenes_trabajo(id),
     FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);
CREATE TABLE ordenes_trabajo_observacion
(
	id int NOT NULL AUTO_INCREMENT,
    orden_trabajo_id int,
    fecha_hora datetime NOT NULL,
    observacion varchar(255) NOT NULL,
    usuario_id int NOT NULL,
    eliminado boolean default false,
     PRIMARY KEY (id),
     FOREIGN KEY (orden_trabajo_id) REFERENCES ordenes_trabajo(id),
     FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE turnos
(
	id int NOT NULL AUTO_INCREMENT,
    descripcion varchar(255),
    fecha_hora datetime NOT NULL,
    fecha date NOT NULL, 
    modulo int not null,
    cantidad_modulos int,
    cliente_id int,
    orden_trabajo_id int,
    nro_orden varchar(20),
    sucursal_id int,
    mecanico varchar(20),
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY (id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (orden_trabajo_id) REFERENCES ordenes_trabajo(id),
    FOREIGN KEY (sucursal_id) REFERENCES sucursales(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE pedidos
(
	id int NOT NULL AUTO_INCREMENT,
    nro_pedido varchar(20),
    factura_id int,
    fecha_hora datetime NOT NULL,
    cliente_id int NOT NULL,
    estado varchar(20) NOT NULL,
    bonificacion float,
    importe float NOT NULL,
    version_config_id int,
    automotor_id int,
    fecha_entrega datetime,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY (id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
CREATE TABLE pedidos_detalle
(
	id int NOT NULL AUTO_INCREMENT,
    pedido_id int,
    item int NOT NULL,
    producto_id int NOT NULL,
    nro_lote int,
    precio float NOT NULL,
    cantidad float NOT NULL,
    importe float NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY (id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);
CREATE TABLE pedidos_observacion
(
	id int NOT NULL AUTO_INCREMENT,
    pedido_id int,
    fecha_hora datetime NOT NULL,
    observacion varchar(255) NOT NULL,
    usuario_id int NOT NULL,
    eliminado boolean default false,
     PRIMARY KEY (id),
     FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
     FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE documentos_entrega
(
	id int NOT NULL AUTO_INCREMENT,
    fecha_hora datetime,
    descripcion varchar(50),
    fecha_desde date,
    fecha_hasta date,
    exigido_a varchar(20),
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
     PRIMARY KEY (id)
);
CREATE TABLE pedidos_documentacion
(
	id int NOT NULL AUTO_INCREMENT,
    pedido_id int,
    documento_id int,
    entregado boolean,
    usuario_id int ,
    fecha_modificacion datetime, 
    PRIMARY KEY (id),
	FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (documento_id) REFERENCES documentos_entrega(id),
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE facturas
(
	id int NOT NULL AUTO_INCREMENT,
    nro_factura varchar(20),
    tipo varchar(1), -- 'A', 'B', 'E'
    fecha_hora datetime NOT NULL,
    cliente_id int NOT NULL,
    estado varchar(20) NOT NULL,
    iva float NOT NULL,
    total float NOT NULL,
    saldo float NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY (id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
CREATE TABLE facturas_detalle
(
	id int NOT NULL AUTO_INCREMENT,
    factura_id int,
    item int NOT NULL,
    descripcion varchar(255),
    cantidad float NOT NULL,
    precio float,
    importe float NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY (id),
    FOREIGN KEY (factura_id) REFERENCES facturas(id)
);
CREATE TABLE facturas_observacion
(
	id int NOT NULL AUTO_INCREMENT,
    factura_id int,
    fecha_hora datetime NOT NULL,
    observacion varchar(255) NOT NULL,
    usuario_id int NOT NULL,
    eliminado boolean default false,
     PRIMARY KEY (id),
     FOREIGN KEY (factura_id) REFERENCES facturas(id),
     FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE ordenes_compra
(
	id int NOT NULL AUTO_INCREMENT,
    nro_orden varchar(20),
    remito_id int, 
    fecha_hora datetime NOT NULL,
    proveedor_id int NOT NULL,
    estado varchar(20) NOT NULL,
    importe varchar(20),
    eliminado boolean default false,
    sucursal_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (sucursal_id) REFERENCES sucursales(id),
    PRIMARY KEY (id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);
CREATE TABLE ordenes_compra_detalle
(
	id int NOT NULL AUTO_INCREMENT,
    orden_compra_id int,
    item int NOT NULL,
    producto_id int NOT NULL,
    cantidad float NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY (id),
    FOREIGN KEY (orden_compra_id) REFERENCES ordenes_compra(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);
CREATE TABLE ordenes_compra_observacion
(
	id int NOT NULL AUTO_INCREMENT,
    orden_compra_id int,
    fecha_hora datetime NOT NULL,
    observacion varchar(255) NOT NULL,
    usuario_id int NOT NULL,
    eliminado boolean default false,
     PRIMARY KEY (id),
     FOREIGN KEY (orden_compra_id) REFERENCES ordenes_compra(id),
     FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE remitos
(
	id int NOT NULL AUTO_INCREMENT,
    nro_remito varchar(20),
    fecha_hora datetime NOT NULL,
    proveedor_id int NOT NULL,
    estado varchar(20) NOT NULL,
    orden_compra_id int,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY (id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id),
    FOREIGN KEY (orden_compra_id) REFERENCES ordenes_compra(id)
);
CREATE TABLE remitos_detalle
(
	id int NOT NULL AUTO_INCREMENT,
    remito_id int NOT NULL,
    item int NOT NULL,
    producto_id int NOT NULL,
    nro_lote int NOT NULL,
    costo float,
    cantidad float NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    PRIMARY KEY (id),
    FOREIGN KEY (remito_id) REFERENCES remitos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);
CREATE TABLE medios_pago
(
	id int NOT NULL AUTO_INCREMENT,
    descripcion varchar(50),
    eliminado boolean default false,
     PRIMARY KEY (id)
);
CREATE TABLE pagos_cliente
(
	id int NOT NULL AUTO_INCREMENT,
    nro_pago varchar(20),
    fecha_hora datetime NOT NULL,
    cliente_id int NOT NULL,
    importe float NOT NULL,
    concepto varchar(255),
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
     PRIMARY KEY (id),
     FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
CREATE TABLE pagos_cliente_detalle
(
	id int NOT NULL AUTO_INCREMENT,
    pago_id int NOT NULL,
    medio_pago_id int NOT NULL,
    importe float NOT NULL,
    nro_transaccion varchar(20) NOT NULL,
    eliminado boolean default false,
     PRIMARY KEY (id),
     FOREIGN KEY (pago_id) REFERENCES pagos_cliente(id),
     FOREIGN KEY (medio_pago_id) REFERENCES medios_pago(id)
);
CREATE TABLE pagos_cliente_factura
(
	id int NOT NULL AUTO_INCREMENT,
    pago_id int NOT NULL,
    factura_id int NOT NULL,
    eliminado boolean default false,
     PRIMARY KEY (id),
     FOREIGN KEY (pago_id) REFERENCES pagos_cliente(id),
     FOREIGN KEY (factura_id) REFERENCES facturas(id)
);
CREATE TABLE pagos_proveedor
(
	id int NOT NULL AUTO_INCREMENT,
    nro_pago varchar(20),
    fecha_hora datetime NOT NULL,
    proveedor_id int NOT NULL,
    importe float NOT NULL,
    observacion varchar(255),
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
     PRIMARY KEY (id),
     FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);
CREATE TABLE pagos_proveedor_detalle
(
	id int NOT NULL AUTO_INCREMENT,
    pago_id int NOT NULL,
    medio_pago_id int NOT NULL,
    importe float NOT NULL,
    nro_transaccion varchar(20) NOT NULL,
    eliminado boolean default false,
    usuario_id int,
	fecha_modificacion datetime,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
     PRIMARY KEY (id),
     FOREIGN KEY (pago_id) REFERENCES pagos_proveedor(id),
     FOREIGN KEY (medio_pago_id) REFERENCES medios_pago(id)
);
CREATE TABLE sistema
(
	dias_recordatorio_turno int NOT NULL,
    ultima_orden_trabajo int NOT NULL,
    ultimo_pedido int NOT NULL,
    ultima_orden_venta int NOT NULL,
    ultima_factura int NOT NULL,
    ultimo_pago_cliente int NOT NULL,
    ultimo_pago_proveedor int NOT NULL,
    iva float NOT NULL
);
CREATE TABLE costumer
(
	id int NOT NULL AUTO_INCREMENT,
    tipo varchar(20) NOT NULL,
    asunto varchar(100) NOT NULL,
    titulo varchar(100) NOT NULL,
    mensaje varchar(255) NOT NULL,
    frecuencia varchar(255) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE arqueos
(
	id int NOT NULL AUTO_INCREMENT,
	fecha DATE NOT NULL,
	ingreso float NOT NULL,
	egreso float NOT NULL,
	ganancia float AS (ingreso - egreso) NOT NULL,
	estado varchar(20) NOT NULL,
	usuario_id int NOT NULL,
	sucursal_id int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (sucursal_id) REFERENCES sucursales(id),
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
