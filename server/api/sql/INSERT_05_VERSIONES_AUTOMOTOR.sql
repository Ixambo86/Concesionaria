insert into documentos_entrega(descripcion, exigido_a, fecha_desde, fecha_hasta, usuario_id, fecha_modificacion)
values('Documento A', 'Todos', '2020-01-01', null, 1, sysdate());
insert into documentos_entrega(descripcion, exigido_a, fecha_desde, fecha_hasta, usuario_id, fecha_modificacion)
values('Documento B', 'Todos', '2020-01-01', null, 1, sysdate());
insert into documentos_entrega(descripcion, exigido_a, fecha_desde, fecha_hasta, usuario_id, fecha_modificacion)
values('Documento C', 'Todos', '2020-01-01', '2020-12-01', 1, sysdate());
insert into documentos_entrega(descripcion, exigido_a, fecha_desde, fecha_hasta, usuario_id, fecha_modificacion)
values('Documento D', 'Nacional', '2020-01-01', null, 1, sysdate());
insert into documentos_entrega(descripcion, exigido_a, fecha_desde, fecha_hasta, usuario_id, fecha_modificacion)
values('Documento E', 'Nacional', '2020-01-01', null, 1, sysdate());
insert into documentos_entrega(descripcion, exigido_a, fecha_desde, fecha_hasta, usuario_id, fecha_modificacion)
values('Documento F', 'Nacional', '2020-01-01', null, 1, sysdate());
insert into documentos_entrega(descripcion, exigido_a, fecha_desde, fecha_hasta, usuario_id, fecha_modificacion)
values('Documento G', 'Nacional', '2020-01-01', '2020-12-01', 1, sysdate());
insert into documentos_entrega(descripcion, exigido_a, fecha_desde, fecha_hasta, usuario_id, fecha_modificacion)
values('Documento H', 'Importado', '2020-01-01', null, 1, sysdate());
insert into documentos_entrega(descripcion, exigido_a, fecha_desde, fecha_hasta, usuario_id, fecha_modificacion)
values('Documento I', 'Importado', '2020-01-01', null, 1, sysdate());

/*id=1*/insert into versiones_automotor(descripcion, modelo_id)values('SE 1.6 4P MT', (select id from modelos_automotor where descripcion = 'Focus'));
/*id=2*/insert into versiones_automotor(descripcion, modelo_id)values('SE 1.6 5P MT', (select id from modelos_automotor where descripcion = 'Focus'));

/*id=3*/insert into versiones_automotor(descripcion, modelo_id)values('Titanium 2.0 4P MT', (select id from modelos_automotor where descripcion = 'Focus'));
/*id=6*/insert into versiones_automotor(descripcion, modelo_id)values('Titanium 2.0 5P AT', (select id from modelos_automotor where descripcion = 'Focus'));

/*id=7*/insert into versiones_automotor(descripcion, modelo_id)values('SE 1.6 4P MT', (select id from modelos_automotor where descripcion = 'Fiesta'));
/*id=8*/insert into versiones_automotor(descripcion, modelo_id)values('SE 1.6 5P MT', (select id from modelos_automotor where descripcion = 'Fiesta'));

/*id=9*/insert into versiones_automotor(descripcion, modelo_id)values('Titanium 2.0 4P MT', (select id from modelos_automotor where descripcion = 'Fiesta'));
/*id=12*/insert into versiones_automotor(descripcion, modelo_id)values('Titanium 2.0 5P AT', (select id from modelos_automotor where descripcion = 'Fiesta'));

/*id=13*/insert into versiones_automotor(descripcion, modelo_id)values('SE 1.6 4P MT', (select id from modelos_automotor where descripcion = 'Ka'));
/*id=14*/insert into versiones_automotor(descripcion, modelo_id)values('SE 1.6 5P MT', (select id from modelos_automotor where descripcion = 'Ka'));

/*id=19*/insert into versiones_automotor(descripcion, modelo_id)values('LT 1.4T 4P MT', (select id from modelos_automotor where descripcion = 'Cruze'));
/*id=20*/insert into versiones_automotor(descripcion, modelo_id)values('LTZ 1.4T 4P AT', (select id from modelos_automotor where descripcion = 'Cruze'));

/*id=22*/insert into versiones_automotor(descripcion, modelo_id)values('LT 1.4T 5P MT', (select id from modelos_automotor where descripcion = 'Cruze'));
/*id=23*/insert into versiones_automotor(descripcion, modelo_id)values('LTZ 1.4T 5P AT', (select id from modelos_automotor where descripcion = 'Cruze'));

/*id=25*/insert into versiones_automotor(descripcion, modelo_id)values('LT 1.4 4P MT', (select id from modelos_automotor where descripcion = 'Joy'));
/*id=26*/insert into versiones_automotor(descripcion, modelo_id)values('LTZ 1.4 4P MT', (select id from modelos_automotor where descripcion = 'Joy'));

/*id=27*/insert into versiones_automotor(descripcion, modelo_id)values('Plus LT 1.4 5P MT', (select id from modelos_automotor where descripcion = 'Joy'));
/*id=28*/insert into versiones_automotor(descripcion, modelo_id)values('Plus LTZ 1.4 5P MT', (select id from modelos_automotor where descripcion = 'Joy'));

/*id=29*/insert into versiones_automotor(descripcion, modelo_id)values('LT 1.4 4P MT', (select id from modelos_automotor where descripcion = 'Onix'));
/*id=30*/insert into versiones_automotor(descripcion, modelo_id)values('LTZ 1.4 4P MT', (select id from modelos_automotor where descripcion = 'Onix'));

/*id=31*/insert into versiones_automotor(descripcion, modelo_id)values('Plus LT 1.4 5P MT', (select id from modelos_automotor where descripcion = 'Onix'));
/*id=32*/insert into versiones_automotor(descripcion, modelo_id)values('Plus LTZ 1.4 5P MT', (select id from modelos_automotor where descripcion = 'Onix'));

/*id=33*/insert into versiones_automotor(descripcion, modelo_id)values('Like 1.6 5P MT', (select id from modelos_automotor where descripcion = '208 Nuevo'));
/*id=34*/insert into versiones_automotor(descripcion, modelo_id)values('Active 1.6 5P MT', (select id from modelos_automotor where descripcion = '208 Nuevo'));
/*id=35*/insert into versiones_automotor(descripcion, modelo_id)values('Allure 1.6 5P MT', (select id from modelos_automotor where descripcion = '208 Nuevo'));
/*id=36*/insert into versiones_automotor(descripcion, modelo_id)values('Feline 1.6 5P MT', (select id from modelos_automotor where descripcion = '208 Nuevo'));

/*id=38*/insert into versiones_automotor(descripcion, modelo_id)values('Active 1.6 5P MT', (select id from modelos_automotor where descripcion = '308'));
/*id=39*/insert into versiones_automotor(descripcion, modelo_id)values('Allure 1.6 5P MT', (select id from modelos_automotor where descripcion = '308'));
/*id=40*/insert into versiones_automotor(descripcion, modelo_id)values('Feline 2.0 5P MT', (select id from modelos_automotor where descripcion = '308'));

/*id=43*/insert into versiones_automotor(descripcion, modelo_id)values('Allure Plus 1.6THP 5P AT', (select id from modelos_automotor where descripcion = '308 S'));

/*id=44*/insert into versiones_automotor(descripcion, modelo_id)values('Active 1.6 5P MT', (select id from modelos_automotor where descripcion = '408'));
/*id=45*/insert into versiones_automotor(descripcion, modelo_id)values('Allure 1.6 5P MT', (select id from modelos_automotor where descripcion = '408'));
/*id=46*/insert into versiones_automotor(descripcion, modelo_id)values('Feline 2.0 5P MT', (select id from modelos_automotor where descripcion = '408'));

/*id=63*/insert into versiones_automotor(descripcion, modelo_id)values('TrendLine 2.0 TDI 140 CV 4X2', (select id from modelos_automotor where descripcion = 'Amarok'));
/*id=64*/insert into versiones_automotor(descripcion, modelo_id)values('Confortline 2.0 TDI 180 CV 4X2', (select id from modelos_automotor where descripcion = 'Amarok'));
/*id=65*/insert into versiones_automotor(descripcion, modelo_id)values('Highline 2.0 TDI 180 CV 4X2', (select id from modelos_automotor where descripcion = 'Amarok'));

/*id=68*/insert into versiones_automotor(descripcion, modelo_id)values('TrendLine 1.6 MT', (select id from modelos_automotor where descripcion = 'Golf'));
/*id=69*/insert into versiones_automotor(descripcion, modelo_id)values('Confortline 1.6 MT', (select id from modelos_automotor where descripcion = 'Golf'));
/*id=70*/insert into versiones_automotor(descripcion, modelo_id)values('Highline 1.4T MT', (select id from modelos_automotor where descripcion = 'Golf'));

/*id=72*/insert into versiones_automotor(descripcion, modelo_id)values('TrendLine 1.6 MT', (select id from modelos_automotor where descripcion = 'Gol'));
/*id=73*/insert into versiones_automotor(descripcion, modelo_id)values('Confortline 1.6 MT', (select id from modelos_automotor where descripcion = 'Gol'));
/*id=74*/insert into versiones_automotor(descripcion, modelo_id)values('Highline 1.6 MT', (select id from modelos_automotor where descripcion = 'Gol'));

/*id=78*/insert into versiones_automotor(descripcion, modelo_id)values('TrendLine 1.6 MT', (select id from modelos_automotor where descripcion = 'Polo'));
/*id=79*/insert into versiones_automotor(descripcion, modelo_id)values('Confortline 1.6 MT', (select id from modelos_automotor where descripcion = 'Polo'));
/*id=80*/insert into versiones_automotor(descripcion, modelo_id)values('Highline 1.6 MT', (select id from modelos_automotor where descripcion = 'Polo'));

/*id=95*/insert into versiones_automotor(descripcion, modelo_id)values('TrendLine 1.0 MT', (select id from modelos_automotor where descripcion = 'Up'));
/*id=96*/insert into versiones_automotor(descripcion, modelo_id)values('Confortline 1.0 MT', (select id from modelos_automotor where descripcion = 'Up'));
/*id=97*/insert into versiones_automotor(descripcion, modelo_id)values('Highline 1.0 MT', (select id from modelos_automotor where descripcion = 'Up'));
/*id=98*/insert into versiones_automotor(descripcion, modelo_id)values('Pepper 1.0T MT', (select id from modelos_automotor where descripcion = 'Up'));
