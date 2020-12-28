insert into categorias_servicio(descripcion)values('Service');
insert into categorias_servicio(descripcion)values('Mecánica Ligera');
insert into categorias_servicio(descripcion)values('Mecánica');

insert into servicios(categoria_id, codigo, descripcion, precio, cantidad_modulos, usuario_id)values((select id from categorias_servicio where descripcion = 'Service'), 'S0001', 'Cambio de Aceite', 2000, 0.33,1);
insert into servicios(categoria_id, codigo, descripcion, precio, cantidad_modulos, usuario_id)values((select id from categorias_servicio where descripcion = 'Service'), 'S0002', 'Cambio de Filtro de Aceite', 800, 0.33,2);
insert into servicios(categoria_id, codigo, descripcion, precio, cantidad_modulos, usuario_id)values((select id from categorias_servicio where descripcion = 'Service'), 'S0003', 'Cambio de Filtro de Combustible', 500, 0.33,1);
insert into servicios(categoria_id, codigo, descripcion, precio, cantidad_modulos, usuario_id)values((select id from categorias_servicio where descripcion = 'Service'), 'S0004', 'Cambio de Filtro de Aire', 500, 0.33,1);
insert into servicios(categoria_id, codigo, descripcion, precio, cantidad_modulos, usuario_id)values((select id from categorias_servicio where descripcion = 'Service'), 'S0005', 'Cambio de Filtro de Habitáculo', 300, 0.33,2);
insert into servicios(categoria_id, codigo, descripcion, precio, cantidad_modulos, usuario_id)values((select id from categorias_servicio where descripcion = 'Mecánica Ligera'), 'S0006', 'Distribución', 3000, 0.33,1);
insert into servicios(categoria_id, codigo, descripcion, precio, cantidad_modulos, usuario_id)values((select id from categorias_servicio where descripcion = 'Mecánica Ligera'), 'S0007', 'Cambio de Bugías', 5000, 0.33,1);
insert into servicios(categoria_id, codigo, descripcion, precio, cantidad_modulos, usuario_id)values((select id from categorias_servicio where descripcion = 'Service'), 'S0008', 'Cambio de Liquido Refrigerante', 700, 0.33,1);

insert into servicios_productos_categoria(servicio_id, categ_prod_id)
values((select id from servicios where descripcion = 'Cambio de Aceite'), (select id from categorias_producto where descripcion = 'Lubricantes'));
insert into servicios_productos_categoria(servicio_id, categ_prod_id)
values((select id from servicios where descripcion = 'Cambio de Filtro de Aceite'), (select id from categorias_producto where descripcion = 'Filtro de Aceite'));
insert into servicios_productos_categoria(servicio_id, categ_prod_id)
values((select id from servicios where descripcion = 'Cambio de Filtro de Combustible'), (select id from categorias_producto where descripcion = 'Filtro de Combustible Diesel'));
insert into servicios_productos_categoria(servicio_id, categ_prod_id)
values((select id from servicios where descripcion = 'Cambio de Filtro de Combustible'), (select id from categorias_producto where descripcion = 'Filtro de Combustible Nafta'));
insert into servicios_productos_categoria(servicio_id, categ_prod_id)
values((select id from servicios where descripcion = 'Cambio de Filtro de Aire'), (select id from categorias_producto where descripcion = 'Filtro de Aire'));
insert into servicios_productos_categoria(servicio_id, categ_prod_id)
values((select id from servicios where descripcion = 'Cambio de Filtro de Habitáculo'), (select id from categorias_producto where descripcion = 'Filtro de Habitáculo'));
insert into servicios_productos_categoria(servicio_id, categ_prod_id)
values((select id from servicios where descripcion = 'Distribución'), (select id from categorias_producto where descripcion = 'Distribución'));
insert into servicios_productos_categoria(servicio_id, categ_prod_id)
values((select id from servicios where descripcion = 'Cambio de Bugías'), (select id from categorias_producto where descripcion = 'Bugías'));