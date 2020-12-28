import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const productosService = {
    buscarProductos,
    buscarMarcas,
    buscarCategorias,
    buscarProveedores,
    insertarProducto,
    editarProducto,
    eliminarProducto,
    insertarCategoria
};
function insertarCategoria(id, categoria) {
    return Axios.post(`${config.apiUrl}/productos/insertarCategoria`, {id:id, categoria:categoria}, {headers: authHeader()}).then(handleResponse); 
}


function buscarProductos(filtro) {
    return Axios.put(`${config.apiUrl}/productos/get`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse); 
}

function buscarMarcas() {
    return Axios.put(`${config.apiUrl}/marcas_producto/get`,{}, {headers: authHeader()}).then(handleResponse); 
}

function buscarCategorias() {
    return Axios.put(`${config.apiUrl}/categorias_producto/get`,{}, {headers: authHeader()}).then(handleResponse); 
}

function buscarProveedores() {
    return Axios.put(`${config.apiUrl}/proveedores_producto/get`,{}, {headers: authHeader()}).then(handleResponse); 
}

function insertarProducto(id, marca_id, categoria_id, producto_descripcion,  producto_detalle, producto_precio, producto_costo, producto_stock_minimo, producto_compra_minima, producto_plazo_entrega, proveedor_id) {
    
    return Axios.post(`${config.apiUrl}/productos/insertar`, {id:id, marca_id:marca_id, categoria_id:categoria_id, producto_descripcion:producto_descripcion, producto_detalle:producto_detalle,  producto_precio:producto_precio, producto_costo:producto_costo, producto_stock_minimo:producto_stock_minimo, producto_compra_minima:producto_compra_minima, producto_plazo_entrega:producto_plazo_entrega, proveedor_id:proveedor_id}, {headers: authHeader()}).then(handleResponse); 
}

function editarProducto(usuario_id, producto_id, marca_id, categoria_id, producto_descripcion, producto_detalle, producto_precio, producto_costo, producto_stock_minimo, producto_compra_minima, producto_plazo_entrega, proveedor_id) {
    
    return Axios.post(`${config.apiUrl}/productos/editar`, {usuario_id:usuario_id, producto_id:producto_id, marca_id:marca_id, categoria_id:categoria_id, producto_descripcion:producto_descripcion, producto_detalle:producto_detalle,  producto_precio:producto_precio, producto_costo:producto_costo, producto_stock_minimo:producto_stock_minimo, producto_compra_minima:producto_compra_minima, producto_plazo_entrega:producto_plazo_entrega, proveedor_id:proveedor_id}, {headers: authHeader()}).then(handleResponse); 
}

function eliminarProducto(id) {
    return Axios.post(`${config.apiUrl}/producto/eliminar`, {id:id}, {headers: authHeader()}).then(handleResponse); 
}