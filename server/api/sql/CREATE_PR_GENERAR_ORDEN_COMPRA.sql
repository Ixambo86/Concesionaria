CREATE DEFINER=CURRENT_USER PROCEDURE `generar_orden_compra`(in p_producto_id int, in p_sucursal_id int)
BEGIN
	DECLARE	v_orden_id int;
    DECLARE	v_item int;
    DECLARE	v_proveedor_id int;
    DECLARE v_cantidad float;
    
	select oc.id 
    into v_orden_id
    from ordenes_compra oc, ordenes_compra_detalle ocd
    where oc.id = ocd.orden_compra_id
    and oc.remito_id is null
    and oc.estado <> 'CANCELADA'
    and ocd.producto_id = p_producto_id
    and oc.sucursal_id = p_sucursal_id;
    
    if v_orden_id is null then
		select oc.id 
		into v_orden_id
		from ordenes_compra oc, ordenes_compra_detalle ocd
		where oc.id = ocd.orden_compra_id
		and oc.estado = 'INICIADA'
		and ocd.producto_id = p_producto_id
        and oc.sucursal_id = p_sucursal_id;
        
        if v_orden_id is null then
			select oc.id 
			into v_orden_id
			from ordenes_compra oc, ordenes_compra_detalle ocd
			where oc.id = ocd.orden_compra_id
			and oc.estado = 'INICIADA'
            and oc.sucursal_id = p_sucursal_id
			and oc.proveedor_id = (select proveedor_id from productos where id = p_producto_id);
            
            if v_orden_id is null then
				select compra_minima, proveedor_id 
                into v_cantidad, v_proveedor_id
                from productos
                where id = p_producto_id;
                
                select coalesce(max(id), 0)+1
                into v_orden_id
                from ordenes_compra;
                
                insert into ordenes_compra(fecha_hora, nro_orden, proveedor_id, sucursal_id, estado)
                values(sysdate(), (select concat('OC', lpad(v_orden_id, 8, '0'))), v_proveedor_id, p_sucursal_id, 'INICIADA');
                
                insert into ordenes_compra_detalle(orden_compra_id, item, producto_id, cantidad)
                values(v_orden_id, 1, p_producto_id, v_cantidad);
            else 
				select compra_minima, proveedor_id 
                into v_cantidad, v_proveedor_id
                from productos
                where id = p_producto_id;
                
                select max(id)+1
                into v_item
                from ordenes_compra_detalle
                where orden_compra_id = v_orden_id;
                
				insert into ordenes_compra_detalle(orden_compra_id, item, producto_id, cantidad)
                values(v_orden_id, v_item, p_producto_id, v_cantidad);
            end if;
        end if;
	end if;
END