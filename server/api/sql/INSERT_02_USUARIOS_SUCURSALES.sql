insert into sucursales(nombre, calle, altura, localidad_id, provincia_id, pais_id, cant_mecanicos, telefono, email, eliminado)values('Car Two José C. Paz', 'Zuviria', 4500, 3,1,1, 2, 116263639, 'josecpaz@cartwo.com.ar',0);
insert into sucursales(nombre, calle, altura, localidad_id, provincia_id, pais_id, cant_mecanicos, telefono, email, eliminado)values('Car Two San Miguel', 'Paunero', 382, 2,1,1, 3, 1153214854, 'sanmiguel@cartwo.com.ar',0);
insert into sucursales(nombre, calle, altura, localidad_id, provincia_id, pais_id, cant_mecanicos, telefono, email, eliminado)values('Car Two Polvorines', 'San Marín', 3230, 3,1,1, 1, 1161354785, 'lospolvorines@cartwo.com.ar',0);

insert into usuarios(dni, usuario, password_hash, nombre, email, estado, sucursal_id, bonificacion_maxima) values(32252689, 'emilanese',	'$2b$10$gFfvE/Kf6DeJokGZGQ1Rz.4nMhh73OSWHxvyfFNn7.cWv4iklL..O',	'Ezequiel Milanese', 'ezequielmilanese@gmail.com', 'Activo', 2, 10);
insert into usuarios(dni, usuario, password_hash, nombre, email, estado, sucursal_id) values(42145124, 'admin', '$2b$10$yfZf/s89GqTvgrakYuXyN.CYvomo.upFkQh43tuZHH9gSVYpJTNe.', 'Jonatan Barrera', 'jonatanbarrera@car-two.com.ar', 'Activo', 1);
insert into usuarios(dni, usuario, password_hash, nombre, email, estado, sucursal_id) values(23481948, 'admin2', '$2b$10$zrudw7rEYFVNUXI.7optIe41b.8YyjXMEokc9tcd2VLj4k3Dn5VFa', 'Enzo Falcon', 'enzofalcon@car-two.com.ar', 'Activo', 1);
insert into usuarios(dni, usuario, password_hash, nombre, email, estado, sucursal_id, bonificacion_maxima) values(32252680, 'CDavila',	'$2b$10$gFfvE/Kf6DeJokGZGQ1Rz.4nMhh73OSWHxvyfFNn7.cWv4iklL..O',	'Claudia Davila', 'vendedor@car-two.com', 'Activo', 3, 5);
insert into usuarios(dni, usuario, password_hash, nombre, email, estado, sucursal_id) values(29234610, 'AReyes',	'$2b$10$gFfvE/Kf6DeJokGZGQ1Rz.4nMhh73OSWHxvyfFNn7.cWv4iklL..O',	'Arturo Reyes', 'AReyes@car-two.com', 'Activo', 2);
insert into usuarios(dni, usuario, password_hash, nombre, email, estado, sucursal_id, bonificacion_maxima) values(28294817, 'JPalacios',	'$2b$10$gFfvE/Kf6DeJokGZGQ1Rz.4nMhh73OSWHxvyfFNn7.cWv4iklL..O',	'Jose Palacios', 'josepalacios@car-two.com', 'Activo', 2, 10);
insert into usuarios(dni, usuario, password_hash, nombre, email, estado, sucursal_id) values(40123131, 'FBaeza',	'$2b$10$gFfvE/Kf6DeJokGZGQ1Rz.4nMhh73OSWHxvyfFNn7.cWv4iklL..O',	'Fernanda Baeza', 'fernandabaeza@car-two.com', 'Activo', 2);
insert into usuarios(dni, usuario, password_hash, nombre, email, estado, sucursal_id, bonificacion_maxima) values(24165489, 'EDorado',	'$2b$10$gFfvE/Kf6DeJokGZGQ1Rz.4nMhh73OSWHxvyfFNn7.cWv4iklL..O',	'Esteban Dorado', 'estebandorado@car-two.com', 'Activo', 2, 15);

insert into roles(descripcion) values('Administrador');
insert into roles(descripcion) values ('Mecanico');
insert into roles(descripcion) values ('Vendedor');
insert into roles(descripcion) values ('Supervisor de ventas');
insert into roles(descripcion) values ('Administrativo');
insert into roles(descripcion) values ('Gerente');

insert into usuarios_roles(usuario_id, rol_id) values(1,1);
insert into usuarios_roles(usuario_id, rol_id) values(2,1);
insert into usuarios_roles(usuario_id, rol_id) values(3,1);
insert into usuarios_roles(usuario_id, rol_id) values(4,3);
insert into usuarios_roles(usuario_id, rol_id) values(5,2);
insert into usuarios_roles(usuario_id, rol_id) values(6,4);
insert into usuarios_roles(usuario_id, rol_id) values(7,5);
insert into usuarios_roles(usuario_id, rol_id) values(8,6);

