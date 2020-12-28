insert into condiciones_iva(descripcion, tipo_factura)values("Responsable Inscripto", "A");
insert into condiciones_iva(descripcion, tipo_factura)values("Monotributista", "B");
insert into condiciones_iva(descripcion, tipo_factura)values("Consumidor Final", "B");
insert into condiciones_iva(descripcion, tipo_factura)values("Excento", "E");

insert into tipos_documento(descripcion)values('DNI');
insert into tipos_documento(descripcion)values('LE');
insert into tipos_documento(descripcion)values('LC');
insert into tipos_documento(descripcion)values('CUIL');
insert into tipos_documento(descripcion)values('CUIT');

insert into clientes(nro_cliente, nombres, apellidos, genero, persona_fisica, razon_social, tipo_documento_id, documento, condicion_iva_id, fecha_nacimiento, telefono, email, calle, altura, localidad_id, pais_id, provincia_id, usuario_id)
values('C000000001', 'Pedro', 'Duarte', 'Masculino', 1, 'Mi Empresa', (select id from tipos_documento where descripcion='DNI'), '35147981', 1, '1991-02-18', '11-3344-5566', 'pedro_duarte@gmail.com', 
		'Los Patos', 1556, (select id from localidades where nombre = 'Grand Bourg'),1,1,1);
insert into clientes(nro_cliente, nombres, apellidos, genero, persona_fisica, razon_social, tipo_documento_id, documento, condicion_iva_id, fecha_nacimiento, telefono, email, calle, altura, piso, dpto, localidad_id, pais_id, provincia_id, usuario_id)
values('C000000002', 'Juana', 'Gimenez', 'Femenino', 1, '', (select id from tipos_documento where descripcion='DNI'), '28123852', 2, '1982-12-08', '11-7788-9900', 'juanagimenez@gmail.com', 
		'Muñoz', 2556, '3', 'B', (select id from localidades where nombre = 'San Miguel'),1,1,1);
insert into clientes(nro_cliente, nombres, apellidos, genero, persona_fisica, razon_social, tipo_documento_id, documento, condicion_iva_id, fecha_nacimiento, telefono, email, calle, altura, localidad_id, pais_id, provincia_id, usuario_id)
values('C000000003', 'Jorge', 'Juarez', 'Masculino', 1, '', (select id from tipos_documento where descripcion='DNI'), '35123656', 3, '1990-08-04', '11-1122-3344', 'jorgejuarez@gmail.com', 
		'El callao', 3809, (select id from localidades where nombre = 'Tortuguitas'),1,1,1);
insert into clientes(nro_cliente, nombres, apellidos, genero, persona_fisica, razon_social, tipo_documento_id, documento, condicion_iva_id, fecha_nacimiento, telefono, email, calle, altura, localidad_id, pais_id, provincia_id, usuario_id)
values('C000000004', 'Sabrina', 'Pomez', 'Femenino', 1, 'ONG', (select id from tipos_documento where descripcion='DNI'), '26128542', 4, '1979-02-17', '11-2233-4455', 'sabrinapomez@gmail.com', 
		'Muñoz', 2556, (select id from localidades where nombre = 'Jose C. Paz'),1,1,1); 

insert into proveedores(nro_proveedor, nombres, apellidos, genero, persona_fisica, razon_social, tipo_documento_id, documento, condicion_iva_id, fecha_nacimiento, telefono, email, calle, altura,piso, localidad_id, provincia_id, pais_id, eliminado, usuario_id)
values('P00000001', 'Esteban', 'Gomez', 'M', 1, 'FILTROS GOMEZ', (select id from tipos_documento where descripcion='DNI'), '30141238578', 2, '1980-11-03', '11-1188-9910', 'esteban_gomez@gmail.com', 
		'Frias', 3556,0, (select id from localidades where nombre = 'Los Polvorines'),1,1, 0, 1);
insert into proveedores(nro_proveedor, persona_fisica, razon_social, tipo_documento_id, documento, condicion_iva_id, telefono, email, calle, altura,piso, localidad_id,  provincia_id, pais_id, eliminado, usuario_id)
values('P00000002', 0, 'Bosh', (select id from tipos_documento where descripcion='CUIT'), '30141238526', 1, '11-1188-9910', 'ventas@boshsa.com', 
		'Rivadavia', 356,0, (select id from localidades where nombre = 'Los Polvorines'),1,1,0, 2);
insert into proveedores(nro_proveedor, persona_fisica, razon_social, tipo_documento_id, documento, condicion_iva_id, telefono, email, calle, altura,piso, localidad_id, provincia_id, pais_id, eliminado,usuario_id)
values('P00000003', 0, 'SKF', (select id from tipos_documento where descripcion='CUIT'), '30211338598', 1, '11-5598-8341', 'ventas@skf.com', 
		'Panamericana', 4036,0, (select id from localidades where nombre = 'Tortuguitas'),1,1,0,1);
insert into proveedores(nro_proveedor, persona_fisica, razon_social, tipo_documento_id, documento, condicion_iva_id, telefono, email, calle, altura,piso, localidad_id, provincia_id, pais_id, eliminado,usuario_id)
values('P00000004', 0, 'Gulf', (select id from tipos_documento where descripcion='CUIT'), '30181247953', 1, '11-9571-3589', 'ventas@gulf.com', 
		'Av. Eva Perón', 1754,0, (select id from localidades where nombre = 'Grand Bourg'),1,1,0,1);
insert into proveedores(nro_proveedor, persona_fisica, razon_social, tipo_documento_id, documento, condicion_iva_id, telefono, email, calle, altura,piso, localidad_id, provincia_id, pais_id, eliminado,usuario_id)
values('P00000005', 0, 'Elaión', (select id from tipos_documento where descripcion='CUIT'), '30197513647', 1, '11-3842-8741', 'ventas@elaion.com', 
		'Rivadavia', 356,0, (select id from localidades where nombre = 'Los Polvorines'),1,1,0,2);
insert into proveedores(nro_proveedor, persona_fisica, razon_social, tipo_documento_id, documento, condicion_iva_id, telefono, email, calle, altura,piso, localidad_id, provincia_id, pais_id, eliminado,usuario_id)
values('P00000006', 0, 'Bardahl', (select id from tipos_documento where descripcion='CUIT'), '30187521698', 1, '11-3657-8547', 'ventas@bardahl.com', 
		'Rivadavia', 356,0, (select id from localidades where nombre = 'Los Polvorines'),1,1,0,1);
