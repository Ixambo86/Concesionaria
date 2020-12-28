insert into paises(nombre)values('Argentina');
insert into paises(nombre)values('Brasil');
insert into paises(nombre)values('Uruguay');
insert into paises(nombre)values('Chile');
insert into paises(nombre)values('Bolivia');
insert into paises(nombre)values('Paraguay');
insert into paises(nombre)values('Colombia');

insert into provincias(nombre, pais_id)values('Buenos Aires', (select id from paises where nombre = 'Argentina'));
insert into provincias(nombre, pais_id)values('Brasilia', (select id from paises where nombre = 'Brasil'));
insert into provincias(nombre, pais_id)values('Montevideo', (select id from paises where nombre = 'Uruguay'));
insert into provincias(nombre, pais_id)values('Santiago de Chile', (select id from paises where nombre = 'Chile'));
insert into provincias(nombre, pais_id)values('La Paz', (select id from paises where nombre = 'Bolivia'));
insert into provincias(nombre, pais_id)values('Asuncion', (select id from paises where nombre = 'Paraguay'));
insert into provincias(nombre, pais_id)values('Bogota', (select id from paises where nombre = 'Colombia'));

insert into localidades(nombre, provincia_id)values('Asa Norte', (select id from provincias where nombre = 'Brasilia'));
insert into localidades(nombre, provincia_id)values('Boqueron', (select id from provincias where nombre = 'Asuncion'));
insert into localidades(nombre, provincia_id)values('Santiago Vasquez', (select id from provincias where nombre = 'Montevideo'));
insert into localidades(nombre, provincia_id)values('Gran Valparaíso', (select id from provincias where nombre = 'Santiago de Chile'));
insert into localidades(nombre, provincia_id)values('El Alto', (select id from provincias where nombre = 'La Paz'));

insert into localidades(nombre, provincia_id)values('Tortuguitas', (select id from provincias where nombre = 'Buenos Aires'));
insert into localidades(nombre, provincia_id)values('Grand Bourg', (select id from provincias where nombre = 'Buenos Aires'));
insert into localidades(nombre, provincia_id)values('Los Polvorines', (select id from provincias where nombre = 'Buenos Aires'));
insert into localidades(nombre, provincia_id)values('San Miguel', (select id from provincias where nombre = 'Buenos Aires'));
insert into localidades(nombre, provincia_id)values('Jose C. Paz', (select id from provincias where nombre = 'Buenos Aires'));