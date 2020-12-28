/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: automotores
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `automotores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `version_config_id` int NOT NULL,
  `anio` int NOT NULL,
  `nro_motor` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nro_chasis` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dominio` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `km` int NOT NULL,
  `sucursal_id` int DEFAULT NULL,
  `cliente_id` int DEFAULT NULL,
  `costo` float DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `nuevo` tinyint(1) DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `version_config_id` (`version_config_id`),
  KEY `sucursal_id` (`sucursal_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `automotores_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `automotores_ibfk_2` FOREIGN KEY (`version_config_id`) REFERENCES `versiones_configuracion` (`id`),
  CONSTRAINT `automotores_ibfk_3` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursales` (`id`),
  CONSTRAINT `automotores_ibfk_4` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: carrocerias_automotor
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `carrocerias_automotor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `carrocerias_automotor_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: categorias_producto
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `categorias_producto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `padre_id` int DEFAULT NULL,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `padre_id` (`padre_id`),
  CONSTRAINT `categorias_producto_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `categorias_producto_ibfk_2` FOREIGN KEY (`padre_id`) REFERENCES `categorias_producto` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 26 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: categorias_servicio
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `categorias_servicio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `padre_id` int DEFAULT NULL,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `padre_id` (`padre_id`),
  CONSTRAINT `categorias_servicio_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `categorias_servicio_ibfk_2` FOREIGN KEY (`padre_id`) REFERENCES `categorias_servicio` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: clientes
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nro_cliente` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombres` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `apellidos` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genero` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `persona_fisica` tinyint(1) DEFAULT NULL,
  `razon_social` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_documento_id` int DEFAULT NULL,
  `documento` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `condicion_iva_id` int DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `calle` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `altura` int DEFAULT NULL,
  `piso` int DEFAULT NULL,
  `dpto` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `localidad_id` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tipo_documento_id` (`tipo_documento_id`),
  KEY `localidad_id` (`localidad_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`tipo_documento_id`) REFERENCES `tipos_documento` (`id`),
  CONSTRAINT `clientes_ibfk_2` FOREIGN KEY (`localidad_id`) REFERENCES `localidades` (`id`),
  CONSTRAINT `clientes_ibfk_3` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: colores_automotor
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `colores_automotor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `colores_automotor_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: condiciones_iva
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `condiciones_iva` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_factura` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: detalles_automotor
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `detalles_automotor` (
  `automotor_id` int NOT NULL,
  `detalle` varchar(4000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`automotor_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `detalles_automotor_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: documentos_automotor
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `documentos_automotor` (
  `documento_id` int NOT NULL,
  `automotor_id` int NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`documento_id`, `automotor_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `documentos_automotor_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `documentos_automotor_ibfk_2` FOREIGN KEY (`documento_id`) REFERENCES `documentos_entrega` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: documentos_entrega
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `documentos_entrega` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `documentos_entrega_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: empleados
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `empleados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `apellidos` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genero` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_documento_id` int DEFAULT NULL,
  `documento` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `calle` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `altura` int DEFAULT NULL,
  `piso` int DEFAULT NULL,
  `dpto` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `localidad_id` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tipo_documento_id` (`tipo_documento_id`),
  KEY `localidad_id` (`localidad_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`tipo_documento_id`) REFERENCES `tipos_documento` (`id`),
  CONSTRAINT `empleados_ibfk_2` FOREIGN KEY (`localidad_id`) REFERENCES `localidades` (`id`),
  CONSTRAINT `empleados_ibfk_3` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: equipamientos_automotor
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `equipamientos_automotor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `equipamientos_automotor_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: facturas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `facturas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nro_factura` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `cliente_id` int NOT NULL,
  `estado` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iva` float NOT NULL,
  `total` float NOT NULL,
  `saldo` float NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `facturas_ibfk_2` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: facturas_detalle
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `facturas_detalle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `factura_id` int DEFAULT NULL,
  `item` int NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cantidad` float NOT NULL,
  `precio` float DEFAULT NULL,
  `importe` float NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `factura_id` (`factura_id`),
  CONSTRAINT `facturas_detalle_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `facturas_detalle_ibfk_2` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: facturas_observacion
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `facturas_observacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `factura_id` int DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `observacion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usuario_id` int NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `factura_id` (`factura_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `facturas_observacion_ibfk_1` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`id`),
  CONSTRAINT `facturas_observacion_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: localidades
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `localidades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provincia_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `provincia_id` (`provincia_id`),
  CONSTRAINT `localidades_ibfk_1` FOREIGN KEY (`provincia_id`) REFERENCES `provincias` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: marcas_automotor
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `marcas_automotor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `marcas_automotor_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: marcas_producto
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `marcas_producto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `marcas_producto_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: medios_pago
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `medios_pago` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: modelos_automotor
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `modelos_automotor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca_id` int NOT NULL,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `marca_id` (`marca_id`),
  CONSTRAINT `modelos_automotor_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `modelos_automotor_ibfk_2` FOREIGN KEY (`marca_id`) REFERENCES `marcas_automotor` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ordenes_compra
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ordenes_compra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nro_orden` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remito_id` int DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `proveedor_id` int NOT NULL,
  `estado` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `importe` float NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `proveedor_id` (`proveedor_id`),
  CONSTRAINT `ordenes_compra_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `ordenes_compra_ibfk_2` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ordenes_compra_detalle
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ordenes_compra_detalle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orden_compra_id` int DEFAULT NULL,
  `item` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` float NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `orden_compra_id` (`orden_compra_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `ordenes_compra_detalle_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `ordenes_compra_detalle_ibfk_2` FOREIGN KEY (`orden_compra_id`) REFERENCES `ordenes_compra` (`id`),
  CONSTRAINT `ordenes_compra_detalle_ibfk_3` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ordenes_compra_observacion
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ordenes_compra_observacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orden_compra_id` int DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `observacion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usuario_id` int NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `orden_compra_id` (`orden_compra_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `ordenes_compra_observacion_ibfk_1` FOREIGN KEY (`orden_compra_id`) REFERENCES `ordenes_compra` (`id`),
  CONSTRAINT `ordenes_compra_observacion_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ordenes_trabajo
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ordenes_trabajo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nro_orden` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `factura_id` int DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `cliente_id` int NOT NULL,
  `automotor_id` int NOT NULL,
  `estado` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `importe` float NOT NULL,
  `bonificacion` float DEFAULT NULL,
  `fecha_minima_turno` date DEFAULT NULL,
  `cantidad_modulos` int DEFAULT NULL,
  `total` float NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `cliente_id` (`cliente_id`),
  KEY `automotor_id` (`automotor_id`),
  CONSTRAINT `ordenes_trabajo_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `ordenes_trabajo_ibfk_2` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`),
  CONSTRAINT `ordenes_trabajo_ibfk_3` FOREIGN KEY (`automotor_id`) REFERENCES `automotores` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ordenes_trabajo_observacion
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ordenes_trabajo_observacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orden_trabajo_id` int DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `observacion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usuario_id` int NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `orden_trabajo_id` (`orden_trabajo_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `ordenes_trabajo_observacion_ibfk_1` FOREIGN KEY (`orden_trabajo_id`) REFERENCES `ordenes_trabajo` (`id`),
  CONSTRAINT `ordenes_trabajo_observacion_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ordenes_trabajo_producto
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ordenes_trabajo_producto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orden_trabajo_id` int DEFAULT NULL,
  `servicio_id` int DEFAULT NULL,
  `item` int NOT NULL,
  `producto_id` int DEFAULT NULL,
  `nro_lote` int DEFAULT NULL,
  `cantidad` float NOT NULL,
  `importe` float NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `orden_trabajo_id` (`orden_trabajo_id`),
  KEY `servicio_id` (`servicio_id`),
  CONSTRAINT `ordenes_trabajo_producto_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `ordenes_trabajo_producto_ibfk_2` FOREIGN KEY (`orden_trabajo_id`) REFERENCES `ordenes_trabajo` (`id`),
  CONSTRAINT `ordenes_trabajo_producto_ibfk_3` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ordenes_trabajo_servicio
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ordenes_trabajo_servicio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orden_trabajo_id` int DEFAULT NULL,
  `item` int NOT NULL,
  `servicio_id` int DEFAULT NULL,
  `cantidad` float NOT NULL,
  `importe` float NOT NULL,
  `eliminado` tinyint(1) DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `orden_trabajo_id` (`orden_trabajo_id`),
  KEY `servicio_id` (`servicio_id`),
  CONSTRAINT `ordenes_trabajo_servicio_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `ordenes_trabajo_servicio_ibfk_2` FOREIGN KEY (`orden_trabajo_id`) REFERENCES `ordenes_trabajo` (`id`),
  CONSTRAINT `ordenes_trabajo_servicio_ibfk_3` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: pagos_cliente
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `pagos_cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nro_pago` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `cliente_id` int NOT NULL,
  `importe` float NOT NULL,
  `concepto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `pagos_cliente_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `pagos_cliente_ibfk_2` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: pagos_cliente_detalle
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `pagos_cliente_detalle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pago_id` int NOT NULL,
  `medio_pago_id` int NOT NULL,
  `importe` float NOT NULL,
  `nro_transaccion` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `pago_id` (`pago_id`),
  KEY `medio_pago_id` (`medio_pago_id`),
  CONSTRAINT `pagos_cliente_detalle_ibfk_1` FOREIGN KEY (`pago_id`) REFERENCES `pagos_cliente` (`id`),
  CONSTRAINT `pagos_cliente_detalle_ibfk_2` FOREIGN KEY (`medio_pago_id`) REFERENCES `medios_pago` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: pagos_cliente_factura
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `pagos_cliente_factura` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pago_id` int NOT NULL,
  `factura_id` int NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `pago_id` (`pago_id`),
  KEY `factura_id` (`factura_id`),
  CONSTRAINT `pagos_cliente_factura_ibfk_1` FOREIGN KEY (`pago_id`) REFERENCES `pagos_cliente` (`id`),
  CONSTRAINT `pagos_cliente_factura_ibfk_2` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: pagos_proveedor
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `pagos_proveedor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nro_pago` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `proveedor_id` int NOT NULL,
  `orden_compra_id` int NOT NULL,
  `nro_factura` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `importe` float NOT NULL,
  `observacion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `proveedor_id` (`proveedor_id`),
  CONSTRAINT `pagos_proveedor_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `pagos_proveedor_ibfk_2` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: pagos_proveedor_detalle
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `pagos_proveedor_detalle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pago_id` int NOT NULL,
  `medio_pago_id` int NOT NULL,
  `importe` float NOT NULL,
  `nro_transaccion` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `pago_id` (`pago_id`),
  KEY `medio_pago_id` (`medio_pago_id`),
  CONSTRAINT `pagos_proveedor_detalle_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `pagos_proveedor_detalle_ibfk_2` FOREIGN KEY (`pago_id`) REFERENCES `pagos_proveedor` (`id`),
  CONSTRAINT `pagos_proveedor_detalle_ibfk_3` FOREIGN KEY (`medio_pago_id`) REFERENCES `medios_pago` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: paises
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `paises` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: pedidos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nro_pedido` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `factura_id` int DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `cliente_id` int NOT NULL,
  `estado` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `importe` float NOT NULL,
  `automotor_id` int DEFAULT NULL,
  `fecha_entrega` datetime DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: pedidos_detalle
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `pedidos_detalle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int DEFAULT NULL,
  `item` int NOT NULL,
  `producto_id` int NOT NULL,
  `nro_lote` int DEFAULT NULL,
  `precio` float NOT NULL,
  `cantidad` float NOT NULL,
  `importe` float NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `pedidos_detalle_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `pedidos_detalle_ibfk_2` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  CONSTRAINT `pedidos_detalle_ibfk_3` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: pedidos_observacion
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `pedidos_observacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `observacion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usuario_id` int NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `pedidos_observacion_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  CONSTRAINT `pedidos_observacion_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: productos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `marca_id` int NOT NULL,
  `categoria_id` int NOT NULL,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detalle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `costo` float NOT NULL,
  `precio` float NOT NULL,
  `stock_minimo` float NOT NULL,
  `compra_minima` float NOT NULL,
  `plazo_entrega` int NOT NULL,
  `proveedor_id` int NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `proveedor_id` (`proveedor_id`),
  KEY `categoria_id` (`categoria_id`),
  KEY `marca_id` (`marca_id`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`),
  CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_producto` (`id`),
  CONSTRAINT `productos_ibfk_4` FOREIGN KEY (`marca_id`) REFERENCES `marcas_producto` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 33 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: productos_compatibilidad
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `productos_compatibilidad` (
  `producto_id` int NOT NULL,
  `marca_id` int DEFAULT NULL,
  `modelo_id` int DEFAULT NULL,
  `version_id` int DEFAULT NULL,
  `tipo_motor_id` int DEFAULT NULL,
  `anio_desde` int DEFAULT NULL,
  `anio_hasta` int DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: productos_inventario
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `productos_inventario` (
  `producto_id` int NOT NULL,
  `nro_lote` int NOT NULL,
  `stock` float NOT NULL,
  `reservado` float NOT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`producto_id`, `nro_lote`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `productos_inventario_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `productos_inventario_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  CONSTRAINT `productos_inventario_ibfk_3` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: proveedores
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `proveedores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nro_proveedor` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombres` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `apellidos` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genero` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `persona_fisica` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `razon_social` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_documento_id` int DEFAULT NULL,
  `documento` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `condicion_iva_id` int DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `calle` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `altura` int DEFAULT NULL,
  `piso` int DEFAULT NULL,
  `dpto` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `localidad_id` int DEFAULT NULL,
  `eliminado` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `tipo_documento_id` (`tipo_documento_id`),
  KEY `localidad_id` (`localidad_id`),
  CONSTRAINT `proveedores_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `proveedores_ibfk_2` FOREIGN KEY (`tipo_documento_id`) REFERENCES `tipos_documento` (`id`),
  CONSTRAINT `proveedores_ibfk_3` FOREIGN KEY (`localidad_id`) REFERENCES `localidades` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: provincias
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `provincias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pais_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pais_id` (`pais_id`),
  CONSTRAINT `provincias_ibfk_1` FOREIGN KEY (`pais_id`) REFERENCES `paises` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: remito_detalle
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `remito_detalle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `remito_id` int NOT NULL,
  `item` int NOT NULL,
  `producto_id` int NOT NULL,
  `nro_lote` int NOT NULL,
  `cantidad` float NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `remito_id` (`remito_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `remito_detalle_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `remito_detalle_ibfk_2` FOREIGN KEY (`remito_id`) REFERENCES `remitos` (`id`),
  CONSTRAINT `remito_detalle_ibfk_3` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: remitos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `remitos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nro_remito` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `proveedor_id` int NOT NULL,
  `estado` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orden_compra_id` int DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `proveedor_id` (`proveedor_id`),
  KEY `orden_compra_id` (`orden_compra_id`),
  CONSTRAINT `remitos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `remitos_ibfk_2` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`),
  CONSTRAINT `remitos_ibfk_3` FOREIGN KEY (`orden_compra_id`) REFERENCES `ordenes_compra` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: roles
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: servicios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `servicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoria_id` int NOT NULL,
  `codigo` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` float NOT NULL,
  `cantidad_modulos` float DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `servicios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `servicios_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_servicio` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: servicios_productos_categoria
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `servicios_productos_categoria` (
  `servicio_id` int NOT NULL,
  `categ_prod_id` int NOT NULL,
  `cantidad` float DEFAULT '1',
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`servicio_id`, `categ_prod_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `categ_prod_id` (`categ_prod_id`),
  CONSTRAINT `servicios_productos_categoria_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `servicios_productos_categoria_ibfk_2` FOREIGN KEY (`categ_prod_id`) REFERENCES `categorias_producto` (`id`),
  CONSTRAINT `servicios_productos_categoria_ibfk_3` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sistema
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sistema` (
  `dias_recordatorio_turno` int NOT NULL,
  `ultima_orden_trabajo` int NOT NULL,
  `ultimo_pedido` int NOT NULL,
  `ultima_orden_venta` int NOT NULL,
  `ultima_factura` int NOT NULL,
  `ultimo_pago_cliente` int NOT NULL,
  `ultimo_pago_proveedor` int NOT NULL,
  `iva` float NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sucursales
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sucursales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `calle` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `altura` int DEFAULT NULL,
  `localidad_id` int DEFAULT NULL,
  `cant_mecanicos` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tipos_documento
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tipos_documento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tipos_motor
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tipos_motor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tipos_transmision
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tipos_transmision` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: turnos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `turnos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `fecha` date NOT NULL,
  `modulo` int NOT NULL,
  `cantidad_modulos` int DEFAULT NULL,
  `cliente_id` int DEFAULT NULL,
  `orden_trabajo_id` int DEFAULT NULL,
  `nro_orden` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sucursal_id` int DEFAULT NULL,
  `mecanico` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cliente_id` (`cliente_id`),
  KEY `orden_trabajo_id` (`orden_trabajo_id`),
  KEY `sucursal_id` (`sucursal_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `turnos_ibfk_2` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`),
  CONSTRAINT `turnos_ibfk_3` FOREIGN KEY (`orden_trabajo_id`) REFERENCES `ordenes_trabajo` (`id`),
  CONSTRAINT `turnos_ibfk_4` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursales` (`id`),
  CONSTRAINT `turnos_ibfk_5` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dni` int NOT NULL,
  `usuario` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sucursal_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `usuario` (`usuario`),
  UNIQUE KEY `email` (`email`),
  KEY `sucursal_id` (`sucursal_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursales` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuarios_roles
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuarios_roles` (
  `usuario_id` int NOT NULL,
  `rol_id` int NOT NULL,
  PRIMARY KEY (`usuario_id`, `rol_id`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuarios_roles_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `usuarios_roles_ibfk_2` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: versiones_automotor
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `versiones_automotor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `modelo_id` int NOT NULL,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `modelo_id` (`modelo_id`),
  CONSTRAINT `versiones_automotor_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `versiones_automotor_ibfk_2` FOREIGN KEY (`modelo_id`) REFERENCES `modelos_automotor` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: versiones_config_equipamiento
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `versiones_config_equipamiento` (
  `version_config_id` int NOT NULL,
  `equipamiento_id` int NOT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`version_config_id`, `equipamiento_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `equipamiento_id` (`equipamiento_id`),
  CONSTRAINT `versiones_config_equipamiento_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `versiones_config_equipamiento_ibfk_2` FOREIGN KEY (`version_config_id`) REFERENCES `versiones_configuracion` (`id`),
  CONSTRAINT `versiones_config_equipamiento_ibfk_3` FOREIGN KEY (`equipamiento_id`) REFERENCES `equipamientos_automotor` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: versiones_configuracion
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `versiones_configuracion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `version_id` int NOT NULL,
  `carroceria_id` int DEFAULT NULL,
  `puertas` int DEFAULT NULL,
  `tipo_motor_id` int DEFAULT NULL,
  `cilindrada` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `turbo` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hp` int DEFAULT NULL,
  `transmision_id` int DEFAULT NULL,
  `color_id` int DEFAULT NULL,
  `plazo_entrega_0km` int DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `version_id` (
  `version_id`,
  `carroceria_id`,
  `puertas`,
  `tipo_motor_id`,
  `cilindrada`,
  `turbo`,
  `transmision_id`,
  `color_id`
  ),
  KEY `usuario_id` (`usuario_id`),
  KEY `carroceria_id` (`carroceria_id`),
  KEY `tipo_motor_id` (`tipo_motor_id`),
  KEY `transmision_id` (`transmision_id`),
  KEY `color_id` (`color_id`),
  CONSTRAINT `versiones_configuracion_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `versiones_configuracion_ibfk_2` FOREIGN KEY (`version_id`) REFERENCES `versiones_automotor` (`id`),
  CONSTRAINT `versiones_configuracion_ibfk_3` FOREIGN KEY (`carroceria_id`) REFERENCES `carrocerias_automotor` (`id`),
  CONSTRAINT `versiones_configuracion_ibfk_4` FOREIGN KEY (`tipo_motor_id`) REFERENCES `tipos_motor` (`id`),
  CONSTRAINT `versiones_configuracion_ibfk_5` FOREIGN KEY (`transmision_id`) REFERENCES `tipos_transmision` (`id`),
  CONSTRAINT `versiones_configuracion_ibfk_6` FOREIGN KEY (`color_id`) REFERENCES `colores_automotor` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: automotores
# ------------------------------------------------------------

INSERT INTO
  `automotores` (
    `id`,
    `version_config_id`,
    `anio`,
    `nro_motor`,
    `nro_chasis`,
    `dominio`,
    `km`,
    `sucursal_id`,
    `cliente_id`,
    `costo`,
    `precio`,
    `nuevo`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    1,
    1,
    2017,
    'AB123CD456',
    'EF123GH456',
    'AB123CD',
    62000,
    NULL,
    1,
    1000000,
    1500000,
    NULL,
    0,
    NULL,
    NULL
  );
INSERT INTO
  `automotores` (
    `id`,
    `version_config_id`,
    `anio`,
    `nro_motor`,
    `nro_chasis`,
    `dominio`,
    `km`,
    `sucursal_id`,
    `cliente_id`,
    `costo`,
    `precio`,
    `nuevo`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    2,
    2,
    2018,
    'CD123EF456',
    'GH123IJ456',
    'AC123DE',
    35000,
    NULL,
    2,
    1200000,
    1800000,
    NULL,
    0,
    NULL,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: carrocerias_automotor
# ------------------------------------------------------------

INSERT INTO
  `carrocerias_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 'Hatchback', 0, NULL, NULL);
INSERT INTO
  `carrocerias_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 'Sedan', 0, NULL, NULL);
INSERT INTO
  `carrocerias_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (3, 'Coupe', 0, NULL, NULL);
INSERT INTO
  `carrocerias_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (4, 'SUV', 0, NULL, NULL);
INSERT INTO
  `carrocerias_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (5, 'Rural', 0, NULL, NULL);
INSERT INTO
  `carrocerias_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (6, 'Cabriolet', 0, NULL, NULL);
INSERT INTO
  `carrocerias_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (7, 'Off-Road', 0, NULL, NULL);
INSERT INTO
  `carrocerias_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (8, 'Monovolumen', 0, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: categorias_producto
# ------------------------------------------------------------

INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, NULL, 'Lubricantes', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, NULL, 'Filtros', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (3, NULL, 'Distribución', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (4, 1, 'Aceite 10w40', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (5, 1, 'Aceite 20w50', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (6, 1, 'Aceite 5w30', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (7, 1, 'Aceite 20w40', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (8, NULL, 'Filtro de Aceite', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    9,
    NULL,
    'Filtro de Combustible Diesel',
    0,
    NULL,
    NULL
  );
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    10,
    NULL,
    'Filtro de Combustible Nafta',
    0,
    NULL,
    NULL
  );
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (11, NULL, 'Filtro de Aire', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (12, NULL, 'Filtro de Habitáculo', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (13, 3, 'Correa de Distribución', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (14, 3, 'Cadena de Distribución', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (15, NULL, 'Liquido refrigerante', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (16, NULL, 'Bugías Nafta', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (17, NULL, 'Bugías Diesel', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (18, 15, 'Liquido refrigerante', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (19, 16, 'Bugías Nafta', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (20, 17, 'Bugías Diesel', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (21, NULL, 'Adicionales', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (22, 21, 'Polarizado', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (23, 21, 'Llantas', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (24, 21, 'Cristales Electricos', 0, NULL, NULL);
INSERT INTO
  `categorias_producto` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (25, 21, 'Cuero', 0, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: categorias_servicio
# ------------------------------------------------------------

INSERT INTO
  `categorias_servicio` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, NULL, 'Service', 0, NULL, NULL);
INSERT INTO
  `categorias_servicio` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, NULL, 'Mecánica Ligera', 0, NULL, NULL);
INSERT INTO
  `categorias_servicio` (
    `id`,
    `padre_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (3, NULL, 'Mecánica', 0, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: clientes
# ------------------------------------------------------------

INSERT INTO
  `clientes` (
    `id`,
    `nro_cliente`,
    `nombres`,
    `apellidos`,
    `genero`,
    `persona_fisica`,
    `razon_social`,
    `tipo_documento_id`,
    `documento`,
    `condicion_iva_id`,
    `fecha_nacimiento`,
    `telefono`,
    `email`,
    `calle`,
    `altura`,
    `piso`,
    `dpto`,
    `localidad_id`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    1,
    'C00000001',
    'Pedro',
    'Duarte',
    'M',
    1,
    'Mi Empresa',
    1,
    '35147981',
    1,
    '1991-02-18',
    '11-3344-5566',
    'pedro_duarte@gmail.com',
    'Los Patos',
    1556,
    NULL,
    NULL,
    7,
    NULL,
    NULL
  );
INSERT INTO
  `clientes` (
    `id`,
    `nro_cliente`,
    `nombres`,
    `apellidos`,
    `genero`,
    `persona_fisica`,
    `razon_social`,
    `tipo_documento_id`,
    `documento`,
    `condicion_iva_id`,
    `fecha_nacimiento`,
    `telefono`,
    `email`,
    `calle`,
    `altura`,
    `piso`,
    `dpto`,
    `localidad_id`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    2,
    'C00000002',
    'Juana',
    'Gimenez',
    'F',
    1,
    '',
    1,
    '28123852',
    2,
    '1982-12-08',
    '11-7788-9900',
    'juanagimenez@gmail.com',
    'Muñoz',
    2556,
    3,
    'B',
    9,
    NULL,
    NULL
  );
INSERT INTO
  `clientes` (
    `id`,
    `nro_cliente`,
    `nombres`,
    `apellidos`,
    `genero`,
    `persona_fisica`,
    `razon_social`,
    `tipo_documento_id`,
    `documento`,
    `condicion_iva_id`,
    `fecha_nacimiento`,
    `telefono`,
    `email`,
    `calle`,
    `altura`,
    `piso`,
    `dpto`,
    `localidad_id`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    3,
    'C00000003',
    'Jorge',
    'Juarez',
    'M',
    1,
    '',
    1,
    '35123656',
    3,
    '1990-08-04',
    '11-1122-3344',
    'jorgejuarez@gmail.com',
    'El callao',
    3809,
    NULL,
    NULL,
    6,
    NULL,
    NULL
  );
INSERT INTO
  `clientes` (
    `id`,
    `nro_cliente`,
    `nombres`,
    `apellidos`,
    `genero`,
    `persona_fisica`,
    `razon_social`,
    `tipo_documento_id`,
    `documento`,
    `condicion_iva_id`,
    `fecha_nacimiento`,
    `telefono`,
    `email`,
    `calle`,
    `altura`,
    `piso`,
    `dpto`,
    `localidad_id`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    4,
    'C00000004',
    'Sabrina',
    'Pomez',
    'F',
    1,
    'ONG',
    1,
    '26128542',
    4,
    '1979-02-17',
    '11-2233-4455',
    'sabrinapomez@gmail.com',
    'Muñoz',
    2556,
    NULL,
    NULL,
    10,
    NULL,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: colores_automotor
# ------------------------------------------------------------

INSERT INTO
  `colores_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 'Negro', 0, NULL, NULL);
INSERT INTO
  `colores_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 'Azul', 0, NULL, NULL);
INSERT INTO
  `colores_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (3, 'Rojo', 0, NULL, NULL);
INSERT INTO
  `colores_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (4, 'Verde', 0, NULL, NULL);
INSERT INTO
  `colores_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (5, 'Blanco', 0, NULL, NULL);
INSERT INTO
  `colores_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (6, 'Gris', 0, NULL, NULL);
INSERT INTO
  `colores_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (7, 'Champagne', 0, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: condiciones_iva
# ------------------------------------------------------------

INSERT INTO
  `condiciones_iva` (`id`, `descripcion`, `tipo_factura`)
VALUES
  (1, 'Responsable Inscripto', 'A');
INSERT INTO
  `condiciones_iva` (`id`, `descripcion`, `tipo_factura`)
VALUES
  (2, 'Monotributista', 'B');
INSERT INTO
  `condiciones_iva` (`id`, `descripcion`, `tipo_factura`)
VALUES
  (3, 'Consumidor Final', 'B');
INSERT INTO
  `condiciones_iva` (`id`, `descripcion`, `tipo_factura`)
VALUES
  (4, 'Excento', 'E');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: detalles_automotor
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: documentos_automotor
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: documentos_entrega
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: empleados
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: equipamientos_automotor
# ------------------------------------------------------------

INSERT INTO
  `equipamientos_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 'Aire Acondicionado', 0, NULL, NULL);
INSERT INTO
  `equipamientos_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 'Dirección Hidráulica', 0, NULL, NULL);
INSERT INTO
  `equipamientos_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (3, 'Dirección Asistida', 0, NULL, NULL);
INSERT INTO
  `equipamientos_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (4, 'Cristales Electricos', 0, NULL, NULL);
INSERT INTO
  `equipamientos_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (5, 'Frenos ABS', 0, NULL, NULL);
INSERT INTO
  `equipamientos_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (6, 'Cuero', 0, NULL, NULL);
INSERT INTO
  `equipamientos_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (7, 'Espejos Electricos', 0, NULL, NULL);
INSERT INTO
  `equipamientos_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (8, 'Airbag Conductor', 0, NULL, NULL);
INSERT INTO
  `equipamientos_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (9, 'Airbag Pasajero', 0, NULL, NULL);
INSERT INTO
  `equipamientos_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (10, 'Airbag Laterales', 0, NULL, NULL);
INSERT INTO
  `equipamientos_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (11, 'Ganchos ISOFIX', 0, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: facturas
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: facturas_detalle
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: facturas_observacion
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: localidades
# ------------------------------------------------------------

INSERT INTO
  `localidades` (`id`, `nombre`, `provincia_id`)
VALUES
  (1, 'Asa Norte', 2);
INSERT INTO
  `localidades` (`id`, `nombre`, `provincia_id`)
VALUES
  (2, 'Boqueron', 6);
INSERT INTO
  `localidades` (`id`, `nombre`, `provincia_id`)
VALUES
  (3, 'Santiago Vasquez', 3);
INSERT INTO
  `localidades` (`id`, `nombre`, `provincia_id`)
VALUES
  (4, 'Gran Valparaíso', 4);
INSERT INTO
  `localidades` (`id`, `nombre`, `provincia_id`)
VALUES
  (5, 'El Alto', 5);
INSERT INTO
  `localidades` (`id`, `nombre`, `provincia_id`)
VALUES
  (6, 'Tortuguitas', 1);
INSERT INTO
  `localidades` (`id`, `nombre`, `provincia_id`)
VALUES
  (7, 'Grand Bourg', 1);
INSERT INTO
  `localidades` (`id`, `nombre`, `provincia_id`)
VALUES
  (8, 'Los Polvorines', 1);
INSERT INTO
  `localidades` (`id`, `nombre`, `provincia_id`)
VALUES
  (9, 'San Miguel', 1);
INSERT INTO
  `localidades` (`id`, `nombre`, `provincia_id`)
VALUES
  (10, 'Jose C. Paz', 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: marcas_automotor
# ------------------------------------------------------------

INSERT INTO
  `marcas_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 'Ford', 0, NULL, NULL);
INSERT INTO
  `marcas_automotor` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 'Chevrolet', 0, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: marcas_producto
# ------------------------------------------------------------

INSERT INTO
  `marcas_producto` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 'Genérico', 0, NULL, NULL);
INSERT INTO
  `marcas_producto` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 'Gulf', 0, NULL, NULL);
INSERT INTO
  `marcas_producto` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (3, 'Elaion', 0, NULL, NULL);
INSERT INTO
  `marcas_producto` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (4, 'Bardahl', 0, NULL, NULL);
INSERT INTO
  `marcas_producto` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (5, 'Bosh', 0, NULL, NULL);
INSERT INTO
  `marcas_producto` (
    `id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (6, 'SKF', 0, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: medios_pago
# ------------------------------------------------------------

INSERT INTO
  `medios_pago` (`id`, `descripcion`, `eliminado`)
VALUES
  (1, 'Efectivo', 0);
INSERT INTO
  `medios_pago` (`id`, `descripcion`, `eliminado`)
VALUES
  (2, 'MercadoPago', 0);
INSERT INTO
  `medios_pago` (`id`, `descripcion`, `eliminado`)
VALUES
  (3, 'Tarjeta de Crédito', 0);
INSERT INTO
  `medios_pago` (`id`, `descripcion`, `eliminado`)
VALUES
  (4, 'Tarjeta de Débito', 0);
INSERT INTO
  `medios_pago` (`id`, `descripcion`, `eliminado`)
VALUES
  (5, 'Transferencia Bancaria', 0);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: modelos_automotor
# ------------------------------------------------------------

INSERT INTO
  `modelos_automotor` (
    `id`,
    `marca_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 1, 'Focus', 0, 1, NULL);
INSERT INTO
  `modelos_automotor` (
    `id`,
    `marca_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 2, 'Cruze', 0, 1, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ordenes_compra
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ordenes_compra_detalle
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ordenes_compra_observacion
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ordenes_trabajo
# ------------------------------------------------------------

INSERT INTO
  `ordenes_trabajo` (
    `id`,
    `nro_orden`,
    `factura_id`,
    `fecha_hora`,
    `cliente_id`,
    `automotor_id`,
    `estado`,
    `importe`,
    `bonificacion`,
    `fecha_minima_turno`,
    `cantidad_modulos`,
    `total`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    1,
    'OT00000001',
    NULL,
    '2020-12-01 00:19:40',
    3,
    2,
    'PENDIENTE',
    1000,
    NULL,
    '2020-12-01',
    1,
    1000,
    0,
    2,
    '2020-12-01 00:19:40'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ordenes_trabajo_observacion
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ordenes_trabajo_producto
# ------------------------------------------------------------

INSERT INTO
  `ordenes_trabajo_producto` (
    `id`,
    `orden_trabajo_id`,
    `servicio_id`,
    `item`,
    `producto_id`,
    `nro_lote`,
    `cantidad`,
    `importe`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 1, NULL, 0, 19, 1, 1, 500, 0, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ordenes_trabajo_servicio
# ------------------------------------------------------------

INSERT INTO
  `ordenes_trabajo_servicio` (
    `id`,
    `orden_trabajo_id`,
    `item`,
    `servicio_id`,
    `cantidad`,
    `importe`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 1, 0, 4, 1, 500, NULL, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: pagos_cliente
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: pagos_cliente_detalle
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: pagos_cliente_factura
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: pagos_proveedor
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: pagos_proveedor_detalle
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: paises
# ------------------------------------------------------------

INSERT INTO
  `paises` (`id`, `nombre`)
VALUES
  (1, 'Argentina');
INSERT INTO
  `paises` (`id`, `nombre`)
VALUES
  (2, 'Brasil');
INSERT INTO
  `paises` (`id`, `nombre`)
VALUES
  (3, 'Uruguay');
INSERT INTO
  `paises` (`id`, `nombre`)
VALUES
  (4, 'Chile');
INSERT INTO
  `paises` (`id`, `nombre`)
VALUES
  (5, 'Bolivia');
INSERT INTO
  `paises` (`id`, `nombre`)
VALUES
  (6, 'Paraguay');
INSERT INTO
  `paises` (`id`, `nombre`)
VALUES
  (7, 'Colombia');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: pedidos
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: pedidos_detalle
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: pedidos_observacion
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: productos
# ------------------------------------------------------------

INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    1,
    'B000001',
    4,
    4,
    'XTC SYNTETIC 10W40 5L',
    NULL,
    1500,
    2500,
    5,
    20,
    5,
    6,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    2,
    'B000002',
    4,
    6,
    'XTC SYNTETIC 5W30 5L',
    NULL,
    1700,
    2800,
    5,
    20,
    5,
    6,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    3,
    'B000003',
    4,
    7,
    'XTC SYNTETIC 20W40 5L',
    NULL,
    1300,
    2100,
    5,
    20,
    5,
    6,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    4,
    'B000004',
    4,
    5,
    'XTC SYNTETIC 20W50 5L',
    NULL,
    1100,
    2000,
    5,
    20,
    5,
    6,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    5,
    'B000005',
    4,
    15,
    'Liquido refrigerante 5L',
    NULL,
    200,
    300,
    5,
    20,
    5,
    6,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    6,
    'G000001',
    2,
    4,
    'MULTI-G 10W40 5L',
    NULL,
    1400,
    2400,
    5,
    20,
    5,
    4,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    7,
    'G000002',
    2,
    7,
    'MULTI-G 20W40 5L',
    NULL,
    1200,
    2000,
    5,
    20,
    5,
    4,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    8,
    'G000003',
    2,
    5,
    'MULTI-G 20W50 5L',
    NULL,
    1000,
    1800,
    5,
    20,
    5,
    4,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    9,
    'G000004',
    2,
    6,
    'MULTI-G 5W30 5L',
    NULL,
    1500,
    2500,
    5,
    20,
    5,
    4,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    10,
    'G000005',
    2,
    15,
    'Liquido refrigerante 5L',
    NULL,
    150,
    250,
    5,
    20,
    5,
    4,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    11,
    'E000001',
    3,
    4,
    'ELAION F50 10W40 5L',
    NULL,
    1600,
    2600,
    5,
    20,
    5,
    5,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    12,
    'E000002',
    3,
    7,
    'ELAION F50 20W40 5L',
    NULL,
    1400,
    2200,
    5,
    20,
    5,
    5,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    13,
    'E000003',
    3,
    5,
    'ELAION F50 20W50 5L',
    NULL,
    1200,
    2000,
    5,
    20,
    5,
    5,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    14,
    'E000004',
    3,
    6,
    'ELAION F50 5W30 5L',
    NULL,
    1700,
    2700,
    5,
    20,
    5,
    5,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    15,
    'E000005',
    3,
    15,
    'Liquido refrigerante 5L',
    NULL,
    250,
    350,
    5,
    20,
    5,
    5,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    16,
    'BSH000001',
    5,
    8,
    'Filtro de Aceite',
    NULL,
    500,
    950,
    5,
    20,
    5,
    2,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    17,
    'BSH000002',
    5,
    10,
    'Filtro de Nafta',
    NULL,
    700,
    1250,
    5,
    20,
    5,
    2,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    18,
    'BSH000003',
    5,
    9,
    'Filtro de Combustible Diesel',
    NULL,
    900,
    1450,
    5,
    20,
    5,
    2,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    19,
    'GEN000001',
    1,
    11,
    'Filtro de Aire',
    NULL,
    300,
    500,
    5,
    20,
    5,
    1,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    20,
    'GEN000002',
    1,
    12,
    'Filtro de Habitáculo',
    NULL,
    250,
    450,
    5,
    20,
    5,
    1,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    21,
    'SKF000001',
    6,
    13,
    'Correa de Distribución',
    NULL,
    300,
    500,
    5,
    20,
    5,
    3,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    22,
    'SKF000002',
    6,
    14,
    'Cadena de Distribución',
    NULL,
    250,
    450,
    5,
    20,
    5,
    3,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    23,
    'GEN000003',
    1,
    22,
    'Polarizado',
    NULL,
    500,
    1000,
    5,
    20,
    5,
    1,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    24,
    'GEN000004',
    1,
    23,
    'Llantas 15 Ford',
    NULL,
    5000,
    8000,
    5,
    20,
    5,
    1,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    25,
    'GEN000005',
    1,
    23,
    'Llantas 16 Ford',
    NULL,
    6000,
    9000,
    5,
    20,
    5,
    1,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    26,
    'GEN000006',
    1,
    23,
    'Llantas 17 Ford',
    NULL,
    7000,
    10000,
    5,
    20,
    5,
    1,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    27,
    'GEN000007',
    1,
    23,
    'Llantas 15 Chevrolet',
    NULL,
    5000,
    8000,
    5,
    20,
    5,
    1,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    28,
    'GEN000008',
    1,
    23,
    'Llantas 16 Chevrolet',
    NULL,
    6000,
    9000,
    5,
    20,
    5,
    1,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    29,
    'GEN000009',
    1,
    23,
    'Llantas 17 Chevrolet',
    NULL,
    7000,
    10000,
    5,
    20,
    5,
    1,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    30,
    'GEN000010',
    1,
    24,
    'Cristales Electricos',
    NULL,
    5000,
    8000,
    5,
    20,
    5,
    1,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    31,
    'GEN000011',
    1,
    25,
    'Cuero Sintético',
    NULL,
    5000,
    8000,
    5,
    20,
    5,
    1,
    0,
    1,
    NULL
  );
INSERT INTO
  `productos` (
    `id`,
    `codigo`,
    `marca_id`,
    `categoria_id`,
    `descripcion`,
    `detalle`,
    `costo`,
    `precio`,
    `stock_minimo`,
    `compra_minima`,
    `plazo_entrega`,
    `proveedor_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    32,
    'GEN000012',
    1,
    25,
    'Cuero Premium',
    NULL,
    7000,
    12000,
    5,
    20,
    5,
    1,
    0,
    1,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: productos_compatibilidad
# ------------------------------------------------------------

INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (1, 1, 1, NULL, NULL, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (2, 2, 2, NULL, NULL, 2011, 2014);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (3, 2, 2, NULL, NULL, 2015, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (4, 3, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (5, 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (6, 1, 1, NULL, NULL, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (7, 2, 2, NULL, NULL, 2011, 2014);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (8, 2, 2, NULL, NULL, 2015, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (9, 3, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (10, 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (11, 1, 1, NULL, NULL, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (12, 2, 2, NULL, NULL, 2011, 2014);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (13, 2, 2, NULL, NULL, 2015, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (14, 3, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (15, 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (17, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (18, NULL, NULL, NULL, 2, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (21, 1, NULL, NULL, 1, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (22, 2, NULL, NULL, 1, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (24, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (25, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (26, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (27, 2, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (28, 2, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `productos_compatibilidad` (
    `producto_id`,
    `marca_id`,
    `modelo_id`,
    `version_id`,
    `tipo_motor_id`,
    `anio_desde`,
    `anio_hasta`
  )
VALUES
  (29, 2, NULL, NULL, NULL, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: productos_inventario
# ------------------------------------------------------------

INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 1, 20, 5, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 2, 40, 0, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 3, 40, 0, '2023-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 1, 20, 5, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (3, 1, 10, 5, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (3, 2, 20, 0, '2023-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (4, 1, 2, 2, '2021-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (4, 2, 20, 0, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (5, 1, 10, 6, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (5, 2, 20, 0, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (6, 1, 3, 1, '2021-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (6, 2, 20, 0, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (7, 1, 20, 5, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (8, 1, 15, 4, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (9, 1, 3, 3, '2021-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (10, 1, 8, 3, '2021-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (10, 2, 20, 0, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (11, 1, 2, 2, '2021-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (11, 2, 20, 0, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (12, 1, 10, 6, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (12, 2, 0, 0, '2023-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (13, 1, 5, 4, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (14, 1, 2, 1, '2021-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (15, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (16, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (17, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (18, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (19, 1, 20, 4, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (20, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (21, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (22, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (23, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (24, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (25, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (26, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (27, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (28, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (29, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (30, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (31, 1, 20, 3, '2022-01-01', 0, NULL, NULL);
INSERT INTO
  `productos_inventario` (
    `producto_id`,
    `nro_lote`,
    `stock`,
    `reservado`,
    `fecha_vencimiento`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (32, 1, 20, 3, '2022-01-01', 0, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: proveedores
# ------------------------------------------------------------

INSERT INTO
  `proveedores` (
    `id`,
    `nro_proveedor`,
    `nombres`,
    `apellidos`,
    `genero`,
    `persona_fisica`,
    `razon_social`,
    `tipo_documento_id`,
    `documento`,
    `condicion_iva_id`,
    `fecha_nacimiento`,
    `telefono`,
    `email`,
    `calle`,
    `altura`,
    `piso`,
    `dpto`,
    `localidad_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    1,
    'P00000001',
    'Esteban',
    'Gomez',
    'M',
    '1',
    'FILTROS GOMEZ',
    1,
    '27123852',
    2,
    '1980-11-03',
    '11-1188-9910',
    'esteban_gomez@gmail.com',
    'Muños',
    3556,
    NULL,
    NULL,
    8,
    0,
    1,
    NULL
  );
INSERT INTO
  `proveedores` (
    `id`,
    `nro_proveedor`,
    `nombres`,
    `apellidos`,
    `genero`,
    `persona_fisica`,
    `razon_social`,
    `tipo_documento_id`,
    `documento`,
    `condicion_iva_id`,
    `fecha_nacimiento`,
    `telefono`,
    `email`,
    `calle`,
    `altura`,
    `piso`,
    `dpto`,
    `localidad_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    2,
    'P00000002',
    NULL,
    NULL,
    NULL,
    '0',
    'Bosh',
    5,
    '30141238526',
    1,
    NULL,
    '11-1188-9910',
    'ventas@boshsa.com',
    'Rivadavia',
    356,
    NULL,
    NULL,
    8,
    0,
    2,
    NULL
  );
INSERT INTO
  `proveedores` (
    `id`,
    `nro_proveedor`,
    `nombres`,
    `apellidos`,
    `genero`,
    `persona_fisica`,
    `razon_social`,
    `tipo_documento_id`,
    `documento`,
    `condicion_iva_id`,
    `fecha_nacimiento`,
    `telefono`,
    `email`,
    `calle`,
    `altura`,
    `piso`,
    `dpto`,
    `localidad_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    3,
    'P00000003',
    NULL,
    NULL,
    NULL,
    '0',
    'SKF',
    5,
    '30211338598',
    1,
    NULL,
    '11-5598-8341',
    'ventas@skf.com',
    'Panamericana',
    40356,
    NULL,
    NULL,
    6,
    0,
    1,
    NULL
  );
INSERT INTO
  `proveedores` (
    `id`,
    `nro_proveedor`,
    `nombres`,
    `apellidos`,
    `genero`,
    `persona_fisica`,
    `razon_social`,
    `tipo_documento_id`,
    `documento`,
    `condicion_iva_id`,
    `fecha_nacimiento`,
    `telefono`,
    `email`,
    `calle`,
    `altura`,
    `piso`,
    `dpto`,
    `localidad_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    4,
    'P00000004',
    NULL,
    NULL,
    NULL,
    '0',
    'Gulf',
    5,
    '30181247953',
    1,
    NULL,
    '11-9571-3589',
    'ventas@gulf.com',
    'Av. Eva Perón',
    1754,
    NULL,
    NULL,
    7,
    0,
    1,
    NULL
  );
INSERT INTO
  `proveedores` (
    `id`,
    `nro_proveedor`,
    `nombres`,
    `apellidos`,
    `genero`,
    `persona_fisica`,
    `razon_social`,
    `tipo_documento_id`,
    `documento`,
    `condicion_iva_id`,
    `fecha_nacimiento`,
    `telefono`,
    `email`,
    `calle`,
    `altura`,
    `piso`,
    `dpto`,
    `localidad_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    5,
    'P00000005',
    NULL,
    NULL,
    NULL,
    '0',
    'Elaión',
    5,
    '30197513647',
    1,
    NULL,
    '11-3842-8741',
    'ventas@elaion.com',
    'Rivadavia',
    356,
    NULL,
    NULL,
    8,
    0,
    2,
    NULL
  );
INSERT INTO
  `proveedores` (
    `id`,
    `nro_proveedor`,
    `nombres`,
    `apellidos`,
    `genero`,
    `persona_fisica`,
    `razon_social`,
    `tipo_documento_id`,
    `documento`,
    `condicion_iva_id`,
    `fecha_nacimiento`,
    `telefono`,
    `email`,
    `calle`,
    `altura`,
    `piso`,
    `dpto`,
    `localidad_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    6,
    'P00000006',
    NULL,
    NULL,
    NULL,
    '0',
    'Bardahl',
    5,
    '30187521698',
    1,
    NULL,
    '11-3657-8547',
    'ventas@bardahl.com',
    'Rivadavia',
    356,
    NULL,
    NULL,
    8,
    0,
    1,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: provincias
# ------------------------------------------------------------

INSERT INTO
  `provincias` (`id`, `nombre`, `pais_id`)
VALUES
  (1, 'Buenos Aires', 1);
INSERT INTO
  `provincias` (`id`, `nombre`, `pais_id`)
VALUES
  (2, 'Brasilia', 2);
INSERT INTO
  `provincias` (`id`, `nombre`, `pais_id`)
VALUES
  (3, 'Montevideo', 3);
INSERT INTO
  `provincias` (`id`, `nombre`, `pais_id`)
VALUES
  (4, 'Santiago de Chile', 4);
INSERT INTO
  `provincias` (`id`, `nombre`, `pais_id`)
VALUES
  (5, 'La Paz', 5);
INSERT INTO
  `provincias` (`id`, `nombre`, `pais_id`)
VALUES
  (6, 'Asuncion', 6);
INSERT INTO
  `provincias` (`id`, `nombre`, `pais_id`)
VALUES
  (7, 'Bogota', 7);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: remito_detalle
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: remitos
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: roles
# ------------------------------------------------------------

INSERT INTO
  `roles` (`id`, `descripcion`)
VALUES
  (1, 'Administrador');
INSERT INTO
  `roles` (`id`, `descripcion`)
VALUES
  (2, 'Usuario');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: servicios
# ------------------------------------------------------------

INSERT INTO
  `servicios` (
    `id`,
    `categoria_id`,
    `codigo`,
    `descripcion`,
    `precio`,
    `cantidad_modulos`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    1,
    1,
    'S0001',
    'Cambio de Aceite',
    2000,
    0.33,
    0,
    1,
    NULL
  );
INSERT INTO
  `servicios` (
    `id`,
    `categoria_id`,
    `codigo`,
    `descripcion`,
    `precio`,
    `cantidad_modulos`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    2,
    1,
    'S0002',
    'Cambio de Filtro de Aceite',
    800,
    0.33,
    0,
    2,
    NULL
  );
INSERT INTO
  `servicios` (
    `id`,
    `categoria_id`,
    `codigo`,
    `descripcion`,
    `precio`,
    `cantidad_modulos`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    3,
    1,
    'S0003',
    'Cambio de Filtro de Combustible',
    500,
    0.33,
    0,
    1,
    NULL
  );
INSERT INTO
  `servicios` (
    `id`,
    `categoria_id`,
    `codigo`,
    `descripcion`,
    `precio`,
    `cantidad_modulos`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    4,
    1,
    'S0004',
    'Cambio de Filtro de Aire',
    500,
    0.33,
    0,
    1,
    NULL
  );
INSERT INTO
  `servicios` (
    `id`,
    `categoria_id`,
    `codigo`,
    `descripcion`,
    `precio`,
    `cantidad_modulos`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    5,
    1,
    'S0005',
    'Cambio de Filtro de Habitáculo',
    300,
    0.33,
    0,
    2,
    NULL
  );
INSERT INTO
  `servicios` (
    `id`,
    `categoria_id`,
    `codigo`,
    `descripcion`,
    `precio`,
    `cantidad_modulos`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (6, 2, 'S0006', 'Distribución', 3000, 0.33, 0, 1, NULL);
INSERT INTO
  `servicios` (
    `id`,
    `categoria_id`,
    `codigo`,
    `descripcion`,
    `precio`,
    `cantidad_modulos`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    7,
    2,
    'S0007',
    'Cambio de Bugías',
    5000,
    0.33,
    0,
    1,
    NULL
  );
INSERT INTO
  `servicios` (
    `id`,
    `categoria_id`,
    `codigo`,
    `descripcion`,
    `precio`,
    `cantidad_modulos`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    8,
    1,
    'S0008',
    'Cambio de Liquido Refrigerante',
    700,
    0.33,
    0,
    1,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: servicios_productos_categoria
# ------------------------------------------------------------

INSERT INTO
  `servicios_productos_categoria` (
    `servicio_id`,
    `categ_prod_id`,
    `cantidad`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 1, 1, 0, NULL, NULL);
INSERT INTO
  `servicios_productos_categoria` (
    `servicio_id`,
    `categ_prod_id`,
    `cantidad`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 8, 1, 0, NULL, NULL);
INSERT INTO
  `servicios_productos_categoria` (
    `servicio_id`,
    `categ_prod_id`,
    `cantidad`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (3, 9, 1, 0, NULL, NULL);
INSERT INTO
  `servicios_productos_categoria` (
    `servicio_id`,
    `categ_prod_id`,
    `cantidad`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (3, 10, 1, 0, NULL, NULL);
INSERT INTO
  `servicios_productos_categoria` (
    `servicio_id`,
    `categ_prod_id`,
    `cantidad`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (4, 11, 1, 0, NULL, NULL);
INSERT INTO
  `servicios_productos_categoria` (
    `servicio_id`,
    `categ_prod_id`,
    `cantidad`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (5, 12, 1, 0, NULL, NULL);
INSERT INTO
  `servicios_productos_categoria` (
    `servicio_id`,
    `categ_prod_id`,
    `cantidad`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (6, 3, 1, 0, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sistema
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sucursales
# ------------------------------------------------------------

INSERT INTO
  `sucursales` (
    `id`,
    `nombre`,
    `calle`,
    `altura`,
    `localidad_id`,
    `cant_mecanicos`
  )
VALUES
  (1, 'Car Two José C. Paz', 'Zuviria', 4500, 10, 2);
INSERT INTO
  `sucursales` (
    `id`,
    `nombre`,
    `calle`,
    `altura`,
    `localidad_id`,
    `cant_mecanicos`
  )
VALUES
  (2, 'Car Two San Miguel', 'Paunero', 382, 9, 3);
INSERT INTO
  `sucursales` (
    `id`,
    `nombre`,
    `calle`,
    `altura`,
    `localidad_id`,
    `cant_mecanicos`
  )
VALUES
  (3, 'Car Two Polvorines', 'San Marín', 3230, 8, 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tipos_documento
# ------------------------------------------------------------

INSERT INTO
  `tipos_documento` (`id`, `descripcion`)
VALUES
  (1, 'DNI');
INSERT INTO
  `tipos_documento` (`id`, `descripcion`)
VALUES
  (2, 'LE');
INSERT INTO
  `tipos_documento` (`id`, `descripcion`)
VALUES
  (3, 'LC');
INSERT INTO
  `tipos_documento` (`id`, `descripcion`)
VALUES
  (4, 'CUIL');
INSERT INTO
  `tipos_documento` (`id`, `descripcion`)
VALUES
  (5, 'CUIT');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tipos_motor
# ------------------------------------------------------------

INSERT INTO
  `tipos_motor` (`id`, `descripcion`, `eliminado`)
VALUES
  (1, 'Nafta', 0);
INSERT INTO
  `tipos_motor` (`id`, `descripcion`, `eliminado`)
VALUES
  (2, 'Diesel', 0);
INSERT INTO
  `tipos_motor` (`id`, `descripcion`, `eliminado`)
VALUES
  (3, 'Electrico', 0);
INSERT INTO
  `tipos_motor` (`id`, `descripcion`, `eliminado`)
VALUES
  (4, 'Híbriro', 0);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tipos_transmision
# ------------------------------------------------------------

INSERT INTO
  `tipos_transmision` (`id`, `descripcion`, `eliminado`)
VALUES
  (1, 'Manual', 0);
INSERT INTO
  `tipos_transmision` (`id`, `descripcion`, `eliminado`)
VALUES
  (2, 'Automática', 0);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: turnos
# ------------------------------------------------------------

INSERT INTO
  `turnos` (
    `id`,
    `descripcion`,
    `fecha_hora`,
    `fecha`,
    `modulo`,
    `cantidad_modulos`,
    `cliente_id`,
    `orden_trabajo_id`,
    `nro_orden`,
    `sucursal_id`,
    `mecanico`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (
    1,
    NULL,
    '2020-12-01 00:19:55',
    '2020-12-01',
    9,
    1,
    NULL,
    1,
    'OT00000001',
    1,
    'mecanico_1',
    0,
    NULL,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

INSERT INTO
  `usuarios` (
    `id`,
    `dni`,
    `usuario`,
    `password_hash`,
    `nombre`,
    `email`,
    `estado`,
    `sucursal_id`
  )
VALUES
  (
    1,
    1,
    'admin',
    '$2b$10$yfZf/s89GqTvgrakYuXyN.CYvomo.upFkQh43tuZHH9gSVYpJTNe.',
    'Administrador',
    'admin@car-two.com.ar',
    'Activo',
    1
  );
INSERT INTO
  `usuarios` (
    `id`,
    `dni`,
    `usuario`,
    `password_hash`,
    `nombre`,
    `email`,
    `estado`,
    `sucursal_id`
  )
VALUES
  (
    2,
    2,
    'user',
    '$2b$10$zrudw7rEYFVNUXI.7optIe41b.8YyjXMEokc9tcd2VLj4k3Dn5VFa',
    'Usuario',
    'user@car-two.com.ar',
    'Activo',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuarios_roles
# ------------------------------------------------------------

INSERT INTO
  `usuarios_roles` (`usuario_id`, `rol_id`)
VALUES
  (1, 1);
INSERT INTO
  `usuarios_roles` (`usuario_id`, `rol_id`)
VALUES
  (2, 2);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: versiones_automotor
# ------------------------------------------------------------

INSERT INTO
  `versiones_automotor` (
    `id`,
    `modelo_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 1, 'SE - 4 Puertas Manual', 0, NULL, NULL);
INSERT INTO
  `versiones_automotor` (
    `id`,
    `modelo_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 1, 'SE - 4 Puertas Automático', 0, NULL, NULL);
INSERT INTO
  `versiones_automotor` (
    `id`,
    `modelo_id`,
    `descripcion`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (3, 2, 'LTZ - 5  Puertas Automático', 0, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: versiones_config_equipamiento
# ------------------------------------------------------------

INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 1, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 2, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 3, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 4, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 5, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 6, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 7, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 8, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 9, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 10, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 11, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 1, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 2, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 3, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 4, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 5, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 6, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 7, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 8, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 9, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 10, 0, NULL, NULL);
INSERT INTO
  `versiones_config_equipamiento` (
    `version_config_id`,
    `equipamiento_id`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 11, 0, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: versiones_configuracion
# ------------------------------------------------------------

INSERT INTO
  `versiones_configuracion` (
    `id`,
    `version_id`,
    `carroceria_id`,
    `puertas`,
    `tipo_motor_id`,
    `cilindrada`,
    `turbo`,
    `hp`,
    `transmision_id`,
    `color_id`,
    `plazo_entrega_0km`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (1, 1, 1, 5, 1, '2.0', '0', 170, 1, 3, 90, 0, NULL, NULL);
INSERT INTO
  `versiones_configuracion` (
    `id`,
    `version_id`,
    `carroceria_id`,
    `puertas`,
    `tipo_motor_id`,
    `cilindrada`,
    `turbo`,
    `hp`,
    `transmision_id`,
    `color_id`,
    `plazo_entrega_0km`,
    `eliminado`,
    `usuario_id`,
    `fecha_modificacion`
  )
VALUES
  (2, 3, 2, 4, 2, '2.0', '1', 140, 2, 5, 15, 0, NULL, NULL);

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
