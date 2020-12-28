insert into marcas_automotor(descripcion)values('Ford');
insert into marcas_automotor(descripcion)values('Chevrolet');
insert into marcas_automotor(descripcion)values('Peugeot');
insert into marcas_automotor(descripcion)values('Volkswagen');


insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Focus', (select id from marcas_automotor where descripcion = 'Ford'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Fiesta', (select id from marcas_automotor where descripcion = 'Ford'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Ka', (select id from marcas_automotor where descripcion = 'Ford'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Ecosport', (select id from marcas_automotor where descripcion = 'Ford'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Mustang', (select id from marcas_automotor where descripcion = 'Ford'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Ranger', (select id from marcas_automotor where descripcion = 'Ford'), 1);

insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Cruze', (select id from marcas_automotor where descripcion = 'Chevrolet'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Joy', (select id from marcas_automotor where descripcion = 'Chevrolet'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Onix', (select id from marcas_automotor where descripcion = 'Chevrolet'), 1);

insert into modelos_automotor(descripcion, marca_id, usuario_id)values('208 Nuevo', (select id from marcas_automotor where descripcion = 'Peugeot'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('308', (select id from marcas_automotor where descripcion = 'Peugeot'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('308 S', (select id from marcas_automotor where descripcion = 'Peugeot'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('408', (select id from marcas_automotor where descripcion = 'Peugeot'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('2008', (select id from marcas_automotor where descripcion = 'Peugeot'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('3008', (select id from marcas_automotor where descripcion = 'Peugeot'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Partner', (select id from marcas_automotor where descripcion = 'Peugeot'), 1);

insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Amarok', (select id from marcas_automotor where descripcion = 'Volkswagen'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Golf', (select id from marcas_automotor where descripcion = 'Volkswagen'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Gol', (select id from marcas_automotor where descripcion = 'Volkswagen'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Nivus', (select id from marcas_automotor where descripcion = 'Volkswagen'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Polo', (select id from marcas_automotor where descripcion = 'Volkswagen'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Saveiro', (select id from marcas_automotor where descripcion = 'Volkswagen'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('T-Cross', (select id from marcas_automotor where descripcion = 'Volkswagen'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Tiguan', (select id from marcas_automotor where descripcion = 'Volkswagen'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Tuareg', (select id from marcas_automotor where descripcion = 'Volkswagen'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Up', (select id from marcas_automotor where descripcion = 'Volkswagen'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Vento', (select id from marcas_automotor where descripcion = 'Volkswagen'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Virtus', (select id from marcas_automotor where descripcion = 'Volkswagen'), 1);
insert into modelos_automotor(descripcion, marca_id, usuario_id)values('Voyage', (select id from marcas_automotor where descripcion = 'Volkswagen'), 1);
