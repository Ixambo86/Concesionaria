insert into marcas_producto(descripcion)values('Genérico');
insert into marcas_producto(descripcion)values('Gulf');
insert into marcas_producto(descripcion)values('Elaion');
insert into marcas_producto(descripcion)values('Bardahl');
insert into marcas_producto(descripcion)values('Bosh');
insert into marcas_producto(descripcion)values('SKF');

insert into categorias_producto(descripcion)values('Lubricantes');
insert into categorias_producto(descripcion)values('Filtros');
insert into categorias_producto(descripcion)values('Distribución');
insert into categorias_producto(padre_id, descripcion)values(1, 'Aceite 10w40');
insert into categorias_producto(padre_id, descripcion)values(1, 'Aceite 20w50');
insert into categorias_producto(padre_id, descripcion)values(1, 'Aceite 5w30');
insert into categorias_producto(padre_id, descripcion)values(1, 'Aceite 20w40');
insert into categorias_producto(descripcion)values('Filtro de Aceite');
insert into categorias_producto(descripcion)values('Filtro de Combustible Diesel');
insert into categorias_producto(descripcion)values('Filtro de Combustible Nafta');
insert into categorias_producto(descripcion)values('Filtro de Aire');
insert into categorias_producto(descripcion)values('Filtro de Habitáculo');
insert into categorias_producto(padre_id, descripcion)values(3, 'Correa de Distribución');
insert into categorias_producto(padre_id, descripcion)values(3, 'Cadena de Distribución');
insert into categorias_producto(descripcion)values('Liquido refrigerante');
insert into categorias_producto(descripcion)values('Bugías');
insert into categorias_producto(padre_id, descripcion)values(15, 'Liquido refrigerante');
insert into categorias_producto(padre_id, descripcion)values(16, 'Bugías Nafta');
insert into categorias_producto(padre_id, descripcion)values(16, 'Bugías Diesel');
insert into categorias_producto(descripcion)values('Adicionales');
insert into categorias_producto(padre_id, descripcion)values(20, 'Polarizado');
insert into categorias_producto(padre_id, descripcion)values(20, 'Llantas');
insert into categorias_producto(padre_id, descripcion)values(20, 'Cristales Electricos');
insert into categorias_producto(padre_id, descripcion)values(20, 'Cuero');

insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('B000001', (select id from marcas_producto where descripcion = 'Bardahl'), 
		(select id from categorias_producto where descripcion = 'Aceite 10w40'), 'XTC SYNTETIC 10W40 5L', 1500, 2500, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Bardahl'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('B000002', (select id from marcas_producto where descripcion = 'Bardahl'), 
		(select id from categorias_producto where descripcion = 'Aceite 5w30'), 'XTC SYNTETIC 5W30 5L', 1700, 2800, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Bardahl'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('B000003', (select id from marcas_producto where descripcion = 'Bardahl'), 
		(select id from categorias_producto where descripcion = 'Aceite 20w40'), 'XTC SYNTETIC 20W40 5L', 1300, 2100, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Bardahl'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('B000004', (select id from marcas_producto where descripcion = 'Bardahl'), 
		(select id from categorias_producto where descripcion = 'Aceite 20w50'), 'XTC SYNTETIC 20W50 5L', 1100, 2000, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Bardahl'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('B000005', (select id from marcas_producto where descripcion = 'Bardahl'), 
		(15), 'Liquido refrigerante 5L', 200, 300, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Bardahl'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('G000001', (select id from marcas_producto where descripcion = 'Gulf'), 
		(select id from categorias_producto where descripcion = 'Aceite 10w40'), 'MULTI-G 10W40 5L', 1400, 2400, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Gulf'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('G000002', (select id from marcas_producto where descripcion = 'Gulf'), 
		(select id from categorias_producto where descripcion = 'Aceite 20w40'), 'MULTI-G 20W40 5L', 1200, 2000, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Gulf'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('G000003', (select id from marcas_producto where descripcion = 'Gulf'), 
		(select id from categorias_producto where descripcion = 'Aceite 20w50'), 'MULTI-G 20W50 5L', 1000, 1800, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Gulf'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('G000004', (select id from marcas_producto where descripcion = 'Gulf'), 
		(select id from categorias_producto where descripcion = 'Aceite 5w30'), 'MULTI-G 5W30 5L', 1500, 2500, 5, 20, 5, 
		(select id from proveedores where razon_social = 'Gulf'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('G000005', (select id from marcas_producto where descripcion = 'Gulf'), 
		(15), 'Liquido refrigerante 5L', 150, 250, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Gulf'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('E000001', (select id from marcas_producto where descripcion = 'Elaion'), 
		(select id from categorias_producto where descripcion = 'Aceite 10w40'), 'ELAION F50 10W40 5L', 1600, 2600, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Elaion'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('E000002', (select id from marcas_producto where descripcion = 'Elaion'), 
		(select id from categorias_producto where descripcion = 'Aceite 20w40'), 'ELAION F50 20W40 5L', 1400, 2200, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Elaion'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('E000003', (select id from marcas_producto where descripcion = 'Elaion'), 
		(select id from categorias_producto where descripcion = 'Aceite 20w50'), 'ELAION F50 20W50 5L', 1200, 2000, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Elaion'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('E000004', (select id from marcas_producto where descripcion = 'Elaion'), 
		(select id from categorias_producto where descripcion = 'Aceite 5w30'), 'ELAION F50 5W30 5L', 1700, 2700, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Elaion'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('E000005', (select id from marcas_producto where descripcion = 'Elaion'), 
		(15), 'Liquido refrigerante 5L', 250, 350, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Elaion'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('BSH000001', (select id from marcas_producto where descripcion = 'Bosh'), 
		(select id from categorias_producto where descripcion = 'Filtro de Aceite'), 'Filtro de Aceite', 500, 950, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Bosh'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('BSH000002', (select id from marcas_producto where descripcion = 'Bosh'), 
		(select id from categorias_producto where descripcion = 'Filtro de Combustible Nafta'), 'Filtro de Nafta', 700, 1250, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Bosh'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('BSH000003', (select id from marcas_producto where descripcion = 'Bosh'), 
		(select id from categorias_producto where descripcion = 'Filtro de Combustible Diesel'), 'Filtro de Combustible Diesel', 900, 1450, 5, 20, 5, 
        (select id from proveedores where razon_social = 'Bosh'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('GEN000001', (select id from marcas_producto where descripcion = 'Genérico'), 
		(select id from categorias_producto where descripcion = 'Filtro de Aire'), 'Filtro de Aire', 300, 500, 5, 20, 5, 
        (select id from proveedores where razon_social = 'FILTROS GOMEZ'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('GEN000002', (select id from marcas_producto where descripcion = 'Genérico'), 
		(select id from categorias_producto where descripcion = 'Filtro de Habitáculo'), 'Filtro de Habitáculo', 250, 450, 5, 20, 5, 
        (select id from proveedores where razon_social = 'FILTROS GOMEZ'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('SKF000001', (select id from marcas_producto where descripcion = 'SKF'), 
		(select id from categorias_producto where descripcion = 'Correa de Distribución'), 'Correa de Distribución', 300, 500, 5, 20, 5, 
        (select id from proveedores where razon_social = 'SKF'), 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('SKF000002', (select id from marcas_producto where descripcion = 'SKF'), 
		(select id from categorias_producto where descripcion = 'Cadena de Distribución'), 'Cadena de Distribución', 250, 450, 5, 20, 5, 
        (select id from proveedores where razon_social = 'SKF'), 1);
        
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('GEN000003', 1, (select id from categorias_producto where descripcion = 'Polarizado'), 'Polarizado', 500, 1000, 5, 20, 5, 1, 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('GEN000004', 1, (select id from categorias_producto where descripcion = 'Llantas'), 'Llantas 15 Ford', 5000, 8000, 5, 20, 5, 1, 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('GEN000005', 1, (select id from categorias_producto where descripcion = 'Llantas'), 'Llantas 16 Ford', 6000, 9000, 5, 20, 5, 1, 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('GEN000006', 1, (select id from categorias_producto where descripcion = 'Llantas'), 'Llantas 17 Ford', 7000, 10000, 5, 20, 5, 1, 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('GEN000007', 1, (select id from categorias_producto where descripcion = 'Llantas'), 'Llantas 15 Chevrolet', 5000, 8000, 5, 20, 5, 1, 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('GEN000008', 1, (select id from categorias_producto where descripcion = 'Llantas'), 'Llantas 16 Chevrolet', 6000, 9000, 5, 20, 5, 1, 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('GEN000009', 1, (select id from categorias_producto where descripcion = 'Llantas'), 'Llantas 17 Chevrolet', 7000, 10000, 5, 20, 5, 1, 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('GEN000010', 1, (select id from categorias_producto where descripcion = 'Cristales Electricos'), 'Cristales Electricos', 5000, 8000, 5, 20, 5, 1, 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('GEN000011', 1, (select id from categorias_producto where descripcion = 'Cuero'), 'Cuero Sintético', 5000, 8000, 5, 20, 5, 1, 1);
insert into productos(codigo, marca_id, categoria_id, descripcion, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, usuario_id)
values('GEN000012', 1, (select id from categorias_producto where descripcion = 'Cuero'), 'Cuero Premium', 7000, 12000, 5, 20, 5, 1, 1); 
